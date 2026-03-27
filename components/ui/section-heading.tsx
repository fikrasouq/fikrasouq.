import { MotionReveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";

export function SectionHeading({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <MotionReveal className="mb-8">
      <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
        <div className="space-y-4">
          {eyebrow ? (
            <div className="flex items-center gap-3">
              <Badge tone="brand">{eyebrow}</Badge>
              <span className="hidden h-px w-20 bg-gradient-to-l from-brand-400/0 via-brand-400/60 to-transparent sm:block" />
            </div>
          ) : null}

          <div className="space-y-3">
            <h2 className="max-w-4xl text-3xl font-black leading-[1.35] text-white sm:text-4xl">{title}</h2>
            {description ? <p className="max-w-3xl text-sm leading-8 text-mist-300 sm:text-base">{description}</p> : null}
          </div>
        </div>

        {action ? <div className="shrink-0">{action}</div> : null}
      </div>
    </MotionReveal>
  );
}
