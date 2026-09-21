import React, { Component, ErrorInfo, ReactNode } from 'react';
import { QuizProvider, useQuiz } from './context/QuizContext';
import { Navbar } from './components/Navbar';
import { SubjectGrid } from './components/SubjectGrid';
import { LessonSelector } from './components/LessonSelector';
import { QuizList } from './components/QuizList';
import { QuizEngine } from './components/QuizEngine';
import { ScoreReport } from './components/ScoreReport';
import { LeaderboardTable } from './components/LeaderboardTable';
import { FacultyDashboard } from './components/FacultyDashboard';
import { RefreshCw, AlertTriangle } from 'lucide-react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  public state: ErrorBoundaryState = {
    hasError: false,
  };

  public static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error in Quiz Portal:', error, errorInfo);
  }

  private handleReset = () => {
    localStorage.clear();
    window.location.reload();
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-6 text-center">
          <div className="max-w-md w-full glass-panel rounded-3xl p-8 border border-rose-500/30 space-y-6 shadow-2xl">
            <div className="w-16 h-16 rounded-2xl bg-rose-500/20 text-rose-400 mx-auto flex items-center justify-center">
              <AlertTriangle className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-extrabold tracking-tight">Something Went Wrong</h2>
              <p className="text-xs text-slate-400 leading-relaxed">
                An unexpected error occurred. Click below to reset application state and reload fresh.
              </p>
            </div>
            <button
              onClick={this.handleReset}
              className="w-full py-3 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg shadow-indigo-600/30"
            >
              <RefreshCw className="w-4 h-4" /> Reset Portal & Reload
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

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
    <ErrorBoundary>
      <QuizProvider>
        <AppContent />
      </QuizProvider>
    </ErrorBoundary>
  );
}

export default App;
