/**
 * Topic Selector — Picks the best topics for the next generation run.
 */

import fs from 'fs'
import path from 'path'
import { TOPIC_CLUSTERS, GENERATION_CONFIG } from './config'
import type { TopicSeed } from './config'
import type { BlogCategory } from '../../types/blog'
import { getPublishedTopics } from './publisher'

const ADDON_FILE = path.join(process.cwd(), 'scripts', 'blog-engine', 'addon-topics.json')
const CONTROL_FILE = path.join(process.cwd(), 'scripts', 'blog-engine', 'control.json')

interface ScoredTopic {
  topic: TopicSeed
  category: BlogCategory
  score: number
}

interface Control {
  engine: { enabled: boolean; articlesPerRun: number }
  categories: Record<string, { enabled: boolean; priority: string }>
}

function loadControl(): Control {
  if (!fs.existsSync(CONTROL_FILE)) {
    return {
      engine: { enabled: true, articlesPerRun: 1 },
      categories: {},
    }
  }
  return JSON.parse(fs.readFileSync(CONTROL_FILE, 'utf-8'))
}

function loadAddonTopics(): { topic: TopicSeed; category: BlogCategory }[] {
  if (!fs.existsSync(ADDON_FILE)) return []
  const data = JSON.parse(fs.readFileSync(ADDON_FILE, 'utf-8'))
  return data.map((item: { category: BlogCategory; topic: TopicSeed }) => ({
    topic: item.topic,
    category: item.category,
  }))
}

export function selectTopics(count?: number): { topic: TopicSeed; category: BlogCategory }[] {
  const control = loadControl()

  if (!control.engine.enabled) {
    console.log('Blog engine is PAUSED. Set "enabled": true in control.json to resume.')
    return []
  }

  const numTopics = count || control.engine.articlesPerRun || GENERATION_CONFIG.articlesPerRun
  const published = getPublishedTopics()

  const allTopics: { topic: TopicSeed; category: BlogCategory }[] = []

  for (const cluster of TOPIC_CLUSTERS) {
    for (const topic of cluster.topics) {
      allTopics.push({ topic, category: cluster.category })
    }
  }

  const addonTopics = loadAddonTopics()
  allTopics.push(...addonTopics)

  const available = allTopics.filter(({ topic, category }) => {
    if (published.includes(topic.title)) return false
    const catConfig = control.categories[category]
    if (catConfig && !catConfig.enabled) return false
    return true
  })

  if (available.length === 0) return []

  const scored: ScoredTopic[] = available.map(({ topic, category }) => {
    let score = 0

    score += (4 - topic.priority) * 10

    const catConfig = control.categories[category]
    if (catConfig) {
      if (catConfig.priority === 'high') score += 10
      else if (catConfig.priority === 'medium') score += 5
    }

    if (topic.searchIntent === 'informational') score += 8
    if (topic.searchIntent === 'commercial') score += 10

    score += topic.aiQueryTargets.length * 3
    score += Math.min(topic.secondaryKeywords.length, 5) * 2

    const publishedInCategory = published.filter((title) =>
      allTopics.some((t) => t.category === category && t.topic.title === title)
    ).length
    score += Math.max(0, 10 - publishedInCategory * 2)

    score += Math.random() * 5

    return { topic, category, score }
  })

  scored.sort((a, b) => b.score - a.score)

  const selected: ScoredTopic[] = []
  const categoryCount: Record<string, number> = {}

  for (const item of scored) {
    if (selected.length >= numTopics) break
    const catCount = categoryCount[item.category] || 0
    if (catCount >= 2) continue
    selected.push(item)
    categoryCount[item.category] = catCount + 1
  }

  return selected.map(({ topic, category }) => ({ topic, category }))
}

export function getTopicStats() {
  const published = getPublishedTopics()
  const configTopics = TOPIC_CLUSTERS.reduce((sum, c) => sum + c.topics.length, 0)
  const addonTopics = loadAddonTopics().length
  const totalTopics = configTopics + addonTopics

  const byCategory: Record<string, { total: number; published: number }> = {}

  for (const cluster of TOPIC_CLUSTERS) {
    const pubCount = cluster.topics.filter((t) => published.includes(t.title)).length
    byCategory[cluster.category] = {
      total: cluster.topics.length,
      published: pubCount,
    }
  }

  for (const { category } of loadAddonTopics()) {
    if (!byCategory[category]) {
      byCategory[category] = { total: 0, published: 0 }
    }
    byCategory[category].total++
  }

  const control = loadControl()
  const articlesPerRun = control.engine.articlesPerRun || GENERATION_CONFIG.articlesPerRun

  return {
    totalTopics,
    configTopics,
    addonTopics,
    publishedCount: published.length,
    remaining: totalTopics - published.length,
    byCategory,
    weeksOfContentLeft: totalTopics - published.length, // 1 article per week
    engineEnabled: control.engine.enabled,
    articlesPerRun,
  }
}
