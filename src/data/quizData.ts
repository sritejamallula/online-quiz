import { Subject, Question, Difficulty, LeaderboardEntry, SemesterCode, AcademicYear, Semester } from '../types';

// Helper to create questions with GFG style explanations
function createQuestion(
  id: string,
  text: string,
  options: string[],
  correctIndex: number,
  difficulty: Difficulty,
  explanation: string,
  codeSnippet?: string
): Question {
  return { id, text, options, correctIndex, difficulty, explanation, codeSnippet };
}

// Helper to generate 10 questions with 4 Easy, 3 Moderate, 3 Hard split
function generateQuestionsForQuiz(subjectId: string, lessonId: string, quizNumber: number, baseBank: Question[]): Question[] {
  const easyPool = baseBank.filter(q => q.difficulty === 'EASY');
  const modPool = baseBank.filter(q => q.difficulty === 'MODERATE');
  const hardPool = baseBank.filter(q => q.difficulty === 'HARD');

  const selected: Question[] = [];

  for (let i = 0; i < 4; i++) {
    const src = easyPool[i % easyPool.length];
    selected.push({
      ...src,
      id: `${subjectId}-${lessonId}-q${quizNumber}-e${i + 1}`,
      text: `${src.text} (Set ${quizNumber}.${i + 1})`
    });
  }

  for (let i = 0; i < 3; i++) {
    const src = modPool[i % modPool.length];
    selected.push({
      ...src,
      id: `${subjectId}-${lessonId}-q${quizNumber}-m${i + 1}`,
      text: `${src.text} (Set ${quizNumber}.${i + 1})`
    });
  }

  for (let i = 0; i < 3; i++) {
    const src = hardPool[i % hardPool.length];
    selected.push({
      ...src,
      id: `${subjectId}-${lessonId}-q${quizNumber}-h${i + 1}`,
      text: `${src.text} (Set ${quizNumber}.${i + 1})`
    });
  }

  return selected;
}

// Helper to create 5 Lessons per Subject
function createLessonsForSubject(
  subjectId: string,
  moduleNames: { title: string; desc: string }[],
  bank: Question[]
) {
  return moduleNames.map((mod, mIdx) => ({
    id: `${subjectId}-m${mIdx + 1}`,
    subjectId,
    moduleNumber: mIdx + 1,
    title: mod.title,
    description: mod.desc,
    quizzes: Array.from({ length: 5 }, (_, qIdx) => ({
      id: `${subjectId}-m${mIdx + 1}-quiz-${qIdx + 1}`,
      subjectId,
      lessonId: `${subjectId}-m${mIdx + 1}`,
      quizNumber: qIdx + 1,
      title: `${mod.title.split(':')[0]} - Quiz ${qIdx + 1}`,
      durationMinutes: 10,
      questions: generateQuestionsForQuiz(subjectId, `${subjectId}-m${mIdx + 1}`, qIdx + 1, bank)
    }))
  }));
}

// Default 5 Module Syllabus Template for Core Subjects
const defaultModuleTemplate = (name: string) => [
  { title: `Module 1: Foundations of ${name}`, desc: `Core Concepts, Definitions, Principles & Basic Syntax of ${name}` },
  { title: `Module 2: Advanced Logic & Operations in ${name}`, desc: `Operator Rules, Functions, Expressions & Architecture` },
  { title: `Module 3: Core Problem Solving & Analysis in ${name}`, desc: `Algorithmic Design, Optimizations & Functional Execution` },
  { title: `Module 4: Practical Applications & System Integration`, desc: `Real-world Integration, Performance & Security Standards` },
  { title: `Module 5: Advanced Optimization & Case Studies`, desc: `Industry Best Practices, Debugging & High-Performance Execution` }
];

// =========================================================================
// SUBJECT-SPECIFIC QUESTION BANKS (100% RELEVANT TO EACH B.TECH SUBJECT)
// =========================================================================

// 1. Linear Algebra & Calculus (LAC - Sem 1-1)
const lacBank: Question[] = [
  createQuestion('lac-q1', 'What is the rank of a 3x3 identity matrix I₃?', ['1', '2', '3', '0'], 2, 'EASY', 'Explanation:\n• The identity matrix I₃ has 3 linearly independent rows/columns, so rank(I₃) = 3.'),
  createQuestion('lac-q2', 'Which theorem states that every square matrix satisfies its own characteristic equation?', ['Rolle Theorem', 'Cayley-Hamilton Theorem', 'Taylor Theorem', 'Gauss Theorem'], 1, 'EASY', 'Explanation:\n• Cayley-Hamilton Theorem states that if p(λ) = det(A - λI) is the characteristic polynomial of A, then p(A) = 0.'),
  createQuestion('lac-q3', 'If λ is an eigenvalue of a non-singular matrix A, what is the eigenvalue of A⁻¹?', ['λ', '1 / λ', 'λ²', '-λ'], 1, 'EASY', 'Explanation:\n• If A x = λ x, then multiplying by A⁻¹ yields x = λ A⁻¹ x => A⁻¹ x = (1/λ) x.'),
  createQuestion('lac-q4', 'What is the sum of the eigenvalues of a square matrix A equal to?', ['Determinant of A', 'Trace of A (sum of diagonal elements)', 'Rank of A', 'Zero'], 1, 'EASY', 'Explanation:\n• The sum of all eigenvalues of matrix A equals the trace (sum of diagonal entries) of A.'),
  createQuestion('lac-q5', 'Find the product of eigenvalues for matrix A = [[2, 3], [1, 4]].', ['5', '6', '8', '2'], 0, 'MODERATE', 'Explanation:\n• Product of eigenvalues = det(A) = (2 * 4) - (3 * 1) = 8 - 3 = 5.'),
  createQuestion('lac-q6', 'If a function f(x) is continuous in [a,b] and differentiable in (a,b) with f(a)=f(b), what does Rolle Theorem guarantee?', ['f\'(c) = 0 for at least one c in (a,b)', 'f\'(c) = 1', 'f(c) = 0', 'f\'\'(c) = 0'], 0, 'MODERATE', 'Explanation:\n• Rolle Theorem guarantees there exists at least one point c ∈ (a,b) where the derivative f\'(c) = 0.'),
  createQuestion('lac-q7', 'What is the Jacobian J = ∂(x,y) / ∂(r,θ) for polar coordinates x = r cos θ, y = r sin θ?', ['1', 'r', 'r²', 'cos θ'], 1, 'MODERATE', 'Explanation:\n• J = ∂x/∂r * ∂y/∂θ - ∂x/∂θ * ∂y/∂r = (cos θ)(r cos θ) - (-r sin θ)(sin θ) = r (cos²θ + sin²θ) = r.'),
  createQuestion('lac-q8', 'Evaluate the double integral ∫₀¹ ∫₀² x y dy dx.', ['1/2', '1', '2', '1/4'], 1, 'HARD', 'Explanation:\n• Inner integral: ∫₀² x y dy = x [y²/2]₀² = 2x.\n• Outer integral: ∫₀¹ 2x dx = [x²]₀¹ = 1.'),
  createQuestion('lac-q9', 'What is the condition for a matrix A to be diagonalizable?', ['A must have n distinct eigenvalues (or n linearly independent eigenvectors)', 'det(A) = 0', 'A must be symmetric only', 'Trace of A must be 0'], 0, 'HARD', 'Explanation:\n• Matrix A of size n x n is diagonalizable if and only if it possesses n linearly independent eigenvectors.'),
  createQuestion('lac-q10', 'If det(A) = 0 for an n x n matrix, what can be concluded about its eigenvalues?', ['At least one eigenvalue is 0', 'All eigenvalues are 0', 'No eigenvalue is 0', 'Sum of eigenvalues is 0'], 0, 'HARD', 'Explanation:\n• Product of eigenvalues = det(A). If det(A) = 0, at least one eigenvalue must be 0.')
];

// 2. Applied Chemistry (CHEM - Sem 1-1)
const chemBank: Question[] = [
  createQuestion('chem-q1', 'Which chemical indicator is used in EDTA titration for determining hardness of water?', ['Phenolphthalein', 'Eriochrome Black-T (EBT)', 'Methyl Orange', 'Starch'], 1, 'EASY', 'Explanation:\n• Eriochrome Black-T (EBT) is used as indicator in EDTA complexometric titration at pH 10, changing from wine-red to blue at endpoint.'),
  createQuestion('chem-q2', 'What causes temporary hardness of water?', ['Bicarbonates of Ca²⁺ and Mg²⁺', 'Chlorides of Ca²⁺ and Mg²⁺', 'Sulfates of Ca²⁺ and Mg²⁺', 'Nitrates of Sodium'], 0, 'EASY', 'Explanation:\n• Temporary hardness is caused by dissolved bicarbonates of calcium Ca(HCO₃)₂ and magnesium Mg(HCO₃)₂, which decompose on boiling.'),
  createQuestion('chem-q3', 'Which equation relates electrode potential E to standard potential E° and ion concentration?', ['Arrhenius Equation', 'Nernst Equation', 'Gibbs-Helmholtz Equation', 'Van\'t Hoff Equation'], 1, 'EASY', 'Explanation:\n• Nernst Equation: E = E° - (RT/nF) ln([Red]/[Ox]).'),
  createQuestion('chem-q4', 'Which polymer is commercially known as Teflon?', ['Polyvinyl Chloride (PVC)', 'Polytetrafluoroethylene (PTFE)', 'Polystyrene', 'Nylon-6,6'], 1, 'EASY', 'Explanation:\n• Teflon is synthetic polymer polytetrafluoroethylene (PTFE), produced by polymerization of tetrafluoroethylene.'),
  createQuestion('chem-q5', 'What is galvanic corrosion?', ['Corrosion occurring when two dissimilar metals are in contact in an electrolyte', 'Uniform atmospheric rusting', 'Pitting corrosion under dust', 'High temperature oxidation'], 0, 'MODERATE', 'Explanation:\n• Galvanic corrosion occurs when two metals with different reduction potentials are electrically connected in an electrolyte; the more active metal acts as anode and corrodes.'),
  createQuestion('chem-q6', 'In sacrificial anodic protection method to prevent pipeline rusting, which metal is commonly attached as sacrificial anode?', ['Copper', 'Zinc or Magnesium', 'Lead', 'Gold'], 1, 'MODERATE', 'Explanation:\n• Zinc or Magnesium has lower reduction potential than Iron, making it corrode preferentially as a sacrificial anode.'),
  createQuestion('chem-q7', 'What is the unit of hardness of water expressed in parts per million (ppm)?', ['1 mg of CaCO₃ per liter of water', '1 g of NaCl per liter', '10 mg of MgSO₄ per liter', '1 mol per liter'], 0, 'MODERATE', 'Explanation:\n• 1 ppm = 1 part of CaCO₃ equivalent hardness per 10⁶ parts of water = 1 mg/L.'),
  createQuestion('chem-q8', 'Which type of cell is a Lithium-ion battery?', ['Primary Non-rechargeable Cell', 'Secondary Rechargeable Cell', 'Fuel Cell', 'Solar Photovoltaic Cell'], 1, 'HARD', 'Explanation:\n• Li-ion battery is a secondary rechargeable cell where lithium ions move from negative to positive electrode during discharge and reverse when charging.'),
  createQuestion('chem-q9', 'What is the function of Zeolite in the Permutit process for water softening?', ['Exchanges Na⁺ ions for Ca²⁺ and Mg²⁺ ions', 'Filters out suspended mud', 'Kills bacteria with chlorine', 'Increases acidity'], 0, 'HARD', 'Explanation:\n• Zeolite (hydrated sodium aluminosilicate Na₂O·Al₂O₃·nSiO₂·xH₂O) exchanges its Na⁺ ions for hardness-causing Ca²⁺ and Mg²⁺ ions.'),
  createQuestion('chem-q10', 'What is the monomer unit of Natural Rubber?', ['Isoprene (2-methyl-1,3-butadiene)', 'Chloroprene', 'Styrene', 'Acrylonitrile'], 0, 'HARD', 'Explanation:\n• Natural rubber is cis-1,4-polyisoprene, formed by polymerization of monomer Isoprene.')
];

// 3. C Programming Bank (Sem 1-1)
const cProgBank: Question[] = [
  createQuestion('c-q1', 'What will be the output of printf("%d", sizeof(char)) in C on a 64-bit architecture?', ['1', '2', '4', '8'], 0, 'EASY', 'Explanation:\n• In C standard, sizeof(char) is defined to strictly equal 1 byte on all compliant architectures.'),
  createQuestion('c-q2', 'Which operator in C has the highest precedence?', ['Array Subscript [] / Function call ()', 'Unary ++ / --', 'Multiplication *', 'Bitwise AND &'], 0, 'EASY', 'Explanation:\n• Array subscripting [], member access ., ->, and function calls () share the highest precedence level 1 in C.'),
  createQuestion('c-q3', 'What happens when a pointer in C is assigned NULL and then dereferenced (*ptr)?', ['Prints 0', 'Segmentation Fault / Undefined Behavior', 'Prints memory garbage address', 'Returns false'], 1, 'EASY', 'Explanation:\n• Dereferencing a NULL pointer attempts to access invalid kernel/restricted memory, resulting in Segmentation Fault (SIGSEGV).'),
  createQuestion('c-q4', 'What is the default storage class for local variables declared inside a C function?', ['auto', 'static', 'extern', 'register'], 0, 'EASY', 'Explanation:\n• Local variables declared inside a block or function default to automatic storage duration (`auto`).'),
  createQuestion('c-q5', 'What is the output of the following C code snippet?', ['11', '10', '12', 'Undefined'], 0, 'MODERATE', 'Explanation:\n• `x++` evaluates to 10 in the expression, then increments x to 11.\n• Post-increment completes before printing x.', 'int x = 10;\nint y = x++;\nprintf("%d", x);'),
  createQuestion('c-q6', 'What is the difference between malloc() and calloc() in C?', ['malloc initializes memory to zero; calloc leaves garbage', 'calloc allocates contiguous memory initialized to 0; malloc leaves garbage', 'malloc takes 2 arguments; calloc takes 1 argument', 'Both are identical'], 1, 'MODERATE', 'Explanation:\n• `calloc(num_elements, element_size)` allocates memory and clears all bits to zero.\n• `malloc(total_bytes)` allocates uninitialized memory containing garbage values.'),
  createQuestion('c-q7', 'What does the `volatile` keyword in C inform the compiler about?', ['The variable value cannot be changed', 'The variable may be modified by external hardware/interrupts, disabling compiler optimization', 'The variable is stored in register', 'The variable is global'], 1, 'MODERATE', 'Explanation:\n• `volatile` prevents the compiler from caching variable values in CPU registers, forcing reads directly from memory.'),
  createQuestion('c-q8', 'What is printed by this C pointer arithmetic snippet?', ['10 20', '20 30', '10 30', 'Compilation Error'], 1, 'HARD', 'Explanation:\n• `arr` points to arr[0]=10. `*(arr + 1)` accesses arr[1]=20.\n• `*ptr++` returns *ptr (10) and then increments ptr to point to arr[1]. Next `*ptr` yields 20. Thus output is 20 30.', 'int arr[] = {10, 20, 30};\nint *ptr = arr;\nprintf("%d %d", *(ptr + 1), *(++ptr));'),
  createQuestion('c-q9', 'What is a dangling pointer in C?', ['A pointer assigned to NULL', 'A pointer pointing to a memory location that has been freed or deallocated', 'A pointer to a constant integer', 'An uninitialized void pointer'], 1, 'HARD', 'Explanation:\n• A dangling pointer occurs when `free(ptr)` is called without setting `ptr = NULL` afterward, leaving it pointing to released heap memory.'),
  createQuestion('c-q10', 'What is the size of the following C union containing int a (4 bytes), char b[10], double c (8 bytes)?', ['22 bytes', '8 bytes (or padded aligned to 8)', '4 bytes', '10 bytes'], 1, 'HARD', 'Explanation:\n• Union allocates memory equal to the size of its largest member (double c = 8 bytes), with structure padding alignment.')
];

// 4. Basic Civil & Mechanical Engg (BCME - Sem 1-1)
const bcmeBank: Question[] = [
  createQuestion('bcme-q1', 'Which instrument is primarily used in civil engineering for measuring horizontal and vertical angles?', ['Theodolite', 'Planimeter', 'Pyrometer', 'Manometer'], 0, 'EASY', 'Explanation:\n• A Theodolite is a precision optical instrument used in surveying to measure horizontal and vertical angles.'),
  createQuestion('bcme-q2', 'What is the primary constituent of Portland Cement that imparts initial strength?', ['Tricalcium Silicate (C₃S)', 'Dicalcium Silicate (C₂S)', 'Tricalcium Aluminate (C₃A)', 'Tetracalcium Aluminoferrite'], 0, 'EASY', 'Explanation:\n• Tricalcium Silicate (C₃S) hydrates rapidly and is responsible for the initial 7-day early strength of concrete.'),
  createQuestion('bcme-q3', 'In a 4-stroke Internal Combustion (IC) Engine, how many revolutions of the crankshaft complete one power cycle?', ['1 Revolution', '2 Revolutions (720°)', '4 Revolutions', 'half Revolution'], 1, 'EASY', 'Explanation:\n• A 4-stroke engine completes 1 thermodynamic cycle across 4 piston strokes (Suction, Compression, Power, Exhaust), requiring 2 crankshaft revolutions.'),
  createQuestion('bcme-q4', 'Which type of boiler is a Lancashire Boiler?', ['Fire-Tube Stationary Boiler', 'Water-Tube High Pressure Boiler', 'Locomotive Boiler', 'Solar Boiler'], 0, 'EASY', 'Explanation:\n• Lancashire Boiler is a horizontal, stationary, fire-tube, internally fired boiler with two flue tubes.'),
  createQuestion('bcme-q5', 'What is the main function of a Flywheel in an IC Engine?', ['To store energy during power stroke and supply it during idle strokes to maintain uniform speed', 'To mix fuel and air', 'To pump cooling water', 'To ignite spark'], 0, 'MODERATE', 'Explanation:\n• A Flywheel acts as a mechanical energy storage reservoir that smooths out speed fluctuations caused by torque variations across engine strokes.'),
  createQuestion('bcme-q6', 'Which manufacturing process shapes metal by forcing it through a die orifice under high pressure?', ['Extrusion', 'Forging', 'Casting', 'Welding'], 0, 'MODERATE', 'Explanation:\n• Extrusion is a metal forming process where material is compressed and forced to flow through a die to produce fixed cross-sectional profiles.'),
  createQuestion('bcme-q7', 'What does the term Workability of concrete measure?', ['Ease with which concrete can be mixed, placed, consolidated and finished without segregation', 'Tensile strength of steel bars', 'Hardening speed', 'Water absorption'], 0, 'MODERATE', 'Explanation:\n• Workability measures the fluid ease of handling fresh concrete without segregation or bleeding (tested via Slump Test).'),
  createQuestion('bcme-q8', 'Which thermodynamics cycle forms the theoretical ideal benchmark cycle for 4-stroke Petrol engines?', ['Otto Cycle', 'Diesel Cycle', 'Dual Cycle', 'Rankine Cycle'], 0, 'HARD', 'Explanation:\n• The Otto Cycle (constant volume heat addition) is the ideal thermodynamic reference cycle for spark-ignition (petrol) engines.'),
  createQuestion('bcme-q9', 'What is the function of a Governor in an engine compared to a Flywheel?', ['Governor regulates mean speed based on load variations; Flywheel regulates cyclic speed fluctuations within a cycle', 'Flywheel regulates load; Governor regulates ignition', 'Both are identical', 'Governor stores mechanical energy'], 0, 'HARD', 'Explanation:\n• A Governor regulates fuel supply to maintain constant mean speed when engine load changes. A Flywheel smooths out cyclic fluctuations during strokes.'),
  createQuestion('bcme-q10', 'Which metal welding technique uses a non-consumable Tungsten electrode shielding with Inert Gas?', ['TIG Welding (GTAW)', 'MIG Welding (GMAW)', 'Arc Welding', 'Gas Welding'], 0, 'HARD', 'Explanation:\n• TIG (Tungsten Inert Gas) welding uses a non-consumable tungsten electrode and inert gas shield (Argon/Helium).')
];

// 5. Applied Physics (PHY - Sem 1-2)
const phyBank: Question[] = [
  createQuestion('phy-q1', 'What phenomenon is responsible for the bright colors seen in thin oil films on water?', ['Thin Film Interference', 'Diffraction', 'Polarization', 'Refraction'], 0, 'EASY', 'Explanation:\n• Interference of light waves reflected from top and bottom boundaries of thin oil films creates constructive/destructive color patterns.'),
  createQuestion('phy-q2', 'What is the De Broglie wavelength λ of a particle with momentum p?', ['λ = h / p', 'λ = h · p', 'λ = p / h', 'λ = h² / p'], 0, 'EASY', 'Explanation:\n• De Broglie hypothesis states that matter waves have wavelength λ = h / p where h is Planck\'s constant.'),
  createQuestion('phy-q3', 'Which type of Laser uses a mixture of Helium and Neon gases to produce continuous red light at 632.8 nm?', ['He-Ne Laser', 'Ruby Laser', 'Semiconductor Diode Laser', 'CO₂ Laser'], 0, 'EASY', 'Explanation:\n• He-Ne (Helium-Neon) laser is a 4-level gas laser producing continuous red laser beam at 632.8 nm wavelength.'),
  createQuestion('phy-q4', 'Where does the Fermi energy level lie in an Intrinsic Semiconductor at absolute zero temperature (0 K)?', ['Exactly midway between Valence Band and Conduction Band', 'Inside Conduction Band', 'At top of Valence Band', 'Outside the material'], 0, 'EASY', 'Explanation:\n• In an intrinsic semiconductor at 0 K, Fermi level E_F lies exactly in the middle of the forbidden bandgap E_g.'),
  createQuestion('phy-q5', 'What is Meissner Effect in Superconductors?', ['Complete expulsion of magnetic flux lines from interior of superconductor when cooled below critical T_c', 'Increase in electrical resistance', 'Emission of light', 'Absorption of heat'], 0, 'MODERATE', 'Explanation:\n• Meissner effect states that superconductors exhibit perfect diamagnetism (B = 0 inside) below critical temperature T_c.'),
  createQuestion('phy-q6', 'What is the fundamental difference between Spontaneous Emission and Stimulated Emission?', ['Stimulated emission produces coherent, monochromatic photons in phase with incident photon', 'Spontaneous emission produces higher energy', 'Stimulated emission happens without photons', 'Both are identical'], 0, 'MODERATE', 'Explanation:\n• Stimulated emission occurs when an incoming photon triggers an excited atom to emit a identical photon of same phase, frequency, and direction.'),
  createQuestion('phy-q7', 'What is the Heisenberg Uncertainty Principle formula for position x and momentum p?', ['Δx · Δp ≥ ℏ / 2 (h / 4π)', 'Δx · Δp = 0', 'Δx / Δp = h', 'Δx + Δp ≥ h'], 0, 'MODERATE', 'Explanation:\n• Heisenberg Uncertainty Principle states Δx · Δp ≥ ℏ/2 (where ℏ = h / 2π).'),
  createQuestion('phy-q8', 'In an n-type Semiconductor, what are the majority charge carriers and donor impurity valence?', ['Majority: Electrons; Impurity: Pentavalent (Group V like Phosphorus)', 'Majority: Holes; Impurity: Trivalent', 'Majority: Ions', 'Majority: Protons'], 0, 'HARD', 'Explanation:\n• Doping intrinsic silicon with pentavalent impurities (P, As) provides extra free electrons as majority charge carriers.'),
  createQuestion('phy-q9', 'What is the acceptance angle θ_a of an Optical Fiber with core refractive index n₁ and cladding index n₂?', ['sin(θ_a) = √(n₁² - n₂²) [Numerical Aperture NA]', 'sin(θ_a) = n₁ / n₂', 'θ_a = n₁ - n₂', 'cos(θ_a) = n₂ / n₁'], 0, 'HARD', 'Explanation:\n• Acceptance angle θ_a is max launching angle for light to undergo Total Internal Reflection: NA = sin(θ_a) = √(n₁² - n₂²).'),
  createQuestion('phy-q10', 'What does Schrödinger\'s Time-Independent Wave Equation describe?', ['Stationary quantum energy states Ψ(x) of a particle in a potential V(x)', 'Speed of sound waves', 'Classical planetary orbits', 'Thermodynamic entropy'], 0, 'HARD', 'Explanation:\n• Schrödinger time-independent 1D equation: (-ℏ²/2m) (d²Ψ/dx²) + V(x)Ψ = E Ψ.')
];

