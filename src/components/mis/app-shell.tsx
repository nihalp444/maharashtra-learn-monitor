import { Link, useRouter, useRouterState } from "@tanstack/react-router";
import {
  Award,
  BarChart3,
  Bell,
  BookOpenCheck,
  Building2,
  CheckCircle,
  ChevronDown,
  ClipboardCheck,
  GraduationCap,
  LayoutDashboard,
  LockKeyhole,
  LogOut,
  Mail,
  Menu,
  Phone,
  Power,
  Search,
  Settings,
  Shield,
  Sliders,
  Sparkles,
  User,
  UserRound,
  X,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
import { supabase } from "@/integrations/supabase/client";
import { STUDENT_ACCOUNTS, isStudentUsername } from "@/features/student/student-data";

export interface UserSessionInfo {
  name: string;
  email: string;
  role: string;
  isStudent: boolean;
  username?: string;
  ageGroup?: string;
  ageGroupLabel?: string;
  studentId?: string;
  district?: string;
}

const adminNav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/district-analytics", label: "District Analytics", icon: Building2 },
  { to: "/learning-programs", label: "Learning Programs", icon: BookOpenCheck },
  { to: "/assessment-analytics", label: "Assessment Analytics", icon: ClipboardCheck },
  { to: "/reports", label: "Reports & Insights", icon: BarChart3 },
] as const;

const studentNav = [
  { targetId: "home", label: "Home", icon: LayoutDashboard },
  { targetId: "my-learning", label: "My Learning", icon: BookOpenCheck },
  { targetId: "assessments", label: "Assessments", icon: ClipboardCheck },
  { targetId: "my-progress", label: "My Progress", icon: BarChart3 },
  { targetId: "achievements", label: "Achievements", icon: Award },
] as const;

