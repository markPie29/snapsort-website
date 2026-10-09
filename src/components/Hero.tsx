import { motion } from 'motion/react'
import DownloadButton from './ui/DownloadButton'
import { btnSecondary } from '../lib/ui'
import { APP_VERSION } from '../config'

const PILLS = [
  { label: 'Beach', count: '42' },
  { label: 'Anna', count: '128', active: true },
  { label: '✦ wearing red', count: null },
  { label: 'Videos', count: '1.2k' },
]

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Ambient amber glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[80vh] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,196,0,0.09)_0%,rgba(255,196,0,0.02)_42%,transparent_100%)]"
      />

      <div className="mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-center px-5 pb-28 pt-32 sm:px-6">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="inline-flex items-center gap-2.5 rounded-full border border-line bg-surface-2/80 px-4 py-2 text-xs font-semibold text-ink backdrop-blur-sm"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-ok opacity-70" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-ok" />
            </span>
            <span className="hidden sm:inline">100% On-Device ·</span>
            <span>No cloud calls. Ever.</span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="mt-7 text-[clamp(2.6rem,8vw,4.9rem)] font-extrabold leading-[1.07] tracking-[-0.03em]"
          >
            Find anything in your photos —{' '}
            <span className="text-accent">even what you can't name.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-xl text-lg leading-[1.6] text-ink-muted"
          >
            SnapSort turns your library into a search engine. Point it at any folder of photos
            and videos, then describe what you're after — it sorts everything instantly,
            privately, on your own Mac.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center"
          >
            <DownloadButton label="Get for Mac" />
            <a href="#demo" className={btnSecondary}>
              See it in action
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-6 flex flex-wrap items-center gap-x-3 gap-y-2 font-mono text-xs text-ink-dim"
          >
            <span>macOS 14+</span>
            <span className="text-line">/</span>
            <span>Apple Silicon</span>
            <span className="text-line">/</span>
            <span>v{APP_VERSION}</span>
            <span className="text-line">/</span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-2 px-2.5 py-1 text-ink-muted">
              <span className="text-accent">$</span> uv run snapsort
            </span>
          </motion.div>

          {/* Decorative filter-pill strip */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="mt-10 flex flex-wrap items-center gap-2"
            aria-hidden="true"
          >
            {PILLS.map((pill) => (
              <span
                key={pill.label}
                className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
                  pill.active
                    ? 'bg-accent font-semibold text-accent-ink shadow-sm'
                    : 'border border-line bg-surface-2 text-ink'
                }`}
              >
                <span>{pill.label}</span>
                {pill.count && (
                  <span
                    className={`rounded-full px-1.5 py-0.5 text-[10px] tabular-nums ${
                      pill.active ? 'bg-black/15 text-accent-ink' : 'bg-surface-3 text-ink-muted'
                    }`}
                  >
                    {pill.count}
                  </span>
                )}
              </span>
            ))}
          </motion.div>
        </div>

        {/* Scroll cue */}
        <motion.a
          href="#features"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="absolute bottom-7 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-ink-dim transition-colors hover:text-ink sm:flex"
          aria-label="Scroll to features"
        >
          Scroll
          <span className="flex h-9 w-5 items-start justify-center rounded-full border border-line p-1">
            <motion.span
              className="h-1.5 w-1 rounded-full bg-accent"
              animate={{ y: [0, 10, 0], opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
            />
          </span>
        </motion.a>
      </div>
    </section>
  )
}