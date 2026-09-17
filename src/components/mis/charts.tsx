import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, Cell, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";

function useMounted() { const [mounted, setMounted] = useState(false); useEffect(() => setMounted(true), []); return mounted; }
const tooltipStyle = { border: "1px solid var(--border)", borderRadius: 6, boxShadow: "var(--shadow-mis)", fontSize: 12 };

export function EngagementTrendChart({ data }: { data: { month: string; aiMl: number; neet: number; jee: number }[] }) {
  const mounted = useMounted();
  if (!mounted) return <div className="h-72 animate-pulse rounded-md bg-muted" />;
  return <div className="h-72 w-full"><ResponsiveContainer width="100%" height="100%"><LineChart data={data} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}><CartesianGrid stroke="var(--border)" strokeDasharray="3 3" vertical={false} /><XAxis dataKey="month" tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} /><YAxis domain={[30, 90]} tick={{ fill: "var(--muted-foreground)", fontSize: 11 }} axisLine={false} tickLine={false} unit="%" /><Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `${v}%`} /><Legend iconType="circle" iconSize={7} wrapperStyle={{ fontSize: 11 }} /><Line type="monotone" name="AI & ML" dataKey="aiMl" stroke="var(--chart-ai)" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} /><Line type="monotone" name="NEET" dataKey="neet" stroke="var(--chart-neet)" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} /><Line type="monotone" name="JEE" dataKey="jee" stroke="var(--chart-jee)" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} /></LineChart></ResponsiveContainer></div>;
}

export function DistrictComparisonChart({ data }: { data: { name: string; engagement: number }[] }) {
  const mounted = useMounted();
  if (!mounted) return <div className="h-72 animate-pulse rounded-md bg-muted" />;
  return <div className="h-72 w-full"><ResponsiveContainer width="100%" height="100%"><BarChart data={data} layout="vertical" margin={{ left: 35, right: 16 }}><CartesianGrid stroke="var(--border)" strokeDasharray="3 3" horizontal={false} /><XAxis type="number" domain={[0, 100]} tick={{ fill: "var(--muted-foreground)", fontSize: 10 }} axisLine={false} tickLine={false} unit="%" /><YAxis type="category" dataKey="name" width={82} tick={{ fill: "var(--foreground)", fontSize: 10 }} axisLine={false} tickLine={false} /><Tooltip contentStyle={tooltipStyle} formatter={(v: number) => `${v}%`} /><Bar dataKey="engagement" radius={[0, 3, 3, 0]}>{data.map(item => <Cell key={item.name} fill={item.engagement >= 70 ? "var(--positive)" : item.engagement >= 50 ? "var(--warning)" : "var(--destructive)"} />)}</Bar></BarChart></ResponsiveContainer></div>;
}
