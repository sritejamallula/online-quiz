import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import {
  LayoutDashboard,
  Users,
  Award,
  BookOpen,
  Settings,
  Sliders,
  CheckCircle2,
  FileSpreadsheet,
  Search,
  Sparkles,
  ShieldAlert,
  Clock
} from 'lucide-react';

export const FacultyDashboard: React.FC = () => {
  const { quizAttempts, leaderboard, facultyConfig, updateFacultyConfig, subjects } = useQuiz();

  // Faculty Config Form State
  const [timerMinutes, setTimerMinutes] = useState(facultyConfig.timerMinutes);
  const [passingPercentage, setPassingPercentage] = useState(facultyConfig.passingPercentage);
  const [showInstantFeedback, setShowInstantFeedback] = useState(facultyConfig.showInstantFeedback);
  const [negativeMarking, setNegativeMarking] = useState(facultyConfig.negativeMarking);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Student Attempt Filter State
  const [attemptSearch, setAttemptSearch] = useState('');

  // Class Analytics Calculations
  const totalStudents = leaderboard.length;
  const totalAttempts = quizAttempts.length;

  const avgClassAccuracy =
    leaderboard.length > 0
      ? Math.round(leaderboard.reduce((acc, curr) => acc + curr.accuracyPercentage, 0) / leaderboard.length)
      : 85;

  const passedAttemptsCount = quizAttempts.filter(
    (a) => Math.round((a.score / a.totalQuestions) * 100) >= facultyConfig.passingPercentage
  ).length;

  const passRate = totalAttempts > 0 ? Math.round((passedAttemptsCount / totalAttempts) * 100) : 92;

  const handleSaveConfig = (e: React.FormEvent) => {
    e.preventDefault();
    updateFacultyConfig({
      timerMinutes,
      passingPercentage,
      showInstantFeedback,
      negativeMarking,
    });
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  // Filtered Student Attempts Log
  const filteredAttempts = quizAttempts.filter(
    (a) =>
      a.studentName.toLowerCase().includes(attemptSearch.toLowerCase()) ||
      a.studentRoll.toLowerCase().includes(attemptSearch.toLowerCase()) ||
      a.subjectName.toLowerCase().includes(attemptSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/30 text-xs font-semibold">
            <LayoutDashboard className="w-3.5 h-3.5" /> Faculty Analytical Dashboard
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Class Analytics & Controls</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Monitor real-time student quiz performance metrics, inspect detailed attempts, and configure evaluation parameters.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-right min-w-[200px]">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Total Attempts Logged</span>
          <span className="text-2xl font-extrabold text-amber-400 font-mono">{totalAttempts} Submissions</span>
        </div>
      </div>

      {/* 4 KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Enrolled Students</span>
            <Users className="w-4 h-4 text-indigo-400" />
          </div>
          <p className="text-3xl font-extrabold text-white font-mono">{totalStudents}</p>
          <span className="text-[11px] text-slate-500 block">Across CSE, AI&DS, IT, ECE & EEE</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Class Average Accuracy</span>
            <Award className="w-4 h-4 text-emerald-400" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-400 font-mono">{avgClassAccuracy}%</p>
          <span className="text-[11px] text-emerald-500/80 font-medium">Above benchmark targets</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Class Pass Rate</span>
            <CheckCircle2 className="w-4 h-4 text-amber-400" />
          </div>
          <p className="text-3xl font-extrabold text-amber-400 font-mono">{passRate}%</p>
          <span className="text-[11px] text-slate-500 block">Cutoff score: {facultyConfig.passingPercentage}%</span>
        </div>

        <div className="glass-card rounded-2xl p-5 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400 text-xs font-semibold">
            <span>Core Subjects Covered</span>
            <BookOpen className="w-4 h-4 text-purple-400" />
          </div>
          <p className="text-3xl font-extrabold text-white font-mono">5 Core</p>
          <span className="text-[11px] text-slate-500 block">DBMS, ADS, DMGT, Java, UHV</span>
        </div>
      </div>

      {/* TWO COLUMN LAYOUT: QUIZ PARAMETERS & ATTEMPTS LOG */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COLUMN 1: QUIZ CONFIG PARAMETERS */}
        <div className="glass-card rounded-2xl p-6 border border-slate-800 space-y-6 h-fit">
          <div className="flex items-center gap-2 text-white font-bold text-lg border-b border-slate-800 pb-3">
            <Sliders className="w-5 h-5 text-amber-400" /> Quiz Execution Controls
          </div>

          <form onSubmit={handleSaveConfig} className="space-y-4 text-xs font-medium">
            <div>
              <label className="block text-slate-300 uppercase tracking-wider text-[10px] font-bold mb-1.5">
                Default Quiz Duration (Minutes)
              </label>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <input
                  type="number"
                  min={1}
                  max={60}
                  value={timerMinutes}
                  onChange={(e) => setTimerMinutes(Number(e.target.value))}
                  className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-300 uppercase tracking-wider text-[10px] font-bold mb-1.5">
                Minimum Passing Benchmark (%)
              </label>
              <input
                type="number"
                min={30}
                max={100}
                value={passingPercentage}
                onChange={(e) => setPassingPercentage(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-950 border border-slate-800 rounded-xl text-white font-mono focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="pt-2 space-y-3 border-t border-slate-800">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-300">Instant Answer Feedback Review</span>
                <input
                  type="checkbox"
                  checked={showInstantFeedback}
                  onChange={(e) => setShowInstantFeedback(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 bg-slate-950 border-slate-800 focus:ring-amber-500"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-300">Negative Marking Enforcement</span>
                <input
                  type="checkbox"
                  checked={negativeMarking}
                  onChange={(e) => setNegativeMarking(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-500 bg-slate-950 border-slate-800 focus:ring-amber-500"
                />
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-amber-600/20 transition flex items-center justify-center gap-2 mt-4"
            >
              <Sparkles className="w-4 h-4" /> Save Quiz Parameters
            </button>

            {saveSuccess && (
              <p className="text-xs text-emerald-400 font-bold text-center animate-in fade-in">
                ✓ Parameters updated successfully!
              </p>
            )}
          </form>
        </div>

        {/* COLUMN 2: DETAILED STUDENT ATTEMPTS LOG TABLE */}
        <div className="lg:col-span-2 glass-card rounded-2xl p-6 border border-slate-800 space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-800 pb-4">
            <div>
              <h3 className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
                <FileSpreadsheet className="w-5 h-5 text-indigo-400" /> Student Evaluation Log
              </h3>
              <p className="text-xs text-slate-400">Detailed submissions and score breakdowns</p>
            </div>

            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
              <input
                type="text"
                value={attemptSearch}
                onChange={(e) => setAttemptSearch(e.target.value)}
                placeholder="Filter by Student or Subject..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-amber-500"
              />
            </div>
          </div>

          {/* Attempts Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="text-[10px] uppercase font-bold text-slate-400 bg-slate-900/80 border-b border-slate-800">
                  <th className="py-2.5 px-4">Student</th>
                  <th className="py-2.5 px-4">Branch</th>
                  <th className="py-2.5 px-4">Quiz / Subject</th>
                  <th className="py-2.5 px-4 text-center">Score</th>
                  <th className="py-2.5 px-4 text-right">Time Taken</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 text-xs font-medium">
                {filteredAttempts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-8 text-center text-slate-500">
                      No student attempt records found. Start taking quizzes to log results!
                    </td>
                  </tr>
                ) : (
                  filteredAttempts.map((attempt) => {
                    const pct = Math.round((attempt.score / attempt.totalQuestions) * 100);
                    const isPass = pct >= facultyConfig.passingPercentage;

                    return (
                      <tr key={attempt.id} className="hover:bg-slate-800/30 transition">
                        <td className="py-3 px-4">
                          <p className="font-bold text-white">{attempt.studentName}</p>
                          <span className="text-[10px] font-mono text-slate-400">{attempt.studentRoll}</span>
                        </td>

                        <td className="py-3 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 font-mono text-[10px] text-slate-300">
                            {attempt.branch}
                          </span>
                        </td>

                        <td className="py-3 px-4">
                          <p className="text-slate-200 font-semibold">{attempt.quizTitle}</p>
                          <span className="text-[10px] text-slate-400">{attempt.subjectName}</span>
                        </td>

                        <td className="py-3 px-4 text-center">
                          <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                            isPass ? 'bg-emerald-500/15 text-emerald-400' : 'bg-rose-500/15 text-rose-400'
                          }`}>
                            {attempt.score}/10 ({pct}%)
                          </span>
                        </td>

                        <td className="py-3 px-4 text-right font-mono text-slate-400 text-[11px]">
                          {Math.floor(attempt.timeTakenSeconds / 60)}m {attempt.timeTakenSeconds % 60}s
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
