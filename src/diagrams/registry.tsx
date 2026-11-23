import type { ComponentType } from 'react'
import type { DiagramMeta } from '../content/types'
import * as st from './statics'
import * as km from './kinematics'
import * as mt from './meters'
import * as vs from './viscous'
import * as bl from './boundary'
import * as mc from './machines'

export interface DiagramEntry {
  meta: DiagramMeta
  Render: ComponentType
}

type Def = Omit<DiagramMeta, 'id'> & { Render: ComponentType }

const defs: Record<string, Def> = {
  /* ---------- Unit 1 ---------- */
  'newton-viscosity': { title: 'Newton’s law of viscosity', topicId: 'u1-properties', kind: 'qualitative', caption: 'Fluid between a fixed plate and a plate moving at U: the velocity varies linearly across the gap, and τ = μ du/dy.', Render: st.NewtonViscosity },
  'fluid-types': { title: 'Types of fluid', topicId: 'u1-properties', kind: 'qualitative', caption: 'Shear stress against rate of shear strain: Newtonian (straight through the origin), ideal plastic (yield stress first), shear-thinning and shear-thickening non-Newtonian fluids, and the two ideal limits.', Render: st.FluidTypes },
  'u-tube-manometer': { title: 'Simple U-tube manometer', topicId: 'u1-pressure-manometry', kind: 'recreated', caption: 'Equate pressures on the datum A–A through the lower mercury surface: p + ρ₁gh₁ = ρ₂gh₂.', Render: st.UTubeManometer },
  'diff-manometer': { title: 'U-tube differential manometer', topicId: 'u1-pressure-manometry', kind: 'recreated', caption: 'A and B at different levels with different liquids: p_A − p_B = hg(ρ_g − ρ₁) + ρ₂gy − ρ₁gx.', Render: st.DiffManometer },
  'centre-of-pressure': { title: 'Centre of pressure on a vertical plate', topicId: 'u1-hydrostatic-forces', kind: 'interactive', caption: 'A 2 m deep vertical plate. Lower it and watch the centre of pressure P approach the centroid G: h* − h̄ = I_G/(A h̄) shrinks with depth but never reaches zero.', Render: st.CentreOfPressure },
  'curved-surface': { title: 'Force on a curved surface', topicId: 'u1-hydrostatic-forces', kind: 'qualitative', caption: 'F_x acts on the vertical projection; F_y is the weight of water vertically above the curve. For a circular surface the resultant passes through the centre O.', Render: st.CurvedSurface },
  'metacentre': { title: 'Metacentre of a floating body', topicId: 'u1-buoyancy-stability', kind: 'qualitative', caption: 'Tilting moves the centre of buoyancy from B to B₁; the vertical through B₁ meets the body axis at M. M above G gives a restoring couple.', Render: st.Metacentre },
  'gm-experiment': { title: 'Metacentric height by experiment', topicId: 'u1-buoyancy-stability', kind: 'qualitative', caption: 'Moving a known weight w₁ across the deck through x tilts the ship through θ, read from a plumb line: GM = w₁x/(W tan θ).', Render: st.GMExperiment },
  'flow-lines': { title: 'Stream, path and streak lines', topicId: 'u1-kinematics', kind: 'qualitative', caption: 'In unsteady flow the three differ. In steady flow they coincide.', Render: km.FlowLines },
  'flow-net-3xy': { title: 'Flow net for ψ = 3xy', topicId: 'u1-potential-functions', kind: 'computed', caption: 'Stream lines xy = const and equipotentials x² − y² = const cut at right angles: flow into a 90° corner with a stagnation point at the origin (the 2024 Q5(a) flow, Bansal’s sign convention u = −3x, v = 3y).', Render: km.FlowNet3xy },
  'simple-flows': { title: 'Elementary potential flows', topicId: 'u1-simple-flows', kind: 'qualitative', caption: 'Uniform flow, source, sink, free vortex and doublet: the building blocks that are superposed for flow past bodies.', Render: km.SimpleFlows },
  'vortex-profiles': { title: 'Forced and free vortex surfaces', topicId: 'u1-simple-flows', kind: 'computed', caption: 'Forced vortex: paraboloid z = ω²r²/2g. Free vortex: z = H − C²/(2gr²), plunging near the axis.', Render: st.VortexProfiles },

  /* ---------- Unit 2 ---------- */
  'system-cv': { title: 'System and control volume', topicId: 'u2-system-rtt', kind: 'qualitative', caption: 'The control volume stays fixed; the system (a fixed mass) moves through it. The Reynolds transport theorem relates the two.', Render: km.SystemCV },
  'euler-element': { title: 'Forces on a fluid element along a stream line', topicId: 'u2-euler-bernoulli', kind: 'qualitative', caption: 'Pressure on the two ends and the weight component along s balance the inertia of the element, giving Euler’s equation.', Render: km.EulerElement },
  'venturimeter': { title: 'Venturimeter', topicId: 'u2-flow-measurement', kind: 'recreated', caption: 'Short convergent cone, throat, long divergent cone; a differential manometer reads the head difference between inlet and throat.', Render: mt.Venturimeter },
  'pitot-tube': { title: 'Pitot-static tube', topicId: 'u2-flow-measurement', kind: 'recreated', caption: 'The nose hole reads stagnation pressure, the side holes static pressure; the difference gives the velocity at that point.', Render: mt.PitotTube },
  'notches': { title: 'Rectangular and triangular notches', topicId: 'u2-flow-measurement', kind: 'recreated', caption: 'Discharge varies as H³ᐟ² for a rectangular notch and H⁵ᐟ² for a V-notch.', Render: mt.Notches },

  /* ---------- Unit 3 ---------- */
  'pipe-profile': { title: 'Laminar flow in a pipe', topicId: 'u3-pipe-laminar', kind: 'computed', caption: 'Velocity is a parabola with U_max = 2ū on the axis; shear stress is linear, zero on the axis and τ₀ at the wall.', Render: vs.PipeProfile },
  'plates-profile': { title: 'Laminar flow between fixed plates', topicId: 'u3-parallel-plates', kind: 'computed', caption: 'Parabolic velocity with U_max = 1.5ū at mid-gap; shear linear, zero at mid-gap and maximum at each plate.', Render: vs.PlatesProfile },
  'collar-bearing': { title: 'Collar bearing', topicId: 'u3-viscous-power', kind: 'recreated', caption: 'The torque on each elemental ring is integrated between the inner radius R₂ and outer radius R₁ of the collar.', Render: vs.CollarBearing },
  'viscometers': { title: 'Capillary and falling-sphere viscometers', topicId: 'u3-viscometers', kind: 'recreated', caption: 'Capillary: Hagen–Poiseuille gives μ from h and Q. Falling sphere: Stokes’ law gives μ from the terminal velocity.', Render: mt.Viscometers },

  /* ---------- Unit 4 ---------- */
  'reynolds-experiment': { title: 'Reynolds’ experiment', topicId: 'u4-turbulence', kind: 'qualitative', caption: 'A dye filament stays straight in laminar flow, wavers in transition and mixes across the tube in turbulent flow.', Render: mt.ReynoldsExperiment },
  'turbulent-fluctuation': { title: 'Velocity fluctuation at a point', topicId: 'u4-turbulence', kind: 'qualitative', caption: 'Turbulent velocity fluctuates randomly about its time mean ū; the rms of u′ divided by ū is the turbulence intensity.', Render: vs.TurbulentFluctuation },
  'sudden-enlargement': { title: 'Sudden enlargement', topicId: 'u4-pipe-losses', kind: 'qualitative', caption: 'Eddies form in the corners; momentum and energy between sections 1 and 2 give h_e = (V₁ − V₂)²/2g.', Render: vs.SuddenEnlargement },
  'hgl-tel': { title: 'HGL and TEL', topicId: 'u4-pipe-losses', kind: 'qualitative', caption: 'The total energy line drops at the entrance, slopes down with friction and drops at the exit. The hydraulic gradient line runs V²/2g below it.', Render: vs.HglTel },
  'series-parallel': { title: 'Pipes in series and parallel', topicId: 'u4-series-parallel', kind: 'qualitative', caption: 'Series: one discharge, losses add. Parallel: one head loss, discharges add.', Render: vs.SeriesParallel },
  'sublayer-roughness': { title: 'Smooth and rough boundaries', topicId: 'u4-smooth-rough', kind: 'qualitative', caption: 'Roughness buried in the laminar sub-layer: hydrodynamically smooth. Roughness protruding through it: rough.', Render: vs.SublayerRoughness },
  'moody-chart': { title: 'Moody chart', topicId: 'u4-smooth-rough', kind: 'computed', caption: 'Darcy f against Re from the Colebrook equation for k/D = 0 (smooth), 10⁻⁵, 10⁻⁴, 10⁻³, 0.005, 0.02 and 0.05, with the laminar line 64/Re. Not in Bansal.', Render: vs.MoodyChart },

  /* ---------- Unit 5 ---------- */
  'bl-growth': { title: 'Boundary layer on a flat plate', topicId: 'u5-bl-concept', kind: 'qualitative', caption: 'Laminar boundary layer grows as √x, becomes turbulent near Re_x ≈ 5 × 10⁵ and then thickens faster, keeping a thin laminar sub-layer.', Render: bl.BLGrowth },
  'bl-thicknesses': { title: 'δ, δ* and θ', topicId: 'u5-bl-concept', kind: 'computed', caption: 'Integrated numerically for the Pohlhausen profile 2η − 2η³ + η⁴: δ* = 0.30δ and θ = 0.118δ.', Render: bl.BLThicknesses },
  'bl-separation': { title: 'Boundary layer separation', topicId: 'u5-separation', kind: 'qualitative', caption: 'In the adverse pressure gradient the wall velocity gradient falls to zero at S, and beyond it the flow near the wall reverses.', Render: bl.BLSeparation },
  'drag-lift': { title: 'Drag and lift', topicId: 'u5-drag-lift', kind: 'qualitative', caption: 'The resultant force R on an inclined body splits into drag along the free stream and lift normal to it.', Render: bl.DragLift },
  'cylinder-circulation': { title: 'Flow past a cylinder with circulation', topicId: 'u5-drag-lift', kind: 'computed', caption: 'Stream lines of uniform flow + doublet + clockwise vortex: faster (crowded) above, slower below, stagnation points S shifted down. The pressure difference gives lift ρUΓ.', Render: bl.CylinderCirculation },

  /* ---------- Unit 6 ---------- */
  'jet-plates': { title: 'Jet on stationary plates', topicId: 'u6-jets', kind: 'qualitative', caption: 'Flat plate: jet momentum destroyed. Curved plate: deflected back at θ. Semicircular vane: fully reversed, so twice the flat-plate force.', Render: mc.JetPlates },
  'vane-triangles': { title: 'Velocity triangles on a moving vane', topicId: 'u6-jets', kind: 'qualitative', caption: 'Relative velocity V_r = V − u. For shockless entry the vane tip is parallel to V_r1; without friction V_r2 = V_r1.', Render: mc.VaneTriangles },
  'jet-efficiency': { title: 'Efficiency of a series of plates', topicId: 'u6-jets', kind: 'interactive', caption: 'η = 2u(V − u)/V² for flat plates (max 50%) and 4u(V − u)/V² for semicircular vanes (max 100%), both at u = V/2. Defaults are the 2024 Q4(c) numbers.', Render: mc.JetEfficiency },
  'turbine-types': { title: 'Pelton, Francis and Kaplan', topicId: 'u6-turbines', kind: 'qualitative', caption: 'Tangential flow in an impulse Pelton wheel, radial-in/axial-out in a Francis reaction turbine, axial flow in a Kaplan.', Render: mc.TurbineTypes },
  'centrifugal-pump': { title: 'Centrifugal pump', topicId: 'u6-pumps', kind: 'recreated', caption: 'Impeller in a volute casing; liquid enters at the eye from the suction pipe and leaves through the delivery pipe.', Render: mt.CentrifugalPump },
  'rotor-triangles': { title: 'Rotor and whirl components', topicId: 'u6-euler', kind: 'qualitative', caption: 'Only the whirl components V_w have a moment about the axis, so torque = ρQ(V_w1 r₁ − V_w2 r₂).', Render: mc.RotorTriangles },
}

export const DIAGRAMS: Record<string, DiagramEntry> = Object.fromEntries(
  Object.entries(defs).map(([id, { Render, ...meta }]) => [id, { meta: { id, ...meta }, Render }]),
)

export const KIND_LABEL: Record<DiagramMeta['kind'], string> = {
  computed: 'Computed from the equations',
  recreated: 'Recreated illustration',
  qualitative: 'Qualitative sketch',
  interactive: 'Interactive',
}
