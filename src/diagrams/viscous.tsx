import { Plot, type Series } from './Plot'
import { Arrow, Line, Sketch, T, Wall, Water, sample } from './kit'

/* =============================================================================
 * Units 3 and 4 — viscous flow, turbulence and pipe losses
 * ========================================================================== */

/** Parabolic velocity and linear shear stress in laminar pipe flow (computed). */
export function PipeProfile() {
  const top = 40
  const bot = 200
  const R = (bot - top) / 2
  const mid = (top + bot) / 2
  const Umax = 150
  const x0 = 70
  const ys = Array.from({ length: 13 }, (_, i) => top + (i * (bot - top)) / 12)
  const u = (y: number) => Umax * (1 - ((y - mid) / R) ** 2)
  const tx0 = 330
  const tau = (y: number) => (55 * Math.abs(y - mid)) / R
  return (
    <Sketch w={440} h={240} label="Laminar pipe flow: parabolic velocity profile and linear shear stress distribution">
      <Wall x={20} y={top - 10} w={400} h={10} />
      <Wall x={20} y={bot} w={400} h={10} />
      <line x1={x0} y1={top} x2={x0} y2={bot} stroke="var(--ink)" />
      {ys.map((y) => (u(y) > 4 ? <Arrow key={y} x1={x0} y1={y} x2={x0 + u(y)} y2={y} ink="cool" width={1.1} /> : null))}
      <Line d={sample((t) => [x0 + u(top + t * (bot - top)), top + t * (bot - top)], 0, 1)} ink="cool" width={2} />
      <line x1={20} y1={mid} x2={420} y2={mid} stroke="var(--muted)" strokeDasharray="6 4" />
      <T x={x0 + Umax + 8} y={mid - 6} anchor="start" ink="cool">U_max = 2ū</T>
      <T x={x0 + 40} y={232} ink="cool">u = U_max(1 − r²/R²)</T>
      {/* shear */}
      <line x1={tx0} y1={top} x2={tx0} y2={bot} stroke="var(--ink)" />
      <path d={`M${tx0},${top} L${tx0 + tau(top)},${top} L${tx0},${mid} L${tx0 + tau(bot)},${bot} L${tx0},${bot}`} fill="color-mix(in oklab, var(--heat) 16%, transparent)" stroke="var(--heat)" strokeWidth={1.6} />
      <T x={tx0 + 60} y={top + 14} anchor="start" ink="heat">τ_0</T>
      <T x={tx0 + 20} y={232} ink="heat">τ = −(∂p/∂x) r/2</T>
    </Sketch>
  )
}

/** Laminar flow between fixed parallel plates (computed). */
export function PlatesProfile() {
  const top = 40
  const bot = 200
  const t = bot - top
  const Umax = 150
  const x0 = 70
  const u = (y: number) => {
    const s = (bot - y) / t
    return 4 * Umax * (s - s * s)
  }
  const ys = Array.from({ length: 13 }, (_, i) => top + (i * t) / 12)
  const tx0 = 330
  const mid = (top + bot) / 2
  return (
    <Sketch w={440} h={240} label="Laminar flow between two fixed parallel plates: parabolic velocity and linear shear">
      <Wall x={20} y={top - 10} w={400} h={10} />
      <Wall x={20} y={bot} w={400} h={10} />
      <line x1={x0} y1={top} x2={x0} y2={bot} stroke="var(--ink)" />
      {ys.map((y) => (u(y) > 4 ? <Arrow key={y} x1={x0} y1={y} x2={x0 + u(y)} y2={y} ink="cool" width={1.1} /> : null))}
      <Line d={sample((s) => [x0 + u(top + s * t), top + s * t], 0, 1)} ink="cool" width={2} />
      <line x1={20} y1={mid} x2={420} y2={mid} stroke="var(--muted)" strokeDasharray="6 4" />
      <T x={x0 + Umax + 8} y={mid - 6} anchor="start" ink="cool">U_max = 1.5ū</T>
      <Arrow x1={40} y1={bot} x2={40} y2={top} ink="muted" both width={1} />
      <T x={34} y={mid + 4} anchor="end" italic>t</T>
      <T x={x0 + 70} y={232} ink="cool">u = −(1/2μ)(∂p/∂x)(ty − y²)</T>
      <line x1={tx0} y1={top} x2={tx0} y2={bot} stroke="var(--ink)" />
      <path d={`M${tx0},${top} L${tx0 + 55},${top} L${tx0},${mid} L${tx0 + 55},${bot} L${tx0},${bot}`} fill="color-mix(in oklab, var(--heat) 16%, transparent)" stroke="var(--heat)" strokeWidth={1.6} />
      <T x={tx0 + 30} y={232} ink="heat">τ linear, zero at mid-gap</T>
    </Sketch>
  )
}

