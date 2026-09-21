# 🎓 B.Tech Interactive Online Quiz & Leaderboard System

[![React](https://img.shields.io/badge/React-18.3-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.4-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4.0-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A modern, full-stack responsive web application tailored for the B.Tech Computer Science & Engineering (BVCEC Odalarevu R23 Curriculum Pattern). The platform features an 8-semester curriculum catalog, dedicated 100% subject-accurate evaluation quizzes with step-by-step GeeksforGeeks-style technical explanations, an automatic time-based promotion engine, dynamic real-time leaderboards, and faculty analytics.

---

## 🚀 Key Features

### 👨‍🎓 Student Features
- **8-Semester Core Curriculum (Sem 1-1 to Sem 4-2)**: Access 40 core theory engineering subjects mapped strictly to the B.Tech CSE syllabus.
- **Explicit Semester Selector**: Students can log in with their Roll Number (e.g. `23A91A05XX`), Branch (`CSE`, `AI&DS`, `IT`), Admission Year, and select their current active semester.
- **Automatic Timeline Promotion Engine**: Automatically calculates elapsed academic months based on admission batch year (e.g., 2024 admission batch \(\rightarrow\) Sem 2-1) and promotes students over time.
- **10-Question Evaluation Quizzes**: Every quiz dynamically samples 10 subject-specific questions with a strict **4 Easy, 3 Moderate, 3 Hard** difficulty split.
- **GeeksforGeeks-Style Explanations**: Review detailed step-by-step technical rationale and code snippets for every question upon completion.
- **10-Minute Timer & Palette Grid**: Real-time countdown timer with 1–10 interactive question palette grid tracking answered, flagged, and unvisited questions.

### 🏆 Dynamic Real-Time Leaderboard
- **Podium Display**: Top 3 students featured in Gold 🥇, Silver 🥈, and Bronze 🥉 visual podium cards.
- **Live Rank Computation**: Ranks are calculated dynamically based on total score, accuracy percentage, and quizzes attempted.
- **Clean Initial State**: Zero mock/fake students; builds dynamically from authentic quiz submissions.

### 👩‍🏫 Faculty Dashboard
- **Class Analytics**: Full access to overall class accuracy, top performers, topic breakdown, and configurable quiz parameters (timer limit, pass percentage, instant feedback).

---

## 📚 8-Semester B.Tech Core Curriculum Structure

### 📍 Semester 1-1 (Year 1, Sem 1)
- **Linear Algebra & Calculus (LAC)** (`BS1101`) - Matrices, Rank, Eigenvalues, Cayley-Hamilton, Multiple Integrals.
- **Applied Chemistry** (`BS1102`) - Water Technology (EDTA, Zeolites), Nernst Equation, Teflon, Corrosion, Li-ion Batteries.
- **C Programming & Problem Solving** (`CS1101`) - Control Flow, Pointers, Arrays, Dynamic Memory Allocation, Unions.
- **Basic Civil & Mechanical Engg (BCME)** (`ES1101`) - Theodolite Surveying, Portland Cement C3S, 4-stroke IC Engines, Lancashire Boilers, TIG Welding.

### 📍 Semester 1-2 (Year 1, Sem 2)
- **Applied Physics** (`BS1201`) - Thin Film Interference, De Broglie Wavelength, He-Ne Laser, Fermi Level, Meissner Effect.
- **Mathematics-II (M-2)** (`BS1202`) - Differential Equations, Laplace Transforms, Vector Calculus, Gauss/Stokes Theorems.
- **Basic Electrical & Electronics (BEEE)** (`ES1201`) - KCL/KVL, Star-Delta 3-Phase Systems, Ideal Transformers, Zener Regulation, BJT Beta.
- **Data Structures (DS)** (`CS1201`) - Stacks, Queues, Linked Lists, Trees, In-order BST Traversal, Circular Queues.
- **Communicative English** (`HS1201`) - Vocabulary, Passive Voice, Subject-Verb Agreement, Précis Writing, IEEE Report Writing.

### 📍 Semester 2-1 (Year 2, Sem 1)
- **Discrete Mathematics & Graph Theory (DMGT)** (`CS2101`) - Propositional Logic, Eulerian Circuits, Chromatic Number, Recurrences, Posets.
- **Database Management Systems (DBMS)** (`CS2102`) - Relational Algebra, ER Diagrams, SQL NULLs, Functional Dependencies, Lossless Decomposition, 3NF/BCNF, B+ Trees, Strict 2PL.
- **Java Programming (JAVA)** (`CS2103`) - OOP, Exception Handling, Multithreading, HashMap Load Factor, Streams API, Metaspace.
- **Advanced Data Structures (ADS)** (`CS2104`) - Red-Black Trees, AVL Balance Factor, Bellman-Ford Shortest Path, Master Theorem, Floyd-Warshall.
- **Universal Human Values (UHV)** (`HS2101`) - Self-Exploration, Natural Acceptance, Co-existence (Self & Body), Trust (Vishwas), 4 Orders of Nature.

### 📍 Semester 2-2 (Year 2, Sem 2)
- **Python Programming** (`CS2205`) - Tuples, Exponentiation Precedence, List Comprehensions, Decorators, GIL.
- **Theory of Computation / Automata (FLAT)** (`CS2201`) - DFA/NFA, Pushdown Automata, Pumping Lemma, CNF Grammars, Halting Problem.
- **Computer Organization & Architecture (COA)** (`CS2202`) - Instruction Set Architecture, Pipelining Hazards, Cache Mapping, DMA.
- **Operating Systems (OS)** (`CS2203`) - SJF Scheduling, Deadlocks (Banker's Algorithm), Virtual Memory, Belady's Anomaly, Mutex, Peterson's Algorithm.
- **Software Engineering (SE)** (`CS2204`) - Agile Scrum, SDLC Spiral Model, Black Box Testing, UML Composition, Cyclomatic Complexity.
- **Managerial Economics & Financial Analysis (MEFA)** (`HS2201`) - Break-Even Point, Elasticity of Demand, Real Accounts, Current Ratio, NPV & IRR.

### 📍 Semester 3-1 (Year 3, Sem 1)
- **Computer Networks** (`23AD5T03`) - OSI/TCP-IP Models, Subnetting /24, TCP 3-Way Handshake, OSPF Dijkstra, HTTP/2, BGP.
- **Machine Learning** (`23AD6T05`) - Supervised/Unsupervised, SVM Kernel Trick, K-Means, Precision/Recall, Lasso vs Ridge, XGBoost.
- **Exploratory Data Analysis (EDA)** (`23AD5D03`) - Box Plots, Pearson Correlation, One-Hot Encoding, Min-Max Normalization, Chi-Square Test.
- **Full Stack Development (FSD-II)** (`23CS5S06`) - React Virtual DOM, Express Middleware, REST APIs, JWT Authentication, WebSockets.
- **Artificial Intelligence** (`23AD5T02`) - A* Search f(n)=g(n)+h(n), Minimax Alpha-Beta Pruning, Turing Test, CSP, Q-Learning.

### 📍 Semester 3-2 (Year 3, Sem 2)
- **Microprocessors & Microcontrollers (MPMC)** (`23AD6D06`) - 8086 20-bit Address Bus, 8051 128-byte RAM, 8255 PPI, ALE Signal.
- **Cryptography & Network Security (CNS)** (`CS3202`) - AES, RSA Prime Factorization, Diffie-Hellman, SHA-256, Digital Signatures, Firewalls.
- **Data Warehousing & Data Mining (DWDM)** (`CS3203`) - OLAP vs OLTP, Star/Snowflake Schemas, Apriori Association Rules, ETL Pipelines.
- **Cloud Computing** (`CS3204`) - IaaS/PaaS/SaaS, Type-1 Hypervisors, AWS S3, Docker vs VMs, Serverless Lambda, IaC.
- **Professional Ethics & Cyber Laws** (`HS3201`) - IEEE Code of Ethics, Indian IT Act 2000 Sec 66, IPR Patents, Whistleblowing, GDPR.

### 📍 Semester 4-1 (Year 4, Sem 1)
- **DevOps** (`23AD7D09`) - CI/CD Pipelines, Dockerfiles, Kubernetes Pods, Jenkinsfile, Terraform IaC, Prometheus & Grafana.
- **Deep Learning** (`23CS7T13`) - CNN Max Pooling, Sigmoid/ReLU Activations, Transformer Self-Attention, LSTMs, GANs, Adam Optimizer.
- **Human Resource & Project Management** (`23HM7T07`) - Critical Path Method (CPM/PERT), COCOMO KLOC, Maslow Hierarchy, EVM.
- **Big Data Analytics** (`CS4101`) - Hadoop HDFS NameNode, MapReduce Shuffle & Sort, Spark RDDs, 5 V's of Big Data, Kafka, CAP Theorem.
- **Information Security & Ethical Hacking** (`CS4102`) - SQL Injection, XSS, Nmap, Burp Suite, CSRF Tokens, Metasploit, ASLR.

### 📍 Semester 4-2 (Year 4, Sem 2)
- **Cyber Security & Forensics** (`CS4201`) - Chain of Custody, Hardware Write Blockers, Memory Forensics (Volatility), File Carving.
- **Distributed Systems** (`CS4202`) - Raft/Paxos Consensus, Lamport Logical Clocks, RPC Protocol, 2PC Transactions, Vector Clocks.
- **Software Project Management** (`CS4203`) - Risk Exposure Formula, Agile Burn-Down Charts, SQA vs SQC, CMMI Level 5, Function Points.
- **Prompt Engineering & Generative AI** (`CS4204`) - Few-Shot Prompting, Chain-of-Thought, RAG Vector Search, LLM Temperature, ReAct Framework, LoRA.
- **Natural Language Processing (NLP)** (`CS4205`) - Stemming vs Lemmatization, TF-IDF, Word2Vec, BERT Masked LM, BLEU/ROUGE Scores.

---

## 🛠️ Tech Stack

- **Frontend Framework**: [React 18](https://reactjs.org/) with [TypeScript](https://www.typescriptlang.org/)
- **Build Tool**: [Vite 6](https://vitejs.dev/)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/) with Glassmorphism & Custom Glow Effects
- **Icons**: [Lucide React](https://lucide.dev/)
- **Celebration Animations**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 💻 Local Development Setup

### Prerequisites
- Node.js (`v18+` recommended)
- npm or yarn

### Installation Steps

1. **Clone the repository**:
   ```bash
   git clone https://github.com/sritejamallula/online-quiz.git
   cd online-quiz
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:5173/` in your browser.

4. **Build for production**:
   ```bash
   npm run build
   ```

---

## 📄 License

This project is open-source and available under the [MIT License](LICENSE).
