import { createFileRoute } from "@tanstack/react-router";
import { BookOpenCheck, CircleCheck, Clock3, UsersRound } from "lucide-react";
import { KpiCard } from "@/components/mis/kpi-card";
import { PageHeader } from "@/components/mis/page-header";
import { ProgramCards } from "@/components/mis/program-cards";
import { SectionCard } from "@/components/mis/section-card";
import { misService } from "@/features/mis/mock-service";

export const Route = createFileRoute("/learning-programs")({
  head: () => ({
    meta: [
      { title: "Learning Programs | Maharashtra Learning MIS" },
      {
        name: "description",
        content:
          "Monitor AI and ML, NEET, and JEE digital learning programs delivered through Klassroom.",
      },
      {
        property: "og:title",
        content: "Learning Programs | Maharashtra Learning MIS",
      },
      {
        property: "og:description",
        content: "Performance overview for Maharashtra digital learning programs.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ProgramsPage,
});

function ProgramsPage() {
  const programs = misService.getPrograms();
  const total = programs.reduce((s, p) => s + p.enrolledStudents, 0);
  const active = programs.reduce((s, p) => s + p.activeStudents, 0);
  const hours = programs.reduce((s, p) => s + p.learningHours, 0);
  const avg = programs.reduce((s, p) => s + p.completion, 0) / programs.length;

  return (
    <>
      <PageHeader
        title="Learning Programs & Curriculum"
        subtitle="Monitor student enrollment, course progress, and engagement across career readiness streams."
      />
      <div className="space-y-6 p-4 sm:p-6 xl:p-8">
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Total Enrolments"
            value={total}
            change={9.1}
            icon={UsersRound}
            tone="blue"
          />
          <KpiCard
            label="Active Learners"
            value={active}
            change={7.4}
            icon={BookOpenCheck}
            tone="green"
          />
          <KpiCard
            label="Learning Hours"
            value={hours}
            change={11.6}
            icon={Clock3}
            tone="maroon"
          />
          <KpiCard
            label="Average Completion"
            value={avg}
            suffix="%"
            change={4.3}
            icon={CircleCheck}
            tone="amber"
          />
        </div>

        <SectionCard
          title="State-Sponsored Learning Programs"
          subtitle="Direct digital curriculum delivered in partnership with Klassroom for secondary & higher-secondary students."
        >
          <ProgramCards programs={programs} detailed />
        </SectionCard>
      </div>
    </>
  );
}
