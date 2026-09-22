import { createFileRoute, Outlet, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { STUDENT_ACCOUNTS, isStudentUsername } from "@/features/student/student-data";

export const Route = createFileRoute("/_authenticated")({
  ssr: false,
  beforeLoad: async () => {
    // 1. Check Supabase auth session
    try {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data.user) {
        return { user: data.user };
      }
    } catch {
      // ignore network errors
    }

    // 2. Check local demo session (admin or student)
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("mbocwwb-demo-auth");
      if (storedAuth === "admin") {
        return {
          user: {
            id: "demo-admin-id",
            email: "admin@user.mbocwwb.gov.in",
            user_metadata: {
              username: "admin",
              display_name: "State Directorate Administrator",
              role: "admin",
            },
          },
        };
      }

      if (storedAuth && isStudentUsername(storedAuth)) {
        const student = STUDENT_ACCOUNTS[storedAuth];
        return {
          user: {
            id: student.id,
            email: `${student.username}@user.mbocwwb.gov.in`,
            user_metadata: {
              username: student.username,
              display_name: student.displayName,
              role: "student",
              age_group: student.ageGroup,
              age_group_label: student.ageGroupLabel,
              student_id: student.studentId,
            },
          },
        };
      }
    }

    throw redirect({ to: "/auth" });
  },
  component: () => <Outlet />,
});