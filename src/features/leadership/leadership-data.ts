import type { StudentAgeGroup } from "@/features/student/student-data";
import type {
  AvailableAssessment,
  CompletedAssessmentResult,
  LeaderboardEntry,
  ScholarshipApplication,
  ScholarshipProgram,
  StudentBadge,
  StudentRankPosition,
} from "./leadership-models";

// ==========================================
// 1. STUDENT POSITIONS & RANKINGS (DETERMINISTIC)
// ==========================================

export const STUDENT_POSITIONS: Record<string, StudentRankPosition> = {
  aarav6: {
    talukaRank: 8,
    totalTalukaStudents: 480,
    districtRank: 42,
    totalDistrictStudents: 3850,
    stateRank: 215,
    totalStateStudents: 34200,
    score: 92,
    percentile: 96.2,
    rankMovement: 14, // improved by 14 places
    previousRank: 229,
    ageGroup: "6-10",
    assessmentTitle: "Foundational Numeracy & Arithmetic Quiz",
  },
  aarav11: {
    talukaRank: 5,
    totalTalukaStudents: 360,
    districtRank: 28,
    totalDistrictStudents: 2940,
    stateRank: 184,
    totalStateStudents: 38900,
    score: 88,
    percentile: 94.5,
    rankMovement: 9, // improved by 9 places
    previousRank: 193,
    ageGroup: "11-14",
    assessmentTitle: "Algebraic Reasoning & Fractions Mastery",
  },
  aarav15: {
    talukaRank: 2,
    totalTalukaStudents: 290,
    districtRank: 14,
    totalDistrictStudents: 2410,
    stateRank: 48, // IN TOP 50!
    totalStateStudents: 28720,
    score: 94,
    percentile: 98.7,
    rankMovement: 18, // improved by 18 places
    previousRank: 66,
    ageGroup: "15-18",
    assessmentTitle: "NEET Full Syllabus Mock 1 (PCB)",
  },
};

// ==========================================
// 2. BADGES & ACHIEVEMENTS DEFINITIONS
// ==========================================

