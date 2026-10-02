import { useState } from "react";
import {
  HelpCircle,
  X,
  ChevronRight,
  ArrowLeft,
  ExternalLink,
  Search,
  BookOpen,
  GraduationCap,
  Award,
  Building2,
  Settings,
  PhoneCall,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useI18n } from "@/i18n";
import { FAQ_DATA, type FAQItem } from "@/features/mis/faq-data";

export function FloatingChatbot() {
  const { locale } = useI18n();
  const isMr = locale === "mr";

  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedFaq, setSelectedFaq] = useState<FAQItem | null>(null);

  const categories = [
    { id: "all", label: isMr ? "सर्व प्रश्न" : "All", icon: HelpCircle },
    { id: "student", label: isMr ? "विद्यार्थी" : "Students", icon: GraduationCap },
    { id: "courses", label: isMr ? "कोर्स व लेक्चर्स" : "Courses", icon: BookOpen },
    { id: "assessment", label: isMr ? "मूल्यमापन" : "Assessments", icon: Award },
    { id: "admin", label: isMr ? "जिल्हा/MIS" : "District/MIS", icon: Building2 },
    { id: "account", label: isMr ? "खाते व मदत" : "Helpdesk", icon: Settings },
  ];

  const filteredFaqs = FAQ_DATA.filter((faq) => {
    const matchesCategory =
      selectedCategory === "all" || faq.category === selectedCategory;
    const query = searchQuery.trim().toLowerCase();
    if (!query) return matchesCategory;

    const q = isMr ? faq.questionMr.toLowerCase() : faq.questionEn.toLowerCase();
    const a = isMr ? faq.answerMr.toLowerCase() : faq.answerEn.toLowerCase();
    const qBoth = `${faq.questionEn.toLowerCase()} ${faq.questionMr.toLowerCase()}`;
    return matchesCategory && (q.includes(query) || a.includes(query) || qBoth.includes(query));
  });

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end print:hidden">
      {/* Pop-up FAQ Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Maharashtra Learn FAQ & Help Center"
          className="mb-3.5 flex h-[520px] w-[350px] sm:w-[410px] flex-col overflow-hidden rounded-2xl border border-slate-200/90 bg-white shadow-2xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-5"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-primary via-primary/95 to-slate-900 px-4 py-3 text-white shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="grid size-9 place-items-center rounded-xl bg-white/15 text-white shadow-inner backdrop-blur-xs">
                <HelpCircle className="size-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white">
                    {isMr ? "नेहमी विचारले जाणारे प्रश्न (FAQ)" : "Frequently Asked Questions"}
                  </h3>
                </div>
                <p className="text-[11px] text-white/75">
                  {isMr ? "महाराष्ट्र डिजिटल शिक्षण सहाय्यता" : "Maharashtra Digital Learning Help Center"}
                </p>
              </div>
            </div>
            <button
              onClick={() => {
                setIsOpen(false);
                setSelectedFaq(null);
              }}
              aria-label="Close dialog"
              className="grid size-8 place-items-center rounded-lg text-white/80 transition-colors hover:bg-white/15 hover:text-white cursor-pointer"
            >
              <X className="size-4.5" />
            </button>
          </div>

          {/* VIEW: Detail FAQ Question & Answer */}
          {selectedFaq ? (
            <div className="flex flex-1 flex-col overflow-y-auto p-4 bg-slate-50/50 animate-in fade-in duration-150">
              <div className="flex items-center justify-between gap-2 pb-3 border-b border-slate-200">
                <button
                  type="button"
                  onClick={() => setSelectedFaq(null)}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary hover:underline cursor-pointer"
                >
                  <ArrowLeft className="size-3.5" />
                  <span>{isMr ? "सर्व प्रश्नांकडे परत जा" : "Back to All Questions"}</span>
                </button>
                <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-amber-100 text-amber-800">
                  {selectedFaq.category}
                </span>
              </div>

              <div className="my-3.5">
                <h4 className="text-sm font-bold text-slate-900 leading-snug">
                  {isMr ? selectedFaq.questionMr : selectedFaq.questionEn}
                </h4>
              </div>

              <div className="rounded-xl border border-slate-200 bg-white p-4 text-xs text-slate-700 leading-relaxed shadow-2xs space-y-3">
                <p>{isMr ? selectedFaq.answerMr : selectedFaq.answerEn}</p>

                {/* Direct Action Link if related to application pages */}
                {selectedFaq.action && (
                  <div className="pt-2 border-t border-slate-100">
                    <a
                      href={selectedFaq.action.targetUrl}
                      onClick={() => setIsOpen(false)}
                      className="inline-flex items-center gap-1.5 rounded-lg bg-primary px-3 py-2 text-xs font-semibold text-white shadow-xs hover:bg-primary/90 transition-colors"
                    >
                      <span>{isMr ? selectedFaq.action.labelMr : selectedFaq.action.labelEn}</span>
                      <ExternalLink className="size-3.5" />
                    </a>
                  </div>
                )}
              </div>

              {/* Bottom Support Contact Card */}
              <div className="mt-auto pt-4 border-t border-slate-200">
                <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3 flex items-center justify-between gap-2 text-xs text-blue-950">
                  <div className="flex items-center gap-2">
                    <PhoneCall className="size-4 text-blue-600 shrink-0" />
                    <div>
                      <p className="font-bold text-[11px]">
                        {isMr ? "अधिक माहिती किंवा अडचण आहे?" : "Need More Help?"}
                      </p>
                      <p className="text-[10px] text-blue-700">Toll-Free: 1800-889-6889</p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => setSelectedFaq(null)}
                    className="text-xs h-7 px-2.5 bg-white text-slate-700"
                  >
                    {isMr ? "इतर प्रश्न पहा" : "Other FAQs"}
                  </Button>
                </div>
              </div>
            </div>
          ) : (
            /* VIEW: FAQ Question List with Search & Categories */
            <div className="flex flex-1 flex-col overflow-hidden bg-slate-50/50">
              {/* Search Bar */}
              <div className="p-3 bg-white border-b border-slate-100">
                <div className="relative">
                  <Search className="absolute left-2.5 top-2.5 size-3.5 text-slate-400" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder={
                      isMr
                        ? "प्रश्न किंवा विषय शोधा (उदा. कोर्स, परीक्षा, जिल्हा)..."
                        : "Search questions (e.g. course, test, district)..."
                    }
                    className="w-full rounded-lg border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-7 text-xs text-slate-800 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none"
                  />
                  {searchQuery && (
                    <button
                      type="button"
                      onClick={() => setSearchQuery("")}
                      className="absolute right-2.5 top-2 text-xs text-slate-400 hover:text-slate-600 cursor-pointer"
                    >
                      ✕
                    </button>
                  )}
                </div>

                {/* Category Pills */}
                <div className="flex items-center gap-1.5 overflow-x-auto pt-2 scrollbar-none">
                  {categories.map((cat) => {
                    const Icon = cat.icon;
                    const active = selectedCategory === cat.id;
                    return (
                      <button
                        key={cat.id}
                        type="button"
                        onClick={() => setSelectedCategory(cat.id)}
                        className={`flex items-center gap-1 shrink-0 rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors cursor-pointer ${
                          active
                            ? "bg-primary text-white font-semibold shadow-2xs"
                            : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                        }`}
                      >
                        <Icon className="size-3" />
                        <span>{cat.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Questions List */}
              <div className="flex-1 overflow-y-auto p-3 space-y-2">
                <div className="flex items-center justify-between px-1 text-[11px] font-semibold text-slate-500">
                  <span>
                    {isMr
                      ? `${filteredFaqs.length} प्रश्न उपलब्ध`
                      : `${filteredFaqs.length} Questions Available`}
                  </span>
                  <span className="text-[10px] text-slate-400">
                    {isMr ? "उत्तरासाठी प्रश्नावर क्लिक करा" : "Click question for answer"}
                  </span>
                </div>

                {filteredFaqs.length === 0 ? (
                  <div className="py-12 text-center space-y-2">
                    <p className="text-xs text-slate-500">
                      {isMr
                        ? "या शोधासाठी कोणताही प्रश्न सापडला नाही."
                        : "No matching questions found."}
                    </p>
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => {
                        setSearchQuery("");
                        setSelectedCategory("all");
                      }}
                      className="text-xs"
                    >
                      {isMr ? "सर्व प्रश्न दाखवा" : "Clear Filter"}
                    </Button>
                  </div>
                ) : (
                  filteredFaqs.map((faq) => (
                    <button
                      key={faq.id}
                      type="button"
                      onClick={() => setSelectedFaq(faq)}
                      className="w-full text-left rounded-xl border border-slate-200 bg-white p-3 transition-all hover:border-primary/50 hover:shadow-xs group flex items-start justify-between gap-2.5 cursor-pointer"
                    >
                      <div className="space-y-1">
                        <span className="inline-block text-[10px] font-semibold uppercase px-1.5 py-0.2 rounded bg-slate-100 text-slate-600">
                          {faq.category}
                        </span>
                        <p className="text-xs font-semibold text-slate-800 group-hover:text-primary leading-snug">
                          {isMr ? faq.questionMr : faq.questionEn}
                        </p>
                      </div>
                      <ChevronRight className="size-4 shrink-0 text-slate-400 group-hover:text-primary group-hover:translate-x-0.5 transition-all mt-1" />
                    </button>
                  ))
                )}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Floating FAQ Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close FAQ Help" : "Open FAQ Help"}
        className="group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary to-slate-900 px-4 py-3 text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/35 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2 cursor-pointer"
      >
        <div className="relative grid size-7 place-items-center rounded-full bg-white/20 text-white transition-transform group-hover:scale-110">
          <HelpCircle className="size-4 text-amber-300" />
          <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-amber-400 ring-2 ring-primary" />
        </div>
        <div className="flex flex-col text-left">
          <span className="text-xs font-bold tracking-wide">
            {isOpen ? (isMr ? "बंद करा" : "Close") : (isMr ? "प्रश्नोत्तरे (FAQ)" : "FAQ & Help")}
          </span>
          <span className="text-[9px] text-white/70 font-normal">
            {isMr ? "मार्गदर्शन केंद्र" : "Portal Guide"}
          </span>
        </div>
      </button>
    </div>
  );
}
