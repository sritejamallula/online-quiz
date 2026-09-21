import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  User,
  StudentProfile,
  FacultyProfile,
  Subject,
  Lesson,
  Quiz,
  QuizAttempt,
  LeaderboardEntry,
  FacultyConfig,
  Branch,
  SemesterCode,
  AcademicYear,
  Semester
} from '../types';
import { subjectsData, initialLeaderboardData } from '../data/quizData';
import { calculateSemesterFromAdmission, checkAndPromoteStudent } from '../utils/promotionEngine';

export type AppView =
  | 'SUBJECTS'
  | 'LESSONS'
  | 'QUIZ_LIST'
  | 'QUIZ_ENGINE'
  | 'SCORE_REPORT'
  | 'LEADERBOARD'
  | 'FACULTY_DASHBOARD';

interface QuizContextType {
  currentUser: User | null;
  activeView: AppView;
  subjects: Subject[];
  activeSubject: Subject | null;
  activeLesson: Lesson | null;
  activeQuiz: Quiz | null;
  quizAttempts: QuizAttempt[];
  leaderboard: LeaderboardEntry[];
  facultyConfig: FacultyConfig;
  theme: 'dark' | 'light';
  lastCompletedAttempt: QuizAttempt | null;
  
  // Semester & Year Filter State
  selectedSemesterFilter: 'ALL' | SemesterCode;
  selectedYearFilter: 'ALL' | AcademicYear;
  promotionAlert: string | null;
  dismissPromotionAlert: () => void;
  setSelectedSemesterFilter: (filter: 'ALL' | SemesterCode) => void;
  setSelectedYearFilter: (filter: 'ALL' | AcademicYear) => void;
  filterToMySemester: () => void;
  
