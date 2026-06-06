#!/usr/bin/env node
/**
 * Internal Linking Engine for Olea Wholesale Blog
 *
 * Reads all blog posts, builds a semantic linking map, and injects
 * contextual <a> links into the HTML content of each post.
 *
 * Rules:
 * - Max 8 internal links per post
 * - Never link to self
 * - Never link the same target twice in one post
 * - Never inject links inside <h1>-<h6>, <a>, <strong>, <th> tags
 * - Also links to key site pages (/products, /contact, /quote)
 * - Adds relatedSlugs field to each post
 */

const fs = require('fs')
const path = require('path')

const BLOG_DIR = path.join(__dirname, '..', 'content', 'blog')
const MAX_LINKS_PER_POST = 8
const SITE_PAGES_MAX = 2

function loadAllPosts() {
  if (!fs.existsSync(BLOG_DIR)) return []
  const files = fs.readdirSync(BLOG_DIR).filter((f) => f.endsWith('.json'))
  return files.map((f) => {
    const data = JSON.parse(fs.readFileSync(path.join(BLOG_DIR, f), 'utf-8'))
    return data
  })
}

function buildLinkMap(posts) {
  const linkMap = []

  for (const post of posts) {
    const slug = post.slug

    const titlePhrases = extractTitlePhrases(post.title)
    for (const phrase of titlePhrases) {
      linkMap.push({ anchor: phrase, slug, priority: 3 })
    }

    const categoryAnchors = getCategoryAnchors(post)
    for (const anchor of categoryAnchors) {
      linkMap.push({ anchor, slug, priority: 2 })
    }

    for (const tag of post.tags.slice(0, 4)) {
      if (tag.length > 5 && tag.length < 40) {
        linkMap.push({ anchor: tag.toLowerCase(), slug, priority: 1 })
      }
    }
  }

  linkMap.sort((a, b) => b.anchor.length - a.anchor.length)
  return linkMap
}

function extractTitlePhrases(title) {
  const phrases = []
  const clean = title
    .replace(/[:()\[\]|]/g, ' ')
    .replace(/\b(complete|guide|2026|2027|expert)\b/gi, '')
    .replace(/\s+/g, ' ')
    .trim()

  const words = clean.split(' ').filter((w) => w.length > 2)
  if (words.length >= 3) {
    for (let len = Math.min(5, words.length); len >= 3; len--) {
      for (let i = 0; i <= words.length - len; i++) {
        const chunk = words.slice(i, i + len).join(' ')
        if (chunk.length >= 15 && chunk.length <= 60) {
          phrases.push(chunk.toLowerCase())
        }
      }
    }
  }

  return phrases.slice(0, 3)
}

