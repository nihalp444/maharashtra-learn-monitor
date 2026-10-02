import {
  AlertTriangle,
  ArrowUpDown,
  Award,
  Building2,
  Calendar,
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Download,
  Eye,
  FileCheck,
  FilePlus,
  Filter,
  GraduationCap,
  HelpCircle,
  Layers,
  MapPin,
  Medal,
  Plus,
  RotateCcw,
  Search,
  SlidersHorizontal,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Trophy,
  User,
  Users,
  X,
} from "lucide-react";
import { useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DistrictComparisonChart } from "@/components/mis/charts";
import { KpiCard } from "@/components/mis/kpi-card";
import { MaharashtraMap } from "@/components/mis/maharashtra-map";
import { PageHeader } from "@/components/mis/page-header";
import { SectionCard } from "@/components/mis/section-card";
import { MAHARASHTRA_36_DISTRICTS } from "@/features/mis/maharashtra-districts-data";
import { districts as mockDistricts } from "@/features/mis/mock-data";
import {
  leadershipService,
  type DistrictLeadershipRow,
  type LeadershipAdminFilters,
  type TalukaLeadershipRow,
} from "@/features/leadership/leadership-service";
import type {
  LeaderboardEntry,
  ScholarshipApplication,
  ScholarshipProgram,
} from "@/features/leadership/leadership-models";

const DEFAULT_FILTERS: LeadershipAdminFilters = {
  state: "Maharashtra",
  district: "all",
  taluka: "all",
  ageGroup: "all",
  program: "all",
  assessment: "all",
  period: "30d",
};

