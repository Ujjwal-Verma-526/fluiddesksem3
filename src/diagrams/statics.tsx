import { useState } from 'react'
import { Plot } from './Plot'
import { Readout, Slider } from './controls'
import { Arrow, INK, Line, Sketch, T, Wall, Water } from './kit'

/* =============================================================================
 * Unit 1 — properties and statics
 * ========================================================================== */

/** Linear velocity profile between a fixed and a moving plate. */
export function NewtonViscosity() {
  const ys = [40, 70, 100, 130, 160]
  return (
    <Sketch w={440} h={230} label="Fluid between a fixed lower plate and a moving upper plate with a linear velocity profile">
      <Wall x={60} y={190} w={320} h={12} />
      <rect x={60} y={28} width={320} height={10} fill="var(--surface)" stroke="var(--ink)" strokeWidth={1.4} />
      <Arrow x1={300} y1={20} x2={370} y2={20} ink="heat" width={2} />
      <T x={385} y={24} anchor="start" ink="heat">U</T>
      <T x={70} y={22} anchor="start" ink="muted">moving plate</T>
      <T x={70} y={220} anchor="start" ink="muted">fixed plate</T>
      <Water d="M60,38 H380 V190 H60 Z" />
      {/* velocity arrows growing linearly with height */}
      {ys.map((y) => {
        const len = ((190 - y) / 152) * 150
        return <Arrow key={y} x1={140} y1={y} x2={140 + len} y2={y} ink="cool" />
      })}
      <Line d="M140,190 L290,38" ink="cool" dashed />
      <line x1={140} y1={38} x2={140} y2={190} stroke="var(--ink)" strokeWidth={1.2} />
      <T x={300} y={110} anchor="start" italic>u + du</T>
      <T x={250} y={140} anchor="start" italic>u</T>
      <Arrow x1={110} y1={100} x2={110} y2={70} ink="muted" both width={1} />
      <T x={100} y={90} anchor="end" italic>dy</T>
      <Arrow x1={40} y1={190} x2={40} y2={60} ink="muted" width={1} />
      <T x={34} y={56} anchor="end" italic>y</T>
    </Sketch>
  )
}

/** Shear stress against velocity gradient for the rheological classes. */
export function FluidTypes() {
  const n = 40
  const line = (f: (x: number) => number): [number, number][] => Array.from({ length: n + 1 }, (_, i) => [(i / n) * 10, f((i / n) * 10)])
  return (
    <Plot
      ariaLabel="Shear stress versus rate of shear strain for different fluid types"
      xLabel="du/dy"
      yLabel="τ"
      xRange={[0, 10.5]}
      yRange={[0, 10.5]}
      series={[
        { pts: line((x) => 0.9 * x), tone: 'cool', width: 2 },
        { pts: line((x) => 2 + 0.6 * x), tone: 'heat' },
        { pts: line((x) => 3.2 * Math.sqrt(x)), tone: 'ink', dashed: true },
        { pts: line((x) => 0.085 * x * x), tone: 'muted', dashed: true },
        { pts: [[0, 0], [10, 0]], tone: 'accent', width: 3 },
        { pts: [[0, 0], [0, 10]], tone: 'faint', width: 3 },
      ]}
      notes={[
        { x: 8.6, y: 8.4, text: 'Newtonian', tone: 'cool', anchor: 'end' },
        { x: 9.8, y: 8.6, text: 'ideal plastic', tone: 'heat', anchor: 'end' },
        { x: 6.4, y: 9.3, text: 'shear-thinning', tone: 'ink', anchor: 'end' },
        { x: 9.9, y: 6.7, text: 'shear-thickening', tone: 'muted', anchor: 'end' },
        { x: 9.8, y: 0.5, text: 'ideal fluid', tone: 'accent', anchor: 'end' },
        { x: 0.3, y: 10, text: 'ideal solid', tone: 'muted', anchor: 'start' },
        { x: 0.3, y: 2.3, text: 'yield stress', tone: 'heat', anchor: 'start' },
      ]}
    />
  )
}

/* ---------- manometers ---------- */

/** Centre-line path of a U-tube bore from the left level, round the bend, up to the right level. */
function uPath(xl: number, xr: number, yl: number, yr: number, bend: number) {
  const r = (xr - xl) / 2
  return `M${xl},${yl} V${bend} A${r},${r} 0 0 0 ${xr},${bend} V${yr}`
}

