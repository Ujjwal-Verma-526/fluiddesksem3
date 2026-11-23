import type { CO } from '../types'

/**
 * The marking scheme of the official ME205 end-term paper (November 2024), transcribed from
 * source/endsem-nov-2024.pdf. Every paper in the desk — official, generated and predicted —
 * must match this structure exactly: same questions, same parts, same marks, same CO tags,
 * and the same either/or on Q5(b). `npm run validate` enforces it.
 */

export interface SchemePart {
  label: string
  marks: number
  co: CO
}

export interface SchemeQuestion {
  number: number
  parts: SchemePart[]
  /** marks and CO of the "or" alternative to the last part, if the question has one */
  orPart?: SchemePart
}

export const PAPER_SCHEME: SchemeQuestion[] = [
  {
    number: 1,
    parts: [
      { label: 'a', marks: 3, co: 'CO-1' },
      { label: 'b', marks: 2, co: 'CO-1' },
      { label: 'c', marks: 3, co: 'CO-1' },
    ],
  },
  {
    number: 2,
    parts: [
      { label: 'a', marks: 3, co: 'CO-3' },
      { label: 'b', marks: 3, co: 'CO-3' },
      { label: 'c', marks: 2, co: 'CO-3' },
    ],
  },
  {
    number: 3,
    parts: [
      { label: 'a', marks: 3, co: 'CO-2' },
      { label: 'b', marks: 3, co: 'CO-2' },
      { label: 'c', marks: 2, co: 'CO-4' },
    ],
  },
  {
    number: 4,
    parts: [
      { label: 'a', marks: 3, co: 'CO-3' },
      { label: 'b', marks: 2, co: 'CO-5' },
      { label: 'c', marks: 3, co: 'CO-5' },
    ],
  },
  {
    number: 5,
    parts: [
      { label: 'a', marks: 4, co: 'CO-2' },
      { label: 'b', marks: 4, co: 'CO-6' },
    ],
    orPart: { label: 'or', marks: 4, co: 'CO-6' },
  },
]

export const PAPER_HEADER = {
  semester: 'III Semester',
  programme: 'B.Tech. (Mechanical Engineering)',
  exam: 'End Term Examination',
  course: 'ME205 Fluid Mechanics & Hydraulic Machines',
  time: '3 Hours',
  maxMarks: 40,
  note: ['All questions are compulsory.', 'Assume suitable missing data, if any.'],
}

/**
 * What each CO covers. The paper prints only the tags; these meanings are inferred from the
 * questions that carry each tag in the November 2024 paper (e.g. CO-5 = both impact-of-jet
 * parts, CO-6 = both turbine parts).
 */
export const CO_LABEL: Record<CO, string> = {
  'CO-1': 'Fluid statics: pressure, manometry, hydrostatic forces, buoyancy and stability',
  'CO-2': 'Kinematics and dynamics: stream function, potential flow, Euler and Bernoulli, dimensional analysis',
  'CO-3': 'Viscous flow: viscosity, laminar flow, pipe-flow losses, viscometers',
  'CO-4': 'Boundary layer: growth, separation and its control',
  'CO-5': 'Impact of jets on plates and vanes',
  'CO-6': 'Hydraulic machines: classification, Euler turbine equation, unit quantities, specific speed',
}

export const SCHEME_TOTAL = PAPER_SCHEME.reduce((s, q) => s + q.parts.reduce((a, p) => a + p.marks, 0), 0)
