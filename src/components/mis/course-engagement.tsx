import { formatNumber, type LearningProgram } from "@/features/mis/mock-service";

interface ProgramColorStyle {
  bar: string;
  text: string;
}

const defaultProgramColor: ProgramColorStyle = {
  bar: "bg-blue-600",
  text: "text-blue-700",
};

const programColors: Record<string, ProgramColorStyle> = {
  "program-blue": defaultProgramColor,
  "program-green": { bar: "bg-emerald-600", text: "text-emerald-700" },
  "program-amber": { bar: "bg-amber-600", text: "text-amber-700" },
};

export function CourseEngagement({ programs }: { programs: LearningProgram[] }) {
  return (
    <div className="flex h-full flex-col justify-between gap-3.5">
      {programs.map((program) => {
        const colors: ProgramColorStyle =
          programColors[program.color] ?? defaultProgramColor;

        return (
          <div
            key={program.id}
            className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 transition-all hover:border-slate-200 hover:bg-slate-50 shadow-2xs"
          >
            <div className="mb-2.5 flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-slate-900">{program.name}</p>
                <div className="mt-0.5 flex items-center gap-3 text-[11px] text-slate-500">
                  <span>{formatNumber(program.enrolledStudents)} enrolled</span>
                  <span>•</span>
                  <span className="font-medium text-slate-700">{formatNumber(program.activeStudents)} active</span>
                </div>
              </div>
              <div className="text-right">
                <span className={`text-base font-extrabold ${colors.text}`}>
                  {program.engagement}%
                </span>
                <p className="text-[10px] font-medium text-slate-400">engagement rate</p>
              </div>
            </div>

            {/* Dual indicator progress bar: engagement & completion */}
            <div className="relative h-2 w-full overflow-hidden rounded-full bg-slate-200/80">
              <div
                className={`h-full rounded-full ${colors.bar} transition-all duration-500`}
                style={{ width: `${program.engagement}%` }}
              />
            </div>

            <div className="mt-2 flex items-center justify-between text-[10px] font-semibold text-slate-500">
              <span>Avg. Learning Hours: {formatNumber(program.learningHours)} hrs</span>
              <span className="text-slate-600">Completion: {program.completion}%</span>
            </div>
          </div>
        );
      })}
    </div>
  );
}