export const STUDENT_BADGES: Record<string, StudentBadge[]> = {
  aarav6: [
    {
      id: "badge-asm-champ",
      title: "Assessment Champion",
      category: "Assessment",
      icon: "🏆",
      description: "Scored 90%+ in Foundational Mathematics Assessment",
      earned: true,
      earnedDate: "15 Sep 2026",
      requirement: "Achieve >= 90% in any official monthly assessment",
    },
    {
      id: "badge-consistent",
      title: "Consistent Learner",
      category: "Consistency",
      icon: "⭐",
      description: "Completed daily learning modules 14 days in a row",
      earned: true,
      earnedDate: "20 Sep 2026",
      requirement: "Active learning on the platform for 14 continuous days",
    },
    {
      id: "badge-streak",
      title: "Learning Streak",
      category: "Milestone",
      icon: "🔥",
      description: "Maintained a continuous 5-day active study streak",
      earned: true,
      earnedDate: "26 Sep 2026",
      requirement: "Complete minimum 30 minutes learning for 5 days",
    },
    {
      id: "badge-dist-top",
      title: "District Top Performer",
      category: "Leadership",
      icon: "🏅",
      description: "Secured Rank #42 in Pune District primary category",
      earned: true,
      earnedDate: "22 Sep 2026",
      requirement: "Reach Top 50 in your registered home district",
    },
    {
      id: "badge-course-comp",
      title: "Course Completion",
      category: "Milestone",
      icon: "📜",
      description: "Finished Early Literacy & Phonics Module 1 to 9",
      earned: true,
      earnedDate: "10 Sep 2026",
      requirement: "Complete 100% lectures and checkpoints in a course",
    },
    {
      id: "badge-state-top",
      title: "State Top Performer",
      category: "Leadership",
      icon: "👑",
      description: "Reach Top 100 rank across Maharashtra in Age 6–10",
      earned: false,
      progressPercent: 65,
      requirement: "Current Maharashtra State Rank #215 (Target: Top 100)",
    },
    {
      id: "badge-sch-qual",
      title: "Scholarship Qualifier",
      category: "Scholarship",
      icon: "🎓",
      description: "Qualify for Primary Digital Learning Excellence Grant",
      earned: false,
      progressPercent: 85,
      requirement: "Complete 2 more diagnostic quizzes with score >= 90%",
    },
  ],

  aarav11: [
    {
      id: "badge-asm-champ",
      title: "Assessment Champion",
      category: "Assessment",
      icon: "🏆",
      description: "Scored 88%+ in Middle School Algebraic Reasoning Assessment",
      earned: true,
      earnedDate: "18 Sep 2026",
      requirement: "Achieve >= 85% in any state benchmark assessment",
    },
    {
      id: "badge-consistent",
      title: "Consistent Learner",
      category: "Consistency",
      icon: "⭐",
      description: "Submitted 7 homework worksheets without missing deadlines",
      earned: true,
      earnedDate: "22 Sep 2026",
      requirement: "Maintain 100% on-time submission rate for 30 days",
    },
    {
      id: "badge-streak",
      title: "Learning Streak",
      category: "Milestone",
      icon: "🔥",
      description: "Active 8-day study streak with coding and math videos",
      earned: true,
      earnedDate: "27 Sep 2026",
      requirement: "Active study streak of 7+ consecutive days",
    },
    {
      id: "badge-dist-top",
      title: "District Top Performer",
      category: "Leadership",
      icon: "🏅",
      description: "Secured Rank #28 in Nashik District middle school division",
      earned: true,
      earnedDate: "21 Sep 2026",
      requirement: "Rank among the top 30 students in the district",
    },
    {
      id: "badge-sch-qual",
      title: "Scholarship Qualifier",
      category: "Scholarship",
      icon: "🎓",
      description: "Pre-qualified for STEM Achievers Incentive Scheme",
      earned: true,
      earnedDate: "25 Sep 2026",
      requirement: "Score >= 85% with 75%+ attendance in STEM subjects",
    },
    {
      id: "badge-state-top",
      title: "State Top Performer",
      category: "Leadership",
      icon: "👑",
      description: "Reach Top 50 statewide leaderboard position",
      earned: false,
      progressPercent: 72,
      requirement: "Current Maharashtra State Rank #184 (Target: Top 50)",
    },
    {
      id: "badge-course-comp",
      title: "Course Completion",
      category: "Milestone",
      icon: "📜",
      description: "Complete all modules of Digital Skills & Scratch Coding",
      earned: false,
      progressPercent: 80,
      requirement: "4 more interactive coding lab exercises remaining",
    },
  ],

  aarav15: [
    {
      id: "badge-asm-champ",
      title: "Assessment Champion",
      category: "Assessment",
      icon: "🏆",
      description: "Achieved 94% in Statewide NEET Diagnostic Mock Exam",
      earned: true,
      earnedDate: "12 Sep 2026",
      requirement: "Score >= 90% in a state-level competitive mock",
    },
    {
      id: "badge-consistent",
      title: "Consistent Learner",
      category: "Consistency",
      icon: "⭐",
      description: "64.5 total hours logged with rigorous test practice",
      earned: true,
      earnedDate: "19 Sep 2026",
      requirement: "Log over 50 verified digital learning hours",
    },
    {
      id: "badge-streak",
      title: "Learning Streak",
      category: "Milestone",
      icon: "🔥",
      description: "12 consecutive study streak days prior to mock test",
      earned: true,
      earnedDate: "28 Sep 2026",
      requirement: "10+ days continuous high engagement streak",
    },
    {
      id: "badge-dist-top",
      title: "District Top Performer",
      category: "Leadership",
      icon: "🏅",
      description: "Secured Rank #14 in Nagpur District competitive track",
      earned: true,
      earnedDate: "20 Sep 2026",
      requirement: "Rank in the Top 20 across the entire district",
    },
    {
      id: "badge-state-top",
      title: "State Top Performer",
      category: "Leadership",
      icon: "👑",
      description: "Rank #48 across Maharashtra — Top 50 State Honor Roll!",
      earned: true,
      earnedDate: "24 Sep 2026",
      requirement: "Qualify into the prestigious Top 50 Maharashtra State Ranks",
    },
    {
      id: "badge-sch-qual",
      title: "Scholarship Qualifier",
      category: "Scholarship",
      icon: "🎓",
      description: "Shortlisted for Maharashtra Digital Learning Excellence Award",
      earned: true,
      earnedDate: "25 Sep 2026",
      requirement: "Top 50 rank + Verified BOCW card holder family",
    },
    {
      id: "badge-course-comp",
      title: "Course Completion",
      category: "Milestone",
      icon: "📜",
      description: "Complete NCERT Biology High-Yield Master Modules",
      earned: false,
      progressPercent: 92,
      requirement: "2 revision test units remaining to complete 100%",
    },
  ],
};

// ==========================================
// 3. STUDENT ASSESSMENT RESULTS & UPCOMING
// ==========================================

