import { Filter, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { districtOptions, programOptions, studentTypeOptions, timeOptions } from "@/features/mis/filter-options";
import { misService, type DashboardFilters } from "@/features/mis/mock-service";

function Field({ label, value, options, onChange }: { label: string; value: string; options: { value: string; label: string }[]; onChange: (v: string) => void }) {
  return <label className="min-w-0"><span className="mb-1.5 block text-[11px] font-semibold uppercase text-muted-foreground">{label}</span><Select value={value} onValueChange={onChange}><SelectTrigger className="h-10 bg-surface"><SelectValue /></SelectTrigger><SelectContent>{options.map(o => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}</SelectContent></Select></label>;
}

export function FilterBar({ draft, setDraft, onApply, onReset, compact = false }: { draft: DashboardFilters; setDraft: (v: DashboardFilters) => void; onApply: () => void; onReset: () => void; compact?: boolean }) {
  const talukas = draft.district === "all" ? [{ value: "all", label: "All Talukas" }] : [{ value: "all", label: "All Talukas" }, ...misService.getTalukas(draft.district).map(t => ({ value: t.name, label: t.name }))];
  const set = (key: keyof DashboardFilters, value: string) => setDraft({ ...draft, [key]: value, ...(key === "district" ? { taluka: "all" } : {}) });
  return <section className="border-b border-border bg-filter px-4 py-4 sm:px-6 xl:px-8"><div className={`grid gap-3 ${compact ? "md:grid-cols-4" : "md:grid-cols-3 xl:grid-cols-[1fr_1fr_1fr_1fr_1fr_auto]"}`}>
    <Field label="District" value={draft.district} options={districtOptions} onChange={v => set("district", v)} />
    <Field label="Taluka" value={draft.taluka} options={talukas} onChange={v => set("taluka", v)} />
    <Field label="Learning Program" value={draft.program} options={programOptions} onChange={v => set("program", v)} />
    {!compact && <Field label="Student Type" value={draft.studentType} options={studentTypeOptions} onChange={v => set("studentType", v)} />}
    <Field label="Time Period" value={draft.period} options={timeOptions} onChange={v => set("period", v)} />
    <div className={`flex items-end gap-2 ${compact ? "md:col-span-4 md:justify-end" : ""}`}><Button onClick={onApply} className="h-10 flex-1 xl:flex-none"><Filter />Apply Filters</Button><Button variant="outline" onClick={onReset} className="h-10" aria-label="Reset filters"><RotateCcw /><span className="xl:hidden">Reset</span></Button></div>
  </div></section>;
}
