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
      <Container className="py-10 sm:py-16">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-5">
          {/* Brand column */}
          <div className="sm:col-span-2">
            <Link href="/" className="mb-4 inline-flex items-center gap-2">
              <Leaf className="h-5 w-5 text-secondary" />
              <span className="text-lg font-semibold text-on-surface">Olea Wholesale</span>
            </Link>
            <p className="mb-2 max-w-xs text-sm leading-relaxed text-on-surface-variant">
              Industrial excellence in the global supply of premium cooking oils and vegetable fats.
            </p>
            <p className="mb-1 text-xs text-on-surface-variant">Centro Empresas Elospark, R. Cruz 75 Ed. 1</p>
            <p className="mb-3 text-xs text-on-surface-variant">2725-193 Algueirão-Mem Martins, Portugal</p>
            <a
              href="https://wa.me/351917379662"
              className="inline-flex items-center gap-2 rounded-lg bg-surface-container px-3 py-2 text-xs font-medium text-on-surface-variant transition-colors hover:bg-surface-variant hover:text-on-surface"
            >
              +351 917 379 662 (WhatsApp)
            </a>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-3 font-label text-[11px] uppercase tracking-widest text-on-surface sm:mb-4 sm:text-label-md">
                {title}
              </h3>
              <ul className="space-y-2 sm:space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-on-surface-variant transition-colors hover:text-on-surface"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-8 border-t border-outline-variant/50 pt-6 sm:mt-12 sm:pt-8">
          <p className="text-xs text-on-surface-variant">
            &copy; {new Date().getFullYear()} Olea Wholesale Corp. Industrial Excellence in Supply.
          </p>
        </div>
      </Container>
    </footer>
  )
}
