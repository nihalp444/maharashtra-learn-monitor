import { createFileRoute, redirect } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/")({
  beforeLoad: async () => {
    try {
      const { data, error } = await supabase.auth.getUser();
      if (!error && data.user) {
        throw redirect({ to: "/dashboard" });
      }
    } catch (e) {
      if ((e as { to?: string })?.to) throw e;
    }

    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("mbocwwb-demo-auth");
      if (storedAuth) {
        throw redirect({ to: "/dashboard" });
      }
    }

    throw redirect({ to: "/auth" });
  },
});