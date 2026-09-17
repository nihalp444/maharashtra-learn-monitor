import type { ReactNode } from "react";
export function PageHeader({ title, subtitle, actions }: { title: string; subtitle: string; actions?: ReactNode }) {
  return <div className="flex flex-col gap-3 border-b border-border bg-surface px-4 py-3 sm:px-5 xl:flex-row xl:items-center xl:justify-between xl:px-6"><div><h1 className="text-lg font-bold text-foreground sm:text-xl">{title}</h1><p className="mt-0.5 text-xs text-muted-foreground">{subtitle}</p></div>{actions}</div>;
}
