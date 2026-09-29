import type { StudentAgeGroup } from "./student-data";

export interface StudentLearningPreferences {
  completed: boolean;
  favouriteSubjects: string[];
  preferredLanguage: string;
  updatedAt?: string;
}

const AGE_GROUP_SUBJECTS: Record<StudentAgeGroup, string[]> = {
  "6-10": [
    "Mathematics & Numeracy",
    "Foundational Learning (Marathi & English)",
    "Science & Nature Exploration",
    "Creative Arts & Stories",
    "General Knowledge & Life Skills",
  ],
  "11-14": [
    "Mathematics & Algebra",
    "General Science",
    "Digital Skills & Coding",
    "Social Studies & History",
    "Languages (Marathi / English)",
    "Environmental Education",
  ],
  "15-18": [
    "Physics (JEE / NEET Prep)",
    "Chemistry (JEE / NEET Prep)",
    "Mathematics (Advanced / JEE)",
    "Biology (NEET Prep)",
    "Computer Science & AI",
    "State Board Exam Prep",
  ],
};

const LANGUAGE_OPTIONS = [
  "Marathi (मराठी)",
  "English",
  "Hindi (हिंदी)",
];

const DEFAULT_PREFERENCES: Record<string, StudentLearningPreferences> = {
  aarav6: {
    completed: false,
    favouriteSubjects: [],
    preferredLanguage: "",
  },
  aarav11: {
    completed: false,
    favouriteSubjects: [],
    preferredLanguage: "",
  },
  aarav15: {
    completed: false,
    favouriteSubjects: [],
    preferredLanguage: "",
  },
};

const STORAGE_PREFIX = "mbocwwb_student_preferences_";
const PREFERENCES_EVENT = "mbocwwb-preferences-changed";

class StudentPreferencesService {
  private getStorageKey(username: string): string {
    return `${STORAGE_PREFIX}${username.trim().toLowerCase()}`;
  }

  getSubjectOptions(ageGroup: StudentAgeGroup): string[] {
    return AGE_GROUP_SUBJECTS[ageGroup] ?? AGE_GROUP_SUBJECTS["11-14"];
  }

  getLanguageOptions(): string[] {
    return LANGUAGE_OPTIONS;
  }

  getPreferences(username: string): StudentLearningPreferences {
    const key = this.getStorageKey(username);
    if (typeof window !== "undefined") {
      try {
        const stored = localStorage.getItem(key);
        if (stored) {
          return JSON.parse(stored) as StudentLearningPreferences;
        }
      } catch (e) {
        console.error("Failed to parse preferences from localStorage", e);
      }
    }

    const normalized = username.trim().toLowerCase();
    const fallback = DEFAULT_PREFERENCES[normalized] ?? {
      completed: false,
      favouriteSubjects: [],
      preferredLanguage: "",
    };

    // Save default to localStorage for stability
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(fallback));
      } catch (e) {
        console.error("Failed to write default preferences", e);
      }
    }

    return fallback;
  }

  savePreferences(
    username: string,
    prefs: { favouriteSubjects: string[]; preferredLanguage: string }
  ): StudentLearningPreferences {
    const updated: StudentLearningPreferences = {
      completed: prefs.favouriteSubjects.length > 0 && Boolean(prefs.preferredLanguage),
      favouriteSubjects: prefs.favouriteSubjects,
      preferredLanguage: prefs.preferredLanguage,
      updatedAt: new Date().toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
    };

    const key = this.getStorageKey(username);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save preferences", e);
      }
      window.dispatchEvent(
        new CustomEvent(PREFERENCES_EVENT, { detail: { username, preferences: updated } })
      );
    }

    return updated;
  }

  resetPreferences(username: string): StudentLearningPreferences {
    const cleared: StudentLearningPreferences = {
      completed: false,
      favouriteSubjects: [],
      preferredLanguage: "",
    };

    const key = this.getStorageKey(username);
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(key, JSON.stringify(cleared));
      } catch (e) {
        console.error("Failed to reset preferences in localStorage", e);
      }
      window.dispatchEvent(
        new CustomEvent(PREFERENCES_EVENT, { detail: { username, preferences: cleared } })
      );
    }

    return cleared;
  }

  subscribe(callback: (detail: { username: string; preferences: StudentLearningPreferences }) => void): () => void {
    if (typeof window === "undefined") return () => {};
    const handler = (e: Event) => {
      const custom = e as CustomEvent<{ username: string; preferences: StudentLearningPreferences }>;
      if (custom.detail) {
        callback(custom.detail);
      }
    };
    window.addEventListener(PREFERENCES_EVENT, handler);
    return () => window.removeEventListener(PREFERENCES_EVENT, handler);
  }
}

export const studentPreferencesService = new StudentPreferencesService();