// 6. Mathematics-II (M-2 - Sem 1-2)
const m2Bank: Question[] = [
  createQuestion('m2-q1', 'What is the order and degree of differential equation (d²y/dx²)³ + (dy/dx)⁴ + y = 0?', ['Order: 2, Degree: 3', 'Order: 3, Degree: 2', 'Order: 2, Degree: 4', 'Order: 1, Degree: 4'], 0, 'EASY', 'Explanation:\n• Order is highest derivative = 2 (d²y/dx²). Degree is power of highest derivative = 3.'),
  createQuestion('m2-q2', 'What is the Laplace Transform of L{1}?', ['1 / s', 's', '1 / s²', '1'], 0, 'EASY', 'Explanation:\n• L{1} = ∫₀^∞ e^(-st) (1) dt = [-e^(-st)/s]₀^∞ = 1 / s for s > 0.'),
  createQuestion('m2-q3', 'What is the Laplace Transform of L{e^(at)}?', ['1 / (s - a)', '1 / (s + a)', 's / (s - a)', 'a / s²'], 0, 'EASY', 'Explanation:\n• L{e^(at)} = 1 / (s - a) for s > a.'),
  createQuestion('m2-q4', 'What is the gradient of a scalar field φ(x,y,z)?', ['Vector ∇φ = (∂φ/∂x)i + (∂φ/∂y)j + (∂φ/∂z)k', 'Scalar sum', 'Zero', 'Matrix'], 0, 'EASY', 'Explanation:\n• Gradient ∇φ converts a scalar field into a vector field representing direction of maximum rate of change.'),
  createQuestion('m2-q5', 'What is the divergence of a vector field F = x i + y j + z k?', ['3', '0', 'x + y + z', 'Vector 0'], 0, 'MODERATE', 'Explanation:\n• div(F) = ∇ · F = ∂(x)/∂x + ∂(y)/∂y + ∂(z)/∂z = 1 + 1 + 1 = 3.'),
  createQuestion('m2-q6', 'If curl(F) = ∇ × F = 0 everywhere in a region, what is the vector field F called?', ['Irrotational (or Conservative)', 'Solenoidal', 'Incompressible', 'Rotational'], 0, 'MODERATE', 'Explanation:\n• A vector field with zero curl (∇ × F = 0) is called irrotational or conservative.'),
  createQuestion('m2-q7', 'What is a vector field called if its divergence ∇ · F = 0?', ['Solenoidal', 'Irrotational', 'Conservative', 'Harmonic'], 0, 'MODERATE', 'Explanation:\n• A vector field with zero divergence (∇ · F = 0) is called solenoidal.'),
  createQuestion('m2-q8', 'Which theorem converts a Surface Integral ∬_S F · dS into a Volume Integral ∭_V (∇ · F) dV?', ['Gauss Divergence Theorem', 'Stokes Theorem', 'Green Theorem', 'Cauchy Theorem'], 0, 'HARD', 'Explanation:\n• Gauss Divergence Theorem states ∬_S F · n̂ dS = ∭_V (∇ · F) dV.'),
  createQuestion('m2-q9', 'Which theorem converts a Line Integral ∮_C F · dr into a Surface Integral ∬_S (∇ × F) · dS?', ['Stokes Theorem', 'Gauss Theorem', 'Taylor Theorem', 'Fermat Theorem'], 0, 'HARD', 'Explanation:\n• Stokes Theorem relates line integral around closed curve C to surface integral of curl over bounded surface S.'),
  createQuestion('m2-q10', 'Evaluate Inverse Laplace Transform L⁻¹{1 / (s² + 4)}.', ['(1/2) sin(2t)', 'sin(2t)', 'cos(2t)', '(1/2) cos(2t)'], 0, 'HARD', 'Explanation:\n• Since L{sin(at)} = a / (s² + a²), L⁻¹{1 / (s² + 4)} = (1/2) sin(2t).')
];

// 7. Basic Electrical & Electronics (BEEE - Sem 1-2)
const beeeBank: Question[] = [
  createQuestion('beee-q1', 'What does Kirchhoff\'s Current Law (KCL) state based on conservation of charge?', ['Sum of currents entering a node equals sum of currents leaving the node (∑ I = 0)', 'Sum of voltages in a loop is zero', 'Power is constant', 'Resistance increases with heat'], 0, 'EASY', 'Explanation:\n• KCL states algebraic sum of currents meeting at any electrical node is zero (conservation of electric charge).'),
  createQuestion('beee-q2', 'What is the relationship between line voltage V_L and phase voltage V_ph in a 3-Phase Star (Y) connected system?', ['V_L = √3 · V_ph', 'V_L = V_ph', 'V_L = V_ph / √3', 'V_L = 3 · V_ph'], 0, 'EASY', 'Explanation:\n• In Star connection, Line Voltage V_L = √3 V_ph, while Line Current I_L = I_ph.'),
  createQuestion('beee-q3', 'What is the ideal voltage gain of an ideal Transformer under no loss conditions?', ['V₁ / V₂ = N₁ / N₂ = I₂ / I₁', 'V₁ / V₂ = N₂ / N₁', 'V₁ · V₂ = N₁ · N₂', 'V₁ = V₂ ALWAYS'], 0, 'EASY', 'Explanation:\n• Ideal transformer voltage ratio equals turns ratio: V₁/V₂ = N₁/N₂.'),
  createQuestion('beee-q4', 'Which semiconductor diode operates in reverse breakdown region to provide voltage regulation?', ['Zener Diode', 'LED', 'Varactor Diode', 'Photodiode'], 0, 'EASY', 'Explanation:\n• Zener Diode is designed to work in reverse breakdown region to maintain constant output voltage.'),
  createQuestion('beee-q5', 'What is the current gain β (beta) of a Bipolar Junction Transistor (BJT) in Common Emitter configuration?', ['β = I_c / I_b', 'β = I_e / I_c', 'β = I_b / I_c', 'β = I_c / I_e'], 0, 'MODERATE', 'Explanation:\n• In Common Emitter (CE) BJT configuration, DC current gain β = Collector Current (I_c) / Base Current (I_b).'),
  createQuestion('beee-q6', 'What is Thevenin\'s Theorem used for in circuit analysis?', ['Replaces any linear two-terminal network with single voltage source V_th in series with resistance R_th', 'Replaces circuit with parallel current source', 'Calculates power only', 'Measures AC frequency'], 0, 'MODERATE', 'Explanation:\n• Thevenin Theorem simplifies linear bilateral networks to equivalent V_th voltage source in series with R_th.'),
  createQuestion('beee-q7', 'What is the Power Factor of a purely resistive AC circuit?', ['1 (Unity)', '0', '0.5 lagging', '0.5 leading'], 0, 'MODERATE', 'Explanation:\n• In purely resistive AC circuit, voltage and current are in phase (φ = 0°), so Power Factor = cos(0°) = 1.'),
  createQuestion('beee-q8', 'What is the ripple factor of a Full-Wave Rectifier with bridge configuration?', ['0.48', '1.21', '0.24', '1.0'], 0, 'HARD', 'Explanation:\n• Full-wave bridge rectifier ripple factor is 0.48 (48%), whereas half-wave rectifier ripple factor is 1.21.'),
  createQuestion('beee-q9', 'What is the synchronous speed N_s of a 4-pole Induction Motor connected to 50 Hz AC supply?', ['1500 RPM', '3000 RPM', '1000 RPM', '750 RPM'], 0, 'HARD', 'Explanation:\n• N_s = 120 · f / P = 120 * 50 / 4 = 6000 / 4 = 1500 RPM.'),
  createQuestion('beee-q10', 'In a BJT transistor, what is the mathematical relation between α (alpha) and β (beta)?', ['β = α / (1 - α)', 'α = β / (1 - β)', 'β = 1 + α', 'α · β = 1'], 0, 'HARD', 'Explanation:\n• Since I_e = I_b + I_c and α = I_c / I_e, β = I_c / I_b = α / (1 - α).')
];

// 8. Data Structures Bank (Sem 1-2)
const dsBank: Question[] = [
  createQuestion('ds-q1', 'What is the amortized time complexity of pushing an element onto a Stack using a Dynamic Array?', ['O(1)', 'O(N)', 'O(log N)', 'O(N²)'], 0, 'EASY', 'Explanation:\n• Array capacity doubling takes O(N) occasionally, but spread across N pushes yields O(1) amortized time.'),
  createQuestion('ds-q2', 'Which data structure follows the LIFO (Last In First Out) principle?', ['Queue', 'Stack', 'LinkedList', 'Tree'], 1, 'EASY', 'Explanation:\n• Stack is a LIFO data structure where the last added element is the first removed.'),
  createQuestion('ds-q3', 'Which traversal of a Binary Search Tree (BST) yields elements in strictly sorted ascending order?', ['Pre-order', 'In-order', 'Post-order', 'Level-order'], 1, 'EASY', 'Explanation:\n• In-order traversal visits Left Subtree -> Root -> Right Subtree, printing BST values in sorted order.'),
  createQuestion('ds-q4', 'What is the worst-case lookup time complexity in a Doubly Linked List with N nodes?', ['O(1)', 'O(log N)', 'O(N)', 'O(N log N)'], 2, 'EASY', 'Explanation:\n• Linked list nodes must be traversed sequentially from head/tail, taking O(N) time worst case.'),
  createQuestion('ds-q5', 'Convert infix expression (A + B) * C to Postfix notation.', ['A B + C *', 'A B C * +', '* + A B C', 'A B + * C'], 0, 'MODERATE', 'Explanation:\n• Parentheses (A + B) evaluate first to postfix `AB+`.\n• Then multiply with C: `AB+C*`.'),
  createQuestion('ds-q6', 'What is the minimum number of queues required to implement a Stack?', ['1', '2', '3', 'None'], 1, 'MODERATE', 'Explanation:\n• Two queues (Queue1 & Queue2) can simulate LIFO behavior by rotating items during push or pop.'),
  createQuestion('ds-q7', 'What is the depth of a node in a Binary Tree?', ['The length of the path from root to that node', 'The length of path from node to deepest leaf', 'Total children of node', 'Total nodes in tree'], 0, 'MODERATE', 'Explanation:\n• Depth of a node is the number of edges from the root node to that specific node (Root depth = 0).'),
  createQuestion('ds-q8', 'In a Circular Queue of size N using array, what is the condition for Queue Full (front, rear)?', ['(rear + 1) % N == front', 'rear == front', 'rear == N - 1', 'front == 0'], 0, 'HARD', 'Explanation:\n• Circular queue wraps around using modulo arithmetic. When `(rear + 1) % N == front`, the queue is full.'),
  createQuestion('ds-q9', 'What is the time complexity to construct a Max Heap from an unsorted array of N elements using Floyd\'s Build Heap algorithm?', ['O(N log N)', 'O(N)', 'O(N²)', 'O(log N)'], 1, 'HARD', 'Explanation:\n• Bottom-up heap construction using sink operations takes sum of heights = O(N) time.'),
  createQuestion('ds-q10', 'What is the height of a balanced Binary Search Tree containing N nodes?', ['O(N)', 'O(log₂ N)', 'O(N²)', 'O(1)'], 1, 'HARD', 'Explanation:\n• Height h satisfies 2^h - 1 = N => h = log₂(N + 1) = O(log N).')
];

// 9. Communicative English (ENG - Sem 1-2)
const engBank: Question[] = [
  createQuestion('eng-q1', 'Choose the correct synonym for the word "Meticulous".', ['Careful / Precise', 'Careless', 'Hasty', 'Lazy'], 0, 'EASY', 'Explanation:\n• Meticulous means showing great attention to detail; very careful and precise.'),
  createQuestion('eng-q2', 'Convert sentence to Passive Voice: "The engineer tested the software."', ['The software was tested by the engineer.', 'The software tested the engineer.', 'The engineer was testing software.', 'Software is tested.'], 0, 'EASY', 'Explanation:\n• Simple past active "tested" converts to passive "was tested by".'),
  createQuestion('eng-q3', 'Identify the subject-verb agreement rule: "Neither the manager nor the employees ___ present."', ['were', 'was', 'is', 'be'], 0, 'EASY', 'Explanation:\n• With "neither...nor", verb agrees with closer subject ("employees" -> plural -> "were").'),
  createQuestion('eng-q4', 'What is a Précis in formal technical writing?', ['A concise summary of essential points of a text keeping original tone', 'A word-for-word copy', 'An imaginative essay', 'A list of references'], 0, 'EASY', 'Explanation:\n• Précis is a clear, compact summary preserving approximately 1/3 length of original text.'),
  createQuestion('eng-q5', 'Choose the correct antonym for "Ephemeral".', ['Permanent / Enduring', 'Short-lived', 'Fleeting', 'Transient'], 0, 'MODERATE', 'Explanation:\n• Ephemeral means lasting a short time; its antonym is permanent or enduring.'),
  createQuestion('eng-q6', 'Select the correct sentence free from grammatical error.', ['Each of the students has submitted their assignment.', 'Each of the students have submitted assignment.', 'Each student have submit.', 'Each of students are submitted.'], 0, 'MODERATE', 'Explanation:\n• "Each" is singular distribution pronoun taking singular verb "has".'),
  createQuestion('eng-q7', 'What is the purpose of an Executive Summary in a technical proposal?', ['Summarizes key problem, solution, budget and recommendations for executive decision makers', 'Contains detailed code listings', 'Lists glossary only', 'Acts as cover page'], 0, 'MODERATE', 'Explanation:\n• Executive summary gives high-level overview of key proposal findings for non-technical stakeholders.'),
  createQuestion('eng-q8', 'Identify the figure of speech in: "The engine roared like a lion."', ['Simile', 'Metaphor', 'Personification', 'Hyperbole'], 0, 'HARD', 'Explanation:\n• Simile explicitly compares two things using "like" or "as".'),
  createQuestion('eng-q9', 'What is homonym error in: "Their going to the lab now."', ['Incorrect homophone: "Their" should be "They\'re"', 'Missing verb', 'Tense error', 'Punctuation error'], 0, 'HARD', 'Explanation:\n• "Their" (possessive) is misused for contraction "They\'re" (They are).'),
  createQuestion('eng-q10', 'Which section of a formal IEEE technical research paper contains author methodology and experimental setup?', ['Materials and Methods', 'Abstract', 'References', 'Acknowledge'], 0, 'HARD', 'Explanation:\n• Materials and Methods section provides step-by-step description of experimental procedures for reproducibility.')
];

// 10. Discrete Mathematics & Graph Theory (DMGT - Sem 2-1)
const dmgtBank: Question[] = [
  createQuestion('dmgt-q1', 'What is the dual of logical statement (P ∧ Q) ∨ T (T = Tautology)?', ['(P ∨ Q) ∧ F', '(P ∧ Q) ∧ F', '(P ∨ Q) ∨ F', '¬P ∨ ¬Q'], 0, 'EASY', 'Explanation:\n• Duality principle: Swap ∧ with ∨, and Tautology (T) with Contradiction (F).'),
  createQuestion('dmgt-q2', 'If set A has 4 elements, how many binary relations can be defined on A?', ['16', '64', '256', '65536 (2¹⁶)'], 3, 'EASY', 'Explanation:\n• Binary relation on A is subset of A × A (|A × A| = 16). Total subsets = 2¹⁶ = 65,536.'),
  createQuestion('dmgt-q3', 'What condition guarantees an undirected graph contains an Eulerian Circuit?', ['Connected graph where every vertex has an EVEN degree', 'Graph is bipartite', 'Graph is planar', 'Every vertex degree = 3'], 0, 'EASY', 'Explanation:\n• Euler Theorem: Connected graph has Eulerian circuit if and only if every vertex has even degree.'),
  createQuestion('dmgt-q4', 'What is the Chromatic Number χ(K_n) of complete graph K_n?', ['1', 'n - 1', 'n', '2'], 2, 'EASY', 'Explanation:\n• In K_n, every pair of vertices is adjacent, requiring distinct colors for all n vertices.'),
  createQuestion('dmgt-q5', 'Euler planar graph formula with V = 8 vertices, E = 12 edges. Find faces R.', ['4', '6', '8', '10'], 1, 'MODERATE', 'Explanation:\n• V - E + R = 2 => 8 - 12 + R = 2 => R = 6 faces.'),
  createQuestion('dmgt-q6', 'How many reflexive relations exist on a set with n elements?', ['2ⁿ', '2^(n² - n)', '2^(n²)', 'n!'], 1, 'MODERATE', 'Explanation:\n• n diagonal entries fixed to true. Remaining n² - n entries can be true/false => 2^(n² - n).'),
  createQuestion('dmgt-q7', 'Pigeonhole principle: Min people in room to guarantee 3 born in same month?', ['24', '25', '36', '37'], 1, 'MODERATE', 'Explanation:\n• k = 12 months. ⌈N/12⌉ = 3 => N = 2 * 12 + 1 = 25 people.'),
  createQuestion('dmgt-q8', 'Solve recurrence a_n = 5a_{n-1} - 6a_{n-2} with a_0 = 1, a_1 = 4.', ['a_n = 2ⁿ + 3ⁿ', 'a_n = 2 · 3ⁿ - 2ⁿ', 'a_n = 3 · 2ⁿ - 3ⁿ', 'a_n = 5ⁿ - 6ⁿ'], 1, 'HARD', 'Explanation:\n• Characteristic roots r = 2, 3. Solution: a_n = 2 · 3ⁿ - 2ⁿ.'),
  createQuestion('dmgt-q9', 'What does Lagrange Theorem state in Group Theory?', ['Order of any subgroup H divides order of finite group G', 'Every group is abelian', 'Subgroups are non-cyclic', 'Order of G is prime'], 0, 'HARD', 'Explanation:\n• Lagrange Theorem: If H is subgroup of finite group G, then |H| divides |G|.'),
  createQuestion('dmgt-q10', 'Which properties define a Partial Order relation (Poset)?', ['Reflexive, Anti-symmetric, Transitive', 'Reflexive, Symmetric, Transitive', 'Irreflexive, Transitive', 'Equivalence Relation'], 0, 'HARD', 'Explanation:\n• Poset relation ≤ must be Reflexive, Anti-symmetric, and Transitive.')
];

// 11. Database Management Systems (DBMS - Sem 2-1)
const dbmsBank: Question[] = [
  createQuestion('dbms-q1', 'Which relational algebra operation selects tuples satisfying a given predicate?', ['Projection (π)', 'Selection (σ)', 'Cartesian Product (×)', 'Rename (ρ)'], 1, 'EASY', 'Explanation:\n• Selection (σ) filters rows matching a condition. Projection (π) chooses columns.'),
  createQuestion('dbms-q2', 'How is a Weak Entity set represented in Chen ER Diagrams?', ['Single Rectangle', 'Double Rectangle', 'Ellipse', 'Diamond'], 1, 'EASY', 'Explanation:\n• Weak entity sets lack primary key and are enclosed in double-lined rectangles.'),
  createQuestion('dbms-q3', 'Difference between Primary Key and Unique constraint in SQL?', ['Primary Key disallows NULLs; Unique permits NULL values', 'Primary Key allows NULLs', 'Both allow unlimited NULLs', 'Unique Key cannot be referenced'], 0, 'EASY', 'Explanation:\n• Primary Key uniquely identifies rows with strictly NO NULLs. Unique constraint allows NULLs.'),
  createQuestion('dbms-q4', 'What is the output of COUNT(age) if table has 10 rows and 3 have NULL age?', ['10', '7', '0', '3'], 1, 'EASY', 'Explanation:\n• SQL COUNT(column_name) ignores NULL values = 10 - 3 = 7.'),
  createQuestion('dbms-q5', 'Relation R(A,B,C,D) with FDs {A -> B, B -> C, C -> D}. Candidate key?', ['A', 'B', 'C', 'D'], 0, 'MODERATE', 'Explanation:\n• Attribute closure {A}+ = {A,B,C,D}. Hence A is unique candidate key.'),
  createQuestion('dbms-q6', 'Decomposition of R(A,B,C) into R1(A,B) and R2(B,C) with FDs {A->B, B->C}?', ['Lossless because R1 ∩ R2 = {B} and B -> BC', 'Lossless because R1 ∩ R2 = {B} and B -> C (B key in R2)', 'Lossy', 'Invalid'], 1, 'MODERATE', 'Explanation:\n• R1 ∩ R2 = {B}. B+ = {B,C}, so B is key for R2(B,C). Decomposition is lossless-join.'),
  createQuestion('dbms-q7', 'What concurrency anomaly occurs when T2 reads data modified by T1 before T1 commits/aborts?', ['Dirty Read Problem', 'Unrepeatable Read', 'Phantom Read', 'Lost Update'], 0, 'MODERATE', 'Explanation:\n• Dirty Read happens when transaction T2 reads uncommitted write of transaction T1.'),
  createQuestion('dbms-q8', 'Relation R(A,B,C,D,E) with FDs {A -> BC, CD -> E, B -> D, E -> A}. Highest normal form?', ['1NF', '2NF', '3NF', 'BCNF'], 2, 'HARD', 'Explanation:\n• Keys: A, E, BC, CD. FD B -> D has non-key LHS B, but D is prime attribute. Satisfies 3NF but violates BCNF.'),
  createQuestion('dbms-q9', 'In B+ Tree of order m, minimum keys in non-root internal node?', ['⌈m/2⌉', '⌈m/2⌉ - 1', 'm - 1', 'm / 2'], 1, 'HARD', 'Explanation:\n• Min internal pointers = ⌈m/2⌉. Min keys = Min pointers - 1 = ⌈m/2⌉ - 1.'),
  createQuestion('dbms-q10', 'What does Strict Two-Phase Locking (Strict 2PL) protocol guarantee?', ['Cascadeless schedules & Conflict Serializability', 'Deadlock freedom', 'Starvation freedom', 'Linearizability'], 0, 'HARD', 'Explanation:\n• Strict 2PL holds exclusive locks until transaction commit/abort, guaranteeing cascadeless recoverable schedules.')
];

