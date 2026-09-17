import { Link, useRouterState } from "@tanstack/react-router";
import { BarChart3, Bell, BookOpenCheck, Building2, ChevronRight, LayoutDashboard, Menu, Settings, ShieldCheck, UserRound, X } from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/district-analytics", label: "District Analytics", icon: Building2 },
  { to: "/learning-programs", label: "Learning Programs", icon: BookOpenCheck },
  { to: "/reports", label: "Reports", icon: BarChart3 },
] as const;

function BrandMark() {
  return <div className="grid size-9 shrink-0 place-items-center rounded-sm border border-primary/20 bg-primary-soft text-primary"><ShieldCheck className="size-5" /></div>;
}

function Navigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: s => s.location.pathname });
  return <nav className="space-y-1.5" aria-label="Primary navigation">
    {nav.map(item => {
      const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
      const Icon = item.icon;
      return <Link key={item.to} to={item.to} onClick={onNavigate} className={`group flex h-10 items-center gap-3 rounded-sm border-l-2 px-3 text-[13px] font-medium transition-colors ${active ? "border-primary bg-sidebar-accent text-sidebar-primary" : "border-transparent text-sidebar-foreground/70 hover:bg-sidebar-accent/60 hover:text-sidebar-foreground"}`}>
        <Icon className="size-4.5" /><span>{item.label}</span>{active && <ChevronRight className="ml-auto size-4" />}
      </Link>;
    })}
  </nav>;
}

function SettingsDialog() {
  return <Dialog><DialogTrigger asChild><Button variant="ghost" className="w-full justify-start gap-3 px-3 text-sidebar-foreground/70"><Settings />Settings</Button></DialogTrigger>
    <DialogContent><DialogHeader><DialogTitle>Dashboard Preferences</DialogTitle><DialogDescription>Personalize notifications and how summary information appears.</DialogDescription></DialogHeader>
      <div className="divide-y divide-border">
        {["Weekly engagement summary", "Low-engagement alerts", "Compact data tables"].map((label, i) => <div key={label} className="flex items-center justify-between py-4"><div><p className="text-sm font-medium">{label}</p><p className="mt-0.5 text-xs text-muted-foreground">{i === 2 ? "Show more rows on large screens" : "Receive updates for monitoring priorities"}</p></div><Switch defaultChecked={i < 2} aria-label={label} /></div>)}
      </div>
    </DialogContent></Dialog>;
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return <div className="flex h-full flex-col bg-sidebar px-3 py-4 text-sidebar-foreground">
    <div className="flex items-center gap-3 border-b border-sidebar-border px-1 pb-4"><BrandMark /><div><p className="text-[10px] font-bold uppercase text-sidebar-primary">Government of Maharashtra</p><p className="text-[13px] font-semibold">महाराष्ट्र शासन</p></div></div>
    <div className="py-5"><p className="mb-2 px-3 text-[9px] font-bold uppercase tracking-[0.12em] text-sidebar-foreground/45">Monitoring</p><Navigation {...(onNavigate ? { onNavigate } : {})} /></div>
    <div className="mt-auto space-y-1 border-t border-sidebar-border pt-4"><SettingsDialog /><div className="flex items-center gap-3 px-3 py-3"><div className="grid size-8 place-items-center rounded-full bg-sidebar-accent text-sidebar-primary"><UserRound className="size-4" /></div><div className="min-w-0"><p className="truncate text-xs font-semibold">Education Authority</p><p className="text-[10px] text-sidebar-foreground/55">MIS Viewer</p></div></div></div>
  </div>;
}

export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  return <div className="min-h-screen bg-background lg:grid lg:grid-cols-[224px_1fr]">
    <aside className="fixed inset-y-0 left-0 z-40 hidden w-56 border-r border-sidebar-border lg:block"><Sidebar /></aside>
    {menuOpen && <div className="fixed inset-0 z-50 lg:hidden"><button className="absolute inset-0 bg-overlay" aria-label="Close menu" onClick={() => setMenuOpen(false)} /><aside className="relative h-full w-72 border-r border-sidebar-border"><button onClick={() => setMenuOpen(false)} className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-md text-sidebar-foreground"><X className="size-5" /></button><Sidebar onNavigate={() => setMenuOpen(false)} /></aside></div>}
    <div className="min-w-0 lg:col-start-2">
      <header className="sticky top-0 z-30 border-b border-border bg-surface/95 backdrop-blur-sm"><div className="flex min-h-16 items-center gap-3 px-4 sm:px-5 xl:px-6">
        <Button variant="outline" size="icon" className="lg:hidden" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Menu /></Button>
        <div className="min-w-0 flex-1"><p className="truncate text-sm font-bold text-foreground sm:text-base">Maharashtra Digital Learning & Engagement MIS</p><p className="hidden truncate text-[11px] text-muted-foreground sm:block">Student Learning & Engagement Monitoring Dashboard</p></div>
        <Button variant="ghost" size="icon" aria-label="Notifications" className="relative"><Bell /><span className="absolute right-2 top-2 size-1.5 rounded-full bg-destructive" /></Button>
        <div className="hidden size-9 place-items-center rounded-full bg-secondary text-secondary-foreground sm:grid"><UserRound className="size-4" /></div>
      </div></header>
      <main>{children}</main>
      <footer className="border-t border-border bg-surface px-6 py-4 text-center text-[11px] text-muted-foreground">Government of Maharashtra · Education Monitoring Proposal · Demo data only</footer>
    </div>
  </div>;
}
