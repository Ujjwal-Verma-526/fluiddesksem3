import type { Formula, Question, Topic, WorkedExample } from '../types'

const md = String.raw

/* =============================================================================
 * UNIT 6 — Impact of Jets, Turbines & Pumps (Bansal Ch. 17–19)
 * ========================================================================== */

export const topics: Topic[] = [
  /* ------------------------------------------------------------------ */
  {
    id: 'u6-jets',
    unitId: 'u6',
    title: 'Impact of jets on flat, curved and moving plates',
    summary: 'Force exerted by a jet on stationary flat and curved plates, on a single moving plate and on a series of moving plates or vanes, work done, efficiency and the condition for maximum efficiency.',
    syllabusPhrases: ['Impact of Jet on Flat, Curved & Moving Plates'],
    coverage: 'full',
    highlighted: true,
    refs: [{ chapter: 17, section: '§17.1–17.4', pages: '803–842' }],
    diagrams: ['jet-plates', 'vane-triangles', 'jet-efficiency'],
    sections: [
      {
        id: 'stationary',
        title: 'Stationary plates (§17.2)',
        body: md`All results come from the momentum equation: **force on the plate = rate of change of momentum of the jet** (in the opposite sense), with mass flow $\rho aV$. Friction on the plate is neglected, so the jet leaves with the same speed it arrived with.

| Plate | Force in the direction of the jet |
|---|---|
| Flat, normal to the jet | $F_x = \rho aV^2$ |
| Flat, inclined at θ to the jet | normal to plate $F_n = \rho aV^2\sin\theta$; $F_x = \rho aV^2\sin^2\theta$, $F_y = \rho aV^2\sin\theta\cos\theta$ |
| Curved, symmetrical, jet strikes at the centre and is deflected so it leaves at angle θ to the axis | $F_x = \rho aV^2(1 + \cos\theta)$ |
| Semicircular (θ = 0, jet turned through 180°) | $F_x = 2\rho aV^2$ |
| Curved, jet strikes at one tip (unsymmetrical, tip angles θ and φ) | $F_x = \rho aV^2(\cos\theta + \cos\phi)$ |

![Jet striking flat, curved and semicircular plates](diagram:jet-plates)

> [!EXAM] Asked in 2024 Q4(b): prove the force on a semicircular vane is twice that on a flat plate
> Flat plate: velocity along the jet goes from $V$ to $0$, so $F = \rho aV(V - 0) = \rho aV^2$.
> Semicircular vane: the jet is turned back and leaves with velocity $-V$, so $F = \rho aV[V - (-V)] = 2\rho aV^2$.
> Ratio = 2. Physically, the flat plate only destroys the jet’s momentum; the semicircular vane destroys it **and** creates an equal momentum in the reverse direction.`,
      },
      {
        id: 'moving',
        title: 'Moving plates (§17.4)',
        body: md`If the plate moves away from the jet with velocity $u$, the jet strikes it with the **relative velocity** $(V - u)$.

**Single flat plate moving in the direction of the jet:** the mass striking it per second is only $\rho a(V - u)$ (the plate runs away from the water):
$$F = \rho a(V - u)^2, \qquad \text{work/s} = \rho a(V - u)^2u$$

**Series of flat plates (or a wheel of vanes):** one plate or another is always in the jet, so **all** the water issuing, $\rho aV$, is used:
$$F = \rho aV(V - u), \qquad \text{work/s} = \rho aV(V - u)u$$
$$\eta = \frac{\text{work done}}{\text{KE supplied}} = \frac{\rho aV(V - u)u}{\tfrac12\rho aV\cdot V^2} = \frac{2u(V - u)}{V^2}$$
Maximum when $d\eta/du = 0$: $V - 2u = 0$ ⇒ **$u = V/2$**, giving **$\eta_{max} = 50\%$**.

**Series of semicircular vanes (Pelton-type buckets):** $F = 2\rho aV(V - u)$, $\eta = \dfrac{4u(V - u)}{V^2}$, maximum 100% at $u = V/2$.

![Efficiency against speed ratio for flat plates and curved vanes](diagram:jet-efficiency)

> [!EXAM] 2024 Q4(c) type: series of plates, V = 50 m/s, u = 12 m/s
> Work per kg of water $= (V - u)u = 38 \times 12 = 456$ J/kg; $\eta = 2(456)/50^2 = 36.5\%$; maximum at $u = 25$ m/s, $\eta_{max} = 50\%$. (Full solution in the Examples tab.)`,
      },
      {
        id: 'curved-moving',
        title: 'Curved vanes moving: velocity triangles (§17.4.3, §17.5)',
        body: md`When a jet strikes a moving curved vane at an angle, draw **velocity triangles** at inlet and outlet:
- $V_1$ absolute jet velocity, $u$ vane velocity, $V_{r1}$ relative velocity (vector $V_1 - u$).
- $V_{w1}$ whirl component (along $u$), $V_{f1}$ flow component (normal to $u$).
- α jet angle, θ and φ vane angles at inlet and outlet.

For **shockless entry** the vane tip at inlet must be parallel to $V_{r1}$. With no friction, $V_{r2} = V_{r1}$.

![Inlet and outlet velocity triangles for a moving curved vane](diagram:vane-triangles)

Force in the direction of motion (series of vanes):
$$F_x = \rho aV_1(V_{w1} \pm V_{w2})$$
$$\text{work per unit weight} = \frac{(V_{w1} \pm V_{w2})\,u}{g}, \qquad \eta = \frac{2(V_{w1} \pm V_{w2})u}{V_1^2}$$
Use $+$ if $V_{w2}$ points opposite to $u$ (outlet angle β obtuse), $-$ if it points the same way. This is Euler’s equation for a single-radius machine.`,
      },
    ],
    derivations: [
      {
        id: 'd-u6-semicircular',
        title: 'Force on a semicircular vane is twice that on a flat plate',
        goal: md`Compare the force of a jet on a flat plate held normal to it with that on a stationary semicircular vane.`,
        assumptions: ['Jet area a, velocity V', 'No friction on the surface, so speed is unchanged along it', 'Gravity neglected'],
        steps: [
          { math: md`F = \dot m\,(V_{\text{in}} - V_{\text{out}}), \quad \dot m = \rho aV`, why: md`Momentum equation along the jet axis: force on the plate = rate of loss of momentum of the jet.` },
          { math: md`F_{\text{flat}} = \rho aV\,(V - 0) = \rho aV^2`, why: md`After striking a flat plate normally, the water spreads out radially: its velocity along the axis is zero.` },
          { math: md`F_{\text{semi}} = \rho aV\,[V - (-V)] = 2\rho aV^2`, why: md`A semicircular vane turns the jet through 180°: it leaves with velocity $V$ in the reverse direction.` },
          { math: md`\frac{F_{\text{semi}}}{F_{\text{flat}}} = 2`, why: md`Divide.` },
        ],
        result: md`F_{\text{semicircular}} = 2\,F_{\text{flat}} = 2\rho a V^2`,
        ref: { chapter: 17, section: '§17.2', pages: '803–806' },
      },
      {
        id: 'd-u6-eta-max',
        title: 'Maximum efficiency of a series of flat plates',
        goal: md`Find the plate speed for maximum efficiency and the maximum efficiency.`,
        steps: [
          { math: md`W = \rho aV(V - u)\,u`, why: md`Work per second: force $\rho aV(V - u)$ × velocity $u$.` },
          { math: md`\eta = \frac{\rho aV(V - u)u}{\tfrac12\rho aV^3} = \frac{2u(V - u)}{V^2}`, why: md`Divide by the KE supplied per second.` },
          { math: md`\frac{d\eta}{du} = \frac{2(V - 2u)}{V^2} = 0 \;\Rightarrow\; u = \frac V2`, why: md`Differentiate with V fixed.` },
          { math: md`\eta_{max} = \frac{2(V/2)(V/2)}{V^2} = \frac12`, why: md`Substitute back.` },
        ],
        result: md`u = \frac V2, \qquad \eta_{max} = 50\%`,
        ref: { chapter: 17, section: '§17.4', pages: '814–816' },
      },
    ],
    keyPoints: [
      'Force = rate of change of momentum of the jet.',
      'Stationary: flat normal ρaV²; symmetric curved ρaV²(1 + cosθ); semicircular 2ρaV².',
      'Single moving flat plate: F = ρa(V − u)². Series of plates: F = ρaV(V − u).',
      'Series of flat plates: η = 2u(V − u)/V², max 50% at u = V/2. Semicircular vanes: max 100%.',
      'Curved moving vanes: work/weight = (V_w1 ± V_w2)u/g.',
    ],
    misconceptions: [
      'Using ρaV as the mass flow for a single moving plate. It is ρa(V − u) because the plate runs away from the jet.',
      'Forgetting that for a series of vanes the full ρaV is used.',
    ],
    flashcards: [
      { id: 'fc-u6-j1', front: 'Force of a jet on a stationary flat plate (normal)', back: 'F = ρaV².' },
      { id: 'fc-u6-j2', front: 'Force on a stationary semicircular vane', back: 'F = 2ρaV², twice the flat plate.' },
      { id: 'fc-u6-j3', front: 'Efficiency of a series of flat moving plates', back: 'η = 2u(V − u)/V², maximum 50% at u = V/2.' },
      { id: 'fc-u6-j4', front: 'Mass striking a single moving plate per second', back: 'ρa(V − u).' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u6-turbines',
    unitId: 'u6',
    title: 'Hydraulic turbines: definition, classification and performance terms',
    summary: 'What a turbine is, heads and efficiencies, the basis of classification (energy at inlet, flow direction, head, specific speed), Pelton, Francis and Kaplan, and the unit quantities, specific speed, speed ratio, flow ratio and degree of reaction.',
    syllabusPhrases: ['Hydraulic turbines; Definition and Classification'],
    coverage: 'full',
    highlighted: true,
    refs: [
      { chapter: 18, section: '§18.1–18.5', pages: '853–857' },
      { chapter: 18, section: '§18.6–18.13', pages: '857–930' },
    ],
    diagrams: ['turbine-types'],
    sections: [
      {
        id: 'definition',
        title: 'Definition, heads and efficiencies (§18.1–18.4)',
        body: md`> [!DEF] Hydraulic machines and turbines
> **Hydraulic machines** convert hydraulic energy into mechanical energy (**turbines**) or mechanical energy into hydraulic energy (**pumps**). A **turbine** is a hydraulic machine that converts the energy of water into mechanical energy at its shaft, which then drives a generator (hydroelectric power).

**Heads.** Gross head $H_g$ = difference between head-race and tail-race levels. **Net head** $H = H_g - h_f$ (penstock friction $h_f = 4fLV^2/2gD$).

**Efficiencies**
- **Hydraulic** $\eta_h = \dfrac{\text{power delivered to runner}}{\text{power supplied at inlet}} = \dfrac{\rho Q(V_{w1}u_1 \pm V_{w2}u_2)}{\rho gQH}$
- **Mechanical** $\eta_m = \dfrac{\text{shaft power}}{\text{runner power}}$
- **Volumetric** $\eta_v = \dfrac{\text{water actually striking the runner}}{\text{water supplied}}$
- **Overall** $\eta_o = \dfrac{\text{shaft power}}{\rho gQH} = \eta_h\,\eta_m$ (× $\eta_v$ if included)`,
      },
      {
        id: 'classification',
        title: 'Classification of turbines (§18.5)',
        body: md`> [!EXAM] Asked in 2024 Q5(b): considerations on which hydraulic machines are classified
> List the bases with examples, then go on to Euler’s equation (next topic).

| Basis | Classes | Examples |
|---|---|---|
| **Energy at inlet** | **Impulse:** all head converted to kinetic energy in a nozzle; runner at atmospheric pressure | Pelton wheel |
| | **Reaction:** water enters with both pressure and kinetic energy; pressure falls through the runner, which runs full | Francis, Kaplan, propeller |
| **Direction of flow through runner** | Tangential (peripheral) | Pelton |
| | Radial: inward or outward | old Francis (inward), Fourneyron (outward) |
| | Axial (parallel to the shaft) | Kaplan, propeller |
| | Mixed (enters radially, leaves axially) | modern Francis |
| **Head at inlet** | High (> 250 m) | Pelton |
| | Medium (60–250 m) | Francis |
| | Low (< 60 m) | Kaplan |
| **Specific speed $N_s$** | Low (8.5–30 per jet) | Pelton |
| | Medium (50–340) | Francis |
| | High (255–860) | Kaplan |

**Pumps** are classified similarly: by principle (rotodynamic: centrifugal, axial, mixed; positive displacement: reciprocating, gear, screw), by flow direction, by number of stages and by head (Unit 6 pumps topic).

![Pelton, Francis and Kaplan runners and their flow paths](diagram:turbine-types)`,
      },
      {
        id: 'main-types',
        title: 'Pelton, Francis and Kaplan in brief (§18.6–18.11)',
        body: md`**Pelton wheel (impulse, tangential, high head).** Nozzle with spear valve converts the head to a jet $V_1 = C_v\sqrt{2gH}$; double-hemispherical (splitter) buckets turn the jet through about 165°; casing only prevents splashing; a breaking jet stops the wheel. Work/s $= \rho aV_1(V_{w1} + V_{w2})u$, best at $u \approx 0.46V_1$.

**Francis turbine (reaction, mixed flow, medium head).** Spiral casing → guide vanes (adjustable, set the inlet angle α) → runner → **draft tube**. Water fills the runner and leaves it at low pressure. Usually designed for **radial discharge** ($V_{w2} = 0$), so work/s $= \rho QV_{w1}u_1$.

**Kaplan turbine (reaction, axial, low head).** Propeller-type runner with **adjustable blades** on a hub, so efficiency stays high at part load. Discharge $Q = \dfrac\pi4(D_o^2 - D_b^2)V_{f1}$.

**Draft tube** (reaction turbines only): a diverging pipe from runner outlet to tail race. It lets the turbine be set above the tail race without losing head, and recovers much of the exit kinetic energy by lowering the outlet pressure below atmospheric.`,
      },
      {
        id: 'unit-quantities',
        title: 'Unit quantities, specific speed and design ratios (§18.12–18.13)',
        body: md`> [!EXAM] Asked in 2024 Q5 (or): utility and physical significance of unit speed, unit discharge, unit power, specific speed, degree of reaction, hydraulic efficiency, speed ratio, flow ratio
> These go beyond the syllabus wording (“definition and classification”) but were set, so learn the table.

From $V \propto \sqrt H$, $N \propto \sqrt H$, $Q \propto \sqrt H$, $P \propto H^{3/2}$ (same turbine, varying head):

| Term | Definition | Formula | Physical significance / use |
|---|---|---|---|
| **Unit speed** $N_u$ | speed of the turbine working under a **1 m head** | $N_u = \dfrac{N}{\sqrt H}$ | predicts speed when head changes: $\dfrac{N_1}{\sqrt{H_1}} = \dfrac{N_2}{\sqrt{H_2}}$ |
| **Unit discharge** $Q_u$ | discharge under a 1 m head | $Q_u = \dfrac{Q}{\sqrt H}$ | predicts flow at a new head |
| **Unit power** $P_u$ | power developed under a 1 m head | $P_u = \dfrac{P}{H^{3/2}}$ | predicts output at a new head |
| **Specific speed** $N_s$ | speed of a geometrically similar turbine producing **1 kW under 1 m head** | $N_s = \dfrac{N\sqrt P}{H^{5/4}}$ | selects the turbine type and compares turbines of different sizes; model testing |
| **Degree of reaction** $R$ | fraction of the energy transfer in the runner that occurs as a **pressure** change | $R = 1 - \dfrac{V_1^2 - V_2^2}{2gH_e}$ | 0 for impulse (Pelton); about 0.5 or more for Francis/Kaplan |
| **Hydraulic efficiency** $\eta_h$ | runner power ÷ water power at inlet | $\eta_h = \dfrac{V_{w1}u_1 \pm V_{w2}u_2}{gH}$ | measures losses in the runner, guide vanes and casing |
| **Speed ratio** $K_u$ | runner peripheral speed ÷ spouting velocity | $K_u = \dfrac{u_1}{\sqrt{2gH}}$ | Pelton 0.43–0.48; Francis 0.6–0.9; Kaplan 1.4–2.0 |
| **Flow ratio** $K_f$ | velocity of flow at inlet ÷ spouting velocity | $K_f = \dfrac{V_{f1}}{\sqrt{2gH}}$ | Francis 0.15–0.30; Kaplan about 0.7; sizes the runner width |

($N_s$ ranges, from Bansal Table 18.1: Pelton 8.5–30 single jet, 30–51 multi-jet; Francis 51–255; Kaplan 255–860.)`,
      },
    ],
    keyPoints: [
      'Turbine: converts water energy to shaft work. Pump: the reverse.',
      'Classification: energy at inlet (impulse/reaction), flow direction (tangential/radial/axial/mixed), head, specific speed.',
      'Pelton: impulse, tangential, high head. Francis: reaction, mixed/radial, medium head. Kaplan: reaction, axial, low head.',
      'N_u = N/√H, Q_u = Q/√H, P_u = P/H^{3/2}, N_s = N√P/H^{5/4}.',
      'Speed ratio u₁/√(2gH); flow ratio V_f1/√(2gH); degree of reaction = pressure share of the runner energy transfer.',
    ],
    misconceptions: ['Saying Pelton wheels have a draft tube. Only reaction turbines do.'],
    flashcards: [
      { id: 'fc-u6-t1', front: 'Impulse vs reaction turbine', back: 'Impulse: all energy at inlet is kinetic, runner at atmospheric pressure (Pelton). Reaction: inlet water has pressure + kinetic energy, runner runs full (Francis, Kaplan).' },
      { id: 'fc-u6-t2', front: 'Specific speed of a turbine', back: 'N_s = N√P/H^{5/4}: speed of a similar turbine producing 1 kW under 1 m head.' },
      { id: 'fc-u6-t3', front: 'Unit speed, discharge and power', back: 'N/√H, Q/√H, P/H^{3/2}: values under a 1 m head.' },
      { id: 'fc-u6-t4', front: 'Speed ratio and flow ratio', back: 'Speed ratio u₁/√(2gH); flow ratio V_f1/√(2gH).' },
      { id: 'fc-u6-t5', front: 'Function of a draft tube', back: 'Allows setting the turbine above the tail race without loss of head and recovers exit kinetic energy.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u6-pumps',
    unitId: 'u6',
    title: 'Hydraulic pumps: definition and classification',
    summary: 'What a pump is, rotodynamic and positive-displacement pumps, classification of centrifugal pumps, main parts, heads and efficiencies, and the work done by the impeller.',
    syllabusPhrases: ['Hydraulic pumps; Definition and Classification'],
    coverage: 'partial',
    coverageNote: 'Centrifugal pumps are Bansal Ch. 19 (pp. 945–992). The overall classification of pumps (including positive-displacement types) is gathered here; reciprocating pumps are Bansal Ch. 20 and outside the syllabus beyond naming.',
    refs: [{ chapter: 19, section: '§19.1–19.5', pages: '945–952' }],
    diagrams: ['centrifugal-pump'],
    sections: [
      {
        id: 'definition',
        title: 'Definition and classification',
        body: md`> [!DEF] Pump
> A hydraulic machine that converts mechanical energy into hydraulic energy (pressure energy) of a liquid. A **centrifugal pump** does it by centrifugal action: the liquid is whirled by a rotating impeller, so its pressure rises with radius.

| Basis | Classes |
|---|---|
| **Principle of operation** | **Rotodynamic** (energy given by a rotating impeller: centrifugal, axial-flow, mixed-flow) vs **positive displacement** (liquid trapped and pushed: reciprocating, gear, vane, screw) |
| **Direction of flow in impeller** | radial (centrifugal), axial (propeller), mixed |
| **Casing** | volute casing, vortex casing, casing with guide blades (diffuser pump) |
| **Number of impellers** | single-stage, multistage (impellers in series for high head; in parallel for high discharge) |
| **Entry of water** | single-suction, double-suction |
| **Head** | low (< 15 m), medium (15–40 m), high (> 40 m) |
| **Specific speed** $N_s = \dfrac{N\sqrt Q}{H_m^{3/4}}$ | radial (low $N_s$), mixed, axial (high $N_s$) |

Note the pump specific speed uses **discharge**, not power: it is the speed of a similar pump delivering 1 m³/s against 1 m head.`,
      },
      {
        id: 'parts',
        title: 'Main parts and working of a centrifugal pump (§19.2–19.3)',
        body: md`1. **Impeller:** rotating wheel with backward-curved vanes, mounted on the shaft.
2. **Casing:** air-tight; usually a **volute** (spiral of increasing area) that converts velocity head into pressure head.
3. **Suction pipe** with a foot valve and strainer.
4. **Delivery pipe** with a delivery valve.

![Centrifugal pump](diagram:centrifugal-pump)

**Working:** the pump is first **primed** (casing and suction pipe filled with liquid, since an impeller spinning in air cannot create enough suction). The motor turns the impeller; the forced vortex raises the pressure at the outer radius, liquid leaves into the casing, and the low pressure at the eye draws more liquid up the suction pipe.

**Work done (§19.4):** water enters radially ($V_{w1} = 0$), so by Euler’s equation the work per unit weight is
$$\frac{V_{w2}u_2}{g}$$
**Manometric head** $H_m$ = head actually developed, measured between suction and delivery. **Manometric efficiency** $\eta_{man} = \dfrac{gH_m}{V_{w2}u_2}$; overall efficiency = water power ÷ shaft power.`,
      },
    ],
    keyPoints: [
      'Pump: mechanical → hydraulic energy.',
      'Rotodynamic (centrifugal, axial, mixed) vs positive displacement (reciprocating, gear, screw).',
      'Centrifugal pump: impeller, volute casing, suction pipe with foot valve, delivery pipe; must be primed.',
      'Radial entry: work per unit weight = V_w2 u₂/g. Pump N_s = N√Q/H_m^{3/4}.',
    ],
    flashcards: [
      { id: 'fc-u6-p1', front: 'Why must a centrifugal pump be primed?', back: 'The pressure it develops ∝ density; with air in the casing it cannot lift water up the suction pipe.' },
      { id: 'fc-u6-p2', front: 'Specific speed of a pump', back: 'N_s = N√Q / H_m^{3/4}.' },
      { id: 'fc-u6-p3', front: 'Rotodynamic vs positive-displacement pump', back: 'Rotodynamic: energy from a rotating impeller (centrifugal, axial). Positive displacement: liquid trapped and pushed (reciprocating, gear, screw).' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u6-euler',
    unitId: 'u6',
    title: 'Euler’s turbo-machine equation',
    summary: 'Energy transfer in a rotor from the angular momentum principle, the turbine and pump forms, and the three kinetic-energy components (absolute, centrifugal and relative) that make up the total energy transfer.',
    syllabusPhrases: ['Euler’s turbo-machine equation'],
    coverage: 'partial',
    coverageNote: 'Bansal derives the work done in §17.5 (radial vanes) and §18.7 (eq. 18.19, p. 880). The split into three kinetic-energy components is supplementary.',
    highlighted: true,
    refs: [
      { chapter: 17, section: '§17.5', pages: '834–836' },
      { chapter: 18, section: 'eq. 18.19', pages: '880' },
    ],
    diagrams: ['rotor-triangles'],
    sections: [
      {
        id: 'derivation',
        title: 'Derivation from angular momentum',
        body: md`Water enters a rotor at radius $r_1$ with whirl component $V_{w1}$ and leaves at $r_2$ with $V_{w2}$. Mass flow $\rho Q$.

Torque on the fluid = rate of change of its angular momentum:
$$T = \rho Q\,(V_{w1}r_1 - V_{w2}r_2) \qquad (\text{torque exerted by fluid on a turbine runner})$$
Power $= T\omega$, and $u = \omega r$:
$$P = \rho Q\,(V_{w1}u_1 - V_{w2}u_2)$$
Energy transfer per unit weight (**Euler head**):
$$E = \frac{V_{w1}u_1 - V_{w2}u_2}{g} \quad\text{(turbine)}, \qquad E = \frac{V_{w2}u_2 - V_{w1}u_1}{g} \quad\text{(pump)}$$
If the outlet whirl is opposite to $u$ (β obtuse), the sign in the turbine form becomes $+$: $E = (V_{w1}u_1 + V_{w2}u_2)/g$, as in the Pelton wheel.

![Rotor with inlet and outlet velocity triangles](diagram:rotor-triangles)`,
      },
      {
        id: 'components',
        title: 'Total energy transfer as three kinetic-energy terms',
        supplementary: true,
        body: md`> [!SUPP] Not in Bansal
> 2024 Q5(b) asked to “prove that total energy transfer is the sum of all three kinetic energy terms”. This is the standard rearrangement using the velocity triangles.

In each velocity triangle, by the cosine rule ($V_r$ is the vector difference of $V$ and $u$):
$$V_r^2 = V^2 + u^2 - 2uV\cos\alpha = V^2 + u^2 - 2uV_w \quad\Rightarrow\quad uV_w = \frac{V^2 + u^2 - V_r^2}{2}$$
Substituting at inlet and outlet into the turbine form:
$$E = \frac{V_1^2 - V_2^2}{2g} + \frac{u_1^2 - u_2^2}{2g} + \frac{V_{r2}^2 - V_{r1}^2}{2g}$$

| Term | Meaning | Type of energy change |
|---|---|---|
| $\dfrac{V_1^2 - V_2^2}{2g}$ | change of **absolute** kinetic energy | dynamic (impulse) part |
| $\dfrac{u_1^2 - u_2^2}{2g}$ | change of **centrifugal** energy (forced vortex in the rotating frame) | static pressure part |
| $\dfrac{V_{r2}^2 - V_{r1}^2}{2g}$ | change of **relative** kinetic energy | static pressure part |

The first term is the energy transferred by the change in absolute velocity; the second and third appear as a pressure change across the rotor. Hence the **degree of reaction**
$$R = \frac{\text{static part}}{E} = \frac{(u_1^2 - u_2^2) + (V_{r2}^2 - V_{r1}^2)}{2gE} = 1 - \frac{V_1^2 - V_2^2}{2gE}$$
For a Pelton wheel $u_1 = u_2$ and (no friction) $V_{r1} = V_{r2}$, so $R = 0$: a pure impulse machine.`,
      },
    ],
    derivations: [
      {
        id: 'd-u6-euler',
        title: 'Euler’s turbo-machine equation and its three components',
        goal: md`Derive the energy transfer per unit weight in a rotor and express it as three kinetic-energy terms.`,
        assumptions: ['Steady flow', 'Uniform velocity over inlet and outlet', 'Velocities tangent to vane tips (no shock)'],
        steps: [
          { math: md`T = \rho Q\,(V_{w1}r_1 - V_{w2}r_2)`, why: md`Torque = rate of change of angular momentum of the fluid (only whirl components have a moment about the axis).` },
          { math: md`P = T\omega = \rho Q\,(V_{w1}u_1 - V_{w2}u_2)`, why: md`Multiply by ω, with $u = \omega r$.` },
          { math: md`E = \frac{P}{\rho g Q} = \frac{V_{w1}u_1 - V_{w2}u_2}{g}`, why: md`Energy per unit weight: Euler’s equation (turbine).` },
          { math: md`V_r^2 = V^2 + u^2 - 2uV_w \;\Rightarrow\; uV_w = \tfrac12\left(V^2 + u^2 - V_r^2\right)`, why: md`Cosine rule in each velocity triangle, with $V_w = V\cos\alpha$.` },
          { math: md`E = \frac{V_1^2 - V_2^2}{2g} + \frac{u_1^2 - u_2^2}{2g} + \frac{V_{r2}^2 - V_{r1}^2}{2g}`, why: md`Substitute at inlet and outlet and collect terms.` },
        ],
        result: md`E = \frac{V_{w1}u_1 - V_{w2}u_2}{g} = \frac{V_1^2 - V_2^2}{2g} + \frac{u_1^2 - u_2^2}{2g} + \frac{V_{r2}^2 - V_{r1}^2}{2g}`,
        ref: { chapter: 18, section: 'eq. 18.19', pages: '880' },
      },
    ],
    keyPoints: [
      'Euler: E = (V_w1u₁ − V_w2u₂)/g for a turbine; (V_w2u₂ − V_w1u₁)/g for a pump.',
      'From torque = rate of change of angular momentum, power = Tω.',
      'E = (V₁² − V₂²)/2g [absolute KE] + (u₁² − u₂²)/2g [centrifugal] + (V_r2² − V_r1²)/2g [relative KE].',
      'Last two terms = static (pressure) part; degree of reaction = static ÷ total.',
    ],
    flashcards: [
      { id: 'fc-u6-e1', front: 'Euler’s turbine equation', back: 'E = (V_w1 u₁ − V_w2 u₂)/g per unit weight.' },
      { id: 'fc-u6-e2', front: 'Three components of Euler head', back: 'Absolute KE change (V₁² − V₂²)/2g, centrifugal (u₁² − u₂²)/2g, relative KE change (V_r2² − V_r1²)/2g.' },
      { id: 'fc-u6-e3', front: 'Which Euler components are “static”?', back: 'Centrifugal and relative KE terms: they appear as pressure change across the rotor.' },
    ],
  },
]

/* =============================================================================
 * Worked examples
 * ========================================================================== */

export const examples: WorkedExample[] = [
  {
    id: 'ex-17-1',
    topicId: 'u6-jets',
    title: 'Jet on a stationary flat plate',
    source: { kind: 'textbook', ref: 'Problem 17.1', page: 807 },
    difficulty: 1,
    statement: md`Find the force exerted by a jet of water of diameter 75 mm on a stationary flat plate, when the jet strikes the plate normally with velocity of 20 m/s.`,
    given: ['d = 0.075 m', 'V = 20 m/s'],
    find: ['F'],
    approach: md`$F = \rho aV^2$.`,
    steps: [
      { label: 'Area', work: md`$a = \dfrac\pi4(0.075)^2 = 4.418 \times 10^{-3}$ m²` },
      { label: 'Force', work: md`$F = 1000 \times 4.418 \times 10^{-3} \times 20^2 = 1767$ N` },
    ],
    answer: md`$F = 1767$ N`,
    concept: 'Momentum destroyed along the jet axis.',
  },
  {
    id: 'ex-17-5',
    topicId: 'u6-jets',
    title: 'Jet on a symmetrical curved plate',
    source: { kind: 'textbook', ref: 'Problem 17.5', page: 808 },
    difficulty: 1,
    statement: md`A jet of water of diameter 50 mm moving with a velocity of 40 m/s, strikes a curved fixed symmetrical plate at the centre. Find the force exerted by the jet of water in the direction of the jet, if the jet is deflected through an angle of 120° at the outlet of the curved plate.`,
    given: ['d = 0.05 m, V = 40 m/s', 'deflection 120° ⇒ θ = 180° − 120° = 60°'],
    find: ['F_x'],
    approach: md`$F_x = \rho aV^2(1 + \cos\theta)$, θ = angle the leaving jet makes with the axis.`,
    steps: [
      { label: 'Area', work: md`$a = 1.9635 \times 10^{-3}$ m²` },
      { label: 'Force', work: md`$F_x = 1000 \times 1.9635 \times 10^{-3} \times 1600 \times (1 + \cos 60°) = 4712$ N` },
    ],
    answer: md`$F_x \approx 4712$ N`,
    concept: 'Deflection angle vs outlet angle: θ = 180° − deflection.',
  },
  {
    id: 'ex-17-11',
    topicId: 'u6-jets',
    title: 'Jet on a single moving flat plate',
    source: { kind: 'textbook', ref: 'Problem 17.11', page: 816 },
    difficulty: 1,
    statement: md`A jet of water of diameter 10 cm strikes a flat plate normally with a velocity of 15 m/s. The plate is moving with a velocity of 6 m/s in the direction of the jet and away from the jet. Find: (i) the force exerted by the jet on the plate (ii) work done by the jet on the plate per second.`,
    given: ['d = 0.1 m, V = 15 m/s, u = 6 m/s'],
    find: ['F, work/s'],
    approach: md`Single moving plate: $F = \rho a(V - u)^2$.`,
    steps: [
      { label: 'Force', work: md`$F = 1000 \times 7.854 \times 10^{-3} \times (15 - 6)^2 = 636.2$ N` },
      { label: 'Work/s', work: md`$W = Fu = 636.2 \times 6 = 3817$ N·m/s` },
    ],
    answer: md`$F = 636.2$ N; work done $= 3817$ W`,
    concept: 'Only ρa(V − u) kg/s strikes a single receding plate.',
  },
  {
    id: 'ex-u6-2024-q4c',
    topicId: 'u6-jets',
    title: 'The 2024 series-of-plates problem (Q4c)',
    source: { kind: 'generated' },
    difficulty: 2,
    statement: md`A jet of water impinges upon a series of moving plates with a velocity of 50 m/s, resulting in the movement of the plates at a speed of 12 m/s. Find (i) the work done per kg of water per second, (ii) the efficiency of the plates, (iii) the speed of the plates for maximum efficiency and its value.`,
    given: ['V = 50 m/s, u = 12 m/s', 'series of flat plates struck normally (the paper’s “tangentially” read as the jet along the direction of motion)'],
    find: ['Work per kg', 'η', 'u for η_max, η_max'],
    approach: md`Series: all water $\rho aV$ is used; force per kg/s = $(V - u)$; $\eta = 2u(V - u)/V^2$.`,
    steps: [
      { label: '(i) Work per kg', work: md`Force per kg/s of water $= (V - u) = 38$ N; work per kg $= (V - u)u = 38 \times 12 = 456$ N·m/kg` },
      { label: '(ii) Efficiency', work: md`$\eta = \dfrac{456}{V^2/2} = \dfrac{456}{1250} = 0.3648 = 36.5\%$` },
      { label: '(iii) Maximum', work: md`$u = V/2 = 25$ m/s; $\eta_{max} = \dfrac{2 \times 25 \times 25}{2500} = 50\%$` },
    ],
    answer: md`456 J per kg; η = 36.5%; maximum η = 50% at u = 25 m/s`,
    concept: 'Series of flat plates; η_max at u = V/2.',
    observations: ['If the plates are read as semicircular vanes instead, work per kg doubles to 912 J/kg, η = 73.0%, and η_max = 100% at u = 25 m/s. State the assumption in the exam.'],
  },
  {
    id: 'ex-18-1',
    topicId: 'u6-turbines',
    title: 'Pelton wheel: power and hydraulic efficiency',
    source: { kind: 'textbook', ref: 'Problem 18.1', page: 862 },
    difficulty: 2,
    statement: md`A Pelton wheel has a mean bucket speed of 10 metres per second with a jet of water flowing at the rate of 700 litres/s under a head of 30 metres. The buckets deflect the jet through an angle of 160°. Calculate the power given by water to the runner and the hydraulic efficiency of the turbine. Assume co-efficient of velocity as 0.98.`,
    given: ['u = 10 m/s, Q = 0.7 m³/s, H = 30 m', 'deflection 160° ⇒ φ = 20°', 'C_v = 0.98'],
    find: ['Runner power', 'η_h'],
    approach: md`Velocity triangles with $V_{w1} = V_1$, $V_{r2} = V_{r1}$, $V_{w2} = V_{r2}\cos\phi - u$.`,
    steps: [
      { label: 'Jet velocity', work: md`$V_1 = 0.98\sqrt{2 \times 9.81 \times 30} = 23.78$ m/s; $V_{w1} = 23.78$` },
      { label: 'Relative velocities', work: md`$V_{r1} = V_1 - u = 13.78$ m/s $= V_{r2}$` },
      { label: 'Outlet whirl', work: md`$V_{w2} = V_{r2}\cos 20° - u = 12.95 - 10 = 2.95$ m/s (opposite to u, so add)` },
      { label: 'Power', work: md`$P = \rho Q(V_{w1} + V_{w2})u = 1000 \times 0.7 \times 26.72 \times 10 = 187.0$ kW` },
      { label: 'Hydraulic efficiency', work: md`$\eta_h = \dfrac{2(V_{w1} + V_{w2})u}{V_1^2} = \dfrac{2 \times 26.72 \times 10}{565.3} = 94.5\%$` },
    ],
    answer: md`$P \approx 187$ kW; $\eta_h \approx 94.5\%$`,
    concept: 'Euler’s equation applied to a Pelton wheel (u₁ = u₂).',
  },
]

/* =============================================================================
 * Questions
 * ========================================================================== */

export const questions: Question[] = [
  {
    id: 'q-u6-1',
    topicId: 'u6-jets',
    type: 'derivation',
    difficulty: 1,
    prompt: md`Prove that the force exerted by a jet of water on a stationary semicircular vane is twice the force on a stationary flat plate held normal to it.`,
    source: { kind: 'generated' },
    solution: md`Momentum equation: $F = \rho aV(V_{in} - V_{out})$. Flat plate: $V_{out} = 0$ ⇒ $F = \rho aV^2$. Semicircular vane: the jet is turned through 180° and leaves at $-V$ ⇒ $F = \rho aV[V - (-V)] = 2\rho aV^2$. Ratio 2.`,
  },
  {
    id: 'q-u6-2',
    topicId: 'u6-jets',
    type: 'mcq',
    difficulty: 1,
    prompt: md`The maximum efficiency of a jet striking a series of flat plates is`,
    options: ['25%', '50%', '75%', '100%'],
    answer: 1,
    source: { kind: 'textbook', ref: '§17.4', page: 816 },
    solution: md`$\eta = 2u(V - u)/V^2$, maximum $1/2$ at $u = V/2$.`,
  },
  {
    id: 'q-u6-3',
    topicId: 'u6-jets',
    type: 'numerical',
    difficulty: 2,
    prompt: md`A 7.5 cm diameter jet with a velocity of 30 m/s strikes a flat plate whose normal is inclined at 45° to the jet axis. Find the normal force on the plate (i) when it is stationary, (ii) when it moves at 15 m/s in the direction of the jet.`,
    source: { kind: 'textbook', ref: 'Problem 17.13', page: 817 },
    solution: md`$a = 4.418 \times 10^{-3}$ m², angle between jet and plate θ = 45°. (i) $F_n = \rho aV^2\sin\theta = 1000 \times 4.418 \times 10^{-3} \times 900 \times 0.7071 = 2812$ N. (ii) $F_n = \rho a(V - u)^2\sin\theta = 1000 \times 4.418 \times 10^{-3} \times 225 \times 0.7071 = 703$ N.`,
  },
  {
    id: 'q-u6-4',
    topicId: 'u6-turbines',
    type: 'long',
    difficulty: 2,
    prompt: md`On what bases are hydraulic turbines classified? Give examples.`,
    source: { kind: 'textbook', ref: '§18.5', page: 855 },
    solution: md`(1) Energy at inlet: impulse (Pelton) / reaction (Francis, Kaplan). (2) Direction of flow through runner: tangential (Pelton), radial inward/outward (Francis/Fourneyron), axial (Kaplan), mixed (modern Francis). (3) Head: high (Pelton), medium (Francis), low (Kaplan). (4) Specific speed: low (Pelton), medium (Francis), high (Kaplan).`,
  },
  {
    id: 'q-u6-5',
    topicId: 'u6-turbines',
    type: 'short',
    difficulty: 2,
    prompt: md`Define unit speed, unit discharge, unit power and specific speed of a turbine. What is their use?`,
    source: { kind: 'textbook', ref: '§18.12–18.13', page: 920 },
    solution: md`$N_u = N/\sqrt H$, $Q_u = Q/\sqrt H$, $P_u = P/H^{3/2}$: the values under a 1 m head; used to predict performance when the head changes. $N_s = N\sqrt P/H^{5/4}$: speed of a geometrically similar turbine producing 1 kW under 1 m head; used to choose the type of turbine and compare turbines.`,
  },
  {
    id: 'q-u6-6',
    topicId: 'u6-turbines',
    type: 'mcq',
    difficulty: 1,
    prompt: md`A Kaplan turbine is`,
    options: ['an impulse turbine for high heads', 'a reaction turbine with radial flow for medium heads', 'an axial-flow reaction turbine for low heads', 'a tangential-flow impulse turbine'],
    answer: 2,
    source: { kind: 'textbook', ref: '§18.11', page: 903 },
    solution: md`Kaplan: axial flow, reaction, low head, adjustable runner blades, high specific speed.`,
  },
  {
    id: 'q-u6-7',
    topicId: 'u6-pumps',
    type: 'short',
    difficulty: 1,
    prompt: md`Define a pump and classify pumps.`,
    source: { kind: 'generated' },
    solution: md`A pump converts mechanical energy into hydraulic (pressure) energy of a liquid. Rotodynamic (centrifugal, axial, mixed flow) and positive displacement (reciprocating, gear, vane, screw). Centrifugal pumps further by casing (volute, vortex, diffuser), number of stages, single/double suction, head and specific speed.`,
  },
  {
    id: 'q-u6-8',
    topicId: 'u6-euler',
    type: 'derivation',
    difficulty: 3,
    prompt: md`Derive Euler’s turbo-machine equation and show that the total energy transfer is the sum of three kinetic-energy terms.`,
    source: { kind: 'generated' },
    solution: md`$T = \rho Q(V_{w1}r_1 - V_{w2}r_2)$, $P = T\omega = \rho Q(V_{w1}u_1 - V_{w2}u_2)$, $E = (V_{w1}u_1 - V_{w2}u_2)/g$. Cosine rule: $uV_w = \tfrac12(V^2 + u^2 - V_r^2)$. Substituting: $E = \dfrac{V_1^2 - V_2^2}{2g} + \dfrac{u_1^2 - u_2^2}{2g} + \dfrac{V_{r2}^2 - V_{r1}^2}{2g}$: change of absolute KE, centrifugal energy and relative KE.`,
  },
  {
    id: 'q-u6-9',
    topicId: 'u6-euler',
    type: 'mcq',
    difficulty: 2,
    prompt: md`For a pure impulse turbine, the degree of reaction is`,
    options: ['0', '0.5', '1', 'between 0.5 and 1'],
    answer: 0,
    source: { kind: 'generated' },
    solution: md`$u_1 = u_2$ and $V_{r1} = V_{r2}$, so the static (pressure) part of the energy transfer is zero.`,
  },
]

/* =============================================================================
 * Formulas
 * ========================================================================== */

export const formulas: Formula[] = [
  {
    id: 'f-u6-jet-stationary',
    topicId: 'u6-jets',
    name: 'Jet on stationary plates',
    latex: md`F_{\text{flat}} = \rho aV^2, \qquad F_{\text{curved}} = \rho aV^2(1 + \cos\theta), \qquad F_{\text{semi}} = 2\rho aV^2`,
    vars: [
      { sym: md`a`, meaning: 'jet area', unit: 'm²' },
      { sym: md`\theta`, meaning: 'outlet angle of jet with the axis', unit: '°' },
    ],
    conditions: 'Frictionless plate.',
    meaning: 'Force along the jet axis.',
    important: true,
    ref: { chapter: 17, section: '§17.2', pages: '803–806' },
  },
  {
    id: 'f-u6-jet-moving',
    topicId: 'u6-jets',
    name: 'Jet on moving plates',
    latex: md`F_{\text{single}} = \rho a(V - u)^2, \qquad F_{\text{series}} = \rho aV(V - u), \qquad \eta_{\text{series}} = \frac{2u(V - u)}{V^2}`,
    vars: [{ sym: md`u`, meaning: 'plate velocity', unit: 'm/s' }],
    conditions: 'Flat plates normal to the jet; η_max = 50% at u = V/2.',
    meaning: 'Relative velocity drives the force.',
    important: true,
    ref: { chapter: 17, section: '§17.4', pages: '814–816' },
  },
  {
    id: 'f-u6-specific-speed',
    topicId: 'u6-turbines',
    name: 'Unit quantities and specific speed',
    latex: md`N_u = \frac{N}{\sqrt H}, \quad Q_u = \frac{Q}{\sqrt H}, \quad P_u = \frac{P}{H^{3/2}}, \quad N_s = \frac{N\sqrt P}{H^{5/4}}`,
    vars: [
      { sym: md`N`, meaning: 'speed', unit: 'rpm' },
      { sym: md`P`, meaning: 'shaft power', unit: 'kW' },
      { sym: md`H`, meaning: 'net head', unit: 'm' },
    ],
    conditions: 'Same turbine (unit quantities) or similar turbines (N_s).',
    meaning: 'Performance under 1 m head; N_s selects the turbine type.',
    important: true,
    ref: { chapter: 18, section: '§18.12–18.13', pages: '920–928' },
  },
  {
    id: 'f-u6-ratios',
    topicId: 'u6-turbines',
    name: 'Speed ratio, flow ratio, hydraulic efficiency',
    latex: md`K_u = \frac{u_1}{\sqrt{2gH}}, \quad K_f = \frac{V_{f1}}{\sqrt{2gH}}, \quad \eta_h = \frac{V_{w1}u_1 \pm V_{w2}u_2}{gH}`,
    vars: [],
    conditions: 'Reaction turbines usually radial discharge (V_w2 = 0).',
    meaning: 'Design ratios and runner efficiency.',
    ref: { chapter: 18, section: '§18.9', pages: '880–883' },
  },
  {
    id: 'f-u6-pump-ns',
    topicId: 'u6-pumps',
    name: 'Pump work and specific speed',
    latex: md`\frac{W}{\rho g Q} = \frac{V_{w2}u_2}{g}, \qquad N_s = \frac{N\sqrt Q}{H_m^{3/4}}`,
    vars: [{ sym: md`H_m`, meaning: 'manometric head', unit: 'm' }],
    conditions: 'Radial entry (V_w1 = 0).',
    meaning: 'Euler head of a centrifugal pump; type selection.',
    ref: { chapter: 19, section: '§19.4', pages: '947' },
  },
  {
    id: 'f-u6-euler',
    topicId: 'u6-euler',
    name: 'Euler’s turbo-machine equation',
    latex: md`E = \frac{V_{w1}u_1 - V_{w2}u_2}{g} = \frac{V_1^2 - V_2^2}{2g} + \frac{u_1^2 - u_2^2}{2g} + \frac{V_{r2}^2 - V_{r1}^2}{2g}`,
    vars: [
      { sym: md`V_w`, meaning: 'whirl component', unit: 'm/s' },
      { sym: md`V_r`, meaning: 'relative velocity', unit: 'm/s' },
    ],
    conditions: 'Turbine form; reverse the sign for a pump.',
    meaning: 'Energy transfer per unit weight; three KE components.',
    important: true,
    ref: { chapter: 18, section: 'eq. 18.19', pages: '880' },
  },
]
