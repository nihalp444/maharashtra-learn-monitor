import { Globe2 } from "lucide-react";
import { useI18n, type Locale } from "@/i18n";

const localeOptions: { code: Locale; label: string; nativeLabel: string }[] = [
  { code: "en", label: "English", nativeLabel: "English" },
  { code: "mr", label: "Marathi", nativeLabel: "मराठी" },
];

/**
 * Compact language toggle designed for the student dashboard header area.
 * Renders as a pill-shaped toggle between English and Marathi.
 */
export function LanguageSwitcher() {
  const { locale, setLocale } = useI18n();

  return (
    <div className="flex items-center gap-1.5 rounded-xl bg-white/12 px-2 py-1 border border-white/15 backdrop-blur-sm shadow-xs">
      <Globe2 className="size-3.5 text-amber-300 shrink-0" />
      {localeOptions.map((opt) => (
        <button
          key={opt.code}
          type="button"
          onClick={() => setLocale(opt.code)}
          className={`rounded-lg px-2 py-0.5 text-[11px] font-bold transition-all cursor-pointer ${
            locale === opt.code
              ? "bg-white/25 text-white shadow-xs"
              : "text-white/70 hover:text-white hover:bg-white/10"
          }`}
        >
          {opt.nativeLabel}
        </button>
      ))}
    </div>
  );
}
