import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function SectionCard({
  title,
  subtitle,
  action,
  children,
  className,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      className={cn(
        "flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-mis transition-shadow duration-200 hover:shadow-mis-raised",
        className,
      )}
    >
      <div className="flex flex-col gap-3 border-b border-border/80 bg-white px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-bold tracking-tight text-foreground sm:text-base">
            {title}
          </h2>
          {subtitle && (
            <p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
        {action && <div className="shrink-0">{action}</div>}
      </div>
      <div className="flex-1 flex flex-col p-5">{children}</div>
    </section>
  );
}