function Navigation({
  userInfo,
  onNavigate,
}: {
  userInfo: UserSessionInfo;
  onNavigate?: () => void;
}) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });

  if (userInfo.isStudent) {
    return (
      <nav
        className="flex flex-col gap-1 py-1 md:flex-row md:items-center md:gap-1 md:py-0"
        aria-label="Student navigation"
      >
        {studentNav.map((item) => {
          const Icon = item.icon;
          return (
            <button
              key={item.targetId}
              type="button"
              onClick={() => {
                onNavigate?.();
                const el = document.getElementById(item.targetId);
                if (el) {
                  el.scrollIntoView({ behavior: "smooth" });
                } else if (pathname !== "/dashboard" && pathname !== "/") {
                  window.location.href = `/dashboard#${item.targetId}`;
                }
              }}
              className="relative flex min-h-9 items-center gap-2 rounded-lg px-3.5 py-1.5 text-[13px] font-semibold tracking-wide text-white/90 hover:bg-white/10 hover:text-white transition-all duration-150 md:min-h-10 cursor-pointer"
            >
              <Icon className="size-4 opacity-90" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </nav>
    );
  }

  return (
    <nav className="flex flex-col gap-1 py-1 md:flex-row md:items-center md:gap-1 md:py-0" aria-label="Primary navigation">
      {adminNav.map((item) => {
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

function UserProfileDropdown({ userInfo }: { userInfo: UserSessionInfo }) {
  const [loggingOut, setLoggingOut] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [settingsDialogOpen, setSettingsDialogOpen] = useState(false);

  async function handleLogout() {
    try {
      setLoggingOut(true);
      if (typeof window !== "undefined") {
        localStorage.removeItem("mbocwwb-demo-auth");
        sessionStorage.removeItem("mbocwwb-demo-auth");
        sessionStorage.removeItem("mbocwwb-session-only");
        for (let i = localStorage.length - 1; i >= 0; i--) {
          const key = localStorage.key(i);
          if (key && (key.startsWith("sb-") || key.includes("supabase"))) {
            localStorage.removeItem(key);
          }
        }
      }
      await supabase.auth.signOut();
    } catch (e) {
      console.error("Sign out error:", e);
    } finally {
      setLoggingOut(false);
      window.location.href = "/auth";
    }
  }

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <button
            type="button"
            className="ml-2 flex items-center gap-2 rounded-full py-0.5 pl-2.5 pr-1 text-white transition-all hover:bg-white/10 focus:outline-none cursor-pointer"
            title="User Account Menu"
            aria-label="User Account Menu"
          >
            <span className="text-[13px] font-semibold tracking-wide text-white/95 hidden sm:inline">
              {userInfo.name}
            </span>
            {userInfo.isStudent && userInfo.ageGroupLabel && (
              <span className="hidden lg:inline-flex items-center rounded-full bg-white/20 px-2 py-0.5 text-[10.5px] font-bold text-amber-200 border border-white/25">
                {userInfo.ageGroupLabel}
              </span>
            )}
            <div className={`grid size-9 place-items-center rounded-full ${userInfo.isStudent ? "bg-amber-100 text-amber-800" : "bg-blue-100 text-blue-600"} shadow-sm transition-transform hover:scale-105 ring-2 ring-white/20`}>
              {userInfo.isStudent ? <GraduationCap className="size-5" /> : <User className="size-5" />}
            </div>
          </button>
        </DropdownMenuTrigger>

        <DropdownMenuContent
          align="end"
          sideOffset={8}
          className="w-64 rounded-2xl border border-slate-200/80 bg-white p-2.5 shadow-xl animate-in fade-in zoom-in-95"
        >
          {/* User Info Header */}
          <div className="px-2 py-1.5 pb-2.5">
            <div className="flex items-center justify-between gap-1.5">
              <p className="text-sm font-bold text-slate-900 leading-tight">
                {userInfo.name}
              </p>
              {userInfo.isStudent ? (
                <span className="rounded bg-amber-100 px-1.5 py-0.5 text-[10px] font-bold text-amber-800">
                  Student
                </span>
              ) : (
                <span className="rounded bg-blue-100 px-1.5 py-0.5 text-[10px] font-bold text-blue-800">
                  Admin
                </span>
              )}
            </div>
            <p className="mt-0.5 text-xs text-slate-500 font-normal truncate">
              {userInfo.email}
            </p>
            {userInfo.isStudent && userInfo.ageGroupLabel && (
              <p className="mt-1 text-[11px] font-semibold text-primary">
                {userInfo.ageGroupLabel}
              </p>
            )}
          </div>

          <DropdownMenuSeparator className="my-1 -mx-2.5 bg-slate-100" />

          {/* Menu Items: Profile, Settings, Logout */}
          <div className="py-1 space-y-0.5">
            {/* Profile Item */}
            <DropdownMenuItem
              onClick={() => setProfileDialogOpen(true)}
              className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <User className="size-4 text-slate-500" />
              <span>{userInfo.isStudent ? "Student Profile" : "Officer Profile"}</span>
            </DropdownMenuItem>

            {/* Settings Item */}
            <DropdownMenuItem
              onClick={() => setSettingsDialogOpen(true)}
              className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-xs font-semibold text-slate-700 hover:bg-slate-50 cursor-pointer transition-colors"
            >
              <Settings className="size-4 text-slate-500" />
              <span>Settings</span>
            </DropdownMenuItem>
          </div>

          <DropdownMenuSeparator className="my-1 -mx-2.5 bg-slate-100" />

          {/* Working Red Logout Item */}
          <DropdownMenuItem
            disabled={loggingOut}
            onClick={handleLogout}
            className="flex items-center gap-3 rounded-lg px-2.5 py-2 text-xs font-semibold text-red-500 hover:bg-red-50 hover:text-red-600 cursor-pointer transition-colors"
          >
            <Power className="size-4 text-red-500" />
            <span>{loggingOut ? "Logging out…" : "Logout"}</span>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Profile Modal Dialog */}
      <Dialog open={profileDialogOpen} onOpenChange={setProfileDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <div className="grid size-9 place-items-center rounded-lg bg-primary/10 text-primary">
                {userInfo.isStudent ? <GraduationCap className="size-5" /> : <Shield className="size-5" />}
              </div>
              <div>
                <span className="text-base font-extrabold text-foreground">
                  {userInfo.isStudent ? "Student Scholar Profile" : "Officer Profile"}
                </span>
                <p className="text-xs font-normal text-muted-foreground">
                  {userInfo.isStudent ? "Registered Digital Learning Account" : "Authorized Administrator Details"}
                </p>
              </div>
            </DialogTitle>
            <DialogDescription className="sr-only">
              {userInfo.isStudent ? "Student profile information" : "Authorized officer profile information"}
            </DialogDescription>
          </DialogHeader>

          <div className="rounded-xl border border-border bg-muted/40 p-4 space-y-3.5">
            <div className="flex items-center gap-3">
              <div className={`grid size-12 place-items-center rounded-full ${userInfo.isStudent ? "bg-amber-100 text-amber-700" : "bg-blue-100 text-blue-600"} font-black text-lg shadow-sm`}>
                {userInfo.isStudent ? <GraduationCap className="size-6" /> : <User className="size-6" />}
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-bold text-foreground capitalize truncate">{userInfo.name}</p>
                  <span className="rounded-md bg-emerald-500/15 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
                    Active
                  </span>
                </div>
                <p className="text-xs text-muted-foreground font-mono truncate">{userInfo.email}</p>
              </div>
            </div>

            <div className="border-t border-border/80 pt-3 grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-[11px] font-medium text-muted-foreground block">
                  {userInfo.isStudent ? "Student ID" : "Department"}
                </span>
                <span className="font-semibold text-foreground">
                  {userInfo.isStudent ? (userInfo.studentId || "MH-STU-001") : "MBOCWWB Maharashtra"}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-medium text-muted-foreground block">
                  {userInfo.isStudent ? "Registered Age Group" : "Role"}
                </span>
                <span className="font-semibold text-primary">
                  {userInfo.isStudent ? (userInfo.ageGroupLabel || "Age Group: 11–14") : userInfo.role}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-medium text-muted-foreground block">
                  {userInfo.isStudent ? "District" : "Coverage"}
                </span>
                <span className="font-semibold text-foreground">
                  {userInfo.isStudent ? (userInfo.district || "Maharashtra") : "All 36 Districts"}
                </span>
              </div>
              <div>
                <span className="text-[11px] font-medium text-muted-foreground block">Authentication</span>
                <span className="font-semibold text-emerald-600 flex items-center gap-1">
                  <CheckCircle className="size-3" />
                  {userInfo.isStudent ? "Verified Student" : "Verified Admin"}
                </span>
              </div>
            </div>
          </div>

          <div className="flex justify-end pt-1">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setProfileDialogOpen(false)}
              className="text-xs"
            >
              Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Settings Modal Dialog triggered from popup */}
      <Dialog open={settingsDialogOpen} onOpenChange={setSettingsDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Dashboard Preferences &amp; Settings</DialogTitle>
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
          <div className="flex justify-end pt-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setSettingsDialogOpen(false)}
              className="text-xs"
            >
              Save &amp; Close
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const isAuthPage = pathname === "/auth" || pathname.startsWith("/auth/");

  const [userInfo, setUserInfo] = useState<UserSessionInfo>({
    name: "Administrator",
    email: "admin@mbocwwb.gov.in",
    role: "State Directorate",
    isStudent: false,
  });

  useEffect(() => {
    // 1. Check local demo auth first
    if (typeof window !== "undefined") {
      const storedAuth = localStorage.getItem("mbocwwb-demo-auth");
      if (storedAuth && isStudentUsername(storedAuth)) {
        const student = STUDENT_ACCOUNTS[storedAuth];
        setUserInfo({
          name: student.displayName,
          email: `${student.username}@user.mbocwwb.gov.in`,
          role: "Student",
          isStudent: true,
          username: student.username,
          ageGroup: student.ageGroup,
          ageGroupLabel: student.ageGroupLabel,
          studentId: student.studentId,
          district: student.schoolDistrict,
        });
        return;
      } else if (storedAuth === "admin") {
        setUserInfo({
          name: "State Directorate Administrator",
          email: "admin@mbocwwb.gov.in",
          role: "State Directorate",
          isStudent: false,
        });
        return;
      }
    }

    // 2. Check Supabase session
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        const role = (data.user.user_metadata?.role as string) || "admin";
        const isStudent = role === "student";
        const username =
          (data.user.user_metadata?.display_name as string) ||
          (data.user.user_metadata?.username as string) ||
          (isStudent ? "Aarav" : "Administrator");

        const ageGroup = (data.user.user_metadata?.age_group as string) || "11-14";
        const ageGroupLabel =
          (data.user.user_metadata?.age_group_label as string) ||
          `Age Group: ${ageGroup}`;
        const studentId = (data.user.user_metadata?.student_id as string) || "MH-STU-001";

        setUserInfo({
          name: username,
          email: data.user.email || (isStudent ? "aarav@user.mbocwwb.gov.in" : "admin@mbocwwb.gov.in"),
          role: isStudent ? "Student" : "State Directorate",
          isStudent,
          username: (data.user.user_metadata?.username as string) || (isStudent ? "aarav11" : "admin"),
          ageGroup,
          ageGroupLabel,
          studentId,
          district: (data.user.user_metadata?.district as string) || "Maharashtra",
        });
      }
    });
  }, [pathname]);

  // Route protection for students: do not show administrative analytics to students
  useEffect(() => {
    if (userInfo.isStudent && !isAuthPage) {
      const adminOnlyPaths = ["/district-analytics", "/reports", "/learning-programs", "/assessment-analytics"];
      if (adminOnlyPaths.some((p) => pathname.startsWith(p))) {
        window.location.href = "/dashboard";
      }
    }
  }, [userInfo.isStudent, pathname, isAuthPage]);

  return (
    <div className="min-h-screen bg-background flex flex-col">
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

        {/* Main Branding Bar with ministers and state seals */}
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

            {/* Right: Ministers and State Seal & Emblem */}
            <div className="flex shrink-0 items-center gap-3 sm:gap-4 lg:gap-5">
              {/* Ministers Grid */}
              <div className="hidden md:flex items-stretch gap-1.5 lg:gap-2.5">
                {ASSET_METADATA.ministers.map((minister) => (
                  <div
                    key={minister.name}
                    className="flex flex-col items-center text-center w-[114px] lg:w-[124px] rounded-xl bg-white border border-[#eae5dd] p-1 shadow-[0_1px_4px_rgba(0,0,0,0.04)] transition-all duration-200 hover:shadow-xs"
                  >
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

              {/* State Seal & National Emblem */}
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

        {/* Primary Red Strip: Full navigation for admin pages, subtle secure gateway strip on auth page */}
        {isAuthPage ? (
          <div className="bg-primary text-white shadow-sm border-b border-primary/20">
            <div className="mx-auto flex h-10 max-w-[1600px] items-center justify-between px-4 sm:px-6 lg:px-8 text-xs font-semibold text-white">
              <div className="flex items-center gap-2.5">
                <GraduationCap className="size-4 text-white" />
                <span className="tracking-wide font-bold text-sm">Digital Learning &amp; Student Monitoring System</span>
              </div>
              <div className="flex items-center gap-2.5 text-xs font-medium text-white/95">
                <LockKeyhole className="size-3.5 text-white/90" />
                <span>Authorized Personnel Only</span>
              </div>
            </div>
          </div>
        ) : (
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
                  <Navigation userInfo={userInfo} />
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
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label="Notifications"
                    className="relative rounded-full text-white/90 hover:bg-white/12 hover:text-white"
                  >
                    <Bell className="size-4" />
                    <span className="absolute right-2 top-2 size-2 rounded-full bg-amber-400 ring-2 ring-primary" />
                  </Button>
                  <UserProfileDropdown userInfo={userInfo} />
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
                <Navigation userInfo={userInfo} onNavigate={() => setMenuOpen(false)} />
              </div>
            )}
          </div>
        )}
      </header>

      <main id="main-content" className={`flex-1 ${isAuthPage ? "" : "mx-auto w-full max-w-[1600px] pb-10"}`}>{children}</main>

      {/* Floating Ask Me Chatbot (hidden on auth page) */}
      {!isAuthPage && (
        <footer className="border-t border-border bg-card px-6 py-4 text-center text-xs text-muted-foreground">
          © 2026 Maharashtra Building and Other Construction Workers Welfare Board · Digital Learning MIS
        </footer>
      )}
    </div>
  );
}