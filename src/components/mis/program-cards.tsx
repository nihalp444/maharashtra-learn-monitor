import { ArrowUpRight, Bot, ExternalLink, Microscope, Sigma } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PROGRAM_LINKS } from "@/config/program-links";
import { formatNumber, type LearningProgram } from "@/features/mis/mock-service";

const icons = { "ai-ml": Bot, neet: Microscope, jee: Sigma } as const;

interface ColorTheme {
  bgGradient: string;
  iconBg: string;
  iconText: string;
  badgeBg: string;
  badgeText: string;
  borderHover: string;
}

const defaultTheme: ColorTheme = {
  bgGradient: "from-blue-500/10 via-indigo-500/5 to-transparent",
  iconBg: "bg-blue-600",
  iconText: "text-white",
  badgeBg: "bg-blue-50",
  badgeText: "text-blue-700",
  borderHover: "hover:border-blue-300",
};

const colorThemes: Record<string, ColorTheme> = {
  "program-blue": defaultTheme,
  "program-green": {
    bgGradient: "from-emerald-500/10 via-teal-500/5 to-transparent",
    iconBg: "bg-emerald-600",
    iconText: "text-white",
    badgeBg: "bg-emerald-50",
    badgeText: "text-emerald-700",
    borderHover: "hover:border-emerald-300",
  },
  "program-amber": {
    bgGradient: "from-amber-500/10 via-orange-500/5 to-transparent",
    iconBg: "bg-amber-600",
    iconText: "text-white",
    badgeBg: "bg-amber-50",
    badgeText: "text-amber-700",
    borderHover: "hover:border-amber-300",
  },
};

export function ProgramCards({
  programs,
  detailed = false,
}: {
  programs: LearningProgram[];
  detailed?: boolean;
}) {
  return (
    <div className={`grid gap-4 ${detailed ? "xl:grid-cols-3" : "lg:grid-cols-3"}`}>
      {programs.map((program) => {
        const Icon = icons[program.id];
        const theme: ColorTheme = colorThemes[program.color] ?? defaultTheme;

        return (
          <article
            key={program.id}
            className={`group relative flex flex-col justify-between overflow-hidden rounded-xl border border-border bg-card shadow-mis transition-all duration-200 hover:-translate-y-1 hover:shadow-card-hover ${theme.borderHover}`}
          >
            {/* Header / Banner */}
            <div
              className={`relative flex items-center justify-between border-b border-border/60 bg-gradient-to-br ${theme.bgGradient} px-5 py-4`}
            >
              <div className="flex items-center gap-3">
                <div
                  className={`grid size-11 shrink-0 place-items-center rounded-xl ${theme.iconBg} ${theme.iconText} shadow-sm transition-transform duration-200 group-hover:scale-105`}
                >
                  <Icon className="size-5" />
                </div>
                <div>
                  <h3 className="font-bold text-foreground sm:text-base">
                    {program.name}
                  </h3>
                  <p className="text-xs text-muted-foreground">{program.fullName}</p>
                </div>
              </div>
              <span
                className={`rounded-full px-2.5 py-0.5 text-xs font-semibold ${theme.badgeBg} ${theme.badgeText}`}
              >
                {program.engagement}% Engaged
              </span>
            </div>

            {/* Body */}
            <div className="flex-1 p-5">
              {detailed && (
                <p className="mb-4 text-xs leading-relaxed text-muted-foreground">
                  {program.description}
                </p>
              )}

              <div className="grid grid-cols-2 gap-4 rounded-lg bg-slate-50/80 p-3.5 border border-slate-100">
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Enrolled Students
                  </p>
                  <p className="mt-1 text-sm font-bold text-foreground">
                    {formatNumber(program.enrolledStudents)}
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                    Active Learners
                  </p>
                  <p className="mt-1 text-sm font-bold text-foreground">
                    {formatNumber(program.activeStudents)}
                  </p>
                </div>
                {detailed && (
                  <>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Completion Rate
                      </p>
                      <p className="mt-1 text-sm font-bold text-foreground">
                        {program.completion}%
                      </p>
                    </div>
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
                        Learning Hours
                      </p>
                      <p className="mt-1 text-sm font-bold text-foreground">
                        {formatNumber(program.learningHours)}
                      </p>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Action Footer */}
            <div className="border-t border-border/80 bg-slate-50/40 p-4">
              <Button
                size="sm"
                variant="outline"
                asChild
                className="w-full justify-center gap-2 rounded-lg font-medium transition-all group-hover:border-primary/40 group-hover:bg-primary group-hover:text-primary-foreground"
              >
                <a
                  href={PROGRAM_LINKS[program.linkKey]}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <span>Explore on Klassroom</span>
                  <ExternalLink className="size-3.5" />
                </a>
              </Button>
            </div>
          </article>
        );
      })}
    </div>
  );
}
