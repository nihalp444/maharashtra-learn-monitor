import { createFileRoute } from "@tanstack/react-router";
import { BookOpenCheck, CircleCheck, Clock3, Sparkles, UsersRound } from "lucide-react";
import { useState } from "react";
import { KpiCard } from "@/components/mis/kpi-card";
import { PageHeader } from "@/components/mis/page-header";
import { ProgramCards } from "@/components/mis/program-cards";
import { SectionCard } from "@/components/mis/section-card";
import { misService, type AgeGroupId } from "@/features/mis/mock-service";

export const Route = createFileRoute("/_authenticated/learning-programs")({
  head: () => ({
    meta: [
      { title: "Learning Programs | Maharashtra Learning MIS" },
      {
        name: "description",
        content:
          "Monitor high-stakes competitive entrance streams (JEE Engineering, NEET Medical, AI & Machine Learning) alongside Class 1st to 9th foundational curricula across Maharashtra.",
      },
      {
        property: "og:title",
        content: "Learning Programs & Competitive Streams (JEE, NEET, AI/ML) | Maharashtra Learning MIS",
      },
      {
        property: "og:description",
        content: "Detailed monitoring of JEE Main & Advanced, NEET Medical, and AI/ML future skills along with foundational cohorts across 36 districts.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  const [selectedAge, setSelectedAge] = useState<AgeGroupId>("15-18");
  const ageGroups = misService.getAgeGroups();

  const programs = misService.getPrograms(selectedAge);
  const total = programs.reduce((s, p) => s + p.enrolledStudents, 0);
  const active = programs.reduce((s, p) => s + p.activeStudents, 0);
  const hours = programs.reduce((s, p) => s + p.learningHours, 0);
  const avg = programs.length > 0 ? programs.reduce((s, p) => s + p.completion, 0) / programs.length : 0;
  const currentAgeInfo = ageGroups.find((a) => a.id === selectedAge);

  return (
    <>
      <PageHeader
        title="Learning Programs & Curriculum"
        subtitle="Monitor student enrollment, course progress, and engagement across career readiness streams."
      />
      <div className="space-y-6 p-4 sm:p-6 xl:p-8">
        {/* Focus Banner: JEE, NEET & AI/ML Competitive Excellence */}
        <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-primary/10 via-primary/5 to-transparent p-5 shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="space-y-1.5">
              <div className="flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1 rounded-full bg-primary px-2.5 py-0.5 text-[11px] font-bold text-white shadow-2xs">
                  <Sparkles className="size-3" />
                  High-Priority State Mission
                </span>
                <span className="rounded-full border border-primary/30 bg-white/80 px-2.5 py-0.5 text-[11px] font-bold text-primary">
                  Class 10th to 12th Career Streams
                </span>
              </div>
              <h2 className="text-base sm:text-lg font-extrabold text-foreground tracking-tight">
                National Competitive Exam Preparation &amp; Future Technology Hub
              </h2>
              <p className="text-xs sm:text-sm text-muted-foreground max-w-3xl leading-relaxed">
                Empowering children of registered BOCW construction workers with equal access to top-tier coaching for{" "}
                <strong className="text-foreground">JEE (Engineering Entrance)</strong>,{" "}
                <strong className="text-foreground">NEET (Medical Entrance)</strong>, and{" "}
                <strong className="text-foreground">AI &amp; Machine Learning</strong> — 100% free with structured video modules and doubt resolution.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-2.5 shrink-0">
              <button
                type="button"
                onClick={() => setSelectedAge("15-18")}
                className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-xs font-bold transition-all shadow-xs ${
                  selectedAge === "15-18"
                    ? "bg-primary text-white ring-2 ring-primary/30 shadow-md"
                    : "bg-white text-primary border border-primary/30 hover:bg-primary/5"
                }`}
              >
                <Sparkles className="size-3.5" />
                View JEE · NEET · AI/ML Streams
              </button>
            </div>
          </div>
        </div>

        {/* Class Stream Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-3.5 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <Sparkles className="size-3.5" />
              Target Class:
            </span>
            <span className="text-xs text-muted-foreground hidden sm:inline font-medium">
              Select student class cohort to monitor stream progress
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 p-1">
            {ageGroups.map((ag) => {
              const activeTab = selectedAge === ag.id;
              const isCompetitive = ag.id === "15-18";
              return (
                <button
                  key={ag.id}
                  onClick={() => setSelectedAge(ag.id as AgeGroupId)}
                  className={`relative rounded-md px-3.5 py-1.5 text-xs font-bold transition-all duration-150 ${
                    activeTab
                      ? "bg-white text-primary shadow-xs ring-1 ring-slate-200"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                  }`}
                >
                  <span className="inline-flex items-center gap-1.5">
                    {ag.label}
                    {isCompetitive && (
                      <span className="rounded bg-primary/10 px-1 py-0.2 text-[9.5px] font-black text-primary uppercase">
                        JEE · NEET · AI
                      </span>
                    )}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Class Stream KPIs */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label={`Enrolments (${currentAgeInfo?.label})`}
            value={total}
            change={9.1}
            icon={UsersRound}
            tone="maroon"
          />
          <KpiCard
            label={`Active Learners`}
            value={active}
            change={7.4}
            icon={BookOpenCheck}
            tone="green"
          />
          <KpiCard
            label={`Learning Hours`}
            value={hours}
            change={11.6}
            icon={Clock3}
            tone="maroon"
          />
          <KpiCard
            label={`Average Completion`}
            value={Number(avg.toFixed(1))}
            suffix="%"
            change={4.3}
            icon={CircleCheck}
            tone="amber"
          />
        </div>

        <SectionCard
          title={`State-Sponsored Learning Programs – ${currentAgeInfo?.label}`}
          subtitle={`${currentAgeInfo?.grade} · ${currentAgeInfo?.description} · Comprehensive stream curriculum analytics.`}
        >
          <ProgramCards programs={programs} detailed />
        </SectionCard>
      </div>
    </>
  );
}
