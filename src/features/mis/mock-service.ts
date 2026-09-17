import { districts, monthlyTrend, programs, stateMetrics, yearlyTrend } from "./mock-data";
import type { DashboardFilters, District, EngagementStatus, LearningProgram, StudentMetrics } from "./models";

export const formatNumber = (value: number) => new Intl.NumberFormat("en-IN").format(value);
export const statusFor = (engagement: number): EngagementStatus => engagement >= 70 ? "High" : engagement >= 50 ? "Medium" : "Low";

const periodFactor: Record<string, number> = { "7d": 0.82, "30d": 1, "90d": 1.08, "year": 1.18 };
const typeFactor: Record<string, number> = { all: 1, active: 0.78, new: 0.22, low: 0.15 };

export const misService = {
  getDistricts: () => districts,
  getPrograms: () => programs,
  getDistrict: (id: string) => districts.find(d => d.id === id) ?? districts[0],
  getTalukas: (districtId: string) => districts.find(d => d.id === districtId)?.talukas ?? [],
  getTrend: (period: "6m" | "12m", filters?: DashboardFilters) => {
    const source = period === "12m" ? yearlyTrend : monthlyTrend;
    const district = filters?.district !== "all" ? districts.find(d => d.id === filters?.district) : undefined;
    const factor = district ? district.engagement / stateMetrics.engagement : 1;
    return source.map(point => ({ ...point, aiMl: Math.round(point.aiMl * factor), neet: Math.round(point.neet * factor), jee: Math.round(point.jee * factor) }));
  },
  getMetrics: (filters: DashboardFilters): StudentMetrics => {
    const district = filters.district !== "all" ? districts.find(d => d.id === filters.district) : undefined;
    let base: StudentMetrics = district ?? stateMetrics;
    if (filters.taluka !== "all" && district) {
      const taluka = district.talukas.find(t => t.name === filters.taluka);
      if (taluka) base = { totalStudents: taluka.students, activeStudents: taluka.activeStudents, engagement: taluka.engagement, learningHours: taluka.learningHours, lowEngagementStudents: Math.round(taluka.students * 0.16), courseCompletion: Math.max(28, taluka.engagement - 11) };
    }
    const program = filters.program !== "all" ? programs.find(p => p.id === filters.program) : undefined;
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
  getFilteredPrograms: (filters: DashboardFilters): LearningProgram[] => {
    const district = filters.district !== "all" ? districts.find(d => d.id === filters.district) : undefined;
    const factor = district ? Math.max(0.04, district.totalStudents / stateMetrics.totalStudents) : 1;
    return programs.filter(p => filters.program === "all" || p.id === filters.program).map(p => ({ ...p, enrolledStudents: Math.round(p.enrolledStudents * factor), activeStudents: Math.round(p.activeStudents * factor), learningHours: Math.round(p.learningHours * factor), engagement: Number(Math.min(94, p.engagement * (district ? district.engagement / stateMetrics.engagement : 1)).toFixed(1)) }));
  },
};

export type { DashboardFilters, District, LearningProgram, StudentMetrics };
