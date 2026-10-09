import { Wordmark } from './Logo'
import { APP_NAME, TAGLINE, APP_VERSION } from '../config'

const LINKS = [
  { href: '#features', label: 'Features' },
  { href: '#demo', label: 'Live demo' },
  { href: '#download', label: 'Download' },
]

export default function Footer() {
  return (
    <footer className="border-t border-line bg-surface-0">
      <div className="mx-auto max-w-7xl px-5 py-12 sm:px-6">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <Wordmark />
            <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-muted">{TAGLINE}</p>
          </div>

          <nav className="flex flex-wrap items-center gap-2" aria-label="Footer">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="rounded-full px-3 py-1.5 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
              >
                {link.label}
              </a>
            ))}
            <span className="ml-1 inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 py-1.5 font-mono text-xs text-ink-muted">
              <span className="text-accent">$</span> uv run snapsort
            </span>
          </nav>
        </div>

        <div className="mt-10 flex flex-col items-start justify-between gap-3 border-t border-line-subtle pt-6 text-xs text-ink-dim sm:flex-row sm:items-center">
          <p>
            © {new Date().getFullYear()} {APP_NAME} · All rights reserved.
          </p>
          <p className="font-mono">v{APP_VERSION}</p>
        </div>
      </div>
    </footer>
  )
}