import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { AssessmentsScholarshipsPage } from "@/components/student/assessments-scholarships-page";
import {
  isStudentUsername,
  STUDENT_ACCOUNTS,
  type StudentProfile,
} from "@/features/student/student-data";
import { studentService } from "@/features/student/student-service";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/assessments-scholarships")({
  ssr: false,
  head: () => ({
    meta: [
      { title: "Assessments & Scholarships | Student Dashboard | MBOCWWB" },
      {
        name: "description",
        content:
          "Curriculum tests, diagnostic mock exams, performance history, and scholarship opportunities for Maharashtra students.",
      },
      {
        property: "og:title",
        content: "Assessments & Scholarships | Student Dashboard | MBOCWWB",
      },
    ],
  }),
  component: StudentAssessmentsScholarshipsRoutePage,
});

function StudentAssessmentsScholarshipsRoutePage() {
  const navigate = useNavigate();
  const [student, setStudent] = useState<StudentProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // 1. Check local demo session
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("mbocwwb-demo-auth");
      if (storedAuth && isStudentUsername(storedAuth)) {
        setStudent(STUDENT_ACCOUNTS[storedAuth]);
        setLoading(false);
        return;
      } else if (storedAuth === "admin") {
        // Redirect admin to assessment analytics
        void navigate({ to: "/assessment-analytics", replace: true });
        return;
      }
    }

    // 2. Check Supabase auth session
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
          void navigate({ to: "/assessment-analytics", replace: true });
          return;
        }
      }
      setLoading(false);
    });
  }, [navigate]);

  if (loading) {
    return (
      <div className="flex h-64 items-center justify-center">
        <div className="size-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </div>
    );
  }

  if (!student) {
    // Default fallback to Aarav 11
    return <AssessmentsScholarshipsPage student={STUDENT_ACCOUNTS["aarav11"]} />;
  }

  return <AssessmentsScholarshipsPage student={student} />;
}
