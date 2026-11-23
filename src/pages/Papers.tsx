import { useEffect, useState } from 'react'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import { ArrowLeft, ArrowRight, Eye, EyeOff, FileText, Play, Printer, RotateCcw, Square, Timer } from 'lucide-react'
import { CO_LABEL, PAPER_HEADER, PAPER_KIND_META, getPaper, paperScore, papersOfKind, partsOf } from '../content/papers'
import { getTopic } from '../content'
import type { CO, Paper, PaperKind, PaperPart, PaperQuestion } from '../content/types'
import {
  PAPER_DURATION_MS,
  clearPaperMarks,
  setPaperMark,
  startPaperTimer,
  stopPaperTimer,
  useStore,
} from '../lib/store'
import { Markdown } from '../components/Markdown'
import { Empty, PageHeader, btn } from '../components/ui'
import { NotFound } from './NotFound'
import { RichText } from '../diagrams/DiagramFigure'

const KINDS: PaperKind[] = ['official', 'generated', 'predicted']

/* ------------------------------------------------------------------------------
 * /papers — three sections: official, generated from Bansal, predicted
 * ---------------------------------------------------------------------------- */

export function PapersPage() {
  const [params, setParams] = useSearchParams()
  const kind = (KINDS.includes(params.get('kind') as PaperKind) ? params.get('kind') : 'official') as PaperKind
  const marks = useStore((s) => s.paperMarks)
  const timers = useStore((s) => s.paperTimers)
  const runs = useStore((s) => s.paperRuns)
  const list = papersOfKind(kind)

  return (
    <div>
      <PageHeader eyebrow="Papers" title="End-term papers">
        Every paper here follows the official November 2024 marking scheme: five questions of 8 marks, 40 in all, in 3 hours. The parts are 3 · 2 · 3, 3 · 3 · 2,
        3 · 3 · 2, 3 · 2 · 3 and 4 · 4 (or 4), with the same CO tags. Study a paper with answers on demand, or sit it against a 3-hour clock and mark yourself
        afterwards.
      </PageHeader>

      <div role="tablist" aria-label="Paper section" className="mb-3 flex flex-wrap gap-1 rounded-lg border border-rule bg-surface p-0.5 sm:inline-flex">
        {KINDS.map((k) => (
          <button
            key={k}
            role="tab"
            aria-selected={kind === k}
            onClick={() => setParams(k === 'official' ? {} : { kind: k })}
            className={`flex-1 rounded-md px-4 py-1.5 text-sm sm:flex-none ${kind === k ? 'bg-ink font-medium text-paper' : 'text-ink-2 hover:text-ink'}`}
          >
            {PAPER_KIND_META[k].label}
            <span className="num ml-1.5 text-[11px] opacity-70">{papersOfKind(k).length}</span>
          </button>
        ))}
      </div>
      <p className="mb-8 max-w-3xl text-sm text-muted">{PAPER_KIND_META[kind].blurb}</p>

      {list.length === 0 ? (
        <Empty title="No papers in this section yet" />
      ) : (
        <ul className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {list.map((p) => {
            const sc = paperScore(p, marks)
            const sat = runs.filter((r) => r.paperId === p.id).length
            const running = timers[p.id] !== undefined
            return (
              <li key={p.id}>
                <Link to={`/papers/${p.id}`} className="group flex h-full flex-col gap-3 rounded-xl border border-rule bg-surface p-5 hover:border-rule-strong">
                  <div className="flex items-start gap-3">
                    <FileText size={18} className="mt-0.5 shrink-0 text-cool" aria-hidden />
                    <div className="min-w-0 flex-1">
                      <h2 className="text-[16px] font-semibold leading-snug text-ink">{p.title}</h2>
                      {p.session && <div className="num mt-0.5 text-[11px] uppercase tracking-[0.1em] text-muted">{p.session}</div>}
                    </div>
                  </div>
                  <p className="text-[13.5px] leading-relaxed text-ink-2">{p.blurb}</p>
                  <div className="mt-auto flex flex-wrap items-center gap-3 text-xs text-muted">
                    <span className="num">40 marks · 3 h</span>
                    {sc.marked > 0 && (
                      <span className="num text-ink">
                        self-marked {sc.awarded}/{sc.marked}
                      </span>
                    )}
                    {sat > 0 && <span className="num">sat {sat}×</span>}
                    {running && <span className="num font-medium text-heat">timer running</span>}
                    <ArrowRight size={13} className="ml-auto opacity-0 transition-opacity group-hover:opacity-100" aria-hidden />
                  </div>
                </Link>
              </li>
            )
          })}
        </ul>
      )}

      <section className="mt-12 max-w-3xl">
        <h2 className="mb-3 text-[13px] font-semibold uppercase tracking-[0.1em] text-ink-2">Course outcomes on the paper</h2>
        <dl className="divide-y divide-rule rounded-xl border border-rule bg-surface text-sm">
          {(Object.keys(CO_LABEL) as CO[]).map((co) => (
            <div key={co} className="grid grid-cols-[64px_1fr] gap-3 px-4 py-2.5">
              <dt className="num font-medium text-ink">{co}</dt>
              <dd className="text-ink-2">{CO_LABEL[co]}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-2 text-xs text-muted">The paper prints only the CO tags. These meanings are inferred from which questions carry each tag.</p>
      </section>
    </div>
  )
}

/* ------------------------------------------------------------------------------
 * /papers/:paperId — the paper itself
 * ---------------------------------------------------------------------------- */

function useNow(active: boolean) {
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    if (!active) return
    const t = window.setInterval(() => setNow(Date.now()), 1000)
    return () => window.clearInterval(t)
  }, [active])
  return now
}

function fmtClock(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000))
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  return `${h}:${String(m).padStart(2, '0')}:${String(sec).padStart(2, '0')}`
}