function getCategoryAnchors(post) {
  const title = post.title.toLowerCase()
  const anchors = []

  if (post.category === 'product-guide') {
    if (title.includes('sunflower')) anchors.push('refined sunflower oil', 'sunflower oil specifications')
    if (title.includes('palm')) anchors.push('palm oil grades', 'crude palm oil', 'RBD palm oil')
    if (title.includes('canola')) anchors.push('non-GMO canola oil', 'canola oil bulk')
    if (title.includes('soybean')) anchors.push('refined soybean oil', 'soybean oil supplier')
    if (title.includes('uco') || title.includes('used cooking')) anchors.push('used cooking oil', 'UCO for biodiesel')
    if (title.includes('frying') || title.includes('high oleic')) anchors.push('industrial frying oil', 'high oleic oil')
  }

  if (post.category === 'buying-guide') {
    if (title.includes('supplier')) anchors.push('bulk cooking oil supplier', 'wholesale oil supplier')
    if (title.includes('price') || title.includes('cost')) anchors.push('bulk cooking oil prices', 'oil pricing factors')
    if (title.includes('certificate') || title.includes('coa')) anchors.push('certificate of analysis', 'oil quality specifications')
    if (title.includes('vs') || title.includes('comparison')) anchors.push('cooking oil comparison', 'best bulk oil')
  }

  if (post.category === 'shipping') {
    if (title.includes('flexitank') || title.includes('ibc')) anchors.push('flexitank shipping', 'IBC tote shipping', 'oil container options')
    if (title.includes('documentation')) anchors.push('shipping documentation edible oil', 'export documents')
    if (title.includes('cif') || title.includes('fob')) anchors.push('CIF vs FOB', 'incoterms edible oil')
  }

  if (post.category === 'market-insight') {
    if (title.includes('trend')) anchors.push('edible oil market trends', 'cooking oil price forecast')
    if (title.includes('ukraine')) anchors.push('Ukraine sunflower oil supply', 'sunflower oil shortage')
    if (title.includes('palm oil price')) anchors.push('palm oil price drivers', 'RSPO premium')
  }

  if (post.category === 'sustainability') {
    if (title.includes('rspo')) anchors.push('RSPO certification', 'sustainable palm oil')
    if (title.includes('organic')) anchors.push('EU organic certification', 'organic cooking oil')
  }

  if (post.category === 'regulation') {
    if (title.includes('iso')) anchors.push('ISO 22000 certification', 'food safety management')
    if (title.includes('eudr') || title.includes('deforestation')) anchors.push('EU Deforestation Regulation', 'EUDR compliance')
  }

  if (post.category === 'comparison') {
    if (title.includes('palm') && title.includes('sunflower')) anchors.push('palm oil vs sunflower oil', 'cooking oil comparison')
    if (title.includes('soybean') && title.includes('canola')) anchors.push('soybean oil vs canola oil', 'cheapest bulk cooking oil')
  }

  return anchors
}

const SITE_PAGE_LINKS = [
  { anchor: 'browse our product catalog', url: '/products', contexts: ['oil', 'product', 'grade', 'specification'] },
  { anchor: 'request a quote', url: '/quote', contexts: ['price', 'cost', 'buy', 'order', 'bulk'] },
  { anchor: 'contact our team', url: '/contact', contexts: ['help', 'question', 'assist', 'support'] },
  { anchor: 'view our full catalog', url: '/products', contexts: ['available', 'range', 'selection', 'supply'] },
  { anchor: 'frequently asked questions', url: '/faq', contexts: ['question', 'common', 'faq'] },
]

function computeRelatedSlugs(currentPost, allPosts) {
  const scores = []

  for (const other of allPosts) {
    if (other.slug === currentPost.slug) continue

    let score = 0

    if (other.category === currentPost.category) score += 3

    const currentTags = new Set(currentPost.tags.map((t) => t.toLowerCase()))
    for (const tag of other.tags.map((t) => t.toLowerCase())) {
      if (currentTags.has(tag)) score += 2
    }

    const currentKw = new Set(currentPost.keywords.map((k) => k.toLowerCase()))
    for (const kw of other.keywords.map((k) => k.toLowerCase())) {
      if (currentKw.has(kw)) score += 1
    }

    const oils = ['sunflower', 'palm', 'canola', 'soybean', 'rapeseed', 'corn', 'olive', 'uco', 'used cooking']
    for (const oil of oils) {
      if (currentPost.title.toLowerCase().includes(oil) && other.title.toLowerCase().includes(oil)) {
        score += 4
      }
    }

    if (score > 0) scores.push({ slug: other.slug, score })
  }

  scores.sort((a, b) => b.score - a.score)
  return scores.slice(0, 5).map((s) => s.slug)
}

