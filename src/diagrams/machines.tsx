import { useState } from 'react'
import { Plot } from './Plot'
import { Readout, Slider } from './controls'
import { Arrow, Line, Sketch, T, Wall } from './kit'

/* =============================================================================
 * Unit 6 — impact of jets, turbines and pumps
 * ========================================================================== */

export function JetPlates() {
  const nozzle = (x: number, y: number) => <path d={`M${x - 40},${y - 14} L${x},${y - 7} V${y + 7} L${x - 40},${y + 14} Z`} fill="var(--surface)" stroke="var(--ink)" strokeWidth={1.4} />
  return (
    <Sketch w={600} h={200} label="Jet striking a flat plate, a symmetrical curved plate and a semicircular vane">
      {/* flat plate */}
      {nozzle(50, 90)}
      <rect x={50} y={83} width={80} height={14} fill="var(--water)" />
      <Arrow x1={60} y1={90} x2={110} y2={90} ink="cool" />
      <Wall x={130} y={30} w={10} h={120} />
      <Arrow x1={128} y1={82} x2={128} y2={40} ink="cool" />
      <Arrow x1={128} y1={98} x2={128} y2={140} ink="cool" />
      <T x={95} y={176}>flat: F = ρaV²</T>
      {/* curved symmetrical */}
      {nozzle(230, 90)}
      <rect x={230} y={83} width={70} height={14} fill="var(--water)" />
      <Arrow x1={240} y1={90} x2={290} y2={90} ink="cool" />
      <path d="M270,30 Q330,40 330,90 Q330,140 270,150" fill="none" stroke="var(--ink)" strokeWidth={5} />
      <Arrow x1={318} y1={60} x2={280} y2={38} ink="cool" />
      <Arrow x1={318} y1={120} x2={280} y2={142} ink="cool" />
      <T x={262} y={44} ink="muted" italic>θ</T>
      <T x={290} y={176}>curved: ρaV²(1 + cos θ)</T>
      {/* semicircular */}
      {nozzle(430, 90)}
      <rect x={430} y={83} width={70} height={14} fill="var(--water)" />
      <Arrow x1={440} y1={90} x2={490} y2={90} ink="cool" />
      <path d="M470,40 A50,50 0 0 1 470,140" fill="none" stroke="var(--ink)" strokeWidth={5} />
      <Arrow x1={490} y1={50} x2={445} y2={50} ink="cool" />
      <Arrow x1={490} y1={130} x2={445} y2={130} ink="cool" />
      <T x={495} y={176}>semicircular: 2ρaV²</T>
    </Sketch>
  )
}

/** Inlet and outlet velocity triangles for a jet on a moving curved vane. */
export function VaneTriangles() {
  return (
    <Sketch w={440} h={260} label="Inlet and outlet velocity triangles for a moving curved vane">
      {/* vane */}
      <path d="M150,170 C200,110 260,110 300,170" fill="none" stroke="var(--ink)" strokeWidth={5} />
      <Arrow x1={190} y1={200} x2={260} y2={200} ink="ink" width={2} />
      <T x={225} y={216}>u (vane)</T>
      {/* inlet triangle: V1 from (40,230)?? drawn at the left tip */}
      <Arrow x1={40} y1={230} x2={150} y2={170} ink="heat" width={2} />
      <T x={78} y={190} ink="heat">V_1</T>
      <Arrow x1={40} y1={230} x2={110} y2={230} ink="ink" />
      <T x={75} y={246}>u</T>
      <Arrow x1={110} y1={230} x2={150} y2={170} ink="cool" width={2} />
      <T x={140} y={210} anchor="start" ink="cool">V_r1</T>
      <line x1={150} y1={170} x2={150} y2={230} stroke="var(--muted)" strokeDasharray="3 3" />
      <T x={156} y={222} anchor="start" ink="muted">V_f1</T>
      <T x={60} y={222} anchor="start" italic ink="muted">α</T>
      <T x={118} y={222} anchor="start" italic ink="muted">θ</T>
      {/* outlet triangle at the right tip */}
      <Arrow x1={300} y1={170} x2={350} y2={240} ink="cool" width={2} />
      <T x={338} y={212} anchor="start" ink="cool">V_r2</T>
      <Arrow x1={350} y1={240} x2={420} y2={240} ink="ink" />
      <T x={385} y={255}>u</T>
      <Arrow x1={300} y1={170} x2={420} y2={240} ink="heat" width={2} dashed />
      <T x={372} y={196} anchor="start" ink="heat">V_2</T>
      <T x={290} y={40} anchor="start" ink="heat">work / weight = (V_w1 ± V_w2) u / g</T>
      <T x={290} y={58} anchor="start" ink="muted">shockless entry: vane tip ∥ V_r1</T>
    </Sketch>
  )
}

