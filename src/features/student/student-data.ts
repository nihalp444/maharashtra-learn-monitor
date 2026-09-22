export type StudentAgeGroup = "6-10" | "11-14" | "15-18";

export interface StudentCourseProgress {
  id: string;
  name: string;
  category: string;
  progress: number; // 0 to 100
  learningHours: number;
  totalModules: number;
  completedModules: number;
  currentModule: string;
  currentLecture: string;
  badge?: string;
  thumbnailColor: string;
}

export interface StudentUpcomingAssessment {
  id: string;
  title: string;
  courseName: string;
  scheduledDate: string;
  durationMinutes: number;
  status: "Scheduled" | "Available Now" | "Upcoming";
  totalQuestions: number;
}

export interface StudentAchievementStats {
  modulesCompleted: number;
  learningStreakDays: number;
  assessmentsCompleted: number;
  recentAchievement: {
    title: string;
    description: string;
    icon: string;
    earnedDate: string;
  };
  specialBadge: {
    name: string;
    category: string;
  };
}

export interface StudentKpis {
  myCourses: number;
  coursesInProgress: number;
  learningHours: number;
  averageScore: number;
}

export interface StudentProfile {
  id: string;
  username: "aarav6" | "aarav11" | "aarav15";
  displayName: string;
  ageGroup: StudentAgeGroup;
  ageGroupLabel: string;
  schoolDistrict: string;
  studentId: string;
  kpis: StudentKpis;
  continueLearning: {
    courseId: string;
    courseName: string;
    currentModule: string;
    currentLecture: string;
    progress: number;
    totalLectures: number;
    completedLectures: number;
  };
  courses: StudentCourseProgress[];
  upcomingAssessment: StudentUpcomingAssessment;
  achievements: StudentAchievementStats;
}

