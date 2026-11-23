import { Plot, type Series } from './Plot'
import { Arrow, Line, Sketch, T, Wall, sample } from './kit'

/* =============================================================================
 * Unit 5 — boundary layer, drag and lift
 * ========================================================================== */

export function BLGrowth() {
  const x0 = 40
  const xt = 220
  const wall = 190
  const lam = (x: number) => 22 * Math.sqrt((x - x0) / (xt - x0))
  const turb = (x: number) => lam(xt) + 70 * ((x - xt) / 190) ** 0.8
  const delta = (x: number) => (x <= xt ? lam(x) : turb(x))
  const profile = (x: number, turbulent: boolean) => {
    const d = delta(x)
    return sample((s) => {
      const eta = s
      const f = turbulent ? eta ** (1 / 7) : 2 * eta - 2 * eta ** 3 + eta ** 4
      return [x + 50 * f, wall - eta * d]
    }, 0, 1, 30)
  }
  return (
    <Sketch w={440} h={240} label="Boundary layer on a flat plate: laminar region, transition, turbulent region with laminar sub-layer">
      {[60, 100, 140].map((y) => (
        <Arrow key={y} x1={4} y1={y} x2={34} y2={y} ink="cool" width={1.2} />
      ))}
      <T x={18} y={50} ink="cool">U</T>
      <Wall x={x0} y={wall} w={380} h={10} />
      <Line d={sample((x) => [x, wall - delta(x)], x0, 410, 120)} ink="heat" width={2} dashed />
      <Line d={sample((x) => [x, wall - 4 - 2 * ((x - xt) / 190)], xt + 20, 410, 40)} ink="muted" width={1} dashed />
      {[{ x: 120, t: false }, { x: 300, t: true }].map(({ x, t }) => (
        <g key={x}>
          <line x1={x} y1={wall} x2={x} y2={wall - delta(x) - 10} stroke="var(--muted)" />
          <Line d={profile(x, t)} ink="cool" width={1.8} />
        </g>
      ))}
      <line x1={xt} y1={wall + 16} x2={xt} y2={40} stroke="var(--muted)" strokeDasharray="2 3" />
      <T x={120} y={226}>laminar (δ ∝ √x)</T>
      <T x={xt} y={34} ink="muted">transition, Re_x ≈ 5 × 10⁵</T>
      <T x={330} y={226}>{'turbulent (δ ∝ x^{4/5})'}</T>
      <T x={410} y={178} anchor="end" size={10} ink="muted">laminar sub-layer</T>
      <T x={410} y={wall - turb(410) - 6} anchor="end" ink="heat">δ</T>
    </Sketch>
  )
}

/** δ, δ*, θ on the Pohlhausen profile u/U = 2η − 2η³ + η⁴ (computed). */
export function BLThicknesses() {
  const f = (e: number) => 2 * e - 2 * e ** 3 + e ** 4
  const n = 200
  let dStar = 0
  let theta = 0
  for (let i = 0; i < n; i++) {
    const e = (i + 0.5) / n
    dStar += (1 - f(e)) / n
    theta += f(e) * (1 - f(e)) / n
  }
  const prof: [number, number][] = Array.from({ length: 61 }, (_, i) => [f(i / 60), i / 60])
  const series: Series[] = [
    { pts: prof, tone: 'cool', width: 2.2 },
    { pts: [[0, 1], [1.08, 1]], tone: 'ink', dashed: true, width: 1 },
    { pts: [[0, dStar], [1.08, dStar]], tone: 'heat', dashed: true, width: 1.4 },
    { pts: [[0, theta], [1.08, theta]], tone: 'accent', dashed: true, width: 1.4 },
    { pts: [[1, 0], [1, 1.15]], tone: 'faint', width: 1 },
  ]
  return (
    <Plot
      ariaLabel="Boundary layer velocity profile with thickness, displacement thickness and momentum thickness marked"
      xLabel="u/U"
      yLabel="y/δ"
      xRange={[0, 1.1]}
      yRange={[0, 1.15]}
      ticks={{ x: [0, 0.5, 1], y: [0, 0.5, 1] }}
      series={series}
      notes={[
        { x: 0.04, y: 1.03, text: 'δ (u = 0.99U)', tone: 'ink', anchor: 'start' },
        { x: 0.04, y: dStar + 0.03, text: `δ* = ${dStar.toFixed(2)}δ`, tone: 'heat', anchor: 'start' },
        { x: 0.04, y: theta + 0.03, text: `θ = ${theta.toFixed(3)}δ`, tone: 'accent', anchor: 'start' },
        { x: 0.62, y: 0.12, text: 'u/U = 2η − 2η³ + η⁴', tone: 'cool', anchor: 'start' },
      ]}
    />
  )
}

