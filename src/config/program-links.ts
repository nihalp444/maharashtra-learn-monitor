import type { ReactNode } from "react";

// Centralized Klassroom redirection URLs
// These can be updated anytime after confirmation with the Klassroom team.
export const KLASSROOM_LINKS: Record<string, string> = {
  // Age 6–10
  foundationalLearning: "https://www.klassroom.in/klassroom-ott/",
  mathNumeracy610: "https://www.klassroom.in/klassroom-ott/",
  scienceExploration610: "https://www.klassroom.in/klassroom-ott/",
  gkLifeSkills610: "https://www.klassroom.in/klassroom-ott/",

  // Age 11–14
  mathProblemSolving1114: "https://www.klassroom.in/klassroom-ott/",
  scienceDiscovery1114: "https://www.klassroom.in/klassroom-ott/",
  digitalSkills1114: "https://www.klassroom.in/klassroom-ott/",
  logicalReasoning1114: "https://www.klassroom.in/klassroom-ott/",

  // Age 15–18
  aiMl: "https://www.klassroom.in/klassroom-ott/course-list/ai-ml",
  neet: "https://www.klassroom.in/klassroom-ott/",
  jee: "https://www.klassroom.in/klassroom-ott/",
};

// Backward compatibility alias
export const PROGRAM_LINKS = KLASSROOM_LINKS;
