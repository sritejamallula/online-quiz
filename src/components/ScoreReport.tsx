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
    if (percentage >= 90) return { label: 'Outstanding Excellence!', color: 'text-emerald-700', badge: 'bg-emerald-50 border-emerald-200' };
    if (percentage >= 70) return { label: 'Great Job!', color: 'text-indigo-700', badge: 'bg-indigo-50 border-indigo-200' };
    if (percentage >= 50) return { label: 'Good Effort - Room to Improve', color: 'text-amber-700', badge: 'bg-amber-50 border-amber-200' };
    return { label: 'Needs Re-study', color: 'text-rose-700', badge: 'bg-rose-50 border-rose-200' };
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
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 text-center relative overflow-hidden space-y-6">
        <div className="absolute top-0 right-0 w-80 h-80 bg-indigo-500/10 rounded-full blur-3xl pointer-events-none" />

        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-50 border border-indigo-200 text-indigo-600 shadow-sm mb-2">
          <Trophy className="w-8 h-8" />
        </div>

        <div className="space-y-1">
          <span className={`inline-block text-xs font-extrabold uppercase px-3.5 py-1 rounded-full border ${grade.badge} ${grade.color}`}>
            {grade.label}
          </span>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Evaluation Quiz Results
          </h1>
          <p className="text-xs text-slate-500">{lastCompletedAttempt.quizTitle} • {lastCompletedAttempt.subjectName}</p>
        </div>

        {/* 3 Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl mx-auto">
          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Final Score</span>
            <span className="text-3xl font-extrabold text-slate-900 font-mono">{score} / {totalQuestions}</span>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Accuracy</span>
            <span className={`text-3xl font-extrabold font-mono ${pct >= 70 ? 'text-emerald-600' : 'text-amber-600'}`}>
              {pct}%
            </span>
          </div>

          <div className="bg-white border border-slate-200 p-4 rounded-2xl shadow-sm">
            <span className="text-[10px] uppercase font-bold text-slate-500 block mb-1">Time Elapsed</span>
            <span className="text-3xl font-extrabold text-indigo-600 font-mono flex items-center justify-center gap-1">
              <Clock className="w-5 h-5 inline" /> {timeFormatted}
            </span>
          </div>
        </div>

        {/* Primary Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            onClick={() => startQuiz(activeQuiz.id)}
            className="px-5 py-2.5 bg-white hover:bg-slate-100 text-slate-700 text-xs font-bold rounded-xl border border-slate-200 shadow-sm transition flex items-center gap-2"
          >
            <RotateCcw className="w-4 h-4" /> Re-attempt Quiz
          </button>

          <button
            onClick={() => navigateTo('LEADERBOARD')}
            className="px-5 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition flex items-center gap-2"
          >
            <Award className="w-4 h-4" /> View Leaderboard Rank
          </button>

          <button
            onClick={() => selectSubject(lastCompletedAttempt.subjectId)}
            className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition flex items-center gap-2"
          >
            <BookOpen className="w-4 h-4" /> Return to Modules
          </button>
        </div>
      </div>

      {/* COMPREHENSIVE ANSWER BREAKDOWN & REVIEW */}
      <div className="space-y-6">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" /> Detailed Answer Analysis & Explanations
            </h2>
            <p className="text-xs text-slate-500 mt-1">Review GFG-style step-by-step logic, code execution, or UHV value rationales</p>
          </div>

          {/* Filter Tabs */}
          <div className="flex items-center p-1 bg-white border border-slate-200 shadow-sm rounded-xl text-xs font-semibold">
            <button
              onClick={() => setFilterMode('ALL')}
              className={`px-3 py-1.5 rounded-lg transition ${filterMode === 'ALL' ? 'bg-indigo-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              All ({activeQuiz.questions.length})
            </button>
            <button
              onClick={() => setFilterMode('CORRECT')}
              className={`px-3 py-1.5 rounded-lg transition ${filterMode === 'CORRECT' ? 'bg-emerald-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
            >
              Correct ({score})
            </button>
            <button
              onClick={() => setFilterMode('INCORRECT')}
              className={`px-3 py-1.5 rounded-lg transition ${filterMode === 'INCORRECT' ? 'bg-rose-600 text-white shadow-sm' : 'text-slate-600 hover:text-slate-900'}`}
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
                className={`glass-card rounded-3xl p-6 space-y-4 border ${
                  isCorrect ? 'border-emerald-200' : 'border-rose-200'
                }`}
              >
                {/* Question Status Header */}
                <div className="flex items-center justify-between pb-3 border-b border-slate-100">
                  <span className="text-xs font-bold font-mono text-slate-500">
                    Question {originalIndex + 1} of {totalQuestions}
                  </span>

                  <div className="flex items-center gap-2">
                    <span className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                      q.difficulty === 'EASY' ? 'badge-easy' : q.difficulty === 'MODERATE' ? 'badge-moderate' : 'badge-hard'
                    }`}>
                      {q.difficulty}
                    </span>

                    {isCorrect ? (
                      <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 flex items-center gap-1">
                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> +1 Point (Correct)
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-rose-700 bg-rose-50 px-2.5 py-0.5 rounded-full border border-rose-200 flex items-center gap-1">
                        <XCircle className="w-3.5 h-3.5 text-rose-600" /> 0 Points (Incorrect)
                      </span>
                    )}
                  </div>
                </div>

                {/* Question Text */}
                <h3 className="text-base sm:text-lg font-bold text-slate-900">{q.text}</h3>

                {/* Code Snippet if present */}
                {q.codeSnippet && (
                  <div className="rounded-2xl bg-slate-900 p-4 border border-slate-800 shadow-inner">
                    <pre className="text-xs text-indigo-300 font-mono"><code>{q.codeSnippet}</code></pre>
                  </div>
                )}

                {/* 4 Options breakdown */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((optText, optIdx) => {
                    const isUserPick = userChoice === optIdx;
                    const isCorrectOpt = optIdx === q.correctIndex;
                    const letter = String.fromCharCode(65 + optIdx);

                    let cardStyle = 'bg-slate-50 border-slate-200 text-slate-600';

                    if (isCorrectOpt) {
                      cardStyle = 'bg-emerald-50 border-emerald-300 text-emerald-950 font-semibold ring-1 ring-emerald-300/60';
                    } else if (isUserPick && !isCorrectOpt) {
                      cardStyle = 'bg-rose-50 border-rose-300 text-rose-950 font-semibold';
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`p-3.5 rounded-2xl border text-xs flex items-center gap-3 ${cardStyle}`}
                      >
                        <span className={`w-6 h-6 rounded-lg font-mono font-bold flex items-center justify-center text-xs ${
                          isCorrectOpt
                            ? 'bg-emerald-600 text-white'
                            : isUserPick
                            ? 'bg-rose-600 text-white'
                            : 'bg-white border border-slate-200 text-slate-500'
                        }`}>
                          {letter}
                        </span>

                        <span className="flex-1">{optText}</span>

                        {isCorrectOpt && <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />}
                        {isUserPick && !isCorrectOpt && <XCircle className="w-4 h-4 text-rose-600 flex-shrink-0" />}
                      </div>
                    );
                  })}
                </div>

                {/* In-Depth GFG Technical Explanation Box */}
                <div className="rounded-2xl bg-indigo-50/70 border border-indigo-200/80 p-4 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-indigo-900">
                    <Sparkles className="w-4 h-4 text-indigo-600" /> GeeksforGeeks Style Step-by-Step Technical Rationale
                  </div>
                  <p className="text-xs text-slate-700 whitespace-pre-line leading-relaxed font-sans">
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
