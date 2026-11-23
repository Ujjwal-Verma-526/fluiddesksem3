import type { Paper } from '../types'

const md = String.raw

/**
 * Predicted papers: questions chosen to sit where the November 2024 paper points: the same
 * CO per slot, the same balance of derivation vs numerical, and the "next door" topic to
 * each 2024 question (e.g. 2024 derived Hagen–Poiseuille → predict a laminar-pipe numerical).
 * Each part's alignsWith says which 2024 question it was modelled on and why.
 * These are predictions, not leaks: treat them as targeted practice.
 */
export const PREDICTED_PAPERS: Paper[] = [
  /* ======================================================================= */
  {
    id: 'predicted-1',
    kind: 'predicted',
    title: 'Predicted Paper 1',
    blurb: 'Each 2024 derivation turned into its numerical, and each 2024 numerical into its derivation.',
    questions: [
      {
        number: 1,
        parts: [
          {
            id: 'p1-1a',
            label: 'a',
            marks: 3,
            co: 'CO-1',
            prompt: md`Derive expressions for the horizontal and vertical components of the total pressure force on a curved surface submerged in a static liquid. Where does each act?`,
            topicIds: ['u1-hydrostatic-forces'],
            alignsWith: '2024 Q1(a) proved the centre-of-pressure result for a plane surface; the curved-surface case is the other half of the same chapter and hasn’t been asked yet.',
            answer: md`Take an element $dA$ of the curved surface at depth $h$, with its normal at angle θ to the horizontal. $dF = \rho gh\,dA$ acts normal to it.

**Horizontal:** $dF_x = \rho gh\,dA\sin\theta$, and $dA\sin\theta$ is the projection of $dA$ on a vertical plane. So
$$F_x = \rho g\int h\,dA_{proj} = \rho gA_{proj}\bar h_{proj}$$
the force on the **vertical projection** of the surface, acting at that projection’s centre of pressure.

**Vertical:** $dF_y = \rho gh\,dA\cos\theta$, and $h\,dA\cos\theta$ is the volume of liquid vertically above $dA$. So
$$F_y = \rho g\,V_{above} = \text{weight of liquid above the surface (up to the free surface)}$$
acting through the centre of gravity of that liquid.

**Resultant:** $F = \sqrt{F_x^2 + F_y^2}$ at $\tan\phi = F_y/F_x$ to the horizontal. For a circular-arc surface it passes through the centre.`,
            scheme: [
              { marks: 1.5, for: 'F_x = force on the vertical projection, with line of action' },
              { marks: 1, for: 'F_y = weight of liquid above, through its centre of gravity' },
              { marks: 0.5, for: 'Resultant and its direction' },
            ],
          },
          {
            id: 'p1-1b',
            label: 'b',
            marks: 2,
            co: 'CO-1',
            prompt: md`Define buoyancy and centre of buoyancy. State the conditions of stable, unstable and neutral equilibrium for a floating body and for a submerged body.`,
            topicIds: ['u1-buoyancy-stability'],
            alignsWith: '2024 Q1(c) asked metacentric height; the definitions and equilibrium conditions it builds on are a typical 2-mark companion.',
            answer: md`**Buoyancy:** the upward force exerted by a fluid on a body immersed in it, equal to the weight of fluid displaced. **Centre of buoyancy B:** the point through which it acts, the centroid of the displaced volume.

| | Stable | Unstable | Neutral |
|---|---|---|---|
| Submerged body | B above G | B below G | B and G coincide |
| Floating body | M above G (GM > 0) | M below G (GM < 0) | M and G coincide |

A floating body can be stable even with B below G, because B moves as it tilts.`,
            scheme: [
              { marks: 1, for: 'Definitions of buoyancy and centre of buoyancy' },
              { marks: 1, for: 'Equilibrium conditions for both submerged and floating bodies' },
            ],
          },
          {
            id: 'p1-1c',
            label: 'c',
            marks: 3,
            co: 'CO-1',
            prompt: md`A wooden block of specific gravity 0.6 is 3 m long, 1.5 m wide and 1 m deep. It floats in water with its 1 m depth vertical. Find its metacentric height and state whether it is stable.`,
            topicIds: ['u1-buoyancy-stability'],
            alignsWith: '2024 Q1(c) asked the derivation of GM; the numerical on a rectangular block is the standard follow-up (cf. Bansal Problem 4.9).',
            answer: md`**Depth of immersion:** $0.6 \times 1 = 1 \times h \Rightarrow h = 0.6$ m.
**B and G above the base:** $OB = 0.3$ m, $OG = 0.5$ m ⇒ $BG = 0.2$ m.
**BM:** $I = \dfrac{3 \times 1.5^3}{12} = 0.8438$ m⁴ (about the long axis, the smaller value); $V = 3 \times 1.5 \times 0.6 = 2.7$ m³; $BM = I/V = 0.3125$ m.
$$GM = BM - BG = 0.3125 - 0.2 = 0.1125 \text{ m} > 0 \Rightarrow \text{stable}$$`,
            scheme: [
              { marks: 1, for: 'Depth of immersion and BG' },
              { marks: 1, for: 'Least I, V and BM' },
              { marks: 1, for: 'GM = 0.1125 m, stable' },
            ],
          },
        ],
      },
      {
        number: 2,
        parts: [
          {
            id: 'p1-2a',
            label: 'a',
            marks: 3,
            co: 'CO-3',
            prompt: md`An oil of viscosity 0.12 N·s/m² and density 850 kg/m³ flows through a 60 mm diameter pipe 150 m long at 3 litres/s. Check that the flow is laminar and find the pressure drop, the head lost and the power required to maintain the flow.`,
            topicIds: ['u3-pipe-laminar'],
            alignsWith: '2024 Q2(b) derived the laminar head-loss formula; a numerical using it is the most likely next question.',
            answer: md`$\bar u = \dfrac{0.003}{\pi(0.06)^2/4} = 1.061$ m/s. $Re = \dfrac{850 \times 1.061 \times 0.06}{0.12} = 451 < 2000$: laminar.
$$\Delta p = \frac{32\mu\bar uL}{D^2} = \frac{32 \times 0.12 \times 1.061 \times 150}{0.0036} = 1.698 \times 10^5 \text{ N/m}^2$$
$h_f = \Delta p/\rho g = 20.4$ m of oil. Power $= \Delta p\,Q = 1.698 \times 10^5 \times 0.003 = 509$ W.`,
            scheme: [
              { marks: 1, for: 'Velocity and Reynolds number (laminar)' },
              { marks: 1, for: 'Δp ≈ 1.70 × 10⁵ N/m² and h_f ≈ 20.4 m' },
              { marks: 1, for: 'Power ≈ 509 W' },
            ],
          },
          {
            id: 'p1-2b',
            label: 'b',
            marks: 3,
            co: 'CO-3',
            prompt: md`For laminar flow through a circular pipe, show that (i) the maximum velocity is twice the average velocity, and (ii) the shear stress varies linearly from zero at the centre to a maximum at the wall.`,
            topicIds: ['u3-pipe-laminar'],
            alignsWith: '2024 Q2(a) asked the profile and shear for parallel plates; the pipe version is the obvious swap.',
            answer: md`Force balance on a coaxial cylinder of radius $r$: $\tau = -\dfrac{\partial p}{\partial x}\dfrac r2$, **linear in r**: zero at $r = 0$, maximum $\tau_0 = -\dfrac{\partial p}{\partial x}\dfrac R2$ at the wall. That proves (ii).

With $\tau = -\mu\,du/dr$ and $u(R) = 0$: $u = -\dfrac{1}{4\mu}\dfrac{\partial p}{\partial x}(R^2 - r^2)$, so $U_{max} = -\dfrac{1}{4\mu}\dfrac{\partial p}{\partial x}R^2$.
$$\bar u = \frac{1}{\pi R^2}\int_0^R u\,2\pi r\,dr = -\frac{1}{8\mu}\frac{\partial p}{\partial x}R^2 = \frac{U_{max}}{2}$$
That proves (i).`,
            scheme: [
              { marks: 1, for: 'Shear stress distribution from force balance' },
              { marks: 1, for: 'Velocity profile and U_max' },
              { marks: 1, for: 'Mean velocity = U_max/2' },
            ],
          },
          {
            id: 'p1-2c',
            label: 'c',
            marks: 2,
            co: 'CO-3',
            prompt: md`Explain the working of a capillary tube viscometer and derive the expression for viscosity.`,
            topicIds: ['u3-viscometers'],
            alignsWith: '2024 Q2(c) asked for “any one” viscometer; expect a specific one to be named next time.',
            answer: md`Liquid flows at constant head from a tank through a fine horizontal capillary of diameter $D$ and length $L$; the flow is laminar. The pressure difference $\Delta p$ between two points $L$ apart is measured and the discharge $Q$ is collected in a known time. From Hagen–Poiseuille, $\Delta p = 32\mu\bar uL/D^2$ with $\bar u = 4Q/\pi D^2$:
$$\mu = \frac{\pi D^4\,\Delta p}{128\,Q\,L} = \frac{\pi\rho g h D^4}{128QL}$$`,
            scheme: [
              { marks: 1, for: 'Description of the apparatus and procedure' },
              { marks: 1, for: 'μ = πΔpD⁴/(128QL)' },
            ],
          },
        ],
      },
      {
        number: 3,
        parts: [
          {
            id: 'p1-3a',
            label: 'a',
            marks: 3,
            co: 'CO-2',
            prompt: md`A horizontal venturimeter with inlet and throat diameters 300 mm and 150 mm carries oil of specific gravity 0.9. The differential mercury manometer reads 20 cm. Find the discharge if $C_d$ = 0.98.`,
            topicIds: ['u2-flow-measurement', 'u2-euler-bernoulli'],
            alignsWith: '2024 Q3(a) linked Euler to Bernoulli; the classic Bernoulli application is a venturimeter numerical.',
            answer: md`$h = x\left(\dfrac{S_g}{S_o} - 1\right) = 0.2\left(\dfrac{13.6}{0.9} - 1\right) = 2.822$ m of oil.
$a_1 = 0.07069$ m², $a_2 = 0.01767$ m².
$$Q = C_d\frac{a_1a_2}{\sqrt{a_1^2 - a_2^2}}\sqrt{2gh} = 0.98 \times \frac{0.07069 \times 0.01767}{0.06845}\sqrt{2 \times 9.81 \times 2.822} = 0.133 \text{ m}^3/\text{s}$$`,
            scheme: [
              { marks: 1, for: 'Manometer head in terms of oil, 2.822 m' },
              { marks: 1, for: 'Venturi formula with areas' },
              { marks: 1, for: 'Q ≈ 0.133 m³/s' },
            ],
          },
          {
            id: 'p1-3b',
            label: 'b',
            marks: 3,
            co: 'CO-2',
            prompt: md`The resistance R to the motion of a completely submerged body depends on its length L, velocity V, the mass density ρ and the viscosity μ of the fluid. Using Buckingham’s π-theorem, show that $R = \rho L^2V^2\,\phi\left(\dfrac{\rho VL}{\mu}\right)$.`,
            topicIds: ['u2-dimensional'],
            alignsWith: '2024 Q3(b) asked the advantages of Buckingham’s theorem; applying it is the standard 3-mark version.',
            answer: md`$f(R, L, V, \rho, \mu) = 0$: $n = 5$, $m = 3$ ⇒ 2 π terms. Repeating variables $L, V, \rho$.
- $\pi_1 = L^aV^b\rho^cR$: M $c + 1 = 0$; T $-b - 2 = 0$; L $a + b - 3c + 1 = 0$ ⇒ $c = -1$, $b = -2$, $a = -2$: $\pi_1 = \dfrac{R}{\rho L^2V^2}$.
- $\pi_2 = L^aV^b\rho^c\mu$: M $c + 1 = 0$; T $-b - 1 = 0$; L $a + b - 3c - 1 = 0$ ⇒ $a = -1$, $b = -1$, $c = -1$: $\pi_2 = \dfrac{\mu}{\rho VL}$.

$\pi_1 = \phi_1(\pi_2)$, and the reciprocal of $\pi_2$ may be used:
$$R = \rho L^2V^2\,\phi\left(\frac{\rho VL}{\mu}\right)$$`,
            scheme: [
              { marks: 0.5, for: 'n, m and repeating variables' },
              { marks: 2, for: 'Both π terms by dimensional equations' },
              { marks: 0.5, for: 'Final form' },
            ],
          },
          {
            id: 'p1-3c',
            label: 'c',
            marks: 2,
            co: 'CO-4',
            prompt: md`Explain boundary layer separation with a neat sketch. What is the effect of pressure gradient on it?`,
            topicIds: ['u5-separation'],
            alignsWith: '2024 Q3(c) asked the control methods; the mechanism itself is the companion 2-marker.',
            answer: md`Along a surface the slow fluid near the wall must push against any rise of pressure. With a **favourable gradient** ($\partial p/\partial x < 0$) the flow accelerates and the layer stays attached. With an **adverse gradient** ($\partial p/\partial x > 0$) the near-wall fluid, already slowed by friction, loses momentum, the wall slope $(\partial u/\partial y)_{y=0}$ falls to zero (point of **separation S**), and downstream the near-wall flow reverses and the layer leaves the surface, forming a wake with eddies.
Criterion: $(\partial u/\partial y)_{y=0} > 0$ attached; $= 0$ on the verge; $< 0$ separated. (Sketch: three profiles—full, vertical tangent at the wall, reversed.)`,
            scheme: [
              { marks: 1, for: 'Mechanism with sketch of profiles' },
              { marks: 1, for: 'Role of adverse vs favourable gradient and the (∂u/∂y)₀ criterion' },
            ],
          },
        ],
      },
      {
        number: 4,
        parts: [
          {
            id: 'p1-4a',
            label: 'a',
            marks: 3,
            co: 'CO-3',
            prompt: md`A shaft of 100 mm diameter rotates at 450 rpm in a journal bearing 150 mm long. The uniform oil film between shaft and bearing is 0.5 mm thick and the viscosity of the oil is 0.8 poise. Find the power lost in the bearing.`,
            topicIds: ['u3-viscous-power'],
            alignsWith: '2024 Q4(a) was a collar bearing; the journal bearing is the other half of the same section and the likeliest swap.',
            answer: md`$\mu = 0.08$ N·s/m². $u = \pi DN/60 = 2.356$ m/s. $\tau = \mu u/t = 0.08 \times 2.356/0.0005 = 377$ N/m².
$F = \tau\pi DL = 377 \times \pi \times 0.1 \times 0.15 = 17.77$ N; $T = F D/2 = 0.888$ N·m.
$$P = \frac{2\pi NT}{60} = \frac{2\pi \times 450 \times 0.888}{60} = 41.9 \text{ W}$$`,
            scheme: [
              { marks: 1, for: 'Surface velocity and shear stress' },
              { marks: 1, for: 'Viscous force and torque' },
              { marks: 1, for: 'Power ≈ 41.9 W' },
            ],
          },
          {
            id: 'p1-4b',
            label: 'b',
            marks: 2,
            co: 'CO-5',
            prompt: md`Show that the efficiency of a series of flat plates struck by a jet is maximum when the plate velocity is half the jet velocity, and find the maximum efficiency.`,
            topicIds: ['u6-jets'],
            alignsWith: '2024 Q4(c)(iii) asked this as a numerical sub-part; a 2-mark proof of the general result is likely.',
            answer: md`For a series of plates all the water is used: force $= \rho aV(V - u)$, work/s $= \rho aV(V - u)u$, input KE/s $= \tfrac12\rho aV^3$.
$$\eta = \frac{2u(V - u)}{V^2}, \qquad \frac{d\eta}{du} = \frac{2(V - 2u)}{V^2} = 0 \Rightarrow u = \frac V2$$
$$\eta_{max} = \frac{2(V/2)(V/2)}{V^2} = \frac12 = 50\%$$`,
            scheme: [
              { marks: 1, for: 'Efficiency expression' },
              { marks: 1, for: 'Maximisation: u = V/2, η_max = 50%' },
            ],
          },
          {
            id: 'p1-4c',
            label: 'c',
            marks: 3,
            co: 'CO-5',
            prompt: md`A jet of water 75 mm in diameter with a velocity of 30 m/s strikes a single semicircular vane moving at 15 m/s in the direction of the jet. Find the force on the vane, the work done per second and the efficiency.`,
            topicIds: ['u6-jets'],
            alignsWith: '2024 Q4(b) proved the semicircular-vane force for a fixed vane; this extends it to a moving vane.',
            answer: md`Single moving vane: mass striking per second $= \rho a(V - u)$, and the relative velocity $(V - u)$ is reversed.
$a = 4.418 \times 10^{-3}$ m².
$$F = 2\rho a(V - u)^2 = 2 \times 1000 \times 4.418 \times 10^{-3} \times 15^2 = 1988 \text{ N}$$
Work/s $= Fu = 29.8$ kW. Input KE/s $= \tfrac12\rho aV^3 = 59.6$ kW, so $\eta = 50\%$.`,
            scheme: [
              { marks: 1, for: 'Force with relative velocity and reversal, ≈ 1988 N' },
              { marks: 1, for: 'Work done ≈ 29.8 kW' },
              { marks: 1, for: 'Efficiency 50%' },
            ],
          },
        ],
      },
      {
        number: 5,
        parts: [
          {
            id: 'p1-5a',
            label: 'a',
            marks: 4,
            co: 'CO-2',
            prompt: md`The velocity components in a two-dimensional flow are u = x − 4y and v = −y − 4x. Show that the flow is possible and irrotational, and find the velocity potential and the stream function.`,
            topicIds: ['u1-potential-functions'],
            alignsWith: '2024 Q5(a) gave ψ and asked φ; the reverse direction (velocities → both functions) carries the same 4 marks.',
            answer: md`**Continuity:** $\dfrac{\partial u}{\partial x} + \dfrac{\partial v}{\partial y} = 1 - 1 = 0$ ✓ possible.
**Rotation:** $\dfrac{\partial v}{\partial x} - \dfrac{\partial u}{\partial y} = -4 - (-4) = 0$ ✓ irrotational.

**φ** (Bansal, $u = -\partial\phi/\partial x$): $\dfrac{\partial\phi}{\partial x} = -x + 4y \Rightarrow \phi = -\dfrac{x^2}{2} + 4xy + f(y)$; $\dfrac{\partial\phi}{\partial y} = 4x + f' = -v = y + 4x \Rightarrow f = \dfrac{y^2}{2}$.
$$\phi = -\frac{x^2}{2} + 4xy + \frac{y^2}{2}$$
**ψ** ($v = \partial\psi/\partial x$, $u = -\partial\psi/\partial y$): $\psi = -xy - 2x^2 + g(y)$; $-\dfrac{\partial\psi}{\partial y} = x - g' = x - 4y \Rightarrow g = 2y^2$.
$$\psi = 2y^2 - 2x^2 - xy$$`,
            scheme: [
              { marks: 1, for: 'Continuity and irrotationality checks' },
              { marks: 1.5, for: 'Velocity potential' },
              { marks: 1.5, for: 'Stream function' },
            ],
          },
          {
            id: 'p1-5b',
            label: 'b',
            marks: 4,
            co: 'CO-6',
            prompt: md`A turbine develops 5000 kW under a head of 60 m at 300 rpm. Find its specific speed and suggest the type. Using unit quantities, find the speed and power when the head falls to 40 m.`,
            topicIds: ['u6-turbines'],
            alignsWith: '2024 Q5 (or) asked the meanings of unit and specific quantities; a numerical using them is the natural follow-up.',
            answer: md`$$N_s = \frac{N\sqrt P}{H^{5/4}} = \frac{300\sqrt{5000}}{60^{1.25}} = 127$$
51 < 127 < 255 ⇒ **Francis turbine**.
Unit speed $N_u = N/\sqrt H = 38.73$; unit power $P_u = P/H^{3/2} = 10.76$.
At $H = 40$ m: $N = 38.73\sqrt{40} = 245$ rpm; $P = 10.76 \times 40^{1.5} = 2722$ kW.`,
            scheme: [
              { marks: 1.5, for: 'Specific speed ≈ 127 and type (Francis)' },
              { marks: 1, for: 'Unit speed and unit power' },
              { marks: 1.5, for: 'N ≈ 245 rpm and P ≈ 2720 kW at 40 m' },
            ],
          },
        ],
        orPart: {
          id: 'p1-5or',
          label: 'or',
          marks: 4,
          co: 'CO-6',
          prompt: md`Derive an expression for the work done by the impeller of a centrifugal pump on the liquid per second per unit weight. Define manometric, mechanical and overall efficiencies.`,
          topicIds: ['u6-pumps', 'u6-euler'],
          alignsWith: '2024 Q5(b) derived Euler’s equation for machines in general; the pump form (radial entry) is its most-asked special case.',
          answer: md`Euler’s equation for a rotor: work per unit weight $= (V_{w2}u_2 - V_{w1}u_1)/g$ for a pump (energy given to the fluid). Water enters the impeller **radially** (no whirl), so $V_{w1} = 0$:
$$\frac{\text{work done}}{\text{weight}} = \frac{V_{w2}u_2}{g}, \qquad \text{work/s} = \frac{W}{g}V_{w2}u_2 = \rho QV_{w2}u_2$$
(from the outlet triangle, $V_{w2} = u_2 - V_{f2}\cot\phi$.)

- **Manometric efficiency** $\eta_{man} = \dfrac{gH_m}{V_{w2}u_2}$: manometric head ÷ head imparted by the impeller.
- **Mechanical efficiency** $\eta_m = \dfrac{\rho QV_{w2}u_2}{\text{shaft power}}$: power at the impeller ÷ power at the shaft.
- **Overall efficiency** $\eta_o = \dfrac{\rho gQH_m}{\text{shaft power}} = \eta_{man}\,\eta_m$.`,
          scheme: [
            { marks: 2, for: 'Work done per unit weight V_w2u₂/g with radial-entry assumption' },
            { marks: 2, for: 'Three efficiencies defined, with η_o = η_man η_m' },
          ],
        },
      },
    ],
  },

  /* ======================================================================= */
  {
    id: 'predicted-2',
    kind: 'predicted',
    title: 'Predicted Paper 2',
    blurb: 'Same slots, different angle: plane surfaces, pipe losses, notches, Rayleigh’s method, single-plate efficiency, Pelton wheel.',
    questions: [
      {
        number: 1,
        parts: [
          {
            id: 'p2-1a',
            label: 'a',
            marks: 3,
            co: 'CO-1',
            prompt: md`Define total pressure and centre of pressure. Show that for a vertical rectangular plate of depth d with its upper edge in the free surface, the centre of pressure is at 2d/3 below the surface.`,
            topicIds: ['u1-hydrostatic-forces'],
            alignsWith: '2024 Q1(a) proved h* > h̄ in general; applying h* = h̄ + I_G/Ah̄ to a standard shape is the likely re-ask.',
            answer: md`**Total pressure:** the resultant force exerted by a static fluid on a surface, always normal to it. **Centre of pressure:** the point where it acts.

For a plane surface $h^* = \bar h + \dfrac{I_G}{A\bar h}$. Rectangle width $b$, depth $d$, top edge in the surface: $\bar h = d/2$, $A = bd$, $I_G = bd^3/12$.
$$h^* = \frac d2 + \frac{bd^3/12}{bd \cdot d/2} = \frac d2 + \frac d6 = \frac{2d}{3}$$
Total pressure $F = \rho gbd^2/2$ (the area of the triangular pressure diagram, whose centroid is at 2d/3, the same result).`,
            scheme: [
              { marks: 1, for: 'Definitions' },
              { marks: 2, for: 'Substitution leading to h* = 2d/3' },
            ],
          },
          {
            id: 'p2-1b',
            label: 'b',
            marks: 2,
            co: 'CO-1',
            prompt: md`Express a gauge pressure of 2.5 bar as a head of (i) water, (ii) oil of specific gravity 0.85, (iii) mercury. What is the absolute pressure if the atmospheric pressure is 1.013 bar?`,
            topicIds: ['u1-pressure-manometry'],
            alignsWith: '2024 Q1(b) was manometry theory for 2 marks; pressure-head conversion is the simplest 2-mark numerical in the same slot.',
            answer: md`$h = p/\rho g$ with $p = 2.5 \times 10^5$ N/m²:
(i) water $= 2.5 \times 10^5/9810 = 25.48$ m; (ii) oil $= 2.5 \times 10^5/(850 \times 9.81) = 29.98$ m; (iii) mercury $= 2.5 \times 10^5/(13600 \times 9.81) = 1.874$ m.
Absolute $= 2.5 + 1.013 = 3.513$ bar.`,
            scheme: [
              { marks: 1.5, for: 'Three heads (½ each)' },
              { marks: 0.5, for: 'Absolute pressure 3.513 bar' },
            ],
          },
          {
            id: 'p2-1c',
            label: 'c',
            marks: 3,
            co: 'CO-1',
            prompt: md`A ship of weight 20 000 kN is tilted through 4° when a load of 300 kN is moved 8 m across the deck. Find the metacentric height. Explain why a large GM gives an uncomfortable ship.`,
            topicIds: ['u1-buoyancy-stability'],
            alignsWith: '2024 Q1(c) asked the experimental method for GM; this is its numerical.',
            answer: md`Experimental method: $w_1x = W\cdot GM\tan\theta$.
$$GM = \frac{w_1x}{W\tan\theta} = \frac{300 \times 8}{20\,000 \times \tan 4°} = \frac{2400}{1398.5} = 1.716 \text{ m}$$
A large GM gives a large righting moment, so the ship returns quickly and rolls with a short, jerky period (period $\propto 1/\sqrt{GM}$), which is uncomfortable for passengers and cargo. Passenger ships use a small but positive GM.`,
            scheme: [
              { marks: 2, for: 'GM = w₁x/(W tan θ) = 1.72 m' },
              { marks: 1, for: 'Large GM ⇒ short, jerky roll period' },
            ],
          },
        ],
      },
      {
        number: 2,
        parts: [
          {
            id: 'p2-2a',
            label: 'a',
            marks: 3,
            co: 'CO-3',
            prompt: md`Oil of viscosity 0.9 N·s/m² and specific gravity 0.9 flows between two fixed parallel plates 12 mm apart under a pressure gradient of −1500 N/m² per metre. Find the maximum and average velocities, the discharge per metre width and the shear stress at the plates.`,
            topicIds: ['u3-parallel-plates'],
            alignsWith: '2024 Q2(a) asked the analysis of flow between plates; the numerical using those results is the likely next step.',
            answer: md`$$U_{max} = -\frac{1}{8\mu}\frac{\partial p}{\partial x}t^2 = \frac{1500 \times 0.012^2}{8 \times 0.9} = 0.030 \text{ m/s}$$
$\bar u = \tfrac23U_{max} = 0.020$ m/s; $q = \bar u\,t = 2.4 \times 10^{-4}$ m³/s per m.
$\tau_0 = -\dfrac12\dfrac{\partial p}{\partial x}t = \dfrac12 \times 1500 \times 0.012 = 9$ N/m².
Check $Re = 900 \times 0.02 \times 0.012/0.9 = 0.24$: laminar ✓.`,
            scheme: [
              { marks: 1, for: 'U_max = 0.03 m/s and ū = 0.02 m/s' },
              { marks: 1, for: 'Discharge per metre width' },
              { marks: 1, for: 'Wall shear stress 9 N/m²' },
            ],
          },
          {
            id: 'p2-2b',
            label: 'b',
            marks: 3,
            co: 'CO-3',
            prompt: md`Derive an expression for the loss of head due to sudden enlargement of a pipe.`,
            topicIds: ['u4-pipe-losses'],
            alignsWith: '2024 Q2(b)/Q3(b) asked friction losses; the minor-loss derivation is the other loss derivation in the syllabus.',
            answer: md`Sections 1 (area $A_1$, $V_1$, $p_1$) and 2 (downstream, $A_2$, $V_2$, $p_2$). In the corner eddies the pressure is about $p_1$ (call it $p'$), acting on $(A_2 - A_1)$.
**Momentum** on the fluid between 1 and 2:
$$p_1A_1 + p'(A_2 - A_1) - p_2A_2 = \rho A_2V_2(V_2 - V_1) \Rightarrow \frac{p_1 - p_2}{\rho g} = \frac{V_2^2 - V_1V_2}{g}$$
**Energy:** $h_e = \dfrac{p_1 - p_2}{\rho g} + \dfrac{V_1^2 - V_2^2}{2g}$. Substituting:
$$h_e = \frac{V_2^2 - 2V_1V_2 + V_1^2}{2g} = \frac{(V_1 - V_2)^2}{2g}$$`,
            scheme: [
              { marks: 1, for: 'Momentum equation with eddy pressure assumption' },
              { marks: 1, for: 'Bernoulli with loss term' },
              { marks: 1, for: 'h_e = (V₁ − V₂)²/2g' },
            ],
          },
          {
            id: 'p2-2c',
            label: 'c',
            marks: 2,
            co: 'CO-3',
            prompt: md`Distinguish between hydrodynamically smooth and rough boundaries.`,
            topicIds: ['u4-smooth-rough'],
            alignsWith: '2024 Q2(c) was a short theory question; smooth/rough is the shortest 2-mark topic in the same CO.',
            answer: md`Compare the average roughness height $k$ with the laminar sub-layer thickness $\delta'$ (or use $u_*k/\nu$):
- **Smooth:** $k/\delta' < 0.25$ ($u_*k/\nu < 4$): roughness is buried in the sub-layer and does not affect the flow; $f$ depends on Re only.
- **Rough:** $k/\delta' > 6$ ($u_*k/\nu > 100$): roughness projects through the sub-layer into the turbulent core; $f$ depends on $k/D$ only.
- In between: transition. The same surface can be smooth at low Re and rough at high Re, because $\delta'$ thins as Re rises.`,
            scheme: [
              { marks: 1, for: 'Criterion based on k vs δ′' },
              { marks: 1, for: 'Effect on friction factor and Re-dependence' },
            ],
          },
        ],
      },
      {
        number: 3,
        parts: [
          {
            id: 'p2-3a',
            label: 'a',
            marks: 3,
            co: 'CO-2',
            prompt: md`Derive the expression for the discharge over a rectangular notch. Find the discharge over a rectangular notch 1.5 m long under a head of 0.3 m, taking $C_d$ = 0.6.`,
            topicIds: ['u2-flow-measurement'],
            alignsWith: '2024 Q3 (CO-2) leaned on Bernoulli; flow-measurement derivations are the CO-2 topic the paper skipped.',
            answer: md`A horizontal strip of thickness $dh$ at depth $h$ below the free surface: theoretical velocity $\sqrt{2gh}$, area $L\,dh$:
$$dQ = C_dL\,dh\sqrt{2gh} \Rightarrow Q = C_dL\sqrt{2g}\int_0^Hh^{1/2}dh = \frac23C_dL\sqrt{2g}\,H^{3/2}$$
Numerical: $Q = \tfrac23 \times 0.6 \times 1.5 \times 4.429 \times 0.3^{1.5} = 0.437$ m³/s.`,
            scheme: [
              { marks: 2, for: 'Strip integration to Q = (2/3) C_d L √(2g) H^{3/2}' },
              { marks: 1, for: 'Q ≈ 0.437 m³/s' },
            ],
          },
          {
            id: 'p2-3b',
            label: 'b',
            marks: 3,
            co: 'CO-2',
            prompt: md`Using Rayleigh’s method, show that the power P required to drive a pump depends on ρ, g, Q and H as P = k ρgQH. State one limitation of Rayleigh’s method.`,
            topicIds: ['u2-dimensional'],
            alignsWith: '2024 Q3(b) asked the limitations of Rayleigh’s method; applying it to a small problem is the matching question.',
            answer: md`$P = k\rho^ag^bQ^cH^d$. Dimensions: $ML^2T^{-3} = (ML^{-3})^a(LT^{-2})^b(L^3T^{-1})^c(L)^d$.
M: $a = 1$. T: $-2b - c = -3$. L: $-3a + b + 3c + d = 2$.
Four unknowns, three equations, so the problem needs one more condition: power must be proportional to the weight flow rate $\rho gQ$ (so $b = 1$). Then $c = 1$ and $d = 2 + 3 - 1 - 3 = 1$:
$$P = k\,\rho gQH$$
**Limitation:** with more variables than fundamental dimensions plus one, Rayleigh’s method cannot fix all the exponents (as here) and gives no rule for grouping them; Buckingham’s method is then used.`,
            scheme: [
              { marks: 2, for: 'Dimensional equations and solution P = kρgQH' },
              { marks: 1, for: 'Limitation of Rayleigh’s method' },
            ],
          },
          {
            id: 'p2-3c',
            label: 'c',
            marks: 2,
            co: 'CO-4',
            prompt: md`Air (ν = 1.5 × 10⁻⁵ m²/s, ρ = 1.2 kg/m³) flows at 5 m/s over a flat plate 1 m long and 0.5 m wide. Find the boundary layer thickness at the trailing edge and the drag on one side, using the Blasius solution.`,
            topicIds: ['u5-bl-concept', 'u5-momentum-integral'],
            alignsWith: '2024 Q3(c) was boundary-layer theory; the small Blasius numerical is the standard CO-4 alternative.',
            answer: md`$Re_L = 5 \times 1/1.5 \times 10^{-5} = 3.33 \times 10^5 < 5 \times 10^5$: laminar throughout.
$\delta = 5L/\sqrt{Re_L} = 5/577.4 = 8.66$ mm.
$C_D = 1.328/\sqrt{Re_L} = 0.0023$; $F_D = C_D\cdot\tfrac12\rho U^2\cdot A = 0.0023 \times 0.5 \times 1.2 \times 25 \times 0.5 = 0.0173$ N.`,
            scheme: [
              { marks: 1, for: 'Re and δ = 8.66 mm' },
              { marks: 1, for: 'C_D and drag ≈ 0.017 N' },
            ],
          },
        ],
      },
      {
        number: 4,
        parts: [
          {
            id: 'p2-4a',
            label: 'a',
            marks: 3,
            co: 'CO-3',
            prompt: md`Water flows at 2 m/s through a 200 mm pipe 500 m long (f′ = 0.005), which then enlarges suddenly to 400 mm. Find the head lost in friction and at the enlargement.`,
            topicIds: ['u4-pipe-losses'],
            alignsWith: '2024 Q3(b) derived Darcy–Weisbach; Q4(a) is the CO-3 numerical slot, so a pipe-loss numerical fits.',
            answer: md`Friction: $h_f = \dfrac{4f'LV^2}{2gD} = \dfrac{4 \times 0.005 \times 500 \times 4}{2 \times 9.81 \times 0.2} = 10.19$ m.
Enlargement: $V_2 = V_1(D_1/D_2)^2 = 0.5$ m/s; $h_e = \dfrac{(2 - 0.5)^2}{2 \times 9.81} = 0.115$ m.
Total ≈ 10.3 m (friction dominates).`,
            scheme: [
              { marks: 1.5, for: 'Friction loss 10.19 m' },
              { marks: 1.5, for: 'V₂ and enlargement loss 0.115 m' },
            ],
          },
          {
            id: 'p2-4b',
            label: 'b',
            marks: 2,
            co: 'CO-5',
            prompt: md`Show that the efficiency of a single flat plate moving in the direction of the jet is maximum when u = V/3, and that the maximum is 8/27.`,
            topicIds: ['u6-jets'],
            alignsWith: '2024 Q4(b) was a short jet proof; the single-plate optimum is the companion result.',
            answer: md`Single plate: mass striking per second $\rho a(V - u)$; force $\rho a(V - u)^2$; work/s $\rho a(V - u)^2u$; input $\tfrac12\rho aV^3$.
$$\eta = \frac{2u(V - u)^2}{V^3}, \qquad \frac{d\eta}{du} \propto (V - u)^2 - 2u(V - u) = (V - u)(V - 3u) = 0 \Rightarrow u = \frac V3$$
$$\eta_{max} = \frac{2(V/3)(2V/3)^2}{V^3} = \frac{8}{27} = 29.6\%$$`,
            scheme: [
              { marks: 1, for: 'Efficiency expression for a single plate' },
              { marks: 1, for: 'u = V/3 and η_max = 8/27' },
            ],
          },
          {
            id: 'p2-4c',
            label: 'c',
            marks: 3,
            co: 'CO-5',
            prompt: md`A 40 mm diameter jet with a velocity of 30 m/s strikes a series of flat plates moving at 10 m/s in the direction of the jet. Find the force on the plates, the work done per second and the efficiency.`,
            topicIds: ['u6-jets'],
            alignsWith: '2024 Q4(c) was exactly this type with V = 50, u = 12; expect the same structure with new numbers.',
            answer: md`Series: $\rho aV = 1000 \times 1.2566 \times 10^{-3} \times 30 = 37.70$ kg/s.
$F = \rho aV(V - u) = 37.70 \times 20 = 754$ N; work/s $= Fu = 7540$ W.
$\eta = 2u(V - u)/V^2 = 2 \times 10 \times 20/900 = 44.4\%$.`,
            scheme: [
              { marks: 1, for: 'Force 754 N' },
              { marks: 1, for: 'Work done 7.54 kW' },
              { marks: 1, for: 'Efficiency 44.4%' },
            ],
          },
        ],
      },
      {
        number: 5,
        parts: [
          {
            id: 'p2-5a',
            label: 'a',
            marks: 4,
            co: 'CO-2',
            prompt: md`For the stream function ψ = x² − y², show that the flow is irrotational, find the velocity potential, and find the velocity at the point (1, 2).`,
            topicIds: ['u1-potential-functions'],
            alignsWith: '2024 Q5(a) was ψ = 3xy; ψ = x² − y² is the same corner flow rotated 45°.',
            answer: md`Bansal: $u = -\partial\psi/\partial y = 2y$, $v = \partial\psi/\partial x = 2x$.
Rotation: $\dfrac{\partial v}{\partial x} - \dfrac{\partial u}{\partial y} = 2 - 2 = 0$: irrotational.
$\dfrac{\partial\phi}{\partial x} = -u = -2y \Rightarrow \phi = -2xy + f(y)$; $\dfrac{\partial\phi}{\partial y} = -2x + f' = -v = -2x \Rightarrow f' = 0$.
$$\phi = -2xy$$
At (1, 2): $u = 4$, $v = 2$, $V = \sqrt{20} = 4.47$ units.`,
            scheme: [
              { marks: 1, for: 'Velocity components' },
              { marks: 1, for: 'Irrotationality' },
              { marks: 1.5, for: 'φ = −2xy' },
              { marks: 0.5, for: 'Velocity 4.47 at (1, 2)' },
            ],
          },
          {
            id: 'p2-5b',
            label: 'b',
            marks: 4,
            co: 'CO-6',
            prompt: md`A Pelton wheel works under a head of 60 m with a discharge of 0.3 m³/s. The bucket speed is 15 m/s, $C_v$ = 0.98 and the jet is deflected through 165°. Find the power developed and the hydraulic efficiency.`,
            topicIds: ['u6-turbines', 'u6-euler'],
            alignsWith: '2024 Q5(b) derived Euler’s equation for machines; applying it to a Pelton wheel is the classic 4-mark numerical (cf. Bansal Problem 18.1).',
            answer: md`$V_1 = 0.98\sqrt{2 \times 9.81 \times 60} = 33.62$ m/s $= V_{w1}$. $V_{r1} = V_1 - u = 18.62 = V_{r2}$.
Outlet angle $\phi = 180° - 165° = 15°$: $V_{w2} = V_{r2}\cos 15° - u = 17.99 - 15 = 2.99$ m/s.
$$P = \rho Q(V_{w1} + V_{w2})u = 1000 \times 0.3 \times 36.61 \times 15 = 164.8 \text{ kW}$$
$$\eta_h = \frac{2(V_{w1} + V_{w2})u}{V_1^2} = \frac{2 \times 36.61 \times 15}{33.62^2} = 97.2\%$$
(High because friction on the bucket is ignored, $V_{r2} = V_{r1}$.)`,
            scheme: [
              { marks: 1, for: 'Jet velocity and inlet triangle' },
              { marks: 1, for: 'Outlet whirl V_w2 ≈ 2.99 m/s' },
              { marks: 1, for: 'Power ≈ 165 kW' },
              { marks: 1, for: 'Hydraulic efficiency ≈ 97%' },
            ],
          },
        ],
        orPart: {
          id: 'p2-5or',
          label: 'or',
          marks: 4,
          co: 'CO-6',
          prompt: md`Compare Pelton, Francis and Kaplan turbines (head, flow direction, specific speed, type). What is a draft tube and why is it needed in reaction turbines only?`,
          topicIds: ['u6-turbines'],
          alignsWith: '2024 Q5(b) asked the bases of classification; a comparison table plus the draft tube is the matching either/or.',
          answer: md`| | Pelton | Francis | Kaplan |
|---|---|---|---|
| Type | impulse | reaction | reaction |
| Head | high (> 250 m) | medium (60–250 m) | low (< 60 m) |
| Flow | tangential | radial in, axial out | axial |
| N_s | 8.5–51 | 51–255 | 255–860 |
| Blades | buckets, partial admission | fixed vanes, full | adjustable, full |

**Draft tube:** a gradually diverging pipe from the runner exit to the tail race, running full. It lets the turbine sit above the tail race without losing that height, and recovers exit kinetic energy by lowering the runner exit pressure below atmospheric. An impulse wheel works at atmospheric pressure throughout (the jet discharges freely into air), so there is no pressure difference across it for a draft tube to recover.`,
          scheme: [
            { marks: 2, for: 'Comparison of the three turbines on at least four bases' },
            { marks: 2, for: 'Draft tube: function and why reaction turbines only' },
          ],
        },
      },
    ],
  },
]
