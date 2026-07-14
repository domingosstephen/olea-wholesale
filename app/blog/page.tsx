import type { Metadata } from 'next'
import Link from 'next/link'
import { getAllPosts } from '@/lib/blog'
import { blogListSchema } from '@/lib/blog/schema'
import { BLOG_CATEGORIES } from '@/types/blog'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = {
  title: 'Blog — Bulk Cooking Oil Insights & Industry Guides',
  description:
    'Expert guides on bulk cooking oil procurement, market trends, shipping logistics, and food safety standards for industrial buyers and distributors.',
  alternates: { canonical: 'https://www.megatitulocomercio.com/blog' },
}

export default function BlogPage() {
  const posts = getAllPosts()

  return (
    <>
      {posts.length > 0 && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(blogListSchema(posts)) }}
        />
      )}

      <section className="py-16 md:py-24">
        <Container>
          <div className="mb-12">
            <p className="mb-3 font-label text-label-md uppercase tracking-widest text-secondary">
              Insights
            </p>
            <h1 className="text-display-lg text-on-surface">
              Bulk Cooking Oil Insights & Industry Guides
            </h1>
            <p className="mt-3 max-w-2xl text-body-lg text-on-surface-variant">
              Market analysis, procurement guides, and technical resources for industrial oil buyers and food manufacturers.
            </p>
          </div>

          {posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col overflow-hidden rounded-xl border border-outline-variant bg-surface-container-lowest transition-shadow hover:shadow-lg"
                >
                  <div className="p-6 flex flex-col flex-1">
                    <span className="mb-2 inline-block font-label text-[11px] uppercase tracking-widest text-secondary">
                      {BLOG_CATEGORIES[post.category]?.label || post.category}
                    </span>
                    <h2 className="mb-3 text-headline-md text-on-surface transition-colors group-hover:text-secondary">
                      {post.title}
                    </h2>
                    <p className="mb-4 flex-1 text-body-md text-on-surface-variant line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between text-label-sm text-on-surface-variant">
                      <time dateTime={post.publishedAt}>
                        {new Date(post.publishedAt).toLocaleDateString('en-US', {
                          year: 'numeric',
                          month: 'short',
                          day: 'numeric',
                        })}
                      </time>
                      <span>{post.readingTime} min read</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-12 text-center">
              <p className="text-body-lg text-on-surface-variant">
                Our first articles are being prepared. Check back soon for procurement guides, market analysis, and industry insights.
              </p>
            </div>
          )}
        </Container>
      </section>
    </>
  )
}
