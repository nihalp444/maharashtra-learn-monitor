import {
  ArrowUpRight,
  BookOpen,
  Bot,
  BrainCircuit,
  Calculator,
  Compass,
  Cpu,
  ExternalLink,
  HeartHandshake,
  Microscope,
  PlayCircle,
  Puzzle,
  Sigma,
  Sparkles,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CourseVideoModal } from "@/components/mis/course-video-modal";
import { KLASSROOM_LINKS } from "@/config/program-links";
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
  buttonBg: string;
  buttonHover: string;
}

const colorThemes: Record<string, ColorTheme> = {
  "program-blue": {
    cardBorder: "border-blue-200/70",
    cardHoverBorder: "hover:border-blue-400",
    cardHoverShadow: "hover:shadow-blue-500/10",
    headerBg: "bg-gradient-to-r from-blue-50/80 via-indigo-50/30 to-white",
    headerBorder: "border-blue-100",
    iconBg: "bg-blue-600 text-white shadow-blue-500/20",
    iconColor: "text-white",
    badgeBg: "bg-blue-50 text-blue-700",
    badgeText: "text-blue-700 font-bold",
    badgeBorder: "border-blue-200",
    accentBar: "bg-blue-600",
    buttonBg: "border-blue-200 hover:bg-blue-600 hover:text-white hover:border-blue-600 text-blue-800",
    buttonHover: "group-hover:border-blue-300",
  },
  "program-green": {
    cardBorder: "border-emerald-200/70",
    cardHoverBorder: "hover:border-emerald-400",
    cardHoverShadow: "hover:shadow-emerald-500/10",
    headerBg: "bg-gradient-to-r from-emerald-50/80 via-teal-50/30 to-white",
    headerBorder: "border-emerald-100",
    iconBg: "bg-emerald-600 text-white shadow-emerald-500/20",
    iconColor: "text-white",
    badgeBg: "bg-emerald-50 text-emerald-700",
    badgeText: "text-emerald-700 font-bold",
    badgeBorder: "border-emerald-200",
    accentBar: "bg-emerald-600",
    buttonBg: "border-emerald-200 hover:bg-emerald-600 hover:text-white hover:border-emerald-600 text-emerald-800",
    buttonHover: "group-hover:border-emerald-300",
  },
  "program-amber": {
    cardBorder: "border-amber-200/70",
    cardHoverBorder: "hover:border-amber-400",
    cardHoverShadow: "hover:shadow-amber-500/10",
    headerBg: "bg-gradient-to-r from-amber-50/80 via-orange-50/30 to-white",
    headerBorder: "border-amber-100",
    iconBg: "bg-amber-600 text-white shadow-amber-500/20",
    iconColor: "text-white",
    badgeBg: "bg-amber-50 text-amber-700",
    badgeText: "text-amber-700 font-bold",
    badgeBorder: "border-amber-200",
    accentBar: "bg-amber-600",
    buttonBg: "border-amber-200 hover:bg-amber-600 hover:text-white hover:border-amber-600 text-amber-800",
    buttonHover: "group-hover:border-amber-300",
  },
  "program-purple": {
    cardBorder: "border-purple-200/70",
    cardHoverBorder: "hover:border-purple-400",
    cardHoverShadow: "hover:shadow-purple-500/10",
    headerBg: "bg-gradient-to-r from-purple-50/80 via-pink-50/30 to-white",
    headerBorder: "border-purple-100",
    iconBg: "bg-purple-600 text-white shadow-purple-500/20",
    iconColor: "text-white",
    badgeBg: "bg-purple-50 text-purple-700",
    badgeText: "text-purple-700 font-bold",
    badgeBorder: "border-purple-200",
    accentBar: "bg-purple-600",
    buttonBg: "border-purple-200 hover:bg-purple-600 hover:text-white hover:border-purple-600 text-purple-800",
    buttonHover: "group-hover:border-purple-300",
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
  const [selectedProgramForVideo, setSelectedProgramForVideo] =
    useState<LearningProgram | null>(null);

  return (
    <>
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
          const targetUrl = KLASSROOM_LINKS[program.linkKey] ?? "https://www.klassroom.in/klassroom-ott/";

          return (
            <article
              key={program.id}
              onClick={() => setSelectedProgramForVideo(program)}
              className={`group relative flex flex-col justify-between overflow-hidden rounded-2xl border bg-white shadow-sm transition-all duration-200 hover:-translate-y-1 hover:shadow-lg cursor-pointer ${theme.cardBorder} ${theme.cardHoverBorder} ${theme.cardHoverShadow}`}
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

              {/* Title & Subtitle Row with full width */}
              <div className="mt-2">
                <h3
                  className="font-extrabold text-slate-900 text-sm sm:text-[15px] leading-tight tracking-tight"
                  title={program.name}
                >
                  {program.name}
                </h3>
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

            {/* Action Footer */}
            <div className="border-t border-slate-100 bg-slate-50/50 px-3.5 py-2.5 sm:px-4 sm:py-3 flex items-center gap-2">
              <Button
                type="button"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  setSelectedProgramForVideo(program);
                }}
                className="h-8.5 flex-1 justify-center gap-1.5 rounded-lg bg-primary hover:bg-primary/95 text-white font-bold text-xs transition-all shadow-xs"
              >
                <PlayCircle className="size-3.5" />
                <span>Watch Lectures</span>
              </Button>

              <Button
                size="sm"
                variant="outline"
                asChild
                onClick={(e) => e.stopPropagation()}
                className={`h-8.5 px-3 justify-center gap-1 rounded-lg bg-white font-semibold text-xs transition-all shadow-2xs ${theme.buttonBg}`}
                title="Explore curriculum on Klassroom OTT"
              >
                <a
                  href={targetUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-1"
                >
                  <span className="hidden sm:inline">Klassroom</span>
                  <ExternalLink className="size-3 shrink-0 opacity-70" />
                </a>
              </Button>
            </div>
          </article>
        );
      })}
    </div>

    {/* Video Player & Curriculum Modal */}
    <CourseVideoModal
      isOpen={selectedProgramForVideo !== null}
      onClose={() => setSelectedProgramForVideo(null)}
      program={selectedProgramForVideo}
    />
  </>
  );
}
