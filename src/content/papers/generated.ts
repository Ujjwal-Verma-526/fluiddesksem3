import type { Paper } from '../types'

const md = String.raw

/**
 * Papers generated from Bansal’s theory sections and solved problems, set to the official
 * marking scheme. Each part names the Bansal section or problem it was built from; numerical
 * answers were re-computed independently.
 */
export const GENERATED_PAPERS: Paper[] = [
  /* ======================================================================= */
  {
    id: 'generated-a',
    kind: 'generated',
    title: 'Bansal Paper A',
    blurb: 'Inclined planes, metacentric height, laminar pipe flow, venturimeter, Buckingham, Pelton wheel.',
    questions: [
      {
        number: 1,
        parts: [
          {
            id: 'ga-1a',
            label: 'a',
            marks: 3,
            co: 'CO-1',
            prompt: md`Derive expressions for the total pressure and the depth of the centre of pressure for a plane surface immersed in a liquid and inclined at an angle θ to the free surface.`,
            topicIds: ['u1-hydrostatic-forces'],
            bookRef: '§3.5',
            answer: md`Let the plane make angle θ with the free surface; measure $y$ along the plane from the line O–O where it meets the free surface, so depth $h = y\sin\theta$. Strip $dA$ at depth $h$: $dF = \rho g y\sin\theta\,dA$.

$$F = \rho g\sin\theta\int y\,dA = \rho g\sin\theta\,A\bar y = \rho gA\bar h$$
Moments about O–O: $F\,y^* = \rho g\sin\theta\int y^2dA = \rho g\sin\theta\,I_O$, with $I_O = I_G + A\bar y^2$:
$$y^* = \frac{I_G + A\bar y^2}{A\bar y}$$
Converting with $h^* = y^*\sin\theta$, $\bar h = \bar y\sin\theta$:
$$h^* = \frac{I_G\sin^2\theta}{A\bar h} + \bar h$$
θ = 90° gives the vertical case; θ = 0 gives $h^* = \bar h$.`,
            scheme: [
              { marks: 1, for: 'Total pressure F = ρgAh̄' },
              { marks: 1.5, for: 'Moment equation with parallel-axis theorem' },
              { marks: 0.5, for: 'Final h* = h̄ + I_G sin²θ/(Ah̄)' },
            ],
          },
          {
            id: 'ga-1b',
            label: 'b',
            marks: 2,
            co: 'CO-1',
            prompt: md`A pipe contains an oil of sp. gr. 0.9. A differential manometer connected at the two points A and B shows a difference in mercury level as 15 cm. Find the difference of pressure at the two points.`,
            topicIds: ['u1-pressure-manometry'],
            bookRef: 'Problem 2.15',
            answer: md`A and B at the same level, same liquid. Datum through the lower mercury surface:
$$p_A + \rho_1 g(h + x) = p_B + \rho_1 g x + \rho_g g h$$
$$p_A - p_B = gh(\rho_g - \rho_1) = 9.81 \times 0.15 \times (13600 - 900) = 18\,688 \text{ N/m}^2 = 1.869 \text{ N/cm}^2$$`,
            scheme: [
              { marks: 1, for: 'Datum equation for the differential manometer' },
              { marks: 1, for: 'p_A − p_B = 18 688 N/m²' },
            ],
          },
          {
            id: 'ga-1c',
            label: 'c',
            marks: 3,
            co: 'CO-1',
            prompt: md`A block of wood of specific gravity 0.7 floats in water. Determine the meta-centric height of the block if its size is 2 m × 1 m × 0.8 m.`,
            topicIds: ['u1-buoyancy-stability'],
            bookRef: 'Problem 4.9',
            answer: md`**Depth of immersion:** $0.7 \times 0.8 = 1 \times h \Rightarrow h = 0.56$ m.
**B and G:** B is $0.28$ m and G $0.40$ m above the base, so $BG = 0.12$ m.
**BM:** $I = \dfrac{2 \times 1^3}{12} = 0.1667$ m⁴ (least, about the longitudinal axis); $V = 2 \times 1 \times 0.56 = 1.12$ m³; $BM = I/V = 0.1488$ m.
$$GM = BM - BG = 0.1488 - 0.12 = 0.0288 \text{ m}$$
Positive, so the block is (just) stable.`,
            scheme: [
              { marks: 1, for: 'Depth of immersion and BG' },
              { marks: 1, for: 'I about the longitudinal axis, V and BM = I/V' },
              { marks: 1, for: 'GM = 0.029 m and stability remark' },
            ],
          },
        ],
      },
      {
        number: 2,
        parts: [
          {
            id: 'ga-2a',
            label: 'a',
            marks: 3,
            co: 'CO-3',
            prompt: md`A crude oil of viscosity 0.97 poise and relative density 0.9 is flowing through a horizontal circular pipe of diameter 100 mm and of length 10 m. Calculate the difference of pressure at the two ends of the pipe, if 100 kg of the oil is collected in a tank in 30 seconds.`,
            topicIds: ['u3-pipe-laminar'],
            bookRef: 'Problem 9.1',
            answer: md`$Q = \dfrac{100/30}{900} = 3.704 \times 10^{-3}$ m³/s; $\bar u = Q/(\pi(0.1)^2/4) = 0.4716$ m/s.
$Re = \dfrac{900 \times 0.4716 \times 0.1}{0.097} = 437.5 < 2000$: laminar.
$$p_1 - p_2 = \frac{32\mu\bar uL}{D^2} = \frac{32 \times 0.097 \times 0.4716 \times 10}{0.01} = 1464 \text{ N/m}^2$$`,
            scheme: [
              { marks: 1, for: 'Discharge and mean velocity' },
              { marks: 1, for: 'Reynolds number check (laminar)' },
              { marks: 1, for: 'Hagen–Poiseuille: Δp ≈ 1464 N/m²' },
            ],
          },
          {
            id: 'ga-2b',
            label: 'b',
            marks: 3,
            co: 'CO-3',
            prompt: md`Define the momentum and kinetic energy correction factors. Show that for laminar flow through a circular pipe they are 4/3 and 2 respectively.`,
            topicIds: ['u3-correction-factors'],
            bookRef: '§9.4, Problem 9.13',
            answer: md`$\beta = \dfrac{1}{AV^2}\displaystyle\int u^2dA$ (actual momentum flux ÷ that from the mean velocity); $\alpha = \dfrac{1}{AV^3}\displaystyle\int u^3dA$ (same for kinetic energy).

Laminar: $u = U_{max}(1 - r^2/R^2)$, $V = U_{max}/2$. Using $\displaystyle\int_0^R(1 - r^2/R^2)^n2\pi r\,dr = \dfrac{\pi R^2}{n + 1}$:
$$\beta = \frac{U_{max}^2}{V^2}\cdot\frac13 = 4 \times \frac13 = \frac43, \qquad \alpha = \frac{U_{max}^3}{V^3}\cdot\frac14 = 8 \times \frac14 = 2$$`,
            scheme: [
              { marks: 1, for: 'Definitions of α and β' },
              { marks: 1, for: 'β = 4/3 with integration' },
              { marks: 1, for: 'α = 2 with integration' },
            ],
          },
          {
            id: 'ga-2c',
            label: 'c',
            marks: 2,
            co: 'CO-3',
            prompt: md`A sphere of diameter 2 mm falls 150 mm in 20 seconds in a viscous liquid. The density of the sphere is 7500 kg/m³ and of liquid is 900 kg/m³. Find the co-efficient of viscosity of the liquid.`,
            topicIds: ['u3-viscometers'],
            bookRef: 'Problem 9.28',
            answer: md`$U = 0.15/20 = 0.0075$ m/s. Stokes’ law at terminal velocity:
$$\mu = \frac{gd^2(\rho_s - \rho)}{18U} = \frac{9.81 \times (0.002)^2 \times 6600}{18 \times 0.0075} = 1.918 \text{ N·s/m}^2 \;(19.2 \text{ poise})$$`,
            scheme: [
              { marks: 1, for: 'Force balance / falling-sphere formula' },
              { marks: 1, for: 'μ ≈ 1.92 N·s/m²' },
            ],
          },
        ],
      },
      {
        number: 3,
        parts: [
          {
            id: 'ga-3a',
            label: 'a',
            marks: 3,
            co: 'CO-2',
            prompt: md`Derive an expression for the rate of flow through a venturimeter. Why is the divergent cone made longer than the convergent cone?`,
            topicIds: ['u2-flow-measurement'],
            bookRef: '§6.7.1',
            answer: md`Bernoulli between inlet 1 and throat 2 (horizontal): $\dfrac{p_1 - p_2}{\rho g} = h = \dfrac{v_2^2 - v_1^2}{2g}$. Continuity $a_1v_1 = a_2v_2$ gives $v_1 = v_2a_2/a_1$, so
$$v_2 = \frac{a_1}{\sqrt{a_1^2 - a_2^2}}\sqrt{2gh}, \qquad Q = C_d\frac{a_1a_2}{\sqrt{a_1^2 - a_2^2}}\sqrt{2gh}$$
with $h = x(S_g/S_o - 1)$ from a differential manometer.

The divergent cone is long (5–7°) so the flow decelerates gradually: a rapid expansion in an adverse pressure gradient would separate and lose head. The convergent cone can be short since accelerating flow does not separate.`,
            scheme: [
              { marks: 2, for: 'Bernoulli + continuity to Q = C_d a₁a₂√(2gh)/√(a₁² − a₂²)' },
              { marks: 1, for: 'Reason for the long divergent cone (avoid separation)' },
            ],
          },
          {
            id: 'ga-3b',
            label: 'b',
            marks: 3,
            co: 'CO-2',
            prompt: md`The pressure difference Δp in a pipe of diameter D and length l due to turbulent flow depends on the velocity V, viscosity μ, density ρ and roughness k. Using Buckingham’s π-theorem, obtain an expression for Δp.`,
            topicIds: ['u2-dimensional'],
            bookRef: 'Problem 12.10',
            answer: md`$n = 7$ variables, $m = 3$ ⇒ 4 π terms. Repeating variables $D, V, \rho$.
- $\pi_1 = D^aV^b\rho^c\Delta p$: M $c + 1 = 0$, T $-b - 2 = 0$, L $a + b - 3c - 1 = 0$ ⇒ $\pi_1 = \Delta p/\rho V^2$
- $\pi_2 = l/D$, $\pi_3 = \mu/\rho VD$, $\pi_4 = k/D$

$$\frac{\Delta p}{\rho V^2} = \phi\left(\frac lD, \frac{\mu}{\rho VD}, \frac kD\right)$$
Since Δp ∝ l: $\dfrac{\Delta p}{\rho g} = \dfrac{4f'lV^2}{2gD}$ with $f' = \phi(Re, k/D)$.`,
            scheme: [
              { marks: 0.5, for: 'n, m, number of π terms and repeating variables' },
              { marks: 2, for: 'The four π terms' },
              { marks: 0.5, for: 'Final functional relation' },
            ],
          },
          {
            id: 'ga-3c',
            label: 'c',
            marks: 2,
            co: 'CO-4',
            prompt: md`Define displacement thickness and momentum thickness. Find them for the velocity distribution $u/U = y/\delta$.`,
            topicIds: ['u5-bl-concept'],
            bookRef: '§13.2, Problem 13.1',
            answer: md`δ\*: distance the wall would have to move so ideal flow carries the same discharge, $\delta^* = \int_0^\delta(1 - u/U)dy$. θ: thickness of free-stream fluid with momentum equal to the boundary-layer momentum loss, $\theta = \int_0^\delta\frac uU(1 - \frac uU)dy$.

Linear profile: $\delta^* = \delta - \delta/2 = \delta/2$; $\theta = \delta/2 - \delta/3 = \delta/6$.`,
            scheme: [
              { marks: 1, for: 'Both definitions with integrals' },
              { marks: 1, for: 'δ* = δ/2 and θ = δ/6' },
            ],
          },
        ],
      },
      {
        number: 4,
        parts: [
          {
            id: 'ga-4a',
            label: 'a',
            marks: 3,
            co: 'CO-3',
            prompt: md`An oil of viscosity 5 poise is used for lubrication between a shaft and sleeve. The diameter of the shaft is 0.5 m and it rotates at 200 r.p.m. Calculate the power lost in oil for a sleeve length of 100 mm. The thickness of oil film is 1.0 mm.`,
            topicIds: ['u3-viscous-power', 'u1-properties'],
            bookRef: 'Problem 1.32',
            answer: md`$u = \pi DN/60 = 5.236$ m/s; $\tau = \mu u/t = 0.5 \times 5.236/0.001 = 2618$ N/m².
$F = \tau\pi DL = 411.2$ N; $T = F D/2 = 102.8$ N·m; $P = 2\pi NT/60 = 2153$ W ≈ 2.15 kW.`,
            scheme: [
              { marks: 1, for: 'Surface velocity and shear stress' },
              { marks: 1, for: 'Shear force and torque' },
              { marks: 1, for: 'Power ≈ 2.15 kW' },
            ],
          },
          {
            id: 'ga-4b',
            label: 'b',
            marks: 2,
            co: 'CO-5',
            prompt: md`A jet of water of diameter 50 mm moving with a velocity of 40 m/s, strikes a curved fixed symmetrical plate at the centre. Find the force exerted by the jet of water in the direction of the jet, if the jet is deflected through an angle of 120° at the outlet of the curved plate.`,
            topicIds: ['u6-jets'],
            bookRef: 'Problem 17.5',
            answer: md`Deflection 120° ⇒ angle with the axis θ = 60°. $a = 1.9635 \times 10^{-3}$ m².
$$F_x = \rho aV^2(1 + \cos\theta) = 1000 \times 1.9635 \times 10^{-3} \times 1600 \times 1.5 = 4712 \text{ N}$$`,
            scheme: [
              { marks: 1, for: 'F_x = ρaV²(1 + cos θ) with correct θ' },
              { marks: 1, for: 'F_x ≈ 4712 N' },
            ],
          },
          {
            id: 'ga-4c',
            label: 'c',
            marks: 3,
            co: 'CO-5',
            prompt: md`A jet of water of diameter 10 cm strikes a flat plate normally with a velocity of 15 m/s. The plate is moving with a velocity of 6 m/s in the direction of the jet and away from the jet. Find (i) the force exerted by the jet on the plate (ii) work done by the jet on the plate per second (iii) the efficiency of the jet.`,
            topicIds: ['u6-jets'],
            bookRef: 'Problem 17.11',
            answer: md`Single moving plate: mass striking per second $= \rho a(V - u)$.
(i) $F = \rho a(V - u)^2 = 1000 \times 7.854 \times 10^{-3} \times 81 = 636.2$ N.
(ii) Work/s $= Fu = 3817$ W.
(iii) KE of jet per second $= \tfrac12\rho aV^3 = \tfrac12 \times 1000 \times 7.854 \times 10^{-3} \times 3375 = 13\,254$ W, so $\eta = 3817/13\,254 = 28.8\%$.`,
            scheme: [
              { marks: 1, for: 'Force with relative velocity, 636 N' },
              { marks: 1, for: 'Work done per second 3817 W' },
              { marks: 1, for: 'Efficiency 28.8%' },
            ],
          },
        ],
      },
      {
        number: 5,
        parts: [
          {
            id: 'ga-5a',
            label: 'a',
            marks: 4,
            co: 'CO-2',
            prompt: md`The stream function for a two-dimensional flow is given by ψ = 2xy. Calculate the velocity at the point P (2, 3). Find the velocity potential function φ.`,
            topicIds: ['u1-potential-functions'],
            bookRef: 'Problem 5.14',
            answer: md`Bansal: $u = -\partial\psi/\partial y = -2x$, $v = \partial\psi/\partial x = 2y$.
At P (2, 3): $u = -4$, $v = 6$, $V = \sqrt{16 + 36} = 7.211$ units.
Irrotational check: $\partial v/\partial x - \partial u/\partial y = 0$, so φ exists.
$\partial\phi/\partial x = -u = 2x \Rightarrow \phi = x^2 + f(y)$; $\partial\phi/\partial y = f'(y) = -v = -2y \Rightarrow f = -y^2$.
$$\phi = x^2 - y^2$$`,
            scheme: [
              { marks: 1, for: 'Velocity components from ψ' },
              { marks: 1, for: 'Resultant velocity 7.211 at P' },
              { marks: 2, for: 'Velocity potential φ = x² − y²' },
            ],
          },
          {
            id: 'ga-5b',
            label: 'b',
            marks: 4,
            co: 'CO-6',
            prompt: md`A Pelton wheel has a mean bucket speed of 10 metres per second with a jet of water flowing at the rate of 700 litres/s under a head of 30 metres. The buckets deflect the jet through an angle of 160°. Calculate the power given by water to the runner and the hydraulic efficiency of the turbine. Assume co-efficient of velocity as 0.98.`,
            topicIds: ['u6-turbines', 'u6-euler'],
            bookRef: 'Problem 18.1',
            answer: md`$V_1 = 0.98\sqrt{2 \times 9.81 \times 30} = 23.78$ m/s $= V_{w1}$. $V_{r1} = V_1 - u = 13.78 = V_{r2}$. Outlet angle φ = 20°: $V_{w2} = V_{r2}\cos 20° - u = 2.95$ m/s (opposite to u).
$$P = \rho Q(V_{w1} + V_{w2})u = 1000 \times 0.7 \times 26.72 \times 10 = 187.0 \text{ kW}$$
$$\eta_h = \frac{2(V_{w1} + V_{w2})u}{V_1^2} = 94.5\%$$`,
            scheme: [
              { marks: 1, for: 'Jet velocity and inlet triangle' },
              { marks: 1, for: 'Outlet whirl V_w2' },
              { marks: 1, for: 'Power ≈ 187 kW' },
              { marks: 1, for: 'Hydraulic efficiency ≈ 94.5%' },
            ],
          },
        ],
        orPart: {
          id: 'ga-5or',
          label: 'or',
          marks: 4,
          co: 'CO-6',
          prompt: md`Define the specific speed of a turbine and derive an expression for it. Give the range of specific speed for Pelton, Francis and Kaplan turbines.`,
          topicIds: ['u6-turbines'],
          bookRef: '§18.12',
          answer: md`**Specific speed** $N_s$: the speed of a turbine, geometrically similar to the actual one, that develops 1 kW under a head of 1 m.

**Derivation.** $u = \dfrac{\pi DN}{60} \propto \sqrt H \Rightarrow D \propto \dfrac{\sqrt H}{N}$. $Q = $ area × velocity $\propto D^2\sqrt H$. $P = \eta\rho gQH \propto D^2H^{3/2} \propto \dfrac{H}{N^2}H^{3/2} = \dfrac{H^{5/2}}{N^2}$.
So $P = K\dfrac{H^{5/2}}{N^2}$, i.e. $N = \sqrt K\dfrac{H^{5/4}}{\sqrt P}$. For the specific turbine $P = 1$, $H = 1$, $N = N_s$ ⇒ $\sqrt K = N_s$:
$$N_s = \frac{N\sqrt P}{H^{5/4}}$$
**Ranges (P in kW):** Pelton 8.5–30 (single jet), up to about 51 (multi-jet); Francis 51–255; Kaplan 255–860.`,
          scheme: [
            { marks: 1, for: 'Definition of specific speed' },
            { marks: 2, for: 'Derivation N_s = N√P/H^{5/4}' },
            { marks: 1, for: 'Ranges for the three turbines' },
          ],
        },
      },
    ],
  },

  /* ======================================================================= */
  {
    id: 'generated-b',
    kind: 'generated',
    title: 'Bansal Paper B',
    blurb: 'Pascal’s law, U-tube manometer, plates, capillary viscometer, Bernoulli, pitot tube, pipe losses, pumps.',
    questions: [
      {
        number: 1,
        parts: [
          {
            id: 'gb-1a',
            label: 'a',
            marks: 3,
            co: 'CO-1',
            prompt: md`State and prove Pascal’s law. Derive the hydrostatic law of pressure variation.`,
            topicIds: ['u1-pressure-manometry'],
            bookRef: '§2.2–2.3',
            answer: md`**Pascal’s law:** the intensity of pressure at a point in a static fluid is equal in all directions.

**Proof:** a wedge element with faces $dy\,dz$ (pressure $p_x$), $dx\,dz$ (pressure $p_y$) and the sloping face $ds\,dz$ (pressure $p_z$) at angle θ. No shear in a static fluid. In x: $p_x\,dy\,dz = p_z\,ds\,dz\sin\theta$ and $ds\sin\theta = dy$ ⇒ $p_x = p_z$. In y: $p_y\,dx\,dz = p_z\,ds\,dz\cos\theta + \tfrac12dx\,dy\,dz\,\rho g$; the weight term is of higher order and vanishes as the element shrinks, and $ds\cos\theta = dx$ ⇒ $p_y = p_z$. Hence $p_x = p_y = p_z$.

**Hydrostatic law:** a vertical prism of area $\Delta A$ and height $\Delta z$: $p\Delta A - (p + \frac{\partial p}{\partial z}\Delta z)\Delta A - \rho g\Delta A\Delta z = 0$ ⇒ $\dfrac{\partial p}{\partial z} = -\rho g$, so $p = \rho gh$ at depth $h$ below a free surface.`,
            scheme: [
              { marks: 1.5, for: 'Statement and wedge proof of Pascal’s law' },
              { marks: 1.5, for: 'Hydrostatic law dp/dz = −ρg ⇒ p = ρgh' },
            ],
          },
          {
            id: 'gb-1b',
            label: 'b',
            marks: 2,
            co: 'CO-1',
            prompt: md`The right limb of a simple U-tube manometer containing mercury is open to the atmosphere while the left limb is connected to a pipe in which a fluid of sp. gr. 0.9 is flowing. The centre of the pipe is 12 cm below the level of mercury in the right limb. Find the pressure of fluid in the pipe if the difference of mercury level in the two limbs is 20 cm.`,
            topicIds: ['u1-pressure-manometry'],
            bookRef: 'Problem 2.9',
            answer: md`Height of pipe centre above the datum (lower mercury surface): $h_1 = 20 - 12 = 8$ cm.
$$p + \rho_1gh_1 = \rho_2gh_2 \Rightarrow p = 13600 \times 9.81 \times 0.2 - 900 \times 9.81 \times 0.08 = 26\,683 - 706 = 25\,977 \text{ N/m}^2$$
≈ 2.6 N/cm².`,
            scheme: [
              { marks: 1, for: 'Datum equation with h₁ = 8 cm' },
              { marks: 1, for: 'p ≈ 25 977 N/m²' },
            ],
          },
          {
            id: 'gb-1c',
            label: 'c',
            marks: 3,
            co: 'CO-1',
            prompt: md`Determine the total pressure on a circular plate of diameter 1.5 m which is placed vertically in water in such a way that the centre of the plate is 2 m below the free surface of water. Find the position of centre of pressure also.`,
            topicIds: ['u1-hydrostatic-forces'],
            bookRef: 'Ch. 3 exercise (B) 2',
            answer: md`$A = \dfrac\pi4(1.5)^2 = 1.767$ m², $\bar h = 2$ m.
$F = \rho gA\bar h = 1000 \times 9.81 \times 1.767 \times 2 = 34\,668$ N.
$I_G = \pi d^4/64 = 0.2485$ m⁴; $h^* = \bar h + \dfrac{I_G}{A\bar h} = 2 + \dfrac{0.2485}{1.767 \times 2} = 2.070$ m. (Book answer: 34 668.54 N, 2.07 m.)`,
            scheme: [
              { marks: 1.5, for: 'Total pressure ≈ 34.7 kN' },
              { marks: 1.5, for: 'Centre of pressure 2.07 m below the surface' },
            ],
          },
        ],
      },
      {
        number: 2,
        parts: [
          {
            id: 'gb-2a',
            label: 'a',
            marks: 3,
            co: 'CO-3',
            prompt: md`Calculate: (i) the pressure gradient along flow, (ii) the average velocity, and (iii) the discharge for an oil of viscosity 0.03 N·s/m² flowing between two stationary parallel plates which are 10 mm apart. Width of plates is 2 m. The velocity midway between the plates is 2.0 m/s.`,
            topicIds: ['u3-parallel-plates'],
            bookRef: 'Ch. 9 exercise 18',
            answer: md`(i) $U_{max} = -\dfrac{1}{8\mu}\dfrac{\partial p}{\partial x}t^2 \Rightarrow \dfrac{\partial p}{\partial x} = -\dfrac{8 \times 0.03 \times 2}{(0.01)^2} = -4800$ N/m² per m.
(ii) $\bar u = \tfrac23U_{max} = 1.333$ m/s.
(iii) $Q = \bar u\,b\,t = 1.333 \times 2 \times 0.01 = 0.0267$ m³/s.`,
            scheme: [
              { marks: 1, for: 'Pressure gradient −4800 N/m² per m' },
              { marks: 1, for: 'Average velocity 1.333 m/s' },
              { marks: 1, for: 'Discharge 0.0267 m³/s' },
            ],
          },
          {
            id: 'gb-2b',
            label: 'b',
            marks: 3,
            co: 'CO-3',
            prompt: md`The viscosity of an oil of sp. gr. 0.9 is measured by a capillary tube of diameter 50 mm. The difference of pressure head between two points 2 m apart is 0.5 m of water. The mass of oil collected in a measuring tank is 60 kg in 100 seconds. Find the viscosity of oil.`,
            topicIds: ['u3-viscometers'],
            bookRef: 'Problem 9.26',
            answer: md`$Q = 0.6/900 = 6.667 \times 10^{-4}$ m³/s; $\Delta p = 1000 \times 9.81 \times 0.5 = 4905$ N/m².
$$\mu = \frac{\pi D^4\Delta p}{128QL} = \frac{\pi(0.05)^4 \times 4905}{128 \times 6.667 \times 10^{-4} \times 2} = 0.564 \text{ N·s/m}^2$$
Check: $\bar u = 0.34$ m/s, $Re = 27$: laminar ✓.`,
            scheme: [
              { marks: 1, for: 'Discharge and pressure difference' },
              { marks: 1.5, for: 'Capillary formula and μ ≈ 0.564 N·s/m²' },
              { marks: 0.5, for: 'Laminar check' },
            ],
          },
          {
            id: 'gb-2c',
            label: 'c',
            marks: 2,
            co: 'CO-3',
            prompt: md`Describe Reynolds’ experiment. What does it show?`,
            topicIds: ['u4-turbulence'],
            bookRef: '§10.2',
            answer: md`Water flows from a tank through a glass tube with a bell-mouth entrance, controlled by a valve; a fine filament of dye is injected at the inlet centre. At low velocity the dye stays a straight line (laminar); at higher velocity it becomes wavy (transition); at high velocity it mixes across the tube (turbulent). It shows the type of flow depends on $Re = VD/\nu$, not velocity alone: laminar below about 2000, turbulent above about 4000.`,
            scheme: [
              { marks: 1, for: 'Apparatus and the three observed regimes' },
              { marks: 1, for: 'Conclusion in terms of Reynolds number' },
            ],
          },
        ],
      },
      {
        number: 3,
        parts: [
          {
            id: 'gb-3a',
            label: 'a',
            marks: 3,
            co: 'CO-2',
            prompt: md`Derive Euler’s equation of motion along a stream line and obtain Bernoulli’s equation from it. State the assumptions made.`,
            topicIds: ['u2-euler-bernoulli'],
            bookRef: '§6.3–6.5',
            answer: md`Element of area $dA$, length $ds$ along a stream line at angle θ. Forces along $s$: $p\,dA - (p + \frac{\partial p}{\partial s}ds)dA - \rho g\,dA\,ds\cos\theta = \rho\,dA\,ds\,a_s$ with $a_s = v\,\partial v/\partial s$ (steady). Using $\cos\theta = dz/ds$:
$$\frac{dp}{\rho} + g\,dz + v\,dv = 0 \qquad \text{(Euler)}$$
Integrating for constant ρ: $\dfrac{p}{\rho g} + \dfrac{v^2}{2g} + z = $ constant (Bernoulli).
**Assumptions:** ideal (inviscid) fluid, steady, incompressible, irrotational (or along one stream line), only gravity and pressure forces.`,
            scheme: [
              { marks: 1.5, for: 'Force balance and Euler’s equation' },
              { marks: 0.5, for: 'Integration to Bernoulli' },
              { marks: 1, for: 'Assumptions' },
            ],
          },
          {
            id: 'gb-3b',
            label: 'b',
            marks: 3,
            co: 'CO-2',
            prompt: md`A pitot-static tube placed in the centre of a 300 mm pipe line has one orifice pointing upstream and other perpendicular to it. The mean velocity in the pipe is 0.80 of the central velocity. Find the discharge through the pipe if the pressure difference between the two orifices is 60 mm of water. Take the co-efficient of pitot tube as $C_v$ = 0.98.`,
            topicIds: ['u2-flow-measurement'],
            bookRef: 'Problem 6.24',
            answer: md`Centre-line velocity $v = C_v\sqrt{2gh} = 0.98\sqrt{2 \times 9.81 \times 0.06} = 1.063$ m/s.
Mean velocity $\bar V = 0.8 \times 1.063 = 0.851$ m/s.
$Q = \dfrac\pi4(0.3)^2 \times 0.851 = 0.0601$ m³/s ≈ 60 litres/s.`,
            scheme: [
              { marks: 1, for: 'Pitot velocity 1.063 m/s' },
              { marks: 1, for: 'Mean velocity' },
              { marks: 1, for: 'Discharge ≈ 0.060 m³/s' },
            ],
          },
          {
            id: 'gb-3c',
            label: 'c',
            marks: 2,
            co: 'CO-4',
            prompt: md`Water is flowing over a thin smooth plate of length 4 m and width 2 m at a velocity of 1.0 m/s. If the boundary layer flow changes from laminar to turbulent at a Reynolds number 5 × 10⁵, find (i) the distance from the leading edge up to which the boundary layer is laminar, (ii) the thickness of the boundary layer at the transition point. Take μ = 9.81 × 10⁻⁴ N·s/m².`,
            topicIds: ['u5-bl-concept', 'u5-momentum-integral'],
            bookRef: 'Problem 13.16 (i)–(ii)',
            answer: md`(i) $x = \dfrac{Re\,\mu}{\rho U} = \dfrac{5 \times 10^5 \times 9.81 \times 10^{-4}}{1000 \times 1} = 0.4905$ m.
(ii) Blasius: $\delta = \dfrac{5x}{\sqrt{Re_x}} = \dfrac{5 \times 0.4905}{707.1} = 3.47$ mm.`,
            scheme: [
              { marks: 1, for: 'Laminar length 0.49 m' },
              { marks: 1, for: 'δ = 3.47 mm' },
            ],
          },
        ],
      },
      {
        number: 4,
        parts: [
          {
            id: 'gb-4a',
            label: 'a',
            marks: 3,
            co: 'CO-3',
            prompt: md`Find the head lost due to friction in a pipe of diameter 300 mm and length 50 m, through which water is flowing at a velocity of 3 m/s using (i) Darcy formula, (ii) Chezy’s formula for which C = 60. Take ν for water = 0.01 stoke.`,
            topicIds: ['u4-pipe-losses'],
            bookRef: 'Problem 11.1',
            answer: md`$Re = 3 \times 0.3/10^{-6} = 9 \times 10^5$; $f' = 0.079/Re^{1/4} = 0.00256$.
(i) $h_f = \dfrac{4f'LV^2}{2gd} = \dfrac{4 \times 0.00256 \times 50 \times 9}{2 \times 9.81 \times 0.3} = 0.783$ m.
(ii) $m = d/4 = 0.075$ m; $V = C\sqrt{mi} \Rightarrow i = \dfrac{9}{3600 \times 0.075} = 0.0333$; $h_f = iL = 1.67$ m.`,
            scheme: [
              { marks: 1, for: 'Reynolds number and friction coefficient' },
              { marks: 1, for: 'Darcy head loss 0.78 m' },
              { marks: 1, for: 'Chezy head loss 1.67 m' },
            ],
          },
          {
            id: 'gb-4b',
            label: 'b',
            marks: 2,
            co: 'CO-5',
            prompt: md`Derive expressions for the force exerted by a jet on a stationary flat plate inclined at an angle θ to the jet, normal to the plate and in the direction of the jet.`,
            topicIds: ['u6-jets'],
            bookRef: '§17.2.2',
            answer: md`Mass flow $\rho aV$. The jet leaves along the plate, so the momentum normal to the plate is destroyed. Velocity normal to the plate before impact is $V\sin\theta$, after impact 0:
$$F_n = \rho aV(V\sin\theta - 0) = \rho aV^2\sin\theta$$
Components: along the jet $F_x = F_n\sin\theta = \rho aV^2\sin^2\theta$; normal to the jet $F_y = F_n\cos\theta = \rho aV^2\sin\theta\cos\theta$.`,
            scheme: [
              { marks: 1, for: 'Normal force ρaV² sin θ' },
              { marks: 1, for: 'Components along and normal to the jet' },
            ],
          },
          {
            id: 'gb-4c',
            label: 'c',
            marks: 3,
            co: 'CO-5',
            prompt: md`A jet of water 50 mm in diameter with a velocity of 25 m/s strikes a series of flat plates moving at 10 m/s in the direction of the jet. Find the force on the plates, the work done per second and the efficiency.`,
            topicIds: ['u6-jets'],
            bookRef: '§17.4 (series of plates)',
            answer: md`Series: all water used, $\rho aV = 1000 \times 1.9635 \times 10^{-3} \times 25 = 49.09$ kg/s.
$F = \rho aV(V - u) = 49.09 \times 15 = 736.3$ N; work/s $= Fu = 7363$ W;
$\eta = \dfrac{2u(V - u)}{V^2} = \dfrac{2 \times 10 \times 15}{625} = 48\%$.`,
            scheme: [
              { marks: 1, for: 'Force 736 N using ρaV for a series' },
              { marks: 1, for: 'Work done 7.36 kW' },
              { marks: 1, for: 'Efficiency 48%' },
            ],
          },
        ],
      },
      {
        number: 5,
        parts: [
          {
            id: 'gb-5a',
            label: 'a',
            marks: 4,
            co: 'CO-2',
            prompt: md`The velocity potential function is given by $\phi = x^2 - y^2$. Find the velocity components, check that it represents a possible flow, and find the stream function.`,
            topicIds: ['u1-potential-functions'],
            bookRef: '§5.8, cf. Problem 5.14',
            answer: md`$u = -\partial\phi/\partial x = -2x$, $v = -\partial\phi/\partial y = 2y$.
Continuity: $\partial u/\partial x + \partial v/\partial y = -2 + 2 = 0$ ✓ (equivalently $\nabla^2\phi = 0$): a possible flow.
Stream function: $\partial\psi/\partial x = v = 2y \Rightarrow \psi = 2xy + f(y)$; $-\partial\psi/\partial y = u \Rightarrow -(2x + f') = -2x \Rightarrow f' = 0$.
$$\psi = 2xy$$`,
            scheme: [
              { marks: 1, for: 'Velocity components' },
              { marks: 1, for: 'Continuity / Laplace check' },
              { marks: 2, for: 'Stream function ψ = 2xy' },
            ],
          },
          {
            id: 'gb-5b',
            label: 'b',
            marks: 4,
            co: 'CO-6',
            prompt: md`Differentiate between impulse and reaction turbines. Explain the working of a Francis turbine and the function of the guide vanes and the draft tube.`,
            topicIds: ['u6-turbines'],
            bookRef: '§18.5, §18.10',
            answer: md`**Impulse vs reaction:** impulse—whole head converted to kinetic energy in a nozzle, runner at atmospheric pressure, partial admission, no draft tube (Pelton). Reaction—water enters with pressure + kinetic energy, pressure drops through the runner which runs full, full admission, draft tube needed (Francis, Kaplan).

**Francis turbine:** water from the penstock enters a **spiral casing** of decreasing area, which distributes it evenly round the runner; adjustable **guide vanes** direct it onto the runner blades at the correct angle and control the flow; it passes through the runner radially inward, turning axially, giving up pressure and kinetic energy; it leaves through the **draft tube** to the tail race.

**Draft tube:** a diverging pipe that lets the turbine sit above the tail race without losing head, and recovers exit kinetic energy by lowering the runner exit pressure below atmospheric.`,
            scheme: [
              { marks: 1.5, for: 'Impulse vs reaction differences' },
              { marks: 1.5, for: 'Francis turbine working with guide vanes' },
              { marks: 1, for: 'Function of the draft tube' },
            ],
          },
        ],
        orPart: {
          id: 'gb-5or',
          label: 'or',
          marks: 4,
          co: 'CO-6',
          prompt: md`Define a centrifugal pump. Classify pumps. Name the main parts of a centrifugal pump and explain why priming is necessary.`,
          topicIds: ['u6-pumps'],
          bookRef: '§19.1–19.3',
          answer: md`A **centrifugal pump** converts mechanical energy into pressure energy of a liquid by centrifugal action of a rotating impeller.

**Classification:** rotodynamic (centrifugal, axial, mixed flow) vs positive displacement (reciprocating, gear, screw); by casing (volute, vortex, diffuser); single/multistage; single/double suction; low/medium/high head.

**Main parts:** impeller, casing (volute), suction pipe with foot valve and strainer, delivery pipe with delivery valve.

**Priming:** filling the suction pipe and casing with liquid before starting. The pressure rise produced by the impeller is proportional to the density of the fluid in it; with air the suction created is negligible and the pump cannot lift water, so it must be primed.`,
          scheme: [
            { marks: 1, for: 'Definition' },
            { marks: 1, for: 'Classification' },
            { marks: 1, for: 'Main parts' },
            { marks: 1, for: 'Priming and its reason' },
          ],
        },
      },
    ],
  },
]
