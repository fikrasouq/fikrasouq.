import { cn } from "@/lib/utils";

export function BrandMark({ compact = false }: { compact?: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={cn(
          "relative flex items-center justify-center rounded-[1.4rem] border border-white/12 bg-gradient-to-br from-brand-400 via-brand-500 to-brand-700 text-ink-950 shadow-[0_18px_40px_rgba(245,165,36,0.28)]",
          compact ? "h-11 w-11 text-base" : "h-14 w-14 text-lg",
        )}
      >
        <span className="font-black tracking-tight">FS</span>
        <span className="absolute -bottom-1.5 -left-1.5 rounded-full border border-white/15 bg-ink-950/95 px-1.5 py-0.5 text-[10px] font-bold text-brand-100 shadow-lg">
          سوق
        </span>
      </div>

      <div className="space-y-0.5">
        <div className="flex items-center gap-2">
          <p className={cn("font-black tracking-[0.02em] text-white", compact ? "text-base" : "text-lg")}>FikraSouq</p>
          {!compact ? (
            <span className="rounded-full border border-brand-400/25 bg-brand-400/12 px-2 py-1 text-[10px] font-semibold text-brand-100">
              Beta
            </span>
          ) : null}
        </div>
        <p className={cn("text-mist-300", compact ? "text-[11px]" : "text-xs")}>سوق الأفكار • أفكار قابلة للبيع والتنفيذ</p>
      </div>
    </div>
  );
}
