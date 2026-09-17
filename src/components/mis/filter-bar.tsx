import { Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  districtOptions,
  programOptions,
  studentTypeOptions,
  timeOptions,
} from "@/features/mis/filter-options";
import { misService, type DashboardFilters } from "@/features/mis/mock-service";

function Field({
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
    <div className="min-w-0 flex-1">
      <span className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-slate-500">
        {label}
      </span>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="h-10 rounded-lg border-slate-200 bg-white text-xs font-medium text-slate-800 shadow-sm transition-colors hover:border-slate-300 focus:ring-2 focus:ring-primary/20">
          <SelectValue />
        </SelectTrigger>
        <SelectContent className="rounded-lg shadow-lg border-slate-200">
          {options.map((o) => (
            <SelectItem key={o.value} value={o.value} className="text-xs cursor-pointer py-2">
              {o.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}

export function FilterBar({
  draft,
  setDraft,
  onApply,
  onReset,
  compact = false,
}: {
  draft: DashboardFilters;
  setDraft: (v: DashboardFilters) => void;
  onApply: () => void;
  onReset: () => void;
  compact?: boolean;
}) {
  const talukas =
    draft.district === "all"
      ? [{ value: "all", label: "All Talukas" }]
      : [
          { value: "all", label: "All Talukas" },
          ...misService.getTalukas(draft.district).map((t) => ({
            value: t.name,
            label: t.name,
          })),
        ];

  const set = (key: keyof DashboardFilters, value: string) =>
    setDraft({
      ...draft,
      [key]: value,
      ...(key === "district" ? { taluka: "all" } : {}),
    });

  return (
    <section className="border-b border-border bg-white px-4 py-4 shadow-sm sm:px-6">
      <div
        className={`grid items-end gap-3.5 ${
          compact
            ? "md:grid-cols-4"
            : "md:grid-cols-3 xl:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]"
        }`}
      >
        <Field
          label="District"
          value={draft.district}
          options={districtOptions}
          onChange={(v) => set("district", v)}
        />
        <Field
          label="Taluka"
          value={draft.taluka}
          options={talukas}
          onChange={(v) => set("taluka", v)}
        />
        <Field
          label="Learning Program"
          value={draft.program}
          options={programOptions}
          onChange={(v) => set("program", v)}
        />
        {!compact && (
          <Field
            label="Student Category"
            value={draft.studentType}
            options={studentTypeOptions}
            onChange={(v) => set("studentType", v)}
          />
        )}
        <Field
          label="Reporting Timeline"
          value={draft.period}
          options={timeOptions}
          onChange={(v) => set("period", v)}
        />

        <div
          className={`flex items-center gap-2 pt-1 ${
            compact ? "md:col-span-4 md:justify-end" : ""
          }`}
        >
          <Button
            onClick={onApply}
            className="h-10 flex-1 gap-2 rounded-lg bg-primary px-5 text-xs font-semibold text-primary-foreground shadow-sm transition-all hover:bg-primary/90 xl:flex-none"
          >
            <Filter className="size-3.5" />
            <span>Apply Filters</span>
          </Button>
          <Button
            variant="outline"
            onClick={onReset}
            className="h-10 gap-1.5 rounded-lg border-slate-200 px-3 text-xs font-medium text-slate-600 transition-colors hover:bg-slate-50 hover:text-slate-900"
            title="Reset to default filters"
          >
            <RotateCcw className="size-3.5" />
            <span className="hidden sm:inline">Reset</span>
          </Button>
        </div>
      </div>
    </section>
  );
}