export const STUDENT_RESULTS: Record<string, CompletedAssessmentResult[]> = {
  aarav6: [
    {
      id: "res-6-1",
      assessmentId: "asm-mn-1",
      title: "Foundational Numeracy & Arithmetic Quiz",
      courseName: "Mathematics & Numeracy",
      category: "Arithmetic & Logic Games",
      completionDate: "22 Sep 2026",
      score: 92,
      totalMarks: 100,
      percentage: 92,
      correctAnswers: 23,
      totalQuestions: 25,
      rank: 8,
      percentile: 96.2,
      status: "Passed with Distinction",
      timeTakenMinutes: 22,
    },
    {
      id: "res-6-2",
      assessmentId: "asm-fl-1",
      title: "Early Reading & Phonics Diagnostic Test",
      courseName: "Foundational Learning",
      category: "Early Literacy",
      completionDate: "14 Sep 2026",
      score: 88,
      totalMarks: 100,
      percentage: 88,
      correctAnswers: 22,
      totalQuestions: 25,
      rank: 15,
      percentile: 91.4,
      status: "Passed with Distinction",
      timeTakenMinutes: 24,
    },
    {
      id: "res-6-3",
      assessmentId: "asm-se-1",
      title: "EVS & Living World Observation Test",
      courseName: "Science & Exploration",
      category: "Nature & STEM Basics",
      completionDate: "05 Sep 2026",
      score: 84,
      totalMarks: 100,
      percentage: 84,
      correctAnswers: 21,
      totalQuestions: 25,
      rank: 24,
      percentile: 87.0,
      status: "Passed",
      timeTakenMinutes: 26,
    },
    {
      id: "res-6-4",
      assessmentId: "asm-gk-1",
      title: "Civic Habits & Safety Practical Check",
      courseName: "General Knowledge & Life Skills",
      category: "Civic Awareness",
      completionDate: "28 Aug 2026",
      score: 80,
      totalMarks: 100,
      percentage: 80,
      correctAnswers: 16,
      totalQuestions: 20,
      rank: 36,
      percentile: 82.5,
      status: "Passed",
      timeTakenMinutes: 18,
    },
  ],

  aarav11: [
    {
      id: "res-11-1",
      assessmentId: "asm-mp-1",
      title: "Algebraic Reasoning & Fractions Mastery",
      courseName: "Mathematics & Problem Solving",
      category: "Pre-Algebra",
      completionDate: "21 Sep 2026",
      score: 88,
      totalMarks: 100,
      percentage: 88,
      correctAnswers: 35,
      totalQuestions: 40,
      rank: 5,
      percentile: 94.5,
      status: "Passed with Distinction",
      timeTakenMinutes: 38,
    },
    {
      id: "res-11-2",
      assessmentId: "asm-sd-1",
      title: "Physical Science Principles Assessment",
      courseName: "Science & Discovery",
      category: "Physics & Chemistry",
      completionDate: "12 Sep 2026",
      score: 86,
      totalMarks: 100,
      percentage: 86,
      correctAnswers: 26,
      totalQuestions: 30,
      rank: 9,
      percentile: 92.1,
      status: "Passed with Distinction",
      timeTakenMinutes: 32,
    },
    {
      id: "res-11-3",
      assessmentId: "asm-dt-1",
      title: "Digital Safety & Logic Block Evaluation",
      courseName: "Digital Skills & Technology",
      category: "Coding & Logic",
      completionDate: "02 Sep 2026",
      score: 92,
      totalMarks: 100,
      percentage: 92,
      correctAnswers: 23,
      totalQuestions: 25,
      rank: 3,
      percentile: 97.4,
      status: "Passed with Distinction",
      timeTakenMinutes: 25,
    },
    {
      id: "res-11-4",
      assessmentId: "asm-mp-2",
      title: "Geometry & Coordinate Foundations Test",
      courseName: "Mathematics & Problem Solving",
      category: "Geometry",
      completionDate: "20 Aug 2026",
      score: 82,
      totalMarks: 100,
      percentage: 82,
      correctAnswers: 33,
      totalQuestions: 40,
      rank: 18,
      percentile: 85.0,
      status: "Passed",
      timeTakenMinutes: 41,
    },
  ],

  aarav15: [
    {
      id: "res-15-1",
      assessmentId: "asm-neet-1",
      title: "NEET Full Syllabus Mock 1 (PCB)",
      courseName: "NEET Preparation",
      category: "Medical Entrance",
      completionDate: "24 Sep 2026",
      score: 94,
      totalMarks: 100,
      percentage: 94,
      correctAnswers: 47,
      totalQuestions: 50,
      rank: 2,
      percentile: 98.7,
      status: "Passed with Distinction",
      timeTakenMinutes: 52,
    },
    {
      id: "res-15-2",
      assessmentId: "asm-ai-1",
      title: "Python & Machine Learning Baseline Evaluation",
      courseName: "AI & ML",
      category: "Artificial Intelligence",
      completionDate: "15 Sep 2026",
      score: 91,
      totalMarks: 100,
      percentage: 91,
      correctAnswers: 27,
      totalQuestions: 30,
      rank: 4,
      percentile: 96.5,
      status: "Passed with Distinction",
      timeTakenMinutes: 44,
    },
    {
      id: "res-15-3",
      assessmentId: "asm-neet-2",
      title: "NEET Biology NCERT Mastery Check",
      courseName: "NEET Preparation",
      category: "Biology",
      completionDate: "06 Sep 2026",
      score: 96,
      totalMarks: 100,
      percentage: 96,
      correctAnswers: 48,
      totalQuestions: 50,
      rank: 1,
      percentile: 99.2,
      status: "Passed with Distinction",
      timeTakenMinutes: 48,
    },
    {
      id: "res-15-4",
      assessmentId: "asm-jee-1",
      title: "Calculus & Mechanics Sprint Assessment",
      courseName: "JEE Preparation",
      category: "Engineering Physics",
      completionDate: "27 Aug 2026",
      score: 87,
      totalMarks: 100,
      percentage: 87,
      correctAnswers: 26,
      totalQuestions: 30,
      rank: 11,
      percentile: 91.8,
      status: "Passed with Distinction",
      timeTakenMinutes: 50,
    },
  ],
};

