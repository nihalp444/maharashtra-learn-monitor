import { Link, useRouterState } from "@tanstack/react-router";
import {
  BarChart3,
  Bell,
  BookOpenCheck,
  Building2,
  ClipboardCheck,
  LayoutDashboard,
  Menu,
  Search,
  Settings,
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
import { ASSET_METADATA } from "@/assests";
import { FloatingChatbot } from "@/components/mis/floating-chatbot";

const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/district-analytics", label: "District Analytics", icon: Building2 },
  { to: "/learning-programs", label: "Learning Programs", icon: BookOpenCheck },
  { to: "/assessment-analytics", label: "Assessment Analytics", icon: ClipboardCheck },
  { to: "/reports", label: "Reports & Insights", icon: BarChart3 },
] as const;

function Navigation({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  return (
    <nav className="flex flex-col gap-1 py-1 md:flex-row md:items-center md:gap-1 md:py-0" aria-label="Primary navigation">
      {nav.map((item) => {
        const active = item.to === "/" ? pathname === "/" : pathname.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            onClick={onNavigate}
            className={`relative flex min-h-9 items-center gap-2 rounded-lg px-3.5 py-1.5 text-[13px] font-semibold tracking-wide transition-all duration-150 md:min-h-10 ${
              active
                ? "bg-white/18 text-white shadow-xs font-bold"
                : "text-white/85 hover:bg-white/10 hover:text-white"
            }`}
          >
            <Icon className={`size-4 transition-transform duration-150 ${active ? "scale-105" : "opacity-80"}`} />
            <span>{item.label}</span>
            {active && (
              <span className="hidden md:block absolute -bottom-[5px] left-3 right-3 h-[3px] rounded-full bg-amber-400" />
            )}
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
        {/* Top utility bar */}
        <div className="bg-government-bar text-government-bar-foreground">
          <div className="mx-auto flex h-7 max-w-[1600px] items-center justify-between px-3 sm:px-6 lg:px-8 text-[11px] font-medium tracking-wide">
            <div className="flex items-center gap-2 sm:gap-4">
              <a
                href="#main-content"
                className="text-government-bar-foreground/90 transition-colors hover:text-government-bar-foreground hover:underline"
              >
                Skip to main content
              </a>
              <span className="hidden sm:inline text-white/30">|</span>
              <div className="hidden sm:flex items-center gap-1.5 text-white/80">
                <span className="cursor-pointer hover:text-white transition-colors" title="Decrease font size">A-</span>
                <span className="cursor-pointer font-bold hover:text-white transition-colors" title="Normal font size">A</span>
                <span className="cursor-pointer font-bold hover:text-white transition-colors" title="Increase font size">A+</span>
              </div>
            </div>
            <div className="flex items-center gap-3 sm:gap-4">
              <div className="flex items-center gap-1.5 text-white/90">
                <span className="font-semibold hover:text-white cursor-pointer transition-colors">English</span>
                <span className="text-white/40">|</span>
                <span className="hover:text-white cursor-pointer transition-colors font-medium">मराठी</span>
              </div>
              <span className="text-white/30">|</span>
              <a
                href="#help"
                className="flex items-center gap-1 text-white/90 hover:text-white transition-colors"
              >
                <span>Help &amp; Support</span>
              </a>
            </div>
          </div>
        </div>

        {/* Main Branding Bar with compact height */}
        <div className="bg-card border-b border-border/40">
          <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-3 px-3 py-1.5 sm:gap-4 sm:px-6 lg:px-8">
            {/* Left: MBOCWWB Logo & Titles */}
            <div className="flex items-center gap-2.5 sm:gap-3.5 min-w-0">
              <Link to="/" className="flex shrink-0 items-center transition-transform duration-200 hover:scale-[1.02]">
                <img
                  src={ASSET_METADATA.logo.src}
                  alt={ASSET_METADATA.logo.alt}
                  width={68}
                  height={68}
                  className="h-14 w-auto object-contain drop-shadow-xs sm:h-16"
                  onError={(e) => {
                    const target = e.currentTarget;
                    if (target.src !== ASSET_METADATA.logo.fallback) {
                      target.src = ASSET_METADATA.logo.fallback;
                    }
                  }}
                />
              </Link>
              <div className="min-w-0">
                <p className="text-[11px] font-bold tracking-tight text-primary sm:text-xs leading-none">
                  महाराष्ट्र इमारत व इतर बांधकाम कामगार कल्याणकारी मंडळ
                </p>
                <h1 className="mt-0.5 max-w-3xl text-sm font-extrabold tracking-tight text-foreground sm:text-base lg:text-lg leading-snug">
                  MBOCWWB – Maharashtra Building and Other Construction Workers Welfare Board
                </h1>
                <p className="mt-0.5 text-[10px] font-bold tracking-wider uppercase text-muted-foreground/90 sm:text-[11px] leading-none">
                  GOVERNMENT OF MAHARASHTRA
                </p>
              </div>
            </div>

            {/* Right: Compact Ministers and State Seal & Emblem */}
            <div className="flex shrink-0 items-center gap-3 sm:gap-4 lg:gap-5">
              {/* Ministers Grid - Compact, without extra "Maharashtra" line */}
              <div className="hidden md:flex items-stretch gap-1.5 lg:gap-2.5">
                {ASSET_METADATA.ministers.map((minister) => (
                  <div
                    key={minister.name}
                    className="flex flex-col items-center text-center w-[114px] lg:w-[124px] rounded-xl bg-white border border-[#eae5dd] p-1 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all duration-200 hover:shadow-xs"
                  >
                    {/* Top Minister Photo Area with Compact Curved Backdrop */}
                    <div className="relative h-[66px] w-full overflow-hidden rounded-lg bg-[#ece7df]">
                      <img
                        src={minister.src}
                        alt={minister.alt}
                        className="h-full w-full object-cover object-top"
                        onError={(e) => {
                          const target = e.currentTarget;
                          if (target.src !== minister.fallback) {
                            target.src = minister.fallback;
                          }
                        }}
                      />
                    </div>

                    {/* Minister Information Block (Name + Designation only) */}
                    <div className="mt-1 flex flex-col items-center justify-center w-full pb-0.5">
                      <span className="text-[10.5px] font-extrabold text-slate-900 leading-tight text-center">
                        {minister.name}
                      </span>
                      <span className="mt-0.5 text-[8.5px] font-semibold text-slate-600 leading-tight text-center">
                        {minister.title}
                      </span>
                    </div>
                  </div>
                ))}
              </div>

              {/* State Seal & National Emblem - Prominent Sizing */}
              <div className="hidden sm:flex shrink-0 items-center gap-3 border-l border-border/60 pl-3 sm:pl-4">
                <div className="flex flex-col items-center">
                  <img
                    src={ASSET_METADATA.seal.src}
                    alt={ASSET_METADATA.seal.alt}
                    width={64}
                    height={64}
                    className="h-14 w-auto object-contain drop-shadow-xs sm:h-16"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== ASSET_METADATA.seal.fallback) {
                        target.src = ASSET_METADATA.seal.fallback;
                      }
                    }}
                  />
                  <span className="mt-0.5 text-[9px] font-bold text-muted-foreground tracking-tighter">महाराष्ट्र शासन</span>
                </div>
                <div className="flex flex-col items-center">
                  <img
                    src={ASSET_METADATA.emblem.src}
                    alt={ASSET_METADATA.emblem.alt}
                    width={56}
                    height={64}
                    className="h-14 w-auto object-contain drop-shadow-xs sm:h-16"
                    onError={(e) => {
                      const target = e.currentTarget;
                      if (target.src !== ASSET_METADATA.emblem.fallback) {
                        target.src = ASSET_METADATA.emblem.fallback;
                      }
                    }}
                  />
                  <span className="mt-0.5 text-[9px] font-bold text-muted-foreground tracking-tighter">सत्यमेव जयते</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Primary Red Navigation Bar */}
        <div className="sticky top-0 z-40 bg-gradient-to-r from-primary to-[oklch(0.32_0.14_24)] shadow-md">
          <div className="mx-auto flex min-h-11 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2">
              <Button
                variant="ghost"
                size="icon"
                className="text-white hover:bg-white/10 hover:text-white md:hidden"
                onClick={() => setMenuOpen((open) => !open)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
              </Button>
              <div className="hidden md:block">
                <Navigation />
              </div>
            </div>

            <div className="flex items-center gap-3">
              <div className="relative hidden w-56 sm:block md:w-64 lg:w-72">
                <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground/70" />
                <input
                  type="text"
                  placeholder="Search services..."
                  className="h-8 w-full rounded-full border border-white/20 bg-white/95 pl-9 pr-4 text-xs font-medium text-foreground placeholder:text-muted-foreground transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-amber-400 shadow-sm"
                />
              </div>

              <div className="flex items-center gap-1">
                <SettingsDialog />
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Notifications"
                  className="relative rounded-full text-white/90 hover:bg-white/12 hover:text-white"
                >
                  <Bell className="size-4" />
                  <span className="absolute right-2 top-2 size-2 rounded-full bg-amber-400 ring-2 ring-primary" />
                </Button>
                <div className="ml-1.5 hidden items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-white backdrop-blur-xs transition-colors hover:bg-white/15 lg:flex">
                  <UserRound className="size-3.5 text-amber-300" />
                  <span className="text-xs font-semibold">State Directorate</span>
                </div>
              </div>
            </div>
          </div>
          {menuOpen && (
            <div className="border-t border-white/15 bg-primary/95 px-4 py-3 backdrop-blur-md md:hidden">
              <div className="mb-2">
                <div className="relative w-full">
                  <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search services..."
                    className="h-9 w-full rounded-full border border-white/20 bg-white pl-9 pr-4 text-xs text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-amber-400"
                  />
                </div>
              </div>
              <Navigation onNavigate={() => setMenuOpen(false)} />
            </div>
          )}
        </div>
      </header>

      <main id="main-content" className="mx-auto max-w-[1600px] pb-10">{children}</main>

      {/* Floating Ask Me Chatbot */}
      <FloatingChatbot />

      <footer className="border-t border-border bg-card px-6 py-4 text-center text-xs text-muted-foreground">
        Maharashtra Building and Other Construction Workers Welfare Board · Digital Learning MIS
      </footer>
    </div>
  );
}