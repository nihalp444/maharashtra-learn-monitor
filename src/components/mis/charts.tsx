import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

function useMounted() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  return mounted;
}

const tooltipStyle = {
  backgroundColor: "#ffffff",
  border: "1px solid #e2e8f0",
  borderRadius: "10px",
  boxShadow: "0 10px 15px -3px rgba(15, 23, 42, 0.08)",
  padding: "8px 12px",
  fontSize: "12px",
  fontWeight: 600,
  color: "#0f172a",
};

export function EngagementTrendChart({
  data,
}: {
  data: { month: string; aiMl: number; neet: number; jee: number }[];
}) {
  const mounted = useMounted();
  if (!mounted) return <div className="h-72 animate-pulse rounded-xl bg-slate-100" />;

  return (
    <div className="h-72 w-full pt-2">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 15, right: 15, left: -20, bottom: 0 }}>
          <defs>
            <linearGradient id="colorNeet" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#059669" stopOpacity={0.28} />
              <stop offset="95%" stopColor="#059669" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorAiMl" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#2563eb" stopOpacity={0.25} />
              <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
            </linearGradient>
            <linearGradient id="colorJee" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#d97706" stopOpacity={0.22} />
              <stop offset="95%" stopColor="#d97706" stopOpacity={0.0} />
            </linearGradient>
          </defs>
          <CartesianGrid stroke="#f1f5f9" strokeDasharray="4 4" vertical={false} />
          <XAxis
            dataKey="month"
            tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickLine={false}
          />
          <YAxis
            domain={[40, 90]}
            tick={{ fill: "#64748b", fontSize: 11, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            unit="%"
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(v: number, name: string) => [`${v}%`, name]}
          />
          <Legend
            iconType="circle"
            iconSize={8}
            wrapperStyle={{ fontSize: 12, paddingTop: 14, fontWeight: 600 }}
          />
          <Area
            type="monotone"
            name="NEET Preparation"
            dataKey="neet"
            stroke="#059669"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorNeet)"
            dot={{ r: 4, strokeWidth: 2, fill: "#ffffff", stroke: "#059669" }}
            activeDot={{ r: 6, stroke: "#059669", strokeWidth: 3 }}
          />
          <Area
            type="monotone"
            name="AI & ML"
            dataKey="aiMl"
            stroke="#2563eb"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorAiMl)"
            dot={{ r: 4, strokeWidth: 2, fill: "#ffffff", stroke: "#2563eb" }}
            activeDot={{ r: 6, stroke: "#2563eb", strokeWidth: 3 }}
          />
          <Area
            type="monotone"
            name="JEE Preparation"
            dataKey="jee"
            stroke="#d97706"
            strokeWidth={3}
            fillOpacity={1}
            fill="url(#colorJee)"
            dot={{ r: 4, strokeWidth: 2, fill: "#ffffff", stroke: "#d97706" }}
            activeDot={{ r: 6, stroke: "#d97706", strokeWidth: 3 }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

export function DistrictComparisonChart({
  data,
}: {
  data: { name: string; engagement: number }[];
}) {
  const mounted = useMounted();
  if (!mounted) return <div className="h-72 animate-pulse rounded-xl bg-slate-100" />;

  return (
    <div className="h-72 w-full pt-2">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
          <CartesianGrid stroke="#f1f5f9" strokeDasharray="4 4" horizontal={false} />
          <XAxis
            type="number"
            domain={[0, 100]}
            tick={{ fill: "#64748b", fontSize: 11 }}
            axisLine={{ stroke: "#e2e8f0" }}
            tickLine={false}
            unit="%"
          />
          <YAxis
            type="category"
            dataKey="name"
            width={90}
            tick={{ fill: "#1e293b", fontSize: 11, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            contentStyle={tooltipStyle}
            formatter={(v: number) => [`${v}%`, "Engagement"]}
          />
          <Bar dataKey="engagement" radius={[0, 6, 6, 0]}>
            {data.map((item) => (
              <Cell
                key={item.name}
                fill={
                  item.engagement >= 70
                    ? "#059669"
                    : item.engagement >= 50
                      ? "#d97706"
                      : "#e11d48"
                }
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
