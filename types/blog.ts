/**
 * Blog post types for the automated content engine.
 */

export interface BlogAuthor {
  name: string
  title: string
  bio: string
  image?: string
}

export interface BlogPost {
  slug: string
  title: string
  seoTitle: string
  seoDescription: string
  excerpt: string
  content: string // HTML content
  category: BlogCategory
  tags: string[]
  keywords: string[]
  author: BlogAuthor
  publishedAt: string // ISO date
  updatedAt: string // ISO date
  image: string
  imageAlt: string
  readingTime: number // minutes
  featured: boolean

  // AEO/GEO fields
  faqItems?: { question: string; answer: string }[]
  tldr?: string // Short summary for AI extraction

  // Internal linking
  relatedSlugs?: string[]
}

export type BlogCategory =
  | 'buying-guide'
  | 'market-insight'
  | 'shipping'
  | 'product-guide'
  | 'industry-news'
  | 'comparison'
  | 'how-to'
  | 'sustainability'
  | 'regulation'

export const BLOG_CATEGORIES: Record<BlogCategory, { label: string; description: string }> = {
  'buying-guide': {
    label: 'Buying Guide',
    description: 'Expert advice on sourcing and procuring bulk cooking oils',
  },
  'market-insight': {
    label: 'Market Insight',
    description: 'Commodity price trends, supply chain analysis, and market forecasts',
  },
  shipping: {
    label: 'Shipping & Logistics',
    description: 'Flexitank, IBC, and container shipping guides for edible oils',
  },
  'product-guide': {
    label: 'Product Guide',
    description: 'Technical specifications, use cases, and oil comparisons',
  },
  'industry-news': {
    label: 'Industry News',
    description: 'Regulatory updates, trade policy changes, and market developments',
  },
  comparison: {
    label: 'Comparison',
    description: 'Side-by-side oil comparisons for industrial applications',
  },
  'how-to': {
    label: 'How-To',
    description: 'Step-by-step guides for oil procurement and quality assurance',
  },
  sustainability: {
    label: 'Sustainability',
    description: 'RSPO, organic certification, and sustainable sourcing practices',
  },
  regulation: {
    label: 'Regulation',
    description: 'Food safety standards, import regulations, and compliance guides',
  },
}
