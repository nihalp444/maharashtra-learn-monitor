import { createFileRoute } from "@tanstack/react-router";
import { AdminLeadership } from "@/components/mis/admin-leadership";

export const Route = createFileRoute("/_authenticated/leadership")({
  head: () => ({
    meta: [
      { title: "Maharashtra Leadership & Student Rankings | MBOCWWB" },
      {
        name: "description",
        content:
          "Official state-level leadership and student ranking monitoring across Maharashtra districts, talukas, and schools.",
      },
      {
        property: "og:title",
        content: "Maharashtra Leadership & Student Rankings | MBOCWWB",
      },
      {
        property: "og:description",
        content: "Statewide student academic standings and scholarship administration.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: AdminLeadershipPage,
});

function AdminLeadershipPage() {
  return <AdminLeadership />;
}
