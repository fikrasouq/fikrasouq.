import { MotionReveal } from "@/components/motion/reveal";
import { CountUpValue } from "@/components/ui/count-up-value";
import { Metric } from "@/types";
import { cn } from "@/lib/utils";

const changeTone = {
  positive: "text-emerald-200",
  neutral: "text-mist-200",
  alert: "text-rose-200",
};

export function StatCard({ metric }: { metric: Metric }) {
  return (
    <MotionReveal className="h-full">
      <div className="panel motion-card flex h-full flex-col gap-4 px-5 py-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm text-mist-300">{metric.label}</p>
          <span className="h-2.5 w-2.5 rounded-full bg-brand-400 shadow-[0_0_18px_rgba(248,171,50,0.55)]" />
        </div>

        <div className="flex items-end justify-between gap-4">
          <p className="text-2xl font-black tracking-tight text-white sm:text-[1.9rem]">
            <CountUpValue value={metric.value} />
          </p>
          <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] font-medium text-mist-200">مؤشر حي</div>
        </div>

        <p className={cn("text-xs font-medium", changeTone[metric.tone])}>{metric.change}</p>
      </div>
    </MotionReveal>
  );
}