export function PaperPage() {
  const { paperId = '' } = useParams()
  const paper = getPaper(paperId)
  const marks = useStore((s) => s.paperMarks)
  const startedAt = useStore((s) => s.paperTimers[paperId])
  const running = startedAt !== undefined
  const now = useNow(running)
  const [showAll, setShowAll] = useState(false)
  const [params] = useSearchParams()
  const focus = params.get('part')

  useEffect(() => {
    if (focus) requestAnimationFrame(() => document.getElementById(focus)?.scrollIntoView({ block: 'start' }))
  }, [focus, paperId])

  if (!paper) return <NotFound what="paper" />

  const remaining = running ? startedAt + PAPER_DURATION_MS - now : PAPER_DURATION_MS
  const overtime = running && remaining < 0
  const sc = paperScore(paper, marks)
  const ids = partsOf(paper).map((p) => p.id)

  return (
    <div className="max-w-4xl">
      <Link to={`/papers${paper.kind === 'official' ? '' : `?kind=${paper.kind}`}`} className="no-print mb-5 inline-flex items-center gap-1 text-sm text-muted hover:text-ink">
        <ArrowLeft size={14} aria-hidden /> {PAPER_KIND_META[paper.kind].label}s
      </Link>

      {/* toolbar */}
      <div className="no-print sticky top-[53px] z-20 -mx-4 mb-6 flex flex-wrap items-center gap-2 border-b border-rule bg-paper/95 px-4 py-3 backdrop-blur sm:-mx-8 sm:px-8 lg:top-0">
        {running ? (
          <>
            <span className={`num inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-sm font-medium ${overtime ? 'border-heat text-heat' : 'border-rule text-ink'}`} aria-live="off">
              <Timer size={14} aria-hidden />
              {overtime ? `+${fmtClock(-remaining)} over` : fmtClock(remaining)}
            </span>
            <button className={btn.primary} onClick={() => stopPaperTimer(paper.id, true)}>
              <Square size={13} aria-hidden /> Finish and mark
            </button>
            <button className={btn.ghost} onClick={() => stopPaperTimer(paper.id, false)}>
              Abandon
            </button>
            <span className="text-xs text-muted">Answers stay hidden until you finish.</span>
          </>
        ) : (
          <>
            <button
              className={btn.primary}
              onClick={() => {
                setShowAll(false)
                startPaperTimer(paper.id)
              }}
            >
              <Play size={13} aria-hidden /> Sit it timed (3 h)
            </button>
            <button className={btn.secondary} onClick={() => setShowAll((v) => !v)}>
              {showAll ? <EyeOff size={14} aria-hidden /> : <Eye size={14} aria-hidden />} {showAll ? 'Hide all answers' : 'Show all answers'}
            </button>
            <button className={btn.ghost} onClick={() => window.print()}>
              <Printer size={14} aria-hidden /> Print
            </button>
          </>
        )}
        <span className="num ml-auto text-sm text-ink-2" title="Self-awarded marks / marks you have marked so far">
          {sc.marked > 0 ? `${sc.awarded}/${sc.marked} marked` : 'Not marked yet'} · max {sc.max}
        </span>
        {sc.marked > 0 && !running && (
          <button className={btn.ghost} onClick={() => clearPaperMarks(ids)} title="Clear your marks for this paper">
            <RotateCcw size={13} aria-hidden /> Reset marks
          </button>
        )}
      </div>

      <PaperSheet paper={paper} locked={running} showAll={showAll} />
    </div>
  )
}

