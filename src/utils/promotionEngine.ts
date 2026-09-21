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
  admissionYear: number,
  currentDate: Date = new Date()
): { year: AcademicYear; semester: Semester; semesterCode: SemesterCode; semesterLabel: string } {
  const currentYearNum = currentDate.getFullYear();
  const currentMonthNum = currentDate.getMonth(); // 0-indexed (0 = Jan, 7 = Aug)

  // Calculate elapsed months since August of admissionYear
  // August of admissionYear = Month 7
  let elapsedMonths = (currentYearNum - admissionYear) * 12 + (currentMonthNum - 7);
  if (elapsedMonths < 0) elapsedMonths = 0;

  // Determine Semester number (1 to 8)
  // Each semester spans ~6 months
  let semesterNum = Math.floor(elapsedMonths / 6) + 1;
  if (semesterNum > 8) semesterNum = 8;
  if (semesterNum < 1) semesterNum = 1;

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
  const calculated = calculateSemesterFromAdmission(admissionYear);
  const isPromoted = calculated.semesterCode !== currentStudentSemesterCode;

  return {
    ...calculated,
    isPromoted,
    previousSemesterCode: isPromoted ? currentStudentSemesterCode : undefined,
  };
}
