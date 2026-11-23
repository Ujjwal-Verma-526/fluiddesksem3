import type { Paper } from '../types'

const md = String.raw

/**
 * ME205 End Term Examination, November 2024 — transcribed word for word from
 * source/endsem-nov-2024.pdf, including the paper's own spelling and grammar.
 * Model answers are written to the length the marks deserve.
 */
export const OFFICIAL_PAPERS: Paper[] = [
  {
    id: 'official-2024',
    kind: 'official',
    title: 'End Term Examination, November 2024',
    session: 'November 2024',
    blurb: 'The real paper: statics, viscous flow, Euler/Buckingham, boundary layer, jets and turbines.',
    sourceFile: 'source/endsem-nov-2024.pdf',
    questions: [
      /* ---------------------------------------------------------------- Q1 */
      {
        number: 1,
        parts: [
          {
            id: 'o24-1a',
            label: 'a',
            marks: 3,
            co: 'CO-1',
            prompt: md`Prove that in an immersed plane surface, the centre of pressure is always below its centre of gravity`,
            topicIds: ['u1-hydrostatic-forces'],
            answer: md`Take a plane surface of area $A$ immersed vertically, centroid G at depth $\bar h$. A horizontal strip of width $b$ and thickness $dh$ at depth $h$ carries $dF = \rho g h\,b\,dh$.

**Total pressure:** $F = \int\rho g h\,dA = \rho g A\bar h$.

**Centre of pressure:** moments about the free-surface line O–O:
$$F\,h^* = \int\rho g h^2\,dA = \rho g\,I_O = \rho g\,(I_G + A\bar h^2)$$
$$h^* = \frac{I_G + A\bar h^2}{A\bar h} = \bar h + \frac{I_G}{A\bar h}$$

**Proof:** $I_G$ (second moment of area about the centroidal axis) is always positive, and $A$ and $\bar h$ are positive, so $\dfrac{I_G}{A\bar h} > 0$ and therefore $h^* > \bar h$: the centre of pressure always lies below the centroid. Physically, pressure grows with depth, so the lower half of the surface carries more force. (For an inclined plane $h^* = \bar h + I_G\sin^2\theta/A\bar h$, still $> \bar h$.) The gap shrinks as $\bar h$ increases.`,
            scheme: [
              { marks: 1, for: 'Strip force and total pressure F = ρgAh̄' },
              { marks: 1, for: 'Moment equation and parallel-axis theorem leading to h* = h̄ + I_G/(Ah̄)' },
              { marks: 1, for: 'Argument that I_G/(Ah̄) > 0 ⇒ h* > h̄, with physical reason' },
            ],
          },
          {
            id: 'o24-1b',
            label: 'b',
            marks: 2,
            co: 'CO-1',
            prompt: md`What is manometer. Classify U tube & manometers along with utility. Also describe a differential manometer.`,
            topicIds: ['u1-pressure-manometry'],
            answer: md`**Manometer:** a device that measures pressure at a point by balancing it against a column of the same or another liquid.

**Classification and use**
- *Simple manometers* (pressure at one point): **piezometer** (small positive liquid pressure), **U-tube** (large positive or vacuum pressure, liquids or gases; mercury keeps it short), **single-column/inclined** (small pressure changes; large reservoir so one reading suffices).
- *Differential manometers* (difference between two points): **U-tube differential** (heavy gauge liquid, large Δp) and **inverted U-tube** (light liquid on top, small Δp).

**Differential manometer:** a U-tube with mercury, one limb to A and the other to B. Equating pressures on the datum through the lower mercury surface:
$$p_A + \rho_1 g(h + x) = p_B + \rho_g g h + \rho_2 g y$$
For A and B at the same level with the same liquid: $p_A - p_B = gh(\rho_g - \rho_1)$.`,
            scheme: [
              { marks: 1, for: 'Definition and classification with utility of each type' },
              { marks: 1, for: 'Differential manometer: sketch/description and pressure-difference equation' },
            ],
          },
          {
            id: 'o24-1c',
            label: 'c',
            marks: 3,
            co: 'CO-1',
            prompt: md`Derive analytically and experimentally Meta centric height`,
            topicIds: ['u1-buoyancy-stability'],
            answer: md`**Analytical method.** Tilt the floating body through a small angle θ. A wedge emerges on one side and an equal wedge is immersed on the other. A strip of the water-line plane at distance $x$ from the axis, area $dA$, sweeps volume $x\theta\,dA$, giving extra buoyancy $\rho g x\theta\,dA$. The two wedges form a couple
$$\int\rho g x\theta\,dA\cdot x = \rho g\theta\int x^2\,dA = \rho g\theta I$$
($I$ = second moment of the water-line area about the tilt axis). This couple shifts the buoyant force $\rho gV$ from B to B₁ through $BM\,\theta$:
$$\rho g V\cdot BM\,\theta = \rho g\theta I \;\Rightarrow\; BM = \frac IV, \qquad GM = \frac IV - BG$$

**Experimental method.** A known weight $w_1$ is moved across the deck through a distance $x$. The ship (total weight $W$) heels to a new equilibrium at angle θ, read from a plumb line and scale. The shifting moment balances the righting moment:
$$w_1 x = W\cdot GM\tan\theta \;\Rightarrow\; GM = \frac{w_1 x}{W\tan\theta}$$
Stable if GM > 0 (M above G).`,
            scheme: [
              { marks: 2, for: 'Analytical derivation: wedge couple ρgθI = ρgV·BM·θ ⇒ BM = I/V, GM = I/V − BG' },
              { marks: 1, for: 'Experimental method with GM = w₁x/(W tan θ)' },
            ],
          },
        ],
      },
      /* ---------------------------------------------------------------- Q2 */
      {
        number: 2,
        parts: [
          {
            id: 'o24-2a',
            label: 'a',
            marks: 3,
            co: 'CO-3',
            prompt: md`What are the difference between a laminar flow and a turbulent flow and what are the limiting values of Reynold number for each. Analyze the laminar flow between two parallel fixed plates in respect of shear stress, velocity distribution.`,
            topicIds: ['u3-parallel-plates', 'u4-turbulence'],
            answer: md`**Laminar vs turbulent:** laminar flow moves in smooth parallel layers with viscous forces dominant; turbulent flow is eddying and irregular, with inertia dominant and strong mixing. Laminar: parabolic profile, $h_f \propto V$. Turbulent: flatter profile, $h_f \propto V^{1.75\text{–}2}$.
**Limiting Re (pipe):** laminar < 2000, transition 2000–4000, turbulent > 4000. (Between plates the laminar limit is about 1000.)

**Flow between fixed plates** (gap $t$, $y$ from the lower plate). Force balance on an element gives $\dfrac{\partial p}{\partial x} = \dfrac{\partial\tau}{\partial y}$. With $\tau = \mu\,du/dy$:
$$\frac{\partial^2u}{\partial y^2} = \frac1\mu\frac{\partial p}{\partial x}$$
Integrating twice with $u = 0$ at $y = 0$ and $y = t$:
$$u = -\frac{1}{2\mu}\frac{\partial p}{\partial x}(ty - y^2)$$
a **parabola**, $U_{max} = -\dfrac{1}{8\mu}\dfrac{\partial p}{\partial x}t^2$ at mid-gap, $\bar u = \tfrac23U_{max}$.

**Shear stress:** $\tau = -\dfrac12\dfrac{\partial p}{\partial x}(t - 2y)$, **linear**, zero at the centre line and maximum $\tau_0 = -\dfrac12\dfrac{\partial p}{\partial x}t$ at the plates. Pressure drop: $p_1 - p_2 = 12\mu\bar uL/t^2$.`,
            scheme: [
              { marks: 1, for: 'Differences between laminar and turbulent flow and limiting Reynolds numbers' },
              { marks: 1, for: 'Velocity distribution derived (parabolic, U_max, ū = 2U_max/3)' },
              { marks: 1, for: 'Shear stress distribution (linear, zero at centre, max at plates)' },
            ],
          },
          {
            id: 'o24-2b',
            label: 'b',
            marks: 3,
            co: 'CO-3',
            prompt: md`Derive the expression for the loss of head in the case of Laminar flow in a pipe`,
            topicIds: ['u3-pipe-laminar'],
            answer: md`Steady laminar flow in a horizontal pipe of radius $R$. Forces on a coaxial cylinder of radius $r$, length $\Delta x$:
$$p\,\pi r^2 - \left(p + \frac{\partial p}{\partial x}\Delta x\right)\pi r^2 = \tau\,2\pi r\,\Delta x \;\Rightarrow\; \tau = -\frac{\partial p}{\partial x}\frac r2$$
With $\tau = -\mu\,du/dr$ and $u = 0$ at $r = R$:
$$u = -\frac{1}{4\mu}\frac{\partial p}{\partial x}(R^2 - r^2)$$
Mean velocity $\bar u = \dfrac{1}{\pi R^2}\displaystyle\int_0^R u\,2\pi r\,dr = -\dfrac{1}{8\mu}\dfrac{\partial p}{\partial x}R^2 = -\dfrac{1}{32\mu}\dfrac{\partial p}{\partial x}D^2$.

So $-\dfrac{\partial p}{\partial x} = \dfrac{32\mu\bar u}{D^2}$; integrating over length $L$: $p_1 - p_2 = \dfrac{32\mu\bar uL}{D^2}$, and the loss of head is
$$h_f = \frac{p_1 - p_2}{\rho g} = \frac{32\mu\bar u L}{\rho g D^2}$$
(Hagen–Poiseuille). Equivalent to $f = 64/Re$ in Darcy–Weisbach.`,
            scheme: [
              { marks: 1, for: 'Force balance giving τ = −(∂p/∂x) r/2' },
              { marks: 1, for: 'Velocity profile and mean velocity' },
              { marks: 1, for: 'Hagen–Poiseuille h_f = 32μūL/(ρgD²)' },
            ],
          },
          {
            id: 'o24-2c',
            label: 'c',
            marks: 2,
            co: 'CO-3',
            prompt: md`What is a viscometer. What are its different types. Explain the working of any one`,
            topicIds: ['u3-viscometers'],
            answer: md`**Viscometer:** an instrument that measures the viscosity of a fluid, using a laminar flow whose solution is known.

**Types:** capillary tube; falling sphere; rotating cylinder; orifice type (Redwood, Saybolt, Engler).

**Falling-sphere viscometer:** a small steel ball of diameter $d$ is dropped into the liquid in a tall tube. It soon reaches its terminal velocity $U$, found by timing its fall between two marks. Then weight = buoyancy + Stokes drag:
$$\frac\pi6d^3\rho_sg = \frac\pi6d^3\rho g + 3\pi\mu Ud \;\Rightarrow\; \mu = \frac{gd^2(\rho_s - \rho)}{18U}$$
(valid for Re < 0.2).`,
            scheme: [
              { marks: 1, for: 'Definition and list of types' },
              { marks: 1, for: 'Working of one type with its governing equation' },
            ],
          },
        ],
      },
      /* ---------------------------------------------------------------- Q3 */
      {
        number: 3,
        parts: [
          {
            id: 'o24-3a',
            label: 'a',
            marks: 3,
            co: 'CO-2',
            prompt: md`Derived the three dimensional Euler equations. How their related to Bernoulli equations.`,
            topicIds: ['u2-euler-bernoulli'],
            answer: md`Consider an element $dx\,dy\,dz$ of an inviscid fluid with body force per unit mass $(X, Y, Z)$. Net pressure force in x: $-\dfrac{\partial p}{\partial x}dx\,dy\,dz$. Newton’s law:
$$\frac{\partial u}{\partial t} + u\frac{\partial u}{\partial x} + v\frac{\partial u}{\partial y} + w\frac{\partial u}{\partial z} = X - \frac1\rho\frac{\partial p}{\partial x}$$
$$\frac{Dv}{Dt} = Y - \frac1\rho\frac{\partial p}{\partial y}, \qquad \frac{Dw}{Dt} = Z - \frac1\rho\frac{\partial p}{\partial z}$$
(vector form $\rho\,D\vec V/Dt = \rho\vec g - \nabla p$).

**Relation to Bernoulli:** for steady flow with gravity only ($X = Y = 0$, $Z = -g$), multiply the three equations by $dx, dy, dz$ taken along a stream line and add:
$$\frac{dp}{\rho} + g\,dz + V\,dV = 0$$
Integrating for constant ρ:
$$\frac{p}{\rho g} + \frac{V^2}{2g} + z = \text{constant}$$
which is Bernoulli’s equation. It holds along a stream line, and everywhere if the flow is also irrotational. So Bernoulli is the integral of Euler’s equations for steady, incompressible, inviscid flow.`,
            scheme: [
              { marks: 2, for: 'Derivation of the three Euler equations from Newton’s law on an element' },
              { marks: 1, for: 'Integration along a stream line to Bernoulli, with conditions' },
            ],
          },
          {
            id: 'o24-3b',
            label: 'b',
            marks: 3,
            co: 'CO-2',
            prompt: md`What are the advantage of using Bukingham pi theorm. What are the limitation of Rayleigh number. Derive the expression of head loss due to friction in the pipe`,
            topicIds: ['u2-dimensional', 'u4-pipe-losses'],
            answer: md`**Advantages of Buckingham’s π theorem:** works for any number of variables; tells in advance that there are $(n - m)$ dimensionless groups; each π term is found systematically and comes out as a recognised group (Re, Fr, Eu…); reduces the number of experimental variables and gives model laws.

**Limitations of Rayleigh’s method** (the paper says “number”; the method is meant): only three equations (M, L, T), so with more than about four variables the exponents cannot all be found and must be grouped by inspection; no rule for that grouping; it cannot give the constant or which variables matter.

**Head loss due to friction (Darcy–Weisbach).** Uniform horizontal pipe, length $L$, diameter $D$: $h_f = (p_1 - p_2)/\rho g$. The pressure force balances friction on the wetted area, with resistance per unit area $f'\rho V^2/2$:
$$(p_1 - p_2)\frac{\pi D^2}{4} = f'\frac{\rho V^2}{2}\,\pi DL \;\Rightarrow\; h_f = \frac{4f'LV^2}{2gD} = \frac{fLV^2}{2gD}$$`,
            scheme: [
              { marks: 1, for: 'Advantages of Buckingham’s π theorem' },
              { marks: 0.5, for: 'Limitations of Rayleigh’s method' },
              { marks: 1.5, for: 'Darcy–Weisbach derivation' },
            ],
          },
          {
            id: 'o24-3c',
            label: 'c',
            marks: 2,
            co: 'CO-4',
            prompt: md`what are the methods for separating boundary layer in laminar and turbulent flow`,
            topicIds: ['u5-separation'],
            answer: md`(Read as: methods of preventing/controlling boundary layer separation.) Separation happens when an adverse pressure gradient brings the near-wall fluid to rest, $(\partial u/\partial y)_{y=0} = 0$. Methods re-energise or remove that fluid:
1. **Suction** of the slow fluid through slots or a porous wall.
2. **Blowing/injection** of high-speed fluid tangentially into the boundary layer.
3. **Rotating boundary** (moving wall) so the wall fluid is carried along.
4. **Slotted wing / leading-edge slat**: high-pressure air flows through a slot to energise the upper surface layer.
5. **Streamlining** the body to keep the adverse gradient mild.
6. For a **laminar** layer: **tripping it to turbulence** (roughness strips, dimples, vortex generators), since a turbulent layer separates later. For a **turbulent** layer, suction, blowing and vortex generators.`,
            scheme: [
              { marks: 0.5, for: 'Cause of separation (adverse gradient, ∂u/∂y = 0 at the wall)' },
              { marks: 1.5, for: 'At least four control methods, with laminar vs turbulent distinction' },
            ],
          },
        ],
      },
      /* ---------------------------------------------------------------- Q4 */
      {
        number: 4,
        parts: [
          {
            id: 'o24-4a',
            label: 'a',
            marks: 3,
            co: 'CO-3',
            prompt: md`A collar bearing has external and internal diameters of 100mm and 50mm respectively. The film of oil between the collar surface and bearing is 0.5 mm thick and has coefficient of viscosity as 1.5 poise. Find the power required to overcome the viscous resistance, when shaft rotates at 600rpm.`,
            topicIds: ['u3-viscous-power'],
            answer: md`$R_1 = 0.05$ m, $R_2 = 0.025$ m, $t = 0.5 \times 10^{-3}$ m, $\mu = 1.5$ poise $= 0.15$ N·s/m², $\omega = 2\pi(600)/60 = 62.83$ rad/s.

At radius $r$: $\tau = \mu\dfrac{\omega r}{t}$. Torque on a ring of width $dr$: $dT = \tau(2\pi r\,dr)r = \dfrac{2\pi\mu\omega}{t}r^3dr$.
$$T = \frac{\pi\mu\omega}{2t}\left(R_1^4 - R_2^4\right) = \frac{\pi \times 0.15 \times 62.83}{2 \times 0.0005}\left(6.25 \times 10^{-6} - 0.39 \times 10^{-6}\right) = 0.1735 \text{ N·m}$$
$$P = T\omega = 0.1735 \times 62.83 = 10.9 \text{ W}$$`,
            scheme: [
              { marks: 1, for: 'Shear stress τ = μωr/t and elemental ring torque' },
              { marks: 1, for: 'Integration to T = πμω(R₁⁴ − R₂⁴)/(2t) = 0.173 N·m' },
              { marks: 1, for: 'Power P = Tω ≈ 10.9 W, with correct units' },
            ],
          },
          {
            id: 'o24-4b',
            label: 'b',
            marks: 2,
            co: 'CO-5',
            prompt: md`Prove that the force of impact of water jet on semi-circular vane is twice of the force on a flat plate.`,
            topicIds: ['u6-jets'],
            answer: md`Jet of area $a$ and velocity $V$; mass flow $\rho aV$. Force on the plate = rate of loss of momentum of the jet in its own direction.

**Flat plate normal to the jet:** after impact the water flows along the plate, so its velocity in the jet direction becomes 0:
$$F_1 = \rho aV(V - 0) = \rho aV^2$$
**Semicircular vane:** the jet is turned through 180° and (no friction) leaves with velocity $V$ in the opposite direction:
$$F_2 = \rho aV[V - (-V)] = 2\rho aV^2$$
Hence $F_2 = 2F_1$. The vane not only destroys the jet’s momentum but also gives it an equal momentum in reverse.`,
            scheme: [
              { marks: 1, for: 'Force on flat plate ρaV² from momentum' },
              { marks: 1, for: 'Force on semicircular vane 2ρaV² and the ratio' },
            ],
          },
          {
            id: 'o24-4c',
            label: 'c',
            marks: 3,
            co: 'CO-5',
            prompt: md`A jet of water impinges upon a series of moving plates tangentially, with a velocity of 50m/sec, resulting in the movement of the plates at a speed of 12m/sec. Find (i) the work done per kg of water/sec (ii) efficiency of plates.(iii) what should be speed of the vanes so that the efficiency may be maximum. Determine its value also.`,
            topicIds: ['u6-jets'],
            answer: md`Taking the plates as flat and the jet along their direction of motion (series of plates, so all the water $\rho aV$ is used). $V = 50$ m/s, $u = 12$ m/s.

**(i)** Force per kg/s of water $= (V - u) = 38$ N. Work done per kg $= (V - u)u = 38 \times 12 = 456$ N·m/kg.

**(ii)** KE supplied per kg $= V^2/2 = 1250$ J/kg, so
$$\eta = \frac{(V - u)u}{V^2/2} = \frac{2u(V - u)}{V^2} = \frac{456}{1250} = 36.5\%$$

**(iii)** $\dfrac{d\eta}{du} = 0 \Rightarrow V - 2u = 0 \Rightarrow u = V/2 = 25$ m/s, and
$$\eta_{max} = \frac{2 \times 25 \times 25}{50^2} = 50\%$$
(If the plates were taken as semicircular vanes: 912 J/kg, 73.0%, and 100% at 25 m/s. State the assumption.)`,
            scheme: [
              { marks: 1, for: 'Work done per kg = (V − u)u = 456 J/kg' },
              { marks: 1, for: 'Efficiency = 2u(V − u)/V² = 36.5%' },
              { marks: 1, for: 'u = V/2 = 25 m/s and η_max = 50%' },
            ],
          },
        ],
      },
      /* ---------------------------------------------------------------- Q5 */
      {
        number: 5,
        parts: [
          {
            id: 'o24-5a',
            label: 'a',
            marks: 4,
            co: 'CO-2',
            prompt: md`In the two dimensional incompressible flow in the x-y plane, stream function is 3xy. show that flow is irrotational and also find out its the corresponding velocity potential`,
            topicIds: ['u1-potential-functions'],
            answer: md`Bansal’s convention: $u = -\dfrac{\partial\psi}{\partial y}$, $v = \dfrac{\partial\psi}{\partial x}$; $u = -\dfrac{\partial\phi}{\partial x}$, $v = -\dfrac{\partial\phi}{\partial y}$.

**Velocities:** $u = -\dfrac{\partial(3xy)}{\partial y} = -3x$, $\;v = \dfrac{\partial(3xy)}{\partial x} = 3y$.

**Irrotational:** $\omega_z = \dfrac12\left(\dfrac{\partial v}{\partial x} - \dfrac{\partial u}{\partial y}\right) = \dfrac12(0 - 0) = 0$. (Equivalently $\nabla^2\psi = 0 + 0 = 0$.) Hence the flow is irrotational. (Continuity: $\partial u/\partial x + \partial v/\partial y = -3 + 3 = 0$ ✓.)

**Velocity potential:** $\dfrac{\partial\phi}{\partial x} = -u = 3x \Rightarrow \phi = \dfrac32x^2 + f(y)$.
$\dfrac{\partial\phi}{\partial y} = f'(y) = -v = -3y \Rightarrow f(y) = -\dfrac32y^2 + C$.
$$\phi = \frac32\left(x^2 - y^2\right) + C$$
(With the other convention, $u = \partial\psi/\partial y = 3x$, $v = -3y$, and $\phi$ comes out the same.) This is the flow into a right-angled corner.`,
            scheme: [
              { marks: 1, for: 'Velocity components from ψ (convention stated)' },
              { marks: 1, for: 'Rotation ω_z = 0 ⇒ irrotational' },
              { marks: 2, for: 'Integration for φ = 1.5(x² − y²) + C, consistent in both directions' },
            ],
          },
          {
            id: 'o24-5b',
            label: 'b',
            marks: 4,
            co: 'CO-6',
            prompt: md`What are the considerations/factors on the basis on which hydraulic/fluid machines are classified. Also derive the expression for Euler energy transfer equation and prove that Total energy transfer is the sum of all (three) kinetic energy terms.`,
            topicIds: ['u6-turbines', 'u6-euler'],
            answer: md`**Classification of hydraulic machines:** (i) direction of energy transfer: turbines (fluid → shaft) vs pumps (shaft → fluid); (ii) energy at inlet: impulse (Pelton) vs reaction (Francis, Kaplan); (iii) direction of flow through the runner: tangential, radial (inward/outward), axial, mixed; (iv) head: high, medium, low; (v) specific speed: low, medium, high. Pumps similarly: rotodynamic vs positive displacement.

**Euler equation:** torque = rate of change of angular momentum, $T = \rho Q(V_{w1}r_1 - V_{w2}r_2)$; power $= T\omega = \rho Q(V_{w1}u_1 - V_{w2}u_2)$, so energy per unit weight
$$E = \frac{V_{w1}u_1 - V_{w2}u_2}{g}$$
**Three KE terms:** from each velocity triangle, $V_r^2 = V^2 + u^2 - 2uV_w$, i.e. $uV_w = \tfrac12(V^2 + u^2 - V_r^2)$. Substituting:
$$E = \frac{V_1^2 - V_2^2}{2g} + \frac{u_1^2 - u_2^2}{2g} + \frac{V_{r2}^2 - V_{r1}^2}{2g}$$
change of absolute KE (dynamic part) + change of centrifugal energy + change of relative KE (both static, i.e. pressure, parts).`,
            scheme: [
              { marks: 1, for: 'Bases of classification with examples' },
              { marks: 1.5, for: 'Euler equation from angular momentum' },
              { marks: 1.5, for: 'Three-term form from velocity triangles, with meaning of each term' },
            ],
          },
        ],
        orPart: {
          id: 'o24-5or',
          label: 'or',
          marks: 4,
          co: 'CO-6',
          prompt: md`Explain the utility of following terms with physical significance (i)Unit speed (ii) Unit discharge (iii) Unit power (iv) specific speed (v) degree of reaction, (vi) Hydraulic efficiency(vii) speed Ratio (viii) Flow ratio`,
          topicIds: ['u6-turbines', 'u6-euler'],
          answer: md`(i) **Unit speed** $N_u = N/\sqrt H$: speed under a 1 m head; predicts speed when the head changes.
(ii) **Unit discharge** $Q_u = Q/\sqrt H$: discharge under a 1 m head; predicts flow at a new head.
(iii) **Unit power** $P_u = P/H^{3/2}$: power under a 1 m head; predicts output at a new head.
(iv) **Specific speed** $N_s = N\sqrt P/H^{5/4}$: speed of a geometrically similar turbine producing 1 kW under 1 m head; used to select the type (Pelton low, Francis medium, Kaplan high) and to compare turbines.
(v) **Degree of reaction** $R$: fraction of the runner energy transfer that occurs as pressure change, $R = 1 - (V_1^2 - V_2^2)/(2gE)$; 0 for impulse turbines, about 0.5 or more for reaction turbines.
(vi) **Hydraulic efficiency** $\eta_h = (V_{w1}u_1 \pm V_{w2}u_2)/gH$: runner power ÷ water power at inlet; measures hydraulic losses.
(vii) **Speed ratio** $K_u = u_1/\sqrt{2gH}$: peripheral speed relative to spouting velocity (Pelton 0.43–0.48, Francis 0.6–0.9).
(viii) **Flow ratio** $K_f = V_{f1}/\sqrt{2gH}$: flow velocity relative to spouting velocity (Francis 0.15–0.3); fixes the runner width.`,
          scheme: [
            { marks: 2, for: 'Unit speed, discharge, power and specific speed with formulas and use (½ each)' },
            { marks: 2, for: 'Degree of reaction, hydraulic efficiency, speed ratio, flow ratio (½ each)' },
          ],
        },
      },
    ],
  },
]