/** Interactive: efficiency against speed ratio for a series of flat plates and semicircular vanes. */
export function JetEfficiency() {
  const [V, setV] = useState(50)
  const [u, setU] = useState(12)
  const n = 60
  const flat: [number, number][] = Array.from({ length: n + 1 }, (_, i) => {
    const r = i / n
    return [r, 2 * r * (1 - r)]
  })
  const semi: [number, number][] = Array.from({ length: n + 1 }, (_, i) => {
    const r = i / n
    return [r, 4 * r * (1 - r)]
  })
  const r = Math.min(u / V, 1)
  const etaFlat = 2 * r * (1 - r)
  return (
    <div className="space-y-4">
      <Plot
        ariaLabel="Efficiency against u/V for a series of flat plates (maximum 50%) and semicircular vanes (maximum 100%)"
        xLabel="u/V"
        yLabel="η"
        xRange={[0, 1]}
        yRange={[0, 1.05]}
        ticks={{ x: [0, 0.25, 0.5, 0.75, 1], y: [0, 0.25, 0.5, 0.75, 1] }}
        series={[
          { pts: flat, tone: 'cool', width: 2 },
          { pts: semi, tone: 'ink', width: 1.4, dashed: true },
          { pts: [[0.5, 0], [0.5, 1]], tone: 'faint', dashed: true, width: 1 },
        ]}
        marks={[{ x: r, y: etaFlat, label: `${(etaFlat * 100).toFixed(1)}%`, tone: 'heat' }]}
        notes={[
          { x: 0.5, y: 0.53, text: 'flat plates: max 50% at u = V/2', tone: 'cool' },
          { x: 0.5, y: 1.02, text: 'semicircular vanes: max 100%', tone: 'ink' },
        ]}
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-3">
          <Slider label="Jet velocity V" value={V} min={10} max={80} step={1} onChange={setV} fmt={(v) => `${v} m/s`} />
          <Slider label="Plate velocity u" value={u} min={0} max={V} step={0.5} onChange={setU} fmt={(v) => `${v} m/s`} />
        </div>
        <div className="space-y-1.5">
          <Readout label="Work per kg, (V − u)u" value={`${((V - Math.min(u, V)) * Math.min(u, V)).toFixed(1)} J/kg`} />
          <Readout label="η (series of flat plates)" value={`${(etaFlat * 100).toFixed(1)} %`} tone="heat" />
          <Readout label="u for η_max" value={`${(V / 2).toFixed(1)} m/s`} tone="cool" />
        </div>
      </div>
    </div>
  )
}

