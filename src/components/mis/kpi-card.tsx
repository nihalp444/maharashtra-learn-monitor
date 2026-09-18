import { ArrowDownRight, ArrowUpRight, type LucideIcon } from "lucide-react";
import { formatNumber } from "@/features/mis/mock-service";

interface ToneStyle {
  bg: string;
  text: string;
  border: string;
}

const defaultToneStyle: ToneStyle = {
  bg: "bg-primary/10",
  text: "text-primary",
  border: "border-primary/20",
};

const toneStyles: Record<string, ToneStyle> = {
  blue: { bg: "bg-blue-50", text: "text-blue-600", border: "border-blue-100" },
  green: { bg: "bg-emerald-50", text: "text-emerald-600", border: "border-emerald-100" },
  maroon: { bg: "bg-primary/10", text: "text-primary", border: "border-primary/20" },
  amber: { bg: "bg-amber-50", text: "text-amber-600", border: "border-amber-100" },
  red: { bg: "bg-rose-50", text: "text-rose-600", border: "border-rose-100" },
};

export function KpiCard({
  label,
  value,
  suffix,
  change,
  icon: Icon,
  tone = "blue",
}: {
  label: string;
  value: number;
  suffix?: string;
  change: number;
  icon: LucideIcon;
  tone?: string;
}) {
  const positive = change >= 0;
  const currentTone: ToneStyle = toneStyles[tone] ?? defaultToneStyle;

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card p-3.5 shadow-mis transition-all duration-200 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-card-hover">
      <div className="flex items-start justify-between gap-1.5">
        <div className="min-w-0 flex-1">
          <p className="text-[11px] font-semibold uppercase tracking-wider text-muted-foreground leading-tight break-words">
            {label}
          </p>
          <div className="mt-2 flex items-baseline gap-1">
            <span className="text-xl font-extrabold tracking-tight tabular-nums text-foreground sm:text-[22px]">
              {suffix === "%" ? value.toFixed(1) : formatNumber(value)}
            </span>
            {suffix && suffix !== "%" && (
              <span className="text-xs font-semibold text-muted-foreground">{suffix}</span>
            )}
            {suffix === "%" && (
              <span className="text-sm font-semibold text-muted-foreground">%</span>
            )}
          </div>
        </div>
        <div
          className={`grid size-7 shrink-0 place-items-center rounded-lg border ${currentTone.border} ${currentTone.bg} ${currentTone.text} transition-transform duration-200 group-hover:scale-105`}
        >
          <Icon className="size-3.5" />
        </div>
      </div>

      <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-2.5">
        <span
          className={`inline-flex items-center gap-0.5 rounded-full px-1.5 py-0.5 text-xs font-semibold ${
            positive
              ? "bg-emerald-50 text-emerald-700"
              : "bg-rose-50 text-rose-700"
          }`}
        >
          {positive ? (
            <ArrowUpRight className="size-3.5" />
          ) : (
            <ArrowDownRight className="size-3.5" />
          )}
          {Math.abs(change)}%
        </span>
        <span className="text-[11px] font-medium text-slate-400">vs last month</span>
      </div>
    </article>
  );
}
