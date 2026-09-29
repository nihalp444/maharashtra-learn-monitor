import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import en, { type Translations, type TranslationKeys } from "./en";
import mr from "./mr";

/* ─── Supported locales ─── */
export type Locale = "en" | "mr";

const LOCALE_STORAGE_KEY = "maharashtra-learn-locale";

const translationMap: Record<Locale, Translations> = { en, mr };

/* ─── Context value shape ─── */
interface I18nContextValue {
  /** Currently active locale */
  locale: Locale;
  /** Switch to a different locale */
  setLocale: (locale: Locale) => void;
  /** Retrieve a translated string by key. Supports placeholder interpolation. */
  t: (key: TranslationKeys, params?: Record<string, string | number>) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

/* ─── Provider component ─── */
export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window === "undefined") return "en";
    const stored = localStorage.getItem(LOCALE_STORAGE_KEY);
    if (stored === "en" || stored === "mr") return stored;
    return "en";
  });

  // Persist choice
  useEffect(() => {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
    // Update html lang attribute for accessibility / SEO
    document.documentElement.lang = locale;
  }, [locale]);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
  }, []);

  /**
   * Translate a key, optionally interpolating `{placeholder}` tokens.
   *
   * Usage:
   *   t("completedOfLectures", { completed: 5, total: 12 })
   *   => "Completed 5 of 12 lectures" | "१२ पैकी ५ व्याख्याने पूर्ण"
   */
  const t = useCallback(
    (key: TranslationKeys, params?: Record<string, string | number>): string => {
      const translations = translationMap[locale];
      let value: string = translations[key] ?? en[key] ?? key;
      if (params) {
        for (const [placeholder, replacement] of Object.entries(params)) {
          value = value.replace(
            new RegExp(`\\{${placeholder}\\}`, "g"),
            String(replacement),
          );
        }
      }
      return value;
    },
    [locale],
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}

/* ─── Consumer hook ─── */
export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error("useI18n must be used within an <I18nProvider />");
  }
  return ctx;
}
