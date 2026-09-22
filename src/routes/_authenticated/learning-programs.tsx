import { createFileRoute } from "@tanstack/react-router";
import { BookOpenCheck, CircleCheck, Clock3, Sparkles, UsersRound } from "lucide-react";
import { useState } from "react";
import { KpiCard } from "@/components/mis/kpi-card";
import { PageHeader } from "@/components/mis/page-header";
import { ProgramCards } from "@/components/mis/program-cards";
import { SectionCard } from "@/components/mis/section-card";
import { misService, type AgeGroupId } from "@/features/mis/mock-service";

export const Route = createFileRoute("/learning-programs")({
  head: () => ({
    meta: [
      { title: "Learning Programs | Maharashtra Learning MIS" },
      {
        name: "description",
        content:
          "Monitor Foundational (6-10), Middle School (11-14), and Career Prep (15-18) digital learning programs delivered through Klassroom.",
      },
      {
        property: "og:title",
        content: "Learning Programs | Maharashtra Learning MIS",
      },
      {
        property: "og:description",
        content: "Performance overview for Maharashtra digital learning programs by age group.",
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
        {/* Age Group Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border bg-card p-3.5 shadow-xs">
          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary">
              <Sparkles className="size-3.5" />
              Target Cohort:
            </span>
            <span className="text-xs text-muted-foreground hidden sm:inline font-medium">
              Select student age group to view curriculum streams & live metrics
            </span>
          </div>
          <div className="flex items-center gap-1.5 rounded-lg bg-slate-100 p-1">
            {ageGroups.map((ag) => {
              const activeTab = selectedAge === ag.id;
              return (
                <button
                  key={ag.id}
                  onClick={() => setSelectedAge(ag.id as AgeGroupId)}
                  className={`rounded-md px-3.5 py-1.5 text-xs font-bold transition-all duration-150 ${
                    activeTab
                      ? "bg-white text-primary shadow-xs ring-1 ring-slate-200"
                      : "text-slate-600 hover:text-slate-900 hover:bg-white/60"
                  }`}
                >
                  {ag.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Age Group KPIs */}
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
          subtitle={`${currentAgeInfo?.grade} · ${currentAgeInfo?.description} · Direct digital curriculum via Klassroom.`}
        >
          <ProgramCards programs={programs} detailed />
        </SectionCard>
      </div>
    </>
  );
}
