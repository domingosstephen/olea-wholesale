/**
 * Blog-specific JSON-LD schemas for SEO, AEO, and GEO.
 */

import type { BlogPost } from '@/types/blog'

const SITE_NAME = 'Olea Wholesale'
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.megatitulocomercio.com'

/**
 * BlogPosting schema.
 */
export function blogPostingSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    '@id': `${SITE_URL}/blog/${post.slug}#article`,
    headline: post.seoTitle,
    description: post.seoDescription,
    image: post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
    datePublished: post.publishedAt,
    dateModified: post.updatedAt,
    wordCount: post.content.replace(/<[^>]*>/g, '').split(/\s+/).length,
    timeRequired: `PT${post.readingTime}M`,
    author: {
      '@type': 'Person',
      name: post.author.name,
      jobTitle: post.author.title,
      description: post.author.bio,
      worksFor: {
        '@type': 'Organization',
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    publisher: {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#organization`,
      name: SITE_NAME,
      url: SITE_URL,
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/blog/${post.slug}`,
    },
    keywords: post.keywords.join(', '),
    articleSection: post.category,
    inLanguage: 'en',
    isPartOf: { '@id': `${SITE_URL}/#website` },
    about: {
      '@type': 'Thing',
      name: post.tags[0] || post.category,
    },
    speakable: {
      '@type': 'SpeakableSpecification',
      cssSelector: ['h1', '.article-tldr', '[data-speakable]'],
    },
  }
}

/**
 * FAQ schema for inline FAQ sections.
 */
export function blogFaqSchema(faqItems: { question: string; answer: string }[]) {
  if (!faqItems || faqItems.length === 0) return null

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqItems.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  }
}

/**
 * BreadcrumbList for blog posts.
 */
export function blogBreadcrumbSchema(post: BlogPost) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name: 'Blog', item: `${SITE_URL}/blog` },
      {
        '@type': 'ListItem',
        position: 3,
        name: post.title,
        item: `${SITE_URL}/blog/${post.slug}`,
      },
    ],
  }
}

/**
 * ItemList schema for the blog index page.
 */
export function blogListSchema(posts: BlogPost[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Olea Wholesale Blog — Bulk Cooking Oil Insights & Industry Guides',
    description:
      'Expert guides on bulk cooking oil procurement, shipping logistics, market trends, and food safety standards for industrial buyers.',
    numberOfItems: posts.length,
    url: `${SITE_URL}/blog`,
    itemListElement: posts.slice(0, 20).map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'BlogPosting',
        headline: post.title,
        url: `${SITE_URL}/blog/${post.slug}`,
        datePublished: post.publishedAt,
        image: post.image.startsWith('http') ? post.image : `${SITE_URL}${post.image}`,
        author: {
          '@type': 'Person',
          name: post.author.name,
        },
      },
    })),
  }
}
