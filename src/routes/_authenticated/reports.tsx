import { createFileRoute } from "@tanstack/react-router";
import { Download, Eye, FileBarChart, FileSpreadsheet, Printer } from "lucide-react";
import { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/mis/page-header";
import { SectionCard } from "@/components/mis/section-card";
import {
  districtOptions,
  programOptions,
  timeOptions,
} from "@/features/mis/filter-options";
import {
  formatNumber,
  misService,
  statusFor,
} from "@/features/mis/mock-service";

export const Route = createFileRoute("/_authenticated/reports")({
  head: () => ({
    meta: [
      { title: "Reports & Insights | Maharashtra Learning MIS" },
      {
        name: "description",
        content:
          "Generate and review district, program and participation reports for Maharashtra digital learning.",
      },
      { property: "og:title", content: "Reports & Insights | Maharashtra Learning MIS" },
      {
        property: "og:description",
        content: "Government learning engagement reports and insights.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: ReportsPage,
});

const reportTypes = [
  "District Engagement Report",
  "Course-wise Engagement Report",
  "Low Engagement Areas Report",
  "Student Participation Summary",
  "Monthly Engagement Summary",
];
const defaultReportType = reportTypes[0] ?? "District Engagement Report";

function ReportsPage() {
  const [filters, setFilters] = useState({
    type: defaultReportType,
    district: "all",
    program: "all",
    period: "30d",
  });
  const [generated, setGenerated] = useState(true);

  const rows = useMemo(
    () =>
      misService
        .getDistricts()
        .filter((d) => filters.district === "all" || d.id === filters.district)
        .filter(
          (d) =>
            filters.type !== "Low Engagement Areas Report" || d.engagement < 50,
        ),
    [filters],
  );

  const exportCsv = () => {
    const csv = [
      "District,Total Students,Active Students,Engagement,Learning Hours,Status",
      ...rows.map(
        (d) =>
          `"${d.name}",${d.totalStudents},${d.activeStudents},${d.engagement},${d.learningHours},${statusFor(d.engagement)}`,
      ),
    ].join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "maharashtra-learning-report.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageHeader
        title="Official Reports & Analytics Export"
        subtitle="Generate, filter and download verified administrative reports for review meetings."
      />

      <div className="space-y-6 p-4 sm:p-6 xl:p-8">
        {/* Report Preset Cards */}
        <div className="grid gap-3.5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {reportTypes.map((type, i) => {
            const isSelected = filters.type === type;
            return (
              <button
                key={type}
                onClick={() => {
                  setFilters({ ...filters, type });
                  setGenerated(true);
                }}
                className={`group flex flex-col justify-between rounded-xl border p-4 text-left transition-all duration-150 ${
                  isSelected
                    ? "border-blue-600 bg-blue-50/60 shadow-sm ring-2 ring-blue-500/20"
                    : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm"
                }`}
              >
                <div>
                  <div
                    className={`grid size-9 place-items-center rounded-lg ${
                      isSelected
                        ? "bg-blue-600 text-white"
                        : i === 2
                          ? "bg-rose-50 text-rose-600"
                          : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    <FileBarChart className="size-4.5" />
                  </div>
                  <p className="mt-3 text-xs font-bold text-slate-900 leading-snug">
                    {type}
                  </p>
                </div>
                <p className="mt-2 text-[10px] font-medium text-slate-400">
                  Ready for export
                </p>
              </button>
            );
          })}
        </div>

        {/* Builder controls */}
        <SectionCard
          title="Report Configuration Parameters"
          subtitle="Customize geographic and time constraints for data export"
        >
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
            <ReportField
              label="Report Template"
              value={filters.type}
              options={reportTypes.map((x) => ({ value: x, label: x }))}
              onChange={(v) => setFilters({ ...filters, type: v })}
            />
            <ReportField
              label="District Filter"
              value={filters.district}
              options={districtOptions}
              onChange={(v) => setFilters({ ...filters, district: v })}
            />
            <ReportField
              label="Learning Program"
              value={filters.program}
              options={programOptions}
              onChange={(v) => setFilters({ ...filters, program: v })}
            />
            <ReportField
              label="Reporting Timeline"
              value={filters.period}
              options={timeOptions}
              onChange={(v) => setFilters({ ...filters, period: v })}
            />
          </div>

          <div className="mt-5 flex flex-wrap gap-2.5 pt-2 border-t border-slate-100">
            <Button
              onClick={() => setGenerated(true)}
              className="gap-2 rounded-lg bg-primary font-semibold text-white shadow-xs hover:bg-primary/90"
            >
              <Eye className="size-4" />
              <span>Generate Preview</span>
            </Button>
            <Button
              variant="outline"
              onClick={() => window.print()}
              className="gap-2 rounded-lg border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              <Printer className="size-4" />
              <span>Print / PDF</span>
            </Button>
            <Button
              variant="outline"
              onClick={exportCsv}
              className="gap-2 rounded-lg border-slate-200 text-slate-700 hover:bg-slate-50"
            >
              <FileSpreadsheet className="size-4" />
              <span>Export CSV (Excel)</span>
            </Button>
          </div>
        </SectionCard>

        {/* Data Table */}
        {generated && (
          <SectionCard
            title={filters.type}
            subtitle={`${rows.length} verified records · Academic session 2026`}
            action={
              <Button
                size="sm"
                variant="outline"
                onClick={exportCsv}
                className="gap-1.5 rounded-lg border-slate-200 text-xs font-semibold hover:bg-slate-50"
              >
                <Download className="size-3.5" />
                <span>Download CSV</span>
              </Button>
            }
          >
            <div className="overflow-hidden rounded-xl border border-slate-200 shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[720px] text-left text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                      <th className="px-4 py-3">District</th>
                      <th className="px-4 py-3">Total Students</th>
                      <th className="px-4 py-3">Active Students</th>
                      <th className="px-4 py-3">Engagement</th>
                      <th className="px-4 py-3">Learning Hours</th>
                      <th className="px-4 py-3">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {rows.map((d) => {
                      const status = statusFor(d.engagement);
                      const badgeStyle =
                        status === "High"
                          ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                          : status === "Medium"
                            ? "bg-amber-50 text-amber-700 border-amber-200"
                            : "bg-rose-50 text-rose-700 border-rose-200";

                      return (
                        <tr key={d.id} className="hover:bg-slate-50/70 transition-colors">
                          <td className="px-4 py-3.5 font-semibold text-slate-900">
                            {d.name}
                          </td>
                          <td className="px-4 py-3.5 tabular-nums text-slate-600">
                            {formatNumber(d.totalStudents)}
                          </td>
                          <td className="px-4 py-3.5 tabular-nums text-slate-600">
                            {formatNumber(d.activeStudents)}
                          </td>
                          <td className="px-4 py-3.5 font-bold tabular-nums text-slate-900">
                            {d.engagement}%
                          </td>
                          <td className="px-4 py-3.5 tabular-nums text-slate-600">
                            {formatNumber(d.learningHours)} hrs
                          </td>
                          <td className="px-4 py-3.5">
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-0.5 text-[10px] font-semibold ${badgeStyle}`}
                            >
                              {status}
                            </span>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </SectionCard>
        )}
      </div>
    </>
  );
}

function ReportField({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: string;
  options: { value: string; label: string }[];
  onChange: (v: string) => void;
}) {
  return (
    <label>
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-10 rounded-lg border-slate-200 bg-white text-xs font-medium text-slate-800 shadow-xs">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-lg border-slate-200 shadow-lg">
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value} className="text-xs py-2">
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </label>
  );
}