export const UPCOMING_ASSESSMENTS: AvailableAssessment[] = [
  // 6-10
  {
    id: "asm-up-6-1",
    title: "Fun Shapes & Number Patterns Quiz",
    courseName: "Mathematics & Numeracy",
    ageGroup: "6-10",
    scheduledDate: "Tomorrow · 10:30 AM",
    durationMinutes: 30,
    totalQuestions: 15,
    eligibility: "All enrolled Primary Students (Age 6–10)",
    status: "Available Now",
    syllabus: "Module 2: 2D Geometrical Shapes, Counting in Fives & Tens",
  },
  {
    id: "asm-up-6-2",
    title: "Early Literacy Expression & Storytelling Check",
    courseName: "Foundational Learning",
    ageGroup: "6-10",
    scheduledDate: "05 Oct 2026 · 11:00 AM",
    durationMinutes: 35,
    totalQuestions: 20,
    eligibility: "All enrolled Primary Students (Age 6–10)",
    status: "Scheduled",
    syllabus: "Module 3: Vowel Blends, Picture Vocabulary & Marathi Phonics",
  },
  {
    id: "asm-up-6-3",
    title: "Living World Nature Explorer Quiz",
    courseName: "Science & Exploration",
    ageGroup: "6-10",
    scheduledDate: "12 Oct 2026 · 02:00 PM",
    durationMinutes: 30,
    totalQuestions: 15,
    eligibility: "All enrolled Primary Students (Age 6–10)",
    status: "Scheduled",
    syllabus: "Module 2: How Seeds Grow, Water Cycle in Daily Surroundings",
  },

  // 11-14
  {
    id: "asm-up-11-1",
    title: "Science & Force Principles Checkpoint",
    courseName: "Science & Discovery",
    ageGroup: "11-14",
    scheduledDate: "Thursday · 04:00 PM",
    durationMinutes: 45,
    totalQuestions: 25,
    eligibility: "Middle School Enrolled Students (Age 11–14)",
    status: "Available Now",
    syllabus: "Module 3: Force, Work & Newton's Laws with Interactive Simulations",
  },
  {
    id: "asm-up-11-2",
    title: "Scratch Game Logic & Conditional Blocks Sprint",
    courseName: "Digital Skills & Technology",
    ageGroup: "11-14",
    scheduledDate: "08 Oct 2026 · 03:30 PM",
    durationMinutes: 40,
    totalQuestions: 20,
    eligibility: "Middle School Enrolled Students (Age 11–14)",
    status: "Scheduled",
    syllabus: "Module 3: Visual Coding, Loops & Interactive Animation Blocks",
  },
  {
    id: "asm-up-11-3",
    title: "Applied Algebra & Linear Equations Challenge",
    courseName: "Mathematics & Problem Solving",
    ageGroup: "11-14",
    scheduledDate: "15 Oct 2026 · 10:00 AM",
    durationMinutes: 50,
    totalQuestions: 30,
    eligibility: "Middle School Enrolled Students (Age 11–14)",
    status: "Scheduled",
    syllabus: "Module 4: Solving Linear Equations, Angle Theorems & Ratio Problems",
  },

  // 15-18
  {
    id: "asm-up-15-1",
    title: "NEET Physics Mechanics High-Yield Mock 02",
    courseName: "NEET Preparation",
    ageGroup: "15-18",
    scheduledDate: "Friday · 05:30 PM",
    durationMinutes: 60,
    totalQuestions: 45,
    eligibility: "Registered Secondary & Entrance Prep Students (Age 15–18)",
    status: "Available Now",
    syllabus: "NCERT Class 11 Mechanics, Laws of Motion, Gravitation & Work-Energy",
  },
  {
    id: "asm-up-15-2",
    title: "Deep Neural Networks & Python Optimization Lab Quiz",
    courseName: "AI & ML",
    ageGroup: "15-18",
    scheduledDate: "09 Oct 2026 · 04:00 PM",
    durationMinutes: 45,
    totalQuestions: 25,
    eligibility: "Secondary AI & ML Track Students (Age 15–18)",
    status: "Scheduled",
    syllabus: "Module 4: Backpropagation, Activation Functions & Model Loss Analysis",
  },
  {
    id: "asm-up-15-3",
    title: "JEE Main Rotational Dynamics & Calculus Master Mock",
    courseName: "JEE Preparation",
    ageGroup: "15-18",
    scheduledDate: "16 Oct 2026 · 09:30 AM",
    durationMinutes: 75,
    totalQuestions: 35,
    eligibility: "Registered Secondary & Entrance Prep Students (Age 15–18)",
    status: "Scheduled",
    syllabus: "Rigid Body Dynamics, Moment of Inertia & Differential Calculus Applications",
  },
];

// ==========================================
// 4. SCHOLARSHIP PROGRAMS & AWARDS (PROPOSED DEMO)
// ==========================================

