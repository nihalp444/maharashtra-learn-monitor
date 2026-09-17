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
    <div className="flex flex-col gap-3 border-b border-slate-200/80 bg-white px-4 py-5 sm:px-6 xl:flex-row xl:items-center xl:justify-between">
      <div>
        <h1 className="text-xl font-extrabold tracking-tight text-slate-900 sm:text-2xl">
          {title}
        </h1>
        <p className="mt-1 text-xs text-slate-500 sm:text-sm">{subtitle}</p>
      </div>
      {actions && <div className="shrink-0">{actions}</div>}
    </div>
  );
}
