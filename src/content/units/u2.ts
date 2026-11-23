import type { Formula, Question, Topic, WorkedExample } from '../types'

const md = String.raw

/* =============================================================================
 * UNIT 2 — Fluid Dynamics & Dimensional Analysis (Bansal Ch. 6, 8, 12)
 * ========================================================================== */

export const topics: Topic[] = [
  /* ------------------------------------------------------------------ */
  {
    id: 'u2-system-rtt',
    unitId: 'u2',
    title: 'System, control volume and Reynolds transport theorem',
    summary: 'Closed system vs control volume, why fluid mechanics needs control volumes, and the Reynolds transport theorem that converts system laws into control-volume form.',
    syllabusPhrases: ['Concept of system and control volume', 'Reynolds’s transport theorem'],
    coverage: 'missing',
    coverageNote: 'Bansal applies a control volume in the momentum equation (§6.8, p. 288) but never defines system vs control volume or states the Reynolds transport theorem. This topic is supplementary.',
    refs: [{ chapter: 6, section: '§6.8', pages: '288–289' }],
    diagrams: ['system-cv'],
    sections: [
      {
        id: 'system-cv',
        title: 'System and control volume',
        supplementary: true,
        body: md`> [!SUPP] Not in Bansal
> Standard definitions, as in Cengel & Cimbala Ch. 4 and White Ch. 3.

> [!DEF] System
> A fixed, identified **quantity of mass**. Its boundary moves and deforms with it; no mass crosses the boundary. The basic laws (conservation of mass, Newton’s second law, first law of thermodynamics) are written for a system.

> [!DEF] Control volume (CV)
> A fixed (or chosen) **region in space** through which fluid flows. Mass, momentum and energy cross its boundary, the **control surface (CS)**.

![A system moving through a fixed control volume](diagram:system-cv)

Following a lump of water through a pump is awkward; drawing a box around the pump and accounting for what goes in and out is easy. That is why fluid mechanics works with control volumes, which matches the Eulerian description.`,
      },
      {
        id: 'rtt',
        title: 'Reynolds transport theorem (RTT)',
        supplementary: true,
        body: md`> [!SUPP] Not in Bansal
> The syllabus lists it; the book does not have it.

Let $B$ be any extensive property (mass, momentum, energy) and $b = B/m$ its intensive value per unit mass. At the instant the system coincides with the control volume:
$$\frac{dB_{\text{sys}}}{dt} = \frac{\partial}{\partial t}\int_{CV}\rho\, b\, dV + \int_{CS}\rho\, b\,(\vec V\cdot\hat n)\,dA$$

In words: the rate of change of B for the system = rate of change of B stored inside the CV + net rate at which B flows **out** through the control surface.

**Applications**
- $B = m$, $b = 1$: the system’s mass is constant, so $0 = \dfrac{\partial}{\partial t}\int_{CV}\rho\,dV + \int_{CS}\rho\,\vec V\cdot\hat n\,dA$: the **continuity equation**. Steady flow in a pipe gives $\rho_1A_1V_1 = \rho_2A_2V_2$.
- $B = m\vec V$, $b = \vec V$: Newton’s law becomes $\sum\vec F = \dfrac{\partial}{\partial t}\int_{CV}\rho\vec V\,dV + \int_{CS}\rho\vec V(\vec V\cdot\hat n)\,dA$: the **momentum equation**. Steady one-inlet, one-outlet flow gives $\sum F_x = \rho Q(V_{2x} - V_{1x})$, which is Bansal’s eq. (6.17) and the basis of impact-of-jet problems (Unit 6).
- $B = E$: the energy equation, from which Bernoulli follows for ideal flow.

> [!EXAM]
> Define system and CV in two lines each, write the RTT, label the two right-hand terms, then show it gives continuity with $b = 1$.`,
      },
    ],
    keyPoints: [
      'System: fixed mass, moving boundary. Control volume: fixed region, mass crosses its surface.',
      'RTT: dB_sys/dt = ∂/∂t ∫_CV ρb dV + ∫_CS ρb (V·n) dA.',
      'b = 1 gives continuity; b = V gives the momentum equation ΣF = ρQ(V₂ − V₁).',
    ],
    flashcards: [
      { id: 'fc-u2-r1', front: 'System vs control volume', back: 'System: fixed quantity of mass. Control volume: fixed region in space through which mass flows.' },
      { id: 'fc-u2-r2', front: 'State the Reynolds transport theorem', back: 'dB_sys/dt = ∂/∂t ∫_CV ρb dV + ∫_CS ρb (V·n) dA, with b = B/m.' },
      { id: 'fc-u2-r3', front: 'What does RTT give with b = V?', back: 'The linear momentum equation: ΣF = rate of change of momentum in the CV + net momentum outflow.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u2-euler-bernoulli',
    unitId: 'u2',
    title: 'Euler’s equation and Bernoulli’s equation',
    summary: 'Forces in a moving fluid, Euler’s equation along a stream line and in three dimensions, Bernoulli’s equation from it, its assumptions, and the real-fluid form with head loss.',
    syllabusPhrases: ['Euler’s equation', 'Bernoulli’s equation'],
    coverage: 'partial',
    coverageNote: 'Bansal §6.2–6.6 (pp. 259–268) derives Euler’s equation along a stream line only. The three-dimensional Euler equations asked in 2024 Q3(a) are supplementary.',
    highlighted: true,
    refs: [{ chapter: 6, section: '§6.2–6.6', pages: '259–268' }],
    diagrams: ['euler-element'],
    sections: [
      {
        id: 'forces',
        title: 'Equations of motion (§6.2)',
        body: md`Forces that can act on a fluid element: gravity $F_g$, pressure $F_p$, viscous $F_v$, turbulent $F_t$ and compressibility $F_c$. Newton’s second law $ma = \sum F$ gives different named equations depending on which are kept:

| Forces kept | Equation |
|---|---|
| $F_g + F_p + F_v + F_t$ | Reynolds equations of motion |
| $F_g + F_p + F_v$ | **Navier–Stokes** equations |
| $F_g + F_p$ | **Euler’s** equation of motion |`,
      },
      {
        id: 'euler-1d',
        title: 'Euler’s equation along a stream line (§6.3)',
        body: md`Take a cylindrical element of cross-section $dA$ and length $ds$ along a stream line, inclined at θ to the horizontal.

![Forces on a fluid element along a stream line](diagram:euler-element)

Forces along $s$: pressure $p\,dA - (p + \tfrac{\partial p}{\partial s}ds)dA$ and weight component $-\rho g\,dA\,ds\cos\theta$. Mass × acceleration: $\rho\,dA\,ds\,a_s$ with $a_s = v\dfrac{\partial v}{\partial s}$ (steady flow). Dividing by $\rho\,dA\,ds$, and using $\cos\theta = dz/ds$:
$$\frac{dp}{\rho} + g\,dz + v\,dv = 0$$
This is **Euler’s equation of motion**.`,
      },
      {
        id: 'bernoulli',
        title: 'Bernoulli’s equation and its assumptions (§6.4–6.5)',
        body: md`Integrating Euler’s equation for an incompressible fluid:
$$\frac{p}{\rho g} + \frac{v^2}{2g} + z = \text{constant}$$
**Pressure head + kinetic (velocity) head + datum (potential) head = constant** along a stream line. Each term is energy per unit weight, in metres.

**Assumptions** (asked very often):
1. Ideal fluid: viscosity zero
2. Steady flow
3. Incompressible flow
4. Irrotational flow (or: along a single stream line)
5. Only gravity and pressure forces act

**Real fluid (§6.6):** $\dfrac{p_1}{\rho g} + \dfrac{v_1^2}{2g} + z_1 = \dfrac{p_2}{\rho g} + \dfrac{v_2^2}{2g} + z_2 + h_L$, where $h_L$ is the head lost between 1 and 2.`,
      },
      {
        id: 'euler-3d',
        title: 'Three-dimensional Euler equations and their link to Bernoulli',
        supplementary: true,
        body: md`> [!SUPP] Beyond Bansal’s 1-D derivation
> 2024 Q3(a) asked: “Derive the three dimensional Euler equations. How are they related to Bernoulli equations?” The full derivation is in the Derivations tab.

Apply Newton’s law to a fluid element $dx\,dy\,dz$ with only pressure and body forces (body force per unit mass $X, Y, Z$; for gravity $X = Y = 0$, $Z = -g$). In the x-direction the net pressure force is $-\dfrac{\partial p}{\partial x}dx\,dy\,dz$, so
$$\frac{Du}{Dt} = \frac{\partial u}{\partial t} + u\frac{\partial u}{\partial x} + v\frac{\partial u}{\partial y} + w\frac{\partial u}{\partial z} = X - \frac{1}{\rho}\frac{\partial p}{\partial x}$$
$$\frac{Dv}{Dt} = Y - \frac{1}{\rho}\frac{\partial p}{\partial y}, \qquad \frac{Dw}{Dt} = Z - \frac{1}{\rho}\frac{\partial p}{\partial z}$$
In vector form: $\rho\dfrac{D\vec V}{Dt} = \rho\vec g - \nabla p$.

**Relation to Bernoulli.** Write the convective term as $(\vec V\cdot\nabla)\vec V = \nabla(V^2/2) - \vec V\times\vec\Omega$, where $\vec\Omega = \nabla\times\vec V$ is the vorticity. For steady flow with gravity ($\vec g = -\nabla(gz)$) and constant ρ:
$$\nabla\left(\frac{p}{\rho} + \frac{V^2}{2} + gz\right) = \vec V\times\vec\Omega$$
- **Along a stream line**, $\vec V\times\vec\Omega$ is perpendicular to $\vec V$, so the dot product with $d\vec s$ vanishes: Bernoulli’s constant holds along each stream line.
- If the flow is also **irrotational** ($\vec\Omega = 0$), the right side is zero everywhere: one Bernoulli constant holds throughout the flow.

So Bernoulli’s equation is the **integral of Euler’s equations** for steady, incompressible, inviscid flow.`,
      },
    ],
    derivations: [
      {
        id: 'd-u2-euler3d',
        title: 'Euler’s equations in three dimensions and Bernoulli from them',
        goal: md`Derive Euler’s equations of motion for an inviscid fluid and integrate them to Bernoulli’s equation.`,
        assumptions: ['Inviscid (ideal) fluid', 'Body force per unit mass (X, Y, Z)', 'For the Bernoulli step: steady, incompressible, gravity only'],
        steps: [
          { math: md`F_{p,x} = \left[p - \left(p + \frac{\partial p}{\partial x}dx\right)\right]dy\,dz = -\frac{\partial p}{\partial x}\,dx\,dy\,dz`, why: md`Net pressure force in x on an element $dx\,dy\,dz$.` },
          { math: md`\rho\,dx\,dy\,dz\,\frac{Du}{Dt} = \rho X\,dx\,dy\,dz - \frac{\partial p}{\partial x}dx\,dy\,dz`, why: md`Newton’s second law in x: mass × acceleration = body force + pressure force. No shear, since the fluid is inviscid.` },
          { math: md`\frac{\partial u}{\partial t} + u\frac{\partial u}{\partial x} + v\frac{\partial u}{\partial y} + w\frac{\partial u}{\partial z} = X - \frac{1}{\rho}\frac{\partial p}{\partial x}`, why: md`Divide by $\rho\,dx\,dy\,dz$ and expand the total derivative. The y and z equations follow in the same way.` },
          { math: md`\rho\frac{D\vec V}{Dt} = \rho\vec g - \nabla p`, why: md`Vector form of the three Euler equations.` },
          { math: md`\frac{1}{\rho}dp + g\,dz + d\!\left(\frac{V^2}{2}\right) = 0`, why: md`Steady flow, gravity only. Multiply the three equations by $dx, dy, dz$ along a stream line (where $dx/u = dy/v = dz/w$) and add.` },
          { math: md`\frac{p}{\rho g} + \frac{V^2}{2g} + z = \text{constant}`, why: md`Integrate with ρ constant: Bernoulli’s equation, valid along a stream line, and everywhere if the flow is irrotational.` },
        ],
        result: md`\frac{p}{\rho g} + \frac{V^2}{2g} + z = \text{const}`,
        ref: { chapter: 6, section: '§6.3–6.4', pages: '260–261' },
      },
    ],
    keyPoints: [
      'Euler’s equation (1-D): dp/ρ + g dz + v dv = 0; integrates to Bernoulli.',
      'Euler 3-D: Du/Dt = X − (1/ρ)∂p/∂x, etc.; vector form ρ DV/Dt = ρg − ∇p.',
      'Bernoulli: p/ρg + v²/2g + z = constant. Assumptions: ideal, steady, incompressible, irrotational or along a stream line.',
      'Real fluid: add the head loss h_L on the downstream side.',
    ],
    misconceptions: [
      'Applying one Bernoulli constant across stream lines in a rotational flow (e.g. a forced vortex). It holds across stream lines only if the flow is irrotational.',
    ],
    flashcards: [
      { id: 'fc-u2-e1', front: 'Euler’s equation along a stream line', back: 'dp/ρ + g dz + v dv = 0.' },
      { id: 'fc-u2-e2', front: 'Assumptions of Bernoulli’s equation', back: 'Ideal (inviscid), steady, incompressible, irrotational flow (or along one stream line); only gravity and pressure forces.' },
      { id: 'fc-u2-e3', front: 'Bernoulli’s equation: what each term means', back: 'p/ρg pressure head, v²/2g velocity head, z datum head: each is energy per unit weight.' },
      { id: 'fc-u2-e4', front: 'Euler vs Navier–Stokes', back: 'Euler: gravity + pressure. Navier–Stokes: also viscous forces.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u2-navier-stokes',
    unitId: 'u2',
    title: 'Navier–Stokes equations',
    summary: 'The momentum equations for a viscous Newtonian fluid: what each term means, the incompressible form, and how Euler and the exact laminar solutions of Unit 3 follow from it.',
    syllabusPhrases: ['Navier Stokes equation'],
    coverage: 'partial',
    coverageNote: 'Bansal only names the Navier–Stokes equations in §6.2 (p. 259). The equations and their interpretation are supplementary.',
    refs: [{ chapter: 6, section: '§6.2', pages: '259' }],
    sections: [
      {
        id: 'ns',
        title: 'The equations',
        supplementary: true,
        body: md`> [!SUPP] Not derived in Bansal
> Exams at this level ask you to state the equations, identify the terms and list the assumptions, not to derive the viscous stress terms in full.

For an **incompressible Newtonian** fluid with constant viscosity, adding the viscous stresses to Euler’s equation gives, in the x-direction:
$$\rho\left(\frac{\partial u}{\partial t} + u\frac{\partial u}{\partial x} + v\frac{\partial u}{\partial y} + w\frac{\partial u}{\partial z}\right) = \rho g_x - \frac{\partial p}{\partial x} + \mu\left(\frac{\partial^2 u}{\partial x^2} + \frac{\partial^2 u}{\partial y^2} + \frac{\partial^2 u}{\partial z^2}\right)$$
and similarly for y and z. Vector form:
$$\rho\frac{D\vec V}{Dt} = \rho\vec g - \nabla p + \mu\nabla^2\vec V$$

| Term | Meaning |
|---|---|
| $\rho\,D\vec V/Dt$ | inertia (local + convective acceleration) |
| $\rho\vec g$ | body force |
| $-\nabla p$ | pressure force |
| $\mu\nabla^2\vec V$ | net viscous force on the element |

Together with continuity ($\nabla\cdot\vec V = 0$) these are four equations for four unknowns $u, v, w, p$.`,
      },
      {
        id: 'uses',
        title: 'Special cases and exact solutions',
        supplementary: true,
        body: md`> [!SUPP] Links to Units 3 and 5
> Shown here so you can connect the syllabus items.

- Set $\mu = 0$: Navier–Stokes reduces to **Euler’s equation**.
- **Steady, fully developed flow between parallel plates** ($v = w = 0$, $u = u(y)$): every convective term vanishes and the x-equation becomes $\dfrac{dp}{dx} = \mu\dfrac{d^2u}{dy^2}$. Integrating twice gives the parabolic profile of Unit 3.
- **Pipe flow (Hagen–Poiseuille):** the same reduction in cylindrical coordinates gives $\dfrac{dp}{dx} = \dfrac{\mu}{r}\dfrac{d}{dr}\left(r\dfrac{du}{dr}\right)$.
- **Boundary layer equations** (Unit 5) are Navier–Stokes simplified for a thin layer near a wall (Prandtl, 1904).
- **Turbulent flow:** time-averaging Navier–Stokes gives the **Reynolds equations** with extra Reynolds stresses $-\rho\overline{u'v'}$ (Unit 4).

The full equations are non-linear (because of the convective term) and have exact solutions only for simple geometries; others are solved numerically (CFD).`,
      },
    ],
    keyPoints: [
      'Navier–Stokes = Newton’s law for a viscous fluid: ρ DV/Dt = ρg − ∇p + μ∇²V (incompressible).',
      'With μ = 0 it reduces to Euler’s equation.',
      'Exact solutions: Couette and Poiseuille flows (Unit 3).',
      'Time-averaged for turbulence → Reynolds equations with Reynolds stresses.',
    ],
    flashcards: [
      { id: 'fc-u2-n1', front: 'Navier–Stokes, vector form (incompressible)', back: 'ρ DV/Dt = ρg − ∇p + μ∇²V.' },
      { id: 'fc-u2-n2', front: 'What makes the Navier–Stokes equations hard to solve?', back: 'The convective acceleration term (V·∇)V is non-linear.' },
      { id: 'fc-u2-n3', front: 'Navier–Stokes for fully developed flow between plates', back: 'dp/dx = μ d²u/dy².' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u2-flow-measurement',
    unitId: 'u2',
    title: 'Flow measurement: venturimeter, orifice meter, Pitot tube, notches',
    summary: 'Bernoulli applied to flow meters: venturimeter and orifice meter discharge equations, the Pitot and Pitot-static tube, other flow meters, and discharge over rectangular and triangular notches.',
    syllabusPhrases: ['Flow measurement-Venturimeter, Orifice meter, Pitot-tube', 'flow meters', 'notches'],
    coverage: 'partial',
    coverageNote: 'Venturimeter, orifice meter and Pitot tube are §6.7 (pp. 268–288); notches are Ch. 8 (pp. 355–386). Rotameters and other “flow meters” are not in the book and are supplementary.',
    refs: [
      { chapter: 6, section: '§6.7', pages: '268–288' },
      { chapter: 8, section: '§8.1–8.5', pages: '355–361' },
    ],
    diagrams: ['venturimeter', 'pitot-tube', 'notches'],
    sections: [
      {
        id: 'venturi',
        title: 'Venturimeter (§6.7.1)',
        body: md`A short converging cone (about 20°), a throat, then a long diverging cone (5–7°) that recovers pressure. A differential manometer reads the pressure difference between inlet (1) and throat (2).

![Venturimeter](diagram:venturimeter)

Bernoulli between 1 and 2 (horizontal) plus continuity $a_1v_1 = a_2v_2$:
$$h = \frac{p_1 - p_2}{\rho g} = \frac{v_2^2 - v_1^2}{2g} \quad\Rightarrow\quad v_2 = \frac{a_1}{\sqrt{a_1^2 - a_2^2}}\sqrt{2gh}$$
$$Q_{\text{act}} = C_d\,\frac{a_1 a_2}{\sqrt{a_1^2 - a_2^2}}\sqrt{2gh}$$
$C_d$ is 0.95–0.99.

**Manometer reading to head:** with a mercury manometer reading $x$ and pipe liquid of specific gravity $S_o$:
$$h = x\left(\frac{S_g}{S_o} - 1\right)$$
(for a lighter gauge liquid, $h = x(1 - S_l/S_o)$). For an **inclined** venturimeter, $h$ becomes the piezometric head difference $\left(\frac{p_1}{\rho g} + z_1\right) - \left(\frac{p_2}{\rho g} + z_2\right)$, and the manometer formula still gives it directly.`,
      },
      {
        id: 'orifice',
        title: 'Orifice meter (§6.7.2)',
        body: md`A thin plate with a sharp-edged circular hole, clamped between pipe flanges. It is cheaper and shorter than a venturimeter, but the jet contracts to a **vena contracta** downstream and much of the head is lost in eddies.
$$Q = C_d\,\frac{a_0 a_1}{\sqrt{a_1^2 - a_0^2}}\sqrt{2gh}$$
with $a_0$ = orifice area. $C_d \approx 0.6$–0.65.

| | Venturimeter | Orifice meter |
|---|---|---|
| Cost and length | high, long | low, compact |
| $C_d$ | 0.95–0.99 | 0.6–0.65 |
| Permanent head loss | small | large |`,
      },
      {
        id: 'pitot',
        title: 'Pitot tube and Pitot-static tube (§6.7.3)',
        body: md`A **Pitot tube** is a bent glass tube with its open end facing the flow. The fluid entering it is brought to rest (a **stagnation point**), and its kinetic head converts to a rise in pressure head:
$$\frac{p_1}{\rho g} + \frac{v_1^2}{2g} = \frac{p_1}{\rho g} + h \quad\Rightarrow\quad v = C_v\sqrt{2gh}$$
$h$ = (stagnation head − static head), measured as the rise of liquid in the tube above the free surface.

![Pitot-static tube](diagram:pitot-tube)

In a pipe the static pressure is measured separately (wall tap or piezometer), or with a **Pitot-static tube**: two concentric tubes, the inner facing the flow (stagnation) and the outer with side holes (static), connected across a differential manometer.

A Pitot tube measures **velocity at a point**, not discharge. To get discharge, measure the centre-line velocity and multiply by a mean-to-centre ratio, or traverse the section.`,
      },
      {
        id: 'other-meters',
        title: 'Other flow meters',
        supplementary: true,
        body: md`> [!SUPP] Not in Bansal
> The syllabus says “flow meters”; the book covers only the three above. A one-line description of each is enough.

- **Rotameter (variable-area meter):** a float rises in a vertical tapered tube until drag plus buoyancy balance its weight; its height on the scale gives the flow rate.
- **Flow nozzle:** a smooth nozzle in the pipe; $C_d$ (0.95–0.99) is close to a venturimeter’s, at lower cost and length.
- **Turbine meter:** a free-spinning rotor whose speed is proportional to the flow rate.
- **Electromagnetic meter:** a conducting liquid moving through a magnetic field induces a voltage proportional to the velocity (Faraday). It has no obstruction and no head loss.
- **Ultrasonic meter:** the transit-time difference of sound pulses sent with and against the flow gives the velocity.`,
      },
      {
        id: 'notches',
        title: 'Notches and weirs (Ch. 8)',
        body: md`> [!DEF] Notch / weir
> A **notch** is an opening in the side of a tank or small channel with the liquid surface below its top edge. A **weir** is a concrete or masonry structure across a river or canal with the same flow pattern. Both measure discharge in open channels.

Integrating the flow through a horizontal strip of height $dh$ at depth $h$ (velocity $\sqrt{2gh}$):

**Rectangular notch** (length $L$, head $H$):
$$Q = \frac{2}{3}C_d L\sqrt{2g}\,H^{3/2}$$
**Triangular (V) notch** (apex angle θ):
$$Q = \frac{8}{15}C_d\tan\frac{\theta}{2}\sqrt{2g}\,H^{5/2}$$
For a right-angled notch with $C_d = 0.6$: $Q = 1.417H^{5/2}$.

![Rectangular and triangular notches](diagram:notches)

**Advantages of the V-notch (§8.5):** one formula for any discharge; more accurate at low flows (H changes faster); no end contractions to correct for; ventilation not needed; the same $C_d$ for a range of heads.`,
      },
    ],
    keyPoints: [
      'Venturi / orifice meter: Q = C_d a₁a₂√(2gh)/√(a₁² − a₂²). C_d: venturi 0.95–0.99, orifice about 0.6.',
      'Manometer reading x of mercury on water: h = x(S_g/S_o − 1) = 12.6x.',
      'Pitot tube: v = C_v √(2gh), with h = stagnation head − static head. It measures point velocity.',
      'Rectangular notch: Q = (2/3)C_d L√(2g) H^{3/2}. V-notch: Q = (8/15)C_d tan(θ/2)√(2g) H^{5/2}.',
    ],
    misconceptions: [
      'Using the mercury reading x directly as h. Convert with h = x(S_g/S_o − 1).',
      'Thinking a Pitot tube gives discharge directly. It gives velocity at one point.',
    ],
    flashcards: [
      { id: 'fc-u2-m1', front: 'Venturimeter discharge', back: 'Q = C_d a₁a₂√(2gh)/√(a₁² − a₂²).' },
      { id: 'fc-u2-m2', front: 'Why is the divergent cone of a venturimeter longer than the convergent cone?', back: 'A gradual divergence (5–7°) avoids flow separation and recovers pressure; a fast expansion would separate and lose head.' },
      { id: 'fc-u2-m3', front: 'Pitot tube principle', back: 'Flow is brought to rest at the tube mouth; the kinetic head appears as extra pressure head h, so v = √(2gh).' },
      { id: 'fc-u2-m4', front: 'V-notch discharge', back: 'Q = (8/15)C_d tan(θ/2) √(2g) H^{5/2}.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u2-dimensional',
    unitId: 'u2',
    title: 'Dimensional analysis, non-dimensional parameters and similarity',
    summary: 'Dimensional homogeneity, Rayleigh’s method and its limitation, Buckingham’s π theorem with repeating variables, the standard dimensionless numbers, similitude and the model laws.',
    syllabusPhrases: ['Buckingham’s –pi Theorem', 'Non-dimensional parameters', 'similarity and its application to fluid problems'],
    coverage: 'full',
    highlighted: true,
    refs: [{ chapter: 12, section: '§12.1–12.11', pages: '559–606' }],
    sections: [
      {
        id: 'homogeneity',
        title: 'Dimensions and dimensional homogeneity (§12.1–12.3)',
        body: md`Fundamental quantities: mass $M$, length $L$, time $T$. Every other quantity is derived, e.g. force $MLT^{-2}$, pressure $ML^{-1}T^{-2}$, viscosity $\mu$: $ML^{-1}T^{-1}$, kinematic viscosity $L^2T^{-1}$, power $ML^2T^{-3}$.

> [!DEF] Dimensional homogeneity
> Every term of a physically correct equation has the same dimensions. Hence the equation holds in any consistent system of units, and any such equation can be rewritten in terms of dimensionless groups.`,
      },
      {
        id: 'rayleigh',
        title: 'Rayleigh’s method and its limitation (§12.4.1)',
        body: md`Write the dependent variable as a product of powers of the independent ones, $X = K\,X_1^a X_2^b X_3^c$, substitute dimensions, and equate the powers of $M$, $L$ and $T$ to find $a, b, c$.

**Example (Problem 12.3):** drag on a sphere $F = f(D, V, \rho, \mu)$ gives
$$F = \rho D^2V^2\,\phi\!\left(\frac{\mu}{\rho VD}\right)$$

> [!EXAM] Asked in 2024 Q3(b): limitations of Rayleigh’s method
> 1. Only **three equations** (M, L, T) are available. With more than **four** variables the exponents cannot all be found; some are left in terms of others and must be grouped by inspection.
> 2. It gives no rule for **how** to group the leftover variables into dimensionless terms.
> 3. Like all dimensional analysis, it cannot find the constant $K$ or the form of the function, and it cannot say which variables are relevant: they must be known in advance.

(The paper prints “Rayleigh number”; from context it means Rayleigh’s **method**. The Rayleigh number $Ra$ is a heat-transfer group.)`,
      },
      {
        id: 'buckingham',
        title: 'Buckingham’s π theorem (§12.4.2–12.4.4)',
        body: md`> [!DEF] Buckingham’s π theorem
> If there are $n$ variables (dependent and independent) in a physical phenomenon, and they involve $m$ fundamental dimensions, the variables can be arranged into **$(n - m)$ dimensionless groups**, the π terms.
> $$f(X_1, X_2, \dots, X_n) = 0 \;\Rightarrow\; \phi(\pi_1, \pi_2, \dots, \pi_{n-m}) = 0$$

**Procedure**
1. List all $n$ variables and write their dimensions; count $m$ (usually 3).
2. Choose $m$ **repeating variables**. Together they must contain all of M, L and T, must not form a dimensionless group among themselves, and must not include the dependent variable. Choose one geometric (D or L), one flow (V), one fluid property (ρ).
3. Form each π term as (repeating variables raised to unknown powers) × one non-repeating variable, then solve for the powers.
4. Rearrange the π terms into familiar groups (Re, Fr, …) if useful.

> [!EXAM] Asked in 2024 Q3(b): advantages of Buckingham’s π theorem
> - Systematic for **any** number of variables; Rayleigh’s method breaks down beyond about four.
> - Tells in advance **how many** dimensionless groups to expect ($n - m$).
> - Each π term comes out directly as a known dimensionless group (Re, Fr, Eu…).
> - Reduces the number of variables to vary in experiments, and gives the scaling laws for model testing.

**Example (Problem 12.10):** $\Delta p = f(D, l, V, \mu, \rho, k)$, $n = 7$, $m = 3$ ⇒ 4 π terms. With repeating variables D, V, ρ:
$$\frac{\Delta p}{\rho V^2} = \phi\!\left(\frac{l}{D}, \frac{\mu}{\rho VD}, \frac{k}{D}\right)$$
and since Δp ∝ l, this is the root of the Darcy–Weisbach equation (Unit 4).`,
      },
      {
        id: 'numbers',
        title: 'Dimensionless numbers (§12.7–12.8)',
        body: md`Each is the square root of, or simply, a ratio of the inertia force to another force:

| Number | Definition | Ratio | Governs |
|---|---|---|---|
| Reynolds $Re$ | $\dfrac{\rho VL}{\mu}$ | inertia / viscous | pipe flow, submerged bodies, aircraft at low speed |
| Froude $Fr$ | $\dfrac{V}{\sqrt{gL}}$ | √(inertia / gravity) | free-surface flow: ships, spillways, open channels |
| Euler $Eu$ | $\dfrac{V}{\sqrt{p/\rho}}$ | √(inertia / pressure) | pressure-dominated flow, cavitation |
| Weber $We$ | $\dfrac{V}{\sqrt{\sigma/\rho L}}$ | √(inertia / surface tension) | droplets, capillary waves, thin films |
| Mach $M$ | $\dfrac{V}{C}$ | √(inertia / elastic) | compressible flow, high-speed aircraft |`,
      },
      {
        id: 'similarity',
        title: 'Similitude and model laws (§12.5–12.9)',
        body: md`> [!DEF] Similitude
> Complete similarity between a model and its prototype. It needs three kinds of similarity:
> - **Geometric:** all length ratios equal, $L_r = L_m/L_p$.
> - **Kinematic:** velocity and acceleration ratios equal at corresponding points (similar stream-line patterns).
> - **Dynamic:** ratios of corresponding forces equal, i.e. the governing dimensionless number is the same.

**Model laws** (match the dominant force):
- **Reynolds model law** ($Re_m = Re_p$): pipe flow, submarines, aircraft at low speed. $V_r = \nu_r/L_r$.
- **Froude model law** ($Fr_m = Fr_p$): ships, spillways, weirs, open channels. $V_r = \sqrt{L_r}$, $Q_r = L_r^{2.5}$, $F_r = L_r^3$ (same fluid), $T_r = \sqrt{L_r}$.
- **Euler, Weber, Mach** laws where pressure, surface tension or compressibility dominate.

Usually only one number can be matched. For ships, Froude is matched and the frictional (Reynolds) part of the drag is corrected separately (§12.10).

**Applications to fluid problems:** design of dams and spillways, ship hulls, turbines and pumps (the unit and specific quantities of Unit 6 are π terms), aircraft and car shapes in wind tunnels, harbours and river works.`,
      },
    ],
    keyPoints: [
      'Buckingham: n variables, m dimensions ⇒ (n − m) π terms. Repeating variables: geometric, flow, fluid property (D, V, ρ).',
      'Rayleigh’s method fails for more than about four variables (only 3 equations) and gives no grouping rule.',
      'Re = ρVL/μ (viscous), Fr = V/√(gL) (gravity), Eu, We, M.',
      'Similitude = geometric + kinematic + dynamic similarity.',
      'Froude model: V_r = √L_r, Q_r = L_r^{5/2}. Reynolds model: V_r = ν_r / L_r.',
    ],
    misconceptions: ['Choosing the dependent variable as a repeating variable.', 'Picking repeating variables that together lack one of M, L, T.'],
    flashcards: [
      { id: 'fc-u2-d1', front: 'State Buckingham’s π theorem', back: 'n variables with m fundamental dimensions can be grouped into (n − m) independent dimensionless π terms.' },
      { id: 'fc-u2-d2', front: 'Rules for repeating variables', back: 'Not the dependent variable; together contain M, L, T; cannot form a dimensionless group by themselves. Usually one geometric, one flow, one fluid property.' },
      { id: 'fc-u2-d3', front: 'Limitation of Rayleigh’s method', back: 'Only 3 equations for the exponents, so it fails or needs guesswork when there are more than about 4 variables.' },
      { id: 'fc-u2-d4', front: 'Froude model law: velocity and discharge scale ratios', back: 'V_r = √L_r; Q_r = L_r^{2.5}.' },
      { id: 'fc-u2-d5', front: 'Three kinds of similarity', back: 'Geometric, kinematic and dynamic.' },
    ],
  },
]

/* =============================================================================
 * Worked examples
 * ========================================================================== */

export const examples: WorkedExample[] = [
  {
    id: 'ex-6-10',
    topicId: 'u2-flow-measurement',
    title: 'Horizontal venturimeter with a mercury manometer',
    source: { kind: 'textbook', ref: 'Problem 6.10', page: 270 },
    difficulty: 1,
    statement: md`A horizontal venturimeter with inlet and throat diameters 30 cm and 15 cm respectively is used to measure the flow of water. The reading of differential manometer connected to the inlet and the throat is 20 cm of mercury. Determine the rate of flow. Take $C_d$ = 0.98.`,
    given: ['d₁ = 0.30 m, d₂ = 0.15 m', 'x = 0.20 m of mercury', 'C_d = 0.98'],
    find: ['Q'],
    approach: md`Convert the manometer reading to head of water, then apply the venturimeter equation.`,
    steps: [
      { label: 'Areas', work: md`$a_1 = \dfrac{\pi}{4}(0.3)^2 = 0.07069$ m²; $a_2 = \dfrac{\pi}{4}(0.15)^2 = 0.01767$ m²` },
      { label: 'Head', work: md`$h = x\left(\dfrac{13.6}{1} - 1\right) = 0.2 \times 12.6 = 2.52$ m of water` },
      { label: 'Discharge', work: md`$Q = 0.98 \times \dfrac{0.07069 \times 0.01767}{\sqrt{0.07069^2 - 0.01767^2}}\sqrt{2 \times 9.81 \times 2.52} = 0.1258$ m³/s` },
    ],
    answer: md`$Q \approx 0.126$ m³/s $= 125.8$ litres/s`,
    concept: 'Venturimeter: Bernoulli + continuity + manometer conversion.',
  },
  {
    id: 'ex-6-22',
    topicId: 'u2-flow-measurement',
    title: 'Orifice meter discharge from pressure gauges',
    source: { kind: 'textbook', ref: 'Problem 6.22', page: 283 },
    difficulty: 1,
    statement: md`An orifice meter with orifice diameter 10 cm is inserted in a pipe of 20 cm diameter. The pressure gauges fitted upstream and downstream of the orifice meter give readings of 19.62 N/cm² and 9.81 N/cm² respectively. Co-efficient of discharge for the orifice meter is given as 0.6. Find the discharge of water through pipe.`,
    given: ['d₀ = 0.10 m, d₁ = 0.20 m', 'p₁ = 19.62 N/cm², p₂ = 9.81 N/cm²', 'C_d = 0.6'],
    find: ['Q'],
    approach: md`Head from the gauge difference, then the orifice-meter equation.`,
    steps: [
      { label: 'Head', work: md`$h = \dfrac{(19.62 - 9.81) \times 10^4}{1000 \times 9.81} = 10$ m of water` },
      { label: 'Areas', work: md`$a_0 = 0.007854$ m², $a_1 = 0.031416$ m²` },
      { label: 'Discharge', work: md`$Q = 0.6 \times \dfrac{0.007854 \times 0.031416}{\sqrt{0.031416^2 - 0.007854^2}}\sqrt{2 \times 9.81 \times 10} = 0.06817$ m³/s` },
    ],
    answer: md`$Q \approx 68.2$ litres/s`,
    concept: 'Orifice meter: same form as the venturimeter but with a much lower C_d.',
    checkNote: md`The book works in cm with $g = 981$ cm/s² and gets 68.21 litres/s. The 0.04 litre/s difference is rounding.`,
  },
  {
    id: 'ex-6-24',
    topicId: 'u2-flow-measurement',
    title: 'Pitot-static tube in a pipe',
    source: { kind: 'textbook', ref: 'Problem 6.24', page: 286 },
    difficulty: 1,
    statement: md`A pitot-static tube placed in the centre of a 300 mm pipe line has one orifice pointing upstream and other perpendicular to it. The mean velocity in the pipe is 0.80 of the central velocity. Find the discharge through the pipe if the pressure difference between the two orifices is 60 mm of water. Take the co-efficient of pitot tube as $C_v$ = 0.98.`,
    given: ['d = 0.30 m', 'h = 0.06 m of water', 'V̄ = 0.8 v_centre, C_v = 0.98'],
    find: ['Q'],
    approach: md`Pitot formula for the centre-line velocity, then the mean velocity and $Q = A\bar V$.`,
    steps: [
      { label: 'Centre-line velocity', work: md`$v = 0.98\sqrt{2 \times 9.81 \times 0.06} = 1.063$ m/s` },
      { label: 'Mean velocity', work: md`$\bar V = 0.8 \times 1.063 = 0.851$ m/s` },
      { label: 'Discharge', work: md`$Q = \dfrac{\pi}{4}(0.3)^2 \times 0.851 = 0.0601$ m³/s` },
    ],
    answer: md`$Q \approx 0.060$ m³/s (60 litres/s)`,
    concept: 'A Pitot tube gives point velocity; discharge needs the mean-to-centre ratio.',
  },
  {
    id: 'ex-8-4',
    topicId: 'u2-flow-measurement',
    title: 'Discharge over a 60° V-notch',
    source: { kind: 'textbook', ref: 'Problem 8.4', page: 359 },
    difficulty: 1,
    statement: md`Find the discharge over a triangular notch of angle 60° when the head over the V-notch is 0.3 m. Assume $C_d$ = 0.6.`,
    given: ['θ = 60°', 'H = 0.3 m', 'C_d = 0.6'],
    find: ['Q'],
    approach: md`Triangular-notch formula.`,
    steps: [
      { label: 'Formula', work: md`$Q = \dfrac{8}{15}C_d\tan\dfrac{\theta}{2}\sqrt{2g}\,H^{5/2}$` },
      { label: 'Evaluate', work: md`$Q = \dfrac{8}{15}(0.6)(0.5774)(4.429)(0.3)^{2.5} = 0.0403$ m³/s` },
    ],
    answer: md`$Q \approx 0.0403$ m³/s (40.3 litres/s)`,
    concept: 'V-notch discharge varies as H^{5/2}, which makes it sensitive at low flows.',
  },
  {
    id: 'ex-12-3',
    topicId: 'u2-dimensional',
    title: 'Drag on a sphere by Rayleigh’s method',
    source: { kind: 'textbook', ref: 'Problem 12.3', page: 562 },
    difficulty: 2,
    statement: md`Find an expression for the drag force on smooth sphere of diameter D, moving with a uniform velocity V in a fluid of density ρ and dynamic viscosity μ.`,
    given: ['F = f(D, V, ρ, μ)'],
    find: ['F in dimensionless form'],
    approach: md`$F = K D^a V^b \rho^c \mu^d$. Four unknown exponents and three equations, so one (d) stays free: this is the limitation of Rayleigh’s method in action.`,
    steps: [
      { label: 'Dimensions', work: md`$MLT^{-2} = L^a (LT^{-1})^b (ML^{-3})^c (ML^{-1}T^{-1})^d$` },
      { label: 'Equate powers', work: md`M: $1 = c + d$; L: $1 = a + b - 3c - d$; T: $-2 = -b - d$` },
      { label: 'Solve in terms of d', work: md`$c = 1 - d$, $b = 2 - d$, $a = 1 - b + 3c + d = 2 - d$` },
      { label: 'Group', work: md`$F = K D^{2-d}V^{2-d}\rho^{1-d}\mu^d = K\rho D^2V^2\left(\dfrac{\mu}{\rho VD}\right)^d$` },
    ],
    answer: md`$F = \rho D^2 V^2\,\phi\!\left(\dfrac{\mu}{\rho V D}\right) = \rho D^2V^2\,\phi(Re)$`,
    concept: 'Rayleigh’s method; the drag coefficient is a function of Reynolds number only.',
  },
  {
    id: 'ex-12-10',
    topicId: 'u2-dimensional',
    title: 'Pressure drop in turbulent pipe flow by Buckingham’s π theorem',
    source: { kind: 'textbook', ref: 'Problem 12.10', page: 571 },
    difficulty: 3,
    statement: md`The pressure difference Δp in a pipe of diameter D and length l due to turbulent flow depends on the velocity V, viscosity μ, density ρ and roughness k. Using Buckingham’s π-theorem, obtain an expression for Δp.`,
    given: ['Δp = f(D, l, V, μ, ρ, k)', 'n = 7, m = 3'],
    find: ['Δp in π form'],
    approach: md`4 π terms; repeating variables D, V, ρ.`,
    steps: [
      { label: 'π₁ with Δp', work: md`$\pi_1 = D^{a}V^{b}\rho^{c}\,\Delta p$: M $0 = c + 1$, T $0 = -b - 2$, L $0 = a + b - 3c - 1$ ⇒ $c = -1$, $b = -2$, $a = 0$ ⇒ $\pi_1 = \dfrac{\Delta p}{\rho V^2}$` },
      { label: 'π₂ with l', work: md`$\pi_2 = \dfrac{l}{D}$ (a length over a length)` },
      { label: 'π₃ with μ', work: md`$\pi_3 = D^{a}V^{b}\rho^{c}\mu$ ⇒ $c = -1$, $b = -1$, $a = -1$ ⇒ $\pi_3 = \dfrac{\mu}{\rho VD}$` },
      { label: 'π₄ with k', work: md`$\pi_4 = \dfrac{k}{D}$` },
      { label: 'Combine', work: md`$\dfrac{\Delta p}{\rho V^2} = \phi\!\left(\dfrac{l}{D}, \dfrac{\mu}{\rho VD}, \dfrac{k}{D}\right)$. Since Δp ∝ l: $\dfrac{\Delta p}{\rho g} = \dfrac{l}{D}\dfrac{V^2}{g}\,\phi_1\!\left(Re, \dfrac{k}{D}\right)$` },
    ],
    answer: md`$h_f = \dfrac{\Delta p}{\rho g} = f\,\dfrac{l}{D}\dfrac{V^2}{2g}$ with $f = \phi(Re, k/D)$: the Darcy–Weisbach form`,
    concept: 'Buckingham’s π theorem leads directly to the friction-factor dependence on Re and relative roughness (Moody chart, Unit 4).',
  },
  {
    id: 'ex-u2-froude',
    topicId: 'u2-dimensional',
    title: 'Spillway model by Froude’s law',
    source: { kind: 'generated' },
    difficulty: 2,
    statement: md`A 1 : 25 model of a spillway carries 0.2 m³/s with a velocity of 1.2 m/s at the crest. Find the corresponding discharge and velocity in the prototype.`,
    given: ['L_r = L_m/L_p = 1/25', 'Q_m = 0.2 m³/s, V_m = 1.2 m/s'],
    find: ['Q_p, V_p'],
    approach: md`Free-surface flow dominated by gravity ⇒ Froude model law: $V_p/V_m = \sqrt{L_p/L_m}$, $Q_p/Q_m = (L_p/L_m)^{2.5}$.`,
    steps: [
      { label: 'Velocity', work: md`$V_p = 1.2\sqrt{25} = 6.0$ m/s` },
      { label: 'Discharge', work: md`$Q_p = 0.2 \times 25^{2.5} = 0.2 \times 3125 = 625$ m³/s` },
    ],
    answer: md`$V_p = 6$ m/s, $Q_p = 625$ m³/s`,
    concept: 'Froude similarity for spillways.',
  },
]

/* =============================================================================
 * Questions
 * ========================================================================== */

export const questions: Question[] = [
  {
    id: 'q-u2-1',
    topicId: 'u2-system-rtt',
    type: 'short',
    difficulty: 1,
    prompt: md`Distinguish between a system and a control volume. State the Reynolds transport theorem.`,
    source: { kind: 'generated' },
    solution: md`**System:** fixed quantity of mass with a moving, deforming boundary; no mass crosses it. **Control volume:** fixed region in space; mass, momentum and energy cross its control surface.

RTT: $\dfrac{dB_{sys}}{dt} = \dfrac{\partial}{\partial t}\displaystyle\int_{CV}\rho b\,dV + \int_{CS}\rho b(\vec V\cdot\hat n)\,dA$. The first term is the rate of change of B stored in the CV; the second is the net outflow of B through the CS.`,
  },
  {
    id: 'q-u2-2',
    topicId: 'u2-euler-bernoulli',
    type: 'derivation',
    difficulty: 3,
    prompt: md`Derive the three-dimensional Euler equations of motion. How are they related to Bernoulli’s equation?`,
    source: { kind: 'generated' },
    hints: ['Net pressure force in x: −(∂p/∂x) dx dy dz', 'Steady + incompressible + gravity, integrate along a stream line'],
    solution: md`For an inviscid fluid element $dx\,dy\,dz$, Newton’s law in x gives $\rho\dfrac{Du}{Dt} = \rho X - \dfrac{\partial p}{\partial x}$, i.e.
$$\frac{\partial u}{\partial t} + u\frac{\partial u}{\partial x} + v\frac{\partial u}{\partial y} + w\frac{\partial u}{\partial z} = X - \frac{1}{\rho}\frac{\partial p}{\partial x}$$
and similarly in y and z. For steady flow with gravity ($Z = -g$), multiply by $dx, dy, dz$ along a stream line and add: $\dfrac{dp}{\rho} + g\,dz + V\,dV = 0$. Integrating with ρ constant gives Bernoulli: $\dfrac{p}{\rho g} + \dfrac{V^2}{2g} + z = $ const along a stream line, and everywhere if the flow is irrotational. Bernoulli is thus the first integral of Euler’s equations.`,
  },
  {
    id: 'q-u2-3',
    topicId: 'u2-euler-bernoulli',
    type: 'mcq',
    difficulty: 1,
    prompt: md`Which of the following is **not** an assumption of Bernoulli’s equation?`,
    options: ['Steady flow', 'Incompressible fluid', 'Laminar flow', 'Ideal (non-viscous) fluid'],
    answer: 2,
    source: { kind: 'textbook', ref: '§6.5', page: 261 },
    solution: md`Bernoulli assumes ideal, steady, incompressible, irrotational flow. “Laminar” is a viscous-flow concept and is not one of its assumptions.`,
  },
  {
    id: 'q-u2-4',
    topicId: 'u2-euler-bernoulli',
    type: 'numerical',
    difficulty: 2,
    prompt: md`Water flows through a pipe of diameter 20 cm at section 1 and 10 cm at section 2. The velocity at section 1 is 4 m/s. Find the velocity head at sections 1 and 2 and the rate of discharge.`,
    source: { kind: 'textbook', ref: 'Problem 6.2', page: 261 },
    solution: md`$v_1^2/2g = 16/19.62 = 0.815$ m. Continuity: $v_2 = v_1(d_1/d_2)^2 = 16$ m/s ⇒ $v_2^2/2g = 13.05$ m. $Q = \dfrac{\pi}{4}(0.2)^2 \times 4 = 0.1257$ m³/s.`,
  },
  {
    id: 'q-u2-5',
    topicId: 'u2-navier-stokes',
    type: 'short',
    difficulty: 2,
    prompt: md`Write the Navier–Stokes equations for an incompressible Newtonian fluid and state the physical meaning of each term.`,
    source: { kind: 'generated' },
    solution: md`$\rho\dfrac{D\vec V}{Dt} = \rho\vec g - \nabla p + \mu\nabla^2\vec V$; x-component: $\rho(u_t + uu_x + vu_y + wu_z) = \rho g_x - p_x + \mu(u_{xx} + u_{yy} + u_{zz})$. Left: inertia (local + convective acceleration). Right: body force, pressure force, net viscous force. With μ = 0 they reduce to Euler’s equations.`,
  },
  {
    id: 'q-u2-6',
    topicId: 'u2-flow-measurement',
    type: 'mcq',
    difficulty: 1,
    prompt: md`The coefficient of discharge of a venturimeter is usually`,
    options: ['0.60–0.65', '0.70–0.80', '0.95–0.99', 'more than 1'],
    answer: 2,
    source: { kind: 'textbook', ref: '§6.7.1', page: 269 },
    solution: md`The gradual contraction and long diffuser keep losses low, so $C_d$ is 0.95–0.99. An orifice meter’s is about 0.6.`,
  },
  {
    id: 'q-u2-7',
    topicId: 'u2-flow-measurement',
    type: 'derivation',
    difficulty: 2,
    prompt: md`Derive an expression for the discharge through a venturimeter.`,
    source: { kind: 'textbook', ref: '§6.7.1', page: 268 },
    solution: md`Bernoulli between inlet and throat (horizontal): $\dfrac{p_1}{\rho g} + \dfrac{v_1^2}{2g} = \dfrac{p_2}{\rho g} + \dfrac{v_2^2}{2g}$ ⇒ $h = \dfrac{v_2^2 - v_1^2}{2g}$. Continuity: $v_1 = v_2a_2/a_1$. So $v_2 = \dfrac{a_1}{\sqrt{a_1^2 - a_2^2}}\sqrt{2gh}$ and $Q_{th} = a_2v_2 = \dfrac{a_1a_2}{\sqrt{a_1^2 - a_2^2}}\sqrt{2gh}$. Actual: $Q = C_dQ_{th}$, with $h = x(S_g/S_o - 1)$ from a differential manometer.`,
  },
  {
    id: 'q-u2-8',
    topicId: 'u2-flow-measurement',
    type: 'numerical',
    difficulty: 2,
    prompt: md`Find the discharge over a rectangular notch 2 m long when the head over the notch is 300 mm. Take $C_d$ = 0.60.`,
    source: { kind: 'textbook', ref: 'Problem 8.1', page: 356 },
    solution: md`$Q = \tfrac23 C_d L\sqrt{2g}H^{1.5} = \tfrac23(0.6)(2)(4.429)(0.3)^{1.5} = 0.582$ m³/s.`,
  },
  {
    id: 'q-u2-9',
    topicId: 'u2-dimensional',
    type: 'long',
    difficulty: 2,
    prompt: md`What are the advantages of Buckingham’s π theorem over Rayleigh’s method? What are the limitations of Rayleigh’s method?`,
    source: { kind: 'generated' },
    solution: md`**Advantages of Buckingham:** works for any number of variables; tells in advance that there are (n − m) groups; each π term is found systematically; gives the standard dimensionless numbers; reduces experimental effort and gives model-testing laws.

**Limitations of Rayleigh:** only three equations (M, L, T), so with more than about four variables some exponents remain unknown and must be grouped by inspection; no rule for grouping; like all dimensional analysis it cannot give the constant or the form of the function, or decide which variables are relevant.`,
  },
  {
    id: 'q-u2-10',
    topicId: 'u2-dimensional',
    type: 'mcq',
    difficulty: 1,
    prompt: md`Model tests on ship hulls and spillways are based mainly on`,
    options: ['Reynolds number', 'Froude number', 'Mach number', 'Weber number'],
    answer: 1,
    source: { kind: 'textbook', ref: '§12.9.2', page: 587 },
    solution: md`Gravity dominates free-surface flows, so the Froude number is matched.`,
  },
  {
    id: 'q-u2-11',
    topicId: 'u2-dimensional',
    type: 'mcq',
    difficulty: 1,
    prompt: md`The Reynolds number is the ratio of`,
    options: ['inertia force to gravity force', 'inertia force to viscous force', 'viscous force to pressure force', 'inertia force to surface tension force'],
    answer: 1,
    source: { kind: 'textbook', ref: '§12.8.1', page: 581 },
    solution: md`$Re = \rho VL/\mu$ = inertia/viscous.`,
  },
  {
    id: 'q-u2-12',
    topicId: 'u2-dimensional',
    type: 'numerical',
    difficulty: 3,
    prompt: md`The efficiency η of a fan depends on density ρ, viscosity μ, angular velocity ω, diameter D and discharge Q. Express η in terms of dimensionless parameters using Buckingham’s π theorem.`,
    source: { kind: 'textbook', ref: 'Problem 12.8', page: 568 },
    hints: ['n = 6, m = 3 ⇒ 3 π terms', 'Repeating variables D, ω, ρ', 'η is already dimensionless'],
    solution: md`$n = 6$, $m = 3$ ⇒ 3 π terms. Repeating variables D, ω, ρ. $\pi_1 = \eta$ (already dimensionless). $\pi_2 = \dfrac{\mu}{\rho D^2\omega}$. $\pi_3 = \dfrac{Q}{D^3\omega}$. Hence
$$\eta = \phi\!\left(\frac{\mu}{\rho D^2\omega}, \frac{Q}{\omega D^3}\right)$$`,
  },
]

/* =============================================================================
 * Formulas
 * ========================================================================== */

export const formulas: Formula[] = [
  {
    id: 'f-u2-rtt',
    topicId: 'u2-system-rtt',
    name: 'Reynolds transport theorem',
    latex: md`\frac{dB_{sys}}{dt} = \frac{\partial}{\partial t}\int_{CV}\rho b\,dV + \int_{CS}\rho b\,(\vec V\cdot\hat n)\,dA`,
    vars: [
      { sym: md`B`, meaning: 'extensive property (mass, momentum, energy)', unit: '–' },
      { sym: md`b`, meaning: 'B per unit mass', unit: '–' },
    ],
    conditions: 'Fixed, non-deforming control volume.',
    meaning: 'Converts a system law into control-volume form.',
    important: true,
  },
  {
    id: 'f-u2-momentum',
    topicId: 'u2-system-rtt',
    name: 'Momentum equation (steady, one inlet and outlet)',
    latex: md`\sum F_x = \rho Q\,(V_{2x} - V_{1x})`,
    vars: [{ sym: md`Q`, meaning: 'discharge', unit: 'm³/s' }],
    conditions: 'Steady flow, uniform velocity at inlet and outlet.',
    meaning: 'Net force on the fluid = rate of change of momentum. Basis of impact-of-jet problems.',
    important: true,
    ref: { chapter: 6, section: '§6.8', pages: '288' },
  },
  {
    id: 'f-u2-euler',
    topicId: 'u2-euler-bernoulli',
    name: 'Euler’s equation (along a stream line)',
    latex: md`\frac{dp}{\rho} + g\,dz + v\,dv = 0`,
    vars: [],
    conditions: 'Steady, inviscid flow along a stream line.',
    meaning: 'Newton’s law along a stream line with only pressure and gravity.',
    ref: { chapter: 6, section: '§6.3', pages: '260' },
  },
  {
    id: 'f-u2-euler3d',
    topicId: 'u2-euler-bernoulli',
    name: 'Euler’s equations (3-D)',
    latex: md`\frac{\partial u}{\partial t} + u\frac{\partial u}{\partial x} + v\frac{\partial u}{\partial y} + w\frac{\partial u}{\partial z} = X - \frac{1}{\rho}\frac{\partial p}{\partial x}`,
    vars: [{ sym: md`X`, meaning: 'body force per unit mass in x', unit: 'm/s²' }],
    conditions: 'Inviscid fluid; similar equations for y and z.',
    meaning: 'Vector form ρ DV/Dt = ρg − ∇p.',
  },
  {
    id: 'f-u2-bernoulli',
    topicId: 'u2-euler-bernoulli',
    name: 'Bernoulli’s equation',
    latex: md`\frac{p_1}{\rho g} + \frac{v_1^2}{2g} + z_1 = \frac{p_2}{\rho g} + \frac{v_2^2}{2g} + z_2 \;(+\,h_L)`,
    vars: [{ sym: md`h_L`, meaning: 'head loss (real fluid)', unit: 'm' }],
    conditions: 'Steady, incompressible, inviscid, along a stream line. Add h_L for a real fluid.',
    meaning: 'Total head is conserved in ideal flow.',
    important: true,
    ref: { chapter: 6, section: '§6.4, §6.6', pages: '261, 265' },
  },
  {
    id: 'f-u2-ns',
    topicId: 'u2-navier-stokes',
    name: 'Navier–Stokes (incompressible)',
    latex: md`\rho\frac{D\vec V}{Dt} = \rho\vec g - \nabla p + \mu\nabla^2\vec V`,
    vars: [],
    conditions: 'Newtonian fluid, constant μ and ρ.',
    meaning: 'Inertia = body + pressure + viscous forces.',
    important: true,
  },
  {
    id: 'f-u2-venturi',
    topicId: 'u2-flow-measurement',
    name: 'Venturimeter / orifice meter discharge',
    latex: md`Q = C_d\frac{a_1 a_2}{\sqrt{a_1^2 - a_2^2}}\sqrt{2gh}`,
    vars: [
      { sym: md`a_1, a_2`, meaning: 'inlet and throat (or orifice) areas', unit: 'm²' },
      { sym: md`h`, meaning: 'differential head of flowing liquid', unit: 'm' },
    ],
    conditions: 'C_d: venturi 0.95–0.99, orifice meter about 0.6.',
    meaning: 'Bernoulli + continuity between inlet and throat.',
    important: true,
    ref: { chapter: 6, section: '§6.7.1–6.7.2', pages: '269, 282' },
  },
  {
    id: 'f-u2-manometer-head',
    topicId: 'u2-flow-measurement',
    name: 'Differential manometer reading to head',
    latex: md`h = x\left(\frac{S_g}{S_o} - 1\right)`,
    vars: [
      { sym: md`x`, meaning: 'manometer reading', unit: 'm' },
      { sym: md`S_g, S_o`, meaning: 'sp. gr. of gauge liquid and of flowing liquid', unit: '–' },
    ],
    conditions: 'Gauge liquid heavier than flowing liquid. Lighter: h = x(1 − S_l/S_o).',
    meaning: 'Converts the reading to head of the flowing liquid.',
    related: ['f-u2-venturi'],
    ref: { chapter: 6, section: '§6.7.1', pages: '270' },
  },
  {
    id: 'f-u2-pitot',
    topicId: 'u2-flow-measurement',
    name: 'Pitot tube velocity',
    latex: md`v = C_v\sqrt{2gh}`,
    vars: [{ sym: md`h`, meaning: 'stagnation head − static head', unit: 'm' }],
    conditions: 'Point velocity, C_v ≈ 0.98.',
    meaning: 'Kinetic head converted to pressure head at the stagnation point.',
    ref: { chapter: 6, section: '§6.7.3', pages: '285' },
  },
  {
    id: 'f-u2-notch',
    topicId: 'u2-flow-measurement',
    name: 'Discharge over notches',
    latex: md`Q_{rect} = \tfrac23 C_d L\sqrt{2g}\,H^{3/2}, \qquad Q_{V} = \tfrac{8}{15}C_d\tan\tfrac{\theta}{2}\sqrt{2g}\,H^{5/2}`,
    vars: [
      { sym: md`L`, meaning: 'length of rectangular notch', unit: 'm' },
      { sym: md`\theta`, meaning: 'V-notch angle', unit: '°' },
      { sym: md`H`, meaning: 'head over crest/apex', unit: 'm' },
    ],
    conditions: 'Velocity of approach neglected.',
    meaning: 'Integrate √(2gh) over strips of the opening.',
    important: true,
    ref: { chapter: 8, section: '§8.3–8.4', pages: '356–358' },
  },
  {
    id: 'f-u2-pi',
    topicId: 'u2-dimensional',
    name: 'Buckingham π theorem',
    latex: md`f(X_1,\dots,X_n) = 0 \;\Rightarrow\; \phi(\pi_1,\dots,\pi_{n-m}) = 0`,
    vars: [
      { sym: md`n`, meaning: 'number of variables', unit: '–' },
      { sym: md`m`, meaning: 'number of fundamental dimensions', unit: '–' },
    ],
    conditions: 'Dimensionally homogeneous relation.',
    meaning: 'The number of independent dimensionless groups is n − m.',
    important: true,
    ref: { chapter: 12, section: '§12.4.2', pages: '565' },
  },
  {
    id: 'f-u2-numbers',
    topicId: 'u2-dimensional',
    name: 'Reynolds and Froude numbers',
    latex: md`Re = \frac{\rho V L}{\mu} = \frac{VL}{\nu}, \qquad Fr = \frac{V}{\sqrt{gL}}`,
    vars: [],
    conditions: 'Re for viscous-dominated flows; Fr for free-surface flows.',
    meaning: 'Inertia/viscous and √(inertia/gravity).',
    important: true,
    ref: { chapter: 12, section: '§12.8', pages: '581–582' },
  },
  {
    id: 'f-u2-froude-scale',
    topicId: 'u2-dimensional',
    name: 'Froude model scale ratios',
    latex: md`V_r = \sqrt{L_r}, \quad Q_r = L_r^{5/2}, \quad T_r = \sqrt{L_r}, \quad F_r = L_r^3`,
    vars: [{ sym: md`L_r`, meaning: 'length scale ratio', unit: '–' }],
    conditions: 'Same fluid in model and prototype; F_r assumes equal densities.',
    meaning: 'Scaling laws when gravity dominates.',
    ref: { chapter: 12, section: '§12.9.2', pages: '587–588' },
  },
]