export const INITIAL_SCHOLARSHIPS: ScholarshipProgram[] = [
  {
    id: "sch-flagship-top50",
    name: "Maharashtra Digital Learning Excellence Awards",
    tagline: "Statewide Merit Recognition for Top 50 High Achievers",
    description:
      "A flagship initiative by the Maharashtra Building and Other Construction Workers Welfare Board (MBOCWWB) honoring the highest-performing registered children in statewide monthly benchmark assessments.",
    eligibleAgeGroups: ["6-10", "11-14", "15-18"],
    eligibilityCriteria: [
      "Secured rank in Top 50 of Maharashtra Statewide Leaderboard in age group",
      "Attained >= 85% in official state assessment checkpoint",
      "Valid BOCW registered building/construction worker dependent status",
      "Minimum 80% regular course video & module completion",
    ],
    associatedAssessmentId: "asm-all-state",
    associatedAssessmentName: "Statewide Monthly Benchmark Assessment 2026",
    scope: "Statewide (Maharashtra)",
    deadline: "31 Oct 2026",
    rewardDetails: {
      title: "State Merit Award & Tech Learning Grant",
      amount: "₹15,000 Academic Grant",
      kitDescription: "Official 10-inch 4G Digital Learning Tablet with pre-loaded NCERT & state syllabus content",
      certificate: "Certificate of Digital Excellence signed by Welfare Commissioner & Hon'ble Minister",
    },
    topLimit: 50,
    status: "Open",
    qualifyingCount: 50,
    applicationCount: 38,
    shortlistedCount: 22,
    awardedCount: 15,
    verificationStatus: "Active",
    isProposedDemo: true,
  },
  {
    id: "sch-district-stem",
    name: "District STEM Achievers Incentive Scheme",
    tagline: "Top 25 STEM & Science Performers in Each District",
    description:
      "Encouraging youth across all 36 Maharashtra districts to master applied sciences, mathematics, and digital programming through targeted district incentive recognition.",
    eligibleAgeGroups: ["11-14", "15-18"],
    eligibilityCriteria: [
      "Ranked in Top 25 within registered home district in STEM or AI track",
      "Score >= 80% in Science, Mathematics or AI module tests",
      "Submitted at least 2 practical lab projects or scratch animation exercises",
    ],
    associatedAssessmentId: "asm-stem-eval",
    associatedAssessmentName: "District Science & Mathematics Evaluation Checkpoint",
    scope: "District Level",
    deadline: "15 Nov 2026",
    rewardDetails: {
      title: "STEM Discovery Kit & Mentorship",
      amount: "₹5,000 Study Incentive",
      kitDescription: "Hands-on Science & Electronics Experiment Kit + 6-month mentorship from IIT/COEP fellows",
      certificate: "District Merit Certificate issued by District Collector & Labor Officer",
    },
    topLimit: 25,
    status: "Eligible",
    qualifyingCount: 25,
    applicationCount: 19,
    shortlistedCount: 12,
    awardedCount: 8,
    verificationStatus: "Active",
    isProposedDemo: true,
  },
  {
    id: "sch-taluka-foundation",
    name: "Primary Foundation Star Grant",
    tagline: "Early Learning Support at Grassroots Taluka Level",
    description:
      "Fostering early literacy and numeracy habits among primary school children across all talukas in Maharashtra with learning kits and motivation badges.",
    eligibleAgeGroups: ["6-10"],
    eligibilityCriteria: [
      "Ranked in Top 15 of student's taluka in foundational assessments",
      "Achieved 75%+ in Marathi literacy or numeracy quizzes",
      "Regular attendance in digital study circles or home study tracking",
    ],
    associatedAssessmentId: "asm-foundation-check",
    associatedAssessmentName: "Taluka Foundational Numeracy & Phonics Check",
    scope: "Taluka Level",
    deadline: "20 Nov 2026",
    rewardDetails: {
      title: "Primary Scholar Learning Backpack",
      amount: "₹2,500 Book Grant",
      kitDescription: "Illustrated Bilingual Dictionary, geometry box, solar study lamp and art kit",
      certificate: "Taluka Star Learner Certificate from Block Education Officer",
    },
    topLimit: 15,
    status: "Eligible",
    qualifyingCount: 15,
    applicationCount: 11,
    shortlistedCount: 9,
    awardedCount: 6,
    verificationStatus: "Active",
    isProposedDemo: true,
  },
];

// Initial mock applications
export const INITIAL_APPLICATIONS: ScholarshipApplication[] = [
  {
    id: "app-2026-001",
    scholarshipId: "sch-flagship-top50",
    scholarshipName: "Maharashtra Digital Learning Excellence Awards",
    studentId: "MH-NGP-15093",
    studentName: "Aarav (Student Account)",
    ageGroup: "15-18",
    district: "Nagpur",
    taluka: "Nagpur Rural",
    score: 94,
    percentile: 98.7,
    rank: 48,
    submissionDate: "25 Sep 2026",
    status: "Shortlisted",
    documentUploaded: "BOCW_Registration_Card_NGP.pdf, NEET_Mock1_Scorecard.pdf",
    remarks: "Top 50 Rank confirmed. Valid BOCW card verified by labor officer.",
  },
  {
    id: "app-2026-002",
    scholarshipId: "sch-district-stem",
    scholarshipName: "District STEM Achievers Incentive Scheme",
    studentId: "MH-NSK-11082",
    studentName: "Aarav (Student Account)",
    ageGroup: "11-14",
    district: "Nashik",
    taluka: "Dindori",
    score: 88,
    percentile: 94.5,
    rank: 28,
    submissionDate: "26 Sep 2026",
    status: "Under Review",
    documentUploaded: "School_Attestation_NSK.pdf, BOCW_Parent_Card.pdf",
    remarks: "Application submitted. Document review in queue.",
  },
  {
    id: "app-2026-003",
    scholarshipId: "sch-flagship-top50",
    scholarshipName: "Maharashtra Digital Learning Excellence Awards",
    studentId: "MH-PUN-06041",
    studentName: "Aarav (Student Account)",
    ageGroup: "6-10",
    district: "Pune",
    taluka: "Haveli",
    score: 92,
    percentile: 96.2,
    rank: 215,
    submissionDate: "24 Sep 2026",
    status: "Under Review",
    documentUploaded: "Parent_BOCW_Passbook_PUN.pdf",
    remarks: "Under verification for Taluka/District Foundation tier.",
  },
  {
    id: "app-2026-004",
    scholarshipId: "sch-flagship-top50",
    scholarshipName: "Maharashtra Digital Learning Excellence Awards",
    studentId: "MH-MUM-15012",
    studentName: "Snehal K.***",
    ageGroup: "15-18",
    district: "Mumbai City",
    taluka: "Mumbai City",
    score: 99,
    percentile: 99.9,
    rank: 1,
    submissionDate: "21 Sep 2026",
    status: "Approved",
    documentUploaded: "BOCW_Worker_Certificate_MUM.pdf, Aadhaar_Copy.pdf",
    remarks: "State Rank #1 confirmed. Recommended for Honors Award.",
  },
  {
    id: "app-2026-005",
    scholarshipId: "sch-flagship-top50",
    scholarshipName: "Maharashtra Digital Learning Excellence Awards",
    studentId: "MH-THA-15024",
    studentName: "Omkar S.***",
    ageGroup: "15-18",
    district: "Thane",
    taluka: "Kalyan",
    score: 98,
    percentile: 99.8,
    rank: 2,
    submissionDate: "22 Sep 2026",
    status: "Approved",
    documentUploaded: "BOCW_ID_THA.pdf",
    remarks: "State Rank #2 verified.",
  },
  {
    id: "app-2026-006",
    scholarshipId: "sch-district-stem",
    scholarshipName: "District STEM Achievers Incentive Scheme",
    studentId: "MH-KOL-11045",
    studentName: "Pooja D.***",
    ageGroup: "11-14",
    district: "Kolhapur",
    taluka: "Karvir",
    score: 96,
    percentile: 99.4,
    rank: 1,
    submissionDate: "20 Sep 2026",
    status: "Awarded",
    documentUploaded: "BOCW_Kolhapur_Attested.pdf",
    remarks: "Tablet & STEM Kit handed over at District HQ.",
  },
  {
    id: "app-2026-007",
    scholarshipId: "sch-taluka-foundation",
    scholarshipName: "Primary Foundation Star Grant",
    studentId: "MH-NSK-06019",
    studentName: "Tanmay P.***",
    ageGroup: "6-10",
    district: "Nashik",
    taluka: "Dindori",
    score: 95,
    percentile: 98.9,
    rank: 1,
    submissionDate: "19 Sep 2026",
    status: "Awarded",
    documentUploaded: "BOCW_Nashik_Cert.pdf",
    remarks: "Primary Foundation Star Grant kit disbursed.",
  },
];

