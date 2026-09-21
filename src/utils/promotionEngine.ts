import { AcademicYear, Semester, SemesterCode } from '../types';

export interface PromotionResult {
  year: AcademicYear;
  semester: Semester;
  semesterCode: SemesterCode;
  semesterLabel: string;
  isPromoted: boolean;
  previousSemesterCode?: SemesterCode;
}

export function calculateSemesterFromAdmission(
  admissionYear: number = 2024,
  currentDate: Date = new Date()
): { year: AcademicYear; semester: Semester; semesterCode: SemesterCode; semesterLabel: string } {
  const validAdmissionYear = (typeof admissionYear === 'number' && !isNaN(admissionYear)) ? admissionYear : 2024;
  const currentYearNum = currentDate.getFullYear();
  const currentMonthNum = currentDate.getMonth();

  let elapsedMonths = (currentYearNum - validAdmissionYear) * 12 + (currentMonthNum - 7);
  if (elapsedMonths < 0) elapsedMonths = 0;

  let semesterNum = Math.floor(elapsedMonths / 6) + 1;
  if (isNaN(semesterNum) || semesterNum < 1) semesterNum = 1;
  if (semesterNum > 8) semesterNum = 8;

  const semester = semesterNum as Semester;
  const year = Math.ceil(semesterNum / 2) as AcademicYear;

  const semInYear = ((semesterNum - 1) % 2) + 1;
  const semesterCode = `${year}-${semInYear}` as SemesterCode;
  const semesterLabel = `Year ${year}, Sem ${semInYear} (Semester ${semesterNum})`;

  return { year, semester, semesterCode, semesterLabel };
}

export function checkAndPromoteStudent(
  currentStudentSemesterCode: SemesterCode,
  admissionYear: number
): PromotionResult {
  if (!currentStudentSemesterCode || typeof currentStudentSemesterCode !== 'string' || !currentStudentSemesterCode.includes('-')) {
    const defaultCalc = calculateSemesterFromAdmission(admissionYear || 2024);
    return { ...defaultCalc, isPromoted: false };
  }
  const calculated = calculateSemesterFromAdmission(admissionYear || 2024);
  const isPromoted = calculated.semesterCode !== currentStudentSemesterCode;

  return {
    ...calculated,
    isPromoted,
    previousSemesterCode: isPromoted ? currentStudentSemesterCode : undefined,
  };
}
