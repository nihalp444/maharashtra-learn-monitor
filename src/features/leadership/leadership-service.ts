import type { StudentAgeGroup } from "@/features/student/student-data";
import { MAHARASHTRA_36_DISTRICTS } from "@/features/mis/maharashtra-districts-data";
import {
  INITIAL_APPLICATIONS,
  INITIAL_SCHOLARSHIPS,
  STUDENT_BADGES,
  STUDENT_POSITIONS,
  STUDENT_RESULTS,
  UPCOMING_ASSESSMENTS,
  generateDeterministicLeaderboard,
  generateDistrictLeaderboard,
  generateTalukaLeaderboard,
} from "./leadership-data";
import type {
  AvailableAssessment,
  CompletedAssessmentResult,
  LeaderboardEntry,
  ScholarshipApplication,
  ScholarshipProgram,
  StudentBadge,
  StudentRankPosition,
} from "./leadership-models";

export interface LeadershipAdminFilters {
  state: string; // "Maharashtra"
  district: string; // "all" | district id
  taluka: string; // "all" | taluka name
  ageGroup: "all" | StudentAgeGroup;
  program: string; // "all" | program id
  assessment: string; // "all" | assessment/competition id
  period: string; // "30d" | "q1" | "academic_year"
}

export interface DistrictLeadershipRow {
  id: string;
  name: string;
  division: string;
  eligibleStudents: number;
  participants: number;
  averageScore: number;
  top50Qualifiers: number;
  scholarshipApplications: number;
  completionRate: number;
  trend: "up" | "stable" | "down";
  trendValue: string;
  status: "Excellent" | "Satisfactory" | "Needs Attention";
}

export interface TalukaLeadershipRow {
  name: string;
  districtName: string;
  eligibleStudents: number;
  participants: number;
  averageScore: number;
  completionRate: number;
  topPerformers: number;
  performanceStatus: "High" | "Moderate" | "Needs Attention";
}

class LeadershipService {
  private scholarships: ScholarshipProgram[] = [...INITIAL_SCHOLARSHIPS];
  private applications: ScholarshipApplication[] = [...INITIAL_APPLICATIONS];

  // ==========================================
  // STUDENT SPECIFIC METHODS
  // ==========================================

  getStudentPosition(username: string): StudentRankPosition {
    return (
      STUDENT_POSITIONS[username] ??
      STUDENT_POSITIONS["aarav11"] ?? {
        talukaRank: 12,
        totalTalukaStudents: 350,
        districtRank: 45,
        totalDistrictStudents: 3200,
        stateRank: 240,
        totalStateStudents: 38000,
        score: 86,
        percentile: 92.4,
        rankMovement: 5,
        previousRank: 245,
        ageGroup: "11-14",
        assessmentTitle: "Algebraic Reasoning & Fractions Mastery",
      }
    );
  }

  getStudentBadges(username: string): StudentBadge[] {
    return STUDENT_BADGES[username] ?? STUDENT_BADGES["aarav11"] || [];
  }

  getStudentResults(username: string): CompletedAssessmentResult[] {
    return STUDENT_RESULTS[username] ?? STUDENT_RESULTS["aarav11"] || [];
  }

  getUpcomingAssessments(ageGroup: StudentAgeGroup): AvailableAssessment[] {
    return UPCOMING_ASSESSMENTS.filter((a) => a.ageGroup === ageGroup);
  }

  getLeaderboard(
    scope: "state" | "district" | "taluka",
    ageGroup: StudentAgeGroup,
    district: string = "Pune",
    taluka: string = "Haveli"
  ): LeaderboardEntry[] {
    if (scope === "state") {
      return generateDeterministicLeaderboard(ageGroup);
    }
    if (scope === "district") {
      return generateDistrictLeaderboard(ageGroup, district);
    }
    return generateTalukaLeaderboard(ageGroup, district, taluka);
  }

  // ==========================================
  // SCHOLARSHIP MANAGEMENT
  // ==========================================

