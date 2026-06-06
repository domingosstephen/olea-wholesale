'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Leaf } from 'lucide-react'
import { Container } from './container'

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/faq', label: 'FAQ' },
  { href: '/contact', label: 'Contact' },
]

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="glass sticky top-0 z-50 border-b border-outline-variant/50">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 transition-opacity hover:opacity-80">
            <Leaf className="h-6 w-6 text-secondary" />
            <span className="text-lg font-semibold text-on-surface sm:text-xl">Olea Wholesale</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="relative text-body-md text-on-surface-variant transition-colors after:absolute after:-bottom-1 after:left-0 after:h-0.5 after:w-0 after:bg-secondary after:transition-all after:duration-300 hover:text-on-surface hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quote"
              className="rounded-lg bg-primary px-5 py-2.5 text-label-md text-on-primary shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md active:translate-y-0"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="rounded-lg p-2 transition-colors hover:bg-surface-container md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </nav>

        {/* Mobile menu */}
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out md:hidden ${
            mobileOpen ? 'max-h-64 pb-4 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col gap-1 border-t border-outline-variant/50 pt-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg px-4 py-3 text-body-md text-on-surface-variant transition-colors hover:bg-surface-container hover:text-on-surface"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quote"
              className="mx-4 mt-2 rounded-lg bg-primary px-5 py-3 text-center text-label-md text-on-primary transition-all hover:opacity-90"
              onClick={() => setMobileOpen(false)}
            >
              Request Quote
            </Link>
          </div>
        </div>
      </Container>
    </header>
  )
}
