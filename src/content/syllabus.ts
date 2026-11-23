import type { Unit } from './types'

/**
 * Units and syllabus text, transcribed from the official syllabus image (source/syllabus.png,
 * 42 contact hours). Spacing has been restored where the image ran words together (Units 3–5);
 * wording is otherwise verbatim, including its own typos ("dragon flat plate" = "drag on flat plate").
 */
export const UNITS: Unit[] = [
  {
    id: 'u1',
    number: 1,
    title: 'Fluid Properties, Statics & Kinematics',
    hours: 10,
    syllabus:
      'Introduction: Types of fluid and flow, continuum, fluid properties. Fluid Statics: Pressure variation in a static fluid; hydrostatic manometry; forces on planes and curved surfaces, stability of submerged and floating bodies. Fluid kinematics: General description of fluid motion, steady flow, uniform flow; stream, streak and path lines; Lagrangian and Eulerian approach; Continuity equation, particle acceleration; rotational and irrotational flow; stream function; velocity potential function, flow nets; circulation; simple flows; source, sink, vortex, doublet, free and forced vortex.',
    chapterNote:
      'Chapters 1–5. Streak lines are only named in the end-of-chapter questions, so their definition is supplementary. Thermodynamic properties of gases (§1.4) and accelerated containers (§3.8) are in the book but outside this syllabus.',
    refs: [
      { chapter: 1, pages: '1–34' },
      { chapter: 2, pages: '35–68' },
      { chapter: 3, pages: '69–130' },
      { chapter: 4, pages: '131–162' },
      { chapter: 5, pages: '163–258' },
    ],
  },
  {
    id: 'u2',
    number: 2,
    title: 'Fluid Dynamics & Dimensional Analysis',
    hours: 7,
    syllabus:
      'Fluid Dynamics: Concept of system and control volume; Reynolds’s transport theorem, Euler’s equation, Bernoulli’s equation, Navier Stokes equation; Flow measurement-Venturimeter, Orifice meter, Pitot-tube, flow meters, notches. Dimensional analysis: Buckingham’s –pi Theorem. Non-dimensional parameters, similarity and its application to fluid problems.',
    chapterNote:
      'Chapter 6 (dynamics, flow meters), Chapter 8 (notches) and Chapter 12 (dimensional analysis). The book has no Reynolds transport theorem and only names the Navier–Stokes equation, so both are written in as supplementary.',
    refs: [
      { chapter: 6, pages: '259–316' },
      { chapter: 8, pages: '355–386' },
      { chapter: 12, pages: '559–610' },
    ],
  },
  {
    id: 'u3',
    number: 3,
    title: 'Viscous Flow',
    hours: 7,
    syllabus:
      'Viscous flow: Laminar flow between parallel surfaces and through the circular pipes, Momentum and Kinetic energy correction factors; power absorbed in viscous resistance, film lubrication.',
    chapterNote:
      'Fully covered by Chapter 9 (Viscous Flow). The book treats bearings under “power absorbed”, with no section called film lubrication; the lubrication view is added. Viscometers (§9.8) are not named in the syllabus but were asked in the 2024 paper, so they are included.',
    refs: [{ chapter: 9, pages: '387–432' }],
  },
  {
    id: 'u4',
    number: 4,
    title: 'Turbulent Flow & Pipe Losses',
    hours: 7,
    syllabus:
      'Turbulent flow: Transition from laminar, to turbulent flow, turbulence and turbulence intensity, turbulence modelling, Prandtl mixing length hypothesis; flow losses in pipes-major and minor losses, pipes in series and parallel, hydraulically smooth and rough pipes, friction factor charts.',
    chapterNote:
      'Chapter 10 (Turbulent Flow) and Chapter 11 (Flow Through Pipes). Turbulence intensity, turbulence modelling and the Moody friction-factor chart are not in the book and are supplementary.',
    refs: [
      { chapter: 10, pages: '433–464' },
      { chapter: 11, pages: '465–558' },
    ],
  },
  {
    id: 'u5',
    number: 5,
    title: 'Boundary Layer, Drag & Lift',
    hours: 7,
    syllabus:
      'Laminar and Turbulent Boundary Layer flows: Boundary layer concept, boundary layer thickness, displacement, momentum and energy thickness. Momentum integral equation; drag on flat plate. Boundary separation. Flow around immersed bodies- drag and lift.',
    chapterNote: 'Fully covered by Chapter 13 (Boundary Layer Flow) and Chapter 14 (Forces on Sub-merged Bodies).',
    refs: [
      { chapter: 13, pages: '611–656' },
      { chapter: 14, pages: '657–692' },
    ],
  },
  {
    id: 'u6',
    number: 6,
    title: 'Impact of Jets, Turbines & Pumps',
    hours: 4,
    syllabus:
      'Hydraulic Turbines and Pumps: Impact of Jet on Flat, Curved & Moving Plates –Hydraulic turbines; Definition and Classification, Hydraulic pumps; Definition and Classification, Euler’s turbo-machine equation.',
    chapterNote:
      'Chapter 17 (Impact of Jets), Chapter 18 (Turbines) and Chapter 19 (Centrifugal Pumps). The syllabus asks only for definition and classification of the machines. Unit quantities, specific speed, speed ratio, flow ratio and degree of reaction go beyond it, but the 2024 paper asked them, so they are included and marked.',
    refs: [
      { chapter: 17, pages: '803–852' },
      { chapter: 18, pages: '853–944' },
      { chapter: 19, pages: '945–992' },
    ],
  },
]

export const TOTAL_HOURS = UNITS.reduce((s, u) => s + u.hours, 0)

export const BOOK = {
  title: 'A Textbook of Fluid Mechanics and Hydraulic Machines',
  author: 'R.K. Bansal',
  publisher: 'Laxmi Publications',
  year: 2010,
  edition: 'Revised 9th edition',
  short: 'Bansal',
}
