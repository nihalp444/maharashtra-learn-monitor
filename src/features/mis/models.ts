export type EngagementStatus = "High" | "Medium" | "Low";
export type ProgramId = "ai-ml" | "neet" | "jee";

export interface StudentMetrics {
  totalStudents: number;
  activeStudents: number;
  learningHours: number;
  engagement: number;
  lowEngagementStudents: number;
  courseCompletion: number;
}

export interface Taluka {
  name: string;
  students: number;
  activeStudents: number;
  engagement: number;
  learningHours: number;
}

export interface District extends StudentMetrics {
  id: string;
  name: string;
  mapX: number;
  mapY: number;
  trend: number[];
  talukas: Taluka[];
}

export interface LearningProgram {
  id: ProgramId;
  name: string;
  fullName: string;
  description: string;
  enrolledStudents: number;
  activeStudents: number;
  engagement: number;
  completion: number;
  learningHours: number;
  color: string;
  linkKey: "aiMl" | "neet" | "jee";
}

export interface DashboardFilters {
  district: string;
  taluka: string;
  program: string;
  studentType: string;
  period: string;
}
