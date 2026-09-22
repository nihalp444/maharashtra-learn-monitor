import { ASSET_METADATA } from "@/assests";

export function LoginHeader() {
  return (
    <header>
      <div className="bg-government-bar text-government-bar-foreground">
        <div className="mx-auto flex h-8 max-w-[1600px] items-center justify-between px-4 text-[11px] font-medium sm:px-6 lg:px-8">
          <span>Government of Maharashtra</span>
          <div className="flex items-center gap-3"><span>English</span><span className="text-government-bar-foreground/40">|</span><span lang="mr">मराठी</span></div>
        </div>
      </div>
      <div className="border-b border-border bg-card">
        <div className="mx-auto flex min-h-24 max-w-[1600px] items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-3 sm:gap-4">
            <img src={ASSET_METADATA.logo.src} alt={ASSET_METADATA.logo.alt} className="h-16 w-auto shrink-0 object-contain sm:h-20" />
            <div className="min-w-0">
              <p className="text-[11px] font-bold text-primary sm:text-xs" lang="mr">महाराष्ट्र इमारत व इतर बांधकाम कामगार कल्याणकारी मंडळ</p>
              <h1 className="mt-0.5 text-sm font-extrabold leading-snug text-foreground sm:text-lg">MBOCWWB – Maharashtra Building and Other Construction Workers Welfare Board</h1>
              <p className="mt-1 text-[10px] font-bold uppercase text-muted-foreground sm:text-[11px]">Government of Maharashtra</p>
            </div>
          </div>
          <div className="hidden shrink-0 items-center gap-3 border-l border-border pl-4 sm:flex">
            <img src={ASSET_METADATA.seal.src} alt={ASSET_METADATA.seal.alt} className="h-14 w-auto object-contain" />
            <img src={ASSET_METADATA.emblem.src} alt={ASSET_METADATA.emblem.alt} className="h-14 w-auto object-contain" />
          </div>
        </div>
      </div>
      <div className="h-3 bg-primary" aria-hidden="true" />
    </header>
  );
}