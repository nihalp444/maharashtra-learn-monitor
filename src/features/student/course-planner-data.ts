import type { StudentAgeGroup } from "./student-data";

export type PlannerTaskType = "Watch Lecture" | "Practice" | "Revision" | "Assessment";
export type PlannerTaskStatus = "Not Started" | "In Progress" | "Completed";

export interface PlannerTask {
  id: string;
  dayIndex: number; // 0 = Mon, 1 = Tue, 2 = Wed, 3 = Thu, 4 = Fri, 5 = Sat, 6 = Sun
  dayName: string; // "Monday", "Tuesday", etc.
  courseId: string; // matches student course id or video registry id
  courseName: string;
  moduleTitle: string;
  lessonTitle: string;
  durationMinutes: number;
  taskType: PlannerTaskType;
  status: PlannerTaskStatus;
  priority?: "High" | "Normal";
  ageGroup: StudentAgeGroup;
  completedAt?: string;
  assessmentId?: string;
}

export interface StudentWeeklyGoal {
  targetHours: number;
  targetTasks: number;
}

export interface StudyRecommendation {
  id: string;
  title: string;
  reason: string;
  durationMinutes: number;
  badge: string;
  badgeColor: string;
  actionLabel: string;
  actionType: "lecture" | "assessment" | "practice";
  courseId: string;
  courseName: string;
  lessonTitle: string;
}

export const DAYS_OF_WEEK = [
  { key: "mon", index: 0, label: "Mon", fullLabel: "Monday" },
  { key: "tue", index: 1, label: "Tue", fullLabel: "Tuesday" },
  { key: "wed", index: 2, label: "Wed", fullLabel: "Wednesday" },
  { key: "thu", index: 3, label: "Thu", fullLabel: "Thursday" },
  { key: "fri", index: 4, label: "Fri", fullLabel: "Friday" },
  { key: "sat", index: 5, label: "Sat", fullLabel: "Saturday" },
  { key: "sun", index: 6, label: "Sun", fullLabel: "Sunday" },
] as const;

// -------------------------------------------------------------
// DEFAULT TASKS PER AGE GROUP
// -------------------------------------------------------------