// 12. Java Programming (JAVA - Sem 2-1)
const javaBank: Question[] = [
  createQuestion('java-q1', 'What will be output of String s = "10" + 20 in Java?', ['1020', '30', 'Error', '10 20'], 0, 'EASY', 'Explanation:\n• String concatenation operator (+) coerces integer 20 into String "20", producing "1020".', 'String s = "10" + 20;\nSystem.out.println(s);'),
  createQuestion('java-q2', 'Which keyword in Java prevents a method from being overridden in subclasses?', ['static', 'abstract', 'final', 'volatile'], 2, 'EASY', 'Explanation:\n• `final` methods cannot be overridden by child classes.'),
  createQuestion('java-q3', 'Default initial capacity and load factor of HashMap in Java?', ['16 and 0.75', '10 and 0.50', '32 and 0.80', '8 and 1.0'], 0, 'EASY', 'Explanation:\n• HashMap default initial capacity = 16, default load factor = 0.75.'),
  createQuestion('java-q4', 'Which functional interface in Java contains abstract method boolean test(T t)?', ['Consumer<T>', 'Supplier<T>', 'Predicate<T>', 'Function<T, R>'], 2, 'EASY', 'Explanation:\n• `Predicate<T>` defines `boolean test(T t)`.'),
  createQuestion('java-q5', 'What happens when a finally block contains a return statement during exception throwing?', ['Finally return overrides preceding thrown exception or return value', 'Exception thrown', 'Compile error', 'JVM halts'], 0, 'MODERATE', 'Explanation:\n• Return in `finally` abruptly completes method execution, discarding thrown exceptions.'),
  createQuestion('java-q6', 'Time complexity of bucket lookup in HashMap (Java 8+) after treeification?', ['O(N)', 'O(log N)', 'O(1)', 'O(N log N)'], 1, 'MODERATE', 'Explanation:\n• Java 8 converts collided bucket lists into Red-Black Trees when size > 8, improving lookup from O(N) to O(log N).'),
  createQuestion('java-q7', 'What guarantee does `volatile` provide in Java multithreading?', ['Visibility of changes across thread CPU caches directly to main memory', 'Atomicity of ++', 'Locking', 'Deadlock prevention'], 0, 'MODERATE', 'Explanation:\n• `volatile` flushes CPU register writes directly to main memory ensuring visibility across threads.'),
  createQuestion('java-q8', 'Output of Streams API code: nums.stream().filter(x -> x%2==0).map(x -> x*2)?', ['[4, 8]', '[2, 4]', '12', 'Error'], 0, 'HARD', 'Explanation:\n• Filter even items [2,4] -> map multiply by 2 -> [4,8].', 'List<Integer> nums = Arrays.asList(1,2,3,4);\nList<Integer> res = nums.stream().filter(x->x%2==0).map(x->x*2).collect(Collectors.toList());'),
  createQuestion('java-q9', 'Where are class metadata and static variables stored in Java 8+?', ['Metaspace (Native Off-Heap)', 'PermGen', 'Heap', 'Stack'], 0, 'HARD', 'Explanation:\n• PermGen was removed in Java 8 and replaced by native memory Metaspace.'),
  createQuestion('java-q10', 'Contract between equals() and hashCode() in Java?', ['If two objects are equal by equals(), their hashCodes MUST be equal', 'If hashCodes match, equals is true', 'HashCode is unique', 'No relation'], 0, 'HARD', 'Explanation:\n• Java contract: `a.equals(b)` => `a.hashCode() == b.hashCode()`.')
];

// 13. Advanced Data Structures (ADS - Sem 2-1)
const adsBank: Question[] = [
  createQuestion('ads-q1', 'Worst-case search time complexity in Red-Black tree with N nodes?', ['O(N)', 'O(log N)', 'O(N log N)', 'O(1)'], 1, 'EASY', 'Explanation:\n• Red-Black tree height is bounded by 2 log₂(N + 1), guaranteeing O(log N) operations.'),
  createQuestion('ads-q2', 'Maximum allowable Balance Factor for any node in AVL Tree?', ['0', '1 (i.e. -1, 0, or +1)', '2', 'log N'], 1, 'EASY', 'Explanation:\n• AVL tree enforces |Height(Left) - Height(Right)| ≤ 1 for every node.'),
  createQuestion('ads-q3', 'Which algorithm finds Single-Source Shortest Paths in graphs with negative edge weights?', ['Dijkstra Algorithm', 'Bellman-Ford Algorithm', 'Prim Algorithm', 'Kruskal Algorithm'], 1, 'EASY', 'Explanation:\n• Bellman-Ford handles negative edge weights, whereas Dijkstra fails.'),
  createQuestion('ads-q4', 'Two essential properties required for Dynamic Programming?', ['Overlapping Subproblems & Optimal Substructure', 'Greedy Choice & Divide', 'Sorting & Searching', 'Recursion & Stack'], 0, 'EASY', 'Explanation:\n• DP requires Optimal Substructure and Overlapping Subproblems.'),
  createQuestion('ads-q5', 'Solve T(N) = 2T(N/2) + O(N) using Master Theorem.', ['O(N)', 'O(N log N)', 'O(N²)', 'O(2ⁿ)'], 1, 'MODERATE', 'Explanation:\n• a=2, b=2 => N^(log_2 2) = N. Case 2 applies => Θ(N log N).'),
  createQuestion('ads-q6', 'Amortized time complexity per operation for Disjoint Set Union (DSU) with Path Compression & Rank?', ['O(N)', 'O(log N)', 'O(α(N)) inverse Ackermann', 'O(1) worst'], 2, 'MODERATE', 'Explanation:\n• DSU with path compression and rank heuristic runs in O(α(N)) ≈ O(1) amortized time.'),
  createQuestion('ads-q7', 'Minimum scalar multiplications for matrix chain A1 (10x30), A2 (30x5), A3 (5x60)?', ['4500', '27000', '18000', '9000'], 0, 'MODERATE', 'Explanation:\n• (A1 A2) A3 = (10*30*5) + (10*5*60) = 1500 + 3000 = 4500.'),
  createQuestion('ads-q8', 'Time complexity of 0/1 Knapsack DP with N items and capacity W?', ['O(2ⁿ)', 'O(N · W)', 'O(N log W)', 'O(N + W)'], 1, 'HARD', 'Explanation:\n• DP table size (N+1) x (W+1) => O(N · W) pseudo-polynomial time.'),
  createQuestion('ads-q9', 'Which problem is known to be NP-Complete?', ['3-SAT / 0/1 Knapsack Decision Variant', 'Minimum Spanning Tree', 'Shortest Path in DAG', 'Eulerian Path'], 0, 'HARD', 'Explanation:\n• 3-SAT and 0/1 Knapsack decision variant are NP-Complete.'),
  createQuestion('ads-q10', 'Time complexity of Floyd-Warshall All-Pairs Shortest Path algorithm?', ['O(V²)', 'O(V³)', 'O(V E)', 'O(E log V)'], 1, 'HARD', 'Explanation:\n• Floyd-Warshall uses 3 nested loops over vertices V => O(V³) time.')
];

// 14. Universal Human Values (UHV - Sem 2-1)
const uhvBank: Question[] = [
  createQuestion('uhv-q1', 'Mechanism for process of Self-Exploration in Universal Human Values?', ['Proposal & Experiential Validation through Natural Acceptance', 'Blind belief', 'Logical argument', 'Fear of penalty'], 0, 'EASY', 'Explanation:\n• Self-exploration begins with proposals validated through Natural Acceptance (Sahaj Swvikriti).'),
  createQuestion('uhv-q2', 'Two core aspects of a Human Being in UHV?', ['Self (I) and Body (Material Organism)', 'Brain & Body', 'Mind & Emotions', 'Soul & Mind'], 0, 'EASY', 'Explanation:\n• Human Being is co-existence of conscious Self ("I") and material Body.'),
  createQuestion('uhv-q3', 'Foundational (fundamental) value in human relationships according to UHV?', ['Trust (Vishwas)', 'Respect (Samman)', 'Love (Prem)', 'Care (Vatsalya)'], 0, 'EASY', 'Explanation:\n• Trust (Vishwas) is the foundational value in all human relationships.'),
  createQuestion('uhv-q4', 'Expression of harmony at the level of Society?', ['Fearlessness & Trust (Abhay)', 'Economic Dominance', 'Individual Competition', 'Military Power'], 0, 'EASY', 'Explanation:\n• Society goal includes Trust / Fearlessness (Abhay) across undivided society.'),
  createQuestion('uhv-q5', 'Definition of Respect (Samman) in UHV?', ['Right Evaluation (Samyak Moolyankan)', 'Evaluating by age/wealth', 'Over-evaluation', 'Under-evaluation'], 0, 'MODERATE', 'Explanation:\n• Respect means Right Evaluation (Samyak Moolyankan) of a person as Self (I).'),
  createQuestion('uhv-q6', 'Distinction between Sukh (Happiness) and Suvidha (Physical Facility)?', ['Sukh is continuous and qualitative (Self need); Suvidha is temporary and quantitative (Body need)', 'Identical', 'Suvidha is continuous', 'Sukh is quantitative'], 0, 'MODERATE', 'Explanation:\n• Needs of Self (Sukh) are qualitative & continuous; Needs of Body (Suvidha) are quantitative & limited.'),
  createQuestion('uhv-q7', 'Four orders of Nature in UHV syllabus?', ['Material, Plant/Pranic, Animal, Human Order', 'Solid, Liquid, Gas, Plasma', 'Minerals, Flora, Fauna, Spirits', 'Physical, Mental, Emotional, Spiritual'], 0, 'MODERATE', 'Explanation:\n• 4 Orders: Material (Padartha), Plant (Prana), Animal (Jeev), Human (Gyan Avastha).'),
  createQuestion('uhv-q8', 'Relation between Sanyam (Self-regulation) and Swasthya (Health)?', ['Sanyam is feeling of responsibility in Self for nurturing Body, leading to Swasthya', 'Sanyam is medical fasting', 'Swasthya means accumulating facility', 'Sanyam is external force'], 0, 'HARD', 'Explanation:\n• Sanyam is internal responsibility of Self towards Body, producing Swasthya (Health).'),
  createQuestion('uhv-q9', 'Ultimate state of existence described in UHV?', ['Sah-astitva (Co-existence) of all units in Space', 'Dominance of human over nature', 'Endless economic growth', 'Solitude'], 0, 'HARD', 'Explanation:\n• Existence is Co-existence (Sah-astitva) of material and conscious units in Space.'),
  createQuestion('uhv-q10', 'Characterizes Definitive Human Conduct?', ['Values (Mulya), Policy (Niti), and Character (Charitra)', 'Maximizing profit legally', 'Religious rituals', 'Changing morals'], 0, 'HARD', 'Explanation:\n• Definitive Human Conduct consists of universal Values (Mulya), Policy (Niti), and Character (Charitra).')
];

// 15. Python Programming Bank (Sem 2-2)
const pythonBank: Question[] = [
  createQuestion('py-q1', 'Which data structure in Python is immutable?', ['List', 'Dictionary', 'Tuple', 'Set'], 2, 'EASY', 'Explanation:\n• Tuples are immutable sequence types in Python whose elements cannot be modified after creation.'),
  createQuestion('py-q2', 'What is the output of print(2 ** 3 ** 2) in Python?', ['512', '64', 'simple error', '256'], 0, 'EASY', 'Explanation:\n• Exponentiation operator (**) evaluates right-to-left: 3 ** 2 = 9, then 2 ** 9 = 512.'),
  createQuestion('py-q3', 'Which keyword is used to define an anonymous inline function in Python?', ['def', 'lambda', 'func', 'inline'], 1, 'EASY', 'Explanation:\n• `lambda` creates anonymous single-expression functions in Python.'),
  createQuestion('py-q4', 'What does list comprehension `[x**2 for x in range(5) if x%2==0]` produce?', ['[0, 4, 16]', '[1, 9]', '[0, 1, 4, 9, 16]', '[0, 2, 4]'], 0, 'MODERATE', 'Explanation:\n• Range(5) is 0,1,2,3,4. Evens are 0,2,4. Squared: 0²=0, 2²=4, 4²=16 => [0, 4, 16].'),
  createQuestion('py-q5', 'Difference between `is` and `==` in Python?', ['`is` checks identity (memory address); `==` checks value equality', '`is` checks value; `==` checks address', 'Identical', '`is` is string operator'], 0, 'MODERATE', 'Explanation:\n• `==` evaluates equality of object contents; `is` evaluates if two variables reference exact same memory location.'),
  createQuestion('py-q6', 'What is `*args` and `**kwargs` in Python function parameters?', ['*args passes variable positional tuple; **kwargs passes variable keyword dictionary', '*args passes kwargs', 'Pointers', 'Command flags'], 0, 'MODERATE', 'Explanation:\n• `*args` collects positional arguments into a tuple; `**kwargs` collects keyword arguments into a dictionary.'),
  createQuestion('py-q7', 'What is a Python Decorator?', ['A function that takes another function as argument and extends its behavior without modifying it', 'A class attribute', 'A GUI layout', 'A docstring'], 0, 'HARD', 'Explanation:\n• Decorators wrap another function using `@decorator_name` syntax to modify/extend behavior.'),
  createQuestion('py-q8', 'What does `__slots__` do inside a Python class?', ['Restricts dynamic attribute creation, saving RAM memory', 'Private methods', 'Static fields', 'Constructor'], 0, 'HARD', 'Explanation:\n• Defining `__slots__` explicitly allocates memory for instance attributes, overriding default `__dict__`.'),
  createQuestion('py-q9', 'Output of `bool([])` and `bool([0])` in Python?', ['False and True', 'True and False', 'False and False', 'True and True'], 0, 'HARD', 'Explanation:\n• Empty list `[]` evaluates to falsy (False). List containing 0 `[0]` is non-empty and truthy (True).'),
  createQuestion('py-q10', 'How does Global Interpreter Lock (GIL) affect CPython multithreading?', ['Prevents multiple native CPU threads from executing Python bytecode simultaneously', 'Speeds up CPU tasks', 'Allocates GPU', 'Prevents memory leaks'], 0, 'HARD', 'Explanation:\n• GIL ensures only one native thread executes Python bytecode at a time, limiting CPU-bound parallelism.')
];

// 16. Theory of Computation (TOC / FLAT - Sem 2-2)
const tocBank: Question[] = [
  createQuestion('toc-q1', 'Which automaton recognizes Regular Languages?', ['Deterministic / Non-deterministic Finite Automaton (DFA / NFA)', 'Pushdown Automaton (PDA)', 'Turing Machine', 'Linear Bounded Automaton'], 0, 'EASY', 'Explanation:\n• Finite Automata (DFA/NFA) recognize strictly Regular Languages (Chomsky Type 3).'),
  createQuestion('toc-q2', 'What additional component does a Pushdown Automaton (PDA) have compared to a Finite Automaton?', ['A Stack (LIFO Memory)', 'Tape memory', 'Queue', 'Registers'], 0, 'EASY', 'Explanation:\n• PDA extends Finite Automaton with an auxiliary Stack memory to recognize Context-Free Languages (Type 2).'),
  createQuestion('toc-q3', 'Which Pumping Lemma is used to prove a language is NOT Context-Free?', ['Pumping Lemma for CFLs (uvwxy)', 'Pumping Lemma for RL (xyz)', 'Rice Theorem', 'Post Correspondence'], 0, 'EASY', 'Explanation:\n• Pumping Lemma for CFLs states any long string w in CFL can be decomposed as u v w x y where u v^i w x^i y is in L.'),
  createQuestion('toc-q4', 'What is Chomsky Normal Form (CNF) production rules format?', ['A -> BC or A -> a', 'A -> a B', 'A -> α', 'S -> ε'], 0, 'MODERATE', 'Explanation:\n• In CNF, every production rule is of form A -> BC (two non-terminals) or A -> a (single terminal).'),
  createQuestion('toc-q5', 'What is the Halting Problem in Turing Machines proved by Alan Turing?', ['Undecidable problem (no algorithm can determine if an arbitrary TM halts on input)', 'Decidable problem', 'NP-Complete', 'Linear time'], 0, 'MODERATE', 'Explanation:\n• Halting problem proves it is mathematically impossible to write a general algorithm deciding if any TM halts.'),
  createQuestion('toc-q6', 'Difference between NFA and DFA?', ['NFA allows multiple state transitions or ε-moves for same input; DFA has unique transition', 'DFA allows ε-moves', 'NFA is more powerful', 'DFA has stack'], 0, 'MODERATE', 'Explanation:\n• DFA has exactly 1 transition per input character. NFA allows 0, 1, or multiple transitions and ε-transitions (both have equal expressive power).'),
  createQuestion('toc-q7', 'Which language class is recognized by Linear Bounded Automata (LBA)?', ['Context-Sensitive Languages (Type 1)', 'Regular Languages', 'Context-Free Languages', 'Unrestricted'], 0, 'HARD', 'Explanation:\n• Linear Bounded Automata (LBA) recognize Context-Sensitive Languages (Chomsky Type 1).'),
  createQuestion('toc-q8', 'What does Rice\'s Theorem state about non-trivial semantic properties of Turing Machines?', ['Any non-trivial semantic property of RE languages is undecidable', 'All properties are decidable', 'DFA is equivalent to PDA', 'P = NP'], 0, 'HARD', 'Explanation:\n• Rice Theorem states that any non-trivial semantic property of the language recognized by a Turing Machine is undecidable.'),
  createQuestion('toc-q9', 'Which grammar type in Chomsky Hierarchy corresponds to Unrestricted / Recursively Enumerable Languages?', ['Type 0 Grammar', 'Type 1 Grammar', 'Type 2 Grammar', 'Type 3 Grammar'], 0, 'HARD', 'Explanation:\n• Type 0 Grammars (Unrestricted) generate Recursively Enumerable Languages recognized by Turing Machines.'),
  createQuestion('toc-q10', 'Minimization of DFA uses which famous algorithm?', ['Hopcroft\'s DFA Minimization Algorithm (Table Filling)', 'Dijkstra', 'Floyd-Warshall', 'Kruskal'], 0, 'HARD', 'Explanation:\n• Hopcroft algorithm partitions states into equivalence classes to find minimal state DFA in O(N log N) time.')
];

// 17. Operating Systems (OS - Sem 2-2)
const osBank: Question[] = [
  createQuestion('os-q1', 'Which CPU scheduling algorithm gives the minimum average waiting time for a given set of processes?', ['Shortest Job First (SJF)', 'First-Come First-Served (FCFS)', 'Round Robin (RR)', 'Priority Scheduling'], 0, 'EASY', 'Explanation:\n• Shortest Job First (SJF / SRTF) is mathematically optimal, producing the minimum average waiting time.'),
  createQuestion('os-q2', 'What is a Deadlock condition in Operating Systems?', ['A set of processes blocked because each process holds a resource and waits for another resource held by another process', 'Fast CPU execution', 'Memory leak', 'Process termination'], 0, 'EASY', 'Explanation:\n• Deadlock occurs when processes are unable to proceed because each holds resources requested by another.'),
  createQuestion('os-q3', 'What is Virtual Memory?', ['A memory management technique that creates an illusion of a large main memory by using disk space', 'Physical RAM expansion', 'Cache memory', 'ROM BIOS'], 0, 'EASY', 'Explanation:\n• Virtual Memory maps virtual addresses to physical RAM and secondary disk storage (paging).'),
  createQuestion('os-q4', 'Which algorithm is used for Deadlock Avoidance in Operating Systems?', ['Banker\'s Algorithm', 'Dijkstra Algorithm', 'Peterson\'s Algorithm', 'Round Robin'], 0, 'EASY', 'Explanation:\n• Banker\'s Algorithm tests for safety before allocating resources to prevent deadlocks.'),
  createQuestion('os-q5', 'What is Thrashing in Virtual Memory?', ['High page fault rate causing CPU spend more time swapping pages than executing processes', 'Fast disk access', 'Cache hit ratio 100%', 'CPU idle state'], 0, 'MODERATE', 'Explanation:\n• Thrashing happens when system spends excessive time paging into/out of disk due to insufficient physical memory.'),
  createQuestion('os-q6', 'What is Belady\'s Anomaly in Page Replacement?', ['FIFO page replacement algorithm experiencing MORE page faults when given MORE frame allocation', 'LRU experiencing page faults', 'Optimal algorithm failure', 'Memory leak'], 0, 'MODERATE', 'Explanation:\n• Belady\'s Anomaly states that increasing page frame count can increase total page faults in FIFO replacement.'),
  createQuestion('os-q7', 'What is a Mutex (Mutual Exclusion Lock)?', ['A locking mechanism used to synchronize access to critical sections, allowing only one thread at a time', 'A CPU register', 'A file system', 'A network port'], 0, 'MODERATE', 'Explanation:\n• Mutex provides exclusive ownership lock so only one thread accesses critical resource simultaneously.'),
  createQuestion('os-q8', 'What is the purpose of Peterson\'s Solution in Concurrent Programming?', ['Achieves Mutual Exclusion for 2 processes using shared variables without hardware support', 'Disk scheduling', 'Page allocation', 'Interrupt handling'], 0, 'HARD', 'Explanation:\n• Peterson\'s algorithm guarantees mutual exclusion, progress, and bounded waiting for 2 concurrent processes.'),
  createQuestion('os-q9', 'What is the difference between Hard Real-Time and Soft Real-Time OS?', ['Hard RTOS strictly guarantees deadlines (failure = system disaster); Soft RTOS prioritizes speed but tolerates occasional missed deadlines', 'Soft RTOS has no clock', 'Hard RTOS runs on Windows', 'No difference'], 0, 'HARD', 'Explanation:\n• Hard RTOS (e.g. avionics, pacemakers) must meet strict timing deadlines. Soft RTOS (e.g. video streaming) tolerates slight latencies.'),
  createQuestion('os-q10', 'In UNIX file system, what information is stored inside an Inode?', ['File metadata (size, permissions, owner, block pointers) EXCEPT file name', 'File name only', 'Actual file data bytes', 'User password'], 0, 'HARD', 'Explanation:\n• An Inode contains file attributes, file size, access permissions, creation timestamps, and pointers to data blocks (file names are stored in directory files).')
];

