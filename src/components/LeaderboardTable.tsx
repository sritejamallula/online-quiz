import React, { useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Branch } from '../types';
import { Trophy, Crown, Search, Filter, Award, Sparkles, UserCheck, Flame } from 'lucide-react';

export const LeaderboardTable: React.FC = () => {
  const { leaderboard, currentUser } = useQuiz();
  const [selectedBranch, setSelectedBranch] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Filter leaderboard
  const filteredData = leaderboard.filter((item) => {
    const matchesBranch = selectedBranch === 'ALL' || item.branch === selectedBranch;
    const matchesSearch =
      item.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.studentRoll.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesBranch && matchesSearch;
  });

  const top3 = filteredData.slice(0, 3);
  const remaining = filteredData.slice(3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="space-y-2 relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 text-xs font-semibold">
            <Trophy className="w-3.5 h-3.5" /> Dynamic Live Scoring & Rank Registry
          </div>
          <h1 className="text-3xl font-extrabold text-white tracking-tight">Class Leaderboard & Rankings</h1>
          <p className="text-xs sm:text-sm text-slate-300">
            Compete across B.Tech branches in real-time. Scores update instantly upon quiz submission.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 p-4 rounded-2xl text-right min-w-[200px]">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">Active Candidates</span>
          <span className="text-2xl font-extrabold text-white font-mono">{leaderboard.length} Students</span>
        </div>
      </div>

      {/* TOP 3 PODIUM GRAPHICS */}
      {top3.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
          {/* 2ND PLACE (SILVER) */}
          {top3[1] && (
            <div className="glass-card rounded-2xl p-6 border border-slate-400/30 relative flex flex-col justify-between order-2 md:order-1 bg-gradient-to-b from-slate-800/40 to-slate-900/80">
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-full bg-slate-300 text-slate-950 font-extrabold font-mono text-sm flex items-center justify-center shadow-lg">
                  2
                </span>
                <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                  🥈 Silver Rank
                </span>
              </div>
              <div className="space-y-1 mb-4">
                <h3 className="text-lg font-bold text-white tracking-tight">{top3[1].studentName}</h3>
                <p className="text-xs font-mono text-slate-400">{top3[1].studentRoll} • {top3[1].branch}</p>
              </div>
              <div className="pt-3 border-t border-slate-700/60 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">{top3[1].quizzesAttempted} Quizzes</span>
                <span className="font-extrabold text-slate-200 text-sm">{top3[1].totalScore} pts ({top3[1].accuracyPercentage}%)</span>
              </div>
            </div>
          )}

          {/* 1ST PLACE (GOLD) */}
          {top3[0] && (
            <div className="glass-card rounded-2xl p-6 border-2 border-amber-500/60 relative flex flex-col justify-between order-1 md:order-2 bg-gradient-to-b from-amber-500/10 via-slate-900/90 to-slate-900 shadow-2xl shadow-amber-500/10 scale-105">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-amber-500 text-slate-950 font-extrabold text-[10px] uppercase px-3 py-0.5 rounded-full flex items-center gap-1 shadow-md">
                <Crown className="w-3 h-3 fill-current" /> Class Champion
              </div>

              <div className="flex items-center justify-between mb-4 mt-2">
                <span className="w-10 h-10 rounded-full bg-amber-400 text-slate-950 font-extrabold font-mono text-base flex items-center justify-center shadow-xl ring-4 ring-amber-500/30">
                  1
                </span>
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1">
                  🥇 Gold Rank
                </span>
              </div>

              <div className="space-y-1 mb-4">
                <h3 className="text-xl font-extrabold text-white tracking-tight">{top3[0].studentName}</h3>
                <p className="text-xs font-mono text-amber-300">{top3[0].studentRoll} • {top3[0].branch}</p>
              </div>

              <div className="pt-3 border-t border-amber-500/30 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-300">{top3[0].quizzesAttempted} Quizzes</span>
                <span className="font-extrabold text-amber-400 text-base">{top3[0].totalScore} pts ({top3[0].accuracyPercentage}%)</span>
              </div>
            </div>
          )}

          {/* 3RD PLACE (BRONZE) */}
          {top3[2] && (
            <div className="glass-card rounded-2xl p-6 border border-amber-700/40 relative flex flex-col justify-between order-3 bg-gradient-to-b from-amber-900/20 to-slate-900/80">
              <div className="flex items-center justify-between mb-4">
                <span className="w-8 h-8 rounded-full bg-amber-700 text-white font-extrabold font-mono text-sm flex items-center justify-center shadow-lg">
                  3
                </span>
                <span className="text-xs font-bold text-amber-500 flex items-center gap-1">
                  🥉 Bronze Rank
                </span>
              </div>
              <div className="space-y-1 mb-4">
                <h3 className="text-lg font-bold text-white tracking-tight">{top3[2].studentName}</h3>
                <p className="text-xs font-mono text-slate-400">{top3[2].studentRoll} • {top3[2].branch}</p>
              </div>
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">{top3[2].quizzesAttempted} Quizzes</span>
                <span className="font-extrabold text-amber-500 text-sm">{top3[2].totalScore} pts ({top3[2].accuracyPercentage}%)</span>
              </div>
            </div>
          )}
        </div>
      )}

      {/* FILTER & SEARCH UTILITIES */}
      <div className="glass-panel rounded-2xl p-4 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4">
        {/* Branch Filter Tabs */}
        <div className="flex flex-wrap items-center gap-1 text-xs font-semibold w-full sm:w-auto">
          <span className="text-slate-400 text-xs font-medium mr-2 flex items-center gap-1">
            <Filter className="w-3.5 h-3.5" /> Branch:
          </span>
          {['ALL', 'CSE', 'AI&DS', 'IT', 'ECE', 'EEE'].map((b) => (
            <button
              key={b}
              onClick={() => setSelectedBranch(b)}
              className={`px-3 py-1.5 rounded-lg transition ${
                selectedBranch === b
                  ? 'bg-indigo-600 text-white font-bold'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {b}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by Roll No or Name..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500"
          />
        </div>
      </div>

      {/* FULL LEADERBOARD TABLE */}
      <div className="glass-card rounded-2xl border border-slate-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-900/90 text-[11px] uppercase tracking-wider text-slate-400 font-bold border-b border-slate-800">
                <th className="py-3.5 px-6">Rank</th>
                <th className="py-3.5 px-6">Student Details</th>
                <th className="py-3.5 px-6">Branch</th>
                <th className="py-3.5 px-6 text-center">Quizzes Attempted</th>
                <th className="py-3.5 px-6 text-center">Total Score</th>
                <th className="py-3.5 px-6 text-center">Accuracy %</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60 text-xs font-medium">
              {filteredData.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-slate-500">
                    No student records match the selected filters.
                  </td>
                </tr>
              ) : (
                filteredData.map((item, index) => {
                  const isCurrentUser =
                    currentUser?.role === 'STUDENT' && currentUser.rollNumber === item.studentRoll;

                  return (
                    <tr
                      key={item.studentRoll}
                      className={`hover:bg-slate-800/40 transition ${
                        isCurrentUser ? 'bg-indigo-950/30 font-bold ring-1 ring-indigo-500/30' : ''
                      }`}
                    >
                      <td className="py-4 px-6 font-mono font-bold">
                        <span className={`inline-flex items-center justify-center w-7 h-7 rounded-lg ${
                          item.rank === 1
                            ? 'bg-amber-400 text-slate-950 font-black'
                            : item.rank === 2
                            ? 'bg-slate-300 text-slate-950 font-black'
                            : item.rank === 3
                            ? 'bg-amber-700 text-white font-black'
                            : 'bg-slate-800 text-slate-300'
                        }`}>
                          #{item.rank || index + 1}
                        </span>
                      </td>

                      <td className="py-4 px-6">
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-white text-sm">{item.studentName}</span>
                          {isCurrentUser && (
                            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30">
                              YOU
                            </span>
                          )}
                        </div>
                        <span className="text-slate-400 font-mono text-[11px]">{item.studentRoll}</span>
                      </td>

                      <td className="py-4 px-6">
                        <span className="px-2.5 py-1 rounded-md bg-slate-900 border border-slate-800 text-slate-300 font-mono text-[11px]">
                          {item.branch}
                        </span>
                      </td>

                      <td className="py-4 px-6 text-center font-mono text-slate-300">
                        {item.quizzesAttempted}
                      </td>

                      <td className="py-4 px-6 text-center font-mono font-bold text-white text-sm">
                        {item.totalScore}
                      </td>

                      <td className="py-4 px-6 text-center font-mono font-extrabold text-emerald-400">
                        {item.accuracyPercentage}%
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
  );
};
