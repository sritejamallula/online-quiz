import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { ArrowLeft, Clock, HelpCircle, Play, RotateCcw, ChevronRight, CheckCircle2, Sparkles, Award } from 'lucide-react';

export const QuizList: React.FC = () => {
  const { activeSubject, activeLesson, startQuiz, navigateTo, getBestQuizAttempt } = useQuiz();

  if (!activeSubject || !activeLesson) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-slate-400">
        No module selected.{' '}
        <button onClick={() => navigateTo('SUBJECTS')} className="text-indigo-400 underline font-semibold">
          Return to Subjects
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-400">
        <button onClick={() => navigateTo('SUBJECTS')} className="hover:text-white transition flex items-center gap-1">
          <ArrowLeft className="w-3.5 h-3.5" /> Subjects Catalog
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <button onClick={() => navigateTo('LESSONS')} className="hover:text-white transition">
          {activeSubject.name}
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-600" />
        <span className="text-indigo-400 font-bold">{activeLesson.title}</span>
      </div>

      {/* Module Banner */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 relative overflow-hidden flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="space-y-2 relative z-10 max-w-2xl">
          <span className="text-xs font-bold font-mono px-3 py-1 rounded-lg bg-indigo-500/15 text-indigo-400 border border-indigo-500/30 inline-flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" /> {activeSubject.code} • Module 0{activeLesson.moduleNumber}
          </span>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight leading-snug">
            {activeLesson.title}
          </h1>
          <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{activeLesson.description}</p>
        </div>

        <button
          onClick={() => navigateTo('LESSONS')}
          className="px-4 py-2.5 bg-slate-900/90 hover:bg-slate-800 text-slate-300 hover:text-white rounded-xl text-xs font-bold border border-slate-800 transition flex items-center gap-2 relative z-10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Modules
        </button>
      </div>

      {/* Quiz List Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-extrabold text-white tracking-tight flex items-center gap-2">
            <Award className="w-5 h-5 text-indigo-400" /> Module Evaluation Quizzes
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Complete Quiz 01 through Quiz 05 to evaluate your subject knowledge with 10 questions each.
          </p>
        </div>
      </div>

      {/* 5 Quizzes List Cards */}
      <div className="space-y-4">
        {activeLesson.quizzes.map((quiz) => {
          const bestAttempt = getBestQuizAttempt(quiz.id);
          const isAttempted = bestAttempt !== null;
          const pctScore = isAttempted ? Math.round((bestAttempt.score / bestAttempt.totalQuestions) * 100) : 0;

          return (
            <div
              key={quiz.id}
              className={`glass-card rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 transition duration-300 hover:-translate-y-0.5 ${
                isAttempted ? 'border-emerald-500/30' : 'hover:border-indigo-500/50'
              }`}
            >
              {/* Quiz Information */}
              <div className="space-y-2.5 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold font-mono px-3 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    Quiz 0{quiz.quizNumber}
                  </span>

                  {isAttempted ? (
                    <span className="text-[11px] font-extrabold px-2.5 py-0.5 rounded-full bg-emerald-500/15 text-emerald-400 border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Completed
                    </span>
                  ) : (
                    <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-slate-900 text-slate-400 border border-slate-800">
                      Ready to Start
                    </span>
                  )}
                </div>

                <h3 className="text-lg font-extrabold text-white tracking-tight leading-snug">{quiz.title}</h3>

                <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-0.5">
                  <span className="flex items-center gap-1.5 font-medium">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-400" /> 10 Questions
                  </span>
                  <span className="flex items-center gap-1.5 font-medium">
                    <Clock className="w-3.5 h-3.5 text-indigo-400" /> {quiz.durationMinutes} Minutes Limit
                  </span>
                  <span className="text-slate-500 font-medium">• 1 Point per Correct Answer</span>
                </div>
              </div>

              {/* Best Score & Action Button */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full md:w-auto border-t md:border-t-0 pt-4 md:pt-0 border-slate-800">
                {isAttempted && (
                  <div className="bg-slate-900/90 border border-slate-800 rounded-xl px-4 py-2.5 text-left sm:text-right min-w-[140px]">
                    <span className="text-[10px] uppercase font-extrabold text-slate-400 block tracking-wider">Best Result</span>
                    <span className="text-sm font-black text-emerald-400 font-mono flex items-center justify-start sm:justify-end gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" /> {bestAttempt.score}/10 ({pctScore}%)
                    </span>
                  </div>
                )}

                <button
                  onClick={() => startQuiz(quiz.id)}
                  className={`w-full sm:w-auto px-6 py-3 rounded-xl text-xs font-extrabold transition flex items-center justify-center gap-2 shadow-lg ${
                    isAttempted
                      ? 'bg-slate-800 hover:bg-slate-700 text-white border border-slate-700'
                      : 'bg-gradient-to-r from-indigo-600 via-indigo-500 to-violet-600 hover:from-indigo-500 hover:to-violet-500 text-white shadow-indigo-600/30'
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
