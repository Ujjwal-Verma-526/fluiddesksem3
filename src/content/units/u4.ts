import type { Formula, Question, Topic, WorkedExample } from '../types'

const md = String.raw

/* =============================================================================
 * UNIT 4 — Turbulent Flow & Pipe Losses (Bansal Ch. 10–11)
 * ========================================================================== */

export const topics: Topic[] = [
  /* ------------------------------------------------------------------ */
  {
    id: 'u4-turbulence',
    unitId: 'u4',
    title: 'Transition to turbulence, turbulence intensity and modelling, mixing length',
    summary: 'Reynolds’ experiment and transition, the nature of turbulence, time-averaged and fluctuating velocity, turbulence intensity, Reynolds stresses, Boussinesq eddy viscosity, Prandtl’s mixing length and an outline of turbulence models.',
    syllabusPhrases: [
      'Transition from laminar, to turbulent flow',
      'turbulence and turbulence intensity',
      'turbulence modelling',
      'Prandtl mixing length hypothesis',
    ],
    coverage: 'partial',
    coverageNote: 'Reynolds’ experiment, turbulent shear stress and the mixing length are Bansal §10.1–10.4 (pp. 433–440). Turbulence intensity and turbulence modelling are not in the book and are supplementary.',
    refs: [{ chapter: 10, section: '§10.1–10.4', pages: '433–440' }],
    diagrams: ['reynolds-experiment', 'turbulent-fluctuation'],
    sections: [
      {
        id: 'reynolds',
        title: 'Reynolds’ experiment and transition (§10.2)',
        body: md`Osborne Reynolds (1883) let water flow from a tank through a glass tube with a bell-mouth entrance, controlled by a valve, and injected a thin filament of dye at the centre of the inlet.

![Reynolds’ experiment](diagram:reynolds-experiment)

- **Low velocity:** the dye stays as a straight, sharp line: **laminar** flow.
- **Intermediate velocity:** the dye line becomes wavy and breaks occasionally: **transition**.
- **High velocity:** the dye mixes across the whole tube almost at once: **turbulent** flow.

The behaviour depends not on velocity alone but on $Re = VD/\nu$. The **lower critical Re ≈ 2000**, below which any disturbance is damped out. The upper critical value (about 4000, but much higher in very smooth, disturbance-free tubes) is where flow becomes fully turbulent.

Transition happens because small disturbances are amplified rather than damped once inertia dominates viscosity. Roughness, inlet disturbances, vibration and adverse pressure gradients bring it on earlier.`,
      },
      {
        id: 'nature',
        title: 'Turbulence and turbulence intensity',
        supplementary: true,
        body: md`> [!SUPP] Intensity not in Bansal
> Bansal introduces the fluctuating components in §10.3 but does not define turbulence intensity.

Turbulent flow is **unsteady, three-dimensional, random and eddying**, with strong mixing. At a point, each velocity component fluctuates about a time mean:
$$u = \bar u + u', \qquad \bar u = \frac{1}{T}\int_0^T u\,dt, \qquad \overline{u'} = 0$$

![Fluctuating velocity at a point in turbulent flow](diagram:turbulent-fluctuation)

Since the fluctuations average to zero, their size is measured by the root mean square. **Turbulence intensity** is
$$I = \frac{\sqrt{\tfrac13\left(\overline{u'^2} + \overline{v'^2} + \overline{w'^2}\right)}}{\bar U} \qquad (\text{1-D: } I = \sqrt{\overline{u'^2}}/\bar u)$$
Typical values: below 1% in a good wind tunnel, 5–10% in pipe flow, over 20% in wakes and jets. **Turbulent kinetic energy** per unit mass is $k = \tfrac12\left(\overline{u'^2} + \overline{v'^2} + \overline{w'^2}\right)$.`,
      },
      {
        id: 'shear',
        title: 'Turbulent shear stress (§10.3)',
        body: md`Fluctuations carry momentum between layers, adding an apparent stress far larger than viscous stress. Total shear stress:
$$\tau = \tau_v + \tau_t = \mu\frac{d\bar u}{dy} + \eta\frac{d\bar u}{dy}$$
where η is the **eddy viscosity** (Boussinesq, 1877). Unlike μ, η is not a fluid property: it depends on the flow and the position.

Reynolds showed, by time-averaging the momentum transfer, that the turbulent stress is
$$\tau_t = -\rho\,\overline{u'v'}$$
the **Reynolds stress**. Positive $v'$ (moving up into faster fluid) goes with negative $u'$, so $\overline{u'v'} < 0$ and $\tau_t > 0$.`,
      },
      {
        id: 'mixing',
        title: 'Prandtl’s mixing length hypothesis (§10.4)',
        body: md`> [!DEF] Mixing length (l)
> The distance, measured perpendicular to the flow, that a lump of fluid travels before it loses its identity and mixes with the surrounding fluid (analogous to the mean free path of a molecule).

Prandtl (1925) argued that a lump moving through $l$ carries a velocity difference $l\,d\bar u/dy$, so both fluctuations scale with it:
$$u' \sim l\frac{d\bar u}{dy}, \qquad v' \sim l\frac{d\bar u}{dy}$$
$$\tau_t = \rho\,l^2\left(\frac{d\bar u}{dy}\right)^2, \qquad \eta = \rho\,l^2\left|\frac{d\bar u}{dy}\right|$$
Near a wall, $l = 0.4y$ (Kármán constant κ = 0.4). With τ ≈ τ₀ near the wall this integrates to the **logarithmic velocity law**:
$$\frac{u}{u_*} = 5.75\log_{10}\frac{y}{y'} \qquad u_* = \sqrt{\tau_0/\rho}\ \text{(shear velocity)}$$
which Unit 4’s smooth/rough pipe laws build on.`,
      },
      {
        id: 'modelling',
        title: 'Turbulence modelling',
        supplementary: true,
        body: md`> [!SUPP] Not in Bansal
> An outline is enough at this level: what the closure problem is and the main families of models.

Time-averaging the Navier–Stokes equations gives the **Reynolds-averaged Navier–Stokes (RANS)** equations. They contain the extra unknowns $-\rho\overline{u_i'u_j'}$ (Reynolds stresses) with no extra equations: the **closure problem**. A turbulence model supplies them.

| Model family | Idea | Example |
|---|---|---|
| Zero-equation (algebraic) | eddy viscosity from a prescribed length scale | Prandtl mixing length |
| One-equation | solve a transport equation for $k$ (or for ν_t) | Spalart–Allmaras |
| Two-equation | transport equations for $k$ and a second scale | **k–ε**, **k–ω**, SST |
| Reynolds stress models | transport equation for each stress | RSM |
| Scale-resolving | compute the large eddies directly | LES, DNS (all scales, very costly) |

Most use the Boussinesq idea $-\rho\overline{u'v'} = \mu_t\,\partial\bar u/\partial y$; in k–ε, $\mu_t = \rho C_\mu k^2/\varepsilon$ with $C_\mu = 0.09$.`,
      },
    ],
    keyPoints: [
      'Reynolds’ experiment: dye filament straight (laminar), wavy (transition), fully mixed (turbulent). Lower critical Re ≈ 2000.',
      'u = ū + u′; turbulence intensity I = √(u′²)‾/ū (rms fluctuation ÷ mean).',
      'Turbulent shear: τ = μ dū/dy + η dū/dy; Reynolds stress τ_t = −ρ u′v′‾.',
      'Prandtl: τ_t = ρ l² (dū/dy)², l = 0.4y near a wall ⇒ logarithmic velocity profile.',
      'RANS closure problem → turbulence models: mixing length, k–ε, k–ω, RSM, LES, DNS.',
    ],
    misconceptions: ['Treating eddy viscosity η as a fluid property like μ. It varies with the flow and position.'],
    flashcards: [
      { id: 'fc-u4-t1', front: 'Define turbulence intensity', back: 'RMS of the velocity fluctuation divided by the mean velocity: I = √(u′²)‾ / ū.' },
      { id: 'fc-u4-t2', front: 'Prandtl mixing length: expression for turbulent shear', back: 'τ_t = ρ l² (dū/dy)², with l = 0.4 y near a wall.' },
      { id: 'fc-u4-t3', front: 'Reynolds stress', back: 'τ_t = −ρ u′v′‾, the apparent stress from turbulent momentum exchange.' },
      { id: 'fc-u4-t4', front: 'What is the closure problem?', back: 'Averaging Navier–Stokes adds Reynolds stresses as new unknowns without new equations; a turbulence model must supply them.' },
      { id: 'fc-u4-t5', front: 'Name two two-equation turbulence models', back: 'k–ε and k–ω (or SST).' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u4-pipe-losses',
    unitId: 'u4',
    title: 'Major and minor losses in pipes',
    summary: 'Darcy–Weisbach equation and its derivation, Chezy’s formula, and the minor losses at sudden enlargement, contraction, entrance, exit, bends and fittings; hydraulic gradient and total energy lines.',
    syllabusPhrases: ['flow losses in pipes-major and minor losses'],
    coverage: 'full',
    highlighted: true,
    refs: [
      { chapter: 10, section: '§10.5', pages: '434–436' },
      { chapter: 11, section: '§11.1–11.6', pages: '465–496' },
    ],
    diagrams: ['sudden-enlargement', 'hgl-tel'],
    sections: [
      {
        id: 'darcy',
        title: 'Major loss: Darcy–Weisbach equation (§11.3)',
        body: md`> [!EXAM] Asked in 2024 Q3(b): derive the expression for head loss due to friction in a pipe
> Derivation in the Derivations tab (force balance on a length of pipe with frictional resistance $f'\rho V^2/2$ per unit wetted area).

The **major loss** is the loss due to friction along the pipe length. Darcy–Weisbach:
$$h_f = \frac{4f' L V^2}{2gD} \quad(\text{Bansal}) \qquad = \frac{f L V^2}{2gD} \quad(\text{Darcy } f = 4f')$$
- Laminar: $f = 64/Re$ ($f' = 16/Re$).
- Turbulent smooth pipe, $4000 < Re < 10^5$: $f' = \dfrac{0.0791}{Re^{1/4}}$ (Blasius).

**Chezy’s formula:** $V = C\sqrt{m\,i}$, with hydraulic mean depth $m = A/P = D/4$ for a full pipe and slope $i = h_f/L$. Comparing with Darcy–Weisbach gives $C = \sqrt{2g/f'}$, which links the two formulas.`,
      },
      {
        id: 'minor',
        title: 'Minor losses (§11.4)',
        body: md`Losses at changes of section or direction, due to separation and eddies. They are “minor” only in long pipes; in short pipes they can dominate.

| Cause | Head loss |
|---|---|
| **Sudden enlargement** | $h_e = \dfrac{(V_1 - V_2)^2}{2g}$ |
| **Sudden contraction** | $h_c = \dfrac{V_2^2}{2g}\left(\dfrac{1}{C_c} - 1\right)^2 \approx 0.5\dfrac{V_2^2}{2g}$ |
| **Entrance to pipe** | $h_i = 0.5\dfrac{V^2}{2g}$ |
| **Exit from pipe** | $h_o = \dfrac{V^2}{2g}$ |
| **Obstruction in pipe** | $h = \dfrac{V^2}{2g}\left[\dfrac{A}{C_c(A - a)} - 1\right]^2$ |
| **Bends, pipe fittings** | $h = k\dfrac{V^2}{2g}$ |
| **Gradual contraction/enlargement** | $h = k\dfrac{(V_1 - V_2)^2}{2g}$ |

![Sudden enlargement: the eddying region and the control volume](diagram:sudden-enlargement)`,
      },
      {
        id: 'enlargement',
        title: 'Loss at sudden enlargement (§11.4.1)',
        body: md`Take a control volume from section 1–1 (just after the enlargement, where the jet still has area $A_1$ but pressure $p_1$ acts over the whole area $A_2$, as the eddies are nearly stagnant) to section 2–2, where the flow has re-attached.

**Momentum:** $p_1A_2 - p_2A_2 = \rho Q(V_2 - V_1) = \rho A_2V_2(V_2 - V_1)$, so
$$\frac{p_1 - p_2}{\rho g} = \frac{V_2^2 - V_1V_2}{g}$$
**Energy:** $h_e = \dfrac{p_1 - p_2}{\rho g} + \dfrac{V_1^2 - V_2^2}{2g}$. Substituting:
$$h_e = \frac{2V_2^2 - 2V_1V_2 + V_1^2 - V_2^2}{2g} = \frac{(V_1 - V_2)^2}{2g}$$
The exit loss $V^2/2g$ is the limit $V_2 \to 0$ (pipe discharging into a large tank).`,
      },
      {
        id: 'hgl',
        title: 'Hydraulic gradient and total energy lines (§11.5)',
        body: md`- **Hydraulic gradient line (HGL):** the line joining the piezometric heads $\left(\dfrac{p}{\rho g} + z\right)$ along the pipe: the level water would rise to in piezometers.
- **Total energy line (TEL):** the line joining the total heads $\left(\dfrac{p}{\rho g} + \dfrac{V^2}{2g} + z\right)$. It lies a distance $V^2/2g$ above the HGL.

The TEL always falls in the direction of flow (losses), dropping suddenly at minor losses. The HGL can rise, at an enlargement where velocity falls. If the HGL falls below the pipe, the pressure there is below atmospheric (siphon).

![HGL and TEL for a pipe joining two tanks](diagram:hgl-tel)`,
      },
    ],
    derivations: [
      {
        id: 'd-u4-darcy',
        title: 'Darcy–Weisbach: loss of head due to friction',
        goal: md`Derive $h_f = \dfrac{4f'LV^2}{2gD}$ for steady flow in a uniform horizontal pipe.`,
        assumptions: ['Steady flow, uniform pipe diameter D', 'Frictional resistance per unit wetted area ∝ V²: F′ = f′ρV²/2 (Froude’s experiments)'],
        steps: [
          { math: md`\frac{p_1}{\rho g} + \frac{V_1^2}{2g} + z_1 = \frac{p_2}{\rho g} + \frac{V_2^2}{2g} + z_2 + h_f`, why: md`Energy between sections 1 and 2, a length $L$ apart.` },
          { math: md`h_f = \frac{p_1 - p_2}{\rho g}`, why: md`Horizontal and uniform: $z_1 = z_2$, $V_1 = V_2$.` },
          { math: md`(p_1 - p_2)\frac{\pi D^2}{4} = F'\,(\pi D L)`, why: md`No acceleration: net pressure force = frictional resistance on the wetted surface $\pi DL$.` },
          { math: md`F' = f'\frac{\rho V^2}{2}`, why: md`Frictional resistance per unit area, with $f'$ the coefficient of friction (dimensionless).` },
          { math: md`p_1 - p_2 = \frac{4 f' L}{D}\cdot\frac{\rho V^2}{2}`, why: md`Combine and simplify.` },
          { math: md`h_f = \frac{4f' L V^2}{2gD}`, why: md`Divide by $\rho g$. With $f = 4f'$ this is $h_f = \dfrac{fLV^2}{2gD}$.` },
        ],
        result: md`h_f = \frac{4 f' L V^2}{2 g D} = \frac{f L V^2}{2 g D}`,
        ref: { chapter: 10, section: '§10.5', pages: '434–436' },
      },
    ],
    keyPoints: [
      'Darcy–Weisbach: h_f = 4f′LV²/(2gD) = fLV²/(2gD); f = 4f′.',
      'Laminar f = 64/Re; Blasius f′ = 0.0791/Re^{1/4} (smooth, Re < 10⁵).',
      'Sudden enlargement h_e = (V₁ − V₂)²/2g (momentum + energy). Exit V²/2g; entrance 0.5V²/2g; contraction ≈ 0.5V₂²/2g.',
      'HGL = piezometric head line; TEL = HGL + V²/2g; TEL always falls along the flow.',
    ],
    misconceptions: [
      'Mixing Bansal’s f′ (0.005-ish) with Darcy’s f (0.02-ish): check whether the formula has the 4.',
      'Using the larger velocity in the contraction loss. It uses the velocity in the smaller pipe (V₂).',
    ],
    flashcards: [
      { id: 'fc-u4-l1', front: 'Darcy–Weisbach equation', back: 'h_f = 4f′LV²/(2gD) (Bansal) = fLV²/(2gD) (Darcy f = 4f′).' },
      { id: 'fc-u4-l2', front: 'Loss at sudden enlargement', back: 'h_e = (V₁ − V₂)²/2g.' },
      { id: 'fc-u4-l3', front: 'Entrance and exit losses', back: 'Entrance 0.5V²/2g; exit V²/2g.' },
      { id: 'fc-u4-l4', front: 'HGL vs TEL', back: 'HGL joins piezometric heads (p/ρg + z); TEL is V²/2g above it and always falls in the flow direction.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u4-series-parallel',
    unitId: 'u4',
    title: 'Pipes in series and parallel; equivalent pipe',
    summary: 'Head and discharge relations for compound pipes in series, the equivalent pipe (Dupuit’s equation), and parallel pipes sharing the same head loss.',
    syllabusPhrases: ['pipes in series and parallel'],
    coverage: 'full',
    refs: [{ chapter: 11, section: '§11.7–11.10', pages: '503–515' }],
    diagrams: ['series-parallel'],
    sections: [
      {
        id: 'series',
        title: 'Pipes in series (§11.7)',
        body: md`Pipes of different lengths and diameters joined end to end. The **same discharge** passes through each, and the **losses add**:
$$Q = A_1V_1 = A_2V_2 = A_3V_3$$
$$H = \underbrace{\frac{0.5V_1^2}{2g}}_{\text{entry}} + \frac{4f_1L_1V_1^2}{2gd_1} + \underbrace{\frac{0.5V_2^2}{2g}}_{\text{contraction}} + \frac{4f_2L_2V_2^2}{2gd_2} + \underbrace{\frac{(V_2 - V_3)^2}{2g}}_{\text{enlargement}} + \frac{4f_3L_3V_3^2}{2gd_3} + \underbrace{\frac{V_3^2}{2g}}_{\text{exit}}$$
If minor losses are neglected, only the friction terms remain.

![Pipes in series and in parallel](diagram:series-parallel)`,
      },
      {
        id: 'equivalent',
        title: 'Equivalent pipe (§11.8)',
        body: md`A uniform pipe of diameter $d$ and length $L = L_1 + L_2 + L_3$ that carries the same discharge with the same head loss as the compound pipe. Equating the friction losses (same $f$) and using $V = 4Q/\pi d^2$:
$$\frac{L}{d^5} = \frac{L_1}{d_1^5} + \frac{L_2}{d_2^5} + \frac{L_3}{d_3^5}$$
This is **Dupuit’s equation**.`,
      },
      {
        id: 'parallel',
        title: 'Pipes in parallel (§11.9)',
        body: md`A main pipe divides into branches that rejoin. The **total discharge divides**, and the **head loss is the same** in every branch (they share the same end points):
$$Q = Q_1 + Q_2, \qquad h_{f1} = h_{f2} \;\Rightarrow\; \frac{4f_1L_1V_1^2}{2gd_1} = \frac{4f_2L_2V_2^2}{2gd_2}$$
With equal $f$ and $L$, $Q \propto d^{5/2}$, so the larger pipe takes a disproportionate share.`,
      },
    ],
    keyPoints: [
      'Series: same Q, losses add.',
      'Parallel: Q divides, same head loss in each branch.',
      'Dupuit equivalent pipe: L/d⁵ = Σ Lᵢ/dᵢ⁵.',
      'Equal f and L in parallel ⇒ Q ∝ d^{5/2}.',
    ],
    flashcards: [
      { id: 'fc-u4-s1', front: 'Pipes in series vs parallel: what is common?', back: 'Series: same discharge, heads add. Parallel: same head loss, discharges add.' },
      { id: 'fc-u4-s2', front: 'Dupuit’s equation', back: 'L/d⁵ = L₁/d₁⁵ + L₂/d₂⁵ + L₃/d₃⁵.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u4-smooth-rough',
    unitId: 'u4',
    title: 'Hydraulically smooth and rough pipes; friction factor charts',
    summary: 'Laminar sub-layer, the criteria for hydrodynamically smooth and rough boundaries, velocity distributions and friction-factor laws for smooth and rough pipes, and the Moody chart.',
    syllabusPhrases: ['hydraulically smooth and rough pipes', 'friction factor charts'],
    coverage: 'partial',
    coverageNote: 'Smooth and rough boundaries, velocity distributions and the Kármán–Prandtl friction laws are Bansal §10.5–10.7 (pp. 441–464). The Moody chart is not in the book and is supplementary.',
    refs: [{ chapter: 10, section: '§10.5–10.7', pages: '441–464' }],
    diagrams: ['sublayer-roughness', 'moody-chart'],
    sections: [
      {
        id: 'sublayer',
        title: 'Laminar sub-layer and the smooth/rough criterion (§10.5)',
        body: md`Even in turbulent flow, right at the wall the velocity gradient is steep and the flow is laminar in a very thin **laminar sub-layer** of thickness
$$\delta' = \frac{11.6\,\nu}{u_*}, \qquad u_* = \sqrt{\frac{\tau_0}{\rho}}$$
Whether the wall “looks” rough depends on how the roughness height $k$ compares with δ′, not on $k$ alone:

| Criterion | Smooth | Transition | Rough |
|---|---|---|---|
| $k/\delta'$ | < 0.25 | 0.25–6 | > 6 |
| Roughness Reynolds no. $u_*k/\nu$ | < 4 | 4–100 | > 100 |

![Roughness inside and outside the laminar sub-layer](diagram:sublayer-roughness)

- **Hydrodynamically smooth:** roughness buried in the sub-layer; friction depends on Re only.
- **Hydrodynamically rough:** roughness pokes through; friction depends on $k/D$ only.

The same pipe can be smooth at low Re and rough at high Re, because δ′ shrinks as velocity rises.`,
      },
      {
        id: 'velocity',
        title: 'Velocity distribution (§10.6)',
        body: md`From Prandtl’s mixing length with $l = 0.4y$:

**Smooth pipe:** $\dfrac{u}{u_*} = 5.75\log_{10}\dfrac{u_* y}{\nu} + 5.55$

**Rough pipe:** $\dfrac{u}{u_*} = 5.75\log_{10}\dfrac{y}{k} + 8.5$

**Either (velocity defect law):** $\dfrac{U_{max} - u}{u_*} = 5.75\log_{10}\dfrac{R}{y}$, and the mean velocity satisfies $\dfrac{U_{max} - \bar u}{u_*} = 3.75$.

Turbulent profiles are much flatter than the laminar parabola; a common approximation is the **one-seventh power law** $u/U_{max} = (y/R)^{1/7}$.`,
      },
      {
        id: 'friction-laws',
        title: 'Friction factor for turbulent flow (§10.7)',
        body: md`With Darcy $f = 4f'$:

| Regime | Law |
|---|---|
| Laminar | $f = 64/Re$ |
| Smooth, $4000 < Re < 10^5$ | $f = 0.316/Re^{1/4}$ (Blasius) |
| Smooth, any Re | $\dfrac{1}{\sqrt f} = 2\log_{10}(Re\sqrt f) - 0.8$ (Kármán–Prandtl) |
| Fully rough | $\dfrac{1}{\sqrt f} = 2\log_{10}\dfrac{R}{k} + 1.74$ |

In Bansal’s $f'$ form the last two read $\dfrac{1}{\sqrt{4f'}} = 2\log_{10}(Re\sqrt{4f'}) - 0.8$ and $\dfrac{1}{\sqrt{4f'}} = 2\log_{10}(R/k) + 1.74$.`,
      },
      {
        id: 'moody',
        title: 'Friction factor chart (Moody diagram)',
        supplementary: true,
        body: md`> [!SUPP] Not in Bansal
> Bansal uses the formulas above. The syllabus says “friction factor charts”, which means the Moody chart.

The **Moody chart** (1944) plots Darcy $f$ against $Re$ on log–log axes, one curve per relative roughness $k/D$. It is a graph of the **Colebrook–White** equation, which blends the smooth and rough laws:
$$\frac{1}{\sqrt f} = -2\log_{10}\left(\frac{k/D}{3.7} + \frac{2.51}{Re\sqrt f}\right)$$
An explicit approximation (Swamee–Jain) avoids iteration: $f = 0.25\Big/\left[\log_{10}\left(\dfrac{k/D}{3.7} + \dfrac{5.74}{Re^{0.9}}\right)\right]^2$.

![Moody chart computed from the Colebrook equation](diagram:moody-chart)

Reading it: find Re, follow up to the $k/D$ curve, read $f$ on the left. Zones: laminar straight line $64/Re$; critical zone (2000–4000, uncertain); transition zone (curves depend on both Re and $k/D$); fully rough zone (curves flatten, $f$ depends on $k/D$ only).`,
      },
    ],
    keyPoints: [
      'Laminar sub-layer δ′ = 11.6ν/u*, with u* = √(τ₀/ρ).',
      'Smooth if k/δ′ < 0.25 (u*k/ν < 4); rough if k/δ′ > 6 (u*k/ν > 100).',
      'Smooth: f depends on Re only. Fully rough: f depends on k/D only.',
      'Moody chart = Colebrook equation plotted as f vs Re for each k/D.',
    ],
    misconceptions: ['Calling a pipe smooth or rough from its surface alone. It depends on k compared with the sub-layer thickness, which depends on Re.'],
    flashcards: [
      { id: 'fc-u4-r1', front: 'Thickness of laminar sub-layer', back: 'δ′ = 11.6 ν / u*.' },
      { id: 'fc-u4-r2', front: 'Criterion for hydrodynamically rough boundary', back: 'k/δ′ > 6 (or u*k/ν > 100).' },
      { id: 'fc-u4-r3', front: 'What does the Moody chart plot?', back: 'Darcy friction factor f vs Reynolds number, one curve per relative roughness k/D (Colebrook equation).' },
      { id: 'fc-u4-r4', front: 'In the fully rough zone, f depends on…', back: 'Relative roughness k/D only, not on Re.' },
    ],
  },
]

/* =============================================================================
 * Worked examples
 * ========================================================================== */

export const examples: WorkedExample[] = [
  {
    id: 'ex-10-1',
    topicId: 'u4-smooth-rough',
    title: 'Smooth, rough or transitional boundary?',
    source: { kind: 'textbook', ref: 'Problem 10.1', page: 442 },
    difficulty: 1,
    statement: md`A pipe-line carrying water has average height of irregularities projecting from the surface of the boundary of the pipe as 0.15 mm. What type of boundary is it? The shear stress developed is 4.9 N/m². The kinematic viscosity of water is 0.01 stokes.`,
    given: ['k = 0.15 mm', 'τ₀ = 4.9 N/m²', 'ν = 10⁻⁶ m²/s'],
    find: ['Type of boundary'],
    approach: md`Shear velocity → sub-layer thickness → compare with $k$.`,
    steps: [
      { label: 'Shear velocity', work: md`$u_* = \sqrt{4.9/1000} = 0.07$ m/s` },
      { label: 'Sub-layer', work: md`$\delta' = \dfrac{11.6 \times 10^{-6}}{0.07} = 0.1657$ mm` },
      { label: 'Compare', work: md`$k/\delta' = 0.15/0.1657 = 0.905$, between 0.25 and 6. (Equivalently $u_*k/\nu = 10.5$, between 4 and 100.)` },
    ],
    answer: md`Boundary is in the **transition** regime`,
    concept: 'Smooth or rough depends on k relative to the laminar sub-layer.',
  },
  {
    id: 'ex-10-9',
    topicId: 'u4-smooth-rough',
    title: 'Smooth pipe: loss, wall stress, centre velocity, sub-layer',
    source: { kind: 'textbook', ref: 'Problem 10.9', page: 454 },
    difficulty: 3,
    statement: md`A smooth pipe of diameter 400 mm and length 800 m carries water at the rate of 0.04 m³/s. Determine the head lost due to friction, wall shear stress, centre-line velocity and thickness of laminar sub-layer. Take the kinematic viscosity of water as 0.018 stokes.`,
    given: ['D = 0.4 m, L = 800 m, Q = 0.04 m³/s', 'ν = 0.018 × 10⁻⁴ m²/s'],
    find: ['h_f, τ₀, U_max, δ′'],
    approach: md`Re → Blasius $f'$ → Darcy; $\tau_0 = f'\rho V^2/2$; smooth-pipe log law at $y = R$.`,
    steps: [
      { label: 'Velocity and Re', work: md`$V = 0.04/(\pi(0.4)^2/4) = 0.3183$ m/s; $Re = 0.3183 \times 0.4/(1.8 \times 10^{-6}) = 70\,736$` },
      { label: 'Friction', work: md`$f' = 0.0791/Re^{1/4} = 0.00485$; $h_f = \dfrac{4 \times 0.00485 \times 800 \times 0.3183^2}{2 \times 9.81 \times 0.4} = 0.200$ m` },
      { label: 'Wall shear', work: md`$\tau_0 = f'\dfrac{\rho V^2}{2} = 0.00485 \times 500 \times 0.1013 = 0.2457$ N/m²; $u_* = \sqrt{\tau_0/\rho} = 0.01568$ m/s` },
      { label: 'Centre-line velocity', work: md`$U_{max} = u_*\left[5.75\log_{10}\dfrac{u_*R}{\nu} + 5.55\right] = 0.01568[5.75\log_{10}(1742) + 5.55] = 0.379$ m/s` },
      { label: 'Sub-layer', work: md`$\delta' = 11.6\nu/u_* = 11.6 \times 1.8 \times 10^{-6}/0.01568 = 1.33$ mm` },
    ],
    answer: md`$h_f = 0.20$ m; $\tau_0 = 0.246$ N/m²; $U_{max} = 0.379$ m/s; $\delta' = 1.33$ mm`,
    concept: 'Smooth-pipe chain: Re → f → τ₀ → u* → profile and sub-layer.',
  },
  {
    id: 'ex-11-1',
    topicId: 'u4-pipe-losses',
    title: 'Head lost by Darcy and Chezy formulas',
    source: { kind: 'textbook', ref: 'Problem 11.1', page: 467 },
    difficulty: 1,
    statement: md`Find the head lost due to friction in a pipe of diameter 300 mm and length 50 m, through which water is flowing at a velocity of 3 m/s using (i) Darcy formula, (ii) Chezy’s formula for which C = 60. Take ν for water = 0.01 stoke.`,
    given: ['d = 0.3 m, L = 50 m, V = 3 m/s', 'C = 60, ν = 10⁻⁶ m²/s'],
    find: ['h_f by Darcy and Chezy'],
    approach: md`Darcy with Bansal’s $f' = 0.079/Re^{1/4}$; Chezy with $m = d/4$.`,
    steps: [
      { label: 'Reynolds number', work: md`$Re = 3 \times 0.3/10^{-6} = 9 \times 10^5$` },
      { label: 'Darcy', work: md`$f' = 0.079/(9 \times 10^5)^{1/4} = 0.00256$; $h_f = \dfrac{4 \times 0.00256 \times 50 \times 9}{2 \times 9.81 \times 0.3} = 0.783$ m` },
      { label: 'Chezy', work: md`$m = 0.3/4 = 0.075$ m; $i = \dfrac{V^2}{C^2m} = \dfrac{9}{3600 \times 0.075} = 0.0333$; $h_f = iL = 1.667$ m` },
    ],
    answer: md`Darcy: $h_f = 0.783$ m; Chezy: $h_f = 1.67$ m`,
    concept: 'Two empirical formulas can give quite different losses.',
    checkNote: md`Bansal applies the Blasius form at Re = 9 × 10⁵, beyond its 10⁵ range. The Kármán–Prandtl smooth law would give a slightly smaller f.`,
  },
  {
    id: 'ex-11-8',
    topicId: 'u4-pipe-losses',
    title: 'Loss at a sudden enlargement',
    source: { kind: 'textbook', ref: 'Problem 11.8', page: 474 },
    difficulty: 1,
    statement: md`Find the loss of head when a pipe of diameter 200 mm is suddenly enlarged to a diameter of 400 mm. The rate of flow of water through the pipe is 250 litres/s.`,
    given: ['D₁ = 0.2 m, D₂ = 0.4 m', 'Q = 0.25 m³/s'],
    find: ['h_e'],
    approach: md`$h_e = (V_1 - V_2)^2/2g$.`,
    steps: [
      { label: 'Velocities', work: md`$V_1 = 0.25/0.03142 = 7.958$ m/s; $V_2 = 0.25/0.1257 = 1.989$ m/s` },
      { label: 'Loss', work: md`$h_e = \dfrac{(7.958 - 1.989)^2}{2 \times 9.81} = 1.816$ m` },
    ],
    answer: md`$h_e \approx 1.82$ m of water`,
    concept: 'Borda–Carnot loss from momentum + energy.',
  },
  {
    id: 'ex-11-30',
    topicId: 'u4-series-parallel',
    title: 'Three pipes in series between two tanks',
    source: { kind: 'textbook', ref: 'Problem 11.30', page: 503 },
    difficulty: 3,
    statement: md`The difference in water surface levels in two tanks, which are connected by three pipes in series of lengths 300 m, 170 m and 210 m and of diameters 300 mm, 200 mm and 400 mm respectively, is 12 m. Determine the rate of flow of water if co-efficients of friction are 0.005, 0.0052 and 0.0048 respectively, considering: (i) minor losses also (ii) neglecting minor losses.`,
    given: ['H = 12 m', 'L = 300, 170, 210 m; d = 0.3, 0.2, 0.4 m', "f′ = 0.005, 0.0052, 0.0048"],
    find: ['Q with and without minor losses'],
    approach: md`Write every velocity in terms of $V_1$ by continuity ($V_2 = 2.25V_1$, $V_3 = 0.5625V_1$), sum the losses and set equal to H.`,
    steps: [
      { label: 'Friction terms', work: md`$\sum\dfrac{4f'LV^2}{2gd} = \dfrac{V_1^2}{2g}\left[\dfrac{4(0.005)(300)}{0.3} + \dfrac{4(0.0052)(170)(2.25)^2}{0.2} + \dfrac{4(0.0048)(210)(0.5625)^2}{0.4}\right] = \dfrac{V_1^2}{2g}(20 + 89.5 + 3.19) = 5.744V_1^2$` },
      { label: 'Minor terms', work: md`Entry $0.5V_1^2/2g$, contraction $0.5V_2^2/2g$, enlargement $(V_2 - V_3)^2/2g$, exit $V_3^2/2g$: together $\dfrac{V_1^2}{2g}(0.5 + 2.531 + 2.848 + 0.316) = 0.316V_1^2$` },
      { label: '(i) with minor losses', work: md`$12 = (5.744 + 0.316)V_1^2$ ⇒ $V_1 = 1.407$ m/s ⇒ $Q = 0.0707 \times 1.407 = 0.0995$ m³/s` },
      { label: '(ii) without', work: md`$12 = 5.744V_1^2$ ⇒ $V_1 = 1.445$ m/s ⇒ $Q = 0.1022$ m³/s` },
    ],
    answer: md`(i) $Q \approx 0.0995$ m³/s (99.5 l/s); (ii) $Q \approx 0.102$ m³/s (102 l/s)`,
    concept: 'Series: same Q, add all losses; continuity puts everything in one unknown.',
  },
  {
    id: 'ex-11-32',
    topicId: 'u4-series-parallel',
    title: 'Flow division between parallel pipes',
    source: { kind: 'textbook', ref: 'Problem 11.32', page: 509 },
    difficulty: 2,
    statement: md`A main pipe divides into two parallel pipes which again form one pipe. The length and diameter for the first parallel pipe are 2000 m and 1.0 m respectively, while the length and diameter of the 2nd parallel pipe are 2000 m and 0.8 m. Find the rate of flow in each parallel pipe, if total flow in the main is 3.0 m³/s. The co-efficient of friction for each parallel pipe is same and equal to 0.005.`,
    given: ['L₁ = L₂ = 2000 m', 'd₁ = 1.0 m, d₂ = 0.8 m', 'Q = 3 m³/s, f′ equal'],
    find: ['Q₁, Q₂'],
    approach: md`Equal head loss with equal $f'$ and $L$ ⇒ $V_1^2/d_1 = V_2^2/d_2$ ⇒ $Q \propto d^{5/2}$.`,
    steps: [
      { label: 'Ratio', work: md`$\dfrac{Q_1}{Q_2} = \left(\dfrac{1.0}{0.8}\right)^{2.5} = 1.747$` },
      { label: 'Split', work: md`$Q_2 = \dfrac{3}{1 + 1.747} = 1.092$ m³/s; $Q_1 = 3 - 1.092 = 1.908$ m³/s` },
    ],
    answer: md`$Q_1 = 1.908$ m³/s, $Q_2 = 1.092$ m³/s`,
    concept: 'Parallel pipes: same head loss; discharge ∝ d^{5/2}.',
  },
]

/* =============================================================================
 * Questions
 * ========================================================================== */

export const questions: Question[] = [
  {
    id: 'q-u4-1',
    topicId: 'u4-turbulence',
    type: 'short',
    difficulty: 1,
    prompt: md`Describe Reynolds’ experiment and what it shows about transition.`,
    source: { kind: 'textbook', ref: '§10.2', page: 433 },
    solution: md`Dye is injected at the centre of a glass tube carrying water from a tank. At low velocity it stays a straight thread (laminar); at intermediate velocity it wavers (transition); at high velocity it mixes across the tube (turbulent). The type of flow depends on $Re = VD/\nu$: laminar below about 2000, turbulent above about 4000.`,
  },
  {
    id: 'q-u4-2',
    topicId: 'u4-turbulence',
    type: 'short',
    difficulty: 2,
    prompt: md`Explain Prandtl’s mixing length hypothesis and obtain the expression for turbulent shear stress.`,
    source: { kind: 'textbook', ref: '§10.4', page: 438 },
    solution: md`A lump of fluid moving perpendicular to the flow travels a distance $l$ (the mixing length) before mixing with its surroundings. The velocity difference it carries is $l\,d\bar u/dy$, so $u' \sim v' \sim l\,d\bar u/dy$. Then $\tau_t = -\rho\overline{u'v'} = \rho l^2(d\bar u/dy)^2$. Near a wall $l = 0.4y$, which leads to the logarithmic velocity distribution.`,
  },
  {
    id: 'q-u4-3',
    topicId: 'u4-turbulence',
    type: 'mcq',
    difficulty: 1,
    prompt: md`Turbulence intensity is defined as`,
    options: ['mean velocity ÷ maximum velocity', 'rms velocity fluctuation ÷ mean velocity', 'eddy viscosity ÷ dynamic viscosity', 'Reynolds stress ÷ wall shear stress'],
    answer: 1,
    source: { kind: 'generated' },
    solution: md`$I = \sqrt{\overline{u'^2}}/\bar u$.`,
  },
  {
    id: 'q-u4-4',
    topicId: 'u4-turbulence',
    type: 'short',
    difficulty: 2,
    prompt: md`What is meant by turbulence modelling? Name two models.`,
    source: { kind: 'generated' },
    solution: md`Averaging Navier–Stokes (RANS) introduces Reynolds stresses $-\rho\overline{u_i'u_j'}$ as extra unknowns: the closure problem. A turbulence model expresses them in terms of mean quantities, usually through an eddy viscosity. Examples: Prandtl mixing length (zero-equation), k–ε and k–ω (two-equation), Reynolds stress model; LES and DNS resolve eddies directly.`,
  },
  {
    id: 'q-u4-5',
    topicId: 'u4-pipe-losses',
    type: 'derivation',
    difficulty: 2,
    prompt: md`Derive the Darcy–Weisbach equation for the loss of head due to friction in a pipe.`,
    source: { kind: 'textbook', ref: '§10.5', page: 434 },
    solution: md`Horizontal uniform pipe: $h_f = (p_1 - p_2)/\rho g$. Force balance: $(p_1 - p_2)\pi D^2/4 = f'\dfrac{\rho V^2}{2}\pi DL$ ⇒ $p_1 - p_2 = \dfrac{4f'L}{D}\dfrac{\rho V^2}{2}$ ⇒ $h_f = \dfrac{4f'LV^2}{2gD}$.`,
  },
  {
    id: 'q-u4-6',
    topicId: 'u4-pipe-losses',
    type: 'derivation',
    difficulty: 2,
    prompt: md`Derive the expression for the loss of head due to sudden enlargement of a pipe.`,
    source: { kind: 'textbook', ref: '§11.4.1', page: 471 },
    solution: md`Momentum on the CV between 1 and 2 (pressure $p_1$ acts over $A_2$ at section 1): $(p_1 - p_2)A_2 = \rho A_2V_2(V_2 - V_1)$. Energy: $h_e = \dfrac{p_1 - p_2}{\rho g} + \dfrac{V_1^2 - V_2^2}{2g} = \dfrac{V_2^2 - V_1V_2}{g} + \dfrac{V_1^2 - V_2^2}{2g} = \dfrac{(V_1 - V_2)^2}{2g}$.`,
  },
  {
    id: 'q-u4-7',
    topicId: 'u4-pipe-losses',
    type: 'mcq',
    difficulty: 1,
    prompt: md`The loss of head at the exit of a pipe into a large reservoir is`,
    options: ['0.5V²/2g', 'V²/2g', '(V₁ − V₂)²/2g with V₂ = V', 'zero'],
    answer: 1,
    source: { kind: 'textbook', ref: '§11.4.4', page: 482 },
    solution: md`The whole kinetic head is lost at exit: $V^2/2g$.`,
  },
  {
    id: 'q-u4-8',
    topicId: 'u4-series-parallel',
    type: 'numerical',
    difficulty: 2,
    prompt: md`Three pipes of lengths 800 m, 500 m and 400 m and diameters 500 mm, 400 mm and 300 mm are connected in series. Find the diameter of an equivalent pipe of length 1700 m (same f).`,
    source: { kind: 'textbook', ref: 'Problem 11.31', page: 508 },
    solution: md`Dupuit: $\dfrac{1700}{d^5} = \dfrac{800}{0.5^5} + \dfrac{500}{0.4^5} + \dfrac{400}{0.3^5} = 25\,600 + 48\,828 + 164\,609 = 239\,037$ ⇒ $d^5 = 7.112 \times 10^{-3}$ ⇒ $d = 0.373$ m.`,
  },
  {
    id: 'q-u4-9',
    topicId: 'u4-series-parallel',
    type: 'mcq',
    difficulty: 1,
    prompt: md`For pipes connected in parallel,`,
    options: ['the discharge through each pipe is the same', 'the head loss in each pipe is the same', 'the velocity in each pipe is the same', 'the total head loss is the sum of the individual losses'],
    answer: 1,
    source: { kind: 'textbook', ref: '§11.9', page: 508 },
    solution: md`All branches join the same two points, so the head loss is the same; the discharges add.`,
  },
  {
    id: 'q-u4-10',
    topicId: 'u4-smooth-rough',
    type: 'short',
    difficulty: 2,
    prompt: md`Distinguish between hydrodynamically smooth and rough boundaries.`,
    source: { kind: 'textbook', ref: '§10.5.1', page: 441 },
    solution: md`It depends on roughness height $k$ relative to the laminar sub-layer $\delta' = 11.6\nu/u_*$. Smooth: $k/\delta' < 0.25$ (roughness buried in the sub-layer; f depends on Re only). Rough: $k/\delta' > 6$ (roughness pierces the sub-layer, eddies form behind it; f depends on k/D only). In between: transition. A pipe can change from smooth to rough as Re increases.`,
  },
  {
    id: 'q-u4-11',
    topicId: 'u4-smooth-rough',
    type: 'mcq',
    difficulty: 2,
    prompt: md`In the fully rough zone of the Moody chart, the friction factor`,
    options: ['depends only on Reynolds number', 'depends only on relative roughness', 'depends on both Re and k/D', 'equals 64/Re'],
    answer: 1,
    source: { kind: 'generated' },
    solution: md`The curves flatten: $1/\sqrt f = 2\log_{10}(R/k) + 1.74$, independent of Re.`,
  },
]

/* =============================================================================
 * Formulas
 * ========================================================================== */

export const formulas: Formula[] = [
  {
    id: 'f-u4-reynolds-stress',
    topicId: 'u4-turbulence',
    name: 'Turbulent shear stress',
    latex: md`\tau = \mu\frac{d\bar u}{dy} - \rho\,\overline{u'v'}, \qquad \tau_t = \rho\,l^2\left(\frac{d\bar u}{dy}\right)^2`,
    vars: [{ sym: md`l`, meaning: 'mixing length (≈ 0.4y near a wall)', unit: 'm' }],
    conditions: 'Turbulent flow; Prandtl’s hypothesis for the second form.',
    meaning: 'Viscous plus Reynolds stress.',
    important: true,
    ref: { chapter: 10, section: '§10.3–10.4', pages: '437–439' },
  },
  {
    id: 'f-u4-intensity',
    topicId: 'u4-turbulence',
    name: 'Turbulence intensity',
    latex: md`I = \frac{\sqrt{\overline{u'^2}}}{\bar u}`,
    vars: [{ sym: md`u'`, meaning: 'velocity fluctuation', unit: 'm/s' }],
    conditions: 'Statistically steady turbulent flow.',
    meaning: 'Strength of fluctuations relative to the mean.',
  },
  {
    id: 'f-u4-darcy',
    topicId: 'u4-pipe-losses',
    name: 'Darcy–Weisbach',
    latex: md`h_f = \frac{4 f' L V^2}{2 g D} = \frac{f L V^2}{2 g D}`,
    vars: [
      { sym: md`f'`, meaning: 'Bansal’s coefficient of friction', unit: '–' },
      { sym: md`f`, meaning: 'Darcy friction factor = 4f′', unit: '–' },
    ],
    conditions: 'Any steady pipe flow; laminar f = 64/Re.',
    meaning: 'Major (friction) loss.',
    important: true,
    ref: { chapter: 11, section: '§11.3', pages: '466' },
  },
  {
    id: 'f-u4-enlargement',
    topicId: 'u4-pipe-losses',
    name: 'Minor losses',
    latex: md`h_e = \frac{(V_1 - V_2)^2}{2g}, \quad h_c \approx 0.5\frac{V_2^2}{2g}, \quad h_i = 0.5\frac{V^2}{2g}, \quad h_o = \frac{V^2}{2g}`,
    vars: [],
    conditions: 'Sudden enlargement, contraction, entrance, exit.',
    meaning: 'Losses from separation and eddies.',
    important: true,
    ref: { chapter: 11, section: '§11.4', pages: '471–483' },
  },
  {
    id: 'f-u4-dupuit',
    topicId: 'u4-series-parallel',
    name: 'Equivalent pipe (Dupuit)',
    latex: md`\frac{L}{d^5} = \frac{L_1}{d_1^5} + \frac{L_2}{d_2^5} + \frac{L_3}{d_3^5}`,
    vars: [],
    conditions: 'Same friction coefficient, minor losses neglected.',
    meaning: 'A single pipe replacing a series combination.',
    ref: { chapter: 11, section: '§11.8', pages: '507' },
  },
  {
    id: 'f-u4-sublayer',
    topicId: 'u4-smooth-rough',
    name: 'Laminar sub-layer and shear velocity',
    latex: md`\delta' = \frac{11.6\,\nu}{u_*}, \qquad u_* = \sqrt{\frac{\tau_0}{\rho}}`,
    vars: [{ sym: md`\tau_0`, meaning: 'wall shear stress', unit: 'N/m²' }],
    conditions: 'Smooth if k/δ′ < 0.25, rough if > 6.',
    meaning: 'Thickness of the viscous layer at the wall.',
    important: true,
    ref: { chapter: 10, section: '§10.5', pages: '441' },
  },
  {
    id: 'f-u4-colebrook',
    topicId: 'u4-smooth-rough',
    name: 'Colebrook equation (Moody chart)',
    latex: md`\frac{1}{\sqrt f} = -2\log_{10}\left(\frac{k/D}{3.7} + \frac{2.51}{Re\sqrt f}\right)`,
    vars: [{ sym: md`k/D`, meaning: 'relative roughness', unit: '–' }],
    conditions: 'Turbulent flow, commercial pipes.',
    meaning: 'Blends the smooth and fully rough laws; the Moody chart plots it.',
  },
]