// 18. Computer Organization & Architecture (COA - Sem 2-2)
const coaBank: Question[] = [
  createQuestion('coa-q1', 'Which cache mapping technique allows a memory block to be placed in ANY cache line?', ['Fully Associative Mapping', 'Direct Mapping', 'Set-Associative Mapping', 'Virtual Mapping'], 0, 'EASY', 'Explanation:\n• Fully Associative Mapping allows memory blocks to be loaded into any cache line freely.'),
  createQuestion('coa-q2', 'What is a Data Hazard in CPU Instruction Pipelining?', ['Pipeline stalling caused by instruction depending on the result of a previous incomplete instruction', 'Branch misprediction', 'Cache miss', 'Power failure'], 0, 'EASY', 'Explanation:\n• Data hazard (RAW, WAR, WAW) occurs when instructions attempt to access data before earlier instructions finish writing it.'),
  createQuestion('coa-q3', 'Which I/O data transfer scheme allows direct data transfer between memory and I/O devices without CPU intervention?', ['Direct Memory Access (DMA)', 'Programmed I/O', 'Interrupt-Driven I/O', 'Polling'], 0, 'EASY', 'Explanation:\n• DMA controller manages high-speed block transfers between I/O and RAM, freeing the CPU.'),
  createQuestion('coa-q4', 'What is the main difference between RISC and CISC architectures?', ['RISC has simple fixed-length instructions & load-store architecture; CISC has complex variable-length instructions', 'CISC has no registers', 'RISC is only for microcontrollers', 'CISC is faster'], 0, 'EASY', 'Explanation:\n• RISC uses simplified single-cycle instructions with load-store architecture; CISC supports complex multi-cycle operations.'),
  createQuestion('coa-q5', 'In IEEE 754 32-bit Single Precision Floating Point representation, how many bits are allocated for Exponent and Mantissa?', ['Sign: 1 bit, Exponent: 8 bits, Mantissa: 23 bits', 'Sign: 1, Exponent: 11, Mantissa: 52', 'Sign: 2, Exponent: 10, Mantissa: 20', 'Sign: 1, Exponent: 7, Mantissa: 24'], 0, 'MODERATE', 'Explanation:\n• IEEE 754 32-bit float: 1 sign bit + 8 exponent bits (bias 127) + 23 mantissa bits = 32 bits total.'),
  createQuestion('coa-q6', 'What is the function of a Microprogram Control Unit?', ['Executes microinstructions stored in Control Memory (ROM) to generate control signals', 'Hardware logic gates only', 'Executes C code directly', 'Manages RAM refresh'], 0, 'MODERATE', 'Explanation:\n• Microprogrammed control units read sequences of microinstructions from control memory to drive control lines.'),
  createQuestion('coa-q7', 'What is Booth\'s Algorithm used for in Computer Arithmetic?', ['Signed 2\'s complement binary multiplication', 'Floating point division', 'BCD addition', 'Polynomial division'], 0, 'MODERATE', 'Explanation:\n• Booth\'s algorithm multiplies signed binary numbers in 2\'s complement representation efficiently.'),
  createQuestion('coa-q8', 'What is the write policy where cache writes update BOTH cache and main memory simultaneously?', ['Write-Through', 'Write-Back', 'Write-Allocate', 'No-Write-Allocate'], 0, 'HARD', 'Explanation:\n• Write-Through updates main RAM immediately upon every cache write operation.'),
  createQuestion('coa-q9', 'Calculate speedup factor S for a 5-stage pipeline with N = 1000 tasks over non-pipelined execution (5 cycles per task)?', ['S ≈ 5 (Ideal Speedup = number of stages k)', 'S = 1', 'S = 10', 'S = 1000'], 0, 'HARD', 'Explanation:\n• As N → ∞, Pipelined Speedup S = (k · N) / (k + N - 1) ≈ k = 5.'),
  createQuestion('coa-q10', 'What is Cache Coherence problem in Symmetric Multiprocessor (SMP) systems?', ['Inconsistency when multiple processors cache copies of the same shared memory location', 'RAM overload', 'Bus bottleneck', 'Disk corruption'], 0, 'HARD', 'Explanation:\n• Cache coherence ensures all processors see the latest written value when multiple local caches duplicate RAM blocks (solved via MESI protocol).')
];

// 19. Software Engineering (SE - Sem 2-2)
const seBank: Question[] = [
  createQuestion('se-q1', 'Which Agile Scrum framework ceremony occurs daily for 15 minutes to synchronize team progress?', ['Daily Standup / Daily Scrum', 'Sprint Planning', 'Sprint Review', 'Retrospective'], 0, 'EASY', 'Explanation:\n• Daily Standup is a 15-minute time-boxed event for team members to share what they did, plan to do, and blockers.'),
  createQuestion('se-q2', 'Which SDLC model is best suited for high-risk, large-scale projects with evolving requirements?', ['Spiral Model', 'Waterfall Model', 'V-Model', 'Rad Model'], 0, 'EASY', 'Explanation:\n• Spiral Model emphasizes explicit risk analysis across iterative development loops.'),
  createQuestion('se-q3', 'What is the primary goal of Black Box Testing?', ['Tests system functionality against specifications without knowledge of internal code structure', 'Code line coverage', 'Path testing', 'Compiler optimization'], 0, 'EASY', 'Explanation:\n• Black Box testing evaluates input-output behavior based on requirements without viewing internal implementation.'),
  createQuestion('se-q4', 'In UML Class Diagrams, what does a solid diamond symbol represent?', ['Composition (strong ownership where child lifetime depends on parent)', 'Aggregation', 'Generalization', 'Dependency'], 0, 'EASY', 'Explanation:\n• Filled solid diamond indicates Composition (strong whole-part relationship with lifetime dependency).'),
  createQuestion('se-q5', 'What is the formula for McCabe Cyclomatic Complexity V(G) of a control flow graph with E edges, V vertices, and P connected components?', ['V(G) = E - V + 2P', 'V(G) = E + V - P', 'V(G) = V / E', 'V(G) = E * V'], 0, 'MODERATE', 'Explanation:\n• McCabe Cyclomatic Complexity V(G) = Edges - Vertices + 2(Connected Components).'),
  createQuestion('se-q6', 'In software design, what is the ideal principle regarding Coupling and Cohesion?', ['Low Coupling and High Cohesion', 'High Coupling and Low Cohesion', 'High Coupling and High Cohesion', 'Zero Cohesion'], 0, 'MODERATE', 'Explanation:\n• Modules should have high cohesion (strong internal focus) and low coupling (minimal inter-module dependency).'),
  createQuestion('se-q7', 'What is Function Point Analysis (FPA) used for?', ['Estimating software size and effort based on functional user requirements (inputs, outputs, files)', 'Testing code speed', 'Measuring RAM size', 'Database backup'], 0, 'MODERATE', 'Explanation:\n• FPA measures software functionality size independent of programming language.'),
  createQuestion('se-q8', 'What is the difference between Verification and Validation in Software Quality Assurance?', ['Verification: "Are we building the product right?"; Validation: "Are we building the right product?"', 'Both mean unit testing', 'Verification is post-release', 'Validation is static analysis'], 0, 'HARD', 'Explanation:\n• Verification checks compliance with specifications; Validation checks if product satisfies actual user needs.'),
  createQuestion('se-q9', 'Which design pattern ensures a class has only one single instance and provides a global point of access to it?', ['Singleton Pattern', 'Factory Pattern', 'Observer Pattern', 'Adapter Pattern'], 0, 'HARD', 'Explanation:\n• Singleton pattern restricts instantiation of a class to a single object instance.'),
  createQuestion('se-q10', 'What is Refactoring in Software Engineering?', ['Restructuring existing computer code without changing its external functional behavior', 'Adding new features', 'Deleting test cases', 'Rewriting database schemas'], 0, 'HARD', 'Explanation:\n• Refactoring improves non-functional attributes (clean code, maintainability) while maintaining identical external output.')
];

// 20. Managerial Economics & Financial Analysis (MEFA - Sem 2-2)
const mefaBank: Question[] = [
  createQuestion('mefa-q1', 'What is the formula for Break-Even Point (BEP) in units?', ['Fixed Cost / (Selling Price per unit - Variable Cost per unit)', 'Total Revenue / Total Cost', 'Fixed Cost * Variable Cost', 'Price / Quantity'], 0, 'EASY', 'Explanation:\n• BEP (in units) = Fixed Costs / Contribution Margin per unit (Price - Variable Cost).'),
  createQuestion('mefa-q2', 'What does Price Elasticity of Demand measure?', ['Percentage change in quantity demanded in response to a percentage change in price', 'Change in supply', 'Profit margin', 'Tax rate'], 0, 'EASY', 'Explanation:\n• Price Elasticity = (% Change in Quantity Demanded) / (% Change in Price).'),
  createQuestion('mefa-q3', 'Which market structure is characterized by a single seller controlling the entire market output with no close substitutes?', ['Monopoly', 'Perfect Competition', 'Oligopoly', 'Monopolistic Competition'], 0, 'EASY', 'Explanation:\n• Monopoly exists when a single firm is the sole producer of a product with zero substitutes.'),
  createQuestion('mefa-q4', 'Golden Rule of Accounting for Real Accounts (e.g. Land, Machinery, Cash)?', ['Debit what comes in, Credit what goes out', 'Debit the receiver, Credit the giver', 'Debit all expenses, Credit all incomes', 'Debit capital'], 0, 'EASY', 'Explanation:\n• Real Account rule: Debit what comes into the business, Credit what goes out.'),
  createQuestion('mefa-q5', 'What does the Current Ratio measure in Financial Statement Analysis?', ['Short-term liquidity = Current Assets / Current Liabilities', 'Long-term solvency', 'Inventory turnover', 'Net profit margin'], 0, 'MODERATE', 'Explanation:\n• Current Ratio = Current Assets / Current Liabilities (Ideal standard ratio is 2:1).'),
  createQuestion('mefa-q6', 'What is Net Present Value (NPV) in Capital Budgeting?', ['Sum of present values of incoming cash flows minus initial investment outflow', 'Total revenue without discounting', 'Internal rate', 'Payback years'], 0, 'MODERATE', 'Explanation:\n• NPV discounts future cash inflows using cost of capital r and subtracts initial investment C₀.'),
  createQuestion('mefa-q7', 'What does the Law of Diminishing Marginal Utility state?', ['As consumption of a good increases, marginal utility derived from each additional unit decreases', 'Utility increases infinitely', 'Price increases with consumption', 'Total utility drops to zero immediately'], 0, 'MODERATE', 'Explanation:\n• Consumer satisfaction (utility) gained from consuming additional units of a commodity declines continuously.'),
  createQuestion('mefa-q8', 'What is the primary function of a Trial Balance in Accounting?', ['Verifies the arithmetical accuracy of ledger postings by checking total Debits equal total Credits', 'Calculates tax', 'Prepares balance sheet', 'Audits bank accounts'], 0, 'HARD', 'Explanation:\n• Trial Balance verifies Debit = Credit total balance across all ledger accounts before preparing final accounts.'),
  createQuestion('mefa-q9', 'What is the Internal Rate of Return (IRR)?', ['The discount rate at which Net Present Value (NPV) of a project becomes strictly zero', 'Bank interest rate', 'Inflation rate', 'Tax discount'], 0, 'HARD', 'Explanation:\n• IRR is the exact discount rate r that equates present value of expected cash inflows to initial cash outlay (NPV = 0).'),
  createQuestion('mefa-q10', 'Which financial ratio measures a company\'s overall profitability relative to shareholders\' equity?', ['Return on Equity (ROE) = Net Income / Shareholders Equity', 'Quick Ratio', 'Debt-Equity Ratio', 'Working Capital'], 0, 'HARD', 'Explanation:\n• ROE measures how efficiently management generates net profit per dollar of equity capital.')
];

// 21. Computer Networks (CN - Sem 3-1)
const cnBank: Question[] = [
  createQuestion('cn-q1', 'Which layer of the OSI Model is responsible for end-to-end process-to-process communication and port addressing?', ['Transport Layer', 'Network Layer', 'Data Link Layer', 'Session Layer'], 0, 'EASY', 'Explanation:\n• Transport Layer (Layer 4) uses TCP/UDP port numbers for process-to-process communication.'),
  createQuestion('cn-q2', 'What is the standard subnet mask for a Class C network with CIDR prefix /24?', ['255.255.255.0', '255.255.0.0', '255.0.0.0', '255.255.255.255'], 0, 'EASY', 'Explanation:\n• CIDR /24 means 24 network bits set to 1 => 11111111.11111111.11111111.00000000 = 255.255.255.0.'),
  createQuestion('cn-q3', 'Which protocol performs resolution of IPv4 addresses to physical MAC addresses?', ['ARP (Address Resolution Protocol)', 'RARP', 'DHCP', 'ICMP'], 0, 'EASY', 'Explanation:\n• ARP maps IP network addresses to local Ethernet MAC hardware addresses.'),
  createQuestion('cn-q4', 'What sequence of messages establishes a TCP connection (3-Way Handshake)?', ['SYN -> SYN-ACK -> ACK', 'ACK -> SYN -> FIN', 'CONNECT -> ACCEPT -> READY', 'PING -> PONG -> ACK'], 0, 'EASY', 'Explanation:\n• TCP 3-way handshake sequence: Client sends SYN, Server replies SYN-ACK, Client confirms ACK.'),
  createQuestion('cn-q5', 'Which routing protocol algorithm is used by OSPF (Open Shortest Path First)?', ['Dijkstra\'s Link-State Algorithm', 'Bellman-Ford Distance Vector', 'Path Vector BGP', 'Flooding'], 0, 'MODERATE', 'Explanation:\n• OSPF is a link-state routing protocol using Dijkstra\'s shortest path algorithm.'),
  createQuestion('cn-q6', 'What is the maximum payload size of a standard Ethernet frame (MTU)?', ['1500 Bytes', '64 Bytes', '4096 Bytes', '512 Bytes'], 0, 'MODERATE', 'Explanation:\n• Standard Ethernet Maximum Transmission Unit (MTU) payload size is 1500 bytes.'),
  createQuestion('cn-q7', 'How does CSMA/CD handle collisions on Ethernet networks?', ['Stops transmission, sends jam signal, and waits a random backoff time using Binary Exponential Backoff', 'Ignores collision', 'Increases voltage', 'Reboots router'], 0, 'MODERATE', 'Explanation:\n• CSMA/CD sends a jam signal upon collision and uses binary exponential backoff to reschedule retransmission.'),
  createQuestion('cn-q8', 'What is the key advantage of HTTP/2 over HTTP/1.1?', ['Multiplexing multiple requests over a single TCP connection, header compression (HPACK), and Server Push', 'Uses UDP instead of TCP', 'No encryption', 'Slower speed'], 0, 'HARD', 'Explanation:\n• HTTP/2 introduces binary framing, multiplexed streams on single connection, HPACK compression, and server push.'),
  createQuestion('cn-q9', 'In BGP (Border Gateway Protocol), what mechanism prevents routing loops across Autonomous Systems (AS)?', ['AS-Path attribute checking (rejects routes containing own AS number)', 'TTL counter', 'Spanning Tree', 'Subnetting'], 0, 'HARD', 'Explanation:\n• BGP is a Path-Vector protocol; if a router sees its own AS number in AS-Path, it discards the route to prevent loops.'),
  createQuestion('cn-q10', 'What is the bandwidth-delay product of a network link with 10 Gbps bandwidth and 50 ms Round Trip Time (RTT)?', ['500 Mb (62.5 MB)', '100 Mb', '10 Gb', '5 Gb'], 0, 'HARD', 'Explanation:\n• BDP = Bandwidth × RTT = 10⁹ bits/s × 0.050 s = 500,000,000 bits = 500 Mb (62.5 MB data in flight).')
];

// 22. Machine Learning (ML - Sem 3-1)
const mlBank: Question[] = [
  createQuestion('ml-q1', 'Which type of machine learning task predicts a continuous numerical output variable (e.g. house price)?', ['Regression', 'Classification', 'Clustering', 'Dimensionality Reduction'], 0, 'EASY', 'Explanation:\n• Regression predicts continuous numeric targets; Classification predicts discrete class labels.'),
  createQuestion('ml-q2', 'What is Overfitting in machine learning models?', ['Model performs exceptionally well on training data but generalizes poorly to unseen test data', 'Model performs poorly on both train and test', 'Model trains too fast', 'Model has zero parameters'], 0, 'EASY', 'Explanation:\n• Overfitting occurs when a high-variance model learns noise and specific details of training data.'),
  createQuestion('ml-q3', 'Which metric measures the proportion of true positive predictions among all positive predictions made?', ['Precision = TP / (TP + FP)', 'Recall', 'Accuracy', 'Specificity'], 0, 'EASY', 'Explanation:\n• Precision measures exactness: TP / (TP + FP). Recall measures completeness: TP / (TP + FN).'),
  createQuestion('ml-q4', 'What is the objective of Support Vector Machines (SVM)?', ['Find optimal hyperplane that maximizes margin between distinct classes', 'Minimize cluster variance', 'Maximize tree depth', 'Compute centroid'], 0, 'EASY', 'Explanation:\n• SVM finds maximum-margin separating decision boundary between support vectors of different classes.'),
  createQuestion('ml-q5', 'What does the Kernel Trick accomplish in SVM?', ['Implicitly maps input data into higher-dimensional feature space to make non-linearly separable data linearly separable', 'Reduces dataset size', 'Removes outliers', 'Speeds up CPU'], 0, 'MODERATE', 'Explanation:\n• Kernel functions (RBF, Polynomial) compute inner products in high-dimensional feature space without explicit transformation.'),
  createQuestion('ml-q6', 'Which clustering algorithm requires specifying the number of clusters K in advance and relies on centroids?', ['K-Means Clustering', 'DBSCAN', 'Agglomerative Hierarchical', 'Mean-Shift'], 0, 'MODERATE', 'Explanation:\n• K-Means requires predefined K and iteratively assigns points to nearest cluster centroid.'),
  createQuestion('ml-q7', 'What is the purpose of L1 Regularization (Lasso) compared to L2 Regularization (Ridge)?', ['L1 performs feature selection by driving coefficients strictly to ZERO; L2 shrinks coefficients near zero', 'L2 sets coefficients to zero', 'L1 increases variance', 'L2 removes dataset'], 0, 'MODERATE', 'Explanation:\n• Lasso (L1) adds |w| penalty producing sparse feature weights. Ridge (L2) adds w² penalty.'),
  createQuestion('ml-q8', 'What is the ROC-AUC score range and ideal benchmark for perfect classifier?', ['Range: 0.5 to 1.0; Perfect score = 1.0', 'Range: 0 to 100', 'Range: -1 to +1', 'Perfect = 0.5'], 0, 'HARD', 'Explanation:\n• Receiver Operating Characteristic Area Under Curve (ROC-AUC) ranges from 0.5 (random guess) to 1.0 (perfect classification).'),
  createQuestion('ml-q9', 'What is Ensemble Bagging (Bootstrap Aggregating) used in Random Forests?', ['Trains multiple independent trees on random bootstrap subsets and averages predictions to reduce variance', 'Sequentially fits trees on residual errors', 'Reduces bias only', 'Single tree pruning'], 0, 'HARD', 'Explanation:\n• Bagging creates diverse decision trees in parallel via bootstrap sampling to dramatically lower model variance.'),
  createQuestion('ml-q10', 'How does Gradient Boosting (XGBoost / LightGBM) differ from Random Forest Bagging?', ['Gradient Boosting builds trees sequentially, each correcting residual errors of preceding trees (reducing bias)', 'Boosting builds trees in parallel', 'Boosting uses random forests', 'Boosting does not use loss function'], 0, 'HARD', 'Explanation:\n• Boosting is a sequential ensemble method optimizing pseudo-residuals of loss function step-by-step.')
];

// 23. Exploratory Data Analysis (EDA - Sem 3-1)
const edaBank: Question[] = [
  createQuestion('eda-q1', 'Which statistical plot visualizes the median, quartiles (Q1, Q3), and potential outliers of a dataset?', ['Box Plot (Box-and-Whisker)', 'Histogram', 'Scatter Plot', 'Pie Chart'], 0, 'EASY', 'Explanation:\n• Box plot displays 5-number summary: Min, Q1, Median, Q3, Max, and outliers beyond 1.5 × IQR.'),
  createQuestion('eda-q2', 'What is the range of Pearson Correlation Coefficient r?', ['-1.0 to +1.0', '0 to 100', '0.0 to +1.0', '-∞ to +∞'], 0, 'EASY', 'Explanation:\n• Pearson r ranges from -1.0 (perfect negative correlation) to +1.0 (perfect positive correlation).'),
  createQuestion('eda-q3', 'Which technique converts categorical variables with N categories into N binary (0/1) indicator columns?', ['One-Hot Encoding', 'Label Encoding', 'Min-Max Scaling', 'Binned Discretization'], 0, 'EASY', 'Explanation:\n• One-Hot Encoding creates dummy binary indicator columns for non-ordinal categorical values.'),
  createQuestion('eda-q4', 'What is the formula for Interquartile Range (IQR)?', ['IQR = Q3 - Q1', 'IQR = Q3 + Q1', 'IQR = Mean - Median', 'IQR = Max - Min'], 0, 'EASY', 'Explanation:\n• Interquartile Range IQR = 75th percentile (Q3) - 25th percentile (Q1).'),
  createQuestion('eda-q5', 'What defines an Outlier using the 1.5 × IQR rule?', ['Values < (Q1 - 1.5 * IQR) or Values > (Q3 + 1.5 * IQR)', 'Values > Mean', 'Negative numbers', 'Zero values'], 0, 'MODERATE', 'Explanation:\n• Tukey\'s rule identifies data points beyond Q1 - 1.5(IQR) or Q3 + 1.5(IQR) as statistical outliers.'),
  createQuestion('eda-q6', 'What is Min-Max Feature Normalization formula scaling values to [0, 1] range?', ['x_norm = (x - x_min) / (x_max - x_min)', 'x_norm = (x - μ) / σ', 'x_norm = x / 100', 'x_norm = log(x)'], 0, 'MODERATE', 'Explanation:\n• Min-Max scaling reshapes feature range to [0,1]: (x - x_min) / (x_max - x_min).'),
  createQuestion('eda-q7', 'What is Z-score Standardization formula?', ['z = (x - μ) / σ (Mean = 0, Std Dev = 1)', 'z = (x - min) / max', 'z = x / σ', 'z = x²'], 0, 'MODERATE', 'Explanation:\n• Z-score standardizes feature distribution to zero mean and unit variance.'),
  createQuestion('eda-q8', 'When a dataset distribution has a long tail on the right side (Right-skewed), what is the relationship between Mean and Median?', ['Mean > Median', 'Mean < Median', 'Mean == Median', 'Mean = 0'], 0, 'HARD', 'Explanation:\n• In positively (right) skewed distributions, extreme large values pull the Mean to the right, making Mean > Median.'),
  createQuestion('eda-q9', 'Which statistical test determines whether a significant association exists between two categorical variables?', ['Chi-Square Test of Independence (χ²)', 'T-Test', 'ANOVA', 'Mann-Whitney U Test'], 0, 'HARD', 'Explanation:\n• Chi-Square test compares observed vs expected frequency tables for categorical independence.'),
  createQuestion('eda-q10', 'What does the Central Limit Theorem (CLT) state?', ['As sample size N increases (N ≥ 30), the sampling distribution of sample means approaches a Normal Distribution regardless of population shape', 'All datasets are normal', 'Sample mean is zero', 'Variance decreases to 0'], 0, 'HARD', 'Explanation:\n• CLT guarantees sample mean distribution is approximately normal for large sample sizes N.')
];

