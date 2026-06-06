#!/usr/bin/env npx tsx
/**
 * Topic Researcher — Discovers new blog topics using AI analysis.
 *
 * Usage:
 *   npx tsx scripts/blog-engine/researcher.ts                    # Full research run
 *   npx tsx scripts/blog-engine/researcher.ts --strategy keyword # Single strategy
 *   npx tsx scripts/blog-engine/researcher.ts --approve-all      # Approve all pending
 *   npx tsx scripts/blog-engine/researcher.ts --list             # List pending topics
 *   npx tsx scripts/blog-engine/researcher.ts --sync             # Sync approved to addon file
 */

import fs from 'fs'
import path from 'path'
import type { TopicSeed } from './config'
import type { BlogCategory } from '../../types/blog'
import { TOPIC_CLUSTERS, COMPETITORS } from './config'
import { getPublishedTopics } from './publisher'

interface PendingTopic extends TopicSeed {
  category: BlogCategory
  source: 'keyword-expansion' | 'competitor-gap' | 'question-mining'
  suggestedAt: string
  status: 'pending' | 'approved' | 'rejected'
}

interface PendingStore {
  pending: PendingTopic[]
  approved: PendingTopic[]
  rejected: PendingTopic[]
}

const PENDING_FILE = path.join(process.cwd(), 'scripts', 'blog-engine', 'pending-topics.json')

function loadPending(): PendingStore {
  if (!fs.existsSync(PENDING_FILE)) return { pending: [], approved: [], rejected: [] }
  return JSON.parse(fs.readFileSync(PENDING_FILE, 'utf-8'))
}

function savePending(store: PendingStore) {
  fs.writeFileSync(PENDING_FILE, JSON.stringify(store, null, 2))
}

async function aiGenerate(systemPrompt: string, userPrompt: string): Promise<string> {
  const anthropicKey = process.env.ANTHROPIC_API_KEY
  const openaiKey = process.env.OPENAI_API_KEY

  if (anthropicKey) {
    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': anthropicKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 4000,
        system: systemPrompt,
        messages: [{ role: 'user', content: userPrompt }],
      }),
    })
    if (!res.ok) throw new Error(`Anthropic API error ${res.status}: ${await res.text()}`)
    const data = await res.json()
    return data.content[0].text
  }

  if (openaiKey) {
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
        max_tokens: 4000,
        temperature: 0.8,
      }),
    })
    if (!res.ok) throw new Error(`OpenAI API error ${res.status}: ${await res.text()}`)
    const data = await res.json()
    return data.choices[0].message.content
  }

  throw new Error('No AI provider configured. Set ANTHROPIC_API_KEY or OPENAI_API_KEY.')
}

const RESEARCH_SYSTEM_PROMPT = `You are an SEO content strategist for Olea Wholesale, a Portugal-based B2B supplier of premium bulk cooking oils (sunflower, palm, canola, soybean, corn, rapeseed, UCO) serving industrial food manufacturers and restaurant chains across 40+ countries.

Your job is to discover high-value blog topic opportunities. Every topic must:
1. Target a specific search query with real search volume
2. Be relevant to bulk cooking oil procurement, quality, logistics, or market trends
3. Have clear AEO potential (answer a question AI engines might get asked)
4. Not duplicate existing topics

Return ONLY valid JSON arrays, no markdown fences or extra text.`

