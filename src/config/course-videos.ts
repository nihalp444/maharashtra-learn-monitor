/**
 * Centralized Course Video Registry
 * 
 * You can dynamically add new videos here anytime!
 * Simply provide:
 *  - id: unique string
 *  - title: lecture name
 *  - language: "en" | "mr" (English or Marathi)
 *  - driveUrlOrId: Google Drive sharing link, preview link, or raw file ID
 *  - subject: (optional) e.g. "Physics", "Mathematics", "AI"
 *  - duration: (optional) e.g. "15 mins"
 */

export interface CourseVideo {
  id: string;
  title: string;
  language: "en" | "mr";
  driveUrlOrId: string;
  subject?: string;
  duration?: string;
}

export interface CourseCurriculum {
  programId: string; // matches program id from mock-data
  programName: string;
  ageGroup: "6-10" | "11-14" | "15-18";
  defaultLanguage?: "en" | "mr";
  description?: string;
  videos: CourseVideo[];
}

/**
 * Converts any Google Drive link or ID into an embeddable preview player URL
 * Works with:
 * - https://drive.google.com/file/d/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R/view?usp=sharing
 * - https://drive.google.com/open?id=1O90u...
 * - https://drive.google.com/file/d/1O90u.../preview
 * - Raw ID: 1O90uIM2KPQeYWAqahFPQZ042sEe7L69R
 */