// 24. Full Stack Development (FSD-II - Sem 3-1)
const fsdBank: Question[] = [
  createQuestion('fsd-q1', 'What is the Virtual DOM in React.js?', ['A lightweight in-memory JSON representation of real DOM elements used for fast diffing & batch updates', 'Direct browser HTML', 'Database index', 'CSS stylesheet'], 0, 'EASY', 'Explanation:\n• React Virtual DOM keeps UI state in memory and uses reconciliation algorithm to update only changed real DOM nodes.'),
  createQuestion('fsd-q2', 'Which HTTP method is idempotent and used to replace an existing resource completely?', ['PUT', 'POST', 'PATCH', 'DELETE'], 0, 'EASY', 'Explanation:\n• PUT is idempotent and replaces target resource representation entirely.'),
  createQuestion('fsd-q3', 'In Express.js, what is the third parameter passed to middleware functions (req, res, next)?', ['`next()` function to pass control to next middleware', 'Database connection', 'Error handler object', 'Port number'], 0, 'EASY', 'Explanation:\n• `next()` invokes next middleware in stack; skipping it leaves request hanging.'),
  createQuestion('fsd-q4', 'What are the 3 dot-separated parts of a JSON Web Token (JWT)?', ['Header.Payload.Signature', 'User.Pass.Token', 'Key.Value.Hash', 'Host.Route.Query'], 0, 'EASY', 'Explanation:\n• JWT consists of Base64URL encoded Header, Payload (claims), and cryptographic Signature.'),
  createQuestion('fsd-q5', 'What is CORS (Cross-Origin Resource Sharing)?', ['HTTP header mechanism permitting restricted resources on a server to be requested from another domain', 'Database replication', 'CSS animation', 'Server reboot protocol'], 0, 'MODERATE', 'Explanation:\n• CORS uses `Access-Control-Allow-Origin` response headers to allow browser cross-domain requests.'),
  createQuestion('fsd-q6', 'What happens if you omit the dependency array in React `useEffect(fn)`?', ['Effect runs after EVERY render cycle', 'Effect runs only once on mount', 'Effect never runs', 'Compile error'], 0, 'MODERATE', 'Explanation:\n• Omitted dependency array makes `useEffect` execute after initial mount AND every subsequent render.'),
  createQuestion('fsd-q7', 'What is the purpose of React `useCallback` hook?', ['Memoizes callback function reference to prevent unnecessary child component re-renders', 'Fetches API data', 'Manages global state', 'Styles UI'], 0, 'MODERATE', 'Explanation:\n• `useCallback` returns memoized version of callback that changes only when specified dependencies change.'),
  createQuestion('fsd-q8', 'How does WebSocket protocol differ from traditional HTTP polling?', ['Provides full-duplex persistent bidirectional communication over single TCP connection', 'Uses UDP only', 'Requires page reload', 'Slower than HTTP'], 0, 'HARD', 'Explanation:\n• WebSockets establish real-time, low-latency, two-way communication between client and server over persistent TCP connection.'),
  createQuestion('fsd-q9', 'What is Server-Side Rendering (SSR) in Next.js / React?', ['HTML pages are generated on the server per request before sending to client browser', 'JS runs on client only', 'Database indexing', 'Static site caching'], 0, 'HARD', 'Explanation:\n• SSR computes page HTML on server for faster first contentful paint (FCP) and enhanced SEO.'),
  createQuestion('fsd-q10', 'In Node.js event loop, which queue executes callbacks of `process.nextTick()`?', ['Microtask Queue (executed immediately after current operation completes, before next tick phase)', 'Macrotask Queue', 'Timer Queue', 'I/O Polling Queue'], 0, 'HARD', 'Explanation:\n• `process.nextTick()` callbacks run at start of microtask queue, prioritizing before event loop advances.')
];

// 25. Artificial Intelligence (AI - Sem 3-1)
const aiBank: Question[] = [
  createQuestion('ai-q1', 'What is the evaluation function formula f(n) in A* Search Algorithm?', ['f(n) = g(n) + h(n) [g = path cost from start, h = heuristic to goal]', 'f(n) = g(n) * h(n)', 'f(n) = h(n) - g(n)', 'f(n) = 1 / g(n)'], 0, 'EASY', 'Explanation:\n• A* search evaluates nodes using f(n) = actual cost g(n) + estimated heuristic cost h(n).'),
  createQuestion('ai-q2', 'What condition makes a heuristic function h(n) Admissible for A* search?', ['h(n) NEVER overestimates the true cost to reach goal (h(n) ≤ h*(n))', 'h(n) = 0 always', 'h(n) > true cost', 'h(n) is negative'], 0, 'EASY', 'Explanation:\n• Admissibility requires heuristic estimation to be optimistic (h(n) ≤ true minimal cost h*(n)).'),
  createQuestion('ai-q3', 'Which algorithm reduces search tree nodes evaluated by Minimax in 2-player games (like Chess)?', ['Alpha-Beta Pruning', 'Dijkstra', 'Genetic Algorithm', 'Breadth-First Search'], 0, 'EASY', 'Explanation:\n• Alpha-Beta pruning prunes subtrees that cannot influence final minimax decision, cutting time complexity.'),
  createQuestion('ai-q4', 'What is the space complexity of Breadth-First Search (BFS) for tree depth d and branching factor b?', ['O(b^d)', 'O(b * d)', 'O(d)', 'O(1)'], 0, 'EASY', 'Explanation:\n• BFS stores all generated nodes in queue, taking exponential memory O(b^d).'),
  createQuestion('ai-q5', 'What is the Turing Test designed to evaluate?', ['Whether a machine can exhibit human-like intelligent conversational behavior indistinguishable from human', 'Robot speed', 'Chess rating', 'Compiler syntax'], 0, 'MODERATE', 'Explanation:\n• Turing Test evaluates if an evaluator cannot reliably tell machine responses apart from human responses.'),
  createQuestion('ai-q6', 'In Constraint Satisfaction Problems (CSP), what is Forward Checking?', ['Keeps track of remaining valid domain values for unassigned variables and prunes when domain becomes empty', 'Backtracks endlessly', 'Random assignment', 'Genetic crossover'], 0, 'MODERATE', 'Explanation:\n• Forward checking detects future failures early by updating domain bounds of neighbor variables.'),
  createQuestion('ai-q7', 'What is First-Order Predicate Logic (FOL) advantage over Propositional Logic?', ['Expresses objects, relations, and quantifiers (Universal ∀, Existential ∃)', 'Faster execution', 'Boolean operations only', 'Uses floats'], 0, 'MODERATE', 'Explanation:\n• FOL represents complex domains using objects, predicates, functions, and quantifiers.'),
  createQuestion('ai-q8', 'What is Markov Decision Process (MDP) tuple in Reinforcement Learning?', ['(S, A, P, R, γ) -> States, Actions, Transition Probability, Reward, Discount Factor', 'Input, Output, Weight', 'Nodes, Edges, Cost', 'Data, Query, Key'], 0, 'HARD', 'Explanation:\n• MDP models sequential decision making via States S, Actions A, Transition P(s\'|s,a), Reward R, and discount factor γ.'),
  createQuestion('ai-q9', 'What is Resolution Principle in Automated Theorem Proving?', ['Proof by contradiction using Conjunctive Normal Form (CNF) clauses', 'Pattern matching', 'Neural training', 'Decision tree'], 0, 'HARD', 'Explanation:\n• Resolution derives empty clause (contradiction) from negated goal in CNF.'),
  createQuestion('ai-q10', 'What is Q-Learning in Model-Free Reinforcement Learning?', ['Off-policy algorithm updating Q(s,a) state-action values using Bellman Optimality Equation', 'Supervised regression', 'Clustering', 'A* Search'], 0, 'HARD', 'Explanation:\n• Q-Learning learns optimal action-value function Q*(s,a) independently of agent\'s current policy.')
];

// 26. Microprocessors & Microcontrollers (MPMC - Sem 3-2)
const mpmcBank: Question[] = [
  createQuestion('mpmc-q1', 'What is the size of the Address Bus and Memory Addressing capability of Intel 8086 microprocessor?', ['20-bit Address Bus -> 1 MB Physical Memory', '16-bit -> 64 KB', '32-bit -> 4 GB', '8-bit -> 256 Bytes'], 0, 'EASY', 'Explanation:\n• Intel 8086 has a 20-bit multiplexed address bus capable of addressing 2²⁰ = 1,048,576 bytes (1 MB).'),
  createQuestion('mpmc-q2', 'What are the 4 Segment Registers in 8086 Microprocessor?', ['Code Segment (CS), Data Segment (DS), Stack Segment (SS), Extra Segment (ES)', 'AX, BX, CX, DX', 'SP, BP, SI, DI', 'PC, IR, MAR, MBR'], 0, 'EASY', 'Explanation:\n• 8086 divides 1 MB memory into 64 KB segments managed by CS, DS, SS, and ES.'),
  createQuestion('mpmc-q3', 'What is the internal RAM size of standard 8051 Microcontroller?', ['128 Bytes', '64 KB', '1 MB', '4 KB'], 0, 'EASY', 'Explanation:\n• Standard 8051 has 128 bytes of internal data RAM and 4 KB on-chip ROM.'),
  createQuestion('mpmc-q4', 'Formula to calculate Physical Address in 8086 memory segmentation?', ['Physical Address = (Segment Register × 16) + Offset Register', 'Segment + Offset', 'Segment × Offset', 'Offset / 16'], 0, 'EASY', 'Explanation:\n• 8086 shifts 16-bit segment value left by 4 bits (× 16) and adds 16-bit offset.'),
  createQuestion('mpmc-q5', 'What is the function of ALE (Address Latch Enable) signal in 8086/8051?', ['Demultiplexes lower address/data bus (AD0-AD7) to latch valid memory address', 'Clock signal', 'Interrupt pin', 'Power supply'], 0, 'MODERATE', 'Explanation:\n• High pulse on ALE indicates valid address bits are present on multiplexed AD0-AD7 lines.'),
  createQuestion('mpmc-q6', 'Which IC chip is known as Programmable Peripheral Interface (PPI)?', ['8255', '8259', '8251', '8254'], 0, 'MODERATE', 'Explanation:\n• Intel 8255 PPI provides 24 programmable I/O pins organized in 3 ports (Port A, B, C).'),
  createQuestion('mpmc-q7', 'What is the function of 8259 IC chip in microprocessor systems?', ['Programmable Interrupt Controller (PIC)', 'DMA Controller', 'Timer/Counter', 'USART Serial Port'], 0, 'MODERATE', 'Explanation:\n• Intel 8259 PIC handles up to 8 vectored hardware interrupts with priority management.'),
  createQuestion('mpmc-q8', 'What is the key architecture difference between Von Neumann and Harvard Architectures?', ['Harvard uses separate physical buses/memories for code and data; Von Neumann shares single bus/memory', 'Von Neumann has no memory', 'Harvard is slower', 'No difference'], 0, 'HARD', 'Explanation:\n• Harvard architecture allows simultaneous instruction fetch and data read via independent memory buses.'),
  createQuestion('mpmc-q9', 'In 8051 Microcontroller, how many parallel I/O ports exist and how many pins per port?', ['4 Ports (P0, P1, P2, P3), 8 pins each = 32 I/O lines', '2 Ports of 16 pins', '1 Port of 32 pins', '8 Ports of 4 pins'], 0, 'HARD', 'Explanation:\n• 8051 features 4 bidirectional 8-bit ports (P0-P3) total 32 I/O lines.'),
  createQuestion('mpmc-q10', 'What is Pipelining in 8086 Bus Interface Unit (BIU) and Execution Unit (EU)?', ['BIU prefetches instructions into a 6-byte instruction queue while EU executes current instruction', 'Executes 2 programs at once', 'Hardware multiplier', 'RAM refresher'], 0, 'HARD', 'Explanation:\n• 8086 overlaps instruction fetch (BIU 6-byte queue) with instruction execution (EU).')
];

// 27. Cryptography & Network Security (CNS - Sem 3-2)
const cnsBank: Question[] = [
  createQuestion('cns-q1', 'What is the key size options for AES (Advanced Encryption Standard)?', ['128-bit, 192-bit, or 256-bit keys', '64-bit only', '512-bit', '56-bit'], 0, 'EASY', 'Explanation:\n• AES is a symmetric block cipher supporting 128, 192, and 256-bit keys (Rijndael cipher).'),
  createQuestion('cns-q2', 'What mathematical principle forms the security basis of RSA Public-Key Cryptography?', ['Difficulty of factoring large composite numbers into prime factors (p * q)', 'Discrete Logarithm problem', 'Elliptic Curve point addition', 'XOR operation'], 0, 'EASY', 'Explanation:\n• RSA security relies on computational hardness of prime factorization of n = p × q.'),
  createQuestion('cns-q3', 'Which attack involves an adversary secretly intercepting and relaying communications between two parties without their knowledge?', ['Man-in-the-Middle (MITM) Attack', 'Denial of Service (DoS)', 'SQL Injection', 'Dictionary Attack'], 0, 'EASY', 'Explanation:\n• MITM attack compromises confidentiality/integrity by relaying messages between victims.'),
  createQuestion('cns-q4', 'What is the output hash length produced by SHA-256 algorithm?', ['256 bits (32 bytes)', '128 bits', '512 bits', '1024 bits'], 0, 'EASY', 'Explanation:\n• SHA-256 produces a fixed 256-bit (32-byte) cryptographic digest.'),
  createQuestion('cns-q5', 'What problem does Diffie-Hellman Key Exchange protocol solve?', ['Allows two parties to securely establish a shared secret key over an insecure public channel', 'Encrypts files', 'Signs documents', 'Filters packets'], 0, 'MODERATE', 'Explanation:\n• Diffie-Hellman enables secure key negotiation without transmitting the secret key directly.'),
  createQuestion('cns-q6', 'What properties must a secure Cryptographic Hash Function satisfy?', ['Pre-image resistance, Second pre-image resistance, and Collision resistance', 'Reversibility', 'Encryption key requirement', 'Variable output size'], 0, 'MODERATE', 'Explanation:\n• Hash functions must be one-way (pre-image resistant) and computationally infeasible to find collisions.'),
  createQuestion('cns-q7', 'What is Digital Signature primary purpose?', ['Guarantees Authentication, Data Integrity, and Non-Repudiation', 'Data compression', 'Hiding IP address', 'Speeds up TCP'], 0, 'MODERATE', 'Explanation:\n• Private key signing verifies sender identity (Authentication) and prevents denial (Non-repudiation).'),
  createQuestion('cns-q8', 'Difference between Stateful Inspection Firewall and Packet Filtering Firewall?', ['Stateful inspection tracks TCP connection state table; Packet filtering examines headers in isolation', 'Packet filtering inspects payload', 'Stateful is layer 1', 'No difference'], 0, 'HARD', 'Explanation:\n• Stateful firewalls maintain connection state context (SYN, ESTABLISHED), detecting invalid packet sequences.'),
  createQuestion('cns-q9', 'In Public Key Infrastructure (PKI), what is the function of a Certificate Authority (CA)?', ['Issues and signs digital certificates binding public keys to verified entity identities (X.509 standard)', 'Stores passwords', 'Encrypts web traffic', 'Generates IP addresses'], 0, 'HARD', 'Explanation:\n• CAs act as trusted third parties issuing digitally signed X.509 identity certificates.'),
  createQuestion('cns-q10', 'What is HMAC (Hash-based Message Authentication Code)?', ['Combines a cryptographic hash function with a secret shared key to verify message integrity & authenticity', 'Symmetric cipher', 'Public key', 'Firewall rule'], 0, 'HARD', 'Explanation:\n• HMAC provides authenticated message integrity using secret key K combined with hash function H(K ⊕ opad || H(K ⊕ ipad || text)).')
];

// 28. Data Warehousing & Data Mining (DWDM - Sem 3-2)
const dwdmBank: Question[] = [
  createQuestion('dwdm-q1', 'What is the primary difference between OLTP and OLAP systems?', ['OLTP handles operational real-time transactions; OLAP handles analytical queries on historical data', 'OLTP is for reports', 'OLAP has high updates', 'Both use flat files'], 0, 'EASY', 'Explanation:\n• OLTP (Online Transaction Processing) prioritizes fast CRUD operations; OLAP (Online Analytical Processing) prioritizes complex aggregation queries.'),
  createQuestion('dwdm-q2', 'Which schema design features a centralized Fact Table connected directly to non-normalized Dimension Tables?', ['Star Schema', 'Snowflake Schema', 'Fact Constellation', 'Relational Schema'], 0, 'EASY', 'Explanation:\n• Star Schema contains 1 central fact table surrounded by denormalized dimension tables.'),
  createQuestion('dwdm-q3', 'In Data Mining, what does the Apriori Algorithm discover?', ['Frequent itemsets and Association Rules (Support & Confidence)', 'Decision tree paths', 'K-Means clusters', 'Regression lines'], 0, 'EASY', 'Explanation:\n• Apriori uses downward closure property to mine frequent itemsets (e.g. Market Basket Analysis).'),
  createQuestion('dwdm-q4', 'What is the difference between Star Schema and Snowflake Schema?', ['Snowflake Schema normalizes dimension tables into multiple related sub-tables; Star Schema leaves dimensions denormalized', 'Star schema has no fact table', 'Snowflake has no primary keys', 'Identical'], 0, 'MODERATE', 'Explanation:\n• Snowflake schema normalizes dimension hierarchies to save disk space, adding join complexity.'),
  createQuestion('dwdm-q5', 'What does the Data Cube operation Roll-Up do?', ['Aggregates data by climbing up a concept hierarchy (e.g., from Cities to Countries)', 'Navigates from higher level to lower level', 'Selects 1 dimension', 'Rotates cube'], 0, 'MODERATE', 'Explanation:\n• Roll-up (drill-up) performs data aggregation across dimension hierarchies.'),
  createQuestion('dwdm-q6', 'What is the Naive Bayes Classifier assumption?', ['Assumes all input features are conditionally INDEPENDENT given the class label', 'Features are correlated', 'Requires deep trees', 'Uses distance metrics'], 0, 'MODERATE', 'Explanation:\n• "Naive" assumption presumes pairwise class-conditional independence among predictor variables.'),
  createQuestion('dwdm-q7', 'In Association Rule Mining, what is the formula for Confidence(A → B)?', ['Support(A ∪ B) / Support(A)', 'Support(A) / Support(B)', 'Support(A ∩ B) / Total', 'Support(A) * Support(B)'], 0, 'HARD', 'Explanation:\n• Confidence(A → B) measures conditional probability P(B|A) = Support(A ∪ B) / Support(A).'),
  createQuestion('dwdm-q8', 'What is DBSCAN Clustering algorithm main capability?', ['Discovers arbitrary-shaped clusters and identifies noise/outliers based on density (Eps, MinPts)', 'Requires K centroids', 'Hierarchical trees', 'Linear cuts'], 0, 'HARD', 'Explanation:\n• DBSCAN clusters dense regions separated by sparse areas without pre-specifying cluster count.'),
  createQuestion('dwdm-q9', 'What are the 3 phases of ETL process in Data Warehousing?', ['Extract (from sources), Transform (clean/format), Load (into warehouse)', 'Execute, Test, Launch', 'Edit, Table, List', 'Export, Transfer, Log'], 0, 'HARD', 'Explanation:\n• ETL extracts heterogeneous source data, transforms/cleans data schema, and loads into DW.'),
  createQuestion('dwdm-q10', 'What is Gini Index formula used in CART Decision Tree splits?', ['Gini = 1 - ∑ (p_i)²', 'Gini = - ∑ p_i log₂(p_i)', 'Gini = ∑ (x - μ)²', 'Gini = Max(p_i)'], 0, 'HARD', 'Explanation:\n• Gini impurity measures node heterogeneity: Gini = 1 - ∑ p_i².')
];

