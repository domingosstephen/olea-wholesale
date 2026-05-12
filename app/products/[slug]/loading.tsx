import { Container } from '@/components/layout/container'

export default function ProductLoading() {
  return (
    <section className="py-8 md:py-12">
      <Container>
        <div className="mb-6 h-4 w-48 animate-pulse rounded bg-surface-container" />
        <div className="grid gap-12 lg:grid-cols-2">
          <div className="aspect-square animate-pulse rounded-xl bg-surface-container" />
          <div className="space-y-4">
            <div className="h-6 w-24 animate-pulse rounded bg-surface-container" />
            <div className="h-12 w-80 animate-pulse rounded bg-surface-container" />
            <div className="h-5 w-full animate-pulse rounded bg-surface-container" />
            <div className="h-10 w-32 animate-pulse rounded bg-surface-container" />
            <div className="h-64 animate-pulse rounded-xl bg-surface-container" />
          </div>
        </div>
      </Container>
    </section>
  )
}