export function BLSeparation() {
  const surf = (x: number) => 190 - 40 * Math.exp(-(((x - 140) / 90) ** 2))
  const stations = [
    { x: 110, shape: (e: number) => 2 * e - e * e, label: 'attached' },
    { x: 220, shape: (e: number) => e * e * (2 - e) * 0.95, label: '∂u/∂y = 0 (S)' },
    { x: 330, shape: (e: number) => -0.25 * Math.sin(Math.PI * e * 1.6) * (e < 0.62 ? 1 : 0) + e * e, label: 'reversed flow' },
  ]
  return (
    <Sketch w={440} h={240} label="Boundary layer separation: profiles change from attached through the separation point to reversed flow">
      <path d={`${sample((x) => [x, surf(x)], 20, 420, 100)} V230 H20 Z`} fill="url(#fd-hatch)" stroke="var(--ink)" strokeWidth={1.5} />
      {stations.map(({ x, shape, label }) => {
        const y0 = surf(x)
        const h = 60
        return (
          <g key={x}>
            <line x1={x} y1={y0} x2={x} y2={y0 - h} stroke="var(--muted)" />
            <Line d={sample((e) => [x + 50 * shape(e), y0 - e * h], 0, 1, 40)} ink="cool" width={1.8} />
            <T x={x + 10} y={y0 - h - 10}>{label}</T>
          </g>
        )
      })}
      <circle cx={220} cy={surf(220)} r={4} fill="var(--heat)" />
      <Line d={`M220,${surf(220)} Q280,${surf(220) - 50} 410,${surf(330) - 70}`} ink="heat" dashed />
      <Line d="M300,180 q20,-24 40,0 q-20,20 -40,0" ink="heat" arrow />
      <T x={30} y={30} anchor="start" ink="muted">favourable ∂p/∂x &lt; 0</T>
      <T x={410} y={30} anchor="end" ink="heat">adverse ∂p/∂x &gt; 0</T>
    </Sketch>
  )
}

export function DragLift() {
  const a = (12 * Math.PI) / 180
  const c = { x: 220, y: 130 }
  const foil = sample((t) => {
    // simple symmetric airfoil-ish outline, chord 200 along the rotated axis
    const s = t <= 0.5 ? t * 2 : 2 - t * 2
    const xc = -100 + 200 * s
    const th = 22 * (1.1 * Math.sqrt(s) - s) * (t <= 0.5 ? -1 : 1)
    return [c.x + xc * Math.cos(a) + th * Math.sin(a), c.y - xc * Math.sin(a) + th * Math.cos(a)]
  }, 0, 1, 80)
  return (
    <Sketch w={440} h={240} label="Resultant fluid force on an inclined airfoil resolved into drag along the stream and lift normal to it">
      {[50, 90].map((y) => (
        <Arrow key={y} x1={10} y1={y} x2={70} y2={y} ink="cool" width={1.3} />
      ))}
      <T x={40} y={36} ink="cool">U</T>
      <path d={`${foil} Z`} fill="var(--surface)" stroke="var(--ink)" strokeWidth={1.6} />
      <line x1={c.x - 130} y1={c.y} x2={c.x + 130} y2={c.y} stroke="var(--muted)" strokeDasharray="5 4" />
      <line x1={c.x - 130 * Math.cos(a)} y1={c.y + 130 * Math.sin(a)} x2={c.x + 130 * Math.cos(a)} y2={c.y - 130 * Math.sin(a)} stroke="var(--muted)" />
      <T x={c.x + 136} y={c.y - 22} anchor="start" italic ink="muted">α</T>
      <Arrow x1={c.x} y1={c.y} x2={c.x + 40} y2={c.y - 100} ink="heat" width={2.4} />
      <T x={c.x + 44} y={c.y - 104} anchor="start" ink="heat">R</T>
      <Arrow x1={c.x} y1={c.y} x2={c.x} y2={c.y - 100} ink="cool" width={2} />
      <T x={c.x - 8} y={c.y - 104} anchor="end" ink="cool">F_L</T>
      <Arrow x1={c.x} y1={c.y} x2={c.x + 40} y2={c.y} ink="ink" width={2} />
      <T x={c.x + 48} y={c.y + 16} anchor="start">F_D</T>
      <T x={220} y={222}>F_D = C_D A ρU²/2,  F_L = C_L A ρU²/2</T>
    </Sketch>
  )
}

