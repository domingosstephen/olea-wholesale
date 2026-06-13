/**
 * Article Generator — Uses AI to create SEO/AEO/GEO-optimized blog posts.
 *
 * Supports both Anthropic (Claude) and OpenAI APIs.
 * Set ANTHROPIC_API_KEY or OPENAI_API_KEY in environment.
 */

import type { BlogPost, BlogAuthor } from '../../types/blog'
import type { TopicSeed } from './config'
import { AUTHORS, GENERATION_CONFIG } from './config'

// ---------------------------------------------------------------------------
// AI Provider abstraction
// ---------------------------------------------------------------------------

interface AIProvider {
  generate(systemPrompt: string, userPrompt: string): Promise<string>
}

function getProvider(): AIProvider {
  const anthropicKey = process.env.ANTHROPIC_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY

  if (anthropicKey) {
    return {
      async generate(systemPrompt: string, userPrompt: string): Promise<string> {
        const res = await fetch('https://api.anthropic.com/v1/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': anthropicKey,
            'anthropic-version': '2023-06-01',
          },
          body: JSON.stringify({
            model: 'claude-sonnet-4-20250514',
            max_tokens: 8000,
            system: systemPrompt,
            messages: [{ role: 'user', content: userPrompt }],
          }),
        })
        if (!res.ok) {
          const err = await res.text()
          throw new Error(`Anthropic API error ${res.status}: ${err}`)
        }
        const data = await res.json()
        return data.content[0].text
      },
    }
  }

  if (openaiKey) {
    return {
      async generate(systemPrompt: string, userPrompt: string): Promise<string> {
        const res = await fetch('https://api.openai.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${openaiKey}`,
          },
          body: JSON.stringify({
            model: 'gpt-4o',
            messages: [
              { role: 'system', content: systemPrompt },
              { role: 'user', content: userPrompt },
            ],
            max_tokens: 8000,
            temperature: 0.7,
          }),
        })
        if (!res.ok) {
          const err = await res.text()
          throw new Error(`OpenAI API error ${res.status}: ${err}`)
        }
        const data = await res.json()
        return data.choices[0].message.content
      },
    }
  }

  throw new Error(
    'No AI provider configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY environment variable.'
  )
}

// ---------------------------------------------------------------------------
// System prompt
// ---------------------------------------------------------------------------

const SYSTEM_PROMPT = `You are an expert commodities journalist and SEO content writer for Olea Wholesale, a Portugal-based certified B2B supplier of premium bulk cooking oils. You supply industrial food manufacturers, restaurant chains, and high-volume distributors across 40+ countries.

Your articles must be optimized for three search paradigms simultaneously:

## SEO (Search Engine Optimization)
- Natural keyword integration (primary keyword in H1, first paragraph, and 2-3 H2s)
- Comprehensive coverage that beats competing content
- Proper heading hierarchy (H2 for sections, H3 for subsections)
- Internal linking opportunities (mention products, quote request, contact pages)
- 1800-3000 words for topical authority

## AEO (Answer Engine Optimization)
- Lead EVERY section with a direct, extractable answer (40-60 words)
- Use headings that match how people ask questions
- Include a FAQ section with 5 natural-language Q&As
- Structure content so any paragraph can stand alone as a snippet
- Use numbered lists for processes, bullet lists for features

## GEO (Generative Engine Optimization — AI Citation)
- Include specific statistics with sources (e.g., "According to the USDA Foreign Agricultural Service...")
- Use authoritative tone with domain expertise
- Add comparison tables for any "vs" content
- Make claims verifiable and specific (exact numbers, not vague)
- Include expert perspective and first-hand experience signals
- Avoid AI-detectable patterns: no em dashes, no "dive into", no "game-changer", no "it's important to note"

## Content Style Rules
- Write in a clear, professional but approachable tone
- Use active voice
- Be specific: exact prices, timelines, specification values
- Include real-world context (port names, regulation names, agency names)
- Reference Olea Wholesale naturally where relevant (not forced)
- Add a TLDR/Key Takeaway at the top (2-3 sentences max)

## CRITICAL: Current Year
- The current year is ${new Date().getFullYear()}. ALL references to years MUST use ${new Date().getFullYear()}.

## Output Format
Return ONLY valid JSON with this exact structure (no markdown code fences):
{
  "title": "...",
  "seoTitle": "...(50-60 chars, keyword near front)...",
  "seoDescription": "...(140-160 chars, keyword + value prop + CTA)...",
  "excerpt": "...(2-3 sentence summary for blog cards)...",
  "content": "...(full HTML article body — use <h2>, <h3>, <p>, <ul>, <ol>, <li>, <table>, <thead>, <tbody>, <tr>, <th>, <td>, <strong>, <em>, <blockquote> tags)...",
  "tags": ["tag1", "tag2", ...],
  "keywords": ["primary keyword", "secondary keyword 1", ...],
  "readingTime": 8,
  "tldr": "...(2-3 sentence key takeaway)...",
  "faqItems": [
    {"question": "...", "answer": "..."},
    ...5 items
  ]
}`

