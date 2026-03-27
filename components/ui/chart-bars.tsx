import { MotionReveal } from "@/components/motion/reveal";
import { ChartPoint } from "@/types";

export function ChartBars({
  title,
  description,
  points,
}: {
  title: string;
  description: string;
  points: ChartPoint[];
}) {
  const maxValue = Math.max(...points.map((point) => point.value), 1);

  return (
    <MotionReveal className="h-full">
      <div className="panel h-full px-5 py-5">
        <div className="mb-6">
          <h3 className="text-lg font-bold text-white">{title}</h3>
          <p className="mt-1 text-sm text-mist-300">{description}</p>
        </div>
        <div className="space-y-4">
          {points.map((point, index) => (
            <div key={point.label} className="space-y-2">
              <div className="flex items-center justify-between text-sm text-mist-200">
                <span>{point.label}</span>
                <span>{point.value}</span>
              </div>
              <div className="h-3 rounded-full bg-white/5">
                <div
                  className="motion-bar h-3 rounded-full bg-gradient-to-l from-brand-400 to-brand-600"
                  style={{
                    width: `${(point.value / maxValue) * 100}%`,
                    animationDelay: `${index * 120}ms`,
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </MotionReveal>
  );
}