export function CollarBearing() {
  return (
    <Sketch w={440} h={240} label="Collar bearing: shaft with collar on an oil film, elemental ring of radius r and width dr">
      <rect x={185} y={10} width={70} height={110} fill="var(--surface)" stroke="var(--ink)" strokeWidth={1.6} />
      <T x={220} y={50}>shaft</T>
      <rect x={110} y={120} width={220} height={26} fill="var(--surface)" stroke="var(--ink)" strokeWidth={1.6} />
      <T x={220} y={137}>collar</T>
      <rect x={110} y={146} width={220} height={9} fill="color-mix(in oklab, var(--heat) 30%, transparent)" />
      <T x={340} y={155} anchor="start" ink="heat">oil film, thickness t</T>
      <Wall x={90} y={155} w={260} h={16} />
      <path d="M190,180 A40,10 0 1 0 250,180" fill="none" stroke="var(--ink)" />
      <Arrow x1={250} y1={180} x2={258} y2={174} />
      <T x={268} y={190} anchor="start" italic>N rpm</T>
      {/* radii */}
      <line x1={220} y1={120} x2={220} y2={230} stroke="var(--muted)" strokeDasharray="6 4" />
      <Arrow x1={220} y1={205} x2={330} y2={205} ink="muted" both width={1} />
      <T x={300} y={200} italic>R_1</T>
      <Arrow x1={220} y1={222} x2={255} y2={222} ink="muted" both width={1} />
      <T x={262} y={226} anchor="start" italic>R_2</T>
      <rect x={290} y={146} width={10} height={9} fill="var(--heat)" />
      <T x={295} y={110} ink="heat" size={11}>ring r, dr</T>
      <Line d="M295,114 V144" ink="heat" width={1} arrow />
      <T x={20} y={30} anchor="start" ink="heat">T = πμω(R₁⁴ − R₂⁴)/(2t)</T>
    </Sketch>
  )
}

/** Fluctuating velocity at a point in turbulent flow (computed from a fixed sum of sines). */
export function TurbulentFluctuation() {
  const n = 400
  const pts: [number, number][] = []
  for (let i = 0; i <= n; i++) {
    const t = i / n
    const f = 0.35 * Math.sin(53 * t) + 0.22 * Math.sin(137 * t + 1) + 0.15 * Math.sin(311 * t + 2) + 0.1 * Math.sin(701 * t + 0.4)
    pts.push([t, 3 + f])
  }
  return (
    <Plot
      ariaLabel="Velocity at a point in turbulent flow fluctuating about its time mean"
      xLabel="t"
      yLabel="u"
      xRange={[0, 1]}
      yRange={[0, 4.2]}
      series={[
        { pts, tone: 'cool', width: 1.2 },
        { pts: [[0, 3], [1, 3]], tone: 'heat', dashed: true, width: 1.8 },
      ]}
      notes={[
        { x: 0.98, y: 2.2, text: 'ū (time mean)', tone: 'heat', anchor: 'end' },
        { x: 0.02, y: 4.0, text: "u = ū + u′,  intensity = √(u′²)‾ / ū", tone: 'ink', anchor: 'start' },
      ]}
    />
  )
}