// ==========================================
// 5. DETERMINISTIC POPULATION GENERATOR FOR LEADERBOARDS
// ==========================================

const SAMPLE_FIRST_NAMES = [
  "Aarav", "Snehal", "Omkar", "Pooja", "Tanmay", "Rohan", "Isha", "Aditya",
  "Ananya", "Prathamesh", "Vaishnavi", "Yash", "Shruti", "Sarthak", "Sakshi",
  "Atharva", "Gauri", "Shubham", "Tejaswi", "Kunal", "Riddhi", "Siddhesh",
  "Kavya", "Harsh", "Prachi", "Digvijay", "Mansi", "Chetan", "Bhakti", "Nikhil",
];

const SAMPLE_LAST_INITIALS = ["P.", "K.", "S.", "D.", "G.", "M.", "J.", "B.", "C.", "T.", "W.", "R.", "N.", "L."];

// Realistic districts with their talukas for generating leaderboards
const DISTRICT_TALUKA_MAP: Record<string, string[]> = {
  Pune: ["Haveli", "Pune City", "Baramati", "Khed", "Shirur", "Ambegaon", "Maval"],
  Nashik: ["Dindori", "Nashik", "Malegaon", "Igatpuri", "Sinnar", "Niphad", "Yeola"],
  Nagpur: ["Nagpur Rural", "Nagpur Urban", "Kamptee", "Hingna", "Katol", "Saoner", "Umred"],
  "Mumbai City": ["Mumbai City"],
  "Mumbai Suburban": ["Andheri", "Borivali", "Kurla"],
  Thane: ["Thane", "Kalyan", "Bhiwandi", "Ulhasnagar", "Shahapur"],
  Kolhapur: ["Karvir", "Hatkanangle", "Shirol", "Panhala", "Radhanagari"],
  "Chhatrapati Sambhajinagar": ["Aurangabad", "Paithan", "Gangapur", "Vaijapur", "Kannad"],
  Amravati: ["Amravati", "Achalpur", "Chandur Bazar", "Morshi", "Warud"],
  Solapur: ["Solapur North", "Solapur South", "Pandharpur", "Barshi", "Madha"],
  Nanded: ["Nanded", "Loha", "Hadgaon", "Kinwat", "Mukhed"],
  Satara: ["Satara", "Karad", "Wai", "Phaltan", "Koregaon"],
  Nandurbar: ["Nandurbar", "Shahada", "Navapur", "Taloda", "Dhadgaon"],
  Gadchiroli: ["Gadchiroli", "Chamorshi", "Aheri", "Armori", "Kurkheda"],
  Jalgaon: ["Jalgaon", "Bhusawal", "Chalisgaon", "Amalner", "Raver"],
  Ahmednagar: ["Nagar", "Sangamner", "Rahata", "Shrirampur", "Parner"],
};

/**
 * Generates deterministic statewide leaderboard entries for an age group
 */
