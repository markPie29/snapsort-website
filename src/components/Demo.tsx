import { useEffect, useRef, useState, type FormEvent } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import {
  DEMO_CLIPS,
  SCENARIOS,
  PRESET_KEYS,
  resolveScenario,
  type DemoScenario,
} from '../data/demo'
import Reveal from './ui/Reveal'
import { AppIcon, WordmarkImage } from './Logo'
import { eyebrow, sectionPadding } from '../lib/ui'

type ThemeMode = 'dark' | 'light'

export default function Demo() {
  // Theme inside the demo window (dark by default per obsidian brand, toggleable to light)
  const [demoTheme, setDemoTheme] = useState<ThemeMode>('dark')
  const [activeScenario, setActiveScenario] = useState<DemoScenario>(SCENARIOS.groom_bride)
  const [isFilterActive, setIsFilterActive] = useState(true)
  const [isDrawerOpen, setIsDrawerOpen] = useState(true)
  const [isSidebarOpen, setIsSidebarOpen] = useState(true)
  const [autoPlay, setAutoPlay] = useState(false)
  const [isThinking, setIsThinking] = useState(false)
  const [inputValue, setInputValue] = useState('')
  const [quickActionName, setQuickActionName] = useState('Groom + Bride')

  const autoIndexRef = useRef(0)
  const autoTimerRef = useRef<number | null>(null)

  // Sync quick action name whenever scenario changes
  useEffect(() => {
    setQuickActionName(activeScenario.quickAction)
  }, [activeScenario])

  // Apply scenario
  const applyScenario = (scenario: DemoScenario) => {
    setIsThinking(true)
    setTimeout(() => {
      setActiveScenario(scenario)
      setIsFilterActive(true)
      setIsThinking(false)
    }, 380)
  }

  // Handle preset click
  const handleSelectPreset = (key: string) => {
    setAutoPlay(false)
    if (SCENARIOS[key]) {
      applyScenario(SCENARIOS[key])
    }
  }

  // Handle user submit query
  const handleSubmitQuery = (e?: FormEvent) => {
    if (e) e.preventDefault()
    const q = inputValue.trim()
    if (!q) return
    setAutoPlay(false)
    const nextScenario = resolveScenario(q)
    applyScenario(nextScenario)
    setInputValue('')
  }

  // Clear filters
  const handleClearFilters = () => {
    setAutoPlay(false)
    setIsFilterActive(false)
  }

  // Toggle filter in toolbar
  const handleToggleFilter = () => {
    setIsFilterActive((prev) => !prev)
  }

  // Autoplay walkthrough loop
  useEffect(() => {
    if (!autoPlay) {
      if (autoTimerRef.current) window.clearTimeout(autoTimerRef.current)
      return
    }

    const runNextStep = () => {
      autoIndexRef.current = (autoIndexRef.current + 1) % PRESET_KEYS.length
      const nextKey = PRESET_KEYS[autoIndexRef.current]
      applyScenario(SCENARIOS[nextKey])
      autoTimerRef.current = window.setTimeout(runNextStep, 5200)
    }

    autoTimerRef.current = window.setTimeout(runNextStep, 4500)
    return () => {
      if (autoTimerRef.current) window.clearTimeout(autoTimerRef.current)
    }
  }, [autoPlay])

  const matchedSet = new Set(isFilterActive ? activeScenario.matchedIds : [])
  const isDark = demoTheme === 'dark'

  return (
    <section id="demo" className={`relative scroll-mt-24 overflow-hidden ${sectionPadding}`}>
      {/* Background ambient radial glow */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-1/4 h-[80vh] bg-[radial-gradient(60%_45%_at_50%_40%,rgba(255,196,0,0.07)_0%,transparent_100%)]"
      />

      <div className="relative mx-auto max-w-[1400px] px-4 sm:px-6">
        {/* Header */}
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className={eyebrow}>Live demo</p>
          <h2 className="mt-4 text-4xl font-extrabold tracking-tight sm:text-5xl">
            Ask. It sorts itself.
          </h2>
          <p className="mt-4 text-base text-ink-muted sm:text-lg">
            Experience the macOS desktop app running 100% on-device. Watch the AI Copilot
            parse semantic requests, synthesize computer-vision filters, and highlight matching
            footage in real-time.
          </p>
        </Reveal>

        {/* Global Controls & Scenario Shortcuts */}
        <Reveal delay={0.08} className="mt-8 flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-semibold text-ink-dim uppercase tracking-wider mr-1">
              Presets:
            </span>
            {PRESET_KEYS.map((key) => {
              const sc = SCENARIOS[key]
              const isActive = activeScenario.id === sc.id && isFilterActive
              return (
                <button
                  key={key}
                  type="button"
                  onClick={() => handleSelectPreset(key)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-accent text-accent-ink font-semibold shadow-sm'
                      : 'border border-line bg-surface-2 text-ink hover:border-accent/60 hover:text-accent'
                  }`}
                >
                  <span className={isActive ? 'text-accent-ink' : 'text-accent'}>✦</span>
                  {sc.quickAction}
                </button>
              )
            })}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setAutoPlay((prev) => !prev)}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-bold transition-all ${
                autoPlay
                  ? 'bg-accent text-accent-ink shadow-sm'
                  : 'border border-line bg-surface-2 text-ink hover:bg-surface-3'
              }`}
            >
              {autoPlay ? (
                <>
                  <span className="h-2 w-2 rounded-full bg-accent-ink animate-pulse" />
                  Stop demo
                </>
              ) : (
                <>
                  <svg className="h-3 w-3 fill-current" viewBox="0 0 24 24">
                    <path d="M6 4.5v15l13-7.5-13-7.5z" />
                  </svg>
                  Run demo
                </>
              )}
            </button>
            <button
              type="button"
              onClick={() => {
                setAutoPlay(false)
                setActiveScenario(SCENARIOS.groom_bride)
                setIsFilterActive(true)
                setDemoTheme('dark')
              }}
              className="rounded-full px-3 py-1.5 text-xs font-medium text-ink-muted hover:bg-surface-2 hover:text-ink transition-colors"
            >
              Reset
            </button>
          </div>
        </Reveal>

        {/* macOS Desktop Application Window */}
        <Reveal delay={0.14} className="mt-6">
          <div
            className={`relative overflow-hidden rounded-2xl border transition-colors duration-300 shadow-[0_30px_90px_-20px_rgba(0,0,0,0.7)] ${
              isDark
                ? 'border-[#262626] bg-[#0E0E0E] text-[#F5F5F5]'
                : 'border-[#D5D5DC] bg-[#FFFFFF] text-[#1A1A1A]'
            }`}
          >
            {/* macOS Window Title Bar */}
            <div
              className={`flex h-10 items-center justify-between border-b px-4 transition-colors ${
                isDark
                  ? 'border-[#202020] bg-[#161616]/90 text-[#8E8E93]'
                  : 'border-[#E5E5EA] bg-[#F2F2F7]/95 text-[#636366]'
              }`}
            >
              {/* macOS Traffic Lights */}
              <div className="flex items-center gap-2">
                <span className="h-3 w-3 rounded-full bg-[#FF5F57] hover:opacity-80 transition-opacity" />
                <span className="h-3 w-3 rounded-full bg-[#FEBC2E] hover:opacity-80 transition-opacity" />
                <span className="h-3 w-3 rounded-full bg-[#28C840] hover:opacity-80 transition-opacity" />
              </div>

              {/* Window Title */}
              <div className="flex items-center gap-1.5 text-xs font-medium tracking-tight truncate max-w-sm">
                <AppIcon size={14} className="rounded-xs" />
                <span>snapsort — {activeScenario.title}</span>
              </div>

              {/* Local privacy badge */}
              <div
                className={`hidden sm:inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 font-mono text-[10px] border ${
                  isDark
                    ? 'border-[#2A2A2A] bg-[#1C1C1C] text-[#30D158]'
                    : 'border-[#D5D5DC] bg-[#FFFFFF] text-[#34C759]'
                }`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-[#30D158] animate-pulse" />
                100% local Apple Silicon
              </div>
            </div>

            {/* App Layout: 3 Panels (Sidebar, Center Workspace, Right Drawer) */}
            <div className="relative flex min-h-[720px] max-h-[880px] overflow-hidden">
              {/* Mobile Sidebar Backdrop */}
              {isSidebarOpen && (
                <div
                  onClick={() => setIsSidebarOpen(false)}
                  className="md:hidden absolute inset-0 bg-black/50 backdrop-blur-xs z-20"
                />
              )}

              {/* PANEL 1: Left Navigation Sidebar */}
              <aside
                className={`transition-all duration-300 shrink-0 flex flex-col justify-between z-30 md:relative absolute inset-y-0 left-0 shadow-2xl md:shadow-none ${
                  isDark
                    ? 'border-[#202020] bg-[#141414]'
                    : 'border-[#E5E5EA] bg-[#F7F7F9]'
                } ${
                  isSidebarOpen
                    ? 'w-56 p-3.5 border-r'
                    : 'w-0 p-0 overflow-hidden border-r-0'
                }`}
              >
                <div>
                  {/* Wordmark logo & sidebar toggle */}
                  <div className="flex items-center justify-between pb-4">
                    <div className="flex items-center gap-2">
                      <WordmarkImage theme={isDark ? 'dark' : 'light'} className="h-5" />
                    </div>
                    <button
                      type="button"
                      onClick={() => setIsSidebarOpen(false)}
                      title="Hide sidebar"
                      className={`rounded p-1 transition-colors ${
                        isDark ? 'text-[#8E8E93] hover:bg-[#202020]' : 'text-[#636366] hover:bg-[#EBEBEF]'
                      }`}
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <line x1="9" y1="3" x2="9" y2="21" />
                      </svg>
                    </button>
                  </div>

                  {/* Segmented Control: Library / Folders */}
                  <div
                    className={`flex rounded-lg p-0.5 text-xs font-medium border ${
                      isDark ? 'bg-[#1C1C1C] border-[#2A2A2A]' : 'bg-[#EAEAEA] border-[#DCDCE2]'
                    }`}
                  >
                    <button
                      type="button"
                      className={`flex-1 flex items-center justify-center gap-1.5 rounded-md py-1 text-[11px] font-semibold transition-all ${
                        isDark
                          ? 'bg-[#282828] text-white shadow-sm'
                          : 'bg-white text-[#111111] shadow-sm'
                      }`}
                    >
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
                        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
                      </svg>
                      Library
                    </button>
                    <button
                      type="button"
                      className={`flex-1 flex items-center justify-center gap-1.5 rounded-md py-1 text-[11px] font-medium transition-all ${
                        isDark ? 'text-[#8E8E93] hover:text-white' : 'text-[#636366] hover:text-black'
                      }`}
                    >
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
                      </svg>
                      Folders
                    </button>
                  </div>

                  {/* Group: LIBRARY */}
                  <div className="mt-5">
                    <p
                      className={`px-2 pb-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${
                        isDark ? 'text-[#707070]' : 'text-[#8E8E93]'
                      }`}
                    >
                      Library
                    </p>
                    <ul className="space-y-0.5 text-xs">
                      <li>
                        <button
                          type="button"
                          className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 font-medium transition-colors ${
                            isDark
                              ? 'bg-[#FFC400]/15 text-[#FFC400] font-semibold'
                              : 'bg-[#FFC400]/20 text-[#805500] font-semibold'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor">
                              <rect x="3" y="3" width="7" height="7" rx="1" />
                              <rect x="14" y="3" width="7" height="7" rx="1" />
                              <rect x="14" y="14" width="7" height="7" rx="1" />
                              <rect x="3" y="14" width="7" height="7" rx="1" />
                            </svg>
                            All footage
                          </span>
                          <span className="font-mono text-[11px] tabular-nums">248</span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors ${
                            isDark
                              ? 'text-[#A0A0A0] hover:bg-[#1C1C1C] hover:text-white'
                              : 'text-[#505054] hover:bg-[#EAEAEF] hover:text-black'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="3" y="3" width="18" height="18" rx="2" />
                              <circle cx="8.5" cy="8.5" r="1.5" />
                              <polyline points="21 15 16 10 5 21" />
                            </svg>
                            Photos
                          </span>
                          <span className="font-mono text-[11px] tabular-nums">182</span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors ${
                            isDark
                              ? 'text-[#A0A0A0] hover:bg-[#1C1C1C] hover:text-white'
                              : 'text-[#505054] hover:bg-[#EAEAEF] hover:text-black'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <rect x="2" y="4" width="20" height="16" rx="2" />
                              <polygon points="10 8 16 12 10 16 10 8" />
                            </svg>
                            Videos
                          </span>
                          <span className="font-mono text-[11px] tabular-nums">66</span>
                        </button>
                      </li>
                    </ul>
                  </div>

                  {/* Group: EXPLORE */}
                  <div className="mt-5">
                    <p
                      className={`px-2 pb-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${
                        isDark ? 'text-[#707070]' : 'text-[#8E8E93]'
                      }`}
                    >
                      Explore
                    </p>
                    <ul className="space-y-0.5 text-xs">
                      <li>
                        <button
                          type="button"
                          className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors ${
                            isDark
                              ? 'text-[#A0A0A0] hover:bg-[#1C1C1C] hover:text-white'
                              : 'text-[#505054] hover:bg-[#EAEAEF] hover:text-black'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                              <circle cx="9" cy="7" r="4" />
                              <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                              <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                            </svg>
                            People
                          </span>
                          <div className="flex items-center gap-1.5 font-mono text-[11px] tabular-nums">
                            <span className="flex items-center gap-0.5 text-[#FFC400] font-semibold">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#FFC400]" />2
                            </span>
                            <span className={isDark ? 'text-[#666666]' : 'text-[#8E8E93]'}>6</span>
                          </div>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors ${
                            isDark
                              ? 'text-[#A0A0A0] hover:bg-[#1C1C1C] hover:text-white'
                              : 'text-[#505054] hover:bg-[#EAEAEF] hover:text-black'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polygon points="12 2 2 7 12 12 22 7 12 2" />
                              <polyline points="2 17 12 22 22 17" />
                              <polyline points="2 12 12 17 22 12" />
                            </svg>
                            Scenes
                          </span>
                          <span className="font-mono text-[11px] tabular-nums">7</span>
                        </button>
                      </li>
                      <li>
                        <button
                          type="button"
                          className={`w-full flex items-center justify-between rounded-lg px-2.5 py-1.5 transition-colors ${
                            isDark
                              ? 'text-[#A0A0A0] hover:bg-[#1C1C1C] hover:text-white'
                              : 'text-[#505054] hover:bg-[#EAEAEF] hover:text-black'
                          }`}
                        >
                          <span className="flex items-center gap-2">
                            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
                              <line x1="7" y1="7" x2="7.01" y2="7" />
                            </svg>
                            Tags
                          </span>
                          <span className="font-mono text-[11px] tabular-nums">7</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Sidebar Bottom: APPEARANCE Control */}
                <div className="pt-4 border-t border-line-subtle">
                  <p
                    className={`px-1 pb-1.5 font-mono text-[10px] font-semibold uppercase tracking-wider ${
                      isDark ? 'text-[#707070]' : 'text-[#8E8E93]'
                    }`}
                  >
                    Appearance
                  </p>
                  <div
                    className={`flex rounded-lg p-0.5 border text-xs ${
                      isDark ? 'bg-[#1C1C1C] border-[#2A2A2A]' : 'bg-[#E8E8ED] border-[#DCDCE2]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setDemoTheme('dark')}
                      className={`flex-1 flex items-center justify-center gap-1 rounded py-1 text-[11px] font-medium transition-all ${
                        !isDark
                          ? isDark ? 'text-white' : 'text-[#636366]'
                          : 'text-[#8E8E93]'
                      }`}
                    >
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="9" />
                        <path d="M12 3v18" />
                      </svg>
                      Auto
                    </button>
                    <button
                      type="button"
                      onClick={() => setDemoTheme('light')}
                      className={`flex-1 flex items-center justify-center gap-1 rounded py-1 text-[11px] font-medium transition-all ${
                        !isDark
                          ? 'bg-white text-black font-semibold shadow-sm'
                          : 'text-[#8E8E93] hover:text-white'
                      }`}
                    >
                      <svg className="h-3 w-3 text-[#FFC400]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="5" />
                        <line x1="12" y1="1" x2="12" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="23" />
                        <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                        <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                      </svg>
                      Light
                    </button>
                    <button
                      type="button"
                      onClick={() => setDemoTheme('dark')}
                      className={`flex-1 flex items-center justify-center gap-1 rounded py-1 text-[11px] font-medium transition-all ${
                        isDark
                          ? 'bg-[#282828] text-white font-semibold shadow-sm'
                          : 'text-[#636366] hover:text-black'
                      }`}
                    >
                      <svg className="h-3 w-3 text-[#FFC400]" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                      </svg>
                      Dark
                    </button>
                  </div>
                  <p
                    className={`mt-2.5 px-1 font-mono text-[9px] truncate ${
                      isDark ? 'text-[#5A5A5A]' : 'text-[#8E8E93]'
                    }`}
                  >
                    Local library · runs on this device
                  </p>
                </div>
              </aside>

              {/* PANEL 2: Center Media Workspace */}
              <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
                {/* Top Navigation / Search Toolbar */}
                <header
                  className={`flex items-center gap-2.5 border-b px-4 py-2.5 transition-colors shrink-0 ${
                    isDark
                      ? 'border-[#202020] bg-[#141414]/70'
                      : 'border-[#E5E5EA] bg-[#FFFFFF]'
                  }`}
                >
                  {/* Sidebar toggle button */}
                  {!isSidebarOpen && (
                    <button
                      type="button"
                      onClick={() => setIsSidebarOpen(true)}
                      title="Show sidebar"
                      className={`rounded-lg p-1.5 transition-colors border ${
                        isDark
                          ? 'border-[#2A2A2A] bg-[#1C1C1C] text-white hover:bg-[#252525]'
                          : 'border-[#DCDCE2] bg-[#F2F2F7] text-black hover:bg-[#EBEBEF]'
                      }`}
                    >
                      <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <rect x="3" y="3" width="18" height="18" rx="2" />
                        <line x1="9" y1="3" x2="9" y2="21" />
                      </svg>
                    </button>
                  )}

                  {/* Search Bar pill */}
                  <form
                    onSubmit={handleSubmitQuery}
                    className={`flex flex-1 items-center gap-2 rounded-full border px-3.5 py-1.5 text-xs transition-all max-w-xl ${
                      isDark
                        ? 'border-[#2A2A2A] bg-[#1A1A1A] text-white focus-within:border-[#FFC400]/70'
                        : 'border-[#DCDCE2] bg-[#F2F2F7] text-black focus-within:border-[#FFC400]'
                    }`}
                  >
                    <svg
                      className={`h-3.5 w-3.5 shrink-0 ${isDark ? 'text-[#707070]' : 'text-[#8E8E93]'}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                    </svg>
                    <input
                      type="text"
                      value={inputValue}
                      onChange={(e) => setInputValue(e.target.value)}
                      placeholder="Search visuals, objects, scenes, or people... (⌘K)"
                      className="w-full bg-transparent outline-none placeholder:text-inherit placeholder:opacity-50 text-xs"
                    />
                    <svg
                      className={`h-4 w-4 shrink-0 ${isDark ? 'text-[#707070]' : 'text-[#8E8E93]'}`}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <rect x="3" y="3" width="18" height="18" rx="2" />
                      <circle cx="8.5" cy="8.5" r="1.5" />
                      <polyline points="21 15 16 10 5 21" />
                    </svg>
                  </form>

                  {/* Toolbar action buttons */}
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      className={`hidden sm:inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        isDark
                          ? 'border-[#2A2A2A] bg-[#1C1C1C] text-[#C0C0C0] hover:text-white'
                          : 'border-[#DCDCE2] bg-[#F2F2F7] text-[#505054] hover:text-black'
                      }`}
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <line x1="4" y1="21" x2="4" y2="14" />
                        <line x1="4" y1="10" x2="4" y2="3" />
                        <line x1="12" y1="21" x2="12" y2="12" />
                        <line x1="12" y1="8" x2="12" y2="3" />
                        <line x1="20" y1="21" x2="20" y2="16" />
                        <line x1="20" y1="12" x2="20" y2="3" />
                        <line x1="1" y1="14" x2="7" y2="14" />
                        <line x1="9" y1="8" x2="15" y2="8" />
                        <line x1="17" y1="16" x2="23" y2="16" />
                      </svg>
                      Filter
                    </button>

                    <button
                      type="button"
                      className={`hidden md:inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        isDark
                          ? 'border-[#2A2A2A] bg-[#1C1C1C] text-[#C0C0C0] hover:text-white'
                          : 'border-[#DCDCE2] bg-[#F2F2F7] text-[#505054] hover:text-black'
                      }`}
                    >
                      <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                        <path d="M2 17l10 5 10-5" />
                        <path d="M2 12l10 5 10-5" />
                      </svg>
                      Shelf
                    </button>

                    {/* Quick Theme Switcher Button */}
                    <button
                      type="button"
                      onClick={() => setDemoTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
                      className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                        isDark
                          ? 'border-[#2A2A2A] bg-[#1C1C1C] text-[#C0C0C0] hover:text-white'
                          : 'border-[#DCDCE2] bg-[#F2F2F7] text-[#505054] hover:text-black'
                      }`}
                    >
                      {isDark ? (
                        <>
                          <svg className="h-3.5 w-3.5 text-[#FFC400]" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                          </svg>
                          Dark
                        </>
                      ) : (
                        <>
                          <svg className="h-3.5 w-3.5 text-[#FFC400]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="5" />
                            <line x1="12" y1="1" x2="12" y2="3" />
                            <line x1="12" y1="21" x2="12" y2="23" />
                          </svg>
                          Light
                        </>
                      )}
                    </button>

                    {/* ✦ Ask AI Button (opens drawer) */}
                    <button
                      type="button"
                      onClick={() => setIsDrawerOpen((prev) => !prev)}
                      className="inline-flex items-center gap-1.5 rounded-full bg-[#FFC400] px-3.5 py-1.5 text-xs font-bold text-[#111111] shadow-sm hover:bg-[#E5B000] active:scale-95 transition-all"
                    >
                      <span className="text-[13px] leading-none">✦</span>
                      Ask AI
                    </button>
                  </div>
                </header>

                {/* Sub-header & Controls */}
                <div className="p-4 sm:p-5 flex-1 flex flex-col">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex flex-wrap items-center gap-3">
                      <h3
                        className={`text-xl font-bold tracking-tight ${
                          isDark ? 'text-white' : 'text-[#111111]'
                        }`}
                      >
                        All footage
                      </h3>
                      <div
                        className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-0.5 text-xs font-medium ${
                          isDark
                            ? 'border-[#262626] bg-[#161616] text-[#E0E0E0]'
                            : 'border-[#E0E0E6] bg-[#F2F2F7] text-[#333333]'
                        }`}
                      >
                        <span className="h-1.5 w-1.5 rounded-full bg-[#30D158]" />
                        Zero Cloud Calls • 100% Local Apple Silicon
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                          isDark
                            ? 'border-[#2A2A2A] bg-[#1A1A1A] text-[#C0C0C0]'
                            : 'border-[#DCDCE2] bg-[#F2F2F7] text-[#505054]'
                        }`}
                      >
                        Mode: Highlight
                      </button>
                      <button
                        type="button"
                        className={`rounded-full border px-3 py-1 text-xs font-medium transition-colors ${
                          isDark
                            ? 'border-[#2A2A2A] bg-[#1A1A1A] text-[#C0C0C0]'
                            : 'border-[#DCDCE2] bg-[#F2F2F7] text-[#505054]'
                        }`}
                      >
                        ⇅ Sort: Newest first
                      </button>
                    </div>
                  </div>

                  <p
                    className={`mt-1 font-mono text-[11px] ${
                      isDark ? 'text-[#8E8E93]' : 'text-[#636366]'
                    }`}
                  >
                    248 items · 66 clips · 182 photos
                  </p>

                  {/* Active Filter Bar */}
                  <div className="mt-3.5 flex flex-wrap items-center gap-2">
                    {/* People pill */}
                    <div
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-medium border ${
                        isFilterActive
                          ? 'bg-[#FFC400] text-[#111111] font-semibold border-[#FFC400]'
                          : isDark
                          ? 'border-[#2A2A2A] bg-[#1C1C1C] text-[#C0C0C0]'
                          : 'border-[#DCDCE2] bg-[#F2F2F7] text-[#505054]'
                      }`}
                    >
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                        <circle cx="9" cy="7" r="4" />
                      </svg>
                      People {isFilterActive ? '2' : ''}
                      <span className="text-[10px]">▼</span>
                    </div>

                    {/* Objects pill */}
                    <div
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${
                        isDark
                          ? 'border-[#2A2A2A] bg-[#1C1C1C] text-[#C0C0C0]'
                          : 'border-[#DCDCE2] bg-[#F2F2F7] text-[#505054]'
                      }`}
                    >
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polygon points="12 2 2 7 12 12 22 7 12 2" />
                      </svg>
                      Objects <span className="text-[10px]">▼</span>
                    </div>

                    {/* Places pill */}
                    <div
                      className={`inline-flex items-center gap-1 rounded-full border px-3 py-1 text-xs font-medium ${
                        isDark
                          ? 'border-[#2A2A2A] bg-[#1C1C1C] text-[#C0C0C0]'
                          : 'border-[#DCDCE2] bg-[#F2F2F7] text-[#505054]'
                      }`}
                    >
                      <svg className="h-3 w-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="10" r="3" />
                        <path d="M12 2a8 8 0 0 0-8 8c0 5.25 8 12 8 12s8-6.75 8-12a8 8 0 0 0-8-8z" />
                      </svg>
                      Places <span className="text-[10px]">▼</span>
                    </div>

                    {/* Quick Action Filter Pill */}
                    {isFilterActive && (
                      <span className="inline-flex animate-[popIn_0.3s_ease] items-center gap-1.5 rounded-full bg-[#FFC400] px-3 py-1 text-xs font-bold text-[#111111] shadow-sm">
                        <span>⚡</span>
                        {quickActionName}
                      </span>
                    )}

                    {/* Active Filter Tag pill */}
                    {isFilterActive && (
                      <button
                        type="button"
                        onClick={handleToggleFilter}
                        className="inline-flex animate-[popIn_0.3s_ease] items-center gap-1.5 rounded-full bg-[#FFC400] px-3 py-1 text-xs font-bold text-[#111111] shadow-sm hover:opacity-90"
                      >
                        {activeScenario.toolbarTag}
                        <span className="ml-0.5 text-xs font-black">✕</span>
                      </button>
                    )}

                    {/* Clear filters button */}
                    {isFilterActive && (
                      <button
                        type="button"
                        onClick={handleClearFilters}
                        className={`text-xs font-medium hover:underline ml-1 ${
                          isDark ? 'text-[#8E8E93] hover:text-white' : 'text-[#636366] hover:text-black'
                        }`}
                      >
                        Clear filters
                      </button>
                    )}
                  </div>

                  {/* 4-Column Media Clip Grid */}
                  <div className="mt-5 grid grid-cols-2 sm:grid-cols-3 xl:grid-cols-4 gap-3.5 pb-4">
                    {DEMO_CLIPS.map((clip) => {
                      const isMatched = matchedSet.has(clip.id)

                      return (
                        <div key={clip.id} className="group flex flex-col gap-1.5">
                          {/* Video Thumbnail Box */}
                          <motion.div
                            layout
                            className={`relative aspect-[16/10] overflow-hidden rounded-xl transition-all duration-300 ${
                              isMatched
                                ? 'border-2 border-[#FFC400] shadow-[0_0_18px_rgba(255,196,0,0.3)] ring-1 ring-[#FFC400]/40'
                                : isDark
                                ? 'border border-[#262626] bg-[#141414] opacity-40'
                                : 'border border-[#DCDCE2] bg-[#181818] opacity-40'
                            }`}
                          >
                            {/* Realistic dark cinematic background with subtle film grain */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#181818] via-[#101010] to-[#0A0A0A]">
                              {/* Video scanline / framing vignette */}
                              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,196,0,0.06)_0%,transparent_75%)]" />
                            </div>

                            {/* Centered Play Button & Media Label */}
                            <div className="absolute inset-0 flex flex-col items-center justify-center gap-1 text-[#8E8E93]">
                              <div
                                className={`flex h-8 w-8 items-center justify-center rounded-full border transition-transform group-hover:scale-110 ${
                                  isMatched
                                    ? 'border-white/40 bg-white/10 text-white'
                                    : 'border-white/20 bg-black/40 text-white/60'
                                }`}
                              >
                                <svg className="h-3.5 w-3.5 fill-current ml-0.5" viewBox="0 0 24 24">
                                  <polygon points="5 3 19 12 5 21 5 3" />
                                </svg>
                              </div>
                              <span className="font-mono text-[9px] tracking-wider text-[#666666]">
                                {clip.label}
                              </span>
                            </div>

                            {/* Bottom-right duration overlay pill */}
                            <div className="absolute bottom-2 right-2 rounded bg-black/75 px-1.5 py-0.5 font-mono text-[10px] font-semibold text-white tracking-wider tabular-nums shadow">
                              {clip.duration}
                            </div>
                          </motion.div>

                          {/* Clip Title & People count caption below card */}
                          <div
                            className={`font-mono text-[11px] font-medium tracking-tight truncate ${
                              isDark ? 'text-[#D0D0D0]' : 'text-[#2C2C2E]'
                            }`}
                          >
                            {clip.code} · {clip.peopleCount} {clip.peopleCount === 1 ? 'person' : 'people'}
                          </div>
                        </div>
                      )
                    })}
                  </div>
                </div>
              </main>

              {/* PANEL 3: Right "Ask AI" Assistant Drawer */}
              <AnimatePresence>
                {isDrawerOpen && (
                  <>
                    {/* Tablet/Mobile Drawer Backdrop */}
                    <div
                      onClick={() => setIsDrawerOpen(false)}
                      className="xl:hidden absolute inset-0 bg-black/50 backdrop-blur-xs z-20"
                    />
                    <motion.aside
                      initial={{ x: 380, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      exit={{ x: 380, opacity: 0 }}
                      transition={{ type: 'spring', damping: 26, stiffness: 240 }}
                      className={`shrink-0 w-80 sm:w-92 lg:w-96 border-l flex flex-col justify-between transition-colors z-30 xl:relative absolute inset-y-0 right-0 shadow-2xl xl:shadow-none ${
                        isDark
                          ? 'border-[#202020] bg-[#121212]'
                          : 'border-[#E5E5EA] bg-[#FFFFFF]'
                      }`}
                    >
                    {/* Drawer Header */}
                    <div>
                      <div
                        className={`flex items-start justify-between border-b p-4 ${
                          isDark ? 'border-[#202020]' : 'border-[#E5E5EA]'
                        }`}
                      >
                        <div>
                          <div className="flex items-center gap-1.5">
                            <span className="text-[#FFC400] text-sm">✦</span>
                            <h4
                              className={`text-sm font-bold tracking-tight ${
                                isDark ? 'text-white' : 'text-[#111111]'
                              }`}
                            >
                              {activeScenario.title}
                            </h4>
                          </div>
                          <p
                            className={`mt-0.5 text-xs ${
                              isDark ? 'text-[#8E8E93]' : 'text-[#636366]'
                            }`}
                          >
                            Describe what you need. I'll set the filters.
                          </p>
                        </div>

                        {/* Top action icons */}
                        <div className="flex items-center gap-1 text-[#8E8E93]">
                          <button
                            type="button"
                            onClick={() => applyScenario(activeScenario)}
                            title="Re-run search"
                            className="p-1 hover:text-white transition-colors"
                          >
                            <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <polyline points="1 4 1 10 7 10" />
                              <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                            </svg>
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setInputValue('')
                              setIsFilterActive(true)
                            }}
                            title="New query"
                            className={`flex items-center gap-0.5 text-xs px-2 py-0.5 rounded border ${
                              isDark
                                ? 'border-[#2A2A2A] bg-[#1A1A1A] hover:bg-[#252525]'
                                : 'border-[#DCDCE2] bg-[#F2F2F7] hover:bg-[#EAEAEF]'
                            }`}
                          >
                            + New
                          </button>
                          <button
                            type="button"
                            onClick={() => setIsDrawerOpen(false)}
                            title="Close drawer"
                            className="p-1 hover:text-white transition-colors"
                          >
                            <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <line x1="18" y1="6" x2="6" y2="18" />
                              <line x1="6" y1="6" x2="18" y2="18" />
                            </svg>
                          </button>
                        </div>
                      </div>

                      {/* Chat / CV Feedback Area */}
                      <div className="p-4 space-y-3 max-h-[500px] overflow-y-auto">
                        {/* User Prompt Bubble (High-voltage Solid Amber) */}
                        <div className="rounded-2xl rounded-tr-sm bg-[#FFC400] p-3.5 text-xs font-semibold leading-relaxed text-[#111111] shadow-sm">
                          {activeScenario.query}
                        </div>

                        {/* CV Terminal Inspection Cards */}
                        <div className="space-y-1.5 font-mono text-[11px]">
                          <div
                            className={`rounded-lg border px-3 py-2 flex items-center justify-between ${
                              isDark
                                ? 'border-[#262626] bg-[#181818] text-[#D0D0D0]'
                                : 'border-[#E5E5EA] bg-[#F4F4F6] text-[#2C2C2E]'
                            }`}
                          >
                            <code>{activeScenario.detect}</code>
                          </div>
                          <div
                            className={`rounded-lg border px-3 py-2 flex items-center justify-between ${
                              isDark
                                ? 'border-[#262626] bg-[#181818] text-[#D0D0D0]'
                                : 'border-[#E5E5EA] bg-[#F4F4F6] text-[#2C2C2E]'
                            }`}
                          >
                            <code>{activeScenario.filterRule}</code>
                          </div>
                        </div>

                        {/* Assistant Result & Applied Filter Chips */}
                        <div className="pt-1">
                          <p
                            className={`text-xs font-medium ${
                              isDark ? 'text-[#D0D0D0]' : 'text-[#3C3C43]'
                            }`}
                          >
                            {activeScenario.summaryText}
                          </p>

                          <div className="mt-2 flex flex-wrap gap-1.5">
                            {activeScenario.chips.map((chip) => (
                              <span
                                key={chip}
                                className="inline-flex items-center gap-1 rounded-full bg-[#FFC400] px-3 py-1 text-xs font-bold text-[#111111] shadow-sm"
                              >
                                {chip}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Quick Action Filter Card */}
                        <div
                          className={`mt-4 rounded-xl border p-3 ${
                            isDark
                              ? 'border-[#262626] bg-[#161616]'
                              : 'border-[#E5E5EA] bg-[#F7F7F9]'
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="flex items-center gap-1 font-bold text-accent">
                              <span>⚡</span> Quick Action Filter
                            </span>
                            <span className="flex items-center gap-1 font-medium text-[#30D158] text-[11px]">
                              ✓ Saved to Toolbar
                            </span>
                          </div>

                          <div
                            className={`mt-2.5 flex items-center justify-between rounded-lg border px-3 py-1.5 text-xs font-medium ${
                              isDark
                                ? 'border-[#2A2A2A] bg-[#1E1E1E] text-white'
                                : 'border-[#DCDCE2] bg-white text-[#111111]'
                            }`}
                          >
                            <input
                              type="text"
                              value={quickActionName}
                              onChange={(e) => setQuickActionName(e.target.value)}
                              className="bg-transparent outline-none w-full"
                            />
                            <svg className="h-3 w-3 shrink-0 text-[#8E8E93]" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                              <path d="M12 20h9" />
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                            </svg>
                          </div>

                          <div className="mt-3 flex items-center justify-between gap-2">
                            <button
                              type="button"
                              onClick={handleToggleFilter}
                              className={`flex-1 rounded-full px-3 py-1.5 text-xs font-bold transition-all ${
                                isFilterActive
                                  ? 'bg-[#30D158]/20 border border-[#30D158]/40 text-[#30D158]'
                                  : 'border border-line bg-surface-2 text-ink-muted'
                              }`}
                            >
                              {isFilterActive ? '✓ Active in FilterBar' : '○ Disabled'}
                            </button>
                            <button
                              type="button"
                              onClick={() => applyScenario(activeScenario)}
                              title="Reapply filter"
                              className={`rounded-full p-1.5 border transition-colors ${
                                isDark
                                  ? 'border-[#2A2A2A] bg-[#1E1E1E] text-[#C0C0C0] hover:text-white'
                                  : 'border-[#DCDCE2] bg-white text-[#505054] hover:text-black'
                              }`}
                            >
                              <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <polyline points="23 4 23 10 17 10" />
                                <path d="M20.49 15a9 9 0 1 1-2.12-9.36L23 10" />
                              </svg>
                            </button>
                            <button
                              type="button"
                              onClick={handleClearFilters}
                              className={`rounded-full border px-2.5 py-1.5 text-xs font-medium transition-colors ${
                                isDark
                                  ? 'border-[#2A2A2A] bg-[#1E1E1E] text-[#C0C0C0] hover:text-white'
                                  : 'border-[#DCDCE2] bg-white text-[#505054] hover:text-black'
                              }`}
                            >
                              ↩ Undo
                            </button>
                          </div>
                        </div>

                        {/* Suggested Follow-up Prompts */}
                        <div className="pt-2 flex flex-wrap gap-2">
                          {activeScenario.suggestions.map((sug) => (
                            <button
                              key={sug}
                              type="button"
                              onClick={() => {
                                setAutoPlay(false)
                                if (sug.toLowerCase().includes('cake')) applyScenario(SCENARIOS.cake_cutting)
                                else if (sug.toLowerCase().includes('video')) applyScenario(SCENARIOS.only_video)
                                else applyScenario(SCENARIOS.groom_bride)
                              }}
                              className={`rounded-full border px-3 py-1.5 text-xs font-medium transition-all ${
                                isDark
                                  ? 'border-[#2A2A2A] bg-[#1A1A1A] text-[#D0D0D0] hover:border-[#FFC400]/60 hover:text-[#FFC400]'
                                  : 'border-[#DCDCE2] bg-[#F2F2F7] text-[#3C3C43] hover:border-[#FFC400] hover:text-black'
                              }`}
                            >
                              {sug}
                            </button>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Bottom Prompt Input Area */}
                    <div
                      className={`border-t p-3 transition-colors ${
                        isDark ? 'border-[#202020] bg-[#121212]' : 'border-[#E5E5EA] bg-[#FFFFFF]'
                      }`}
                    >
                      <form
                        onSubmit={handleSubmitQuery}
                        className={`flex items-center gap-2 rounded-xl border p-2 transition-all ${
                          isDark
                            ? 'border-[#2A2A2A] bg-[#181818] focus-within:border-[#FFC400]/70'
                            : 'border-[#DCDCE2] bg-[#F4F4F6] focus-within:border-[#FFC400]'
                        }`}
                      >
                        <input
                          type="text"
                          value={inputValue}
                          onChange={(e) => setInputValue(e.target.value)}
                          placeholder="Ask for a filter, e.g. bride with flowers... (Enter to send)"
                          className="w-full bg-transparent text-xs outline-none placeholder:text-inherit placeholder:opacity-50"
                        />
                        <button
                          type="submit"
                          disabled={isThinking || !inputValue.trim()}
                          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#FFC400] text-[#111111] font-bold transition-all enabled:hover:bg-[#E5B000] disabled:opacity-40"
                        >
                          <svg className="h-3.5 w-3.5 stroke-[2.5]" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <line x1="12" y1="19" x2="12" y2="5" />
                            <polyline points="5 12 12 5 19 12" />
                          </svg>
                        </button>
                      </form>

                      <div
                        className={`mt-2 flex items-center justify-between font-mono text-[9px] ${
                          isDark ? 'text-[#666666]' : 'text-[#8E8E93]'
                        }`}
                      >
                        <span>Shift + Enter for new line</span>
                        <span>Double-click border to reset width</span>
                      </div>
                    </div>
                  </motion.aside>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </Reveal>

        {/* Footnote under demo container */}
        <Reveal delay={0.2}>
          <p className="mt-5 text-center font-mono text-xs text-ink-dim">
            Simulating native Apple Silicon on-device CoreML &amp; Metal pipelines · Zero network calls
          </p>
        </Reveal>
      </div>
    </section>
  )
}