export function SuddenEnlargement() {
  return (
    <Sketch w={440} h={220} label="Sudden enlargement with eddies in the corners and sections 1-1 and 2-2">
      <Water d="M20,80 H160 V40 H420 V180 H160 V140 H20 Z" />
      <path d="M20,80 H160 V40 H420 M20,140 H160 V180 H420" fill="none" stroke="var(--ink)" strokeWidth={2} />
      <Arrow x1={40} y1={110} x2={130} y2={110} ink="cool" width={2} />
      <T x={70} y={102} ink="cool">V_1</T>
      <Arrow x1={330} y1={110} x2={400} y2={110} ink="cool" width={2} />
      <T x={365} y={102} ink="cool">V_2</T>
      {[60, 160].map((y) => (
        <g key={y}>
          <circle cx={185} cy={y} r={11} fill="none" stroke="var(--heat)" />
          <circle cx={210} cy={y} r={8} fill="none" stroke="var(--heat)" />
        </g>
      ))}
      <Line d="M160,80 Q240,70 300,45" ink="faint" dashed />
      <Line d="M160,140 Q240,150 300,175" ink="faint" dashed />
      <line x1={164} y1={30} x2={164} y2={190} stroke="var(--ink)" strokeDasharray="5 3" />
      <T x={164} y={204}>1</T>
      <line x1={310} y1={30} x2={310} y2={190} stroke="var(--ink)" strokeDasharray="5 3" />
      <T x={310} y={204}>2</T>
      <T x={230} y={24} ink="heat">h_e = (V₁ − V₂)²/2g</T>
    </Sketch>
  )
}

export function HglTel() {
  return (
    <Sketch w={440} h={240} label="Hydraulic gradient line and total energy line for a pipe joining two tanks">
      <rect x={20} y={40} width={70} height={140} fill="var(--water)" stroke="var(--ink)" />
      <rect x={350} y={110} width={70} height={70} fill="var(--water)" stroke="var(--ink)" />
      <rect x={90} y={160} width={260} height={14} fill="var(--water)" stroke="var(--ink)" />
      <line x1={20} y1={40} x2={90} y2={40} stroke="var(--cool)" strokeWidth={2} />
      <line x1={350} y1={110} x2={420} y2={110} stroke="var(--cool)" strokeWidth={2} />
      {/* TEL: entry drop, friction slope, exit drop */}
      <Line d="M90,40 V52 L350,92 V110" ink="heat" width={2} />
      <T x={210} y={64} ink="heat">TEL</T>
      {/* HGL: V²/2g below TEL */}
      <Line d="M90,70 L350,110" ink="cool" width={2} dashed />
      <T x={230} y={110} ink="cool">HGL</T>
      <Arrow x1={300} y1={84} x2={300} y2={102} ink="muted" both width={1} />
      <T x={306} y={98} anchor="start" size={10}>V²/2g</T>
      <T x={96} y={50} anchor="start" size={10} ink="heat">entry 0.5V²/2g</T>
      <T x={346} y={104} anchor="end" size={10} ink="heat">exit V²/2g</T>
      <T x={220} y={222}>TEL always falls; HGL is V²/2g below it</T>
    </Sketch>
  )
}

export function SeriesParallel() {
  return (
    <Sketch w={440} h={210} label="Pipes in series and pipes in parallel">
      <T x={110} y={24} bold>series: same Q, h_f add</T>
      <rect x={20} y={60} width={70} height={30} fill="var(--water)" stroke="var(--ink)" />
      <rect x={90} y={67} width={60} height={16} fill="var(--water)" stroke="var(--ink)" />
      <rect x={150} y={55} width={60} height={40} fill="var(--water)" stroke="var(--ink)" />
      <T x={55} y={110}>L₁, d₁</T>
      <T x={120} y={110}>L₂, d₂</T>
      <T x={180} y={110}>L₃, d₃</T>
      <Arrow x1={30} y1={75} x2={80} y2={75} ink="cool" />
      <T x={330} y={24} bold>parallel: same h_f, Q add</T>
      <Line d="M240,90 H280 C300,90 300,50 320,50 H370 C390,50 390,90 410,90 H430" ink="ink" width={6} />
      <Line d="M280,90 C300,90 300,130 320,130 H370 C390,130 390,90 410,90" ink="ink" width={9} />
      <T x={345} y={42}>Q₁</T>
      <T x={345} y={150}>Q₂</T>
      <Arrow x1={244} y1={90} x2={272} y2={90} ink="cool" />
      <T x={250} y={80}>Q</T>
      <T x={220} y={190} ink="muted">equivalent pipe (Dupuit): L/d⁵ = Σ Lᵢ/dᵢ⁵</T>
    </Sketch>
  )
}