function UTube({ xl, xr, top, bend, fills }: { xl: number; xr: number; top: [number, number]; bend: number; fills: { d: string; color: string }[] }) {
  const outline = uPath(xl, xr, top[0], top[1], bend)
  return (
    <g>
      <path d={outline} fill="none" stroke="var(--ink)" strokeWidth={16} strokeLinecap="butt" />
      <path d={outline} fill="none" stroke="var(--surface)" strokeWidth={13} strokeLinecap="butt" />
      {fills.map((f, i) => (
        <path key={i} d={f.d} fill="none" stroke={f.color} strokeWidth={13} strokeLinecap="butt" />
      ))}
    </g>
  )
}

const MERCURY = 'color-mix(in oklab, var(--muted) 55%, var(--surface))'

export function UTubeManometer() {
  const xl = 150
  const xr = 250
  const bend = 200
  const pipeY = 70
  const datum = 175
  const right = 115
  return (
    <Sketch w={440} h={270} label="Simple U-tube manometer connected to a pipe">
      {/* pipe */}
      <rect x={40} y={pipeY - 22} width={150} height={44} fill="var(--water)" stroke="var(--ink)" strokeWidth={1.4} />
      <Arrow x1={60} y1={pipeY} x2={110} y2={pipeY} ink="cool" />
      <T x={58} y={pipeY - 28} anchor="start" ink="muted">pipe, fluid ρ_1</T>
      <UTube
        xl={xl}
        xr={xr}
        top={[pipeY + 22, 40]}
        bend={bend}
        fills={[
          { d: `M${xl},${pipeY + 22} V${datum}`, color: 'var(--water)' },
          { d: uPath(xl, xr, datum, right, bend), color: MERCURY },
        ]}
      />
      <T x={xr + 14} y={36} anchor="start" ink="muted">open</T>
      <line x1={110} y1={datum} x2={300} y2={datum} stroke="var(--heat)" strokeDasharray="5 4" />
      <T x={308} y={datum + 4} anchor="start" ink="heat">A–A datum</T>
      <Arrow x1={120} y1={pipeY} x2={120} y2={datum} ink="muted" both width={1} />
      <T x={114} y={(pipeY + datum) / 2} anchor="end" italic>h_1</T>
      <Arrow x1={278} y1={datum} x2={278} y2={right} ink="muted" both width={1} />
      <T x={284} y={(datum + right) / 2 + 4} anchor="start" italic>h_2</T>
      <T x={200} y={258} ink="muted">gauge liquid ρ_2 (mercury)</T>
      <T x={330} y={110} anchor="start" size={12}>p + ρ₁gh₁ = ρ₂gh₂</T>
    </Sketch>
  )
}

export function DiffManometer() {
  const xl = 140
  const xr = 300
  const bend = 210
  const lowHg = 185
  const highHg = 135
  return (
    <Sketch w={440} h={280} label="U-tube differential manometer between pipes A and B">
      <rect x={60} y={40} width={110} height={36} fill="var(--water)" stroke="var(--ink)" strokeWidth={1.4} />
      <T x={70} y={34} anchor="start">A</T>
      <rect x={270} y={70} width={110} height={36} fill="var(--water)" stroke="var(--ink)" strokeWidth={1.4} />
      <T x={370} y={64} anchor="end">B</T>
      <UTube
        xl={xl}
        xr={xr}
        top={[76, 106]}
        bend={bend}
        fills={[
          { d: `M${xl},76 V${lowHg}`, color: 'var(--water)' },
          { d: `M${xr},106 V${highHg}`, color: 'var(--water)' },
          { d: uPath(xl, xr, lowHg, highHg, bend), color: MERCURY },
        ]}
      />
      <line x1={100} y1={lowHg} x2={340} y2={lowHg} stroke="var(--heat)" strokeDasharray="5 4" />
      <T x={346} y={lowHg + 4} anchor="start" ink="heat">X–X</T>
      <Arrow x1={325} y1={lowHg} x2={325} y2={highHg} ink="muted" both width={1} />
      <T x={331} y={(lowHg + highHg) / 2 + 4} anchor="start" italic>h</T>
      <Arrow x1={112} y1={58} x2={112} y2={lowHg} ink="muted" both width={1} />
      <T x={106} y={125} anchor="end" italic>h + x</T>
      <Arrow x1={354} y1={88} x2={354} y2={highHg} ink="muted" both width={1} />
      <T x={360} y={116} anchor="start" italic>y</T>
      <T x={220} y={268} ink="muted">mercury, ρ_g</T>
    </Sketch>
  )
}

/* ---------- hydrostatic forces ---------- */

