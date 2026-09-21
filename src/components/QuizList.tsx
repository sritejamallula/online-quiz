import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { ArrowLeft, Clock, HelpCircle, Trophy, Play, RotateCcw, ChevronRight, CheckCircle2 } from 'lucide-react';

export const QuizList: React.FC = () => {
  const { activeSubject, activeLesson, startQuiz, navigateTo, getBestQuizAttempt } = useQuiz();

  if (!activeSubject || !activeLesson) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-slate-400">
        No module selected.{' '}
        <button onClick={() => navigateTo('SUBJECTS')} className="text-indigo-400 underline">
          Return to Subjects
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <button onClick={() => navigateTo('SUBJECTS')} className="hover:text-white transition">
          Subjects
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <button onClick={() => navigateTo('LESSONS')} className="hover:text-white transition">
          {activeSubject.name}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-indigo-400 font-bold">{activeLesson.title}</span>
      </div>

      {/* Module Banner */}
      <div className="glass-panel rounded-3xl p-6 sm:p-8 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2">
          <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            {activeSubject.code} • Module 0{activeLesson.moduleNumber}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
            {activeLesson.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300">{activeLesson.description}</p>
        </div>

        <button
          onClick={() => navigateTo('LESSONS')}
          className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-semibold border border-slate-800 transition flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Modules
        </button>
      </div>

      {/* Quiz List Header */}
      <div>
        <h2 className="text-xl font-bold text-white tracking-tight">Module Evaluation Quizzes</h2>
        <p className="text-xs text-slate-400 mt-1">
          Complete Quiz 1 through Quiz 5 to test your knowledge. Each quiz features 10 questions (4 Easy, 3 Moderate, 3 Hard).
        </p>
      </div>

      {/* 5 Quizzes List */}
      <div className="space-y-4">
        {activeLesson.quizzes.map((quiz) => {
          const bestAttempt = getBestQuizAttempt(quiz.id);
          const isAttempted = bestAttempt !== null;
          const pctScore = isAttempted ? Math.round((bestAttempt.score / bestAttempt.totalQuestions) * 100) : 0;

          return (
            <div
              key={quiz.id}
              className="glass-card rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 hover:border-indigo-500/40 transition"
            >
              {/* Quiz Information */}
              <div className="space-y-2 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold font-mono px-2.5 py-0.5 rounded-md bg-indigo-600/20 text-indigo-400 border border-indigo-500/30">
                    Quiz 0{quiz.quizNumber}
                  </span>

                  {/* Difficulty Breakdown Badges */}
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full badge-easy">
                    4 EASY
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full badge-moderate">
                    3 MODERATE
                  </span>
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded-full badge-hard">
                    3 HARD
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white tracking-tight">{quiz.title}</h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
                  <span className="flex items-center gap-1">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-400" /> 10 Questions
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" /> {quiz.durationMinutes} Minutes Limit
                  </span>
                  <span className="text-slate-500">• 1 Point per Correct Answer</span>
                </div>
              </div>

              {/* Best Score & Action Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-slate-800">
                {isAttempted && (
                  <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-left sm:text-right min-w-[130px]">
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Best Result</span>
                    <span className="text-sm font-extrabold text-emerald-400 font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> {bestAttempt.score} / 10 ({pctScore}%)
                    </span>
                  </div>
                )}

                <button
                  onClick={() => startQuiz(quiz.id)}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-bold transition flex items-center justify-center gap-2 shadow-lg ${
                    isAttempted
                      ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                      : 'bg-gradient-to-r from-indigo-600 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/30'
                  }`}
                >
                  {isAttempted ? (
                    <>
                      <RotateCcw className="w-4 h-4" /> Re-attempt Quiz
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" /> Start Quiz
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
