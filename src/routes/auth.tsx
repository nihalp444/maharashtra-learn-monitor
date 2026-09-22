import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { Eye, EyeOff, KeyRound, LockKeyhole, Phone, ShieldCheck, UserRound } from "lucide-react";
import { type FormEvent, useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { LoginHeader } from "@/components/mis/login-header";
import { supabase } from "@/integrations/supabase/client";
import { identifierToEmail } from "@/lib/auth-identifier";

export const Route = createFileRoute("/auth")({
  head: () => ({ meta: [
    { title: "Admin Login | MBOCWWB Digital Learning MIS" },
    { name: "description", content: "Secure administrative login for the MBOCWWB Digital Learning MIS." },
    { property: "og:title", content: "Admin Login | MBOCWWB Digital Learning MIS" },
    { property: "og:description", content: "Secure access to the MBOCWWB Digital Learning MIS." },
    { property: "og:type", content: "website" },
    { name: "twitter:card", content: "summary_large_image" },
  ] }),
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

  useEffect(() => { void supabase.auth.getUser().then(({ data }) => { if (data.user) void navigate({ to: "/dashboard", replace: true }); }); }, [navigate]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setErrorMessage("");
    if (!identifier.trim() || password.length < 6) { setErrorMessage("Enter a valid username or mobile number and password."); return; }
    setSubmitting(true);
    const { error } = await supabase.auth.signInWithPassword({ email: identifierToEmail(identifier), password });
    setSubmitting(false);
    if (error) { setErrorMessage("The username/mobile number or password is incorrect."); return; }
    if (!remember) sessionStorage.setItem("mbocwwb-session-only", "true");
    await navigate({ to: "/dashboard", replace: true });
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <LoginHeader />
      <main className="flex flex-1 items-center justify-center px-4 py-8 sm:py-12">
        <div className="grid w-full max-w-5xl overflow-hidden rounded-lg border border-border bg-card shadow-mis-raised lg:grid-cols-[1.05fr_0.95fr]">
          <section className="relative hidden bg-primary px-10 py-12 text-primary-foreground lg:flex lg:flex-col lg:justify-between">
            <div>
              <div className="mb-8 grid size-14 place-items-center rounded-md border border-primary-foreground/30 bg-primary-foreground/10"><ShieldCheck className="size-7" /></div>
              <p className="text-xs font-bold uppercase text-primary-foreground/75">Official Administrative Portal</p>
              <h2 className="mt-3 text-3xl font-extrabold leading-tight">Digital Learning MIS</h2>
              <p className="mt-4 max-w-md text-sm leading-6 text-primary-foreground/85">Student Learning &amp; Engagement Monitoring Dashboard for statewide programme oversight.</p>
            </div>
            <div className="border-t border-primary-foreground/25 pt-6">
              <p className="text-sm font-semibold">Empowering Students for a Brighter Maharashtra</p>
              <p className="mt-2 text-xs leading-5 text-primary-foreground/70">Access is restricted to authorised MBOCWWB officials and designated administrators.</p>
            </div>
          </section>
          <section className="px-5 py-7 sm:px-10 sm:py-10">
            <div className="mx-auto max-w-sm">
              <div className="mb-7 flex items-start gap-3">
                <div className="grid size-10 shrink-0 place-items-center rounded-md bg-primary-soft text-primary"><LockKeyhole className="size-5" /></div>
                <div><h2 className="text-xl font-extrabold text-foreground">Administrator Login</h2><p className="mt-1 text-xs text-muted-foreground">Sign in with your registered username or mobile number.</p></div>
              </div>
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2"><Label htmlFor="identifier">Username / Mobile Number</Label><div className="relative"><UserRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="identifier" autoComplete="username" value={identifier} onChange={(event) => setIdentifier(event.target.value)} className="h-11 pl-10" placeholder="Enter username or mobile number" /></div></div>
                <div className="space-y-2"><Label htmlFor="password">Password</Label><div className="relative"><KeyRound className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" /><Input id="password" type={showPassword ? "text" : "password"} autoComplete="current-password" value={password} onChange={(event) => setPassword(event.target.value)} className="h-11 px-10" placeholder="Enter password" /><Button type="button" variant="ghost" size="icon" className="absolute right-0 top-0 h-11 w-10 text-muted-foreground" onClick={() => setShowPassword((current) => !current)} aria-label={showPassword ? "Hide password" : "Show password"}>{showPassword ? <EyeOff className="size-4" /> : <Eye className="size-4" />}</Button></div></div>
                <div className="flex items-center justify-between gap-4"><div className="flex items-center gap-2"><Checkbox id="remember" checked={remember} onCheckedChange={(value) => setRemember(value === true)} /><Label htmlFor="remember" className="text-xs font-medium">Remember me</Label></div><span className="text-xs font-semibold text-primary">Contact system administrator</span></div>
                {errorMessage && <p role="alert" className="border-l-2 border-destructive bg-destructive-soft px-3 py-2 text-xs font-medium text-destructive">{errorMessage}</p>}
                <Button type="submit" className="h-11 w-full font-bold" disabled={submitting}>{submitting ? "Verifying access…" : "Login to MIS"}</Button>
              </form>
              <div className="mt-7 flex items-start gap-2 border-t border-border pt-5 text-[11px] leading-5 text-muted-foreground"><Phone className="mt-0.5 size-3.5 shrink-0" /><p>For login assistance, contact your designated MBOCWWB system administrator.</p></div>
            </div>
          </section>
        </div>
      </main>
      <footer className="border-t border-border bg-card px-4 py-4 text-center text-[11px] text-muted-foreground">© 2026 Maharashtra Building and Other Construction Workers Welfare Board. All rights reserved.</footer>
    </div>
  );
}