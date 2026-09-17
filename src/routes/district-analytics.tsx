import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Clock3, GraduationCap, Target, UsersRound } from "lucide-react";
import { useState } from "react";
import { DistrictComparisonChart, EngagementTrendChart } from "@/components/mis/charts";
import { CourseEngagement } from "@/components/mis/course-engagement";
import { DistrictTable } from "@/components/mis/district-table";
import { FilterBar } from "@/components/mis/filter-bar";
import { KpiCard } from "@/components/mis/kpi-card";
import { MaharashtraMap } from "@/components/mis/maharashtra-map";
import { PageHeader } from "@/components/mis/page-header";
import { SectionCard } from "@/components/mis/section-card";
import { formatNumber, misService, type DashboardFilters } from "@/features/mis/mock-service";

export const Route = createFileRoute("/district-analytics")({
  validateSearch: (search: Record<string, unknown>) => ({ district: typeof search.district === "string" ? search.district : "nandurbar" }),
  head: () => ({ meta: [{ title: "District Analytics | Maharashtra Learning MIS" }, { name: "description", content: "District and taluka-level digital learning engagement analysis across Maharashtra." }, { property: "og:title", content: "District Analytics | Maharashtra Learning MIS" }, { property: "og:description", content: "District and taluka-level student engagement analysis." }, { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" }] }), component: DistrictAnalytics,
});

function DistrictAnalytics() {
  const search = Route.useSearch(); const navigate = useNavigate({ from: "/district-analytics" }); const initial: DashboardFilters = { district: search.district, taluka: "all", program: "all", studentType: "all", period: "30d" }; const [draft, setDraft] = useState(initial); const [filters, setFilters] = useState(initial); const district = misService.getDistrict(filters.district); const metrics = misService.getMetrics(filters); const districts = misService.getDistricts();
  const select = (id: string) => { const next = { ...filters, district: id, taluka: "all" }; setFilters(next); setDraft(next); navigate({ search: { district: id } }); };
  return <><PageHeader title="District Analytics" subtitle="Analyze student participation and learning engagement across districts and talukas." /><FilterBar compact draft={draft} setDraft={setDraft} onApply={() => { setFilters(draft); navigate({ search: { district: draft.district } }); }} onReset={() => { const reset = { ...initial, district: "nandurbar" }; setDraft(reset); setFilters(reset); navigate({ search: { district: "nandurbar" } }); }} />
    <div className="space-y-6 p-4 sm:p-6 xl:p-8"><div className="rounded-lg border border-primary/20 bg-primary-soft p-5"><p className="text-[10px] font-semibold uppercase text-primary">Selected District Summary</p><div className="mt-2 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"><div><h2 className="text-2xl font-bold">{district.name} District</h2><p className="mt-1 text-xs text-muted-foreground">Monitoring {district.talukas.length} representative talukas · Demo reporting period</p></div><div className="flex flex-wrap gap-x-6 gap-y-2 text-xs"><span><b>{formatNumber(metrics.totalStudents)}</b> Total Students</span><span><b>{formatNumber(metrics.activeStudents)}</b> Active</span><span><b>{metrics.engagement}%</b> Engagement</span><span><b>{formatNumber(metrics.learningHours)}</b> Hours</span></div></div></div>
    <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4"><KpiCard label="Total Students" value={metrics.totalStudents} change={7.2} icon={UsersRound} tone="blue" /><KpiCard label="Active Students" value={metrics.activeStudents} change={5.6} icon={GraduationCap} tone="green" /><KpiCard label="Engagement" value={metrics.engagement} suffix="%" change={district.engagement < 50 ? -2.1 : 3.1} icon={Target} tone={district.engagement < 50 ? "red" : "amber"} /><KpiCard label="Learning Hours" value={metrics.learningHours} change={9.3} icon={Clock3} tone="maroon" /></div>
    <SectionCard title="Maharashtra Engagement Map" subtitle="Select any district to update all analytics"><MaharashtraMap districts={districts} selectedId={district.id} onSelect={select} /></SectionCard>
    <div className="grid gap-6 xl:grid-cols-2"><SectionCard title="District Engagement Comparison" subtitle="Statewide comparison of priority districts"><DistrictComparisonChart data={districts.slice().sort((a,b) => b.engagement-a.engagement).slice(0,10).map(d => ({ name: d.name, engagement: d.engagement }))} /></SectionCard><SectionCard title="Taluka-wise Engagement" subtitle={`Current view for ${district.name}`}><DistrictComparisonChart data={district.talukas.map(t => ({ name: t.name, engagement: t.engagement }))} /></SectionCard></div>
    <div className="grid gap-6 xl:grid-cols-[0.7fr_1.3fr]"><SectionCard title="Course-wise Engagement" subtitle={`Learning programs in ${district.name}`}><CourseEngagement programs={misService.getFilteredPrograms(filters)} /></SectionCard><SectionCard title="6-month Engagement Trend" subtitle={`Monthly trend for ${district.name}`}><EngagementTrendChart data={misService.getTrend("6m", filters)} /></SectionCard></div>
    <SectionCard title="District Performance Table" subtitle="Select a row to change the district summary"><DistrictTable districts={districts} onSelect={select} /></SectionCard></div></>;
}
