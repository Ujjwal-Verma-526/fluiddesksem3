import type { ReactNode } from 'react'
import { Plot, type Series } from './Plot'
import { Arrow, Line, Sketch, T, Water, sample } from './kit'

/* =============================================================================
 * Unit 1 kinematics and Unit 2 dynamics sketches
 * ========================================================================== */

/** Stream lines, a path line and a streak line in an unsteady flow (qualitative). */
export function FlowLines() {
  const stream = [60, 100, 140, 180].map((y0) => sample((t) => [30 + t * 380, y0 + 18 * Math.sin((t * Math.PI * 2) / 1.6)], 0, 1))
  return (
    <Sketch w={440} h={240} label="Stream lines at an instant, the path line of one particle and a streak line from a dye injector">
      {stream.map((d, i) => (
        <Line key={i} d={d} ink="cool" width={1.3} arrow />
      ))}
      <Line d="M50,215 C140,200 170,120 240,110 S360,40 410,30" ink="heat" width={2} dashed />
      <circle cx={50} cy={215} r={4} fill="var(--heat)" />
      <T x={58} y={230} anchor="start" ink="heat">path line of one particle</T>
      {/* streak line: dye dots from a fixed injector */}
      <rect x={34} y={122} width={10} height={16} fill="var(--ink)" />
      {Array.from({ length: 16 }, (_, i) => {
        const t = i / 15
        return <circle key={i} cx={50 + t * 330} cy={130 - 40 * Math.sin(t * 2.4) + 10 * t} r={3} fill="var(--ink)" opacity={0.75} />
      })}
      <T x={40} y={114} anchor="start">dye injector → streak line</T>
      <T x={410} y={232} anchor="end" ink="cool">stream lines (tangent to V at this instant)</T>
    </Sketch>
  )
}

/** Flow net of ψ = 3xy, φ = 1.5(x² − y²) in the first quadrant (computed). */
export function FlowNet3xy() {
  const n = 80
  const series: Series[] = []
  // stream lines xy = c, ordered from large x to small x so arrows follow u = −3x, v = 3y
  for (const c of [0.4, 1, 1.8, 2.8, 4]) {
    const pts: [number, number][] = []
    for (let i = 0; i <= n; i++) {
      const x = 3 - (i / n) * (3 - c / 3)
      pts.push([x, c / x])
    }
    series.push({ pts, tone: 'cool', width: 1.8, arrow: true })
  }
  // equipotentials x² − y² = k
  for (const k of [1, 3, 5.5, -1, -3, -5.5]) {
    const pts: [number, number][] = []
    for (let i = 0; i <= n; i++) {
      const t = (i / n) * 3
      if (k > 0) pts.push([Math.sqrt(t * t + k), t])
      else pts.push([t, Math.sqrt(t * t - k)])
    }
    series.push({ pts: pts.filter(([x, y]) => x <= 3.05 && y <= 3.05), tone: 'heat', dashed: true, width: 1.2 })
  }
  return (
    <Plot
      ariaLabel="Flow net for psi = 3xy: hyperbolic stream lines and orthogonal equipotential lines"
      xLabel="x"
      yLabel="y"
      xRange={[0, 3.1]}
      yRange={[0, 3.1]}
      series={[{ pts: [[0, 0], [3, 0]], tone: 'cool', width: 2.4 }, { pts: [[0, 0], [0, 3]], tone: 'cool', width: 2.4 }, ...series]}
      notes={[
        { x: 2.95, y: 2.85, text: 'ψ = 3xy (stream lines)', tone: 'cool', anchor: 'end' },
        { x: 2.95, y: 2.6, text: 'φ = 1.5(x² − y²) (equipotentials)', tone: 'heat', anchor: 'end' },
        { x: 0.12, y: 0.12, text: 'stagnation point', tone: 'muted', anchor: 'start' },
      ]}
    />
  )
}

/** Elementary potential flows: uniform, source, sink, free vortex, doublet. */
export function SimpleFlows() {
  const panel = (cx: number, title: string, body: ReactNode) => (
    <g key={title}>
      <rect x={cx - 52} y={14} width={104} height={124} rx={8} fill="none" stroke="var(--rule)" />
      <T x={cx} y={156}>{title}</T>
      {body}
    </g>
  )
  const rays = (cx: number, out: boolean) =>
    Array.from({ length: 8 }, (_, i) => {
      const a = (i * Math.PI) / 4
      const r1 = out ? 10 : 44
      const r2 = out ? 44 : 12
      return <Arrow key={i} x1={cx + r1 * Math.cos(a)} y1={76 + r1 * Math.sin(a)} x2={cx + r2 * Math.cos(a)} y2={76 + r2 * Math.sin(a)} ink="cool" width={1.2} />
    })
  return (
    <Sketch w={600} h={170} label="Stream line patterns of uniform flow, source, sink, free vortex and doublet">
      {panel(
        62,
        'uniform',
        [36, 56, 76, 96, 116].map((y) => <Arrow key={y} x1={18} y1={y} x2={106} y2={y} ink="cool" width={1.2} />),
      )}
      {panel(182, 'source', <>{rays(182, true)}<circle cx={182} cy={76} r={3} fill="var(--heat)" /></>)}
      {panel(302, 'sink', <>{rays(302, false)}<circle cx={302} cy={76} r={3} fill="var(--heat)" /></>)}
      {panel(
        422,
        'free vortex',
        <>
          {[14, 28, 42].map((r) => (
            <circle key={r} cx={422} cy={76} r={r} fill="none" stroke="var(--cool)" strokeWidth={1.2} />
          ))}
          {[14, 28, 42].map((r) => (
            <Arrow key={r} x1={422 + 2} y1={76 - r} x2={422 - 4} y2={76 - r} ink="cool" width={1.2} />
          ))}
        </>,
      )}
      {panel(
        542,
        'doublet',
        <>
          {[8, 16, 26].flatMap((r) => [
            <circle key={`u${r}`} cx={542} cy={76 - r} r={r} fill="none" stroke="var(--cool)" strokeWidth={1.1} />,
            <circle key={`d${r}`} cx={542} cy={76 + r} r={r} fill="none" stroke="var(--cool)" strokeWidth={1.1} />,
          ])}
          <circle cx={542} cy={76} r={3} fill="var(--heat)" />
        </>,
      )}
    </Sketch>
  )
}

