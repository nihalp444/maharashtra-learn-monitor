import type { ReactNode } from "react";

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-col gap-3 border-b border-border bg-card px-4 py-4 sm:px-6 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <div className="mb-2 h-1 w-12 bg-primary" />
        <h1 className="text-xl font-extrabold text-foreground sm:text-2xl">
          {title}
        </h1>
        <p className="mt-1 text-xs text-muted-foreground sm:text-sm">{subtitle}</p>
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
