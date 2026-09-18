import { MAHARASHTRA_36_DISTRICTS } from "./maharashtra-districts-data";
import type {
  AreaOfConcern,
  AssessmentItem,
  District,
  LearningProgram,
  StudentMetrics,
  Taluka,
} from "./models";

const calculateTalukas = (names: string[], total: number, engagement: number): Taluka[] => {
  const n = names.length;
  return names.map((name, index) => {
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

// Statewide aggregate totals
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

// Complete Age-Group based Learning Programs
export const programs: LearningProgram[] = [
  // --- Age 6–10 ---
  {
    id: "foundational",
    ageGroup: "6-10",
    name: "Foundational Learning",
    fullName: "Early Literacy, Phonics & Expression",
    description: "Interactive storytelling, language milestones, vocabulary development and phonics practice designed for primary school students.",
    enrolledStudents: 34200,
    activeStudents: 29400,
    engagement: 86,
    completion: 78,
    learningHours: 98400,
    color: "program-blue",
    linkKey: "foundationalLearning",
  },
  {
    id: "math-6-10",
    ageGroup: "6-10",
    name: "Mathematics & Numeracy",
    fullName: "Early Numbers, Arithmetic & Logic",
    description: "Visual problem-solving, counting games, basic geometry and foundational arithmetic building high computational fluency.",
    enrolledStudents: 31800,
    activeStudents: 26700,
    engagement: 84,
    completion: 74,
    learningHours: 89600,
    color: "program-green",
    linkKey: "mathNumeracy610",
  },
  {
    id: "science-6-10",
    ageGroup: "6-10",
    name: "Science & Exploration",
    fullName: "Environmental Studies & Curiosity",
    description: "Hands-on simple experiments, nature observation, living systems and inquiry-based STEM exploration modules.",
    enrolledStudents: 28400,
    activeStudents: 23200,
    engagement: 82,
    completion: 71,
    learningHours: 76500,
    color: "program-amber",
    linkKey: "scienceExploration610",
  },
  {
    id: "gk-skills",
    ageGroup: "6-10",
    name: "General Knowledge & Life Skills",
    fullName: "Civic Awareness, Health & Safety",
    description: "Community values, personal hygiene, emotional awareness and essential practical life skills for young learners.",
    enrolledStudents: 26100,
    activeStudents: 20900,
    engagement: 80,
    completion: 69,
    learningHours: 64200,
    color: "program-purple",
    linkKey: "gkLifeSkills610",
  },

  // --- Age 11–14 ---
  {
    id: "math-11-14",
    ageGroup: "11-14",
    name: "Mathematics & Problem Solving",
    fullName: "Pre-Algebra, Geometry & Applied Math",
    description: "Algorithmic thinking, fractions, algebraic expressions and multi-step word problems strengthening analytical rigor.",
    enrolledStudents: 38900,
    activeStudents: 31500,
    engagement: 81,
    completion: 73,
    learningHours: 114500,
    color: "program-blue",
    linkKey: "mathProblemSolving1114",
  },
  {
    id: "science-11-14",
    ageGroup: "11-14",
    name: "Science & Discovery",
    fullName: "Integrated Physics, Chemistry & Biology",
    description: "Scientific method, laboratory fundamentals, energy principles and earth sciences designed for middle schoolers.",
    enrolledStudents: 36400,
    activeStudents: 28900,
    engagement: 79,
    completion: 70,
    learningHours: 102300,
    color: "program-green",
    linkKey: "scienceDiscovery1114",
  },
  {
    id: "digital-tech",
    ageGroup: "11-14",
    name: "Digital Skills & Technology",
    fullName: "Computer Basics, Safe Internet & Coding",
    description: "Scratch visual coding, cyber safety etiquette, productivity tools and introductory digital literacy curriculum.",
    enrolledStudents: 29800,
    activeStudents: 24700,
    engagement: 83,
    completion: 76,
    learningHours: 88700,
    color: "program-amber",
    linkKey: "digitalSkills1114",
  },
  {
    id: "logic-reasoning",
    ageGroup: "11-14",
    name: "Logical Reasoning",
    fullName: "Mental Ability & Pattern Recognition",
    description: "Verbal and non-verbal reasoning, deductive puzzles, sequence analysis and competitive exam foundation drills.",
    enrolledStudents: 24600,
    activeStudents: 19100,
    engagement: 77,
    completion: 67,
    learningHours: 68900,
    color: "program-purple",
    linkKey: "logicalReasoning1114",
  },

  // --- Age 15–18 ---
  {
    id: "ai-ml",
    ageGroup: "15-18",
    name: "AI & ML",
    fullName: "Artificial Intelligence & Machine Learning",
    description: "Foundational neural network concepts, Python programming, computer vision projects and ethical AI applications for secondary students.",
    enrolledStudents: 22450,
    activeStudents: 17510,
    engagement: 78,
    completion: 64,
    learningHours: 84840,
    color: "program-blue",
    linkKey: "aiMl",
  },
  {
    id: "neet",
    ageGroup: "15-18",
    name: "NEET Preparation",
    fullName: "National Eligibility cum Entrance Test",
    description: "Targeted medical entrance curriculum across Physics, Chemistry and Biology with NCERT mastery and high-yield question banks.",
    enrolledStudents: 28720,
    activeStudents: 23724,
    engagement: 84,
    completion: 72,
    learningHours: 124520,
    color: "program-green",
    linkKey: "neet",
  },
  {
    id: "jee",
    ageGroup: "15-18",
    name: "JEE Preparation",
    fullName: "Joint Entrance Examination (Main & Advanced)",
    description: "Rigorous engineering entrance coaching covering Calculus, Mechanics, Organic Chemistry and Advanced Problem Solving.",
    enrolledStudents: 25860,
    activeStudents: 18992,
    engagement: 73,
    completion: 59,
    learningHours: 98430,
    color: "program-amber",
    linkKey: "jee",
  },
];

// Age groups metadata
export const AGE_GROUPS = [
  { id: "6-10", label: "Age 6–10", grade: "Primary (Std 1–5)", description: "Foundational reading, numeracy & exploratory learning" },
  { id: "11-14", label: "Age 11–14", grade: "Middle School (Std 6–8)", description: "Applied STEM, digital literacy & analytical problem-solving" },
  { id: "15-18", label: "Age 15–18", grade: "Secondary & Higher Secondary (Std 9–12)", description: "Competitive entrance (NEET, JEE) & future tech (AI/ML)" },
] as const;

// Assessment Items mock
export const assessmentList: AssessmentItem[] = [
  // 6-10
  { id: "asm-fl-1", name: "Early Reading & Phonics Diagnostic Test", programId: "foundational", ageGroup: "6-10" },
  { id: "asm-fl-2", name: "Language Milestone Assessment", programId: "foundational", ageGroup: "6-10" },
  { id: "asm-mn-1", name: "Foundational Numeracy & Arithmetic Quiz", programId: "math-6-10", ageGroup: "6-10" },
  { id: "asm-se-1", name: "EVS & Living World Observation Test", programId: "science-6-10", ageGroup: "6-10" },
  { id: "asm-gk-1", name: "Civic Habits & Safety Practical Check", programId: "gk-skills", ageGroup: "6-10" },

  // 11-14
  { id: "asm-mp-1", name: "Algebraic Reasoning & Fractions Mastery", programId: "math-11-14", ageGroup: "11-14" },
  { id: "asm-sd-1", name: "Physical Science Principles Assessment", programId: "science-11-14", ageGroup: "11-14" },
  { id: "asm-dt-1", name: "Digital Safety & Logic Block Evaluation", programId: "digital-tech", ageGroup: "11-14" },
  { id: "asm-lr-1", name: "Mental Ability & Pattern Speed Test", programId: "logic-reasoning", ageGroup: "11-14" },

  // 15-18
  { id: "asm-ai-1", name: "Python & Machine Learning Baseline Evaluation", programId: "ai-ml", ageGroup: "15-18" },
  { id: "asm-neet-1", name: "NEET Full Syllabus Mock 1 (PCB)", programId: "neet", ageGroup: "15-18" },
  { id: "asm-neet-2", name: "NEET Biology NCERT Mastery Check", programId: "neet", ageGroup: "15-18" },
  { id: "asm-jee-1", name: "JEE Main Diagnostic Series 1 (PCM)", programId: "jee", ageGroup: "15-18" },
  { id: "asm-jee-2", name: "Calculus & Mechanics Sprint Assessment", programId: "jee", ageGroup: "15-18" },
];

// Academic areas requiring intervention
export const areasOfConcern: AreaOfConcern[] = [
  {
    subject: "JEE Mechanics & Coordinate Geometry",
    ageGroup: "Age 15–18",
    identifiedIssue: "Low conceptual clarity in rotational dynamics and conic sections across rural tribal belt.",
    score: 48.2,
    studentsImpacted: 4820,
    priority: "Urgent",
    recommendedAction: "Deploy focused video problem-solving clinics on Klassroom with Marathi step-by-step subtitles.",
  },
  {
    subject: "Grade 6-8 Algebraic Word Problems",
    ageGroup: "Age 11–14",
    identifiedIssue: "Transition from arithmetic to variable abstraction causing 28% drop in multi-step problem solving.",
    score: 54.6,
    studentsImpacted: 7150,
    priority: "High",
    recommendedAction: "Release gamified visual algebra workbooks and digital worksheet drills.",
  },
  {
    subject: "NEET Organic Chemistry Mechanisms",
    ageGroup: "Age 15–18",
    identifiedIssue: "Electrophilic substitution recall questions exhibiting < 50% retention rates in Vidarbha region.",
    score: 52.8,
    studentsImpacted: 3940,
    priority: "High",
    recommendedAction: "Conduct bi-weekly live reaction mechanism revision webinars via Klassroom portal.",
  },
  {
    subject: "Primary Phonics & Reading Comprehension",
    ageGroup: "Age 6–10",
    identifiedIssue: "Blend sound recognition lagging in Nandurbar and Gadchiroli vernacular schools.",
    score: 58.4,
    studentsImpacted: 5300,
    priority: "Medium",
    recommendedAction: "Assign interactive audio stories and bilingual phonics cards to primary field mentors.",
  },
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
