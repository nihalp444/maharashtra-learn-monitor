import {
  AlertCircle,
  Award,
  Calendar,
  CheckCircle2,
  Clock,
  ExternalLink,
  FileCheck,
  FileText,
  GraduationCap,
  HelpCircle,
  Layers,
  LineChart as LineChartIcon,
  PlayCircle,
  PlusCircle,
  Send,
  Sparkles,
  TrendingUp,
  Trophy,
  Upload,
  User,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
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
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import type { StudentProfile } from "@/features/student/student-data";
import { leadershipService } from "@/features/leadership/leadership-service";
import type {
  AvailableAssessment,
  CompletedAssessmentResult,
  ScholarshipProgram,
} from "@/features/leadership/leadership-models";
import { useI18n } from "@/i18n";

interface AssessmentsScholarshipsPageProps {
  student: StudentProfile;
}

export function AssessmentsScholarshipsPage({ student }: AssessmentsScholarshipsPageProps) {
  const { t } = useI18n();
  const [upcomingList, setUpcomingList] = useState<AvailableAssessment[]>(() =>
    leadershipService.getUpcomingAssessments(student.ageGroup)
  );
  const [resultsList, setResultsList] = useState<CompletedAssessmentResult[]>(() =>
    leadershipService.getStudentResults(student.username)
  );
  const [scholarships, setScholarships] = useState<ScholarshipProgram[]>(() =>
    leadershipService.getScholarships()
  );

  // Active Modals
  const [selectedUpcoming, setSelectedUpcoming] = useState<AvailableAssessment | null>(null);
  const [selectedResult, setSelectedResult] = useState<CompletedAssessmentResult | null>(null);
  const [selectedScholarship, setSelectedScholarship] = useState<ScholarshipProgram | null>(null);
  const [applyModalScholarship, setApplyModalScholarship] = useState<ScholarshipProgram | null>(null);

  // Application Form State
  const [uploadedDocName, setUploadedDocName] = useState<string>("BOCW_Dependent_Card.pdf");
  const [extraRemarks, setExtraRemarks] = useState("");
  const [submissionSuccessId, setSubmissionSuccessId] = useState<string | null>(null);

  // Extract district and taluka
  const districtName =
    student.schoolDistrict.replace(" District", "") ||
    (student.ageGroup === "6-10" ? "Pune" : student.ageGroup === "11-14" ? "Nashik" : "Nagpur");
  const talukaName =
    student.ageGroup === "6-10" ? "Haveli" : student.ageGroup === "11-14" ? "Dindori" : "Nagpur Rural";

  // Prepare chart data for Score Improvement over Time
  const chartData = resultsList
    .slice()
    .reverse()
    .map((r) => ({
      date: r.completionDate.split(" ").slice(0, 2).join(" "),
      score: r.score,
      percentile: r.percentile,
      title: r.title,
    }));

  const handleApplySubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!applyModalScholarship) return;

    const latestResult = resultsList[0] || { score: 90, percentile: 95, rank: 5 };

    const newApp = leadershipService.submitScholarshipApplication({
      scholarshipId: applyModalScholarship.id,
      scholarshipName: applyModalScholarship.name,
      studentId: student.studentId,
      studentName: `${student.displayName} (Registered Account)`,
      ageGroup: student.ageGroup,
      district: districtName,
      taluka: talukaName,
      score: latestResult.score,
      percentile: latestResult.percentile,
      rank: latestResult.rank,
      documentUploaded: uploadedDocName,
      remarks: extraRemarks || "Submitted through Student Portal with verified BOCW registration.",
    });

    setSubmissionSuccessId(newApp.id);
    setScholarships([...leadershipService.getScholarships()]);
  };

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 py-6">
      {/* 1. Header Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-[#8B0012] via-[#9e0c1f] to-[#b31427] p-6 sm:p-8 text-white shadow-md">
        <div className="pointer-events-none absolute -right-8 -top-12 size-48 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 right-32 size-40 rounded-full bg-amber-400/20 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-amber-400/25 border border-amber-300/40 text-amber-200">
                <FileCheck className="size-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {t("assessmentsAndScholarships")}
              </h1>
              {/* Mandatory Registered Age Group Label - purely read-only badge, NO dropdown */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-amber-200 backdrop-blur-sm border border-white/25 shadow-xs">
                <Sparkles className="size-3.5 text-amber-300" />
                {student.ageGroupLabel}
              </span>
            </div>

            <p className="mt-2 text-xs sm:text-sm text-white/90 max-w-2xl font-medium leading-relaxed">
              {t("assessmentsHeaderSubtitle", {
                name: student.displayName,
                id: student.studentId,
                district: districtName,
              })}
            </p>
          </div>

          <div className="flex items-center gap-2.5 shrink-0">
            <div className="flex items-center gap-2 rounded-xl bg-white/15 px-3.5 py-2 border border-white/20 text-xs font-semibold text-white">
              <Trophy className="size-4 text-amber-300" />
              <span>{t("testsCompletedCount", { count: resultsList.length })}</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/15 px-3.5 py-2 border border-white/20 text-xs font-semibold text-white">
              <GraduationCap className="size-4 text-amber-300" />
              <span>{t("incentivesAvailableCount", { count: 3 })}</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: Upcoming Assessments */}
      <section aria-labelledby="upcoming-heading" className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 id="upcoming-heading" className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Calendar className="size-5 text-primary" />
              <span>{t("upcomingAvailableAssessments")}</span>
            </h2>
            <p className="text-xs text-slate-500">
              {t("upcomingAssessmentsSubtitle", { ageGroup: student.ageGroup })}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {upcomingList.map((test) => {
            const isNow = test.status === "Available Now";
            return (
              <div
                key={test.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-5 shadow-xs transition-all hover:shadow-md ${isNow
                    ? "border-emerald-300 bg-gradient-to-b from-emerald-50/40 via-white to-white ring-1 ring-emerald-200"
                    : "border-slate-200 bg-white"
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100">
                    <span className="text-[11px] font-bold uppercase tracking-wider text-primary truncate">
                      {test.courseName}
                    </span>
                    <span
                      className={`rounded-full px-2.5 py-0.5 text-[10.5px] font-bold ${isNow
                          ? "bg-emerald-100 text-emerald-800 border border-emerald-300 animate-pulse"
                          : "bg-slate-100 text-slate-700"
                        }`}
                    >
                      {test.status}
                    </span>
                  </div>

                  <h3 className="mt-3 text-sm sm:text-base font-bold text-slate-900 leading-snug">
                    {test.title}
                  </h3>

                  <div className="mt-3 space-y-1.5 rounded-xl bg-slate-50 p-3 text-xs text-slate-600 border border-slate-100">
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{t("scheduledDate")}:</span>
                      <span className="font-bold text-slate-800">{test.scheduledDate}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{t("duration")}:</span>
                      <span className="font-semibold text-slate-800">{t("minutesUnit", { count: test.durationMinutes })}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-slate-500">{t("questions")}:</span>
                      <span className="font-semibold text-slate-800">{t("questionsUnit", { count: test.totalQuestions })}</span>
                    </div>
                  </div>

                  <p className="mt-2.5 text-[11px] text-slate-500 font-medium line-clamp-2">
                    <span className="font-bold text-slate-700">{t("syllabus")}:</span> {test.syllabus}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => setSelectedUpcoming(test)}
                    className={`w-full font-bold text-xs h-9 rounded-xl ${isNow
                        ? "bg-primary hover:bg-primary/90 text-white shadow-xs"
                        : "bg-slate-800 hover:bg-slate-900 text-white"
                      }`}
                  >
                    {isNow ? (
                      <span className="flex items-center gap-1.5">
                        <PlayCircle className="size-4" />
                        <span>{t("startAssessment")}</span>
                      </span>
                    ) : (
                      <span>{t("viewTestDetails")}</span>
                    )}
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SECTION 2: My Assessment Results & Score Trend Chart */}
      <section aria-labelledby="results-heading" className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 id="results-heading" className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Trophy className="size-5 text-amber-500" />
              <span>{t("myAssessmentResultsHistory")}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t("resultsHistorySubtitle")}
            </p>
          </div>
          <div className="flex items-center gap-3 text-xs font-bold text-slate-700">
            <span className="bg-emerald-50 text-emerald-800 px-3 py-1 rounded-full border border-emerald-200">
              {t("avgScore", { score: student.kpis.averageScore })}
            </span>
          </div>
        </div>

        {/* Score Improvement Chart */}
        <div className="rounded-xl border border-slate-100 bg-slate-50/50 p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold text-slate-700 flex items-center gap-1.5">
              <LineChartIcon className="size-4 text-primary" />
              <span>{t("assessmentScoreProgression")}</span>
            </span>
            <span className="text-[11px] font-semibold text-emerald-700 flex items-center gap-1">
              <TrendingUp className="size-3.5" />
              <span>{t("consistentlyAboveBenchmark")}</span>
            </span>
          </div>
          <div className="h-48 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="scoreColor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#8B0012" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#8B0012" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid stroke="#e2e8f0" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="date" tick={{ fill: "#64748b", fontSize: 11 }} />
                <YAxis domain={[60, 100]} tick={{ fill: "#64748b", fontSize: 11 }} unit="%" />
                <Tooltip
                  formatter={(val: number) => [`${val}%`, "Assessment Score"]}
                  labelFormatter={(lbl) => `Date: ${lbl}`}
                />
                <Area
                  type="monotone"
                  dataKey="score"
                  stroke="#8B0012"
                  strokeWidth={2.5}
                  fill="url(#scoreColor)"
                  dot={{ r: 4, fill: "#8B0012" }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Assessment History Table */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-xs text-slate-700">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
              <tr>
                <th scope="col" className="px-4 py-3">{t("colAssessmentTitle")}</th>
                <th scope="col" className="px-4 py-3">{t("colDateTaken")}</th>
                <th scope="col" className="px-4 py-3 text-center">{t("colScoreMarks")}</th>
                <th scope="col" className="px-4 py-3 text-center">{t("colCorrectAnswers")}</th>
                <th scope="col" className="px-4 py-3 text-center">{t("colTalukaRank")}</th>
                <th scope="col" className="px-4 py-3 text-center">{t("colPercentile")}</th>
                <th scope="col" className="px-4 py-3 text-center">{t("colPerformanceStatus")}</th>
                <th scope="col" className="px-4 py-3 text-right">{t("colScorecard")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {resultsList.map((res) => (
                <tr key={res.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-bold text-slate-900 text-xs">{res.title}</p>
                    <p className="text-[11px] text-slate-500">{res.courseName}</p>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-slate-600 font-medium">
                    {res.completionDate}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <span className="font-black text-slate-900 text-xs">{res.score}%</span>
                    <span className="text-[11px] text-slate-500 block">({res.score}/100)</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center font-semibold text-slate-800">
                    {res.correctAnswers} / {res.totalQuestions}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <span className="font-bold text-amber-800 bg-amber-50 px-2 py-0.5 rounded-md border border-amber-200">
                      Rank #{res.rank}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center font-bold text-primary">
                    {res.percentile}%ile
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-center">
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-800 border border-emerald-300">
                      {res.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-right">
                    <Button
                      size="sm"
                      variant="ghost"
                      onClick={() => setSelectedResult(res)}
                      className="text-xs font-bold text-primary hover:bg-primary/10 h-8"
                    >
                      {t("view")}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* SECTION 3: Scholarships & Incentives Opportunities */}
      <section aria-labelledby="scholarships-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <div className="flex items-center gap-2">
              <h2 id="scholarships-heading" className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
                <GraduationCap className="size-5 text-primary" />
                <span>{t("scholarshipsAndIncentivesTitle")}</span>
              </h2>
              <span className="rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-black text-amber-900 border border-amber-300">
                {t("proposedDemoBadge")}
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              {t("scholarshipsSubtitle")}
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {scholarships.map((sch) => {
            const isFlagship = sch.id === "sch-flagship-top50";
            return (
              <div
                key={sch.id}
                className={`relative flex flex-col justify-between rounded-2xl border p-5 shadow-xs transition-all hover:shadow-md ${isFlagship
                    ? "border-amber-300 bg-gradient-to-b from-amber-50/50 via-white to-white ring-2 ring-amber-400/40"
                    : "border-slate-200 bg-white"
                  }`}
              >
                <div>
                  {/* Top Scope & Status Header */}
                  <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-slate-100">
                    <span className="rounded-full bg-slate-100 px-2.5 py-0.5 text-[10.5px] font-bold text-slate-700">
                      {sch.scope}
                    </span>
                    <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[10.5px] font-bold text-emerald-800 border border-emerald-300">
                      {sch.status}
                    </span>
                  </div>

                  <h3 className="mt-3 text-base font-extrabold text-slate-900 leading-snug">
                    {sch.name}
                  </h3>
                  <p className="mt-1 text-xs text-primary font-semibold">
                    {sch.tagline}
                  </p>

                  <p className="mt-2 text-xs text-slate-600 leading-relaxed">
                    {sch.description}
                  </p>

                  {/* Reward Highlights */}
                  <div className="mt-3.5 rounded-xl border border-amber-200/80 bg-amber-50/60 p-3 space-y-1.5 text-xs">
                    <div className="flex items-center justify-between text-amber-950 font-bold">
                      <span>{t("rewardIncentive")}</span>
                      <span className="text-amber-800">{sch.rewardDetails.amount}</span>
                    </div>
                    <p className="text-[11px] text-amber-900/90 leading-tight">
                      📦 {sch.rewardDetails.kitDescription}
                    </p>
                    <p className="text-[10.5px] text-amber-800/80 italic">
                      📜 {sch.rewardDetails.certificate}
                    </p>
                  </div>

                  {/* Eligibility list */}
                  <div className="mt-3.5 space-y-1.5 text-xs">
                    <span className="text-[11px] font-bold text-slate-700 uppercase tracking-wider block">
                      {t("eligibilityHighlights")}
                    </span>
                    <ul className="space-y-1 text-slate-600 text-[11px]">
                      {sch.eligibilityCriteria.slice(0, 3).map((crit, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{crit}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-500 font-medium">
                    <span>{t("deadline")}</span>
                    <span className="font-bold text-slate-800">{sch.deadline}</span>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => setSelectedScholarship(sch)}
                      className="text-xs font-bold rounded-xl h-9"
                    >
                      {t("detailsAndRules")}
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        setApplyModalScholarship(sch);
                        setSubmissionSuccessId(null);
                      }}
                      className="bg-primary hover:bg-primary/90 text-white font-bold text-xs rounded-xl h-9 shadow-xs"
                    >
                      {t("applyNow")}
                    </Button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Demo Disclaimer */}
        <div className="rounded-xl border border-amber-300 bg-amber-50 p-4 text-xs text-amber-900 font-medium">
          <p className="leading-relaxed">
            📢 <span className="font-bold">{t("proposedDemoDisclaimerTitle")}</span> {t("proposedDemoDisclaimerText")}
          </p>
        </div>
      </section>

      {/* MODAL 1: Start / Upcoming Assessment Details */}
      <Dialog open={selectedUpcoming !== null} onOpenChange={(open) => !open && setSelectedUpcoming(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <PlayCircle className="size-5" />
              </div>
              <div>
                <span className="text-base font-bold text-foreground">{t("launchAssessment")}</span>
                <p className="text-xs font-normal text-muted-foreground">{student.displayName} ({student.ageGroupLabel})</p>
              </div>
            </DialogTitle>
            <DialogDescription className="text-xs pt-1 text-slate-600">
              {selectedUpcoming?.title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-3 text-xs">
            <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">{t("course")}:</span>
                <span className="font-bold text-slate-800">{selectedUpcoming?.courseName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">{t("scheduledDate")}:</span>
                <span className="font-semibold text-slate-800">{selectedUpcoming?.scheduledDate}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">{t("duration")}:</span>
                <span className="font-semibold text-slate-800">{t("minutesUnit", { count: selectedUpcoming?.durationMinutes || 0 })}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500 font-medium">{t("totalQuestions")}:</span>
                <span className="font-semibold text-slate-800">{t("multipleChoiceUnit", { count: selectedUpcoming?.totalQuestions || 0 })}</span>
              </div>
            </div>

            <div className="rounded-xl border border-blue-200 bg-blue-50/70 p-3 text-blue-900 leading-snug">
              <span className="font-bold block mb-1">{t("assessmentGuidelines")}</span>
              <p>{t("guidelinePrereq")}</p>
              <p>{t("guidelineRankings")}</p>
            </div>
          </div>

          <DialogFooter className="pt-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedUpcoming(null)}>
              {t("close")}
            </Button>
            <Button
              size="sm"
              onClick={() => setSelectedUpcoming(null)}
              className="bg-primary hover:bg-primary/95 text-white font-bold"
            >
              {t("beginExamination")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL 2: View Result Scorecard */}
      <Dialog open={selectedResult !== null} onOpenChange={(open) => !open && setSelectedResult(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-lg bg-amber-50 text-amber-700">
                <Trophy className="size-5" />
              </div>
              <div>
                <span className="text-base font-bold text-foreground">{t("assessmentScorecard")}</span>
                <p className="text-xs text-muted-foreground">{student.studentId} · {selectedResult?.completionDate}</p>
              </div>
            </DialogTitle>
          </DialogHeader>

          {selectedResult && (
            <div className="space-y-3.5 text-xs">
              <div className="rounded-xl bg-slate-900 text-white p-4 flex items-center justify-between">
                <div>
                  <p className="text-[11px] text-slate-300 font-medium">{t("overallScore")}</p>
                  <p className="text-3xl font-black text-amber-400">{selectedResult.score}%</p>
                  <p className="text-[11px] text-slate-300 mt-1">{selectedResult.status}</p>
                </div>
                <div className="text-right space-y-1">
                  <div className="rounded bg-white/10 px-2 py-0.5 text-[10.5px] font-bold text-amber-200">
                    Rank #{selectedResult.rank}
                  </div>
                  <div className="rounded bg-white/10 px-2 py-0.5 text-[10.5px] font-bold text-emerald-300">
                    {t("colPercentile")}: {selectedResult.percentile}%
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3 space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">{t("colCorrectAnswers")}:</span>
                  <span className="font-bold text-slate-800">{selectedResult.correctAnswers} of {selectedResult.totalQuestions}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t("timeTaken")}:</span>
                  <span className="font-semibold text-slate-800">{t("mins", { count: selectedResult.timeTakenMinutes })}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">{t("category")}:</span>
                  <span className="font-semibold text-slate-800">{selectedResult.category}</span>
                </div>
              </div>
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button size="sm" onClick={() => setSelectedResult(null)} className="w-full">
              {t("closeScorecard")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL 3: Scholarship Details */}
      <Dialog open={selectedScholarship !== null} onOpenChange={(open) => !open && setSelectedScholarship(null)}>
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <GraduationCap className="size-5 text-primary" />
              <span>{selectedScholarship?.name}</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-primary font-semibold">
              {selectedScholarship?.tagline}
            </DialogDescription>
          </DialogHeader>

          {selectedScholarship && (
            <div className="space-y-4 text-xs">
              <p className="text-slate-600 leading-relaxed">
                {selectedScholarship.description}
              </p>

              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-2">
                <span className="font-bold text-slate-800 block">{t("eligibilityRules")}</span>
                <ul className="space-y-1.5 text-slate-600">
                  {selectedScholarship.eligibilityCriteria.map((c, i) => (
                    <li key={i} className="flex items-start gap-1.5">
                      <CheckCircle2 className="size-3.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-3.5 text-amber-950 space-y-1">
                <span className="font-bold block">{t("configuredAwardRecognition")}</span>
                <p className="font-semibold text-amber-800">{selectedScholarship.rewardDetails.amount}</p>
                <p className="text-[11px]">{selectedScholarship.rewardDetails.kitDescription}</p>
              </div>
            </div>
          )}

          <DialogFooter className="pt-2">
            <Button variant="outline" size="sm" onClick={() => setSelectedScholarship(null)}>
              {t("close")}
            </Button>
            <Button
              size="sm"
              onClick={() => {
                const s = selectedScholarship;
                setSelectedScholarship(null);
                setApplyModalScholarship(s);
                setSubmissionSuccessId(null);
              }}
              className="bg-primary hover:bg-primary/95 text-white font-bold"
            >
              {t("proceedToApplication")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* MODAL 4: Interactive Scholarship Application Form */}
      <Dialog
        open={applyModalScholarship !== null}
        onOpenChange={(open) => !open && setApplyModalScholarship(null)}
      >
        <DialogContent className="sm:max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="size-5 text-primary" />
              <span>{t("scholarshipApplicationForm")}</span>
            </DialogTitle>
            <DialogDescription className="text-xs text-slate-600">
              {t("applyFor", { name: applyModalScholarship?.name || "" })}
            </DialogDescription>
          </DialogHeader>

          {submissionSuccessId ? (
            <div className="rounded-xl border border-emerald-200 bg-emerald-50 p-5 text-center space-y-3">
              <div className="grid size-12 place-items-center rounded-full bg-emerald-100 text-emerald-700 mx-auto">
                <CheckCircle2 className="size-7" />
              </div>
              <h3 className="text-base font-bold text-emerald-950">{t("applicationSubmittedSuccessfully")}</h3>
              <p className="text-xs text-emerald-800">
                {t("applicationReceivedRef")}
              </p>
              <div className="inline-block rounded-lg bg-white px-3 py-1.5 font-mono font-black text-sm text-emerald-900 border border-emerald-300">
                {submissionSuccessId}
              </div>
              <p className="text-[11px] text-emerald-700">
                {t("applicationStatusVerification")}
              </p>
              <Button
                size="sm"
                onClick={() => setApplyModalScholarship(null)}
                className="bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs"
              >
                {t("done")}
              </Button>
            </div>
          ) : (
            <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
              {/* Pre-populated Student Info Banner */}
              <div className="rounded-xl border border-slate-200 bg-slate-50 p-3.5 space-y-2">
                <span className="font-bold text-slate-800 block text-[11px] uppercase tracking-wider">
                  {t("registeredStudentDetailsReadOnly")}
                </span>
                <div className="grid grid-cols-2 gap-2 text-slate-600">
                  <div>
                    <span className="text-slate-400 block text-[10px]">{t("studentName")}:</span>
                    <span className="font-bold text-slate-800">{student.displayName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">{t("studentId")}:</span>
                    <span className="font-mono font-bold text-slate-800">{student.studentId}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">{t("registeredDistrict")}:</span>
                    <span className="font-semibold text-slate-800">{districtName} ({talukaName})</span>
                  </div>
                  <div>
                    <span className="text-slate-400 block text-[10px]">{t("colAgeGroup")}:</span>
                    <span className="font-semibold text-slate-800">{student.ageGroupLabel}</span>
                  </div>
                </div>
              </div>

              {/* Pre-populated Qualifying Assessment */}
              <div className="rounded-xl border border-amber-200 bg-amber-50/60 p-3 space-y-1">
                <span className="font-bold text-amber-950 block text-[11px]">{t("qualifyingAssessmentBenchmark")}</span>
                <p className="text-amber-900">
                  {t("latestScoreLabel", {
                    score: resultsList[0]?.score || 92,
                    percentile: resultsList[0]?.percentile || 96,
                  })}
                </p>
              </div>

              {/* Document Placeholder Selector */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-800">
                  {t("requiredDocumentAttachment")}
                </Label>
                <div className="flex items-center gap-2">
                  <div className="flex-1 rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs font-medium text-slate-700 flex items-center justify-between">
                    <span className="truncate">{uploadedDocName}</span>
                    <span className="rounded bg-emerald-100 text-emerald-800 px-1.5 py-0.5 text-[10px] font-bold">
                      {t("attached")}
                    </span>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setUploadedDocName("BOCW_Registration_Card_Attested_2026.pdf")}
                    className="text-xs font-semibold"
                  >
                    {t("changeFile")}
                  </Button>
                </div>
                <p className="text-[10.5px] text-slate-500">
                  {t("bocwDocPlaceholderNotice")}
                </p>
              </div>

              {/* Additional Remarks */}
              <div className="space-y-1.5">
                <Label className="text-xs font-bold text-slate-800">
                  {t("statementOfInterestRemarks")}
                </Label>
                <Textarea
                  placeholder={t("statementPlaceholder")}
                  value={extraRemarks}
                  onChange={(e) => setExtraRemarks(e.target.value)}
                  className="text-xs resize-none h-16"
                />
              </div>

              {/* Submission Disclaimer */}
              <p className="text-[10.5px] text-slate-500 italic">
                {t("bocwSubmissionDisclaimer")}
              </p>

              <DialogFooter className="pt-2">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setApplyModalScholarship(null)}
                >
                  {t("cancel")}
                </Button>
                <Button
                  type="submit"
                  size="sm"
                  className="bg-primary hover:bg-primary/95 text-white font-bold"
                >
                  {t("submitApplication")}
                </Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
