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
      <nav className="sticky top-0 z-40 w-full bg-white/85 backdrop-blur-xl border-b border-slate-200/80 shadow-sm shadow-slate-200/50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            
            {/* Logo & Brand */}
            <div
              onClick={() => navigateTo('SUBJECTS')}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-violet-600 to-emerald-500 p-0.5 shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform">
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-indigo-600 group-hover:rotate-12 transition-transform" />
                </div>
              </div>
              <div>
                <span className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-1.5">
                  AcademiaQuiz <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200/80">B.Tech</span>
                </span>
              </div>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:flex items-center space-x-1 bg-slate-100/80 p-1 rounded-2xl border border-slate-200/80">
              <button
                onClick={() => navigateTo('SUBJECTS')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeView === 'SUBJECTS' || activeView === 'LESSONS' || activeView === 'QUIZ_LIST'
                    ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <BookOpen className="w-4 h-4" /> 8-Sem Subjects
              </button>

              <button
                onClick={() => navigateTo('LEADERBOARD')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeView === 'LEADERBOARD'
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
                }`}
              >
                <Trophy className="w-4 h-4" /> Class Leaderboard
              </button>

              <button
                onClick={() => navigateTo('FACULTY_DASHBOARD')}
                className={`px-4 py-2 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
                  activeView === 'FACULTY_DASHBOARD'
                    ? 'bg-amber-600 text-white shadow-md shadow-amber-600/20'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-white'
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
                className="p-2 rounded-xl text-slate-500 hover:text-slate-900 hover:bg-slate-100 transition border border-transparent hover:border-slate-200"
              >
                {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-500" /> : <Moon className="w-4 h-4 text-indigo-600" />}
              </button>

              {/* User Profile Pill / Auth button */}
              {currentUser ? (
                <div className="flex items-center gap-2 bg-slate-100/90 border border-slate-200 p-1.5 pl-3 rounded-2xl">
                  <div className="flex items-center gap-2 text-xs">
                    {isStudent ? (
                      <GraduationCap className="w-4 h-4 text-indigo-600" />
                    ) : (
                      <Shield className="w-4 h-4 text-amber-600" />
                    )}
                    <div className="text-left hidden sm:block">
                      <p className="font-extrabold text-slate-900 text-xs leading-tight">{currentUser.name}</p>
                      <p className="text-[10px] text-slate-500 font-mono font-medium">
                        {isStudent
                          ? `${currentUser.rollNumber} • Sem ${currentUser.semesterCode} (${currentUser.branch})`
                          : `${currentUser.facultyId}`}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => setIsAuthModalOpen(true)}
                    title="Switch Account / Role"
                    className="p-1.5 text-xs bg-white hover:bg-slate-50 text-slate-700 hover:text-slate-900 rounded-xl font-bold shadow-xs border border-slate-200 transition ml-1"
                  >
                    Switch
                  </button>

                  <button
                    onClick={logout}
                    title="Logout"
                    className="p-1.5 text-xs text-rose-600 hover:text-rose-700 hover:bg-rose-50 rounded-xl transition"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setIsAuthModalOpen(true)}
                  className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white text-xs font-extrabold rounded-xl shadow-md shadow-indigo-600/20 transition flex items-center gap-2"
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
