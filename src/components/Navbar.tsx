import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { AuthModal } from './AuthModal';
import {
  BookOpen,
  Trophy,
  LayoutDashboard,
  Sun,
  Moon,
  LogOut,
  UserCheck,
  Shield,
  GraduationCap,
  Sparkles
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentUser, activeView, navigateTo, logout, theme, toggleTheme } = useQuiz();
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);

  const isStudent = currentUser?.role === 'STUDENT';

  return (
    <>
      <nav className="sticky top-0 z-40 w-full glass-panel border-b border-slate-800/80 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Brand */}
            <div
              onClick={() => navigateTo('SUBJECTS')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-emerald-500 p-0.5 shadow-lg shadow-indigo-600/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-slate-950 rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-400 group-hover:rotate-12 transition-transform" />
                </div>
              </div>
              <div>
                <span className="text-lg font-extrabold text-white tracking-tight flex items-center gap-1.5">
                  AcademiaQuiz <span className="text-xs px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">B.Tech</span>
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 bg-slate-900/60 p-1 rounded-xl border border-slate-800">
              <button
                onClick={() => navigateTo('SUBJECTS')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${
                  activeView === 'SUBJECTS' || activeView === 'LESSONS' || activeView === 'QUIZ_LIST'
                    ? 'bg-indigo-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <BookOpen className="w-4 h-4" /> 8-Sem Subjects
              </button>

              <button
                onClick={() => navigateTo('LEADERBOARD')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${
                  activeView === 'LEADERBOARD'
                    ? 'bg-emerald-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <Trophy className="w-4 h-4" /> Class Leaderboard
              </button>

              <button
                onClick={() => navigateTo('FACULTY_DASHBOARD')}
                className={`px-4 py-2 rounded-lg text-xs font-semibold transition flex items-center gap-2 ${
                  activeView === 'FACULTY_DASHBOARD'
                    ? 'bg-amber-600 text-white shadow'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
                }`}
              >
                <LayoutDashboard className="w-4 h-4" /> Faculty Analytics
              </button>
            </div>

            {/* Right Profile & Action Utilities */}
            <div className="flex items-center gap-3">
              {/* Theme Toggle */}
              <button
                onClick={toggleTheme}
                title="Toggle Theme"
                className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition border border-transparent hover:border-slate-700"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-indigo-400" />}
              </button>

              {/* User Profile Pill / Auth button */}
              {currentUser ? (
                <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 p-1.5 pl-3 rounded-xl">
                  <div className="flex items-center gap-2 text-xs">
                    {isStudent ? (
                      <GraduationCap className="w-4 h-4 text-indigo-400" />
                    ) : (
                      <Shield className="w-4 h-4 text-amber-400" />
                    )}
                    <div className="text-left hidden sm:block">
                      <p className="font-bold text-white text-xs leading-tight">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-400 font-mono">
                        {isStudent
                          ? `${currentUser.rollNumber} • Sem ${currentUser.semesterCode} (${currentUser.branch})`
                          : `${currentUser.facultyId}`}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    title="Switch Account / Role"
                    className="p-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white rounded-lg transition ml-1"
                  >
                    Switch
                  </button>

                  <button
                    onClick={logout}
                    title="Logout"
                    className="p-1.5 text-xs text-rose-400 hover:text-rose-300 hover:bg-rose-500/10 rounded-lg transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
                >
                  <UserCheck className="w-4 h-4" /> Login Portal
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Auth Modal Trigger */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
    </>
  );
};
