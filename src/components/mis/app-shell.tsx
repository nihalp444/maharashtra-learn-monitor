import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  BookOpenCheck,
  Building2,
  ChevronRight,
  LayoutDashboard,
  Menu,
  Settings,
  ShieldCheck,
  UserRound,
  X,
} from "lucide-react";
import { useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";

const nav = [
  { to: "/", label: "Overview Dashboard", icon: LayoutDashboard },
  { to: "/district-analytics", label: "District Analytics", icon: Building2 },
  { to: "/learning-programs", label: "Learning Programs", icon: BookOpenCheck },
  { to: "/reports", label: "Reports & Insights", icon: BarChart3 },
] as const;

function BrandMark() {
  return (
    <div className="grid size-10 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-blue-900 to-indigo-800 text-white shadow-md shadow-blue-950/10">
      <ShieldCheck className="size-5" />
    </div>
  );
}

function Navigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (s) => s.location.pathname });

  return (
    <nav className="space-y-1" aria-label="Primary navigation">
      {nav.map((item) => {
        const active =
          item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
        const Icon = item.icon;

        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={`group flex h-10 items-center gap-3 rounded-lg px-3 text-xs font-semibold transition-all duration-150 ${
              active
                ? "bg-blue-50 text-blue-900 shadow-sm"
                : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
            }`}
          >
            <Icon
              className={`size-4 transition-colors ${
                active ? "text-blue-700" : "text-slate-400 group-hover:text-slate-600"
              }`}
            />
            <span className="flex-1">{item.label}</span>
            {active && <ChevronRight className="size-3.5 text-blue-500" />}
          </Link>
        );
      })}
    </nav>
  );
}

function SettingsDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 rounded-lg px-3 text-xs font-medium text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        >
          <Settings className="size-4 text-slate-400" />
          <span>Dashboard Preferences</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="rounded-xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Dashboard Preferences</DialogTitle>
          <DialogDescription>
            Personalize notifications, data views, and alert thresholds.
          </DialogDescription>
        </DialogHeader>
        <div className="divide-y divide-slate-100">
          {[
            "Weekly engagement digest",
            "Low-engagement district alerts",
            "High-contrast charts mode",
          ].map((label, i) => (
            <div key={label} className="flex items-center justify-between py-3.5">
              <div>
                <p className="text-xs font-semibold text-slate-800">{label}</p>
                <p className="text-[11px] text-slate-500">
                  {i === 1
                    ? "Trigger alerts when engagement falls below 50%"
                    : "Receive automated notifications"}
                </p>
              </div>
              <Switch defaultChecked={i < 2} aria-label={label} />
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}

function Sidebar({ onNavigate }: { onNavigate?: () => void }) {
  return (
    <div className="flex h-full flex-col bg-white px-4 py-5 border-r border-slate-200 shadow-sm">
      {/* Brand Header */}
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <BrandMark />
        <div className="min-w-0">
          <p className="truncate text-[10px] font-bold uppercase tracking-wider text-blue-900">
            Govt. of Maharashtra
          </p>
          <p className="text-xs font-bold text-slate-900">शालेय शिक्षण विभाग</p>
        </div>
      </div>

      {/* Navigation */}
      <div className="py-5 flex-1">
        <p className="mb-2.5 px-3 text-[10px] font-bold uppercase tracking-wider text-slate-400">
          Monitoring MIS
        </p>
        <Navigation {...(onNavigate ? { onNavigate } : {})} />
      </div>

      {/* Footer Profile & Settings */}
      <div className="mt-auto space-y-2 border-t border-slate-100 pt-3">
        <SettingsDialog />
        <div className="flex items-center gap-3 rounded-lg bg-slate-50 p-2.5 border border-slate-100">
          <div className="grid size-8 place-items-center rounded-full bg-blue-100 text-blue-800 font-semibold text-xs">
            <UserRound className="size-4" />
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-xs font-semibold text-slate-800">
              State Directorate
            </p>
            <p className="text-[10px] font-medium text-slate-500">Administrator MIS</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 lg:grid lg:grid-cols-[240px_1fr]">
      {/* Desktop Sidebar */}
      <aside className="fixed inset-y-0 left-0 z-40 hidden w-60 lg:block">
        <Sidebar />
      </aside>

      {/* Mobile Drawer */}
      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            className="absolute inset-0 bg-slate-900/40 backdrop-blur-xs"
            aria-label="Close menu"
            onClick={() => setMenuOpen(false)}
          />
          <aside className="relative h-full w-72">
            <button
              onClick={() => setMenuOpen(false)}
              className="absolute right-3 top-3 z-10 grid size-8 place-items-center rounded-lg text-slate-600 hover:bg-slate-100"
            >
              <X className="size-5" />
            </button>
            <Sidebar onNavigate={() => setMenuOpen(false)} />
          </aside>
        </div>
      )}

      {/* Main Content Area */}
      <div className="min-w-0 lg:col-start-2">
        {/* Top Navbar */}
        <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/90 backdrop-blur-md">
          <div className="flex min-h-16 items-center justify-between gap-4 px-4 sm:px-6">
            <div className="flex items-center gap-3 min-w-0">
              <Button
                variant="outline"
                size="icon"
                className="lg:hidden rounded-lg border-slate-200"
                onClick={() => setMenuOpen(true)}
                aria-label="Open menu"
              >
                <Menu className="size-4" />
              </Button>
              <div className="min-w-0">
                <div className="flex items-center gap-2">
                  <h1 className="truncate text-sm font-bold text-slate-900 sm:text-base">
                    Maharashtra Digital Learning MIS
                  </h1>
                  <span className="hidden rounded-full bg-blue-50 px-2 py-0.5 text-[10px] font-semibold text-blue-700 sm:inline">
                    Live Portal
                  </span>
                </div>
                <p className="hidden truncate text-xs text-slate-500 sm:block">
                  Student Learning & Engagement Performance Monitor
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                className="relative rounded-lg text-slate-600 hover:bg-slate-100"
              >
                <Bell className="size-4" />
                <span className="absolute right-2 top-2 size-2 rounded-full bg-rose-500 ring-2 ring-white" />
              </Button>
              <div className="hidden sm:flex items-center gap-2 pl-2 border-l border-slate-200">
                <div className="size-8 grid place-items-center rounded-full bg-slate-100 text-slate-700 font-semibold text-xs">
                  MH
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <main className="pb-12">{children}</main>

        {/* Footer */}
        <footer className="border-t border-slate-200 bg-white px-6 py-4 text-center text-xs text-slate-500">
          Government of Maharashtra · Education Department · Klassroom Digital Learning Monitor
        </footer>
      </div>
    </div>
  );
}
