import { Arrow, Line, Sketch, T, Wall, Water, sample } from './kit'

/* =============================================================================
 * Flow measurement (Unit 2), Reynolds’ experiment (Unit 4), viscometers (Unit 3)
 * ========================================================================== */

export function Venturimeter() {
  // half-height of the bore along x: inlet 40, throat 20, convergent short, divergent long
  const half = (x: number) => {
    if (x < 110) return 40
    if (x < 160) return 40 - ((x - 110) / 50) * 20
    if (x < 185) return 20
    if (x < 365) return 20 + ((x - 185) / 180) * 20
    return 40
  }
  const top = sample((t) => [30 + t * 380, 100 - half(30 + t * 380)], 0, 1, 120)
  const bot = sample((t) => [410 - t * 380, 100 + half(410 - t * 380)], 0, 1, 120).replace(/^M/, 'L')
  const MERC = 'color-mix(in oklab, var(--muted) 55%, var(--surface))'
  return (
    <Sketch w={440} h={270} label="Horizontal venturimeter with a differential manometer between inlet and throat">
      <path d={`${top} ${bot} Z`} fill="var(--water)" stroke="var(--ink)" strokeWidth={1.6} />
      <Arrow x1={40} y1={100} x2={90} y2={100} ink="cool" />
      <T x={80} y={52} ink="muted">inlet ①</T>
      <T x={172} y={72} ink="muted">throat ②</T>
      <T x={290} y={52} ink="muted">divergent cone (5–7°)</T>
      {/* manometer */}
      <line x1={80} y1={140} x2={80} y2={225} stroke="var(--ink)" strokeWidth={14} />
      <line x1={172} y1={120} x2={172} y2={225} stroke="var(--ink)" strokeWidth={14} />
      <line x1={80} y1={225} x2={172} y2={225} stroke="var(--ink)" strokeWidth={14} />
      <line x1={80} y1={140} x2={80} y2={225} stroke="var(--water)" strokeWidth={11} />
      <line x1={172} y1={120} x2={172} y2={225} stroke="var(--water)" strokeWidth={11} />
      <line x1={80} y1={212} x2={80} y2={225} stroke={MERC} strokeWidth={11} />
      <line x1={172} y1={182} x2={172} y2={225} stroke={MERC} strokeWidth={11} />
      <line x1={80} y1={225} x2={172} y2={225} stroke={MERC} strokeWidth={11} />
      <Arrow x1={200} y1={212} x2={200} y2={182} ink="muted" both width={1} />
      <T x={206} y={202} anchor="start" italic>x (mercury)</T>
      <T x={240} y={150} anchor="start" ink="heat">Q = C_d a₁a₂√(2gh) / √(a₁² − a₂²)</T>
      <T x={240} y={170} anchor="start" ink="muted">h = x (S_g/S_o − 1)</T>
    </Sketch>
  )
}

export function PitotTube() {
  return (
    <Sketch w={440} h={240} label="Pitot-static tube in a pipe connected to a differential manometer">
      <Water d="M20,60 H420 V170 H20 Z" />
      <line x1={20} y1={60} x2={420} y2={60} stroke="var(--ink)" strokeWidth={2} />
      <line x1={20} y1={170} x2={420} y2={170} stroke="var(--ink)" strokeWidth={2} />
      {[85, 115, 145].map((y) => (
        <Arrow key={y} x1={40} y1={y} x2={110} y2={y} ink="cool" width={1.2} />
      ))}
      {/* probe: horizontal nose facing upstream, then vertical stem */}
      <Line d="M170,115 H300 V20" width={9} />
      <Line d="M170,115 H300 V20" width={5} ink="faint" />
      <circle cx={170} cy={115} r={4} fill="var(--heat)" />
      <T x={166} y={136} anchor="middle" ink="heat">stagnation hole</T>
      {[210, 230].map((x) => (
        <circle key={x} cx={x} cy={110} r={2.2} fill="var(--ink)" />
      ))}
      <T x={224} y={100} ink="muted">static holes</T>
      <T x={310} y={36} anchor="start">to differential</T>
      <T x={310} y={52} anchor="start">manometer</T>
      <T x={30} y={206} anchor="start" ink="heat">v = C_v √(2gh),  h = stagnation head − static head</T>
      <T x={30} y={224} anchor="start" ink="muted">measures the velocity at one point</T>
    </Sketch>
  )
}

