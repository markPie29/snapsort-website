/** Shared Tailwind class recipes, per DESIGN.md §5. */

export const btnPrimary =
  'inline-flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-accent-ink shadow-sm transition-all duration-200 hover:scale-[1.02] hover:bg-accent-hover active:scale-[0.98] active:bg-accent-active focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0'

export const btnPrimaryLg = `${btnPrimary} px-8 py-4 text-base`

export const btnSecondary =
  'inline-flex items-center justify-center gap-2 rounded-full border border-line bg-surface-2 px-6 py-3.5 text-sm font-medium text-ink transition-colors duration-200 hover:border-[#3a3a3a] hover:bg-surface-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-surface-0'

export const btnGhost =
  'inline-flex items-center gap-1 rounded-full px-3.5 py-2 text-sm font-medium text-ink-muted transition-colors hover:bg-surface-2/60 hover:text-ink focus-visible:outline-none'

export const pill =
  'inline-flex select-none items-center gap-1.5 rounded-full border border-line bg-surface-2 px-3 py-1.5 text-xs font-medium text-ink transition-colors'

export const eyebrow =
  'font-mono text-[11px] font-semibold uppercase tracking-[0.2em] text-accent'

export const sectionPadding = 'py-24 sm:py-32'