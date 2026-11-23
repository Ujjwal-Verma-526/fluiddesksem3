import type { Formula, Question, Topic, WorkedExample } from '../types'

const md = String.raw

/* =============================================================================
 * UNIT 3 — Viscous Flow (Bansal Ch. 9)
 * ========================================================================== */

export const topics: Topic[] = [
  /* ------------------------------------------------------------------ */
  {
    id: 'u3-pipe-laminar',
    unitId: 'u3',
    title: 'Laminar flow through circular pipes (Hagen–Poiseuille)',
    summary: 'Reynolds number and the laminar limit, shear stress and velocity distribution in a pipe, the ratio of maximum to mean velocity, and the Hagen–Poiseuille head loss.',
    syllabusPhrases: ['Laminar flow … through the circular pipes'],
    coverage: 'full',
    highlighted: true,
    refs: [{ chapter: 9, section: '§9.1–9.2', pages: '387–396' }],
    diagrams: ['pipe-profile'],
    sections: [
      {
        id: 'viscous-flow',
        title: 'Viscous (laminar) flow and Reynolds number (§9.1)',
        body: md`> [!DEF] Laminar flow
> Flow in which the fluid particles move along well-defined, smooth paths in layers (laminae), each layer sliding over the next. Viscosity dominates and disturbances die out.

Whether a pipe flow is laminar is decided by the **Reynolds number**
$$Re = \frac{\rho V D}{\mu} = \frac{VD}{\nu}$$
the ratio of inertia force to viscous force.

| Pipe flow | Re |
|---|---|
| Laminar | < 2000 |
| Transitional | 2000–4000 |
| Turbulent | > 4000 |

For flow **between parallel plates** (Re based on mean velocity and gap), the laminar limit is about 1000. Unit 4 covers transition and turbulence.`,
      },
      {
        id: 'hagen',
        title: 'Shear stress and velocity distribution (§9.2)',
        body: md`Take a coaxial cylinder of fluid of radius $r$ and length $\Delta x$ in a horizontal pipe of radius $R$, in steady, fully developed laminar flow.

**Force balance.** Pressure force on the ends equals the shear force on the curved surface:
$$p\,\pi r^2 - \left(p + \frac{\partial p}{\partial x}\Delta x\right)\pi r^2 = \tau\,2\pi r\,\Delta x \quad\Rightarrow\quad \tau = -\frac{\partial p}{\partial x}\frac{r}{2}$$
**Shear stress varies linearly** with radius: zero on the axis, maximum $\tau_0 = -\dfrac{\partial p}{\partial x}\dfrac{R}{2}$ at the wall.

**Velocity.** Newton’s law with $y = R - r$ from the wall gives $\tau = -\mu\,du/dr$. Equating and integrating with $u = 0$ at $r = R$:
$$u = -\frac{1}{4\mu}\frac{\partial p}{\partial x}\left(R^2 - r^2\right)$$
The velocity profile is a **parabola**, maximum on the axis:
$$U_{max} = -\frac{1}{4\mu}\frac{\partial p}{\partial x}R^2, \qquad u = U_{max}\left[1 - \left(\frac{r}{R}\right)^2\right]$$

![Velocity and shear-stress distribution in laminar pipe flow](diagram:pipe-profile)

**Mean velocity.** $Q = \int_0^R u\,2\pi r\,dr = \dfrac{\pi}{8\mu}\left(-\dfrac{\partial p}{\partial x}\right)R^4$, so
$$\bar u = \frac{Q}{\pi R^2} = \frac{U_{max}}{2}$$
The ratio of maximum to average velocity is **2**.`,
      },
      {
        id: 'hp-loss',
        title: 'Head loss: the Hagen–Poiseuille formula',
        body: md`> [!EXAM] Asked in 2024 Q2(b): derive the loss of head for laminar flow in a pipe
> Full derivation in the Derivations tab. The final steps: $\bar u = -\dfrac{1}{8\mu}\dfrac{\partial p}{\partial x}R^2 = -\dfrac{1}{32\mu}\dfrac{\partial p}{\partial x}D^2$, integrate over length $L$, divide by $\rho g$.

Rearranging the mean velocity, $-\dfrac{\partial p}{\partial x} = \dfrac{32\mu\bar u}{D^2}$. Integrating from section 1 to section 2, a length $L$ apart:
$$p_1 - p_2 = \frac{32\mu\bar u L}{D^2}, \qquad h_f = \frac{p_1 - p_2}{\rho g} = \frac{32\mu\bar u L}{\rho g D^2}$$
This is the **Hagen–Poiseuille formula**. Head loss in laminar flow is **proportional to the first power of velocity**.

**Link to Darcy–Weisbach.** Writing it as $h_f = f\dfrac{L}{D}\dfrac{\bar u^2}{2g}$ gives
$$f = \frac{64}{Re} \qquad (\text{or } f' = 16/Re \text{ for Bansal’s coefficient of friction in } h_f = 4f'LV^2/2gD)$$`,
      },
    ],
    derivations: [
      {
        id: 'd-u3-hp',
        title: 'Hagen–Poiseuille: head loss in laminar pipe flow',
        goal: md`Derive the velocity profile and the loss of head for steady laminar flow through a horizontal circular pipe.`,
        assumptions: ['Steady, fully developed, laminar flow', 'Incompressible Newtonian fluid', 'Horizontal pipe of radius R'],
        steps: [
          { math: md`\left[p\,\pi r^2\right] - \left[\left(p + \frac{\partial p}{\partial x}\Delta x\right)\pi r^2\right] - \tau\,(2\pi r\Delta x) = 0`, why: md`Forces on a coaxial fluid cylinder of radius $r$, length $\Delta x$. No acceleration (fully developed).` },
          { math: md`\tau = -\frac{\partial p}{\partial x}\,\frac{r}{2}`, why: md`Simplify. Shear stress is linear in $r$.` },
          { math: md`\tau = -\mu\frac{du}{dr}`, why: md`Newton’s law; $u$ decreases as $r$ increases, so the minus sign keeps τ positive.` },
          { math: md`\frac{du}{dr} = \frac{1}{2\mu}\frac{\partial p}{\partial x}\,r \;\Rightarrow\; u = \frac{1}{4\mu}\frac{\partial p}{\partial x}r^2 + C`, why: md`Equate and integrate.` },
          { math: md`u = -\frac{1}{4\mu}\frac{\partial p}{\partial x}\left(R^2 - r^2\right)`, why: md`No slip: $u = 0$ at $r = R$ fixes $C$.` },
          { math: md`\bar u = \frac{1}{\pi R^2}\int_0^R u\,2\pi r\,dr = -\frac{1}{8\mu}\frac{\partial p}{\partial x}R^2 = \frac{U_{max}}{2}`, why: md`Discharge divided by area.` },
          { math: md`-\frac{\partial p}{\partial x} = \frac{32\mu\bar u}{D^2} \;\Rightarrow\; p_1 - p_2 = \frac{32\mu\bar u L}{D^2}`, why: md`Use $R = D/2$ and integrate over a length $L$.` },
          { math: md`h_f = \frac{p_1 - p_2}{\rho g} = \frac{32\mu\bar u L}{\rho g D^2}`, why: md`Loss of pressure head.` },
        ],
        result: md`h_f = \frac{32\mu \bar u L}{\rho g D^2}`,
        ref: { chapter: 9, section: '§9.2', pages: '387–391' },
      },
    ],
    keyPoints: [
      'Laminar pipe flow: Re < 2000.',
      'Shear stress linear: τ = −(∂p/∂x)(r/2), zero at the axis, maximum at the wall.',
      'Velocity parabolic: u = U_max[1 − (r/R)²]; U_max = 2ū.',
      'Hagen–Poiseuille: h_f = 32μūL/(ρgD²). Head loss ∝ V.',
      'Friction factor in laminar flow: f = 64/Re.',
    ],
    misconceptions: [
      'Using the maximum velocity in the Hagen–Poiseuille formula. It uses the mean velocity ū.',
      'Mixing the two friction-factor conventions: Darcy f = 64/Re, Bansal’s f′ = 16/Re with h_f = 4f′LV²/(2gD).',
    ],
    flashcards: [
      { id: 'fc-u3-p1', front: 'Hagen–Poiseuille formula', back: 'h_f = 32μūL/(ρgD²).' },
      { id: 'fc-u3-p2', front: 'Ratio of maximum to mean velocity, laminar pipe flow', back: '2.' },
      { id: 'fc-u3-p3', front: 'Shear stress distribution in laminar pipe flow', back: 'Linear: zero on the axis, maximum at the wall.' },
      { id: 'fc-u3-p4', front: 'Friction factor for laminar pipe flow', back: 'f = 64/Re (Darcy), i.e. f′ = 16/Re in Bansal’s 4f′ form.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u3-parallel-plates',
    unitId: 'u3',
    title: 'Laminar flow between parallel plates',
    summary: 'Flow between two fixed parallel plates (plane Poiseuille flow): shear stress, parabolic velocity profile, mean velocity and the pressure drop. Also flow with one plate moving (Couette flow).',
    syllabusPhrases: ['Laminar flow between parallel surfaces'],
    coverage: 'partial',
    coverageNote: 'Fixed plates are Bansal §9.3 (pp. 397–403). Couette flow (one plate moving) is not in this chapter and is supplementary.',
    highlighted: true,
    refs: [{ chapter: 9, section: '§9.3', pages: '397–403' }],
    diagrams: ['plates-profile'],
    sections: [
      {
        id: 'fixed',
        title: 'Two fixed parallel plates (§9.3)',
        body: md`> [!EXAM] Asked in 2024 Q2(a): laminar vs turbulent, limiting Re, and flow between parallel fixed plates
> Start with a short comparison table (below), the limiting values (pipe: Re < 2000 laminar, > 4000 turbulent), then the shear stress and velocity analysis. 3 marks in total.

Two plates a distance $t$ apart; $y$ measured from the lower plate. Take a fluid element $\Delta x \times \Delta y$ (unit width).

**Force balance** in the flow direction:
$$\left[p - \left(p + \frac{\partial p}{\partial x}\Delta x\right)\right]\Delta y + \left[\left(\tau + \frac{\partial\tau}{\partial y}\Delta y\right) - \tau\right]\Delta x = 0 \quad\Rightarrow\quad \frac{\partial p}{\partial x} = \frac{\partial\tau}{\partial y}$$

**Velocity.** With $\tau = \mu\,du/dy$: $\dfrac{\partial^2 u}{\partial y^2} = \dfrac{1}{\mu}\dfrac{\partial p}{\partial x}$. Integrating twice with $u = 0$ at $y = 0$ and $y = t$:
$$u = -\frac{1}{2\mu}\frac{\partial p}{\partial x}\left(t\,y - y^2\right)$$
A **parabola**, maximum at mid-gap ($y = t/2$):
$$U_{max} = -\frac{1}{8\mu}\frac{\partial p}{\partial x}t^2$$

**Shear stress.** $\tau = \mu\dfrac{du}{dy} = -\dfrac{1}{2}\dfrac{\partial p}{\partial x}(t - 2y)$: **linear**, zero at the centre line and maximum at each plate, $\tau_0 = -\dfrac{1}{2}\dfrac{\partial p}{\partial x}t$.

![Velocity and shear stress between fixed plates](diagram:plates-profile)

**Mean velocity and pressure drop.** Per unit width $Q = \int_0^t u\,dy = -\dfrac{1}{12\mu}\dfrac{\partial p}{\partial x}t^3$, so
$$\bar u = -\frac{1}{12\mu}\frac{\partial p}{\partial x}t^2 = \frac{2}{3}U_{max}$$
$$p_1 - p_2 = \frac{12\mu\bar u L}{t^2}, \qquad h_f = \frac{12\mu\bar u L}{\rho g t^2}$$`,
      },
      {
        id: 'compare',
        title: 'Laminar vs turbulent flow',
        body: md`| Laminar flow | Turbulent flow |
|---|---|
| Particles move in smooth parallel layers | Particles move in irregular, zig-zag paths; eddies form |
| Viscous forces dominate (low Re) | Inertia forces dominate (high Re) |
| Pipe: Re < 2000; plates: Re < 1000 | Pipe: Re > 4000 |
| Momentum transfer only by molecular viscosity | Momentum transfer mainly by eddy mixing |
| Parabolic velocity profile, $U_{max}/\bar u = 2$ (pipe) | Flatter (log/power-law) profile, $U_{max}/\bar u \approx 1.2$ |
| $h_f \propto V$ | $h_f \propto V^{1.75\text{–}2}$ |
| $f = 64/Re$, independent of roughness | $f$ depends on Re and relative roughness |
| e.g. oil in a bearing, blood in capillaries | e.g. water mains, rivers, air in ducts |`,
      },
      {
        id: 'couette',
        title: 'One plate moving: Couette flow',
        supplementary: true,
        body: md`> [!SUPP] Not in Bansal Ch. 9
> Needed for the film-lubrication view in the next topics and often asked as a variation.

The lower plate is fixed and the upper plate moves at speed $U$. The same equation with $u = 0$ at $y = 0$ and $u = U$ at $y = t$ gives
$$u = \frac{U y}{t} - \frac{1}{2\mu}\frac{\partial p}{\partial x}\left(t y - y^2\right)$$
- With **no pressure gradient**, $u = Uy/t$: a **linear** profile and uniform shear $\tau = \mu U/t$. This is the shaft-in-sleeve and bearing assumption.
- An adverse pressure gradient can cause back-flow near the fixed plate.`,
      },
    ],
    derivations: [
      {
        id: 'd-u3-plates',
        title: 'Velocity and shear distribution between fixed parallel plates',
        goal: md`Find $u(y)$, $\tau(y)$, the mean velocity and the pressure drop for laminar flow between two fixed plates a distance $t$ apart.`,
        assumptions: ['Steady, fully developed, laminar flow', 'Plates infinitely wide', 'Incompressible Newtonian fluid'],
        steps: [
          { math: md`\frac{\partial p}{\partial x} = \frac{\partial\tau}{\partial y}`, why: md`Force balance on an element $\Delta x\,\Delta y$: net pressure force = net shear force.` },
          { math: md`\frac{\partial^2 u}{\partial y^2} = \frac{1}{\mu}\frac{\partial p}{\partial x}`, why: md`Substitute $\tau = \mu\,du/dy$. (This is also the Navier–Stokes x-equation for this flow.)` },
          { math: md`u = \frac{1}{2\mu}\frac{\partial p}{\partial x}y^2 + C_1 y + C_2`, why: md`Integrate twice; ∂p/∂x is constant across the gap.` },
          { math: md`C_2 = 0, \quad C_1 = -\frac{1}{2\mu}\frac{\partial p}{\partial x}t`, why: md`No slip: $u = 0$ at $y = 0$ and at $y = t$.` },
          { math: md`u = -\frac{1}{2\mu}\frac{\partial p}{\partial x}\left(ty - y^2\right)`, why: md`Parabolic profile.` },
          { math: md`\tau = \mu\frac{du}{dy} = -\frac12\frac{\partial p}{\partial x}(t - 2y)`, why: md`Linear shear distribution; zero at mid-gap.` },
          { math: md`\bar u = \frac{1}{t}\int_0^t u\,dy = -\frac{1}{12\mu}\frac{\partial p}{\partial x}t^2 = \frac23 U_{max}`, why: md`Mean velocity, with $U_{max}$ at $y = t/2$.` },
          { math: md`h_f = \frac{p_1 - p_2}{\rho g} = \frac{12\mu\bar u L}{\rho g t^2}`, why: md`Integrate the pressure gradient over length $L$.` },
        ],
        result: md`u = -\frac{1}{2\mu}\frac{\partial p}{\partial x}(ty - y^2), \qquad h_f = \frac{12\mu\bar u L}{\rho g t^2}`,
        ref: { chapter: 9, section: '§9.3', pages: '397–399' },
      },
    ],
    keyPoints: [
      'Fixed plates: u = −(1/2μ)(∂p/∂x)(ty − y²), parabolic; U_max at mid-gap.',
      'ū = (2/3)U_max for plates (vs 1/2 for a pipe).',
      'Shear linear, zero at the centre, maximum at the plates.',
      'Pressure drop: p₁ − p₂ = 12μūL/t².',
      'One plate moving with no pressure gradient: linear profile, τ = μU/t.',
    ],
    misconceptions: ['Using 32 (pipe) instead of 12 (plates) in the pressure-drop formula.'],
    flashcards: [
      { id: 'fc-u3-pl1', front: 'U_max/ū between fixed parallel plates', back: '3/2 (ū = 2U_max/3).' },
      { id: 'fc-u3-pl2', front: 'Pressure drop between fixed plates', back: 'p₁ − p₂ = 12μūL/t².' },
      { id: 'fc-u3-pl3', front: 'Limiting Reynolds numbers for pipe flow', back: 'Laminar < 2000; transition 2000–4000; turbulent > 4000.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u3-correction-factors',
    unitId: 'u3',
    title: 'Momentum and kinetic energy correction factors',
    summary: 'Why a non-uniform velocity profile needs correction factors α and β in the energy and momentum equations, and their values for laminar pipe flow (α = 2, β = 4/3).',
    syllabusPhrases: ['Momentum and Kinetic energy correction factors'],
    coverage: 'full',
    refs: [{ chapter: 9, section: '§9.4', pages: '404–406' }],
    sections: [
      {
        id: 'defs',
        title: 'Definitions (§9.4)',
        body: md`The energy and momentum equations are written with the **mean** velocity $V$, but the real velocity varies over the section. The kinetic energy and momentum carried by the real profile are larger than those computed from $V$.

> [!DEF] Kinetic energy correction factor (α)
> The ratio of the kinetic energy per second based on the actual velocity to that based on the average velocity:
> $$\alpha = \frac{1}{A V^3}\int_A u^3\,dA$$

> [!DEF] Momentum correction factor (β)
> The ratio of the momentum per second based on the actual velocity to that based on the average velocity:
> $$\beta = \frac{1}{A V^2}\int_A u^2\,dA$$

With them, Bernoulli’s kinetic head becomes $\alpha V^2/2g$ and the momentum flux becomes $\beta\rho QV$. For a uniform profile $\alpha = \beta = 1$.`,
      },
      {
        id: 'values',
        title: 'Values for laminar pipe flow (Problem 9.13)',
        body: md`With $u = U_{max}(1 - r^2/R^2)$ and $V = U_{max}/2$:

$$\beta = \frac{1}{\pi R^2 V^2}\int_0^R U_{max}^2\left(1 - \frac{r^2}{R^2}\right)^2 2\pi r\,dr = \frac{4}{3}$$
$$\alpha = \frac{1}{\pi R^2 V^3}\int_0^R U_{max}^3\left(1 - \frac{r^2}{R^2}\right)^3 2\pi r\,dr = 2$$

| Flow | α | β |
|---|---|---|
| Uniform | 1 | 1 |
| Laminar, pipe | 2 | 4/3 |
| Laminar, parallel plates | 1.543 | 1.2 |
| Turbulent, pipe | 1.03–1.1 | 1.01–1.04 |

> [!EXAM]
> The integrals are easiest with the substitution $s = 1 - r^2/R^2$, $ds = -2r\,dr/R^2$: then $\int_0^R(1 - r^2/R^2)^n\,2\pi r\,dr = \pi R^2/(n + 1)$.`,
      },
    ],
    derivations: [
      {
        id: 'd-u3-alpha-beta',
        title: 'α = 2 and β = 4/3 for laminar pipe flow',
        goal: md`Evaluate the correction factors for the Hagen–Poiseuille profile.`,
        steps: [
          { math: md`u = U_{max}\left(1 - \frac{r^2}{R^2}\right), \quad V = \frac{U_{max}}{2}`, why: md`Laminar profile and its mean.` },
          { math: md`I_n = \int_0^R\left(1 - \frac{r^2}{R^2}\right)^n 2\pi r\,dr = \frac{\pi R^2}{n + 1}`, why: md`Substitute $s = 1 - r^2/R^2$.` },
          { math: md`\beta = \frac{U_{max}^2 I_2}{\pi R^2 V^2} = \frac{4 \cdot \pi R^2/3}{\pi R^2} = \frac43`, why: md`$U_{max}^2/V^2 = 4$, $I_2 = \pi R^2/3$.` },
          { math: md`\alpha = \frac{U_{max}^3 I_3}{\pi R^2 V^3} = \frac{8 \cdot \pi R^2/4}{\pi R^2} = 2`, why: md`$U_{max}^3/V^3 = 8$, $I_3 = \pi R^2/4$.` },
        ],
        result: md`\alpha = 2, \qquad \beta = \tfrac43`,
        ref: { chapter: 9, section: '§9.4, Problem 9.13', pages: '404–406' },
      },
    ],
    keyPoints: [
      'α = (1/AV³)∫u³dA corrects kinetic energy; β = (1/AV²)∫u²dA corrects momentum.',
      'Laminar pipe flow: α = 2, β = 4/3. Turbulent: both close to 1.',
      'α > β > 1 for any non-uniform profile.',
    ],
    flashcards: [
      { id: 'fc-u3-c1', front: 'Kinetic energy correction factor for laminar pipe flow', back: 'α = 2.' },
      { id: 'fc-u3-c2', front: 'Momentum correction factor for laminar pipe flow', back: 'β = 4/3.' },
      { id: 'fc-u3-c3', front: 'Define the momentum correction factor', back: 'β = momentum per second from the actual profile ÷ that from the mean velocity = (1/AV²)∫u² dA.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u3-viscous-power',
    unitId: 'u3',
    title: 'Power absorbed in viscous resistance and film lubrication',
    summary: 'Torque and power lost in journal bearings, foot-step bearings and collar bearings, the dash-pot, and the film-lubrication picture behind them.',
    syllabusPhrases: ['power absorbed in viscous resistance', 'film lubrication'],
    coverage: 'partial',
    coverageNote: 'Bearings are Bansal §9.5 (pp. 407–414) and the dash-pot §9.6 (p. 417). The book never uses the term “film lubrication”, so that section is supplementary.',
    highlighted: true,
    refs: [
      { chapter: 9, section: '§9.5', pages: '407–414' },
      { chapter: 9, section: '§9.6', pages: '417–418' },
    ],
    diagrams: ['collar-bearing'],
    sections: [
      {
        id: 'journal',
        title: 'Journal bearing (§9.5.1)',
        body: md`A shaft of diameter $D$ rotates at $N$ rpm in a bearing of length $L$ with an oil film of thickness $t$. The film is thin, so the velocity varies **linearly** across it (Couette flow):
$$V = \frac{\pi D N}{60}, \qquad \tau = \mu\frac{V}{t}$$
$$F = \tau\,\pi D L, \qquad T = F\frac{D}{2}, \qquad P = \frac{2\pi N T}{60} = \frac{\mu\pi^3 D^3 N^2 L}{60^2\, t}$$`,
      },
      {
        id: 'footstep',
        title: 'Foot-step bearing (§9.5.2)',
        body: md`A vertical shaft of radius $R$ rests on a flat oil film of thickness $t$. The velocity now varies with radius, so integrate over rings of radius $r$, width $dr$:
$$\tau = \mu\frac{\omega r}{t}, \qquad dT = \tau\,(2\pi r\,dr)\,r = \frac{2\pi\mu\omega}{t}r^3\,dr$$
$$T = \frac{\pi\mu\omega R^4}{2t} = \frac{\mu\pi^2 N R^4}{60\,t}, \qquad P = T\omega$$`,
      },
      {
        id: 'collar',
        title: 'Collar bearing (§9.5.3)',
        body: md`> [!EXAM] Asked in 2024 Q4(a): collar bearing, D₁ = 100 mm, D₂ = 50 mm, t = 0.5 mm, μ = 1.5 poise, N = 600 rpm
> Same integration as the foot-step bearing, but between the inner radius $R_2$ and outer radius $R_1$. Worked in full in the Examples tab: $T = 0.173$ N·m, $P = 10.9$ W.

The thrust is taken by an annular collar. Integrating the ring torque from $R_2$ to $R_1$:
$$T = \frac{\pi\mu\omega}{2t}\left(R_1^4 - R_2^4\right) = \frac{\mu\pi^2 N}{60\,t}\left(R_1^4 - R_2^4\right), \qquad P = \frac{2\pi N T}{60}$$

![Collar bearing and the elemental ring](diagram:collar-bearing)`,
      },
      {
        id: 'dashpot',
        title: 'Movement of a piston in a dash-pot (§9.6)',
        body: md`A piston of diameter $D$ and length $L$ moves at speed $V$ in a cylinder full of oil, with radial clearance $t \ll D$. The oil escapes through the annular gap, which behaves like flow between **parallel plates**. Bansal gives
$$\mu = \frac{4\,W\,t^3}{3\pi L D^3 V}$$
where $W$ is the load on the piston. Dash-pots damp motion (door closers, governors, shock absorbers).`,
      },
      {
        id: 'film',
        title: 'Film lubrication',
        supplementary: true,
        body: md`> [!SUPP] Term not used in Bansal
> The syllabus says “film lubrication”; the bearing calculations above are its quantitative side.

In **hydrodynamic (thick-film) lubrication** a continuous film of oil completely separates the two surfaces, so there is no metal-to-metal contact. The load is carried by pressure generated in the film, and the only resistance is the viscous shear of the oil, which is what the bearing formulas compute.

How the pressure arises (Reynolds’ lubrication theory): in a journal bearing the shaft runs slightly off-centre, so the film forms a **converging wedge**. The rotating shaft drags oil into the narrowing gap (Couette flow); to conserve mass the pressure must rise, pushing oil back out (Poiseuille flow). That pressure supports the load.

Conditions for a good film: enough viscosity and speed, a converging gap, and a load low enough not to squeeze the film thinner than the surface roughness. Otherwise the bearing moves into **boundary lubrication** (surfaces touch through thin adsorbed layers; friction and wear rise).

Lower viscosity cuts power loss ($P \propto \mu$) but also cuts the load capacity: lubricant choice is that trade-off.`,
      },
    ],
    keyPoints: [
      'Thin film ⇒ linear velocity across it ⇒ τ = μV/t.',
      'Journal: T = τ(πDL)(D/2), P = 2πNT/60.',
      'Foot-step: T = πμωR⁴/(2t). Collar: T = πμω(R₁⁴ − R₂⁴)/(2t).',
      'Power lost ∝ μN²: speed matters more than viscosity.',
      'Film lubrication: a full oil film separates the surfaces; the wedge generates load-carrying pressure.',
    ],
    misconceptions: [
      'Using diameters in place of radii in the R⁴ formulas (a factor of 16 error).',
      'Forgetting to convert poise to N·s/m² (divide by 10) and mm to m.',
    ],
    flashcards: [
      { id: 'fc-u3-v1', front: 'Torque in a collar bearing', back: 'T = πμω(R₁⁴ − R₂⁴)/(2t) = μπ²N(R₁⁴ − R₂⁴)/(60t).' },
      { id: 'fc-u3-v2', front: 'Torque in a foot-step bearing', back: 'T = πμωR⁴/(2t).' },
      { id: 'fc-u3-v3', front: 'What is hydrodynamic film lubrication?', back: 'A continuous oil film fully separates the surfaces; pressure generated in a converging wedge carries the load.' },
    ],
  },

  /* ------------------------------------------------------------------ */
  {
    id: 'u3-viscometers',
    unitId: 'u3',
    title: 'Measurement of viscosity: viscometers',
    summary: 'Capillary tube, falling sphere, rotating cylinder and orifice-type (Redwood/Saybolt) viscometers: principle, formula and working.',
    syllabusPhrases: ['power absorbed in viscous resistance'],
    coverage: 'full',
    highlighted: true,
    refs: [{ chapter: 9, section: '§9.8', pages: '419–425' }],
    diagrams: ['viscometers'],
    sections: [
      {
        id: 'types',
        title: 'Viscometers and their types (§9.8)',
        body: md`> [!EXAM] Asked in 2024 Q2(c): what is a viscometer, types, explain any one (2 marks)
> Definition (½), list of four types (½), one explained with sketch and formula (1). The capillary tube or falling sphere method is quickest to write.

> [!DEF] Viscometer
> An instrument for measuring the viscosity of a fluid. Each type uses a laminar flow whose exact solution links the measured quantity to μ.

| Type | Laminar-flow principle | Formula |
|---|---|---|
| Capillary tube | Hagen–Poiseuille | $\mu = \dfrac{\pi\rho g h D^4}{128\,Q\,L}$ |
| Falling sphere | Stokes’ law | $\mu = \dfrac{g d^2(\rho_s - \rho)}{18\,U}$ |
| Rotating cylinder | Couette flow in the annular gap | $\mu = \dfrac{T\,(R_2 - R_1)}{2\pi R_1^2 R_2 H\,\omega} \;(+\text{ end correction})$ |
| Orifice type (Redwood, Saybolt, Engler) | flow through a short tube | $\nu = At - B/t$ (empirical) |

![Capillary tube and falling-sphere viscometers](diagram:viscometers)`,
      },
      {
        id: 'capillary',
        title: 'Capillary tube method (§9.8.1)',
        body: md`Liquid from a constant-head tank flows through a long capillary tube of diameter $D$. Two piezometers a length $L$ apart give the head difference $h$; the discharge $Q$ is found by collecting liquid in a measuring tank for a known time. With the flow laminar, Hagen–Poiseuille gives
$$h = \frac{32\mu\bar u L}{\rho g D^2}, \quad \bar u = \frac{Q}{\pi D^2/4} \quad\Rightarrow\quad \mu = \frac{\pi\rho g h D^4}{128\,Q\,L}$$
Check afterwards that Re < 2000, otherwise the formula is invalid.`,
      },
      {
        id: 'sphere',
        title: 'Falling sphere method (§9.8.2)',
        body: md`A small steel ball is dropped into the liquid in a tall glass tube. It quickly reaches its **terminal velocity** $U$, when weight = buoyancy + drag. The time to fall a marked distance gives $U$. With Stokes’ drag $F_D = 3\pi\mu U d$ (valid for Re < 0.2):
$$\frac{\pi}{6}d^3\rho_s g = \frac{\pi}{6}d^3\rho g + 3\pi\mu U d \quad\Rightarrow\quad \mu = \frac{g d^2(\rho_s - \rho)}{18\,U}$$
The tube must be wide compared with the ball so the walls do not slow it.`,
      },
    ],
    keyPoints: [
      'Capillary: μ = πρghD⁴/(128QL) (Hagen–Poiseuille).',
      'Falling sphere: μ = gd²(ρ_s − ρ)/(18U) (Stokes’ law, Re < 0.2).',
      'Rotating cylinder: torque on the inner cylinder from Couette flow in the gap.',
      'Redwood/Saybolt: time for a fixed volume through an orifice; kinematic viscosity from an empirical relation.',
    ],
    flashcards: [
      { id: 'fc-u3-vm1', front: 'Four types of viscometer', back: 'Capillary tube, falling sphere, rotating cylinder, orifice type (Redwood/Saybolt).' },
      { id: 'fc-u3-vm2', front: 'Falling-sphere viscometer formula', back: 'μ = g d² (ρ_s − ρ) / (18 U).' },
      { id: 'fc-u3-vm3', front: 'Capillary-tube viscometer formula', back: 'μ = π ρ g h D⁴ / (128 Q L).' },
    ],
  },
]

/* =============================================================================
 * Worked examples
 * ========================================================================== */

export const examples: WorkedExample[] = [
  {
    id: 'ex-9-1',
    topicId: 'u3-pipe-laminar',
    title: 'Pressure drop for crude oil in a pipe',
    source: { kind: 'textbook', ref: 'Problem 9.1', page: 391 },
    difficulty: 1,
    statement: md`A crude oil of viscosity 0.97 poise and relative density 0.9 is flowing through a horizontal circular pipe of diameter 100 mm and of length 10 m. Calculate the difference of pressure at the two ends of the pipe, if 100 kg of the oil is collected in a tank in 30 seconds.`,
    given: ['μ = 0.97 poise = 0.097 N·s/m²', 'ρ = 900 kg/m³', 'D = 0.1 m, L = 10 m', 'ṁ = 100 kg / 30 s'],
    find: ['p₁ − p₂'],
    approach: md`Mean velocity from the mass flow, check Re < 2000, then Hagen–Poiseuille.`,
    steps: [
      { label: 'Discharge and mean velocity', work: md`$Q = \dfrac{100/30}{900} = 3.704 \times 10^{-3}$ m³/s; $\bar u = \dfrac{Q}{\pi(0.1)^2/4} = 0.4716$ m/s` },
      { label: 'Check laminar', work: md`$Re = \dfrac{900 \times 0.4716 \times 0.1}{0.097} = 437.5 < 2000$ ✓` },
      { label: 'Hagen–Poiseuille', work: md`$p_1 - p_2 = \dfrac{32\mu\bar u L}{D^2} = \dfrac{32 \times 0.097 \times 0.4716 \times 10}{0.01} = 1463.8$ N/m²` },
    ],
    answer: md`$p_1 - p_2 \approx 1464$ N/m² $= 0.146$ N/cm²`,
    concept: 'Always check Re before using a laminar formula.',
  },
  {
    id: 'ex-9-7',
    topicId: 'u3-parallel-plates',
    title: 'Oil between stationary parallel plates',
    source: { kind: 'textbook', ref: 'Problem 9.7', page: 400 },
    difficulty: 1,
    statement: md`Calculate: (i) the pressure gradient along flow, (ii) the average velocity, and (iii) the discharge for an oil of viscosity 0.02 Ns/m² flowing between two stationary parallel plates 1 m wide maintained 10 mm apart. The velocity midway between the plates is 2 m/s.`,
    given: ['μ = 0.02 N·s/m²', 'width b = 1 m, t = 0.01 m', 'U_max = 2 m/s'],
    find: ['∂p/∂x', 'ū', 'Q'],
    approach: md`$U_{max} = -\dfrac{1}{8\mu}\dfrac{\partial p}{\partial x}t^2$ and $\bar u = \tfrac23U_{max}$.`,
    steps: [
      { label: 'Pressure gradient', work: md`$\dfrac{\partial p}{\partial x} = -\dfrac{8\mu U_{max}}{t^2} = -\dfrac{8 \times 0.02 \times 2}{0.0001} = -3200$ N/m² per m` },
      { label: 'Average velocity', work: md`$\bar u = \tfrac23 \times 2 = 1.333$ m/s` },
      { label: 'Discharge', work: md`$Q = \bar u\,b\,t = 1.333 \times 1 \times 0.01 = 0.01333$ m³/s` },
    ],
    answer: md`$\partial p/\partial x = -3200$ N/m³; $\bar u = 1.333$ m/s; $Q = 0.0133$ m³/s`,
    concept: 'Plates: ū = (2/3)U_max, unlike ū = U_max/2 in a pipe.',
  },
  {
    id: 'ex-9-21',
    topicId: 'u3-viscous-power',
    title: 'Power lost in a collar bearing',
    source: { kind: 'textbook', ref: 'Problem 9.21', page: 413 },
    difficulty: 2,
    statement: md`A collar bearing having external and internal diameters 150 mm and 100 mm respectively is used to take the thrust of a shaft. An oil film of thickness 0.25 mm is maintained between the collar surface and the bearing. Find the power lost in overcoming the viscous resistance when the shaft rotates at 300 r.p.m. Take μ = 0.91 poise.`,
    given: ['R₁ = 0.075 m, R₂ = 0.05 m', 't = 0.25 × 10⁻³ m', 'N = 300 rpm ⇒ ω = 31.42 rad/s', 'μ = 0.091 N·s/m²'],
    find: ['P'],
    approach: md`$T = \dfrac{\pi\mu\omega}{2t}(R_1^4 - R_2^4)$, $P = T\omega$.`,
    steps: [
      { label: 'Radii to the fourth', work: md`$R_1^4 - R_2^4 = 3.164 \times 10^{-5} - 0.625 \times 10^{-5} = 2.539 \times 10^{-5}$ m⁴` },
      { label: 'Torque', work: md`$T = \dfrac{\pi \times 0.091 \times 31.42}{2 \times 0.25 \times 10^{-3}} \times 2.539 \times 10^{-5} = 0.456$ N·m` },
      { label: 'Power', work: md`$P = T\omega = 0.456 \times 31.42 = 14.33$ W` },
    ],
    answer: md`$P \approx 14.3$ W`,
    concept: 'Collar bearing: integrate ring torques between R₂ and R₁.',
  },
  {
    id: 'ex-u3-2024-q4a',
    topicId: 'u3-viscous-power',
    title: 'The 2024 collar bearing (Q4a)',
    source: { kind: 'generated' },
    difficulty: 2,
    statement: md`A collar bearing has external and internal diameters of 100 mm and 50 mm respectively. The film of oil between the collar surface and bearing is 0.5 mm thick and has coefficient of viscosity as 1.5 poise. Find the power required to overcome the viscous resistance, when shaft rotates at 600 rpm.`,
    given: ['R₁ = 0.05 m, R₂ = 0.025 m', 't = 0.5 × 10⁻³ m', 'μ = 1.5 poise = 0.15 N·s/m²', 'N = 600 rpm'],
    find: ['P'],
    approach: md`Same as Problem 9.21.`,
    steps: [
      { label: 'Angular speed', work: md`$\omega = \dfrac{2\pi(600)}{60} = 62.83$ rad/s` },
      { label: 'Radii', work: md`$R_1^4 - R_2^4 = 6.25 \times 10^{-6} - 0.391 \times 10^{-6} = 5.859 \times 10^{-6}$ m⁴` },
      { label: 'Torque', work: md`$T = \dfrac{\pi \times 0.15 \times 62.83}{2 \times 0.5 \times 10^{-3}} \times 5.859 \times 10^{-6} = 0.1735$ N·m` },
      { label: 'Power', work: md`$P = T\omega = 0.1735 \times 62.83 = 10.90$ W` },
    ],
    answer: md`$T = 0.173$ N·m, $P \approx 10.9$ W`,
    concept: 'Exact 2024 Q4(a) numbers, solved by the Bansal method.',
    observations: ['A common slip is using diameters in the R⁴ term: that gives 174 W, sixteen times too large.'],
  },
  {
    id: 'ex-9-26',
    topicId: 'u3-viscometers',
    title: 'Viscosity from a capillary tube',
    source: { kind: 'textbook', ref: 'Problem 9.26', page: 423 },
    difficulty: 2,
    statement: md`The viscosity of an oil of sp. gr. 0.9 is measured by a capillary tube of diameter 50 mm. The difference of pressure head between two points 2 m apart is 0.5 m of water. The mass of oil collected in a measuring tank is 60 kg in 100 seconds. Find the viscosity of oil.`,
    given: ['D = 0.05 m, L = 2 m', 'Δp = 0.5 m of water = 4905 N/m²', 'ṁ = 0.6 kg/s, ρ = 900 kg/m³'],
    find: ['μ'],
    approach: md`$\mu = \dfrac{\pi D^4\,\Delta p}{128\,Q\,L}$, with $\Delta p = \rho_w g h$ since the head is given in water.`,
    steps: [
      { label: 'Discharge', work: md`$Q = 0.6/900 = 6.667 \times 10^{-4}$ m³/s` },
      { label: 'Pressure difference', work: md`$\Delta p = 1000 \times 9.81 \times 0.5 = 4905$ N/m²` },
      { label: 'Viscosity', work: md`$\mu = \dfrac{\pi(0.05)^4 \times 4905}{128 \times 6.667 \times 10^{-4} \times 2} = 0.564$ N·s/m²` },
      { label: 'Check Re', work: md`$\bar u = 0.340$ m/s, $Re = 900 \times 0.340 \times 0.05/0.564 = 27 < 2000$ ✓` },
    ],
    answer: md`$\mu \approx 0.564$ N·s/m² $= 5.64$ poise`,
    concept: 'Capillary viscometer uses Hagen–Poiseuille in reverse.',
  },
  {
    id: 'ex-9-28',
    topicId: 'u3-viscometers',
    title: 'Falling-sphere viscometer',
    source: { kind: 'textbook', ref: 'Problem 9.28', page: 424 },
    difficulty: 1,
    statement: md`A sphere of diameter 2 mm falls 150 mm in 20 seconds in a viscous liquid. The density of the sphere is 7500 kg/m³ and of liquid is 900 kg/m³. Find the co-efficient of viscosity of the liquid.`,
    given: ['d = 0.002 m', 'U = 0.15/20 = 0.0075 m/s', 'ρ_s = 7500, ρ = 900 kg/m³'],
    find: ['μ'],
    approach: md`Stokes’ law at terminal velocity.`,
    steps: [
      { label: 'Formula', work: md`$\mu = \dfrac{g d^2(\rho_s - \rho)}{18U}$` },
      { label: 'Evaluate', work: md`$\mu = \dfrac{9.81 \times (0.002)^2 \times 6600}{18 \times 0.0075} = 1.918$ N·s/m²` },
    ],
    answer: md`$\mu \approx 1.92$ N·s/m² $= 19.2$ poise`,
    concept: 'Falling sphere: weight − buoyancy = Stokes drag.',
  },
]

/* =============================================================================
 * Questions
 * ========================================================================== */

export const questions: Question[] = [
  {
    id: 'q-u3-1',
    topicId: 'u3-pipe-laminar',
    type: 'derivation',
    difficulty: 2,
    prompt: md`Derive the expression for the loss of head in laminar flow through a circular pipe (Hagen–Poiseuille formula).`,
    source: { kind: 'textbook', ref: '§9.2', page: 387 },
    solution: md`Force balance on a fluid cylinder of radius $r$: $\tau = -\dfrac{\partial p}{\partial x}\dfrac r2$. With $\tau = -\mu\,du/dr$ and $u(R) = 0$: $u = -\dfrac{1}{4\mu}\dfrac{\partial p}{\partial x}(R^2 - r^2)$. Mean velocity $\bar u = -\dfrac{1}{8\mu}\dfrac{\partial p}{\partial x}R^2$, so $-\dfrac{\partial p}{\partial x} = \dfrac{32\mu\bar u}{D^2}$. Over length $L$: $p_1 - p_2 = \dfrac{32\mu\bar uL}{D^2}$ and $h_f = \dfrac{32\mu\bar uL}{\rho gD^2}$.`,
  },
  {
    id: 'q-u3-2',
    topicId: 'u3-pipe-laminar',
    type: 'mcq',
    difficulty: 1,
    prompt: md`For laminar flow in a circular pipe, the ratio of maximum velocity to average velocity is`,
    options: ['1.5', '2.0', '1.33', '1.2'],
    answer: 1,
    source: { kind: 'textbook', ref: '§9.2.2', page: 390 },
    solution: md`$\bar u = U_{max}/2$. (For parallel plates the ratio is 1.5.)`,
  },
  {
    id: 'q-u3-3',
    topicId: 'u3-pipe-laminar',
    type: 'mcq',
    difficulty: 1,
    prompt: md`In laminar pipe flow the shear stress`,
    options: ['is constant across the section', 'is maximum at the centre', 'varies linearly, zero at the centre and maximum at the wall', 'varies parabolically'],
    answer: 2,
    source: { kind: 'textbook', ref: '§9.2.1', page: 388 },
    solution: md`$\tau = -\dfrac{\partial p}{\partial x}\dfrac r2$: linear in $r$. It is the *velocity* that is parabolic.`,
  },
  {
    id: 'q-u3-4',
    topicId: 'u3-parallel-plates',
    type: 'long',
    difficulty: 2,
    prompt: md`Differentiate between laminar and turbulent flow and give the limiting Reynolds numbers. Analyse laminar flow between two parallel fixed plates for shear stress and velocity distribution.`,
    source: { kind: 'generated' },
    solution: md`Laminar: orderly layers, viscous forces dominate, pipe Re < 2000. Turbulent: eddying, inertia dominates, pipe Re > 4000; 2000–4000 transitional.

Plates: force balance $\dfrac{\partial p}{\partial x} = \dfrac{\partial\tau}{\partial y}$; with $\tau = \mu\,du/dy$ and no slip at $y = 0, t$: $u = -\dfrac{1}{2\mu}\dfrac{\partial p}{\partial x}(ty - y^2)$ (parabolic, $U_{max}$ at mid-gap, $\bar u = \tfrac23U_{max}$). $\tau = -\tfrac12\dfrac{\partial p}{\partial x}(t - 2y)$ (linear, zero at centre, maximum at walls). Pressure drop $p_1 - p_2 = 12\mu\bar uL/t^2$.`,
  },
  {
    id: 'q-u3-5',
    topicId: 'u3-parallel-plates',
    type: 'numerical',
    difficulty: 2,
    prompt: md`An oil of viscosity 10 poise flows between two parallel fixed plates kept 50 mm apart. Find the rate of flow if the drop of pressure in a length of 1.2 m is 0.3 N/cm². The width of the plates is 200 mm.`,
    source: { kind: 'textbook', ref: 'Problem 9.9', page: 401 },
    solution: md`$\mu = 1$ N·s/m², $\Delta p = 3000$ N/m², $t = 0.05$ m. $\bar u = \dfrac{\Delta p\,t^2}{12\mu L} = \dfrac{3000 \times 0.0025}{12 \times 1 \times 1.2} = 0.521$ m/s. $Q = \bar u\,b\,t = 0.521 \times 0.2 \times 0.05 = 5.21 \times 10^{-3}$ m³/s = 5.21 litres/s.`,
  },
  {
    id: 'q-u3-6',
    topicId: 'u3-correction-factors',
    type: 'derivation',
    difficulty: 2,
    prompt: md`Define the momentum and kinetic energy correction factors and show that for laminar flow through a pipe they are 4/3 and 2 respectively.`,
    source: { kind: 'textbook', ref: 'Problem 9.13', page: 404 },
    solution: md`$\beta = \dfrac{1}{AV^2}\displaystyle\int u^2dA$, $\alpha = \dfrac{1}{AV^3}\displaystyle\int u^3dA$. With $u = U_{max}(1 - r^2/R^2)$, $V = U_{max}/2$ and $\displaystyle\int_0^R(1 - r^2/R^2)^n2\pi r\,dr = \pi R^2/(n + 1)$: $\beta = 4 \times \tfrac13 = \tfrac43$, $\alpha = 8 \times \tfrac14 = 2$.`,
  },
  {
    id: 'q-u3-7',
    topicId: 'u3-correction-factors',
    type: 'mcq',
    difficulty: 1,
    prompt: md`The kinetic energy correction factor for laminar flow through a circular pipe is`,
    options: ['1.0', '1.33', '1.5', '2.0'],
    answer: 3,
    source: { kind: 'textbook', ref: '§9.4', page: 405 },
    solution: md`α = 2 (and β = 4/3).`,
  },
  {
    id: 'q-u3-8',
    topicId: 'u3-viscous-power',
    type: 'numerical',
    difficulty: 2,
    prompt: md`Find the power required to rotate a circular disc of diameter 200 mm at 1000 rpm. The disc has a clearance of 0.4 mm from the bottom flat plate and the clearance contains oil of viscosity 1.05 poise.`,
    hints: ['Treat it as a foot-step bearing: T = πμωR⁴/(2t)'],
    source: { kind: 'textbook', ref: 'Problem 9.20', page: 412 },
    solution: md`$\omega = 104.72$ rad/s, $\mu = 0.105$, $R = 0.1$, $t = 0.4 \times 10^{-3}$. $T = \dfrac{\pi \times 0.105 \times 104.72 \times 10^{-4}}{2 \times 0.0004} = 4.318$ N·m. $P = T\omega = 452$ W.`,
  },
  {
    id: 'q-u3-9',
    topicId: 'u3-viscous-power',
    type: 'short',
    difficulty: 1,
    prompt: md`What is film lubrication? How does a journal bearing carry load without metal contact?`,
    source: { kind: 'generated' },
    solution: md`A continuous oil film fully separates the bearing surfaces, so the only resistance is viscous shear in the oil. The loaded shaft runs eccentric, forming a converging wedge; rotation drags oil into the narrowing gap and the pressure rises (to conserve mass), and this film pressure supports the load.`,
  },
  {
    id: 'q-u3-10',
    topicId: 'u3-viscometers',
    type: 'short',
    difficulty: 1,
    prompt: md`What is a viscometer? Name its types and explain the working of any one.`,
    source: { kind: 'generated' },
    solution: md`An instrument that measures viscosity using a laminar flow whose solution is known. Types: capillary tube, falling sphere, rotating cylinder, orifice type (Redwood/Saybolt). **Falling sphere:** a small ball dropped in the liquid reaches terminal velocity U, measured by timing it between two marks. Weight = buoyancy + Stokes drag ⇒ $\mu = gd^2(\rho_s - \rho)/(18U)$.`,
  },
  {
    id: 'q-u3-11',
    topicId: 'u3-viscometers',
    type: 'mcq',
    difficulty: 1,
    prompt: md`The falling-sphere viscometer is based on`,
    options: ['Hagen–Poiseuille’s law', 'Stokes’ law', 'Newton’s law of cooling', 'Bernoulli’s equation'],
    answer: 1,
    source: { kind: 'textbook', ref: '§9.8.2', page: 421 },
    solution: md`Stokes’ drag on a sphere $F_D = 3\pi\mu Ud$, valid at very low Re.`,
  },
]

/* =============================================================================
 * Formulas
 * ========================================================================== */

export const formulas: Formula[] = [
  {
    id: 'f-u3-re',
    topicId: 'u3-pipe-laminar',
    name: 'Reynolds number',
    latex: md`Re = \frac{\rho V D}{\mu} = \frac{VD}{\nu}`,
    vars: [
      { sym: md`V`, meaning: 'mean velocity', unit: 'm/s' },
      { sym: md`D`, meaning: 'pipe diameter', unit: 'm' },
    ],
    conditions: 'Pipe: laminar < 2000, turbulent > 4000.',
    meaning: 'Inertia force / viscous force.',
    important: true,
  },
  {
    id: 'f-u3-profile',
    topicId: 'u3-pipe-laminar',
    name: 'Laminar pipe velocity profile',
    latex: md`u = -\frac{1}{4\mu}\frac{\partial p}{\partial x}\left(R^2 - r^2\right), \qquad \bar u = \frac{U_{max}}{2}`,
    vars: [{ sym: md`R`, meaning: 'pipe radius', unit: 'm' }],
    conditions: 'Steady, fully developed laminar flow.',
    meaning: 'Parabolic profile; shear stress linear in r.',
    ref: { chapter: 9, section: '§9.2', pages: '388–390' },
  },
  {
    id: 'f-u3-hp',
    topicId: 'u3-pipe-laminar',
    name: 'Hagen–Poiseuille head loss',
    latex: md`h_f = \frac{32\mu\bar u L}{\rho g D^2}`,
    vars: [
      { sym: md`\bar u`, meaning: 'mean velocity', unit: 'm/s' },
      { sym: md`L`, meaning: 'pipe length', unit: 'm' },
    ],
    conditions: 'Laminar flow (Re < 2000).',
    meaning: 'Head loss ∝ velocity; equivalent to f = 64/Re.',
    important: true,
    ref: { chapter: 9, section: '§9.2', pages: '391' },
  },
  {
    id: 'f-u3-plates',
    topicId: 'u3-parallel-plates',
    name: 'Flow between fixed parallel plates',
    latex: md`u = -\frac{1}{2\mu}\frac{\partial p}{\partial x}(ty - y^2), \qquad p_1 - p_2 = \frac{12\mu\bar u L}{t^2}`,
    vars: [{ sym: md`t`, meaning: 'gap between plates', unit: 'm' }],
    conditions: 'Laminar; ū = (2/3)U_max.',
    meaning: 'Plane Poiseuille flow.',
    important: true,
    ref: { chapter: 9, section: '§9.3', pages: '397–399' },
  },
  {
    id: 'f-u3-alpha-beta',
    topicId: 'u3-correction-factors',
    name: 'Correction factors',
    latex: md`\alpha = \frac{1}{AV^3}\int_A u^3\,dA, \qquad \beta = \frac{1}{AV^2}\int_A u^2\,dA`,
    vars: [],
    conditions: 'Laminar pipe flow: α = 2, β = 4/3.',
    meaning: 'Correct the kinetic-energy and momentum flux for a non-uniform profile.',
    ref: { chapter: 9, section: '§9.4', pages: '404–405' },
  },
  {
    id: 'f-u3-journal',
    topicId: 'u3-viscous-power',
    name: 'Journal bearing',
    latex: md`\tau = \mu\frac{\pi D N}{60\,t}, \quad T = \tau\,\pi D L\,\frac{D}{2}, \quad P = \frac{2\pi N T}{60}`,
    vars: [
      { sym: md`t`, meaning: 'oil film thickness', unit: 'm' },
      { sym: md`L`, meaning: 'bearing length', unit: 'm' },
    ],
    conditions: 'Thin film, linear velocity across it.',
    meaning: 'Viscous torque and power lost.',
    ref: { chapter: 9, section: '§9.5.1', pages: '407–408' },
  },
  {
    id: 'f-u3-collar',
    topicId: 'u3-viscous-power',
    name: 'Foot-step and collar bearings',
    latex: md`T_{\text{foot-step}} = \frac{\pi\mu\omega R^4}{2t}, \qquad T_{\text{collar}} = \frac{\pi\mu\omega}{2t}\left(R_1^4 - R_2^4\right)`,
    vars: [
      { sym: md`R_1, R_2`, meaning: 'outer and inner radii', unit: 'm' },
      { sym: md`\omega`, meaning: '2πN/60', unit: 'rad/s' },
    ],
    conditions: 'Thin oil film of uniform thickness t.',
    meaning: 'Integrate τ = μωr/t over rings.',
    important: true,
    ref: { chapter: 9, section: '§9.5.2–9.5.3', pages: '411–413' },
  },
  {
    id: 'f-u3-viscometers',
    topicId: 'u3-viscometers',
    name: 'Viscometer formulas',
    latex: md`\mu_{\text{capillary}} = \frac{\pi\rho g h D^4}{128\,Q\,L}, \qquad \mu_{\text{sphere}} = \frac{g d^2(\rho_s - \rho)}{18\,U}`,
    vars: [
      { sym: md`U`, meaning: 'terminal velocity of sphere', unit: 'm/s' },
      { sym: md`h`, meaning: 'head loss over length L', unit: 'm' },
    ],
    conditions: 'Capillary: Re < 2000. Sphere: Re < 0.2.',
    meaning: 'Hagen–Poiseuille and Stokes’ law in reverse.',
    ref: { chapter: 9, section: '§9.8', pages: '419–422' },
  },
]
