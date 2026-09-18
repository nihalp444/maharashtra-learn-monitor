import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  BookOpenCheck,
  Building2,
  Landmark,
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
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/district-analytics", label: "District Analytics", icon: Building2 },
  { to: "/learning-programs", label: "Learning Programs", icon: BookOpenCheck },
  { to: "/reports", label: "Reports & Insights", icon: BarChart3 },
] as const;

function Navigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <nav className="flex flex-col md:flex-row" aria-label="Primary navigation">
      {nav.map((item) => {
        const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={`flex min-h-12 items-center gap-2 border-b px-5 text-sm font-semibold transition-colors md:min-h-14 md:border-b-0 md:border-r ${
              active
                ? "border-government-nav-border bg-government-nav-active text-government-nav-foreground"
                : "border-government-nav-border text-government-nav-foreground/90 hover:bg-government-nav-active hover:text-government-nav-foreground"
            }`}
          >
            <Icon className="size-4" />
            {item.label}
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
          size="sm"
          className="gap-2 text-government-nav-foreground hover:bg-government-nav-active hover:text-government-nav-foreground"
        >
          <Settings className="size-4" />
          <span className="hidden lg:inline">Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Dashboard Preferences</DialogTitle>
          <DialogDescription>
            Personalize notifications, data views, and alert thresholds.
          </DialogDescription>
        </DialogHeader>
        <div className="divide-y divide-border">
          {["Weekly engagement digest", "Low-engagement district alerts", "High-contrast charts mode"].map(
            (label, index) => (
              <div key={label} className="flex items-center justify-between py-3.5">
                <div>
                  <p className="text-xs font-semibold text-foreground">{label}</p>
                  <p className="text-[11px] text-muted-foreground">
                    {index === 1 ? "Trigger alerts when engagement falls below 50%" : "Receive automated notifications"}
                  </p>
                </div>
                <Switch defaultChecked={index < 2} aria-label={label} />
              </div>
            ),
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-2 focus:z-50 focus:bg-card focus:px-3 focus:py-2 focus:text-foreground"
      >
        Skip to main content
      </a>

      <header>
        <div className="bg-government-bar text-government-bar-foreground">
          <div className="mx-auto flex h-9 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
            <p className="text-xs font-semibold sm:text-sm">
              Government of Maharashtra <span className="mx-2 text-government-bar-foreground/40">|</span> महाराष्ट्र शासन
            </p>
            <p className="hidden text-xs font-semibold sm:block">English <span className="mx-1.5 text-government-bar-foreground/40">|</span> मराठी</p>
          </div>
        </div>

        <div className="border-b border-border bg-card">
          <div className="mx-auto flex min-h-28 max-w-[1600px] items-center gap-4 px-4 py-4 sm:gap-6 sm:px-6 lg:px-8">
            <div className="grid size-16 shrink-0 place-items-center border-r border-border pr-4 text-primary sm:size-20 sm:pr-6">
              <ShieldCheck className="size-11 sm:size-14" strokeWidth={1.5} />
            </div>
            <div className="min-w-0 flex-1">
              <p className="hidden text-sm font-bold text-primary sm:block">महाराष्ट्र इमारत व इतर बांधकाम कामगार कल्याणकारी मंडळ</p>
              <p className="mt-1 max-w-5xl text-lg font-extrabold leading-tight text-foreground sm:text-2xl">
                MBOCWWB – Maharashtra Building and Other Construction Workers Welfare Board
              </p>
              <p className="mt-1 text-sm font-bold uppercase text-muted-foreground">Digital Learning MIS</p>
            </div>
            <div className="hidden items-center gap-5 border-l border-border pl-6 text-primary md:flex">
              <div className="text-center">
                <Landmark className="mx-auto size-9" strokeWidth={1.4} />
                <p className="mt-1 text-[10px] font-bold text-muted-foreground">महाराष्ट्र शासन</p>
              </div>
              <div className="text-center">
                <ShieldCheck className="mx-auto size-9 text-foreground" strokeWidth={1.4} />
                <p className="mt-1 text-[10px] font-bold text-muted-foreground">सत्यमेव जयते</p>
              </div>
            </div>
          </div>
        </div>

        <div className="sticky top-0 z-40 bg-government-nav shadow-mis-raised">
          <div className="mx-auto flex min-h-14 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="hidden md:block"><Navigation /></div>
            <Button
              variant="ghost"
              size="icon"
              className="text-government-nav-foreground hover:bg-government-nav-active hover:text-government-nav-foreground md:hidden"
              onClick={() => setMenuOpen((open) => !open)}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
            </Button>
            <div className="ml-auto flex items-center gap-1">
              <SettingsDialog />
              <Button
                variant="ghost"
                size="icon"
                aria-label="Notifications"
                className="relative text-government-nav-foreground hover:bg-government-nav-active hover:text-government-nav-foreground"
              >
                <Bell className="size-4" />
                <span className="absolute right-2 top-2 size-1.5 rounded-full bg-warning" />
              </Button>
              <div className="ml-2 hidden items-center gap-2 border-l border-government-nav-border pl-3 text-government-nav-foreground sm:flex">
                <UserRound className="size-4" />
                <span className="text-xs font-semibold">State Directorate</span>
              </div>
            </div>
          </div>
          {menuOpen && (
            <div className="border-t border-government-nav-border bg-government-nav md:hidden">
              <Navigation onNavigate={() => setMenuOpen(false)} />
            </div>
          )}
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-[1600px] pb-10">{children}</main>

      <footer className="border-t border-border bg-card px-6 py-4 text-center text-xs text-muted-foreground">
        Maharashtra Building and Other Construction Workers Welfare Board · Digital Learning MIS
      </footer>
    </div>
  );
}