import type { Formula, Question, Topic, WorkedExample } from '../types'

const md = String.raw

/* =============================================================================
 * UNIT 1 — Fluid Properties, Statics & Kinematics (Bansal Ch. 1–5)
 * ========================================================================== */

export const topics: Topic[] = [
  /* ------------------------------------------------------------------ */
  {
    id: 'u1-properties',
    unitId: 'u1',
    title: 'Fluids, continuum and fluid properties',
    summary: 'What a fluid is, the continuum idea, density, specific weight, viscosity and Newton’s law, surface tension, capillarity, compressibility and vapour pressure.',
    syllabusPhrases: ['Types of fluid and flow', 'continuum', 'fluid properties'],
    coverage: 'partial',
    coverageNote: 'Properties are §1.2–1.7 (pp. 1–34). The book never defines the continuum hypothesis, so that paragraph is supplementary.',
    refs: [{ chapter: 1, section: '§1.1–1.7', pages: '1–34' }],
    diagrams: ['newton-viscosity', 'fluid-types'],
    sections: [
      {
        id: 'fluid',
        title: 'What is a fluid? (§1.1)',
        body: md`> [!DEF] Fluid
> A substance that **deforms continuously** under the action of a shear stress, however small. A solid resists a shear stress by a static deformation; a fluid cannot.

Liquids and gases are both fluids. A liquid has a definite volume and a free surface; a gas fills its container. A fluid at rest therefore carries **no shear stress**: only normal stress (pressure) acts on it. That single fact is the basis of all of fluid statics.`,
      },
      {
        id: 'continuum',
        title: 'Continuum hypothesis',
        supplementary: true,
        body: md`> [!SUPP] Not in Bansal
> The syllabus names “continuum”; Bansal assumes it without stating it.

A fluid is made of molecules with empty space between them, but in engineering we treat it as a **continuum**: matter spread continuously, so that density, velocity and pressure have a definite value at every *point* and vary smoothly.

The idea holds when the smallest length we care about is much larger than the **mean free path** λ of the molecules. The ratio is the **Knudsen number**:
$$Kn = \frac{\lambda}{L}$$
Continuum mechanics is valid for $Kn < 0.01$. It fails in rarefied gases (very high altitude, vacuum systems) and in micro-channels, where molecular effects matter.

> [!EXAM]
> A 2-mark answer: definition, the condition $L \gg \lambda$ (or $Kn \ll 1$), and one example where it fails.`,
      },
      {
        id: 'basic',
        title: 'Density, specific weight, specific volume, specific gravity (§1.2)',
        body: md`| Property | Definition | Unit | Water (4 °C) |
|---|---|---|---|
| Mass density $\rho$ | mass / volume | kg/m³ | 1000 |
| Specific weight $w$ | weight / volume $= \rho g$ | N/m³ | 9810 |
| Specific volume $v$ | volume / mass $= 1/\rho$ | m³/kg | 0.001 |
| Specific gravity $S$ | $\rho_{\text{fluid}}/\rho_{\text{water}}$ (gases: vs air) | – | 1 |

So an oil of $S = 0.9$ has $\rho = 900$ kg/m³ and $w = 8829$ N/m³. Mercury has $S = 13.6$.`,
      },
      {
        id: 'viscosity',
        title: 'Viscosity and Newton’s law of viscosity (§1.3)',
        body: md`> [!DEF] Viscosity
> The property of a fluid that offers resistance to the movement of one layer of fluid over another adjacent layer.

Consider two layers $dy$ apart moving with velocities $u$ and $u + du$. The shear stress between them is proportional to the **rate of shear strain** $du/dy$:
$$\tau = \mu \frac{du}{dy}$$
This is **Newton’s law of viscosity**. $\mu$ is the coefficient of dynamic viscosity.

![Velocity gradient between a fixed and a moving plate](diagram:newton-viscosity)

**Units.** SI: N·s/m² = Pa·s. CGS: **poise** = dyne·s/cm². **1 poise = 0.1 N·s/m²**.

**Kinematic viscosity** $\nu = \mu/\rho$, unit m²/s. CGS unit **stoke** = cm²/s, so **1 stoke = 10⁻⁴ m²/s**.

**Effect of temperature (§1.3.4).** Liquid viscosity *falls* as temperature rises: it comes from cohesion between molecules, which weakens. Gas viscosity *rises*: it comes from molecular momentum exchange, which grows with temperature.

**Types of fluid (§1.3.5)**, by how τ depends on du/dy:
- **Ideal fluid** – no viscosity (imaginary).
- **Real fluid** – has viscosity.
- **Newtonian** – τ ∝ du/dy (water, air, thin oils).
- **Non-Newtonian** – τ not proportional to du/dy (paints, blood, polymer solutions).
- **Ideal plastic** – has a yield stress, then τ ∝ du/dy (Bingham plastic, toothpaste).

![Shear stress vs velocity gradient for different fluids](diagram:fluid-types)

> [!EXAM]
> “Shaft in sleeve” problems: velocity of shaft surface $u = \pi D N/60$, $\tau = \mu u/t$ with $t$ = film thickness, force $F = \tau \cdot \pi D L$, torque $T = F D/2$, power $P = 2\pi N T/60$.`,
      },
      {
        id: 'surface',
        title: 'Surface tension, capillarity, compressibility, vapour pressure (§1.5–1.7)',
        body: md`**Surface tension** σ (N/m) is the tensile force per unit length acting along the free surface of a liquid. It comes from unbalanced cohesion at the surface. Pressure excess inside:
- droplet: $p = \dfrac{4\sigma}{d}$
- soap bubble (two surfaces): $p = \dfrac{8\sigma}{d}$
- liquid jet: $p = \dfrac{2\sigma}{d}$

**Capillarity** is the rise or fall of liquid in a thin tube. Balancing surface tension around the rim against the weight of the raised column:
$$h = \frac{4\sigma\cos\theta}{\rho g d}$$
Water wets glass ($\theta \approx 0$) and rises. Mercury ($\theta \approx 130°$) is depressed.

**Compressibility** is the reciprocal of the bulk modulus, $K = -\dfrac{dp}{dV/V}$. For water, $K \approx 2.06 \times 10^9$ N/m², which is why liquids are treated as incompressible.

**Vapour pressure** is the partial pressure of the vapour above a liquid in equilibrium. If the local pressure in a flowing liquid drops to it, vapour bubbles form and then collapse violently where the pressure rises again. This is **cavitation**, which pits turbine runners and pump impellers.`,
      },
    ],
    keyPoints: [
      'A fluid deforms continuously under any shear stress, so a fluid at rest has no shear stress.',
      'Newton’s law of viscosity: τ = μ du/dy. 1 poise = 0.1 N·s/m², 1 stoke = 10⁻⁴ m²/s.',
      'Viscosity of liquids falls with temperature; viscosity of gases rises.',
      'Capillary rise h = 4σ cosθ/(ρ g d). Droplet Δp = 4σ/d, bubble 8σ/d, jet 2σ/d.',
      'Continuum: properties are defined at a point when L ≫ mean free path (Kn < 0.01).',
    ],
    misconceptions: [
      'Kinematic viscosity is not “viscosity in motion”; it is μ/ρ, a diffusivity of momentum in m²/s.',
      'Using rpm directly in u = ωr. Convert first: ω = 2πN/60.',
    ],
    flashcards: [
      { id: 'fc-u1-p1', front: 'Newton’s law of viscosity', back: 'τ = μ du/dy: shear stress is proportional to the rate of shear strain.' },
      { id: 'fc-u1-p2', front: '1 poise = ? N·s/m²; 1 stoke = ? m²/s', back: '1 poise = 0.1 N·s/m²; 1 stoke = 1 cm²/s = 10⁻⁴ m²/s.' },
      { id: 'fc-u1-p3', front: 'Why does liquid viscosity fall with temperature but gas viscosity rise?', back: 'Liquids: viscosity comes from cohesion, which weakens with heat. Gases: it comes from molecular momentum transfer, which grows with heat.' },
      { id: 'fc-u1-p4', front: 'Capillary rise formula', back: 'h = 4σ cosθ /(ρ g d).' },
      { id: 'fc-u1-p5', front: 'Continuum hypothesis holds when…', back: 'The characteristic length is much larger than the molecular mean free path (Knudsen number < 0.01).' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u1-pressure-manometry',
    unitId: 'u1',
    title: 'Pressure variation and hydrostatic manometry',
    summary: 'Pascal’s law, the hydrostatic law, absolute and gauge pressure, and every kind of manometer: piezometer, U-tube, single-column, differential and inverted differential.',
    syllabusPhrases: ['Pressure variation in a static fluid', 'hydrostatic manometry'],
    coverage: 'full',
    highlighted: true,
    refs: [{ chapter: 2, section: '§2.1–2.7', pages: '35–56' }],
    diagrams: ['u-tube-manometer', 'diff-manometer'],
    sections: [
      {
        id: 'pascal',
        title: 'Pascal’s law and the hydrostatic law (§2.2–2.3)',
        body: md`**Pascal’s law:** the intensity of pressure at a point in a static fluid is the same in all directions. (Bansal proves it with a wedge-shaped element: with no shear stress, the forces on the three faces balance only if $p_x = p_y = p_z$.)

**Hydrostatic law.** For a small vertical prism of fluid at rest, the pressure force difference on its ends balances its weight:
$$\frac{\partial p}{\partial z} = -\rho g \qquad\Rightarrow\qquad p = \rho g h$$
with $h$ the depth below the free surface. Pressure increases linearly with depth and does not depend on the shape of the container. $h = p/\rho g$ is called the **pressure head**.`,
      },
      {
        id: 'abs-gauge',
        title: 'Absolute, gauge, atmospheric and vacuum pressure (§2.4)',
        body: md`$$p_{\text{abs}} = p_{\text{atm}} + p_{\text{gauge}}, \qquad p_{\text{vacuum}} = p_{\text{atm}} - p_{\text{abs}}$$
Standard atmosphere: 101.325 kN/m² = 10.3 m of water = 760 mm of mercury. Gauges and manometers read **gauge** pressure (relative to the atmosphere); a negative gauge reading is a **vacuum**.`,
      },
      {
        id: 'manometers',
        title: 'Manometers: definition and classification (§2.5–2.7)',
        body: md`> [!DEF] Manometer
> A device that measures pressure at a point by **balancing the column of fluid against the same or another column of fluid**.

**Classification**

| Type | Measures | Use |
|---|---|---|
| **Simple manometers** | pressure at one point | |
| — Piezometer | small *positive* gauge pressure in liquids | simplest; useless for gases or vacuum, needs a tall tube for large pressure |
| — U-tube manometer | high positive *or* negative pressure, liquids and gases | a heavy liquid (mercury) keeps the tube short |
| — Single-column (micrometer) | small pressure changes | reservoir area ≫ tube area, so only one reading is needed; the inclined form magnifies the reading |
| **Differential manometers** | *difference* of pressure between two points | |
| — U-tube differential | large differences | heavier gauge liquid (mercury) below |
| — Inverted U-tube differential | small differences | lighter gauge liquid (oil, air) above |

**Mechanical gauges** (Bourdon tube, diaphragm, bellows, dead-weight) are used for high pressures where liquid columns would be impractically long.`,
      },
      {
        id: 'u-tube',
        title: 'Working rule: equate pressures on a horizontal datum',
        body: md`Points at the same level in the **same continuous liquid** are at the same pressure. So: pick a datum through the lower interface, write the pressure in each limb at that datum, and equate.

![Simple U-tube manometer](diagram:u-tube-manometer)

**U-tube, positive pressure.** Pipe fluid $\rho_1$, gauge liquid $\rho_2$, $h_1$ = height of pipe centre above datum, $h_2$ = rise of gauge liquid in the open limb:
$$p + \rho_1 g h_1 = \rho_2 g h_2 \quad\Rightarrow\quad p = \rho_2 g h_2 - \rho_1 g h_1$$
**U-tube, vacuum:** $p = -(\rho_2 g h_2 + \rho_1 g h_1)$.

**Single-column manometer.** When the reservoir level falls by $\Delta h$, the tube reading rises by $h_2$ with $A\,\Delta h = a\, h_2$. Then
$$p = \frac{a}{A}h_2(\rho_2 g - \rho_1 g) + h_2\rho_2 g - h_1\rho_1 g$$
and if $A \gg a$, the first term is dropped.`,
      },
      {
        id: 'differential',
        title: 'Differential manometer (§2.7)',
        body: md`> [!EXAM] Asked in 2024 Q1(b)
> “What is manometer. Classify U-tube & manometers along with utility. Also describe a differential manometer.” Give the definition, the classification table, then the sketch and equation below. 2 marks: about 1 for classification with uses, 1 for the differential manometer.

A **differential manometer** measures the difference of pressure between two points A and B in a pipe, or in two different pipes. It is a U-tube with a heavy gauge liquid (usually mercury), each limb joined to one point.

![U-tube differential manometer](diagram:diff-manometer)

**A and B at different levels, different liquids.** Datum X–X through the lower mercury surface; $h$ = difference of mercury levels, $x$ = height of A’s liquid above the datum, $y$ = height of B’s liquid above the higher mercury surface:
$$p_A + \rho_1 g (h + x) = p_B + \rho_g g h + \rho_2 g y$$
$$\Rightarrow\quad p_A - p_B = h g(\rho_g - \rho_1) + \rho_2 g y - \rho_1 g x$$
**Same level, same liquid** $\rho_1$: $\;p_A - p_B = g h(\rho_g - \rho_1)$.

**Inverted U-tube differential manometer.** A light liquid (or air) sits on top. Datum through the lower interface:
$$p_A - \rho_1 g h_1 = p_B - \rho_2 g h_2 - \rho_s g h$$
It is used where the pressure difference is small; the light liquid gives a bigger reading for the same $\Delta p$.`,
      },
    ],
    keyPoints: [
      'Pascal’s law: pressure at a point in a static fluid is equal in all directions.',
      'Hydrostatic law: dp/dz = −ρg, so p = ρgh below a free surface.',
      'Manometer = balances a fluid column against the pressure. Simple: piezometer, U-tube, single-column. Differential: U-tube, inverted U-tube.',
      'Rule: points at the same level in the same continuous liquid are at equal pressure. Write both limbs at a datum and equate.',
      'Differential manometer, same level and same liquid: p_A − p_B = gh(ρ_g − ρ₁).',
    ],
    misconceptions: [
      'The datum must lie in one continuous liquid. Equating pressures across an interface of different liquids at the same level is wrong.',
      'Forgetting the column of pipe liquid above the mercury in each limb.',
    ],
    flashcards: [
      { id: 'fc-u1-m1', front: 'State Pascal’s law', back: 'The intensity of pressure at a point in a static fluid is equal in all directions.' },
      { id: 'fc-u1-m2', front: 'Piezometer limitation', back: 'Only small positive gauge pressures in liquids. It cannot measure vacuum or gas pressure, and needs a very tall tube for high pressure.' },
      { id: 'fc-u1-m3', front: 'When is an inverted U-tube differential manometer used?', back: 'For small pressure differences. A light liquid (oil or air) on top gives a larger reading.' },
      { id: 'fc-u1-m4', front: 'Differential manometer, A and B at the same level, same liquid ρ₁', back: 'p_A − p_B = g h (ρ_g − ρ₁).' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u1-hydrostatic-forces',
    unitId: 'u1',
    title: 'Hydrostatic forces on plane and curved surfaces',
    summary: 'Total pressure and centre of pressure on vertical, horizontal and inclined plane surfaces; proof that the centre of pressure lies below the centroid; horizontal and vertical components on curved surfaces.',
    syllabusPhrases: ['forces on planes and curved surfaces'],
    coverage: 'full',
    highlighted: true,
    refs: [{ chapter: 3, section: '§3.1–3.6', pages: '69–107' }],
    diagrams: ['centre-of-pressure', 'curved-surface'],
    sections: [
      {
        id: 'definitions',
        title: 'Total pressure and centre of pressure (§3.2)',
        body: md`> [!DEF] Total pressure
> The force exerted by a static fluid on a surface, always acting **normal** to the surface.

> [!DEF] Centre of pressure
> The point on the surface through which the resultant total pressure acts.

For **any** plane surface, at **any** inclination:
$$F = \rho g A \bar h$$
where $\bar h$ is the depth of the **centroid** below the free surface. The total force equals the pressure at the centroid times the area.`,
      },
      {
        id: 'vertical',
        title: 'Vertical plane surface: depth of the centre of pressure (§3.3)',
        body: md`Take a vertical plane of area $A$, centroid at depth $\bar h$. A thin strip at depth $h$, width $b$, height $dh$ feels $dF = \rho g h\, b\, dh$.

The moment of the total force about the free-surface line equals the sum of the moments of the strip forces:
$$F\,h^* = \int \rho g h^2\, b\, dh = \rho g I_O$$
where $I_O = \int h^2 dA$ is the second moment of area about the free-surface line. By the parallel-axis theorem $I_O = I_G + A\bar h^2$, so
$$h^* = \frac{\rho g (I_G + A\bar h^2)}{\rho g A\bar h} = \bar h + \frac{I_G}{A\bar h}$$

![Pressure on a vertical plane and the centre of pressure](diagram:centre-of-pressure)

> [!EXAM] Asked in 2024 Q1(a): prove the centre of pressure is always below the centre of gravity
> From $h^* = \bar h + \dfrac{I_G}{A\bar h}$: $I_G$ is a second moment of area, so $I_G > 0$; $A > 0$; and $\bar h > 0$ for a submerged surface. Hence $\dfrac{I_G}{A\bar h} > 0$ and $h^* > \bar h$.
>
> **Physical reason:** pressure grows with depth, so the lower half of the surface carries more force than the upper half. The resultant is pulled below the centroid.
>
> As the surface goes deeper ($\bar h \to \infty$), $I_G/A\bar h \to 0$ and the centre of pressure approaches the centroid. For a **horizontal** surface the pressure is uniform, so the two coincide.

Useful $I_G$ values: rectangle $bd^3/12$; circle $\pi d^4/64$; triangle $bh^3/36$.`,
      },
      {
        id: 'inclined',
        title: 'Inclined plane surface (§3.5)',
        body: md`For a plane inclined at θ to the free surface, measure distances **along the plane** and convert ($h = y\sin\theta$). The force is still $F = \rho g A\bar h$, and
$$h^* = \bar h + \frac{I_G \sin^2\theta}{A\bar h}$$
θ = 90° gives back the vertical case; θ = 0 (horizontal) gives $h^* = \bar h$.`,
      },
      {
        id: 'curved',
        title: 'Curved surfaces (§3.6)',
        body: md`On a curved surface the elemental forces change direction, so they cannot simply be added. Resolve them:

- **Horizontal component** $F_x$ = force on the **vertical projection** of the curved surface: $F_x = \rho g A_{\text{proj}}\bar h$, acting through the centre of pressure of that projection.
- **Vertical component** $F_y$ = **weight of the liquid** lying vertically above the curved surface up to the free surface (real or imaginary), acting through its centre of gravity.

$$F = \sqrt{F_x^2 + F_y^2}, \qquad \tan\theta = \frac{F_y}{F_x}$$

![Components of hydrostatic force on a curved surface](diagram:curved-surface)

If the liquid is *below* the curved surface, $F_y$ equals the weight of the **imaginary** liquid that would fill the space above it, and acts upward. For a circular surface every elemental force passes through the centre, so the resultant does too.`,
      },
    ],
    derivations: [
      {
        id: 'd-u1-cp',
        title: 'Depth of centre of pressure on a vertical plane',
        goal: md`Show that the resultant force on a vertical plane acts at $h^* = \bar h + I_G/(A\bar h)$, and hence below the centroid.`,
        assumptions: ['Fluid at rest, incompressible', 'Free surface at atmospheric pressure (gauge p = 0)', 'Plane surface of area A, centroid at depth h̄'],
        steps: [
          { math: md`dF = \rho g h \,(b\,dh)`, why: md`Force on a thin horizontal strip of width $b$ at depth $h$: pressure × area.` },
          { math: md`F = \int \rho g h\,dA = \rho g \int h\,dA = \rho g A\bar h`, why: md`$\int h\,dA$ is the first moment of area about the free surface, equal to $A\bar h$.` },
          { math: md`F h^* = \int h\,dF = \rho g \int h^2\,dA = \rho g\, I_O`, why: md`Moment of the resultant about the free-surface line = sum of the strip moments.` },
          { math: md`I_O = I_G + A\bar h^2`, why: md`Parallel-axis theorem.` },
          { math: md`h^* = \frac{\rho g (I_G + A\bar h^2)}{\rho g A \bar h} = \bar h + \frac{I_G}{A\bar h}`, why: md`Divide by $F$.` },
          { math: md`\frac{I_G}{A\bar h} > 0 \;\Rightarrow\; h^* > \bar h`, why: md`Every term is positive, so the centre of pressure is always below the centroid. The gap shrinks with depth.` },
        ],
        result: md`h^* = \bar h + \frac{I_G}{A\bar h}`,
        ref: { chapter: 3, section: '§3.3', pages: '69–72' },
      },
    ],
    keyPoints: [
      'Total pressure on any plane: F = ρ g A h̄ (pressure at the centroid × area).',
      'Vertical plane: h* = h̄ + I_G/(A h̄). Inclined: h* = h̄ + I_G sin²θ/(A h̄).',
      'Centre of pressure is always below the centroid because I_G/(A h̄) > 0; it approaches the centroid as depth increases.',
      'Curved surface: F_x = force on vertical projection; F_y = weight of liquid above the surface; F = √(F_x² + F_y²).',
    ],
    misconceptions: [
      'Using the depth of the centre of pressure (not the centroid) to compute the force.',
      'Applying I_G about the base instead of the centroidal axis parallel to the free surface.',
    ],
    flashcards: [
      { id: 'fc-u1-h1', front: 'Depth of centre of pressure, vertical plane', back: 'h* = h̄ + I_G/(A h̄).' },
      { id: 'fc-u1-h2', front: 'Why is the centre of pressure below the centroid?', back: 'Pressure increases with depth, so the lower part carries more force. Mathematically I_G/(A h̄) > 0.' },
      { id: 'fc-u1-h3', front: 'Vertical component of force on a curved surface', back: 'Weight of the liquid (real or imaginary) vertically above the surface up to the free surface.' },
      { id: 'fc-u1-h4', front: 'I_G for a circle and a triangle', back: 'Circle πd⁴/64; triangle bh³/36 (about centroidal axis parallel to base).' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u1-buoyancy-stability',
    unitId: 'u1',
    title: 'Buoyancy and stability of floating and submerged bodies',
    summary: 'Archimedes’ principle, centre of buoyancy, metacentre, metacentric height by the analytical (BM = I/V) and experimental methods, and the conditions of stability.',
    syllabusPhrases: ['stability of submerged and floating bodies'],
    coverage: 'full',
    highlighted: true,
    refs: [{ chapter: 4, section: '§4.1–4.9', pages: '131–158' }],
    diagrams: ['metacentre', 'gm-experiment'],
    sections: [
      {
        id: 'buoyancy',
        title: 'Buoyancy and centre of buoyancy (§4.2–4.3)',
        body: md`> [!DEF] Buoyancy
> The upward force exerted by a fluid on a body immersed in it, equal to the **weight of fluid displaced** (Archimedes).

> [!DEF] Centre of buoyancy (B)
> The point through which the buoyant force acts: the **centre of gravity of the displaced volume** of fluid.

A body floats when its weight equals the buoyant force. Then $\rho_{\text{body}} V = \rho_{\text{fluid}} V_{\text{immersed}}$, so the fraction immersed is $S_{\text{body}}/S_{\text{fluid}}$.`,
      },
      {
        id: 'metacentre',
        title: 'Metacentre and metacentric height (§4.4–4.5)',
        body: md`When a floating body is tilted through a small angle θ, the shape of the displaced volume changes, so B moves to a new position B′. The vertical through B′ cuts the original vertical axis (through B and G) at **M**.

> [!DEF] Metacentre (M)
> The point about which a floating body starts oscillating when given a small angular displacement: the intersection of the line of buoyancy after tilting with the body’s original axis.

> [!DEF] Metacentric height (GM)
> The distance between the centre of gravity G and the metacentre M.

![Metacentre of a tilted floating body](diagram:metacentre)`,
      },
      {
        id: 'analytical',
        title: 'Analytical method: BM = I/V (§4.6)',
        body: md`> [!EXAM] Asked in 2024 Q1(c): derive analytically and experimentally the metacentric height
> Give the analytical derivation (below, in the Derivations tab) **and** the experimental method in the next section. 3 marks: about 2 for the analytical proof, 1 for the experiment.

Tilting through θ lifts a wedge out of the water on one side and immerses an equal wedge on the other. Take a strip of the water-line plane at distance $x$ from the axis O, length $L$, width $dx$. Its wedge has height $x\theta$, so its volume is $x\theta L\,dx$ and the buoyant force on it is $\rho g\, x\theta\, dA$.

The two wedges form a couple that moves the buoyant force from B to B′. Its moment is
$$\int \rho g\, x\theta\, dA \cdot x = \rho g \theta \int x^2 dA = \rho g\theta\, I$$
where $I$ is the second moment of the **water-line area** about the tilt axis (the longitudinal axis, which gives the least $I$).

The same moment is produced by shifting the whole buoyant force $\rho g V$ through $BB' = BM\,\theta$:
$$\rho g V \cdot BM\,\theta = \rho g \theta I \quad\Rightarrow\quad BM = \frac{I}{V}$$
$$GM = BM - BG = \frac{I}{V} - BG$$
Take BG positive when G lies above B (the usual case); if G is below B, $GM = I/V + BG$.`,
      },
      {
        id: 'experimental',
        title: 'Experimental method (§4.8)',
        body: md`A known weight $w_1$ is moved across the deck through a distance $x$. The body (total weight $W$, including $w_1$) tilts through θ, measured with a plumb line and scale. G moves to G₁, and the new vertical through B₁ passes through M.

![Experimental determination of GM](diagram:gm-experiment)

Moment of shifting the weight = moment of the buoyancy couple:
$$w_1 x = W \cdot GM \tan\theta \quad\Rightarrow\quad GM = \frac{w_1 x}{W\tan\theta}$$
The experiment is done on the actual ship, so GM is measured, not estimated. Bansal works it in Problem 4.19.`,
      },
      {
        id: 'stability',
        title: 'Conditions of equilibrium (§4.7)',
        body: md`**Submerged body** (B fixed relative to the body, since the displaced volume does not change shape):
- **Stable** if B is **above** G
- **Unstable** if B is below G
- **Neutral** if B and G coincide

**Floating body** (B shifts on tilting, M matters):
- **Stable** if M is **above** G (GM > 0): the couple restores the body
- **Unstable** if M is below G (GM < 0): the couple overturns it
- **Neutral** if M coincides with G (GM = 0)

**Rolling period (§4.9):** $T = 2\pi\sqrt{\dfrac{k^2}{GM\, g}}$, with $k$ the radius of gyration. A large GM is very stable but rolls fast and uncomfortably; passenger ships use a smaller GM.`,
      },
    ],
    derivations: [
      {
        id: 'd-u1-bm',
        title: 'Metacentric radius BM = I/V',
        goal: md`Find the metacentric height of a floating body from its geometry.`,
        assumptions: ['Small angle of heel θ', 'Weight and displaced volume V unchanged on tilting', 'Wall-sided body near the water line'],
        steps: [
          { math: md`dV = (x\theta)\,dA`, why: md`An element of the water-line plane at distance $x$ from the tilt axis sweeps a prism of height $x\theta$.` },
          { math: md`dF_B = \rho g\,x\theta\,dA`, why: md`Extra buoyancy on the immersing side (and equal loss on the emerging side).` },
          { math: md`M_{\text{couple}} = \int \rho g\,x\theta\,dA\cdot x = \rho g\theta \int x^2\,dA = \rho g\theta I`, why: md`The two wedges form a couple; $I$ is the second moment of the water-line area about the tilt axis.` },
          { math: md`M_{\text{couple}} = \rho g V \cdot BB' = \rho g V \cdot BM\,\theta`, why: md`The same moment shifts the total buoyancy from B to B′, with $BB' = BM\,\theta$ for small θ.` },
          { math: md`BM = \frac{I}{V}`, why: md`Equate the two expressions.` },
          { math: md`GM = \frac{I}{V} - BG`, why: md`G above B (usual case). Stable if GM > 0.` },
        ],
        result: md`GM = \frac{I}{V} - BG`,
        ref: { chapter: 4, section: '§4.6', pages: '137–138' },
      },
      {
        id: 'd-u1-gm-exp',
        title: 'Metacentric height by experiment',
        goal: md`Find GM from the heel produced by moving a known weight across the deck.`,
        steps: [
          { math: md`\text{overturning moment} = w_1 x`, why: md`A weight $w_1$ moved a distance $x$ across the deck.` },
          { math: md`GG_1 = \frac{w_1 x}{W}`, why: md`The centre of gravity of the whole body ($W$) shifts by this amount.` },
          { math: md`GG_1 = GM\tan\theta`, why: md`From the triangle G–G₁–M after heeling to the new equilibrium angle θ.` },
          { math: md`GM = \frac{w_1 x}{W\tan\theta}`, why: md`Combine the two expressions for GG₁.` },
        ],
        result: md`GM = \frac{w_1 x}{W \tan\theta}`,
        ref: { chapter: 4, section: '§4.8', pages: '154–155' },
      },
    ],
    keyPoints: [
      'Buoyant force = weight of fluid displaced; it acts at B, the centroid of the displaced volume.',
      'Metacentre M: intersection of the line of buoyancy after a small tilt with the body’s axis.',
      'Analytical: BM = I/V, GM = I/V − BG (I of the water-line area about the tilt axis).',
      'Experimental: GM = w₁x/(W tanθ).',
      'Floating body stable if M is above G; submerged body stable if B is above G.',
    ],
    misconceptions: [
      'Using the I of the whole cross-section instead of the water-line plane.',
      'Using the total volume of the body instead of the immersed volume V.',
    ],
    flashcards: [
      { id: 'fc-u1-b1', front: 'Define metacentric height', back: 'The distance GM between the centre of gravity and the metacentre of a floating body.' },
      { id: 'fc-u1-b2', front: 'Analytical formula for GM', back: 'GM = I/V − BG, where I is the second moment of the water-line area about the tilt axis and V the immersed volume.' },
      { id: 'fc-u1-b3', front: 'Experimental formula for GM', back: 'GM = w₁ x /(W tan θ).' },
      { id: 'fc-u1-b4', front: 'Stability conditions, floating body', back: 'Stable: M above G. Unstable: M below G. Neutral: M at G.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u1-kinematics',
    unitId: 'u1',
    title: 'Describing fluid motion: flow types, flow lines, continuity, acceleration',
    summary: 'Lagrangian and Eulerian descriptions; steady, uniform, laminar, compressible and rotational flow; stream, path and streak lines; the continuity equation in 1-D and 3-D; local and convective acceleration.',
    syllabusPhrases: [
      'General description of fluid motion',
      'steady flow, uniform flow',
      'stream, streak and path lines',
      'Lagrangian and Eulerian approach',
      'Continuity equation, particle acceleration',
    ],
    coverage: 'partial',
    coverageNote: 'Bansal §5.1–5.7 (pp. 163–181). Streak lines appear only in the end-of-chapter questions, so their definition here is supplementary.',
    refs: [{ chapter: 5, section: '§5.1–5.7', pages: '163–181' }],
    diagrams: ['flow-lines'],
    sections: [
      {
        id: 'methods',
        title: 'Lagrangian and Eulerian descriptions (§5.2)',
        body: md`**Lagrangian method:** follow a single fluid particle and record its position, velocity and acceleration as it moves. It is like tracking one car through a city.

**Eulerian method:** fix a point in space and record the velocity, pressure and density of whatever particle happens to be there, as functions of $(x, y, z, t)$. It is like watching one traffic junction.

Fluid mechanics almost always uses the **Eulerian** method: velocity is a field $\vec V(x, y, z, t)$.`,
      },
      {
        id: 'types',
        title: 'Types of flow (§5.3)',
        body: md`| Pair | Definition |
|---|---|
| **Steady / unsteady** | Steady: properties at a point do not change with time, $\partial V/\partial t = 0$. |
| **Uniform / non-uniform** | Uniform: velocity does not change with position at a given time, $\partial V/\partial s = 0$. |
| **Laminar / turbulent** | Laminar: particles move in smooth layers. Turbulent: particles move in zig-zag, eddying paths (pipe flow: Re < 2000 laminar, > 4000 turbulent). |
| **Compressible / incompressible** | Incompressible: ρ = constant (liquids; gases at low Mach number). |
| **Rotational / irrotational** | Rotational: particles rotate about their own mass centres. |
| **1-D, 2-D, 3-D** | Number of space coordinates the velocity depends on. |

Steady flow through a tapering pipe is **steady and non-uniform**. Flow in a long straight pipe of constant section, with the valve being opened, is **unsteady and uniform**.`,
      },
      {
        id: 'lines',
        title: 'Stream lines, path lines and streak lines',
        supplementary: true,
        body: md`> [!SUPP] Streak line not defined in Bansal
> The book defines the stream line and path line in its kinematics chapter but leaves the streak line to the review questions. The definition below is standard.

- **Path line:** the actual path traced by **one** particle over a period of time.
- **Stream line:** an imaginary line drawn in the flow **at an instant** such that the velocity at every point on it is **tangent** to it. Equation: $\dfrac{dx}{u} = \dfrac{dy}{v} = \dfrac{dz}{w}$. No flow crosses a stream line, and two stream lines never intersect.
- **Streak line:** the locus, at an instant, of **all particles that have passed through a fixed point**. Dye injected continuously at one point traces a streak line.
- **Stream tube:** a tube whose surface is made of stream lines. Fluid cannot cross its wall.

![Path line, stream lines and streak line](diagram:flow-lines)

> [!EXAM]
> In **steady** flow the stream line, path line and streak line through a point all coincide. In unsteady flow they differ.`,
      },
      {
        id: 'continuity',
        title: 'Continuity equation (§5.5–5.6)',
        body: md`Conservation of mass. For steady flow through a stream tube or pipe:
$$\rho_1 A_1 V_1 = \rho_2 A_2 V_2 \qquad \text{(incompressible: } A_1V_1 = A_2V_2 = Q\text{)}$$

**3-D continuity (Cartesian).** Mass flux into a fluid element $dx\,dy\,dz$ minus mass flux out equals the rate of increase of mass inside. In the x-direction the net outflow is $\dfrac{\partial(\rho u)}{\partial x}dx\,dy\,dz$, and likewise for y and z. Hence
$$\frac{\partial\rho}{\partial t} + \frac{\partial(\rho u)}{\partial x} + \frac{\partial(\rho v)}{\partial y} + \frac{\partial(\rho w)}{\partial z} = 0$$
- Steady compressible: drop $\partial\rho/\partial t$.
- Incompressible (steady or not): $\dfrac{\partial u}{\partial x} + \dfrac{\partial v}{\partial y} + \dfrac{\partial w}{\partial z} = 0$.

A velocity field is a **physically possible** incompressible flow only if it satisfies this.`,
      },
      {
        id: 'acceleration',
        title: 'Velocity and acceleration (§5.7)',
        body: md`With $u = u(x, y, z, t)$, the acceleration of a particle is the **total (material) derivative**:
$$a_x = \frac{Du}{Dt} = \underbrace{u\frac{\partial u}{\partial x} + v\frac{\partial u}{\partial y} + w\frac{\partial u}{\partial z}}_{\text{convective}} + \underbrace{\frac{\partial u}{\partial t}}_{\text{local}}$$
and similarly for $a_y$, $a_z$.

- **Local (temporal) acceleration** $\partial u/\partial t$: due to change with time at a point. Zero in steady flow.
- **Convective acceleration**: due to the particle moving to a place where the velocity is different. Zero in uniform flow.

Flow through a converging nozzle at constant discharge has convective but no local acceleration.`,
      },
    ],
    derivations: [
      {
        id: 'd-u1-continuity',
        title: 'Continuity equation in Cartesian coordinates',
        goal: md`Derive the general continuity equation for a 3-D flow.`,
        assumptions: ['Fluid is a continuum', 'Elemental parallelepiped dx dy dz fixed in space'],
        steps: [
          { math: md`\dot m_{x,\text{in}} = \rho u\, dy\,dz`, why: md`Mass entering the face at $x$ per unit time.` },
          { math: md`\dot m_{x,\text{out}} = \left[\rho u + \frac{\partial(\rho u)}{\partial x}dx\right]dy\,dz`, why: md`Mass leaving the face at $x + dx$ (first two Taylor terms).` },
          { math: md`\text{net out}_x = \frac{\partial(\rho u)}{\partial x}\,dx\,dy\,dz`, why: md`Subtract. Similar terms for y and z.` },
          { math: md`-\frac{\partial\rho}{\partial t}\,dx\,dy\,dz = \left[\frac{\partial(\rho u)}{\partial x} + \frac{\partial(\rho v)}{\partial y} + \frac{\partial(\rho w)}{\partial z}\right]dx\,dy\,dz`, why: md`Net outflow equals the rate of decrease of mass in the element.` },
          { math: md`\frac{\partial \rho}{\partial t} + \frac{\partial(\rho u)}{\partial x} + \frac{\partial(\rho v)}{\partial y} + \frac{\partial(\rho w)}{\partial z} = 0`, why: md`Divide by the element volume.` },
          { math: md`\frac{\partial u}{\partial x} + \frac{\partial v}{\partial y} + \frac{\partial w}{\partial z} = 0`, why: md`For an incompressible fluid ρ is constant.` },
        ],
        result: md`\frac{\partial \rho}{\partial t} + \nabla\cdot(\rho\vec V) = 0`,
        ref: { chapter: 5, section: '§5.6', pages: '170–171' },
      },
    ],
    keyPoints: [
      'Eulerian = fields at fixed points (used in fluid mechanics); Lagrangian = follow a particle.',
      'Steady: ∂/∂t = 0. Uniform: ∂/∂s = 0.',
      'In steady flow, stream, path and streak lines coincide.',
      'Incompressible continuity: ∂u/∂x + ∂v/∂y + ∂w/∂z = 0; 1-D: A₁V₁ = A₂V₂.',
      'Acceleration = local (∂u/∂t) + convective (u ∂u/∂x + v ∂u/∂y + w ∂u/∂z).',
    ],
    flashcards: [
      { id: 'fc-u1-k1', front: 'Stream line vs streak line', back: 'Stream line: tangent to velocity at an instant. Streak line: locus of all particles that have passed through one fixed point (dye trace). They coincide in steady flow.' },
      { id: 'fc-u1-k2', front: 'Local vs convective acceleration', back: 'Local: ∂V/∂t, change with time at a point. Convective: change due to moving to a place of different velocity.' },
      { id: 'fc-u1-k3', front: 'Continuity, incompressible 3-D', back: '∂u/∂x + ∂v/∂y + ∂w/∂z = 0.' },
      { id: 'fc-u1-k4', front: 'Lagrangian vs Eulerian', back: 'Lagrangian follows individual particles; Eulerian describes the field at fixed points in space.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u1-potential-functions',
    unitId: 'u1',
    title: 'Rotation, stream function, velocity potential, flow nets and circulation',
    summary: 'Rotation and vorticity; the stream function ψ and velocity potential φ, their properties and relation (Cauchy–Riemann); flow nets; circulation.',
    syllabusPhrases: ['rotational and irrotational flow', 'stream function', 'velocity potential function, flow nets', 'circulation'],
    coverage: 'full',
    highlighted: true,
    refs: [
      { chapter: 5, section: '§5.8–5.9', pages: '181–193' },
      { chapter: 5, section: '§5.16', pages: '219–221' },
    ],
    diagrams: ['flow-net-3xy'],
    sections: [
      {
        id: 'rotation',
        title: 'Rotation and vorticity (§5.9)',
        body: md`A fluid element can translate, deform linearly, deform angularly (shear) and rotate. The **rotation** about the z-axis is the average angular velocity of two perpendicular sides:
$$\omega_z = \frac{1}{2}\left(\frac{\partial v}{\partial x} - \frac{\partial u}{\partial y}\right)$$
and similarly $\omega_x = \tfrac12(\partial w/\partial y - \partial v/\partial z)$, $\omega_y = \tfrac12(\partial u/\partial z - \partial w/\partial x)$.

**Vorticity** is twice the rotation: $\Omega = 2\omega$.

> [!DEF] Irrotational flow
> All rotation components are zero: particles do not spin about their own centres. For 2-D flow, $\dfrac{\partial v}{\partial x} = \dfrac{\partial u}{\partial y}$.`,
      },
      {
        id: 'phi',
        title: 'Velocity potential function φ (§5.8.1)',
        body: md`> [!DEF] Velocity potential
> A scalar function of space and time whose negative derivative in any direction gives the velocity in that direction.

Bansal’s sign convention:
$$u = -\frac{\partial\phi}{\partial x}, \qquad v = -\frac{\partial\phi}{\partial y}, \qquad w = -\frac{\partial\phi}{\partial z}$$

**Properties**
- φ exists **only for irrotational flow.** Substituting into $\omega_z$ gives $\tfrac12(-\phi_{yx} + \phi_{xy}) = 0$ automatically.
- If φ satisfies the **Laplace equation** $\nabla^2\phi = 0$, the flow is a possible incompressible flow (continuity is satisfied).
- Lines of constant φ are **equipotential lines**.

> [!NOTE] Sign convention
> Many other books use $u = +\partial\phi/\partial x$. Either is accepted if stated. This desk follows Bansal.`,
      },
      {
        id: 'psi',
        title: 'Stream function ψ (§5.8.2)',
        body: md`> [!DEF] Stream function
> A scalar function of space and time whose partial derivative with respect to any direction gives the velocity component at **right angles** (counter-clockwise) to that direction. Defined for **2-D** flow.

Bansal’s convention:
$$u = -\frac{\partial\psi}{\partial y}, \qquad v = \frac{\partial\psi}{\partial x}$$

**Properties**
- ψ automatically satisfies 2-D continuity, so it exists for **every** 2-D incompressible flow, rotational or not.
- Lines of constant ψ are **stream lines** (along one, $d\psi = v\,dx - u\,dy = 0$ gives $dy/dx = v/u$).
- The **difference of ψ between two stream lines equals the discharge** per unit depth between them.
- If ψ satisfies $\nabla^2\psi = 0$ the flow is **irrotational**, since $\omega_z = \tfrac12\nabla^2\psi$.`,
      },
      {
        id: 'relation',
        title: 'Relation between φ and ψ; equipotential lines and flow net (§5.8.3–5.8.6)',
        body: md`Equating the two expressions for $u$ and $v$:
$$\frac{\partial\phi}{\partial x} = \frac{\partial\psi}{\partial y}, \qquad \frac{\partial\phi}{\partial y} = -\frac{\partial\psi}{\partial x}$$
These are the **Cauchy–Riemann equations**.

Slope of an equipotential line: $dy/dx = -u/v$. Slope of a stream line: $dy/dx = v/u$. Their product is $-1$, so **stream lines and equipotential lines are mutually perpendicular**.

> [!DEF] Flow net
> The grid of stream lines and equipotential lines drawn for a 2-D irrotational flow. They cut at right angles and form approximately square cells.

Uses: finding velocity and pressure distributions in a given geometry (seepage under dams, flow around bodies), locating separation zones, and designing boundary shapes. Limitations: only for irrotational (ideal) flow, so not near walls where viscosity dominates or in wakes.

![Flow net for ψ = 3xy](diagram:flow-net-3xy)

> [!EXAM] Asked in 2024 Q5(a): ψ = 3xy, show irrotational and find φ (4 marks)
> $u = -\partial\psi/\partial y = -3x$, $\;v = \partial\psi/\partial x = 3y$.
>
> Rotation: $\omega_z = \tfrac12(\partial v/\partial x - \partial u/\partial y) = \tfrac12(0 - 0) = 0$ ⇒ irrotational. (Also $\nabla^2\psi = 0 + 0 = 0$.)
>
> φ: $\partial\phi/\partial x = -u = 3x$ ⇒ $\phi = \tfrac32x^2 + f(y)$. Then $\partial\phi/\partial y = f'(y) = -v = -3y$ ⇒ $f = -\tfrac32y^2 + C$.
> $$\phi = \tfrac32(x^2 - y^2) + C$$
> This is flow in a 90° corner (stagnation-point flow). With the other sign convention, $u = 3x$, $v = -3y$ and $\phi = \tfrac32(x^2 - y^2)$ as well.`,
      },
      {
        id: 'circulation',
        title: 'Circulation',
        body: md`> [!DEF] Circulation (Γ)
> The line integral of the tangential velocity component around a closed curve:
> $$\Gamma = \oint \vec V\cdot d\vec s = \oint (u\,dx + v\,dy)$$

For a small rectangle $dx\,dy$, adding the four sides gives
$$\Gamma = \left(\frac{\partial v}{\partial x} - \frac{\partial u}{\partial y}\right)dx\,dy = \Omega_z\,dA$$
so **circulation per unit area = vorticity** (Stokes’ theorem). For an irrotational flow the circulation around any closed curve not enclosing a singularity is zero.

For a **free vortex**, $v_\theta = C/r$, and the circulation around any circle centred on it is $\Gamma = 2\pi r\cdot C/r = 2\pi C$, the same for every circle, even though the flow is irrotational everywhere except at the centre (§5.16). Circulation around a body is what produces **lift** (Kutta–Joukowski, Unit 5).`,
      },
    ],
    derivations: [
      {
        id: 'd-u1-psi-phi',
        title: 'Stream lines are perpendicular to equipotential lines',
        goal: md`Show that a stream line ψ = const and an equipotential line φ = const cross at right angles.`,
        steps: [
          { math: md`d\phi = \frac{\partial\phi}{\partial x}dx + \frac{\partial\phi}{\partial y}dy = -u\,dx - v\,dy`, why: md`Total differential of φ with Bansal’s convention.` },
          { math: md`d\phi = 0 \Rightarrow \left(\frac{dy}{dx}\right)_\phi = -\frac{u}{v}`, why: md`Along an equipotential line φ is constant.` },
          { math: md`d\psi = \frac{\partial\psi}{\partial x}dx + \frac{\partial\psi}{\partial y}dy = v\,dx - u\,dy`, why: md`Total differential of ψ.` },
          { math: md`d\psi = 0 \Rightarrow \left(\frac{dy}{dx}\right)_\psi = \frac{v}{u}`, why: md`Along a stream line ψ is constant.` },
          { math: md`\left(\frac{dy}{dx}\right)_\phi \cdot \left(\frac{dy}{dx}\right)_\psi = -\frac{u}{v}\cdot\frac{v}{u} = -1`, why: md`Product of slopes is −1, so the lines are orthogonal.` },
        ],
        result: md`\text{stream lines} \perp \text{equipotential lines}`,
        ref: { chapter: 5, section: '§5.8.5', pages: '184' },
      },
    ],
    keyPoints: [
      'Bansal: u = −∂φ/∂x = −∂ψ/∂y; v = −∂φ/∂y = ∂ψ/∂x.',
      'φ exists only for irrotational flow; ψ exists for any 2-D incompressible flow.',
      'ψ satisfies continuity automatically; ∇²ψ = 0 ⇒ irrotational. φ is irrotational automatically; ∇²φ = 0 ⇒ continuity.',
      'ψ₂ − ψ₁ = discharge per unit depth between two stream lines.',
      'Stream lines ⟂ equipotential lines (Cauchy–Riemann). Their grid is the flow net.',
      'Circulation Γ = ∮V·ds; circulation per unit area = vorticity.',
    ],
    misconceptions: [
      'Claiming the stream function exists only for irrotational flow. That is the velocity potential.',
      'Mixing sign conventions between u and v in one answer. State the convention once and keep it.',
    ],
    flashcards: [
      { id: 'fc-u1-f1', front: 'Condition for irrotational 2-D flow', back: '∂v/∂x − ∂u/∂y = 0 (equivalently ∇²ψ = 0).' },
      { id: 'fc-u1-f2', front: 'Velocity components from ψ (Bansal)', back: 'u = −∂ψ/∂y, v = ∂ψ/∂x.' },
      { id: 'fc-u1-f3', front: 'Physical meaning of ψ₂ − ψ₁', back: 'Volume flow rate per unit depth between the two stream lines.' },
      { id: 'fc-u1-f4', front: 'Cauchy–Riemann equations', back: '∂φ/∂x = ∂ψ/∂y and ∂φ/∂y = −∂ψ/∂x.' },
      { id: 'fc-u1-f5', front: 'ψ = 3xy: φ = ?', back: 'φ = (3/2)(x² − y²); the flow is irrotational (corner flow).' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u1-simple-flows',
    unitId: 'u1',
    title: 'Simple flows: uniform, source, sink, vortex, doublet; free and forced vortex',
    summary: 'The building blocks of potential flow and their ψ and φ, superposition (Rankine half-body, flow past a cylinder), and the free and forced vortex with their pressure and free-surface profiles.',
    syllabusPhrases: ['simple flows', 'source, sink, vortex, doublet', 'free and forced vortex'],
    coverage: 'full',
    refs: [
      { chapter: 5, section: '§5.10', pages: '193–210' },
      { chapter: 5, section: '§5.11–5.17', pages: '210–252' },
    ],
    diagrams: ['simple-flows', 'vortex-profiles'],
    sections: [
      {
        id: 'elementary',
        title: 'Elementary potential flows (§5.13–5.16)',
        body: md`All are irrotational, so each has both ψ and φ, and they can be **added** (superposed) because Laplace’s equation is linear.

| Flow | Velocity | ψ | φ |
|---|---|---|---|
| Uniform, along x | $u = U$ | $-Uy$ | $-Ux$ |
| Source, strength $q$ (m²/s) | $u_r = \dfrac{q}{2\pi r}$ | $\dfrac{q}{2\pi}\theta$ | $-\dfrac{q}{2\pi}\ln r$ |
| Sink | $u_r = -\dfrac{q}{2\pi r}$ | $-\dfrac{q}{2\pi}\theta$ | $\dfrac{q}{2\pi}\ln r$ |
| Free vortex, circulation Γ | $u_\theta = \dfrac{\Gamma}{2\pi r}$ | $-\dfrac{\Gamma}{2\pi}\ln r$ | $-\dfrac{\Gamma}{2\pi}\theta$ |
| Doublet, strength μ | – | $-\dfrac{\mu\sin\theta}{2\pi r}$ | $\dfrac{\mu\cos\theta}{2\pi r}$ |

(Signs follow Bansal’s convention, ψ positive counter-clockwise. The magnitudes are what examiners check.)

![Stream lines of the elementary flows](diagram:simple-flows)

- **Source:** fluid issues radially outward from a point (a line, in 2-D). Stream lines are radial lines, equipotentials are circles.
- **Sink:** the reverse, flow radially inward.
- **Doublet:** a source and a sink of equal strength brought infinitely close, keeping $q \times$ spacing constant. Stream lines are circles tangent to the x-axis at the origin.
- **Superposition:** uniform flow + source = **Rankine half-body**. Uniform flow + source + sink = **Rankine oval**. Uniform flow + doublet = **flow past a circular cylinder** of radius $R = \sqrt{\mu/2\pi U}$. Add a free vortex as well and the cylinder gets lift (Magnus effect).`,
      },
      {
        id: 'forced',
        title: 'Forced vortex (§5.10.1, §5.10.4)',
        body: md`> [!DEF] Forced vortex
> The fluid mass rotates as a **solid body** under a constant external torque: $v = \omega r$. Examples: liquid in a vessel rotated about its vertical axis; flow inside a centrifugal pump casing at no flow.

Equation of motion for vortex flow: in the radial direction the pressure gradient supplies the centripetal force, and vertically it supports the weight:
$$\frac{\partial p}{\partial r} = \rho\frac{v^2}{r}, \qquad \frac{\partial p}{\partial z} = -\rho g$$
With $v = \omega r$ and integrating between two points:
$$(p_2 - p_1) = \frac{\rho\omega^2}{2}(r_2^2 - r_1^2) - \rho g(z_2 - z_1)$$
On the free surface ($p_1 = p_2$) with point 1 on the axis:
$$z = \frac{\omega^2 r^2}{2g}$$
The free surface is a **paraboloid**. The forced vortex is **rotational**: $\Omega_z = 2\omega$.

> [!EXAM]
> Rise of liquid at the walls above the original level equals the fall at the centre (Problem 5.20). The volume of a paraboloid is half that of its circumscribing cylinder.`,
      },
      {
        id: 'free',
        title: 'Free vortex (§5.10.2)',
        body: md`> [!DEF] Free vortex
> The fluid rotates with **no external torque**, so angular momentum is conserved: $v r = C$. Examples: whirlpool, flow into a sink or drain, flow in a centrifugal pump casing outside the impeller, flow round a river bend.

Since there is no energy input, Bernoulli’s equation holds between any two points:
$$\frac{p_1}{\rho g} + \frac{v_1^2}{2g} + z_1 = \frac{p_2}{\rho g} + \frac{v_2^2}{2g} + z_2$$
The free surface is a **hyperbola of revolution**, $z = H - \dfrac{C^2}{2gr^2}$: very deep near the axis. The free vortex is **irrotational** everywhere except at the centre, where $v \to \infty$.

![Free-surface shapes of forced and free vortex](diagram:vortex-profiles)

| | Forced vortex | Free vortex |
|---|---|---|
| Torque | constant external torque | none |
| Velocity | $v = \omega r$ | $v = C/r$ |
| Rotationality | rotational | irrotational (except the core) |
| Surface | paraboloid | hyperbolic |
| Energy | varies across stream lines | Bernoulli holds throughout |`,
      },
    ],
    keyPoints: [
      'Source: u_r = q/(2πr), ψ = qθ/2π. Free vortex: u_θ = Γ/(2πr).',
      'Doublet = source and sink brought together. Uniform + doublet = flow past a cylinder.',
      'Forced vortex: v = ωr, rotational, paraboloid surface z = ω²r²/2g.',
      'Free vortex: vr = constant, irrotational, Bernoulli applies across stream lines.',
      'Potential flows can be superposed because Laplace’s equation is linear.',
    ],
    flashcards: [
      { id: 'fc-u1-s1', front: 'Forced vortex: velocity law and surface', back: 'v = ωr (solid-body rotation); surface is a paraboloid z = ω²r²/2g.' },
      { id: 'fc-u1-s2', front: 'Free vortex: velocity law and an example', back: 'vr = constant; whirlpool or flow into a drain.' },
      { id: 'fc-u1-s3', front: 'Which vortex is irrotational?', back: 'The free vortex (except at its centre). The forced vortex has vorticity 2ω.' },
      { id: 'fc-u1-s4', front: 'Uniform flow + doublet gives…', back: 'Potential flow past a circular cylinder.' },
    ],
  },
]

/* =============================================================================
 * Worked examples
 * ========================================================================== */

export const examples: WorkedExample[] = [
  {
    id: 'ex-1-32',
    topicId: 'u1-properties',
    title: 'Power lost in oil between a shaft and sleeve',
    source: { kind: 'textbook', ref: 'Problem 1.32', page: 28 },
    difficulty: 1,
    statement: md`An oil of viscosity 5 poise is used for lubrication between a shaft and sleeve. The diameter of the shaft is 0.5 m and it rotates at 200 r.p.m. Calculate the power lost in oil for a sleeve length of 100 mm. The thickness of oil film is 1.0 mm.`,
    given: ['μ = 5 poise = 0.5 N·s/m²', 'D = 0.5 m, N = 200 rpm', 'L = 0.1 m, t = 1.0 mm'],
    find: ['Power lost P'],
    approach: md`Newton’s law of viscosity with a linear velocity profile across the thin film: $\tau = \mu u/t$. Then force → torque → power.`,
    steps: [
      { label: 'Surface velocity', work: md`$u = \dfrac{\pi D N}{60} = \dfrac{\pi(0.5)(200)}{60} = 5.236$ m/s` },
      { label: 'Shear stress', work: md`$\tau = \mu\dfrac{u}{t} = 0.5 \times \dfrac{5.236}{0.001} = 2618$ N/m²` },
      { label: 'Shear force on the shaft surface', work: md`$F = \tau\,\pi D L = 2618 \times \pi(0.5)(0.1) = 411.2$ N` },
      { label: 'Torque and power', work: md`$T = F\dfrac{D}{2} = 102.8$ N·m; $\;P = \dfrac{2\pi N T}{60} = \dfrac{2\pi(200)(102.8)}{60} = 2153$ W` },
    ],
    answer: md`$P \approx 2.15$ kW`,
    concept: 'Viscous resistance in a journal bearing: τ = μu/t, F = τπDL, P = 2πNT/60.',
    observations: ['Power varies as μN²D³L/t: doubling the speed quadruples the loss.', 'Same method as the collar bearing in 2024 Q4(a), only the geometry differs (Unit 3).'],
  },
  {
    id: 'ex-2-15',
    topicId: 'u1-pressure-manometry',
    title: 'Differential manometer on an oil pipe',
    source: { kind: 'textbook', ref: 'Problem 2.15', page: 51 },
    difficulty: 1,
    statement: md`A pipe contains an oil of sp. gr. 0.9. A differential manometer connected at the two points A and B shows a difference in mercury level as 15 cm. Find the difference of pressure at the two points.`,
    given: ['S_oil = 0.9 ⇒ ρ₁ = 900 kg/m³', 'S_Hg = 13.6 ⇒ ρ_g = 13 600 kg/m³', 'h = 0.15 m', 'A and B at the same level'],
    find: ['p_A − p_B'],
    approach: md`Same level, same liquid in both limbs: equate pressures on the datum through the lower mercury surface.`,
    steps: [
      { label: 'Datum equation', work: md`$p_A + \rho_1 g(h + x) = p_B + \rho_1 g x + \rho_g g h$` },
      { label: 'Simplify', work: md`$p_A - p_B = g h(\rho_g - \rho_1) = 9.81 \times 0.15 \times (13600 - 900)$` },
      { label: 'Evaluate', work: md`$p_A - p_B = 18\,688$ N/m²` },
    ],
    answer: md`$p_A - p_B = 18\,688$ N/m² $= 1.869$ N/cm²`,
    concept: 'Differential manometer: the unknown height x of the pipe liquid cancels when both points are at the same level.',
  },
  {
    id: 'ex-3-2',
    topicId: 'u1-hydrostatic-forces',
    title: 'Total pressure and centre of pressure on a circular plate',
    source: { kind: 'textbook', ref: 'Problem 3.2', page: 73 },
    difficulty: 1,
    statement: md`Determine the total pressure on a circular plate of diameter 1.5 m which is placed vertically in water in such a way that the centre of the plate is 3 m below the free surface of water. Find the position of centre of pressure also.`,
    given: ['d = 1.5 m, vertical', 'h̄ = 3 m', 'ρ = 1000 kg/m³'],
    find: ['F', 'h*'],
    approach: md`$F = \rho g A\bar h$ and $h^* = \bar h + I_G/(A\bar h)$ with $I_G = \pi d^4/64$.`,
    steps: [
      { label: 'Area', work: md`$A = \dfrac{\pi}{4}(1.5)^2 = 1.767$ m²` },
      { label: 'Total pressure', work: md`$F = 1000 \times 9.81 \times 1.767 \times 3 = 52\,007$ N` },
      { label: 'Centre of pressure', work: md`For a circle $\dfrac{I_G}{A\bar h} = \dfrac{\pi d^4/64}{(\pi d^2/4)\bar h} = \dfrac{d^2}{16\bar h} = \dfrac{2.25}{48} = 0.0469$ m, so $h^* = 3.0469$ m` },
    ],
    answer: md`$F \approx 52.0$ kN, $h^* = 3.047$ m below the free surface`,
    concept: 'The centre of pressure lies 0.047 m below the centroid, illustrating 2024 Q1(a).',
  },
  {
    id: 'ex-4-9',
    topicId: 'u1-buoyancy-stability',
    title: 'Metacentric height of a floating block',
    source: { kind: 'textbook', ref: 'Problem 4.9', page: 140 },
    difficulty: 2,
    statement: md`A block of wood of specific gravity 0.7 floats in water. Determine the meta-centric height of the block if its size is 2 m × 1 m × 0.8 m.`,
    given: ['Block 2 m long × 1 m wide × 0.8 m high', 'S = 0.7'],
    find: ['GM'],
    approach: md`Depth of immersion from equilibrium, then $BM = I/V$ about the longitudinal axis (least I) and $GM = BM - BG$.`,
    steps: [
      { label: 'Depth of immersion', work: md`Weight = buoyancy: $0.7 \times 0.8 = 1 \times h$ ⇒ $h = 0.56$ m` },
      { label: 'Positions of B and G', work: md`$AB = h/2 = 0.28$ m, $AG = 0.8/2 = 0.40$ m above the base ⇒ $BG = 0.12$ m` },
      { label: 'BM', work: md`$I = \dfrac{L b^3}{12} = \dfrac{2(1)^3}{12} = 0.1667$ m⁴; $V = 2 \times 1 \times 0.56 = 1.12$ m³; $BM = I/V = 0.1488$ m` },
      { label: 'GM', work: md`$GM = 0.1488 - 0.12 = 0.0288$ m` },
    ],
    answer: md`$GM \approx 0.029$ m (positive ⇒ stable, but only just)`,
    concept: 'Analytical method for metacentric height (2024 Q1(c)).',
    observations: ['Tilting about the longitudinal axis uses the breadth cubed, giving the least I and hence the critical GM.'],
  },
  {
    id: 'ex-4-19',
    topicId: 'u1-buoyancy-stability',
    title: 'Metacentric height of a ship by experiment',
    source: { kind: 'textbook', ref: 'Problem 4.19', page: 155 },
    difficulty: 2,
    statement: md`A ship 70 m long and 10 m broad has a displacement of 19620 kN. A weight of 343.35 kN is moved across the deck through a distance of 6 m. The ship is tilted through 6°. The moment of inertia of the ship at water-line about its fore and aft axis is 75% of M.O.I. of the circumscribing rectangle. The centre of buoyancy is 2.25 m below water-line. Find the meta-centric height and position of centre of gravity of ship. Specific weight of sea water is 10104 N/m³.`,
    given: ['L = 70 m, b = 10 m, W = 19 620 kN', 'w₁ = 343.35 kN, x = 6 m, θ = 6°', 'I = 0.75 × Lb³/12', 'B is 2.25 m below the water line, w = 10 104 N/m³'],
    find: ['GM', 'Position of G'],
    approach: md`Experimental formula for GM, then $BM = I/V$ and $BG = BM - GM$.`,
    steps: [
      { label: 'GM by experiment', work: md`$GM = \dfrac{w_1 x}{W\tan\theta} = \dfrac{343.35 \times 6}{19620 \times \tan 6°} = 0.999$ m` },
      { label: 'Immersed volume', work: md`$V = \dfrac{19620 \times 10^3}{10104} = 1941.8$ m³` },
      { label: 'Second moment', work: md`$I = 0.75 \times \dfrac{70 \times 10^3}{12} = 4375$ m⁴ ⇒ $BM = 4375/1941.8 = 2.253$ m` },
      { label: 'Position of G', work: md`$BG = BM - GM = 2.253 - 0.999 = 1.254$ m above B ⇒ G is $2.25 - 1.254 = 0.996$ m below the water line` },
    ],
    answer: md`$GM \approx 1.0$ m; G is about 1.0 m below the water line (1.25 m above B)`,
    concept: 'Combining the experimental and analytical methods for metacentric height.',
  },
  {
    id: 'ex-5-14',
    topicId: 'u1-potential-functions',
    title: 'Velocity and velocity potential from ψ = 2xy',
    source: { kind: 'textbook', ref: 'Problem 5.14', page: 187 },
    difficulty: 1,
    statement: md`The stream function for a two-dimensional flow is given by $\psi = 2xy$, calculate the velocity at the point P (2, 3). Find the velocity potential function φ.`,
    given: ['ψ = 2xy', 'P (2, 3)'],
    find: ['Velocity at P', 'φ'],
    approach: md`Velocity components from ψ (Bansal: $u = -\partial\psi/\partial y$, $v = \partial\psi/\partial x$), then integrate for φ using $u = -\partial\phi/\partial x$, $v = -\partial\phi/\partial y$.`,
    steps: [
      { label: 'Components', work: md`$u = -\dfrac{\partial(2xy)}{\partial y} = -2x$, $\;v = \dfrac{\partial(2xy)}{\partial x} = 2y$` },
      { label: 'At P (2, 3)', work: md`$u = -4$, $v = 6$; $V = \sqrt{16 + 36} = 7.211$ units` },
      { label: 'Integrate for φ', work: md`$\partial\phi/\partial x = -u = 2x$ ⇒ $\phi = x^2 + f(y)$; $\partial\phi/\partial y = f'(y) = -v = -2y$ ⇒ $f = -y^2 + C$` },
      { label: 'Result', work: md`$\phi = x^2 - y^2$ (constant dropped)` },
    ],
    answer: md`$V_P = 7.211$ units; $\phi = x^2 - y^2$`,
    concept: 'The same procedure answers 2024 Q5(a) with ψ = 3xy, giving φ = 1.5(x² − y²).',
    observations: ['A velocity potential exists only because this flow is irrotational: ∂v/∂x − ∂u/∂y = 0 − 0 = 0.'],
  },
  {
    id: 'ex-u1-quadrant',
    topicId: 'u1-hydrostatic-forces',
    title: 'Force on a quadrant gate',
    source: { kind: 'generated' },
    difficulty: 2,
    statement: md`A gate is shaped as a quadrant of a circle of radius 2 m and is 1 m wide. Water stands on the curved side up to the level of its top edge. Find the magnitude and direction of the resultant water force on the gate.`,
    given: ['R = 2 m, width 1 m', 'Free surface level with the top of the quadrant'],
    find: ['F_x, F_y', 'F and its angle'],
    approach: md`$F_x$ = force on the vertical projection ($2 \times 1$ m); $F_y$ = weight of water above the curve (a quarter-circle of water).`,
    steps: [
      { label: 'Horizontal component', work: md`$F_x = \rho g A\bar h = 9810 \times (2 \times 1) \times 1 = 19\,620$ N` },
      { label: 'Vertical component', work: md`$F_y = \rho g \times \dfrac{\pi R^2}{4} \times 1 = 9810 \times 3.1416 = 30\,819$ N` },
      { label: 'Resultant', work: md`$F = \sqrt{19620^2 + 30819^2} = 36\,534$ N; $\tan\theta = 30819/19620$ ⇒ $\theta = 57.5°$ with the horizontal` },
    ],
    answer: md`$F \approx 36.5$ kN at 57.5° to the horizontal, passing through the centre of the quadrant`,
    concept: 'Curved-surface rule: projection for F_x, weight of liquid above for F_y.',
  },
]

/* =============================================================================
 * Questions
 * ========================================================================== */

export const questions: Question[] = [
  {
    id: 'q-u1-1',
    topicId: 'u1-properties',
    type: 'mcq',
    difficulty: 1,
    prompt: md`1 poise equals`,
    options: ['1 N·s/m²', '0.1 N·s/m²', '10 N·s/m²', '10⁻⁴ m²/s'],
    answer: 1,
    source: { kind: 'generated' },
    solution: md`1 poise = 1 dyne·s/cm² = $10^{-5}$ N × s / $10^{-4}$ m² = 0.1 N·s/m². ($10^{-4}$ m²/s is one stoke, a unit of kinematic viscosity.)`,
  },
  {
    id: 'q-u1-2',
    topicId: 'u1-properties',
    type: 'mcq',
    difficulty: 1,
    prompt: md`As temperature increases, the viscosity of`,
    options: ['both liquids and gases increases', 'both liquids and gases decreases', 'liquids decreases and gases increases', 'liquids increases and gases decreases'],
    answer: 2,
    source: { kind: 'textbook', ref: '§1.3.4', page: 6 },
    solution: md`Liquid viscosity comes from cohesion, which weakens on heating. Gas viscosity comes from molecular momentum exchange, which grows on heating.`,
  },
  {
    id: 'q-u1-3',
    topicId: 'u1-properties',
    type: 'numerical',
    difficulty: 2,
    prompt: md`Calculate the capillary rise in a glass tube of 2.5 mm diameter immersed vertically in water. Take σ = 0.0725 N/m and θ = 0°.`,
    hints: ['h = 4σ cosθ/(ρ g d)'],
    source: { kind: 'textbook', ref: 'Problem 1.28(a)', page: 26 },
    solution: md`$h = \dfrac{4 \times 0.0725 \times 1}{1000 \times 9.81 \times 0.0025} = 0.01182$ m $= 11.82$ mm.`,
  },
  {
    id: 'q-u1-4',
    topicId: 'u1-properties',
    type: 'short',
    difficulty: 1,
    prompt: md`State the continuum hypothesis. When does it fail?`,
    source: { kind: 'generated' },
    solution: md`A fluid is treated as continuous matter, so properties such as density and velocity have a definite value at every point and vary smoothly. It is valid when the characteristic length L is much larger than the molecular mean free path λ (Knudsen number λ/L < 0.01). It fails for rarefied gases (very high altitude, vacuum) and in micro- and nano-scale channels.`,
  },
  {
    id: 'q-u1-5',
    topicId: 'u1-pressure-manometry',
    type: 'long',
    difficulty: 2,
    prompt: md`What is a manometer? Classify manometers with their uses and describe a U-tube differential manometer.`,
    hints: ['Definition → simple (piezometer, U-tube, single-column) and differential (U-tube, inverted U-tube) → sketch and equation'],
    source: { kind: 'textbook', ref: '§2.5–2.7', page: 42 },
    solution: md`**Manometer:** a device that measures pressure by balancing a column of liquid against it.

**Simple manometers** (pressure at a point): piezometer (small positive liquid pressures), U-tube (high positive or negative pressure; mercury keeps it short), single-column (small changes; reservoir ≫ tube so one reading suffices; inclined form for sensitivity).
**Differential manometers** (difference between two points): U-tube differential (large Δp, heavy liquid below), inverted U-tube (small Δp, light liquid above).

**U-tube differential manometer:** U-tube with mercury; one limb to A, the other to B. With the datum through the lower mercury surface:
$$p_A + \rho_1 g(h + x) = p_B + \rho_g g h + \rho_2 g y$$
For A and B at the same level with the same liquid: $p_A - p_B = gh(\rho_g - \rho_1)$.`,
  },
  {
    id: 'q-u1-6',
    topicId: 'u1-pressure-manometry',
    type: 'numerical',
    difficulty: 2,
    prompt: md`The right limb of a simple U-tube manometer containing mercury is open to atmosphere; the left limb is connected to a pipe carrying a fluid of sp. gr. 0.9. The centre of the pipe is 12 cm below the level of mercury in the right limb, and the difference of mercury levels is 20 cm. Find the pressure in the pipe.`,
    hints: ['Datum through the lower mercury surface (left limb). Pipe centre is (20 − 12) = 8 cm above it.'],
    source: { kind: 'textbook', ref: 'Problem 2.9', page: 44 },
    solution: md`Height of the pipe fluid above the datum: $h_1 = 20 - 12 = 8$ cm. Equating at the datum:
$$p + 900 \times 9.81 \times 0.08 = 13600 \times 9.81 \times 0.20$$
$$p = 26\,683 - 706 = 25\,977 \text{ N/m}^2 \approx 2.6 \text{ N/cm}^2$$`,
  },
  {
    id: 'q-u1-7',
    topicId: 'u1-hydrostatic-forces',
    type: 'derivation',
    difficulty: 2,
    prompt: md`Prove that the centre of pressure of a plane surface immersed vertically in a liquid always lies below its centre of gravity.`,
    source: { kind: 'textbook', ref: '§3.3', page: 69 },
    solution: md`Strip at depth $h$: $dF = \rho g h\,dA$. Total $F = \rho g A\bar h$. Moments about the free surface: $F h^* = \rho g\int h^2 dA = \rho g I_O = \rho g(I_G + A\bar h^2)$. Hence
$$h^* = \bar h + \frac{I_G}{A\bar h}$$
Since $I_G$, $A$ and $\bar h$ are all positive, $h^* > \bar h$. The centre of pressure is below the centroid because pressure increases with depth. The difference vanishes as $\bar h \to \infty$ and for horizontal surfaces.`,
  },
  {
    id: 'q-u1-8',
    topicId: 'u1-hydrostatic-forces',
    type: 'mcq',
    difficulty: 1,
    prompt: md`The vertical component of the hydrostatic force on a curved surface is equal to`,
    options: ['the force on its vertical projection', 'the weight of liquid vertically above it up to the free surface', 'the pressure at its centroid times its area', 'zero'],
    answer: 1,
    source: { kind: 'textbook', ref: '§3.6', page: 98 },
    solution: md`F_y = weight of liquid (real or imaginary) vertically above the curved surface. The horizontal component is the force on the vertical projection.`,
  },
  {
    id: 'q-u1-9',
    topicId: 'u1-buoyancy-stability',
    type: 'derivation',
    difficulty: 3,
    prompt: md`Derive analytically and describe experimentally the determination of the metacentric height of a floating body.`,
    source: { kind: 'textbook', ref: '§4.6, §4.8', page: 137 },
    solution: md`**Analytical:** tilting through θ adds a wedge of buoyancy $\rho g x\theta\,dA$ at distance $x$ on one side and removes it on the other. The couple is $\rho g\theta\int x^2 dA = \rho g\theta I$. This shifts the buoyant force $\rho g V$ through $BM\theta$, so $\rho g V\,BM\,\theta = \rho g\theta I$ ⇒ $BM = I/V$ and $GM = I/V - BG$.

**Experimental:** move a known weight $w_1$ across the deck through $x$; measure the heel θ with a plumb bob. $w_1 x = W\,GM\tan\theta$ ⇒ $GM = \dfrac{w_1 x}{W\tan\theta}$.`,
  },
  {
    id: 'q-u1-10',
    topicId: 'u1-buoyancy-stability',
    type: 'mcq',
    difficulty: 1,
    prompt: md`A floating body is in stable equilibrium when`,
    options: ['the metacentre is below the centre of gravity', 'the metacentre is above the centre of gravity', 'the centre of buoyancy is below the centre of gravity', 'the metacentre coincides with the centre of buoyancy'],
    answer: 1,
    source: { kind: 'textbook', ref: '§4.7.2', page: 143 },
    solution: md`M above G (GM > 0) produces a restoring couple. For a fully submerged body the condition is B above G.`,
  },
  {
    id: 'q-u1-11',
    topicId: 'u1-kinematics',
    type: 'short',
    difficulty: 1,
    prompt: md`Distinguish between a stream line, a path line and a streak line. When do they coincide?`,
    source: { kind: 'textbook', ref: 'Ch 5, review question 2', page: 254 },
    solution: md`**Stream line:** imaginary line at an instant, tangent to the velocity everywhere. **Path line:** actual path of one particle over time. **Streak line:** locus at an instant of all particles that passed through a given fixed point (dye trace). In **steady** flow all three coincide.`,
  },
  {
    id: 'q-u1-12',
    topicId: 'u1-kinematics',
    type: 'numerical',
    difficulty: 2,
    prompt: md`Check whether $u = x^2 + 2xy$, $v = -(2xy + y^2)$ represents a possible steady incompressible flow.`,
    hints: ['Test ∂u/∂x + ∂v/∂y = 0'],
    source: { kind: 'generated' },
    solution: md`$\partial u/\partial x = 2x + 2y$; $\partial v/\partial y = -(2x + 2y)$. Sum = 0, so continuity is satisfied: it is a possible incompressible flow.`,
  },
  {
    id: 'q-u1-13',
    topicId: 'u1-potential-functions',
    type: 'numerical',
    difficulty: 2,
    prompt: md`In a 2-D incompressible flow in the x-y plane, the stream function is $\psi = 3xy$. Show that the flow is irrotational and find the velocity potential.`,
    source: { kind: 'generated' },
    hints: ['u = −∂ψ/∂y, v = ∂ψ/∂x', 'Irrotational if ∂v/∂x = ∂u/∂y'],
    solution: md`$u = -3x$, $v = 3y$. $\omega_z = \tfrac12(\partial v/\partial x - \partial u/\partial y) = \tfrac12(0 - 0) = 0$ ⇒ irrotational.
$\partial\phi/\partial x = 3x$ ⇒ $\phi = 1.5x^2 + f(y)$; $\partial\phi/\partial y = f'(y) = -3y$ ⇒ $\phi = 1.5(x^2 - y^2)$.`,
  },
  {
    id: 'q-u1-14',
    topicId: 'u1-potential-functions',
    type: 'mcq',
    difficulty: 2,
    prompt: md`The velocity potential function exists only if the flow is`,
    options: ['steady', 'incompressible', 'irrotational', 'two-dimensional'],
    answer: 2,
    source: { kind: 'textbook', ref: '§5.8.1', page: 181 },
    solution: md`φ exists only for irrotational flow. The stream function, by contrast, exists for any 2-D incompressible flow.`,
  },
  {
    id: 'q-u1-15',
    topicId: 'u1-simple-flows',
    type: 'short',
    difficulty: 1,
    prompt: md`Differentiate between a forced vortex and a free vortex with one example each.`,
    source: { kind: 'textbook', ref: '§5.10', page: 193 },
    solution: md`**Forced vortex:** rotation by an external torque, $v = \omega r$, rotational, paraboloid free surface; e.g. liquid in a rotating vessel. **Free vortex:** no external torque, $vr$ = constant, irrotational, Bernoulli applies; e.g. whirlpool, flow into a sink.`,
  },
  {
    id: 'q-u1-16',
    topicId: 'u1-simple-flows',
    type: 'numerical',
    difficulty: 2,
    prompt: md`An open cylindrical vessel of 20 cm diameter holds water and is rotated at 300 rpm about its vertical axis. Find the height of the paraboloid formed (difference between the water level at the wall and at the axis).`,
    hints: ['z = ω²R²/2g'],
    source: { kind: 'generated' },
    solution: md`$\omega = 2\pi(300)/60 = 31.42$ rad/s; $z = \dfrac{\omega^2 R^2}{2g} = \dfrac{31.42^2 \times 0.1^2}{2 \times 9.81} = 0.503$ m.`,
  },
]

/* =============================================================================
 * Formulas
 * ========================================================================== */

export const formulas: Formula[] = [
  {
    id: 'f-u1-newton',
    topicId: 'u1-properties',
    name: 'Newton’s law of viscosity',
    latex: md`\tau = \mu\frac{du}{dy}`,
    vars: [
      { sym: md`\tau`, meaning: 'shear stress', unit: 'N/m²' },
      { sym: md`\mu`, meaning: 'dynamic viscosity', unit: 'N·s/m²' },
      { sym: md`du/dy`, meaning: 'velocity gradient (rate of shear strain)', unit: '1/s' },
    ],
    conditions: 'Newtonian fluid, laminar flow.',
    meaning: 'Shear stress is proportional to the rate of angular deformation.',
    important: true,
    ref: { chapter: 1, section: '§1.3.3', pages: '5' },
  },
  {
    id: 'f-u1-capillary',
    topicId: 'u1-properties',
    name: 'Capillary rise',
    latex: md`h = \frac{4\sigma\cos\theta}{\rho g d}`,
    vars: [
      { sym: md`\sigma`, meaning: 'surface tension', unit: 'N/m' },
      { sym: md`\theta`, meaning: 'contact angle', unit: '°' },
      { sym: md`d`, meaning: 'tube diameter', unit: 'm' },
    ],
    conditions: 'Small-bore tube; θ < 90° gives rise, θ > 90° gives depression.',
    meaning: 'Surface tension pull around the rim balances the weight of the raised column.',
    ref: { chapter: 1, section: '§1.6.4', pages: '25–26' },
  },
  {
    id: 'f-u1-hydrostatic',
    topicId: 'u1-pressure-manometry',
    name: 'Hydrostatic law',
    latex: md`\frac{\partial p}{\partial z} = -\rho g \quad\Rightarrow\quad p = \rho g h`,
    vars: [
      { sym: md`h`, meaning: 'depth below the free surface', unit: 'm' },
    ],
    conditions: 'Fluid at rest, constant density.',
    meaning: 'Pressure rises linearly with depth, regardless of container shape.',
    important: true,
    ref: { chapter: 2, section: '§2.3', pages: '36' },
  },
  {
    id: 'f-u1-diffman',
    topicId: 'u1-pressure-manometry',
    name: 'U-tube differential manometer',
    latex: md`p_A - p_B = h g(\rho_g - \rho_1) + \rho_2 g y - \rho_1 g x`,
    vars: [
      { sym: md`h`, meaning: 'difference of gauge-liquid levels', unit: 'm' },
      { sym: md`\rho_g`, meaning: 'gauge liquid density', unit: 'kg/m³' },
      { sym: md`x, y`, meaning: 'heights of the A-side and B-side liquids above the respective mercury surfaces', unit: 'm' },
    ],
    conditions: 'Same level and same liquid: p_A − p_B = gh(ρ_g − ρ₁).',
    meaning: 'Equate pressures on a datum through the lower interface.',
    related: ['f-u1-hydrostatic'],
    ref: { chapter: 2, section: '§2.7.1', pages: '50–51' },
  },
  {
    id: 'f-u1-total-pressure',
    topicId: 'u1-hydrostatic-forces',
    name: 'Total pressure on a plane surface',
    latex: md`F = \rho g A \bar h`,
    vars: [
      { sym: md`A`, meaning: 'area of surface', unit: 'm²' },
      { sym: md`\bar h`, meaning: 'depth of centroid', unit: 'm' },
    ],
    conditions: 'Any plane surface, any inclination.',
    meaning: 'Pressure at the centroid times the area.',
    important: true,
    ref: { chapter: 3, section: '§3.3', pages: '69–70' },
  },
  {
    id: 'f-u1-cp',
    topicId: 'u1-hydrostatic-forces',
    name: 'Depth of centre of pressure',
    latex: md`h^* = \bar h + \frac{I_G\sin^2\theta}{A\bar h}`,
    vars: [
      { sym: md`I_G`, meaning: 'second moment of area about the centroidal axis parallel to the free surface', unit: 'm⁴' },
      { sym: md`\theta`, meaning: 'angle of plane with free surface (90° = vertical)', unit: '°' },
    ],
    conditions: 'Plane surface; θ = 90° for vertical.',
    meaning: 'The centre of pressure is below the centroid by I_G sin²θ/(A h̄).',
    important: true,
    related: ['f-u1-total-pressure'],
    ref: { chapter: 3, section: '§3.3, §3.5', pages: '70, 86–87' },
  },
  {
    id: 'f-u1-curved',
    topicId: 'u1-hydrostatic-forces',
    name: 'Force on a curved surface',
    latex: md`F = \sqrt{F_x^2 + F_y^2}, \quad \tan\theta = \frac{F_y}{F_x}`,
    vars: [
      { sym: md`F_x`, meaning: 'force on the vertical projection', unit: 'N' },
      { sym: md`F_y`, meaning: 'weight of liquid above the curved surface', unit: 'N' },
    ],
    conditions: 'Static liquid.',
    meaning: 'Resolve into components, then combine.',
    ref: { chapter: 3, section: '§3.6', pages: '97–99' },
  },
  {
    id: 'f-u1-gm',
    topicId: 'u1-buoyancy-stability',
    name: 'Metacentric height (analytical)',
    latex: md`GM = \frac{I}{V} - BG`,
    vars: [
      { sym: md`I`, meaning: 'second moment of water-line area about the tilt axis', unit: 'm⁴' },
      { sym: md`V`, meaning: 'immersed (displaced) volume', unit: 'm³' },
      { sym: md`BG`, meaning: 'distance from B up to G', unit: 'm' },
    ],
    conditions: 'Small angle of heel; G above B (use + BG if G is below B).',
    meaning: 'BM = I/V is the metacentric radius.',
    important: true,
    ref: { chapter: 4, section: '§4.6', pages: '137–138' },
  },
  {
    id: 'f-u1-gm-exp',
    topicId: 'u1-buoyancy-stability',
    name: 'Metacentric height (experimental)',
    latex: md`GM = \frac{w_1 x}{W\tan\theta}`,
    vars: [
      { sym: md`w_1`, meaning: 'movable weight', unit: 'N' },
      { sym: md`x`, meaning: 'distance moved across deck', unit: 'm' },
      { sym: md`W`, meaning: 'total weight of the body', unit: 'N' },
    ],
    conditions: 'Small heel angle θ.',
    meaning: 'Overturning moment of the shifted weight balances the buoyancy couple.',
    related: ['f-u1-gm'],
    ref: { chapter: 4, section: '§4.8', pages: '154–155' },
  },
  {
    id: 'f-u1-continuity',
    topicId: 'u1-kinematics',
    name: 'Continuity equation',
    latex: md`\frac{\partial \rho}{\partial t} + \frac{\partial(\rho u)}{\partial x} + \frac{\partial(\rho v)}{\partial y} + \frac{\partial(\rho w)}{\partial z} = 0`,
    vars: [{ sym: md`u, v, w`, meaning: 'velocity components', unit: 'm/s' }],
    conditions: 'Any flow. Incompressible: ∂u/∂x + ∂v/∂y + ∂w/∂z = 0; 1-D: A₁V₁ = A₂V₂.',
    meaning: 'Conservation of mass for a fixed element.',
    important: true,
    ref: { chapter: 5, section: '§5.6', pages: '170–171' },
  },
  {
    id: 'f-u1-accel',
    topicId: 'u1-kinematics',
    name: 'Acceleration of a fluid particle',
    latex: md`a_x = u\frac{\partial u}{\partial x} + v\frac{\partial u}{\partial y} + w\frac{\partial u}{\partial z} + \frac{\partial u}{\partial t}`,
    vars: [],
    conditions: 'Eulerian description.',
    meaning: 'Convective terms plus local term.',
    ref: { chapter: 5, section: '§5.7', pages: '174–175' },
  },
  {
    id: 'f-u1-psi-phi',
    topicId: 'u1-potential-functions',
    name: 'Velocity from ψ and φ (Bansal convention)',
    latex: md`u = -\frac{\partial\phi}{\partial x} = -\frac{\partial\psi}{\partial y}, \qquad v = -\frac{\partial\phi}{\partial y} = \frac{\partial\psi}{\partial x}`,
    vars: [],
    conditions: 'φ: irrotational flow. ψ: 2-D incompressible flow.',
    meaning: 'The Cauchy–Riemann relations follow from equating the two forms.',
    important: true,
    ref: { chapter: 5, section: '§5.8', pages: '181–184' },
  },
  {
    id: 'f-u1-rotation',
    topicId: 'u1-potential-functions',
    name: 'Rotation and circulation',
    latex: md`\omega_z = \tfrac12\left(\frac{\partial v}{\partial x} - \frac{\partial u}{\partial y}\right), \qquad \Gamma = \oint \vec V\cdot d\vec s`,
    vars: [],
    conditions: 'Irrotational when ω = 0. Circulation per unit area = vorticity 2ω.',
    meaning: 'Average spin of a fluid element; line integral of tangential velocity.',
    ref: { chapter: 5, section: '§5.9', pages: '192' },
  },
  {
    id: 'f-u1-forced',
    topicId: 'u1-simple-flows',
    name: 'Forced vortex free surface',
    latex: md`z = \frac{\omega^2 r^2}{2g}`,
    vars: [
      { sym: md`\omega`, meaning: 'angular speed', unit: 'rad/s' },
      { sym: md`r`, meaning: 'radius', unit: 'm' },
    ],
    conditions: 'Solid-body rotation, open vessel; z measured from the lowest point on the axis.',
    meaning: 'The free surface is a paraboloid.',
    ref: { chapter: 5, section: '§5.10.4', pages: '196' },
  },
  {
    id: 'f-u1-source',
    topicId: 'u1-simple-flows',
    name: 'Source and free vortex velocities',
    latex: md`u_r = \frac{q}{2\pi r}, \qquad u_\theta = \frac{\Gamma}{2\pi r}`,
    vars: [
      { sym: md`q`, meaning: 'source strength (discharge per unit depth)', unit: 'm²/s' },
      { sym: md`\Gamma`, meaning: 'circulation', unit: 'm²/s' },
    ],
    conditions: '2-D potential flow.',
    meaning: 'Both decay as 1/r from the singular point.',
    ref: { chapter: 5, section: '§5.14, §5.16', pages: '214, 219' },
  },
]
