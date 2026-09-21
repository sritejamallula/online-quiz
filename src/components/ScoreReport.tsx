import React, { useEffect, useState } from 'react';
import { useQuiz } from '../context/QuizContext';
import confetti from 'canvas-confetti';
import {
  Trophy,
  CheckCircle2,
  XCircle,
  Clock,
  RotateCcw,
  ArrowRight,
  BookOpen,
  Filter,
  Sparkles,
  Award,
  HelpCircle,
  Lightbulb
} from 'lucide-react';

export const ScoreReport: React.FC = () => {
  const { lastCompletedAttempt, activeQuiz, startQuiz, selectSubject, navigateTo } = useQuiz();
  const [filterMode, setFilterMode] = useState<'ALL' | 'CORRECT' | 'INCORRECT'>('ALL');

  useEffect(() => {
    if (lastCompletedAttempt && lastCompletedAttempt.score >= 7) {
      // Trigger Confetti Celebration
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
      });
    }
  }, [lastCompletedAttempt]);

  if (!lastCompletedAttempt || !activeQuiz) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center text-slate-400">
        No completed quiz report found.{' '}
        <button onClick={() => navigateTo('SUBJECTS')} className="text-indigo-400 underline">
          Return to Subjects
        </button>
      </div>
    );
  }

  const { score, totalQuestions, timeTakenSeconds, userAnswers } = lastCompletedAttempt;
  const pct = Math.round((score / totalQuestions) * 100);

  // Performance Grade & Badge
  const getGrade = (percentage: number) => {
    if (percentage >= 90) return { label: 'Outstanding Excellence!', color: 'text-emerald-400', badge: 'bg-emerald-500/10 border-emerald-500/30' };
    if (percentage >= 70) return { label: 'Great Job!', color: 'text-indigo-400', badge: 'bg-indigo-500/10 border-indigo-500/30' };
    if (percentage >= 50) return { label: 'Good Effort - Room to Improve', color: 'text-amber-400', badge: 'bg-amber-500/10 border-amber-500/30' };
    return { label: 'Needs Re-study', color: 'text-rose-400', badge: 'bg-rose-500/10 border-rose-500/30' };
  };

  const grade = getGrade(pct);

  // Format Time
  const mins = Math.floor(timeTakenSeconds / 60);
  const secs = timeTakenSeconds % 60;
  const timeFormatted = `${mins}m ${secs}s`;

  // Filter questions
  const filteredQuestions = activeQuiz.questions.filter((q) => {
    const userChoice = userAnswers[q.id];
    const isCorrect = userChoice !== undefined && userChoice === q.correctIndex;
    if (filterMode === 'CORRECT') return isCorrect;
    if (filterMode === 'INCORRECT') return !isCorrect;
    return true;
  });

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* PERFORMANCE SUMMARY BANNER */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 text-center relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-600/20 border border-indigo-500/30 text-indigo-400 shadow-xl mb-2">
          <Trophy className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className={`inline-block text-xs font-extrabold uppercase px-3 py-1 rounded-full border ${grade.badge} ${grade.color}`}>
            {grade.label}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Evaluation Quiz Results
          </h1>
          <p className="text-xs text-slate-400">{lastCompletedAttempt.quizTitle} • {lastCompletedAttempt.subjectName}</p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Final Score</span>
            <span className="text-3xl font-extrabold text-white font-mono">{score} / {totalQuestions}</span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Accuracy</span>
            <span className={`text-3xl font-extrabold font-mono ${pct >= 70 ? 'text-emerald-400' : 'text-amber-400'}`}>
              {pct}%
            </span>
          </div>

          <div className="bg-slate-900/80 border border-slate-800 p-4 rounded-2xl">
            <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Time Elapsed</span>
            <span className="text-3xl font-extrabold text-indigo-400 font-mono flex items-center justify-center gap-1">
              <Clock className="w-5 h-5 inline" /> {timeFormatted}
            </span>
          </div>
        </div>

        {/* Primary Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => startQuiz(activeQuiz.id)}
            className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold rounded-xl border border-slate-700 transition flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Re-attempt Quiz
          </button>

          <button
            onClick={() => navigateTo('LEADERBOARD')}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-emerald-600/30 transition flex items-center gap-2"
          >
            <Award className="w-4 h-4" /> View Leaderboard Rank
          </button>

          <button
            onClick={() => selectSubject(lastCompletedAttempt.subjectId)}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" /> Return to Modules
          </button>
        </div>
      </div>

      {/* COMPREHENSIVE ANSWER BREAKDOWN & REVIEW */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-400" /> Detailed Answer Analysis & Explanations
            </h2>
            <p className="text-xs text-slate-400 mt-1">Review GFG-style step-by-step logic, code execution, or UHV value rationales</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center p-1 bg-slate-900 border border-slate-800 rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilterMode('ALL')}
              className={`px-3 py-1.5 rounded-lg transition ${filterMode === 'ALL' ? 'bg-indigo-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              All ({activeQuiz.questions.length})
            </button>
            <button
              onClick={() => setFilterMode('CORRECT')}
              className={`px-3 py-1.5 rounded-lg transition ${filterMode === 'CORRECT' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Correct ({score})
            </button>
            <button
              onClick={() => setFilterMode('INCORRECT')}
              className={`px-3 py-1.5 rounded-lg transition ${filterMode === 'INCORRECT' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-white'}`}
            >
              Incorrect ({totalQuestions - score})
            </button>
          </div>
        </div>

        {/* Questions Breakdown List */}
        <div className="space-y-6">
          {filteredQuestions.map((q, idx) => {
            const userChoice = userAnswers[q.id];
            const isCorrect = userChoice !== undefined && userChoice === q.correctIndex;
            const originalIndex = activeQuiz.questions.findIndex((item) => item.id === q.id);

            return (
              <div
                key={q.id}
                className={`glass-card rounded-2xl p-6 border space-y-4 ${
                  isCorrect ? 'border-emerald-500/30' : 'border-rose-500/30'
                }`}
              >
                {/* Question Status Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <span className="text-xs font-bold font-mono text-slate-400">
                    Question {originalIndex + 1} of {totalQuestions}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      q.difficulty === 'EASY' ? 'badge-easy' : q.difficulty === 'MODERATE' ? 'badge-moderate' : 'badge-hard'
                    }`}>
                      {q.difficulty}
                    </span>

                    {isCorrect ? (
                      <span className="text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/30 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5" /> +1 Point (Correct)
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-rose-400 bg-rose-500/10 px-2.5 py-0.5 rounded-full border border-rose-500/30 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5" /> 0 Points (Incorrect)
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Text */}
                <h3 className="text-base sm:text-lg font-bold text-white">{q.text}</h3>

                {/* Code Snippet if present */}
                {q.codeSnippet && (
                  <div className="rounded-xl bg-slate-950 p-3.5 border border-slate-800">
                    <pre className="text-xs text-indigo-300 font-mono"><code>{q.codeSnippet}</code></pre>
                  </div>
                )}

                {/* 4 Options breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((optText, optIdx) => {
                    const isUserPick = userChoice === optIdx;
                    const isCorrectOpt = optIdx === q.correctIndex;
                    const letter = String.fromCharCode(65 + optIdx);

                    let cardStyle = 'bg-slate-900/60 border-slate-800 text-slate-400';

                    if (isCorrectOpt) {
                      cardStyle = 'bg-emerald-500/15 border-emerald-500/50 text-white font-semibold ring-1 ring-emerald-500/30';
                    } else if (isUserPick && !isCorrectOpt) {
                      cardStyle = 'bg-rose-500/15 border-rose-500/50 text-rose-300 font-semibold';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3 rounded-xl border text-xs flex items-center gap-3 ${cardStyle}`}
                      >
                        <span className={`w-6 h-6 rounded-lg font-mono font-bold flex items-center justify-center text-xs ${
                          isCorrectOpt
                            ? 'bg-emerald-500 text-white'
                            : isUserPick
                            ? 'bg-rose-500 text-white'
                            : 'bg-slate-800 text-slate-500'
                        }`}>
                          {letter}
                        </span>

                        <span className="flex-1">{optText}</span>

                        {isCorrectOpt && <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0" />}
                        {isUserPick && !isCorrectOpt && <XCircle className="w-4 h-4 text-rose-400 flex-shrink-0" />}
                      </div>
                    );
                  })}
                </div>

                {/* In-Depth GFG Technical Explanation Box */}
                <div className="rounded-xl bg-indigo-950/40 border border-indigo-500/20 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-300">
                    <Sparkles className="w-4 h-4 text-indigo-400" /> GeeksforGeeks Style Step-by-Step Technical Rationale
                  </div>
                  <p className="text-xs text-slate-300 whitespace-pre-line leading-relaxed font-sans">
                    {q.explanation}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
