import { MotionReveal } from "@/components/motion/reveal";

export function PageIntro({
  badge,
  title,
  description,
  aside,
}: {
  badge: string;
  title: string;
  description: string;
  aside?: React.ReactNode;
}) {
  return (
    <MotionReveal>
      <section className="panel grid-fade relative overflow-hidden p-7 lg:grid-cols-[1fr_320px] lg:p-8">
        <div className="motion-float absolute -right-10 top-10 h-28 w-28 rounded-full bg-brand-400/10 blur-3xl" />
        <div className="motion-float-slow absolute bottom-4 left-6 h-24 w-24 rounded-full bg-amber-300/10 blur-3xl" />

        <div className="relative z-10 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div>
            <span className="pill">{badge}</span>
            <h1 className="mt-5 max-w-4xl text-4xl font-black leading-[1.25] text-white sm:text-5xl">{title}</h1>
            <p className="mt-5 max-w-3xl text-base leading-8 text-mist-200">{description}</p>
          </div>

          {aside ? (
            <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5 shadow-[inset_0_1px_0_rgba(255,255,255,0.05)]">
              {aside}
            </div>
          ) : null}
        </div>
      </section>
    </MotionReveal>
  );
}
