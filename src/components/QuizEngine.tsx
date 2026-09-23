import React, { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Question, Difficulty } from '../types';
import {
  Clock,
  Flag,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Send,
  Sparkles,
  HelpCircle
} from 'lucide-react';

export const QuizEngine: React.FC = () => {
  const { activeQuiz, activeSubject, activeLesson, submitQuiz, facultyConfig, navigateTo } = useQuiz();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<{ [qId: string]: number }>({});
  const [flaggedQuestions, setFlaggedQuestions] = useState<Set<string>>(new Set());
  const [timeLeftSeconds, setTimeLeftSeconds] = useState(
    (facultyConfig.timerMinutes || 10) * 60
  );
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);

  // Timer countdown
  useEffect(() => {
    if (timeLeftSeconds <= 0) {
      handleFinalSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeftSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeftSeconds]);

  if (!activeQuiz || !activeSubject || !activeLesson) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12 text-center text-slate-400">
        No active quiz in session.{' '}
        <button onClick={() => navigateTo('SUBJECTS')} className="text-indigo-400 underline">
          Return to Subjects
        </button>
      </div>
    );
  }

  const currentQuestion: Question = activeQuiz.questions[currentIndex];
  const totalQuestions = activeQuiz.questions.length;
  const answeredCount = Object.keys(userAnswers).length;

  const handleSelectOption = (optionIndex: number) => {
    setUserAnswers((prev) => ({
      ...prev,
      [currentQuestion.id]: optionIndex,
    }));
  };

  const handleClearOption = () => {
    setUserAnswers((prev) => {
      const copy = { ...prev };
      delete copy[currentQuestion.id];
      return copy;
    });
  };

  const toggleFlag = () => {
    setFlaggedQuestions((prev) => {
      const copy = new Set(prev);
      if (copy.has(currentQuestion.id)) {
        copy.delete(currentQuestion.id);
      } else {
        copy.add(currentQuestion.id);
      }
      return copy;
    });
  };

  const handleFinalSubmit = () => {
    const elapsed = (facultyConfig.timerMinutes || 10) * 60 - timeLeftSeconds;
    submitQuiz(userAnswers, elapsed > 0 ? elapsed : 1);
  };

  // Format Time
  const minutes = Math.floor(timeLeftSeconds / 60);
  const seconds = timeLeftSeconds % 60;
  const timeFormatted = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  const isTimeLow = timeLeftSeconds <= 120; // less than 2 mins

  // Difficulty badge styling
  const getDifficultyBadge = (diff: Difficulty) => {
    switch (diff) {
      case 'EASY':
        return <span className="badge-easy px-3 py-1 rounded-full text-xs font-bold font-mono">EASY</span>;
      case 'MODERATE':
        return <span className="badge-moderate px-3 py-1 rounded-full text-xs font-bold font-mono">MODERATE</span>;
      case 'HARD':
        return <span className="badge-hard px-3 py-1 rounded-full text-xs font-bold font-mono">HARD</span>;
    }
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      {/* Quiz Control Bar */}
      <div className="glass-panel rounded-2xl p-4 sm:p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600">
            <span>{activeSubject.name}</span> • <span>Module 0{activeLesson.moduleNumber}</span>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight">{activeQuiz.title}</h1>
        </div>

        {/* Live Countdown Timer */}
        <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all ${
          isTimeLow
            ? 'bg-rose-50 border-rose-200 text-rose-700 animate-pulse'
            : 'bg-white border-slate-200 text-slate-800 shadow-sm'
        }`}>
          <Clock className={`w-4 h-4 ${isTimeLow ? 'text-rose-600' : 'text-indigo-600'}`} />
          <div className="text-right">
            <span className="text-[10px] uppercase font-bold text-slate-500 block leading-tight">Time Remaining</span>
            <span className="text-lg font-extrabold font-mono tracking-wider">{timeFormatted}</span>
          </div>
        </div>
      </div>

      {/* QUESTION PALETTE GRID NAVIGATION BAR (1-10) */}
      <div className="glass-card rounded-2xl p-4 space-y-3">
        <div className="flex items-center justify-between text-xs font-semibold">
          <span className="text-slate-700 flex items-center gap-1.5 font-bold">
            <HelpCircle className="w-4 h-4 text-indigo-600" /> Question Palette ({answeredCount}/{totalQuestions} Answered)
          </span>
          <div className="flex items-center gap-4 text-[11px] text-slate-500">
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 inline-block" /> Answered
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block" /> Flagged
            </span>
            <span className="flex items-center gap-1">
              <span className="w-2.5 h-2.5 rounded-full bg-slate-300 inline-block" /> Unanswered
            </span>
          </div>
        </div>

        {/* 10 Question Buttons Grid */}
        <div className="grid grid-cols-5 sm:grid-cols-10 gap-2">
          {activeQuiz.questions.map((q, idx) => {
            const isCurrent = idx === currentIndex;
            const isAnswered = userAnswers[q.id] !== undefined;
            const isFlagged = flaggedQuestions.has(q.id);

            let btnClasses = 'bg-slate-100 text-slate-600 border-slate-200 hover:border-indigo-300';

            if (isCurrent) {
              btnClasses = 'ring-2 ring-indigo-500 bg-indigo-600 text-white font-extrabold border-transparent shadow-md';
            } else if (isFlagged) {
              btnClasses = 'bg-amber-50 text-amber-700 border-amber-300 font-bold';
            } else if (isAnswered) {
              btnClasses = 'bg-emerald-50 text-emerald-700 border-emerald-300 font-bold';
            }

            return (
              <button
                key={q.id}
                onClick={() => setCurrentIndex(idx)}
                className={`py-2 text-xs font-mono rounded-xl border transition flex items-center justify-center relative ${btnClasses}`}
              >
                {idx + 1}
                {isFlagged && <span className="absolute top-0.5 right-0.5 w-1.5 h-1.5 bg-amber-500 rounded-full" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* QUESTION DISPLAY CARD */}
      <div className="glass-card rounded-3xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
        {/* Top Header: Question Index & Difficulty Badge */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100">
          <span className="text-xs font-bold font-mono text-slate-500 uppercase tracking-wider">
            Question {currentIndex + 1} of {totalQuestions}
          </span>
          {getDifficultyBadge(currentQuestion.difficulty)}
        </div>

        {/* Question Text */}
        <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-relaxed">
          {currentQuestion.text}
        </h2>

        {/* Code Snippet (if present) */}
        {currentQuestion.codeSnippet && (
          <div className="rounded-2xl bg-slate-900 p-4 border border-slate-800 shadow-inner overflow-x-auto">
            <pre className="text-xs text-indigo-300 font-mono leading-relaxed">
              <code>{currentQuestion.codeSnippet}</code>
            </pre>
          </div>
        )}

        {/* 4 Options Grid */}
        <div className="space-y-3 pt-2">
          {currentQuestion.options.map((optionText, optIdx) => {
            const isSelected = userAnswers[currentQuestion.id] === optIdx;
            const optionLetter = String.fromCharCode(65 + optIdx); // A, B, C, D

            return (
              <div
                key={optIdx}
                onClick={() => handleSelectOption(optIdx)}
                className={`p-4 rounded-2xl border cursor-pointer transition flex items-center gap-4 ${
                  isSelected
                    ? 'bg-indigo-50/90 border-indigo-500 shadow-md shadow-indigo-500/10'
                    : 'bg-slate-50/80 border-slate-200/90 hover:border-indigo-300 hover:bg-white'
                }`}
              >
                {/* Custom Radio Letter Pill */}
                <div className={`w-8 h-8 rounded-xl flex items-center justify-center font-mono font-bold text-xs transition ${
                  isSelected
                    ? 'bg-indigo-600 text-white shadow-sm'
                    : 'bg-white border border-slate-200 text-slate-600'
                }`}>
                  {optionLetter}
                </div>

                {/* Option Content */}
                <span className={`text-sm flex-1 font-medium ${isSelected ? 'text-indigo-950 font-bold' : 'text-slate-700'}`}>
                  {optionText}
                </span>

                {/* Selected Check icon */}
                {isSelected && <CheckCircle2 className="w-5 h-5 text-indigo-600" />}
              </div>
            );
          })}
        </div>
      </div>

      {/* FOOTER ACTIONS BAR */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={toggleFlag}
            className={`px-4 py-2.5 rounded-xl text-xs font-semibold border transition flex items-center justify-center gap-2 ${
              flaggedQuestions.has(currentQuestion.id)
                ? 'bg-amber-50 text-amber-700 border-amber-300'
                : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
            }`}
          >
            <Flag className="w-4 h-4" /> {flaggedQuestions.has(currentQuestion.id) ? 'Flagged' : 'Flag Question'}
          </button>

          {userAnswers[currentQuestion.id] !== undefined && (
            <button
              onClick={handleClearOption}
              className="px-3 py-2.5 bg-white hover:bg-rose-50 text-slate-600 hover:text-rose-600 text-xs font-medium rounded-xl border border-slate-200 transition"
            >
              Clear Choice
            </button>
          )}
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
          <button
            disabled={currentIndex === 0}
            onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
            className="px-4 py-2.5 bg-white disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50 text-slate-700 text-xs font-semibold rounded-xl border border-slate-200 shadow-sm transition flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" /> Previous
          </button>

          {currentIndex < totalQuestions - 1 ? (
            <button
              onClick={() => setCurrentIndex((prev) => Math.min(totalQuestions - 1, prev + 1))}
              className="px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-bold rounded-xl shadow-md shadow-indigo-600/20 transition flex items-center gap-2"
            >
              Next <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={() => setIsConfirmModalOpen(true)}
              className="px-6 py-2.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-extrabold rounded-xl shadow-md shadow-emerald-600/20 transition flex items-center gap-2"
            >
              <Send className="w-4 h-4" /> Submit Quiz
            </button>
          )}
        </div>
      </div>

      {/* CONFIRMATION SUBMIT MODAL */}
      {isConfirmModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-md p-4 animate-in fade-in">
          <div className="bg-white border border-slate-200 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200">
              <Sparkles className="w-6 h-6" />
            </div>

            <h3 className="text-xl font-bold text-slate-900 tracking-tight">Submit Evaluation Quiz?</h3>
            
            <p className="text-xs text-slate-600 leading-relaxed">
              You have answered <span className="text-emerald-700 font-bold">{answeredCount}</span> of{' '}
              <span className="text-slate-900 font-bold">{totalQuestions}</span> questions.
              {totalQuestions - answeredCount > 0 && (
                <span className="text-amber-700 block mt-1 font-semibold">
                  ⚠️ Note: {totalQuestions - answeredCount} unanswered questions will score 0 points.
                </span>
              )}
            </p>

            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
              <button
                onClick={() => setIsConfirmModalOpen(false)}
                className="px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold rounded-xl transition"
              >
                Back to Questions
              </button>

              <button
                onClick={handleFinalSubmit}
                className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold rounded-xl shadow-md shadow-emerald-600/20 transition"
              >
                Confirm & Calculate Score
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
