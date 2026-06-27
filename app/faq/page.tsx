import type { Metadata } from 'next'
import Link from 'next/link'
import { Container } from '@/components/layout/container'

export const metadata: Metadata = {
  title: 'Frequently Asked Questions — Bulk Cooking Oil Supply',
  description:
    'Common questions about Olea Wholesale bulk cooking oil supply, certifications, shipping, minimum orders, and pricing. ISO 22000 certified supplier serving 40+ countries.',
  alternates: { canonical: 'https://www.megatitulocomercio.com/faq' },
}

const faqs = [
  {
    question: 'What types of cooking oils do you supply?',
    answer:
      'We supply a full range of industrial-grade cooking oils including refined sunflower oil, non-GMO canola oil, refined soybean oil, crude and refined palm oil, corn oil, rapeseed oil, and used cooking oil (UCO) for biodiesel. All products are available in bulk quantities.',
  },
  {
    question: 'What is your minimum order quantity (MOQ)?',
    answer:
      'Minimum order quantities vary by product but typically start at 1,000 liters. For pallet-based products such as our canola oil, minimum orders start at 48 x 20L containers. Contact our sales team for specific MOQs for each product.',
  },
  {
    question: 'What certifications do your products carry?',
    answer:
      'Our products are certified under ISO 22000 (Food Safety Management), EU Organic standards, RSPO (Roundtable on Sustainable Palm Oil), and Non-GMO Project Verified, depending on the specific product. Each product listing details its applicable certifications.',
  },
  {
    question: 'Which countries do you ship to?',
    answer:
      'We serve industrial buyers across 40+ countries worldwide. Our logistics network covers major ports in Europe, the Middle East, Africa, and the Americas. Shipping is arranged CIF or FOB depending on your preference.',
  },
  {
    question: 'What container options are available?',
    answer:
      'We offer flexible packaging including 200L steel drums, 1,000L IBC totes, 20,000L flexitanks, and full ISO tank containers. The optimal container depends on your order volume and storage capabilities.',
  },
  {
    question: 'What are typical lead times?',
    answer:
      'Standard lead times range from 7 to 21 days depending on the product, origin country, and destination port. We maintain strategic stock positions to minimize delivery times for our most popular products.',
  },
  {
    question: 'How is pricing determined?',
    answer:
      'Pricing is based on current global commodity markets, order volume, selected container type, and shipping logistics. We offer volume-based pricing tiers — larger orders receive better per-liter rates. All prices are quoted in USD and confirmed via formal quotation.',
  },
  {
    question: 'How do you ensure product quality?',
    answer:
      'Every batch undergoes independent laboratory testing before shipment. We verify free fatty acid levels, peroxide values, moisture content, and other key specifications against international food safety standards. Full certificates of analysis (COA) accompany each shipment.',
  },
  {
    question: 'What shipping documents do you provide?',
    answer:
      'We provide a complete documentation package including Bill of Lading, Certificate of Origin, Certificate of Analysis (COA), Phytosanitary Certificate, Packing List, and Commercial Invoice. Additional documentation can be arranged upon request.',
  },
  {
    question: 'How do I request a quote?',
    answer:
      'You can request a quote through our online quote form, via WhatsApp at +351 917 379 662, or by emailing infomegatitulocomerciotradelda@gmail.com. Please include the product, quantity, destination port, and preferred container type for the most accurate pricing.',
  },
]

const faqJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((faq) => ({
    '@type': 'Question',
    name: faq.question,
    acceptedAnswer: {
      '@type': 'Answer',
      text: faq.answer,
    },
  })),
}

export default function FAQPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }}
      />
      <section className="py-16 md:py-24">
        <Container className="max-w-3xl">
          <p className="mb-3 font-label text-label-md uppercase tracking-widest text-secondary">
            Support
          </p>
          <h1 className="mb-4 text-display-lg text-on-surface">
            Frequently Asked Questions
          </h1>
          <p className="mb-12 text-body-lg text-on-surface-variant">
            Everything you need to know about ordering bulk cooking oils from Olea Wholesale.
          </p>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <details
                key={index}
                className="group rounded-xl border border-outline-variant bg-surface-container-lowest"
              >
                <summary className="cursor-pointer px-6 py-5 text-headline-md text-on-surface transition-colors hover:text-secondary [&::-webkit-details-marker]:hidden">
                  <span className="flex items-center justify-between">
                    {faq.question}
                    <span className="ml-4 shrink-0 text-outline transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <div className="border-t border-outline-variant/50 px-6 py-5">
                  <p className="text-body-lg leading-relaxed text-on-surface-variant">
                    {faq.answer}
                  </p>
                </div>
              </details>
            ))}
          </div>

          <div className="mt-16 rounded-2xl bg-primary-container px-8 py-12 text-center">
            <h2 className="text-headline-lg text-on-primary">
              Still have questions?
            </h2>
            <p className="mx-auto mt-3 max-w-md text-body-lg text-on-primary-container">
              Our team is ready to help with any specific requirements for your operation.
            </p>
            <div className="mt-6 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
              <Link
                href="/contact"
                className="inline-block rounded-lg bg-secondary px-6 py-3 text-label-md text-on-secondary transition-opacity hover:opacity-90"
              >
                Contact Us
              </Link>
              <Link
                href="/quote"
                className="inline-block rounded-lg border border-outline-variant bg-surface-container-lowest px-6 py-3 text-label-md text-on-surface transition-colors hover:bg-surface-variant"
              >
                Request a Quote
              </Link>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
