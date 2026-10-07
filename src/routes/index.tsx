import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  head: () => ({ meta: [
    { title: "MBOCWWB Digital Learning — Welcome" },
    { name: "description", content: "Welcome to Maharashtra's digital learning initiative for construction workers' children." },
    { property: "og:title", content: "MBOCWWB Digital Learning — Welcome" },
    { property: "og:description", content: "Explore Maharashtra's digital learning initiative." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
  beforeLoad: () => { throw redirect({ to: "/home" }); },
});