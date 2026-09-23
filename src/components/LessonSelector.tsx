import React from 'react';
import { useQuiz } from '../context/QuizContext';
import { ArrowLeft, BookOpen, Layers, CheckCircle2, ChevronRight, Play } from 'lucide-react';

export const LessonSelector: React.FC = () => {
  const { activeSubject, selectLesson, navigateTo, getLessonProgress } = useQuiz();

  if (!activeSubject) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-12 text-center text-slate-400">
        No subject selected.{' '}
        <button onClick={() => navigateTo('SUBJECTS')} className="text-indigo-400 underline">
          Return to Subjects
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Breadcrumb Navigation */}
      <div className="flex items-center gap-2 text-xs font-semibold text-slate-500">
        <button
          onClick={() => navigateTo('SUBJECTS')}
          className="hover:text-indigo-600 transition flex items-center gap-1"
        >
          <ArrowLeft className="w-3.5 h-3.5" /> Subjects Catalog
        </button>
        <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
        <span className="text-indigo-600 font-bold">{activeSubject.name} Modules</span>
      </div>

      {/* Subject Header Card */}
      <div className="glass-panel-glow rounded-3xl p-6 sm:p-8 relative overflow-hidden">
        <div className={`absolute -right-12 -top-12 w-64 h-64 bg-gradient-to-br ${activeSubject.colorTheme} opacity-15 rounded-full blur-3xl pointer-events-none`} />

        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-2xl">
            <span className="text-xs font-mono font-bold px-3 py-1 rounded-lg bg-indigo-50 text-indigo-700 border border-indigo-200">
              {activeSubject.code} Curriculum
            </span>
            <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">{activeSubject.name}</h1>
            <p className="text-sm text-slate-600 leading-relaxed">{activeSubject.description}</p>
          </div>

          <div className="bg-white/90 border border-slate-200 shadow-sm rounded-2xl p-4 text-center sm:text-right min-w-[200px]">
            <span className="text-xs text-slate-500 uppercase tracking-wider font-bold block mb-1">
              Modules Included
            </span>
            <span className="text-2xl font-extrabold text-slate-900 font-mono">
              5 Modules / 25 Quizzes
            </span>
          </div>
        </div>
      </div>

      {/* Lessons List Header */}
      <div>
        <h2 className="text-xl font-bold text-slate-900 tracking-tight flex items-center gap-2">
          <Layers className="w-5 h-5 text-indigo-600" /> Select Module / Lesson
        </h2>
        <p className="text-xs text-slate-500 mt-1">Each module contains 5 evaluation quizzes with 10 questions each</p>
      </div>

      {/* 5 Lessons Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {activeSubject.lessons.map((lesson) => {
          const { completed, total } = getLessonProgress(lesson.id);
          const isCompleted = completed === total;

          return (
            <div
              key={lesson.id}
              onClick={() => selectLesson(lesson.id)}
              className="glass-card rounded-3xl p-6 flex flex-col justify-between cursor-pointer group hover:-translate-y-1 transition duration-300 relative overflow-hidden"
            >
              <div>
                {/* Module Badge */}
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-bold font-mono px-3 py-1 rounded-full bg-indigo-50 text-indigo-700 border border-indigo-200">
                    Module 0{lesson.moduleNumber}
                  </span>
                  {isCompleted && (
                    <span className="text-xs font-semibold text-emerald-700 flex items-center gap-1 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" /> Module Done
                    </span>
                  )}
                </div>

                {/* Lesson Title */}
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-indigo-600 transition-colors mb-2 leading-snug">
                  {lesson.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed mb-6 line-clamp-3">
                  {lesson.description}
                </p>
              </div>

              {/* Bottom Progress Bar & Trigger */}
              <div className="pt-4 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium">Quizzes Status</span>
                  <span className="font-bold text-slate-900 font-mono">{completed} / {total} Completed</span>
                </div>

                {/* Progress bar */}
                <div className="w-full h-2 rounded-full bg-slate-100 border border-slate-200/60 overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-indigo-500 to-violet-600 rounded-full transition-all duration-300"
                    style={{ width: `${(completed / total) * 100}%` }}
                  />
                </div>

                <div className="flex items-center justify-between pt-1">
                  <span className="text-xs text-slate-500 font-mono">50 Questions Total</span>
                  <button className="text-xs font-bold text-indigo-600 group-hover:text-indigo-700 transition flex items-center gap-1">
                    Open Quizzes <Play className="w-3.5 h-3.5 fill-current" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