  getScholarships(): ScholarshipProgram[] {
    return this.scholarships;
  }

  getScholarshipById(id: string): ScholarshipProgram | undefined {
    return this.scholarships.find((s) => s.id === id);
  }

  getApplications(scholarshipId?: string): ScholarshipApplication[] {
    if (scholarshipId && scholarshipId !== "all") {
      return this.applications.filter((a) => a.scholarshipId === scholarshipId);
    }
    return this.applications;
  }

  submitScholarshipApplication(
    app: Omit<ScholarshipApplication, "id" | "submissionDate" | "status">
  ): ScholarshipApplication {
    const newApp: ScholarshipApplication = {
      ...app,
      id: `app-2026-${String(this.applications.length + 1).padStart(3, "0")}`,
      submissionDate: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      status: "Under Review",
    };
    this.applications.unshift(newApp);

    // Update application count on the scholarship
    const prog = this.scholarships.find((s) => s.id === app.scholarshipId);
    if (prog) {
      prog.applicationCount += 1;
    }

    return newApp;
  }

  updateApplicationStatus(
    appId: string,
    status: ScholarshipApplication["status"],
    remarks?: string
  ): boolean {
    const app = this.applications.find((a) => a.id === appId);
    if (!app) return false;
    app.status = status;
    if (remarks) app.remarks = remarks;

    // Adjust counts
    const prog = this.scholarships.find((s) => s.id === app.scholarshipId);
    if (prog) {
      if (status === "Shortlisted") prog.shortlistedCount += 1;
      if (status === "Awarded") prog.awardedCount += 1;
    }
    return true;
  }

  createScholarship(prog: ScholarshipProgram): ScholarshipProgram {
    this.scholarships.unshift(prog);
    return prog;
  }

  // ==========================================
  // ADMIN DASHBOARD & LEADERSHIP ANALYTICS
  // ==========================================

  getAdminLeadershipKPIs(filters: LeadershipAdminFilters) {
    let baseEligible = 345000;
    let baseParticipated = 286400;
    let baseAvgScore = 84.6;
    let baseCompletion = 78.4;
    let baseTop50 = 50;
    let baseScholarships = this.applications.length;

    // Filter adjustments for age groups
    if (filters.ageGroup === "6-10") {
      baseEligible = 118000;
      baseParticipated = 101200;
      baseAvgScore = 86.8;
      baseCompletion = 81.2;
    } else if (filters.ageGroup === "11-14") {
      baseEligible = 124000;
      baseParticipated = 103800;
      baseAvgScore = 84.1;
      baseCompletion = 77.6;
    } else if (filters.ageGroup === "15-18") {
      baseEligible = 103000;
      baseParticipated = 81400;
      baseAvgScore = 82.9;
      baseCompletion = 75.8;
    }

    // Filter adjustments for district
    if (filters.district !== "all") {
      const dist = MAHARASHTRA_36_DISTRICTS.find(
        (d) => d.id === filters.district || d.name.toLowerCase() === filters.district.toLowerCase()
      );
      const studentRatio = dist ? dist.baseStudents / 345000 : 0.05;
      baseEligible = Math.round(baseEligible * studentRatio * 10);
      baseParticipated = Math.round(baseParticipated * studentRatio * 10);
      baseTop50 = Math.min(50, Math.max(2, Math.round(baseTop50 * studentRatio * 10)));
      baseScholarships = Math.max(1, Math.round(baseScholarships * 0.15));
    }

    return {
      totalEligibleStudents: baseEligible,
      studentsParticipated: baseParticipated,
      assessmentCompletionRate: Number(baseCompletion.toFixed(1)),
      averageAssessmentScore: Number(baseAvgScore.toFixed(1)),
      studentsInTop50: baseTop50,
      scholarshipApplications: baseScholarships,
    };
  }

