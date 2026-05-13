import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Olea Wholesale privacy policy — how we collect, use, and protect your data.',
}

export default function PrivacyPage() {
  return (
    <section className="py-12 md:py-16">
      <Container className="max-w-3xl">
        <h1 className="mb-8 text-display-lg text-on-surface">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none space-y-6 text-body-md leading-relaxed text-on-surface-variant">
          <p className="rounded-xl border border-secondary-container bg-secondary-container/20 px-4 py-3 text-label-md text-on-secondary-container">
            This is placeholder content. Legal review required before launch.
          </p>

          <p>Last updated: January 2025</p>

          <h2 className="text-headline-md text-on-surface">1. Information We Collect</h2>
          <p>When you submit a quote request or contact form on our website, we collect the following information:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Company name and contact name</li>
            <li>Work email address</li>
            <li>Phone number (optional)</li>
            <li>Country</li>
            <li>Product interest and sourcing details</li>
            <li>Any message content you provide</li>
          </ul>
          <p>We also automatically collect technical information including your IP address, browser type, referrer URL, and UTM campaign parameters for analytics purposes.</p>

          <h2 className="text-headline-md text-on-surface">2. How We Use Your Information</h2>
          <p>We use the information collected to:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>Respond to your quote requests and inquiries</li>
            <li>Provide product specifications and pricing information</li>
            <li>Improve our website and services</li>
            <li>Comply with legal obligations</li>
          </ul>

          <h2 className="text-headline-md text-on-surface">3. Data Storage</h2>
          <p>Your data is stored securely using Supabase (PostgreSQL) with row-level security enabled. We do not sell or share your personal information with third parties for marketing purposes.</p>

          <h2 className="text-headline-md text-on-surface">4. Data Retention</h2>
          <p>We retain inquiry data for as long as necessary to fulfill our business relationship. You may request deletion of your data at any time by contacting us at sales@olea-wholesale.com.</p>

          <h2 className="text-headline-md text-on-surface">5. Your Rights</h2>
          <p>You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us at sales@olea-wholesale.com.</p>

          <h2 className="text-headline-md text-on-surface">6. Contact</h2>
          <p>For privacy-related questions, contact:</p>
          <p>Olea Wholesale Corp.<br />Centro Empresas Elospark, R. Cruz 75 Ed. 1<br />2725-193 Algueirão-Mem Martins, Portugal<br />VAT: PT509913423<br />Email: sales@olea-wholesale.com<br />Phone: +351 917 379 662</p>
        </div>
      </Container>
    </section>
  )
}
