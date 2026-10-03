import {
  STUDENT_ACCOUNTS,
  isStudentUsername,
  type DemoStudentUsername,
  type StudentProfile,
} from "./student-data";
import { getStoredDemoAuth } from "@/features/auth/auth-storage";

export const studentService = {
  getStudentByUsername(username: string): StudentProfile | null {
    const normalized = username.trim().toLowerCase();
    if (isStudentUsername(normalized)) {
      return STUDENT_ACCOUNTS[normalized] ?? null;
    }
    return null;
  },

  getAllStudents(): StudentProfile[] {
    return Object.values(STUDENT_ACCOUNTS);
  },

  getStudentByAgeGroup(ageGroup: "6-10" | "11-14" | "15-18"): StudentProfile | null {
    return (
      Object.values(STUDENT_ACCOUNTS).find((student) => student.ageGroup === ageGroup) ?? null
    );
  },

  getCurrentStudentFromStorage(): StudentProfile | null {
    const storedAuth = getStoredDemoAuth();
    if (storedAuth && isStudentUsername(storedAuth)) {
      return STUDENT_ACCOUNTS[storedAuth] ?? null;
    }
    return null;
  },
};