/** The exam-paper rendering: header block, note, numbered questions. */
function PaperSheet({ paper, locked, showAll }: { paper: Paper; locked: boolean; showAll: boolean }) {
  return (
    <article className="rounded-xl border border-rule bg-surface">
      <header className="border-b border-rule px-5 py-6 text-center sm:px-8">
        <div className="mb-3 flex flex-wrap items-center justify-center gap-2">
          <span className={`rounded-full border px-2 py-0.5 text-[11px] font-medium ${paper.kind === 'official' ? 'border-cool/50 text-cool' : 'border-dashed border-rule-strong text-muted'}`}>
            {PAPER_KIND_META[paper.kind].label}
          </span>
        </div>
        <div className="num text-[12px] uppercase tracking-[0.12em] text-muted">
          {PAPER_HEADER.semester} · {PAPER_HEADER.programme}
        </div>
        <div className="mt-1 text-[13px] font-semibold uppercase tracking-[0.08em] text-ink-2">
          {PAPER_HEADER.exam}
          {paper.session ? ` · ${paper.session}` : ''}
        </div>
        <h1 className="mt-2 text-[22px] font-semibold leading-tight tracking-[-0.01em] text-ink sm:text-[26px]">{paper.title}</h1>
        <div className="mt-1 text-[14px] text-ink-2">{PAPER_HEADER.course}</div>
        <div className="num mt-3 flex justify-between text-[13px] text-ink-2">
          <span>Time: {PAPER_HEADER.time}</span>
          <span>Max. Marks: {PAPER_HEADER.maxMarks}</span>
        </div>
        <div className="mt-4 rounded-md border border-rule-strong px-4 py-2 text-left text-[13.5px] text-ink">
          <b>Note:</b> {PAPER_HEADER.note.join(' ')}
        </div>
      </header>
      <ol className="divide-y divide-rule">
        {paper.questions.map((q) => (
          <QuestionBlock key={q.number} q={q} locked={locked} showAll={showAll} />
        ))}
      </ol>
      {paper.sourceFile && <p className="border-t border-rule px-5 py-3 text-xs text-muted sm:px-8">Transcribed from {paper.sourceFile}. Wording kept as printed.</p>}
    </article>
  )
}

function QuestionBlock({ q, locked, showAll }: { q: PaperQuestion; locked: boolean; showAll: boolean }) {
  return (
    <li className="px-5 py-5 sm:px-8">
      <div className="num mb-3 text-[12px] font-semibold uppercase tracking-[0.12em] text-ink">Q-{q.number}</div>
      <div className="space-y-5">
        {q.parts.map((p) => (
          <PartBlock key={p.id} part={p} locked={locked} showAll={showAll} />
        ))}
        {q.orPart && (
          <>
            <div className="flex items-center gap-3 text-[12px] font-semibold uppercase tracking-[0.14em] text-muted">
              <span className="h-px flex-1 bg-rule" />
              or
              <span className="h-px flex-1 bg-rule" />
            </div>
            <PartBlock part={q.orPart} locked={locked} showAll={showAll} />
          </>
        )}
      </div>
    </li>
  )
}