export function generateDeterministicLeaderboard(ageGroup: StudentAgeGroup): LeaderboardEntry[] {
  const entries: LeaderboardEntry[] = [];
  const targetStudentKey = ageGroup === "6-10" ? "aarav6" : ageGroup === "11-14" ? "aarav11" : "aarav15";
  const studentPos = STUDENT_POSITIONS[targetStudentKey] ?? STUDENT_POSITIONS["aarav11"];
  if (!studentPos) return [];
  const targetDistrict = ageGroup === "6-10" ? "Pune" : ageGroup === "11-14" ? "Nashik" : "Nagpur";
  const targetTaluka = ageGroup === "6-10" ? "Haveli" : ageGroup === "11-14" ? "Dindori" : "Nagpur Rural";
  const targetStudentId = ageGroup === "6-10" ? "MH-PUN-06041" : ageGroup === "11-14" ? "MH-NSK-11082" : "MH-NGP-15093";

  const districtNames = Object.keys(DISTRICT_TALUKA_MAP);

  // Generate 75 deterministic entries covering Top 50 and beyond
  for (let r = 1; r <= 75; r++) {
    // If r matches student's exact state rank, inject target student
    if (r === studentPos.stateRank) {
      entries.push({
        id: `entry-${targetStudentKey}`,
        rank: r,
        studentId: targetStudentId,
        displayName: "Aarav (You)",
        maskedName: "Aarav P. (You)",
        district: targetDistrict,
        taluka: targetTaluka,
        ageGroup,
        assessmentId: "asm-main",
        assessmentName: studentPos.assessmentTitle,
        score: studentPos.score,
        percentile: studentPos.percentile,
        previousRank: studentPos.previousRank,
        rankMovement: studentPos.rankMovement,
        badgesEarned: ["Champion", "Streak", "Merit"],
        scholarshipStatus: r <= 50 ? "Shortlisted" : "Eligible",
        isCurrentUser: true,
      });
      continue;
    }

    // Pseudo-random deterministic name and district based on seed r
    const distIndex = (r * 7 + 3) % districtNames.length;
    const distName = districtNames[distIndex] ?? "Pune";
    const talukas = DISTRICT_TALUKA_MAP[distName] || ["Main"];
    const talukaName = talukas[(r * 3) % talukas.length];

    const firstName = SAMPLE_FIRST_NAMES[(r * 5) % SAMPLE_FIRST_NAMES.length];
    const lastInit = SAMPLE_LAST_INITIALS[(r * 3) % SAMPLE_LAST_INITIALS.length];
    const masked = `${firstName} ${lastInit}***`;

    // Scores decrease realistically from 100 to 82
    const score = Math.max(78, Number((100 - (r - 1) * 0.28).toFixed(1)));
    const percentile = Math.max(85, Number((99.9 - (r - 1) * 0.22).toFixed(1)));
    const prevRankOffset = ((r * 11) % 9) - 4; // -4 to +4
    const prevRank = Math.max(1, r + prevRankOffset);
    const movement = prevRank - r;

    const badges: string[] = [];
    if (score >= 95) badges.push("State Star");
    if (r <= 25) badges.push("Top 25");
    if (score >= 90) badges.push("Distinction");
    if (badges.length === 0) badges.push("Honor Roll");

    const schStatus =
      r <= 10
        ? "Awarded"
        : r <= 35
          ? "Shortlisted"
          : r <= 50
            ? "Eligible"
            : r % 3 === 0
              ? "Applied"
              : "Not Applied";

    entries.push({
      id: `entry-${ageGroup}-${r}`,
      rank: r,
      studentId: `MH-${distName.slice(0, 3).toUpperCase()}-${r.toString().padStart(4, "0")}`,
      displayName: masked,
      maskedName: masked,
      district: distName,
      taluka: talukaName,
      ageGroup,
      assessmentId: "asm-main",
      assessmentName: studentPos.assessmentTitle,
      score,
      percentile,
      previousRank: prevRank,
      rankMovement: movement,
      badgesEarned: badges,
      scholarshipStatus: schStatus as LeaderboardEntry["scholarshipStatus"],
      isCurrentUser: false,
    });
  }

  // If student rank was > 75 (e.g. stateRank 215 or 184), make sure student entry is added at their exact state rank!
  if (!entries.some((e) => e.isCurrentUser)) {
    entries.push({
      id: `entry-${targetStudentKey}`,
      rank: studentPos.stateRank,
      studentId: targetStudentId,
      displayName: "Aarav (You)",
      maskedName: "Aarav P. (You)",
      district: targetDistrict,
      taluka: targetTaluka,
      ageGroup,
      assessmentId: "asm-main",
      assessmentName: studentPos.assessmentTitle,
      score: studentPos.score,
      percentile: studentPos.percentile,
      previousRank: studentPos.previousRank,
      rankMovement: studentPos.rankMovement,
      badgesEarned: ["Champion", "Streak", "District Honor"],
      scholarshipStatus: "Eligible",
      isCurrentUser: true,
    });
  }

  // Sort deterministically by rank ascending
  return entries.sort((a, b) => a.rank - b.rank);
}

