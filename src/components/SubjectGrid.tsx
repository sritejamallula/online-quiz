import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { SemesterCode, AcademicYear } from '../types';
import {
  Database,
  GitMerge,
  FunctionSquare,
  Code,
  HeartHandshake,
  Cpu,
  Network,
  ArrowRight,
  CheckCircle2,
  Filter,
  Sparkles,
  X,
  Calendar,
  Layers,
  Zap,
  Trophy
} from 'lucide-react';

const iconMap: { [key: string]: React.ElementType } = {
  Database,
  GitMerge,
  FunctionSquare,
  Code,
  HeartHandshake,
  Cpu,
  Network,
};

export const SubjectGrid: React.FC = () => {
  const {
    subjects,
    selectSubject,
    getSubjectProgress,
    currentUser,
    selectedSemesterFilter,
    setSelectedSemesterFilter,
    selectedYearFilter,
    setSelectedYearFilter,
    filterToMySemester,
    promotionAlert,
    dismissPromotionAlert,
    quizAttempts,
    leaderboard
  } = useQuiz();

  const isStudent = currentUser?.role === 'STUDENT';

  // Filter subjects by semester or year
  const filteredSubjects = subjects.filter((sub) => {
    if (selectedSemesterFilter !== 'ALL' && sub.semesterCode !== selectedSemesterFilter) {
      return false;
    }
    if (selectedYearFilter !== 'ALL' && sub.year !== selectedYearFilter) {
      return false;
    }
    return true;
  });

  const semesterCodes: SemesterCode[] = ['1-1', '1-2', '2-1', '2-2', '3-1', '3-2', '4-1', '4-2'];

  // User Stats Calculation for Hero
  const myAttempts = isStudent
    ? quizAttempts.filter((a) => a.studentRoll === currentUser.rollNumber)
    : [];

  const userRankEntry = isStudent
    ? leaderboard.find((item) => item.studentRoll === currentUser.rollNumber)
    : null;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* PROMOTION CELEBRATION ALERT BANNER */}
      {promotionAlert && (
        <div className="relative rounded-3xl p-5 bg-gradient-to-r from-emerald-50 via-teal-50 to-white border border-emerald-200 shadow-lg flex items-center justify-between gap-4 animate-in fade-in duration-300">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 flex items-center justify-center font-bold">
              <Sparkles className="w-5 h-5 animate-spin" />
            </div>
            <div>
              <p className="text-sm font-extrabold text-slate-900">{promotionAlert}</p>
              <p className="text-xs text-emerald-700 font-medium">Your syllabus and active quizzes have been updated automatically.</p>
            </div>
          </div>
          <button
            onClick={dismissPromotionAlert}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-xl hover:bg-slate-100 transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}

      {/* STYLISH HERO BANNER WITH USER METRICS */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl from-indigo-200/40 via-purple-200/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 relative z-10">
          <div className="space-y-3 max-w-2xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-indigo-50 border border-indigo-200 text-indigo-700 text-xs font-bold tracking-wide">
              <Zap className="w-4 h-4 fill-current text-indigo-600" /> B.Tech Computer Science & Engineering Portal
            </div>
            <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight leading-tight">
              Interactive Quiz & Real-Time Leaderboard
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-medium">
              Explore 8-semester curriculum subjects, complete 10-question evaluation quizzes with step-by-step GFG technical explanations, and track your global rank.
            </p>
          </div>

          {/* Student Live Stats Pill */}
          {isStudent && (
            <div className="grid grid-cols-2 gap-3 w-full lg:w-auto min-w-[280px]">
              <div className="bg-white/90 border border-slate-200/80 p-4 rounded-2xl shadow-xs">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-0.5">Active Semester</span>
                <span className="text-lg font-black text-indigo-600 font-mono flex items-center gap-1">
                  <Calendar className="w-4 h-4" /> Sem {currentUser.semesterCode}
                </span>
              </div>

              <div className="bg-white/90 border border-slate-200/80 p-4 rounded-2xl shadow-xs">
                <span className="text-[10px] font-extrabold text-slate-400 uppercase tracking-wider block mb-0.5">Leaderboard Rank</span>
                <span className="text-lg font-black text-emerald-600 font-mono flex items-center gap-1">
                  <Trophy className="w-4 h-4" /> {userRankEntry ? `#${userRankEntry.rank}` : 'Unranked'}
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* SEMESTER & YEAR FILTER BAR */}
      <div className="glass-panel rounded-3xl p-6 border border-slate-200/80 space-y-4 shadow-sm">
        {/* Top Controls */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-slate-200/80 pb-4">
          <div className="flex items-center gap-2 text-xs font-bold text-slate-900">
            <Filter className="w-4 h-4 text-indigo-600" /> Filter Curriculum:
            {isStudent && (
              <button
                onClick={filterToMySemester}
                className="ml-2 px-3.5 py-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl font-extrabold transition flex items-center gap-1.5 shadow-md shadow-emerald-600/20"
              >
                <Sparkles className="w-3.5 h-3.5" /> My Current Sem ({currentUser.semesterCode})
              </button>
            )}
          </div>

          {/* Academic Year Filter Pills */}
          <div className="flex items-center gap-1.5 text-xs font-semibold">
            <span className="text-slate-500 text-[11px] mr-1 font-medium">Year:</span>
            <button
              onClick={() => { setSelectedYearFilter('ALL'); setSelectedSemesterFilter('ALL'); }}
              className={`px-3 py-1.5 rounded-xl transition ${
                selectedYearFilter === 'ALL' && selectedSemesterFilter === 'ALL'
                  ? 'bg-indigo-600 text-white font-extrabold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              All 4 Years
            </button>
            {([1, 2, 3, 4] as AcademicYear[]).map((y) => (
              <button
                key={y}
                onClick={() => { setSelectedYearFilter(y); setSelectedSemesterFilter('ALL'); }}
                className={`px-3 py-1.5 rounded-xl transition ${
                  selectedYearFilter === y
                    ? 'bg-indigo-600 text-white font-extrabold shadow-sm'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-200'
                }`}
              >
                Year {y}
              </button>
            ))}
          </div>
        </div>

        {/* 8 Semester Filter Buttons Carousel */}
        <div className="flex flex-wrap items-center gap-2 text-xs font-mono font-bold">
          <span className="text-slate-500 text-[11px] font-sans mr-1 font-medium">Semesters:</span>
          {semesterCodes.map((code) => {
            const isMySem = isStudent && currentUser.semesterCode === code;
            const isSelected = selectedSemesterFilter === code;

            return (
              <button
                key={code}
                onClick={() => { setSelectedSemesterFilter(code); setSelectedYearFilter('ALL'); }}
                className={`px-3.5 py-1.5 rounded-xl border transition flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black border-transparent shadow-md shadow-indigo-600/20'
                    : isMySem
                    ? 'bg-emerald-50 text-emerald-700 border-emerald-300 hover:bg-emerald-100'
                    : 'bg-slate-100/80 text-slate-600 border-slate-200 hover:text-slate-900 hover:bg-white'
                }`}
              >
                Sem {code}
                {isMySem && <span className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid Header & Results Counter */}
      <div className="flex items-center justify-between pt-2">
        <div>
          <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
            <Layers className="w-5 h-5 text-indigo-600" /> B.Tech Subjects Catalog
          </h2>
          <p className="text-xs text-slate-500 mt-0.5 font-medium">Displaying {filteredSubjects.length} subjects</p>
        </div>
      </div>

      {/* STYLISH SUBJECT CARDS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredSubjects.length === 0 ? (
          <div className="col-span-full text-center py-12 glass-card rounded-3xl border border-slate-200 text-slate-500 space-y-3">
            <p className="text-sm font-semibold">No subjects match the selected filter.</p>
            <button
              onClick={() => { setSelectedSemesterFilter('ALL'); setSelectedYearFilter('ALL'); }}
              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl transition"
            >
              Show All 8-Semester Subjects
            </button>
          </div>
        ) : (
          filteredSubjects.map((sub) => {
            const IconComponent = iconMap[sub.iconName] || Database;
            const { completed, total, averageScorePct } = getSubjectProgress(sub.id);
            const progressPercent = Math.round((completed / total) * 100);
            const isMySem = isStudent && currentUser.semesterCode === sub.semesterCode;

            return (
              <div
                key={sub.id}
                onClick={() => selectSubject(sub.id)}
                className={`glass-card rounded-3xl p-6 flex flex-col justify-between cursor-pointer group hover:-translate-y-1.5 transition-all duration-300 relative overflow-hidden ${
                  isMySem ? 'border-emerald-400 shadow-lg shadow-emerald-500/10' : ''
                }`}
              >
                {/* Top Accent Bar */}
                <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${sub.colorTheme}`} />

                <div>
                  {/* Icon & Badges */}
                  <div className="flex items-center justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${sub.colorTheme} p-0.5 shadow-md shadow-indigo-500/10 group-hover:scale-110 transition-transform`}>
                      <div className="w-full h-full bg-white rounded-[14px] flex items-center justify-center text-indigo-600">
                        <IconComponent className="w-6 h-6" />
                      </div>
                    </div>

                    <div className="flex items-center gap-1.5">
                      <span className="text-[11px] font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-100 text-indigo-700 border border-slate-200">
                        Sem {sub.semesterCode}
                      </span>
                      {isMySem && (
                        <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700 border border-emerald-200">
                          Active Sem
                        </span>
                      )}
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 leading-snug">
                    {sub.name}
                  </h3>
                  <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed mb-6 font-medium">
                    {sub.description}
                  </p>
                </div>

                {/* Bottom Progress & Trigger */}
                <div className="space-y-3 pt-4 border-t border-slate-100">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Progress</span>
                    <span className="font-extrabold text-slate-900 font-mono">
                      {completed}/{total} Quizzes ({progressPercent}%)
                    </span>
                  </div>

                  {/* Progress Bar */}
                  <div className="w-full h-2 rounded-full bg-slate-100 border border-slate-200/80 overflow-hidden">
                    <div
                      className={`h-full bg-gradient-to-r ${sub.colorTheme} transition-all duration-500 rounded-full`}
                      style={{ width: `${progressPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    {completed > 0 ? (
                      <span className="text-[11px] text-emerald-600 flex items-center gap-1 font-extrabold">
                        <CheckCircle2 className="w-3.5 h-3.5" /> Avg: {averageScorePct}%
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 font-medium">5 Modules • 25 Quizzes</span>
                    )}

                    <span className="text-xs font-extrabold text-indigo-600 group-hover:translate-x-1 transition-transform flex items-center gap-1">
                      Start Quizzes <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
