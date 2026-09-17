import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Award, BookOpen, Clock3, GraduationCap, Target, UsersRound } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { CourseEngagement } from "@/components/mis/course-engagement";
import { DistrictTable } from "@/components/mis/district-table";
import { EngagementTrendChart } from "@/components/mis/charts";
import { FilterBar } from "@/components/mis/filter-bar";
import { KpiCard } from "@/components/mis/kpi-card";
import { MaharashtraMap } from "@/components/mis/maharashtra-map";
import { PageHeader } from "@/components/mis/page-header";
import { ProgramCards } from "@/components/mis/program-cards";
import { SectionCard } from "@/components/mis/section-card";
import { misService, type DashboardFilters } from "@/features/mis/mock-service";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "Maharashtra Digital Learning MIS" },
    { name: "description", content: "Government dashboard monitoring student digital learning and engagement across Maharashtra." },
    { property: "og:title", content: "Maharashtra Digital Learning MIS" },
    { property: "og:description", content: "Student learning and engagement monitoring dashboard for Maharashtra." },
    { property: "og:type", content: "website" }, { name: "twitter:card", content: "summary_large_image" },
  ] }), component: DashboardPage,
});

const defaults: DashboardFilters = { district: "all", taluka: "all", program: "all", studentType: "all", period: "30d" };

function DashboardPage() {
  const navigate = useNavigate(); const [draft, setDraft] = useState(defaults); const [filters, setFilters] = useState(defaults); const [trendPeriod, setTrendPeriod] = useState<"6m" | "12m">("6m");
  const metrics = misService.getMetrics(filters); const programs = misService.getFilteredPrograms(filters); const districts = misService.getDistricts(); const selectedDistrict = filters.district === "all" ? undefined : filters.district;
  const selectDistrict = (id: string) => setFilters(v => ({ ...v, district: id, taluka: "all" }));
  return <>
    <PageHeader title="Monitoring Dashboard" subtitle="Statewide view of student participation, learning progress and engagement outcomes." actions={<div className="text-left xl:text-right"><p className="text-[10px] font-semibold uppercase text-muted-foreground">Last updated</p><p className="mt-1 text-xs font-medium">17 Sep 2026 · 03:30 PM IST</p></div>} />
    <FilterBar draft={draft} setDraft={setDraft} onApply={() => setFilters(draft)} onReset={() => { setDraft(defaults); setFilters(defaults); }} />
    <div className="space-y-4 p-4 sm:p-5 xl:p-6">
      <div className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6"><KpiCard label="Total Students" value={metrics.totalStudents} change={8.4} icon={UsersRound} tone="blue" /><KpiCard label="Active Students" value={metrics.activeStudents} change={6.8} icon={GraduationCap} tone="green" /><KpiCard label="Total Learning Hours" value={metrics.learningHours} change={12.3} icon={Clock3} tone="maroon" /><KpiCard label="Average Engagement" value={metrics.engagement} suffix="%" change={3.6} icon={Target} tone="amber" /><KpiCard label="Low Engagement Students" value={metrics.lowEngagementStudents} change={-4.2} icon={UsersRound} tone="red" /><KpiCard label="Course Completion" value={metrics.courseCompletion} suffix="%" change={5.1} icon={Award} tone="green" /></div>
      <SectionCard title="Learning Programs" subtitle="Access digital learning content through our partner Klassroom and track student engagement across Maharashtra."><ProgramCards programs={programs} /></SectionCard>
      <SectionCard title="Maharashtra District-wise Student Engagement" subtitle="Representative district visualization based on demo engagement values"><MaharashtraMap districts={districts} {...(selectedDistrict ? { selectedId: selectedDistrict } : {})} onSelect={selectDistrict} /></SectionCard>
      <div className="grid gap-6 2xl:grid-cols-[1.55fr_0.75fr]"><SectionCard title="Student Engagement Trend" subtitle="Monthly engagement by learning program" action={<div className="flex rounded-md border border-border p-0.5">{(["6m","12m"] as const).map(p => <button key={p} onClick={() => setTrendPeriod(p)} className={`rounded-sm px-3 py-1.5 text-[10px] font-semibold ${trendPeriod === p ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-accent"}`}>{p === "6m" ? "Last 6 Months" : "Last 12 Months"}</button>)}</div>}><EngagementTrendChart data={misService.getTrend(trendPeriod, filters)} /></SectionCard><SectionCard title="Course-wise Engagement" subtitle="Enrolment and current engagement"><CourseEngagement programs={programs} /></SectionCard></div>
      <SectionCard title="District Performance" subtitle="Search, sort and select a district for detailed analysis"><DistrictTable districts={districts} limit={10} onSelect={id => navigate({ to: "/district-analytics", search: { district: id } })} /></SectionCard>
      <SectionCard title="Areas Requiring Attention" subtitle="Priority indicators to support targeted district interventions"><div className="grid gap-5 lg:grid-cols-3"><AttentionList title="Low Engagement Districts" items={districts.filter(d => d.engagement < 50).slice(0,4).map(d => ({ name: d.name, value: `${d.engagement}%` }))} /><AttentionList title="Low Student Participation" items={[...districts].sort((a,b) => a.activeStudents/a.totalStudents - b.activeStudents/b.totalStudents).slice(0,4).map(d => ({ name: d.name, value: `${Math.round(d.activeStudents/d.totalStudents*100)}% active` }))} /><div className="rounded-md border border-primary/20 bg-primary-soft p-5"><div className="flex items-center gap-2 text-primary"><BookOpen className="size-4" /><h3 className="text-sm font-bold">Focus Areas</h3></div><ul className="mt-4 space-y-3 text-xs"><li><b>3 districts</b> have engagement below 50%</li><li><b>8 districts</b> have low student participation</li><li><b>5 districts</b> show declining engagement</li><li><b>6 districts</b> show improving engagement</li></ul><Button className="mt-5 w-full" onClick={() => navigate({ to: "/district-analytics", search: { district: "nandurbar" } })}>View Detailed Analysis</Button></div></div></SectionCard>
    </div>
  </>;
}

function AttentionList({ title, items }: { title: string; items: { name: string; value: string }[] }) { return <div className="rounded-sm border border-border p-3"><h3 className="text-xs font-bold">{title}</h3><div className="mt-2 divide-y divide-border">{items.map((item, i) => <div key={item.name} className="flex items-center justify-between py-2"><div className="flex items-center gap-2"><span className="grid size-5 place-items-center rounded-sm bg-destructive-soft text-[9px] font-bold text-destructive">{i+1}</span><span className="text-[11px] font-medium">{item.name}</span></div><span className="text-[11px] font-bold text-destructive">{item.value}</span></div>)}</div></div>; }
