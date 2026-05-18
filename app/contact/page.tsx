import type { Metadata } from 'next'
import { MapPin, Mail, Phone } from 'lucide-react'
import { Container } from '@/components/layout/container'
import { ContactForm } from '@/components/forms/contact-form'

export const metadata: Metadata = {
  title: 'Contact Us',
  description:
    'Get in touch with Olea Wholesale. Reach our team for partnership inquiries, press, careers, or general questions.',
}

const localBusinessJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'LocalBusiness',
  name: 'Olea Wholesale Corp.',
  url: 'https://www.megatitulocomercio.com',
  telephone: '+351917379662',
  email: 'sales@olea-wholesale.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Centro Empresas Elospark, R. Cruz 75 Ed. 1',
    postalCode: '2725-193',
    addressLocality: 'Algueirão-Mem Martins',
    addressCountry: 'PT',
  },
  vatID: 'PT509913423',
  openingHours: 'Mo-Fr 09:00-18:00',
}

export default function ContactPage() {
  return (
    <section className="py-12 md:py-16">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessJsonLd) }}
      />
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_380px]">
          {/* Form */}
          <div>
            <h1 className="mb-3 text-display-lg text-on-surface">Contact Us</h1>
            <p className="mb-8 text-body-lg text-on-surface-variant">
              Have a question or want to explore a partnership? We&apos;d love to hear from you.
            </p>
            <ContactForm />
          </div>

          {/* Contact info sidebar */}
          <aside className="space-y-6 lg:mt-24">
            <div className="rounded-xl border border-outline-variant bg-surface-container-lowest p-6">
              <h3 className="mb-4 font-label text-label-md uppercase tracking-wider text-on-surface">
                Get in Touch
              </h3>

              <div className="space-y-4">
                <a
                  href="https://wa.me/351917379662"
                  className="flex items-start gap-3 text-body-md text-on-surface-variant transition-colors hover:text-on-surface"
                >
                  <Phone className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" strokeWidth={1.5} />
                  <div>
                    <p className="font-medium text-on-surface">+351 917 379 662 (WhatsApp)</p>
                    <p className="text-label-sm">Mon-Fri, 9:00-18:00 WET</p>
                  </div>
                </a>

                <a
                  href="mailto:sales@olea-wholesale.com"
                  className="flex items-start gap-3 text-body-md text-on-surface-variant transition-colors hover:text-on-surface"
                >
                  <Mail className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" strokeWidth={1.5} />
                  <div>
                    <p className="font-medium text-on-surface">sales@olea-wholesale.com</p>
                    <p className="text-label-sm">Response within 1 business day</p>
                  </div>
                </a>

                <div className="flex items-start gap-3 text-body-md text-on-surface-variant">
                  <MapPin className="mt-0.5 h-5 w-5 flex-shrink-0 text-secondary" strokeWidth={1.5} />
                  <div>
                    <p className="font-medium text-on-surface">Olea Wholesale Corp.</p>
                    <p className="text-label-sm">Centro Empresas Elospark</p>
                    <p className="text-label-sm">R. Cruz 75 Ed. 1</p>
                    <p className="text-label-sm">2725-193 Algueirão-Mem Martins</p>
                    <p className="text-label-sm">Portugal</p>
                    <p className="mt-1 text-label-sm">VAT: PT509913423</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-xl border border-outline-variant bg-surface-container-low p-6">
              <h3 className="mb-2 font-label text-label-md text-on-surface">Business Hours</h3>
              <div className="space-y-1 text-body-md text-on-surface-variant">
                <p>Monday - Friday: 9:00 - 18:00 WET</p>
                <p>Saturday - Sunday: Closed</p>
              </div>
            </div>
          </aside>
        </div>
      </Container>
    </section>
  )
}