export function Notches() {
  return (
    <Sketch w={440} h={210} label="Rectangular and triangular notches with head H">
      {/* rectangular */}
      <path d="M20,40 H90 V140 H170 V40 H240" fill="none" stroke="var(--ink)" strokeWidth={2} />
      <Water d="M90,70 H170 V140 H90 Z" />
      <line x1={70} y1={70} x2={190} y2={70} stroke="var(--cool)" strokeWidth={1.4} />
      <Arrow x1={190} y1={70} x2={190} y2={140} ink="muted" both width={1} />
      <T x={196} y={110} anchor="start" italic>H</T>
      <Arrow x1={90} y1={158} x2={170} y2={158} ink="muted" both width={1} />
      <T x={130} y={174} italic>L</T>
      <T x={130} y={198}>{'Q = ⅔ C_d L √(2g) H^{3/2}'}</T>
      {/* triangular */}
      <path d="M260,40 H300 L355,150 L410,40 H430" fill="none" stroke="var(--ink)" strokeWidth={2} />
      <Water d="M315,70 L355,150 L395,70 Z" />
      <line x1={295} y1={70} x2={420} y2={70} stroke="var(--cool)" strokeWidth={1.4} />
      <Arrow x1={422} y1={70} x2={422} y2={150} ink="muted" both width={1} />
      <T x={414} y={118} anchor="end" italic>H</T>
      <path d="M345,130 A22,22 0 0 0 365,130" fill="none" stroke="var(--heat)" />
      <T x={355} y={124} ink="heat" italic>θ</T>
      <T x={350} y={198}>{'Q = (8/15) C_d tan(θ/2) √(2g) H^{5/2}'}</T>
    </Sketch>
  )
}

export function ReynoldsExperiment() {
  const tube = (y: number) => (
    <g>
      <line x1={140} y1={y - 14} x2={410} y2={y - 14} stroke="var(--ink)" strokeWidth={1.4} />
      <line x1={140} y1={y + 14} x2={410} y2={y + 14} stroke="var(--ink)" strokeWidth={1.4} />
      <Water d={`M140,${y - 14} H410 V${y + 14} H140 Z`} />
    </g>
  )
  return (
    <Sketch w={440} h={240} label="Reynolds' experiment: dye filament laminar, transitional and turbulent">
      <rect x={20} y={20} width={100} height={200} fill="var(--water)" stroke="var(--ink)" strokeWidth={1.4} />
      <T x={70} y={14} ink="muted">tank</T>
      {tube(60)}
      {tube(120)}
      {tube(180)}
      <line x1={140} y1={60} x2={410} y2={60} stroke="var(--heat)" strokeWidth={2} />
      <T x={414} y={64} anchor="start" size={10}>laminar</T>
      <Line d={sample((t) => [140 + t * 270, 120 + (t > 0.35 ? 7 * Math.sin(t * 40) * (t - 0.35) * 2 : 0)], 0, 1, 160)} ink="heat" width={2} />
      <T x={414} y={124} anchor="start" size={10}>transition</T>
      <Line d={sample((t) => [140 + t * 120, 180 + 4 * Math.sin(t * 50) * t], 0, 1, 80)} ink="heat" width={2} />
      <rect x={262} y={167} width={148} height={26} fill="color-mix(in oklab, var(--heat) 30%, transparent)" />
      <T x={414} y={184} anchor="start" size={10}>turbulent</T>
      <T x={230} y={232} ink="muted">dye injected at the inlet; Re = VD/ν decides the pattern</T>
    </Sketch>
  )
}

