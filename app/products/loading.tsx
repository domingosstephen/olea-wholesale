import { Container } from '@/components/layout/container'

export default function ProductsLoading() {
  return (
    <section className="py-12 md:py-16">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
          <div className="space-y-6">
            <div className="h-8 w-40 animate-pulse rounded bg-surface-container" />
            <div className="h-4 w-32 animate-pulse rounded bg-surface-container" />
            <div className="space-y-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-5 w-28 animate-pulse rounded bg-surface-container" />
              ))}
            </div>
          </div>
          <div>
            <div className="mb-8">
              <div className="h-12 w-96 animate-pulse rounded bg-surface-container" />
              <div className="mt-3 h-5 w-64 animate-pulse rounded bg-surface-container" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-96 animate-pulse rounded-xl bg-surface-container" />
              ))}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