export const DEFAULT_TASKS_AGE_6_10: PlannerTask[] = [
  // Monday (dayIndex 0)
  {
    id: "task-6-mon-1",
    dayIndex: 0,
    dayName: "Monday",
    courseId: "foundational",
    courseName: "Foundational Learning",
    moduleTitle: "Module 3: Picture Phonics & Rhymes",
    lessonTitle: "Episode 1: Hello AI & Interactive Alphabet",
    durationMinutes: 15,
    taskType: "Watch Lecture",
    status: "Completed",
    ageGroup: "6-10",
  },
  {
    id: "task-6-mon-2",
    dayIndex: 0,
    dayName: "Monday",
    courseId: "math-6-10",
    courseName: "Mathematics & Numeracy",
    moduleTitle: "Module 2: Fun with Counting & 2D Shapes",
    lessonTitle: "Counting Objects from 1 to 50 in Marathi & English",
    durationMinutes: 15,
    taskType: "Practice",
    status: "Completed",
    ageGroup: "6-10",
  },
  {
    id: "task-6-mon-3",
    dayIndex: 0,
    dayName: "Monday",
    courseId: "gk-skills",
    courseName: "General Knowledge & Life Skills",
    moduleTitle: "Module 1: Safe Habits & Hygiene",
    lessonTitle: "Daily Morning Habits & Handwashing Rhyme",
    durationMinutes: 15,
    taskType: "Revision",
    status: "Completed",
    ageGroup: "6-10",
  },

  // Tuesday (dayIndex 1) - Today!
  {
    id: "task-6-tue-1",
    dayIndex: 1,
    dayName: "Tuesday",
    courseId: "math-6-10",
    courseName: "Mathematics & Numeracy",
    moduleTitle: "Module 2: Fun with Counting & 2D Shapes",
    lessonTitle: "Lecture 4: Identifying Triangles & Rectangles in Daily Life",
    durationMinutes: 15,
    taskType: "Watch Lecture",
    status: "In Progress",
    priority: "High",
    ageGroup: "6-10",
  },
  {
    id: "task-6-tue-2",
    dayIndex: 1,
    dayName: "Tuesday",
    courseId: "science-6-10",
    courseName: "Science & Exploration",
    moduleTitle: "Module 2: Plant Life & Water Cycle",
    lessonTitle: "Activity: How Seeds Grow with Sun & Water",
    durationMinutes: 20,
    taskType: "Practice",
    status: "Not Started",
    ageGroup: "6-10",
  },
  {
    id: "task-6-tue-3",
    dayIndex: 1,
    dayName: "Tuesday",
    courseId: "foundational",
    courseName: "Foundational Learning",
    moduleTitle: "Module 3: Picture Phonics & Rhymes",
    lessonTitle: "Lecture 2: Vowel Sounds & Interactive Stories",
    durationMinutes: 15,
    taskType: "Watch Lecture",
    status: "Not Started",
    ageGroup: "6-10",
  },
  {
    id: "task-6-tue-4",
    dayIndex: 1,
    dayName: "Tuesday",
    courseId: "gk-skills",
    courseName: "General Knowledge & Life Skills",
    moduleTitle: "Module 1: Safe Habits & Hygiene",
    lessonTitle: "Lecture 3: Healthy Eating Plate & Fruits Quiz",
    durationMinutes: 15,
    taskType: "Revision",
    status: "Not Started",
    ageGroup: "6-10",
  },

  // Wednesday (dayIndex 2)
  {
    id: "task-6-wed-1",
    dayIndex: 2,
    dayName: "Wednesday",
    courseId: "math-6-10",
    courseName: "Mathematics & Numeracy",
    moduleTitle: "Module 2: Fun with Counting & 2D Shapes",
    lessonTitle: "Fun Shapes & Number Patterns Quiz (Assessment Prep)",
    durationMinutes: 30,
    taskType: "Assessment",
    status: "Not Started",
    priority: "High",
    ageGroup: "6-10",
    assessmentId: "asm-6-01",
  },
  {
    id: "task-6-wed-2",
    dayIndex: 2,
    dayName: "Wednesday",
    courseId: "science-6-10",
    courseName: "Science & Exploration",
    moduleTitle: "Module 2: Plant Life & Water Cycle",
    lessonTitle: "Leaves, Roots and Stems Illustrated Video",
    durationMinutes: 15,
    taskType: "Watch Lecture",
    status: "Not Started",
    ageGroup: "6-10",
  },
  {
    id: "task-6-wed-3",
    dayIndex: 2,
    dayName: "Wednesday",
    courseId: "foundational",
    courseName: "Foundational Learning",
    moduleTitle: "Module 3: Picture Phonics & Rhymes",
    lessonTitle: "Drawing & Reading Sound Flashcards",
    durationMinutes: 15,
    taskType: "Practice",
    status: "Not Started",
    ageGroup: "6-10",
  },

  // Thursday (dayIndex 3)
  {
    id: "task-6-thu-1",
    dayIndex: 3,
    dayName: "Thursday",
    courseId: "gk-skills",
    courseName: "General Knowledge & Life Skills",
    moduleTitle: "Module 2: Our Community & Helpers",
    lessonTitle: "Doctors, Teachers, and Farmers of Maharashtra",
    durationMinutes: 20,
    taskType: "Watch Lecture",
    status: "Not Started",
    ageGroup: "6-10",
  },
  {
    id: "task-6-thu-2",
    dayIndex: 3,
    dayName: "Thursday",
    courseId: "math-6-10",
    courseName: "Mathematics & Numeracy",
    moduleTitle: "Module 3: Addition with Toys & Beads",
    lessonTitle: "Single Digit Addition Puzzles",
    durationMinutes: 15,
    taskType: "Practice",
    status: "Not Started",
    ageGroup: "6-10",
  },
  {
    id: "task-6-thu-3",
    dayIndex: 3,
    dayName: "Thursday",
    courseId: "science-6-10",
    courseName: "Science & Exploration",
    moduleTitle: "Module 3: Animal World & Habitats",
    lessonTitle: "Birds and Animals of Sahyadri Forests",
    durationMinutes: 15,
    taskType: "Revision",
    status: "Not Started",
    ageGroup: "6-10",
  },

  // Friday (dayIndex 4)
  {
    id: "task-6-fri-1",
    dayIndex: 4,
    dayName: "Friday",
    courseId: "foundational",
    courseName: "Foundational Learning",
    moduleTitle: "Module 4: Simple Word Stories",
    lessonTitle: "Short Stories in Marathi & English",
    durationMinutes: 20,
    taskType: "Watch Lecture",
    status: "Not Started",
    ageGroup: "6-10",
  },
  {
    id: "task-6-fri-2",
    dayIndex: 4,
    dayName: "Friday",
    courseId: "math-6-10",
    courseName: "Mathematics & Numeracy",
    moduleTitle: "Module 3: Addition with Toys & Beads",
    lessonTitle: "Fun Number Maze Challenge",
    durationMinutes: 15,
    taskType: "Practice",
    status: "Not Started",
    ageGroup: "6-10",
  },
  {
    id: "task-6-fri-3",
    dayIndex: 4,
    dayName: "Friday",
    courseId: "science-6-10",
    courseName: "Science & Exploration",
    moduleTitle: "Module 3: Animal World & Habitats",
    lessonTitle: "Weekly Science Drawing & Sharing",
    durationMinutes: 15,
    taskType: "Revision",
    status: "Not Started",
    ageGroup: "6-10",
  },

  // Saturday (dayIndex 5)
  {
    id: "task-6-sat-1",
    dayIndex: 5,
    dayName: "Saturday",
    courseId: "math-6-10",
    courseName: "Mathematics & Numeracy",
    moduleTitle: "Module 2: Fun with Counting & 2D Shapes",
    lessonTitle: "Weekly Math Star Activity & Pattern Making",
    durationMinutes: 20,
    taskType: "Practice",
    status: "Not Started",
    ageGroup: "6-10",
  },
  {
    id: "task-6-sat-2",
    dayIndex: 5,
    dayName: "Saturday",
    courseId: "foundational",
    courseName: "Foundational Learning",
    moduleTitle: "Module 3: Picture Phonics & Rhymes",
    lessonTitle: "Weekend Fun Rhymes & Singing Recital",
    durationMinutes: 15,
    taskType: "Revision",
    status: "Not Started",
    ageGroup: "6-10",
  },

  // Sunday (dayIndex 6)
  {
    id: "task-6-sun-1",
    dayIndex: 6,
    dayName: "Sunday",
    courseId: "gk-skills",
    courseName: "General Knowledge & Life Skills",
    moduleTitle: "Module 1: Safe Habits & Hygiene",
    lessonTitle: "Sunday Nature Walk & Clean Home Habit",
    durationMinutes: 15,
    taskType: "Practice",
    status: "Not Started",
    ageGroup: "6-10",
  },
  {
    id: "task-6-sun-2",
    dayIndex: 6,
    dayName: "Sunday",
    courseId: "science-6-10",
    courseName: "Science & Exploration",
    moduleTitle: "Module 2: Plant Life & Water Cycle",
    lessonTitle: "Reviewing this week's Seed Growth observations",
    durationMinutes: 15,
    taskType: "Revision",
    status: "Not Started",
    ageGroup: "6-10",
  },
];