/** Interactive: vertical rectangular plate (2 m deep) lowered into water; G vs centre of pressure. */
export function CentreOfPressure() {
  const [top, setTop] = useState(0.5)
  const d = 2
  const hbar = top + d / 2
  const hstar = hbar + (d * d) / (12 * hbar)
  const S = 30 // px per metre
  const y0 = 30
  const px = 290
  const k = 17 // px of pressure arrow per metre of depth
  const yOf = (h: number) => y0 + h * S
  const depths = Array.from({ length: 9 }, (_, i) => top + (d * i) / 8)
  return (
    <div className="space-y-4">
      <Sketch w={440} h={300} label="Pressure distribution on a vertical plate and its centre of pressure">
        <Water d={`M30,${y0} H410 V290 H30 Z`} />
        <line x1={30} y1={y0} x2={410} y2={y0} stroke="var(--cool)" strokeWidth={1.5} />
        <T x={36} y={y0 - 8} anchor="start" ink="cool">free surface</T>
        {/* pressure trapezoid */}
        <path
          d={`M${px},${yOf(top)} L${px - k * top},${yOf(top)} L${px - k * (top + d)},${yOf(top + d)} L${px},${yOf(top + d)} Z`}
          fill="color-mix(in oklab, var(--heat) 14%, transparent)"
          stroke="var(--heat)"
          strokeWidth={1}
        />
        {depths.map((h) => (
          <Arrow key={h} x1={px - k * h} y1={yOf(h)} x2={px - 3} y2={yOf(h)} ink="heat" width={1} />
        ))}
        {/* plate */}
        <line x1={px} y1={yOf(top)} x2={px} y2={yOf(top + d)} stroke="var(--ink)" strokeWidth={5} />
        {/* G and P */}
        <circle cx={px + 14} cy={yOf(hbar)} r={4} fill="var(--ink)" />
        <T x={px + 24} y={yOf(hbar) + 4} anchor="start">G</T>
        <circle cx={px + 14} cy={yOf(hstar)} r={4} fill="var(--heat)" />
        <T x={px + 24} y={yOf(hstar) + 14} anchor="start" ink="heat">P</T>
        <Arrow x1={px + 80} y1={yOf(hstar)} x2={px + 6} y2={yOf(hstar)} ink="heat" width={2.2} />
        <T x={px + 84} y={yOf(hstar) - 6} anchor="start" ink="heat">F = ρgAh̄</T>
        <Arrow x1={60} y1={y0} x2={60} y2={yOf(hbar)} ink="muted" both width={1} />
        <T x={54} y={(y0 + yOf(hbar)) / 2} anchor="end" italic>h̄</T>
        <Arrow x1={85} y1={y0} x2={85} y2={yOf(hstar)} ink="heat" both width={1} />
        <T x={91} y={(y0 + yOf(hstar)) / 2 + 10} anchor="start" italic ink="heat">h*</T>
      </Sketch>
      <div className="grid gap-4 sm:grid-cols-2">
        <Slider label="Depth of top edge" value={top} min={0} max={6} step={0.25} onChange={setTop} fmt={(v) => `${v.toFixed(2)} m`} />
        <div className="space-y-1.5">
          <Readout label="h̄ (centroid)" value={`${hbar.toFixed(3)} m`} />
          <Readout label="h* (centre of pressure)" value={`${hstar.toFixed(3)} m`} tone="heat" />
          <Readout label="h* − h̄ = I_G/(A h̄)" value={`${(hstar - hbar).toFixed(3)} m`} />
        </div>
      </div>
    </div>
  )
}

