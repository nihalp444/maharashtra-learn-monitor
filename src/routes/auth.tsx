import { createFileRoute, useNavigate } from "@tanstack/react-router";
import {
  ArrowRight,
  BookOpen,
  Eye,
  EyeOff,
  GraduationCap,
  Leaf,
  Lock,
  LockKeyhole,
  Phone,
  Shield,
  TrendingUp,
  User,
  Users,
} from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { supabase } from "@/integrations/supabase/client";
import { identifierToEmail } from "@/lib/auth-identifier";
import { STUDENT_ACCOUNTS, isStudentUsername } from "@/features/student/student-data";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Login to Digital Learning MIS | MBOCWWB" },
      { name: "description", content: "Access your personalized learning account on MBOCWWB Digital Learning MIS." },
      { property: "og:title", content: "Login to Digital Learning MIS | MBOCWWB" },
      { property: "og:description", content: "Access your personalized learning account." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate({ from: "/auth" });
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    // Check Supabase session first
    void supabase.auth.getUser().then(({ data }) => {
      if (data.user) {
        void navigate({ to: "/dashboard", replace: true });
        return;
      }
      // Check local demo session (admin or student)
      if (typeof window !== "undefined") {
        const storedAuth = localStorage.getItem("mbocwwb-demo-auth");
        if (storedAuth && (storedAuth === "admin" || isStudentUsername(storedAuth))) {
          void navigate({ to: "/dashboard", replace: true });
        }
      }
    });
  }, [navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    const trimmedId = identifier.trim().toLowerCase();

    if (!trimmedId || password.length < 6) {
      setErrorMessage("Please enter a valid username or mobile number and password (min 6 characters).");
      return;
    }

    // 1. Instant login for demo admin account
    if (trimmedId === "admin" && password === "12345678") {
      localStorage.setItem("mbocwwb-demo-auth", "admin");
      setSubmitting(false);
      void navigate({ to: "/dashboard", replace: true });
      return;
    }

    // 2. Instant login for demo student accounts (aarav6, aarav11, aarav15)
    if (isStudentUsername(trimmedId) && password === "12345678") {
      localStorage.setItem("mbocwwb-demo-auth", trimmedId);
      setSubmitting(false);
      void navigate({ to: "/dashboard", replace: true });
      return;
    }

    // 3. Supabase authentication for standard accounts
    setSubmitting(true);
    const email = identifierToEmail(trimmedId);
    const { data: signInData, error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInData?.user) {
      setSubmitting(false);
      localStorage.removeItem("mbocwwb-demo-auth");
      if (!remember) sessionStorage.setItem("mbocwwb-session-only", "true");
      await navigate({ to: "/dashboard", replace: true });
      return;
    }

    setSubmitting(false);
    setErrorMessage(
      signInError?.message || "Invalid credentials. Please verify your username/mobile and password."
    );
  }

  return (
    <div
      className="relative flex-1 flex flex-col justify-between overflow-hidden min-h-[calc(100vh-140px)]"
      style={{
        backgroundColor: "#FAF7F2",
        backgroundImage: "radial-gradient(circle at 50% 45%, #FFFFFF 0%, #F9F5EE 60%, #EFE8DC 100%)",
      }}
    >
      {/* Organic Non-Grid Scattered Education & Study Icons */}
      <div className="pointer-events-none absolute inset-0 select-none overflow-hidden" aria-hidden="true">
        <svg className="h-full w-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            {/* Reusable Icon Definitions */}
            <g id="icon-book" stroke="#8B0012" strokeWidth="1.25" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 0,4 C 5,1 12,2 14,4 L 14,14 C 12,12 5,11 0,14 Z" />
              <path d="M 28,4 C 23,1 16,2 14,4 L 14,14 C 16,12 23,11 28,14 Z" />
              <line x1="14" y1="4" x2="14" y2="14" />
              <line x1="3" y1="6.5" x2="10" y2="5.5" strokeWidth="0.85" />
              <line x1="3" y1="9.5" x2="10" y2="8.5" strokeWidth="0.85" />
              <line x1="18" y1="5.5" x2="25" y2="6.5" strokeWidth="0.85" />
              <line x1="18" y1="8.5" x2="25" y2="9.5" strokeWidth="0.85" />
            </g>

            <g id="icon-cap" stroke="#8B0012" strokeWidth="1.25" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="12,0 24,5 12,10 0,5" />
              <path d="M 4,7 L 4,13 C 4,16 20,16 20,13 L 20,7" />
              <path d="M 21,5.5 L 24,9 L 24,14" />
              <circle cx="24" cy="14" r="0.9" fill="#8B0012" />
            </g>

            <g id="icon-lamp" stroke="#B38622" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 4,8 L 16,3 L 13,0 L 1,5 Z" />
              <path d="M 8.5,4 C 15,10 9,16 11,20" />
              <line x1="6" y1="20" x2="16" y2="20" strokeWidth="1.5" />
              <line x1="1" y1="10" x2="0" y2="12" strokeWidth="1" />
              <line x1="4" y1="13" x2="3" y2="15" strokeWidth="1" />
              <line x1="8" y1="15" x2="8" y2="17" strokeWidth="1" />
            </g>

            <g id="icon-pencil" stroke="#8B0012" strokeWidth="1.2" fill="none" strokeLinecap="round" strokeLinejoin="round">
              <path d="M 3,18 L 0,22 L 4,21 L 18,7 L 15,4 Z" />
              <line x1="12" y1="7" x2="15" y2="10" />
              <line x1="1" y1="21" x2="2.5" y2="19.5" />
            </g>

            <g id="icon-sparkle" fill="#B38622">
              <path d="M 6,0 L 7.5,4.5 L 12,6 L 7.5,7.5 L 6,12 L 4.5,7.5 L 0,6 L 4.5,4.5 Z" />
            </g>
          </defs>

          {/* LEFT FLANK - Rich Organic Scatter */}
          <use href="#icon-book" x="3%" y="8%" opacity="0.16" transform="rotate(-7, 40, 60)" />
          <use href="#icon-cap" x="12%" y="6%" opacity="0.15" transform="rotate(11, 140, 45)" />
          <use href="#icon-sparkle" x="21%" y="11%" opacity="0.18" />
          <use href="#icon-pencil" x="7%" y="19%" opacity="0.15" transform="rotate(-16, 80, 130)" />
          <use href="#icon-lamp" x="16%" y="22%" opacity="0.16" transform="rotate(8, 180, 150)" />
          <use href="#icon-book" x="25%" y="27%" opacity="0.15" transform="rotate(4, 280, 185)" />

          <use href="#icon-cap" x="4%" y="33%" opacity="0.15" transform="rotate(-12, 45, 230)" />
          <use href="#icon-sparkle" x="13%" y="37%" opacity="0.18" />
          <use href="#icon-pencil" x="22%" y="41%" opacity="0.15" transform="rotate(14, 250, 280)" />
          <use href="#icon-book" x="6%" y="47%" opacity="0.16" transform="rotate(9, 70, 320)" />
          <use href="#icon-lamp" x="17%" y="51%" opacity="0.16" transform="rotate(-6, 190, 350)" />
          <use href="#icon-cap" x="26%" y="56%" opacity="0.15" transform="rotate(7, 290, 390)" />

          <use href="#icon-sparkle" x="5%" y="61%" opacity="0.18" />
          <use href="#icon-pencil" x="14%" y="65%" opacity="0.15" transform="rotate(-15, 160, 450)" />
          <use href="#icon-book" x="23%" y="70%" opacity="0.16" transform="rotate(6, 260, 480)" />
          <use href="#icon-lamp" x="4%" y="75%" opacity="0.16" transform="rotate(11, 50, 520)" />
          <use href="#icon-cap" x="15%" y="79%" opacity="0.15" transform="rotate(-9, 170, 545)" />
          <use href="#icon-sparkle" x="8%" y="87%" opacity="0.18" />
          <use href="#icon-pencil" x="19%" y="89%" opacity="0.15" transform="rotate(18, 215, 610)" />
          <use href="#icon-book" x="27%" y="92%" opacity="0.15" transform="rotate(-5, 305, 630)" />

          {/* TOP AREA - Floating softly across the header margin */}
          <use href="#icon-lamp" x="31%" y="5%" opacity="0.15" transform="rotate(-8, 350, 40)" />
          <use href="#icon-sparkle" x="39%" y="9%" opacity="0.18" />
          <use href="#icon-book" x="46%" y="4%" opacity="0.15" transform="rotate(6, 520, 30)" />
          <use href="#icon-pencil" x="54%" y="8%" opacity="0.14" transform="rotate(-14, 610, 55)" />
          <use href="#icon-sparkle" x="61%" y="5%" opacity="0.18" />
          <use href="#icon-cap" x="68%" y="7%" opacity="0.15" transform="rotate(10, 770, 50)" />

          {/* BOTTOM AREA - Floating softly below login card */}
          <use href="#icon-book" x="34%" y="91%" opacity="0.15" transform="rotate(7, 380, 620)" />
          <use href="#icon-sparkle" x="42%" y="94%" opacity="0.18" />
          <use href="#icon-pencil" x="50%" y="91%" opacity="0.15" transform="rotate(-19, 560, 625)" />
          <use href="#icon-cap" x="58%" y="93%" opacity="0.15" transform="rotate(8, 650, 635)" />
          <use href="#icon-sparkle" x="66%" y="91%" opacity="0.18" />

          {/* RIGHT FLANK - Rich Organic Scatter */}
          <use href="#icon-book" x="74%" y="9%" opacity="0.16" transform="rotate(-8, 830, 60)" />
          <use href="#icon-cap" x="83%" y="6%" opacity="0.15" transform="rotate(13, 940, 45)" />
          <use href="#icon-sparkle" x="93%" y="9%" opacity="0.18" />
          <use href="#icon-pencil" x="76%" y="19%" opacity="0.15" transform="rotate(16, 860, 130)" />
          <use href="#icon-lamp" x="88%" y="18%" opacity="0.16" transform="rotate(-10, 990, 125)" />
          <use href="#icon-sparkle" x="95%" y="26%" opacity="0.18" />

          <use href="#icon-cap" x="73%" y="31%" opacity="0.15" transform="rotate(-7, 825, 215)" />
          <use href="#icon-book" x="84%" y="33%" opacity="0.16" transform="rotate(8, 950, 230)" />
          <use href="#icon-pencil" x="93%" y="38%" opacity="0.15" transform="rotate(-14, 1050, 260)" />
          <use href="#icon-lamp" x="75%" y="45%" opacity="0.16" transform="rotate(11, 845, 310)" />
          <use href="#icon-sparkle" x="86%" y="48%" opacity="0.18" />
          <use href="#icon-cap" x="92%" y="52%" opacity="0.15" transform="rotate(-6, 1040, 360)" />

          <use href="#icon-book" x="74%" y="59%" opacity="0.16" transform="rotate(10, 835, 410)" />
          <use href="#icon-pencil" x="84%" y="63%" opacity="0.15" transform="rotate(-18, 950, 440)" />
          <use href="#icon-sparkle" x="94%" y="66%" opacity="0.18" />
          <use href="#icon-lamp" x="76%" y="73%" opacity="0.16" transform="rotate(-8, 860, 510)" />
          <use href="#icon-cap" x="87%" y="76%" opacity="0.15" transform="rotate(12, 985, 530)" />
          <use href="#icon-book" x="94%" y="81%" opacity="0.16" transform="rotate(-9, 1060, 560)" />

          <use href="#icon-pencil" x="74%" y="86%" opacity="0.15" transform="rotate(15, 835, 600)" />
          <use href="#icon-sparkle" x="83%" y="89%" opacity="0.18" />
          <use href="#icon-lamp" x="91%" y="91%" opacity="0.16" transform="rotate(-5, 1030, 630)" />
        </svg>

        {/* Soft radial white overlay in center to keep the login card clean & elevated */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: "radial-gradient(circle at 50% 45%, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.15) 55%, transparent 80%)",
          }}
        />
      </div>

      {/* Main Content Area: Centered Login Card with Generous Breathing Room */}
      <div className="relative z-10 flex flex-1 items-center justify-center px-4 py-8 sm:py-12">
        <div className="w-full max-w-[425px] rounded-2xl border border-slate-200/90 bg-white/98 p-6 sm:p-7 shadow-[0_12px_40px_rgba(0,0,0,0.06),0_2px_6px_rgba(0,0,0,0.03)] backdrop-blur-md">
          
          {/* Card Header: Horizontal Icon + Title */}
          <div className="flex items-center gap-3.5">
            <div className="grid size-11 shrink-0 place-items-center rounded-xl bg-primary/10 text-primary shadow-2xs">
              <GraduationCap className="size-6 text-primary" />
            </div>
            <div className="text-left">
              <h2 className="text-lg sm:text-xl font-extrabold tracking-tight text-primary leading-tight">
                Login to Digital Learning MIS
              </h2>
              <p className="mt-0.5 text-xs text-slate-500 font-medium">
                Access your personalized learning account
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <form onSubmit={handleSubmit} className="mt-5 space-y-3.5">
            {/* Identifier Input */}
            <div className="space-y-1 text-left">
              <Label htmlFor="identifier" className="text-xs font-semibold text-slate-700">
                Username or Mobile Number
              </Label>
              <div className="relative">
                <User className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="identifier"
                  autoComplete="username"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter username or mobile number"
                  className="h-9.5 rounded-lg border-slate-200 bg-white pl-9.5 text-xs font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-primary shadow-2xs"
                  required
                />
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-1 text-left">
              <Label htmlFor="password" className="text-xs font-semibold text-slate-700">
                Password
              </Label>
              <div className="relative">
                <Lock className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-slate-400" />
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter password"
                  className="h-9.5 rounded-lg border-slate-200 bg-white pl-9.5 pr-9.5 text-xs font-medium placeholder:text-slate-400 focus-visible:ring-2 focus-visible:ring-primary shadow-2xs"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
                </button>
              </div>
            </div>

            {/* Remember Me and Forgot Password */}
            <div className="flex items-center justify-between pt-0.5 text-xs">
              <div className="flex items-center gap-1.5">
                <Checkbox
                  id="remember"
                  checked={remember}
                  onCheckedChange={(checked) => setRemember(checked === true)}
                  className="size-4 rounded border-slate-300 data-[state=checked]:bg-primary data-[state=checked]:border-primary"
                />
                <Label htmlFor="remember" className="text-xs font-medium text-slate-700 cursor-pointer select-none">
                  Remember this device
                </Label>
              </div>
              <a
                href="#help"
                className="font-bold text-primary hover:text-primary/80 hover:underline transition-colors"
              >
                Forgot password?
              </a>
            </div>

            {/* Error Feedback */}
            {errorMessage && (
              <div
                role="alert"
                className="rounded-md border border-red-200 bg-red-50 p-2.5 text-xs font-medium text-red-700 animate-in fade-in"
              >
                {errorMessage}
              </div>
            )}

            {/* Maroon Login Button */}
            <Button
              type="submit"
              disabled={submitting}
              className="h-10 w-full rounded-lg bg-primary hover:bg-primary/95 text-white font-bold text-xs shadow-md active:scale-[0.99] transition-all flex items-center justify-center gap-1.5"
            >
              <span>{submitting ? "Authenticating…" : "Login"}</span>
              {!submitting && <ArrowRight className="size-4" />}
            </Button>
          </form>

          {/* User Notice Card */}
          <div className="mt-3.5 rounded-lg border border-slate-100 bg-slate-50/90 px-3 py-2 text-left">
            <div className="flex items-center gap-2.5">
              <Shield className="size-4 shrink-0 text-primary" />
              <p className="text-[10.5px] leading-snug text-slate-600 font-medium">
                Your access is automatically determined based on your registered profile and age group.
              </p>
            </div>
          </div>

          {/* Quick Demo Credentials */}
          <div className="mt-3 rounded-lg border border-amber-200/80 bg-amber-50/70 p-2.5 text-xs text-amber-950 space-y-1.5">
            <div className="flex items-center justify-between text-[11px] font-bold text-amber-900">
              <span>Demo Accounts (Password: 12345678)</span>
            </div>
            <div className="grid grid-cols-2 gap-1.5 pt-0.5">
              <button
                type="button"
                onClick={() => {
                  setIdentifier("admin");
                  setPassword("12345678");
                }}
                className="flex items-center justify-between rounded-md bg-white/90 border border-amber-200/90 px-2 py-1 text-[10.5px] font-semibold text-amber-950 hover:bg-amber-100 transition-colors shadow-2xs"
              >
                <span>Admin</span>
                <span className="font-mono text-[9.5px] text-amber-800">admin</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIdentifier("aarav6");
                  setPassword("12345678");
                }}
                className="flex items-center justify-between rounded-md bg-white/90 border border-amber-200/90 px-2 py-1 text-[10.5px] font-semibold text-amber-950 hover:bg-amber-100 transition-colors shadow-2xs"
              >
                <span>Aarav (6–10)</span>
                <span className="font-mono text-[9.5px] text-amber-800">aarav6</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIdentifier("aarav11");
                  setPassword("12345678");
                }}
                className="flex items-center justify-between rounded-md bg-white/90 border border-amber-200/90 px-2 py-1 text-[10.5px] font-semibold text-amber-950 hover:bg-amber-100 transition-colors shadow-2xs"
              >
                <span>Aarav (11–14)</span>
                <span className="font-mono text-[9.5px] text-amber-800">aarav11</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setIdentifier("aarav15");
                  setPassword("12345678");
                }}
                className="flex items-center justify-between rounded-md bg-white/90 border border-amber-200/90 px-2 py-1 text-[10.5px] font-semibold text-amber-950 hover:bg-amber-100 transition-colors shadow-2xs"
              >
                <span>Aarav (15–18)</span>
                <span className="font-mono text-[9.5px] text-amber-800">aarav15</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom 4 Feature Value Pillars */}
      <div className="relative z-10 border-t border-b border-slate-200/80 bg-white/95 backdrop-blur-md shrink-0">
        <div className="mx-auto grid max-w-[1400px] grid-cols-2 md:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-slate-200/80 py-2.5 px-4 sm:px-6">
          {/* 1. Quality Digital Education */}
          <div className="flex items-center justify-center gap-2.5 py-1 px-3 text-center">
            <div className="text-primary shrink-0">
              <BookOpen className="size-4 text-primary" />
            </div>
            <span className="text-xs font-semibold text-slate-800 tracking-tight">
              Quality Digital Education
            </span>
          </div>

          {/* 2. Skilled Workforce */}
          <div className="flex items-center justify-center gap-2.5 py-1 px-3 text-center">
            <div className="text-primary shrink-0">
              <Users className="size-4 text-primary" />
            </div>
            <span className="text-xs font-semibold text-slate-800 tracking-tight">
              Skilled Workforce
            </span>
          </div>

          {/* 3. Stronger Maharashtra */}
          <div className="flex items-center justify-center gap-2.5 py-1 px-3 text-center">
            <div className="text-primary shrink-0">
              <TrendingUp className="size-4 text-primary" />
            </div>
            <span className="text-xs font-semibold text-slate-800 tracking-tight">
              Stronger Maharashtra
            </span>
          </div>

          {/* 4. Brighter Tomorrow */}
          <div className="flex items-center justify-center gap-2.5 py-1 px-3 text-center">
            <div className="text-primary shrink-0">
              <Leaf className="size-4 text-primary" />
            </div>
            <span className="text-xs font-semibold text-slate-800 tracking-tight">
              Brighter Tomorrow
            </span>
          </div>
        </div>
      </div>

      {/* Footer matching modern government portal standards */}
      <footer className="relative z-10 bg-[#f8f6f2] border-t border-slate-200/70 px-4 py-3 sm:px-8 shrink-0">
        <div className="mx-auto flex max-w-[1500px] flex-col sm:flex-row items-center justify-between gap-2 text-[11px] text-[#675f54] font-medium">
          <div>
            © 2026 Maharashtra Building and Other Construction Workers Welfare Board | Government of Maharashtra
          </div>
          <div className="flex items-center gap-3 text-[#675f54]">
            <a href="#privacy" className="hover:text-primary transition-colors hover:underline">
              Privacy Policy
            </a>
            <span className="text-slate-300">|</span>
            <a href="#terms" className="hover:text-primary transition-colors hover:underline">
              Terms of Use
            </a>
            <span className="text-slate-300">|</span>
            <a href="#contact" className="hover:text-primary transition-colors hover:underline">
              Contact Us
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}