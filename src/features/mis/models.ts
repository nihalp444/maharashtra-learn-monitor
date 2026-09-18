export type EngagementStatus = "High" | "Medium" | "Low";

export type AgeGroupId = "6-10" | "11-14" | "15-18";

export type ProgramId =
  // Age 6-10
  | "foundational"
  | "math-6-10"
  | "science-6-10"
  | "gk-skills"
  // Age 11-14
  | "math-11-14"
  | "science-11-14"
  | "digital-tech"
  | "logic-reasoning"
  // Age 15-18
  | "ai-ml"
  | "neet"
  | "jee";

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
  id: ProgramId | string;
  ageGroup: AgeGroupId;
  name: string;
  fullName: string;
  description: string;
  enrolledStudents: number;
  activeStudents: number;
  engagement: number;
  completion: number;
  learningHours: number;
  color: string;
  linkKey: string;
}

export interface DashboardFilters {
  district: string;
  taluka: string;
  program: string;
  studentType: string;
  period: string;
  ageGroup?: AgeGroupId | "all";
}

// Assessment Specific Models
export interface AssessmentItem {
  id: string;
  name: string;
  programId: string;
  ageGroup: AgeGroupId;
}

export interface AssessmentMetrics {
  attempts: number;
  studentsAssessed: number;
  averageScore: number;
  completionRate: number;
  passRate: number;
  lowPerformanceStudents: number;
}

export interface AssessmentMatrixRow {
  ageGroup: AgeGroupId;
  ageGroupLabel: string;
  programId: string;
  programName: string;
  studentsAssessed: number;
  averageScore: number;
  completionRate: number;
  passRate: number;
  benchmarkStatus: "On Track" | "Needs Attention" | "Critical";
}

export interface DistrictAgePerformance {
  districtId: string;
  districtName: string;
  age6to10Score: number;
  age6to10PassRate: number;
  age11to14Score: number;
  age11to14PassRate: number;
  age15to18Score: number;
  age15to18PassRate: number;
  overallScore: number;
  overallPassRate: number;
  attempts: number;
}

export interface AssessmentFilters {
  ageGroup: AgeGroupId | "all";
  district: string;
  taluka: string;
  program: string;
  assessment: string;
  period: string;
}

export interface AreaOfConcern {
  subject: string;
  ageGroup: string;
  identifiedIssue: string;
  score: number;
  studentsImpacted: number;
  priority: "High" | "Medium" | "Urgent";
  recommendedAction: string;
}
