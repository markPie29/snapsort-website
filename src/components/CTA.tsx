import Reveal from './ui/Reveal'
import DownloadButton from './ui/DownloadButton'
import { btnSecondary, eyebrow, sectionPadding } from '../lib/ui'
import { APP_VERSION } from '../config'

const CHECKS = [
  'macOS 14+ · Apple Silicon',
  '100% local — zero cloud calls',
  'Free to try',
]

export default function CTA() {
  return (
    <section
      id="download"
      className={`relative scroll-mt-24 overflow-hidden ${sectionPadding}`}
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 bottom-0 h-[80vh] bg-[radial-gradient(60%_55%_at_50%_100%,rgba(255,196,0,0.1)_0%,rgba(255,196,0,0.02)_45%,transparent_100%)]"
      />

      <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-6">
        <Reveal>
          <div className="mx-auto flex h-16 w-16 items-center justify-center overflow-hidden rounded-2xl border border-line bg-surface-2 shadow-lg">
            <img src="/icon.png" alt="" aria-hidden="true" className="h-9 w-9 object-contain" />
          </div>
        </Reveal>

        <Reveal delay={0.05}>
          <p className={`mt-8 ${eyebrow}`}>Your library, sorted</p>
          <h2 className="mt-4 text-5xl font-extrabold tracking-tight sm:text-7xl">
            Get for Mac<span className="text-accent">.</span>
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">
            Download SnapSort and turn any folder of photos and videos into a searchable,
            AI-assisted library in minutes.
          </p>
        </Reveal>

        <Reveal delay={0.12}>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <DownloadButton label="Get for Mac" large />
            <a href="#demo" className={btnSecondary}>
              Watch the demo
            </a>
          </div>

          <div className="mx-auto mt-7 flex max-w-xl flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-xs text-ink-dim">
            <span className="rounded-full border border-line bg-surface-2 px-2.5 py-1 text-ink-muted">
              v{APP_VERSION}
            </span>
            <span className="text-line">/</span>
            <span>dmg · ~80 MB</span>
            <span className="text-line">/</span>
            <span>signed & notarized</span>
          </div>

          <ul className="mx-auto mt-8 flex max-w-2xl flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {CHECKS.map((check) => (
              <li key={check} className="flex items-center gap-2 text-sm font-medium text-ink-muted">
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-ok/15 text-ok">
                  <svg className="h-2.5 w-2.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M4 12.5l5 5L20 6.5" />
                  </svg>
                </span>
                {check}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  )
}