export const DEFAULT_TASKS_AGE_11_14: PlannerTask[] = [
  // Monday (dayIndex 0)
  {
    id: "task-11-mon-1",
    dayIndex: 0,
    dayName: "Monday",
    courseId: "math-11-14",
    courseName: "Mathematics & Problem Solving",
    moduleTitle: "Module 4: Linear Equations & Angles",
    lessonTitle: "Lecture 2: Balancing Algebraic Equations with Variables",
    durationMinutes: 25,
    taskType: "Watch Lecture",
    status: "Completed",
    ageGroup: "11-14",
  },
  {
    id: "task-11-mon-2",
    dayIndex: 0,
    dayName: "Monday",
    courseId: "digital-tech",
    courseName: "Digital Skills & Technology",
    moduleTitle: "Module 3: Visual Coding & Game Logic",
    lessonTitle: "Scratch Project: Creating an Interactive Maze Game",
    durationMinutes: 30,
    taskType: "Practice",
    status: "Completed",
    ageGroup: "11-14",
  },
  {
    id: "task-11-mon-3",
    dayIndex: 0,
    dayName: "Monday",
    courseId: "science-11-14",
    courseName: "Science & Discovery",
    moduleTitle: "Module 3: Force, Work & Motion",
    lessonTitle: "Concept Notes: Speed, Velocity & Acceleration Differences",
    durationMinutes: 20,
    taskType: "Revision",
    status: "Completed",
    ageGroup: "11-14",
  },

  // Tuesday (dayIndex 1) - Today!
  {
    id: "task-11-tue-1",
    dayIndex: 1,
    dayName: "Tuesday",
    courseId: "digital-tech",
    courseName: "Digital Skills & Technology",
    moduleTitle: "Module 3: Visual Coding & Game Logic",
    lessonTitle: "Lecture 5: Nested Loops & Conditional Blocks in Scratch",
    durationMinutes: 25,
    taskType: "Watch Lecture",
    status: "In Progress",
    priority: "High",
    ageGroup: "11-14",
  },
  {
    id: "task-11-tue-2",
    dayIndex: 1,
    dayName: "Tuesday",
    courseId: "science-11-14",
    courseName: "Science & Discovery",
    moduleTitle: "Module 3: Force, Work & Motion",
    lessonTitle: "Interactive Lab: Newton's Laws with Friction Simulations",
    durationMinutes: 25,
    taskType: "Practice",
    status: "Not Started",
    priority: "High",
    ageGroup: "11-14",
  },
  {
    id: "task-11-tue-3",
    dayIndex: 1,
    dayName: "Tuesday",
    courseId: "math-11-14",
    courseName: "Mathematics & Problem Solving",
    moduleTitle: "Module 4: Linear Equations & Angles",
    lessonTitle: "Problem Set: 10 Linear Equations Practice Questions",
    durationMinutes: 20,
    taskType: "Practice",
    status: "Not Started",
    ageGroup: "11-14",
  },
  {
    id: "task-11-tue-4",
    dayIndex: 1,
    dayName: "Tuesday",
    courseId: "science-11-14",
    courseName: "Science & Discovery",
    moduleTitle: "Module 3: Force, Work & Motion",
    lessonTitle: "Topic Flashcards: Balanced and Unbalanced Forces",
    durationMinutes: 15,
    taskType: "Revision",
    status: "Not Started",
    ageGroup: "11-14",
  },

  // Wednesday (dayIndex 2)
  {
    id: "task-11-wed-1",
    dayIndex: 2,
    dayName: "Wednesday",
    courseId: "math-11-14",
    courseName: "Mathematics & Problem Solving",
    moduleTitle: "Module 4: Linear Equations & Angles",
    lessonTitle: "Lecture 3: Complementary, Supplementary and Vertically Opposite Angles",
    durationMinutes: 30,
    taskType: "Watch Lecture",
    status: "Not Started",
    ageGroup: "11-14",
  },
  {
    id: "task-11-wed-2",
    dayIndex: 2,
    dayName: "Wednesday",
    courseId: "digital-tech",
    courseName: "Digital Skills & Technology",
    moduleTitle: "Module 3: Visual Coding & Game Logic",
    lessonTitle: "Coding Exercise: Adding Score & Timer Variables",
    durationMinutes: 25,
    taskType: "Practice",
    status: "Not Started",
    ageGroup: "11-14",
  },
  {
    id: "task-11-wed-3",
    dayIndex: 2,
    dayName: "Wednesday",
    courseId: "science-11-14",
    courseName: "Science & Discovery",
    moduleTitle: "Module 3: Force, Work & Motion",
    lessonTitle: "Self-Check Quiz: Force Principles & Unit Conversions",
    durationMinutes: 20,
    taskType: "Revision",
    status: "Not Started",
    ageGroup: "11-14",
  },

  // Thursday (dayIndex 3) - Upcoming Assessment Day!
  {
    id: "task-11-thu-1",
    dayIndex: 3,
    dayName: "Thursday",
    courseId: "science-11-14",
    courseName: "Science & Discovery",
    moduleTitle: "Module 3: Force, Work & Motion",
    lessonTitle: "Science & Force Principles Checkpoint (25 Questions)",
    durationMinutes: 45,
    taskType: "Assessment",
    status: "Not Started",
    priority: "High",
    ageGroup: "11-14",
    assessmentId: "asm-11-01",
  },
  {
    id: "task-11-thu-2",
    dayIndex: 3,
    dayName: "Thursday",
    courseId: "math-11-14",
    courseName: "Mathematics & Problem Solving",
    moduleTitle: "Module 4: Linear Equations & Angles",
    lessonTitle: "Solving Real-World Word Problems with Equations",
    durationMinutes: 25,
    taskType: "Practice",
    status: "Not Started",
    ageGroup: "11-14",
  },
  {
    id: "task-11-thu-3",
    dayIndex: 3,
    dayName: "Thursday",
    courseId: "digital-tech",
    courseName: "Digital Skills & Technology",
    moduleTitle: "Module 4: Cyber Safety & Data Privacy",
    lessonTitle: "Lecture 1: Safe Passwords and Digital Footprint",
    durationMinutes: 20,
    taskType: "Watch Lecture",
    status: "Not Started",
    ageGroup: "11-14",
  },

  // Friday (dayIndex 4)
  {
    id: "task-11-fri-1",
    dayIndex: 4,
    dayName: "Friday",
    courseId: "math-11-14",
    courseName: "Mathematics & Problem Solving",
    moduleTitle: "Module 5: Perimeter & Area of Plane Figures",
    lessonTitle: "Lecture 1: Formulas for Rectangles, Triangles and Parallelograms",
    durationMinutes: 30,
    taskType: "Watch Lecture",
    status: "Not Started",
    ageGroup: "11-14",
  },
  {
    id: "task-11-fri-2",
    dayIndex: 4,
    dayName: "Friday",
    courseId: "digital-tech",
    courseName: "Digital Skills & Technology",
    moduleTitle: "Module 3: Visual Coding & Game Logic",
    lessonTitle: "Debugging Code: Fixing Common Scratch Logic Errors",
    durationMinutes: 25,
    taskType: "Practice",
    status: "Not Started",
    ageGroup: "11-14",
  },
  {
    id: "task-11-fri-3",
    dayIndex: 4,
    dayName: "Friday",
    courseId: "science-11-14",
    courseName: "Science & Discovery",
    moduleTitle: "Module 4: Acids, Bases and Chemical Indicators",
    lessonTitle: "Litmus Paper & Turmeric Indicator Demonstrations",
    durationMinutes: 20,
    taskType: "Watch Lecture",
    status: "Not Started",
    ageGroup: "11-14",
  },

  // Saturday (dayIndex 5)
  {
    id: "task-11-sat-1",
    dayIndex: 5,
    dayName: "Saturday",
    courseId: "math-11-14",
    courseName: "Mathematics & Problem Solving",
    moduleTitle: "Module 4: Linear Equations & Angles",
    lessonTitle: "Logical Reasoning & Geometry Challenge Sheet",
    durationMinutes: 30,
    taskType: "Practice",
    status: "Not Started",
    ageGroup: "11-14",
  },
  {
    id: "task-11-sat-2",
    dayIndex: 5,
    dayName: "Saturday",
    courseId: "digital-tech",
    courseName: "Digital Skills & Technology",
    moduleTitle: "Module 3: Visual Coding & Game Logic",
    lessonTitle: "Showcase: Polish and Export Your Scratch Game",
    durationMinutes: 25,
    taskType: "Practice",
    status: "Not Started",
    ageGroup: "11-14",
  },

  // Sunday (dayIndex 6)
  {
    id: "task-11-sun-1",
    dayIndex: 6,
    dayName: "Sunday",
    courseId: "science-11-14",
    courseName: "Science & Discovery",
    moduleTitle: "Module 3: Force, Work & Motion",
    lessonTitle: "Weekly Comprehensive Science Formula Revision",
    durationMinutes: 25,
    taskType: "Revision",
    status: "Not Started",
    ageGroup: "11-14",
  },
  {
    id: "task-11-sun-2",
    dayIndex: 6,
    dayName: "Sunday",
    courseId: "math-11-14",
    courseName: "Mathematics & Problem Solving",
    moduleTitle: "Module 4: Linear Equations & Angles",
    lessonTitle: "Weekly Algebra Practice Mistakes Review",
    durationMinutes: 20,
    taskType: "Revision",
    status: "Not Started",
    ageGroup: "11-14",
  },
];

