import {
  Award,
  BookOpen,
  Calendar,
  CheckCircle2,
  Clock,
  Flame,
  GraduationCap,
  PlayCircle,
  Sparkles,
  TrendingUp,
  Trophy,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { StudentProfile } from "@/features/student/student-data";

interface StudentDashboardProps {
  student: StudentProfile;
}

export function StudentDashboard({ student }: StudentDashboardProps) {
  const [activeModal, setActiveModal] = useState<{
    type: "course" | "assessment";
    title: string;
    subtitle: string;
  } | null>(null);

  const { continueLearning, kpis, courses, upcomingAssessment, achievements } = student;

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
                <span>Welcome, {student.displayName}</span>
                <span className="inline-block animate-bounce">👋</span>
              </h1>
              {/* Mandatory Registered Age Group Label - purely read-only badge, NO dropdown */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-amber-200 backdrop-blur-sm border border-white/25 shadow-xs">
                <Sparkles className="size-3.5 text-amber-300" />
                {student.ageGroupLabel}
              </span>
            </div>

            <p className="mt-2 text-xs sm:text-sm text-white/90 max-w-2xl font-medium leading-relaxed">
              Your personalized digital learning workspace · Student ID:{" "}
              <span className="font-mono font-bold text-amber-200">{student.studentId}</span> ·{" "}
              <span>{student.schoolDistrict}</span>
            </p>
          </div>

          <div className="flex items-center gap-3 shrink-0 self-start md:self-auto">
            <div className="flex items-center gap-2 rounded-xl bg-white/12 px-3.5 py-2 border border-white/15 backdrop-blur-sm text-xs font-semibold text-white shadow-xs">
              <Flame className="size-4 text-amber-300 fill-amber-300 animate-pulse" />
              <span>{achievements.learningStreakDays} Day Streak</span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/12 px-3.5 py-2 border border-white/15 backdrop-blur-sm text-xs font-semibold text-white shadow-xs">
              <Trophy className="size-4 text-amber-300" />
              <span>{achievements.assessmentsCompleted} Passed</span>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 1: Personal KPI Cards */}
      <section aria-label="Personal Learning Indicators" id="my-progress">
        <div className="grid grid-cols-2 gap-3.5 sm:grid-cols-2 lg:grid-cols-4 sm:gap-4">
          {/* 1. My Courses */}
          <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs transition-transform hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                My Courses
              </span>
              <div className="grid size-9 place-items-center rounded-lg bg-blue-50 text-blue-600">
                <BookOpen className="size-4.5" />
              </div>
            </div>
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {kpis.myCourses}
              </span>
              <span className="text-xs font-medium text-slate-500">Enrolled Programs</span>
            </div>
            <p className="mt-1 text-[11px] text-blue-700 font-medium">Full curriculum access</p>
          </div>

          {/* 2. Courses In Progress */}
          <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs transition-transform hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Courses In Progress
              </span>
              <div className="grid size-9 place-items-center rounded-lg bg-amber-50 text-amber-600">
                <GraduationCap className="size-4.5" />
              </div>
            </div>
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {kpis.coursesInProgress}
              </span>
              <span className="text-xs font-medium text-slate-500">Active</span>
            </div>
            <p className="mt-1 text-[11px] text-amber-700 font-medium">Regularly studied</p>
          </div>

          {/* 3. Learning Hours */}
          <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs transition-transform hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Learning Hours
              </span>
              <div className="grid size-9 place-items-center rounded-lg bg-emerald-50 text-emerald-600">
                <Clock className="size-4.5" />
              </div>
            </div>
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {kpis.learningHours}
              </span>
              <span className="text-xs font-medium text-slate-500">Total hrs</span>
            </div>
            <p className="mt-1 text-[11px] text-emerald-700 font-medium">Time spent learning</p>
          </div>

          {/* 4. Average Assessment Score */}
          <div className="rounded-xl border border-slate-200/90 bg-white p-4 shadow-xs transition-transform hover:-translate-y-0.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">
                Average Score
              </span>
              <div className="grid size-9 place-items-center rounded-lg bg-purple-50 text-purple-600">
                <TrendingUp className="size-4.5" />
              </div>
            </div>
            <div className="mt-2.5 flex items-baseline gap-2">
              <span className="text-2xl sm:text-3xl font-black text-slate-900">
                {kpis.averageScore}%
              </span>
              <span className="text-xs font-medium text-emerald-600 font-semibold">Excellent</span>
            </div>
            <p className="mt-1 text-[11px] text-purple-700 font-medium">Across all quiz attempts</p>
          </div>
        </div>
      </section>

      {/* SECTION 2: Continue Learning */}
      <section aria-label="Continue Learning Course">
        <div className="rounded-2xl border border-slate-200/90 bg-gradient-to-br from-white via-white to-slate-50 p-5 sm:p-6 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <div className="grid size-7 place-items-center rounded-md bg-primary/10 text-primary">
                <PlayCircle className="size-4.5" />
              </div>
              <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                Continue Learning
              </h2>
            </div>
            <span className="rounded-full bg-emerald-100 px-2.5 py-0.5 text-[11px] font-bold text-emerald-800">
              Active Course
            </span>
          </div>

          <div className="mt-4 flex flex-col md:flex-row md:items-center justify-between gap-5">
            <div className="space-y-2 flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="rounded bg-primary/10 px-2 py-0.5 text-[11px] font-bold text-primary">
                  In Progress
                </span>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 truncate">
                  {continueLearning.courseName}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-600 font-medium">
                {continueLearning.currentModule}
              </p>
              <p className="text-xs text-slate-500 italic">
                Next: {continueLearning.currentLecture}
              </p>

              {/* Progress Bar & percentage */}
              <div className="pt-2 max-w-xl">
                <div className="flex items-center justify-between text-xs font-semibold text-slate-700 mb-1.5">
                  <span>Course Progress</span>
                  <span className="font-bold text-primary">{continueLearning.progress}%</span>
                </div>
                <Progress value={continueLearning.progress} className="h-2.5 bg-slate-100" />
                <p className="mt-1 text-[11px] text-slate-500">
                  Completed {continueLearning.completedLectures} of {continueLearning.totalLectures} lectures
                </p>
              </div>
            </div>

            <div className="shrink-0 flex items-center">
              <Button
                onClick={() =>
                  setActiveModal({
                    type: "course",
                    title: continueLearning.courseName,
                    subtitle: continueLearning.currentLecture,
                  })
                }
                className="w-full sm:w-auto h-11 px-6 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold text-xs sm:text-sm shadow-md flex items-center justify-center gap-2 transition-transform active:scale-[0.98]"
              >
                <PlayCircle className="size-4.5" />
                <span>Continue Learning</span>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: My Learning Programs (Age-Group Specific) */}
      <section aria-label="My Learning Programs" id="my-learning">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-base sm:text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
              <span>My Learning</span>
              <span className="text-xs font-medium text-slate-500">({courses.length} Courses)</span>
            </h2>
            <p className="text-xs text-slate-600 font-medium">
              Curriculum specifically structured for your registered age group
            </p>
          </div>
          <span className="text-xs font-bold text-primary bg-primary/10 px-2.5 py-1 rounded-md">
            {student.ageGroupLabel}
          </span>
        </div>

        {/* Dynamic Grid: 4 columns for 6-10 and 11-14, 3 columns for 15-18 */}
        <div
          className={`grid gap-4 sm:gap-5 ${
            courses.length === 3
              ? "grid-cols-1 md:grid-cols-3"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          }`}
        >
          {courses.map((course) => (
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
                  <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[10.5px] font-semibold text-slate-600 truncate max-w-[140px]">
                    {course.category}
                  </span>
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
                    <span>Progress</span>
                    <span className="font-bold text-primary">{course.progress}%</span>
                  </div>
                  <Progress value={course.progress} className="h-2 bg-slate-100" />

                  <div className="flex items-center justify-between pt-1 text-[11px] text-slate-600 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock className="size-3 text-slate-400" />
                      <span>{course.learningHours} hrs spent</span>
                    </span>
                    <span>
                      {course.completedModules}/{course.totalModules} modules
                    </span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <div className="mt-4 pt-2">
                <Button
                  variant={course.progress > 0 ? "default" : "outline"}
                  onClick={() =>
                    setActiveModal({
                      type: "course",
                      title: course.name,
                      subtitle: `${course.currentModule} · ${course.currentLecture}`,
                    })
                  }
                  className={`w-full h-9 rounded-lg text-xs font-bold transition-all ${
                    course.progress > 0
                      ? "bg-primary hover:bg-primary/95 text-white"
                      : "border-primary text-primary hover:bg-primary/5"
                  }`}
                >
                  {course.progress > 0 ? "Continue Learning" : "Start Learning"}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Grid for SECTION 4 (Upcoming Assessment) & SECTION 5 (Achievements) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6" id="assessments">
        {/* SECTION 4: Upcoming Assessment (5 cols) */}
        <section
          aria-label="Upcoming Assessment"
          className="lg:col-span-5 flex flex-col justify-between rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs"
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="grid size-7 place-items-center rounded-md bg-amber-50 text-amber-700">
                  <Calendar className="size-4" />
                </div>
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                  Upcoming Assessment
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
                  <span className="font-medium">Scheduled Date:</span>
                  <span className="font-bold text-slate-800">{upcomingAssessment.scheduledDate}</span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-medium">Assessment Duration:</span>
                  <span className="font-semibold text-slate-800">
                    {upcomingAssessment.durationMinutes} Minutes
                  </span>
                </div>
                <div className="flex items-center justify-between text-slate-600">
                  <span className="font-medium">Total Questions:</span>
                  <span className="font-semibold text-slate-800">
                    {upcomingAssessment.totalQuestions} Questions
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100">
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
              <span>Start Assessment</span>
            </Button>
          </div>
        </section>

        {/* SECTION 5: Achievements (7 cols) */}
        <section
          id="achievements"
          aria-label="Student Achievements"
          className="lg:col-span-7 rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <div className="grid size-7 place-items-center rounded-md bg-purple-50 text-purple-700">
                  <Trophy className="size-4" />
                </div>
                <h2 className="text-sm sm:text-base font-extrabold text-slate-900 tracking-tight">
                  Achievements &amp; Milestones
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
                  Modules Completed
                </div>
              </div>

              <div className="rounded-xl bg-amber-50/60 border border-amber-100 p-3 text-center">
                <div className="text-lg sm:text-2xl font-black text-amber-700 flex items-center justify-center gap-1">
                  <span>{achievements.learningStreakDays}</span>
                  <Flame className="size-4 fill-amber-500 text-amber-500" />
                </div>
                <div className="mt-0.5 text-[11px] font-semibold text-amber-900 leading-tight">
                  Days Learning Streak
                </div>
              </div>

              <div className="rounded-xl bg-slate-50 border border-slate-100 p-3 text-center">
                <div className="text-lg sm:text-2xl font-black text-slate-900">
                  {achievements.assessmentsCompleted}
                </div>
                <div className="mt-0.5 text-[11px] font-semibold text-slate-600 leading-tight">
                  Assessments Completed
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

          <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500 font-medium">
            <span className="flex items-center gap-1.5 text-emerald-700">
              <CheckCircle2 className="size-3.5 text-emerald-600" />
              <span>Registered Scholar Status: Active</span>
            </span>
            <span>Level: {achievements.specialBadge.category}</span>
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
                  {activeModal?.type === "assessment" ? "Launch Assessment" : "Resume Learning"}
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
                ? "This test evaluates concepts from your registered syllabus. Ensure you have a stable connection."
                : "Your learning progress is synced in real-time with Maharashtra Digital Learning MIS."}
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
              Back to Dashboard
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => setActiveModal(null)}
              className="bg-primary hover:bg-primary/95 text-white text-xs font-bold"
            >
              {activeModal?.type === "assessment" ? "Begin Test" : "Open Player"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
