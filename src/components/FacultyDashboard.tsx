import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import {
  LayoutDashboard,
  Users,
  Award,
  BookOpen,
  Sliders,
  CheckCircle2,
  FileSpreadsheet,
  Search,
  Sparkles,
  Clock,
  RefreshCw,
  UserCheck
} from 'lucide-react';

export const FacultyDashboard: React.FC = () => {
  const {
    quizAttempts,
    leaderboard,
    registeredStudents,
    facultyConfig,
    updateFacultyConfig,
    cloudSyncStatus,
    syncCloudData,
    openAuthModal,
  } = useQuiz();

  // Faculty Config Form State
  const [timerMinutes, setTimerMinutes] = useState(facultyConfig.timerMinutes);
  const [passingPercentage, setPassingPercentage] = useState(facultyConfig.passingPercentage);
  const [showInstantFeedback, setShowInstantFeedback] = useState(facultyConfig.showInstantFeedback);
  const [negativeMarking, setNegativeMarking] = useState(facultyConfig.negativeMarking);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Tab State: Submissions Log vs Registered Class Roster
  const [facultyTab, setFacultyTab] = useState<'SUBMISSIONS' | 'ROSTER'>('SUBMISSIONS');

  // Search Filter State
  const [attemptSearch, setAttemptSearch] = useState('');

  // Class Analytics Calculations (from real real-time data only - no dummy users)
  const totalStudents = registeredStudents.length;
  const totalAttempts = quizAttempts.length;

  const avgClassAccuracy =
    quizAttempts.length > 0
      ? Math.round(
          (quizAttempts.reduce((acc, curr) => acc + (curr.score / curr.totalQuestions) * 100, 0) /
            quizAttempts.length) *
            10
        ) / 10
      : 0;

  const passedAttemptsCount = quizAttempts.filter(
    (a) => Math.round((a.score / a.totalQuestions) * 100) >= facultyConfig.passingPercentage
  ).length;

  const passRate = totalAttempts > 0 ? Math.round((passedAttemptsCount / totalAttempts) * 100) : 0;

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

  // Filtered Registered Students Roster
  const filteredRoster = registeredStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(attemptSearch.toLowerCase()) ||
      s.rollNumber.toLowerCase().includes(attemptSearch.toLowerCase()) ||
      s.branch.toLowerCase().includes(attemptSearch.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-50 text-amber-700 border border-amber-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <LayoutDashboard className="w-3.5 h-3.5 text-amber-600" /> Real-Time Faculty Control Center
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Class Analytics & Controls</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Real-time multi-device student quiz monitoring and registration registry. Shows genuine student activity from all devices.
          </p>
        </div>

        <div className="flex flex-col items-start sm:items-end gap-2 relative z-10">
          <div className="bg-white/90 border border-slate-200 p-4 rounded-2xl shadow-sm text-left sm:text-right min-w-[210px]">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">Total Attempts Logged</span>
            <span className="text-2xl font-extrabold text-amber-600 font-mono">{totalAttempts} Submissions</span>
            <span className="text-[11px] text-slate-500 font-medium block mt-0.5">
              Across {totalStudents} Registered Students
            </span>
          </div>

          <button
            onClick={() => syncCloudData()}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-amber-600 text-xs font-bold transition shadow-xs flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${cloudSyncStatus === 'SYNCING' ? 'animate-spin text-amber-600' : ''}`} />
            {cloudSyncStatus === 'SYNCING' ? 'Syncing...' : 'Sync Live Cloud'}
          </button>
        </div>
      </div>

      {/* 4 KPI METRIC CARDS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-3xl p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Enrolled Students</span>
            <Users className="w-4 h-4 text-indigo-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 font-mono">{totalStudents}</p>
          <span className="text-[11px] text-slate-400 block">Real-time registered classmates</span>
        </div>

        <div className="glass-card rounded-3xl p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Class Average Accuracy</span>
            <Award className="w-4 h-4 text-emerald-600" />
          </div>
          <p className="text-3xl font-extrabold text-emerald-600 font-mono">
            {totalAttempts > 0 ? `${avgClassAccuracy}%` : '-'}
          </p>
          <span className="text-[11px] text-emerald-700 font-medium">
            {totalAttempts > 0 ? 'Calculated from live attempts' : 'Awaiting first quiz submission'}
          </span>
        </div>

        <div className="glass-card rounded-3xl p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Class Pass Rate</span>
            <CheckCircle2 className="w-4 h-4 text-amber-600" />
          </div>
          <p className="text-3xl font-extrabold text-amber-600 font-mono">
            {totalAttempts > 0 ? `${passRate}%` : '-'}
          </p>
          <span className="text-[11px] text-slate-500 block">Cutoff score: {facultyConfig.passingPercentage}%</span>
        </div>

        <div className="glass-card rounded-3xl p-5 space-y-2 shadow-sm">
          <div className="flex items-center justify-between text-slate-500 text-xs font-semibold">
            <span>Active Quiz Takers</span>
            <BookOpen className="w-4 h-4 text-purple-600" />
          </div>
          <p className="text-3xl font-extrabold text-slate-900 font-mono">
            {leaderboard.filter((l) => l.quizzesAttempted > 0).length} Students
          </p>
          <span className="text-[11px] text-slate-400 block">Ranked on live leaderboard</span>
        </div>
      </div>

      {/* TWO COLUMN LAYOUT: QUIZ PARAMETERS & ATTEMPTS / ROSTER LOG */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* COLUMN 1: QUIZ CONFIG PARAMETERS */}
        <div className="glass-card rounded-3xl p-6 space-y-6 h-fit shadow-sm">
          <div className="flex items-center gap-2 text-slate-900 font-bold text-lg border-b border-slate-100 pb-3">
            <Sliders className="w-5 h-5 text-amber-600" /> Quiz Execution Controls
          </div>

          <form onSubmit={handleSaveConfig} className="space-y-4 text-xs font-medium">
            <div>
              <label className="block text-slate-700 uppercase tracking-wider text-[10px] font-bold mb-1.5">
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
                  className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-amber-500"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 uppercase tracking-wider text-[10px] font-bold mb-1.5">
                Minimum Passing Benchmark (%)
              </label>
              <input
                type="number"
                min={30}
                max={100}
                value={passingPercentage}
                onChange={(e) => setPassingPercentage(Number(e.target.value))}
                className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-mono focus:outline-none focus:bg-white focus:border-amber-500"
              />
            </div>

            <div className="pt-2 space-y-3 border-t border-slate-100">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-700">Instant Answer Feedback Review</span>
                <input
                  type="checkbox"
                  checked={showInstantFeedback}
                  onChange={(e) => setShowInstantFeedback(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-600 bg-slate-50 border-slate-300 focus:ring-amber-500"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-700">Negative Marking Enforcement</span>
                <input
                  type="checkbox"
                  checked={negativeMarking}
                  onChange={(e) => setNegativeMarking(e.target.checked)}
                  className="w-4 h-4 rounded text-amber-600 bg-slate-50 border-slate-300 focus:ring-amber-500"
                />
              </label>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold rounded-xl shadow-md shadow-amber-600/20 transition flex items-center justify-center gap-2 mt-4"
            >
              <Sparkles className="w-4 h-4" /> Save Quiz Parameters
            </button>

            {saveSuccess && (
              <p className="text-xs text-emerald-700 font-bold text-center animate-in fade-in">
                ✓ Parameters updated successfully!
              </p>
            )}
          </form>
        </div>

        {/* COLUMN 2: DETAILED STUDENT ATTEMPTS & ROSTER LOG TABLE */}
        <div className="lg:col-span-2 glass-card rounded-3xl p-6 space-y-4 shadow-sm">
          {/* Tab Selection */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
            <div className="flex items-center gap-2">
              <button
                onClick={() => setFacultyTab('SUBMISSIONS')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  facultyTab === 'SUBMISSIONS'
                    ? 'bg-amber-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <FileSpreadsheet className="w-3.5 h-3.5" /> Submissions ({quizAttempts.length})
              </button>

              <button
                onClick={() => setFacultyTab('ROSTER')}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
                  facultyTab === 'ROSTER'
                    ? 'bg-indigo-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:text-slate-900'
                }`}
              >
                <Users className="w-3.5 h-3.5" /> Enrolled Classmates ({registeredStudents.length})
              </button>
            </div>

            <div className="relative w-full sm:w-60">
              <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-400" />
              <input
                type="text"
                value={attemptSearch}
                onChange={(e) => setAttemptSearch(e.target.value)}
                placeholder="Search students..."
                className="w-full pl-9 pr-3 py-1.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:bg-white focus:border-amber-500"
              />
            </div>
          </div>

          {/* TAB 1: SUBMISSIONS TABLE */}
          {facultyTab === 'SUBMISSIONS' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] uppercase font-bold text-slate-500 bg-slate-50 border-b border-slate-200/80">
                    <th className="py-2.5 px-4">Student</th>
                    <th className="py-2.5 px-4">Branch</th>
                    <th className="py-2.5 px-4">Quiz / Subject</th>
                    <th className="py-2.5 px-4 text-center">Score</th>
                    <th className="py-2.5 px-4 text-right">Time Taken</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium">
                  {filteredAttempts.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">
                        No quiz attempts logged yet. Real-time submissions from any device will appear here instantly.
                      </td>
                    </tr>
                  ) : (
                    filteredAttempts.map((attempt) => {
                      const pct = Math.round((attempt.score / attempt.totalQuestions) * 100);
                      const isPass = pct >= facultyConfig.passingPercentage;

                      return (
                        <tr key={attempt.id} className="hover:bg-slate-50/80 transition">
                          <td className="py-3 px-4">
                            <p className="font-bold text-slate-900">{attempt.studentName}</p>
                            <span className="text-[10px] font-mono text-slate-500">{attempt.studentRoll}</span>
                          </td>

                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px] text-slate-700">
                              {attempt.branch}
                            </span>
                          </td>

                          <td className="py-3 px-4">
                            <p className="text-slate-800 font-semibold">{attempt.quizTitle}</p>
                            <span className="text-[10px] text-slate-500">{attempt.subjectName}</span>
                          </td>

                          <td className="py-3 px-4 text-center">
                            <span className={`font-mono font-bold px-2 py-0.5 rounded text-xs ${
                              isPass ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
                            }`}>
                              {attempt.score}/10 ({pct}%)
                            </span>
                          </td>

                          <td className="py-3 px-4 text-right font-mono text-slate-500 text-[11px]">
                            {Math.floor(attempt.timeTakenSeconds / 60)}m {attempt.timeTakenSeconds % 60}s
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 2: ROSTER TABLE */}
          {facultyTab === 'ROSTER' && (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-[10px] uppercase font-bold text-slate-500 bg-slate-50 border-b border-slate-200/80">
                    <th className="py-2.5 px-4">Student Name</th>
                    <th className="py-2.5 px-4">Roll Number</th>
                    <th className="py-2.5 px-4">Branch</th>
                    <th className="py-2.5 px-4">Curriculum Semester</th>
                    <th className="py-2.5 px-4 text-center">Quizzes Done</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-xs font-medium">
                  {filteredRoster.length === 0 ? (
                    <tr>
                      <td colSpan={5} className="py-12 text-center text-slate-400">
                        No students enrolled yet. Once classmates open the site and register, their records appear here.
                      </td>
                    </tr>
                  ) : (
                    filteredRoster.map((student) => {
                      const studentLeaderboard = leaderboard.find((l) => l.studentRoll === student.rollNumber);
                      const doneCount = studentLeaderboard?.quizzesAttempted || 0;

                      return (
                        <tr key={student.rollNumber} className="hover:bg-slate-50/80 transition">
                          <td className="py-3 px-4 font-bold text-slate-900">
                            {student.name}
                          </td>

                          <td className="py-3 px-4 font-mono font-bold text-slate-700">
                            {student.rollNumber}
                          </td>

                          <td className="py-3 px-4">
                            <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[10px] text-slate-700">
                              {student.branch}
                            </span>
                          </td>

                          <td className="py-3 px-4 text-slate-600 font-mono text-[11px]">
                            Sem {student.semesterCode} ({student.admissionYear} Batch)
                          </td>

                          <td className="py-3 px-4 text-center">
                            <span className={`px-2.5 py-0.5 rounded-full text-xs font-mono font-bold ${
                              doneCount > 0
                                ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                                : 'bg-slate-100 text-slate-500 border border-slate-200'
                            }`}>
                              {doneCount} Quizzes
                            </span>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