// Generate District Level Leaderboard with the student at their exact district rank
export function generateDistrictLeaderboard(
  ageGroup: StudentAgeGroup,
  district: string
): LeaderboardEntry[] {
  const targetStudentKey = ageGroup === "6-10" ? "aarav6" : ageGroup === "11-14" ? "aarav11" : "aarav15";
  const studentPos = STUDENT_POSITIONS[targetStudentKey] ?? STUDENT_POSITIONS["aarav11"];
  if (!studentPos) return [];
  const targetTaluka = ageGroup === "6-10" ? "Haveli" : ageGroup === "11-14" ? "Dindori" : "Nagpur Rural";
  const targetStudentId = ageGroup === "6-10" ? "MH-PUN-06041" : ageGroup === "11-14" ? "MH-NSK-11082" : "MH-NGP-15093";

  const talukas = DISTRICT_TALUKA_MAP[district] || ["Central Taluka", "North Taluka", "East Taluka"];
  const entries: LeaderboardEntry[] = [];

  const maxRanks = Math.max(50, studentPos.districtRank + 5);

  for (let r = 1; r <= maxRanks; r++) {
    if (r === studentPos.districtRank) {
      entries.push({
        id: `entry-dist-${targetStudentKey}`,
        rank: r,
        studentId: targetStudentId,
        displayName: "Aarav (You)",
        maskedName: "Aarav P. (You)",
        district,
        taluka: targetTaluka,
        ageGroup,
        assessmentId: "asm-main",
        assessmentName: studentPos.assessmentTitle,
        score: studentPos.score,
        percentile: studentPos.percentile,
        previousRank: studentPos.districtRank + (studentPos.rankMovement > 0 ? 3 : -1),
        rankMovement: studentPos.rankMovement > 0 ? 3 : -1,
        badgesEarned: ["District Top", "Active Scholar"],
        scholarshipStatus: r <= 25 ? "Shortlisted" : "Eligible",
        isCurrentUser: true,
      });
      continue;
    }

    const tName = talukas[(r * 2) % talukas.length] ?? "Central Taluka";
    const firstName = SAMPLE_FIRST_NAMES[(r * 7) % SAMPLE_FIRST_NAMES.length];
    const lastInit = SAMPLE_LAST_INITIALS[(r * 5) % SAMPLE_LAST_INITIALS.length];
    const masked = `${firstName} ${lastInit}***`;

    const score = Math.max(76, Number((98 - (r - 1) * 0.35).toFixed(1)));
    const percentile = Math.max(80, Number((99.5 - (r - 1) * 0.3).toFixed(1)));
    const prevRankOffset = ((r * 7) % 7) - 3;
    const prevRank = Math.max(1, r + prevRankOffset);

    entries.push({
      id: `entry-dist-${ageGroup}-${r}`,
      rank: r,
      studentId: `MH-${district.slice(0, 3).toUpperCase()}-D${r.toString().padStart(3, "0")}`,
      displayName: masked,
      maskedName: masked,
      district,
      taluka: tName,
      ageGroup,
      assessmentId: "asm-main",
      assessmentName: studentPos.assessmentTitle,
      score,
      percentile,
      previousRank: prevRank,
      rankMovement: prevRank - r,
      badgesEarned: r <= 10 ? ["District Star"] : ["Merit"],
      scholarshipStatus: r <= 15 ? "Shortlisted" : "Eligible",
      isCurrentUser: false,
    });
  }

  return entries.sort((a, b) => a.rank - b.rank);
}

// Generate Taluka Level Leaderboard with the student at their exact taluka rank
export function generateTalukaLeaderboard(
  ageGroup: StudentAgeGroup,
  district: string,
  taluka: string
): LeaderboardEntry[] {
  const targetStudentKey = ageGroup === "6-10" ? "aarav6" : ageGroup === "11-14" ? "aarav11" : "aarav15";
  const studentPos = STUDENT_POSITIONS[targetStudentKey] ?? STUDENT_POSITIONS["aarav11"];
  if (!studentPos) return [];
  const targetStudentId = ageGroup === "6-10" ? "MH-PUN-06041" : ageGroup === "11-14" ? "MH-NSK-11082" : "MH-NGP-15093";

  const entries: LeaderboardEntry[] = [];
  const maxRanks = Math.max(25, studentPos.talukaRank + 5);

  for (let r = 1; r <= maxRanks; r++) {
    if (r === studentPos.talukaRank) {
      entries.push({
        id: `entry-tal-${targetStudentKey}`,
        rank: r,
        studentId: targetStudentId,
        displayName: "Aarav (You)",
        maskedName: "Aarav P. (You)",
        district,
        taluka,
        ageGroup,
        assessmentId: "asm-main",
        assessmentName: studentPos.assessmentTitle,
        score: studentPos.score,
        percentile: studentPos.percentile,
        previousRank: studentPos.talukaRank + 2,
        rankMovement: 2,
        badgesEarned: ["Taluka Lead", "Top 10"],
        scholarshipStatus: "Eligible",
        isCurrentUser: true,
      });
      continue;
    }

    const firstName = SAMPLE_FIRST_NAMES[(r * 9) % SAMPLE_FIRST_NAMES.length];
    const lastInit = SAMPLE_LAST_INITIALS[(r * 4) % SAMPLE_LAST_INITIALS.length];
    const masked = `${firstName} ${lastInit}***`;

    const score = Math.max(75, Number((96 - (r - 1) * 0.6).toFixed(1)));
    const percentile = Math.max(78, Number((99.0 - (r - 1) * 0.5).toFixed(1)));

    entries.push({
      id: `entry-tal-${ageGroup}-${r}`,
      rank: r,
      studentId: `MH-${district.slice(0, 3).toUpperCase()}-T${r.toString().padStart(3, "0")}`,
      displayName: masked,
      maskedName: masked,
      district,
      taluka,
      ageGroup,
      assessmentId: "asm-main",
      assessmentName: studentPos.assessmentTitle,
      score,
      percentile,
      previousRank: r + 1,
      rankMovement: 1,
      badgesEarned: r <= 5 ? ["Taluka Star"] : ["Consistent"],
      scholarshipStatus: r <= 10 ? "Shortlisted" : "Eligible",
      isCurrentUser: false,
    });
  }

  return entries.sort((a, b) => a.rank - b.rank);
}
