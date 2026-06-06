import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getPostBySlug, getAllSlugs, getRelatedPosts } from '@/lib/blog'
import { blogPostingSchema, blogFaqSchema, blogBreadcrumbSchema } from '@/lib/blog/schema'
import { BLOG_CATEGORIES } from '@/types/blog'
import { Container } from '@/components/layout/container'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://www.megatitulocomercio.com'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) return {}

  return {
    title: post.seoTitle,
    description: post.seoDescription,
    keywords: post.keywords,
    authors: [{ name: post.author.name }],
    alternates: { canonical: `${SITE_URL}/blog/${post.slug}` },
    openGraph: {
      title: post.seoTitle,
      description: post.seoDescription,
      url: `${SITE_URL}/blog/${post.slug}`,
      siteName: 'Olea Wholesale',
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      section: BLOG_CATEGORIES[post.category]?.label,
      tags: post.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: post.seoTitle,
      description: post.seoDescription,
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)
  if (!post) notFound()

  const relatedPosts = getRelatedPosts(slug, 3)
  const postSchema = blogPostingSchema(post)
  const breadcrumbSchema = blogBreadcrumbSchema(post)
  const faqSchema = post.faqItems ? blogFaqSchema(post.faqItems) : null

  const categoryInfo = BLOG_CATEGORIES[post.category]

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(postSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article className="py-8 md:py-16">
        <Container className="max-w-3xl">
          {/* Breadcrumbs */}
          <nav aria-label="Breadcrumb" className="mb-6 text-label-sm text-on-surface-variant">
            <ol className="flex items-center gap-1.5">
              <li>
                <Link href="/" className="transition-colors hover:text-on-surface">Home</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li>
                <Link href="/blog" className="transition-colors hover:text-on-surface">Blog</Link>
              </li>
              <li aria-hidden="true">/</li>
              <li className="truncate max-w-xs text-on-surface">{post.title}</li>
            </ol>
          </nav>

          {/* Header */}
          <header className="mb-10">
            <span className="mb-3 inline-block font-label text-[11px] uppercase tracking-widest text-secondary">
              {categoryInfo?.label || post.category}
            </span>
            <h1 className="text-display-lg text-on-surface leading-tight">
              {post.title}
            </h1>
            <p className="mt-4 text-body-lg text-on-surface-variant">{post.excerpt}</p>

            <div className="mt-6 flex items-center gap-4 text-label-sm text-on-surface-variant">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-container text-label-sm font-semibold text-on-surface">
                  {post.author.name.split(' ').map((n) => n[0]).join('')}
                </div>
                <div>
                  <p className="font-medium text-on-surface">{post.author.name}</p>
                  <p className="text-[11px]">{post.author.title}</p>
                </div>
              </div>
              <span aria-hidden="true">|</span>
              <time dateTime={post.publishedAt}>
                {new Date(post.publishedAt).toLocaleDateString('en-US', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span aria-hidden="true">|</span>
              <span>{post.readingTime} min read</span>
            </div>
          </header>

          {/* TLDR */}
          {post.tldr && (
            <div
              className="article-tldr mb-10 rounded-xl border border-secondary-container bg-secondary-container/20 p-5"
              data-speakable
            >
              <p className="mb-1 font-label text-label-md uppercase tracking-wider text-secondary">
                Key Takeaway
              </p>
              <p className="text-body-md leading-relaxed text-on-surface-variant">{post.tldr}</p>
            </div>
          )}

          {/* Article Body */}
          <div
            className="prose prose-lg max-w-none
              prose-headings:text-on-surface prose-headings:font-semibold
              prose-a:text-secondary prose-a:no-underline hover:prose-a:underline
              prose-strong:text-on-surface
              prose-table:border-collapse prose-th:bg-surface-container prose-th:p-3 prose-td:p-3
              prose-th:text-left prose-th:font-semibold prose-th:text-on-surface
              prose-tr:border-b prose-tr:border-outline-variant"
            dangerouslySetInnerHTML={{ __html: post.content }}
          />

          {/* FAQ Section */}
          {post.faqItems && post.faqItems.length > 0 && (
            <section className="mt-16" data-speakable>
              <h2 className="mb-6 text-headline-lg text-on-surface">
                Frequently Asked Questions
              </h2>
              <div className="space-y-4">
                {post.faqItems.map((faq, i) => (
                  <div key={i} className="rounded-xl border border-outline-variant p-5">
                    <h3 className="font-semibold text-on-surface">{faq.question}</h3>
                    <p className="mt-2 text-body-md leading-relaxed text-on-surface-variant">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Tags */}
          {post.tags.length > 0 && (
            <div className="mt-10 border-t border-outline-variant pt-6">
              <div className="flex flex-wrap gap-2">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-surface-container px-3 py-1 text-label-sm text-on-surface-variant"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Author Bio */}
          <div className="mt-10 rounded-xl bg-surface-container-low p-6">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-surface-container text-on-surface font-semibold">
                {post.author.name.split(' ').map((n) => n[0]).join('')}
              </div>
              <div>
                <p className="font-semibold text-on-surface">{post.author.name}</p>
                <p className="text-label-sm text-on-surface-variant">{post.author.title}</p>
                <p className="mt-2 text-body-md leading-relaxed text-on-surface-variant">{post.author.bio}</p>
              </div>
            </div>
          </div>

          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <section className="mt-16">
              <h2 className="mb-6 text-headline-lg text-on-surface">Related Articles</h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    href={`/blog/${related.slug}`}
                    className="group rounded-xl border border-outline-variant p-5 transition-shadow hover:shadow-md"
                  >
                    <span className="text-[11px] font-semibold uppercase tracking-wider text-secondary">
                      {BLOG_CATEGORIES[related.category]?.label}
                    </span>
                    <h3 className="mt-1 font-semibold text-on-surface transition-colors group-hover:text-secondary line-clamp-2">
                      {related.title}
                    </h3>
                    <p className="mt-1 text-label-sm text-on-surface-variant">
                      {new Date(related.publishedAt).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </p>
                  </Link>
                ))}
              </div>
            </section>
          )}
        </Container>
      </article>

      {/* CTA */}
      <section className="pb-20">
        <Container className="max-w-3xl">
          <div className="rounded-2xl bg-primary-container px-8 py-12 text-center">
            <h2 className="text-headline-lg text-on-primary">
              Need Bulk Cooking Oils?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-body-lg text-on-primary-container">
              Get competitive pricing on premium-grade oils delivered to your facility.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/quote"
                className="inline-block rounded-lg bg-secondary px-6 py-3 text-label-md text-on-secondary transition-opacity hover:opacity-90"
              >
                Request a Quote
              </Link>
              <Link
                href="/products"
                className="inline-block rounded-lg border border-outline-variant bg-surface-container-lowest px-6 py-3 text-label-md text-on-surface transition-colors hover:bg-surface-variant"
              >
                View Catalog
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
