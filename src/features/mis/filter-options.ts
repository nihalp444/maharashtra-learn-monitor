import { AGE_GROUPS, assessmentList, districts, programs } from "./mock-data";

export const districtOptions = [
  { value: "all", label: "All Districts" },
  ...districts.map((d) => ({ value: d.id, label: d.name })),
];

export const ageGroupOptions = [
  { value: "all", label: "All Age Groups" },
  ...AGE_GROUPS.map((a) => ({ value: a.id, label: a.label })),
];

export const programOptions = [
  { value: "all", label: "All Programs" },
  ...programs.map((p) => ({ value: p.id, label: `${p.name} (${p.ageGroup})` })),
];

export const assessmentOptions = [
  { value: "all", label: "All Assessments" },
  ...assessmentList.map((a) => ({ value: a.id, label: a.name })),
];

export const timeOptions = [
  { value: "7d", label: "Last 7 Days" },
  { value: "30d", label: "Last 30 Days" },
  { value: "90d", label: "Last 90 Days" },
  { value: "year", label: "Academic Year" },
];

export const studentTypeOptions = [
  { value: "all", label: "All Students" },
  { value: "active", label: "Active Students" },
  { value: "new", label: "New Enrolments" },
  { value: "low", label: "Low Engagement" },
];
