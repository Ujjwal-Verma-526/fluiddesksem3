import { useEffect, useState, type ReactNode } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import {
  BookOpen,
  Calculator,
  ChevronRight,
  FileText,
  FlaskConical,
  LayoutDashboard,
  ListChecks,
  Menu,
  Monitor,
  Moon,
  Repeat,
  Search,
  Shapes,
  Sun,
  X,
} from 'lucide-react'
import { BOOK, UNITS, topicsOfUnit } from '../content'
import { setTheme, storageError, useStore } from '../lib/store'
import { FlowGlyph, StatusGlyph } from './ui'
import { SearchPalette } from './SearchPalette'

const NAV = [
  { to: '/', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/syllabus', label: 'Syllabus', icon: BookOpen },
  { to: '/examples', label: 'Worked examples', icon: FlaskConical },
  { to: '/questions', label: 'Question bank', icon: ListChecks },
  { to: '/formulas', label: 'Formula sheet', icon: Calculator },
  { to: '/diagrams', label: 'Diagrams', icon: Shapes },
  { to: '/revision', label: 'Revision', icon: Repeat },
  { to: '/papers', label: 'Papers', icon: FileText },
]

function UnitTree({ onNavigate }: { onNavigate: () => void }) {
  const { pathname } = useLocation()
  const statuses = useStore((s) => s.topics)
  const currentTopic = pathname.startsWith('/topic/') ? pathname.slice('/topic/'.length) : null
  const [open, setOpen] = useState<string | null>(() => {
    if (!currentTopic) return null
    return UNITS.find((u) => topicsOfUnit(u.id).some((t) => t.id === currentTopic))?.id ?? null
  })

  useEffect(() => {
    if (!currentTopic) return
    const u = UNITS.find((x) => topicsOfUnit(x.id).some((t) => t.id === currentTopic))
    if (u) setOpen(u.id)
  }, [currentTopic])

  return (
    <div className="mt-6">
      <div className="num px-3 pb-2 text-[10px] uppercase tracking-[0.14em] text-muted">Units</div>
      <ul className="space-y-0.5">
        {UNITS.map((u) => {
          const topics = topicsOfUnit(u.id)
          const done = topics.filter((t) => {
            const st = statuses[t.id]?.status
            return st === 'completed'
          }).length
          const isOpen = open === u.id
          return (
            <li key={u.id}>
              <button
                onClick={() => setOpen(isOpen ? null : u.id)}
                aria-expanded={isOpen}
                className="flex w-full items-center gap-2 rounded-md px-3 py-1.5 text-left text-[13px] text-ink-2 hover:bg-sunken hover:text-ink"
              >
                <FlowGlyph progress={done / topics.length} tone="ok" size={16} />
                <span className="num w-4 text-[11px] text-muted">{u.number}</span>
                <span className="min-w-0 flex-1 truncate">{u.title}</span>
                <ChevronRight size={13} className={`text-muted transition-transform ${isOpen ? 'rotate-90' : ''}`} aria-hidden />
              </button>
              {isOpen && (
                <ul className="mb-1 ml-[22px] border-l border-rule pl-2">
                  {topics.map((t) => (
                    <li key={t.id}>
                      <NavLink
                        to={`/topic/${t.id}`}
                        onClick={onNavigate}
                        className={({ isActive }) =>
                          `flex items-center gap-2 rounded-md px-2 py-1 text-[12.5px] leading-snug ${
                            isActive ? 'bg-sunken font-medium text-ink' : 'text-ink-2 hover:text-ink'
                          }`
                        }
                      >
                        <StatusGlyph status={statuses[t.id]?.status ?? 'not-started'} size={13} />
                        <span className="min-w-0 flex-1">{t.title}</span>
                      </NavLink>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          )
        })}
      </ul>
    </div>
  )
}

function ThemeSwitch() {
  const theme = useStore((s) => s.theme)
  const opts = [
    { v: 'light' as const, icon: Sun, label: 'Light' },
    { v: 'system' as const, icon: Monitor, label: 'System' },
    { v: 'dark' as const, icon: Moon, label: 'Dark' },
  ]
  return (
    <div role="radiogroup" aria-label="Theme" className="inline-flex rounded-lg border border-rule bg-surface p-0.5">
      {opts.map(({ v, icon: Icon, label }) => (
        <button
          key={v}
          role="radio"
          aria-checked={theme === v}
          onClick={() => setTheme(v)}
          title={label}
          className={`flex h-7 w-8 items-center justify-center rounded-md ${theme === v ? 'bg-sunken text-ink' : 'text-muted hover:text-ink'}`}
        >
          <Icon size={14} aria-hidden />
          <span className="sr-only">{label}</span>
        </button>
      ))}
    </div>
  )
}

/** True when the OS is in dark mode; follows changes live. */
function useSystemDark(): boolean {
  const query = '(prefers-color-scheme: dark)'
  const [dark, setDark] = useState(() => typeof window !== 'undefined' && window.matchMedia(query).matches)
  useEffect(() => {
    const mq = window.matchMedia(query)
    const onChange = (e: MediaQueryListEvent) => setDark(e.matches)
    mq.addEventListener('change', onChange)
    return () => mq.removeEventListener('change', onChange)
  }, [])
  return dark
}

/**
 * One-click light/dark toggle. When the theme is "system" it flips away from whatever
 * the OS is currently showing, so the first click always visibly changes the page.
 * The three-way switch in the sidebar footer is still there to go back to "system".
 */
function ThemeToggle({ className = '' }: { className?: string }) {
  const theme = useStore((s) => s.theme)
  const systemDark = useSystemDark()
  const isDark = theme === 'dark' || (theme === 'system' && systemDark)
  const label = isDark ? 'Switch to light mode' : 'Switch to dark mode'
  const Icon = isDark ? Sun : Moon
  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={label}
      title={label}
      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-md text-ink-2 hover:bg-sunken hover:text-ink ${className}`}
    >
      <Icon size={17} aria-hidden />
    </button>
  )
}

function Sidebar({ onNavigate, onSearch, showToggle = false }: { onNavigate: () => void; onSearch: () => void; showToggle?: boolean }) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex items-start gap-1 pb-5 pt-1">
        <Link to="/" onClick={onNavigate} className="flex min-w-0 flex-1 items-center gap-2.5 px-3">
          <FlowGlyph progress={1} tone="heat" size={26} />
          <span className="min-w-0">
            <span className="block text-[15px] font-semibold leading-tight tracking-[-0.01em] text-ink">Fluid Desk</span>
            <span className="block text-[11px] text-muted">Fluid Mechanics &amp; Hydraulic Machines · ME205</span>
          </span>
        </Link>
        {showToggle && <ThemeToggle className="-mr-1" />}
      </div>

      <button
        onClick={onSearch}
        className="mx-1 mb-4 flex items-center gap-2 rounded-lg border border-rule bg-surface px-3 py-2 text-left text-[13px] text-muted hover:border-rule-strong"
      >
        <Search size={14} aria-hidden />
        <span className="flex-1">Search</span>
        <kbd className="num rounded border border-rule px-1 text-[10px]">Ctrl K</kbd>
      </button>

      <nav aria-label="Main">
        <ul className="space-y-0.5">
          {NAV.map(({ to, label, icon: Icon, end }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={end}
                onClick={onNavigate}
                className={({ isActive }) =>
                  `flex items-center gap-2.5 rounded-md px-3 py-1.5 text-[13.5px] ${
                    isActive ? 'bg-sunken font-medium text-ink' : 'text-ink-2 hover:bg-sunken hover:text-ink'
                  }`
                }
              >
                <Icon size={15} aria-hidden />
                {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <UnitTree onNavigate={onNavigate} />

      <div className="mt-auto space-y-3 px-3 pb-2 pt-8">
        <ThemeSwitch />
        <p className="text-[11px] leading-relaxed text-muted">
          Source: {BOOK.author}, <i>{BOOK.title}</i>, {BOOK.publisher} {BOOK.year}. Supplementary material is labelled.
        </p>
      </div>
    </div>
  )
}

export function Layout({ children }: { children: ReactNode }) {
  const [drawer, setDrawer] = useState(false)
  const [search, setSearch] = useState(false)
  const [storageWarning, setStorageWarning] = useState(storageError)
  const { pathname } = useLocation()

  useEffect(() => setDrawer(false), [pathname])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault()
        setSearch((s) => !s)
      } else if (e.key === '/' && !(e.target instanceof HTMLInputElement || e.target instanceof HTMLTextAreaElement)) {
        e.preventDefault()
        setSearch(true)
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  return (
    <div className="min-h-screen">
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded focus:bg-surface focus:px-3 focus:py-2">
        Skip to content
      </a>

      {/* desktop sidebar */}
      <aside className="scrollbar-thin fixed inset-y-0 left-0 hidden w-[264px] overflow-y-auto border-r border-rule bg-paper px-3 py-5 lg:block">
        <Sidebar onNavigate={() => undefined} onSearch={() => setSearch(true)} showToggle />
      </aside>

      {/* mobile top bar */}
      <div className="sticky top-0 z-30 flex items-center gap-2 border-b border-rule bg-paper/90 px-4 py-2.5 backdrop-blur lg:hidden">
        <button onClick={() => setDrawer(true)} className="inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-sunken" aria-label="Open navigation">
          <Menu size={18} />
        </button>
        <Link to="/" className="flex items-center gap-2 font-semibold text-ink">
          <FlowGlyph progress={1} tone="heat" size={20} />
          Fluid Desk
        </Link>
        <button onClick={() => setSearch(true)} className="ml-auto inline-flex h-9 w-9 items-center justify-center rounded-md hover:bg-sunken" aria-label="Search">
          <Search size={17} />
        </button>
        <ThemeToggle />
      </div>

      {/* mobile drawer */}
      {drawer && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-ink/30" onClick={() => setDrawer(false)} />
          <div className="scrollbar-thin absolute inset-y-0 left-0 w-[284px] max-w-[85vw] overflow-y-auto border-r border-rule bg-paper px-3 py-5">
            <button onClick={() => setDrawer(false)} className="absolute right-3 top-4 inline-flex h-8 w-8 items-center justify-center rounded-md hover:bg-sunken" aria-label="Close navigation">
              <X size={16} />
            </button>
            <Sidebar onNavigate={() => setDrawer(false)} onSearch={() => setSearch(true)} />
          </div>
        </div>
      )}

      <main id="main" className="lg:pl-[264px]">
        {storageWarning && (
          <div role="alert" className="flex items-start gap-3 border-b border-warn/40 bg-warn-soft px-6 py-2.5 text-sm text-ink">
            <span className="flex-1">{storageWarning}</span>
            <button onClick={() => setStorageWarning(null)} className="text-muted hover:text-ink" aria-label="Dismiss">
              <X size={15} />
            </button>
          </div>
        )}
        <div className="mx-auto max-w-[1080px] px-4 pb-24 pt-8 sm:px-8 lg:pt-12">{children}</div>
      </main>

      <SearchPalette open={search} onClose={() => setSearch(false)} />
    </div>
  )
}
