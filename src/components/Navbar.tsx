import { useEffect, useState } from 'react'
import DownloadButton from './ui/DownloadButton'
import { DotWordmark } from './Logo'
import { btnGhost } from '../lib/ui'

const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#demo', label: 'Live demo' },
  { href: '#download', label: 'Download' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md transition-colors duration-300 ${
        scrolled ? 'border-line/70 bg-surface-0/85' : 'border-transparent bg-surface-0/40'
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-6">
        <a href="#top" aria-label="SnapSort home" className="rounded-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <DotWordmark />
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className={btnGhost}>
              {link.label}
            </a>
          ))}
          <DownloadButton label="Get for Mac" className="ml-2 px-5 py-2.5" />
        </nav>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-line bg-surface-2 text-ink md:hidden"
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M6 6l12 12M18 6L6 18" />
            </svg>
          ) : (
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              <path d="M4 7h16M4 12h16M4 17h16" />
            </svg>
          )}
        </button>
      </div>

      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-line-subtle bg-surface-0/95 px-5 pb-6 pt-3 backdrop-blur-md md:hidden"
          aria-label="Mobile"
        >
          <div className="flex flex-col">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-xl px-3 py-3 text-[15px] font-medium text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <DownloadButton label="Get for Mac" className="mt-3 w-full" />
          </div>
        </nav>
      )}
    </header>
  )
}