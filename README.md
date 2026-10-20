# 🎓 AcademiaQuiz &mdash; B.Tech Online Quiz & Real-Time Leaderboard System

[![Live Demo](https://img.shields.io/badge/Demo-Live%20on%20GitHub%20Pages-4F46E5?logo=githubpages&logoColor=white)](https://sritejamallula.github.io/online-quiz/)
[![Download Project Report PDF](https://img.shields.io/badge/Project%20Report-Print%20PDF%20(16%20Pages)-10B981?logo=adobeacrobatreader&logoColor=white)](AcademiaQuiz_Project_Report_Print.pdf)
[![Download Technical Docs PDF](https://img.shields.io/badge/Technical%20Spec-PDF%20(9%20Pages)-6366F1?logo=adobeacrobatreader&logoColor=white)](AcademiaQuiz_System_Documentation.pdf)
[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

> 🌐 **Production Web Application**: [https://sritejamallula.github.io/online-quiz/](https://sritejamallula.github.io/online-quiz/)  
> 📄 **Academic Project Report (16-Page Print Edition for Lecturers)**: [AcademiaQuiz_Project_Report_Print.pdf](AcademiaQuiz_Project_Report_Print.pdf)  
> 📑 **Technical System Specification (9-Page Executive Summary)**: [AcademiaQuiz_System_Documentation.pdf](AcademiaQuiz_System_Documentation.pdf)  
> 🏛️ **Institutional Affiliation**: BVC Engineering College (Autonomous), Odalarevu &bull; JNTUK R23 Pattern  
> 👨‍🎓 **Candidate**: Sriteja Mallula (Dept of Computer Science & Engineering)  

---

## 1. Executive Summary

**AcademiaQuiz** is a responsive, multi-device academic evaluation and ranking platform designed for engineering undergraduates. It provides:
1. **Zero Dummy Users**: No hardcoded mock profiles or simulated scores. Only real classmates who register on their phones, laptops, or desktops appear.
2. **Real-Time Cross-Device Cloud Sync**: Continuous synchronization of registrations and quiz submissions across all connected devices using an active REST cloud database.
3. **8-Semester Engineering Curriculum**: 40 theory core subjects mapped from Semester 1-1 to Semester 4-2, each with subject-accurate 10-question evaluation quizzes and step-by-step technical explanations.
4. **Dynamic Leaderboard & Podium**: Real-time rank calculation and metallic 3D podium for top scorers, plus a complete searchable roster of all enrolled classmates.
5. **Faculty Management Portal**: Class analytics, submission logs, and assessment controls (timer duration, pass mark, negative marking).

---

## 2. System Architecture

```
┌────────────────────────────────────────────────────────────────────────┐
│                        User Browser Clients                            │
│  ┌───────────────────────┐             ┌────────────────────────────┐  │
│  │   Mobile Browser      │             │     Laptop / Desktop       │  │
│  │  (Student in Class)   │             │   (Faculty / Student)      │  │
│  └───────────┬───────────┘             └─────────────┬──────────────┘  │
└──────────────┼───────────────────────────────────────┼─────────────────┘
               │                                       │
               ▼                                       ▼
┌────────────────────────────────────────────────────────────────────────┐
│               AcademiaQuiz Single Page Application (SPA)               │
│                                                                        │
│   ┌────────────────────────────────────────────────────────────────┐   │
│   │                      React Context State                       │   │
│   │   - registeredStudents: StudentProfile[]                       │   │
│   │   - quizAttempts: QuizAttempt[]                                │   │
│   │   - currentStudent / facultyMode                               │   │
│   │   - activeSubject / currentQuiz / activeSemester               │   │
│   └──────────────────────────────┬─────────────────────────────────┘   │
│                                  │                                     │
│   ┌──────────────────────────────▼─────────────────────────────────┐   │
│   │                   CloudSync Service Layer                      │   │
│   │   - BroadcastChannel ("quiz_sync_channel")                     │   │
│   │   - Deduplication & Conflict-Free Merge Rules                  │   │
│   │   - Debounced REST Pushes & Polling Engine (8s cycle)          │   │
│   └──────────────────────────────┬─────────────────────────────────┘   │
└──────────────────────────────────┼─────────────────────────────────────┘
                                   │ HTTPS GET / PUT
                                   ▼
┌────────────────────────────────────────────────────────────────────────┐
│                Cloud REST Persistence Backend                          │
│               (https://api.restful-api.dev/objects/...)                │
│                                                                        │
│    Payload:                                                            │
│    {                                                                   │
│      "registeredStudents": [ { rollNumber, name, branch, ... } ],      │
│      "quizAttempts": [ { id, studentRoll, quizId, score, ... } ],      │
│      "lastSyncedAt": "2026-10-20T..."                                  │
│    }                                                                   │
└────────────────────────────────────────────────────────────────────────┘
```

---

## 3. Real-Time Cloud Sync Engine (`cloudSync.ts`)

### Core Functionality
- **Endpoint**: `https://api.restful-api.dev/objects/ff808181a09d98f701a15976d9952db0`
- **Methodology**: HTTP REST `GET` (Fetch) and `PUT` (Mutate) with stringified JSON payload encapsulation (`data.payload`).
- **CORS Handling**: Native `Access-Control-Allow-Origin: *` support allows direct client-side fetch from GitHub Pages without requiring custom proxy servers.

### Synchronization Triggers
| Trigger | Frequency / Event | Action Taken |
| :--- | :--- | :--- |
| **Background Polling** | Every 8,000 ms (8 sec) | Fetches latest registered students and quiz attempts from cloud. |
| **Window Focus / Tab Resume** | On `window.onfocus` | Instantly refreshes state when a student unlocks their phone or switches back to the tab. |
| **Cross-Tab Messaging** | On `BroadcastChannel.postMessage` | Synchronizes open tabs on the same device within 5 ms. |
| **Student Registration** | Synchronous on Form Submit | Pushes the newly registered classmate to cloud immediately. |
| **Quiz Submission** | Synchronous on Test Submit | Pushes score attempt, updates student aggregate metrics, and recalculates leaderboards. |
| **Manual Refresh** | User click on Navbar pill | Forces an immediate cloud fetch and sync status badge update. |

### Conflict Resolution & De-duplication Rules
1. **Students**: Keyed uniquely by `rollNumber.trim().toUpperCase()`. If duplicate registrations occur, the entry with the latest `registeredAt` timestamp is preserved.
2. **Quiz Attempts**: Keyed uniquely by UUID `attempt.id`. Local and remote arrays are combined with Set-based ID deduplication to prevent duplicate submissions.
3. **Offline Resilience**: State is backed up in browser `localStorage` (`btech_registered_students_v2`, `btech_quiz_attempts_v2`). If network connectivity is lost, attempts are cached and uploaded on the next successful poll.

---

## 4. User Workflows

### 4.1 Student Experience
1. **Login & Registration**:
   - Opens the application in a light-mode glassmorphic interface.
   - Enters Full Name, University Roll Number (e.g. `23A91A0501`), Branch (`CSE`, `AI&DS`, `IT`, `ECE`, `EEE`), and Admission Year.
   - Profile is saved and synced to the cloud.
2. **Subject Selection**:
   - Filter by semester (`Sem 1-1` to `Sem 4-2`) or view all 40 engineering subjects.
   - Progress indicators show completion status for each subject.
3. **Examination Interface**:
   - Click "Start Quiz" on any unit module.
   - 10 Subject-accurate questions with a 10-minute countdown timer.
   - Color-coded question palette grid (Answered, Flagged, Unanswered).
   - Confirmation dialog before final submission.
4. **Performance Evaluation**:
   - High scores trigger celebratory confetti.
   - Shows Score (out of 10), Percentage, Accuracy, and Percentile Rank.
   - Step-by-step GeeksforGeeks-style technical rationale with code snippets and theoretical explanations for all 10 questions.

### 4.2 Leaderboard & Classmate Roster
- **🏆 Score Leaderboard Tab**:
  - Dynamically ranks students by: $\text{Rank Score} = \text{Total Points} + (\text{Accuracy} \times 0.1)$.
  - Metallic gold, silver, and bronze 3D podium highlights the top 3 scorers.
  - Displays rank, student name, roll number, branch, quizzes attempted, average score, and total points.
  - Active student row highlighted with a `YOU` badge.
- **👥 All Registered Classmates Tab**:
  - Complete real-time roster of all registered classmates across all devices.
  - Filterable by branch and searchable by roll number or name.
  - Shows when each student registered and how many quizzes they have completed.

### 4.3 Faculty Portal
- **KPI Metrics Cards**:
  - Live count of enrolled classmates.
  - Real-time class average accuracy %.
  - Overall pass rate %.
  - Total active curriculum subjects.
- **Assessment Parameters**:
  - Timer duration in minutes.
  - Pass cutoff percentage.
  - Instant question feedback toggle.
  - Negative marking toggle.
- **Audit Logs**:
  - Chronological table of all submissions with student details, quiz ID, score, time taken, and pass/fail status.

### 4.4 Algorithmic Foundations & Computational Analysis

The system integrates algorithms both within the academic evaluation modules (**Advanced Data Structures &mdash; CS2104**) and in the underlying platform execution engine:

#### A. Advanced Data Structures (ADS &mdash; CS2104) Curriculum Algorithms
| Algorithm / Concept | Domain | Asymptotic Complexity | Pedagogical & Practical Focus |
| :--- | :--- | :--- | :--- |
| **AVL Tree Balancing** | Self-Balancing BST | $O(\log N)$ Search/Insert | Single (LL, RR) & Double (LR, RL) rotations maintaining Balance Factor $\in \{-1, 0, +1\}$. |
| **Red-Black Tree Balancing** | Self-Balancing BST | $O(\log N)$ Search/Insert | Enforces 5 color invariants; height bounded by $2\log_2(N+1)$. |
| **Bellman-Ford Algorithm** | Graph Shortest Path | $O(V \cdot E)$ Time, $O(V)$ Space | Relaxes edges $V-1$ times; handles negative edge weights & detects negative cycles. |
| **Floyd-Warshall Algorithm** | All-Pairs Shortest Path | $O(V^3)$ Time, $O(V^2)$ Space | Dynamic programming formulation evaluating all intermediate vertex paths $k \in \{1 \dots V\}$. |
| **0/1 Knapsack Problem** | Dynamic Programming | $O(N \cdot W)$ Pseudo-polynomial | 2D table memoization based on *Optimal Substructure* and *Overlapping Subproblems*. |
| **Matrix Chain Multiplication** | Dynamic Programming | $O(N^3)$ Time, $O(N^2)$ Space | Computes optimal parenthesization splitting indices to minimize scalar multiplications. |
| **Disjoint Set Union (DSU)** | Disjoint Sets | $O(\alpha(N))$ Amortized Time | Combines **Path Compression** and **Union by Rank** for near-$O(1)$ partition sets. |
| **Master Theorem Analysis** | Asymptotic Recurrences | $T(N) = aT(N/b) + f(N)$ | Solves divide-and-conquer recurrences (e.g. $T(N) = 2T(N/2) + O(N) \implies \Theta(N \log N)$). |
| **NP-Completeness Reductions** | Computational Complexity | Polynomial verification ($NP$) | Analyzes decision variants of 3-SAT and Knapsack via polynomial-time reductions. |

#### B. Internal Platform Algorithms
1. **Dynamic Leaderboard Hybrid Ranking Algorithm**:
   $$\text{Rank Score} = \text{Total Points} + (\text{Average Accuracy \%} \times 0.1)$$
   *Tie-Breakers*: Average accuracy percentage descending $\to$ Total quizzes completed descending.
2. **Conflict-Free Cloud De-duplication Algorithm**:
   * *Students*: Normalized uppercase roll number keying with timestamp-precedence resolution.
   * *Quiz Attempts*: Immutable UUIDv4 hashing combined using Set-based deduplication ($O(N)$ union).
3. **Academic Timeline Promotion Algorithm**:
   $$\text{Semester} = \min\left(8, \max\left(1, \left\lfloor \frac{(\text{Current Year} - \text{Admission Year}) \times 12 + (\text{Month} - 7)}{6} \right\rfloor + 1\right)\right)$$

---

## 5. Data Models & Schemas

### StudentProfile
```typescript
interface StudentProfile {
  id: string;               // e.g. "stu_1729431000"
  name: string;             // e.g. "Sriteja Mallula"
  rollNumber: string;       // e.g. "23A91A0501"
  email: string;            // e.g. "23A91A0501@bvcec.edu.in"
  branch: 'CSE' | 'AI&DS' | 'IT' | 'ECE' | 'EEE';
  admissionYear: number;    // e.g. 2023
  currentSemester: number;  // 1 to 8
  quizzesAttempted: number;
  averageScore: number;     // 0 to 100
  totalPoints: number;
  registeredAt?: string;    // ISO 8601
}
```

### QuizAttempt
```typescript
interface QuizAttempt {
  id: string;               // UUID v4
  studentRoll: string;      // e.g. "23A91A0501"
  studentName: string;
  quizId: string;           // e.g. "cs2102-m1"
  subjectCode: string;      // e.g. "CS2102"
  score: number;            // 0 - 10
  totalQuestions: number;   // 10
  percentage: number;       // 0 - 100
  passed: boolean;
  timeSpentSeconds: number;
  completedAt: string;      // ISO 8601
}
```

### CloudSyncPayload
```typescript
interface CloudSyncPayload {
  registeredStudents: StudentProfile[];
  quizAttempts: QuizAttempt[];
  lastSyncedAt: string;
}
```

---

## 6. Curriculum Mapping (40 Core Subjects)

| Sem | Code | Subject Name | Key Syllabus Areas |
| :--- | :--- | :--- | :--- |
| **1-1** | `BS1101` | Linear Algebra & Calculus | Matrices, Eigenvalues, Cayley-Hamilton, Multiple Integrals |
| **1-1** | `BS1102` | Applied Chemistry | EDTA Water Hardness, Zeolites, Batteries, Corrosion, Polymers |
| **1-1** | `CS1101` | C Programming & Problem Solving | Control Flow, Pointers, Arrays, Dynamic Memory, Recursion |
| **1-1** | `ES1101` | Basic Civil & Mechanical Engg | Theodolite, 4-Stroke IC Engines, Boilers, TIG/MIG Welding |
| **1-2** | `BS1201` | Applied Physics | Wave Optics, Lasers, Quantum Mechanics, Superconductivity |
| **1-2** | `BS1202` | Mathematics-II (M-2) | Differential Equations, Laplace Transforms, Vector Calculus |
| **1-2** | `ES1201` | Basic Electrical & Electronics | KCL/KVL, Star-Delta, Transformers, Zener Diodes, BJT |
| **1-2** | `CS1201` | Data Structures | Stacks, Queues, Linked Lists, Binary Trees, Circular Queues |
| **1-2** | `HS1201` | Communicative English | Grammar, Technical Vocabulary, Précis Writing, IEEE Formats |
| **2-1** | `CS2101` | Discrete Mathematics (DMGT) | Logic, Graph Theory, Eulerian Circuits, Recurrences, Posets |
| **2-1** | `CS2102` | Database Management Systems | Relational Algebra, Normalization (3NF/BCNF), B+ Trees, 2PL |
| **2-1** | `CS2103` | Java Programming | OOP, Multithreading, Exception Handling, Collections Framework |
| **2-1** | `CS2104` | Advanced Data Structures | Red-Black Trees, AVL Trees, Bellman-Ford, Master Theorem |
| **2-1** | `HS2101` | Universal Human Values (UHV) | Self-Exploration, Natural Acceptance, Human Relations |
| **2-2** | `CS2205` | Python Programming | Comprehensions, Decorators, Generators, GIL, Tuples |
| **2-2** | `CS2201` | Theory of Computation (FLAT) | DFA/NFA, Pushdown Automata, Pumping Lemma, Turing Machines |
| **2-2** | `CS2202` | Computer Organization (COA) | Pipeline Hazards, Cache Mapping, Memory Hierarchy, DMA |
| **2-2** | `CS2203` | Operating Systems | Process Scheduling, Deadlocks, Virtual Memory, Semaphores |
| **2-2** | `CS2204` | Software Engineering | Agile Scrum, Spiral Model, Black Box Testing, UML |
| **2-2** | `HS2201` | Managerial Economics (MEFA) | Break-Even Point, Elasticity, Accounting Ratios, NPV/IRR |
| **3-1** | `23AD5T03` | Computer Networks | TCP/IP, Subnetting, 3-Way Handshake, OSPF Dijkstra, BGP |
| **3-1** | `23AD6T05` | Machine Learning | SVM Kernel Trick, K-Means, Regularization, Precision/Recall |
| **3-1** | `23AD5D03` | Exploratory Data Analysis | Outlier Detection, Correlation, Normalization, Chi-Square |
| **3-1** | `23CS5S06` | Full Stack Development | React Virtual DOM, Express Middleware, JWT, REST, WebSockets |
| **3-1** | `23AD5T02` | Artificial Intelligence | A* Search, Minimax Alpha-Beta Pruning, Heuristics |
| **3-2** | `23AD6D06` | Microprocessors & Microcontrollers | 8086 Instruction Set, 8051 Architecture, 8255 PPI |
| **3-2** | `CS3202` | Cryptography & Network Security | AES, RSA Factorization, Diffie-Hellman, SHA-256 |
| **3-2** | `CS3203` | Data Warehousing & Data Mining | OLAP vs OLTP, Star Schema, Apriori Association Rules |
| **3-2** | `CS3204` | Cloud Computing | IaaS/PaaS/SaaS, Hypervisors, S3 Storage, Docker, Serverless |
| **3-2** | `HS3201` | Professional Ethics & Cyber Laws | IT Act 2000 Section 66, IPR, Patents, Whistleblowing, GDPR |
| **4-1** | `23AD7D09` | DevOps | CI/CD Pipelines, Docker, Kubernetes Pods, Jenkins, Terraform |
| **4-1** | `23CS7T13` | Deep Learning | CNNs, ReLU, Transformer Self-Attention, LSTMs, Adam |
| **4-1** | `23HM7T07` | HR & Project Management | CPM/PERT Critical Path, COCOMO Estimation, Maslow |
| **4-1** | `CS4101` | Big Data Analytics | Hadoop HDFS NameNode, MapReduce, Spark RDDs, CAP Theorem |
| **4-1** | `CS4102` | Info Security & Ethical Hacking | SQL Injection, XSS, Nmap, Burp Suite, CSRF Tokens, ASLR |
| **4-2** | `CS4201` | Cyber Security & Forensics | Chain of Custody, Hardware Write Blockers, Memory Forensics |
| **4-2** | `CS4202` | Distributed Systems | Raft/Paxos Consensus, Lamport Logical Clocks, RPC, 2PC |
| **4-2** | `CS4203` | Software Project Management | Risk Exposure, Agile Burn-Down Charts, CMMI Level 5 |
| **4-2** | `CS4204` | Prompt Engg & Generative AI | Few-Shot Prompting, Chain-of-Thought, RAG, LoRA Fine-Tuning |
| **4-2** | `CS4205` | Natural Language Processing | Stemming/Lemmatization, TF-IDF, Word2Vec, BERT Masked LM |

---

## 7. Build & Deployment Specifications

- **Build System**: Vite 6 + TypeScript 5.5 + Tailwind CSS 4
- **Output Target**: `./dist/` containing `index.html` and `./assets/`
- **Hosting Strategy**: GitHub Pages static website hosting
- **Single Page Application (SPA) Strategy**: Compiled bundles in `dist/assets` are copied directly to root `assets/` and `index.html` with relative paths (`./assets/...`) ensuring immediate compatibility with GitHub Pages URL path `/online-quiz/`.