async function researchKeywordExpansion(existingTopics: string[]): Promise<PendingTopic[]> {
  console.log('  Running keyword expansion...')

  const existingKeywords = TOPIC_CLUSTERS.flatMap((c) =>
    c.topics.flatMap((t) => [t.primaryKeyword, ...t.secondaryKeywords])
  )

  const prompt = `Based on these existing keywords in the bulk cooking oil niche:
${existingKeywords.slice(0, 30).map((k) => `- ${k}`).join('\n')}

Already-covered topics (DO NOT suggest these):
${existingTopics.slice(0, 20).map((t) => `- ${t}`).join('\n')}

Generate 8 NEW long-tail keyword topic opportunities we haven't covered. Focus on:
- Specific oil type + application combinations (e.g., "sunflower oil for snack food manufacturing")
- Regional procurement queries (e.g., "bulk cooking oil suppliers Middle East")
- Quality and specification queries (e.g., "acceptable FFA levels for frying oil")
- Cost and pricing queries (e.g., "cheapest bulk vegetable oil 2026")

Return JSON array:
[{
  "title": "Article title",
  "primaryKeyword": "main search query",
  "secondaryKeywords": ["kw1", "kw2", "kw3"],
  "searchIntent": "informational|commercial",
  "targetRegions": ["Region"],
  "priority": 1|2|3,
  "aiQueryTargets": ["Question 1?", "Question 2?"],
  "category": "buying-guide|market-insight|shipping|product-guide|industry-news|comparison|how-to|sustainability|regulation"
}]`

  const raw = await aiGenerate(RESEARCH_SYSTEM_PROMPT, prompt)
  return parseTopics(raw, 'keyword-expansion')
}

async function researchCompetitorGaps(existingTopics: string[]): Promise<PendingTopic[]> {
  console.log('  Running competitor gap analysis...')

  const prompt = `Analyze the bulk edible oil B2B content space. Major competitors:
${COMPETITORS.map((c) => `- ${c}`).join('\n')}

Our existing topics:
${existingTopics.map((t) => `- ${t}`).join('\n')}

Identify 8 high-value topics that B2B oil suppliers typically cover but we DON'T yet. Focus on:
- Technical application guides (bakery, snack food, restaurant chains)
- Sourcing from specific origins (Malaysia, Indonesia, Brazil, Argentina)
- Regulatory compliance (EUDR, FDA, Codex Alimentarius)
- Cost optimization and hedging strategies

Return JSON array with the same structure as before.`

  const raw = await aiGenerate(RESEARCH_SYSTEM_PROMPT, prompt)
  return parseTopics(raw, 'competitor-gap')
}

async function researchQuestionMining(existingTopics: string[]): Promise<PendingTopic[]> {
  console.log('  Running question mining...')

  const prompt = `Generate 8 blog topics based on REAL QUESTIONS that food manufacturers and procurement managers ask about buying cooking oil in bulk:

- Questions on industry forums and LinkedIn groups
- "People Also Ask" style queries on Google
- Questions AI assistants frequently get about edible oil sourcing
- Concerns first-time bulk buyers have (quality, shelf life, contamination, price volatility)

Already covered (DO NOT duplicate):
${existingTopics.slice(0, 15).map((t) => `- ${t}`).join('\n')}

Return JSON array with the same structure.`

  const raw = await aiGenerate(RESEARCH_SYSTEM_PROMPT, prompt)
  return parseTopics(raw, 'question-mining')
}

function parseTopics(raw: string, source: PendingTopic['source']): PendingTopic[] {
  let jsonStr = raw.trim()
  if (jsonStr.startsWith('```')) {
    jsonStr = jsonStr.replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '')
  }
  try {
    const topics = JSON.parse(jsonStr)
    return topics.map((t: Record<string, unknown>) => ({
      ...t,
      source,
      suggestedAt: new Date().toISOString(),
      status: 'pending' as const,
    }))
  } catch (err) {
    console.error(`    Failed to parse AI response: ${err}`)
    return []
  }
}

function deduplicateTopics(newTopics: PendingTopic[], existingTitles: string[], pendingTitles: string[]): PendingTopic[] {
  const allExisting = [...existingTitles, ...pendingTitles].map((t) => t.toLowerCase())
  return newTopics.filter((t) => {
    const lower = t.title.toLowerCase()
    if (allExisting.includes(lower)) return false
    const newWords = new Set(lower.split(/\s+/))
    for (const existing of allExisting) {
      const existingWords = new Set(existing.split(/\s+/))
      const overlap = [...newWords].filter((w) => existingWords.has(w)).length
      if (overlap / Math.max(newWords.size, existingWords.size) > 0.7) return false
    }
    return true
  })
}