// 29. Cloud Computing (Cloud - Sem 3-2)
const cloudBank: Question[] = [
  createQuestion('cloud-q1', 'Which Cloud Service Model provides bare virtual machines, storage, and networking (e.g. AWS EC2)?', ['Infrastructure as a Service (IaaS)', 'Platform as a Service (PaaS)', 'Software as a Service (SaaS)', 'Function as a Service (FaaS)'], 0, 'EASY', 'Explanation:\n• IaaS provides fundamental computing infrastructure resources (VMs, storage, firewalls).'),
  createQuestion('cloud-q2', 'Which Cloud Service Model delivers ready-to-use software applications over web browsers (e.g. Google Workspace, Salesforce)?', ['Software as a Service (SaaS)', 'IaaS', 'PaaS', 'BaaS'], 0, 'EASY', 'Explanation:\n• SaaS delivers fully managed end-user software applications via cloud.'),
  createQuestion('cloud-q3', 'What is a Type 1 (Bare-Metal) Hypervisor?', ['Runs directly on physical host hardware without an underlying OS (e.g. VMware ESXi, KVM)', 'Runs inside Windows 11 host OS', 'Is a browser extension', 'Runs inside container'], 0, 'EASY', 'Explanation:\n• Type 1 hypervisors interface directly with hardware for max performance and enterprise virtualization.'),
  createQuestion('cloud-q4', 'What is Amazon S3 (Simple Storage Service)?', ['Highly scalable, durable Object Storage service accessed via REST API HTTP endpoints', 'Relational database', 'RAM cache', 'CPU processor'], 0, 'EASY', 'Explanation:\n• Amazon S3 stores unstructured data as Objects inside Buckets with 99.999999999% durability.'),
  createQuestion('cloud-q5', 'What is Serverless Computing (e.g. AWS Lambda)?', ['Event-driven execution model where cloud provider manages infrastructure scaling and charges only for execution time', 'Servers do not exist', 'Free hosting forever', 'Static file server'], 0, 'MODERATE', 'Explanation:\n• Serverless abstracts server management; developer uploads code function triggered by events.'),
  createQuestion('cloud-q6', 'What is the difference between Docker Containers and Virtual Machines (VMs)?', ['Containers share host OS kernel and isolate user space; VMs run full guest OS on hypervisor', 'VMs are smaller', 'Containers require hypervisor', 'Containers run slower'], 0, 'MODERATE', 'Explanation:\n• Containers are lightweight OS-level virtualizations sharing host kernel; VMs emulate complete hardware.'),
  createQuestion('cloud-q7', 'In Cloud Elasticity, what is Horizontal Scaling (Scaling Out/In)?', ['Adding or removing server instances dynamically to match workload demand', 'Increasing RAM on single server', 'Upgrading CPU clock speed', 'Replacing hard disk'], 0, 'MODERATE', 'Explanation:\n• Horizontal scaling adds/removes instances (scale out/in). Vertical scaling increases RAM/CPU of single node (scale up/down).'),
  createQuestion('cloud-q8', 'What is Infrastructure as Code (IaC) using tools like Terraform or CloudFormation?', ['Defining and provisioning cloud infrastructure resources using declarative configuration files', 'Manual GUI clicks', 'Writing HTML code', 'Compiling C code'], 0, 'HARD', 'Explanation:\n• IaC manages infrastructure via version-controlled code declarations for reproducible deployments.'),
  createQuestion('cloud-q9', 'What is the Cloud Shared Responsibility Model for Security in IaaS?', ['Cloud Provider secures physical hardware/hypervisor; Customer secures OS, applications, and data', 'Provider secures everything', 'Customer secures hardware', 'No security required'], 0, 'HARD', 'Explanation:\n• Provider is responsible for security OF the cloud (datacenter, host). Customer is responsible for security IN the cloud (OS, app, data).'),
  createQuestion('cloud-q10', 'What is Recovery Time Objective (RTO) in Cloud Disaster Recovery?', ['Maximum acceptable duration of time a system can be down after a disaster', 'Maximum data loss in seconds', 'Backup frequency', 'Network speed'], 0, 'HARD', 'Explanation:\n• RTO measures acceptable downtime. RPO (Recovery Point Objective) measures acceptable data loss.')
];

// 30. Professional Ethics & Cyber Laws (PE - Sem 3-2)
const peBank: Question[] = [
  createQuestion('pe-q1', 'Which section of the Indian Information Technology (IT) Act 2000 deals with penalty for Hacking computer systems?', ['Section 66', 'Section 43', 'Section 65', 'Section 67'], 0, 'EASY', 'Explanation:\n• Section 66 of IT Act 2000 prescribes punishment (up to 3 years imprisonment / fine) for computer hacking offences.'),
  createQuestion('pe-q2', 'What is Intellectual Property Rights (IPR)?', ['Legal rights granting creators exclusive rights to their inventions, literary works, logos and designs', 'Physical land ownership', 'Bank account protection', 'Tax exemption'], 0, 'EASY', 'Explanation:\n• IPR protects intangible human intellect creations (Patents, Trademarks, Copyrights, Trade Secrets).'),
  createQuestion('pe-q3', 'What is Whistleblowing in Corporate Governance?', ['Employee reporting illegal, unethical or unsafe practices within an organization to authorities/public', 'Leaking trade secrets for cash', 'Filing tax returns', 'Quitting a job'], 0, 'EASY', 'Explanation:\n• Whistleblowing is raising ethical concerns about corruption or safety violations to protect public interest.'),
  createQuestion('pe-q4', 'What is the duration of a standard Patent grant in India?', ['20 Years from filing date', '50 Years', '10 Years', 'Lifetime of inventor'], 0, 'EASY', 'Explanation:\n• Under Indian Patent Act 1970, patent protection lasts 20 years from application date.'),
  createQuestion('pe-q5', 'What is Phishing in Cyber Crime?', ['Fraudulent attempt to obtain sensitive information (passwords, credit cards) by impersonating a trustworthy entity', 'Hacking Wi-Fi', 'Installing RAM', 'Deleting logs'], 0, 'MODERATE', 'Explanation:\n• Phishing uses deceptive emails or websites to trick victims into revealing credentials.'),
  createQuestion('pe-q6', 'Difference between Open Source Software (OSS) licenses (e.g. MIT, GPL) and Proprietary licenses?', ['OSS grants right to view, modify and distribute source code; Proprietary restricts code access', 'Proprietary is always free', 'OSS prohibits commercial use', 'No difference'], 0, 'MODERATE', 'Explanation:\n• Open Source licenses grant source code inspection and modification rights; Proprietary licenses keep source code secret.'),
  createQuestion('pe-q7', 'Under Indian IT Act 2000, what is a Digital Signature Certificate (DSC)?', ['An electronic key issued by Certifying Authority to verify identity of certificate holder during digital signing', 'Scanned handwritten signature', 'Email address', 'Password'], 0, 'MODERATE', 'Explanation:\n• DSC is a tamper-proof cryptographic identity certificate legally equivalent to physical signature under IT Act.'),
  createQuestion('pe-q8', 'What is the precautionary principle in Environmental Engineering Ethics?', ['Taking preventive action in face of uncertainty to protect human health & environment from potential harm', 'Maximizing industrial production', 'Ignoring pollution', 'Fining citizens'], 0, 'HARD', 'Explanation:\n• Precautionary principle mandates protective action even if scientific cause-effect proof is not fully established.'),
  createQuestion('pe-q9', 'What is Section 66A of Indian IT Act 2000 struck down by Supreme Court in Shreya Singhal case (2015)?', ['Offensive messages sending punishment (struck down as unconstitutional violation of Free Speech Art 19(1)(a))', 'Cyber terrorism', 'E-commerce tax', 'Digital signature'], 0, 'HARD', 'Explanation:\n• SC struck down Sec 66A for being overly broad and vague, upholding fundamental freedom of speech.'),
  createQuestion('pe-q10', 'What is GDPR (General Data Protection Regulation)?', ['EU data privacy law enforcing strict data protection rules, consent requirements, and right to be forgotten', 'US patent law', 'Indian IT amendment', 'ISO standard'], 0, 'HARD', 'Explanation:\n• GDPR gives citizens control over personal data and mandates hefty non-compliance penalties globally.')
];

// 31. DevOps (DevOps - Sem 4-1)
const devopsBank: Question[] = [
  createQuestion('devops-q1', 'What are the two core practices forming the foundation of CI/CD pipelines?', ['Continuous Integration & Continuous Delivery / Deployment', 'Code Inspection & Code Deletion', 'Central Intelligence & Client Data', 'Compiler Installation'], 0, 'EASY', 'Explanation:\n• CI automatically builds & tests code changes. CD automates release deployment to staging/production.'),
  createQuestion('devops-q2', 'What is a Dockerfile?', ['A text document containing instructions to build a Docker container image automatically', 'A running container', 'A Linux kernel module', 'A database log'], 0, 'EASY', 'Explanation:\n• Dockerfile contains commands (`FROM`, `RUN`, `COPY`, `CMD`) to assemble a container image.'),
  createQuestion('devops-q3', 'In Kubernetes architecture, what is the smallest deployable unit of computing?', ['Pod (containing 1 or more containers)', 'Node', 'Cluster', 'Service'], 0, 'EASY', 'Explanation:\n• A Pod is the atomic unit in Kubernetes encapsulating application containers, storage resources & IP.'),
  createQuestion('devops-q4', 'Which tool is widely used for Infrastructure as Code (IaC) across multi-cloud environments?', ['Terraform (HashiCorp)', 'Vite', 'Webpack', 'Postman'], 0, 'EASY', 'Explanation:\n• Terraform uses declarative HCL files to provision infrastructure across AWS, Azure, GCP.'),
  createQuestion('devops-q5', 'What is the difference between Blue-Green Deployment and Canary Deployment?', ['Blue-Green switches 100% traffic between 2 identical environments; Canary routes small % traffic to new release first', 'Canary switches 100% instantly', 'Blue-Green uses Docker only', 'Identical'], 0, 'MODERATE', 'Explanation:\n• Blue-Green toggles router traffic between 2 production stacks. Canary rolls out changes incrementally to a small user fraction.'),
  createQuestion('devops-q6', 'What is the function of Kubernetes Ingress Controller?', ['Manages external HTTP/HTTPS access to services within a cluster (L7 Load Balancing & SSL termination)', 'Allocates pod RAM', 'Stores secrets', 'Restarts failed nodes'], 0, 'MODERATE', 'Explanation:\n• Ingress manages external traffic routing to cluster services based on HTTP path/host rules.'),
  createQuestion('devops-q7', 'What is Jenkins declarative pipeline file default name?', ['Jenkinsfile', 'docker-compose.yml', 'build.xml', 'pipeline.json'], 0, 'MODERATE', 'Explanation:\n• `Jenkinsfile` stores pipeline stages (`stage(\'Build\')`, `stage(\'Test\')`) checked into Git.'),
  createQuestion('devops-q8', 'What is GitOps workflow principle?', ['Uses Git repository as single source of truth for infrastructure & application declarative state', 'Manual SSH deployments', 'FTP uploads', 'No version control'], 0, 'HARD', 'Explanation:\n• GitOps relies on Git PRs and automated agents (ArgoCD / Flux) to sync cluster state with Git commits.'),
  createQuestion('devops-q9', 'What open-source tool pair is standard for Cloud-Native Monitoring & Metrics Visualization?', ['Prometheus & Grafana', 'Logstash & Kibana', 'Docker & Podman', 'Nginx & Apache'], 0, 'HARD', 'Explanation:\n• Prometheus scrapes time-series metrics; Grafana renders interactive monitoring dashboards.'),
  createQuestion('devops-q10', 'What is Trunk-Based Development vs GitFlow branching?', ['Trunk-Based developers merge small frequent updates into a single main branch; GitFlow uses long-lived feature/release branches', 'GitFlow has no branches', 'Trunk-Based forbids testing', 'Both prohibit commits'], 0, 'HARD', 'Explanation:\n• Trunk-Based Development avoids merge hell by committing short-lived branches frequently to main.')
];

// 32. Deep Learning (DL - Sem 4-1)
const dlBank: Question[] = [
  createQuestion('dl-q1', 'Which layer type in a Convolutional Neural Network (CNN) extracts spatial features using learnable filters?', ['Convolutional Layer', 'Fully Connected Layer', 'Dropout Layer', 'Batch Normalization'], 0, 'EASY', 'Explanation:\n• Convolutional layers slide kernels/filters over input images to produce feature maps.'),
  createQuestion('dl-q2', 'What is the purpose of Max Pooling in CNNs?', ['Reduces spatial dimensions (height & width) of feature maps, cutting parameters & computation', 'Increases image resolution', 'Adds noise', 'Normalizes weights'], 0, 'EASY', 'Explanation:\n• Max Pooling downsamples feature maps by taking maximum value in local sliding window.'),
  createQuestion('dl-q3', 'Which activation function outputs values in range [0, 1] and is used for binary classification output layer?', ['Sigmoid', 'ReLU', 'Tanh', 'Linear'], 0, 'EASY', 'Explanation:\n• Sigmoid function σ(z) = 1 / (1 + e⁻ᶻ) squashes real numbers to [0, 1] probability range.'),
  createQuestion('dl-q4', 'What problem does ReLU (Rectified Linear Unit) solve compared to Sigmoid in deep networks?', ['Mitigates Vanishing Gradient problem during backpropagation', 'Prevents overfitting', 'Reduces memory', 'Removes weights'], 0, 'EASY', 'Explanation:\n• ReLU f(x) = max(0, x) maintains constant derivative 1 for positive inputs, preventing vanishing gradients.'),
  createQuestion('dl-q5', 'What mechanism allows Transformer models (like BERT & GPT) to process entire sequences in parallel without Recurrent loops?', ['Self-Attention Mechanism (Query, Key, Value vectors)', 'Convolutional stride', 'Recurrent cell', 'Pooling'], 0, 'MODERATE', 'Explanation:\n• Scaled Dot-Product Self-Attention computes relationships between all tokens simultaneously.'),
  createQuestion('dl-q6', 'What technique randomly deactivates a fraction of neurons during training to prevent co-adaptation and overfitting?', ['Dropout', 'L1 Regularization', 'Early Stopping', 'Data Augmentation'], 0, 'MODERATE', 'Explanation:\n• Dropout zeroes out neuron outputs with probability p during forward pass, forcing redundant representations.'),
  createQuestion('dl-q7', 'What is the function of Batch Normalization?', ['Normalizes layer inputs across mini-batch (mean 0, variance 1), stabilizing and accelerating deep network training', 'Normalizes dataset size', 'Batches file IO', 'Zeroes gradients'], 0, 'MODERATE', 'Explanation:\n• Batch Norm reduces internal covariate shift, allowing higher learning rates.'),
  createQuestion('dl-q8', 'What are the 2 competing neural networks inside a Generative Adversarial Network (GAN)?', ['Generator (creates synthetic data) & Discriminator (evaluates real vs fake)', 'Encoder & Decoder', 'Teacher & Student', 'Actor & Critic'], 0, 'HARD', 'Explanation:\n• GANs pit Generator against Discriminator in a minimax game: min_G max_D V(D, G).'),
  createQuestion('dl-q9', 'Why are LSTMs (Long Short-Term Memory) superior to standard Simple RNNs for long sequence processing?', ['Use Memory Cell with Input, Forget, and Output Gates to regulate long-term information flow', 'LSTMs do not backpropagate', 'LSTMs have 1 parameter', 'LSTMs use CNN filters'], 0, 'HARD', 'Explanation:\n• LSTM gating mechanism prevents vanishing/exploding gradients over extended time steps.'),
  createQuestion('dl-q10', 'Which optimization algorithm adapts learning rates individually for each weight parameter using 1st and 2nd moment estimates?', ['Adam (Adaptive Moment Estimation)', 'SGD with Momentum', 'Adagrad', 'RMSprop'], 0, 'HARD', 'Explanation:\n• Adam computes adaptive learning rates maintaining exponential moving averages of gradient m_t and squared gradient v_t.')
];

// 33. Human Resource & Project Management (HRPM - Sem 4-1)
const hrpmBank: Question[] = [
  createQuestion('hrpm-q1', 'What is the Critical Path in Project Network Diagrams (CPM/PERT)?', ['Longest duration path through network diagram determining minimum total project completion time', 'Shortest path', 'Path with highest cost', 'Path with zero tasks'], 0, 'EASY', 'Explanation:\n• Critical Path is the sequence of dependent tasks with ZERO total float (slack); any delay delays the project.'),
  createQuestion('hrpm-q2', 'In COCOMO model, what is the primary metric used to estimate software effort in person-months?', ['KLOC (Kilo Lines of Code)', 'Number of pages', 'RAM size', 'Number of developers'], 0, 'EASY', 'Explanation:\n• Basic COCOMO formula Effort E = a × (KLOC)^b in Thousands of Delivered Source Instructions.'),
  createQuestion('hrpm-q3', 'Which level of Maslow\'s Hierarchy of Needs includes self-fulfillment, personal growth and achieving potential?', ['Self-Actualization', 'Esteem Needs', 'Social Needs', 'Physiological Needs'], 0, 'EASY', 'Explanation:\n• Self-Actualization is the top level of Maslow\'s pyramid representing personal growth & self-fulfillment.'),
  createQuestion('hrpm-q4', 'What is a Work Breakdown Structure (WBS)?', ['Hierarchical decomposition of total scope of work to be carried out by project team', 'Employee salary sheet', 'Bug report list', 'Gantt chart color scheme'], 0, 'EASY', 'Explanation:\n• WBS breaks project deliverables into smaller manageable work packages.'),
  createQuestion('hrpm-q5', 'What does Earned Value (EV) measure in Earned Value Management (EVM)?', ['Budgeted cost of work actually performed up to a given date', 'Actual cost spent', 'Total project budget', 'Remaining budget'], 0, 'MODERATE', 'Explanation:\n• EV (BCWP) = % Complete × Total Planned Budget (BAC).'),
  createQuestion('hrpm-q6', 'In EVM, if Cost Performance Index CPI = EV / AC > 1.0, what does it signify?', ['Project is UNDER budget (Cost Efficiency)', 'Project is OVER budget', 'Project is behind schedule', 'Project is cancelled'], 0, 'MODERATE', 'Explanation:\n• CPI > 1.0 indicates cost efficiency (earning more value than money spent). CPI < 1.0 means over budget.'),
  createQuestion('hrpm-q7', 'What is 360-Degree Feedback in Performance Appraisal?', ['Feedback collected from employee\'s peers, subordinates, superiors, and self-evaluation', 'Feedback from CEO only', 'Customer survey', 'Annual written test'], 0, 'MODERATE', 'Explanation:\n• 360-Degree appraisal gathers multi-source performance feedback from all surrounding workplace relationships.'),
  createQuestion('hrpm-q8', 'Difference between PERT and CPM project management techniques?', ['PERT uses probabilistic 3-time estimates (Optimistic, Most Likely, Pessimistic); CPM uses deterministic single time estimate', 'CPM uses 3 time estimates', 'PERT is for construction', 'Both ignore time'], 0, 'HARD', 'Explanation:\n• PERT handles R&D uncertainty via 3-time estimates (t_e = (a + 4m + b)/6). CPM targets deterministic construction tasks.'),
  createQuestion('hrpm-q9', 'What conflict resolution technique seeks a win-win outcome where both parties work together to satisfy all concerns?', ['Collaborating (Confronting)', 'Compromising', 'Avoiding', 'Forcing'], 0, 'HARD', 'Explanation:\n• Collaborating merges insights from different perspectives to reach a mutually satisfying consensus.'),
  createQuestion('hrpm-q10', 'What is Resource Leveling in Project Scheduling?', ['Adjusts task start and end dates to balance demand for primary resources without exceeding resource limits', 'Firing workers', 'Doubling project budget', 'Skipping quality tests'], 0, 'HARD', 'Explanation:\n• Resource Leveling resolves resource over-allocation by rescheduling tasks within available float.')
];

// 34. Big Data Analytics (BDA - Sem 4-1)
const bdaBank: Question[] = [
  createQuestion('bda-q1', 'What are the two primary components of Apache Hadoop core architecture?', ['HDFS (Hadoop Distributed File System) & MapReduce', 'Spark & Storm', 'Hive & Pig', 'Kafka & Flink'], 0, 'EASY', 'Explanation:\n• Core Hadoop consists of HDFS (distributed storage) and MapReduce (distributed computation engine).'),
  createQuestion('bda-q2', 'In Hadoop HDFS architecture, what is the role of the NameNode?', ['Master node managing file system namespace, directory tree, and block location metadata', 'Stores actual data blocks', 'Executes map tasks', 'Monitors RAM'], 0, 'EASY', 'Explanation:\n• NameNode is master node maintaining file system metadata; DataNodes store actual 128 MB data blocks.'),
  createQuestion('bda-q3', 'What are the 5 V\'s of Big Data?', ['Volume, Velocity, Variety, Veracity, Value', 'Vector, Value, Variable, Vertex, View', 'Virtual, Visual, Valid, Vast, Vital', 'Voice, Video, Vantage, Vacuum, Vault'], 0, 'EASY', 'Explanation:\n• Big Data attributes: Volume (scale), Velocity (speed), Variety (forms), Veracity (trustworthiness), Value.'),
  createQuestion('bda-q4', 'What is Apache Spark Resilient Distributed Dataset (RDD)?', ['Fault-tolerant immutable collection of objects partitioned across nodes that can be operated on in parallel', 'SQL table', 'Hadoop NameNode', 'Disk file'], 0, 'EASY', 'Explanation:\n• RDD is Spark\'s core abstraction: immutable, in-memory, fault-tolerant partitioned dataset.'),
  createQuestion('bda-q5', 'In MapReduce, what happens during the Shuffle & Sort phase between Map and Reduce?', ['Collects map output pairs, sorts by key, and routes matching keys to the same Reducer node', 'Deletes data', 'Writes to HDFS', 'Compresses files'], 0, 'MODERATE', 'Explanation:\n• Shuffle and Sort redistributes mapper intermediate output key-value pairs so all values for key K go to Reducer K.'),
  createQuestion('bda-q6', 'How does Apache Spark achieve 100x faster performance than Hadoop MapReduce for iterative workloads?', ['In-memory processing and DAG (Directed Acyclic Graph) execution engine avoiding intermediate disk I/O', 'Uses faster CPU', 'Has no fault tolerance', 'Single thread mode'], 0, 'MODERATE', 'Explanation:\n• Spark keeps intermediate RDDs in RAM memory and constructs optimized DAG execution plans.'),
  createQuestion('bda-q7', 'Which NoSQL database classification does Apache Cassandra belong to?', ['Wide-Column / Column-Family Store', 'Document Store', 'Key-Value Store', 'Graph Database'], 0, 'MODERATE', 'Explanation:\n• Cassandra is a distributed wide-column NoSQL database based on Google Bigtable and Amazon Dynamo.'),
  createQuestion('bda-q8', 'What does the CAP Theorem state for distributed data stores?', ['A distributed system can simultaneously provide at most 2 out of 3 guarantees: Consistency, Availability, Partition Tolerance', 'All 3 can be 100%', 'Only 1 guarantee is possible', 'CAP is irrelevant'], 0, 'HARD', 'Explanation:\n• Brewer\'s CAP theorem proves distributed systems under network partition (P) must choose between Consistency (C) or Availability (A).'),
  createQuestion('bda-q9', 'What is Apache Kafka primarily used for?', ['Distributed event streaming platform for high-throughput real-time message queuing & pub-sub pipelines', 'Batch SQL reporting', 'Image processing', 'HTML rendering'], 0, 'HARD', 'Explanation:\n• Kafka provides publish-subscribe message broker streams handling trillions of events daily.'),
  createQuestion('bda-q10', 'In Apache Hive, what is the language used to query Big Data stored in HDFS?', ['HiveQL (Hive Query Language - SQL-like dialect)', 'Cypher', 'GraphQL', 'MongoDB Query Language'], 0, 'HARD', 'Explanation:\n• HiveQL translates SQL-like statements into MapReduce / Tez / Spark jobs executed over HDFS.')
];

