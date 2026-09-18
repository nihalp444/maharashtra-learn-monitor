import {
  AGE_GROUPS,
  areasOfConcern,
  assessmentList,
  districts,
  monthlyTrend,
  programs,
  stateMetrics,
  yearlyTrend,
} from "./mock-data";
import type {
  AgeGroupId,
  AreaOfConcern,
  AssessmentFilters,
  AssessmentMatrixRow,
  AssessmentMetrics,
  DashboardFilters,
  District,
  DistrictAgePerformance,
  EngagementStatus,
  LearningProgram,
  StudentMetrics,
} from "./models";

export const formatNumber = (value: number) => new Intl.NumberFormat("en-IN").format(value);
export const statusFor = (engagement: number): EngagementStatus =>
  engagement >= 70 ? "High" : engagement >= 50 ? "Medium" : "Low";

const periodFactor: Record<string, number> = { "7d": 0.82, "30d": 1, "90d": 1.08, year: 1.18 };
const typeFactor: Record<string, number> = { all: 1, active: 0.78, new: 0.22, low: 0.15 };

export const misService = {
  formatNumber,
  statusFor,
  getDistricts: () => districts,
  getPrograms: (ageGroup?: AgeGroupId | "all") => {
    if (!ageGroup || ageGroup === "all") return programs;
    return programs.filter((p) => p.ageGroup === ageGroup);
  },
  getAgeGroups: () => AGE_GROUPS,
  getDistrict: (id: string) => districts.find((d) => d.id === id) ?? districts[0],
  getTalukas: (districtId: string) => districts.find((d) => d.id === districtId)?.talukas ?? [],
  
  getTrend: (period: "6m" | "12m", filters?: DashboardFilters) => {
    const source = period === "12m" ? yearlyTrend : monthlyTrend;
    const district = filters?.district !== "all" ? districts.find((d) => d.id === filters?.district) : undefined;
    const factor = district ? district.engagement / stateMetrics.engagement : 1;
    return source.map((point) => ({
      ...point,
      aiMl: Math.round(point.aiMl * factor),
      neet: Math.round(point.neet * factor),
      jee: Math.round(point.jee * factor),
    }));
  },

  getMetrics: (filters: DashboardFilters): StudentMetrics => {
    const district = filters.district !== "all" ? districts.find((d) => d.id === filters.district) : undefined;
    let base: StudentMetrics = district ?? stateMetrics;
    if (filters.taluka !== "all" && district) {
      const taluka = district.talukas.find((t) => t.name === filters.taluka);
      if (taluka) {
        base = {
          totalStudents: taluka.students,
          activeStudents: taluka.activeStudents,
          engagement: taluka.engagement,
          learningHours: taluka.learningHours,
          lowEngagementStudents: Math.round(taluka.students * 0.16),
          courseCompletion: Math.max(28, taluka.engagement - 11),
        };
      }
    }
    const program = filters.program !== "all" ? programs.find((p) => p.id === filters.program) : undefined;
    const pFactor = program ? program.enrolledStudents / programs.reduce((sum, p) => sum + p.enrolledStudents, 0) : 1;
    const tFactor = typeFactor[filters.studentType] ?? 1;
    const timeFactor = periodFactor[filters.period] ?? 1;
    const countFactor = pFactor * tFactor;
    return {
      totalStudents: Math.round(base.totalStudents * countFactor),
      activeStudents: Math.round(base.activeStudents * countFactor),
      learningHours: Math.round(base.learningHours * countFactor * timeFactor),
      engagement: Number(Math.min(92, base.engagement * (program ? program.engagement / stateMetrics.engagement : 1)).toFixed(1)),
      lowEngagementStudents: Math.round(base.lowEngagementStudents * countFactor),
      courseCompletion: Number(Math.min(88, base.courseCompletion * (program ? program.completion / stateMetrics.courseCompletion : 1)).toFixed(1)),
    };
  },

  getFilteredPrograms: (filters: DashboardFilters, ageGroup: AgeGroupId = "15-18"): LearningProgram[] => {
    const district = filters.district !== "all" ? districts.find((d) => d.id === filters.district) : undefined;
    const factor = district ? Math.max(0.04, district.totalStudents / stateMetrics.totalStudents) : 1;
    
    return programs
      .filter((p) => p.ageGroup === ageGroup)
      .filter((p) => filters.program === "all" || p.id === filters.program)
      .map((p) => ({
        ...p,
        enrolledStudents: Math.round(p.enrolledStudents * factor),
        activeStudents: Math.round(p.activeStudents * factor),
        learningHours: Math.round(p.learningHours * factor),
        engagement: Number(Math.min(94, p.engagement * (district ? district.engagement / stateMetrics.engagement : 1)).toFixed(1)),
        completion: Number(Math.min(90, p.completion * (district ? district.courseCompletion / stateMetrics.courseCompletion : 1)).toFixed(1)),
      }));
  },

  // --- ASSESSMENT ANALYTICS METHODS ---
  getAssessmentList: (ageGroup?: AgeGroupId | "all", programId?: string) => {
    return assessmentList.filter((a) => {
      if (ageGroup && ageGroup !== "all" && a.ageGroup !== ageGroup) return false;
      if (programId && programId !== "all" && a.programId !== programId) return false;
      return true;
    });
  },

  getAssessmentMetrics: (filters: AssessmentFilters): AssessmentMetrics => {
    const district = filters.district !== "all" ? districts.find((d) => d.id === filters.district) : undefined;
    const districtFactor = district ? district.engagement / stateMetrics.engagement : 1;
    const studentScale = district ? Math.max(0.05, district.totalStudents / stateMetrics.totalStudents) : 1;

    // Filter matching programs
    const matchedPrograms = programs.filter((p) => {
      if (filters.ageGroup !== "all" && p.ageGroup !== filters.ageGroup) return false;
      if (filters.program !== "all" && p.id !== filters.program) return false;
      return true;
    });

    const enrolledBase = matchedPrograms.reduce((sum, p) => sum + p.enrolledStudents, 0) * studentScale;
    const assessedRatio = 0.86;
    const studentsAssessed = Math.round(enrolledBase * assessedRatio);
    const attemptsMultiplier = filters.assessment !== "all" ? 1.4 : 2.8;
    const attempts = Math.round(studentsAssessed * attemptsMultiplier);

    // Calculate score
    const avgScoreBase = matchedPrograms.length > 0
      ? matchedPrograms.reduce((sum, p) => sum + (p.engagement * 0.88), 0) / matchedPrograms.length
      : 72.4;
    const averageScore = Number(Math.min(96, Math.max(42, avgScoreBase * districtFactor)).toFixed(1));

    const completionRate = Number(Math.min(95, Math.max(50, 78.4 * districtFactor)).toFixed(1));
    const passRate = Number(Math.min(96, Math.max(48, (averageScore > 70 ? averageScore + 4 : averageScore - 2))).toFixed(1));
    const lowPerformanceStudents = Math.round(studentsAssessed * Math.max(0.08, (100 - passRate) / 100));

    return {
      attempts,
      studentsAssessed,
      averageScore,
      completionRate,
      passRate,
      lowPerformanceStudents,
    };
  },

  getAssessmentMatrix: (filters: AssessmentFilters): AssessmentMatrixRow[] => {
    const district = filters.district !== "all" ? districts.find((d) => d.id === filters.district) : undefined;
    const dFactor = district ? district.engagement / stateMetrics.engagement : 1;
    const studentScale = district ? Math.max(0.05, district.totalStudents / stateMetrics.totalStudents) : 1;

    return programs
      .filter((p) => filters.ageGroup === "all" || p.ageGroup === filters.ageGroup)
      .filter((p) => filters.program === "all" || p.id === filters.program)
      .map((p) => {
        const score = Number(Math.min(96, Math.max(44, (p.engagement * 0.89 + (p.completion * 0.15)) * dFactor)).toFixed(1));
        const pass = Number(Math.min(98, Math.max(46, score >= 70 ? score + 3.5 : score - 3)).toFixed(1));
        const assessed = Math.round(p.enrolledStudents * 0.84 * studentScale);
        const completion = Number(Math.min(95, Math.max(52, p.completion * 1.05 * dFactor)).toFixed(1));
        
        let benchmarkStatus: "On Track" | "Needs Attention" | "Critical" = "On Track";
        if (score < 55 || pass < 55) benchmarkStatus = "Critical";
        else if (score < 70 || pass < 70) benchmarkStatus = "Needs Attention";

        const ageLabel = p.ageGroup === "6-10" ? "Age 6–10" : p.ageGroup === "11-14" ? "Age 11–14" : "Age 15–18";

        return {
          ageGroup: p.ageGroup,
          ageGroupLabel: ageLabel,
          programId: p.id,
          programName: p.name,
          studentsAssessed: assessed,
          averageScore: score,
          completionRate: completion,
          passRate: pass,
          benchmarkStatus,
        };
      });
  },

  getDistrictAgePerformance: (): DistrictAgePerformance[] => {
    return districts.map((d) => {
      const engRatio = d.engagement / stateMetrics.engagement;
      const age6to10Score = Number(Math.min(95, Math.max(48, 76 * engRatio)).toFixed(1));
      const age6to10Pass = Number(Math.min(96, Math.max(50, age6to10Score + 2)).toFixed(1));

      const age11to14Score = Number(Math.min(94, Math.max(46, 71.5 * engRatio)).toFixed(1));
      const age11to14Pass = Number(Math.min(95, Math.max(48, age11to14Score + 1.5)).toFixed(1));

      const age15to18Score = Number(Math.min(92, Math.max(42, 66.8 * engRatio)).toFixed(1));
      const age15to18Pass = Number(Math.min(93, Math.max(44, age15to18Score)).toFixed(1));

      const overallScore = Number(((age6to10Score + age11to14Score + age15to18Score) / 3).toFixed(1));
      const overallPassRate = Number(((age6to10Pass + age11to14Pass + age15to18Pass) / 3).toFixed(1));

      return {
        districtId: d.id,
        districtName: d.name,
        age6to10Score,
        age6to10PassRate: age6to10Pass,
        age11to14Score,
        age11to14PassRate: age11to14Pass,
        age15to18Score,
        age15to18PassRate: age15to18Pass,
        overallScore,
        overallPassRate,
        attempts: Math.round(d.activeStudents * 2.6),
      };
    });
  },

  getAreasOfConcern: (ageGroup?: AgeGroupId | "all"): AreaOfConcern[] => {
    if (!ageGroup || ageGroup === "all") return areasOfConcern;
    const tag = ageGroup === "6-10" ? "Age 6–10" : ageGroup === "11-14" ? "Age 11–14" : "Age 15–18";
    return areasOfConcern.filter((a) => a.ageGroup === tag);
  },
};

export type {
  AgeGroupId,
  AreaOfConcern,
  AssessmentFilters,
  AssessmentMatrixRow,
  AssessmentMetrics,
  DashboardFilters,
  District,
  DistrictAgePerformance,
  LearningProgram,
  StudentMetrics,
};
