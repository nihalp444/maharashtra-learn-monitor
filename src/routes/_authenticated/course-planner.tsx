import { createFileRoute, Link, redirect, useNavigate } from "@tanstack/react-router";
import {
  ArrowLeft,
  CalendarCheck2,
  ChevronRight,
  GraduationCap,
  Home,
  PlayCircle,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { CourseVideoModal, type ProgramVideoTarget } from "@/components/mis/course-video-modal";
import { CoursePlanner } from "@/components/student/course-planner";
import {
  isStudentUsername,
  STUDENT_ACCOUNTS,
  type StudentProfile,
} from "@/features/student/student-data";
import { studentService } from "@/features/student/student-service";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/course-planner")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "My Course Planner | Maharashtra Learning MIS" },
      {
        name: "description",
        content:
          "Personalized study planner, daily learning tasks, weekly schedule, and study goals for Maharashtra students.",
      },
      {
        property: "og:title",
        content: "My Course Planner | Maharashtra Learning MIS",
      },
    ],
  }),
  beforeLoad: async () => {
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("mbocwwb-demo-auth");
      // Admin should not access Course Planner page
      if (storedAuth === "admin") {
        throw redirect({ to: "/dashboard" });
      }
    }
  },
  component: CoursePlannerPage,
});

function CoursePlannerPage() {
  const navigate = useNavigate();
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [isUnauthorized, setIsUnauthorized] = useState(false);

  // Video & Assessment Modals
  const [selectedVideoProgram, setSelectedVideoProgram] =
    useState<ProgramVideoTarget | null>(null);
  const [activeModal, setActiveModal] = useState<{
    type: "course" | "assessment";
    title: string;
    subtitle: string;
  } | null>(null);

  useEffect(() => {
    // 1. Check local demo authentication
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("mbocwwb-demo-auth");
      if (storedAuth && isStudentUsername(storedAuth)) {
        setStudent(STUDENT_ACCOUNTS[storedAuth]);
        setLoading(false);
        return;
      } else if (storedAuth === "admin") {
        setIsUnauthorized(true);
        setLoading(false);
        return;
      }
    }

    // 2. Check Supabase user
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

          setStudent(profile);
          setLoading(false);
          return;
        } else {
          setIsUnauthorized(true);
          setLoading(false);
          return;
        }
      }

      // Default fallback for demo if logged in
      const defaultStudent = STUDENT_ACCOUNTS["aarav11"];
      setStudent(defaultStudent);
      setLoading(false);
    });
  }, []);

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="flex flex-col items-center gap-3">
          <div className="size-10 rounded-full border-4 border-primary/20 border-t-primary animate-spin" />
          <p className="text-xs font-semibold text-slate-600">Loading Course Planner...</p>
        </div>
      </div>
    );
  }

  if (isUnauthorized || !student) {
    return (
      <div className="p-8 max-w-lg mx-auto text-center space-y-4">
        <div className="grid size-12 place-items-center rounded-2xl bg-amber-50 text-amber-600 mx-auto">
          <ShieldAlert className="size-6" />
        </div>
        <h2 className="text-lg font-bold text-slate-900">Student Access Only</h2>
        <p className="text-xs text-slate-600">
          The Course Planner is exclusively designed for registered students. Administrator accounts cannot access student study plans.
        </p>
        <Button
          onClick={() => void navigate({ to: "/dashboard" })}
          className="bg-primary hover:bg-primary/95 text-white text-xs font-bold"
        >
          Return to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-5 px-4 sm:px-6 lg:px-8 py-5">
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-slate-200/80">
        <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
          <Link
            to="/dashboard"
            className="flex items-center gap-1 hover:text-primary transition-colors"
          >
            <Home className="size-3.5" />
            <span>Dashboard</span>
          </Link>
          <ChevronRight className="size-3.5 text-slate-400" />
          <span className="text-slate-800 font-bold flex items-center gap-1.5">
            <CalendarCheck2 className="size-3.5 text-primary" />
            <span>Course Planner</span>
          </span>
          <span className="text-slate-300">·</span>
          <span className="text-primary font-semibold">{student.ageGroupLabel}</span>
        </nav>

        <Link
          to="/dashboard"
          className="inline-flex items-center gap-1.5 rounded-lg border border-slate-200 bg-white px-3 py-1.5 text-xs font-bold text-slate-700 hover:bg-slate-50 hover:text-primary transition-all shadow-2xs"
        >
          <ArrowLeft className="size-3.5" />
          <span>Back to Dashboard</span>
        </Link>
      </div>

      {/* Main Course Planner Page Component */}
      <CoursePlanner
        student={student}
        onOpenVideo={(target) => setSelectedVideoProgram(target)}
        onOpenAssessment={(assessment) =>
          setActiveModal({
            type: "assessment",
            title: assessment.title,
            subtitle: `${assessment.courseName} · ${assessment.durationMinutes} mins · ${assessment.questions || 20} Questions`,
          })
        }
      />

      {/* Assessment Launch Modal */}
      <Dialog open={activeModal !== null} onOpenChange={(open) => !open && setActiveModal(null)}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                <CalendarCheck2 className="size-5" />
              </div>
              <div>
                <span className="text-base font-bold text-foreground">Launch Assessment</span>
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
              This checkpoint evaluates syllabus topics from your registered stream. Your responses and scores will sync back with your official Maharashtra Digital Learning profile.
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
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={() => setActiveModal(null)}
              className="bg-primary hover:bg-primary/95 text-white text-xs font-bold"
            >
              Begin Assessment
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
    </div>
  );
}