// 35. Information Security & Ethical Hacking (IS - Sem 4-1)
const isBank: Question[] = [
  createQuestion('is-q1', 'Which security vulnerability occurs when user input is concatenated directly into SQL queries without sanitization?', ['SQL Injection (SQLi)', 'Cross-Site Scripting (XSS)', 'Buffer Overflow', 'CSRF'], 0, 'EASY', 'Explanation:\n• SQL Injection allows attackers to manipulate SQL queries via unsanitized input fields (e.g. \' OR 1=1 --).'),
  createQuestion('is-q2', 'What is Cross-Site Scripting (XSS)?', ['Injecting malicious client-side JavaScript scripts into trusted web applications executed by victim browsers', 'Server hacking', 'Password cracking', 'Router spoofing'], 0, 'EASY', 'Explanation:\n• XSS executes unauthorized JavaScript in victim\'s browser session to steal cookies or session tokens.'),
  createQuestion('is-q3', 'Which command-line tool is widely used by security professionals for Network Scanning and Port Discovery?', ['Nmap', 'Wireshark', 'Metasploit', 'Burp Suite'], 0, 'EASY', 'Explanation:\n• Nmap (Network Mapper) scans IP networks to discover open ports, OS versions, and running services.'),
  createQuestion('is-q4', 'What is the purpose of Burp Suite in Ethical Hacking?', ['An integrated HTTP/HTTPS proxy platform for security testing & inspecting web application traffic', 'Password cracker', 'Virus creator', 'Compiler'], 0, 'EASY', 'Explanation:\n• Burp Suite intercepts and manipulates HTTP requests between browser and target server.'),
  createQuestion('is-q5', 'What is Cross-Site Request Forgery (CSRF)?', ['Forces an authenticated user browser to execute unwanted actions on a trusted web application', 'Stealing source code', 'Scanning ports', 'Buffer overflow'], 0, 'MODERATE', 'Explanation:\n• CSRF tricks victim\'s browser into making state-changing requests using active session cookies.'),
  createQuestion('is-q6', 'How does a Stack Buffer Overflow attack work?', ['Writing more data to a buffer on the stack than allocated, overwriting adjacent memory including Return Address', 'Overflowing hard drive', 'Sending 1000 emails', 'Brute forcing login'], 0, 'MODERATE', 'Explanation:\n• Buffer overflow overwrites saved Frame Pointer (EBP) and Return Address (EIP) to hijack CPU control flow.'),
  createQuestion('is-q7', 'What is Metasploit Framework?', ['A penetration testing platform containing thousands of pre-built exploits, payloads, and post-exploitation modules', 'Antivirus software', 'Firewall hardware', 'Network cable'], 0, 'MODERATE', 'Explanation:\n• Metasploit simplifies penetration testing by providing exploit code and shell payloads.'),
  createQuestion('is-q8', 'What mitigation prevents Cross-Site Request Forgery (CSRF) vulnerabilities?', ['Anti-CSRF Synchronizer Tokens (unique cryptographically random token per session/request)', 'Using GET requests', 'Disabling SSL', 'Storing passwords in localstorage'], 0, 'HARD', 'Explanation:\n• Server validates unique anti-CSRF token included in request headers/body before processing state changes.'),
  createQuestion('is-q9', 'What is a Zero-Day Vulnerability?', ['A software security flaw that is unknown to the vendor and has zero days of patch protection', 'A flaw fixed 0 days ago', 'A test bug', 'A hardware error'], 0, 'HARD', 'Explanation:\n• Zero-day vulnerabilities are unpatched security flaws actively exploited before developers create fixes.'),
  createQuestion('is-q10', 'What is Address Space Layout Randomization (ASLR)?', ['A memory defense mechanism that randomizes locations of stack, heap, and library memory segments to prevent code execution exploits', 'RAM cleaner', 'Disk partitioning', 'Antivirus scan'], 0, 'HARD', 'Explanation:\n• ASLR randomizes memory addresses making buffer overflow ROP payload target prediction infeasible.')
];

// 36. Cyber Security & Forensics (CSF - Sem 4-2)
const csfBank: Question[] = [
  createQuestion('csf-q1', 'What is the Chain of Custody in Digital Forensics?', ['Chronological documentation showing seizure, custody, control, transfer, and analysis of digital evidence', 'Password list', 'Encrypted file', 'Network diagram'], 0, 'EASY', 'Explanation:\n• Chain of Custody proves evidence integrity by recording who handled evidence, when, and why.'),
  createQuestion('csf-q2', 'What device must be physically connected to a suspect hard drive before creating a forensic image?', ['Hardware Write Blocker', 'USB Hub', 'Graphics Card', 'Router'], 0, 'EASY', 'Explanation:\n• Write Blockers prevent OS from writing any data or modifying timestamps on target evidence drive.'),
  createQuestion('csf-q3', 'What is Memory Forensics (RAM Analysis)?', ['Analyzing volatile memory dump to extract active processes, network connections, passwords, and unencrypted keys', 'Formatting disk', 'Defragmenting RAM', 'Deleting temp files'], 0, 'EASY', 'Explanation:\n• Memory forensics extracts live volatile memory artifacts using tools like Volatility Framework.'),
  createQuestion('csf-q4', 'What is File Carving in forensic data recovery?', ['Reconstructing files from raw disk blocks based on header/footer file signatures without file system metadata', 'Deleting partition', 'Renaming extension', 'Zipping files'], 0, 'EASY', 'Explanation:\n• File Carving searches raw disk sectors for magic numbers (e.g., JPEG `0xFFD8FFE0`) to recover deleted files.'),
  createQuestion('csf-q5', 'Which framework is the open-source industry standard for Volatile Memory (RAM) Forensics?', ['Volatility Framework', 'Wireshark', 'Nmap', 'Autopsy'], 0, 'MODERATE', 'Explanation:\n• Volatility inspects RAM dumps for process trees, DLLs, network sockets, and malware injection.'),
  createQuestion('csf-q6', 'What is Steganography?', ['Hiding secret data inside another ordinary non-secret medium (e.g. image, audio file) to conceal detection', 'Encrypting files with password', 'Formatting disk', 'Compressing video'], 0, 'MODERATE', 'Explanation:\n• Steganography conceals existence of communication (e.g., hiding text in Least Significant Bits LSB of image pixels).'),
  createQuestion('csf-q7', 'Which cryptographic hash algorithm is legally mandated to prove a forensic image is an exact bit-stream duplicate?', ['MD5 or SHA-256 Hash Matching', 'AES-128', 'RSA-2048', 'Base64'], 0, 'MODERATE', 'Explanation:\n• Original drive and forensic clone hash digests must match 100% to prove bit-stream identity.'),
  createQuestion('csf-q8', 'In Windows Forensics, what information is extracted from UserAssist registry keys?', ['History of GUI application executions, run count, and last execution timestamp', 'User password', 'Browser bookmarks', 'Printer queue'], 0, 'HARD', 'Explanation:\n• UserAssist registry keys (ROT13 encoded) track executed desktop applications and timestamps.'),
  createQuestion('csf-q9', 'What is Anti-Forensics?', ['Techniques used by attackers to thwart forensic investigation (e.g., Timestomping, data wiping, log clearing)', 'Forensic software update', 'Police training', 'Disk repair'], 0, 'HARD', 'Explanation:\n• Anti-forensics aims to manipulate, erase, or obscure digital evidence to hinder investigation.'),
  createQuestion('csf-q10', 'What is the magic byte signature (Hex) at the beginning of a PDF file?', ['0x25 0x50 0x44 0x46 (%PDF)', '0xFF 0xD8 0xFF', '0x4D 0x5A (MZ)', '0x50 0x4B 0x03 0x04 (PK)'], 0, 'HARD', 'Explanation:\n• PDF files begin with magic header bytes `%PDF` (Hex: 25 50 44 46).')
];

// 37. Distributed Systems (DistSys - Sem 4-2)
const distSysBank: Question[] = [
  createQuestion('distSys-q1', 'What is the primary objective of Consensus Algorithms (like Raft or Paxos) in Distributed Systems?', ['Ensures multiple distributed nodes agree on a single data value or state despite node failures', 'Increases network bandwidth', 'Encrypts storage', 'Formats hard drives'], 0, 'EASY', 'Explanation:\n• Consensus algorithms enable fault-tolerant state machine replication across unreliable nodes.'),
  createQuestion('distSys-q2', 'What do Lamport Logical Clocks achieve in distributed computing?', ['Establishes partial ordering of events based on "happened-before" relation (a → b) without synchronized physical clocks', 'Measures real GPS time', 'Synchronizes CPU frequency', 'Formats timestamps'], 0, 'EASY', 'Explanation:\n• Lamport timestamps order events causally using scalar counters incremented upon local events & message sends.'),
  createQuestion('distSys-q3', 'What is RPC (Remote Procedure Call)?', ['Protocol allowing a program to execute a subroutine on a remote server as if it were a local function call', 'File transfer protocol', 'Remote desktop GUI', 'Ping command'], 0, 'EASY', 'Explanation:\n• RPC abstracts network communication by letting client stubs marshal arguments to remote server stubs.'),
  createQuestion('distSys-q4', 'What is Two-Phase Commit (2PC) protocol used for?', ['Ensures atomic commit across multiple distributed database nodes in a distributed transaction', 'Faster queries', 'Disk backup', 'Sorting arrays'], 0, 'EASY', 'Explanation:\n• 2PC coordinator issues Prepare phase, then Commit/Abort phase to guarantee ACID distributed transaction properties.'),
  createQuestion('distSys-q5', 'What is Consistent Hashing used for in Distributed Caching (e.g. Memcached, Cassandra)?', ['Minimizes remapping of keys when nodes are added or removed from cluster (only K/N keys remapped)', 'Encrypts cache', 'Sorts keys alphabetically', 'Compresses data'], 0, 'MODERATE', 'Explanation:\n• Consistent hashing maps keys and nodes to a circular ring, avoiding total cache invalidation on topology changes.'),
  createQuestion('distSys-q6', 'What is Byzantine Fault Tolerance (BFT)?', ['Ability of a distributed system to function correctly even if some nodes fail arbitrarily or act maliciously', 'Crash-stop failures only', 'Single server uptime', 'Memory leak protection'], 0, 'MODERATE', 'Explanation:\n• BFT handles arbitrary/malicious (Byzantine) node failures (requires 3f + 1 total nodes to tolerate f faulty nodes).'),
  createQuestion('distSys-q7', 'In Raft Consensus Algorithm, what are the 3 roles a node can assume?', ['Leader, Follower, Candidate', 'Master, Slave, Backup', 'Client, Server, Proxy', 'Reader, Writer, Admin'], 0, 'MODERATE', 'Explanation:\n• Raft nodes cycle between Follower, Candidate (during election), and Leader (handling log replication).'),
  createQuestion('distSys-q8', 'What is Vector Clocks advantage over Lamport Logical Clocks?', ['Vector Clocks detect CAUSAL INDEPENDENCE (concurrency) between events, whereas Lamport clocks cannot', 'Vector clocks measure physical nanoseconds', 'Vector clocks are smaller', 'No advantage'], 0, 'HARD', 'Explanation:\n• Vector clocks maintain clock array V[N]; event a and b are concurrent if neither V(a) ≤ V(b) nor V(b) ≤ V(a).'),
  createQuestion('distSys-q9', 'What is Ricart-Agrawala Algorithm used for in Distributed Systems?', ['Distributed Mutual Exclusion using logical timestamps and permission requests', 'Clock synchronization', 'Load balancing', 'File replication'], 0, 'HARD', 'Explanation:\n• Ricart-Agrawala algorithm achieves mutual exclusion without central server by broadcasting timestamped REQUEST messages.'),
  createQuestion('distSys-q10', 'What is Split-Brain Problem in High Availability Clusters?', ['Cluster partition where two subsets of nodes independently assume leadership, leading to data corruption', 'CPU overheating', 'RAM failure', 'Cable disconnect'], 0, 'HARD', 'Explanation:\n• Split-brain occurs when network partition makes both halves elect their own leader, solved using Quorum requirements (N/2 + 1).')
];

// 38. Software Project Management (SPM - Sem 4-2)
const spmBank: Question[] = [
  createQuestion('spm-q1', 'What is the formula for Risk Exposure (Risk Impact Value)?', ['Risk Exposure = Risk Probability × Risk Impact Cost', 'Risk Exposure = Cost / Time', 'Risk Exposure = KLOC * 100', 'Risk Exposure = Devs + Tasks'], 0, 'EASY', 'Explanation:\n• Risk Exposure measures risk severity by multiplying probability of occurrence by cost of impact.'),
  createQuestion('spm-q2', 'What is a Burn-Down Chart in Agile Scrum project management?', ['Graphical representation of work remaining versus time left in sprint', 'List of bugs fixed', 'Employee attendance sheet', 'Server temperature log'], 0, 'EASY', 'Explanation:\n• Burn-down chart tracks remaining effort (story points) day-by-day towards sprint end.'),
  createQuestion('spm-q3', 'What is the difference between SQA (Software Quality Assurance) and SQC (Software Quality Control)?', ['SQA is process-oriented (preventing defects); SQC is product-oriented (detecting defects)', 'SQC is process-oriented', 'Both mean unit testing', 'SQA is manual testing'], 0, 'EASY', 'Explanation:\n• SQA focuses on process improvements to prevent defects; SQC inspects software deliverables to find bugs.'),
  createQuestion('spm-q4', 'What does CMMI (Capability Maturity Model Integration) Level 5 represent?', ['Optimizing (Focus on continuous process improvement & innovation)', 'Initial', 'Managed', 'Defined'], 0, 'EASY', 'Explanation:\n• CMMI Level 5 is the highest maturity level focused on continuous quantitative process improvement.'),
  createQuestion('spm-q5', 'What is Scope Creep in Software Project Management?', ['Uncontrolled expansion of project scope without adjustments to time, cost, or resources', 'Shrinking scope', 'Firing developers', 'Completing project early'], 0, 'MODERATE', 'Explanation:\n• Scope Creep occurs when continuous feature additions degrade budget and schedule without formal change request.'),
  createQuestion('spm-q6', 'In COCOMO II model, what does Early Design Model estimate?', ['Effort based on Function Points or Object Points during initial architectural phase', 'Lines of code after delivery', 'Bug count', 'Hardware cost'], 0, 'MODERATE', 'Explanation:\n• COCOMO II Early Design model estimates project cost before detailed code sizing is available.'),
  createQuestion('spm-q7', 'What are the 4 types of Software Maintenance?', ['Corrective, Adaptive, Perfective, Preventive', 'Initial, Final, Test, Deploy', 'Quick, Slow, Hard, Soft', 'Local, Cloud, Web, Mobile'], 0, 'MODERATE', 'Explanation:\n• Software Maintenance: Corrective (fix bugs), Adaptive (OS updates), Perfective (enhance performance), Preventive (rearchitect).'),
  createQuestion('spm-q8', 'What is Cost Variance (CV) in Earned Value Management?', ['CV = Earned Value (EV) - Actual Cost (AC)', 'CV = EV / AC', 'CV = PV - EV', 'CV = BAC - AC'], 0, 'HARD', 'Explanation:\n• Cost Variance CV = EV - AC. Positive CV indicates project is under budget.'),
  createQuestion('spm-q9', 'What is the difference between ISO 9001 and CMMI certification?', ['ISO 9001 applies broadly to general quality management; CMMI is specifically tailored to software process engineering', 'ISO 9001 is for software only', 'CMMI is a government tax', 'Identical'], 0, 'HARD', 'Explanation:\n• ISO 9001 sets general quality system standards; CMMI assesses software engineering maturity levels.'),
  createQuestion('spm-q10', 'What is Function Point Unadjusted Function Point (UFP) counting parameters?', ['Inputs, Outputs, Inquiries, Internal Logical Files (ILF), External Interface Files (EIF)', 'Classes, Methods, Variables, Loops', 'Bytes, Bits, RAM, CPU', 'Pages, Views, Buttons'], 0, 'HARD', 'Explanation:\n• FPA calculates UFP across 5 functional components: External Inputs, Outputs, Inquiries, ILFs, and EIFs.')
];

// 39. Prompt Engineering & Generative AI (PromptEng - Sem 4-2)
const promptEngBank: Question[] = [
  createQuestion('promptEng-q1', 'What is Few-Shot Prompting in Large Language Models (LLMs)?', ['Providing a few explicit input-output examples in the prompt to demonstrate desired behavior', 'Zero examples provided', 'Training model for 100 epochs', 'Deleting prompt history'], 0, 'EASY', 'Explanation:\n• Few-shot prompting guides LLM output format by demonstrating sample input-output pairs in prompt context.'),
  createQuestion('promptEng-q2', 'What is Chain-of-Thought (CoT) Prompting?', ['Prompting LLM to break down complex reasoning into explicit step-by-step intermediate thoughts ("Let\'s think step by step")', 'Chaining multiple API calls', 'Concatenating strings', 'Recursive functions'], 0, 'EASY', 'Explanation:\n• Chain-of-Thought improves reasoning accuracy by instructing LLM to generate explicit intermediate steps.'),
  createQuestion('promptEng-q3', 'What is Retrieval-Augmented Generation (RAG)?', ['Combining vector database semantic search to fetch relevant context documents and feeding them into LLM prompt', 'Fine-tuning weights', 'Generating random images', 'Translating code'], 0, 'EASY', 'Explanation:\n• RAG grounds LLM responses on external domain-specific knowledge retrieved from vector stores, reducing hallucinations.'),
  createQuestion('promptEng-q4', 'What does the LLM Temperature parameter control during output generation?', ['Randomness & Creativity of token selection (0.0 = deterministic/focused, 1.0 = creative/diverse)', 'GPU heat level', 'Response speed', 'Token limit'], 0, 'EASY', 'Explanation:\n• Temperature scales logit probability distribution: low values pick top tokens deterministically; high values increase randomness.'),
  createQuestion('promptEng-q5', 'What is the ReAct (Reason + Act) Agent Framework?', ['Combines LLM reasoning traces with action execution (e.g. calling search API, running calculator) in an iterative loop', 'React.js web framework', 'State management', 'CSS styling'], 0, 'MODERATE', 'Explanation:\n• ReAct enables autonomous AI agents to alternate between Thought, Action (tool call), and Observation steps.'),
  createQuestion('promptEng-q6', 'What is Prompt Injection Attack?', ['Manipulating LLM behavior by injecting malicious user inputs that override system instructions/guardrails', 'SQL database hack', 'Buffer overflow', 'XSS attack'], 0, 'MODERATE', 'Explanation:\n• Prompt injection tricks LLM into ignoring system prompt rules by inserting adversarial text instructions.'),
  createQuestion('promptEng-q7', 'What is LoRA (Low-Rank Adaptation) in LLM Fine-Tuning?', ['A Parameter-Efficient Fine-Tuning (PEFT) method that freezes original model weights and injects trainable rank decomposition matrices', 'Training model from scratch', 'Quantization to 1 bit', 'Deleting layers'], 0, 'MODERATE', 'Explanation:\n• LoRA drastically reduces trainable parameters and GPU RAM requirements during fine-tuning by approximating weight updates ΔW = A × B.'),
  createQuestion('promptEng-q8', 'What is Vector Embedding in AI context?', ['High-dimensional dense vector representation of text/images capturing semantic meaning in vector space', 'Base64 string', 'Binary hash', 'Regular expression'], 0, 'HARD', 'Explanation:\n• Embeddings map text concepts to numerical vectors where distance (cosine similarity) measures semantic closeness.'),
  createQuestion('promptEng-q9', 'What is Semantic Search in Vector Databases (e.g. Pinecone, ChromaDB)?', ['Searching data based on conceptual meaning using vector similarity (Cosine Distance) rather than exact keyword match', 'SQL LIKE query', 'Regex search', 'Binary search'], 0, 'HARD', 'Explanation:\n• Semantic search finds relevant documents matching query intent via nearest neighbor vector similarity (k-NN / HNSW).'),
  createQuestion('promptEng-q10', 'What is Hallucination in Large Language Models?', ['LLM generating plausible-sounding but factually incorrect or ungrounded assertions confidentially', 'GPU crash', 'Timeout error', 'Syntax error'], 0, 'HARD', 'Explanation:\n• Hallucination occurs when LLM outputs false facts not backed by training data or provided context.')
];

// 40. Natural Language Processing (NLP - Sem 4-2)
const nlpBank: Question[] = [
  createQuestion('nlp-q1', 'What is the difference between Stemming and Lemmatization in NLP text preprocessing?', ['Stemming chops off word suffixes heuristically; Lemmatization uses vocabulary/morphology to return valid dictionary root word (lemma)', 'Stemming uses dictionary', 'Lemmatization is faster', 'Identical'], 0, 'EASY', 'Explanation:\n• Stemming (e.g. Porter Stemmer) cuts word endings; Lemmatization (e.g. WordNet) yields actual morphological base words.'),
  createQuestion('nlp-q2', 'What does TF-IDF (Term Frequency-Inverse Document Frequency) measure in Information Retrieval?', ['Importance of a word to a document relative to a corpus of documents', 'Word count only', 'Grammar correctness', 'Sentence length'], 0, 'EASY', 'Explanation:\n• TF-IDF weighs frequent terms in a document high, while penalizing terms common across all documents (e.g., "the").'),
  createQuestion('nlp-q3', 'Which Word Embedding model introduced Skip-gram and Continuous Bag of Words (CBOW) architectures?', ['Word2Vec (Mikolov et al. 2013)', 'TF-IDF', 'One-Hot Encoding', 'CountVectorizer'], 0, 'EASY', 'Explanation:\n• Word2Vec uses neural network context prediction to learn dense vector embeddings.'),
  createQuestion('nlp-q4', 'What is Named Entity Recognition (NER)?', ['Classifying proper names in text into predefined categories like Person, Organization, Location, Date', 'Grammar checking', 'Language translation', 'Sentiment scoring'], 0, 'EASY', 'Explanation:\n• NER identifies and tags entity mentions (e.g. "Google" -> ORG, "London" -> LOC).'),
  createQuestion('nlp-q5', 'What is the primary innovation of BERT (Bidirectional Encoder Representations from Transformers)?', ['Pre-trains deep bidirectional representations using Masked Language Modeling (MLM) on unannotated text', 'Unidirectional processing', 'Generates text autoregressively', 'Uses CNNs'], 0, 'MODERATE', 'Explanation:\n• BERT considers left and right context simultaneously across all Transformer layers.'),
  createQuestion('nlp-q6', 'What evaluation metric is standard for Machine Translation quality assessment against reference translations?', ['BLEU Score (Bilingual Evaluation Understudy)', 'ROUGE', 'F1 Score', 'Accuracy'], 0, 'MODERATE', 'Explanation:\n• BLEU score measures n-gram precision overlap between machine translation output and human references.'),
  createQuestion('nlp-q7', 'What evaluation metric is standard for Automatic Text Summarization?', ['ROUGE (Recall-Oriented Understudy for Gisting Evaluation)', 'BLEU', 'Perplexity', 'MSE'], 0, 'MODERATE', 'Explanation:\n• ROUGE measures n-gram, word-sequence, and word-pair recall overlap for text summaries.'),
  createQuestion('nlp-q8', 'What is Perplexity in Language Modeling evaluation?', ['Exponentiated average negative log-likelihood per word; lower perplexity indicates better language model prediction', 'Higher perplexity is better', 'Memory usage', 'Training time'], 0, 'HARD', 'Explanation:\n• Perplexity PPL = exp(Cross-Entropy Loss). Lower perplexity means model is less surprised by text sample.'),
  createQuestion('nlp-q9', 'What is Self-Attention formula in Transformer networks?', ['Attention(Q, K, V) = Softmax( (Q Kᵀ) / √d_k ) V', 'Q + K + V', 'Softmax(Q * K)', 'Q / V'], 0, 'HARD', 'Explanation:\n• Scaled Dot-Product Attention computes Softmax( (Q Kᵀ) / √d_k ) V to weight values V by query-key similarity.'),
  createQuestion('nlp-q10', 'What is the difference between Autoregressive LLMs (e.g. GPT) and Autoencoding LLMs (e.g. BERT)?', ['GPT is Decoder-only predicting NEXT token sequentially; BERT is Encoder-only predicting MASKED tokens bidirectionally', 'BERT generates text', 'GPT cannot summarize', 'Both are identical'], 0, 'HARD', 'Explanation:\n• Autoregressive models (GPT) use causal attention masks for text generation; Autoencoding models (BERT) use bidirectional attention for classification/extraction.')
];

