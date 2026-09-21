export type Difficulty = 'EASY' | 'MODERATE' | 'HARD';

export type Branch = 'CSE' | 'AI&DS' | 'IT' | 'ECE' | 'EEE';

export type UserRole = 'STUDENT' | 'FACULTY';

export type AcademicYear = 1 | 2 | 3 | 4;

export type Semester = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type SemesterCode = '1-1' | '1-2' | '2-1' | '2-2' | '3-1' | '3-2' | '4-1' | '4-2';

export interface StudentProfile {
  name: string;
  rollNumber: string; // e.g., 23A91A05XX
  branch: Branch;
  admissionYear: number; // e.g., 2024
  currentYear: AcademicYear;
  currentSemester: Semester;
  semesterCode: SemesterCode;
  lastPromotedDate?: string;
  role: 'STUDENT';
}

export interface FacultyProfile {
  name: string;
  facultyId: string;
  department: string;
  role: 'FACULTY';
}

export type User = StudentProfile | FacultyProfile;

export interface Question {
  id: string;
  text: string;
  codeSnippet?: string;
  options: string[];
  correctIndex: number;
  difficulty: Difficulty;
  explanation: string;
}

export interface Quiz {
  id: string;
  subjectId: string;
  lessonId: string;
  quizNumber: number; // 1 to 5
  title: string;
  durationMinutes: number;
  questions: Question[]; // Exactly 10 questions (4 Easy, 3 Moderate, 3 Hard)
}

export interface Lesson {
  id: string;
  subjectId: string;
  moduleNumber: number; // 1 to 5
  title: string;
  description: string;
  quizzes: Quiz[];
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  year: AcademicYear;
  semester: Semester;
  semesterCode: SemesterCode;
  description: string;
  iconName: string;
  colorTheme: string;
  lessons: Lesson[];
}

export interface QuizAttempt {
  id: string;
  studentRoll: string;
  studentName: string;
  branch: Branch;
  semesterCode: SemesterCode;
  subjectId: string;
  lessonId: string;
  quizId: string;
  quizTitle: string;
  subjectName: string;
  score: number;
  totalQuestions: number;
  timeTakenSeconds: number;
  completedAt: string;
  userAnswers: { [questionId: string]: number }; // questionId -> selectedOptionIndex
  flaggedQuestions?: string[];
}

export interface LeaderboardEntry {
  studentRoll: string;
  studentName: string;
  branch: Branch;
  semesterCode?: SemesterCode;
  quizzesAttempted: number;
  totalScore: number;
  totalPossibleScore: number;
  accuracyPercentage: number;
  rank?: number;
}

export interface FacultyConfig {
  timerMinutes: number;
  showInstantFeedback: boolean;
  passingPercentage: number;
  negativeMarking: boolean;
}
