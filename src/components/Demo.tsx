import { useEffect, useMemo, useRef, useState, type FormEvent } from 'react'
import { motion } from 'motion/react'
import { CATEGORIES, DEMO_PHOTOS, PRESETS, countForTag, matchedPhotos, photoUrl } from '../data/demo'
import Reveal from './ui/Reveal'
import { eyebrow, sectionPadding } from '../lib/ui'

type Phase = 'idle' | 'typing' | 'thinking' | 'done'

interface Msg {
  role: 'user' | 'assistant'
  text: string
}

const SIDEBAR_ITEMS = [
  { label: 'Library', count: DEMO_PHOTOS.length },
  { label: 'Favorites', count: 0 },
  { label: 'Videos', count: 0 },
]

export default function Demo() {
  const [input, setInput] = useState('')
  const [messages, setMessages] = useState<Msg[]>([])
  const [phase, setPhase] = useState<Phase>('idle')
  const [matched, setMatched] = useState<Set<string>>(new Set())
  const [activeFilter, setActiveFilter] = useState<string | null>(null)
  const [auto, setAuto] = useState(true)

  const phaseRef = useRef<Phase>('idle')
  const timers = useRef<number[]>([])
  const transcriptRef = useRef<HTMLDivElement>(null)

  const schedule = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms))
  }

  useEffect(() => () => timers.current.forEach((t) => window.clearTimeout(t)), [])

  const runQuery = (raw: string) => {
    const q = raw.trim()
    if (!q || phaseRef.current === 'typing' || phaseRef.current === 'thinking') return

    setMessages((m) => [...m, { role: 'user', text: q }])
    setPhase('typing')
    schedule(() => {
      setPhase('thinking')
      schedule(() => {
        const matches = matchedPhotos(q)
        setMatched(new Set(matches.map((p) => p.id)))
        setActiveFilter(q)
        setMessages((m) => [
          ...m,
          {
            role: 'assistant',
            text: `Sorted for "${q}" — ${matches.length} of ${DEMO_PHOTOS.length} photos match.`,
          },
        ])
        setPhase('done')
        setInput(q)
      }, 1100)
    }, 450)
  }

  const runQueryRef = useRef(runQuery)
  runQueryRef.current = runQuery

  // Keep an up-to-date phase for the autoplay guard.
  useEffect(() => {
    phaseRef.current = phase
  }, [phase])

  // Auto-run: type a preset, sort, loop.
  useEffect(() => {
    if (!auto) return
    let stopped = false
    let stepTimer = 0
    let typingTimer = 0
    let index = 0

    const run = () => {
      if (stopped) return
      const preset = PRESETS[index % PRESETS.length]
      index += 1

      setMessages([])
      setMatched(new Set())
      setActiveFilter(null)
      setInput('')

      let i = 0
      typingTimer = window.setInterval(() => {
        if (stopped) {
          window.clearInterval(typingTimer)
          return
        }
        i += 1
        setInput(preset.slice(0, i))
        if (i >= preset.length) {
          window.clearInterval(typingTimer)
          runQueryRef.current(preset)
        }
      }, 26)

      stepTimer = window.setTimeout(run, 4800)
    }

    stepTimer = window.setTimeout(run, 700)
    return () => {
      stopped = true
      window.clearTimeout(stepTimer)
      window.clearInterval(typingTimer)
    }
  }, [auto])

  const send = (e: FormEvent) => {
    e.preventDefault()
    setAuto(false)
    runQuery(input)
  }

  const pickPreset = (preset: string) => {
    setAuto(false)
    setInput(preset)
    runQuery(preset)
  }

  const reset = () => {
    setAuto(false)
    setMessages([])
    setMatched(new Set())
    setActiveFilter(null)
    setInput('')
    setPhase('idle')
  }

  useEffect(() => {
    transcriptRef.current?.scrollTo({ top: transcriptRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages])

  const busy = phase === 'typing' || phase === 'thinking'
  const showResult = phase === 'done' && matched.size > 0

  const categoryCounts = useMemo(
    () => Object.fromEntries(CATEGORIES.map((c) => [c, countForTag(c)])),
    [],
  )

  return (
    <section id="demo" className={`relative scroll-mt-24 overflow-hidden ${sectionPadding}`}>
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/3 h-[70vh] bg-[radial-gradient(50%_45%_at_50%_50%,rgba(90,200,250,0.05)_0%,transparent_100%)]"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className={eyebrow}>Live demo</p>
          <h2 className="mt-4 text-4xl font-bold tracking-tight sm:text-5xl">
            Ask. It sorts itself.
          </h2>
          <p className="mt-5 text-lg leading-relaxed text-ink-muted">
            Type a query — or hit Run and let it play — and watch SnapSort rearrange this
            gallery using filters built on-device.
          </p>
        </Reveal>

        {/* Controls */}
        <Reveal delay={0.1} className="mt-10 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap gap-2">
            {PRESETS.map((p) => (
              <button
                key={p}
                type="button"
                onClick={() => pickPreset(p)}
                className="inline-flex select-none items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3.5 py-1.5 text-xs font-medium text-ink transition-colors hover:border-accent/60 hover:text-accent"
              >
                <span className="text-accent">✦</span>
                {p}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAuto((v) => !v)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0 ${
                auto
                  ? 'bg-accent text-accent-ink'
                  : 'border border-line bg-surface-2 text-ink hover:border-[#3a3a3a] hover:bg-surface-3'
              }`}
            >
              {auto ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-accent-ink/60" />
                  Stop demo
                </>
              ) : (
                <>
                  <svg className="h-3 w-3" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M6 4.5v15l13-7.5-13-7.5z" />
                  </svg>
                  Run demo
                </>
              )}
            </button>
            <button
              type="button"
              onClick={reset}
              className="rounded-full px-3.5 py-2 text-xs font-medium text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink"
            >
              Reset
            </button>
          </div>
        </Reveal>

        {/* App window */}
        <Reveal delay={0.16} className="mt-6">
          <div className="relative overflow-hidden rounded-2xl border border-line bg-surface-1 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.6)]">
            <div className="animate-[fadeIn_0.6s_ease]">
              {/* Title bar */}
              <div className="flex h-11 items-center gap-3 border-b border-line-subtle bg-surface-2/80 px-4">
                <div className="flex gap-2">
                  <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
                  <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
                  <span className="h-3 w-3 rounded-full bg-[#28c840]" />
                </div>
                <div className="min-w-0 flex-1 truncate text-center text-xs font-medium text-ink-muted">
                  snapsort — {activeFilter ? `filter: "${activeFilter}"` : 'demo.ai'}
                </div>
                <div className="hidden items-center gap-1.5 rounded-full border border-line bg-surface-1 px-2.5 py-1 font-mono text-[10px] text-ink-muted sm:inline-flex">
                  <span className="h-1.5 w-1.5 rounded-full bg-ok" />
                  100% local
                </div>
              </div>

              <div className="flex">
                {/* Sidebar */}
                <aside className="hidden w-44 shrink-0 border-r border-line-subtle bg-surface-1/60 p-3 lg:block">
                  <p className="px-2 pb-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-dim">
                    Library
                  </p>
                  <ul className="space-y-1">
                    {SIDEBAR_ITEMS.map((item) => (
                      <li key={item.label}>
                        <span className="flex items-center justify-between rounded-lg px-2 py-1.5 text-[13px] font-medium text-ink-muted transition-colors hover:bg-surface-2 hover:text-ink">
                          <span>{item.label}</span>
                          <span className="font-mono text-[11px] tabular-nums text-ink-dim">
                            {item.count || '—'}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 px-2 pb-2 font-mono text-[10px] font-semibold uppercase tracking-wider text-ink-dim">
                    AI filters
                  </p>
                  <ul className="space-y-1">
                    {['wearing red', 'golden hour'].map((f) => (
                      <li key={f}>
                        <span className="flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[13px] font-medium text-ink-muted">
                          <span className="text-accent">✦</span>
                          {f}
                        </span>
                      </li>
                    ))}
                    {activeFilter && (
                      <li>
                        <span className="flex items-center gap-1.5 rounded-lg border border-accent/50 bg-accent-subtle/60 px-2 py-1.5 text-[13px] font-semibold text-accent">
                          <span>✦</span>
                          {activeFilter}
                        </span>
                      </li>
                    )}
                  </ul>
                </aside>

                {/* Main panel */}
                <div className="min-w-0 flex-1 p-4 sm:p-6">
                  {/* Chat transcript */}
                  {messages.length > 0 && (
                    <div
                      ref={transcriptRef}
                      className="mb-4 max-h-32 space-y-2 overflow-y-auto pr-1"
                    >
                      {messages.map((m, i) =>
                        m.role === 'user' ? (
                          <div key={i} className="flex justify-end">
                            <span className="max-w-[80%] rounded-2xl rounded-br-md bg-accent px-3.5 py-2 text-[13px] font-semibold text-accent-ink">
                              {m.text}
                            </span>
                          </div>
                        ) : (
                          <div key={i} className="flex justify-start">
                            <span className="flex max-w-[85%] items-start gap-2 rounded-2xl rounded-bl-md border border-line bg-surface-2 px-3.5 py-2 text-[13px] leading-relaxed text-ink-muted">
                              <span className="mt-0.5 text-accent">✦</span>
                              {m.text}
                            </span>
                          </div>
                        ),
                      )}
                    </div>
                  )}

                  {/* Query input */}
                  <form onSubmit={send} className="flex items-center gap-2">
                    <div className="flex flex-1 items-center gap-2 rounded-full border border-line bg-surface-2 py-1.5 pl-4 pr-1.5 transition-colors focus-within:border-accent/70 focus-within:ring-2 focus-within:ring-accent/15">
                      <span className="text-ink-dim" aria-hidden="true">
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                          <path d="M11 4a7 7 0 1 0 0 14 7 7 0 0 0 0-14zM20 20l-4-4" />
                        </svg>
                      </span>
                      <input
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Ask AI to sort your library…"
                        className="w-full bg-transparent text-sm text-ink outline-none placeholder:text-ink-dim"
                        aria-label="AI search query"
                      />
                      {busy && (
                        <span className="h-4 w-4 shrink-0 animate-spin rounded-full border-2 border-line border-t-accent" />
                      )}
                      <button
                        type="submit"
                        disabled={busy || !input.trim()}
                        aria-label="Sort with this query"
                        className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent text-accent-ink transition-all enabled:hover:bg-accent-hover disabled:opacity-40"
                      >
                        <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                          <path d="M5 12h14M13 6l6 6-6 6" />
                        </svg>
                      </button>
                    </div>
                  </form>

                  {busy && (
                    <p className="mt-3 font-mono text-[11px] text-ink-dim">
                      {phase === 'typing'
                        ? 'Parsing query…'
                        : 'Analyzing gallery on-device…'}
                    </p>
                  )}

                  {/* Filter pills */}
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {CATEGORIES.map((cat) => (
                      <span
                        key={cat}
                        className={`inline-flex select-none items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                          activeFilter && matchedPhotos(activeFilter).some((p) => p.tags.includes(cat))
                            ? 'border-accent/60 bg-accent-subtle text-accent'
                            : 'border-line bg-surface-2 text-ink'
                        }`}
                      >
                        <span className="capitalize">{cat}</span>
                        <span className="rounded-full bg-surface-3 px-1.5 py-0.5 text-[10px] tabular-nums text-ink-muted">
                          {categoryCounts[cat]}
                        </span>
                      </span>
                    ))}
                    {activeFilter && (
                      <span className="inline-flex animate-[popIn_0.4s_ease] select-none items-center gap-1.5 rounded-full bg-accent px-3 py-1.5 text-xs font-semibold text-accent-ink shadow-sm">
                        <span>✦ new AI filter</span>
                        <span className="rounded-full bg-black/15 px-1.5 py-0.5 text-[10px] tabular-nums">
                          {matched.size}
                        </span>
                      </span>
                    )}
                  </div>

                  {/* Photo grid */}
                  <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-3 xl:grid-cols-4">
                    {DEMO_PHOTOS.map((p) => {
                      const isMatched = matched.has(p.id)
                      return (
                        <motion.div
                          key={p.id}
                          layout
                          initial={false}
                          animate={{ scale: isMatched && showResult ? [1, 1.05, 1] : 1 }}
                          transition={{ duration: 0.5, ease: 'easeOut' }}
                          className={`relative aspect-[16/10] overflow-hidden rounded-xl border bg-surface-2 transition-colors duration-300 ${
                            isMatched ? 'border-accent shadow-match' : 'border-line'
                          }`}
                        >
                          <img
                            src={photoUrl(p)}
                            alt={p.title}
                            loading="lazy"
                            className={`h-full w-full object-cover transition-all duration-500 ${
                              phase === 'done' && !isMatched ? 'opacity-35 saturate-0' : 'opacity-100'
                            }`}
                          />
                          {isMatched && showResult && (
                            <div className="pointer-events-none absolute inset-0 rounded-xl ring-2 ring-inset ring-accent" />
                          )}
                          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent px-2.5 pb-2 pt-9">
                            <p className="truncate text-[11px] font-semibold leading-tight text-white">
                              {p.title}
                            </p>
                            <p
                              className={`font-mono text-[9px] uppercase tracking-widest ${
                                isMatched && showResult ? 'text-accent' : 'text-ink-dim'
                              }`}
                            >
                              {isMatched && showResult ? '● match' : '—'}
                            </p>
                          </div>
                        </motion.div>
                      )
                    })}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.2}>
          <p className="mt-5 text-center text-xs text-ink-dim">
            Sample gallery served from picsum.photos · AI matching is simulated on-device for
            this demo.
          </p>
        </Reveal>
      </div>
    </section>
  )
}