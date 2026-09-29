import {
  ArrowRight,
  Award,
  BookOpen,
  Calendar,
  CalendarCheck2,
  CheckCircle2,
  ClipboardCheck,
  Clock,
  Edit3,
  Flame,
  Globe2,
  GraduationCap,
  Heart,
  Medal,
  PlayCircle,
  RotateCcw,
  Sparkles,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CourseVideoModal, type ProgramVideoTarget } from "@/components/mis/course-video-modal";
import type { StudentProfile } from "@/features/student/student-data";
import { leadershipService } from "@/features/leadership/leadership-service";
import {
  studentPreferencesService,
  type StudentLearningPreferences,
} from "@/features/student/student-preferences-service";
import { LearningPreferencesModal } from "@/components/student/learning-preferences-modal";
import { useI18n } from "@/i18n";

interface StudentDashboardProps {
  student: StudentProfile;
}

export function StudentDashboard({ student }: StudentDashboardProps) {
  const navigate = useNavigate();
  const { t } = useI18n();
  const [activeModal, setActiveModal] = useState<{
    type: "course" | "assessment";
    title: string;
    subtitle: string;
  } | null>(null);

  const [selectedVideoProgram, setSelectedVideoProgram] =
    useState<ProgramVideoTarget | null>(null);

  const [preferences, setPreferences] = useState<StudentLearningPreferences>(() =>
    studentPreferencesService.getPreferences(student.username)
  );
  const [preferencesModalOpen, setPreferencesModalOpen] = useState(false);

  useEffect(() => {
    const currentPrefs = studentPreferencesService.getPreferences(student.username);
    setPreferences(currentPrefs);
    // Automatically display the preferences form modal if preferences are not yet completed
    if (!currentPrefs.completed) {
      setPreferencesModalOpen(true);
    }

    const unsubscribe = studentPreferencesService.subscribe(({ username, preferences: updated }) => {
      if (username === student.username) {
        setPreferences(updated);
        if (!updated.completed) {
          setPreferencesModalOpen(true);
        }
      }
    });
    return unsubscribe;
  }, [student.username]);

  const { continueLearning, kpis, courses, upcomingAssessment, achievements } = student;
  const position = leadershipService.getStudentPosition(student.username);
  const badges = leadershipService.getStudentBadges(student.username);
  const earnedBadgesCount = badges.filter((b) => b.earned).length;

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 py-6">
      {/* Student Welcome Header Banner */}
      <section
        id="home"
        className="relative overflow-hidden rounded-2xl border border-primary/15 bg-gradient-to-r from-[#8B0012] via-[#9e0c1f] to-[#b31427] p-6 sm:p-8 text-white shadow-md"
      >
        {/* Subtle decorative background circles */}
        <div className="pointer-events-none absolute -right-8 -top-12 size-48 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 right-32 size-40 rounded-full bg-amber-400/15 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
                <span>{t("welcome")} {student.displayName}</span>
                <span className="inline-block animate-bounce">👋</span>
              </h1>
              {/* Mandatory Registered Age Group Label - purely read-only badge, NO dropdown */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-amber-200 backdrop-blur-sm border border-white/25 shadow-xs">
                <Sparkles className="size-3.5 text-amber-300" />
                {student.ageGroupLabel}
              </span>
            </div>

            <p className="mt-2 text-xs sm:text-sm text-white/90 max-w-2xl font-medium leading-relaxed">
              {t("personalizedWorkspace")} · {t("studentIdLabel")}{" "}
              <span className="font-mono font-bold text-amber-200">{student.studentId}</span> ·{" "}
              <span>{student.schoolDistrict}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto flex-wrap">
            <div className="flex items-center gap-2 rounded-xl bg-white/12 px-3.5 py-2 border border-white/15 backdrop-blur-sm text-xs font-semibold text-white shadow-xs">
              <Flame className="size-4 text-amber-300 fill-amber-300 animate-pulse" />
              <span>{achievements.learningStreakDays} {t("dayStreak")}</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/12 px-3.5 py-2 border border-white/15 backdrop-blur-sm text-xs font-semibold text-white shadow-xs">
              <Trophy className="size-4 text-amber-300" />
              <span>{achievements.assessmentsCompleted} {t("passed")}</span>
            </div>
            <a
              href="/course-planner"
              className="flex items-center gap-2 rounded-xl bg-white/15 px-3.5 py-2 border border-amber-300/40 backdrop-blur-sm text-xs font-bold text-amber-200 hover:bg-white/25 transition-all cursor-pointer shadow-xs"
            >
              <CalendarCheck2 className="size-4 text-amber-300" />
              <span>{t("coursePlanner")}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Reset Preferences Notice Banner (Shown when preferences are incomplete / reset) */}
      {!preferences.completed && (
        <div className="rounded-2xl border border-amber-300/90 bg-gradient-to-r from-amber-50 via-white to-amber-50/70 p-4 sm:p-5 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-in fade-in slide-in-from-top-2">
          <div className="flex items-center gap-3">
            <div className="grid size-10 place-items-center rounded-xl bg-amber-100 text-amber-800 shadow-2xs shrink-0">
              <RotateCcw className="size-5 text-amber-700" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-sm font-extrabold text-slate-900">
                  {t("learningPreferencesReset")}
                </h3>
                <span className="rounded-md bg-amber-200/80 px-2 py-0.5 text-[10.5px] font-bold text-amber-900 border border-amber-300/60">
                  {t("actionRequired")}
                </span>
              </div>
              <p className="text-xs text-slate-600 mt-0.5">
                {t("preferencesResetDescription")}
              </p>
            </div>
          </div>

          <Button
            onClick={() => setPreferencesModalOpen(true)}
            className="h-9 px-4 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-sm shrink-0 self-start sm:self-auto flex items-center gap-1.5 cursor-pointer"
          >
            <Sparkles className="size-3.5" />
            <span>{t("setPreferencesNow")}</span>
          </Button>
        </div>
      )}

      {/* SECTION 1: Personal KPI Cards */}
      <section aria-label={t("myCourses")} id="my-progress">
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
          {/* 1. My Courses */}
          <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs transition-transform hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t("myCourses")}
              </span>
              <div className="grid size-9 place-items-center rounded-lg bg-blue-50 text-blue-600">
                <BookOpen className="size-4.5" />
              </div>
            </div>
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {kpis.myCourses}
              </span>
              <span className="text-xs font-medium text-slate-500">{t("enrolledPrograms")}</span>
            </div>
            <p className="mt-1 text-[11px] text-blue-700 font-medium">{t("fullCurriculumAccess")}</p>
          </div>

          {/* 2. Courses In Progress */}
          <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs transition-transform hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t("coursesInProgress")}
              </span>
              <div className="grid size-9 place-items-center rounded-lg bg-amber-50 text-amber-600">
                <GraduationCap className="size-4.5" />
              </div>
            </div>
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {kpis.coursesInProgress}
              </span>
              <span className="text-xs font-medium text-slate-500">{t("active")}</span>
            </div>
            <p className="mt-1 text-[11px] text-amber-700 font-medium">{t("regularlyStudied")}</p>
          </div>

          {/* 3. Learning Hours */}
          <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs transition-transform hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t("learningHours")}
              </span>
              <div className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                <Clock className="size-4.5" />
              </div>
            </div>
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {kpis.learningHours}
              </span>
              <span className="text-xs font-medium text-slate-500">{t("totalHrs")}</span>
            </div>
            <p className="mt-1 text-[11px] text-emerald-700 font-medium">{t("timeSpentLearning")}</p>
          </div>

          {/* 4. Average Assessment Score */}
          <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs transition-transform hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                {t("averageScore")}
              </span>
              <div className="grid size-9 place-items-center rounded-lg bg-purple-50 text-purple-600">
                <TrendingUp className="size-4.5" />
              </div>
            </div>
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {kpis.averageScore}%
              </span>
              <span className="text-xs font-medium text-emerald-600 font-semibold">{t("excellent")}</span>
            </div>
            <p className="mt-1 text-[11px] text-purple-700 font-medium">{t("acrossAllQuizAttempts")}</p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Continue Learning */}
      <section aria-label={t("continueLearning")}>
        <div className="rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white via-white to-slate-50 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary">
                <PlayCircle className="size-4.5" />
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                {t("continueLearning")}
              </h2>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
              {t("activeCourse")}
            </span>
          </div>

          <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="rounded bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
                  {t("inProgress")}
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                  {continueLearning.courseName}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {continueLearning.currentModule}
              </p>
              <p className="text-xs text-slate-500 italic">
                {t("next")} {continueLearning.currentLecture}
              </p>

              {/* Progress Bar & percentage */}
              <div className="pt-2 max-w-xl">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>{t("courseProgress")}</span>
                  <span className="font-bold text-primary">{continueLearning.progress}%</span>
                </div>
                <Progress value={continueLearning.progress} className="h-2.5 bg-slate-100" />
                <p className="mt-1 text-[11px] text-slate-500">
                  {t("completedOfLectures", { completed: continueLearning.completedLectures, total: continueLearning.totalLectures })}
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center">
              <Button
                onClick={() =>
                  setSelectedVideoProgram({
                    id: continueLearning.courseId,
                    name: continueLearning.courseName,
                    ageGroup: student.ageGroup,
                    description: `${continueLearning.currentModule} · ${continueLearning.currentLecture}`,
                  })
                }
                className="w-full sm:w-auto h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
              >
                <PlayCircle className="size-4.5" />
                <span>{t("continueLearning")}</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: Assessment & Academic Performance Snapshot (Matching Admin Dashboard Layout) */}
      <div className="overflow-hidden rounded-2xl border border-slate-200/80 bg-gradient-to-br from-white via-slate-50/50 to-blue-50/30 p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 px-2.5 py-0.5 text-[11px] font-bold text-emerald-700 border border-emerald-200/60">
              <CheckCircle2 className="size-3.5" />
              {t("statewideAssessmentCycle")}
            </div>
            <h2 className="mt-2 text-base font-extrabold text-slate-900 sm:text-lg">
              {t("assessmentAcademicPerformance")}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {t("unifiedTrackingDescription")}
            </p>
          </div>
          <Button
            onClick={() => navigate({ to: "/assessments-scholarships" })}
            className="gap-2 rounded-lg bg-primary font-semibold text-white shadow-sm hover:bg-primary/90"
          >
            <span>{t("viewAssessmentsScholarships")}</span>
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {t("averageAssessmentScore")}
            </p>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                {position.score}%
              </span>
              <span className="text-xs font-bold text-emerald-600">
                {t("momChange")}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              {t("benchmarkTarget")}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {t("assessmentCompletion")}
            </p>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                78.4%
              </span>
              <span className="text-xs font-bold text-emerald-600">
                {achievements.assessmentsCompleted} {t("ofTests")}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              {t("acrossRegisteredLearners")}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {t("statewidePercentile")}
            </p>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                {position.percentile}{t("thPercentile")}
              </span>
              <span className="text-xs font-bold text-emerald-600">
                {t("topInState", { percent: Math.max(1, Math.round(100 - position.percentile)) })}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              {t("scoredHigherThan", { percentile: position.percentile })}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {t("topFocusAreas")}
            </p>
            <div className="mt-1 text-xs">
              <p className="font-bold text-emerald-700">
                {student.ageGroup === "15-18"
                  ? "★ Top: JEE Mechanics (84%)"
                  : student.ageGroup === "11-14"
                    ? "★ Top: Algebra & Numbers (88%)"
                    : "★ Top: Foundational (84%)"}
              </p>
              <p className="mt-0.5 font-bold text-rose-600">
                {student.ageGroup === "15-18"
                  ? "▲ Focus: JEE Mechanics (48%)"
                  : student.ageGroup === "11-14"
                    ? "▲ Focus: General Science (52%)"
                    : "▲ Focus: JEE Mechanics (48%)"}
              </p>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              {t("eligibleSuperScholar")}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION: Achievements & Leadership Standings Snapshot */}
      <div className="overflow-hidden rounded-2xl border border-amber-200/80 bg-gradient-to-br from-white via-amber-50/30 to-amber-100/20 p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full bg-amber-50 px-2.5 py-0.5 text-[11px] font-bold text-amber-800 border border-amber-200/70">
              <Trophy className="size-3.5 text-amber-600" />
              {t("statewideLeadershipStandings")} · {student.ageGroupLabel}
            </div>
            <h2 className="mt-2 text-base font-extrabold text-slate-900 sm:text-lg">
              {t("achievementsLeadershipSnapshot")}
            </h2>
            <p className="mt-0.5 text-xs text-slate-500">
              {t("realTimeVerifiedRanking")}
            </p>
          </div>
          <Button
            onClick={() => navigate({ to: "/achievements-leadership" })}
            className="gap-2 rounded-lg bg-primary font-semibold text-white shadow-sm hover:bg-primary/90"
          >
            <span>{t("viewAchievementsLeadership")}</span>
            <ArrowRight className="size-4" />
          </Button>
        </div>

        <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {t("myTalukaRank")}
            </p>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                #{position.talukaRank}
              </span>
              <span className="text-xs font-bold text-emerald-600">
                +{position.rankMovement > 0 ? position.rankMovement : 4} MoM
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              {t("outOfInTaluka", { count: position.totalTalukaStudents.toLocaleString("en-IN"), district: student.schoolDistrict.replace(" District", "") })}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {t("myDistrictRank")}
            </p>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                #{position.districtRank}
              </span>
              <span className="text-xs font-bold text-emerald-600">
                {t("topPercent")}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              {t("outOfRegisteredLearners", { count: position.totalDistrictStudents.toLocaleString("en-IN") })}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {t("maharashtraStateRank")}
            </p>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                #{position.stateRank}
              </span>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-1.5 py-0.5 rounded">
                {t("top50Scholar")}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500">
              {t("statewidePercentileLabel", { percentile: position.percentile })}
            </p>
          </div>

          <div className="rounded-xl border border-slate-200 bg-white p-4 shadow-2xs">
            <p className="text-[11px] font-semibold uppercase tracking-wider text-slate-500">
              {t("meritBadgesRecognition")}
            </p>
            <div className="mt-1.5 flex items-baseline gap-2">
              <span className="text-2xl font-black text-slate-900">
                {earnedBadgesCount} / {badges.length}
              </span>
              <span className="text-xs font-bold text-emerald-600">
                {t("dStreak", { days: achievements.learningStreakDays })}
              </span>
            </div>
            <p className="mt-1 text-[11px] text-slate-500 truncate">
              {achievements.specialBadge.name}
            </p>
          </div>
        </div>
      </div>

      {/* SECTION: Course Planner Quick Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 rounded-2xl border border-blue-200/80 bg-gradient-to-r from-blue-50/70 via-white to-blue-50/40 p-4 shadow-xs">
        <div className="flex items-center gap-3">
          <div className="grid size-9 place-items-center rounded-xl bg-blue-100 text-blue-700 shadow-2xs shrink-0">
            <CalendarCheck2 className="size-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900">
              {t("personalizedCoursePlanner")}
            </h3>
            <p className="text-xs text-slate-500">
              {t("organizeStudySchedule", { count: kpis.coursesInProgress })}
            </p>
          </div>
        </div>
        <Button
          onClick={() => navigate({ to: "/course-planner" })}
          variant="outline"
          className="h-9 px-4 rounded-xl border-blue-300 bg-white font-bold text-blue-700 hover:bg-blue-50 text-xs shadow-2xs shrink-0 self-start sm:self-auto gap-1.5"
        >
          <span>{t("openCoursePlanner")}</span>
          <ArrowRight className="size-3.5" />
        </Button>
      </div>

      {/* SECTION 3: My Learning Programs (Age-Group Specific) */}
      <section aria-label={t("myLearningPrograms")} id="my-learning">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>{t("myLearningPrograms")}</span>
              <span className="text-xs font-medium text-slate-500">{t("coursesCount", { count: courses.length })}</span>
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              {t("curriculumForAgeGroup")}
            </p>

            {/* Display Active Preferences Highlights if set */}
            {preferences.completed && preferences.favouriteSubjects && preferences.favouriteSubjects.length > 0 && (
              <div className="flex flex-wrap items-center gap-1.5 mt-2">
                <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wide">
                  {t("yourPreferences")}
                </span>
                {preferences.favouriteSubjects.map((sub) => (
                  <span
                    key={sub}
                    className="inline-flex items-center gap-1 rounded-md bg-amber-50 px-2 py-0.5 text-[10.5px] font-bold text-amber-900 border border-amber-200/60"
                  >
                    <Heart className="size-2.5 text-rose-500 fill-rose-500" />
                    {sub}
                  </span>
                ))}
                {preferences.preferredLanguage && (
                  <span className="inline-flex items-center gap-1 rounded-md bg-blue-50 px-2 py-0.5 text-[10.5px] font-bold text-blue-900 border border-blue-200/60">
                    <Globe2 className="size-2.5 text-blue-600" />
                    {preferences.preferredLanguage}
                  </span>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 shrink-0 self-start sm:self-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPreferencesModalOpen(true)}
              className="h-8 px-2.5 rounded-lg border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-100 flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <Edit3 className="size-3.5 text-slate-500" />
              <span>{t("preferences")}</span>
            </Button>
            <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md">
              {student.ageGroupLabel}
            </span>
          </div>
        </div>

        {/* Dynamic Grid: 4 columns for 6-10 and 11-14, 3 columns for 15-18 */}
        <div
          className={`grid gap-4 sm:gap-5 ${courses.length === 3
              ? "grid-cols-1 md:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
            }`}
        >
          {courses.map((course) => {
            const isRecommended =
              preferences.completed &&
              preferences.favouriteSubjects &&
              preferences.favouriteSubjects.some((fav) => {
                const favLower = fav.toLowerCase();
                const nameLower = course.name.toLowerCase();
                const catLower = course.category.toLowerCase();
                return (
                  nameLower.includes(favLower) ||
                  favLower.includes(nameLower) ||
                  catLower.includes(favLower) ||
                  (favLower.includes("math") && nameLower.includes("math")) ||
                  (favLower.includes("science") && nameLower.includes("science")) ||
                  (favLower.includes("coding") && nameLower.includes("digital")) ||
                  (favLower.includes("physics") && nameLower.includes("physics")) ||
                  (favLower.includes("foundational") && nameLower.includes("foundational"))
                );
              });

            return (
              <div
                key={course.id}
                className="flex flex-col justify-between rounded-xl border border-slate-200/90 bg-white p-4.5 shadow-xs hover:shadow-md transition-all duration-200"
              >
                <div>
                  {/* Course Header Banner / Pill */}
                  <div className="flex items-start justify-between gap-2 mb-3">
                    <div
                      className={`h-10 w-10 rounded-lg bg-gradient-to-br ${course.thumbnailColor} grid place-items-center text-white shadow-xs shrink-0`}
                    >
                      <BookOpen className="size-5" />
                    </div>
                    <div className="flex items-center gap-1.5 flex-wrap justify-end">
                      {isRecommended && (
                        <span className="inline-flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-extrabold text-amber-900 border border-amber-200/80 shadow-2xs">
                          <Sparkles className="size-3 text-amber-600 fill-amber-500" />
                          {t("recommended")}
                        </span>
                      )}
                      <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10.5px] font-semibold text-slate-600 truncate max-w-[140px]">
                        {course.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-sm font-bold text-slate-900 leading-snug line-clamp-2">
                    {course.name}
                  </h3>

                  <p className="mt-1 text-xs text-slate-500 line-clamp-1">
                    {course.currentModule}
                  </p>

                  {/* Progress % and Learning Hours */}
                  <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
                    <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                      <span>{t("progress")}</span>
                      <span className="font-bold text-primary">{course.progress}%</span>
                    </div>
                    <Progress value={course.progress} className="h-2 bg-slate-100" />

                    <div className="flex items-center justify-between pt-1 text-[11px] text-slate-600 font-medium">
                      <span className="flex items-center gap-1">
                        <Clock className="size-3 text-slate-400" />
                        <span>{t("hrsSpent", { hours: course.learningHours })}</span>
                      </span>
                      <span>
                        {t("modules", { completed: course.completedModules, total: course.totalModules })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4 pt-2">
                  <Button
                    variant={course.progress > 0 ? "default" : "outline"}
                    onClick={() =>
                      setSelectedVideoProgram({
                        id: course.id,
                        name: course.name,
                        ageGroup: student.ageGroup,
                        description: `${course.currentModule} · ${course.currentLecture}`,
                      })
                    }
                    className={`w-full h-9 rounded-lg text-xs font-bold transition-all ${course.progress > 0
                        ? "bg-primary hover:bg-primary/95 text-white"
                        : "border-primary text-primary hover:bg-primary/5"
                      }`}
                  >
                    <PlayCircle className="size-3.5 mr-1" />
                    <span>{course.progress > 0 ? t("continueLearning") : t("startLearning")}</span>
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Grid for SECTION 4 (Upcoming Assessment) & SECTION 5 (Achievements) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6" id="assessments">
        {/* SECTION 4: Upcoming Assessment (5 cols) */}
        <section
          aria-label={t("upcomingAssessment")}
          className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs"
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="grid size-7 place-items-center rounded-md bg-amber-50 text-amber-700">
                  <Calendar className="size-4" />
                </div>
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                  {t("upcomingAssessment")}
                </h2>
              </div>
              <span className="rounded-full bg-amber-100 px-2.5 py-0.5 text-[11px] font-bold text-amber-800">
                {upcomingAssessment.status}
              </span>
            </div>

            <div className="mt-4 space-y-3">
              <div>
                <span className="text-[11px] font-semibold text-primary uppercase tracking-wider block">
                  {upcomingAssessment.courseName}
                </span>
                <h3 className="mt-1 text-base font-bold text-slate-900">
                  {upcomingAssessment.title}
                </h3>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 space-y-2 text-xs">
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-medium">{t("scheduledDate")}</span>
                  <span className="font-bold text-slate-800">{upcomingAssessment.scheduledDate}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-medium">{t("assessmentDuration")}</span>
                  <span className="font-semibold text-slate-800">
                    {upcomingAssessment.durationMinutes} {t("minutes")}
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-medium">{t("totalQuestions")}</span>
                  <span className="font-semibold text-slate-800">
                    {upcomingAssessment.totalQuestions} {t("questions")}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 space-y-2">
            <Button
              onClick={() =>
                setActiveModal({
                  type: "assessment",
                  title: upcomingAssessment.title,
                  subtitle: `${upcomingAssessment.courseName} · ${upcomingAssessment.durationMinutes} mins · ${upcomingAssessment.totalQuestions} Questions`,
                })
              }
              className="w-full h-10 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs sm:text-sm shadow-sm flex items-center justify-center gap-2"
            >
              <span>{t("startAssessment")}</span>
            </Button>
            <a
              href="/assessments-scholarships"
              className="w-full h-9 rounded-xl border border-slate-200 bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs shadow-2xs flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
            >
              <span>{t("assessmentsScholarshipsHub")}</span>
            </a>
          </div>
        </section>

        {/* SECTION 5: Achievements (7 cols) */}
        <section
          id="achievements"
          aria-label={t("achievementsMilestones")}
          className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="grid size-7 place-items-center rounded-md bg-purple-50 text-purple-700">
                  <Trophy className="size-4" />
                </div>
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                  {t("achievementsMilestones")}
                </h2>
              </div>
              <span className="text-xs font-semibold text-purple-700 bg-purple-50 px-2.5 py-0.5 rounded-full">
                {achievements.specialBadge.name}
              </span>
            </div>

            {/* Metric counters */}
            <div className="mt-4 grid grid-cols-3 gap-2.5 sm:gap-3">
              <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-center">
                <div className="text-lg sm:text-2xl font-black text-slate-900">
                  {achievements.modulesCompleted}
                </div>
                <div className="mt-0.5 text-[11px] font-semibold text-slate-600 leading-tight">
                  {t("modulesCompleted")}
                </div>
              </div>

              <div className="rounded-xl bg-amber-50/60 border border-amber-100 p-3 text-center">
                <div className="text-lg sm:text-2xl font-black text-amber-700 flex items-center justify-center gap-1">
                  <span>{achievements.learningStreakDays}</span>
                  <Flame className="size-4 fill-amber-500 text-amber-500" />
                </div>
                <div className="mt-0.5 text-[11px] font-semibold text-amber-900 leading-tight">
                  {t("daysLearningStreak")}
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-center">
                <div className="text-lg sm:text-2xl font-black text-slate-900">
                  {achievements.assessmentsCompleted}
                </div>
                <div className="mt-0.5 text-[11px] font-semibold text-slate-600 leading-tight">
                  {t("assessmentsCompleted")}
                </div>
              </div>
            </div>

            {/* Recent Achievement Banner */}
            <div className="mt-4 rounded-xl border border-emerald-200/80 bg-emerald-50/70 p-3.5 flex items-start gap-3">
              <div className="text-2xl shrink-0 select-none">
                {achievements.recentAchievement.icon}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-2">
                  <h3 className="text-xs sm:text-sm font-bold text-emerald-950 truncate">
                    {achievements.recentAchievement.title}
                  </h3>
                  <span className="text-[10.5px] font-medium text-emerald-700 shrink-0">
                    {achievements.recentAchievement.earnedDate}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-emerald-800/90 leading-snug">
                  {achievements.recentAchievement.description}
                </p>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="size-3.5 text-emerald-600" />
              <span>{t("registeredScholarStatusActive")}</span>
            </span>
            <a
              href="/achievements-leadership"
              className="font-bold text-primary hover:underline flex items-center gap-1 cursor-pointer"
            >
              <span>{t("viewFullLeaderboardBadges")}</span>
            </a>
          </div>
        </section>
      </div>

      {/* Interactive Modal Feedback for Course / Assessment Launch */}
      <Dialog open={activeModal !== null} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                {activeModal?.type === "assessment" ? (
                  <Calendar className="size-5" />
                ) : (
                  <PlayCircle className="size-5" />
                )}
              </div>
              <div>
                <span className="text-base font-bold text-foreground">
                  {activeModal?.type === "assessment" ? t("launchAssessment") : t("resumeLearning")}
                </span>
                <p className="text-xs font-normal text-muted-foreground">{student.displayName} ({student.ageGroupLabel})</p>
              </div>
            </DialogTitle>
            <DialogDescription className="text-xs pt-2 text-slate-600">
              {activeModal?.title}
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-xl border border-border bg-slate-50 p-4 space-y-2 text-xs">
            <p className="font-semibold text-slate-800">{activeModal?.subtitle}</p>
            <p className="text-slate-600">
              {activeModal?.type === "assessment"
                ? t("testEvaluatesDescription")
                : t("learningProgressSynced")}
            </p>
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setActiveModal(null)}
              className="text-xs"
            >
              {t("backToDashboard")}
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => setActiveModal(null)}
              className="bg-primary hover:bg-primary/95 text-white text-xs font-bold"
            >
              {activeModal?.type === "assessment" ? t("beginTest") : t("openPlayer")}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Direct Google Drive Course Video Player Modal */}
      <CourseVideoModal
        isOpen={selectedVideoProgram !== null}
        onClose={() => setSelectedVideoProgram(null)}
        program={selectedVideoProgram}
      />

      {/* Learning Preferences Modal Dialog */}
      <LearningPreferencesModal
        open={preferencesModalOpen}
        onOpenChange={setPreferencesModalOpen}
        username={student.username}
        displayName={student.displayName}
        ageGroup={student.ageGroup}
        ageGroupLabel={student.ageGroupLabel}
        onSaved={(updated) => {
          setPreferences(updated);
        }}
      />
    </div>
  );
}
