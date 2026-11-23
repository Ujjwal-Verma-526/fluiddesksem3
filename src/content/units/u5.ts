import type { Formula, Question, Topic, WorkedExample } from '../types'

const md = String.raw

/* =============================================================================
 * UNIT 5 — Boundary Layer, Drag & Lift (Bansal Ch. 13–14)
 * ========================================================================== */

export const topics: Topic[] = [
  /* ------------------------------------------------------------------ */
  {
    id: 'u5-bl-concept',
    unitId: 'u5',
    title: 'Boundary layer concept and thicknesses',
    summary: 'Prandtl’s boundary layer idea, laminar, transition and turbulent boundary layers on a flat plate, the laminar sub-layer, and the boundary layer, displacement, momentum and energy thicknesses.',
    syllabusPhrases: ['Boundary layer concept', 'boundary layer thickness, displacement, momentum and energy thickness'],
    coverage: 'full',
    refs: [{ chapter: 13, section: '§13.1–13.2', pages: '611–618' }],
    diagrams: ['bl-growth', 'bl-thicknesses'],
    sections: [
      {
        id: 'concept',
        title: 'The boundary layer (§13.1–13.2)',
        body: md`> [!DEF] Boundary layer
> The thin layer of fluid next to a solid surface in which the velocity rises from zero (no slip) to nearly the free-stream velocity $U$, and in which the velocity gradient, and hence viscous shear, is large.

Prandtl (1904) split a flow past a body into two regions: a thin **boundary layer** where viscosity matters, and the **outer flow** where it can be ignored (ideal-fluid theory applies). This made real flows past bodies solvable.

On a flat plate held parallel to a uniform stream:
- From the leading edge the boundary layer is **laminar** and grows as $\delta \propto \sqrt x$.
- At $Re_x = Ux/\nu \approx 5 \times 10^5$ it becomes unstable: **transition**.
- Beyond it the boundary layer is **turbulent**, thickens faster ($\delta \propto x^{4/5}$), with a thin **laminar sub-layer** next to the wall.

![Growth of the boundary layer on a flat plate](diagram:bl-growth)`,
      },
      {
        id: 'thicknesses',
        title: 'Boundary layer thicknesses (§13.2)',
        body: md`**Boundary layer thickness δ:** the distance from the wall at which $u = 0.99\,U$.

**Displacement thickness δ\*:** the distance by which the wall would have to be moved outward so that an ideal flow carries the same discharge as the real one. It accounts for the mass-flow deficit:
$$\delta^* = \int_0^\delta\left(1 - \frac{u}{U}\right)dy$$

**Momentum thickness θ:** the thickness of a layer of free-stream fluid whose momentum equals the momentum lost in the boundary layer:
$$\theta = \int_0^\delta\frac{u}{U}\left(1 - \frac{u}{U}\right)dy$$

**Energy thickness δ\*\*:** the same idea for kinetic energy:
$$\delta^{**} = \int_0^\delta\frac{u}{U}\left(1 - \frac{u^2}{U^2}\right)dy$$

Always $\delta > \delta^* > \theta$. The **shape factor** $H = \delta^*/\theta$ is 2.59 for the Blasius laminar profile and about 1.3 for turbulent layers; a rising H warns of separation.

![The three integral thicknesses](diagram:bl-thicknesses)`,
      },
    ],
    keyPoints: [
      'Boundary layer: thin region where velocity rises from 0 to U and viscous effects matter.',
      'Laminar up to Re_x ≈ 5 × 10⁵, then transition, then turbulent with a laminar sub-layer.',
      'δ* = ∫(1 − u/U)dy (mass deficit), θ = ∫(u/U)(1 − u/U)dy (momentum deficit), δ** = ∫(u/U)(1 − u²/U²)dy (energy deficit).',
      'δ > δ* > θ; shape factor H = δ*/θ.',
    ],
    flashcards: [
      { id: 'fc-u5-b1', front: 'Define displacement thickness', back: 'Distance the wall must be displaced so ideal flow carries the same discharge: δ* = ∫₀^δ (1 − u/U) dy.' },
      { id: 'fc-u5-b2', front: 'Define momentum thickness', back: 'Thickness of free-stream fluid with momentum equal to the loss in the boundary layer: θ = ∫₀^δ (u/U)(1 − u/U) dy.' },
      { id: 'fc-u5-b3', front: 'Transition Reynolds number on a flat plate', back: 'Re_x ≈ 5 × 10⁵.' },
      { id: 'fc-u5-b4', front: 'Linear profile u/U = y/δ: δ*, θ, δ**', back: 'δ/2, δ/6, δ/4; shape factor 3.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u5-momentum-integral',
    unitId: 'u5',
    title: 'Momentum integral equation and drag on a flat plate',
    summary: 'Von Kármán’s momentum integral equation, its use with assumed velocity profiles, Blasius’ laminar results, the turbulent 1/7-power results and drag on a flat plate.',
    syllabusPhrases: ['Momentum integral equation', 'drag on flat plate'],
    coverage: 'full',
    refs: [{ chapter: 13, section: '§13.3–13.5', pages: '619–647' }],
    sections: [
      {
        id: 'vk',
        title: 'Von Kármán momentum integral equation (§13.3)',
        body: md`Apply the momentum equation to a control volume of length $dx$ spanning the boundary layer on a flat plate (zero pressure gradient). Mass enters at the upstream face, leaves at the downstream face and enters through the top; the only force is the wall shear $\tau_0\,dx$. The result is
$$\frac{\tau_0}{\rho U^2} = \frac{d\theta}{dx}$$
the **von Kármán momentum integral equation**. It holds for laminar and turbulent layers alike: wall shear equals the rate of growth of momentum thickness.

**Procedure with an assumed profile** $u/U = f(\eta)$, $\eta = y/\delta$:
1. Compute θ in terms of δ.
2. Compute $\tau_0 = \mu(\partial u/\partial y)_{y=0}$ in terms of δ.
3. Substitute into the equation, separate and integrate to get $\delta(x)$.
4. Then $\tau_0$, local $c_f = \tau_0/(\tfrac12\rho U^2)$, drag $F_D = \int_0^L\tau_0 b\,dx$ and $C_D = F_D/(\tfrac12\rho AU^2)$.`,
      },
      {
        id: 'results',
        title: 'Results for a flat plate (§13.4–13.5)',
        body: md`| | δ/x | Local $c_f$ | Average $C_D$ |
|---|---|---|---|
| Blasius (exact laminar) | $\dfrac{5}{\sqrt{Re_x}}$ | $\dfrac{0.664}{\sqrt{Re_x}}$ | $\dfrac{1.328}{\sqrt{Re_L}}$ |
| Parabolic profile | $\dfrac{5.48}{\sqrt{Re_x}}$ | $\dfrac{0.730}{\sqrt{Re_x}}$ | $\dfrac{1.46}{\sqrt{Re_L}}$ |
| Sine profile | $\dfrac{4.795}{\sqrt{Re_x}}$ | $\dfrac{0.655}{\sqrt{Re_x}}$ | $\dfrac{1.31}{\sqrt{Re_L}}$ |
| Turbulent, 1/7-power ($5\times10^5 < Re < 10^7$) | $\dfrac{0.37}{Re_x^{1/5}}$ | $\dfrac{0.0576}{Re_x^{1/5}}$ | $\dfrac{0.072}{Re_L^{1/5}}$ |
| Turbulent, $10^7 < Re < 10^9$ | – | – | $\dfrac{0.455}{(\log_{10}Re_L)^{2.58}}$ |

**Drag on one side** of a plate of area $A = bL$:
$$F_D = C_D\cdot\frac12\rho AU^2$$

Laminar drag grows as $U^{1.5}$ and $\sqrt L$; turbulent drag as $U^{1.8}$ and $L^{0.8}$. A mixed plate (laminar then turbulent) is handled by adding the laminar drag up to the transition point to the turbulent drag over the rest.`,
      },
    ],
    derivations: [
      {
        id: 'd-u5-linear',
        title: 'Boundary layer growth for a linear profile',
        goal: md`Use the momentum integral equation with $u/U = y/\delta$ to find δ, $\tau_0$ and $C_D$ for a laminar boundary layer.`,
        assumptions: ['Flat plate, zero pressure gradient', 'Laminar flow', 'Assumed profile u/U = y/δ'],
        steps: [
          { math: md`\theta = \int_0^\delta\frac{y}{\delta}\left(1 - \frac{y}{\delta}\right)dy = \frac{\delta}{6}`, why: md`Momentum thickness of the assumed profile.` },
          { math: md`\tau_0 = \mu\left(\frac{\partial u}{\partial y}\right)_{0} = \frac{\mu U}{\delta}`, why: md`Wall shear from Newton’s law.` },
          { math: md`\frac{\mu U}{\delta\,\rho U^2} = \frac{1}{6}\frac{d\delta}{dx} \;\Rightarrow\; \delta\,d\delta = \frac{6\mu}{\rho U}dx`, why: md`Substitute into $\tau_0/\rho U^2 = d\theta/dx$.` },
          { math: md`\frac{\delta^2}{2} = \frac{6\mu x}{\rho U} \;\Rightarrow\; \frac{\delta}{x} = \frac{3.46}{\sqrt{Re_x}}`, why: md`Integrate with δ = 0 at x = 0.` },
          { math: md`\tau_0 = \frac{\mu U}{\delta} = \frac{0.289\,\rho U^2}{\sqrt{Re_x}}`, why: md`Back-substitute.` },
          { math: md`C_D = \frac{1}{\tfrac12\rho U^2 L}\int_0^L\tau_0\,dx = \frac{1.156}{\sqrt{Re_L}}`, why: md`Average over the plate.` },
        ],
        result: md`\frac{\delta}{x} = \frac{3.46}{\sqrt{Re_x}}, \qquad C_D = \frac{1.156}{\sqrt{Re_L}}`,
        ref: { chapter: 13, section: '§13.3', pages: '619–622' },
      },
    ],
    keyPoints: [
      'Von Kármán: τ₀/(ρU²) = dθ/dx, for laminar and turbulent layers.',
      'Blasius laminar: δ = 5x/√Re_x, C_D = 1.328/√Re_L.',
      'Turbulent (1/7 power): δ = 0.37x/Re_x^{1/5}, C_D = 0.072/Re_L^{1/5}.',
      'Drag on one side: F_D = C_D · ½ρAU².',
    ],
    misconceptions: ['Using Re_x where Re_L is needed for the average drag coefficient.', 'Forgetting that F_D formulas are for one side of the plate.'],
    flashcards: [
      { id: 'fc-u5-m1', front: 'Von Kármán momentum integral equation', back: 'τ₀/(ρU²) = dθ/dx.' },
      { id: 'fc-u5-m2', front: 'Blasius: δ and C_D', back: 'δ = 5x/√Re_x; C_D = 1.328/√Re_L.' },
      { id: 'fc-u5-m3', front: 'Turbulent flat plate (1/7 power law): δ and C_D', back: 'δ = 0.37x/Re_x^{1/5}; C_D = 0.072/Re_L^{1/5}.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u5-separation',
    unitId: 'u5',
    title: 'Boundary layer separation and its control',
    summary: 'Why an adverse pressure gradient makes the boundary layer separate, the separation condition, its effects, and the methods of preventing separation in laminar and turbulent boundary layers.',
    syllabusPhrases: ['Boundary separation'],
    coverage: 'full',
    highlighted: true,
    refs: [{ chapter: 13, section: '§13.6', pages: '648–652' }],
    diagrams: ['bl-separation'],
    sections: [
      {
        id: 'mechanism',
        title: 'Separation (§13.6)',
        body: md`Along a body the pressure can fall downstream (**favourable** gradient, $\partial p/\partial x < 0$) or rise (**adverse** gradient, $\partial p/\partial x > 0$). Fluid in the boundary layer has already lost momentum to friction. In an adverse gradient the slowest fluid near the wall is pushed back by the rising pressure; it stops and then reverses. The boundary layer then detaches from the surface: **separation**.

![Boundary layer separation in an adverse pressure gradient](diagram:bl-separation)

**Condition** (velocity gradient at the wall):
- $\left(\dfrac{\partial u}{\partial y}\right)_{y=0} > 0$: attached
- $= 0$: on the verge of separation (separation point)
- $< 0$: separated (reverse flow)

**Effects:** a large low-pressure **wake** forms behind the body; pressure (form) drag rises sharply; lift falls (an airfoil **stalls**); energy is lost to eddies; in diffusers and pumps efficiency drops.

A **turbulent** boundary layer carries more momentum near the wall, so it resists an adverse gradient longer and separates later than a laminar one. This is why a golf ball’s dimples reduce drag.`,
      },
      {
        id: 'control',
        title: 'Methods of preventing separation (§13.6.3)',
        body: md`> [!EXAM] Asked in 2024 Q3(c): methods of controlling separation in laminar and turbulent boundary layers (2 marks)
> List the methods with one line each. Mention that the aim is to re-energise the slow fluid near the wall or remove it.

1. **Suction of the slow fluid.** Slots or a porous surface remove the low-energy fluid near the wall, so a fresh boundary layer starts behind the slot.
2. **Blowing / injection.** High-velocity fluid is injected tangentially through slots to re-energise the boundary layer.
3. **Rotating boundary (moving wall).** A rotating cylinder in the surface carries the near-wall fluid along, so there is no relative velocity to decay (the principle of the Magnus effect).
4. **Slotted wing / leading-edge slat.** Air from the high-pressure underside flows through a slot to the upper surface and energises its boundary layer, delaying stall.
5. **Streamlining.** A gradually tapering tail keeps the adverse pressure gradient mild.
6. **Tripping to turbulence (for laminar layers).** Vortex generators, roughness strips or dimples make the boundary layer turbulent, and a turbulent layer separates later.
7. **Guide vanes** in bends and diffusers, and **small divergence angles** (5–7°) in diffusers.

For a **laminar** boundary layer, tripping it to turbulence is the main extra method. For a **turbulent** one, suction, blowing and vortex generators are used.`,
      },
    ],
    keyPoints: [
      'Separation needs an adverse pressure gradient (∂p/∂x > 0) plus wall friction.',
      'Separation point: (∂u/∂y)_wall = 0; reverse flow beyond it.',
      'Effects: wake, large pressure drag, stall, losses.',
      'Prevention: suction, blowing, rotating boundary, slots/slats, streamlining, vortex generators, tripping to turbulence.',
      'Turbulent layers separate later than laminar ones.',
    ],
    flashcards: [
      { id: 'fc-u5-s1', front: 'Condition for boundary layer separation', back: '(∂u/∂y) at the wall = 0, in an adverse pressure gradient.' },
      { id: 'fc-u5-s2', front: 'Four methods to prevent separation', back: 'Suction, blowing (injection), rotating boundary, slotted wing; also streamlining and vortex generators.' },
      { id: 'fc-u5-s3', front: 'Why does a turbulent boundary layer separate later?', back: 'Mixing brings high-momentum fluid close to the wall, so it can push further against the rising pressure.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u5-drag-lift',
    unitId: 'u5',
    title: 'Flow around immersed bodies: drag and lift',
    summary: 'Drag and lift forces and their coefficients, pressure and friction drag, streamlined and bluff bodies, drag on a sphere and cylinder, terminal velocity, lift on a rotating cylinder (Magnus effect, Kutta–Joukowski) and on an airfoil.',
    syllabusPhrases: ['Flow around immersed bodies- drag and lift'],
    coverage: 'full',
    refs: [{ chapter: 14, section: '§14.1–14.7', pages: '657–692' }],
    diagrams: ['drag-lift', 'cylinder-circulation'],
    sections: [
      {
        id: 'forces',
        title: 'Drag and lift (§14.1–14.2)',
        body: md`A body in a moving fluid feels pressure normal to its surface and shear tangent to it. Their resultant is split into:
- **Drag** $F_D$: the component **parallel** to the free stream.
- **Lift** $F_L$: the component **perpendicular** to it.

$$F_D = C_D\,A\,\frac{\rho U^2}{2}, \qquad F_L = C_L\,A\,\frac{\rho U^2}{2}$$
where $A$ is the projected area normal to the flow (or the plan area for wings).

![Drag and lift on an inclined body](diagram:drag-lift)

**Components of drag**
- **Friction (skin) drag:** from wall shear stress. Dominates for **streamlined** bodies (thin plates, airfoils at small incidence).
- **Pressure (form) drag:** from the pressure difference between front and wake, caused by separation. Dominates for **bluff** bodies (plates normal to the flow, cylinders, cars).

A **streamlined body** has its surface aligned with the stream lines so separation occurs only at the very tail and the wake is small. A **bluff body** separates early and leaves a wide wake.`,
      },
      {
        id: 'sphere',
        title: 'Drag on a sphere and cylinder (§14.4–14.5)',
        body: md`**Stokes’ law** (sphere, $Re < 0.2$): $F_D = 3\pi\mu Ud$, so $C_D = 24/Re$. Viscous drag is two-thirds friction, one-third pressure.

As Re rises, $C_D$ falls and then levels off around 0.4–0.5 for $10^3 < Re < 2 \times 10^5$ (pressure drag dominant). At $Re \approx 2$–$5 \times 10^5$ the boundary layer becomes turbulent before separating, the separation point moves back, the wake shrinks and $C_D$ drops suddenly to about 0.1–0.2: the **drag crisis**.

**Terminal velocity:** a falling body accelerates until weight = buoyancy + drag:
$$W = F_B + F_D$$
(this is the falling-sphere viscometer of Unit 3).

A long circular cylinder behaves similarly ($C_D \approx 1.2$ before the drag crisis) and sheds alternate vortices, the **Kármán vortex street**, at frequency given by the Strouhal number $St = fd/U \approx 0.2$.`,
      },
      {
        id: 'magnus',
        title: 'Lift on a rotating cylinder: Magnus effect (§14.6)',
        body: md`Ideal flow past a cylinder (uniform flow + doublet) is symmetric, so it gives **no lift and no drag** (d’Alembert’s paradox). Adding a **free vortex** of circulation Γ (equivalent to spinning the cylinder) speeds up the flow on one side and slows it on the other. By Bernoulli the pressure is lower on the faster side, producing a lift:
$$F_L = \rho\,L\,U\,\Gamma \qquad \text{(Kutta–Joukowski)}$$
with $\Gamma = 2\pi R\,u_\theta$, $u_\theta = \omega R$ the surface speed of the rotating cylinder. $C_L = \Gamma/(RU)$.

![Flow past a cylinder with circulation](diagram:cylinder-circulation)

Stagnation points sit where $\sin\theta = \Gamma/(4\pi RU)$. When $\Gamma = 4\pi RU$ they merge at the bottom; for larger Γ the stagnation point leaves the surface.

The **Magnus effect** explains the swerve of a spinning ball and Flettner rotor ships.`,
      },
      {
        id: 'airfoil',
        title: 'Lift on an airfoil (§14.7)',
        body: md`An **airfoil** is a streamlined section (rounded leading edge, sharp trailing edge). Terms: **chord** (leading to trailing edge), **span** (wing length), **angle of attack** α (between the chord and the free stream).

The sharp trailing edge forces the flow to leave smoothly there (**Kutta condition**), which fixes a circulation Γ around the airfoil. Hence lift $F_L = \rho LU\Gamma$, the same as for the spinning cylinder. Thin-airfoil theory gives $C_L = 2\pi\alpha$ (radians) at small α.

$C_L$ rises roughly linearly with α up to about 12–16°; then the boundary layer separates from the upper surface, lift drops and drag rises sharply: **stall**. A good airfoil has a high lift-to-drag ratio $C_L/C_D$.`,
      },
    ],
    keyPoints: [
      'F_D = C_D A ρU²/2 (along the stream); F_L = C_L A ρU²/2 (normal to it).',
      'Friction drag dominates streamlined bodies; pressure drag dominates bluff bodies.',
      'Stokes: F_D = 3πμUd, C_D = 24/Re (Re < 0.2). Drag crisis near Re ≈ 3 × 10⁵.',
      'Kutta–Joukowski: lift per length = ρUΓ. Rotating cylinder Γ = 2πRωR.',
      'Airfoil: C_L ≈ 2πα up to stall at 12–16°.',
    ],
    misconceptions: ['Thinking ideal (inviscid) flow past a cylinder gives drag. It gives none (d’Alembert’s paradox); real drag comes from viscosity and separation.'],
    flashcards: [
      { id: 'fc-u5-d1', front: 'Pressure drag vs friction drag', back: 'Pressure (form) drag from separation and wake, dominant on bluff bodies. Friction (skin) drag from wall shear, dominant on streamlined bodies.' },
      { id: 'fc-u5-d2', front: 'Kutta–Joukowski theorem', back: 'Lift per unit length = ρ U Γ.' },
      { id: 'fc-u5-d3', front: 'Stokes’ law', back: 'F_D = 3πμUd; C_D = 24/Re, for Re < 0.2.' },
      { id: 'fc-u5-d4', front: 'What is stall?', back: 'At high angle of attack the flow separates from the upper surface, lift drops and drag rises.' },
    ],
  },
]

/* =============================================================================
 * Worked examples
 * ========================================================================== */

export const examples: WorkedExample[] = [
  {
    id: 'ex-13-1',
    topicId: 'u5-bl-concept',
    title: 'Thicknesses for a linear velocity profile',
    source: { kind: 'textbook', ref: 'Problem 13.1', page: 616 },
    difficulty: 1,
    statement: md`Find the displacement thickness, the momentum thickness and energy thickness for the velocity distribution in the boundary layer given by $u/U = y/\delta$, where $u$ is the velocity at a distance $y$ from the plate and $u = U$ at $y = \delta$, where δ = boundary layer thickness. Also calculate the value of $\delta^*/\theta$.`,
    given: ['u/U = y/δ'],
    find: ['δ*, θ, δ**, δ*/θ'],
    approach: md`Substitute the profile into the three integrals.`,
    steps: [
      { label: 'Displacement', work: md`$\delta^* = \displaystyle\int_0^\delta\left(1 - \frac y\delta\right)dy = \delta - \frac\delta2 = \frac\delta2$` },
      { label: 'Momentum', work: md`$\theta = \displaystyle\int_0^\delta\left(\frac y\delta - \frac{y^2}{\delta^2}\right)dy = \frac\delta2 - \frac\delta3 = \frac\delta6$` },
      { label: 'Energy', work: md`$\delta^{**} = \displaystyle\int_0^\delta\left(\frac y\delta - \frac{y^3}{\delta^3}\right)dy = \frac\delta2 - \frac\delta4 = \frac\delta4$` },
      { label: 'Shape factor', work: md`$\delta^*/\theta = (\delta/2)/(\delta/6) = 3$` },
    ],
    answer: md`$\delta^* = \delta/2$, $\theta = \delta/6$, $\delta^{**} = \delta/4$, $\delta^*/\theta = 3$`,
    concept: 'Integral thicknesses from an assumed profile.',
  },
  {
    id: 'ex-13-10',
    topicId: 'u5-momentum-integral',
    title: 'Air over a flat plate with a sine profile',
    source: { kind: 'textbook', ref: 'Problem 13.10', page: 635 },
    difficulty: 2,
    statement: md`Air is flowing over a flat plate 500 mm long and 600 mm wide with a velocity of 4 m/s. The kinematic viscosity of air is given as 0.15 × 10⁻⁴ m²/s. Find (i) the boundary layer thickness at the end of the plate, (ii) shear stress at 200 mm from the leading edge and (iii) drag force on one side of the plate. Take the velocity profile over the plate as $u/U = \sin\left(\dfrac{\pi}{2}\dfrac{y}{\delta}\right)$ and density of air 1.24 kg/m³.`,
    given: ['L = 0.5 m, b = 0.6 m, U = 4 m/s', 'ν = 1.5 × 10⁻⁵ m²/s, ρ = 1.24 kg/m³', 'sine profile'],
    find: ['δ at x = L', 'τ₀ at x = 0.2 m', 'F_D (one side)'],
    approach: md`Sine-profile results from the momentum integral: $\delta = 4.795x/\sqrt{Re_x}$, $\tau_0 = 0.327\rho U^2/\sqrt{Re_x}$, $C_D = 1.31/\sqrt{Re_L}$.`,
    steps: [
      { label: 'Re at the end', work: md`$Re_L = 4 \times 0.5/(1.5 \times 10^{-5}) = 1.333 \times 10^5$ (laminar)` },
      { label: '(i) Thickness', work: md`$\delta = \dfrac{4.795 \times 0.5}{\sqrt{1.333 \times 10^5}} = 6.57$ mm` },
      { label: '(ii) Shear at 0.2 m', work: md`$Re_x = 53\,333$; $\tau_0 = \dfrac{0.327 \times 1.24 \times 16}{\sqrt{53\,333}} = 0.0281$ N/m²` },
      { label: '(iii) Drag', work: md`$C_D = 1.31/\sqrt{1.333 \times 10^5} = 0.003588$; $F_D = 0.003588 \times \tfrac12 \times 1.24 \times (0.5 \times 0.6) \times 16 = 0.0107$ N` },
    ],
    answer: md`$\delta = 6.57$ mm; $\tau_0 = 0.0281$ N/m²; $F_D = 0.0107$ N`,
    concept: 'Momentum-integral results for an assumed laminar profile.',
  },
  {
    id: 'ex-13-16',
    topicId: 'u5-momentum-integral',
    title: 'Plate with laminar then turbulent boundary layer',
    source: { kind: 'textbook', ref: 'Problem 13.16', page: 643 },
    difficulty: 3,
    statement: md`Water is flowing over a thin smooth plate of length 4 m and width 2 m at a velocity of 1.0 m/s. If the boundary layer flow changes from laminar to turbulent at a Reynolds number 5 × 10⁵, find (i) the distance from leading edge up to which boundary layer is laminar, (ii) the thickness of the boundary layer at the transition point, and (iii) the drag force on one side of the plate. Take viscosity of water μ = 9.81 × 10⁻⁴ Ns/m².`,
    given: ['L = 4 m, b = 2 m, U = 1 m/s', 'Re_crit = 5 × 10⁵', 'μ = 9.81 × 10⁻⁴ N·s/m², ρ = 1000 kg/m³'],
    find: ['x_cr', 'δ at x_cr', 'F_D'],
    approach: md`Blasius for the laminar part. Turbulent drag on the rest = turbulent drag on the whole plate − turbulent drag on the laminar length.`,
    steps: [
      { label: '(i) Transition point', work: md`$x = \dfrac{5 \times 10^5 \times 9.81 \times 10^{-4}}{1000 \times 1} = 0.4905$ m` },
      { label: '(ii) Thickness', work: md`$\delta = \dfrac{5x}{\sqrt{Re_x}} = \dfrac{5 \times 0.4905}{707.1} = 3.47$ mm` },
      { label: 'Laminar drag (0 to x)', work: md`$C_D = 1.328/707.1 = 0.001878$; $F_1 = 0.001878 \times \tfrac12 \times 1000 \times (2 \times 0.4905) \times 1 = 0.921$ N` },
      { label: 'Turbulent drag (x to L)', work: md`$Re_L = 4.077 \times 10^6$: $C_D = 0.072/Re_L^{0.2} = 0.003430$, $F = 13.72$ N over the whole plate. On the first 0.4905 m (as if turbulent): $C_D = 0.072/(5\times10^5)^{0.2} = 0.005218$, $F = 2.56$ N. Turbulent part $= 13.72 - 2.56 = 11.16$ N` },
      { label: 'Total', work: md`$F_D = 0.92 + 11.16 = 12.08$ N` },
    ],
    answer: md`$x = 490$ mm; $\delta = 3.47$ mm; $F_D \approx 12.1$ N on one side`,
    concept: 'Mixed laminar–turbulent boundary layer on a flat plate.',
    checkNote: md`Parts (i) and (ii) match the book’s working. For (iii) the desk uses the standard “whole plate turbulent minus the laminar length” method; if the book treats the turbulent part differently its figure may differ slightly.`,
  },
  {
    id: 'ex-14-1',
    topicId: 'u5-drag-lift',
    title: 'Lift, drag and power for a moving plate',
    source: { kind: 'textbook', ref: 'Problem 14.1', page: 660 },
    difficulty: 1,
    statement: md`A flat plate 1.5 m × 1.5 m moves at 50 km/hour in stationary air of density 1.15 kg/m³. If the co-efficients of drag and lift are 0.15 and 0.75 respectively, determine: (i) the lift force, (ii) the drag force, (iii) the resultant force, and (iv) the power required to keep the plate in motion.`,
    given: ['A = 2.25 m²', 'U = 50 km/h = 13.89 m/s', 'ρ = 1.15 kg/m³, C_D = 0.15, C_L = 0.75'],
    find: ['F_L, F_D, F_R, P'],
    approach: md`$F = C\,A\,\rho U^2/2$; power = drag × velocity.`,
    steps: [
      { label: 'Dynamic pressure × area', work: md`$A\rho U^2/2 = 2.25 \times 1.15 \times 13.89^2/2 = 249.6$ N` },
      { label: 'Lift and drag', work: md`$F_L = 0.75 \times 249.6 = 187.2$ N; $F_D = 0.15 \times 249.6 = 37.4$ N` },
      { label: 'Resultant', work: md`$F_R = \sqrt{187.2^2 + 37.4^2} = 190.9$ N` },
      { label: 'Power', work: md`$P = F_D U = 37.4 \times 13.89 = 520$ W` },
    ],
    answer: md`$F_L = 187.2$ N, $F_D = 37.4$ N, $F_R = 190.9$ N, $P = 0.52$ kW`,
    concept: 'Only drag absorbs power, because only it acts along the motion.',
  },
  {
    id: 'ex-14-21',
    topicId: 'u5-drag-lift',
    title: 'Rotating cylinder in an air stream',
    source: { kind: 'textbook', ref: 'Problem 14.21', page: 683 },
    difficulty: 2,
    statement: md`A cylinder rotates at 150 r.p.m. with its axis perpendicular to an air stream which is having uniform velocity of 25 m/s. The cylinder is 1.5 m in diameter and 10 m long. Assuming ideal fluid theory, find (i) the circulation, (ii) lift force, and (iii) position of stagnation points. Take density of air as 1.25 kg/m³.`,
    given: ['N = 150 rpm, R = 0.75 m, L = 10 m', 'U = 25 m/s, ρ = 1.25 kg/m³'],
    find: ['Γ, F_L, stagnation points'],
    approach: md`$\Gamma = 2\pi R\,(\omega R)$; Kutta–Joukowski; $\sin\theta = \Gamma/(4\pi RU)$.`,
    steps: [
      { label: 'Surface speed', work: md`$\omega = 15.71$ rad/s, $u_\theta = \omega R = 11.78$ m/s` },
      { label: 'Circulation', work: md`$\Gamma = 2\pi(0.75)(11.78) = 55.52$ m²/s` },
      { label: 'Lift', work: md`$F_L = \rho LU\Gamma = 1.25 \times 10 \times 25 \times 55.52 = 17\,349$ N` },
      { label: 'Stagnation points', work: md`$\sin\theta = \dfrac{55.52}{4\pi(0.75)(25)} = 0.2356$ ⇒ $\theta = 13.6°$; the two points lie at $180° + 13.6° = 193.6°$ and $360° - 13.6° = 346.4°$, i.e. 13.6° below the horizontal on each side` },
    ],
    answer: md`$\Gamma = 55.5$ m²/s; $F_L \approx 17.35$ kN; stagnation points 13.6° below the horizontal diameter`,
    concept: 'Magnus effect via Kutta–Joukowski.',
  },
]

/* =============================================================================
 * Questions
 * ========================================================================== */

export const questions: Question[] = [
  {
    id: 'q-u5-1',
    topicId: 'u5-bl-concept',
    type: 'short',
    difficulty: 1,
    prompt: md`Define boundary layer thickness, displacement thickness and momentum thickness.`,
    source: { kind: 'textbook', ref: '§13.2', page: 613 },
    solution: md`δ: distance from the wall where $u = 0.99U$. δ\*: distance the wall must be displaced so ideal flow gives the same discharge, $\int_0^\delta(1 - u/U)dy$. θ: thickness of free-stream fluid with momentum equal to the momentum lost, $\int_0^\delta\frac uU(1 - \frac uU)dy$.`,
  },
  {
    id: 'q-u5-2',
    topicId: 'u5-bl-concept',
    type: 'numerical',
    difficulty: 2,
    prompt: md`For the velocity profile $u/U = 2(y/\delta) - (y/\delta)^2$, find δ\*/δ, θ/δ and the shape factor.`,
    source: { kind: 'textbook', ref: 'Problem 13.2', page: 617 },
    solution: md`With $\eta = y/\delta$: $\delta^*/\delta = \int_0^1(1 - 2\eta + \eta^2)d\eta = 1/3$. $\theta/\delta = \int_0^1(2\eta - \eta^2)(1 - 2\eta + \eta^2)d\eta = 2/15$. $H = (1/3)/(2/15) = 2.5$.`,
  },
  {
    id: 'q-u5-3',
    topicId: 'u5-momentum-integral',
    type: 'derivation',
    difficulty: 3,
    prompt: md`State von Kármán’s momentum integral equation. Using the linear profile $u/U = y/\delta$, find the boundary layer thickness and the drag coefficient for a flat plate.`,
    source: { kind: 'generated' },
    solution: md`$\tau_0/\rho U^2 = d\theta/dx$. Linear profile: $\theta = \delta/6$, $\tau_0 = \mu U/\delta$. So $\delta\,d\delta = 6\nu\,dx/U$ ⇒ $\delta = 3.46x/\sqrt{Re_x}$. $\tau_0 = 0.289\rho U^2/\sqrt{Re_x}$; $C_D = 1.156/\sqrt{Re_L}$.`,
  },
  {
    id: 'q-u5-4',
    topicId: 'u5-momentum-integral',
    type: 'mcq',
    difficulty: 1,
    prompt: md`According to Blasius, the laminar boundary layer thickness on a flat plate varies as`,
    options: ['x', 'x^{1/2}', 'x^{4/5}', 'x²'],
    answer: 1,
    source: { kind: 'textbook', ref: '§13.4', page: 624 },
    solution: md`$\delta = 5x/\sqrt{Re_x} = 5\sqrt{\nu x/U}$ ⇒ $\delta \propto \sqrt x$. (Turbulent: $x^{4/5}$.)`,
  },
  {
    id: 'q-u5-5',
    topicId: 'u5-separation',
    type: 'short',
    difficulty: 1,
    prompt: md`What is boundary layer separation? What are the methods of preventing it?`,
    source: { kind: 'textbook', ref: '§13.6', page: 648 },
    solution: md`In an adverse pressure gradient the slow fluid near the wall is decelerated to rest and then reversed, so the boundary layer leaves the surface; $(\partial u/\partial y)_0 = 0$ at the separation point. Prevention: suction of slow fluid, blowing/injection, rotating boundary, slotted wings/slats, streamlining, vortex generators, tripping a laminar layer to turbulence.`,
  },
  {
    id: 'q-u5-6',
    topicId: 'u5-separation',
    type: 'mcq',
    difficulty: 1,
    prompt: md`Boundary layer separation takes place when`,
    options: ['the pressure gradient is zero', 'the pressure decreases in the direction of flow', 'the pressure increases in the direction of flow and the wall velocity gradient becomes zero', 'the flow becomes turbulent'],
    answer: 2,
    source: { kind: 'textbook', ref: '§13.6.1', page: 648 },
    solution: md`Separation needs an adverse gradient; the separation point is where $(\partial u/\partial y)_{y=0} = 0$.`,
  },
  {
    id: 'q-u5-7',
    topicId: 'u5-drag-lift',
    type: 'short',
    difficulty: 1,
    prompt: md`Distinguish between pressure drag and friction drag, and between streamlined and bluff bodies.`,
    source: { kind: 'textbook', ref: '§14.2–14.3', page: 658 },
    solution: md`Friction drag comes from wall shear; pressure drag from the pressure difference between front and wake, caused by separation. Streamlined bodies follow the stream lines, separate only at the tail, have small wakes and mostly friction drag. Bluff bodies separate early, have wide wakes and mostly pressure drag.`,
  },
  {
    id: 'q-u5-8',
    topicId: 'u5-drag-lift',
    type: 'mcq',
    difficulty: 2,
    prompt: md`The lift per unit length on a rotating cylinder in a uniform stream is`,
    options: ['ρUΓ', 'ρU²Γ', 'ρΓ/U', '½ρU²Γ'],
    answer: 0,
    source: { kind: 'textbook', ref: '§14.6', page: 680 },
    solution: md`Kutta–Joukowski: $F_L/L = \rho U\Gamma$.`,
  },
  {
    id: 'q-u5-9',
    topicId: 'u5-drag-lift',
    type: 'numerical',
    difficulty: 2,
    prompt: md`A truck with a projected area of 6.5 m² travels at 70 km/h with a drag coefficient of 0.45. Find the power required to overcome the drag. Take ρ_air = 1.2 kg/m³.`,
    source: { kind: 'generated' },
    solution: md`$U = 19.44$ m/s. $F_D = 0.45 \times 6.5 \times 1.2 \times 19.44^2/2 = 663.6$ N. $P = F_DU = 12.9$ kW.`,
  },
]

/* =============================================================================
 * Formulas
 * ========================================================================== */

export const formulas: Formula[] = [
  {
    id: 'f-u5-thicknesses',
    topicId: 'u5-bl-concept',
    name: 'Displacement, momentum and energy thickness',
    latex: md`\delta^* = \int_0^\delta\!\left(1 - \frac uU\right)dy, \quad \theta = \int_0^\delta\!\frac uU\left(1 - \frac uU\right)dy, \quad \delta^{**} = \int_0^\delta\!\frac uU\left(1 - \frac{u^2}{U^2}\right)dy`,
    vars: [{ sym: md`U`, meaning: 'free-stream velocity', unit: 'm/s' }],
    conditions: 'Any boundary layer profile.',
    meaning: 'Mass, momentum and kinetic-energy deficits expressed as thicknesses.',
    important: true,
    ref: { chapter: 13, section: '§13.2', pages: '613–615' },
  },
  {
    id: 'f-u5-vk',
    topicId: 'u5-momentum-integral',
    name: 'Von Kármán momentum integral',
    latex: md`\frac{\tau_0}{\rho U^2} = \frac{d\theta}{dx}`,
    vars: [{ sym: md`\tau_0`, meaning: 'wall shear stress', unit: 'N/m²' }],
    conditions: 'Flat plate, zero pressure gradient; laminar or turbulent.',
    meaning: 'Wall shear equals the growth rate of momentum thickness.',
    important: true,
    ref: { chapter: 13, section: '§13.3', pages: '619–621' },
  },
  {
    id: 'f-u5-blasius',
    topicId: 'u5-momentum-integral',
    name: 'Flat-plate boundary layer (Blasius and turbulent)',
    latex: md`\frac{\delta}{x} = \frac{5}{\sqrt{Re_x}},\; C_D = \frac{1.328}{\sqrt{Re_L}} \qquad \frac{\delta}{x} = \frac{0.37}{Re_x^{1/5}},\; C_D = \frac{0.072}{Re_L^{1/5}}`,
    vars: [{ sym: md`Re_x`, meaning: 'Ux/ν', unit: '–' }],
    conditions: 'Laminar Re < 5 × 10⁵; turbulent 5 × 10⁵ < Re < 10⁷.',
    meaning: 'Thickness and average drag coefficient on a flat plate.',
    important: true,
    ref: { chapter: 13, section: '§13.4–13.5', pages: '624, 639' },
  },
  {
    id: 'f-u5-drag',
    topicId: 'u5-drag-lift',
    name: 'Drag and lift',
    latex: md`F_D = C_D A\frac{\rho U^2}{2}, \qquad F_L = C_L A\frac{\rho U^2}{2}`,
    vars: [{ sym: md`A`, meaning: 'projected area', unit: 'm²' }],
    conditions: 'Any immersed body.',
    meaning: 'Force components parallel and normal to the stream.',
    important: true,
    ref: { chapter: 14, section: '§14.2', pages: '658' },
  },
  {
    id: 'f-u5-kj',
    topicId: 'u5-drag-lift',
    name: 'Kutta–Joukowski and rotating cylinder',
    latex: md`F_L = \rho L U\Gamma, \qquad \Gamma = 2\pi R\,(\omega R), \qquad \sin\theta_s = \frac{\Gamma}{4\pi R U}`,
    vars: [{ sym: md`\Gamma`, meaning: 'circulation', unit: 'm²/s' }],
    conditions: 'Ideal flow past a cylinder with circulation.',
    meaning: 'Lift from circulation; position of stagnation points.',
    ref: { chapter: 14, section: '§14.6', pages: '677–683' },
  },
  {
    id: 'f-u5-stokes',
    topicId: 'u5-drag-lift',
    name: 'Stokes’ law',
    latex: md`F_D = 3\pi\mu U d, \qquad C_D = \frac{24}{Re}`,
    vars: [{ sym: md`d`, meaning: 'sphere diameter', unit: 'm' }],
    conditions: 'Re < 0.2.',
    meaning: 'Creeping-flow drag on a sphere.',
    ref: { chapter: 14, section: '§14.4', pages: '671' },
  },
]