// ---------------------------------------------------------------------------
// Article generation
// ---------------------------------------------------------------------------

function selectAuthor(topic: TopicSeed, category: string): BlogAuthor {
  if (category === 'shipping' || topic.primaryKeyword.includes('shipping') || topic.primaryKeyword.includes('logistics')) {
    return AUTHORS[1] // Maria — supply chain
  }
  if (category === 'regulation' || topic.primaryKeyword.includes('ISO') || topic.primaryKeyword.includes('quality')) {
    return AUTHORS[2] // Ahmed — QA
  }
  return AUTHORS[0] // Stephano — founder/general
}

function generateSlug(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '')
    .slice(0, 80)
}

export async function generateArticle(topic: TopicSeed, category: string): Promise<BlogPost> {
  const provider = getProvider()
  const author = selectAuthor(topic, category)

  const userPrompt = `Write a comprehensive article about: "${topic.title}"

Primary keyword: "${topic.primaryKeyword}"
Secondary keywords: ${topic.secondaryKeywords.map((k) => `"${k}"`).join(', ')}
Search intent: ${topic.searchIntent}
Target regions: ${topic.targetRegions.join(', ')}

AI query targets (questions this article should directly answer):
${topic.aiQueryTargets.map((q) => `- ${q}`).join('\n')}

IMPORTANT: Today's date is ${new Date().toISOString().split('T')[0]}. The current year is ${new Date().getFullYear()}. ALL year references in the article MUST be ${new Date().getFullYear()}.

Requirements:
- ${GENERATION_CONFIG.minWordCount}-${GENERATION_CONFIG.maxWordCount} words
- ${GENERATION_CONFIG.faqItemsPerArticle} FAQ items
- Include at least one comparison table if applicable
- Include specific statistics and data points with source attributions
- Mention relevant Olea Wholesale services naturally (product catalog, quote request, quality testing, shipping)
- Reference specific certifications (ISO 22000, RSPO, EU Organic), ports, and regulations by name
- Write as ${author.name}, ${author.title}

Return ONLY the JSON object, no markdown fences or extra text.`

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let parsed: any

  for (let attempt = 1; attempt <= 2; attempt++) {
    const raw = await provider.generate(SYSTEM_PROMPT, userPrompt)

    let jsonStr = raw.trim()
    if (jsonStr.startsWith('```')) {
      jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
    }

    try {
      parsed = JSON.parse(jsonStr)
      break
    } catch (err) {
      if (attempt === 2) {
        throw new Error(`Failed to parse JSON after 2 attempts: ${(err as Error).message}`)
      }
      console.log(`   ⚠️  JSON parse failed on attempt ${attempt}, retrying...`)
    }
  }

  if (!parsed) throw new Error('No article generated')

  const now = new Date().toISOString()
  const slug = generateSlug(String(parsed.title || topic.title))

  const post: BlogPost = {
    slug,
    title: String(parsed.title || topic.title),
    seoTitle: String(parsed.seoTitle || topic.title),
    seoDescription: String(parsed.seoDescription || parsed.excerpt || '').slice(0, 160),
    excerpt: String(parsed.excerpt || ''),
    content: String(parsed.content || ''),
    category: category as BlogPost['category'],
    tags: (parsed.tags as string[]) || topic.secondaryKeywords.slice(0, 5),
    keywords: (parsed.keywords as string[]) || [topic.primaryKeyword, ...topic.secondaryKeywords],
    author,
    publishedAt: now,
    updatedAt: now,
    image: '/images/site/hero.jpeg',
    imageAlt: `Olea Wholesale — ${String(parsed.title || topic.title)}`,
    readingTime: Number(parsed.readingTime) || Math.ceil(String(parsed.content || '').split(/\s+/).length / 250),
    featured: topic.priority === 1,
    faqItems: (parsed.faqItems as BlogPost['faqItems']) || [],
    tldr: String(parsed.tldr || parsed.excerpt || ''),
  }

  return post
}