/** A system moving through a fixed control volume. */
export function SystemCV() {
  return (
    <Sketch w={440} h={210} label="Control volume fixed in a pipe and a system that moves through it">
      <Water d="M20,60 H420 V150 H20 Z" />
      <line x1={20} y1={60} x2={420} y2={60} stroke="var(--ink)" strokeWidth={2} />
      <line x1={20} y1={150} x2={420} y2={150} stroke="var(--ink)" strokeWidth={2} />
      <rect x={130} y={54} width={160} height={102} fill="none" stroke="var(--heat)" strokeWidth={2} strokeDasharray="6 4" />
      <T x={210} y={46} ink="heat">control volume (fixed)</T>
      <rect x={170} y={66} width={160} height={78} fill="color-mix(in oklab, var(--cool) 22%, transparent)" stroke="var(--cool)" strokeWidth={1.5} />
      <T x={250} y={178} ink="cool">system at t + dt (moved downstream)</T>
      <T x={150} y={110} ink="muted">I</T>
      <T x={310} y={110} ink="cool">II</T>
      <Arrow x1={40} y1={105} x2={110} y2={105} ink="cool" />
      <Arrow x1={350} y1={105} x2={410} y2={105} ink="cool" />
      <T x={40} y={196} anchor="start" ink="muted">At t the system filled the CV exactly; I = mass left behind, II = mass that has flowed out.</T>
    </Sketch>
  )
}

/** Forces on a cylindrical element along a stream line (Euler’s equation). */
export function EulerElement() {
  const th = (-28 * Math.PI) / 180
  const c = { x: 220, y: 120 }
  const L = 130
  const H = 46
  const ux = Math.cos(th)
  const uy = Math.sin(th)
  const nx = -uy
  const ny = ux
  const P = (s: number, h: number) => `${(c.x + ux * s + nx * h).toFixed(1)},${(c.y + uy * s + ny * h).toFixed(1)}`
  const pt = (s: number, h: number) => ({ x: c.x + ux * s + nx * h, y: c.y + uy * s + ny * h })
  const left = pt(-L / 2, 0)
  const right = pt(L / 2, 0)
  return (
    <Sketch w={440} h={240} label="Fluid element of area dA and length ds on an inclined stream line with pressure and weight forces">
      <Line d={sample((t) => [40 + t * 360, 200 - t * 190 + 10 * Math.sin(t * 3)], 0, 1)} ink="faint" dashed />
      <polygon points={[P(-L / 2, -H / 2), P(L / 2, -H / 2), P(L / 2, H / 2), P(-L / 2, H / 2)].join(' ')} fill="var(--water)" stroke="var(--ink)" strokeWidth={1.4} />
      <Arrow x1={left.x - ux * 60} y1={left.y - uy * 60} x2={left.x - ux * 4} y2={left.y - uy * 4} ink="heat" width={2} />
      <T x={left.x - ux * 64} y={left.y - uy * 64 + 18} anchor="middle" ink="heat">p dA</T>
      <Arrow x1={right.x + ux * 60} y1={right.y + uy * 60} x2={right.x + ux * 4} y2={right.y + uy * 4} ink="heat" width={2} />
      <T x={right.x + ux * 40} y={right.y + uy * 40 - 14} anchor="start" ink="heat">(p + ∂p/∂s ds) dA</T>
      <Arrow x1={c.x} y1={c.y} x2={c.x} y2={c.y + 80} ink="ink" width={2} />
      <T x={c.x + 6} y={c.y + 92} anchor="start">ρg dA ds</T>
      <line x1={c.x} y1={c.y} x2={c.x + ux * 70} y2={c.y + uy * 70} stroke="var(--muted)" strokeDasharray="3 3" />
      <T x={c.x + 26} y={c.y - 4} anchor="start" italic ink="muted">θ</T>
      <T x={30} y={30} anchor="start" ink="muted">stream line, direction s</T>
      <T x={30} y={228} anchor="start">dp/ρ + g dz + v dv = 0</T>
    </Sketch>
  )
}
