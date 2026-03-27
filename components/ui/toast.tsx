import { cn } from "@/lib/utils";

const toneStyles = {
  success: "border-emerald-400/25 bg-emerald-500/12 text-emerald-100",
  error: "border-rose-400/25 bg-rose-500/12 text-rose-100",
  info: "border-brand-400/25 bg-brand-400/12 text-brand-100",
};

export function Toast({
  title,
  message,
  tone = "info",
  onClose,
}: {
  title: string;
  message: string;
  tone?: keyof typeof toneStyles;
  onClose: () => void;
}) {
  return (
    <div className="pointer-events-none fixed left-4 top-24 z-50 w-[min(92vw,24rem)] sm:left-6">
      <div className={cn("pointer-events-auto rounded-[1.8rem] border px-5 py-4 shadow-[0_24px_60px_rgba(0,0,0,0.24)] backdrop-blur-xl", toneStyles[tone])}>
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm font-bold">{title}</p>
            <p className="mt-2 text-sm leading-7 opacity-95">{message}</p>
          </div>
          <button type="button" onClick={onClose} className="motion-button rounded-full border border-white/10 px-2.5 py-1 text-xs text-white/90">
            إغلاق
          </button>
        </div>
      </div>
    </div>
  );
}
