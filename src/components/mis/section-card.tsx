import type { ReactNode } from "react";
import { cn } from "@/lib/utils";
export function SectionCard({ title, subtitle, action, children, className }: { title: string; subtitle?: string; action?: ReactNode; children: ReactNode; className?: string }) {
  return <section className={cn("rounded-sm border border-border bg-card shadow-mis", className)}><div className="flex flex-col gap-2 border-b border-border px-4 py-3 sm:flex-row sm:items-center sm:justify-between"><div><h2 className="text-[13px] font-bold text-card-foreground">{title}</h2>{subtitle && <p className="mt-0.5 text-[10px] text-muted-foreground">{subtitle}</p>}</div>{action}</div><div className="p-4">{children}</div></section>;
}
