/**
 * Content model for the Fluid Mechanics desk (ME205, Fluid Mechanics & Hydraulic Machines).
 *
 * All study material lives in plain TypeScript objects under src/content so it can be
 * corrected or extended without touching UI code. Every item carries a source
 * attribution: either a textbook reference (R.K. Bansal, A Textbook of Fluid Mechanics
 * and Hydraulic Machines, Laxmi, 9th ed.) or an explicit "generated" / "supplementary" marker.
 *
 * Markdown fields support GitHub-flavoured markdown, $inline$ and $$display$$ KaTeX,
 * callouts written as `> [!DEF] Term`, `> [!EXAM]`, `> [!WARN]`, `> [!NOTE]`, `> [!SUPP]`,
 * and inline diagrams written as `![Caption](diagram:<diagram-id>)`.
 */

export type UnitId = 'u1' | 'u2' | 'u3' | 'u4' | 'u5' | 'u6'

/** How well the textbook covers a syllabus topic. */
export type Coverage = 'full' | 'partial' | 'missing'

export interface BookRef {
  chapter: number
  /** e.g. "§25.12.5" */
  section?: string
  /** printed page numbers, e.g. "866–868" */
  pages: string
}

export interface Unit {
  id: UnitId
  number: number
  title: string
  hours: number
  /** syllabus text, verbatim from the official syllabus */
  syllabus: string
  chapterNote: string
  refs: BookRef[]
}

export interface TheorySection {
  id: string
  title: string
  /** markdown */
  body: string
  /** true when the section is NOT from the textbook (gap-filling material) */
  supplementary?: boolean
}

export interface DerivationStep {
  /** KaTeX (display) */
  math: string
  /** why this step is performed — markdown */
  why: string
}

export interface Derivation {
  id: string
  title: string
  /** what we are proving, markdown */
  goal: string
  assumptions?: string[]
  steps: DerivationStep[]
  /** final boxed result, KaTeX */
  result: string
  ref?: BookRef
}

export interface Flashcard {
  id: string
  front: string
  back: string
}

export interface Topic {
  id: string
  unitId: UnitId
  title: string
  /** one-line summary used in lists */
  summary: string
  /** the syllabus phrase(s) this topic answers to */
  syllabusPhrases: string[]
  coverage: Coverage
  coverageNote?: string
  /** examined in the official November 2024 end-term paper */
  highlighted?: boolean
  refs: BookRef[]
  sections: TheorySection[]
  derivations?: Derivation[]
  /** exam-oriented takeaways; also the topic's revision notes */
  keyPoints: string[]
  misconceptions?: string[]
  flashcards: Flashcard[]
  diagrams?: string[]
}

export type Difficulty = 1 | 2 | 3

export type Source =
  | { kind: 'textbook'; ref: string; page: number }
  | { kind: 'generated' }

export interface WorkedExample {
  id: string
  topicId: string
  title: string
  source: Source
  difficulty: Difficulty
  /** markdown problem statement (textbook wording kept where the source is textbook) */
  statement: string
  given: string[]
  find: string[]
  /** principle / formulas used, markdown */
  approach: string
  steps: { label: string; work: string }[]
  answer: string
  concept: string
  observations?: string[]
  /** note on independent re-calculation, e.g. book rounding differences */
  checkNote?: string
}

export type QuestionType =
  | 'mcq'
  | 'conceptual'
  | 'short'
  | 'long'
  | 'numerical'
  | 'derivation'
  | 'application'
  | 'diagram'

export interface Question {
  id: string
  topicId: string
  type: QuestionType
  difficulty: Difficulty
  prompt: string
  source: Source
  hints?: string[]
  /** for mcq */
  options?: string[]
  answer?: number
  /** worked solution / model answer (markdown). For MCQs: explanation */
  solution: string
  /** answer printed in the book, when the book gives one */
  bookAnswer?: string
}

export interface FormulaVar {
  sym: string
  meaning: string
  unit: string
}

export interface Formula {
  id: string
  topicId: string
  name: string
  latex: string
  vars: FormulaVar[]
  conditions: string
  meaning: string
  important?: boolean
  related?: string[]
  ref?: BookRef
}

export type DiagramKind = 'computed' | 'recreated' | 'qualitative' | 'interactive'

export interface DiagramMeta {
  id: string
  title: string
  topicId: string
  kind: DiagramKind
  caption: string
  /** which book figure it corresponds to, if any */
  bookFigure?: string
}

/* ------------------------------------------------------------------------------
 * Exam papers
 * ---------------------------------------------------------------------------- */

/** Course outcomes as tagged on the official paper. */
export type CO = 'CO-1' | 'CO-2' | 'CO-3' | 'CO-4' | 'CO-5' | 'CO-6'

export type PaperKind = 'official' | 'generated' | 'predicted'

export interface PaperPart {
  id: string
  /** "a", "b", "c" — or "or" for the alternative of an either/or part */
  label: string
  marks: number
  co: CO
  /** question text, markdown */
  prompt: string
  /** topics this part examines (links into the study material) */
  topicIds: string[]
  /** model answer, markdown — written to the length the marks deserve */
  answer: string
  /** how the marks split, e.g. ["1 — statement of …", "2 — derivation …"]; must sum to `marks` */
  scheme: { marks: number; for: string }[]
  /** generated papers: the Bansal section/example the part was built from */
  bookRef?: string
  /** predicted papers: which 2024 question this mirrors and why */
  alignsWith?: string
}

export interface PaperQuestion {
  number: number
  parts: PaperPart[]
  /** an "or" alternative that replaces the LAST part, as in Q5 of the Nov-2024 paper */
  orPart?: PaperPart
}

export interface Paper {
  id: string
  kind: PaperKind
  title: string
  /** one-line description shown in lists */
  blurb: string
  /** e.g. "November 2024" for the official paper */
  session?: string
  questions: PaperQuestion[]
  /** for official papers, where the scan is kept */
  sourceFile?: string
}