function insertLinkSafely(html, anchorText, href) {
  const forbiddenTags = ['a', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'strong', 'th', 'button', 'script']
  let tagStack = []
  let current = ''
  let i = 0

  while (i < html.length) {
    if (html[i] === '<') {
      const tagEnd = html.indexOf('>', i)
      if (tagEnd === -1) { current += html[i]; i++; continue }
      const tagContent = html.substring(i, tagEnd + 1)

      const closingMatch = tagContent.match(/^<\/(\w+)/)
      const openingMatch = tagContent.match(/^<(\w+)/)

      if (closingMatch) {
        const tagName = closingMatch[1].toLowerCase()
        if (forbiddenTags.includes(tagName)) tagStack = tagStack.filter((t) => t !== tagName)
      } else if (openingMatch) {
        const tagName = openingMatch[1].toLowerCase()
        if (forbiddenTags.includes(tagName) && !tagContent.endsWith('/>')) tagStack.push(tagName)
      }

      current += tagContent
      i = tagEnd + 1
      continue
    }

    if (tagStack.length > 0) { current += html[i]; i++; continue }

    const remaining = html.substring(i)
    const regex = new RegExp(`^${escapeRegex(anchorText)}`, 'i')
    const match = remaining.match(regex)

    if (match) {
      const charBefore = i > 0 ? html[i - 1] : ' '
      const charAfter = html[i + match[0].length] || ' '
      const isBoundaryBefore = /[\s,.:;!?()>"'\-\/]/.test(charBefore) || charBefore === '>'
      const isBoundaryAfter = /[\s,.:;!?()<"'\-\/]/.test(charAfter) || charAfter === '<'

      if (isBoundaryBefore && isBoundaryAfter) {
        current += `<a href="${href}">${match[0]}</a>`
        i += match[0].length
        current += html.substring(i)
        return { content: current, changed: true }
      }
    }

    current += html[i]
    i++
  }

  return { content: current, changed: false }
}

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function stripExistingInternalLinks(html) {
  return html.replace(/<a\s+href="\/(blog|products|contact|quote|faq|about)[^"]*"[^>]*>(.*?)<\/a>/gi, '$2')
}

function injectInternalLinks(post, linkMap) {
  let content = post.content
  const usedTargets = new Set()
  let linkCount = 0

  for (const entry of linkMap) {
    if (linkCount >= MAX_LINKS_PER_POST - SITE_PAGES_MAX) break
    if (entry.slug === post.slug) continue
    if (usedTargets.has(entry.slug)) continue
    if (entry.anchor.length < 8) continue

    const result = insertLinkSafely(content, entry.anchor, `/blog/${entry.slug}`)
    if (result.changed) {
      content = result.content
      usedTargets.add(entry.slug)
      linkCount++
    }
  }

  let siteLinksAdded = 0
  for (const siteLink of SITE_PAGE_LINKS) {
    if (siteLinksAdded >= SITE_PAGES_MAX) break
    if (linkCount >= MAX_LINKS_PER_POST) break

    const contentLower = content.toLowerCase()
    const isRelevant = siteLink.contexts.some((ctx) => contentLower.includes(ctx))
    if (!isRelevant) continue
    if (content.includes(`href="${siteLink.url}"`)) continue

    const result = insertLinkSafely(content, siteLink.anchor, siteLink.url)
    if (result.changed) {
      content = result.content
      siteLinksAdded++
      linkCount++
    }
  }

  return content
}

function main() {
  const posts = loadAllPosts()
  if (posts.length === 0) {
    console.log('No blog posts found. Generate some first.')
    return
  }
  console.log(`Loaded ${posts.length} blog posts`)

  const linkMap = buildLinkMap(posts)
  console.log(`Built link map with ${linkMap.length} anchor entries`)

  let totalLinksInjected = 0
  let postsModified = 0

  for (const post of posts) {
    let cleanContent = stripExistingInternalLinks(post.content)
    const newContent = injectInternalLinks({ ...post, content: cleanContent }, linkMap)
    const relatedSlugs = computeRelatedSlugs(post, posts)

    const newLinkCount = (newContent.match(/<a href="\//g) || []).length
    const oldLinkCount = (cleanContent.match(/<a href="\//g) || []).length
    const addedLinks = newLinkCount - oldLinkCount

    if (addedLinks > 0 || JSON.stringify(relatedSlugs) !== JSON.stringify(post.relatedSlugs)) {
      post.content = newContent
      post.relatedSlugs = relatedSlugs
      const filePath = path.join(BLOG_DIR, `${post.slug}.json`)
      fs.writeFileSync(filePath, JSON.stringify(post, null, 2) + '\n')
      totalLinksInjected += addedLinks
      postsModified++
      console.log(`  + ${post.slug}: +${addedLinks} links, ${relatedSlugs.length} related`)
    }
  }

  console.log(`\nDone! Modified ${postsModified}/${posts.length} posts, injected ${totalLinksInjected} internal links`)
}

main()
