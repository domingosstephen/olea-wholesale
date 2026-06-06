#!/usr/bin/env npx tsx
/**
 * Blog Engine Runner — Main entry point for automated blog generation.
 *
 * Usage:
 *   npx tsx scripts/blog-engine/run.ts              # Generate 1 article (weekly cadence)
 *   npx tsx scripts/blog-engine/run.ts --count 2    # Generate 2 articles
 *   npx tsx scripts/blog-engine/run.ts --stats      # Show topic coverage stats
 *   npx tsx scripts/blog-engine/run.ts --dry-run    # Show what would be generated
 *
 * Environment:
 *   ANTHROPIC_API_KEY or OPENAI_API_KEY must be set.
 */

import { selectTopics, getTopicStats } from './topic-selector'
import { generateArticle } from './generator'
import { publishPost, markPublished, getPostCount } from './publisher'

const args = process.argv.slice(2)
const isDryRun = args.includes('--dry-run')
const isStats = args.includes('--stats')
const countIdx = args.indexOf('--count')
const count = countIdx !== -1 ? parseInt(args[countIdx + 1], 10) : undefined

if (isStats) {
  const stats = getTopicStats()
  console.log('\n📊 Olea Blog Engine — Topic Coverage Stats\n')
  console.log(`Engine status:           ${stats.engineEnabled ? '🟢 ACTIVE' : '🔴 PAUSED'}`)
  console.log(`Articles per run:        ${stats.articlesPerRun}`)
  console.log(`Total topics (config):   ${stats.configTopics}`)
  console.log(`Total topics (research): ${stats.addonTopics}`)
  console.log(`Already published:       ${stats.publishedCount}`)
  console.log(`Remaining:               ${stats.remaining}`)
  console.log(`Weeks of content left:   ~${stats.weeksOfContentLeft} weeks\n`)
  console.log('By category:')
  for (const [cat, data] of Object.entries(stats.byCategory)) {
    const bar = '█'.repeat(data.published) + '░'.repeat(data.total - data.published)
    console.log(`  ${cat.padEnd(18)} ${bar} ${data.published}/${data.total}`)
  }
  console.log(`\nExisting blog posts: ${getPostCount()}`)
  process.exit(0)
}

async function main() {
  console.log('\n🚀 Olea Wholesale Blog Engine — Starting generation run\n')

  const topics = selectTopics(count)

  if (topics.length === 0) {
    console.log('No topics available. All configured topics have been published.')
    process.exit(0)
  }

  console.log(`Selected ${topics.length} topic(s) for generation:\n`)
  topics.forEach(({ topic, category }, i) => {
    console.log(`  ${i + 1}. [${category}] ${topic.title}`)
    console.log(`     Primary keyword: "${topic.primaryKeyword}"`)
    console.log(`     Priority: ${topic.priority} | Intent: ${topic.searchIntent}`)
    console.log()
  })

  if (isDryRun) {
    console.log('(Dry run — no articles generated)\n')
    process.exit(0)
  }

  const results: { title: string; slug: string; success: boolean }[] = []

  for (const { topic, category } of topics) {
    console.log(`\n📝 Generating: "${topic.title}"...`)

    try {
      const post = await generateArticle(topic, category)
      const filePath = publishPost(post)
      markPublished(topic.title)

      console.log(`   ✅ Published: ${post.slug}`)
      console.log(`   📄 File: ${filePath}`)
      console.log(`   📊 Words: ~${post.content.replace(/<[^>]*>/g, '').split(/\s+/).length}`)

      results.push({ title: post.title, slug: post.slug, success: true })
    } catch (error) {
      const msg = error instanceof Error ? error.message : String(error)
      console.error(`   ❌ Failed: ${msg}`)
      results.push({ title: topic.title, slug: '', success: false })
    }

    // Delay between API calls
    if (topics.length > 1) {
      await new Promise((r) => setTimeout(r, 2000))
    }
  }

  console.log('\n' + '═'.repeat(60))
  console.log('📋 Generation Summary\n')
  const succeeded = results.filter((r) => r.success)
  const failed = results.filter((r) => !r.success)
  console.log(`  Succeeded: ${succeeded.length}`)
  console.log(`  Failed:    ${failed.length}`)
  console.log(`  Total posts now: ${getPostCount()}\n`)

  const stats = getTopicStats()
  console.log(`  Topics remaining: ${stats.remaining}`)
  console.log(`  Weeks of content: ~${stats.weeksOfContentLeft}`)
  console.log()

  if (succeeded.length === 0) process.exit(1)
}

main().catch((err) => {
  console.error('Fatal error:', err)
  process.exit(1)
})