export const DEFAULT_TASKS_AGE_15_18: PlannerTask[] = [
  // Monday (dayIndex 0)
  {
    id: "task-15-mon-1",
    dayIndex: 0,
    dayName: "Monday",
    courseId: "neet",
    courseName: "NEET Preparation",
    moduleTitle: "Module 7: Human Physiology & Genetics",
    lessonTitle: "Lecture 2: Mendelian Monohybrid & Dihybrid Crosses",
    durationMinutes: 40,
    taskType: "Watch Lecture",
    status: "Completed",
    ageGroup: "15-18",
  },
  {
    id: "task-15-mon-2",
    dayIndex: 0,
    dayName: "Monday",
    courseId: "jee",
    courseName: "JEE Preparation",
    moduleTitle: "Module 5: Rotational Dynamics & Calculus",
    lessonTitle: "Problem Solving: Calculating Moment of Inertia for Rigid Bodies",
    durationMinutes: 35,
    taskType: "Practice",
    status: "Completed",
    ageGroup: "15-18",
  },
  {
    id: "task-15-mon-3",
    dayIndex: 0,
    dayName: "Monday",
    courseId: "ai-ml",
    courseName: "AI & ML",
    moduleTitle: "Module 4: Supervised Learning & Deep Neural Nets",
    lessonTitle: "Python Implementation: Gradient Descent from Scratch",
    durationMinutes: 30,
    taskType: "Practice",
    status: "Completed",
    ageGroup: "15-18",
  },

  // Tuesday (dayIndex 1) - Today!
  {
    id: "task-15-tue-1",
    dayIndex: 1,
    dayName: "Tuesday",
    courseId: "ai-ml",
    courseName: "AI & ML",
    moduleTitle: "Module 4: Supervised Learning & Deep Neural Nets",
    lessonTitle: "Lecture 6: Backpropagation & Activation Functions in Python",
    durationMinutes: 35,
    taskType: "Watch Lecture",
    status: "In Progress",
    priority: "High",
    ageGroup: "15-18",
  },
  {
    id: "task-15-tue-2",
    dayIndex: 1,
    dayName: "Tuesday",
    courseId: "neet",
    courseName: "NEET Preparation",
    moduleTitle: "Module 7: Human Physiology & Genetics",
    lessonTitle: "Lecture 3: Mendelian Inheritance & DNA Replication Machinery",
    durationMinutes: 35,
    taskType: "Watch Lecture",
    status: "Not Started",
    priority: "High",
    ageGroup: "15-18",
  },
  {
    id: "task-15-tue-3",
    dayIndex: 1,
    dayName: "Tuesday",
    courseId: "jee",
    courseName: "JEE Preparation",
    moduleTitle: "Module 5: Rotational Dynamics & Calculus",
    lessonTitle: "Lecture 4: Torque, Angular Momentum & Conservation Laws",
    durationMinutes: 30,
    taskType: "Revision",
    status: "Not Started",
    ageGroup: "15-18",
  },
  {
    id: "task-15-tue-4",
    dayIndex: 1,
    dayName: "Tuesday",
    courseId: "neet",
    courseName: "NEET Preparation",
    moduleTitle: "Module 7: Human Physiology & Genetics",
    lessonTitle: "High-Yield NEET Drill: 20 Genetics PYQs with Explanations",
    durationMinutes: 30,
    taskType: "Practice",
    status: "Not Started",
    ageGroup: "15-18",
  },

  // Wednesday (dayIndex 2)
  {
    id: "task-15-wed-1",
    dayIndex: 2,
    dayName: "Wednesday",
    courseId: "jee",
    courseName: "JEE Preparation",
    moduleTitle: "Module 5: Rotational Dynamics & Calculus",
    lessonTitle: "Calculus in Rotational Kinematics: Complex Integration Problems",
    durationMinutes: 40,
    taskType: "Practice",
    status: "Not Started",
    ageGroup: "15-18",
  },
  {
    id: "task-15-wed-2",
    dayIndex: 2,
    dayName: "Wednesday",
    courseId: "ai-ml",
    courseName: "AI & ML",
    moduleTitle: "Module 4: Supervised Learning & Deep Neural Nets",
    lessonTitle: "Lab: Building a 2-Layer Neural Network using NumPy and PyTorch",
    durationMinutes: 35,
    taskType: "Practice",
    status: "Not Started",
    ageGroup: "15-18",
  },
  {
    id: "task-15-wed-3",
    dayIndex: 2,
    dayName: "Wednesday",
    courseId: "neet",
    courseName: "NEET Preparation",
    moduleTitle: "Module 7: Human Physiology & Genetics",
    lessonTitle: "Rapid NCERT Line-by-Line Revision: Molecular Basis of Inheritance",
    durationMinutes: 25,
    taskType: "Revision",
    status: "Not Started",
    ageGroup: "15-18",
  },

  // Thursday (dayIndex 3)
  {
    id: "task-15-thu-1",
    dayIndex: 3,
    dayName: "Thursday",
    courseId: "ai-ml",
    courseName: "AI & ML",
    moduleTitle: "Module 5: Convolutional Neural Networks (CNNs)",
    lessonTitle: "Lecture 1: Convolution Kernels, Pooling & Image Feature Extraction",
    durationMinutes: 35,
    taskType: "Watch Lecture",
    status: "Not Started",
    ageGroup: "15-18",
  },
  {
    id: "task-15-thu-2",
    dayIndex: 3,
    dayName: "Thursday",
    courseId: "neet",
    courseName: "NEET Preparation",
    moduleTitle: "Module 7: Human Physiology & Genetics",
    lessonTitle: "High-Yield Diagram Revision: DNA Transcription & Translation",
    durationMinutes: 30,
    taskType: "Revision",
    status: "Not Started",
    ageGroup: "15-18",
  },
  {
    id: "task-15-thu-3",
    dayIndex: 3,
    dayName: "Thursday",
    courseId: "jee",
    courseName: "JEE Preparation",
    moduleTitle: "Module 6: Electrostatics & Potential",
    lessonTitle: "Lecture 1: Coulomb's Law, Electric Fields & Gauss Law Applications",
    durationMinutes: 35,
    taskType: "Watch Lecture",
    status: "Not Started",
    ageGroup: "15-18",
  },

  // Friday (dayIndex 4) - Major Assessment Day!
  {
    id: "task-15-fri-1",
    dayIndex: 4,
    dayName: "Friday",
    courseId: "neet",
    courseName: "NEET Preparation",
    moduleTitle: "Module 7: High-Yield Physics & Biology",
    lessonTitle: "NEET Physics Mechanics High-Yield Mock 02 (45 Questions)",
    durationMinutes: 60,
    taskType: "Assessment",
    status: "Not Started",
    priority: "High",
    ageGroup: "15-18",
    assessmentId: "asm-15-01",
  },
  {
    id: "task-15-fri-2",
    dayIndex: 4,
    dayName: "Friday",
    courseId: "jee",
    courseName: "JEE Preparation",
    moduleTitle: "Module 5: Rotational Dynamics & Calculus",
    lessonTitle: "Timed Practice: 15 Advanced Rotational Dynamics Questions",
    durationMinutes: 40,
    taskType: "Practice",
    status: "Not Started",
    ageGroup: "15-18",
  },
  {
    id: "task-15-fri-3",
    dayIndex: 4,
    dayName: "Friday",
    courseId: "ai-ml",
    courseName: "AI & ML",
    moduleTitle: "Module 4: Supervised Learning & Deep Neural Nets",
    lessonTitle: "Reviewing Loss Functions (Cross-Entropy vs MSE) & Optimizers",
    durationMinutes: 25,
    taskType: "Revision",
    status: "Not Started",
    ageGroup: "15-18",
  },

  // Saturday (dayIndex 5)
  {
    id: "task-15-sat-1",
    dayIndex: 5,
    dayName: "Saturday",
    courseId: "neet",
    courseName: "NEET Preparation",
    moduleTitle: "Module 7: Human Physiology & Genetics",
    lessonTitle: "Mock Exam Analysis & Error Log Documentation",
    durationMinutes: 45,
    taskType: "Revision",
    status: "Not Started",
    ageGroup: "15-18",
  },
  {
    id: "task-15-sat-2",
    dayIndex: 5,
    dayName: "Saturday",
    courseId: "jee",
    courseName: "JEE Preparation",
    moduleTitle: "Module 5: Rotational Dynamics & Calculus",
    lessonTitle: "JEE Main & Advanced 5-Year PYQ Solving Session",
    durationMinutes: 50,
    taskType: "Practice",
    status: "Not Started",
    ageGroup: "15-18",
  },

  // Sunday (dayIndex 6)
  {
    id: "task-15-sun-1",
    dayIndex: 6,
    dayName: "Sunday",
    courseId: "ai-ml",
    courseName: "AI & ML",
    moduleTitle: "Module 4: Supervised Learning & Deep Neural Nets",
    lessonTitle: "Weekly Project Review: Training MNIST Classifier in Python",
    durationMinutes: 40,
    taskType: "Practice",
    status: "Not Started",
    ageGroup: "15-18",
  },
  {
    id: "task-15-sun-2",
    dayIndex: 6,
    dayName: "Sunday",
    courseId: "neet",
    courseName: "NEET Preparation",
    moduleTitle: "Module 7: Human Physiology & Genetics",
    lessonTitle: "Weekly High-Yield Formula and Biology NCERT Summary Sheet",
    durationMinutes: 35,
    taskType: "Revision",
    status: "Not Started",
    ageGroup: "15-18",
  },
];

