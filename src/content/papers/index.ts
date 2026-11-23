import type { Paper, PaperKind, PaperPart } from '../types'
import { OFFICIAL_PAPERS } from './official'
import { GENERATED_PAPERS } from './generated'
import { PREDICTED_PAPERS } from './predicted'

export { PAPER_SCHEME, PAPER_HEADER, CO_LABEL, SCHEME_TOTAL } from './scheme'

export const PAPERS: Paper[] = [...OFFICIAL_PAPERS, ...GENERATED_PAPERS, ...PREDICTED_PAPERS]

export const PAPER_KIND_META: Record<PaperKind, { label: string; blurb: string }> = {
  official: {
    label: 'Official paper',
    blurb: 'The real ME205 end-term paper, transcribed word for word from your scan, with model answers written to the marks.',
  },
  generated: {
    label: 'Generated from Bansal',
    blurb:
      'Full papers built from Bansal’s theory sections and solved problems, set to the official paper’s marking scheme: the same marks, the same CO tags and the same either/or.',
  },
  predicted: {
    label: 'Predicted for the end-term',
    blurb:
      'Papers built to mirror the November 2024 paper. Each part says which 2024 question it shadows and why it is likely to come up.',
  },
}

const paperById = new Map(PAPERS.map((p) => [p.id, p]))
export const getPaper = (id: string): Paper | undefined => paperById.get(id)
export const papersOfKind = (kind: PaperKind): Paper[] => PAPERS.filter((p) => p.kind === kind)

/** Every part of a paper, including the Q5 "or" alternative. */
export function partsOf(paper: Paper): PaperPart[] {
  return paper.questions.flatMap((q) => (q.orPart ? [...q.parts, q.orPart] : q.parts))
}

/** All paper parts across the desk, with their paper and question, for search and topic links. */
export const PAPER_PARTS = PAPERS.flatMap((paper) =>
  paper.questions.flatMap((q) => (q.orPart ? [...q.parts, q.orPart] : q.parts).map((part) => ({ paper, question: q.number, part }))),
)

/**
 * Self-awarded score for a paper. In a question with an either/or, only the better of the
 * last part and its alternative counts, because a candidate answers one of them.
 */
export function paperScore(paper: Paper, marks: Record<string, number>): { awarded: number; marked: number; max: number } {
  let awarded = 0
  let marked = 0
  let max = 0
  for (const q of paper.questions) {
    const main = q.orPart ? q.parts.slice(0, -1) : q.parts
    for (const p of main) {
      max += p.marks
      if (marks[p.id] !== undefined) {
        awarded += marks[p.id]
        marked += p.marks
      }
    }
    if (q.orPart) {
      const last = q.parts[q.parts.length - 1]
      max += last.marks
      const a = marks[last.id]
      const b = marks[q.orPart.id]
      if (a !== undefined || b !== undefined) {
        awarded += Math.max(a ?? 0, b ?? 0)
        marked += last.marks
      }
    }
  }
  return { awarded, marked, max }
}
