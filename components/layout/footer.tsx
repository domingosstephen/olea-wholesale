import Link from 'next/link'
import { Leaf } from 'lucide-react'
import { Container } from './container'

const footerLinks = {
  Standards: [
    { href: '/about', label: 'ISO 22000 Certified' },
    { href: '/about', label: 'Organic Standards' },
    { href: '/about', label: 'Sustainability Report' },
  ],
  Company: [
    { href: '/products', label: 'Products' },
    { href: '/about', label: 'About Us' },
    { href: '/contact', label: 'Contact' },
  ],
  Legal: [
    { href: '/privacy', label: 'Privacy Policy' },
    { href: '/terms', label: 'Terms of Service' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-outline-variant bg-surface-container-lowest">
      <Container className="py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="lg:col-span-2">
            <Link href="/" className="mb-4 flex items-center gap-2">
              <Leaf className="h-6 w-6 text-secondary" />
              <span className="text-xl font-semibold text-on-surface">Olea Wholesale</span>
            </Link>
            <p className="mb-4 max-w-xs text-body-md text-on-surface-variant">
              Industrial excellence in the global supply of premium cooking oils and vegetable fats.
            </p>
            <p className="text-label-sm font-label text-on-surface-variant">
              <a href="https://wa.me/351917379662" className="hover:text-on-surface">
                +351 917 379 662 (WhatsApp)
              </a>
            </p>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 font-label text-label-md uppercase tracking-wider text-on-surface">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-body-md text-on-surface-variant transition-colors hover:text-on-surface"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 border-t border-outline-variant pt-8">
          <p className="text-label-sm text-on-surface-variant">
            &copy; {new Date().getFullYear()} Olea Wholesale Corp. Industrial Excellence in Supply.
          </p>
        </div>
      </Container>
    </footer>
  )
}
