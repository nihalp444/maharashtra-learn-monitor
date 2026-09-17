import { useState } from "react";
import { AlertTriangle, MapPin } from "lucide-react";
import { formatNumber, statusFor, type District } from "@/features/mis/mock-service";

export function MaharashtraMap({ districts, selectedId, onSelect }: { districts: District[]; selectedId?: string; onSelect?: (id: string) => void }) {
  const [hovered, setHovered] = useState<string | null>(null);
  const active = districts.find(d => d.id === (hovered ?? selectedId)) ?? districts[0];
  if (!active) return null;
  return <div className="grid gap-4 lg:grid-cols-[1.2fr_0.8fr]">
    <div className="relative min-h-80 overflow-hidden rounded-md border border-border bg-map">
      <svg viewBox="55 170 610 500" className="h-full min-h-80 w-full" role="img" aria-label="Representative Maharashtra district engagement map">
        <path d="M103 215 L182 184 L268 207 L335 181 L414 221 L487 208 L548 246 L625 281 L603 353 L642 421 L591 493 L555 558 L476 597 L403 573 L346 628 L272 613 L227 561 L164 536 L132 474 L151 409 L117 346 L139 286 Z" fill="var(--map-land)" stroke="var(--map-border)" strokeWidth="5" />
        {districts.map(d => { const status = statusFor(d.engagement); return <g key={d.id} role="button" tabIndex={0} aria-label={`${d.name}, ${d.engagement}% engagement`} onMouseEnter={() => setHovered(d.id)} onMouseLeave={() => setHovered(null)} onFocus={() => setHovered(d.id)} onBlur={() => setHovered(null)} onClick={() => onSelect?.(d.id)} className="cursor-pointer"><circle cx={d.mapX} cy={d.mapY} r={selectedId === d.id ? 15 : 11} fill={status === "High" ? "var(--positive)" : status === "Medium" ? "var(--warning)" : "var(--destructive)"} stroke="var(--surface)" strokeWidth="4" className="transition-all" /><text x={d.mapX + 15} y={d.mapY + 4} className="map-label">{d.name.length > 13 ? d.name.split(" ")[0] : d.name}</text></g>; })}
      </svg>
      <div className="absolute bottom-3 left-3 flex flex-wrap gap-3 rounded-md border border-border bg-surface/95 px-3 py-2 text-[10px] shadow-mis"><span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-positive" />High ≥70%</span><span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-warning" />Medium 50–70%</span><span className="flex items-center gap-1.5"><i className="size-2 rounded-full bg-destructive" />Low &lt;50%</span></div>
    </div>
    <div className="flex flex-col justify-center rounded-md border border-border bg-surface p-5"><div className="flex items-center gap-2 text-primary"><MapPin className="size-4" /><span className="text-[11px] font-semibold uppercase">District Snapshot</span></div><h3 className="mt-3 text-xl font-bold">{active.name}</h3>{statusFor(active.engagement) === "Low" && <span className="mt-2 inline-flex w-fit items-center gap-1.5 rounded-sm bg-destructive-soft px-2 py-1 text-[10px] font-bold text-destructive"><AlertTriangle className="size-3" />LOW ENGAGEMENT</span>}<dl className="mt-5 grid grid-cols-2 gap-x-5 gap-y-4 text-xs"><div><dt className="text-muted-foreground">Total Students</dt><dd className="mt-1 font-bold">{formatNumber(active.totalStudents)}</dd></div><div><dt className="text-muted-foreground">Active Students</dt><dd className="mt-1 font-bold">{formatNumber(active.activeStudents)}</dd></div><div><dt className="text-muted-foreground">Engagement</dt><dd className="mt-1 font-bold">{active.engagement}%</dd></div><div><dt className="text-muted-foreground">Learning Hours</dt><dd className="mt-1 font-bold">{formatNumber(active.learningHours)}</dd></div></dl><p className="mt-5 border-t border-border pt-3 text-[10px] text-muted-foreground">Hover or select a district marker to review performance.</p></div>
  </div>;
}