export function Viscometers() {
  return (
    <Sketch w={440} h={240} label="Capillary tube viscometer and falling sphere viscometer">
      {/* capillary */}
      <rect x={20} y={30} width={70} height={60} fill="var(--water)" stroke="var(--ink)" strokeWidth={1.4} />
      <T x={55} y={24} ink="muted">constant head</T>
      <rect x={90} y={70} width={150} height={10} fill="var(--water)" stroke="var(--ink)" strokeWidth={1.2} />
      <line x1={120} y1={70} x2={120} y2={30} stroke="var(--ink)" strokeWidth={6} />
      <line x1={120} y1={70} x2={120} y2={36} stroke="var(--water)" strokeWidth={3.5} />
      <line x1={210} y1={70} x2={210} y2={50} stroke="var(--ink)" strokeWidth={6} />
      <line x1={210} y1={70} x2={210} y2={56} stroke="var(--water)" strokeWidth={3.5} />
      <Arrow x1={232} y1={36} x2={232} y2={56} ink="muted" both width={1} />
      <T x={238} y={50} anchor="start" italic>h</T>
      <Arrow x1={120} y1={96} x2={210} y2={96} ink="muted" both width={1} />
      <T x={165} y={112} italic>L</T>
      <rect x={225} y={130} width={40} height={40} fill="var(--water)" stroke="var(--ink)" strokeWidth={1.2} />
      <Line d="M240,80 Q250,100 245,130" ink="cool" />
      <T x={130} y={150}>measuring tank → Q</T>
      <T x={130} y={200} ink="heat">μ = πρghD⁴ / (128 Q L)</T>
      {/* falling sphere */}
      <rect x={330} y={20} width={60} height={190} fill="var(--water)" stroke="var(--ink)" strokeWidth={1.4} />
      <circle cx={360} cy={60} r={7} fill="var(--ink)" />
      <Arrow x1={360} y1={70} x2={360} y2={100} ink="heat" />
      <line x1={326} y1={110} x2={394} y2={110} stroke="var(--muted)" strokeDasharray="3 3" />
      <line x1={326} y1={180} x2={394} y2={180} stroke="var(--muted)" strokeDasharray="3 3" />
      <Arrow x1={404} y1={110} x2={404} y2={180} ink="muted" both width={1} />
      <T x={410} y={150} anchor="start" italic>L</T>
      <T x={360} y={230} ink="heat">μ = gd²(ρ_s − ρ)/18U</T>
    </Sketch>
  )
}

/** Simple centrifugal pump sketch (Unit 6). */
export function CentrifugalPump() {
  const vanes = Array.from({ length: 6 }, (_, i) => {
    const a = (i * Math.PI) / 3
    const r1 = 22
    const r2 = 58
    const b = a + 0.7
    return `M${200 + r1 * Math.cos(a)},${120 + r1 * Math.sin(a)} Q${200 + 45 * Math.cos(a + 0.25)},${120 + 45 * Math.sin(a + 0.25)} ${200 + r2 * Math.cos(b)},${120 + r2 * Math.sin(b)}`
  })
  return (
    <Sketch w={440} h={240} label="Centrifugal pump with impeller, volute casing, suction and delivery pipes">
      <path d="M200,40 C260,40 290,75 290,120 C290,175 250,205 200,205 C140,205 110,170 110,120 C110,80 140,52 200,52" fill="var(--water)" stroke="var(--ink)" strokeWidth={1.8} />
      <path d="M200,40 H300 V20" fill="none" stroke="var(--ink)" strokeWidth={1.8} />
      <path d="M200,52 H286 V20" fill="none" stroke="var(--ink)" strokeWidth={1.8} />
      <Arrow x1={293} y1={40} x2={293} y2={10} ink="cool" />
      <T x={310} y={20} anchor="start">delivery pipe</T>
      <circle cx={200} cy={120} r={62} fill="none" stroke="var(--muted)" strokeDasharray="3 3" />
      {vanes.map((d, i) => (
        <Line key={i} d={d} width={2.2} ink="heat" />
      ))}
      <circle cx={200} cy={120} r={20} fill="var(--surface)" stroke="var(--ink)" />
      <circle cx={200} cy={120} r={5} fill="var(--ink)" />
      <T x={200} y={124 + 32} ink="heat">impeller</T>
      <path d="M190,205 V235 M210,205 V235" stroke="var(--ink)" strokeWidth={1.8} />
      <T x={220} y={232} anchor="start">suction pipe (foot valve below)</T>
      <T x={60} y={60} anchor="middle" ink="muted">volute casing</T>
      <Arrow x1={200} y1={236} x2={200} y2={210} ink="cool" />
      <Wall x={20} y={226} w={60} h={10} />
    </Sketch>
  )
}
