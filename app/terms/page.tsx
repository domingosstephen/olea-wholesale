import type { Metadata } from 'next'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'Olea Wholesale terms of service for website use and business inquiries.',
}

export default function TermsPage() {
  return (
    <section className="py-12 md:py-16">
      <Container className="max-w-3xl">
        <h1 className="mb-8 text-display-lg text-on-surface">Terms of Service</h1>
        <div className="prose prose-lg max-w-none space-y-6 text-body-md leading-relaxed text-on-surface-variant">
          <p>Last updated: June 2026</p>

          <h2 className="text-headline-md text-on-surface">1. Acceptance of Terms</h2>
          <p>By accessing and using the Olea Wholesale website (megatitulocomercio.com), you agree to be bound by these Terms of Service. If you do not agree, please do not use this website.</p>

          <h2 className="text-headline-md text-on-surface">2. Services Description</h2>
          <p>This website provides information about Olea Wholesale&apos;s bulk cooking oil products and services. It allows prospective buyers to browse our product catalog and submit inquiries for quotation. This website does not process orders or payments.</p>

          <h2 className="text-headline-md text-on-surface">3. Pricing Information</h2>
          <p>All prices displayed on this website are indicative and for reference purposes only. Actual pricing is subject to confirmation via formal quotation. Prices are influenced by global commodity markets, order volume, shipping logistics, and other factors. Final pricing will be confirmed in a formal quote or proforma invoice.</p>

          <h2 className="text-headline-md text-on-surface">4. Inquiry Submissions</h2>
          <p>By submitting an inquiry through our forms, you represent that the information provided is accurate and that you have authority to act on behalf of the company named. Submitting an inquiry does not constitute a binding order or contract.</p>

          <h2 className="text-headline-md text-on-surface">5. Intellectual Property</h2>
          <p>All content on this website, including text, images, logos, and design elements, is the property of Olea Wholesale Corp. and is protected by applicable intellectual property laws.</p>

          <h2 className="text-headline-md text-on-surface">6. Limitation of Liability</h2>
          <p>Olea Wholesale Corp. shall not be liable for any indirect, incidental, or consequential damages arising from the use of this website or reliance on information provided herein.</p>

          <h2 className="text-headline-md text-on-surface">7. Governing Law</h2>
          <p>These terms shall be governed by and construed in accordance with the laws of Portugal. Any disputes shall be subject to the exclusive jurisdiction of the courts of Lisbon, Portugal.</p>

          <h2 className="text-headline-md text-on-surface">8. Contact</h2>
          <p>For questions about these terms, contact:</p>
          <p>Olea Wholesale Corp.<br />Centro Empresas Elospark, R. Cruz 75 Ed. 1<br />2725-193 Algueirão-Mem Martins, Portugal<br />VAT: PT509913423<br />Email: sales@olea-wholesale.com<br />Phone: +351 917 379 662</p>
        </div>
      </Container>
    </section>
  )
}