export function getGoogleDriveEmbedUrl(urlOrId: string): string {
  if (!urlOrId || !urlOrId.trim()) return "";
  const trimmed = urlOrId.trim();

  // If already a preview link
  if (trimmed.includes("/preview")) {
    return trimmed;
  }

  // Regex to extract file ID from common Google Drive link formats
  const fileIdMatch =
    trimmed.match(/\/file\/d\/([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/id=([a-zA-Z0-9_-]+)/) ||
    trimmed.match(/^([a-zA-Z0-9_-]{20,50})$/);

  if (fileIdMatch && fileIdMatch[1]) {
    return `https://drive.google.com/file/d/${fileIdMatch[1]}/preview`;
  }

  // Fallback to original if already formatted or custom
  return trimmed;
}

/**
 * Root folder link provided by user:
 * https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing
 */
export const ROOT_DRIVE_FOLDER =
  "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing";

/**
 * Configured Courses & Dynamic Videos matching Google Drive hierarchy
 */
export const COURSE_VIDEOS_REGISTRY: Record<string, CourseCurriculum> = {
  // ==================== AGE 6 to 10 ====================
  foundational: {
    programId: "foundational",
    programName: "Foundational Literacy & Phonics",
    ageGroup: "6-10",
    defaultLanguage: "en",
    description: "Interactive storytelling, language milestones, phonics practice & foundational AI demo.",
    videos: [
      {
        id: "f-ai-ep1",
        title: "Hello AI Episode 1",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/1gxV6Bar9ckU7JMlZaBBaQmzuzgw5mZ-y/view?usp=sharing",
        subject: "AI Demo",
        duration: "12 mins",
      },
      {
        id: "f-ai-ep2",
        title: "Hello AI Episode 2",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/1tkzKrKRcX-fruoyw_Dk_1mLoY4IioW8w/view?usp=sharing",
        subject: "AI Demo",
        duration: "15 mins",
      },
    ],
  },

  "math-6-10": {
    programId: "math-6-10",
    programName: "Mathematics & Numeracy",
    ageGroup: "6-10",
    defaultLanguage: "en",
    description: "Early numbers, counting games, arithmetic & visual logic puzzles.",
    videos: [
      {
        id: "m6-ep1",
        title: "Introduction to Numbers & Counting",
        language: "en",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "Mathematics",
        duration: "14 mins",
      },
      {
        id: "m6-ep2",
        title: "संख्या ज्ञान आणि मूलभूत बेरीज",
        language: "mr",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "गणित",
        duration: "16 mins",
      },
    ],
  },

  "science-6-10": {
    programId: "science-6-10",
    programName: "Science & Exploration",
    ageGroup: "6-10",
    defaultLanguage: "en",
    description: "Environmental studies, curiosity-driven experiments and living systems.",
    videos: [
      {
        id: "s6-ep1",
        title: "Exploring Nature & Plants Around Us",
        language: "en",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "Environmental Science",
        duration: "15 mins",
      },
      {
        id: "s6-ep2",
        title: "आपला परिसर आणि निसर्ग निरीक्षण",
        language: "mr",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "विज्ञान",
        duration: "18 mins",
      },
    ],
  },

  "gk-skills": {
    programId: "gk-skills",
    programName: "General Knowledge & Life Skills",
    ageGroup: "6-10",
    defaultLanguage: "en",
    description: "Civic awareness, health, hygiene and essential practical life habits.",
    videos: [
      {
        id: "gk-ep1",
        title: "Good Habits, Health & Cleanliness",
        language: "en",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "Life Skills",
        duration: "11 mins",
      },
      {
        id: "gk-ep2",
        title: "चांगल्या सवयी आणि आरोग्य सुरक्षा",
        language: "mr",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "सामान्य ज्ञान",
        duration: "13 mins",
      },
    ],
  },

  // ==================== AGE 11 to 14 ====================
  "digital-tech": {
    programId: "digital-tech",
    programName: "Digital Skills & Technology",
    ageGroup: "11-14",
    defaultLanguage: "en",
    description: "Computer basics, safe internet, digital tools & technology concepts.",
    videos: [
      {
        id: "dt-en-1",
        title: "Electric Current & Circuits in Digital Devices",
        language: "en",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "Technology",
        duration: "20 mins",
      },
      {
        id: "dt-en-2",
        title: "English - Digital Communication & Safe Internet",
        language: "en",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "Digital Literacy",
        duration: "18 mins",
      },
      {
        id: "dt-mr-1",
        title: "संगणक ओळख आणि सुरक्षित इंटरनेट वापर",
        language: "mr",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "तंत्रज्ञान",
        duration: "17 mins",
      },
    ],
  },

  "math-11-14": {
    programId: "math-11-14",
    programName: "Mathematics & Problem Solving",
    ageGroup: "11-14",
    defaultLanguage: "en",
    description: "Pre-algebra, geometric proofs, areas and multi-step analytical problem solving.",
    videos: [
      {
        id: "m11-en-1",
        title: "English - Maths - Area & Perimeter Concepts",
        language: "en",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "Geometry",
        duration: "24 mins",
      },
      {
        id: "m11-mr-1",
        title: "CHAPTER 7 - क्षेत्रफळ आणि परिमिती सराव",
        language: "mr",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "गणित",
        duration: "22 mins",
      },
      {
        id: "m11-mr-2",
        title: "CHAPTER 10 - समीकरणांची उकल आणि पद्धती",
        language: "mr",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "बीजगणित",
        duration: "26 mins",
      },
    ],
  },

  "science-11-14": {
    programId: "science-11-14",
    programName: "Science & Discovery",
    ageGroup: "11-14",
    defaultLanguage: "en",
    description: "Middle school physics, chemistry and biology with lab experiments.",
    videos: [
      {
        id: "s11-en-bio",
        title: "English - Biology - Human Body Systems & Nutrition",
        language: "en",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "Biology",
        duration: "28 mins",
      },
      {
        id: "s11-en-chem",
        title: "English - Chemistry - Elements, Compounds & Mixtures",
        language: "en",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "Chemistry",
        duration: "21 mins",
      },
      {
        id: "s11-en-phy",
        title: "English - Physics - Force, Motion & Pressure",
        language: "en",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "Physics",
        duration: "25 mins",
      },
      {
        id: "s11-mr-1",
        title: "1Ac_GettSession-1 - सजीव सृष्टी आणि वर्गीकरण",
        language: "mr",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "जीवशास्त्र",
        duration: "23 mins",
      },
      {
        id: "s11-mr-2",
        title: "2_द्रव्याची रचना आणि रासायनिक बदल",
        language: "mr",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "रसायनशास्त्र",
        duration: "20 mins",
      },
      {
        id: "s11-mr-3",
        title: "9_गतीचे नियम आणि ऊर्जा रूपांतरण",
        language: "mr",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "भौतिकशास्त्र",
        duration: "27 mins",
      },
    ],
  },

  "logic-reasoning": {
    programId: "logic-reasoning",
    programName: "Logical Reasoning",
    ageGroup: "11-14",
    defaultLanguage: "en",
    description: "Verbal and non-verbal reasoning, deductive puzzles and pattern recognition.",
    videos: [
      {
        id: "lr-en-1",
        title: "Pattern Recognition & Sequence Solving",
        language: "en",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "Reasoning",
        duration: "19 mins",
      },
      {
        id: "lr-mr-1",
        title: "तर्कशुद्ध विचार आणि आकृत्यांची मालिका",
        language: "mr",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "बुद्धिमत्ता चाचणी",
        duration: "22 mins",
      },
    ],
  },

  // ==================== AGE 15 to 18 ====================
  "ai-ml": {
    programId: "ai-ml",
    programName: "AI & ML",
    ageGroup: "15-18",
    defaultLanguage: "en",
    description: "Neural network principles, Python programming, computer vision and ethical AI models.",
    videos: [
      {
        id: "aiml-ep1",
        title: "Hello AI Episode 1 - Foundations of Machine Learning",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/1gxV6Bar9ckU7JMlZaBBaQmzuzgw5mZ-y/view?usp=sharing",
        subject: "AI & Neural Networks",
        duration: "22 mins",
      },
      {
        id: "aiml-ep2",
        title: "Hello AI Episode 2 - Computer Vision & Model Training",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/1tkzKrKRcX-fruoyw_Dk_1mLoY4IioW8w/view?usp=sharing",
        subject: "Computer Vision",
        duration: "25 mins",
      },
      // {
      //   id: "aiml-mr-1",
      //   title: "कृत्रिम बुद्धिमत्ता (AI) परिचय आणि भविष्य",
      //   language: "mr",
      //   driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
      //   subject: "एआय आणि एमएल",
      //   duration: "20 mins",
      // },
    ],
  },

  jee: {
    programId: "jee",
    programName: "JEE Preparation",
    ageGroup: "15-18",
    defaultLanguage: "en",
    description: "Rigorous engineering entrance coaching covering Calculus, Mechanics & Advanced Chemistry.",
    videos: [
      {
        id: "jee-phy-1",
        title: "XI Physics - Kinematics & Laws of Motion (Lecture 1)",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/1kujEdvbrgOrcuPCOyP3si8Pthp16EYW4/view?usp=drive_link",
        subject: "Physics",
        duration: "45 mins",
      },
      {
        id: "jee-chem-1",
        title: "XII Chemistry - Chemical Kinetics & Electrochemistry",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/1S2HRECfGP_BDJ0X1e2phMRTIPSzjIjpn/view?usp=drive_link",
        subject: "Chemistry",
        duration: "42 mins",
      },
      {
        id: "jee-math-1",
        title: "JEE Mathematics - Continuity And Differentiability",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/1VPFgSNT6WPs5TMWPlZdSf1fW_dsulzLE/view?usp=drive_link",
        subject: "Mathematics",
        duration: "17 mins",
      },
      {
        id: "jee-phy-2",
        title: "Physics Problem Solving Series - Work, Power & Energy",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/1feQkzHACrzw2h1bED9jFf3Bm4wlPIyIx/view?usp=drive_link",
        subject: "Physics",
        duration: "7 mins",
      },
      {
        id: "jee-math-integral",
        title: "JEE Mathematics - Integral and calculas",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/19mV_L3WoMXv1P9pfZmyHjJFom5UQm_0t/view?usp=drive_link",
        subject: "Mathematics",
        duration: "5 mins",
      },
      {
        id: "jee-chem-atoms",
        title: "JEE - Chemistry - Atoms and Structures",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/1ijiAF7UZxx0fYbkLjQgxkXWPe86pHrNW/view?usp=drive_link",
        subject: "Chemistry",
        duration: "9 mins",
      },
      {
        id: "jee-math-matrix",
        title: "JEE Mathematics - Matrix",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/1Z-Nf3FtDIMsC43XzcwrbKjS-vc1DTGzK/view?usp=drive_link",
        subject: "Mathematics",
        duration: "5 mins",
      },
      {
        id: "jee-phy-conic",
        title: "XI Physics - Conic Section",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/1ufr_Y5ckewiDWex7Y-AjNEm1Uee5JDnb/view?usp=drive_link",
        subject: "Physics",
        duration: "27 mins",
      },
      {
        id: "jee-chem-applications",
        title: "XI Chemistry - Applications of Chemistry",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/1R6zE9x2gJrv4W5zdJQcc0Np5BhdlQLas/view?usp=drive_link",
        subject: "Chemistry",
        duration: "42 mins",
      },
      {
        id: "jee-mr-1",
        title: "JEE भौतिकशास्त्र - गतीचे नियम आणि संकल्पना स्पष्टीकरण",
        language: "mr",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "भौतिकशास्त्र",
        duration: "35 mins",
      },
    ],
  },

  neet: {
    programId: "neet",
    programName: "NEET Preparation",
    ageGroup: "15-18",
    defaultLanguage: "en",
    description: "Targeted medical entrance curriculum across Physics, Chemistry and Biology with NCERT mastery.",
    videos: [
      {
        id: "neet-bio-1",
        title: "CBSE Class 11 Biology - Chemical Cordination and Integration",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/1Onuj9LJ-IJppppY3NAVoUCn0goG8z_c3/view?usp=drive_link",
        subject: "Biology",
        duration: "45 mins",
      },
      {
        id: "neet-bio-2",
        title: "CBSE Class 11 Biology - Morphology of flowering Plants",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/1QqLa3RXnrUM-Uz-XevImnZuhhcHjDFt-/view?usp=drive_link",
        subject: "Biology",
        duration: "50 mins",
      },
      {
        id: "neet-bio-3",
        title: "CBSE Class 11 Biology - Anatomy of Flowering Plants",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/10Heeufxkakfy7MMhNyUqr85LqGOK6LIS/view?usp=drive_link",
        subject: "Biology",
        duration: "40 mins",
      },
      {
        id: "neet-chem-1",
        title: "CBSE Class 11 Chemistry - Structure of Atoms",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/1HPeS5g1ukEzWTkhpHBOkkKXMyZd95Mci/view?usp=drive_link",
        subject: "Chemistry",
        duration: "36 mins",
      },
      {
        id: "neet-phy-1",
        title: "CBSE Class 11 Physics - Mechancal properties of Solids",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/19o40rvWXcpvJYcfKnfcOT1aO-CEf7hZI/view?usp=drive_link",
        subject: "Physics",
        duration: "44 mins",
      },
      {
        id: "neet-bio-structural",
        title: "XI BIO - Structural Organozation in plants",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/1enlJY5fEvb2OnNKl7z5RSiRQfvA-h88H/view?usp=drive_link",
        subject: "Biology",
        duration: "10 mins",
      },
      {
        id: "neet-bio-neural",
        title: "XII BIO - Neural control and conrdination",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/1LM9w-U3zWRIDoakM108HEDeHGwPd0I9t/view?usp=drive_link",
        subject: "Biology",
        duration: "15 mins",
      },
      {
        id: "neet-phy-optics",
        title: "XII Physics- Ray Optics",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/10EAUycbxnbCvh3IwFl7C8629U9MAKYoo/view?usp=drive_link",
        subject: "Physics",
        duration: "14 mins",
      },
      {
        id: "neet-bio-tissues",
        title: "XI - BIO - Tissues",
        language: "en",
        driveUrlOrId: "https://drive.google.com/file/d/1mX1nCMq1TviaCxN1dkLU606XGMSy8Ve9/view?usp=drive_link",
        subject: "Biology",
        duration: "15 mins",
      },
      {
        id: "neet-mr-1",
        title: "NEET जीवशास्त्र - पेशी रचना आणि सजीव प्रक्रिया",
        language: "mr",
        driveUrlOrId: "https://drive.google.com/drive/folders/1O90uIM2KPQeYWAqahFPQZ042sEe7L69R?usp=sharing",
        subject: "जीवशास्त्र",
        duration: "32 mins",
      },
    ],
  },
};

/**
 * Helper to fetch curriculum by program ID.
 * If not specifically registered, falls back to a dynamically generated template.
 */
export function getCourseCurriculum(
  programId: string,
  programName?: string,
  ageGroup: "6-10" | "11-14" | "15-18" = "11-14"
): CourseCurriculum {
  if (COURSE_VIDEOS_REGISTRY[programId]) {
    return COURSE_VIDEOS_REGISTRY[programId];
  }

  // Fallback template for any new course added in the future
  return {
    programId,
    programName: programName || "Learning Course",
    ageGroup,
    defaultLanguage: "en",
    description: "Curriculum lectures and video resources hosted on Google Drive.",
    videos: [
      {
        id: `${programId}-en-1`,
        title: `${programName || "Course"} - Chapter 1 (English)`,
        language: "en",
        driveUrlOrId: ROOT_DRIVE_FOLDER,
        subject: "Lecture 1",
        duration: "20 mins",
      },
      {
        id: `${programId}-mr-1`,
        title: `${programName || "Course"} - प्रकरण १ (मराठी)`,
        language: "mr",
        driveUrlOrId: ROOT_DRIVE_FOLDER,
        subject: "सत्र १",
        duration: "20 mins",
      },
    ],
  };
}
