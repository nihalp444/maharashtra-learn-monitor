import {
  Clock,
  ExternalLink,
  Film,
  Play,
  Video,
} from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  type CourseCurriculum,
  type CourseVideo,
  getCourseCurriculum,
  getGoogleDriveEmbedUrl,
  ROOT_DRIVE_FOLDER,
} from "@/config/course-videos";
export interface ProgramVideoTarget {
  id: string;
  name: string;
  ageGroup?: string;
  description?: string;
}

interface CourseVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  program: ProgramVideoTarget | LearningProgram | null;
}

export function CourseVideoModal({
  isOpen,
  onClose,
  program,
}: CourseVideoModalProps) {
  if (!program) return null;

  const curriculum: CourseCurriculum = useMemo(() => {
    return getCourseCurriculum(
      program.id,
      program.name,
      (program.ageGroup as "6-10" | "11-14" | "15-18") || "11-14"
    );
  }, [program]);

  // Language state: 'en' | 'mr'
  const [selectedLanguage, setSelectedLanguage] = useState<"en" | "mr">(
    curriculum.defaultLanguage || "en"
  );

  // Filter videos by selected language
  const languageVideos = useMemo(() => {
    const filtered = curriculum.videos.filter(
      (v) => v.language === selectedLanguage
    );
    // If no videos in the chosen language, fallback to all videos
    return filtered.length > 0 ? filtered : curriculum.videos;
  }, [curriculum, selectedLanguage]);

  // Active playing video state
  const [activeVideo, setActiveVideo] = useState<CourseVideo>(() => {
    return languageVideos[0] || curriculum.videos[0];
  });

  // Whenever the program changes or modal opens, reset to the first video
  useEffect(() => {
    const hasEnglish = curriculum.videos.some((v) => v.language === "en");
    const hasMarathi = curriculum.videos.some((v) => v.language === "mr");

    let initialLang: "en" | "mr" = curriculum.defaultLanguage || "en";
    if (initialLang === "en" && !hasEnglish && hasMarathi) {
      initialLang = "mr";
    } else if (initialLang === "mr" && !hasMarathi && hasEnglish) {
      initialLang = "en";
    }

    setSelectedLanguage(initialLang);
    const inLang = curriculum.videos.find((v) => v.language === initialLang);
    setActiveVideo(inLang || curriculum.videos[0]);
  }, [program.id, curriculum]);

  // Keep active video in sync when changing language
  const handleLanguageChange = (lang: "en" | "mr") => {
    setSelectedLanguage(lang);
    const inLang = curriculum.videos.find((v) => v.language === lang);
    if (inLang) {
      setActiveVideo(inLang);
    }
  };

  const englishCount = curriculum.videos.filter((v) => v.language === "en").length;
  const marathiCount = curriculum.videos.filter((v) => v.language === "mr").length;

  const currentEmbedUrl = activeVideo
    ? getGoogleDriveEmbedUrl(activeVideo.driveUrlOrId)
    : "";

  const isFolderUrl = activeVideo?.driveUrlOrId?.includes("/folders/");

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-5xl w-[92vw] p-0 overflow-hidden rounded-2xl border border-slate-200 shadow-2xl bg-white max-h-[96vh] flex flex-col">
        {/* Modal Top Header */}
        <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-[#8B0012] px-4 py-3.5 sm:px-6 sm:py-4 text-white flex-shrink-0">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-[11px] font-bold text-amber-200 border border-white/20">
                  Age {curriculum.ageGroup}
                </span>
                <span className="text-xs font-semibold text-white/70">
                  {curriculum.videos.length} Lectures Available
                </span>
              </div>
              <DialogTitle className="text-base sm:text-lg font-black tracking-tight text-white mt-1">
                {curriculum.programName}
              </DialogTitle>
              <DialogDescription className="text-xs text-white/80 line-clamp-1 mt-0.5">
                {curriculum.description || program.description}
              </DialogDescription>
            </div>

            {/* Language Selection Buttons */}
            <div className="flex items-center gap-1.5 bg-black/40 p-1 rounded-xl border border-white/15 self-start sm:self-auto">
              <span className="text-[11px] font-bold text-white/60 px-1 hidden md:inline">
                Language:
              </span>
              <button
                type="button"
                onClick={() => handleLanguageChange("en")}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedLanguage === "en"
                    ? "bg-white text-slate-900 shadow-md ring-1 ring-white/50"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>English</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedLanguage === "en"
                      ? "bg-slate-100 text-slate-700"
                      : "bg-white/20 text-white"
                  }`}
                >
                  {englishCount}
                </span>
              </button>

              <button
                type="button"
                onClick={() => handleLanguageChange("mr")}
                className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                  selectedLanguage === "mr"
                    ? "bg-amber-400 text-slate-950 shadow-md ring-1 ring-amber-300"
                    : "text-white/80 hover:text-white hover:bg-white/10"
                }`}
              >
                <span>मराठी (Marathi)</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full ${
                    selectedLanguage === "mr"
                      ? "bg-amber-300 text-slate-900"
                      : "bg-white/20 text-white"
                  }`}
                >
                  {marathiCount}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Modal Body: Split into Player Area and Playlist */}
        <div className="flex-1 overflow-y-auto p-3.5 sm:p-5">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 items-start">
            {/* Active Video Player Container (7 cols on lg for a compact, crisp player) */}
            <div className="lg:col-span-7 rounded-xl overflow-hidden bg-slate-950 border border-slate-800 shadow-lg flex flex-col">
              <div className="relative aspect-[16/9] max-h-[380px] w-full bg-slate-900 flex items-center justify-center">
                {currentEmbedUrl && !isFolderUrl ? (
                  <iframe
                    key={currentEmbedUrl}
                    src={currentEmbedUrl}
                    title={activeVideo?.title || "Course Video"}
                    className="w-full h-full border-0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                ) : (
                  /* Fallback preview view when using root folder or folder links */
                  <div className="flex flex-col items-center justify-center p-8 text-center text-white max-w-lg">
                    <div className="grid size-16 place-items-center rounded-2xl bg-[#8B0012]/30 text-amber-300 border border-amber-500/20 mb-3 shadow-inner">
                      <Film className="size-8" />
                    </div>
                    <h4 className="text-lg font-bold text-white mb-1.5">
                      {activeVideo?.title || "Video Lecture"}
                    </h4>
                    <p className="text-xs text-slate-300 mb-5 leading-relaxed">
                      This video is hosted in the official Klassroom Google Drive repository. You can play directly or preview via the Drive folder.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-2.5">
                      <Button
                        size="sm"
                        asChild
                        className="bg-primary hover:bg-primary/90 text-white font-bold text-xs shadow-md gap-1.5 h-9 px-4"
                      >
                        <a
                          href={activeVideo?.driveUrlOrId || ROOT_DRIVE_FOLDER}
                          target="_blank"
                          rel="noreferrer"
                        >
                          <ExternalLink className="size-3.5" />
                          <span>Open Video in Drive Folder</span>
                        </a>
                      </Button>
                    </div>
                  </div>
                )}
              </div>

              {/* Video Meta Bar */}
              <div className="bg-slate-900 px-4 py-3.5 border-t border-slate-800/80 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3 min-w-0">
                  <span className="grid size-8 place-items-center rounded-lg bg-[#8B0012] text-amber-200 text-xs font-bold shrink-0 shadow-sm">
                    <Play className="size-4 fill-current" />
                  </span>
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-white truncate">
                      {activeVideo?.title}
                    </p>
                    <div className="flex items-center gap-2 text-xs text-slate-400 mt-0.5">
                      <span>{activeVideo?.subject || "Curriculum"}</span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-3.5" />
                        {activeVideo?.duration || "15 mins"}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className={`text-xs font-bold px-2.5 py-0.5 ${
                      activeVideo?.language === "mr"
                        ? "border-amber-400/40 text-amber-300 bg-amber-950/40"
                        : "border-blue-400/40 text-blue-300 bg-blue-950/40"
                    }`}
                  >
                    {activeVideo?.language === "mr" ? "मराठी माध्यम" : "English Medium"}
                  </Badge>
                  <Button
                    size="sm"
                    variant="ghost"
                    asChild
                    className="h-8 text-xs text-slate-300 hover:text-white hover:bg-white/10 px-2.5"
                  >
                    <a
                      href={activeVideo?.driveUrlOrId || ROOT_DRIVE_FOLDER}
                      target="_blank"
                      rel="noreferrer"
                      title="Open directly in Google Drive"
                    >
                      <ExternalLink className="size-3.5 mr-1" />
                      <span>Drive</span>
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Playlist / Available Lectures in Selected Language (5 cols on lg) */}
            <div className="lg:col-span-5 flex flex-col space-y-3">
              <div className="flex items-center justify-between pb-1 border-b border-slate-100">
                <h4 className="text-xs sm:text-sm font-bold text-slate-900 flex items-center gap-2">
                  <Video className="size-4 text-primary" />
                  <span>
                    {selectedLanguage === "en" ? "Course Playlist" : "व्हिडिओ यादी"}
                  </span>
                  <span className="text-xs font-semibold text-slate-500">
                    ({languageVideos.length})
                  </span>
                </h4>
                <span className="text-[11px] text-slate-400 font-medium">
                  Select to play
                </span>
              </div>

              <div className="space-y-2 max-h-[460px] overflow-y-auto pr-1">
                {languageVideos.map((video, idx) => {
                  const isSelected = activeVideo?.id === video.id;
                  return (
                    <button
                      key={video.id}
                      type="button"
                      onClick={() => setActiveVideo(video)}
                      className={`w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all ${
                        isSelected
                          ? "border-primary bg-primary/5 shadow-xs ring-1 ring-primary/40"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div
                        className={`grid size-8 place-items-center rounded-lg shrink-0 mt-0.5 ${
                          isSelected
                            ? "bg-primary text-white shadow-xs"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {isSelected ? (
                          <Play className="size-3.5 fill-current" />
                        ) : (
                          <span className="text-xs font-bold">{idx + 1}</span>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <p
                          className={`text-xs font-bold line-clamp-2 leading-snug ${
                            isSelected ? "text-primary" : "text-slate-900"
                          }`}
                        >
                          {video.title}
                        </p>
                        <div className="mt-1 flex items-center gap-2 text-[11px] text-slate-500">
                          <span className="truncate max-w-[120px]">
                            {video.subject || "Lecture"}
                          </span>
                          <span>•</span>
                          <span className="flex items-center gap-1 shrink-0">
                            <Clock className="size-3 text-slate-400" />
                            {video.duration || "15 mins"}
                          </span>
                        </div>
                      </div>

                      {isSelected && (
                        <span className="text-[10px] font-bold text-primary bg-primary/10 px-2 py-0.5 rounded-full shrink-0 self-center">
                          Playing
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="border-t border-slate-100 bg-slate-50 px-4 py-3 sm:px-5 flex items-center justify-between flex-shrink-0">
          <div className="text-[11px] text-slate-500 flex items-center gap-1.5">
            <span className="size-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Synced with Google Drive Klassroom Repository</span>
          </div>
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={onClose}
            className="text-xs font-semibold"
          >
            Close Player
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
