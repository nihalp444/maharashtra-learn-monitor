import type { ReactNode } from "react";
export function PageHeader({ title, subtitle, actions }: { title: string; subtitle: string; actions?: ReactNode }) {
  return <div className="flex flex-col gap-4 border-b border-border bg-surface px-4 py-5 sm:px-6 xl:flex-row xl:items-center xl:justify-between xl:px-8"><div><h1 className="text-xl font-bold text-foreground sm:text-2xl">{title}</h1><p className="mt-1 text-sm text-muted-foreground">{subtitle}</p></div>{actions}</div>;
}
