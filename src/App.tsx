import React from 'react';
import { QuizProvider, useQuiz } from './context/QuizContext';
import { Navbar } from './components/Navbar';
import { SubjectGrid } from './components/SubjectGrid';
import { LessonSelector } from './components/LessonSelector';
import { QuizList } from './components/QuizList';
import { QuizEngine } from './components/QuizEngine';
import { ScoreReport } from './components/ScoreReport';
import { LeaderboardTable } from './components/LeaderboardTable';
import { FacultyDashboard } from './components/FacultyDashboard';

const AppContent: React.FC = () => {
  const { activeView } = useQuiz();

  const renderView = () => {
    switch (activeView) {
      case 'SUBJECTS':
        return <SubjectGrid />;
      case 'LESSONS':
        return <LessonSelector />;
      case 'QUIZ_LIST':
        return <QuizList />;
      case 'QUIZ_ENGINE':
        return <QuizEngine />;
      case 'SCORE_REPORT':
        return <ScoreReport />;
      case 'LEADERBOARD':
        return <LeaderboardTable />;
      case 'FACULTY_DASHBOARD':
        return <FacultyDashboard />;
      default:
        return <SubjectGrid />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-indigo-500 selection:text-white">
      <Navbar />
      <main className="flex-1 pb-16">{renderView()}</main>

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-slate-950/80 py-6 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p>© 2026 AcademiaQuiz Portal • B.Tech CSE & IT Curriculum</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span>DBMS</span> • <span>ADS & AA</span> • <span>DMGT</span> • <span>Java</span> • <span>UHV</span>
          </div>
        </div>
      </footer>
    </div>
  );
};

export function App() {
  return (
    <QuizProvider>
      <AppContent />
    </QuizProvider>
  );
}

export default App;
