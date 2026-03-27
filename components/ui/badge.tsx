import { cn } from "@/lib/utils";

const tones = {
  brand: "border-brand-400/25 bg-brand-400/15 text-brand-100",
  success: "border-emerald-400/25 bg-emerald-400/15 text-emerald-100",
  rose: "border-rose-400/25 bg-rose-400/15 text-rose-100",
  neutral: "border-white/10 bg-white/10 text-mist-100",
};

export function Badge({
  children,
  tone = "neutral",
}: {
  children: React.ReactNode;
  tone?: keyof typeof tones;
}) {
  return (
    <span className={cn("inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium", tones[tone])}>
      {children}
    </span>
  );
}