export function SublayerRoughness() {
  const bumps = (x0: number, h: number) => Array.from({ length: 9 }, (_, i) => `M${x0 + i * 20},170 l10,${-h} l10,${h}`).join(' ')
  return (
    <Sketch w={440} h={210} label="Roughness inside the laminar sub-layer (smooth) and protruding through it (rough)">
      {[
        { x0: 20, h: 8, title: 'hydrodynamically smooth', note: 'k/δ′ < 0.25' },
        { x0: 240, h: 34, title: 'hydrodynamically rough', note: 'k/δ′ > 6' },
      ].map(({ x0, h, title, note }) => (
        <g key={x0}>
          <Water d={`M${x0},40 H${x0 + 180} V170 H${x0} Z`} />
          <path d={bumps(x0, h)} fill="var(--surface)" stroke="var(--ink)" strokeWidth={1.4} />
          <Wall x={x0} y={170} w={180} h={10} />
          <line x1={x0} y1={150} x2={x0 + 180} y2={150} stroke="var(--heat)" strokeDasharray="5 3" />
          <T x={x0 + 90} y={144} ink="heat" size={10}>laminar sub-layer δ′</T>
          {[60, 80, 100, 120].map((y) => (
            <Arrow key={y} x1={x0 + 20} y1={y} x2={x0 + 70 + (y < 110 ? 20 : 0)} y2={y} ink="cool" width={1} />
          ))}
          {h > 20 && <Line d={`M${x0 + 135},140 q8,-12 16,0 q-8,12 -16,0`} ink="cool" />}
          <T x={x0 + 90} y={28} bold>{title}</T>
          <T x={x0 + 90} y={198} ink="muted">{note}</T>
        </g>
      ))}
    </Sketch>
  )
}

/** Moody chart: Colebrook–White solved by fixed-point iteration (computed). */
function colebrook(re: number, rr: number): number {
  let x = 7 // x = 1/√f
  for (let i = 0; i < 60; i++) {
    const next = -2 * Math.log10(rr / 3.7 + (2.51 * x) / re)
    if (!Number.isFinite(next)) throw new Error(`Colebrook diverged at Re=${re}, k/D=${rr}`)
    if (Math.abs(next - x) < 1e-10) {
      x = next
      break
    }
    x = next
  }
  return 1 / (x * x)
}

export function MoodyChart() {
  const lg = Math.log10
  const series: Series[] = []
  series.push({ pts: Array.from({ length: 30 }, (_, i) => {
    const l = 2.8 + (i / 29) * (lg(4000) - 2.8)
    return [l, lg(64 / 10 ** l)] as [number, number]
  }), tone: 'heat', width: 2 })
  const rough = [0, 1e-5, 1e-4, 1e-3, 5e-3, 0.02, 0.05]
  for (const rr of rough) {
    const pts: [number, number][] = []
    for (let i = 0; i <= 80; i++) {
      const l = lg(4000) + (i / 80) * (8 - lg(4000))
      pts.push([l, lg(colebrook(10 ** l, rr))])
    }
    series.push({ pts, tone: rr === 0 ? 'cool' : 'ink', width: rr === 0 ? 2 : 1.2, dashed: rr === 0 })
  }
  const fTicks = [0.008, 0.01, 0.015, 0.02, 0.03, 0.04, 0.06, 0.08]
  return (
    <Plot
      ariaLabel="Moody chart: Darcy friction factor against Reynolds number for several relative roughnesses"
      xLabel="Re"
      yLabel="f"
      xRange={[2.8, 8]}
      yRange={[lg(0.007), lg(0.1)]}
      width={460}
      height={320}
      ticks={{ x: [3, 4, 5, 6, 7, 8], y: fTicks.map(lg), fmtX: (n) => `1e${n}`, fmtY: (n) => String(Number((10 ** n).toPrecision(2))) }}
      series={series}
      notes={[
        { x: 3.05, y: lg(0.075), text: 'laminar 64/Re', tone: 'heat', anchor: 'start' },
        { x: 7.95, y: lg(0.0074), text: 'smooth pipe', tone: 'cool', anchor: 'end' },
        { x: 7.95, y: lg(0.071), text: 'k/D = 0.05', tone: 'ink', anchor: 'end' },
        { x: 7.95, y: lg(0.0205), text: '0.001', tone: 'muted', anchor: 'end' },
        { x: 7.95, y: lg(0.0123), text: '0.0001', tone: 'muted', anchor: 'end' },
      ]}
    />
  )
}
