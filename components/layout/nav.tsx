'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, Leaf } from 'lucide-react'
import { Container } from './container'

const navLinks = [
  { href: '/products', label: 'Products' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Nav() {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-outline-variant bg-surface-container-lowest">
      <Container>
        <nav className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2">
            <Leaf className="h-6 w-6 text-secondary" />
            <span className="text-xl font-semibold text-on-surface">Olea Wholesale</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden items-center gap-8 md:flex">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-body-md text-on-surface-variant transition-colors hover:text-on-surface"
              >
                {link.label}
              </Link>
            ))}
            <Link
              href="/quote"
              className="rounded-lg bg-primary px-5 py-2.5 text-label-md text-on-primary transition-opacity hover:opacity-90"
            >
              Request Quote
            </Link>
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
          >
            {mobileOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </nav>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="border-t border-outline-variant pb-4 md:hidden">
            <div className="flex flex-col gap-1 pt-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="rounded-lg px-4 py-3 text-body-md text-on-surface-variant transition-colors hover:bg-surface-container"
                  onClick={() => setMobileOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/quote"
                className="mx-4 mt-2 rounded-lg bg-primary px-5 py-2.5 text-center text-label-md text-on-primary transition-opacity hover:opacity-90"
                onClick={() => setMobileOpen(false)}
              >
                Request Quote
              </Link>
            </div>
          </div>
        )}
      </Container>
    </header>
  )
}
