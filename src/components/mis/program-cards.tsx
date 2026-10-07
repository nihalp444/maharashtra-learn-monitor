import {
  BookOpen,
  Bot,
  BrainCircuit,
  Calculator,
  Compass,
  Cpu,
  HeartHandshake,
  Microscope,
  Puzzle,
  Sigma,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { formatNumber, type LearningProgram } from "@/features/mis/mock-service";

const icons: Record<string, LucideIcon> = {
  foundational: BookOpen,
  "math-6-10": Calculator,
  "science-6-10": Compass,
  "gk-skills": HeartHandshake,
  "math-11-14": Calculator,
  "science-11-14": Microscope,
  "digital-tech": Cpu,
  "logic-reasoning": Puzzle,
  "ai-ml": Bot,
  neet: Sparkles,
  jee: Sigma,
};

interface ColorTheme {
  cardBorder: string;
  cardHoverBorder: string;
  cardHoverShadow: string;
  headerBg: string;
  headerBorder: string;
  iconBg: string;
  iconColor: string;
  badgeBg: string;
  badgeText: string;
  badgeBorder: string;
  accentBar: string;
}

const colorThemes: Record<string, ColorTheme> = {
  "program-blue": {
    cardBorder: "border-blue-200/70",
    cardHoverBorder: "hover:border-blue-400",
    cardHoverShadow: "hover:shadow-blue-500/10",
    headerBg: "bg-gradient-to-r from-blue-50/80 via-indigo-50/30 to-white",
    headerBorder: "border-blue-100",
    iconBg: "bg-blue-600 text-white",
    iconColor: "text-blue-600",
    badgeBg: "bg-blue-50 text-blue-700",
    badgeText: "text-blue-700",
    badgeBorder: "border-blue-200/70",
    accentBar: "bg-blue-600",
  },
  "program-emerald": {
    cardBorder: "border-emerald-200/70",
    cardHoverBorder: "hover:border-emerald-400",
    cardHoverShadow: "hover:shadow-emerald-500/10",
    headerBg: "bg-gradient-to-r from-emerald-50/80 via-teal-50/30 to-white",
    headerBorder: "border-emerald-100",
    iconBg: "bg-emerald-600 text-white",
    iconColor: "text-emerald-600",
    badgeBg: "bg-emerald-50 text-emerald-700",
    badgeText: "text-emerald-700",
    badgeBorder: "border-emerald-200/70",
    accentBar: "bg-emerald-600",
  },
  "program-amber": {
    cardBorder: "border-amber-200/70",
    cardHoverBorder: "hover:border-amber-400",
    cardHoverShadow: "hover:shadow-amber-500/10",
    headerBg: "bg-gradient-to-r from-amber-50/80 via-orange-50/30 to-white",
    headerBorder: "border-amber-100",
    iconBg: "bg-amber-600 text-white",
    iconColor: "text-amber-600",
    badgeBg: "bg-amber-50 text-amber-800",
    badgeText: "text-amber-800",
    badgeBorder: "border-amber-200/70",
    accentBar: "bg-amber-500",
  },
  "program-purple": {
    cardBorder: "border-purple-200/70",
    cardHoverBorder: "hover:border-purple-400",
    cardHoverShadow: "hover:shadow-purple-500/10",
    headerBg: "bg-gradient-to-r from-purple-50/80 via-pink-50/30 to-white",
    headerBorder: "border-purple-100",
    iconBg: "bg-purple-600 text-white",
    iconColor: "text-purple-600",
    badgeBg: "bg-purple-50 text-purple-700",
    badgeText: "text-purple-700",
    badgeBorder: "border-purple-200/70",
    accentBar: "bg-purple-600",
  },
  "program-green": {
    cardBorder: "border-emerald-200/70",
    cardHoverBorder: "hover:border-emerald-400",
    cardHoverShadow: "hover:shadow-emerald-500/10",
    headerBg: "bg-gradient-to-r from-emerald-50/80 via-teal-50/30 to-white",
    headerBorder: "border-emerald-100",
    iconBg: "bg-emerald-600 text-white",
    iconColor: "text-emerald-600",
    badgeBg: "bg-emerald-50 text-emerald-700",
    badgeText: "text-emerald-700",
    badgeBorder: "border-emerald-200/70",
    accentBar: "bg-emerald-600",
  },
  "program-maroon": {
    cardBorder: "border-rose-200/70",
    cardHoverBorder: "hover:border-rose-400",
    cardHoverShadow: "hover:shadow-rose-500/10",
    headerBg: "bg-gradient-to-r from-rose-50/80 via-pink-50/30 to-white",
    headerBorder: "border-rose-100",
    iconBg: "bg-rose-700 text-white",
    iconColor: "text-rose-700",
    badgeBg: "bg-rose-50 text-rose-700",
    badgeText: "text-rose-700",
    badgeBorder: "border-rose-200/70",
    accentBar: "bg-rose-700",
  },
  "program-teal": {
    cardBorder: "border-teal-200/70",
    cardHoverBorder: "hover:border-teal-400",
    cardHoverShadow: "hover:shadow-teal-500/10",
    headerBg: "bg-gradient-to-r from-teal-50/80 via-cyan-50/30 to-white",
    headerBorder: "border-teal-100",
    iconBg: "bg-teal-600 text-white",
    iconColor: "text-teal-600",
    badgeBg: "bg-teal-50 text-teal-700",
    badgeText: "text-teal-700",
    badgeBorder: "border-teal-200/70",
    accentBar: "bg-teal-600",
  },
};

const defaultTheme = colorThemes["program-blue"];

export function ProgramCards({
  programs,
  detailed = false,
}: {
  programs: LearningProgram[];
  detailed?: boolean;
}) {
  return (
    <div
      className={`grid gap-4 sm:gap-5 ${
        programs.length === 4
          ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-4"
          : detailed
            ? "grid-cols-1 sm:grid-cols-2 xl:grid-cols-3"
            : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
      }`}
    >
      {programs.map((program) => {
        const Icon = icons[program.id] ?? BrainCircuit;
        const theme = colorThemes[program.color] ?? defaultTheme;
        if (!theme) return null;

        return (
          <article
            key={program.id}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${theme.cardBorder} ${theme.cardHoverBorder} ${theme.cardHoverShadow}`}
          >
            {/* Top Accent Stripe */}
            <div className={`h-1 w-full ${theme.accentBar}`} />

            {/* Header with compact 2-tier layout */}
            <div
              className={`border-b ${theme.headerBorder} ${theme.headerBg} px-4 py-3 sm:px-4 sm:py-3.5`}
            >
              {/* Top Row: Icon + Engagement Badge */}
              <div className="flex items-center justify-between gap-2">
                <div
                  className={`grid size-9 place-items-center rounded-lg ${theme.iconBg} shadow-sm transition-transform duration-200 group-hover:scale-105`}
                >
                  <Icon className="size-4.5" />
                </div>
                <div
                  className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-[10.5px] font-bold tracking-tight shadow-2xs ${theme.badgeBg} ${theme.badgeBorder}`}
                >
                  <span className="relative flex size-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-current opacity-75" />
                    <span className="relative inline-flex size-1.5 rounded-full bg-current" />
                  </span>
                  <span>{program.engagement}% Engaged</span>
                </div>
              </div>

              {/* Title & Subtitle Row */}
              <div className="mt-2">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3
                    className="font-extrabold text-slate-900 text-sm sm:text-[15px] leading-tight tracking-tight"
                    title={program.name}
                  >
                    {program.name}
                  </h3>
                  {(program.id === "jee" || program.id === "neet" || program.id === "ai-ml") && (
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-[9.5px] font-black tracking-wide text-primary uppercase border border-primary/20">
                      {program.id === "ai-ml" ? "National Future Tech" : "National Entrance Exam"}
                    </span>
                  )}
                </div>
                <p
                  className="mt-0.5 text-[11px] font-medium text-slate-500 line-clamp-1"
                  title={program.fullName}
                >
                  {program.fullName}
                </p>
              </div>
            </div>

            {/* Body */}
            <div className="flex flex-1 flex-col justify-between px-4 py-3 sm:px-4 sm:py-3.5">
              {/* Description */}
              <p className="text-[11.5px] leading-relaxed text-slate-600 line-clamp-2">
                {program.description}
              </p>

              {/* 4-Metric Grid */}
              <div className="mt-3 grid grid-cols-2 gap-2 rounded-lg border border-slate-100 bg-slate-50/80 p-2 sm:p-2.5">
                <div className="overflow-hidden rounded-md bg-white p-2 border border-slate-200/50 shadow-2xs">
                  <span className="block text-[9.5px] font-bold uppercase tracking-wider text-slate-400 truncate">
                    Enrolled Students
                  </span>
                  <span className="mt-0.5 block text-[13px] font-extrabold text-slate-900 truncate">
                    {formatNumber(program.enrolledStudents)}
                  </span>
                </div>

                <div className="overflow-hidden rounded-md bg-white p-2 border border-slate-200/50 shadow-2xs">
                  <span className="block text-[9.5px] font-bold uppercase tracking-wider text-slate-400 truncate">
                    Active Learners
                  </span>
                  <span className="mt-0.5 block text-[13px] font-extrabold text-slate-900 truncate">
                    {formatNumber(program.activeStudents)}
                  </span>
                </div>

                <div className="overflow-hidden rounded-md bg-white p-2 border border-slate-200/50 shadow-2xs">
                  <span className="block text-[9.5px] font-bold uppercase tracking-wider text-slate-400 truncate">
                    Completion Rate
                  </span>
                  <div className="mt-0.5 flex items-center justify-between gap-1">
                    <span className="text-[13px] font-extrabold text-slate-900">
                      {program.completion}%
                    </span>
                    <span className="text-[9.5px] font-bold text-emerald-600">
                      On Track
                    </span>
                  </div>
                </div>

                <div className="overflow-hidden rounded-md bg-white p-2 border border-slate-200/50 shadow-2xs">
                  <span className="block text-[9.5px] font-bold uppercase tracking-wider text-slate-400 truncate">
                    Learning Hours
                  </span>
                  <span className="mt-0.5 block text-[13px] font-extrabold text-slate-900 truncate">
                    {formatNumber(program.learningHours)}
                  </span>
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}
