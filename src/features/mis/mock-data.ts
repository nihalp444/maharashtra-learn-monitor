import { MAHARASHTRA_36_DISTRICTS } from "./maharashtra-districts-data";
import type { District, LearningProgram, StudentMetrics, Taluka } from "./models";

const calculateTalukas = (names: string[], total: number, engagement: number): Taluka[] => {
  const n = names.length;
  return names.map((name, index) => {
    // Distribute student populations proportionally
    const weight = 1 + Math.sin(index * 1.3) * 0.25;
    const students = Math.max(280, Math.round((total / n) * weight));
    const variance = (index - n / 2) * 1.8;
    const localEngagement = Math.max(32, Math.min(88, Number((engagement + variance).toFixed(1))));
    const activeStudents = Math.round((students * localEngagement) / 100);
    const learningHours = Math.round(students * (2.4 + (index % 4) * 0.3));

    return {
      name,
      students,
      activeStudents,
      engagement: localEngagement,
      learningHours,
    };
  });
};

export const districts: District[] = MAHARASHTRA_36_DISTRICTS.map((def, idx) => {
  const totalStudents = def.baseStudents;
  const engagement = def.baseEngagement;
  const activeStudents = Math.round((totalStudents * engagement) / 100);
  const offset = idx % 2 === 0 ? 1 : -1;

  return {
    id: def.id,
    name: def.name,
    totalStudents,
    activeStudents,
    engagement,
    mapX: 0,
    mapY: 0,
    learningHours: Math.round(totalStudents * (2.8 + engagement / 100)),
    lowEngagementStudents: Math.round(
      totalStudents * Math.max(0.08, (70 - engagement) / 100),
    ),
    courseCompletion: Number(Math.max(34, engagement - 10.2).toFixed(1)),
    trend: [
      engagement - 6 + offset,
      engagement - 4,
      engagement - 3 + offset,
      engagement - 1,
      engagement - 0.5 + offset,
      engagement,
    ].map((v) => Number(v.toFixed(1))),
    talukas: calculateTalukas(def.talukas, totalStudents, engagement),
  };
});

// Dynamic statewide aggregate totals across all 36 districts
export const stateMetrics: StudentMetrics = {
  totalStudents: districts.reduce((acc, d) => acc + d.totalStudents, 0),
  activeStudents: districts.reduce((acc, d) => acc + d.activeStudents, 0),
  learningHours: districts.reduce((acc, d) => acc + d.learningHours, 0),
  engagement: Number(
    (
      districts.reduce((acc, d) => acc + d.engagement * d.totalStudents, 0) /
      districts.reduce((acc, d) => acc + d.totalStudents, 0)
    ).toFixed(1),
  ),
  lowEngagementStudents: districts.reduce((acc, d) => acc + d.lowEngagementStudents, 0),
  courseCompletion: Number(
    (
      districts.reduce((acc, d) => acc + d.courseCompletion * d.totalStudents, 0) /
      districts.reduce((acc, d) => acc + d.totalStudents, 0)
    ).toFixed(1),
  ),
};

export const programs: LearningProgram[] = [
  { id: "ai-ml", name: "AI & ML", fullName: "Artificial Intelligence & Machine Learning", description: "Foundational concepts, applied projects and future-ready digital skills for secondary students.", enrolledStudents: 12450, activeStudents: 9711, engagement: 78, completion: 64, learningHours: 46840, color: "program-blue", linkKey: "aiMl" },
  { id: "neet", name: "NEET Preparation", fullName: "National Eligibility cum Entrance Test", description: "Structured preparation across Physics, Chemistry and Biology with focused practice modules.", enrolledStudents: 18720, activeStudents: 15724, engagement: 84, completion: 72, learningHours: 74520, color: "program-green", linkKey: "neet" },
  { id: "jee", name: "JEE Preparation", fullName: "Joint Entrance Examination", description: "Concept-led preparation for engineering entrance examinations with progress-led learning paths.", enrolledStudents: 15860, activeStudents: 9992, engagement: 63, completion: 51, learningHours: 51430, color: "program-amber", linkKey: "jee" },
];

export const monthlyTrend = [
  { month: "Apr", aiMl: 54, neet: 68, jee: 62 },
  { month: "May", aiMl: 49, neet: 74, jee: 66 },
  { month: "Jun", aiMl: 63, neet: 69, jee: 58 },
  { month: "Jul", aiMl: 72, neet: 76, jee: 64 },
  { month: "Aug", aiMl: 69, neet: 81, jee: 71 },
  { month: "Sep", aiMl: 78, neet: 79, jee: 74 },
];

export const yearlyTrend = [
  { month: "Oct", aiMl: 48, neet: 61, jee: 55 },
  { month: "Nov", aiMl: 52, neet: 64, jee: 59 },
  { month: "Dec", aiMl: 46, neet: 70, jee: 63 },
  { month: "Jan", aiMl: 58, neet: 73, jee: 69 },
  { month: "Feb", aiMl: 55, neet: 77, jee: 72 },
  { month: "Mar", aiMl: 62, neet: 71, jee: 65 },
  ...monthlyTrend,
];

export const talukaOptions = Array.from(new Set(districts.flatMap(d => d.talukas.map(t => t.name)))).sort();