/** Pelton, Francis and Kaplan: flow paths through the runner (qualitative). */
export function TurbineTypes() {
  return (
    <Sketch w={600} h={210} label="Flow paths: tangential in a Pelton wheel, radial-to-axial in a Francis turbine, axial in a Kaplan turbine">
      {/* Pelton */}
      <circle cx={100} cy={95} r={55} fill="none" stroke="var(--ink)" strokeWidth={1.6} />
      {Array.from({ length: 12 }, (_, i) => {
        const a = (i * Math.PI) / 6
        return <path key={i} d={`M${100 + 55 * Math.cos(a)},${95 + 55 * Math.sin(a)} a8,8 0 1 0 ${10 * Math.cos(a + 1.2)},${10 * Math.sin(a + 1.2)}`} fill="none" stroke="var(--ink)" strokeWidth={1.4} />
      })}
      <Arrow x1={10} y1={160} x2={90} y2={160} ink="cool" width={2.4} />
      <T x={100} y={190} bold>Pelton: tangential, impulse</T>
      <T x={100} y={204} ink="muted" size={10}>high head, N_s low</T>
      {/* Francis */}
      <circle cx={300} cy={95} r={60} fill="none" stroke="var(--muted)" strokeDasharray="4 3" />
      <circle cx={300} cy={95} r={38} fill="none" stroke="var(--ink)" strokeWidth={1.6} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4
        return <Arrow key={i} x1={300 + 58 * Math.cos(a)} y1={95 + 58 * Math.sin(a)} x2={300 + 40 * Math.cos(a + 0.35)} y2={95 + 40 * Math.sin(a + 0.35)} ink="cool" width={1.2} />
      })}
      <circle cx={300} cy={95} r={8} fill="var(--heat)" />
      <T x={300} y={190} bold>Francis: radial in, axial out</T>
      <T x={300} y={204} ink="muted" size={10}>reaction, medium head</T>
      {/* Kaplan */}
      <rect x={480} y={20} width={60} height={150} fill="var(--water)" stroke="var(--ink)" />
      <line x1={510} y1={20} x2={510} y2={100} stroke="var(--ink)" strokeWidth={4} />
      <ellipse cx={510} cy={105} rx={8} ry={12} fill="var(--ink)" />
      <Line d="M482,100 L538,110 M482,112 L538,100" ink="heat" width={3} />
      {[495, 525].map((x) => (
        <Arrow key={x} x1={x} y1={40} x2={x} y2={80} ink="cool" />
      ))}
      <Arrow x1={510} y1={130} x2={510} y2={165} ink="cool" />
      <T x={510} y={190} bold>Kaplan: axial</T>
      <T x={510} y={204} ink="muted" size={10}>reaction, low head, adjustable blades</T>
    </Sketch>
  )
}

/** Rotor with inlet and outlet radii and whirl components (Euler equation). */
export function RotorTriangles() {
  const cx = 160
  const cy = 130
  return (
    <Sketch w={440} h={260} label="Rotor with inlet radius r1 and outlet radius r2 and velocity triangles at each">
      <circle cx={cx} cy={cy} r={100} fill="none" stroke="var(--ink)" strokeWidth={1.6} />
      <circle cx={cx} cy={cy} r={45} fill="none" stroke="var(--ink)" strokeWidth={1.6} />
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i * Math.PI) / 4
        return <Line key={i} d={`M${cx + 45 * Math.cos(a)},${cy + 45 * Math.sin(a)} Q${cx + 75 * Math.cos(a + 0.35)},${cy + 75 * Math.sin(a + 0.35)} ${cx + 100 * Math.cos(a + 0.5)},${cy + 100 * Math.sin(a + 0.5)}`} ink="muted" width={1.4} />
      })}
      <circle cx={cx} cy={cy} r={4} fill="var(--ink)" />
      <Arrow x1={cx} y1={cy} x2={cx + 100} y2={cy} ink="muted" width={1} />
      <T x={cx + 70} y={cy - 6} italic>r_1</T>
      <Arrow x1={cx} y1={cy} x2={cx - 32} y2={cy + 32} ink="muted" width={1} />
      <T x={cx - 30} y={cy + 14} italic>r_2</T>
      {/* inlet triangle at the outer rim (inward-flow turbine) */}
      <Arrow x1={cx + 100} y1={cy} x2={cx + 100} y2={cy - 70} ink="ink" />
      <T x={cx + 106} y={cy - 64} anchor="start">u_1 = ωr_1</T>
      <Arrow x1={cx + 160} y1={cy - 40} x2={cx + 102} y2={cy - 2} ink="heat" width={2} />
      <T x={cx + 164} y={cy - 40} anchor="start" ink="heat">V_1</T>
      <T x={cx + 130} y={cy + 20} anchor="start" ink="muted">V_w1 = V_1 cos α</T>
      <T x={250} y={226} anchor="middle">T = ρQ(V_w1 r_1 − V_w2 r_2)</T>
      <T x={250} y={246} anchor="middle" ink="heat">E = (V_w1 u_1 − V_w2 u_2)/g</T>
    </Sketch>
  )
}
