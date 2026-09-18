import { useState } from "react";
import { Bot, MessageSquareText, Send, Sparkles, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputVal, setInputVal] = useState("");
  const [messages, setMessages] = useState<Array<{ sender: "bot" | "user"; text: string }>>([
    {
      sender: "bot",
      text: "Namaskar! Ask me anything about your queries.",
    },
  ]);

  const handleSend = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!inputVal.trim()) return;

    const userText = inputVal.trim();
    setInputVal("");
    setMessages((prev) => [...prev, { sender: "user", text: userText }]);

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: "bot",
          text: "Thank you for asking! This is a demo assistant. For detailed inquiries, please contact the MBOCWWB State Mission Directorate or your District Welfare Officer.",
        },
      ]);
    }, 500);
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Pop-up Chat Dialog */}
      {isOpen && (
        <div
          role="dialog"
          aria-label="Ask Me Chat Assistant"
          className="mb-3.5 flex h-[420px] w-[340px] flex-col overflow-hidden rounded-2xl border border-slate-200/80 bg-white shadow-2xl transition-all duration-200 animate-in fade-in slide-in-from-bottom-5 sm:w-[380px]"
        >
          {/* Header */}
          <div className="flex items-center justify-between bg-gradient-to-r from-primary via-primary/95 to-slate-900 px-4 py-3.5 text-white shadow-xs">
            <div className="flex items-center gap-2.5">
              <div className="grid size-9 place-items-center rounded-xl bg-white/15 text-white shadow-inner backdrop-blur-xs">
                <Bot className="size-5 text-amber-300" />
              </div>
              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-sm font-bold text-white">Ask Me</h3>
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/20 px-1.5 py-0.2 text-[10px] font-semibold text-emerald-300 border border-emerald-400/30">
                    <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    Online
                  </span>
                </div>
                <p className="text-[11px] text-white/75">
                  Maharashtra Learn Assistant
                </p>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="grid size-8 place-items-center rounded-lg text-white/80 transition-colors hover:bg-white/15 hover:text-white"
            >
              <X className="size-4.5" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="flex-1 overflow-y-auto bg-slate-50/60 p-4 space-y-3">
            <div className="rounded-xl border border-blue-100 bg-blue-50/70 p-3 text-xs text-blue-900 shadow-2xs">
              <div className="flex items-center gap-1.5 font-bold text-blue-950">
                <Sparkles className="size-3.5 text-amber-600" />
                <span>Demo Virtual Assistant</span>
              </div>
              <p className="mt-1 text-[11px] leading-relaxed text-blue-800">
                Ask me anything about your queries regarding student registrations, courses, or district reports.
              </p>
            </div>

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex gap-2 ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.sender === "bot" && (
                  <div className="grid size-7 shrink-0 place-items-center rounded-lg bg-primary text-white shadow-2xs">
                    <Bot className="size-3.5" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-2xl px-3.5 py-2.5 text-xs shadow-2xs ${
                    msg.sender === "user"
                      ? "bg-primary text-primary-foreground rounded-br-xs"
                      : "bg-white text-slate-800 border border-slate-200/70 rounded-bl-xs leading-relaxed"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input Footer */}
          <form
            onSubmit={handleSend}
            className="border-t border-slate-100 bg-white p-3 flex items-center gap-2"
          >
            <input
              type="text"
              value={inputVal}
              onChange={(e) => setInputVal(e.target.value)}
              placeholder="Ask me anything about your queries..."
              className="flex-1 rounded-xl border border-slate-200 bg-slate-50/60 px-3 py-2 text-xs text-slate-800 placeholder:text-slate-400 focus:border-primary focus:bg-white focus:outline-none focus:ring-1 focus:ring-primary"
            />
            <Button
              type="submit"
              size="icon"
              className="size-9 rounded-xl bg-primary text-white shadow-xs hover:bg-primary/90"
              aria-label="Send message"
            >
              <Send className="size-3.5" />
            </Button>
          </form>
        </div>
      )}

      {/* Floating Trigger Button */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={isOpen ? "Close chatbot" : "Open Ask Me chatbot"}
        className="group flex items-center gap-2.5 rounded-full bg-gradient-to-r from-primary to-slate-900 px-4 py-3 text-white shadow-lg shadow-primary/25 transition-all duration-200 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/35 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-offset-2"
      >
        <div className="relative grid size-7 place-items-center rounded-full bg-white/20 text-white transition-transform group-hover:scale-110">
          <MessageSquareText className="size-4 text-amber-300" />
          <span className="absolute -top-0.5 -right-0.5 size-2 rounded-full bg-amber-400 ring-2 ring-primary" />
        </div>
        <span className="text-xs font-bold tracking-wide">
          {isOpen ? "Close Chat" : "Ask Me"}
        </span>
      </button>
    </div>
  );
}
