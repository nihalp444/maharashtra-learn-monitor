import {
  Award,
  ChevronRight,
  Crown,
  Download,
  Flame,
  Globe,
  GraduationCap,
  HelpCircle,
  Lock,
  MapPin,
  Medal,
  Search,
  Sparkles,
  TrendingDown,
  TrendingUp,
  Trophy,
  UserCheck,
} from "lucide-react";
import { useEffect, useMemo, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { StudentProfile } from "@/features/student/student-data";
import { leadershipService } from "@/features/leadership/leadership-service";
import type {
  LeaderboardEntry,
  StudentBadge,
  StudentRankPosition,
} from "@/features/leadership/leadership-models";
import { useI18n } from "@/i18n";

interface AchievementsLeadershipPageProps {
  student: StudentProfile;
}

export function AchievementsLeadershipPage({ student }: AchievementsLeadershipPageProps) {
  const { t } = useI18n();
  const [position, setPosition] = useState<StudentRankPosition>(() =>
    leadershipService.getStudentPosition(student.username)
  );
  const [badges, setBadges] = useState<StudentBadge[]>(() =>
    leadershipService.getStudentBadges(student.username)
  );

  const [activeLeaderboardTab, setActiveLeaderboardTab] = useState<"taluka" | "district" | "state">(
    "taluka"
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isHighlighted, setIsHighlighted] = useState(false);

  // Extract district and taluka from student profile
  const districtName =
    student.schoolDistrict.replace(" District", "") ||
    (student.ageGroup === "6-10" ? "Pune" : student.ageGroup === "11-14" ? "Nashik" : "Nagpur");
  const talukaName =
    student.ageGroup === "6-10" ? "Haveli" : student.ageGroup === "11-14" ? "Dindori" : "Nagpur Rural";

  // Load leaderboard entries based on active tab
  const [leaderboardData, setLeaderboardData] = useState<LeaderboardEntry[]>([]);

  useEffect(() => {
    const data = leadershipService.getLeaderboard(
      activeLeaderboardTab,
      student.ageGroup,
      districtName,
      talukaName
    );
    setLeaderboardData(data);
  }, [activeLeaderboardTab, student.ageGroup, districtName, talukaName]);

  const userRowRef = useRef<HTMLTableRowElement | null>(null);

  // User's own entry in this scope
  const currentUserEntry = useMemo(
    () => leaderboardData.find((item) => item.isCurrentUser),
    [leaderboardData]
  );

  // Display Top 10 (or matching search results)
  const displayedLeaderboard = useMemo(() => {
    if (searchQuery.trim()) {
      return leaderboardData.filter(
        (item) =>
          item.maskedName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.displayName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.taluka.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.district.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    // Strictly show Top 10
    return leaderboardData.slice(0, 10);
  }, [leaderboardData, searchQuery]);

  // Is user's rank outside the displayed top 10?
  const isUserRankAfterTop10 =
    !searchQuery.trim() &&
    Boolean(currentUserEntry && currentUserEntry.rank > 10);

  const scrollToMyPosition = () => {
    setIsHighlighted(true);
    setTimeout(() => {
      userRowRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
    setTimeout(() => {
      setIsHighlighted(false);
    }, 3500);
  };

  const earnedBadgesCount = badges.filter((b) => b.earned).length;

  const renderLeaderboardRow = (item: LeaderboardEntry, isBottomPinned: boolean = false) => {
    const isSelf = item.isCurrentUser;
    return (
      <tr
        key={item.id + (isBottomPinned ? "-pinned" : "")}
        ref={isSelf ? userRowRef : undefined}
        className={`transition-all ${isSelf
            ? isHighlighted
              ? "bg-amber-100 ring-2 ring-amber-500 font-semibold"
              : "bg-amber-50/90 font-semibold border-l-4 border-l-amber-500"
            : "hover:bg-slate-50/80"
          }`}
      >
        {/* Rank */}
        <td className="px-4 py-3 whitespace-nowrap">
          <div className="flex items-center gap-1.5">
            {item.rank === 1 ? (
              <span className="grid size-6 place-items-center rounded-full bg-amber-400 text-slate-950 font-black text-[11px] shadow-xs">
                🥇
              </span>
            ) : item.rank === 2 ? (
              <span className="grid size-6 place-items-center rounded-full bg-slate-300 text-slate-900 font-black text-[11px] shadow-xs">
                🥈
              </span>
            ) : item.rank === 3 ? (
              <span className="grid size-6 place-items-center rounded-full bg-amber-700/80 text-white font-black text-[11px] shadow-xs">
                🥉
              </span>
            ) : (
              <span className="font-extrabold text-slate-800 text-xs w-6 text-center">
                #{item.rank}
              </span>
            )}
            {item.rankMovement > 0 && (
              <span className="text-[10px] font-bold text-emerald-600 flex items-center">
                <TrendingUp className="size-3" />+{item.rankMovement}
              </span>
            )}
            {item.rankMovement < 0 && (
              <span className="text-[10px] font-bold text-rose-500 flex items-center">
                <TrendingDown className="size-3" />{item.rankMovement}
              </span>
            )}
          </div>
        </td>

        {/* Student Name */}
        <td className="px-4 py-3 whitespace-nowrap">
          <div className="flex items-center gap-2">
            <span
              className={`text-xs font-bold ${isSelf ? "text-primary flex items-center gap-1.5" : "text-slate-800"
                }`}
            >
              {isSelf ? `${student.displayName} ${t("youSuffix")}` : item.maskedName}
            </span>
            {isSelf && (
              <span className="rounded-full bg-amber-200 px-2 py-0.5 text-[10px] font-black text-amber-900 border border-amber-300">
                {t("yourAccountBadge")}
              </span>
            )}
          </div>
        </td>

        {/* District / Taluka */}
        <td className="px-4 py-3 whitespace-nowrap text-slate-600">
          <span>{item.taluka}</span>
          <span className="text-slate-400">, {item.district}</span>
        </td>

        {/* Age Group */}
        <td className="px-4 py-3 whitespace-nowrap text-center">
          <span className="rounded-md bg-slate-100 px-2 py-0.5 text-[10.5px] font-bold text-slate-700 border border-slate-200">
            {t("colAgeGroup")} {item.ageGroup}
          </span>
        </td>

        {/* Score */}
        <td className="px-4 py-3 whitespace-nowrap text-center">
          <span className="font-black text-slate-900 text-xs">
            {item.score}%
          </span>
        </td>

        {/* Percentile */}
        <td className="px-4 py-3 whitespace-nowrap text-center text-slate-600 font-semibold">
          {item.percentile}%
        </td>

        {/* Badges */}
        <td className="px-4 py-3">
          <div className="flex flex-wrap items-center gap-1">
            {item.badgesEarned.map((b) => (
              <span
                key={b}
                className="rounded bg-purple-50 px-1.5 py-0.5 text-[10px] font-semibold text-purple-700 border border-purple-200"
              >
                {b}
              </span>
            ))}
          </div>
        </td>

        {/* Scholarship Status */}
        <td className="px-4 py-3 whitespace-nowrap text-center">
          <span
            className={`rounded-full px-2 py-0.5 text-[10.5px] font-bold ${item.scholarshipStatus === "Awarded"
                ? "bg-emerald-100 text-emerald-800 border border-emerald-300"
                : item.scholarshipStatus === "Shortlisted"
                  ? "bg-purple-100 text-purple-800 border border-purple-300"
                  : item.scholarshipStatus === "Eligible"
                    ? "bg-blue-100 text-blue-800 border border-blue-300"
                    : "bg-slate-100 text-slate-600"
              }`}
          >
            {item.scholarshipStatus}
          </span>
        </td>
      </tr>
    );
  };

  return (
    <div className="space-y-6 sm:space-y-8 px-4 sm:px-6 lg:px-8 py-6">
      {/* 1. Header Banner */}
      <section className="relative overflow-hidden rounded-2xl border border-primary/20 bg-gradient-to-r from-[#8B0012] via-[#9e0c1f] to-[#b31427] p-6 sm:p-8 text-white shadow-md">
        <div className="pointer-events-none absolute -right-8 -top-12 size-48 rounded-full bg-white/10 blur-2xl" />
        <div className="pointer-events-none absolute -bottom-10 right-32 size-40 rounded-full bg-amber-400/20 blur-2xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="grid size-9 place-items-center rounded-xl bg-amber-400/25 border border-amber-300/40 text-amber-200">
                <Trophy className="size-5" />
              </span>
              <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                {t("achievementsAndLeadership")}
              </h1>
              {/* Mandatory Registered Age Group Label - purely read-only badge, NO dropdown */}
              <span className="inline-flex items-center gap-1.5 rounded-full bg-white/20 px-3 py-1 text-xs font-bold text-amber-200 backdrop-blur-sm border border-white/25 shadow-xs">
                <Sparkles className="size-3.5 text-amber-300" />
                {student.ageGroupLabel}
              </span>
            </div>

            <p className="mt-2 text-xs sm:text-sm text-white/90 max-w-2xl font-medium leading-relaxed">
              {t("achievementsHeaderSubtitle", {
                name: student.displayName,
                id: student.studentId,
                taluka: talukaName,
                district: districtName,
              })}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            <div className="flex items-center gap-2 rounded-xl bg-white/15 px-3.5 py-2 border border-white/20 text-xs font-semibold text-white">
              <Crown className="size-4 text-amber-300" />
              <span>
                {position.talukaRank <= 10 ? t("talukaTop10") : `Rank #${position.talukaRank}`}
              </span>
            </div>
            <div className="flex items-center gap-2 rounded-xl bg-white/15 px-3.5 py-2 border border-white/20 text-xs font-semibold text-white">
              <Medal className="size-4 text-amber-300" />
              <span>{t("badgesEarnedCount", { count: earnedBadgesCount })}</span>
            </div>
            <Button
              size="sm"
              onClick={scrollToMyPosition}
              className="bg-amber-400 hover:bg-amber-500 text-slate-950 font-bold text-xs shadow-sm flex items-center gap-1.5 rounded-xl cursor-pointer"
            >
              <UserCheck className="size-4" />
              <span>{t("viewMyPosition")}</span>
            </Button>
          </div>
        </div>
      </section>

      {/* 2. My Leadership Position (3 Ranks + Score + Movement) */}
      <section aria-labelledby="leadership-position-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <h2 id="leadership-position-heading" className="text-lg sm:text-xl font-black text-slate-900 flex items-center gap-2">
              <Award className="size-5 text-primary" />
              <span>{t("myLeadershipPosition")}</span>
            </h2>
            <p className="text-xs text-slate-500">
              {t("leadershipPositionSubtitle", { ageGroup: student.ageGroup })}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg px-3 py-1.5 border border-slate-200 self-start sm:self-auto">
            <span>{t("assessmentLabel")}</span>
            <span className="font-bold text-primary">{position.assessmentTitle}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Card 1: Taluka Rank */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-amber-200/90 bg-gradient-to-br from-amber-50/70 via-white to-orange-50/50 p-5 shadow-xs transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-900/80">
                {t("myTalukaRank")}
              </span>
              <div className="grid size-9 place-items-center rounded-xl bg-amber-100 text-amber-800 shadow-xs">
                <Trophy className="size-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                #{position.talukaRank}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {t("ofTotalStudents", { total: position.totalTalukaStudents.toLocaleString() })}
              </span>
            </div>
            <p className="mt-2 text-xs font-semibold text-amber-800">
              {talukaName} Taluka · Age {student.ageGroup}
            </p>
            <div className="mt-3 pt-3 border-t border-amber-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-600 font-medium">{t("percentileInTaluka")}</span>
              <span className="font-extrabold text-slate-900">97.8%</span>
            </div>
          </div>

          {/* Card 2: District Rank */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-br from-blue-50/70 via-white to-indigo-50/50 p-5 shadow-xs transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-blue-900/80">
                {t("myDistrictRank")}
              </span>
              <div className="grid size-9 place-items-center rounded-xl bg-blue-100 text-blue-800 shadow-xs">
                <Medal className="size-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                #{position.districtRank}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {t("ofTotalStudents", { total: position.totalDistrictStudents.toLocaleString() })}
              </span>
            </div>
            <p className="mt-2 text-xs font-semibold text-blue-800">
              {districtName} District · Age {student.ageGroup}
            </p>
            <div className="mt-3 pt-3 border-t border-blue-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-600 font-medium">{t("districtStatus")}</span>
              <span className="font-extrabold text-blue-700">{t("top2PercentPerformer")}</span>
            </div>
          </div>

          {/* Card 3: Maharashtra State Rank */}
          <div className="relative overflow-hidden rounded-2xl border-2 border-primary/20 bg-gradient-to-br from-red-50/50 via-white to-rose-50/40 p-5 shadow-xs transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-primary">
                {t("maharashtraStateRank")}
              </span>
              <div className="grid size-9 place-items-center rounded-xl bg-primary/10 text-primary shadow-xs">
                <Crown className="size-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                #{position.stateRank}
              </span>
              <span className="text-xs font-semibold text-slate-500">
                {t("ofTotalStudents", { total: position.totalStateStudents.toLocaleString() })}
              </span>
            </div>
            <p className="mt-2 text-xs font-semibold text-primary">
              {t("statewideLeadership", { ageGroup: student.ageGroup })}
            </p>
            <div className="mt-3 pt-3 border-t border-red-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-600 font-medium">{t("statePercentile")}</span>
              <span className="font-extrabold text-primary">{position.percentile}th %ile</span>
            </div>
          </div>

          {/* Card 4: Assessment Score & Rank Movement */}
          <div className="relative overflow-hidden rounded-2xl border border-slate-200/90 bg-gradient-to-br from-emerald-50/70 via-white to-teal-50/50 p-5 shadow-xs transition-all hover:shadow-md">
            <div className="flex items-center justify-between">
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-900/80">
                {t("scoreAndMovement")}
              </span>
              <div className="grid size-9 place-items-center rounded-xl bg-emerald-100 text-emerald-800 shadow-xs">
                <TrendingUp className="size-5" />
              </div>
            </div>
            <div className="mt-3 flex items-baseline gap-2">
              <span className="text-3xl sm:text-4xl font-black text-slate-900">
                {position.score}%
              </span>
              <div className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-extrabold text-emerald-800">
                <TrendingUp className="size-3.5" />
                <span>{t("ranksMovement", { count: position.rankMovement })}</span>
              </div>
            </div>
            <p className="mt-2 text-xs font-semibold text-emerald-800">
              {t("previousPeriod", { rank: position.previousRank })}
            </p>
            <div className="mt-3 pt-3 border-t border-emerald-100 flex items-center justify-between text-[11px]">
              <span className="text-slate-600 font-medium">{t("qualifyingBenchmark")}</span>
              <span className="font-extrabold text-emerald-700">{t("passedDistinction")}</span>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Leadership Board (My Taluka / My District / Maharashtra) */}
      <section aria-labelledby="leaderboard-heading" className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-5">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pb-3 border-b border-slate-100">
          <div>
            <h2 id="leaderboard-heading" className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Trophy className="size-5 text-amber-500" />
              <span>{t("studentLeadershipBoard")}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t("leadershipBoardSubtitle")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div className="relative min-w-[200px]">
              <Search className="absolute left-2.5 top-2.5 size-3.5 text-slate-400" />
              <input
                type="text"
                placeholder={t("searchStudentTaluka")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 pl-8 pr-3 py-1.5 text-xs font-medium text-slate-900 placeholder:text-slate-400 focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
              />
            </div>

            <Button
              size="sm"
              variant="outline"
              onClick={scrollToMyPosition}
              className="text-xs font-bold border-amber-300 bg-amber-50 text-amber-900 hover:bg-amber-100 flex items-center gap-1.5 cursor-pointer"
            >
              <UserCheck className="size-3.5 text-amber-600" />
              <span>{t("highlightMe")}</span>
            </Button>
          </div>
        </div>

        {/* Scope Tabs */}
        <Tabs
          defaultValue="taluka"
          value={activeLeaderboardTab}
          onValueChange={(val) => setActiveLeaderboardTab(val as "taluka" | "district" | "state")}
          className="space-y-4"
        >
          <TabsList className="bg-slate-100/90 p-1 rounded-xl">
            <TabsTrigger
              value="taluka"
              className="rounded-lg text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <MapPin className="size-3.5 mr-1.5" />
              <span>{t("tabMyTaluka", { taluka: talukaName })}</span>
            </TabsTrigger>
            <TabsTrigger
              value="district"
              className="rounded-lg text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <Award className="size-3.5 mr-1.5" />
              <span>{t("tabMyDistrict", { district: districtName })}</span>
            </TabsTrigger>
            <TabsTrigger
              value="state"
              className="rounded-lg text-xs font-bold data-[state=active]:bg-primary data-[state=active]:text-white data-[state=active]:shadow-sm"
            >
              <Globe className="size-3.5 mr-1.5" />
              <span>{t("tabMaharashtra")}</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeLeaderboardTab} className="mt-0">
            {/* Table Container */}
            <div className="overflow-x-auto rounded-xl border border-slate-200">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wider text-slate-500 border-b border-slate-200">
                  <tr>
                    <th scope="col" className="px-4 py-3">{t("colRank")}</th>
                    <th scope="col" className="px-4 py-3">{t("colStudentName")}</th>
                    <th scope="col" className="px-4 py-3">{t("colDistrictTaluka")}</th>
                    <th scope="col" className="px-4 py-3 text-center">{t("colAgeGroup")}</th>
                    <th scope="col" className="px-4 py-3 text-center">{t("colScoreMarks")}</th>
                    <th scope="col" className="px-4 py-3 text-center">{t("colPercentile")}</th>
                    <th scope="col" className="px-4 py-3">{t("colBadgesRecognition")}</th>
                    <th scope="col" className="px-4 py-3 text-center">{t("colScholarshipStatus")}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {displayedLeaderboard.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="px-4 py-8 text-center text-slate-400 font-medium">
                        {t("noStudentsFound")}
                      </td>
                    </tr>
                  ) : (
                    <>
                      {displayedLeaderboard.map((item) => renderLeaderboardRow(item))}

                      {isUserRankAfterTop10 && currentUserEntry && (
                        <>
                          <tr className="bg-slate-50/90 border-y-2 border-dashed border-slate-200">
                            <td colSpan={8} className="px-4 py-2.5 text-center">
                              <div className="flex items-center justify-center gap-2">
                                <span className="text-slate-400 font-extrabold tracking-widest select-none">• • •</span>
                                <span className="rounded-full bg-amber-100 px-3 py-1 text-[11px] font-extrabold text-amber-900 border border-amber-300 shadow-2xs">
                                  {t("yourCurrentStanding", {
                                    rank: currentUserEntry.rank,
                                    scope:
                                      activeLeaderboardTab === "taluka"
                                        ? `${talukaName} Taluka`
                                        : activeLeaderboardTab === "district"
                                        ? `${districtName} District`
                                        : "Maharashtra",
                                  })}
                                </span>
                                <span className="text-slate-400 font-extrabold tracking-widest select-none">• • •</span>
                              </div>
                            </td>
                          </tr>
                          {renderLeaderboardRow(currentUserEntry, true)}
                        </>
                      )}
                    </>
                  )}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-[11px] text-slate-500 font-medium flex flex-wrap items-center justify-between gap-2">
              <span>
                {t("showingTop10Leaders", { ageGroup: student.ageGroup })}
                {isUserRankAfterTop10 && currentUserEntry
                  ? t("alongWithPinned", { rank: currentUserEntry.rank })
                  : "."}
              </span>
              <span className="text-slate-400 font-medium">
                {t("cohortCount", {
                  count:
                    activeLeaderboardTab === "taluka"
                      ? position.totalTalukaStudents.toLocaleString()
                      : activeLeaderboardTab === "district"
                      ? position.totalDistrictStudents.toLocaleString()
                      : position.totalStateStudents.toLocaleString(),
                  scope:
                    activeLeaderboardTab === "taluka"
                      ? t("inTaluka")
                      : activeLeaderboardTab === "district"
                      ? t("inDistrict")
                      : t("inMaharashtra"),
                })}
              </span>
            </p>
          </TabsContent>
        </Tabs>
      </section>

      {/* 4. My Achievements & Badges (Visual Grid with Progress) */}
      <section aria-labelledby="badges-heading" className="rounded-2xl border border-slate-200/90 bg-white p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 pb-3 border-b border-slate-100">
          <div>
            <h2 id="badges-heading" className="text-base sm:text-lg font-black text-slate-900 flex items-center gap-2">
              <Medal className="size-5 text-purple-600" />
              <span>{t("myAchievementsAndBadges")}</span>
            </h2>
            <p className="text-xs text-slate-500 mt-0.5">
              {t("achievementsBadgesSubtitle")}
            </p>
          </div>
          <div className="flex items-center gap-2 text-xs font-bold text-slate-700 bg-purple-50 px-3 py-1 rounded-full border border-purple-200">
            <span>{t("badgesUnlockedCount", { earned: earnedBadgesCount, total: badges.length })}</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {badges.map((badge) => {
            return (
              <div
                key={badge.id}
                className={`relative flex flex-col justify-between rounded-xl border p-4 transition-all ${badge.earned
                    ? "border-purple-200 bg-gradient-to-b from-purple-50/40 to-white shadow-xs hover:shadow-md"
                    : "border-slate-200 bg-slate-50/70 opacity-80"
                  }`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-3xl select-none">{badge.icon}</span>
                    {badge.earned ? (
                      <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-800 border border-emerald-300">
                        {t("earnedDate", { date: badge.earnedDate || "" })}
                      </span>
                    ) : (
                      <span className="rounded-full bg-slate-200 px-2 py-0.5 text-[10px] font-bold text-slate-600 flex items-center gap-1">
                        <Lock className="size-3" />
                        <span>{t("locked")}</span>
                      </span>
                    )}
                  </div>

                  <h3 className="mt-3 text-sm font-bold text-slate-900">
                    {badge.title}
                  </h3>
                  <p className="mt-1 text-xs text-slate-600 leading-snug">
                    {badge.description}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100">
                  {badge.earned ? (
                    <p className="text-[11px] font-medium text-emerald-700 flex items-center gap-1">
                      <span>{t("completedRequirement")}</span>
                      <span className="text-slate-600">{badge.requirement}</span>
                    </p>
                  ) : (
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-[11px] font-semibold text-slate-600">
                        <span>{t("progress")}</span>
                        <span>{badge.progressPercent}%</span>
                      </div>
                      <Progress value={badge.progressPercent} className="h-1.5 bg-slate-200" />
                      <p className="text-[10.5px] text-slate-500 font-medium pt-1">
                        {badge.requirement}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. Recognition & Rewards Section */}
      <section aria-labelledby="rewards-heading" className="rounded-2xl border border-primary/20 bg-gradient-to-br from-amber-50/50 via-white to-orange-50/30 p-5 sm:p-6 shadow-xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-amber-100">
          <Sparkles className="size-5 text-amber-600" />
          <h2 id="rewards-heading" className="text-base sm:text-lg font-black text-slate-900">
            {t("recognitionOpportunitiesTitle")}
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs">
          {/* Item 1: Current Leadership Position */}
          <div className="rounded-xl border border-amber-200 bg-white p-4 shadow-2xs space-y-2">
            <span className="font-bold text-amber-900 uppercase tracking-wider text-[11px] block">
              {t("item1CurrentStanding")}
            </span>
            <p className="font-semibold text-slate-800 text-sm">
              {t("item1RankDesc", { rank: position.talukaRank, taluka: talukaName })}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {t("item1Text")}
            </p>
          </div>

          {/* Item 2: Upcoming Competition */}
          <div className="rounded-xl border border-amber-200 bg-white p-4 shadow-2xs space-y-2">
            <span className="font-bold text-blue-900 uppercase tracking-wider text-[11px] block">
              {t("item2UpcomingCompetition")}
            </span>
            <p className="font-semibold text-slate-800 text-sm">
              {t("item2Title")}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {t("item2Text")}
            </p>
          </div>

          {/* Item 3: Scholarship Eligibility Status */}
          <div className="rounded-xl border border-amber-200 bg-white p-4 shadow-2xs space-y-2">
            <span className="font-bold text-emerald-900 uppercase tracking-wider text-[11px] block">
              {t("item3ScholarshipStatus")}
            </span>
            <p className="font-semibold text-emerald-800 text-sm">
              {t("item3Title")}
            </p>
            <p className="text-slate-600 leading-relaxed">
              {t("item3Text", { score: position.score })}
            </p>
          </div>
        </div>

        {/* Mandatory Demo Disclaimer */}
        <div className="rounded-xl border border-amber-300 bg-amber-100/70 p-3.5 text-xs text-amber-950 font-medium">
          <p className="leading-relaxed">
            ⚠️ <span className="font-bold">{t("demoNoticeTitle")}</span> {t("demoNoticeText")}
          </p>
        </div>
      </section>
    </div>
  );
}