async function main() {
  const args = process.argv.slice(2)
  const store = loadPending()

  if (args.includes('--list')) {
    console.log('\n📋 Pending Topics for Review\n')
    if (store.pending.length === 0) {
      console.log('  No pending topics. Run research first.\n')
      return
    }
    store.pending.forEach((t, i) => {
      console.log(`  [${i}] ${t.title}`)
      console.log(`      Category: ${t.category} | Source: ${t.source} | Priority: ${t.priority}`)
      console.log()
    })
    console.log(`  Total pending: ${store.pending.length}\n`)
    return
  }

  if (args.includes('--approve-all')) {
    const count = store.pending.length
    store.approved.push(...store.pending.map((t) => ({ ...t, status: 'approved' as const })))
    store.pending = []
    savePending(store)
    console.log(`\n✅ Approved all ${count} pending topics.\n`)
    return
  }

  if (args.includes('--sync')) {
    if (store.approved.length === 0) {
      console.log('\nNo approved topics to sync.\n')
      return
    }
    const addonPath = path.join(process.cwd(), 'scripts', 'blog-engine', 'addon-topics.json')
    const existing = fs.existsSync(addonPath) ? JSON.parse(fs.readFileSync(addonPath, 'utf-8')) : []
    const newTopics = store.approved.map((t) => ({
      category: t.category,
      topic: {
        title: t.title,
        primaryKeyword: t.primaryKeyword,
        secondaryKeywords: t.secondaryKeywords,
        searchIntent: t.searchIntent,
        targetRegions: t.targetRegions,
        priority: t.priority,
        aiQueryTargets: t.aiQueryTargets,
      },
    }))
    fs.writeFileSync(addonPath, JSON.stringify([...existing, ...newTopics], null, 2))
    store.approved = []
    savePending(store)
    console.log(`\n✅ Synced ${newTopics.length} topics to addon-topics.json\n`)
    return
  }

  // Default: run research
  const strategy = args.includes('--strategy') ? args[args.indexOf('--strategy') + 1] : 'all'

  console.log('\n🔍 Olea Wholesale Topic Researcher — Starting research\n')

  const allExistingTitles = [
    ...getPublishedTopics(),
    ...TOPIC_CLUSTERS.flatMap((c) => c.topics.map((t) => t.title)),
  ]
  const pendingTitles = store.pending.map((t) => t.title)

  let newTopics: PendingTopic[] = []

  const strategies: Record<string, () => Promise<PendingTopic[]>> = {
    keyword: () => researchKeywordExpansion(allExistingTitles),
    competitor: () => researchCompetitorGaps(allExistingTitles),
    question: () => researchQuestionMining(allExistingTitles),
  }

  if (strategy === 'all') {
    for (const [, fn] of Object.entries(strategies)) {
      try {
        const topics = await fn()
        const deduped = deduplicateTopics(topics, allExistingTitles, pendingTitles)
        console.log(`    Found ${topics.length} topics, ${deduped.length} unique\n`)
        newTopics.push(...deduped)
        pendingTitles.push(...deduped.map((t) => t.title))
      } catch (err) {
        console.error(`    Error: ${err}\n`)
      }
      await new Promise((r) => setTimeout(r, 2000))
    }
  } else if (strategies[strategy]) {
    const topics = await strategies[strategy]()
    newTopics = deduplicateTopics(topics, allExistingTitles, pendingTitles)
  }

  store.pending.push(...newTopics)
  savePending(store)

  console.log('═'.repeat(50))
  console.log(`\n📋 Research Complete — ${newTopics.length} new topics discovered`)
  console.log(`  Total pending: ${store.pending.length}\n`)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
