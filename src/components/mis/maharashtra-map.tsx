import { useState } from "react";
import { AlertTriangle, ChevronRight, MapPin, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";
import { formatNumber, statusFor, type District } from "@/features/mis/mock-service";
import { DISTRICT_PATHS, MAHARASHTRA_VIEWBOX } from "@/features/mis/maharashtra-geo";

export function MaharashtraMap({
  districts,
  selectedId,
  onSelect,
}: {
  districts: District[];
  selectedId?: string;
  onSelect?: (id: string) => void;
}) {
  const [zoomLevel, setZoomLevel] = useState<number>(1.25);
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  // Active district shown in the details sidebar: prefers currently hovered, otherwise selected, otherwise first
  const active =
    districts.find((d) => d.id === (hoveredId ?? selectedId)) ?? districts[0];

  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.25, 2.5));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.25, 0.8));
  };

  const handleResetZoom = () => {
    setZoomLevel(1.25);
  };

  if (!active) return null;

  return (
    <div className="grid gap-5 lg:grid-cols-[1.3fr_0.7fr] items-stretch">
      {/* Map visual card - fixed height and stable position */}
      <div className="relative h-[480px] w-full flex items-center justify-center overflow-hidden rounded-xl border border-slate-200 bg-gradient-to-b from-slate-50/90 to-slate-100/60 p-2.5 shadow-xs">
        {/* Zoom In/Out Floating Controls */}
        <div className="absolute top-3 right-3 z-20 flex flex-col gap-1 rounded-lg border border-slate-200/90 bg-white/95 p-1 shadow-sm backdrop-blur-xs">
          <button
            type="button"
            onClick={handleZoomIn}
            disabled={zoomLevel >= 2.5}
            title="Zoom In"
            className="flex size-7 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-35 transition-colors"
          >
            <ZoomIn className="size-4" />
          </button>
          <button
            type="button"
            onClick={handleZoomOut}
            disabled={zoomLevel <= 0.8}
            title="Zoom Out"
            className="flex size-7 items-center justify-center rounded-md text-slate-600 hover:bg-slate-100 hover:text-slate-900 disabled:opacity-35 transition-colors"
          >
            <ZoomOut className="size-4" />
          </button>
          {zoomLevel !== 1.25 && (
            <button
              type="button"
              onClick={handleResetZoom}
              title="Reset to 125%"
              className="flex size-7 items-center justify-center rounded-md text-blue-600 hover:bg-blue-50 transition-colors border-t border-slate-100"
            >
              <RotateCcw className="size-3.5" />
            </button>
          )}
        </div>

        {/* Zoom level badge indicator */}
        {zoomLevel !== 1.25 && (
          <div className="absolute top-3 left-3 z-20 rounded-md border border-slate-200 bg-white/90 px-2 py-0.5 text-[11px] font-semibold text-slate-600 shadow-xs">
            {Math.round(zoomLevel * 100)}%
          </div>
        )}

        <div
          className="h-full w-full flex items-center justify-center origin-center"
          style={{
            transform: `scale(${zoomLevel})`,
            transformOrigin: "center center",
          }}
          onMouseLeave={() => setHoveredId(null)}
        >
          <svg
            viewBox={MAHARASHTRA_VIEWBOX}
            preserveAspectRatio="xMidYMid meet"
            className="h-full w-full max-h-[440px] drop-shadow-sm select-none"
            role="img"
            aria-label="Maharashtra authentic district boundary map"
          >
            {/* Authentic District boundary polygons */}
            <g className="district-shapes">
              {Object.entries(DISTRICT_PATHS).map(([id, geo]) => {
                const districtData = districts.find((d) => d.id === id);
                const status = districtData ? statusFor(districtData.engagement) : null;
                const isSelected = (selectedId ?? active.id) === id;
                const isHovered = hoveredId === id;
                const isActive = isHovered || isSelected;

                // Authentic colors representing performance with vivid highlight when hovered
                let fillColor = "#f1f5f9"; // neutral base
                let strokeColor = "#94a3b8";

                if (status === "High") {
                  fillColor = isActive ? "#a7f3d0" : "#ecfdf5";
                  strokeColor = isActive ? "#059669" : "#10b981";
                } else if (status === "Medium") {
                  fillColor = isActive ? "#fde68a" : "#fffbeb";
                  strokeColor = isActive ? "#d97706" : "#f59e0b";
                } else if (status === "Low") {
                  fillColor = isActive ? "#fecdd3" : "#fff1f2";
                  strokeColor = isActive ? "#e11d48" : "#f43f5e";
                }

                return (
                  <path
                    key={id}
                    d={geo.d}
                    fill={fillColor}
                    stroke={strokeColor}
                    strokeWidth={isActive ? 4 : 2}
                    strokeLinejoin="round"
                    strokeLinecap="round"
                    className="cursor-pointer transition-colors duration-100 hover:opacity-95"
                    onPointerEnter={() => {
                      if (hoveredId !== id) setHoveredId(id);
                    }}
                    onClick={() => onSelect?.(id)}
                  >
                    <title>{`${geo.name}${districtData ? ` - ${districtData.engagement}% Engagement (${status} Priority)` : ""}`}</title>
                  </path>
                );
              })}
            </g>

            {/* Centroid Interactive Markers & Labels (pointer-events-none so mouseenter stays reliably on paths) */}
            <g className="district-markers pointer-events-none">
              {districts.map((d) => {
                const geo = DISTRICT_PATHS[d.id];
                if (!geo) return null;

                const status = statusFor(d.engagement);
                const isSelected = (selectedId ?? active.id) === d.id;
                const isHovered = hoveredId === d.id;
                const isActive = isHovered || isSelected;

                const color =
                  status === "High"
                    ? "#059669"
                    : status === "Medium"
                      ? "#d97706"
                      : "#e11d48";

                const [cx, cy] = geo.centroid;

                return (
                  <g key={d.id} className="transition-all duration-150">
                    {/* Outer pulse wave on active district */}
                    {isActive && (
                      <circle
                        cx={cx}
                        cy={cy}
                        r={45}
                        fill={color}
                        opacity={0.3}
                        className="animate-pulse"
                      />
                    )}
                    {/* Pin Dot */}
                    <circle
                      cx={cx}
                      cy={cy}
                      r={isActive ? 18 : 10}
                      fill={color}
                      stroke="#ffffff"
                      strokeWidth={isActive ? 4.5 : 3}
                      className="drop-shadow-md transition-all duration-150"
                    />
                    {/* District Name Label */}
                    <text
                      x={cx}
                      y={cy + 32}
                      textAnchor="middle"
                      className="fill-slate-900 drop-shadow-[0_1.5px_2px_rgba(255,255,255,0.98)] font-extrabold text-[22px]"
                      style={{
                        fontFamily: "var(--font-sans, system-ui, sans-serif)",
                        letterSpacing: "0.2px",
                      }}
                    >
                      {d.name.length > 13 ? d.name.split(" ")[0] : d.name}
                    </text>
                  </g>
                );
              })}
            </g>
          </svg>
        </div>

        {/* Floating Legend */}
        <div className="absolute bottom-3 left-3 flex flex-wrap items-center gap-3 rounded-lg border border-slate-200/90 bg-white/95 px-3 py-1.5 text-xs font-medium text-slate-700 shadow-sm backdrop-blur-xs">
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-emerald-600 ring-2 ring-emerald-100" />
            High (≥70%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-amber-500 ring-2 ring-amber-100" />
            Medium (50–69%)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="size-2.5 rounded-full bg-rose-500 ring-2 ring-rose-100" />
            Low (&lt;50%)
          </span>
        </div>
      </div>

      {/* District Detail Sidebar Card - locked height matching map card */}
      <div className="flex h-[480px] flex-col justify-between overflow-hidden rounded-xl border border-slate-200 bg-white p-4 shadow-xs">
        <div className="flex flex-col overflow-hidden">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-blue-800">
              <MapPin className="size-4" />
              <span className="text-[11px] font-bold uppercase tracking-wider">
                District Profile
              </span>
            </div>
            <span
              className={`rounded-full px-2 py-0.5 text-xs font-bold ${
                statusFor(active.engagement) === "High"
                  ? "bg-emerald-50 text-emerald-700"
                  : statusFor(active.engagement) === "Medium"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-rose-50 text-rose-700"
              }`}
            >
              {statusFor(active.engagement)} Priority
            </span>
          </div>

          <h3 className="mt-1.5 text-xl font-extrabold text-slate-900 truncate">
            {active.name}
          </h3>

          {/* Metric Grid */}
          <div className="mt-2.5 grid grid-cols-2 gap-2">
            <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Total Enrolment
              </p>
              <p className="mt-0.5 text-sm font-bold text-slate-900">
                {formatNumber(active.totalStudents)}
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Active Learners
              </p>
              <p className="mt-0.5 text-sm font-bold text-slate-900">
                {formatNumber(active.activeStudents)}
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Engagement Rate
              </p>
              <p className="mt-0.5 text-sm font-bold text-slate-900">
                {active.engagement}%
              </p>
            </div>
            <div className="rounded-lg bg-slate-50 p-2 border border-slate-100">
              <p className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
                Learning Hours
              </p>
              <p className="mt-0.5 text-sm font-bold text-slate-900">
                {formatNumber(active.learningHours)}
              </p>
            </div>
          </div>

          {/* Taluka List for Selected District */}
          <div className="mt-2.5 border-t border-slate-100 pt-2 flex flex-col min-h-0">
            <div className="flex items-center justify-between mb-1.5">
              <p className="text-[11px] font-bold uppercase tracking-wider text-slate-600">
                Administrative Talukas ({active.talukas.length})
              </p>
              <span className="text-[10px] text-slate-400">Sub-district performance</span>
            </div>
            <div className="h-[140px] overflow-y-auto space-y-1.5 pr-1 scrollbar-thin">
              {active.talukas.map((t) => (
                <div
                  key={t.name}
                  className="flex items-center justify-between rounded-md bg-slate-50/80 px-2.5 py-1 text-xs border border-slate-100"
                >
                  <span className="font-medium text-slate-800 truncate mr-2">{t.name}</span>
                  <div className="flex items-center gap-2 text-[11px] shrink-0">
                    <span className="text-slate-500">{formatNumber(t.students)}</span>
                    <span
                      className={`font-bold ${
                        t.engagement >= 70
                          ? "text-emerald-600"
                          : t.engagement >= 50
                            ? "text-amber-600"
                            : "text-rose-600"
                      }`}
                    >
                      {t.engagement}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="border-t border-slate-100 pt-1.5 mt-1">
          <p className="text-[11px] text-slate-400 truncate">
            Hover any district to preview talukas and engagement metrics.
          </p>
        </div>
      </div>
    </div>
  );
}
