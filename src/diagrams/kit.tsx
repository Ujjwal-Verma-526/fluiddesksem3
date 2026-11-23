import type { ReactNode } from 'react'

/**
 * Small drawing kit shared by the hand-built fluid sketches. Every colour is a CSS
 * custom property, so sketches follow the light/dark theme. Marker ids are global but
 * every <Sketch> defines them identically, so a page with many sketches stays valid.
 */

export type Ink = 'ink' | 'muted' | 'heat' | 'cool' | 'faint'

export const INK: Record<Ink, string> = {
  ink: 'var(--ink)',
  muted: 'var(--muted)',
  heat: 'var(--heat)',
  cool: 'var(--cool)',
  faint: 'var(--rule-strong)',
}

export function Sketch({ w = 440, h = 260, label, children }: { w?: number; h?: number; label: string; children: ReactNode }) {
  return (
    <svg viewBox={`0 0 ${w} ${h}`} className="schem plot mx-auto block h-auto w-full max-w-[560px]" role="img" aria-label={label}>
      <defs>
        {(Object.keys(INK) as Ink[]).map((k) => (
          <marker key={k} id={`fd-arrow-${k}`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
            <path d="M0,1 L9,5 L0,9 z" fill={INK[k]} />
          </marker>
        ))}
        <pattern id="fd-hatch" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)">
          <line x1="0" y1="0" x2="0" y2="6" stroke="var(--muted)" strokeWidth="1" />
        </pattern>
      </defs>
      {children}
    </svg>
  )
}

/** Straight arrow from (x1,y1) to (x2,y2). `both` puts heads at both ends (dimension lines). */
export function Arrow({
  x1,
  y1,
  x2,
  y2,
  ink = 'ink',
  width = 1.5,
  both = false,
  dashed = false,
}: {
  x1: number
  y1: number
  x2: number
  y2: number
  ink?: Ink
  width?: number
  both?: boolean
  dashed?: boolean
}) {
  return (
    <line
      x1={x1}
      y1={y1}
      x2={x2}
      y2={y2}
      stroke={INK[ink]}
      strokeWidth={width}
      strokeDasharray={dashed ? '4 3' : undefined}
      markerEnd={`url(#fd-arrow-${ink})`}
      markerStart={both ? `url(#fd-arrow-${ink})` : undefined}
    />
  )
}

/** Text label; "V_1" renders V with a subscript 1. */
export function T({
  x,
  y,
  children,
  ink = 'ink',
  anchor = 'middle',
  size,
  italic,
  bold,
}: {
  x: number
  y: number
  children: string
  ink?: Ink
  anchor?: 'start' | 'middle' | 'end'
  size?: number
  italic?: boolean
  bold?: boolean
}) {
  return (
    <text
      x={x}
      y={y}
      textAnchor={anchor}
      style={{ fill: INK[ink], fontSize: size, fontStyle: italic ? 'italic' : undefined, fontWeight: bold ? 600 : undefined }}
    >
      <Rich text={children} />
    </text>
  )
}

/**
 * Inline sub/superscripts for sketch labels: "C_d" → C with subscript d (a run of letters
 * and digits), "H^{3/2}" → H with superscript 3/2. Everything else is literal text.
 */
export function Rich({ text }: { text: string }) {
  const parts: ReactNode[] = []
  const re = /_([A-Za-z0-9]+)|\^\{([^}]*)\}/g
  let last = 0
  let m: RegExpExecArray | null
  let k = 0
  while ((m = re.exec(text)) !== null) {
    if (m.index > last) parts.push(text.slice(last, m.index))
    if (m[1] !== undefined) {
      parts.push(
        <tspan key={k++} baselineShift="sub" fontSize="0.75em">
          {m[1]}
        </tspan>,
      )
    } else {
      parts.push(
        <tspan key={k++} baselineShift="super" fontSize="0.75em">
          {m[2]}
        </tspan>,
      )
    }
    last = re.lastIndex
  }
  if (last < text.length) parts.push(text.slice(last))
  return <>{parts}</>
}

/** Polyline / path helper. */
export function Line({ d, ink = 'ink', width = 1.5, dashed = false, fill = 'none', arrow = false }: { d: string; ink?: Ink; width?: number; dashed?: boolean; fill?: string; arrow?: boolean }) {
  return (
    <path
      d={d}
      fill={fill}
      stroke={INK[ink]}
      strokeWidth={width}
      strokeDasharray={dashed ? '4 3' : undefined}
      strokeLinejoin="round"
      strokeLinecap="round"
      markerEnd={arrow ? `url(#fd-arrow-${ink})` : undefined}
    />
  )
}

/** Water-filled region. */
export function Water({ d }: { d: string }) {
  return <path d={d} fill="var(--water)" stroke="none" />
}

/** Hatched solid boundary (a wall, ground or fixed plate) between two points, hatch on the given side. */
export function Wall({ x, y, w, h }: { x: number; y: number; w: number; h: number }) {
  return <rect x={x} y={y} width={w} height={h} fill="url(#fd-hatch)" stroke="var(--muted)" strokeWidth={1} />
}

/** Points of a polyline "x,y x,y ..." built from a function sampled on [a, b]. */
export function sample(f: (t: number) => [number, number], a: number, b: number, n = 60): string {
  const pts: string[] = []
  for (let i = 0; i <= n; i++) {
    const [x, y] = f(a + ((b - a) * i) / n)
    pts.push(`${i === 0 ? 'M' : 'L'}${x.toFixed(1)},${y.toFixed(1)}`)
  }
  return pts.join(' ')
}