export const STUDENT_ACCOUNTS: Record<string, StudentProfile> = {
  aarav6: {
    id: "stu-aarav-6",
    username: "aarav6",
    displayName: "Aarav",
    ageGroup: "6-10",
    ageGroupLabel: "Age Group: 6–10",
    schoolDistrict: "Pune District",
    studentId: "MH-PUN-06041",
    kpis: {
      myCourses: 4,
      coursesInProgress: 2,
      learningHours: 28.5,
      averageScore: 88,
    },
    continueLearning: {
      courseId: "math-6-10",
      courseName: "Mathematics & Numeracy",
      currentModule: "Module 2: Fun with Counting & 2D Shapes",
      currentLecture: "Lecture 4: Identifying Triangles & Rectangles in Daily Life",
      progress: 65,
      totalLectures: 16,
      completedLectures: 10,
    },
    courses: [
      {
        id: "foundational",
        name: "Foundational Learning",
        category: "Early Literacy & Language",
        progress: 74,
        learningHours: 11.5,
        totalModules: 12,
        completedModules: 9,
        currentModule: "Module 3: Picture Phonics & Rhymes",
        currentLecture: "Lecture 2: Vowel Sounds & Stories",
        thumbnailColor: "from-blue-500 to-indigo-600",
      },
      {
        id: "math-6-10",
        name: "Mathematics & Numeracy",
        category: "Arithmetic & Logic Games",
        progress: 65,
        learningHours: 9.0,
        totalModules: 14,
        completedModules: 9,
        currentModule: "Module 2: Fun with Counting & 2D Shapes",
        currentLecture: "Lecture 4: Identifying Triangles & Rectangles",
        thumbnailColor: "from-emerald-500 to-teal-600",
      },
      {
        id: "science-6-10",
        name: "Science & Exploration",
        category: "Nature & STEM Basics",
        progress: 42,
        learningHours: 5.5,
        totalModules: 10,
        completedModules: 4,
        currentModule: "Module 2: Plant Life & Water Cycle",
        currentLecture: "Lecture 1: How Seeds Grow",
        thumbnailColor: "from-amber-500 to-orange-600",
      },
      {
        id: "gk-skills",
        name: "General Knowledge & Life Skills",
        category: "Civic Habits & Health",
        progress: 25,
        learningHours: 2.5,
        totalModules: 8,
        completedModules: 2,
        currentModule: "Module 1: Safe Habits & Hygiene",
        currentLecture: "Lecture 3: Healthy Eating Plate",
        thumbnailColor: "from-purple-500 to-pink-600",
      },
    ],
    upcomingAssessment: {
      id: "asm-6-01",
      title: "Fun Shapes & Number Patterns Quiz",
      courseName: "Mathematics & Numeracy",
      scheduledDate: "Tomorrow · 10:30 AM",
      durationMinutes: 30,
      status: "Scheduled",
      totalQuestions: 15,
    },
    achievements: {
      modulesCompleted: 12,
      learningStreakDays: 5,
      assessmentsCompleted: 4,
      recentAchievement: {
        title: "Curious Explorer Star",
        description: "Scored 90%+ in 3 foundational counting quizzes",
        icon: "⭐",
        earnedDate: "2 days ago",
      },
      specialBadge: {
        name: "Primary Math Master",
        category: "Level 1 Explorer",
      },
    },
  },

  aarav11: {
    id: "stu-aarav-11",
    username: "aarav11",
    displayName: "Aarav",
    ageGroup: "11-14",
    ageGroupLabel: "Age Group: 11–14",
    schoolDistrict: "Nashik District",
    studentId: "MH-NSK-11082",
    kpis: {
      myCourses: 4,
      coursesInProgress: 3,
      learningHours: 42.0,
      averageScore: 84,
    },
    continueLearning: {
      courseId: "digital-tech",
      courseName: "Digital Skills & Technology",
      currentModule: "Module 3: Visual Coding & Game Logic",
      currentLecture: "Lecture 5: Nested Loops & Conditional Blocks in Scratch",
      progress: 54,
      totalLectures: 20,
      completedLectures: 11,
    },
    courses: [
      {
        id: "math-11-14",
        name: "Mathematics & Problem Solving",
        category: "Pre-Algebra & Geometry",
        progress: 78,
        learningHours: 15.0,
        totalModules: 18,
        completedModules: 14,
        currentModule: "Module 4: Linear Equations & Angles",
        currentLecture: "Lecture 3: Solving Single-Variable Equations",
        thumbnailColor: "from-blue-600 to-cyan-600",
      },
      {
        id: "science-11-14",
        name: "Science & Discovery",
        category: "Physics, Chemistry & Biology",
        progress: 62,
        learningHours: 13.5,
        totalModules: 16,
        completedModules: 10,
        currentModule: "Module 3: Force, Work & Motion",
        currentLecture: "Lecture 2: Newton's Laws with Simulations",
        thumbnailColor: "from-emerald-600 to-green-600",
      },
      {
        id: "digital-tech",
        name: "Digital Skills & Technology",
        category: "Scratch Coding & Cyber Safety",
        progress: 54,
        learningHours: 9.0,
        totalModules: 14,
        completedModules: 7,
        currentModule: "Module 3: Visual Coding & Game Logic",
        currentLecture: "Lecture 5: Nested Loops & Conditional Blocks",
        thumbnailColor: "from-amber-600 to-yellow-600",
      },
      {
        id: "logic-reasoning",
        name: "Logical Reasoning",
        category: "Mental Ability & Puzzles",
        progress: 45,
        learningHours: 4.5,
        totalModules: 12,
        completedModules: 5,
        currentModule: "Module 2: Number Series & Venn Diagrams",
        currentLecture: "Lecture 4: Logical Deductions",
        thumbnailColor: "from-purple-600 to-violet-600",
      },
    ],
    upcomingAssessment: {
      id: "asm-11-01",
      title: "Science & Force Principles Checkpoint",
      courseName: "Science & Discovery",
      scheduledDate: "Thursday · 4:00 PM",
      durationMinutes: 45,
      status: "Scheduled",
      totalQuestions: 25,
    },
    achievements: {
      modulesCompleted: 18,
      learningStreakDays: 8,
      assessmentsCompleted: 7,
      recentAchievement: {
        title: "Algorithm Pioneer Badge",
        description: "Built 5 interactive animations with Scratch blocks",
        icon: "💻",
        earnedDate: "Yesterday",
      },
      specialBadge: {
        name: "Middle School Problem Solver",
        category: "Silver Tier",
      },
    },
  },

  aarav15: {
    id: "stu-aarav-15",
    username: "aarav15",
    displayName: "Aarav",
    ageGroup: "15-18",
    ageGroupLabel: "Age Group: 15–18",
    schoolDistrict: "Nagpur District",
    studentId: "MH-NGP-15093",
    kpis: {
      myCourses: 3,
      coursesInProgress: 2,
      learningHours: 64.5,
      averageScore: 89,
    },
    continueLearning: {
      courseId: "ai-ml",
      courseName: "AI & ML",
      currentModule: "Module 4: Supervised Learning & Deep Neural Nets",
      currentLecture: "Lecture 6: Backpropagation & Activation Functions in Python",
      progress: 42,
      totalLectures: 24,
      completedLectures: 10,
    },
    courses: [
      {
        id: "ai-ml",
        name: "AI & ML",
        category: "Artificial Intelligence & Python",
        progress: 42,
        learningHours: 22.0,
        totalModules: 18,
        completedModules: 7,
        currentModule: "Module 4: Supervised Learning & Deep Neural Nets",
        currentLecture: "Lecture 6: Backpropagation & Activation Functions",
        thumbnailColor: "from-blue-700 to-indigo-800",
      },
      {
        id: "neet",
        name: "NEET Preparation",
        category: "Medical Entrance (PCB)",
        progress: 72,
        learningHours: 24.5,
        totalModules: 24,
        completedModules: 17,
        currentModule: "Module 7: Human Physiology & Genetics",
        currentLecture: "Lecture 3: Mendelian Inheritance & DNA Replication",
        thumbnailColor: "from-emerald-700 to-teal-800",
      },
      {
        id: "jee",
        name: "JEE Preparation",
        category: "Engineering Entrance (PCM)",
        progress: 58,
        learningHours: 18.0,
        totalModules: 22,
        completedModules: 13,
        currentModule: "Module 5: Rotational Dynamics & Calculus",
        currentLecture: "Lecture 4: Moment of Inertia & Torque Analysis",
        thumbnailColor: "from-amber-600 to-orange-700",
      },
    ],
    upcomingAssessment: {
      id: "asm-15-01",
      title: "NEET Physics Mechanics High-Yield Mock 02",
      courseName: "NEET Preparation",
      scheduledDate: "Friday · 5:30 PM",
      durationMinutes: 60,
      status: "Available Now",
      totalQuestions: 45,
    },
    achievements: {
      modulesCompleted: 26,
      learningStreakDays: 12,
      assessmentsCompleted: 11,
      recentAchievement: {
        title: "Top 5% State Ranker",
        description: "Scored 94% in Statewide NEET Diagnostic Mock Exam",
        icon: "🏆",
        earnedDate: "3 days ago",
      },
      specialBadge: {
        name: "Senior STEM Scholar",
        category: "Gold Distinction",
      },
    },
  },
};

export const DEMO_STUDENT_USERNAMES = ["aarav6", "aarav11", "aarav15"] as const;
export type DemoStudentUsername = (typeof DEMO_STUDENT_USERNAMES)[number];

export function isStudentUsername(username: string): username is DemoStudentUsername {
  return DEMO_STUDENT_USERNAMES.includes(username as DemoStudentUsername);
}
