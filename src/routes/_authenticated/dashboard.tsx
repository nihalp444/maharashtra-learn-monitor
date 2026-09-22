import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  Award,
  BookOpen,
  CheckCircle2,
  Clock3,
  GraduationCap,
  Search,
  Target,
  UsersRound,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CourseEngagement } from "@/components/mis/course-engagement";
import { DistrictTable } from "@/components/mis/district-table";
import { EngagementTrendChart } from "@/components/mis/charts";
import { FilterBar } from "@/components/mis/filter-bar";
import { KpiCard } from "@/components/mis/kpi-card";
import { MaharashtraMap } from "@/components/mis/maharashtra-map";
import { PageHeader } from "@/components/mis/page-header";
import { ProgramCards } from "@/components/mis/program-cards";
import { SectionCard } from "@/components/mis/section-card";
import {
  formatNumber,
  misService,
  type AgeGroupId,
  type DashboardFilters,
} from "@/features/mis/mock-service";
import { StudentDashboard } from "@/components/student/student-dashboard";
import {
  STUDENT_ACCOUNTS,
  isStudentUsername,
  type StudentProfile,
} from "@/features/student/student-data";
import { studentService } from "@/features/student/student-service";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/dashboard")({
  head: () => ({
    meta: [
      { title: "Maharashtra Digital Learning MIS" },
      {
        name: "description",
        content:
          "Government dashboard monitoring student digital learning and engagement across Maharashtra.",
      },
      { property: "og:title", content: "Maharashtra Digital Learning MIS" },
      {
        property: "og:description",
        content:
          "Student learning and engagement monitoring dashboard for Maharashtra.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: DashboardPage,
});

const defaults: DashboardFilters = {
  district: "all",
  taluka: "all",
  program: "all",
  studentType: "all",
  period: "30d",
};

function DashboardPage() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<{
    isStudent: boolean;
    studentProfile: StudentProfile | null;
  }>({
    isStudent: false,
    studentProfile: null,
  });

  useEffect(() => {
    // 1. Check local demo auth
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("mbocwwb-demo-auth");
      if (storedAuth && isStudentUsername(storedAuth)) {
        setCurrentUser({
          isStudent: true,
          studentProfile: STUDENT_ACCOUNTS[storedAuth],
        });
        return;
      } else if (storedAuth === "admin") {
        setCurrentUser({ isStudent: false, studentProfile: null });
        return;
      }
    }

    // 2. Check Supabase auth
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        const role = data.user.user_metadata?.role;
        if (role === "student") {
          const username = data.user.user_metadata?.username as string;
          const ageGroup = (data.user.user_metadata?.age_group as string) || "11-14";
          const profile =
            (username && isStudentUsername(username) && STUDENT_ACCOUNTS[username]) ||
            studentService.getStudentByAgeGroup(ageGroup as "6-10" | "11-14" | "15-18") ||
            STUDENT_ACCOUNTS["aarav11"];

          setCurrentUser({
            isStudent: true,
            studentProfile: profile,
          });
        }
      }
    });
  }, []);

  const [draft, setDraft] = useState(defaults);
  const [filters, setFilters] = useState(defaults);
  const [trendPeriod, setTrendPeriod] = useState<"6m" | "12m">("6m");
  const [districtSearch, setDistrictSearch] = useState("");
  const [selectedAgeGroup, setSelectedAgeGroup] = useState<AgeGroupId>("15-18");

  // If logged in as student, render dedicated student dashboard
  if (currentUser.isStudent && currentUser.studentProfile) {
    return <StudentDashboard student={currentUser.studentProfile} />;
  }

  const ageGroups = misService.getAgeGroups();
  const metrics = misService.getMetrics(filters);
  const programs = misService.getFilteredPrograms(filters, selectedAgeGroup);
  const districts = misService.getDistricts();
  const assessmentMetrics = misService.getAssessmentMetrics({
    ageGroup: selectedAgeGroup,
    district: filters.district,
    taluka: filters.taluka,
    program: filters.program,
    assessment: "all",
    period: filters.period,
  });
  const selectedDistrict = filters.district === "all" ? undefined : filters.district;

  const selectDistrict = (id: string) =>
    setFilters((v) => ({ ...v, district: id, taluka: "all" }));

  return (
    <>
      <PageHeader
        title="Digital Learning MIS"
        subtitle="Real-time monitoring of student participation, course progress, and academic outcomes across Maharashtra."
      />

      <FilterBar
        draft={draft}
        setDraft={setDraft}
        onApply={() => setFilters(draft)}
        onReset={() => {
          setDraft(defaults);
          setFilters(defaults);
        }}
      />

      <div className="space-y-6 p-4 sm:p-6 xl:p-8">
        {/* KPI Cards Grid */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <KpiCard
            label="Total Students"
            value={metrics.totalStudents}
            change={8.4}
            icon={UsersRound}
            tone="maroon"
          />
          <KpiCard
            label="Active Learners"
            value={metrics.activeStudents}
            change={6.8}
            icon={GraduationCap}
            tone="green"
          />
          <KpiCard
            label="Learning Hours"
            value={metrics.learningHours}
            change={12.3}
            icon={Clock3}
            tone="maroon"
          />
          <KpiCard
            label="Avg Engagement"
            value={metrics.engagement}
            suffix="%"
            change={3.6}
            icon={Target}
            tone="amber"
          />
          <KpiCard
            label="Low Engagement"
            value={metrics.lowEngagementStudents}
            change={-4.2}
            icon={UsersRound}
            tone="red"
          />
          <KpiCard
            label="Course Completion"
            value={metrics.courseCompletion}
            suffix="%"
            change={5.1}
            icon={Award}
            tone="green"
          />
        </div>

        {/* Learning Programs with Age-Group Selector */}
        <SectionCard
          title="Flagship Learning Programs"
          subtitle="Direct student learning enablement through the OTT platform - Klassroom."
          action={
            <div className="inline-flex items-center gap-1 rounded-xl bg-slate-100/90 p-1 border border-slate-200/60 shadow-2xs">
              {ageGroups.map((ag) => {
                const activeTab = selectedAgeGroup === ag.id;
                return (
                  <button
                    key={ag.id}
                    onClick={() => setSelectedAgeGroup(ag.id as AgeGroupId)}
                    className={`relative rounded-lg px-3.5 py-1.5 text-xs font-bold transition-all duration-200 ${
                      activeTab
                        ? "bg-white text-primary shadow-xs ring-1 ring-slate-200/80"
                        : "text-slate-600 hover:text-slate-900 hover:bg-white/50"
                    }`}
                  >
                    {ag.label}
                  </button>
                );
              })}
            </div>
          }
        >
          <ProgramCards programs={programs} />
        </SectionCard>

        {/* Compact Assessment Snapshot */}
        <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 p-5 shadow-sm">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200/60">
                <CheckCircle2 className="size-3.5" />
                Statewide Assessment Cycle 2025–26
              </div>
              <h2 className="mt-2 text-base font-extrabold text-slate-900 sm:text-lg">
                Assessment & Academic Performance Snapshot
              </h2>
              <p className="mt-0.5 text-xs text-slate-500">
                Unified tracking across primary, middle, and entrance readiness assessments in 36 districts
              </p>
            </div>
            <Button
              onClick={() => navigate({ to: "/assessment-analytics" })}
              className="gap-2 rounded-lg bg-primary font-semibold text-white shadow-sm hover:bg-primary/90"
            >
              <span>View Assessment Analytics</span>
              <ArrowRight className="size-4" />
            </Button>
          </div>

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Average Assessment Score
              </p>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">
                  {assessmentMetrics.averageScore}%
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  +3.8% MoM
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Benchmark target: 70.0%
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Assessment Completion
              </p>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">
                  {assessmentMetrics.completionRate}%
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  {formatNumber(assessmentMetrics.attempts)} tests
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Across registered learners
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Statewide Pass Rate
              </p>
              <div className="mt-1.5 flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">
                  {assessmentMetrics.passRate}%
                </span>
                <span className="text-xs font-bold text-emerald-600">
                  Healthy
                </span>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                Passing threshold: &gt; 50%
              </p>
            </div>

            <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
              <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                Top &amp; Focus Areas
              </p>
              <div className="mt-1 text-xs">
                <p className="font-bold text-emerald-700">
                  ★ Top: Foundational (84%)
                </p>
                <p className="mt-0.5 font-bold text-rose-600">
                  ⚠ Focus: JEE Mechanics (48%)
                </p>
              </div>
              <p className="mt-1 text-[11px] text-slate-500">
                4 priority intervention points
              </p>
            </div>
          </div>
        </div>

        {/* State Map */}
        <SectionCard
          title="Maharashtra Geographic Engagement Index"
          subtitle="Interactive district map tracking real-time student activity"
        >
          <MaharashtraMap
            districts={districts}
            {...(selectedDistrict ? { selectedId: selectedDistrict } : {})}
            onSelect={selectDistrict}
          />
        </SectionCard>

        {/* Trend & Course Engagement - 2 Grid Format */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SectionCard
            title="Student Engagement Trajectory"
            subtitle="Monthly cross-program participation trends"
            action={
              <div className="flex rounded-lg border border-slate-200 bg-slate-100 p-0.5">
                {(["6m", "12m"] as const).map((p) => (
                  <button
                    key={p}
                    onClick={() => setTrendPeriod(p)}
                    className={`rounded-md px-3 py-1.5 text-xs font-semibold transition-all ${trendPeriod === p
                      ? "bg-white text-slate-900 shadow-xs"
                      : "text-slate-600 hover:text-slate-900"
                      }`}
                  >
                    {p === "6m" ? "Last 6 Months" : "Full Academic Year"}
                  </button>
                ))}
              </div>
            }
          >
            <EngagementTrendChart
              data={misService.getTrend(trendPeriod, filters)}
            />
          </SectionCard>

          <SectionCard
            title="Course-wise Engagement Breakdown"
            subtitle="Current active progress across registered streams"
          >
            <CourseEngagement programs={programs} />
          </SectionCard>
        </div>

        {/* District Performance Table */}
        <SectionCard
          title="District Performance Leaderboard"
          subtitle="Rankings and metrics across all monitored districts"
          action={
            <div className="relative w-64 sm:w-72">
              <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
              <Input
                value={districtSearch}
                onChange={(e) => setDistrictSearch(e.target.value)}
                placeholder="Search districts..."
                className="h-9 rounded-lg border-slate-200 pl-9 text-xs shadow-xs focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          }
        >
          <DistrictTable
            districts={districts}
            limit={10}
            searchQuery={districtSearch}
            onSearchChange={setDistrictSearch}
            onSelect={(id) =>
              navigate({
                to: "/district-analytics",
                search: { district: id },
              })
            }
          />
        </SectionCard>

        {/* Areas Requiring Attention */}
        <SectionCard
          title="Priority Action & Intervention Areas"
          subtitle="Targeted insights for state education officers and field mentors"
        >
          <div className="grid gap-5 lg:grid-cols-3">
            <AttentionList
              title="Low Engagement Districts"
              items={districts
                .filter((d) => d.engagement < 50)
                .slice(0, 4)
                .map((d) => ({ name: d.name, value: `${d.engagement}%` }))}
            />
            <AttentionList
              title="Lowest Participation Ratio"
              items={[...districts]
                .sort(
                  (a, b) =>
                    a.activeStudents / a.totalStudents -
                    b.activeStudents / b.totalStudents,
                )
                .slice(0, 4)
                .map((d) => ({
                  name: d.name,
                  value: `${Math.round(
                    (d.activeStudents / d.totalStudents) * 100,
                  )}% active`,
                }))}
            />
            <div className="flex flex-col justify-between rounded-xl border border-blue-100 bg-gradient-to-br from-blue-50/70 to-indigo-50/50 p-5">
              <div>
                <div className="flex items-center gap-2 text-blue-900">
                  <BookOpen className="size-4" />
                  <h3 className="text-sm font-bold">State Strategic Summary</h3>
                </div>
                <ul className="mt-4 space-y-2.5 text-xs text-slate-700">
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-rose-500" />
                    <span>
                      <b>3 districts</b> have engagement below 50%
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-amber-500" />
                    <span>
                      <b>8 districts</b> have low student participation
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-rose-400" />
                    <span>
                      <b>5 districts</b> show declining engagement
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="size-1.5 rounded-full bg-emerald-500" />
                    <span>
                      <b>6 districts</b> show strong month-over-month growth
                    </span>
                  </li>
                </ul>
              </div>

              <Button
                className="mt-5 w-full rounded-lg bg-blue-900 font-semibold text-white shadow-sm hover:bg-blue-800"
                onClick={() =>
                  navigate({
                    to: "/district-analytics",
                    search: { district: selectedDistrict ?? "nandurbar" },
                  })
                }
              >
                Inspect Districts
              </Button>
            </div>
          </div>
        </SectionCard>
      </div>
    </>
  );
}

function AttentionList({
  title,
  items,
}: {
  title: string;
  items: { name: string; value: string }[];
}) {
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
      <h3 className="text-xs font-bold text-slate-900">{title}</h3>
      <div className="mt-3 divide-y divide-slate-100">
        {items.map((item, i) => (
          <div key={item.name} className="flex items-center justify-between py-2.5">
            <div className="flex items-center gap-2.5">
              <span className="grid size-6 place-items-center rounded-md bg-rose-50 text-[10px] font-bold text-rose-600">
                {i + 1}
              </span>
              <span className="text-xs font-medium text-slate-800">
                {item.name}
              </span>
            </div>
            <span className="text-xs font-bold text-rose-600">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