function PartBlock({ part, locked, showAll }: { part: PaperPart; locked: boolean; showAll: boolean }) {
  const [open, setOpen] = useState(false)
  const awarded = useStore((s) => s.paperMarks[part.id])
  const visible = !locked && (open || showAll)

  return (
    <section id={part.id} className="scroll-mt-32">
      <div className="grid grid-cols-[28px_minmax(0,1fr)] gap-x-2 sm:grid-cols-[32px_minmax(0,1fr)_auto] sm:gap-x-4">
        <span className="num pt-[3px] text-[13px] font-medium text-ink-2">{part.label === 'or' ? '' : `(${part.label})`}</span>
        <div className="min-w-0">
          <Markdown tight>{part.prompt}</Markdown>
        </div>
        <div className="num col-start-2 mt-1.5 flex gap-1.5 text-[11.5px] sm:col-start-3 sm:mt-0.5 sm:flex-col sm:items-end">
          <span className="rounded bg-sunken px-1.5 py-0.5 text-ink">[Marks {part.marks}]</span>
          <span className="rounded px-1.5 py-0.5 text-muted" title={CO_LABEL[part.co]}>
            [{part.co}]
          </span>
        </div>
      </div>

      <div className="no-print mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 pl-[36px] sm:pl-[48px]">
        {part.topicIds.map((tid) => {
          const t = getTopic(tid)
          return t ? (
            <Link key={tid} to={`/topic/${tid}`} className="text-[12px] text-muted underline-offset-2 hover:text-cool hover:underline">
              → {t.title}
            </Link>
          ) : null
        })}
        {part.bookRef && <span className="num text-[11px] text-muted">from Bansal {part.bookRef}</span>}
        {awarded !== undefined && (
          <span className="num text-[12px] font-medium text-ok">
            you: {awarded}/{part.marks}
          </span>
        )}
      </div>

      {part.alignsWith && !locked && (
        <p className="no-print mt-2 ml-[36px] rounded-md border-l-2 border-cool bg-cool-soft px-3 py-1.5 text-[12.5px] leading-relaxed text-ink-2 sm:ml-[48px]">
          <span className="font-medium text-cool">Mirrors 2024: </span>
          {part.alignsWith}
        </p>
      )}

      {!locked && (
        <div className="no-print mt-2 pl-[36px] sm:pl-[48px]">
          {!showAll && (
            <button className={btn.ghost} onClick={() => setOpen((o) => !o)} aria-expanded={open}>
              {open ? <EyeOff size={14} aria-hidden /> : <Eye size={14} aria-hidden />} {open ? 'Hide model answer' : 'Model answer & marking'}
            </button>
          )}
          {visible && (
            <div className="mt-2 rounded-lg border border-rule bg-paper">
              <div className="px-4 py-3">
                <div className="mb-1 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-2">Model answer</div>
                <Markdown tight>{part.answer}</Markdown>
              </div>
              <div className="border-t border-rule px-4 py-3">
                <div className="mb-1.5 text-[11px] font-semibold uppercase tracking-[0.1em] text-ink-2">Where the {part.marks} marks go</div>
                <ul className="space-y-1 text-[13px] text-ink-2">
                  {part.scheme.map((s, i) => (
                    <li key={i} className="flex gap-2">
                      <span className="num w-8 shrink-0 text-right font-medium text-ink">{s.marks}</span>
                      <span><RichText text={s.for} /></span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap items-center gap-1.5 border-t border-rule px-4 py-2.5">
                <span className="mr-1 text-[12.5px] text-ink-2">Mark yourself:</span>
                {Array.from({ length: part.marks * 2 + 1 }, (_, i) => i / 2).map((m) => (
                  <button
                    key={m}
                    onClick={() => setPaperMark(part.id, awarded === m ? null : m)}
                    aria-pressed={awarded === m}
                    className={`num h-7 min-w-[34px] rounded-md border px-1.5 text-[12px] ${
                      awarded === m ? 'border-ink bg-ink text-paper' : 'border-rule bg-surface text-ink-2 hover:border-rule-strong'
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  )
}
