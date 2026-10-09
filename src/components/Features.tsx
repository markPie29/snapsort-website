import type { ReactNode } from 'react'
import Reveal from './ui/Reveal'
import { eyebrow, sectionPadding } from '../lib/ui'

function IconFrame({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-line bg-surface-2 text-accent">
      {children}
    </div>
  )
}

function ScannerIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M3 7V5a2 2 0 0 1 2-2h2M17 3h2a2 2 0 0 1 2 2v2M21 17v2a2 2 0 0 1-2 2h-2M7 21H5a2 2 0 0 1-2-2v-2" />
      <path d="M3 12h18" />
      <path d="M7 9.5v5M10.5 9.5v5M14 9.5v5M17.5 9.5v5" />
    </svg>
  )
}

function SlidersIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 8h10M18 8h2M4 16h2M10 16h10" />
      <circle cx="16" cy="8" r="2" fill="#0F0F0F" stroke="currentColor" />
      <circle cx="8" cy="16" r="2" fill="#0F0F0F" stroke="currentColor" />
    </svg>
  )
}

function SparklesIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l1.9 5.1L19 10l-5.1 1.9L12 17l-1.9-5.1L5 10l5.1-1.9L12 3z" />
      <path d="M19 15l.9 2.1L22 18l-2.1.9L19 21l-.9-2.1L16 18l2.1-.9L19 15z" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l8 3v6c0 4.5-3.2 8-8 9-4.8-1-8-4.5-8-9V6l8-3z" />
      <path d="M9 12l2 2 4-4" />
    </svg>
  )
}

const FEATURES = [
  {
    icon: <ScannerIcon />,
    title: 'Search photos & videos',
    body: 'Index any folder on your Mac in seconds. Photos and videos become instantly searchable by what is in them — no uploads, no waiting, no cloud.',
    badge: null,
  },
  {
    icon: <SlidersIcon />,
    title: 'Sort with filters',
    body: 'Stack rich filters — people, places, dates, cameras, scenes — and narrow thousands of files down to the exact moment you were looking for.',
    badge: null,
  },
  {
    icon: <SparklesIcon />,
    title: 'Offline AI filters',
    body: 'Ask for things no filter has yet: "wearing red", "golden hour". SnapSort\u2019s on-device AI turns plain language into a working, reusable filter.',
    badge: '✦ Trains on-device',
  },
  {
    icon: <ShieldIcon />,
    title: 'Private by design',
    body: 'Every index, every AI filter, every search happens on your Mac. Your library never leaves the machine — nothing is sent anywhere, ever.',
    badge: 'Zero Cloud Calls',
  },
]

export default function Features() {
  return (
    <section id="features" className={`relative scroll-mt-24 ${sectionPadding}`}>
      <div className="mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className={eyebrow}>What it does</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Your library, finally organized.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            SnapSort searches photos and videos by what is in them, using tools that run
            entirely on your Mac.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {FEATURES.map((f, i) => (
            <Reveal key={f.title} delay={i * 0.08}>
              <article className="group relative h-full overflow-hidden rounded-2xl border border-line bg-surface-1 p-7 transition-all duration-300 hover:-translate-y-1 hover:border-[#3a3a3a] hover:shadow-match sm:p-8">
                <div
                  aria-hidden="true"
                  className="pointer-events-none absolute -top-24 right-0 h-56 w-56 rounded-full bg-accent/0 blur-3xl transition-colors duration-500 group-hover:bg-accent/[0.07]"
                />
                <div className="flex items-start justify-between">
                  <IconFrame>{f.icon}</IconFrame>
                  {f.badge && (
                    <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-1 text-[11px] font-semibold text-ink">
                      <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                      {f.badge}
                    </span>
                  )}
                </div>
                <h3 className="mt-6 text-xl font-bold tracking-tight">{f.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink-muted">{f.body}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}