  // Handlers
  loginStudent: (name: string, rollNumber: string, branch: Branch, admissionYear: number, selectedSemesterCode?: SemesterCode) => void;
  loginFaculty: (name: string, facultyId: string, department: string) => void;
  logout: () => void;
  selectSubject: (subjectId: string) => void;
  selectLesson: (lessonId: string) => void;
  startQuiz: (quizId: string) => void;
  submitQuiz: (answers: { [qId: string]: number }, timeTakenSeconds: number) => void;
  updateFacultyConfig: (config: Partial<FacultyConfig>) => void;
  navigateTo: (view: AppView) => void;
  toggleTheme: () => void;
  getSubjectProgress: (subjectId: string) => { completed: number; total: number; averageScorePct: number };
  getLessonProgress: (lessonId: string) => { completed: number; total: number };
  getBestQuizAttempt: (quizId: string) => QuizAttempt | null;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

const STORAGE_KEYS = {
  USER: 'quiz_portal_user',
  ATTEMPTS: 'quiz_portal_attempts',
  CONFIG: 'quiz_portal_config',
  THEME: 'quiz_portal_theme',
};

const DEFAULT_FACULTY_CONFIG: FacultyConfig = {
  timerMinutes: 10,
  showInstantFeedback: true,
  passingPercentage: 60,
  negativeMarking: false,
};

export const QuizProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 1. Initial State Loaders
  const [currentUser, setCurrentUser] = useState<User | null>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.USER);
      if (!saved) return null;
      const parsed = JSON.parse(saved);
      if (parsed && typeof parsed === 'object') {
        // Sanitize invalid semesterCode if corrupted in previous runs
        if (parsed.semesterCode === 'NaN-NaN' || !parsed.semesterCode) {
          parsed.semesterCode = '1-1';
        }
        return parsed;
      }
      return null;
    } catch {
      localStorage.removeItem(STORAGE_KEYS.USER);
      return null;
    }
  });

  const [quizAttempts, setQuizAttempts] = useState<QuizAttempt[]>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ATTEMPTS);
      return saved ? JSON.parse(saved) : [];
    } catch {
      localStorage.removeItem(STORAGE_KEYS.ATTEMPTS);
      return [];
    }
  });

  const [facultyConfig, setFacultyConfig] = useState<FacultyConfig>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CONFIG);
      return saved ? JSON.parse(saved) : DEFAULT_FACULTY_CONFIG;
    } catch {
      return DEFAULT_FACULTY_CONFIG;
    }
  });

  const [theme, setTheme] = useState<'dark' | 'light'>(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.THEME);
      return (saved as 'dark' | 'light') || 'dark';
    } catch {
      return 'dark';
    }
  });

  // Filters State
  const [selectedSemesterFilter, setSelectedSemesterFilter] = useState<'ALL' | SemesterCode>('ALL');
  const [selectedYearFilter, setSelectedYearFilter] = useState<'ALL' | AcademicYear>('ALL');
  const [promotionAlert, setPromotionAlert] = useState<string | null>(null);

  // 2. Navigation State
  const [activeView, setActiveView] = useState<AppView>('SUBJECTS');
  const [activeSubject, setActiveSubject] = useState<Subject | null>(subjectsData[0]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [activeQuiz, setActiveQuiz] = useState<Quiz | null>(null);
  const [lastCompletedAttempt, setLastCompletedAttempt] = useState<QuizAttempt | null>(null);

  // Auto Semester Promotion Check on Mount / User change
  useEffect(() => {
    if (currentUser && currentUser.role === 'STUDENT') {
      const check = checkAndPromoteStudent(currentUser.semesterCode, currentUser.admissionYear);
      if (check.isPromoted) {
        const updatedStudent: StudentProfile = {
          ...currentUser,
          currentYear: check.year,
          currentSemester: check.semester,
          semesterCode: check.semesterCode,
          lastPromotedDate: new Date().toISOString(),
        };
        setCurrentUser(updatedStudent);
        setPromotionAlert(
          `🎉 Academic Progress Auto-Promoted! You have been advanced from Sem ${check.previousSemesterCode} to Sem ${check.semesterCode} based on your timeline.`
        );
      }
    }
  }, []);

  // Save to localStorage
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem(STORAGE_KEYS.USER, JSON.stringify(currentUser));
    } else {
      localStorage.removeItem(STORAGE_KEYS.USER);
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ATTEMPTS, JSON.stringify(quizAttempts));
  }, [quizAttempts]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(facultyConfig));
  }, [facultyConfig]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.THEME, theme);
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Compute Dynamic Leaderboard
  const [leaderboard, setLeaderboard] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const map = new Map<string, LeaderboardEntry>();

    initialLeaderboardData.forEach((entry) => {
      map.set(entry.studentRoll, { ...entry });
    });

    quizAttempts.forEach((attempt) => {
      const existing = map.get(attempt.studentRoll) || {
        studentRoll: attempt.studentRoll,
        studentName: attempt.studentName,
        branch: attempt.branch,
        semesterCode: attempt.semesterCode,
        quizzesAttempted: 0,
        totalScore: 0,
        totalPossibleScore: 0,
        accuracyPercentage: 0,
      };

      existing.quizzesAttempted += 1;
      existing.totalScore += attempt.score;
      existing.totalPossibleScore += attempt.totalQuestions;
      existing.accuracyPercentage = Math.round((existing.totalScore / existing.totalPossibleScore) * 1000) / 10;

      map.set(attempt.studentRoll, existing);
    });

    const sorted = Array.from(map.values()).sort((a, b) => {
      if (b.totalScore !== a.totalScore) return b.totalScore - a.totalScore;
      return b.accuracyPercentage - a.accuracyPercentage;
    });

    const ranked = sorted.map((item, idx) => ({ ...item, rank: idx + 1 }));
    setLeaderboard(ranked);
  }, [quizAttempts]);

  // Auth Actions
  const loginStudent = (
    name: string,
    rollNumber: string,
    branch: Branch,
    admissionYear: number,
    selectedSemesterCode?: SemesterCode
  ) => {
    const semInfo = calculateSemesterFromAdmission(admissionYear);
    
    let targetSemCode = semInfo.semesterCode;
    let targetYear = semInfo.year;
    let targetSem = semInfo.semester;

    if (selectedSemesterCode) {
      targetSemCode = selectedSemesterCode;
      const [yStr, sStr] = selectedSemesterCode.split('-');
      targetYear = Number(yStr) as AcademicYear;
      targetSem = ((targetYear - 1) * 2 + Number(sStr)) as Semester;
    }

    const student: StudentProfile = {
      name,
      rollNumber: rollNumber.toUpperCase(),
      branch,
      admissionYear,
      currentYear: targetYear,
      currentSemester: targetSem,
      semesterCode: targetSemCode,
      role: 'STUDENT',
    };
    setCurrentUser(student);
    setSelectedSemesterFilter(targetSemCode);
    setActiveView('SUBJECTS');
  };

  const loginFaculty = (name: string, facultyId: string, department: string) => {
    const faculty: FacultyProfile = {
      name,
      facultyId: facultyId.toUpperCase(),
      department,
      role: 'FACULTY',
    };
    setCurrentUser(faculty);
    setActiveView('FACULTY_DASHBOARD');
  };

  const logout = () => {
    setCurrentUser(null);
    setActiveView('SUBJECTS');
  };

  const filterToMySemester = () => {
    if (currentUser && currentUser.role === 'STUDENT') {
      setSelectedSemesterFilter(currentUser.semesterCode);
      setSelectedYearFilter('ALL');
    }
  };

  const dismissPromotionAlert = () => {
    setPromotionAlert(null);
  };

  // Navigation Actions
  const selectSubject = (subjectId: string) => {
    const found = subjectsData.find((s) => s.id === subjectId);
    if (found) {
      setActiveSubject(found);
      setActiveLesson(null);
      setActiveQuiz(null);
      setActiveView('LESSONS');
    }
  };

  const selectLesson = (lessonId: string) => {
    if (!activeSubject) return;
    const found = activeSubject.lessons.find((l) => l.id === lessonId);
    if (found) {
      setActiveLesson(found);
      setActiveQuiz(null);
      setActiveView('QUIZ_LIST');
    }
  };

  const startQuiz = (quizId: string) => {
    for (const sub of subjectsData) {
      for (const les of sub.lessons) {
        const q = les.quizzes.find((item) => item.id === quizId);
        if (q) {
          setActiveSubject(sub);
          setActiveLesson(les);
          setActiveQuiz(q);
          setActiveView('QUIZ_ENGINE');
          return;
        }
      }
    }
  };

  // Quiz Evaluation & Submission
  const submitQuiz = (userAnswers: { [qId: string]: number }, timeTakenSeconds: number) => {
    if (!activeQuiz || !activeSubject || !activeLesson) return;

    let score = 0;
    activeQuiz.questions.forEach((q) => {
      const selected = userAnswers[q.id];
      if (selected !== undefined && selected === q.correctIndex) {
        score += 1;
      }
    });

    const isStudent = currentUser && currentUser.role === 'STUDENT';
    const studentName = isStudent ? currentUser.name : 'Guest Student';
    const studentRoll = isStudent ? currentUser.rollNumber : '23A91A0599';
    const branch = isStudent ? currentUser.branch : 'CSE';
    const semesterCode = isStudent ? currentUser.semesterCode : activeSubject.semesterCode;

    const newAttempt: QuizAttempt = {
      id: `attempt-${Date.now()}`,
      studentRoll,
      studentName,
      branch,
      semesterCode,
      subjectId: activeSubject.id,
      subjectName: activeSubject.name,
      lessonId: activeLesson.id,
      quizId: activeQuiz.id,
      quizTitle: activeQuiz.title,
      score,
      totalQuestions: activeQuiz.questions.length,
      timeTakenSeconds,
      completedAt: new Date().toISOString(),
      userAnswers,
    };

    setQuizAttempts((prev) => [newAttempt, ...prev]);
    setLastCompletedAttempt(newAttempt);
    setActiveView('SCORE_REPORT');
  };

  const updateFacultyConfig = (newConfig: Partial<FacultyConfig>) => {
    setFacultyConfig((prev) => ({ ...prev, ...newConfig }));
  };

  const navigateTo = (view: AppView) => {
    setActiveView(view);
  };

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  // Helper Metrics
  const getSubjectProgress = (subjectId: string) => {
    const sub = subjectsData.find((s) => s.id === subjectId);
    if (!sub) return { completed: 0, total: 25, averageScorePct: 0 };

    const allQuizzes = sub.lessons.flatMap((l) => l.quizzes);
    const total = allQuizzes.length;

    const studentRoll = currentUser?.role === 'STUDENT' ? currentUser.rollNumber : '';
    const attempts = quizAttempts.filter((a) => a.subjectId === subjectId && (!studentRoll || a.studentRoll === studentRoll));

    const completedQuizIds = new Set(attempts.map((a) => a.quizId));
    const completed = completedQuizIds.size;

    const totalScore = attempts.reduce((acc, curr) => acc + curr.score, 0);
    const totalPossible = attempts.reduce((acc, curr) => acc + curr.totalQuestions, 0);
    const averageScorePct = totalPossible > 0 ? Math.round((totalScore / totalPossible) * 100) : 0;

    return { completed, total, averageScorePct };
  };

  const getLessonProgress = (lessonId: string) => {
    const studentRoll = currentUser?.role === 'STUDENT' ? currentUser.rollNumber : '';
    const attempts = quizAttempts.filter((a) => a.lessonId === lessonId && (!studentRoll || a.studentRoll === studentRoll));
    const completedQuizIds = new Set(attempts.map((a) => a.quizId));

    return { completed: completedQuizIds.size, total: 5 };
  };

  const getBestQuizAttempt = (quizId: string) => {
    const studentRoll = currentUser?.role === 'STUDENT' ? currentUser.rollNumber : '';
    const attempts = quizAttempts.filter((a) => a.quizId === quizId && (!studentRoll || a.studentRoll === studentRoll));
    if (attempts.length === 0) return null;

    return attempts.reduce((best, curr) => (curr.score > best.score ? curr : best), attempts[0]);
  };

  return (
    <QuizContext.Provider
      value={{
        currentUser,
        activeView,
        subjects: subjectsData,
        activeSubject,
        activeLesson,
        activeQuiz,
        quizAttempts,
        leaderboard,
        facultyConfig,
        theme,
        lastCompletedAttempt,
        selectedSemesterFilter,
        selectedYearFilter,
        promotionAlert,
        dismissPromotionAlert,
        setSelectedSemesterFilter,
        setSelectedYearFilter,
        filterToMySemester,
        loginStudent,
        loginFaculty,
        logout,
        selectSubject,
        selectLesson,
        startQuiz,
        submitQuiz,
        updateFacultyConfig,
        navigateTo,
        toggleTheme,
        getSubjectProgress,
        getLessonProgress,
        getBestQuizAttempt,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
};

export const useQuiz = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuiz must be used within a QuizProvider');
  }
  return context;
};
