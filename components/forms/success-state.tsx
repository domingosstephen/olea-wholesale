import Link from 'next/link'
import { CheckCircle } from 'lucide-react'

interface SuccessStateProps {
  type: 'quote_request' | 'specs_request' | 'contact'
}

const messages = {
  quote_request: {
    title: 'Quote Request Received',
    description: "Thank you for your interest. Our team will review your requirements and respond with a detailed quote within 1 business day.",
  },
  specs_request: {
    title: 'Specs Request Received',
    description: "We'll send you the complete product specifications and technical documentation within 1 business day.",
  },
  contact: {
    title: 'Message Received',
    description: "Thank you for reaching out. Our team will get back to you within 1 business day.",
  },
}

export function SuccessState({ type }: SuccessStateProps) {
  const msg = messages[type]

  return (
    <div className="mx-auto max-w-lg py-16 text-center">
      <CheckCircle className="mx-auto mb-6 h-16 w-16 text-secondary" strokeWidth={1.5} />
      <h2 className="mb-4 text-headline-lg text-on-surface">{msg.title}</h2>
      <p className="mb-6 text-body-lg text-on-surface-variant">{msg.description}</p>

      <div className="mb-8 rounded-xl border border-outline-variant bg-surface-container-low p-6 text-left">
        <h3 className="mb-2 font-label text-label-md text-on-surface">What happens next?</h3>
        <ul className="space-y-2 text-body-md text-on-surface-variant">
          <li>1. Our supply team reviews your submission</li>
          <li>2. We confirm product availability and pricing</li>
          <li>3. You receive a detailed response via email</li>
        </ul>
        <p className="mt-4 text-body-md text-on-surface-variant">
          For urgent inquiries, message us on WhatsApp at{' '}
          <a href="https://wa.me/351917379662" className="font-medium text-secondary hover:underline">
            +351 917 379 662
          </a>
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4">
        <Link
          href="/products"
          className="rounded-lg bg-primary px-6 py-3 text-label-md text-on-primary transition-opacity hover:opacity-90"
        >
          Browse Catalog
        </Link>
        <Link
          href="/"
          className="rounded-lg border border-outline px-6 py-3 text-label-md text-on-surface transition-colors hover:bg-surface-container"
        >
          Back to Home
        </Link>
      </div>
    </div>
  )
}