// -------------------------------------------------------------
// DEFAULT GOALS PER AGE GROUP
// -------------------------------------------------------------

export const DEFAULT_GOALS: Record<StudentAgeGroup, StudentWeeklyGoal> = {
  "6-10": {
    targetHours: 4.0,
    targetTasks: 12,
  },
  "11-14": {
    targetHours: 6.5,
    targetTasks: 15,
  },
  "15-18": {
    targetHours: 10.0,
    targetTasks: 18,
  },
};

// -------------------------------------------------------------
// SMART STUDY RECOMMENDATIONS PER AGE GROUP / DEMO STUDENT
// -------------------------------------------------------------

export const STUDENT_RECOMMENDATIONS: Record<string, StudyRecommendation[]> = {
  aarav6: [
    {
      id: "rec-6-1",
      title: "Continue Phonics Episode 2",
      reason: "You completed Episode 1 with 92% listening accuracy. Continue your streak in Foundational Phonics!",
      durationMinutes: 15,
      badge: "Incomplete Module · 74% done",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      actionLabel: "Watch Lecture",
      actionType: "lecture",
      courseId: "foundational",
      courseName: "Foundational Learning",
      lessonTitle: "Module 3 · Lecture 2: Vowel Sounds & Interactive Stories",
    },
    {
      id: "rec-6-2",
      title: "Fun 2D Shapes Practice",
      reason: "Your last shapes activity scored 82%. Spend 15 minutes identifying everyday triangles & rectangles to earn your badge.",
      durationMinutes: 15,
      badge: "Concept Revision · Math",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      actionLabel: "Practice Shapes",
      actionType: "practice",
      courseId: "math-6-10",
      courseName: "Mathematics & Numeracy",
      lessonTitle: "Module 2 · Lecture 4: Identifying Triangles & Rectangles in Daily Life",
    },
    {
      id: "rec-6-3",
      title: "Upcoming Quiz: Number Patterns",
      reason: "Your teacher scheduled the Fun Shapes & Number Patterns Quiz for tomorrow at 10:30 AM.",
      durationMinutes: 30,
      badge: "Scheduled Assessment · Tomorrow",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      actionLabel: "Preview Quiz",
      actionType: "assessment",
      courseId: "math-6-10",
      courseName: "Mathematics & Numeracy",
      lessonTitle: "Fun Shapes & Number Patterns Quiz",
    },
  ],

  aarav11: [
    {
      id: "rec-11-1",
      title: "Revise Force & Newton's Laws",
      reason: "You scored 58% in your last Science checkpoint. Spend 15 minutes revising Force and Motion simulations.",
      durationMinutes: 20,
      badge: "Low Score Focus · 58%",
      badgeColor: "bg-red-100 text-red-800 border-red-200",
      actionLabel: "Revise Topic",
      actionType: "lecture",
      courseId: "science-11-14",
      courseName: "Science & Discovery",
      lessonTitle: "Module 3 · Lecture 2: Newton's Laws with Simulations",
    },
    {
      id: "rec-11-2",
      title: "Continue Scratch Coding Logic",
      reason: "Visual Coding is 54% complete. Complete Nested Loops & Conditional Blocks to unlock your next certificate.",
      durationMinutes: 25,
      badge: "Active Course · 54% done",
      badgeColor: "bg-amber-100 text-amber-800 border-amber-200",
      actionLabel: "Resume Coding",
      actionType: "practice",
      courseId: "digital-tech",
      courseName: "Digital Skills & Technology",
      lessonTitle: "Module 3 · Lecture 5: Nested Loops & Conditional Blocks in Scratch",
    },
    {
      id: "rec-11-3",
      title: "Science & Force Checkpoint",
      reason: "Upcoming assessment on Thursday at 4:00 PM. Review Newton's formulas and unit conversions.",
      durationMinutes: 45,
      badge: "Upcoming Assessment · Thu 4 PM",
      badgeColor: "bg-purple-100 text-purple-800 border-purple-200",
      actionLabel: "Review Checkpoint",
      actionType: "assessment",
      courseId: "science-11-14",
      courseName: "Science & Discovery",
      lessonTitle: "Science & Force Principles Checkpoint",
    },
  ],

  aarav15: [
    {
      id: "rec-15-1",
      title: "High-Yield NEET Genetics Revision",
      reason: "You scored 64% in Genetics questions during last week's mock. Review Mendelian crosses & DNA replication.",
      durationMinutes: 30,
      badge: "NEET High-Yield · 64% Score",
      badgeColor: "bg-red-100 text-red-800 border-red-200",
      actionLabel: "Revise Genetics",
      actionType: "lecture",
      courseId: "neet",
      courseName: "NEET Preparation",
      lessonTitle: "Module 7 · Lecture 3: Mendelian Inheritance & DNA Replication",
    },
    {
      id: "rec-15-2",
      title: "Advance Deep Neural Nets Module",
      reason: "AI & ML course progress is at 42%. Complete Lecture 6 on Backpropagation & Activation Functions in Python.",
      durationMinutes: 35,
      badge: "Active Stream · 42% done",
      badgeColor: "bg-blue-100 text-blue-800 border-blue-200",
      actionLabel: "Watch Lecture",
      actionType: "lecture",
      courseId: "ai-ml",
      courseName: "AI & ML",
      lessonTitle: "Module 4 · Lecture 6: Backpropagation & Activation Functions in Python",
    },
    {
      id: "rec-15-3",
      title: "NEET Physics Mechanics Mock 02",
      reason: "Mock assessment is Available Now. 45 high-yield questions covering Newton's Laws and Rotational Dynamics.",
      durationMinutes: 60,
      badge: "Available Now · 45 Questions",
      badgeColor: "bg-emerald-100 text-emerald-800 border-emerald-200",
      actionLabel: "Take Mock Test",
      actionType: "assessment",
      courseId: "neet",
      courseName: "NEET Preparation",
      lessonTitle: "NEET Physics Mechanics High-Yield Mock 02",
    },
  ],
};

