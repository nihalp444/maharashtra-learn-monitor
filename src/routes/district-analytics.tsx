import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Clock3, GraduationCap, Target, UsersRound } from "lucide-react";
import { useState } from "react";
import {
  DistrictComparisonChart,
  EngagementTrendChart,
} from "@/components/mis/charts";
import { CourseEngagement } from "@/components/mis/course-engagement";
import { DistrictTable } from "@/components/mis/district-table";
import { FilterBar } from "@/components/mis/filter-bar";
import { KpiCard } from "@/components/mis/kpi-card";
import { MaharashtraMap } from "@/components/mis/maharashtra-map";
import { PageHeader } from "@/components/mis/page-header";
import { SectionCard } from "@/components/mis/section-card";
import {
  formatNumber,
  misService,
  type DashboardFilters,
} from "@/features/mis/mock-service";

export const Route = createFileRoute("/district-analytics")({
  validateSearch: (search: Record<string, unknown>) => ({
    district:
      typeof search["district"] === "string" ? search["district"] : "nandurbar",
  }),
  head: () => ({
    meta: [
      { title: "District Analytics | Maharashtra Learning MIS" },
      {
        name: "description",
        content:
          "District and taluka-level digital learning engagement analysis across Maharashtra.",
      },
      { property: "og:title", content: "District Analytics | Maharashtra Learning MIS" },
      {
        property: "og:description",
        content: "District and taluka-level student engagement analysis.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DistrictAnalytics,
});

function DistrictAnalytics() {
  const search = Route.useSearch();
  const navigate = useNavigate({ from: "/district-analytics" });
  const initial: DashboardFilters = {
    district: search.district,
    taluka: "all",
    program: "all",
    studentType: "all",
    period: "30d",
  };
  const [draft, setDraft] = useState(initial);
  const [filters, setFilters] = useState(initial);
  const district = misService.getDistrict(filters.district);
  const metrics = misService.getMetrics(filters);
  const districts = misService.getDistricts();

  if (!district) return null;

  const select = (id: string) => {
    const next = { ...filters, district: id, taluka: "all" };
    setFilters(next);
    setDraft(next);
    navigate({ search: { district: id } });
  };

  return (
    <>
      <PageHeader
        title="District & Taluka Analytics"
        subtitle="Deep dive into student participation, taluka distribution, and program penetration."
      />
      <FilterBar
        compact
        draft={draft}
        setDraft={setDraft}
        onApply={() => {
          setFilters(draft);
          navigate({ search: { district: draft.district } });
        }}
        onReset={() => {
          const reset = { ...initial, district: "nandurbar" };
          setDraft(reset);
          setFilters(reset);
          navigate({ search: { district: "nandurbar" } });
        }}
      />

      <div className="space-y-6 p-4 sm:p-6 xl:p-8">
        {/* District Focus Banner */}
        <div className="rounded-xl border border-blue-200/80 bg-gradient-to-r from-blue-900 via-indigo-900 to-blue-950 p-6 text-white shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <span className="inline-flex rounded-full bg-white/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider text-white">
                Active Inspection Zone
              </span>
              <h2 className="mt-2 text-2xl font-extrabold tracking-tight sm:text-3xl">
                {district.name} District
              </h2>
              <p className="mt-1 text-xs text-blue-200">
                Monitoring {district.talukas.length} administrative talukas across all learning programs
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3">
              <div className="rounded-lg bg-white/10 px-4 py-2.5 backdrop-blur-xs">
                <p className="text-[10px] font-semibold uppercase text-blue-200">
                  Total Students
                </p>
                <p className="text-base font-bold">
                  {formatNumber(metrics.totalStudents)}
                </p>
              </div>
              <div className="rounded-lg bg-white/10 px-4 py-2.5 backdrop-blur-xs">
                <p className="text-[10px] font-semibold uppercase text-blue-200">
                  Active Students
                </p>
                <p className="text-base font-bold">
                  {formatNumber(metrics.activeStudents)}
                </p>
              </div>
              <div className="rounded-lg bg-white/10 px-4 py-2.5 backdrop-blur-xs">
                <p className="text-[10px] font-semibold uppercase text-blue-200">
                  Engagement
                </p>
                <p className="text-base font-bold">{metrics.engagement}%</p>
              </div>
              <div className="rounded-lg bg-white/10 px-4 py-2.5 backdrop-blur-xs">
                <p className="text-[10px] font-semibold uppercase text-blue-200">
                  Learning Hours
                </p>
                <p className="text-base font-bold">
                  {formatNumber(metrics.learningHours)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* KPI Cards */}
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <KpiCard
            label="Total Students"
            value={metrics.totalStudents}
            change={7.2}
            icon={UsersRound}
            tone="blue"
          />
          <KpiCard
            label="Active Students"
            value={metrics.activeStudents}
            change={5.6}
            icon={GraduationCap}
            tone="green"
          />
          <KpiCard
            label="Engagement Rate"
            value={metrics.engagement}
            suffix="%"
            change={district.engagement < 50 ? -2.1 : 3.1}
            icon={Target}
            tone={district.engagement < 50 ? "red" : "amber"}
          />
          <KpiCard
            label="Learning Hours"
            value={metrics.learningHours}
            change={9.3}
            icon={Clock3}
            tone="maroon"
          />
        </div>

        {/* State Map */}
        <SectionCard
          title="Statewide District Navigation"
          subtitle="Click any district to switch local statistics instantly"
        >
          <MaharashtraMap
            districts={districts}
            selectedId={district.id}
            onSelect={select}
          />
        </SectionCard>

        {/* Comparisons */}
        <div className="grid gap-6 xl:grid-cols-2">
          <SectionCard
            title="Statewide District Ranking"
            subtitle="Comparing student engagement across top administrative zones"
          >
            <DistrictComparisonChart
              data={districts
                .slice()
                .sort((a, b) => b.engagement - a.engagement)
                .slice(0, 10)
                .map((d) => ({ name: d.name, engagement: d.engagement }))}
            />
          </SectionCard>

          <SectionCard
            title="Taluka Performance Breakdown"
            subtitle={`Sub-district engagement distribution for ${district.name}`}
          >
            <DistrictComparisonChart
              data={district.talukas.map((t) => ({
                name: t.name,
                engagement: t.engagement,
              }))}
            />
          </SectionCard>
        </div>

        {/* Trend & Program breakdown */}
        <div className="grid gap-6 xl:grid-cols-[0.8fr_1.2fr]">
          <SectionCard
            title="Course-wise Engagement"
            subtitle={`Enrolment and performance in ${district.name}`}
          >
            <CourseEngagement
              programs={misService.getFilteredPrograms(filters)}
            />
          </SectionCard>

          <SectionCard
            title="6-Month Engagement Trajectory"
            subtitle={`Trend over the last two academic quarters in ${district.name}`}
          >
            <EngagementTrendChart
              data={misService.getTrend("6m", filters)}
            />
          </SectionCard>
        </div>

        {/* District table */}
        <SectionCard
          title="All Districts Overview"
          subtitle="Click any row to switch active district view"
        >
          <DistrictTable districts={districts} onSelect={select} />
        </SectionCard>
      </div>
    </>
  );
}
