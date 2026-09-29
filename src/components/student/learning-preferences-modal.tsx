import { useState, useEffect } from "react";
import {
  Check,
  CheckCircle2,
  Globe2,
  GraduationCap,
  Heart,
  RotateCcw,
  Sparkles,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import {
  studentPreferencesService,
  type StudentLearningPreferences,
} from "@/features/student/student-preferences-service";
import type { StudentAgeGroup } from "@/features/student/student-data";
import { useI18n } from "@/i18n";

interface LearningPreferencesModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  username: string;
  displayName: string;
  ageGroup: StudentAgeGroup;
  ageGroupLabel: string;
  onSaved?: (preferences: StudentLearningPreferences) => void;
}

export function LearningPreferencesModal({
  open,
  onOpenChange,
  username,
  displayName,
  ageGroup,
  ageGroupLabel,
  onSaved,
}: LearningPreferencesModalProps) {
  const { t } = useI18n();
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("");
  const [savedSuccess, setSavedSuccess] = useState(false);

  const availableSubjects = studentPreferencesService.getSubjectOptions(ageGroup);
  const availableLanguages = studentPreferencesService.getLanguageOptions();

  // Load latest preferences whenever modal opens
  useEffect(() => {
    if (open && username) {
      const prefs = studentPreferencesService.getPreferences(username);
      setSelectedSubjects(prefs.favouriteSubjects || []);
      setSelectedLanguage(prefs.preferredLanguage || "");
      setSavedSuccess(false);
    }
  }, [open, username]);

  const toggleSubject = (subject: string) => {
    setSelectedSubjects((prev) =>
      prev.includes(subject)
        ? prev.filter((s) => s !== subject)
        : [...prev, subject]
    );
  };

  const handleSave = () => {
    const updated = studentPreferencesService.savePreferences(username, {
      favouriteSubjects: selectedSubjects,
      preferredLanguage: selectedLanguage,
    });
    setSavedSuccess(true);
    setTimeout(() => {
      onSaved?.(updated);
      onOpenChange(false);
    }, 600);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-xl w-[94vw] max-w-[580px] max-h-[86vh] flex flex-col p-0 overflow-hidden rounded-2xl border-slate-200/90 bg-white shadow-2xl [&>button]:text-white [&>button]:opacity-90 [&>button]:hover:opacity-100 [&>button]:hover:bg-white/20 [&>button]:top-4 [&>button]:right-4 z-[100] gap-0">
        {/* Header with Govt MIS theme styling (Pinned top) */}
        <div className="bg-gradient-to-r from-[#8B0012] via-[#9e0c1f] to-[#b31427] px-5 py-4 text-white pr-12 shrink-0">
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2.5">
              <div className="grid size-9 place-items-center rounded-xl bg-white/15 backdrop-blur-sm text-amber-300 shadow-2xs shrink-0">
                <Sparkles className="size-4.5" />
              </div>
              <div>
                <DialogTitle className="text-base sm:text-lg font-black text-white leading-tight">
                  {t("learningPreferencesCustomization")}
                </DialogTitle>
                <DialogDescription className="text-[11.5px] text-white/85 font-normal mt-0.5">
                  {t("personalizeCourseRecommendations", { name: displayName })}
                </DialogDescription>
              </div>
            </div>
            <span className="inline-flex items-center gap-1 rounded-full bg-white/20 px-2.5 py-0.5 text-[10.5px] font-bold text-amber-200 border border-white/25 shrink-0">
              <GraduationCap className="size-3" />
              {ageGroupLabel}
            </span>
          </div>
        </div>

        {/* Scrollable Form Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1 min-h-0">
          {/* Success banner if just saved */}
          {savedSuccess && (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-2.5 text-xs font-bold text-emerald-800 flex items-center gap-2 animate-in fade-in">
              <CheckCircle2 className="size-4 text-emerald-600 shrink-0" />
              <span>{t("preferencesSavedSuccess")}</span>
            </div>
          )}

          {/* Section 1: Favourite Subjects */}
          <div className="space-y-2.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Heart className="size-3.5 text-rose-600 fill-rose-600" />
                <span>{t("favouriteSubjects")}</span>
              </label>
              <span className="text-[11px] text-slate-500 font-medium">
                {t("selectedOfTotal", { selected: selectedSubjects.length, total: availableSubjects.length })}
              </span>
            </div>
            <p className="text-xs text-slate-600">
              {t("selectSubjectsDescription")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-0.5">
              {availableSubjects.map((subject) => {
                const isSelected = selectedSubjects.includes(subject);
                return (
                  <button
                    key={subject}
                    type="button"
                    onClick={() => toggleSubject(subject)}
                    className={`flex items-center justify-between p-2.5 sm:p-3 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${isSelected
                        ? "border-primary bg-primary/5 text-primary shadow-xs ring-1 ring-primary/20"
                        : "border-slate-200 bg-slate-50/70 text-slate-700 hover:border-slate-300 hover:bg-slate-100/70"
                      }`}
                  >
                    <span className="pr-2 leading-tight">{subject}</span>
                    <div
                      className={`grid size-4.5 place-items-center rounded-md border text-[10px] shrink-0 transition-colors ${isSelected
                          ? "border-primary bg-primary text-white"
                          : "border-slate-300 bg-white text-transparent"
                        }`}
                    >
                      <Check className="size-3 stroke-[3]" />
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Section 2: Preferred Language */}
          <div className="space-y-2 pt-2 border-t border-slate-100">
            <div className="flex items-center justify-between">
              <label className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                <Globe2 className="size-3.5 text-blue-600" />
                <span>{t("preferredLearningLanguage")}</span>
              </label>
              <span className="text-[11px] text-slate-500 font-medium">
                {t("select1Language")}
              </span>
            </div>
            <p className="text-xs text-slate-600">
              {t("chooseLanguageDescription")}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 pt-0.5">
              {availableLanguages.map((lang) => {
                const isSelected = selectedLanguage === lang;
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => setSelectedLanguage(lang)}
                    className={`flex items-center justify-between p-2.5 rounded-xl border text-left text-xs font-bold transition-all cursor-pointer ${isSelected
                        ? "border-blue-600 bg-blue-50/80 text-blue-900 shadow-xs ring-1 ring-blue-500/20"
                        : "border-slate-200 bg-slate-50/70 text-slate-700 hover:border-slate-300 hover:bg-slate-100/70"
                      }`}
                  >
                    <span className="leading-tight">{lang}</span>
                    <div
                      className={`grid size-4.5 place-items-center rounded-full border text-[10px] shrink-0 transition-colors ${isSelected
                          ? "border-blue-600 bg-blue-600 text-white"
                          : "border-slate-300 bg-white"
                        }`}
                    >
                      {isSelected && <div className="size-1.5 rounded-full bg-white" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Modal Actions (Pinned bottom) */}
        <div className="flex items-center justify-between border-t border-slate-200/80 bg-slate-50/90 px-5 py-3 shrink-0">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => onOpenChange(false)}
            className="text-xs font-bold text-slate-600 hover:text-slate-900 cursor-pointer"
          >
            {t("cancel")}
          </Button>

          <Button
            type="button"
            size="sm"
            disabled={selectedSubjects.length === 0 || !selectedLanguage || savedSuccess}
            onClick={handleSave}
            className="h-9 px-5 rounded-xl bg-primary hover:bg-primary/95 text-white text-xs font-extrabold shadow-sm transition-transform active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed cursor-pointer"
          >
            {savedSuccess ? t("saved") : t("savePreferences")}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
