import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  AlertTriangle,
  ArrowUpDown,
  BookOpenCheck,
  CheckCircle2,
  FileCheck2,
  Filter,
  GraduationCap,
  Layers,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Target,
  TrendingUp,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EngagementVsAssessmentChart, ProgramAssessmentBarChart } from "@/components/mis/charts";
import { KpiCard } from "@/components/mis/kpi-card";
import { PageHeader } from "@/components/mis/page-header";
import { SectionCard } from "@/components/mis/section-card";
import {
  ageGroupOptions,
  districtOptions,
  timeOptions,
} from "@/features/mis/filter-options";
import {
  formatNumber,
  misService,
  type AgeGroupId,
  type AssessmentFilters,
} from "@/features/mis/mock-service";

export const Route = createFileRoute("/_authenticated/assessment-analytics")({
  head: () => ({
    meta: [
      { title: "Assessment Analytics | Maharashtra Learning MIS" },
      {
        name: "description",
        content:
          "Comprehensive assessment and academic outcome analytics across Age Groups, Districts, and Learning Programs for Maharashtra.",
      },
      {
        property: "og:title",
        content: "Assessment Analytics | Maharashtra Learning MIS",
      },
      {
        property: "og:description",
        content:
          "District and program-level assessment performance matrix, pass rates, and intervention areas.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AssessmentAnalyticsPage,
});

const defaultFilters: AssessmentFilters = {
  ageGroup: "all",
  district: "all",
  taluka: "all",
  program: "all",
  assessment: "all",
  period: "30d",
};

function AssessmentAnalyticsPage() {
  const navigate = useNavigate();
  const [filters, setFilters] = useState<AssessmentFilters>(defaultFilters);
  const [districtSearch, setDistrictSearch] = useState("");
  const [matrixSortField, setMatrixSortField] = useState<"averageScore" | "passRate" | "studentsAssessed">("averageScore");
  const [matrixSortAsc, setMatrixSortAsc] = useState(false);

  // Dynamic lists based on selected Age Group
  const availablePrograms = useMemo(() => {
    return misService.getPrograms(filters.ageGroup);
  }, [filters.ageGroup]);

  const availableAssessments = useMemo(() => {
    return misService.getAssessmentList(filters.ageGroup, filters.program);
  }, [filters.ageGroup, filters.program]);

  const availableTalukas = useMemo(() => {
    if (filters.district === "all") return [];
    return misService.getTalukas(filters.district);
  }, [filters.district]);

  // Dynamic calculations via mock service
  const kpis = useMemo(() => {
    return misService.getAssessmentMetrics(filters);
  }, [filters]);

  const matrixRows = useMemo(() => {
    const rows = misService.getAssessmentMatrix(filters);
    return [...rows].sort((a, b) => {
      const mult = matrixSortAsc ? 1 : -1;
      return (a[matrixSortField] - b[matrixSortField]) * mult;
    });
  }, [filters, matrixSortField, matrixSortAsc]);

  const districtAgeData = useMemo(() => {
    return misService.getDistrictAgePerformance();
  }, []);

  const filteredDistricts = useMemo(() => {
    return districtAgeData.filter((d) =>
      d.districtName.toLowerCase().includes(districtSearch.toLowerCase()),
    );
  }, [districtAgeData, districtSearch]);

  const areasOfConcern = useMemo(() => {
    return misService.getAreasOfConcern(filters.ageGroup);
  }, [filters.ageGroup]);

  // Program Chart Data
  const programChartData = useMemo(() => {
    return matrixRows.map((r) => ({
      name: r.programName,
      averageScore: r.averageScore,
      passRate: r.passRate,
    }));
  }, [matrixRows]);

  // Engagement vs Assessment data
  const scatterData = useMemo(() => {
    const districts = misService.getDistricts().slice(0, 10);
    return districts.map((d) => ({
      district: d.name,
      engagement: d.engagement,
      score: Number(Math.min(94, Math.max(52, d.engagement * 0.92 + 3)).toFixed(1)),
    }));
  }, []);

  const handleAgeChange = (val: string) => {
    setFilters((prev) => ({
      ...prev,
      ageGroup: val as AgeGroupId | "all",
      program: "all",
      assessment: "all",
    }));
  };

  const handleDistrictChange = (val: string) => {
    setFilters((prev) => ({
      ...prev,
      district: val,
      taluka: "all",
    }));
  };

  const handleResetFilters = () => {
    setFilters(defaultFilters);
    setDistrictSearch("");
  };

  return (
    <>
      <PageHeader
        title="Assessment Analytics & Academic Outcomes"
        subtitle="Holistic performance telemetry tracking assessment scores, pass thresholds, and academic diagnostics across Maharashtra."
      />

      <div className="space-y-6 p-4 sm:p-6 xl:p-8">
        {/* Filter Control Console */}
        <div className="rounded-xl border border-border bg-card p-4 shadow-xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border/60 pb-3">
            <div className="flex items-center gap-2">
              <Filter className="size-4 text-primary" />
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-800">
                Assessment Query Filters
              </h2>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={handleResetFilters}
              className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
            >
              <RotateCcw className="size-3.5" />
              Reset Filters
            </Button>
          </div>

          <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
            {/* Age Group Filter */}
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">
                Age Group
              </label>
              <Select value={filters.ageGroup} onValueChange={handleAgeChange}>
                <SelectTrigger className="mt-1 h-9 w-full rounded-lg bg-background text-xs font-medium">
                  <SelectValue placeholder="Age Group" />
                </SelectTrigger>
                <SelectContent>
                  {ageGroupOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="text-xs">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* District Filter */}
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">
                District
              </label>
              <Select value={filters.district} onValueChange={handleDistrictChange}>
                <SelectTrigger className="mt-1 h-9 w-full rounded-lg bg-background text-xs font-medium">
                  <SelectValue placeholder="District" />
                </SelectTrigger>
                <SelectContent>
                  {districtOptions.map((opt) => (
                    <SelectItem key={opt.value} value={opt.value} className="text-xs">
                      {opt.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Taluka Filter */}
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">
                Taluka
              </label>
              <Select
                value={filters.taluka}
                disabled={filters.district === "all"}
                onValueChange={(val) => setFilters((p) => ({ ...p, taluka: val }))}
              >
                <SelectTrigger className="mt-1 h-9 w-full rounded-lg bg-background text-xs font-medium">
                  <SelectValue placeholder="Taluka" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">All Talukas</SelectItem>
                  {availableTalukas.map((t) => (
                    <SelectItem key={t.name} value={t.name} className="text-xs">
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Program Filter */}
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">
                Learning Program
              </label>
              <Select
                value={filters.program}
                onValueChange={(val) => setFilters((p) => ({ ...p, program: val, assessment: "all" }))}
              >
                <SelectTrigger className="mt-1 h-9 w-full rounded-lg bg-background text-xs font-medium">
                  <SelectValue placeholder="Learning Program" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">All Programs</SelectItem>
                  {availablePrograms.map((p) => (
                    <SelectItem key={p.id} value={p.id} className="text-xs">
                      {p.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Assessment Test Filter */}
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">
                Assessment Test
              </label>
              <Select
                value={filters.assessment}
                onValueChange={(val) => setFilters((p) => ({ ...p, assessment: val }))}
              >
                <SelectTrigger className="mt-1 h-9 w-full rounded-lg bg-background text-xs font-medium">
                  <SelectValue placeholder="Assessment" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all" className="text-xs">All Assessments</SelectItem>
                  {availableAssessments.map((a) => (
                    <SelectItem key={a.id} value={a.id} className="text-xs truncate">
                      {a.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Time Period Filter */}
            <div>
              <label className="text-[11px] font-semibold text-muted-foreground">
                Time Period
              </label>
              <Select
                value={filters.period}
                onValueChange={(val) => setFilters((p) => ({ ...p, period: val }))}
              >
                <SelectTrigger className="mt-1 h-9 w-full rounded-lg bg-background text-xs font-medium">
                  <SelectValue placeholder="Time Period" />
                </SelectTrigger>
                <SelectContent>
                  {timeOptions.map((t) => (
                    <SelectItem key={t.value} value={t.value} className="text-xs">
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        {/* 6 Mandatory KPI Cards */}
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
          <KpiCard
            label="Assessment Attempts"
            value={kpis.attempts}
            change={14.2}
            icon={FileCheck2}
            tone="blue"
          />
          <KpiCard
            label="Students Assessed"
            value={kpis.studentsAssessed}
            change={8.6}
            icon={Users}
            tone="green"
          />
          <KpiCard
            label="Average Score"
            value={kpis.averageScore}
            suffix="%"
            change={3.2}
            icon={Target}
            tone="maroon"
          />
          <KpiCard
            label="Assessment Completion"
            value={kpis.completionRate}
            suffix="%"
            change={5.1}
            icon={CheckCircle2}
            tone="green"
          />
          <KpiCard
            label="Pass Rate"
            value={kpis.passRate}
            suffix="%"
            change={4.8}
            icon={GraduationCap}
            tone="amber"
          />
          <KpiCard
            label="Low Performance Students"
            value={kpis.lowPerformanceStudents}
            change={-6.4}
            icon={AlertTriangle}
            tone="red"
          />
        </div>

        {/* Assessment Performance Matrix Table */}
        <SectionCard
          title="Assessment Performance Matrix"
          subtitle="Cross-cohort academic benchmarks, completion rates, and proficiency distribution"
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <tr>
                  <th className="px-4 py-3.5">Age Group</th>
                  <th className="px-4 py-3.5">Learning Program</th>
                  <th
                    className="cursor-pointer px-4 py-3.5 hover:text-slate-950"
                    onClick={() => {
                      if (matrixSortField === "studentsAssessed") setMatrixSortAsc(!matrixSortAsc);
                      else {
                        setMatrixSortField("studentsAssessed");
                        setMatrixSortAsc(false);
                      }
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Students Assessed</span>
                      <ArrowUpDown className="size-3" />
                    </div>
                  </th>
                  <th
                    className="cursor-pointer px-4 py-3.5 hover:text-slate-950"
                    onClick={() => {
                      if (matrixSortField === "averageScore") setMatrixSortAsc(!matrixSortAsc);
                      else {
                        setMatrixSortField("averageScore");
                        setMatrixSortAsc(false);
                      }
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Average Score</span>
                      <ArrowUpDown className="size-3" />
                    </div>
                  </th>
                  <th className="px-4 py-3.5">Completion Rate</th>
                  <th
                    className="cursor-pointer px-4 py-3.5 hover:text-slate-950"
                    onClick={() => {
                      if (matrixSortField === "passRate") setMatrixSortAsc(!matrixSortAsc);
                      else {
                        setMatrixSortField("passRate");
                        setMatrixSortAsc(false);
                      }
                    }}
                  >
                    <div className="flex items-center gap-1.5">
                      <span>Pass Rate</span>
                      <ArrowUpDown className="size-3" />
                    </div>
                  </th>
                  <th className="px-4 py-3.5">Benchmark Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-white">
                {matrixRows.map((row) => (
                  <tr key={`${row.ageGroup}-${row.programId}`} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3.5">
                      <span className="inline-flex items-center rounded-md bg-slate-100 px-2 py-0.5 text-[11px] font-bold text-slate-800">
                        {row.ageGroupLabel}
                      </span>
                    </td>
                    <td className="px-4 py-3.5 font-bold text-slate-900">
                      {row.programName}
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-slate-700">
                      {formatNumber(row.studentsAssessed)}
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-2">
                        <span className="font-extrabold text-slate-900">{row.averageScore}%</span>
                        <div className="h-1.5 w-16 rounded-full bg-slate-100 overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              row.averageScore >= 75
                                ? "bg-emerald-500"
                                : row.averageScore >= 60
                                  ? "bg-amber-500"
                                  : "bg-rose-500"
                            }`}
                            style={{ width: `${row.averageScore}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 font-semibold text-slate-700">
                      {row.completionRate}%
                    </td>
                    <td className="px-4 py-3.5 font-extrabold text-slate-900">
                      {row.passRate}%
                    </td>
                    <td className="px-4 py-3.5">
                      <span
                        className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[10px] font-bold ${
                          row.benchmarkStatus === "On Track"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : row.benchmarkStatus === "Needs Attention"
                              ? "bg-amber-50 text-amber-700 border border-amber-200"
                              : "bg-rose-50 text-rose-700 border border-rose-200"
                        }`}
                      >
                        {row.benchmarkStatus}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>

        {/* 2 Charts Grid: Program-wise Bar Chart & Engagement vs Assessment */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <SectionCard
            title="Program-wise Assessment Performance"
            subtitle="Side-by-side comparison of Average Scores vs Pass Rates across active curriculum"
          >
            <ProgramAssessmentBarChart data={programChartData} />
          </SectionCard>

          <SectionCard
            title="Engagement vs Assessment Performance Correlation"
            subtitle="Evaluating how digital platform participation directly impacts exam outcomes"
          >
            <EngagementVsAssessmentChart data={scatterData} />
          </SectionCard>
        </div>

        {/* Academic / Performance Areas Requiring Attention */}
        <SectionCard
          title="Academic & Performance Areas Requiring Attention"
          subtitle="Identified curriculum gaps, concept bottlenecks, and high-impact interventions for state educators"
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            {areasOfConcern.map((area, idx) => (
              <div
                key={idx}
                className="flex flex-col justify-between rounded-xl border border-rose-200/80 bg-gradient-to-br from-rose-50/40 via-white to-orange-50/20 p-4 shadow-2xs"
              >
                <div>
                  <div className="flex items-center justify-between gap-2">
                    <span className="rounded-md bg-rose-100/80 px-2 py-0.5 text-[10px] font-bold text-rose-800">
                      {area.ageGroup}
                    </span>
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10px] font-extrabold ${
                        area.priority === "Urgent"
                          ? "bg-rose-600 text-white"
                          : "bg-amber-100 text-amber-800"
                      }`}
                    >
                      {area.priority} Priority
                    </span>
                  </div>
                  <h3 className="mt-2.5 text-xs font-bold text-slate-900 leading-snug">
                    {area.subject}
                  </h3>
                  <p className="mt-1.5 text-[11px] leading-relaxed text-slate-600">
                    {area.identifiedIssue}
                  </p>
                </div>

                <div className="mt-4 border-t border-rose-100 pt-3">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-[11px] font-medium text-slate-500">
                      Score: <b className="text-rose-700">{area.score}%</b>
                    </span>
                    <span className="text-[11px] font-medium text-slate-500">
                      Impacted: <b className="text-slate-800">{formatNumber(area.studentsImpacted)}</b>
                    </span>
                  </div>
                  <p className="mt-2 rounded-lg bg-white/90 p-2 text-[11px] font-semibold text-primary border border-slate-200/70">
                    💡 Action: {area.recommendedAction}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        {/* District × Age Group Performance Matrix */}
        <SectionCard
          title="District × Age Group Performance Matrix"
          subtitle="Comparative analysis across Age 6–10, Age 11–14, and Age 15–18 cohorts in 36 districts"
          action={
            <div className="relative w-64 sm:w-72">
              <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
              <Input
                value={districtSearch}
                onChange={(e) => setDistrictSearch(e.target.value)}
                placeholder="Filter districts..."
                className="h-9 rounded-lg border-slate-200 pl-9 text-xs shadow-xs focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
          }
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="border-b border-border bg-slate-50/75 text-[11px] font-bold uppercase tracking-wider text-slate-600">
                <tr>
                  <th className="px-4 py-3.5">District</th>
                  <th className="px-4 py-3.5 text-center bg-blue-50/40">
                    Age 6–10 (Score / Pass)
                  </th>
                  <th className="px-4 py-3.5 text-center bg-emerald-50/40">
                    Age 11–14 (Score / Pass)
                  </th>
                  <th className="px-4 py-3.5 text-center bg-amber-50/40">
                    Age 15–18 (Score / Pass)
                  </th>
                  <th className="px-4 py-3.5 text-right">Overall Score</th>
                  <th className="px-4 py-3.5 text-right">Pass Rate</th>
                  <th className="px-4 py-3.5 text-right">Total Tests</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border bg-white">
                {filteredDistricts.map((d) => (
                  <tr key={d.districtId} className="hover:bg-slate-50/70 transition-colors">
                    <td className="px-4 py-3 font-bold text-slate-900">
                      {d.districtName}
                    </td>
                    <td className="px-4 py-3 text-center bg-blue-50/20">
                      <span className="font-bold text-slate-900">{d.age6to10Score}%</span>
                      <span className="mx-1 text-slate-300">/</span>
                      <span className="font-semibold text-emerald-600">{d.age6to10PassRate}%</span>
                    </td>
                    <td className="px-4 py-3 text-center bg-emerald-50/20">
                      <span className="font-bold text-slate-900">{d.age11to14Score}%</span>
                      <span className="mx-1 text-slate-300">/</span>
                      <span className="font-semibold text-emerald-600">{d.age11to14PassRate}%</span>
                    </td>
                    <td className="px-4 py-3 text-center bg-amber-50/20">
                      <span className="font-bold text-slate-900">{d.age15to18Score}%</span>
                      <span className="mx-1 text-slate-300">/</span>
                      <span className="font-semibold text-emerald-600">{d.age15to18PassRate}%</span>
                    </td>
                    <td className="px-4 py-3 text-right font-extrabold text-slate-900">
                      {d.overallScore}%
                    </td>
                    <td className="px-4 py-3 text-right">
                      <span
                        className={`font-bold ${
                          d.overallPassRate >= 70
                            ? "text-emerald-600"
                            : d.overallPassRate >= 55
                              ? "text-amber-600"
                              : "text-rose-600"
                        }`}
                      >
                        {d.overallPassRate}%
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right font-semibold text-slate-600">
                      {formatNumber(d.attempts)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </SectionCard>
      </div>
    </>
  );
}
