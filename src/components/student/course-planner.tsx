import {
  Award,
  BookOpen,
  Calendar,
  CalendarCheck,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Circle,
  Clock,
  ExternalLink,
  Flame,
  GraduationCap,
  Lightbulb,
  PlayCircle,
  RotateCcw,
  SlidersHorizontal,
  Sparkles,
  Target,
  TrendingUp,
  Trophy,
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
import { Progress } from "@/components/ui/progress";
import {
  DAYS_OF_WEEK,
  DEFAULT_GOALS,
  getInitialGoalsForStudent,
  getInitialTasksForStudent,
  type PlannerTask,
  type PlannerTaskStatus,
  type PlannerTaskType,
  saveGoalsForStudent,
  saveTasksForStudent,
  STUDENT_RECOMMENDATIONS,
  type StudentWeeklyGoal,
  type StudyRecommendation,
} from "@/features/student/course-planner-data";
import type { StudentProfile } from "@/features/student/student-data";
import type { ProgramVideoTarget } from "@/components/mis/course-video-modal";
import { useI18n, type TranslationKeys } from "@/i18n";

interface CoursePlannerProps {
  student: StudentProfile;
  onOpenVideo: (program: ProgramVideoTarget) => void;
  onOpenAssessment: (assessment: {
    id: string;
    title: string;
    courseName: string;
    durationMinutes: number;
    questions?: number;
  }) => void;
}

export function CoursePlanner({
  student,
  onOpenVideo,
  onOpenAssessment,
}: CoursePlannerProps) {
  const { t, locale } = useI18n();

  // Helper for translating day names
  const getDayLabel = (key: string) => {
    const map: Record<string, { label: TranslationKeys; fullLabel: TranslationKeys }> = {
      mon: { label: "dayMon", fullLabel: "dayMonday" },
      tue: { label: "dayTue", fullLabel: "dayTuesday" },
      wed: { label: "dayWed", fullLabel: "dayWednesday" },
      thu: { label: "dayThu", fullLabel: "dayThursday" },
      fri: { label: "dayFri", fullLabel: "dayFriday" },
      sat: { label: "daySat", fullLabel: "daySaturday" },
      sun: { label: "daySun", fullLabel: "daySunday" },
    };
    return map[key] || { label: "dayMon", fullLabel: "dayMonday" };
  };

  // 1. Planner tasks state (scoped to student username)
  const [tasks, setTasks] = useState<PlannerTask[]>(() =>
    getInitialTasksForStudent(student.ageGroup, student.username)
  );

  // 2. Weekly Goals state (scoped to student username)
  const [goals, setGoals] = useState<StudentWeeklyGoal>(() =>
    getInitialGoalsForStudent(student.ageGroup, student.username)
  );

  // 3. Week offset (0 = current week, -1 = previous, +1 = next)
  const [weekOffset, setWeekOffset] = useState<number>(0);

  // 4. Selected day index (0 = Monday, 1 = Tuesday ... defaults to 1 for Tuesday/Today)
  const [selectedDayIndex, setSelectedDayIndex] = useState<number>(1);

  // 5. Goal adjustment dialog open state
  const [goalDialogOpen, setGoalDialogOpen] = useState<boolean>(false);
  const [draftGoalHours, setDraftGoalHours] = useState<number>(goals.targetHours);
  const [draftGoalTasks, setDraftGoalTasks] = useState<number>(goals.targetTasks);

  // Format the week date range label dynamically based on week offset
  const weekRangeLabel = useMemo(() => {
    if (weekOffset === 0) return `${t("thisWeek")} · Sep 28 – Oct 04, 2026`;
    if (weekOffset === -1) return `${t("previousWeek")} · Sep 21 – Sep 27, 2026`;
    if (weekOffset === 1) return `${t("nextWeek")} · Oct 05 – Oct 11, 2026`;
    return `Week offset: ${weekOffset}`;
  }, [weekOffset, t]);

  // Tasks filtered for the currently selected day
  const selectedDayTasks = useMemo(() => {
    return tasks.filter((t) => t.dayIndex === selectedDayIndex);
  }, [tasks, selectedDayIndex]);

  // Day object for currently selected day
  const selectedDayObj = DAYS_OF_WEEK.find((d) => d.index === selectedDayIndex) || DAYS_OF_WEEK[1];

  // Daily summary calculations
  const dailyTotalTasks = selectedDayTasks.length;
  const dailyCompletedTasks = selectedDayTasks.filter((t) => t.status === "Completed").length;
  const dailyTotalMinutes = selectedDayTasks.reduce((acc, t) => acc + t.durationMinutes, 0);
  const dailyCompletedMinutes = selectedDayTasks
    .filter((t) => t.status === "Completed")
    .reduce((acc, t) => acc + t.durationMinutes, 0);

  const dailyProgressPercent =
    dailyTotalTasks > 0 ? Math.round((dailyCompletedTasks / dailyTotalTasks) * 100) : 0;

  // Weekly summary calculations
  const weeklyTotalTasks = tasks.length;
  const weeklyCompletedTasks = tasks.filter((t) => t.status === "Completed").length;
  const weeklyTotalCompletedMinutes = tasks
    .filter((t) => t.status === "Completed")
    .reduce((acc, t) => acc + t.durationMinutes, 0);
  const weeklyCompletedHours = parseFloat((weeklyTotalCompletedMinutes / 60).toFixed(1));

  const weeklyProgressPercent = Math.min(
    100,
    goals.targetHours > 0 ? Math.round((weeklyCompletedHours / goals.targetHours) * 100) : 0
  );

  // Recommendations for this student
  const recommendations: StudyRecommendation[] = useMemo(() => {
    return (
      STUDENT_RECOMMENDATIONS[student.username] ||
      STUDENT_RECOMMENDATIONS["aarav11"] ||
      []
    );
  }, [student.username]);

  // Handle task status toggle
  const handleToggleTaskStatus = (taskId: string) => {
    const updated = tasks.map((t) => {
      if (t.id === taskId) {
        const nextStatus: PlannerTaskStatus =
          t.status === "Completed" ? "Not Started" : "Completed";
        const updatedTask: PlannerTask = {
          ...t,
          status: nextStatus,
        };
        if (nextStatus === "Completed") updatedTask.completedAt = new Date().toISOString();
        else delete updatedTask.completedAt;
        return updatedTask;
      }
      return t;
    });

    setTasks(updated);
    saveTasksForStudent(student.username, updated);
  };

  // Launch task action (open video or assessment)
  const handleStartTask = (task: PlannerTask) => {
    // If not started, mark in-progress
    if (task.status === "Not Started") {
      const updated = tasks.map((t) =>
        t.id === task.id ? { ...t, status: "In Progress" as PlannerTaskStatus } : t
      );
      setTasks(updated);
      saveTasksForStudent(student.username, updated);
    }

    if (task.taskType === "Assessment" || task.assessmentId) {
      onOpenAssessment({
        id: task.assessmentId || task.id,
        title: task.lessonTitle,
        courseName: task.courseName,
        durationMinutes: task.durationMinutes,
        questions: task.durationMinutes > 30 ? 25 : 15,
      });
    } else {
      onOpenVideo({
        id: task.courseId,
        name: task.courseName,
        ageGroup: student.ageGroup,
        description: `${task.moduleTitle} · ${task.lessonTitle}`,
      });
    }
  };

  // Save adjusted goals
  const handleSaveGoals = () => {
    const newGoals: StudentWeeklyGoal = {
      targetHours: draftGoalHours,
      targetTasks: draftGoalTasks,
    };
    setGoals(newGoals);
    saveGoalsForStudent(student.username, newGoals);
    setGoalDialogOpen(false);
  };

  // Reset to default age group schedule
  const handleResetSchedule = () => {
    const defaultTasks = getInitialTasksForStudent(student.ageGroup, "none");
    setTasks(defaultTasks);
    saveTasksForStudent(student.username, defaultTasks);
    const defaultG = DEFAULT_GOALS[student.ageGroup];
    setGoals(defaultG);
    saveGoalsForStudent(student.username, defaultG);
  };

  // Age group theme helpers
  const isJunior = student.ageGroup === "6-10";
  const isSenior = student.ageGroup === "15-18";

  // Friendly encouragement text
  const encouragementMessage = useMemo(() => {
    if (weeklyProgressPercent >= 100) {
      return isJunior ? t("encouragementJuniorAll") : t("encouragementSeniorAll");
    }
    if (weeklyProgressPercent >= 60) {
      return isJunior ? t("encouragementJuniorHalf") : t("encouragementSeniorHalf");
    }
    return isJunior ? t("encouragementJuniorDefault") : t("encouragementSeniorDefault");
  }, [weeklyProgressPercent, isJunior, t]);

  // Helper for task type badge styling
  const getTaskTypeBadge = (type: PlannerTaskType) => {
    switch (type) {
      case "Watch Lecture":
        return {
          bg: "bg-blue-50 text-blue-700 border-blue-200/80",
          icon: <PlayCircle className="size-3 text-blue-600 mr-1" />,
        };
      case "Practice":
        return {
          bg: "bg-emerald-50 text-emerald-700 border-emerald-200/80",
          icon: <Sparkles className="size-3 text-emerald-600 mr-1" />,
        };
      case "Revision":
        return {
          bg: "bg-amber-50 text-amber-800 border-amber-200/80",
          icon: <RotateCcw className="size-3 text-amber-600 mr-1" />,
        };
      case "Assessment":
        return {
          bg: "bg-purple-50 text-purple-700 border-purple-200/80",
          icon: <CalendarCheck className="size-3 text-purple-600 mr-1" />,
        };
    }
  };

  return (
    <section
      id="course-planner"
      aria-label="Student Course Planner"
      className="space-y-6 pt-2"
    >
      {/* ======================================================== */}
      {/* 1. TOP HEADER & WEEK SELECTOR BANNER                     */}
      {/* ======================================================== */}
      <div className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-br from-[#FAF7F2] via-white to-[#F5EFEB] p-5 sm:p-6 shadow-xs">
        {/* Subtle decorative Government portal accents */}
        <div className="pointer-events-none absolute -right-12 -top-12 size-40 rounded-full bg-primary/5 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 right-40 size-36 rounded-full bg-amber-400/10 blur-xl" />

        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5">
          {/* Title & Info */}
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <div className="grid size-9 place-items-center rounded-xl bg-primary text-white shadow-xs">
                <CalendarCheck className="size-5" />
              </div>
              <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
                {t("myCoursePlanner")}
              </h2>
              {/* Mandatory read-only age group badge */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary border border-primary/20">
                <Sparkles className="size-3 text-primary" />
                {student.ageGroupLabel}
              </span>
            </div>

            <p className="mt-2 text-xs sm:text-sm text-slate-600 font-medium max-w-2xl leading-relaxed">
              {encouragementMessage}
            </p>

            <div className="mt-2.5 flex flex-wrap items-center gap-2 text-xs text-slate-500 font-medium">
              <span>Student: <strong className="text-slate-800">{student.displayName}</strong></span>
              <span>·</span>
              <span>Student ID: <strong className="text-slate-800 font-mono">{student.studentId}</strong></span>
              <span>·</span>
              <span className="text-emerald-700 font-semibold flex items-center gap-1">
                <CheckCircle2 className="size-3.5 text-emerald-600" />
                <span>{t("weeklyTasksFinished", { completed: weeklyCompletedTasks, total: weeklyTotalTasks })}</span>
              </span>
            </div>
          </div>

          {/* Simple Week Navigator */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2.5 shrink-0">
            <div className="inline-flex items-center rounded-xl bg-white border border-slate-200/90 p-1 shadow-2xs">
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setWeekOffset((prev) => Math.max(-1, prev - 1))}
                disabled={weekOffset <= -1}
                className="h-8 px-2.5 text-xs font-semibold text-slate-700 hover:text-primary hover:bg-slate-50"
                aria-label={t("previousWeek")}
              >
                <ChevronLeft className="size-4 mr-0.5" />
                <span className="hidden sm:inline">{t("previous")}</span>
              </Button>

              <Button
                type="button"
                variant={weekOffset === 0 ? "secondary" : "ghost"}
                size="sm"
                onClick={() => setWeekOffset(0)}
                className={`h-8 px-3 text-xs font-bold transition-all ${
                  weekOffset === 0
                    ? "bg-primary text-white hover:bg-primary/95 shadow-2xs"
                    : "text-slate-700 hover:bg-slate-50 hover:text-primary"
                }`}
              >
                <span>{t("thisWeek")}</span>
              </Button>

              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => setWeekOffset((prev) => Math.min(1, prev + 1))}
                disabled={weekOffset >= 1}
                className="h-8 px-2.5 text-xs font-semibold text-slate-700 hover:text-primary hover:bg-slate-50"
                aria-label={t("nextWeek")}
              >
                <span className="hidden sm:inline">{t("next")}</span>
                <ChevronRight className="size-4 ml-0.5" />
              </Button>
            </div>

            <span className="text-xs font-semibold text-slate-700 bg-white/80 border border-slate-200/80 px-3 py-1.5 rounded-lg shadow-2xs">
              {weekRangeLabel}
            </span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 2. TODAY'S LEARNING PLAN (MAIN HIGHLIGHT)                 */}
      {/* ======================================================== */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between pb-4 border-b border-slate-100 gap-3">
          <div className="flex items-center gap-2.5">
            <div className="grid size-8 place-items-center rounded-lg bg-primary/10 text-primary">
              <Clock className="size-4.5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight">
                  {selectedDayIndex === 1 && weekOffset === 0
                    ? t("todaysLearningPlan")
                    : t("daysLearningPlan", { day: t(getDayLabel(selectedDayObj.key).fullLabel) })}
                </h3>
                {selectedDayIndex === 1 && weekOffset === 0 && (
                  <Badge className="bg-amber-100 text-amber-900 hover:bg-amber-100 border-amber-300 font-bold text-[10px]">
                    {t("today")}
                  </Badge>
                )}
              </div>
              <p className="text-xs text-slate-500 font-medium">
                {isJunior
                  ? t("funShortModulesDesc")
                  : isSenior
                  ? t("structuredSeniorDesc")
                  : t("balancedMiddleDesc")}
              </p>
            </div>
          </div>

          {/* Daily Progress Counters */}
          <div className="flex items-center gap-4 bg-slate-50 border border-slate-200/80 px-3.5 py-2 rounded-xl text-xs">
            <div>
              <span className="text-[11px] font-medium text-slate-500 block leading-tight">
                {t("dailyCompletion")}
              </span>
              <span className="font-extrabold text-slate-800 text-sm">
                {t("tasksCount", { completed: dailyCompletedTasks, total: dailyTotalTasks })}
              </span>
            </div>
            <div className="h-6 w-px bg-slate-200" />
            <div>
              <span className="text-[11px] font-medium text-slate-500 block leading-tight">
                {t("studyTime")}
              </span>
              <span className="font-extrabold text-primary text-sm">
                {t("minutesCount", { completed: dailyCompletedMinutes, total: dailyTotalMinutes })}
              </span>
            </div>
          </div>
        </div>

        {/* Daily Progress Bar */}
        <div className="mt-4 pt-1">
          <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
            <span className="flex items-center gap-1.5">
              <span>{t("dayProgress")}</span>
              {dailyProgressPercent === 100 && (
                <span className="text-emerald-600 font-bold">
                  {t("allDoneForDay", { day: t(getDayLabel(selectedDayObj.key).fullLabel) })}
                </span>
              )}
            </span>
            <span className="font-bold text-primary">{dailyProgressPercent}%</span>
          </div>
          <Progress value={dailyProgressPercent} className="h-2 bg-slate-100" />
        </div>

        {/* 3 to 5 Tasks List */}
        <div className="mt-5 space-y-3">
          {selectedDayTasks.length === 0 ? (
            <div className="rounded-xl border border-dashed border-slate-200 p-8 text-center text-xs text-slate-500">
              {t("noTasksScheduled", { day: t(getDayLabel(selectedDayObj.key).fullLabel) })}
            </div>
          ) : (
            selectedDayTasks.map((task, idx) => {
              const typeBadge = getTaskTypeBadge(task.taskType);
              const isDone = task.status === "Completed";
              const isInProgress = task.status === "In Progress";

              return (
                <div
                  key={task.id}
                  className={`group relative rounded-xl border p-4 transition-all duration-150 ${
                    isDone
                      ? "bg-slate-50/70 border-slate-200/70 opacity-90"
                      : "bg-white border-slate-200 hover:border-primary/40 hover:shadow-sm"
                  }`}
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                    {/* Left: Task Info */}
                    <div className="flex items-start gap-3 min-w-0 flex-1">
                      {/* Interactive completion toggle button */}
                      <button
                        type="button"
                        onClick={() => handleToggleTaskStatus(task.id)}
                        className={`mt-0.5 grid size-6 place-items-center rounded-lg border transition-all cursor-pointer shrink-0 ${
                          isDone
                            ? "bg-emerald-600 border-emerald-600 text-white shadow-2xs"
                            : "border-slate-300 hover:border-emerald-500 bg-white text-transparent hover:text-slate-300"
                        }`}
                        title={isDone ? "Mark as Incomplete" : "Mark as Completed"}
                        aria-label={`Mark ${task.lessonTitle} as ${isDone ? "incomplete" : "completed"}`}
                      >
                        <CheckCircle2 className="size-4 text-white" />
                      </button>

                      <div className="min-w-0 flex-1">
                        {/* Course & Badges row */}
                        <div className="flex flex-wrap items-center gap-2 mb-1">
                          <span className="text-[11px] font-bold text-primary uppercase tracking-wide">
                            {task.courseName}
                          </span>
                          <span className="text-slate-300">·</span>

                          {/* Task Type Badge */}
                          <span
                            className={`inline-flex items-center rounded-md px-2 py-0.5 text-[10.5px] font-semibold border ${typeBadge.bg}`}
                          >
                            {typeBadge.icon}
                            {task.taskType === "Watch Lecture"
                              ? t("taskTypeWatchLecture")
                              : task.taskType === "Practice"
                              ? t("taskTypePractice")
                              : task.taskType === "Revision"
                              ? t("taskTypeRevision")
                              : t("taskTypeAssessment")}
                          </span>

                          {/* Duration Badge */}
                          <span className="inline-flex items-center text-[11px] font-medium text-slate-500">
                            <Clock className="size-3 mr-1 text-slate-400" />
                            {t("mins", { count: task.durationMinutes })}
                          </span>

                          {/* Status Pill */}
                          <span
                            className={`inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold ${
                              isDone
                                ? "bg-emerald-100 text-emerald-800"
                                : isInProgress
                                ? "bg-amber-100 text-amber-800"
                                : "bg-slate-100 text-slate-600"
                            }`}
                          >
                            {isDone
                              ? t("statusCompleted")
                              : isInProgress
                              ? t("statusInProgress")
                              : t("statusNotStarted")}
                          </span>

                          {task.priority === "High" && !isDone && (
                            <span className="rounded-full bg-red-100 px-2 py-0.2 text-[9.5px] font-extrabold text-red-700">
                              {t("priority")}
                            </span>
                          )}
                        </div>

                        {/* Lesson title */}
                        <h4
                          className={`text-sm font-bold text-slate-900 leading-snug ${
                            isDone ? "line-through text-slate-500" : ""
                          }`}
                        >
                          {task.lessonTitle}
                        </h4>

                        {/* Module subtitle */}
                        <p className="mt-0.5 text-xs text-slate-500 font-medium">
                          {task.moduleTitle}
                        </p>
                      </div>
                    </div>

                    {/* Right: Action Buttons */}
                    <div className="flex items-center gap-2 shrink-0 self-end sm:self-center">
                      <Button
                        type="button"
                        size="sm"
                        variant={isDone ? "outline" : "default"}
                        onClick={() => handleStartTask(task)}
                        className={`h-9 px-4 rounded-xl text-xs font-bold transition-all shadow-xs ${
                          isDone
                            ? "border-slate-200 text-slate-700 hover:bg-slate-100 hover:text-slate-900"
                            : "bg-primary hover:bg-primary/95 text-white active:scale-[0.98]"
                        }`}
                      >
                        {task.taskType === "Assessment" ? (
                          <>
                            <CalendarCheck className="size-3.5 mr-1.5" />
                            <span>{isDone ? t("reviewTest") : t("startAssessment")}</span>
                          </>
                        ) : (
                          <>
                            <PlayCircle className="size-3.5 mr-1.5" />
                            <span>{isDone ? t("revisitLecture") : isInProgress ? t("continueLearning") : t("startLearning")}</span>
                          </>
                        )}
                      </Button>

                      {/* Explicit Mark Complete Action Button */}
                      <Button
                        type="button"
                        size="sm"
                        variant="ghost"
                        onClick={() => handleToggleTaskStatus(task.id)}
                        className={`h-9 px-3 rounded-xl text-xs font-semibold ${
                          isDone
                            ? "text-emerald-700 hover:bg-emerald-50"
                            : "text-slate-600 hover:text-emerald-700 hover:bg-slate-100"
                        }`}
                      >
                        {isDone ? (
                          <span className="flex items-center gap-1">
                            <CheckCircle2 className="size-3.5 text-emerald-600" />
                            <span>{t("done")}</span>
                          </span>
                        ) : (
                          <span>{t("markAsCompleteBtn")}</span>
                        )}
                      </Button>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 3. WEEKLY STUDY PLAN (MONDAY TO SUNDAY)                  */}
      {/* ======================================================== */}
      <div className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100">
          <div className="flex items-center gap-2">
            <div className="grid size-7 place-items-center rounded-md bg-amber-50 text-amber-700">
              <Calendar className="size-4" />
            </div>
            <div>
              <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                {t("weeklyStudyPlan")}
              </h3>
              <p className="text-xs text-slate-500 font-medium">
                {t("weeklyStudyPlanSubtitle")}
              </p>
            </div>
          </div>

          <span className="text-xs font-bold text-slate-600 hidden sm:inline">
            {t("sevenDaySchedule")}
          </span>
        </div>

        {/* 7 Day Grid */}
        <div className="mt-4 grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5 sm:gap-3">
          {DAYS_OF_WEEK.map((day) => {
            const dayTasks = tasks.filter((t) => t.dayIndex === day.index);
            const total = dayTasks.length;
            const completed = dayTasks.filter((t) => t.status === "Completed").length;
            const isToday = day.index === 1 && weekOffset === 0;
            const isSelected = selectedDayIndex === day.index;
            const isAllDone = total > 0 && completed === total;
            const dayInfo = getDayLabel(day.key);

            return (
              <button
                key={day.key}
                type="button"
                onClick={() => setSelectedDayIndex(day.index)}
                className={`relative flex flex-col justify-between rounded-xl p-3.5 text-left transition-all cursor-pointer ${
                  isSelected
                    ? "border-2 border-primary bg-primary/5 shadow-xs"
                    : isToday
                    ? "border-2 border-amber-400 bg-amber-50/40 hover:bg-amber-50/70"
                    : "border border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50/80"
                }`}
              >
                {/* Top: Day Label + Today Pill */}
                <div>
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <span
                      className={`text-xs font-black uppercase tracking-wider ${
                        isSelected ? "text-primary" : "text-slate-800"
                      }`}
                    >
                      {t(dayInfo.label)}
                    </span>
                    {isToday && (
                      <span className="rounded-full bg-amber-400 px-1.5 py-0.2 text-[9px] font-extrabold text-amber-950">
                        {t("today")}
                      </span>
                    )}
                  </div>

                  <p className="text-[11px] font-medium text-slate-500">
                    {t(dayInfo.fullLabel)}
                  </p>
                </div>

                {/* Bottom: Completion Indicator */}
                <div className="mt-3 pt-2 border-t border-slate-100/90 space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-semibold text-slate-700">
                    <span>{t("tasksNum", { count: total })}</span>
                    <span
                      className={
                        isAllDone
                          ? "text-emerald-700 font-bold"
                          : completed > 0
                          ? "text-primary font-bold"
                          : "text-slate-400"
                      }
                    >
                      {completed}/{total}
                    </span>
                  </div>

                  {/* Mini progress bar */}
                  <div className="h-1.5 w-full rounded-full bg-slate-100 overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-300 ${
                        isAllDone
                          ? "bg-emerald-500"
                          : completed > 0
                          ? "bg-primary"
                          : "bg-transparent"
                      }`}
                      style={{
                        width: `${total > 0 ? (completed / total) * 100 : 0}%`,
                      }}
                    />
                  </div>

                  {isAllDone && (
                    <div className="flex items-center gap-1 text-[10px] font-bold text-emerald-700 pt-0.5">
                      <CheckCircle2 className="size-3 text-emerald-600" />
                      <span>{t("statusCompleted")}</span>
                    </div>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* ======================================================== */}
      {/* 4. MY LEARNING GOALS & RECOMMENDATIONS GRID              */}
      {/* ======================================================== */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6">
        {/* SECTION 4A: My Weekly Goals (5 cols) */}
        <div className="lg:col-span-5 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="grid size-7 place-items-center rounded-md bg-emerald-50 text-emerald-700">
                  <Target className="size-4" />
                </div>
                <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                  {t("myWeeklyGoals")}
                </h3>
              </div>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  setDraftGoalHours(goals.targetHours);
                  setDraftGoalTasks(goals.targetTasks);
                  setGoalDialogOpen(true);
                }}
                className="h-7 px-2.5 rounded-lg text-[11px] font-bold border-slate-200 text-slate-700 hover:text-primary hover:bg-slate-50"
              >
                <SlidersHorizontal className="size-3 mr-1" />
                <span>{t("adjustTargets")}</span>
              </Button>
            </div>

            {/* Overall Progress Circle / Bar */}
            <div className="mt-4 rounded-xl bg-gradient-to-br from-emerald-50/70 to-teal-50/50 border border-emerald-200/70 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-xs font-semibold text-emerald-900 uppercase tracking-wide">
                    {t("weeklyProgress")}
                  </span>
                  <div className="mt-0.5 text-2xl font-black text-emerald-950">
                    {weeklyProgressPercent}%
                  </div>
                </div>
                <div className="grid size-11 place-items-center rounded-full bg-white text-emerald-700 shadow-xs border border-emerald-200">
                  <Trophy className="size-5.5 text-emerald-600" />
                </div>
              </div>

              <Progress
                value={weeklyProgressPercent}
                className="h-2.5 mt-3 bg-white/80"
              />

              <p className="mt-2 text-[11px] text-emerald-900 font-medium">
                {weeklyCompletedHours >= goals.targetHours
                  ? t("targetAchievedBonus")
                  : t("hoursLeftTarget", { hours: (goals.targetHours - weeklyCompletedHours).toFixed(1) })}
              </p>
            </div>

            {/* Target vs Actual Grid */}
            <div className="mt-4 grid grid-cols-2 gap-3 text-xs">
              {/* Learning Hours */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  {t("studyHours")}
                </span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-xl font-black text-slate-900">
                    {weeklyCompletedHours}
                  </span>
                  <span className="text-slate-500 font-medium">/ {goals.targetHours} {t("hrsShort", { count: "" }).trim()}</span>
                </div>
                <div className="mt-2">
                  <Progress
                    value={Math.min(100, (weeklyCompletedHours / goals.targetHours) * 100)}
                    className="h-1.5 bg-slate-200"
                  />
                </div>
              </div>

              {/* Tasks Completed */}
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <span className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider block">
                  {t("plannedTasks")}
                </span>
                <div className="mt-1 flex items-baseline gap-1">
                  <span className="text-xl font-black text-slate-900">
                    {weeklyCompletedTasks}
                  </span>
                  <span className="text-slate-500 font-medium">/ {goals.targetTasks} {t("tasksShort", { count: "" }).trim()}</span>
                </div>
                <div className="mt-2">
                  <Progress
                    value={Math.min(100, (weeklyCompletedTasks / goals.targetTasks) * 100)}
                    className="h-1.5 bg-slate-200"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>{t("registeredStream")}: <strong>{student.ageGroupLabel}</strong></span>
            <button
              type="button"
              onClick={handleResetSchedule}
              className="text-primary hover:underline font-semibold cursor-pointer"
            >
              {t("resetSchedule")}
            </button>
          </div>
        </div>

        {/* SECTION 4B: Smart Study Recommendations (7 cols) */}
        <div className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="grid size-7 place-items-center rounded-md bg-amber-50 text-amber-700">
                  <Lightbulb className="size-4" />
                </div>
                <div>
                  <h3 className="text-base font-extrabold text-slate-900 tracking-tight">
                    {t("recommendedNextSteps")}
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    {t("recommendedNextStepsSubtitle")}
                  </p>
                </div>
              </div>
              <span className="rounded-full bg-primary/10 px-2.5 py-0.5 text-[10.5px] font-bold text-primary">
                {t("ruleBased")}
              </span>
            </div>

            {/* Recommendations List */}
            <div className="mt-4 space-y-3">
              {recommendations.map((rec) => (
                <div
                  key={rec.id}
                  className="rounded-xl border border-slate-200/90 bg-slate-50/60 p-3.5 transition-all hover:border-slate-300 hover:bg-slate-50"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                    <div className="space-y-1 min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span
                          className={`rounded-md border px-2 py-0.2 text-[10px] font-bold ${rec.badgeColor}`}
                        >
                          {rec.badge}
                        </span>
                        <span className="text-xs font-bold text-slate-900 truncate">
                          {rec.title}
                        </span>
                      </div>
                      <p className="text-xs text-slate-600 leading-snug font-medium">
                        {rec.reason}
                      </p>
                      <p className="text-[11px] text-slate-500 italic">
                        {rec.courseName} · {rec.lessonTitle}
                      </p>
                    </div>

                    <div className="shrink-0 self-end sm:self-center">
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          if (rec.actionType === "assessment") {
                            onOpenAssessment({
                              id: rec.id,
                              title: rec.lessonTitle,
                              courseName: rec.courseName,
                              durationMinutes: rec.durationMinutes,
                            });
                          } else {
                            onOpenVideo({
                              id: rec.courseId,
                              name: rec.courseName,
                              ageGroup: student.ageGroup,
                              description: rec.lessonTitle,
                            });
                          }
                        }}
                        className="h-8 px-3.5 rounded-lg bg-primary hover:bg-primary/95 text-white text-xs font-bold shadow-2xs"
                      >
                        {rec.actionType === "assessment" ? (
                          <CalendarCheck className="size-3.5 mr-1" />
                        ) : (
                          <PlayCircle className="size-3.5 mr-1" />
                        )}
                        <span>{rec.actionLabel}</span>
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-500 font-medium">
            <span>{t("recommendationsFooter")}</span>
            <span className="text-slate-400">·</span>
            <span className="text-slate-600 font-semibold">{student.schoolDistrict}</span>
          </div>
        </div>
      </div>

      {/* ======================================================== */}
      {/* 5. ADJUST TARGETS MODAL DIALOG                           */}
      {/* ======================================================== */}
      <Dialog open={goalDialogOpen} onOpenChange={setGoalDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <Target className="size-5" />
              </div>
              <div>
                <span className="text-base font-bold text-foreground">
                  {t("adjustWeeklyStudyGoals")}
                </span>
                <p className="text-xs font-normal text-muted-foreground">
                  {t("personalTargetFor", { name: student.displayName, ageGroup: student.ageGroupLabel })}
                </p>
              </div>
            </DialogTitle>
            <DialogDescription className="text-xs pt-1 text-slate-600">
              {t("adjustGoalsNotice")}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-2">
            {/* Target Hours */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>{t("targetStudyHoursWeekly")}</span>
                <span className="font-bold text-primary text-sm">{t("hoursUnit", { count: draftGoalHours })}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[3.0, 5.0, 7.5, 10.0].map((h) => (
                  <button
                    key={h}
                    type="button"
                    onClick={() => setDraftGoalHours(h)}
                    className={`h-9 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      draftGoalHours === h
                        ? "border-primary bg-primary text-white shadow-2xs"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {t("hrsShort", { count: h })}
                  </button>
                ))}
              </div>
            </div>

            {/* Target Tasks */}
            <div className="space-y-2 pt-2 border-t border-slate-100">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-700">
                <span>{t("targetTasksWeekly")}</span>
                <span className="font-bold text-primary text-sm">{t("tasksUnit", { count: draftGoalTasks })}</span>
              </div>
              <div className="grid grid-cols-4 gap-2">
                {[8, 12, 15, 20].map((tCount) => (
                  <button
                    key={tCount}
                    type="button"
                    onClick={() => setDraftGoalTasks(tCount)}
                    className={`h-9 rounded-lg border text-xs font-bold transition-all cursor-pointer ${
                      draftGoalTasks === tCount
                        ? "border-primary bg-primary text-white shadow-2xs"
                        : "border-slate-200 bg-white text-slate-700 hover:bg-slate-50"
                    }`}
                  >
                    {t("tasksShort", { count: tCount })}
                  </button>
                ))}
              </div>
            </div>

            <div className="rounded-xl bg-slate-50 border border-slate-200/80 p-3 text-xs text-slate-600">
              <p className="font-semibold text-slate-800">{t("ageGroupAccessNotice")}</p>
              <p className="mt-0.5 text-[11px] text-slate-500">
                {t("curriculumLockedNotice", { ageGroup: student.ageGroupLabel })}
              </p>
            </div>
          </div>

          <DialogFooter className="flex justify-end gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setGoalDialogOpen(false)}
              className="text-xs"
            >
              {t("cancel")}
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={handleSaveGoals}
              className="bg-primary hover:bg-primary/95 text-white text-xs font-bold"
            >
              {t("saveTargets")}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </section>
  );
}
