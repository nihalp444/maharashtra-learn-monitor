import { useMemo, useState } from "react";
import { ArrowUpDown, ChevronRight, Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import {
  formatNumber,
  statusFor,
  type District,
} from "@/features/mis/mock-service";

type SortKey =
  | "name"
  | "totalStudents"
  | "activeStudents"
  | "engagement"
  | "learningHours";

export function DistrictTable({
  districts,
  onSelect,
  limit,
  searchQuery,
  onSearchChange,
}: {
  districts: District[];
  onSelect?: (id: string) => void;
  limit?: number;
  searchQuery?: string;
  onSearchChange?: (q: string) => void;
}) {
  const [localQuery, setLocalQuery] = useState("");
  const query = searchQuery !== undefined ? searchQuery : localQuery;
  const setQuery = onSearchChange ?? setLocalQuery;

  const [sort, setSort] = useState<SortKey>("engagement");
  const [asc, setAsc] = useState(false);

  const rows = useMemo(
    () =>
      districts
        .filter((d) => d.name.toLowerCase().includes(query.toLowerCase()))
        .sort((a, b) => {
          const av = a[sort],
            bv = b[sort];
          return (
            (typeof av === "string"
              ? av.localeCompare(String(bv))
              : Number(av) - Number(bv)) * (asc ? 1 : -1)
          );
        }),
    [districts, query, sort, asc],
  );

  const changeSort = (key: SortKey) => {
    if (key === sort) setAsc((v) => !v);
    else {
      setSort(key);
      setAsc(false);
    }
  };

  return (
    <div>
      {searchQuery === undefined && (
        <div className="relative mb-4 max-w-xs sm:max-w-sm">
          <Search className="absolute left-3 top-2.5 size-4 text-slate-400" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search districts..."
            className="h-9 rounded-lg border-slate-200 pl-9 text-xs shadow-xs focus:border-primary focus:ring-2 focus:ring-primary/20"
          />
        </div>
      )}

      <div className="overflow-hidden rounded-xl border border-slate-200 shadow-xs">
        <div className="max-h-72 overflow-y-auto overflow-x-auto scrollbar-thin">
          <table className="w-full min-w-[760px] text-left text-xs">
            <thead className="sticky top-0 z-10">
              <tr className="border-b border-slate-200 bg-slate-50 text-[11px] font-semibold uppercase tracking-wider text-slate-500 shadow-xs">
                <th className="px-4 py-2.5">#</th>
                {(
                  [
                    "name",
                    "totalStudents",
                    "activeStudents",
                    "engagement",
                    "learningHours",
                  ] as SortKey[]
                ).map((key) => (
                  <th key={key} className="px-4 py-2.5">
                    <button
                      className="inline-flex items-center gap-1 font-semibold text-slate-600 transition-colors hover:text-slate-900"
                      onClick={() => changeSort(key)}
                    >
                      {key === "name" ? "District" : key.replace(/([A-Z])/g, " $1")}
                      <ArrowUpDown className="size-3 text-slate-400" />
                    </button>
                  </th>
                ))}
                <th className="px-4 py-2.5">Status</th>
                <th className="px-4 py-2.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 bg-white">
              {rows.map((d, i) => {
                const status = statusFor(d.engagement);
                const badgeStyle =
                  status === "High"
                    ? "bg-emerald-50 text-emerald-700 border-emerald-200/80"
                    : status === "Medium"
                      ? "bg-amber-50 text-amber-700 border-amber-200/80"
                      : "bg-rose-50 text-rose-700 border-rose-200/80";

                return (
                  <tr
                    key={d.id}
                    onClick={() => onSelect?.(d.id)}
                    className={`transition-colors hover:bg-slate-50/80 ${
                      onSelect ? "cursor-pointer" : ""
                    }`}
                  >
                    <td className="px-4 py-2.5 font-medium text-slate-400">
                      {i + 1}
                    </td>
                    <td className="px-4 py-2.5 font-semibold text-slate-900">
                      {d.name}
                    </td>
                    <td className="px-4 py-2.5 tabular-nums text-slate-600">
                      {formatNumber(d.totalStudents)}
                    </td>
                    <td className="px-4 py-2.5 tabular-nums text-slate-600">
                      {formatNumber(d.activeStudents)}
                    </td>
                    <td className="px-4 py-2.5 font-bold tabular-nums text-slate-900">
                      <div className="flex items-center gap-2">
                        <span>{d.engagement}%</span>
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-slate-100">
                          <div
                            className={`h-full rounded-full ${
                              d.engagement >= 70
                                ? "bg-emerald-500"
                                : d.engagement >= 50
                                  ? "bg-amber-500"
                                  : "bg-rose-500"
                            }`}
                            style={{ width: `${d.engagement}%` }}
                          />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-2.5 tabular-nums text-slate-600">
                      {formatNumber(d.learningHours)} hrs
                    </td>
                    <td className="px-4 py-2.5">
                      <span
                        className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-semibold ${badgeStyle}`}
                      >
                        {status}
                      </span>
                    </td>
                    <td className="px-4 py-2.5 text-right">
                      <div className="inline-flex size-6 items-center justify-center rounded-md text-slate-400 transition-all hover:bg-slate-100 hover:text-slate-900">
                        <ChevronRight className="size-3.5" />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