// -------------------------------------------------------------
// STORAGE HELPERS (PERSISTENT PER USER)
// -------------------------------------------------------------

export function getPlannerStorageKey(username: string): string {
  return `mbocwwb_planner_tasks_${username}`;
}

export function getGoalStorageKey(username: string): string {
  return `mbocwwb_planner_goals_${username}`;
}

export function getInitialTasksForStudent(ageGroup: StudentAgeGroup, username: string): PlannerTask[] {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(getPlannerStorageKey(username));
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error reading stored planner tasks:", e);
    }
  }

  // Fallback defaults by age group
  switch (ageGroup) {
    case "6-10":
      return DEFAULT_TASKS_AGE_6_10;
    case "15-18":
      return DEFAULT_TASKS_AGE_15_18;
    case "11-14":
    default:
      return DEFAULT_TASKS_AGE_11_14;
  }
}

export function getInitialGoalsForStudent(ageGroup: StudentAgeGroup, username: string): StudentWeeklyGoal {
  if (typeof window !== "undefined") {
    try {
      const stored = localStorage.getItem(getGoalStorageKey(username));
      if (stored) {
        const parsed = JSON.parse(stored);
        if (parsed && typeof parsed.targetHours === "number" && typeof parsed.targetTasks === "number") {
          return parsed;
        }
      }
    } catch (e) {
      console.error("Error reading stored planner goals:", e);
    }
  }

  return DEFAULT_GOALS[ageGroup] || DEFAULT_GOALS["11-14"];
}

export function saveTasksForStudent(username: string, tasks: PlannerTask[]): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(getPlannerStorageKey(username), JSON.stringify(tasks));
    } catch (e) {
      console.error("Error saving planner tasks:", e);
    }
  }
}

export function saveGoalsForStudent(username: string, goals: StudentWeeklyGoal): void {
  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(getGoalStorageKey(username), JSON.stringify(goals));
    } catch (e) {
      console.error("Error saving planner goals:", e);
    }
  }
}
