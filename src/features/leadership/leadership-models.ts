import type { StudentAgeGroup } from "@/features/student/student-data";

export type RankingScope = "state" | "district" | "taluka";

export interface StudentRankPosition {
  talukaRank: number;
  totalTalukaStudents: number;
  districtRank: number;
  totalDistrictStudents: number;
  stateRank: number;
  totalStateStudents: number;
  score: number;
  percentile: number;
  rankMovement: number; // positive = improved (+4), negative = dropped (-2)
  previousRank: number;
  ageGroup: StudentAgeGroup;
  assessmentTitle: string;
}

export interface LeaderboardEntry {
  id: string;
  rank: number;
  studentId: string;
  displayName: string;
  maskedName: string;
  district: string;
  taluka: string;
  ageGroup: StudentAgeGroup;
  assessmentId: string;
  assessmentName: string;
  score: number;
  percentile: number;
  previousRank: number;
  rankMovement: number;
  badgesEarned: string[];
  scholarshipStatus: "Eligible" | "Applied" | "Shortlisted" | "Awarded" | "Under Review" | "Not Applied";
  isCurrentUser?: boolean;
}

export interface StudentBadge {
  id: string;
  title: string;
  category: "Assessment" | "Consistency" | "Milestone" | "Leadership" | "Scholarship";
  icon: string;
  description: string;
  earned: boolean;
  earnedDate?: string;
  progressPercent?: number;
  requirement: string;
}

export interface CompletedAssessmentResult {
  id: string;
  assessmentId: string;
  title: string;
  courseName: string;
  category: string;
  completionDate: string;
  score: number; // e.g. 92
  totalMarks: number; // e.g. 100
  percentage: number; // 92%
  correctAnswers: number; // 23
  totalQuestions: number; // 25
  rank: number;
  percentile: number;
  status: "Passed with Distinction" | "Passed" | "Needs Improvement";
  timeTakenMinutes: number;
}

export interface AvailableAssessment {
  id: string;
  title: string;
  courseName: string;
  ageGroup: StudentAgeGroup;
  scheduledDate: string;
  durationMinutes: number;
  totalQuestions: number;
  eligibility: string;
  status: "Available Now" | "Scheduled" | "Closing Soon";
  syllabus: string;
}

export type ScholarshipStatus =
  | "Upcoming"
  | "Open"
  | "Eligible"
  | "Applied"
  | "Shortlisted"
  | "Awarded"
  | "Closed";

export interface ScholarshipProgram {
  id: string;
  name: string;
  tagline: string;
  description: string;
  eligibleAgeGroups: StudentAgeGroup[];
  eligibilityCriteria: string[];
  associatedAssessmentId: string;
  associatedAssessmentName: string;
  scope: "Statewide (Maharashtra)" | "District Level" | "Taluka Level";
  deadline: string;
  rewardDetails: {
    title: string;
    amount?: string;
    kitDescription: string;
    certificate: string;
  };
  topLimit: number; // e.g. 50
  status: ScholarshipStatus;
  qualifyingCount: number;
  applicationCount: number;
  shortlistedCount: number;
  awardedCount: number;
  verificationStatus: "Active" | "Verification in Progress" | "Completed";
  isProposedDemo: true;
}

export interface ScholarshipApplication {
  id: string;
  scholarshipId: string;
  scholarshipName: string;
  studentId: string;
  studentName: string;
  ageGroup: StudentAgeGroup;
  district: string;
  taluka: string;
  score: number;
  percentile: number;
  rank: number;
  submissionDate: string;
  status: "Under Review" | "Shortlisted" | "Approved" | "Awarded" | "Rejected";
  documentUploaded: string;
  remarks?: string;
}
