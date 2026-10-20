import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Branch } from '../types';
import {
  Trophy,
  Crown,
  Search,
  Filter,
  Users,
  RefreshCw,
  UserCheck,
  Sparkles,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight
} from 'lucide-react';

export const LeaderboardTable: React.FC = () => {
  const {
    leaderboard,
    registeredStudents,
    currentUser,
    cloudSyncStatus,
    syncCloudData,
    openAuthModal,
    navigateTo,
  } = useQuiz();

  const [activeTab, setActiveTab] = useState<'LEADERBOARD' | 'REGISTERED'>('LEADERBOARD');
  const [selectedBranch, setSelectedBranch] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter leaderboard rankings
  const filteredLeaderboard = leaderboard.filter((item) => {
    const matchesBranch = selectedBranch === 'ALL' || item.branch === selectedBranch;
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentRoll.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBranch && matchesSearch;
  });

  // Filter registered students directory
  const filteredStudents = registeredStudents.filter((student) => {
    const matchesBranch = selectedBranch === 'ALL' || student.branch === selectedBranch;
    const matchesSearch =
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.rollNumber.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBranch && matchesSearch;
  });

  // Scorers with at least 1 completed quiz
  const scorers = filteredLeaderboard.filter((item) => item.quizzesAttempted > 0);
  const top3 = scorers.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-xs font-semibold">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <Trophy className="w-3.5 h-3.5 text-emerald-600" /> Real-Time Live Class Registry
          </div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Class Rankings & Registered Cohort</h1>
          <p className="text-xs sm:text-sm text-slate-600">
            Real-time live scores and classmates roster synchronized across all devices. Everyone who registers on their device appears here instantly.
          </p>
        </div>

        {/* Sync Controls & Total Count */}
        <div className="flex flex-col items-start sm:items-end gap-2 relative z-10">
          <div className="bg-white/90 border border-slate-200 p-4 rounded-2xl shadow-sm text-left sm:text-right min-w-[210px]">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
              Registered Classmates
            </span>
            <span className="text-2xl font-extrabold text-slate-900 font-mono">
              {registeredStudents.length} Students
            </span>
            <span className="text-[11px] text-emerald-600 font-semibold block mt-0.5">
              • {scorers.length} Active Quiz Takers
            </span>
          </div>

          <button
            onClick={() => syncCloudData()}
            className="px-3.5 py-1.5 rounded-xl bg-white hover:bg-slate-50 border border-slate-200 text-slate-700 hover:text-indigo-600 text-xs font-bold transition shadow-xs flex items-center gap-2"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${cloudSyncStatus === 'SYNCING' ? 'animate-spin text-indigo-600' : ''}`} />
            {cloudSyncStatus === 'SYNCING' ? 'Syncing...' : 'Sync Live Cloud'}
          </button>
        </div>
      </div>

      {/* Primary Tab Switcher: Leaderboard vs Registered Students */}
      <div className="flex items-center gap-2 p-1.5 bg-slate-100/90 rounded-2xl border border-slate-200 w-fit">
        <button
          onClick={() => setActiveTab('LEADERBOARD')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'LEADERBOARD'
              ? 'bg-indigo-600 text-white shadow-md shadow-indigo-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Trophy className="w-4 h-4" /> Score Leaderboard ({scorers.length})
        </button>

        <button
          onClick={() => setActiveTab('REGISTERED')}
          className={`px-5 py-2.5 rounded-xl text-xs font-bold transition flex items-center gap-2 ${
            activeTab === 'REGISTERED'
              ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/20'
              : 'text-slate-600 hover:text-slate-900 hover:bg-white'
          }`}
        >
          <Users className="w-4 h-4" /> All Registered Classmates ({registeredStudents.length})
        </button>
      </div>

      {/* TOP 3 PODIUM GRAPHICS (Show only when real scorers exist in Leaderboard tab) */}
      {activeTab === 'LEADERBOARD' && top3.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
          {/* 2ND PLACE (SILVER) */}
          {top3[1] && (
            <div className="glass-card rounded-3xl p-6 border border-slate-200 relative flex flex-col justify-between order-2 md:order-1 bg-gradient-to-b from-slate-100/80 to-white shadow-md">
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-full bg-slate-200 text-slate-800 font-extrabold font-mono text-sm flex items-center justify-center shadow-inner border border-slate-300">
                  2
                </span>
                <span className="text-xs font-bold text-slate-700 flex items-center gap-1">
                  🥈 Silver Rank
                </span>
              </div>
              <div className="space-y-1 mb-4">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">{top3[1].studentName}</h3>
                <p className="text-xs font-mono text-slate-500">{top3[1].studentRoll} • {top3[1].branch}</p>
              </div>
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">{top3[1].quizzesAttempted} Quizzes</span>
                <span className="font-extrabold text-slate-900 text-sm">{top3[1].totalScore} pts ({top3[1].accuracyPercentage}%)</span>
              </div>
            </div>
          )}

          {/* 1ST PLACE (GOLD) */}
          {top3[0] && (
            <div className="glass-card rounded-3xl p-6 border-2 border-amber-300 relative flex flex-col justify-between order-1 md:order-2 bg-gradient-to-b from-amber-100/60 via-amber-50/40 to-white shadow-xl shadow-amber-500/10 scale-105">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-amber-500 to-yellow-500 text-slate-950 font-extrabold text-[10px] uppercase px-3.5 py-0.5 rounded-full flex items-center gap-1 shadow-sm">
                <Crown className="w-3 h-3 fill-current" /> Class Champion
              </div>

              <div className="flex items-center justify-between mb-4 mt-2">
                <span className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-extrabold font-mono text-base flex items-center justify-center shadow-md ring-4 ring-amber-200">
                  1
                </span>
                <span className="text-xs font-extrabold text-amber-800 flex items-center gap-1">
                  🥇 Gold Rank
                </span>
              </div>

              <div className="space-y-1 mb-4">
                <h3 className="text-xl font-extrabold text-slate-900 tracking-tight">{top3[0].studentName}</h3>
                <p className="text-xs font-mono text-amber-800/80 font-bold">{top3[0].studentRoll} • {top3[0].branch}</p>
              </div>

              <div className="pt-3 border-t border-amber-200 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-600">{top3[0].quizzesAttempted} Quizzes</span>
                <span className="font-extrabold text-amber-900 text-base">{top3[0].totalScore} pts ({top3[0].accuracyPercentage}%)</span>
              </div>
            </div>
          )}

          {/* 3RD PLACE (BRONZE) */}
          {top3[2] && (
            <div className="glass-card rounded-3xl p-6 border border-amber-200/80 relative flex flex-col justify-between order-3 bg-gradient-to-b from-orange-50/60 to-white shadow-md">
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-full bg-amber-200 text-amber-900 font-extrabold font-mono text-sm flex items-center justify-center shadow-inner border border-amber-300">
                  3
                </span>
                <span className="text-xs font-bold text-amber-800 flex items-center gap-1">
                  🥉 Bronze Rank
                </span>
              </div>
              <div className="space-y-1 mb-4">
                <h3 className="text-lg font-bold text-slate-900 tracking-tight">{top3[2].studentName}</h3>
                <p className="text-xs font-mono text-slate-500">{top3[2].studentRoll} • {top3[2].branch}</p>
              </div>
              <div className="pt-3 border-t border-slate-200/80 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-500">{top3[2].quizzesAttempted} Quizzes</span>
                <span className="font-extrabold text-amber-800 text-sm">{top3[2].totalScore} pts ({top3[2].accuracyPercentage}%)</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* FILTER & SEARCH UTILITIES */}
      <div className="glass-panel rounded-2xl p-4 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Branch Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1 text-xs font-semibold w-full sm:w-auto">
          <span className="text-slate-500 text-xs font-medium mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Branch:
          </span>
          {['ALL', 'CSE', 'AI&DS', 'IT', 'ECE', 'EEE'].map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBranch(b)}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedBranch === b
                  ? 'bg-indigo-600 text-white font-bold shadow-sm'
                  : 'bg-white text-slate-600 hover:text-slate-900 border border-slate-200'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Roll No or Name..."
            className="w-full pl-10 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs text-slate-900 placeholder-slate-400 focus:outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-500/10"
          />
        </div>
      </div>

      {/* TAB 1: FULL LEADERBOARD RANKINGS TABLE */}
      {activeTab === 'LEADERBOARD' && (
        <div className="glass-card rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/90 text-[11px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200/80">
                  <th className="py-3.5 px-6">Rank</th>
                  <th className="py-3.5 px-6">Student Details</th>
                  <th className="py-3.5 px-6">Branch</th>
                  <th className="py-3.5 px-6 text-center">Quizzes Attended</th>
                  <th className="py-3.5 px-6 text-center">Total Score</th>
                  <th className="py-3.5 px-6 text-center">Accuracy %</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium">
                {filteredLeaderboard.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-14 text-center">
                      <div className="max-w-md mx-auto space-y-3">
                        <Users className="w-10 h-10 text-indigo-400 mx-auto" />
                        <h3 className="text-base font-bold text-slate-800">No Registered Students Found</h3>
                        <p className="text-xs text-slate-500 leading-relaxed">
                          No classmates match the current filters. Register on this website to appear in real-time across all devices!
                        </p>
                        <button
                          onClick={openAuthModal}
                          className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl text-xs font-bold transition shadow-md shadow-indigo-600/20 inline-flex items-center gap-2"
                        >
                          <UserCheck className="w-4 h-4" /> Register as Student
                        </button>
                      </div>
                    </td>
                  </tr>
                ) : (
                  filteredLeaderboard.map((item, index) => {
                    const isCurrentUser =
                      currentUser?.role === 'STUDENT' && currentUser.rollNumber === item.studentRoll;
                    const hasScored = item.quizzesAttempted > 0;

                    return (
                      <tr
                        key={item.studentRoll}
                        className={`hover:bg-indigo-50/40 transition ${
                          isCurrentUser ? 'bg-indigo-50/80 font-bold ring-1 ring-indigo-300' : ''
                        }`}
                      >
                        <td className="py-4 px-6 font-mono font-bold">
                          {hasScored ? (
                            <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg ${
                              item.rank === 1
                                ? 'bg-amber-400 text-slate-950 font-black shadow-sm'
                                : item.rank === 2
                                ? 'bg-slate-200 text-slate-900 font-black shadow-sm'
                                : item.rank === 3
                                ? 'bg-amber-700 text-white font-black shadow-sm'
                                : 'bg-slate-100 text-slate-700'
                            }`}>
                              #{item.rank || index + 1}
                            </span>
                          ) : (
                            <span className="inline-flex items-center justify-center px-2 py-0.5 rounded-md bg-slate-100 text-slate-500 text-[10px] font-bold">
                              NEW
                            </span>
                          )}
                        </td>

                        <td className="py-4 px-6">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900 text-sm">{item.studentName}</span>
                            {isCurrentUser && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                                YOU
                              </span>
                            )}
                          </div>
                          <span className="text-slate-500 font-mono text-[11px]">{item.studentRoll}</span>
                        </td>

                        <td className="py-4 px-6">
                          <span className="px-2.5 py-1 rounded-md bg-slate-100 border border-slate-200 text-slate-700 font-mono text-[11px]">
                            {item.branch}
                          </span>
                        </td>

                        <td className="py-4 px-6 text-center font-mono text-slate-700">
                          {hasScored ? (
                            <span className="font-bold">{item.quizzesAttempted} Quizzes</span>
                          ) : (
                            <span className="text-slate-400 text-[11px] italic">Ready to attempt</span>
                          )}
                        </td>

                        <td className="py-4 px-6 text-center font-mono font-bold text-slate-900 text-sm">
                          {hasScored ? item.totalScore : '-'}
                        </td>

                        <td className="py-4 px-6 text-center font-mono font-extrabold text-emerald-700">
                          {hasScored ? `${item.accuracyPercentage}%` : '-'}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* TAB 2: ALL REGISTERED CLASSMATES DIRECTORY */}
      {activeTab === 'REGISTERED' && (
        <div className="glass-card rounded-3xl border border-slate-200/90 overflow-hidden shadow-sm space-y-4 p-6">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                <Users className="w-5 h-5 text-emerald-600" /> Real-Time Class Roster ({filteredStudents.length} Students)
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                All classmates who have opened the platform and registered from their phones or laptops.
              </p>
            </div>

            <button
              onClick={openAuthModal}
              className="px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-xl text-xs font-bold transition shadow-xs flex items-center gap-1.5"
            >
              <UserCheck className="w-4 h-4" /> Add / Register Student
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-slate-50/90 text-[11px] uppercase tracking-wider text-slate-500 font-bold border-b border-slate-200/80">
                  <th className="py-3 px-4">Student</th>
                  <th className="py-3 px-4">Roll Number</th>
                  <th className="py-3 px-4">Branch</th>
                  <th className="py-3 px-4">Semester & Batch</th>
                  <th className="py-3 px-4">Registration Time</th>
                  <th className="py-3 px-4 text-center">Quizzes Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 text-xs font-medium">
                {filteredStudents.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-12 text-center text-slate-400">
                      No classmates registered yet in this filter. Open this site on any device and register to be visible here!
                    </td>
                  </tr>
                ) : (
                  filteredStudents.map((student) => {
                    const isSelf = currentUser?.role === 'STUDENT' && currentUser.rollNumber === student.rollNumber;
                    const studentLeaderboard = leaderboard.find((l) => l.studentRoll === student.rollNumber);
                    const attemptedCount = studentLeaderboard?.quizzesAttempted || 0;

                    let regDate = 'Recent';
                    if (student.registeredAt) {
                      try {
                        const d = new Date(student.registeredAt);
                        regDate = d.toLocaleDateString(undefined, {
                          month: 'short',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        });
                      } catch {
                        regDate = 'Recent';
                      }
                    }

                    return (
                      <tr key={student.rollNumber} className={`hover:bg-slate-50 transition ${isSelf ? 'bg-indigo-50/70' : ''}`}>
                        <td className="py-3.5 px-4">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-slate-900">{student.name}</span>
                            {isSelf && (
                              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-100 text-indigo-700 border border-indigo-200">
                                YOU
                              </span>
                            )}
                          </div>
                        </td>

                        <td className="py-3.5 px-4 font-mono font-bold text-slate-700">
                          {student.rollNumber}
                        </td>

                        <td className="py-3.5 px-4">
                          <span className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200 font-mono text-[11px] text-slate-700">
                            {student.branch}
                          </span>
                        </td>

                        <td className="py-3.5 px-4 text-slate-600 font-mono text-[11px]">
                          Sem {student.semesterCode} • {student.admissionYear} Batch
                        </td>

                        <td className="py-3.5 px-4 text-slate-500 font-mono text-[11px]">
                          {regDate}
                        </td>

                        <td className="py-3.5 px-4 text-center">
                          {attemptedCount > 0 ? (
                            <span className="px-2.5 py-1 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 text-[11px] font-bold inline-flex items-center gap-1">
                              <CheckCircle2 className="w-3 h-3 text-emerald-600" /> {attemptedCount} Attended
                            </span>
                          ) : (
                            <span className="px-2.5 py-1 rounded-full bg-slate-100 text-slate-500 border border-slate-200 text-[11px] font-medium inline-flex items-center gap-1">
                              <Clock className="w-3 h-3 text-slate-400" /> Registered
                            </span>
                          )}
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
