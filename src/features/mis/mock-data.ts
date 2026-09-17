import type { District, LearningProgram, StudentMetrics } from "./models";

export const stateMetrics: StudentMetrics = {
  totalStudents: 124580,
  activeStudents: 82430,
  learningHours: 384210,
  engagement: 66.2,
  lowEngagementStudents: 18450,
  courseCompletion: 54.8,
};

const talukas = (names: string[], total: number, engagement: number) =>
  names.map((name, index) => {
    const factor = [0.28, 0.25, 0.24, 0.23][index] ?? 0.2;
    const students = Math.round(total * factor);
    const localEngagement = Math.max(31, Math.min(86, engagement + (index - 1.5) * 3.4));
    return { name, students, activeStudents: Math.round(students * localEngagement / 100), engagement: Number(localEngagement.toFixed(1)), learningHours: Math.round(students * (2.1 + index * 0.2)) };
  });

const makeDistrict = (id: string, name: string, totalStudents: number, engagement: number, mapX: number, mapY: number, names: string[], offset = 0): District => {
  const activeStudents = Math.round(totalStudents * engagement / 100);
  return {
    id, name, totalStudents, activeStudents, engagement, mapX, mapY,
    learningHours: Math.round(totalStudents * (2.6 + engagement / 100)),
    lowEngagementStudents: Math.round(totalStudents * Math.max(0.08, (68 - engagement) / 100)),
    courseCompletion: Number(Math.max(31, engagement - 10.5).toFixed(1)),
    trend: [engagement - 7 + offset, engagement - 5, engagement - 4 + offset, engagement - 2, engagement - 1 + offset, engagement].map(v => Number(v.toFixed(1))),
    talukas: talukas(names, totalStudents, engagement),
  };
};

export const districts: District[] = [
  makeDistrict("mumbai", "Mumbai", 18240, 78.6, 140, 510, ["Mumbai City", "Mumbai Suburban", "Kurla", "Andheri"], 1),
  makeDistrict("thane", "Thane", 14760, 73.1, 170, 455, ["Thane", "Kalyan", "Bhiwandi", "Shahapur"]),
  makeDistrict("pune", "Pune", 16480, 75.8, 245, 510, ["Haveli", "Mulshi", "Baramati", "Junnar"], 1),
  makeDistrict("nashik", "Nashik", 11240, 67.8, 218, 365, ["Nashik", "Malegaon", "Sinnar", "Igatpuri"]),
  makeDistrict("nandurbar", "Nandurbar", 8240, 47.4, 105, 245, ["Nandurbar", "Shahada", "Akkalkuwa", "Taloda"], -1),
  makeDistrict("gadchiroli", "Gadchiroli", 5980, 42.7, 585, 475, ["Gadchiroli", "Aheri", "Armori", "Chamorshi"], -2),
  makeDistrict("washim", "Washim", 6420, 43.7, 405, 365, ["Washim", "Karanja", "Mangrulpir", "Risod"], -1),
  makeDistrict("hingoli", "Hingoli", 5740, 45.1, 385, 410, ["Hingoli", "Kalamnuri", "Sengaon", "Aundha"], -2),
  makeDistrict("nagpur", "Nagpur", 12420, 71.9, 555, 315, ["Nagpur Urban", "Nagpur Rural", "Kamptee", "Katol"], 1),
  makeDistrict("sambhajinagar", "Chhatrapati Sambhajinagar", 9560, 64.8, 315, 410, ["Sambhajinagar", "Kannad", "Paithan", "Sillod"]),
  makeDistrict("kolhapur", "Kolhapur", 10380, 69.5, 238, 610, ["Karveer", "Hatkanangale", "Panhala", "Gadhinglaj"], 1),
  makeDistrict("satara", "Satara", 7580, 62.6, 275, 565, ["Satara", "Karad", "Wai", "Phaltan"]),
  makeDistrict("solapur", "Solapur", 8060, 58.9, 345, 555, ["Solapur North", "Pandharpur", "Akkalkot", "Barshi"], -1),
  makeDistrict("amravati", "Amravati", 9180, 61.7, 445, 300, ["Amravati", "Achalpur", "Daryapur", "Morshi"]),
  makeDistrict("chandrapur", "Chandrapur", 6480, 55.8, 550, 405, ["Chandrapur", "Warora", "Ballarpur", "Rajura"], -1),
];

export const programs: LearningProgram[] = [
  { id: "ai-ml", name: "AI & ML", fullName: "Artificial Intelligence & Machine Learning", description: "Foundational concepts, applied projects and future-ready digital skills for secondary students.", enrolledStudents: 12450, activeStudents: 8466, engagement: 68, completion: 56, learningHours: 42840, color: "program-blue", linkKey: "aiMl" },
  { id: "neet", name: "NEET Preparation", fullName: "National Eligibility cum Entrance Test", description: "Structured preparation across Physics, Chemistry and Biology with focused practice modules.", enrolledStudents: 18720, activeStudents: 13478, engagement: 72, completion: 59, learningHours: 68520, color: "program-green", linkKey: "neet" },
  { id: "jee", name: "JEE Preparation", fullName: "Joint Entrance Examination", description: "Concept-led preparation for engineering entrance examinations with progress-led learning paths.", enrolledStudents: 15860, activeStudents: 10943, engagement: 69, completion: 57, learningHours: 57430, color: "program-amber", linkKey: "jee" },
];

export const monthlyTrend = [
  { month: "Apr", aiMl: 58, neet: 63, jee: 60 }, { month: "May", aiMl: 61, neet: 65, jee: 62 },
  { month: "Jun", aiMl: 62, neet: 67, jee: 64 }, { month: "Jul", aiMl: 65, neet: 69, jee: 65 },
  { month: "Aug", aiMl: 66, neet: 71, jee: 67 }, { month: "Sep", aiMl: 68, neet: 72, jee: 69 },
];

export const yearlyTrend = [
  { month: "Oct", aiMl: 51, neet: 56, jee: 53 }, { month: "Nov", aiMl: 53, neet: 58, jee: 55 },
  { month: "Dec", aiMl: 55, neet: 59, jee: 56 }, { month: "Jan", aiMl: 56, neet: 61, jee: 58 },
  { month: "Feb", aiMl: 57, neet: 62, jee: 59 }, { month: "Mar", aiMl: 58, neet: 63, jee: 60 },
  ...monthlyTrend,
];

export const talukaOptions = Array.from(new Set(districts.flatMap(d => d.talukas.map(t => t.name)))).sort();
