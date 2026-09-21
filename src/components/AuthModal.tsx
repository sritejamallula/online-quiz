import React, { useState, useEffect } from 'react';
import { useQuiz } from '../context/QuizContext';
import { Branch, SemesterCode } from '../types';
import { calculateSemesterFromAdmission } from '../utils/promotionEngine';
import { UserCheck, Shield, GraduationCap, X, Sparkles, Calendar, Layers, BookOpen } from 'lucide-react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const { loginStudent, loginFaculty } = useQuiz();
  const [roleMode, setRoleMode] = useState<'STUDENT' | 'FACULTY'>('STUDENT');

  // Student Form State
  const [studentName, setStudentName] = useState('');
  const [rollNumber, setRollNumber] = useState('');
  const [branch, setBranch] = useState<Branch>('CSE');
  const [admissionYear, setAdmissionYear] = useState<number>(2024);
  const [selectedSemesterCode, setSelectedSemesterCode] = useState<SemesterCode>('2-1');

  // Sync auto-suggested semester when admissionYear changes
  useEffect(() => {
    const autoSem = calculateSemesterFromAdmission(admissionYear);
    setSelectedSemesterCode(autoSem.semesterCode);
  }, [admissionYear]);

  // Faculty Form State
  const [facultyName, setFacultyName] = useState('');
  const [facultyId, setFacultyId] = useState('');
  const [department, setDepartment] = useState('Computer Science & Engineering');

  if (!isOpen) return null;

  const handleStudentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!studentName.trim() || !rollNumber.trim()) return;
    loginStudent(studentName.trim(), rollNumber.trim(), branch, admissionYear, selectedSemesterCode);
    onClose();
  };

  const handleFacultySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!facultyName.trim() || !facultyId.trim()) return;
    loginFaculty(facultyName.trim(), facultyId.trim(), department);
    onClose();
  };

  const semesterOptions: { code: SemesterCode; label: string }[] = [
    { code: '1-1', label: 'Year 1, Sem 1 (Sem 1-1)' },
    { code: '1-2', label: 'Year 1, Sem 2 (Sem 1-2)' },
    { code: '2-1', label: 'Year 2, Sem 1 (Sem 2-1)' },
    { code: '2-2', label: 'Year 2, Sem 2 (Sem 2-2)' },
    { code: '3-1', label: 'Year 3, Sem 1 (Sem 3-1)' },
    { code: '3-2', label: 'Year 3, Sem 2 (Sem 3-2)' },
    { code: '4-1', label: 'Year 4, Sem 1 (Sem 4-1)' },
    { code: '4-2', label: 'Year 4, Sem 2 (Sem 4-2)' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl relative overflow-hidden glow-border-indigo">
        {/* Glow Background Accents */}
        <div className="absolute -top-28 -right-28 w-56 h-56 bg-indigo-600/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-28 -left-28 w-56 h-56 bg-emerald-600/25 rounded-full blur-3xl pointer-events-none" />

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition border border-transparent hover:border-slate-700"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-gradient-to-tr from-indigo-600 to-violet-600 text-white mb-3 shadow-lg shadow-indigo-600/30">
            {roleMode === 'STUDENT' ? <GraduationCap className="w-7 h-7" /> : <Shield className="w-7 h-7" />}
          </div>
          <h2 className="text-2xl font-extrabold text-white tracking-tight">Portal Authentication</h2>
          <p className="text-xs text-slate-400 mt-1">Select your Semester & Batch to access tailored quizzes</p>
        </div>

        {/* Role Switcher Tabs */}
        <div className="grid grid-cols-2 p-1 bg-slate-950/90 rounded-2xl mb-6 border border-slate-800">
          <button
            onClick={() => setRoleMode('STUDENT')}
            className={`py-2.5 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 ${
              roleMode === 'STUDENT'
                ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <GraduationCap className="w-4 h-4" /> Student Portal
          </button>
          <button
            onClick={() => setRoleMode('FACULTY')}
            className={`py-2.5 text-xs font-bold rounded-xl transition flex items-center justify-center gap-2 ${
              roleMode === 'FACULTY'
                ? 'bg-amber-600 text-white shadow-lg shadow-amber-600/30'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Shield className="w-4 h-4" /> Faculty Portal
          </button>
        </div>

        {/* STUDENT FORM */}
        {roleMode === 'STUDENT' ? (
          <form onSubmit={handleStudentSubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Vamshi Krishna"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs font-medium"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Roll Number
              </label>
              <input
                type="text"
                required
                value={rollNumber}
                onChange={(e) => setRollNumber(e.target.value)}
                placeholder="e.g. 23A91A0501"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 text-xs font-mono font-semibold"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Branch / Dept
                </label>
                <select
                  value={branch}
                  onChange={(e) => setBranch(e.target.value as Branch)}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 text-xs font-medium"
                >
                  <option value="CSE">CSE</option>
                  <option value="AI&DS">AI&DS</option>
                  <option value="IT">IT</option>
                  <option value="ECE">ECE</option>
                  <option value="EEE">EEE</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                  Batch Year
                </label>
                <select
                  value={admissionYear}
                  onChange={(e) => setAdmissionYear(Number(e.target.value))}
                  className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white focus:outline-none focus:border-indigo-500 text-xs font-mono font-medium"
                >
                  <option value={2026}>2026 Batch</option>
                  <option value={2025}>2025 Batch</option>
                  <option value={2024}>2024 Batch</option>
                  <option value={2023}>2023 Batch</option>
                  <option value={2022}>2022 Batch</option>
                </select>
              </div>
            </div>

            {/* EXPLICIT SEMESTER SELECTION OPTION */}
            <div>
              <label className="block text-[11px] font-bold text-emerald-400 uppercase tracking-wider mb-1.5 flex items-center justify-between">
                <span className="flex items-center gap-1">
                  <Layers className="w-3.5 h-3.5" /> Select Current Semester
                </span>
                <span className="text-[10px] text-slate-400 font-normal">Auto-synced</span>
              </label>
              <select
                value={selectedSemesterCode}
                onChange={(e) => setSelectedSemesterCode(e.target.value as SemesterCode)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-emerald-500/40 text-emerald-300 font-bold focus:outline-none focus:border-emerald-400 focus:ring-1 focus:ring-emerald-400 text-xs font-mono"
              >
                {semesterOptions.map((sem) => (
                  <option key={sem.code} value={sem.code}>
                    {sem.label}
                  </option>
                ))}
              </select>
            </div>

            {/* Auto Time-Based Info Indicator */}
            <div className="p-3 bg-indigo-950/40 border border-indigo-500/30 rounded-xl flex items-center gap-3">
              <Sparkles className="w-5 h-5 text-indigo-400 flex-shrink-0" />
              <p className="text-[11px] text-slate-300 leading-tight">
                Academic timeline auto-pushes your profile to the next semester as months pass.
              </p>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-indigo-600 via-violet-600 to-indigo-600 hover:from-indigo-500 hover:to-violet-500 text-white font-bold rounded-xl shadow-lg shadow-indigo-600/30 transition flex items-center justify-center gap-2 mt-6 text-xs"
            >
              <UserCheck className="w-4 h-4" /> Save & Access Dashboard
            </button>
          </form>
        ) : (
          /* FACULTY FORM */
          <form onSubmit={handleFacultySubmit} className="space-y-4">
            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Faculty Name
              </label>
              <input
                type="text"
                required
                value={facultyName}
                onChange={(e) => setFacultyName(e.target.value)}
                placeholder="e.g. Dr. K. Srinivas"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-xs"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Faculty ID
              </label>
              <input
                type="text"
                required
                value={facultyId}
                onChange={(e) => setFacultyId(e.target.value)}
                placeholder="e.g. FAC-CS-104"
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-xs font-mono font-semibold"
              />
            </div>

            <div>
              <label className="block text-[11px] font-bold text-slate-300 uppercase tracking-wider mb-1.5">
                Department
              </label>
              <input
                type="text"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-white placeholder-slate-500 focus:outline-none focus:border-amber-500 focus:ring-1 focus:ring-amber-500 text-xs"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold rounded-xl shadow-lg shadow-amber-600/30 transition flex items-center justify-center gap-2 mt-6 text-xs"
            >
              <Sparkles className="w-4 h-4" /> Access Faculty Dashboard
            </button>
          </form>
        )}
      </div>
    </div>
  );
};