  getDistrictLeadershipStats(filters: LeadershipAdminFilters): DistrictLeadershipRow[] {
    return MAHARASHTRA_36_DISTRICTS.map((d, idx) => {
      const eligible = d.baseStudents;
      const participationRate = (d.baseEngagement + 5) / 100;
      const participants = Math.round(eligible * Math.min(0.95, participationRate));

      // Deterministic average score around 78 to 91
      const scoreVariance = Math.sin(idx * 1.7) * 6.5;
      const avgScore = Number((82.5 + scoreVariance).toFixed(1));

      // Top 50 qualifiers distributed across top districts
      let top50 = 0;
      if (idx < 5) top50 = 6 - idx;
      else if (idx < 15) top50 = (idx % 3) + 1;
      else top50 = idx % 2 === 0 ? 1 : 0;

      const appCount = Math.max(1, Math.round(top50 * 1.4) + (idx % 3));
      const completion = Number(Math.min(94, Math.max(62, avgScore - 4 + (idx % 5))).toFixed(1));

      const status: DistrictLeadershipRow["status"] =
        avgScore >= 85 ? "Excellent" : avgScore >= 78 ? "Satisfactory" : "Needs Attention";

      return {
        id: d.id,
        name: d.name,
        division: d.division,
        eligibleStudents: eligible,
        participants,
        averageScore: avgScore,
        top50Qualifiers: top50,
        scholarshipApplications: appCount,
        completionRate: completion,
        trend: idx % 3 === 0 ? "up" : idx % 3 === 1 ? "stable" : "up",
        trendValue: idx % 3 === 0 ? "+4.2%" : idx % 3 === 1 ? "+0.8%" : "+3.1%",
        status,
      };
    });
  }

  getTalukaLeadershipStats(
    districtIdOrName: string,
    filters: LeadershipAdminFilters
  ): TalukaLeadershipRow[] {
    const dist = MAHARASHTRA_36_DISTRICTS.find(
      (d) =>
        d.id.toLowerCase() === districtIdOrName.toLowerCase() ||
        d.name.toLowerCase() === districtIdOrName.toLowerCase()
    );

    const talukaNames = dist ? dist.talukas : ["North Taluka", "South Taluka", "East Taluka", "Central"];
    const baseTotal = dist ? dist.baseStudents : 8000;

    return talukaNames.map((name, i) => {
      const weight = 1 + Math.sin(i * 1.4) * 0.3;
      const eligible = Math.round((baseTotal / talukaNames.length) * weight);
      const participants = Math.round(eligible * 0.84);
      const avgScore = Number((81 + Math.cos(i * 1.2) * 6).toFixed(1));
      const completion = Number((76 + Math.sin(i * 1.5) * 8).toFixed(1));
      const topPerformers = Math.max(1, Math.round(avgScore > 84 ? 4 + (i % 3) : 2));

      const performanceStatus: TalukaLeadershipRow["performanceStatus"] =
        avgScore >= 84 ? "High" : avgScore >= 78 ? "Moderate" : "Needs Attention";

      return {
        name,
        districtName: dist ? dist.name : "Maharashtra District",
        eligibleStudents: eligible,
        participants,
        averageScore: avgScore,
        completionRate: completion,
        topPerformers,
        performanceStatus,
      };
    });
  }

  getAdminStudentRankings(
    filters: LeadershipAdminFilters,
    scope: "state" | "district" | "taluka" = "state",
    top50Only: boolean = false
  ): LeaderboardEntry[] {
    const ageGroup: StudentAgeGroup =
      filters.ageGroup === "all" ? "15-18" : (filters.ageGroup as StudentAgeGroup);

    let entries = this.getLeaderboard(
      scope,
      ageGroup,
      filters.district !== "all" ? filters.district : "Pune",
      filters.taluka !== "all" ? filters.taluka : "Haveli"
    );

    if (filters.district !== "all") {
      const dName = filters.district.toLowerCase();
      const filtered = entries.filter((e) => e.district.toLowerCase() === dName);
      if (filtered.length > 0) entries = filtered;
    }

    if (top50Only) {
      entries = entries.slice(0, 50);
    }

    return entries;
  }
}

export const leadershipService = new LeadershipService();
