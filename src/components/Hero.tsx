import { motion } from 'motion/react'
import DownloadButton from './ui/DownloadButton'
import { btnSecondary } from '../lib/ui'
import { APP_VERSION } from '../config'

export default function Hero() {
  return (
    <section id="top" className="relative isolate overflow-hidden">
      {/* Ambient amber glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 h-[85vh] bg-[radial-gradient(60%_50%_at_50%_0%,rgba(255,196,0,0.11)_0%,rgba(255,196,0,0.02)_48%,transparent_100%)]"
      />

      <div className="mx-auto flex flex-col items-center px-5 pb-24 pt-32 sm:px-6 sm:pt-36 max-w-7xl">
        {/* Main Hero Header (Centered) */}
        <div className="max-w-3xl text-center flex flex-col items-center">
          <motion.h1
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
            className="text-[clamp(2.6rem,8vw,4.9rem)] font-extrabold leading-[1.07] tracking-[-0.03em]"
          >
            Find anything in your footage —{' '}
            <span className="text-accent">even what you can't name.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.16, ease: [0.22, 1, 0.36, 1] }}
            className="mt-6 max-w-2xl text-lg leading-[1.6] text-ink-muted sm:text-xl"
          >
            SnapSort turns your raw footage and photo library into an intelligent search engine.
            Point it at any folder, describe scenes, objects, or people — it finds and sorts matching
            clips on-device with zero cloud calls.
          </motion.p>

          {/* Action CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
            className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center justify-center"
          >
            <DownloadButton label="Get for Mac" />
            <a href="#demo" className={btnSecondary}>
              See it in action
              <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14M13 6l6 6-6 6" />
              </svg>
            </a>
          </motion.div>

          {/* Platform technical specs */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.36 }}
            className="mt-6 flex flex-wrap items-center justify-center gap-x-3 gap-y-2 font-mono text-xs text-ink-dim"
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
        </div>

        {/* Prominent macOS Desktop Window Showcase */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, delay: 0.42, ease: [0.22, 1, 0.36, 1] }}
          className="relative mt-12 w-full max-w-6xl"
        >
          {/* Ambient backlight glow */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -inset-4 sm:-inset-8 rounded-3xl bg-[radial-gradient(55%_50%_at_50%_40%,rgba(255,196,0,0.15)_0%,transparent_100%)] opacity-85 blur-2xl"
          />

          {/* Window Container */}
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-1 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.85)] ring-1 ring-white/5 transition-all">
            {/* Window Title Bar */}
            <div className="flex h-10 items-center justify-between border-b border-line-subtle bg-surface-2/90 px-4 backdrop-blur-md">
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57]" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E]" />
                <span className="h-3 w-3 rounded-full bg-[#28C840]" />
              </div>

              <div className="flex items-center gap-1.5 text-xs font-medium text-ink-muted">
                <img src="/icon.png" alt="" className="h-3.5 w-3.5 rounded-xs" />
                <span>snapsort — All footage</span>
              </div>

              <div className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-line bg-surface-1 px-2.5 py-0.5 font-mono text-[10px] text-[#30D158]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#30D158] animate-pulse" />
                100% local Apple Silicon
              </div>
            </div>

            {/* High-Resolution App Screenshot */}
            <div className="relative group overflow-hidden bg-[#121212]">
              <img
                src="/hero-screenshot.png"
                alt="SnapSort macOS desktop application interface showing instant footage and video search with AI filters"
                className="w-full h-auto block select-none transition-transform duration-500 group-hover:scale-[1.01]"
                loading="eager"
              />

              {/* Floating Quick Action: Try Live Demo */}
              <a
                href="#demo"
                className="absolute bottom-4 right-4 sm:bottom-6 sm:right-6 inline-flex items-center gap-2 rounded-full border border-accent/50 bg-surface-0/85 px-4 py-2 text-xs font-bold text-accent shadow-2xl backdrop-blur-md transition-all hover:scale-105 hover:bg-surface-0 hover:border-accent"
              >
                <span>✦ Try interactive demo</span>
                <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M12 5v14M19 12l-7 7-7-7" />
                </svg>
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}