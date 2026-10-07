import { createFileRoute, Link } from "@tanstack/react-router";
import {
  useEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  ArrowDown,
  ArrowRight,
  BookOpen,
  Brain,
  Building2,
  Calculator,
  Check,
  ClipboardCheck,
  Compass,
  Download,
  GraduationCap,
  KeyRound,
  Landmark,
  MessageSquare,
  PlayCircle,
  Scale,
  ShieldCheck,
  Sparkles,
  Stethoscope,
  Target,
  Trophy,
  Tv2,
  UserCheck,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import learningPhoto from "@/assests/bocw-learning-v1.jpg";

export const Route = createFileRoute("/home")({
  head: () => ({
    meta: [
      {
        title:
          "Maharashtra Digital Learning — MBOCWWB | Free Education for BOCW Worker Children",
      },
      {
        name: "description",
        content:
          "MBOCWWB provides free digital education from Class 1st to 12th — Foundational learning, conceptual STEM mastery, and NEET, JEE & AI/ML entrance coaching for children of registered construction workers across Maharashtra.",
      },
      {
        property: "og:title",
        content: "Maharashtra Digital Learning (Class 1st–12th) — MBOCWWB",
      },
      {
        property: "og:description",
        content:
          "Comprehensive free education from Class 1st to 12th for BOCW worker children across Maharashtra: Foundation, conceptual mastery, and competitive entrance coaching.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: PublicHome,
});

// ─── Static Data ──────────────────────────────────────────────────────────────

const IMPACT_STATS = [
  { value: 6_700_000, suffix: "+", label: "Registered BOCW Workers", icon: Users },
  { value: 124_580, suffix: "", label: "Students Enrolled", icon: GraduationCap },
  { value: 384_210, suffix: "", label: "Learning Hours Logged", icon: BookOpen },
  { value: 36, suffix: " of 36", label: "Districts Covered", icon: Building2 },
] as const;

const POLICIES = [
  {
    icon: BookOpen,
    title: "National Education Policy (NEP) 2020",
    tag: "Central Government",
    tagClass: "text-blue bg-blue-soft",
    point: "Equity & Inclusion Mandate",
    text: "NEP 2020 mandates equitable and inclusive education for all sections of society. This platform delivers standardised digital learning to the most economically vulnerable — children of unorganised sector construction workers across Maharashtra.",
  },
  {
    icon: Scale,
    title: "BOCW Act 1996 — Education Welfare",
    tag: "Legal Mandate",
    tagClass: "text-amber bg-amber-soft",
    point: "Education Welfare Mandate",
    text: "The Building & Other Construction Workers (BOCW) welfare framework supports educational assistance for the children of registered construction workers. This initiative proposes a digital pathway to fulfil that welfare objective at scale.",
  },
  {
    icon: Tv2,
    title: "PM eVidya & DIKSHA",
    tag: "Central Scheme",
    tagClass: "text-green bg-green-soft",
    point: "Digital India Vision",
    text: "India's PM eVidya initiative promotes digital learning for all. This platform operates in the same spirit — providing structured, curriculum-aligned pre-recorded video content for competitive exam preparation at absolutely zero cost.",
  },
  {
    icon: Landmark,
    title: "Maharashtra State Education Mission",
    tag: "State Government",
    tagClass: "text-primary bg-primary-soft",
    point: "Equal Opportunity",
    text: "Maharashtra's state education mission emphasises skill-ready, exam-prepared youth from all socioeconomic backgrounds. NEET and JEE preparation — historically accessible only to affluent families — is now proposed for every BOCW worker's child across all 36 districts.",
  },
] as const;

const PROGRAMS = [
  {
    icon: Sparkles,
    stage: "STAGE 01",
    classes: "Class 1st to 5th",
    title: "Foundational Learning & Numeracy",
    badge: "Foundation Stage",
    toneClass: "text-amber-600",
    bgClass: "bg-amber-500/10",
    stripeClass: "bg-amber-500",
    classBadgeClass: "bg-amber-100 text-amber-900 border-amber-300 font-extrabold ring-1 ring-amber-400/30",
    pillar: "Language, Numbers & Inquiry",
    enrolled: "38,200",
    engagement: "84%",
    videos: "450+",
    curriculum: [
      "Early Reading, Phonics & Marathi/English Comprehension",
      "Foundational Arithmetic & Computational Logic",
      "Environmental Awareness, Curiosity & Civic Habits",
    ],
    description:
      "Aligned with NIPUN Bharat and early-grade NEP recommendations. Builds lifelong reading comprehension, basic mathematics fluency, and joy for learning among workers' youngest children before learning gaps develop.",
  },
  {
    icon: Compass,
    stage: "STAGE 02",
    classes: "Class 6th to 9th",
    title: "Conceptual & Practical Understanding",
    badge: "Preparatory & Middle",
    toneClass: "text-blue-600",
    bgClass: "bg-blue-500/10",
    stripeClass: "bg-blue-600",
    classBadgeClass: "bg-blue-100 text-blue-900 border-blue-300 font-extrabold ring-1 ring-blue-400/30",
    pillar: "Applied Science, STEM & Analytics",
    enrolled: "45,600",
    engagement: "81%",
    videos: "720+",
    curriculum: [
      "Concept-First Science: Physics, Chemistry & Biology Principles",
      "Rigorous Pre-Algebra, Geometry & Multi-Step Problem Solving",
      "Digital Literacy, Logic Building & Practical Computer Skills",
    ],
    description:
      "Transitions learners from rote memorisation to deep conceptual reasoning and experiential STEM inquiry. Strengthens academic foundations so students enter secondary school fully prepared for competitive curricula.",
  },
  {
    icon: Trophy,
    stage: "STAGE 03",
    classes: "Class 10th to 12th",
    title: "Competitive Entrance & Future Skills",
    badge: "Secondary & Career Stream",
    toneClass: "text-emerald-700",
    bgClass: "bg-emerald-500/10",
    stripeClass: "bg-emerald-600",
    classBadgeClass: "bg-emerald-100 text-emerald-950 border-emerald-300 font-extrabold ring-1 ring-emerald-500/30",
    pillar: "NEET · JEE · AI/ML Career Readiness",
    enrolled: "40,780",
    engagement: "78%",
    videos: "840+",
    curriculum: [
      "Complete NEET Medical Entrance Coverage (Bio, Chem, Phy)",
      "Rigorous JEE Engineering Coaching (Calculus, Mechanics, Chem)",
      "Applied AI & Machine Learning with Python Fundamentals",
    ],
    description:
      "Democratises high-stakes competitive entrance coaching historically restricted to expensive private coaching institutes. Equips workers' children to compete nationally for top medical, engineering, and tech seats.",
  },
] as const;

const JOURNEY_STEPS = [
  {
    icon: UserCheck,
    title: "BOCW Worker Registers",
    text: "Parent registers with the BOCW board. The child's learning profile is automatically created.",
  },
  {
    icon: KeyRound,
    title: "Child Gets Free Access",
    text: "Student receives login credentials. Platform accessible on mobile, tablet, or computer.",
  },
  {
    icon: PlayCircle,
    title: "Watches Video Lectures",
    text: "Chapter-wise HD video lectures by expert faculty. Available anytime, offline-ready.",
  },
  {
    icon: ClipboardCheck,
    title: "Takes Tests & Mocks",
    text: "MCQ-based chapter tests and full-length mock exams with instant results and analysis.",
  },
  {
    icon: MessageSquare,
    title: "AI Tutor Resolves Doubts",
    text: "Subject-specific doubt resolution in Marathi, Hindi or English — powered by AI.",
  },
  {
    icon: Trophy,
    title: "Scholarship & Exam Ready",
    text: "Top performers flagged for BOCW scholarships. Student appears for NEET/JEE fully prepared.",
  },
] as const;

const DISTRICTS: [string, number][] = [
  ["Mumbai", 78],
  ["Pune", 74],
  ["Nagpur", 71],
  ["Nashik", 64],
  ["Aurangabad", 58],
  ["Nandurbar", 47],
  ["Gadchiroli", 43],
  ["Washim", 44],
];

const SMS_MESSAGES = [
  {
    text: "📚 MBOCWWB शिक्षण अहवाल\n\nप्रिय पालक,\nआपल्या मुलाने या आठवड्यात\n4 तास अभ्यास केला.\n\nNEET Mock Test: 78/180 🎯\n\n— महाराष्ट्र शासन",
    time: "Today, 08:15 AM",
  },
  {
    text: "🏆 अभिनंदन!\nआपल्या मुलाने 7-Day Streak\nपूर्ण केली.\nTop 20% in Pune District 📊",
    time: "Yesterday, 10:30 AM",
  },
  {
    text: "💰 शिष्यवृत्ती अपडेट:\nआपला मुलगा/मुलगी BOCW\nशिष्यवृत्तीसाठी पात्र आहे!\nअर्ज करण्यासाठी लॉगिन करा.",
    time: "Mon, 09:00 AM",
  },
] as const;

// ─── Helpers ──────────────────────────────────────────────────────────────────

function formatNumber(n: number): string {
  return n.toLocaleString("en-IN");
}

function scrollSmooth(id: string) {
  const el = document.getElementById(id);
  const behavior =
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? ("auto" as const)
      : ("smooth" as const);
  el?.scrollIntoView({ behavior });
}

// ─── useCountUp hook ──────────────────────────────────────────────────────────

function useCountUp(target: number, active: boolean): number {
  const [count, setCount] = useState(target);

  useEffect(() => {
    if (
      !active ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      return;
    }
    const started = performance.now();
    const DURATION = 1800;
    let raf: number;
    const tick = (now: number) => {
      const progress = Math.min((now - started) / DURATION, 1);
      const eased = 1 - Math.pow(1 - progress, 3); // ease-out cubic
      setCount(Math.floor(target * eased));
      if (progress < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [target, active]);

  return count;
}

// ─── Sub-components ───────────────────────────────────────────────────────────

function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <p className="mb-3 text-[11px] font-bold uppercase tracking-widest text-primary">
      {children}
    </p>
  );
}

function SectionHeading({
  label,
  title,
  subtitle,
}: {
  label: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="mx-auto mb-10 max-w-3xl text-center">
      <SectionLabel>{label}</SectionLabel>
      <h2 className="font-display text-2xl font-extrabold leading-tight text-foreground sm:text-3xl">
        {title}
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-sm leading-7 text-muted-foreground">
        {subtitle}
      </p>
    </div>
  );
}

function ImpactCounter({
  value,
  suffix,
  label,
  active,
  isLast,
}: {
  value: number;
  suffix: string;
  label: string;
  active: boolean;
  isLast: boolean;
}) {
  const count = useCountUp(value, active);
  return (
    <div
      className={`min-w-0 px-6 py-3 text-center ${!isLast ? "sm:border-r sm:border-white/10" : ""}`}
    >
      <div className="font-display text-3xl font-extrabold tabular-nums text-white lg:text-4xl">
        {formatNumber(count)}
        {suffix}
      </div>
      <div className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-white/55">
        {label}
      </div>
    </div>
  );
}

function EngagementBadge({ value }: { value: number }) {
  if (value >= 70)
    return (
      <span className="rounded px-2 py-0.5 text-[10px] font-semibold bg-green-soft text-green">
        High
      </span>
    );
  if (value >= 50)
    return (
      <span className="rounded px-2 py-0.5 text-[10px] font-semibold bg-amber-soft text-amber">
        Medium
      </span>
    );
  return (
    <span className="rounded px-2 py-0.5 text-[10px] font-semibold bg-red-soft text-red">
      Needs Attention
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

function PublicHome() {
  const counterStripRef = useRef<HTMLElement>(null);
  const [counterActive, setCounterActive] = useState(false);

  useEffect(() => {
    const el = counterStripRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry?.isIntersecting) {
          setCounterActive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.25 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page text-foreground">

      {/* ── HERO ──────────────────────────────────────────────────── */}
      <section
        className="relative border-b border-border bg-card"
        aria-labelledby="hero-heading"
      >
        <div className="mx-auto max-w-[1600px] px-5 py-10 sm:px-8 lg:py-16">
          <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-12">
            {/* Left Content Column */}
            <div className="lg:col-span-6 xl:col-span-6">
              <p className="mb-4 flex items-center gap-2 text-xs font-bold text-primary">
                <Landmark className="size-4 shrink-0" />
                Government of Maharashtra Initiative
              </p>

              <h1
                id="hero-heading"
                className="font-display text-3xl font-extrabold leading-tight text-foreground sm:text-4xl lg:text-[2.6rem]"
              >
                Digital Education for Children of Maharashtra's Construction Workers
              </h1>

              <p className="mt-4 text-sm leading-relaxed text-muted-foreground sm:text-base">
                MBOCWWB delivers a complete, zero-cost digital education continuum for
                children of registered construction workers — building strong early
                foundations (Class 1st–5th), conceptual &amp; practical subject mastery
                (Class 6th–9th), and competitive entrance excellence for NEET, JEE &amp; AI/ML
                (Class 10th–12th).
              </p>

              <div className="mt-5 flex flex-wrap gap-x-6 gap-y-2 text-xs font-semibold text-foreground">
                {["100% Free for BOCW Worker Families", "Covers All 36 Districts of Maharashtra"].map(
                  (badge) => (
                    <span key={badge} className="flex items-center gap-2">
                      <Check className="size-4 text-green" />
                      {badge}
                    </span>
                  ),
                )}
              </div>

              <div className="mt-7 flex flex-wrap gap-3">
                <Button asChild className="h-11 px-6 font-semibold">
                  <Link to="/auth">
                    Enter MIS Dashboard
                    <ArrowRight className="size-4" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="h-11 border-primary px-6 text-primary hover:bg-primary/5 hover:text-primary font-semibold"
                  onClick={() => scrollSmooth("programs")}
                >
                  Learn About the Program
                  <ArrowDown className="size-4" />
                </Button>
              </div>

              <p className="mt-4 text-[11px] text-muted-foreground font-medium">
                Digital Learning MIS · Programme proposal &amp; demonstration
              </p>
            </div>

            {/* Right Photo Column */}
            <div className="lg:col-span-6 xl:col-span-6">
              <div className="relative overflow-hidden rounded-2xl border border-border shadow-mis-raised bg-muted/20">
                <img
                  src={learningPhoto}
                  alt="Students studying with digital learning tablets in classroom with teacher guidance"
                  className="w-full h-[320px] sm:h-[400px] lg:h-[460px] object-cover object-center transition-transform duration-500 hover:scale-[1.01]"
                  loading="eager"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent p-4 sm:p-5 text-white">
                  <p className="text-xs font-semibold text-white/90">
                    BOCWWB Smart Digital Learning Cohort
                  </p>
                  <p className="text-[11px] text-white/75 mt-0.5">
                    Tablet-assisted classroom learning for workers' children across Maharashtra
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PROGRAM AT A GLANCE BAR ───────────────────────────────── */}
      <section className="border-b border-border bg-card px-5 py-5 sm:px-8">
        <div className="mx-auto flex max-w-[1536px] flex-wrap items-center gap-x-8 gap-y-5">
          <h2 className="shrink-0 text-[10px] font-bold uppercase tracking-widest text-primary">
            Program at a Glance
          </h2>
          <div className="grid flex-1 grid-cols-2 gap-5 md:grid-cols-4">
            {IMPACT_STATS.map((stat) => {
              const Icon = stat.icon;
              return (
                <div key={stat.label} className="flex items-start gap-3">
                  <Icon className="mt-0.5 size-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-lg font-extrabold text-foreground">
                      {formatNumber(stat.value)}
                      {stat.suffix}
                    </p>
                    <p className="text-[11px] text-muted-foreground">{stat.label}</p>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="border-l-2 border-primary pl-5">
            <p className="flex items-center gap-2 text-lg font-bold text-green">
              <ShieldCheck className="size-5" />
              ₹0 cost to students
            </p>
            <p className="text-[10px] text-muted-foreground">
              Fully funded by Maharashtra Government
            </p>
          </div>
        </div>
      </section>

      {/* ── ANIMATED IMPACT COUNTERS ──────────────────────────────── */}
      <section
        ref={counterStripRef}
        className="bg-government-bar py-10 text-government-bar-foreground"
        aria-label="Programme impact numbers"
      >
        <div className="mx-auto grid max-w-[1440px] grid-cols-2 sm:grid-cols-5">
          {IMPACT_STATS.map((stat, i) => (
            <ImpactCounter
              key={stat.label}
              value={stat.value}
              suffix={stat.suffix}
              label={stat.label}
              active={counterActive}
              isLast={i === IMPACT_STATS.length - 1}
            />
          ))}
          {/* ₹0 — static amber highlight */}
          <div className="col-span-2 px-6 py-3 text-center sm:col-span-1">
            <p className="font-display text-4xl font-extrabold text-warning">₹0</p>
            <p className="mt-2 text-[10px] font-semibold uppercase tracking-widest text-white/55">
              Cost to Students
            </p>
            <p className="mt-1 text-xs font-semibold text-warning">Govt. Funded</p>
          </div>
        </div>
      </section>

      {/* ── GOVERNMENT POLICY ALIGNMENT ───────────────────────────── */}
      <section
        id="policy"
        className="home-section bg-card px-5 py-14 sm:px-8"
        aria-labelledby="policy-heading"
      >
        <div className="mx-auto max-w-[1200px]">
          <SectionHeading
            label="Policy Alignment"
            title="Aligned with Maharashtra & Central Government Vision"
            subtitle="This initiative directly supports the education and inclusion objectives of national and state-level policy frameworks."
          />

          <div className="grid gap-5 md:grid-cols-2">
            {POLICIES.map((policy) => {
              const Icon = policy.icon;
              return (
                <article
                  key={policy.title}
                  className="rounded-xl border border-border bg-card p-6 shadow-mis transition-shadow hover:shadow-mis-raised"
                >
                  <div className="flex items-center gap-3">
                    <div className="flex size-9 shrink-0 items-center justify-center rounded-lg bg-primary-soft">
                      <Icon className="size-5 text-primary" />
                    </div>
                    <span className={`rounded-full px-2.5 py-0.5 text-[10px] font-bold ${policy.tagClass}`}>
                      {policy.tag}
                    </span>
                  </div>
                  <h3 className="mt-4 text-base font-bold text-foreground">{policy.title}</h3>
                  <p className="mt-3 text-sm leading-7 text-muted-foreground">{policy.text}</p>
                  <p className="mt-4 border-t border-border pt-3 text-xs font-semibold text-primary">
                    ↗ {policy.point}
                  </p>
                </article>
              );
            })}
          </div>

          <blockquote className="mt-7 flex gap-4 rounded-xl border border-primary/15 bg-primary-soft p-6 text-sm leading-7 text-foreground">
            <Target className="mt-0.5 size-6 shrink-0 text-primary" />
            <p>
              <strong>This is not just an education platform.</strong> It is a welfare
              commitment being fulfilled digitally — ensuring that Maharashtra's construction
              workers' families receive the educational upliftment they are entitled to and deserve.
            </p>
          </blockquote>
        </div>
      </section>

      {/* ── LEARNING PROGRAMS ─────────────────────────────────────── */}
      <section
        id="programs"
        className="home-section px-5 py-14 sm:px-8"
        aria-labelledby="programs-heading"
      >
        <div className="mx-auto max-w-[1300px]">
          <SectionHeading
            label="Curriculum Continuum · Class 1st to 12th"
            title="From Early Foundations to National Entrance Success"
            subtitle="A structured 3-stage educational pathway ensuring no child of a construction worker is left behind — from foundational literacy to engineering and medical careers."
          />

          <div className="grid gap-6 lg:grid-cols-3">
            {PROGRAMS.map((program) => {
              const Icon = program.icon;
              return (
                <article
                  key={program.title}
                  className="flex flex-col overflow-hidden rounded-xl border border-border bg-card shadow-mis transition-all hover:shadow-mis-raised"
                >
                  <div className={`h-2 ${program.stripeClass}`} />
                  <div className="flex flex-1 flex-col p-5 sm:p-6">
                    {/* Header: Stage + Grade Cohort */}
                    <div className="flex items-center justify-between gap-2.5">
                      <div className="flex items-center gap-2.5">
                        <div
                          className={`flex size-9 items-center justify-center rounded-lg ${program.bgClass} ${program.toneClass}`}
                        >
                          <Icon className="size-4.5" />
                        </div>
                        <div>
                          <span className={`text-[10px] font-black uppercase tracking-wider ${program.toneClass}`}>
                            {program.stage}
                          </span>
                          <p className="text-[11px] font-semibold text-muted-foreground leading-tight">
                            {program.badge}
                          </p>
                        </div>
                      </div>
                      <span
                        className={`rounded-full border px-3 py-0.5 text-[11px] font-black shadow-2xs tracking-tight ${program.classBadgeClass}`}
                      >
                        {program.classes}
                      </span>
                    </div>

                    <h3 className="mt-3.5 font-display text-lg font-bold text-foreground leading-snug">
                      {program.title}
                    </h3>
                    <div className="mt-1 flex items-center">
                      <span className="inline-flex items-center rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-bold tracking-tight text-primary">
                        {program.pillar}
                      </span>
                    </div>

                    <p className="mt-2.5 text-xs leading-5 text-muted-foreground">
                      {program.description}
                    </p>

                    {/* Key Curriculum Focus Areas */}
                    <div className="my-4 rounded-lg border border-border/70 bg-muted/30 p-3 sm:p-3.5">
                      <p className="text-[10px] font-bold uppercase tracking-wider text-foreground">
                        Key Curriculum Focus
                      </p>
                      <ul className="mt-2 space-y-1.5">
                        {program.curriculum.map((item) => (
                          <li key={item} className="flex items-start gap-1.5 text-[11.5px] text-muted-foreground leading-normal">
                            <Check className="mt-0.5 size-3.5 shrink-0 text-green" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-auto grid grid-cols-3 gap-1 border-t border-border pt-3.5 text-center">
                      {(
                        [
                          [program.enrolled, "Enrolled"],
                          [program.engagement, "Engagement"],
                          [program.videos, "Video Lectures"],
                        ] as [string, string][]
                      ).map(([value, label]) => (
                        <div key={label}>
                          <p className="text-sm sm:text-base font-black text-foreground">{value}</p>
                          <p className="mt-0.5 text-[10px] text-muted-foreground font-medium">{label}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── STUDENT JOURNEY ───────────────────────────────────────── */}
      <section className="bg-card px-5 py-14 sm:px-8" aria-labelledby="journey-heading">
        <div className="mx-auto max-w-[1400px]">
          <SectionHeading
            label="Student Journey"
            title="From a Worker's Home to an Exam Hall"
            subtitle="See how a construction worker's child goes from registration to full exam readiness on this platform."
          />
          <ol className="grid gap-8 sm:grid-cols-2 lg:grid-cols-6">
            {JOURNEY_STEPS.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.title} className="relative border-t-2 border-dashed border-border pt-6">
                  <div className="relative mb-4 inline-flex size-12 items-center justify-center rounded-full bg-primary-soft text-primary">
                    <Icon className="size-6" />
                    <span className="absolute -right-1.5 -top-1.5 flex size-5 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-white">
                      {index + 1}
                    </span>
                  </div>
                  <h3 className="text-sm font-bold text-foreground">{step.title}</h3>
                  <p className="mt-2 text-xs leading-6 text-muted-foreground">{step.text}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* ── PARENT SMS MOCKUP ─────────────────────────────────────── */}
      <section className="px-5 py-10 sm:px-8" aria-labelledby="parent-heading">
        <div className="mx-auto grid max-w-[1000px] items-center gap-8 md:grid-cols-2">
          {/* Text content */}
          <div>
            <SectionLabel>Parent Engagement</SectionLabel>
            <h2 id="parent-heading" className="font-display text-2xl font-extrabold text-foreground sm:text-3xl">
              Parents Are Never Left Behind
            </h2>
            <p className="mt-3 text-xs leading-6 text-muted-foreground sm:text-sm">
              The proposed parent engagement service delivers regular SMS/WhatsApp updates in
              Marathi about their child's learning progress — directly on their mobile phone.
              No app download required.
            </p>
            <ul className="my-4 space-y-2">
              {[
                "Weekly progress summary in Marathi",
                "Mock test scores and attendance alerts",
                "Scholarship eligibility notifications",
              ].map((point) => (
                <li key={point} className="flex items-center gap-2.5 text-xs font-medium text-foreground sm:text-sm">
                  <Check className="size-4 shrink-0 text-green" />
                  {point}
                </li>
              ))}
            </ul>
            <blockquote className="rounded-r-lg border-l-3 border-amber bg-amber-soft p-3.5 text-xs italic leading-6 text-foreground/80 sm:text-sm">
              "We built this for parents who may not own a laptop or understand English — the
              worker who builds our cities deserves to know their child is being taken care of."
            </blockquote>
          </div>

          {/* Phone mockup */}
          <div className="mx-auto w-full max-w-[260px]">
            <div className="overflow-hidden rounded-[1.75rem] border-3 border-foreground bg-card shadow-mis-raised">
              <div className="flex justify-center bg-foreground py-1.5">
                <div className="h-1 w-10 rounded-full bg-white/30" />
              </div>
              <div className="flex items-center gap-2 border-b border-border bg-card px-3.5 py-2.5">
                <div className="flex size-7.5 shrink-0 items-center justify-center rounded-full bg-green-soft">
                  <MessageSquare className="size-3.5 text-green" />
                </div>
                <div>
                  <p className="flex items-center gap-1 text-xs font-bold text-foreground">
                    MBOCWWB Gov
                    <ShieldCheck className="size-3 text-green" />
                  </p>
                  <p className="text-[8.5px] text-muted-foreground">Official Government Channel</p>
                </div>
              </div>
              <div className="space-y-2 bg-green-soft/40 p-2.5">
                {SMS_MESSAGES.map((msg) => (
                  <div key={msg.time} className="rounded-md border border-green/15 bg-card p-2.5 shadow-xs">
                    <p className="whitespace-pre-line font-sans text-[10px] leading-[1.55]">
                      {msg.text}
                    </p>
                    <p className="mt-1.5 text-right text-[8.5px] text-muted-foreground">{msg.time}</p>
                  </div>
                ))}
              </div>
              <p className="bg-card px-2.5 pb-2 pt-1 text-center text-[8.5px] text-muted-foreground">
                Illustrative parent notification
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── DISTRICT COVERAGE ─────────────────────────────────────── */}
      <section className="bg-card px-5 py-14 sm:px-8" aria-labelledby="district-heading">
        <div className="mx-auto grid max-w-[1200px] items-center gap-10 md:grid-cols-2">
          <div>
            <Building2 className="mb-4 size-8 text-primary" />
            <h2 id="district-heading" className="font-display text-3xl font-extrabold text-foreground">
              Covering All 36 Districts of Maharashtra
            </h2>
            <p className="mt-4 text-sm leading-7 text-muted-foreground">
              From Mumbai to Gadchiroli — every district is part of this mission. The MIS
              brings district engagement and student performance data together for informed
              government decisions.
            </p>
            <div className="mt-6 space-y-2.5 text-xs text-foreground">
              {(
                [
                  ["bg-green", "High Engagement (≥70%)"],
                  ["bg-amber", "Medium Engagement (50%–70%)"],
                  ["bg-red", "Low Engagement (<50%) — special intervention"],
                ] as [string, string][]
              ).map(([dot, label]) => (
                <p key={label} className="flex items-center gap-2">
                  <span className={`size-2.5 shrink-0 rounded-full ${dot}`} />
                  {label}
                </p>
              ))}
            </div>
            <div className="mt-6 rounded-r-xl border-l-4 border-amber bg-amber-soft p-4">
              <p className="text-sm font-semibold text-foreground">
                6 districts currently flagged for special engagement intervention in this proposal.
              </p>
            </div>
          </div>

          <div className="overflow-hidden rounded-xl border border-border shadow-mis">
            <table className="w-full text-left text-sm">
              <caption className="bg-table-head px-5 py-3 text-left text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                District engagement · Demonstration data
              </caption>
              <thead className="border-y border-border bg-table-head text-[11px] text-muted-foreground">
                <tr>
                  <th className="px-5 py-3 font-semibold">District</th>
                  <th className="px-3 py-3 font-semibold">Engagement</th>
                  <th className="px-3 py-3 font-semibold">Status</th>
                </tr>
              </thead>
              <tbody>
                {DISTRICTS.map(([name, value]) => (
                  <tr key={name} className="border-b border-border last:border-0">
                    <td className="px-5 py-3 font-medium text-foreground">{name}</td>
                    <td className="px-3 py-3 tabular-nums text-muted-foreground">{value}%</td>
                    <td className="px-3 py-3">
                      <EngagementBadge value={value} />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="bg-card px-4 py-2">
              <Button asChild variant="link" className="px-0 text-xs text-primary">
                <Link to="/auth">
                  View Full District Analytics
                  <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ─────────────────────────────────────────────── */}
      <section
        className="home-final px-5 py-16 text-center text-white"
        aria-labelledby="cta-heading"
      >
        <h2 id="cta-heading" className="font-display text-3xl font-extrabold text-white sm:text-4xl">
          Ready to Monitor. Ready to Empower.
        </h2>
        <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-white/75">
          Access the MIS dashboard to track district-wise engagement, monitor student performance,
          and generate detailed reports for board review.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button
            asChild
            className="h-11 bg-white px-7 font-bold text-primary shadow-lg hover:bg-white/90 hover:text-primary"
          >
            <Link to="/auth">
              Enter MIS Dashboard
              <ArrowRight className="size-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            className="h-11 border-white/40 bg-transparent px-7 text-white hover:bg-white/10 hover:text-white"
          >
            <a href="/mbocwwb-digital-learning-proposal.pdf" download>
              <Download className="size-4" />
              Download Proposal PDF
            </a>
          </Button>
        </div>
        <div className="mt-8 flex flex-wrap justify-center gap-8 text-[11px] text-white/60">
          <span className="flex items-center gap-1.5">
            <ShieldCheck className="size-3.5" />
            Secure Government Portal
          </span>
          <span className="flex items-center gap-1.5">
            <ClipboardCheck className="size-3.5" />
            Programme Proposal &amp; Demonstration
          </span>
          <span className="flex items-center gap-1.5">
            <Landmark className="size-3.5" />
            Govt. of Maharashtra
          </span>
        </div>
      </section>

    </div>
  );
}

