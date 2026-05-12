import Link from 'next/link'
import { Container } from '@/components/layout/container'

export default function NotFound() {
  return (
    <Container className="py-24 text-center">
      <h1 className="text-display-lg text-on-surface">404</h1>
      <p className="mt-4 text-body-lg text-on-surface-variant">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-lg bg-primary px-6 py-3 text-label-md text-on-primary transition-opacity hover:opacity-90"
      >
        Back to Home
      </Link>
    </Container>
  )
}