// ---------------------------------------------------------
// UPDATED B.TECH SUBJECT CATALOG (BVCEC R23 PATTERN)
// Sem 1-1: 4 Core Subjects (LAC, Chemistry, C Programming, BCME)
// Sem 1-2: 5 Core Subjects (Applied Physics, M-2, BEEE, Data Structures, Communicative English)
// Sem 2-1: 5 Core Subjects (DMGT, DBMS, Java, ADS, UHV)
// Sem 2-2: 6 Core Subjects (Python, TOC, COA, OS, SE, MEFA)
// Sem 3-1: 5 Core Subjects (CN, ML, EDA, FSD-II, AI)
// Sem 3-2: 5 Core Subjects (MPMC, CNS, DWDM, Cloud, PE)
// Sem 4-1: 5 Core Subjects (DevOps, DL, HRPM, BDA, IS)
// Sem 4-2: 5 Core Subjects (CSF, DistSys, SPM, PromptEng, NLP)
// ---------------------------------------------------------
export const subjectsData: Subject[] = [
  // ================= SEMESTER 1-1 (Year 1, Sem 1 - 4 CORE SUBJECTS) =================
  {
    id: 'lac',
    name: 'Linear Algebra & Calculus (LAC)',
    code: 'BS1101',
    year: 1,
    semester: 1,
    semesterCode: '1-1',
    description: 'Matrices, Rank, Eigenvalues, Cayley-Hamilton Theorem, Mean Value Theorems & Multiple Integrals',
    iconName: 'FunctionSquare',
    colorTheme: 'from-blue-600 to-indigo-600',
    lessons: createLessonsForSubject('lac', defaultModuleTemplate('Linear Algebra & Calculus'), lacBank)
  },
  {
    id: 'chem',
    name: 'Applied Chemistry',
    code: 'BS1102',
    year: 1,
    semester: 1,
    semesterCode: '1-1',
    description: 'Water Technology, Electrochemistry, Corrosion, Polymer Materials & Engineering Energy Sources',
    iconName: 'Cpu',
    colorTheme: 'from-violet-600 to-purple-600',
    lessons: createLessonsForSubject('chem', defaultModuleTemplate('Applied Chemistry'), chemBank)
  },
  {
    id: 'c-prog',
    name: 'C Programming & Problem Solving',
    code: 'CS1101',
    year: 1,
    semester: 1,
    semesterCode: '1-1',
    description: 'Problem Solving in C - Syntax, Operators, Control Flow, Pointers, Arrays & Dynamic Memory',
    iconName: 'Code',
    colorTheme: 'from-cyan-600 to-blue-600',
    lessons: createLessonsForSubject('c-prog', defaultModuleTemplate('C Programming'), cProgBank)
  },
  {
    id: 'bcme',
    name: 'Basic Civil & Mechanical Engg (BCME)',
    code: 'ES1101',
    year: 1,
    semester: 1,
    semesterCode: '1-1',
    description: 'Engineering Surveying, Building Materials, IC Engines, Power Plants & Mechanical Manufacturing',
    iconName: 'GitMerge',
    colorTheme: 'from-amber-600 to-orange-600',
    lessons: createLessonsForSubject('bcme', defaultModuleTemplate('Basic Civil & Mechanical Engg'), bcmeBank)
  },

  // ================= SEMESTER 1-2 (Year 1, Sem 2 - 5 CORE SUBJECTS) =================
  {
    id: 'phy',
    name: 'Applied Physics',
    code: 'BS1201',
    year: 1,
    semester: 2,
    semesterCode: '1-2',
    description: 'Wave Optics, Quantum Mechanics, Free Electron Theory, Semiconductors & Lasers',
    iconName: 'Cpu',
    colorTheme: 'from-purple-600 to-violet-600',
    lessons: createLessonsForSubject('phy', defaultModuleTemplate('Applied Physics'), phyBank)
  },
  {
    id: 'm2',
    name: 'Mathematics-II (M-2)',
    code: 'BS1202',
    year: 1,
    semester: 2,
    semesterCode: '1-2',
    description: 'Differential Equations, Higher Order ODEs, Laplace Transforms & Vector Calculus',
    iconName: 'FunctionSquare',
    colorTheme: 'from-indigo-600 to-blue-600',
    lessons: createLessonsForSubject('m2', defaultModuleTemplate('Mathematics-II'), m2Bank)
  },
  {
    id: 'beee',
    name: 'Basic Electrical & Electronics (BEEE)',
    code: 'ES1201',
    year: 1,
    semester: 2,
    semesterCode: '1-2',
    description: 'DC & AC Circuits, Transformers, Electrical Machines, Diodes & Transistor Amplifiers',
    iconName: 'Cpu',
    colorTheme: 'from-teal-600 to-emerald-600',
    lessons: createLessonsForSubject('beee', defaultModuleTemplate('Basic Electrical & Electronics'), beeeBank)
  },
  {
    id: 'ds-c',
    name: 'Data Structures (DS)',
    code: 'CS1201',
    year: 1,
    semester: 2,
    semesterCode: '1-2',
    description: 'Stacks, Queues, Linked Lists, Trees, Graphs, Searching & Sorting in C++',
    iconName: 'GitMerge',
    colorTheme: 'from-emerald-600 to-cyan-600',
    lessons: createLessonsForSubject('ds-c', defaultModuleTemplate('Data Structures'), dsBank)
  },
  {
    id: 'eng',
    name: 'Communicative English',
    code: 'HS1201',
    year: 1,
    semester: 2,
    semesterCode: '1-2',
    description: 'Vocabulary Building, Grammar Standards, Professional Technical Writing & Reading Comprehension',
    iconName: 'HeartHandshake',
    colorTheme: 'from-rose-600 to-pink-600',
    lessons: createLessonsForSubject('eng', defaultModuleTemplate('Communicative English'), engBank)
  },

  // ================= SEMESTER 2-1 (Year 2, Sem 1 - 5 CORE SUBJECTS) =================
  {
    id: 'dmgt',
    name: 'Discrete Mathematics & Graph Theory (DMGT)',
    code: 'CS2101',
    year: 2,
    semester: 3,
    semesterCode: '2-1',
    description: 'Propositional Logic, Set Theory, Recurrence Relations, Graph Isomorphism & Group Theory',
    iconName: 'FunctionSquare',
    colorTheme: 'from-purple-600 to-indigo-600',
    lessons: createLessonsForSubject('dmgt', defaultModuleTemplate('Discrete Mathematics'), dmgtBank)
  },
  {
    id: 'dbms',
    name: 'Database Management Systems (DBMS)',
    code: 'CS2102',
    year: 2,
    semester: 3,
    semesterCode: '2-1',
    description: 'ER Modeling, SQL, Normalization (1NF-BCNF), ACID Transactions & B+ Tree Indexing',
    iconName: 'Database',
    colorTheme: 'from-blue-600 to-cyan-600',
    lessons: createLessonsForSubject('dbms', defaultModuleTemplate('DBMS'), dbmsBank)
  },
  {
    id: 'java',
    name: 'Java Programming (JAVA)',
    code: 'CS2103',
    year: 2,
    semester: 3,
    semesterCode: '2-1',
    description: 'OOP Principles, Exception Handling, Multithreading, Collections Framework & Streams API',
    iconName: 'Code',
    colorTheme: 'from-amber-600 to-orange-600',
    lessons: createLessonsForSubject('java', defaultModuleTemplate('Java Programming'), javaBank)
  },
  {
    id: 'ads',
    name: 'Advanced Data Structures (ADS)',
    code: 'CS2104',
    year: 2,
    semester: 3,
    semesterCode: '2-1',
    description: 'Asymptotic Analysis, AVL Trees, Red-Black Trees, Graph Algorithms & Dynamic Programming',
    iconName: 'GitMerge',
    colorTheme: 'from-emerald-600 to-teal-600',
    lessons: createLessonsForSubject('ads', defaultModuleTemplate('Advanced Data Structures'), adsBank)
  },
  {
    id: 'uhv',
    name: 'Universal Human Values (UHV)',
    code: 'HS2101',
    year: 2,
    semester: 3,
    semesterCode: '2-1',
    description: 'Self-Exploration, Natural Acceptance, Harmony in Self, Family, Society & Nature (R.R. Gaur)',
    iconName: 'HeartHandshake',
    colorTheme: 'from-rose-600 to-pink-600',
    lessons: createLessonsForSubject('uhv', defaultModuleTemplate('Universal Human Values'), uhvBank)
  },

  // ================= SEMESTER 2-2 (Year 2, Sem 2 - 6 CORE SUBJECTS) =================
  {
    id: 'python',
    name: 'Python Programming',
    code: 'CS2205',
    year: 2,
    semester: 4,
    semesterCode: '2-2',
    description: 'Python Data Structures, OOP, Modules, Lambda Expressions & Data Science Libraries',
    iconName: 'Code',
    colorTheme: 'from-amber-600 to-yellow-600',
    lessons: createLessonsForSubject('python', defaultModuleTemplate('Python Programming'), pythonBank)
  },
  {
    id: 'toc',
    name: 'Theory of Computation / Automata (FLAT)',
    code: 'CS2201',
    year: 2,
    semester: 4,
    semesterCode: '2-2',
    description: 'DFA, NFA, Regular Expressions, Context-Free Grammars, Pushdown Automata & Turing Machines',
    iconName: 'FunctionSquare',
    colorTheme: 'from-indigo-600 to-purple-600',
    lessons: createLessonsForSubject('toc', defaultModuleTemplate('Theory of Computation'), tocBank)
  },
  {
    id: 'coa',
    name: 'Computer Organization & Architecture (COA)',
    code: 'CS2202',
    year: 2,
    semester: 4,
    semesterCode: '2-2',
    description: 'Instruction Set Architecture, Pipelining, Cache Memory Mapping & Microprogram Control',
    iconName: 'Cpu',
    colorTheme: 'from-cyan-600 to-teal-600',
    lessons: createLessonsForSubject('coa', defaultModuleTemplate('Computer Organization'), coaBank)
  },
  {
    id: 'os',
    name: 'Operating Systems (OS)',
    code: 'CS2203',
    year: 2,
    semester: 4,
    semesterCode: '2-2',
    description: 'Process Management, CPU Scheduling, Mutex/Semaphores, Virtual Memory & File Systems',
    iconName: 'Cpu',
    colorTheme: 'from-rose-600 to-pink-600',
    lessons: createLessonsForSubject('os', defaultModuleTemplate('Operating Systems'), osBank)
  },
  {
    id: 'se',
    name: 'Software Engineering (SE)',
    code: 'CS2204',
    year: 2,
    semester: 4,
    semesterCode: '2-2',
    description: 'SDLC Models, Agile Methodology, Software Requirements, UML Diagrams & Testing Techniques',
    iconName: 'GitMerge',
    colorTheme: 'from-blue-600 to-indigo-600',
    lessons: createLessonsForSubject('se', defaultModuleTemplate('Software Engineering'), seBank)
  },
  {
    id: 'mefa',
    name: 'Managerial Economics & Financial Analysis (MEFA)',
    code: 'HS2201',
    year: 2,
    semester: 4,
    semesterCode: '2-2',
    description: 'Demand Analysis, Production & Cost, Market Structures, Capital Budgeting & Financial Ratios',
    iconName: 'Database',
    colorTheme: 'from-amber-600 to-orange-600',
    lessons: createLessonsForSubject('mefa', defaultModuleTemplate('Managerial Economics'), mefaBank)
  },

  // ================= SEMESTER 3-1 (Year 3, Sem 1) =================
  {
    id: 'cn',
    name: 'Computer Networks',
    code: '23AD5T03',
    year: 3,
    semester: 5,
    semesterCode: '3-1',
    description: 'OSI & TCP/IP Models, Subnetting, OSPF/BGP Routing, TCP 3-Way Handshake & Application Protocols',
    iconName: 'Network',
    colorTheme: 'from-blue-600 to-teal-600',
    lessons: createLessonsForSubject('cn', defaultModuleTemplate('Computer Networks'), cnBank)
  },
  {
    id: 'ml',
    name: 'Machine Learning',
    code: '23AD6T05',
    year: 3,
    semester: 5,
    semesterCode: '3-1',
    description: 'Supervised Learning, Regression, Decision Trees, SVM, Clustering & Neural Network Foundations',
    iconName: 'Cpu',
    colorTheme: 'from-emerald-600 to-lime-600',
    lessons: createLessonsForSubject('ml', defaultModuleTemplate('Machine Learning'), mlBank)
  },
  {
    id: 'eda',
    name: 'Exploratory Data Analysis (EDA)',
    code: '23AD5D03',
    year: 3,
    semester: 5,
    semesterCode: '3-1',
    description: 'Data Cleaning, Statistical Summaries, Data Visualization, Feature Engineering & Pattern Mining',
    iconName: 'Database',
    colorTheme: 'from-cyan-600 to-blue-600',
    lessons: createLessonsForSubject('eda', defaultModuleTemplate('Exploratory Data Analysis'), edaBank)
  },
  {
    id: 'fsd2',
    name: 'Full Stack Development (FSD-II)',
    code: '23CS5S06',
    year: 3,
    semester: 5,
    semesterCode: '3-1',
    description: 'Modern Web Applications - React.js Hooks, Node.js Express Backend, REST APIs & JWT Security',
    iconName: 'Code',
    colorTheme: 'from-purple-600 to-indigo-600',
    lessons: createLessonsForSubject('fsd2', defaultModuleTemplate('Full Stack Development II'), fsdBank)
  },
  {
    id: 'ai',
    name: 'Artificial Intelligence',
    code: '23AD5T02',
    year: 3,
    semester: 5,
    semesterCode: '3-1',
    description: 'Problem Solving Agents, Search Algorithms (A*, Minimax), Knowledge Representation & Expert Systems',
    iconName: 'Cpu',
    colorTheme: 'from-rose-600 to-pink-600',
    lessons: createLessonsForSubject('ai', defaultModuleTemplate('Artificial Intelligence'), aiBank)
  },

  // ================= SEMESTER 3-2 (Year 3, Sem 2) =================
  {
    id: 'mpmc',
    name: 'Microprocessors & Microcontrollers (MPMC)',
    code: '23AD6D06',
    year: 3,
    semester: 6,
    semesterCode: '3-2',
    description: '8086 Architecture, Assembly Language Programming, 8051 Microcontroller & Interfacing Devices',
    iconName: 'Cpu',
    colorTheme: 'from-teal-600 to-emerald-600',
    lessons: createLessonsForSubject('mpmc', defaultModuleTemplate('Microprocessors & Microcontrollers'), mpmcBank)
  },
  {
    id: 'cns',
    name: 'Cryptography & Network Security (CNS)',
    code: 'CS3202',
    year: 3,
    semester: 6,
    semesterCode: '3-2',
    description: 'Symmetric & Asymmetric Encryption (AES, RSA), Hash Functions (SHA-256), Digital Signatures & Firewalls',
    iconName: 'Network',
    colorTheme: 'from-amber-600 to-red-600',
    lessons: createLessonsForSubject('cns', defaultModuleTemplate('Cryptography & Network Security'), cnsBank)
  },
  {
    id: 'dwdm',
    name: 'Data Warehousing & Data Mining (DWDM)',
    code: 'CS3203',
    year: 3,
    semester: 6,
    semesterCode: '3-2',
    description: 'ETL Pipelines, OLAP Cubes, Association Rule Mining (Apriori), Classification & Clustering',
    iconName: 'Database',
    colorTheme: 'from-indigo-600 to-violet-600',
    lessons: createLessonsForSubject('dwdm', defaultModuleTemplate('Data Warehousing & Data Mining'), dwdmBank)
  },
  {
    id: 'cloud',
    name: 'Cloud Computing',
    code: 'CS3204',
    year: 3,
    semester: 6,
    semesterCode: '3-2',
    description: 'IaaS, PaaS, SaaS Service Models, Virtualization, AWS/Azure Infrastructure & Serverless Computing',
    iconName: 'Cpu',
    colorTheme: 'from-cyan-600 to-blue-600',
    lessons: createLessonsForSubject('cloud', defaultModuleTemplate('Cloud Computing'), cloudBank)
  },
  {
    id: 'pe',
    name: 'Professional Ethics & Cyber Laws',
    code: 'HS3201',
    year: 3,
    semester: 6,
    semesterCode: '3-2',
    description: 'Engineering Ethics, Intellectual Property Rights (IPR), IT Act 2000 & Cyber Crime Regulations',
    iconName: 'HeartHandshake',
    colorTheme: 'from-rose-600 to-pink-600',
    lessons: createLessonsForSubject('pe', defaultModuleTemplate('Professional Ethics'), peBank)
  },

  // ================= SEMESTER 4-1 (Year 4, Sem 1) =================
  {
    id: 'devops',
    name: 'DevOps',
    code: '23AD7D09',
    year: 4,
    semester: 7,
    semesterCode: '4-1',
    description: 'CI/CD Pipelines, Git Version Control, Docker Containerization, Kubernetes Orchestration & Jenkins',
    iconName: 'GitMerge',
    colorTheme: 'from-rose-600 to-red-600',
    lessons: createLessonsForSubject('devops', defaultModuleTemplate('DevOps'), devopsBank)
  },
  {
    id: 'dl',
    name: 'Deep Learning',
    code: '23CS7T13',
    year: 4,
    semester: 7,
    semesterCode: '4-1',
    description: 'Neural Network Architectures, CNNs for Vision, LSTMs for Sequences, Transformers & PyTorch Framework',
    iconName: 'Cpu',
    colorTheme: 'from-red-600 to-pink-600',
    lessons: createLessonsForSubject('dl', defaultModuleTemplate('Deep Learning'), dlBank)
  },
  {
    id: 'hrpm',
    name: 'Human Resource & Project Management',
    code: '23HM7T07',
    year: 4,
    semester: 7,
    semesterCode: '4-1',
    description: 'Organizational Behavior, Talent Acquisition, Project Scheduling (CPM/PERT) & Risk Assessment',
    iconName: 'HeartHandshake',
    colorTheme: 'from-indigo-600 to-blue-600',
    lessons: createLessonsForSubject('hrpm', defaultModuleTemplate('Human Resource & Project Management'), hrpmBank)
  },
  {
    id: 'bda',
    name: 'Big Data Analytics',
    code: 'CS4101',
    year: 4,
    semester: 7,
    semesterCode: '4-1',
    description: 'Hadoop HDFS Architecture, MapReduce Engine, Apache Spark RDDs & NoSQL Columnar Stores',
    iconName: 'Database',
    colorTheme: 'from-amber-600 to-orange-600',
    lessons: createLessonsForSubject('bda', defaultModuleTemplate('Big Data Analytics'), bdaBank)
  },
  {
    id: 'is',
    name: 'Information Security & Ethical Hacking',
    code: 'CS4102',
    year: 4,
    semester: 7,
    semesterCode: '4-1',
    description: 'Vulnerability Analysis, Penetration Testing, Web Security (OWASP Top 10) & Intrusion Detection',
    iconName: 'Network',
    colorTheme: 'from-purple-600 to-indigo-600',
    lessons: createLessonsForSubject('is', defaultModuleTemplate('Information Security'), isBank)
  },

  // ================= SEMESTER 4-2 (Year 4, Sem 2) =================
  {
    id: 'csf',
    name: 'Cyber Security & Forensics',
    code: 'CS4201',
    year: 4,
    semester: 8,
    semesterCode: '4-2',
    description: 'Digital Forensics Investigation, Disk Imaging, Memory Forensics, Malware Analysis & Evidence Law',
    iconName: 'Cpu',
    colorTheme: 'from-blue-600 to-cyan-600',
    lessons: createLessonsForSubject('csf', defaultModuleTemplate('Cyber Security & Forensics'), csfBank)
  },
  {
    id: 'dist-sys',
    name: 'Distributed Systems',
    code: 'CS4202',
    year: 4,
    semester: 8,
    semesterCode: '4-2',
    description: 'Distributed Consensus (Raft/Paxos), Clock Synchronization, RPC/RMI Protocols & Fault Tolerance',
    iconName: 'Network',
    colorTheme: 'from-purple-600 to-indigo-600',
    lessons: createLessonsForSubject('dist-sys', defaultModuleTemplate('Distributed Systems'), distSysBank)
  },
  {
    id: 'spm',
    name: 'Software Project Management',
    code: 'CS4203',
    year: 4,
    semester: 8,
    semesterCode: '4-2',
    description: 'Project Planning, Cost Estimation (COCOMO), Agile Scrum Sprints & Quality Assurance',
    iconName: 'GitMerge',
    colorTheme: 'from-teal-600 to-emerald-600',
    lessons: createLessonsForSubject('spm', defaultModuleTemplate('Software Project Management'), spmBank)
  },
  {
    id: 'prompt-eng',
    name: 'Prompt Engineering & Generative AI',
    code: 'CS4204',
    year: 4,
    semester: 8,
    semesterCode: '4-2',
    description: 'LLM Fine-Tuning, RAG Architecture, Vector Databases & Enterprise Prompt Optimization',
    iconName: 'Code',
    colorTheme: 'from-amber-600 to-orange-600',
    lessons: createLessonsForSubject('prompt-eng', defaultModuleTemplate('Prompt Engineering & Generative AI'), promptEngBank)
  },
  {
    id: 'nlp',
    name: 'Natural Language Processing (NLP)',
    code: 'CS4205',
    year: 4,
    semester: 8,
    semesterCode: '4-2',
    description: 'Text Tokenization, N-grams, Word Embeddings (Word2Vec), Sentiment Analysis & Sequence Models',
    iconName: 'Cpu',
    colorTheme: 'from-pink-600 to-rose-600',
    lessons: createLessonsForSubject('nlp', defaultModuleTemplate('Natural Language Processing'), nlpBank)
  }
];

// Student Leaderboard Initial Database
export const initialLeaderboardData: LeaderboardEntry[] = [];