export function CurvedSurface() {
  const O = { x: 250, y: 50 }
  const R = 130
  const arc = `M${O.x - R},${O.y} A${R},${R} 0 0 0 ${O.x},${O.y + R}`
  const ang = (57.5 * Math.PI) / 180
  return (
    <Sketch w={440} h={240} label="Horizontal and vertical components of water force on a quadrant gate">
      <Water d={`M${O.x - R},${O.y} H410 V${O.y + R} H${O.x} A${R},${R} 0 0 1 ${O.x - R},${O.y} Z`} />
      <path d={`M${O.x - R},${O.y} H${O.x} V${O.y + R} A${R},${R} 0 0 1 ${O.x - R},${O.y} Z`} fill="color-mix(in oklab, var(--cool) 22%, transparent)" />
      <line x1={O.x - R - 20} y1={O.y} x2={410} y2={O.y} stroke="var(--cool)" strokeWidth={1.5} />
      <T x={404} y={O.y - 8} anchor="end" ink="cool">free surface</T>
      <Line d={arc} width={4} />
      <circle cx={O.x} cy={O.y} r={3} fill="var(--ink)" />
      <T x={O.x + 6} y={O.y - 6} anchor="start">O</T>
      <T x={O.x - 62} y={O.y + 40} ink="cool">weight of water above</T>
      <T x={O.x - 62} y={O.y + 54} ink="cool">= F_y</T>
      {/* F_x on vertical projection */}
      <line x1={70} y1={O.y} x2={70} y2={O.y + R} stroke="var(--muted)" strokeWidth={1} strokeDasharray="4 3" />
      <T x={66} y={O.y + R + 16} ink="muted">vertical projection</T>
      <Arrow x1={110} y1={O.y + (2 * R) / 3} x2={30} y2={O.y + (2 * R) / 3} ink="heat" width={2} />
      <T x={42} y={O.y + (2 * R) / 3 - 8} ink="heat">F_x</T>
      <Arrow x1={O.x - 60} y1={O.y + 70} x2={O.x - 60} y2={O.y + 150} ink="heat" width={2} />
      <T x={O.x - 48} y={O.y + 150} anchor="start" ink="heat">F_y</T>
      {/* resultant through O */}
      <Arrow x1={O.x} y1={O.y} x2={O.x - R * Math.cos(ang) * 1.1} y2={O.y + R * Math.sin(ang) * 1.1} ink="heat" width={2.4} dashed />
      <T x={O.x - 100} y={O.y + R + 22} anchor="start" ink="heat">F through O, tan θ = F_y/F_x</T>
    </Sketch>
  )
}

/* ---------- buoyancy ---------- */

export function Metacentre() {
  const th = (14 * Math.PI) / 180
  const C = { x: 220, y: 150 }
  const ax = { x: Math.sin(th), y: -Math.cos(th) }
  const along = (s: number) => ({ x: C.x + ax.x * s, y: C.y + ax.y * s })
  const corners = [
    [-100, -60],
    [100, -60],
    [100, 60],
    [-100, 60],
  ].map(([a, b]) => {
    // body coordinates: a across, b down; rotate by th
    const x = C.x + a * Math.cos(th) - b * Math.sin(th)
    const y = C.y + a * Math.sin(th) + b * Math.cos(th)
    return `${x.toFixed(1)},${y.toFixed(1)}`
  })
  const G = along(12)
  const B = along(-30)
  const M = along(70)
  const B1 = { x: M.x, y: B.y + 6 }
  return (
    <Sketch w={440} h={260} label="Tilted floating body showing G, B, the shifted centre of buoyancy B1 and the metacentre M">
      <Water d="M20,150 H420 V250 H20 Z" />
      <polygon points={corners.join(' ')} fill="var(--surface)" stroke="var(--ink)" strokeWidth={1.6} />
      <line x1={20} y1={150} x2={420} y2={150} stroke="var(--cool)" strokeWidth={1.5} />
      <T x={26} y={144} anchor="start" ink="cool">water line</T>
      <line x1={along(-110).x} y1={along(-110).y} x2={along(110).x} y2={along(110).y} stroke="var(--muted)" strokeDasharray="5 4" />
      <T x={along(112).x + 4} y={along(112).y} anchor="start" ink="muted">body axis</T>
      <line x1={B1.x} y1={B1.y} x2={M.x} y2={M.y} stroke="var(--cool)" strokeDasharray="3 3" />
      {[
        { p: G, l: 'G', ink: 'ink' as const, dx: -14 },
        { p: B, l: 'B', ink: 'muted' as const, dx: -14 },
        { p: B1, l: 'B_1', ink: 'cool' as const, dx: 10 },
        { p: M, l: 'M', ink: 'heat' as const, dx: 10 },
      ].map(({ p, l, ink, dx }) => (
        <g key={l}>
          <circle cx={p.x} cy={p.y} r={3.5} fill={INK[ink]} />
          <T x={p.x + dx} y={p.y + 4} anchor={dx < 0 ? 'end' : 'start'} ink={ink} bold>
            {l}
          </T>
        </g>
      ))}
      <Arrow x1={G.x} y1={G.y} x2={G.x} y2={G.y + 70} ink="ink" width={2} />
      <T x={G.x - 6} y={G.y + 84} anchor="end">W</T>
      <Arrow x1={B1.x} y1={B1.y + 70} x2={B1.x} y2={B1.y + 4} ink="cool" width={2} />
      <T x={B1.x + 8} y={B1.y + 70} anchor="start" ink="cool">F_B</T>
      <T x={330} y={40} anchor="start" ink="heat">GM = BM − BG</T>
      <T x={330} y={58} anchor="start" ink="muted">M above G ⇒ stable</T>
    </Sketch>
  )
}