export function AdminLeadership() {
  const [filters, setFilters] = useState<LeadershipAdminFilters>(DEFAULT_FILTERS);
  const [overviewMode, setOverviewMode] = useState<"chart" | "map">("chart");

  // District & Taluka Drilldown State
  const [selectedDrillDistrict, setSelectedDrillDistrict] = useState<string | null>(null);
  const [districtSearch, setDistrictSearch] = useState("");
  const [districtSortField, setDistrictSortField] = useState<keyof DistrictLeadershipRow>("averageScore");
  const [districtSortAsc, setDistrictSortAsc] = useState(false);
  const [districtPage, setDistrictPage] = useState(1);

  // Student Rankings State
  const [rankingScope, setRankingScope] = useState<"state" | "district" | "taluka">("state");
  const [top50Only, setTop50Only] = useState(false);
  const [rankingSearch, setRankingSearch] = useState("");

  // Scholarship Administration State
  const [scholarshipList, setScholarshipList] = useState<ScholarshipProgram[]>(() =>
    leadershipService.getScholarships()
  );
  const [isCreateScholarshipOpen, setIsCreateScholarshipOpen] = useState(false);
  const [isManageApplicationsOpen, setIsManageApplicationsOpen] = useState(false);
  const [selectedScholarshipForApps, setSelectedScholarshipForApps] = useState<string>("all");
  const [applications, setApplications] = useState<ScholarshipApplication[]>(() =>
    leadershipService.getApplications()
  );

  // New Scholarship Form
  const [newSchName, setNewSchName] = useState("");
  const [newSchScope, setNewSchScope] = useState<ScholarshipProgram["scope"]>("Statewide (Maharashtra)");
  const [newSchTopLimit, setNewSchTopLimit] = useState(50);
  const [newSchAgeGroup, setNewSchAgeGroup] = useState<"6-10" | "11-14" | "15-18">("15-18");
  const [newSchReward, setNewSchReward] = useState("₹15,000 Academic Grant + Learning Tablet");

  // Dynamic KPIs derived from service
  const kpis = useMemo(() => leadershipService.getAdminLeadershipKPIs(filters), [filters]);

  // District Rows derived from service
  const districtRows = useMemo(() => leadershipService.getDistrictLeadershipStats(filters), [filters]);

  // Filtered & Sorted District Rows
  const filteredDistricts = useMemo(() => {
    let list = districtRows.filter((d) =>
      d.name.toLowerCase().includes(districtSearch.toLowerCase()) ||
      d.division.toLowerCase().includes(districtSearch.toLowerCase())
    );

    list.sort((a, b) => {
      const aVal = a[districtSortField];
      const bVal = b[districtSortField];
      if (typeof aVal === "number" && typeof bVal === "number") {
        return districtSortAsc ? aVal - bVal : bVal - aVal;
      }
      return districtSortAsc
        ? String(aVal).localeCompare(String(bVal))
        : String(bVal).localeCompare(String(aVal));
    });

    return list;
  }, [districtRows, districtSearch, districtSortField, districtSortAsc]);

  const paginatedDistricts = useMemo(() => {
    const start = (districtPage - 1) * 10;
    return filteredDistricts.slice(start, start + 10);
  }, [filteredDistricts, districtPage]);

  // Taluka rows when a district is drilled down
  const talukaRows: TalukaLeadershipRow[] = useMemo(() => {
    if (!selectedDrillDistrict) return [];
    return leadershipService.getTalukaLeadershipStats(selectedDrillDistrict, filters);
  }, [selectedDrillDistrict, filters]);

  // Student Rankings
  const studentRankings = useMemo(() => {
    let list = leadershipService.getAdminStudentRankings(filters, rankingScope, top50Only);
    if (rankingSearch) {
      list = list.filter(
        (s) =>
          s.displayName.toLowerCase().includes(rankingSearch.toLowerCase()) ||
          s.studentId.toLowerCase().includes(rankingSearch.toLowerCase()) ||
          s.district.toLowerCase().includes(rankingSearch.toLowerCase()) ||
          s.taluka.toLowerCase().includes(rankingSearch.toLowerCase())
      );
    }
    return list;
  }, [filters, rankingScope, top50Only, rankingSearch]);

  // Chart data for Overview
  const comparisonData = useMemo(() => {
    return districtRows
      .slice(0, 12)
      .map((d) => ({ name: d.name, engagement: Math.round(d.averageScore) }));
  }, [districtRows]);

  // Handle District CSV Export
  const exportDistrictCsv = () => {
    const headers = [
      "District",
      "Division",
      "Eligible Students",
      "Participants",
      "Average Score (%)",
      "Top 50 Qualifiers",
      "Scholarship Applications",
      "Completion Rate (%)",
      "Status",
    ];
    const rows = filteredDistricts.map((d) => [
      d.name,
      d.division,
      d.eligibleStudents,
      d.participants,
      d.averageScore,
      d.top50Qualifiers,
      d.scholarshipApplications,
      d.completionRate,
      d.status,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Maharashtra_District_Leadership_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Student Rankings CSV Export
  const exportRankingsCsv = () => {
    const headers = [
      "Rank",
      "Student ID",
      "Name",
      "District",
      "Taluka",
      "Class",
      "Score (%)",
      "Percentile",
      "Scholarship Status",
    ];
    const rows = studentRankings.map((s) => [
      s.rank,
      s.studentId,
      s.displayName,
      s.district,
      s.taluka,
      s.ageGroup === "6-10"
        ? "Foundation Class 1st to 5th"
        : s.ageGroup === "11-14"
          ? "Class 6th to 9th"
          : "Class 10th to 12th",
      s.score,
      s.percentile,
      s.scholarshipStatus,
    ]);

    const csvContent =
      "data:text/csv;charset=utf-8," +
      [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `Maharashtra_Student_Rankings_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Handle Create Scholarship
  const handleCreateScholarship = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSchName) return;

    const newProg: ScholarshipProgram = {
      id: `sch-custom-${Date.now()}`,
      name: newSchName,
      tagline: `Configured by State Directorate for Age ${newSchAgeGroup}`,
      description: `Targeted merit grant for meritorious students with verified BOCW registration.`,
      eligibleAgeGroups: [newSchAgeGroup],
      eligibilityCriteria: [
        `Ranked within Top ${newSchTopLimit} under selected scope`,
        `Minimum 85% in official state assessment`,
        `Verified dependent of BOCW active registered worker`,
      ],
      associatedAssessmentId: "asm-configured",
      associatedAssessmentName: "Statewide Benchmark Assessment",
      scope: newSchScope,
      deadline: "30 Nov 2026",
      rewardDetails: {
        title: "Merit Recognition Award",
        amount: newSchReward,
        kitDescription: "Digital Tablet & Academic Book Set",
        certificate: "State Board Merit Certificate",
      },
      topLimit: newSchTopLimit,
      status: "Open",
      qualifyingCount: newSchTopLimit,
      applicationCount: 0,
      shortlistedCount: 0,
      awardedCount: 0,
      verificationStatus: "Active",
      isProposedDemo: true,
    };

    leadershipService.createScholarship(newProg);
    setScholarshipList([...leadershipService.getScholarships()]);
    setIsCreateScholarshipOpen(false);
    setNewSchName("");
  };

  // Handle Verify / Status update
  const handleApplicationAction = (appId: string, status: ScholarshipApplication["status"]) => {
    leadershipService.updateApplicationStatus(appId, status);
    setApplications([...leadershipService.getApplications()]);
    setScholarshipList([...leadershipService.getScholarships()]);
  };

  // Available talukas for selected district in filter bar
  const selectedDistrictDef = MAHARASHTRA_36_DISTRICTS.find(
    (d) => d.id === filters.district || d.name.toLowerCase() === filters.district.toLowerCase()
  );
  const talukasForDistrict = selectedDistrictDef ? selectedDistrictDef.talukas : [];

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 py-6">
      {/* 1. Page Header */}
      <PageHeader
        title="Maharashtra Leadership &amp; Student Rankings Monitoring"
        subtitle="Statewide government monitoring of student academic standings, district-level performance matrix, Top 50 merit qualifiers, and scholarship incentive programs."
        actions={
          <span className="inline-flex items-center gap-1.5 rounded-full bg-amber-100 px-3 py-1 text-xs font-bold text-amber-900 border border-amber-300 shadow-xs">
            <Trophy className="size-3.5 text-amber-700" />
            <span>Statewide MIS Leadership View</span>
          </span>
        }
      />

      {/* 2. Top Dynamic Filter Bar */}
      <section
        aria-label="Leadership Filters"
        className="rounded-2xl border border-slate-200/90 bg-white p-4 sm:p-5 shadow-xs"
      >
        <div className="flex items-center justify-between pb-3 mb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <SlidersHorizontal className="size-4 text-primary" />
            <span className="text-xs font-bold uppercase tracking-wider text-slate-700">
              Statewide Leadership Filters
            </span>
          </div>

          <Button
            size="sm"
            variant="ghost"
            onClick={() => setFilters(DEFAULT_FILTERS)}
            className="text-xs font-bold text-slate-500 hover:text-slate-900 h-8 flex items-center gap-1"
          >
            <RotateCcw className="size-3.5" />
            <span>Reset Filters</span>
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
          {/* 1. State Filter (Fixed: Maharashtra) */}
          <div className="space-y-1">
            <Label className="text-[11px] font-bold text-slate-600 uppercase">State</Label>
            <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-100 px-3 py-2 text-xs font-bold text-slate-800">
              <span>Maharashtra</span>
              <span className="rounded bg-primary text-white text-[9.5px] px-1.5 py-0.5 font-bold">
                Default
              </span>
            </div>
          </div>

          {/* 2. District Filter */}
          <div className="space-y-1">
            <Label className="text-[11px] font-bold text-slate-600 uppercase">District</Label>
            <Select
              value={filters.district}
              onValueChange={(val) => setFilters((prev) => ({ ...prev, district: val, taluka: "all" }))}
            >
              <SelectTrigger className="text-xs font-semibold h-9 bg-slate-50 border-slate-200">
                <SelectValue placeholder="All Districts" />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                <SelectItem value="all">All Districts (36)</SelectItem>
                {MAHARASHTRA_36_DISTRICTS.map((d) => (
                  <SelectItem key={d.id} value={d.id}>
                    {d.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 3. Taluka Filter (Dynamic based on selected district) */}
          <div className="space-y-1">
            <Label className="text-[11px] font-bold text-slate-600 uppercase">Taluka</Label>
            <Select
              value={filters.taluka}
              disabled={filters.district === "all"}
              onValueChange={(val) => setFilters((prev) => ({ ...prev, taluka: val }))}
            >
              <SelectTrigger className="text-xs font-semibold h-9 bg-slate-50 border-slate-200 disabled:opacity-50">
                <SelectValue placeholder={filters.district === "all" ? "Select district first" : "All Talukas"} />
              </SelectTrigger>
              <SelectContent className="max-h-60">
                <SelectItem value="all">All Talukas</SelectItem>
                {talukasForDistrict.map((t) => (
                  <SelectItem key={t} value={t}>
                    {t}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* 4. Class Filter */}
          <div className="space-y-1">
            <Label className="text-[11px] font-bold text-slate-600 uppercase">Class / Grade</Label>
            <Select
              value={filters.ageGroup}
              onValueChange={(val) => setFilters((prev) => ({ ...prev, ageGroup: val as any }))}
            >
              <SelectTrigger className="text-xs font-semibold h-9 bg-slate-50 border-slate-200">
                <SelectValue placeholder="All Classes" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Classes</SelectItem>
                <SelectItem value="6-10">Foundation Class 1st to 5th</SelectItem>
                <SelectItem value="11-14">Class 6th to 9th</SelectItem>
                <SelectItem value="15-18">Class 10th to 12th</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 5. Program Filter */}
          <div className="space-y-1">
            <Label className="text-[11px] font-bold text-slate-600 uppercase">Learning Program</Label>
            <Select
              value={filters.program}
              onValueChange={(val) => setFilters((prev) => ({ ...prev, program: val }))}
            >
              <SelectTrigger className="text-xs font-semibold h-9 bg-slate-50 border-slate-200">
                <SelectValue placeholder="All Programs" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Programs</SelectItem>
                <SelectItem value="foundational">Foundational Learning</SelectItem>
                <SelectItem value="math">Mathematics &amp; Numeracy</SelectItem>
                <SelectItem value="science">Science &amp; Exploration</SelectItem>
                <SelectItem value="digital-tech">Digital Skills &amp; Coding</SelectItem>
                <SelectItem value="ai-ml">AI &amp; Machine Learning</SelectItem>
                <SelectItem value="neet">NEET Preparation</SelectItem>
                <SelectItem value="jee">JEE Preparation</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* 6. Period Filter */}
          <div className="space-y-1">
            <Label className="text-[11px] font-bold text-slate-600 uppercase">Reporting Period</Label>
            <Select
              value={filters.period}
              onValueChange={(val) => setFilters((prev) => ({ ...prev, period: val }))}
            >
              <SelectTrigger className="text-xs font-semibold h-9 bg-slate-50 border-slate-200">
                <SelectValue placeholder="Reporting Period" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30d">Last 30 Days (Current Cycle)</SelectItem>
                <SelectItem value="q1">Quarter 1 2026</SelectItem>
                <SelectItem value="academic_year">Academic Year 2025–26</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </section>

      {/* 3. Statewide KPI Cards */}
      <section aria-labelledby="kpi-heading">
        <h2 id="kpi-heading" className="sr-only">Statewide Leadership KPIs</h2>
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-3 lg:grid-cols-6 sm:gap-4">
          <KpiCard
            label="Eligible Students"
            value={kpis.totalEligibleStudents}
            change={3.4}
            icon={Users}
            tone="blue"
          />
          <KpiCard
            label="Evaluated Students"
            value={kpis.studentsParticipated}
            change={4.8}
            icon={CheckCircle2}
            tone="green"
          />
          <KpiCard
            label="Completion Rate"
            value={kpis.assessmentCompletionRate}
            suffix="%"
            change={2.6}
            icon={GraduationCap}
            tone="green"
          />
          <KpiCard
            label="Average Score"
            value={kpis.averageAssessmentScore}
            suffix="%"
            change={3.8}
            icon={Award}
            tone="amber"
          />
          <KpiCard
            label="Top 50 Qualifiers"
            value={kpis.studentsInTop50}
            change={5.0}
            icon={Trophy}
            tone="maroon"
          />
          <KpiCard
            label="Scholarship Applications"
            value={kpis.scholarshipApplications}
            change={6.2}
            icon={FileCheck}
            tone="blue"
          />
        </div>
      </section>

      {/* 4. Maharashtra Leadership Overview (Map / Chart Toggle + District Insights) */}
      <section aria-labelledby="overview-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div>
            <h2 id="overview-heading" className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Building2 className="size-5 text-primary" />
              <span>Maharashtra Leadership Overview</span>
            </h2>
            <p className="text-xs text-slate-500">
              Statewide district-wise average assessment performance, participation benchmarks, and priority attention zones
            </p>
          </div>

          <div className="flex items-center gap-2">
            <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setOverviewMode("chart")}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition-all cursor-pointer ${overviewMode === "chart"
                    ? "bg-white text-primary shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                District Performance Chart
              </button>
              <button
                type="button"
                onClick={() => setOverviewMode("map")}
                className={`rounded-lg px-3 py-1 text-xs font-bold transition-all cursor-pointer ${overviewMode === "map"
                    ? "bg-white text-primary shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                Interactive Map View
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Main Visual: Chart or Map */}
          <div className="lg:col-span-2 rounded-2xl border border-slate-200/90 bg-white p-5 shadow-xs">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100 mb-3">
              <span className="text-xs font-bold text-slate-700">
                {overviewMode === "chart"
                  ? "Top 12 Districts by Assessment Average Score"
                  : "Maharashtra 36 Districts Geographic Engagement View"}
              </span>
              <div className="flex items-center gap-3 text-[11px] font-semibold text-slate-500">
                <span className="flex items-center gap-1">
                  <span className="size-2.5 rounded-full bg-emerald-600" />
                  <span>&gt;= 85% High</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-2.5 rounded-full bg-amber-500" />
                  <span>78–84% Moderate</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-2.5 rounded-full bg-rose-600" />
                  <span>&lt; 78% Needs Focus</span>
                </span>
              </div>
            </div>

            {overviewMode === "chart" ? (
              <DistrictComparisonChart data={comparisonData} />
            ) : (
              <MaharashtraMap
                districts={mockDistricts}
                selectedId={filters.district !== "all" ? filters.district : ""}
                onSelect={(id) => setFilters((prev) => ({ ...prev, district: id }))}
              />
            )}
          </div>

          {/* District Highlights & Attention Panels */}
          <div className="space-y-4 flex flex-col justify-between">
            {/* Top Performing Districts */}
            <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-emerald-950 flex items-center gap-1.5 uppercase tracking-wider">
                  <Trophy className="size-4 text-emerald-700" />
                  <span>Top Performing Districts</span>
                </span>
                <span className="text-[10px] font-bold text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                  High Merit
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {districtRows
                  .filter((d) => d.status === "Excellent")
                  .slice(0, 4)
                  .map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center justify-between rounded-xl bg-white p-2.5 border border-emerald-100 shadow-2xs"
                    >
                      <div>
                        <p className="font-bold text-slate-900">{d.name}</p>
                        <p className="text-[10.5px] text-slate-500">{d.division} Division · {d.top50Qualifiers} in Top 50</p>
                      </div>
                      <span className="font-black text-emerald-700 text-sm">{d.averageScore}%</span>
                    </div>
                  ))}
              </div>
            </div>

            {/* Districts Requiring Attention */}
            <div className="rounded-2xl border border-rose-200 bg-rose-50/50 p-4 space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-rose-950 flex items-center gap-1.5 uppercase tracking-wider">
                  <AlertTriangle className="size-4 text-rose-700" />
                  <span>Districts Requiring Attention</span>
                </span>
                <span className="text-[10px] font-bold text-rose-800 bg-rose-100 px-2 py-0.5 rounded-full">
                  Intervention Priority
                </span>
              </div>
              <div className="space-y-2 text-xs">
                {districtRows
                  .filter((d) => d.status === "Needs Attention")
                  .slice(0, 3)
                  .map((d) => (
                    <div
                      key={d.id}
                      className="flex items-center justify-between rounded-xl bg-white p-2.5 border border-rose-100 shadow-2xs"
                    >
                      <div>
                        <p className="font-bold text-slate-900">{d.name}</p>
                        <p className="text-[10.5px] text-slate-500">Lower participation rate ({d.completionRate}%)</p>
                      </div>
                      <span className="font-black text-rose-700 text-sm">{d.averageScore}%</span>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. District & Taluka Leadership Tables */}
      <section aria-labelledby="tables-heading" className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
        {selectedDrillDistrict ? (
          // TALUKA DRILLDOWN VIEW
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <div className="flex items-center gap-2 text-xs text-slate-500 font-semibold mb-1">
                  <button
                    type="button"
                    onClick={() => setSelectedDrillDistrict(null)}
                    className="hover:text-primary transition-colors cursor-pointer text-primary"
                  >
                    Maharashtra (Statewide)
                  </button>
                  <ChevronRight className="size-3.5" />
                  <span className="text-slate-900 font-bold">{selectedDrillDistrict} District</span>
                </div>
                <h3 className="text-base font-black text-slate-900">
                  Taluka-wise Leadership Statistics for {selectedDrillDistrict}
                </h3>
              </div>

              <Button
                size="sm"
                variant="outline"
                onClick={() => setSelectedDrillDistrict(null)}
                className="text-xs font-bold rounded-xl"
              >
                Back to All Districts
              </Button>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <tr>
                    <th scope="col" className="px-4 py-3">Taluka Name</th>
                    <th scope="col" className="px-4 py-3 text-right">Eligible Students</th>
                    <th scope="col" className="px-4 py-3 text-right">Participants</th>
                    <th scope="col" className="px-4 py-3 text-center">Average Score</th>
                    <th scope="col" className="px-4 py-3 text-center">Assessment Completion</th>
                    <th scope="col" className="px-4 py-3 text-center">Top Performers</th>
                    <th scope="col" className="px-4 py-3 text-center">Performance Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {talukaRows.map((t) => (
                    <tr key={t.name} className="hover:bg-slate-50/80 transition-colors">
                      <td className="px-4 py-3 font-bold text-slate-900">{t.name}</td>
                      <td className="px-4 py-3 text-right font-medium text-slate-600">
                        {t.eligibleStudents.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-800">
                        {t.participants.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center font-black text-slate-900">
                        {t.averageScore}%
                      </td>
                      <td className="px-4 py-3 text-center font-semibold text-slate-700">
                        {t.completionRate}%
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-amber-800">
                        <span className="bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {t.topPerformers} Students
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-bold ${t.performanceStatus === "High"
                              ? "bg-emerald-100 text-emerald-800"
                              : t.performanceStatus === "Moderate"
                                ? "bg-amber-100 text-amber-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                        >
                          {t.performanceStatus}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          // DISTRICT LEVEL TABLE
          <div className="space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
              <div>
                <h3 id="tables-heading" className="text-base font-black text-slate-900">
                  District-Level Leadership &amp; Assessment Performance Table
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">
                  Click on any district to inspect granular taluka-wise statistics
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="relative min-w-[200px]">
                  <Search className="absolute left-2.5 top-2.5 size-3.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search district / division..."
                    value={districtSearch}
                    onChange={(e) => {
                      setDistrictSearch(e.target.value);
                      setDistrictPage(1);
                    }}
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
                  />
                </div>

                <Button
                  size="sm"
                  variant="outline"
                  onClick={exportDistrictCsv}
                  className="text-xs font-bold text-slate-700 flex items-center gap-1.5 h-8 rounded-lg"
                >
                  <Download className="size-3.5" />
                  <span>Export CSV</span>
                </Button>
              </div>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <tr>
                    <th scope="col" className="px-4 py-3">District</th>
                    <th scope="col" className="px-4 py-3">Division</th>
                    <th scope="col" className="px-4 py-3 text-right">Eligible Students</th>
                    <th scope="col" className="px-4 py-3 text-right">Participants</th>
                    <th scope="col" className="px-4 py-3 text-center">Avg Score</th>
                    <th scope="col" className="px-4 py-3 text-center">Top 50 Qualifiers</th>
                    <th scope="col" className="px-4 py-3 text-center">Scholarship Apps</th>
                    <th scope="col" className="px-4 py-3 text-center">Trend</th>
                    <th scope="col" className="px-4 py-3 text-center">Status</th>
                    <th scope="col" className="px-4 py-3 text-right">Drilldown</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {paginatedDistricts.map((d) => (
                    <tr
                      key={d.id}
                      onClick={() => setSelectedDrillDistrict(d.name)}
                      className="hover:bg-amber-50/60 transition-colors cursor-pointer group"
                    >
                      <td className="px-4 py-3 font-bold text-slate-900 group-hover:text-primary">
                        {d.name}
                      </td>
                      <td className="px-4 py-3 text-slate-500">{d.division}</td>
                      <td className="px-4 py-3 text-right font-medium text-slate-600">
                        {d.eligibleStudents.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-right font-semibold text-slate-800">
                        {d.participants.toLocaleString()}
                      </td>
                      <td className="px-4 py-3 text-center font-black text-slate-900">
                        {d.averageScore}%
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="font-extrabold text-amber-900 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                          {d.top50Qualifiers}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center font-bold text-slate-800">
                        {d.scholarshipApplications}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className="text-[11px] font-bold text-emerald-700 flex items-center justify-center gap-0.5">
                          <TrendingUp className="size-3" />
                          <span>{d.trendValue}</span>
                        </span>
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span
                          className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${d.status === "Excellent"
                              ? "bg-emerald-100 text-emerald-800"
                              : d.status === "Satisfactory"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-rose-100 text-rose-800"
                            }`}
                        >
                          {d.status}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedDrillDistrict(d.name);
                          }}
                          className="h-7 text-xs font-bold text-primary group-hover:bg-primary group-hover:text-white"
                        >
                          View Talukas
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination Controls */}
            <div className="flex items-center justify-between text-xs text-slate-500 pt-2">
              <span>
                Showing {(districtPage - 1) * 10 + 1} to{" "}
                {Math.min(districtPage * 10, filteredDistricts.length)} of {filteredDistricts.length} districts
              </span>

              <div className="flex items-center gap-1.5">
                <Button
                  size="sm"
                  variant="outline"
                  disabled={districtPage === 1}
                  onClick={() => setDistrictPage((p) => p - 1)}
                  className="h-8 text-xs font-bold"
                >
                  Previous
                </Button>
                <span className="font-bold text-slate-800 px-2">Page {districtPage}</span>
                <Button
                  size="sm"
                  variant="outline"
                  disabled={districtPage * 10 >= filteredDistricts.length}
                  onClick={() => setDistrictPage((p) => p + 1)}
                  className="h-8 text-xs font-bold"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        )}
      </section>

      {/* 6. Student Leadership Rankings (Admin Detail Table) */}
      <section aria-labelledby="rankings-heading" className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 id="rankings-heading" className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Medal className="size-5 text-amber-500" />
              <span>Student Leadership Rankings (Admin Audit View)</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Authorized student performance audit, Top 50 merit list, and scholarship verification pipeline
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Scope Selector */}
            <div className="flex items-center rounded-xl bg-slate-100 p-1 border border-slate-200">
              <button
                type="button"
                onClick={() => setRankingScope("state")}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${rankingScope === "state"
                    ? "bg-white text-primary shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                Statewide
              </button>
              <button
                type="button"
                onClick={() => setRankingScope("district")}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${rankingScope === "district"
                    ? "bg-white text-primary shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                District Scope
              </button>
              <button
                type="button"
                onClick={() => setRankingScope("taluka")}
                className={`rounded-lg px-2.5 py-1 text-xs font-bold transition-all cursor-pointer ${rankingScope === "taluka"
                    ? "bg-white text-primary shadow-xs"
                    : "text-slate-600 hover:text-slate-900"
                  }`}
              >
                Taluka Scope
              </button>
            </div>

            {/* Top 50 Toggle */}
            <Button
              size="sm"
              variant={top50Only ? "default" : "outline"}
              onClick={() => setTop50Only(!top50Only)}
              className={`text-xs font-bold h-8 rounded-lg ${top50Only ? "bg-amber-600 text-white hover:bg-amber-700" : "border-slate-300"
                }`}
            >
              <Trophy className="size-3.5 mr-1" />
              <span>{top50Only ? "Showing Top 50" : "View Top 50"}</span>
            </Button>

            {/* Download Report */}
            <Button
              size="sm"
              variant="outline"
              onClick={exportRankingsCsv}
              className="text-xs font-bold text-slate-700 flex items-center gap-1.5 h-8 rounded-lg"
            >
              <Download className="size-3.5" />
              <span>Download Report</span>
            </Button>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-2.5 size-3.5 text-slate-400" />
          <input
            type="text"
            placeholder="Search by student identifier, district, or taluka..."
            value={rankingSearch}
            onChange={(e) => setRankingSearch(e.target.value)}
            className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>

        {/* Rankings Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200 max-h-96">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 sticky top-0 z-10">
              <tr>
                <th scope="col" className="px-4 py-3">Rank</th>
                <th scope="col" className="px-4 py-3">Student Identifier</th>
                <th scope="col" className="px-4 py-3">District</th>
                <th scope="col" className="px-4 py-3">Taluka</th>
                <th scope="col" className="px-4 py-3 text-center">Class</th>
                <th scope="col" className="px-4 py-3 text-center">Score</th>
                <th scope="col" className="px-4 py-3 text-center">Percentile</th>
                <th scope="col" className="px-4 py-3 text-center">Rank Movement</th>
                <th scope="col" className="px-4 py-3">Recognition Badges</th>
                <th scope="col" className="px-4 py-3 text-center">Scholarship Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {studentRankings.map((s) => (
                <tr
                  key={s.id}
                  className={`hover:bg-slate-50/80 transition-colors ${s.isCurrentUser ? "bg-amber-50/80 font-bold border-l-4 border-l-amber-500" : ""
                    }`}
                >
                  <td className="px-4 py-2.5 whitespace-nowrap font-black text-slate-900">
                    #{s.rank}
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap">
                    <p className="font-bold text-slate-900">{s.displayName}</p>
                    <p className="font-mono text-[10px] text-slate-500">{s.studentId}</p>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap text-slate-700">{s.district}</td>
                  <td className="px-4 py-2.5 whitespace-nowrap text-slate-600">{s.taluka}</td>
                  <td className="px-4 py-2.5 whitespace-nowrap text-center">
                    <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-700">
                      {s.ageGroup === "6-10"
                        ? "Foundation Class 1–5"
                        : s.ageGroup === "11-14"
                          ? "Class 6–9"
                          : "Class 10–12"}
                    </span>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap text-center font-black text-slate-900">
                    {s.score}%
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap text-center font-bold text-primary">
                    {s.percentile}%ile
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap text-center">
                    {s.rankMovement > 0 ? (
                      <span className="text-[10.5px] font-bold text-emerald-700 flex items-center justify-center">
                        <TrendingUp className="size-3 mr-0.5" />+{s.rankMovement}
                      </span>
                    ) : s.rankMovement < 0 ? (
                      <span className="text-[10.5px] font-bold text-rose-600 flex items-center justify-center">
                        <TrendingDown className="size-3 mr-0.5" />{s.rankMovement}
                      </span>
                    ) : (
                      <span className="text-slate-400 font-bold">-</span>
                    )}
                  </td>
                  <td className="px-4 py-2.5">
                    <div className="flex flex-wrap gap-1">
                      {s.badgesEarned.map((b) => (
                        <span
                          key={b}
                          className="rounded bg-purple-50 text-purple-700 px-1.5 py-0.5 text-[10px] font-semibold border border-purple-200"
                        >
                          {b}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-2.5 whitespace-nowrap text-center">
                    <span
                      className={`rounded-full px-2 py-0.5 text-[10.5px] font-bold ${s.scholarshipStatus === "Awarded"
                          ? "bg-emerald-100 text-emerald-800"
                          : s.scholarshipStatus === "Shortlisted"
                            ? "bg-purple-100 text-purple-800"
                            : s.scholarshipStatus === "Eligible"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-slate-100 text-slate-600"
                        }`}
                    >
                      {s.scholarshipStatus}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* 7. Scholarship & Incentive Administration */}
      <section aria-labelledby="sch-admin-heading" className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <div className="flex items-center gap-2">
              <h2 id="sch-admin-heading" className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                <GraduationCap className="size-5 text-primary" />
                <span>Scholarship &amp; Incentive Administration</span>
              </h2>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-900 border border-amber-300">
                DEMO SIMULATION
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Configure incentive schemes, verify student applications, and approve merit honors
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsManageApplicationsOpen(true)}
              className="text-xs font-bold border-purple-300 bg-purple-50 text-purple-900 hover:bg-purple-100 flex items-center gap-1.5"
            >
              <FileCheck className="size-3.5 text-purple-700" />
              <span>Review Applications ({applications.length})</span>
            </Button>
            <Button
              size="sm"
              onClick={() => setIsCreateScholarshipOpen(true)}
              className="bg-primary hover:bg-primary/90 text-white font-bold text-xs flex items-center gap-1.5 rounded-lg shadow-xs"
            >
              <Plus className="size-3.5" />
              <span>Configure New Scholarship</span>
            </Button>
          </div>
        </div>

        {/* Scholarships Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th scope="col" className="px-4 py-3">Scheme Name</th>
                <th scope="col" className="px-4 py-3">Target Classes</th>
                <th scope="col" className="px-4 py-3">Scope</th>
                <th scope="col" className="px-4 py-3 text-center">Top Quota</th>
                <th scope="col" className="px-4 py-3 text-center">Applications</th>
                <th scope="col" className="px-4 py-3 text-center">Shortlisted</th>
                <th scope="col" className="px-4 py-3 text-center">Awarded</th>
                <th scope="col" className="px-4 py-3 text-center">Status</th>
                <th scope="col" className="px-4 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {scholarshipList.map((sch) => (
                <tr key={sch.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-900">{sch.name}</p>
                    <p className="text-[10.5px] text-slate-500">{sch.rewardDetails.amount}</p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex flex-wrap gap-1">
                      {sch.eligibleAgeGroups.map((ag) => (
                        <span key={ag} className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] font-bold text-slate-700">
                          {ag === "6-10"
                            ? "Foundation Class 1–5"
                            : ag === "11-14"
                              ? "Class 6–9"
                              : "Class 10–12"}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-700 font-medium">
                    {sch.scope}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center font-bold text-amber-900">
                    Top {sch.topLimit}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center font-semibold text-slate-800">
                    {sch.applicationCount}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center font-bold text-purple-700">
                    {sch.shortlistedCount}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center font-bold text-emerald-700">
                    {sch.awardedCount}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10.5px] font-bold text-emerald-800">
                      {sch.verificationStatus}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => {
                        setSelectedScholarshipForApps(sch.id);
                        setIsManageApplicationsOpen(true);
                      }}
                      className="text-xs font-bold text-primary hover:bg-primary/10 h-7"
                    >
                      View Apps
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* DIALOG 1: Configure New Scholarship */}
      <Dialog open={isCreateScholarshipOpen} onOpenChange={setIsCreateScholarshipOpen}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FilePlus className="size-5 text-primary" />
              <span>Configure New Scholarship / Incentive Program</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-600">
              Define state or district level merit award criteria for student participants
            </DialogDescription>
          </DialogHeader>

          <form onSubmit={handleCreateScholarship} className="space-y-3.5 text-xs">
            <div className="space-y-1">
              <Label className="text-xs font-bold text-slate-700">Scholarship / Award Title</Label>
              <Input
                placeholder="e.g. Maharashtra Digital Learning Merit Incentive 2026"
                value={newSchName}
                onChange={(e) => setNewSchName(e.target.value)}
                required
                className="text-xs"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-bold text-slate-700">Ranking Scope</Label>
                <Select value={newSchScope} onValueChange={(val: any) => setNewSchScope(val)}>
                  <SelectTrigger className="text-xs h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Statewide (Maharashtra)">Statewide (Maharashtra)</SelectItem>
                    <SelectItem value="District Level">District Level</SelectItem>
                    <SelectItem value="Taluka Level">Taluka Level</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-bold text-slate-700">Eligible Class</Label>
                <Select value={newSchAgeGroup} onValueChange={(val: any) => setNewSchAgeGroup(val)}>
                  <SelectTrigger className="text-xs h-9">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6-10">Foundation Class 1st to 5th</SelectItem>
                    <SelectItem value="11-14">Class 6th to 9th</SelectItem>
                    <SelectItem value="15-18">Class 10th to 12th</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs font-bold text-slate-700">Top Quota Limit</Label>
                <Input
                  type="number"
                  min={5}
                  max={100}
                  value={newSchTopLimit}
                  onChange={(e) => setNewSchTopLimit(Number(e.target.value))}
                  className="text-xs"
                />
              </div>

              <div className="space-y-1">
                <Label className="text-xs font-bold text-slate-700">Proposed Grant Amount</Label>
                <Input
                  value={newSchReward}
                  onChange={(e) => setNewSchReward(e.target.value)}
                  className="text-xs"
                />
              </div>
            </div>

            <div className="rounded-xl border border-amber-200 bg-amber-50/70 p-3 text-amber-950 text-[11px] leading-relaxed">
              💡 The scholarship will be saved in demo memory and immediately made available to matching student accounts for application.
            </div>

            <DialogFooter className="pt-2">
              <Button type="button" variant="outline" size="sm" onClick={() => setIsCreateScholarshipOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" size="sm" className="bg-primary hover:bg-primary/95 text-white font-bold">
                Publish Scheme (Demo)
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* DIALOG 2: Review Applications */}
      <Dialog open={isManageApplicationsOpen} onOpenChange={setIsManageApplicationsOpen}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileCheck className="size-5 text-primary" />
              <span>Review Student Scholarship Applications</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-600">
              Verify attached documents and approve shortlisted students
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3">
            {/* Filter by Scheme */}
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 text-xs">
              <div className="flex items-center gap-2">
                <span className="font-bold text-slate-700">Filter Scheme:</span>
                <Select
                  value={selectedScholarshipForApps}
                  onValueChange={(val) => setSelectedScholarshipForApps(val)}
                >
                  <SelectTrigger className="text-xs h-8 w-60">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Scholarship Schemes</SelectItem>
                    {scholarshipList.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <span className="text-[11px] text-slate-500 font-semibold">
                {applications.filter((a) => selectedScholarshipForApps === "all" || a.scholarshipId === selectedScholarshipForApps).length} Total Submissions
              </span>
            </div>

            <div className="overflow-x-auto rounded-xl border border-slate-200 max-h-80">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[10.5px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200 sticky top-0">
                  <tr>
                    <th scope="col" className="px-3 py-2.5">App ID</th>
                    <th scope="col" className="px-3 py-2.5">Student</th>
                    <th scope="col" className="px-3 py-2.5">District / Taluka</th>
                    <th scope="col" className="px-3 py-2.5 text-center">Score / Rank</th>
                    <th scope="col" className="px-3 py-2.5">Attached Document</th>
                    <th scope="col" className="px-3 py-2.5 text-center">Status</th>
                    <th scope="col" className="px-3 py-2.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {applications
                    .filter((a) => selectedScholarshipForApps === "all" || a.scholarshipId === selectedScholarshipForApps)
                    .map((app) => (
                      <tr key={app.id} className="hover:bg-slate-50/80">
                        <td className="px-3 py-2 font-mono font-bold text-slate-800 text-[11px]">
                          {app.id}
                        </td>
                        <td className="px-3 py-2">
                          <p className="font-bold text-slate-900">{app.studentName}</p>
                          <p className="font-mono text-[10px] text-slate-500">{app.studentId}</p>
                        </td>
                        <td className="px-3 py-2 text-slate-600 text-[11px]">
                          {app.taluka}, {app.district}
                        </td>
                        <td className="px-3 py-2 text-center">
                          <span className="font-black text-slate-900 block">{app.score}%</span>
                          <span className="text-[10px] font-bold text-amber-800">Rank #{app.rank}</span>
                        </td>
                        <td className="px-3 py-2">
                          <span className="rounded bg-slate-100 px-1.5 py-0.5 text-[10px] text-slate-700 font-mono block truncate max-w-[140px]">
                            📄 {app.documentUploaded}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-center whitespace-nowrap">
                          <span
                            className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${app.status === "Awarded"
                                ? "bg-emerald-100 text-emerald-800"
                                : app.status === "Shortlisted" || app.status === "Approved"
                                  ? "bg-purple-100 text-purple-800"
                                  : "bg-amber-100 text-amber-800"
                              }`}
                          >
                            {app.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 text-right whitespace-nowrap">
                          <div className="flex items-center justify-end gap-1">
                            {app.status === "Under Review" && (
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleApplicationAction(app.id, "Shortlisted")}
                                className="h-6 px-2 text-[10.5px] font-bold text-purple-700 border-purple-300 hover:bg-purple-50"
                              >
                                Shortlist
                              </Button>
                            )}
                            {(app.status === "Shortlisted" || app.status === "Approved") && (
                              <Button
                                size="sm"
                                onClick={() => handleApplicationAction(app.id, "Awarded")}
                                className="h-6 px-2 text-[10.5px] font-bold bg-emerald-700 hover:bg-emerald-800 text-white"
                              >
                                Award
                              </Button>
                            )}
                            {app.status === "Awarded" && (
                              <span className="text-[10px] font-bold text-emerald-700 flex items-center gap-0.5">
                                <CheckCircle2 className="size-3" />
                                <span>Disbursed</span>
                              </span>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button size="sm" onClick={() => setIsManageApplicationsOpen(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