/** Stream lines past a cylinder with circulation (uniform + doublet + vortex), computed by bisection on ψ. */
export function CylinderCirculation() {
  const k = 0.8 // Γ/(2πUR)
  const psi = (x: number, y: number) => {
    const r2 = x * x + y * y
    return y * (1 - 1 / r2) + k * Math.log(Math.sqrt(r2))
  }
  const solve = (x: number, c: number, lo: number, hi: number): number | null => {
    let a = lo
    let b = hi
    let fa = psi(x, a) - c
    const fb = psi(x, b) - c
    if (fa * fb > 0) return null
    for (let i = 0; i < 50; i++) {
      const m = (a + b) / 2
      const fm = psi(x, m) - c
      if (fa * fm <= 0) b = m
      else {
        a = m
        fa = fm
      }
    }
    return (a + b) / 2
  }
  const line = (c: number, above: boolean): [number, number][] => {
    const pts: [number, number][] = []
    for (let i = 0; i <= 120; i++) {
      const x = -3 + (i / 120) * 6
      const edge = Math.abs(x) < 1 ? Math.sqrt(1 - x * x) + 1e-6 : 1e-6
      const y = above ? solve(x, c, edge, 2.6) : solve(x, c, -2.6, -edge)
      if (y !== null) pts.push([x, y])
    }
    return pts
  }
  const series: Series[] = [
    ...[0.25, 0.6, 1.05, 1.6, 2.2].map((c) => ({ pts: line(c, true), tone: 'cool' as const, width: 1.5, arrow: true })),
    ...[-0.6, -1.1, -1.7].map((c) => ({ pts: line(c, false), tone: 'cool' as const, width: 1.5, arrow: true })),
  ]
  const ths = Math.asin(-k / 2)
  return (
    <Plot
      ariaLabel="Stream lines past a rotating cylinder: crowded above, spread below, stagnation points shifted downward"
      xLabel="x/R"
      yLabel="y/R"
      xRange={[-3, 3]}
      yRange={[-2.6, 2.6]}
      width={440}
      height={380}
      series={series}
      marks={[
        { x: Math.cos(ths), y: Math.sin(ths), label: 'S', tone: 'heat', dx: 6, dy: 14 },
        { x: -Math.cos(ths), y: Math.sin(ths), label: 'S', tone: 'heat', dx: -14, dy: 14 },
      ]}
      notes={[{ x: 2.9, y: 2.4, text: 'Γ/(2πUR) = 0.8: lift = ρUΓ per unit length', tone: 'heat', anchor: 'end' }]}
    >
      {({ x, y }) => (
        <g>
          <ellipse cx={x(0)} cy={y(0)} rx={x(1) - x(0)} ry={y(0) - y(1)} fill="var(--surface)" stroke="var(--ink)" strokeWidth={2} />
          <path d={`M${x(-0.45)},${y(0.25)} A${(x(0.5) - x(0)).toFixed(1)},${(y(0) - y(0.5)).toFixed(1)} 0 1 1 ${x(0.45)},${y(0.25)}`} fill="none" stroke="var(--heat)" strokeWidth={1.4} />
          <path d={`M${x(0.45)},${y(0.25)} l-9,-3 l3,9 z`} fill="var(--heat)" />
        </g>
      )}
    </Plot>
  )
}