export function GMExperiment() {
  const th = (8 * Math.PI) / 180
  const C = { x: 210, y: 140 }
  const rot = (a: number, b: number) => ({ x: C.x + a * Math.cos(th) - b * Math.sin(th), y: C.y + a * Math.sin(th) + b * Math.cos(th) })
  const hull = [rot(-120, -50), rot(120, -50), rot(95, 50), rot(-95, 50)]
  const w0 = rot(-60, -58)
  const w1 = rot(50, -58)
  const pivot = rot(-10, -50)
  return (
    <Sketch w={440} h={240} label="Experimental determination of metacentric height by moving a weight across the deck">
      <Water d="M20,145 H420 V230 H20 Z" />
      <polygon points={hull.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(' ')} fill="var(--surface)" stroke="var(--ink)" strokeWidth={1.6} />
      <line x1={20} y1={145} x2={420} y2={145} stroke="var(--cool)" strokeWidth={1.5} />
      <rect x={w0.x - 10} y={w0.y - 10} width={20} height={16} fill="none" stroke="var(--muted)" strokeDasharray="3 2" />
      <rect x={w1.x - 10} y={w1.y - 10} width={20} height={16} fill="var(--heat)" />
      <Arrow x1={w0.x + 14} y1={w0.y - 20} x2={w1.x - 14} y2={w1.y - 20} ink="heat" />
      <T x={(w0.x + w1.x) / 2} y={(w0.y + w1.y) / 2 - 28} ink="heat">w₁ moved through x</T>
      {/* plumb line */}
      <line x1={pivot.x} y1={pivot.y} x2={pivot.x} y2={pivot.y + 80} stroke="var(--ink)" strokeWidth={1} />
      <line x1={pivot.x} y1={pivot.y} x2={rot(-10, 30).x} y2={rot(-10, 30).y} stroke="var(--muted)" strokeDasharray="4 3" />
      <circle cx={pivot.x} cy={pivot.y + 80} r={4} fill="var(--ink)" />
      <T x={pivot.x + 10} y={pivot.y + 64} anchor="start" italic>θ</T>
      <T x={300} y={36} anchor="start" ink="heat">GM = w₁x / (W tan θ)</T>
      <T x={300} y={54} anchor="start" ink="muted">plumb bob reads θ</T>
    </Sketch>
  )
}

/** Free-surface shapes of forced and free vortices (computed). */
export function VortexProfiles() {
  const pts = (f: (r: number) => number, a: number, b: number, n = 60): [number, number][] =>
    Array.from({ length: n + 1 }, (_, i) => {
      const r = a + ((b - a) * i) / n
      return [r, f(r)]
    })
  const forced = pts((r) => 0.5 * r * r, -2, 2)
  const freeZ = (r: number) => 2.2 - 0.25 / (r * r)
  const free = pts(freeZ, 0.34, 2)
  const freeL = free.map(([r, z]) => [-r, z] as [number, number])
  return (
    <div className="grid gap-2 sm:grid-cols-2">
      <Plot
        ariaLabel="Paraboloid free surface of a forced vortex"
        xLabel="r"
        yLabel="z"
        xRange={[-2.2, 2.2]}
        yRange={[-0.2, 2.4]}
        width={300}
        height={220}
        series={[{ pts: forced, tone: 'cool', width: 2.2 }]}
        notes={[
          { x: 0, y: 2.15, text: 'forced vortex: z = ω²r²/2g', tone: 'cool' },
          { x: 0, y: 1.85, text: 'paraboloid, rotational', tone: 'muted' },
        ]}
      />
      <Plot
        ariaLabel="Hyperbolic free surface of a free vortex"
        xLabel="r"
        yLabel="z"
        xRange={[-2.2, 2.2]}
        yRange={[-0.2, 2.4]}
        width={300}
        height={220}
        series={[
          { pts: free, tone: 'heat', width: 2.2 },
          { pts: freeL, tone: 'heat', width: 2.2 },
        ]}
        notes={[
          { x: 0, y: 2.38, text: 'free vortex: vr = C', tone: 'heat' },
          { x: 1.2, y: 1.2, text: 'irrotational', tone: 'muted' },
        ]}
      />
    </div>
  )
}
