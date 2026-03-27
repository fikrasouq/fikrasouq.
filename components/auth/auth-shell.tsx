import { MotionReveal } from "@/components/motion/reveal";

export function AuthShell({
  eyebrow,
  title,
  description,
  sideTitle,
  sideItems,
  children,
}: {
  eyebrow: string;
  title: string;
  description: string;
  sideTitle: string;
  sideItems: string[];
  children: React.ReactNode;
}) {
  return (
    <div className="shell mt-10">
      <div className="grid gap-6 xl:grid-cols-[0.92fr_1.08fr]">
        <MotionReveal>
          <aside className="panel grid-fade relative overflow-hidden p-7">
            <div className="motion-float absolute -right-10 top-12 h-28 w-28 rounded-full bg-brand-400/12 blur-3xl" />
            <div className="relative z-10">
              <span className="pill">{eyebrow}</span>
              <h1 className="mt-5 text-4xl font-black leading-[1.25] text-white">{title}</h1>
              <p className="mt-4 max-w-xl text-base leading-8 text-mist-200">{description}</p>

              <div className="mt-8 rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
                <h2 className="text-lg font-bold text-white">{sideTitle}</h2>
                <div className="mt-4 space-y-3">
                  {sideItems.map((item, index) => (
                    <div key={item} className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-4 text-sm leading-7 text-mist-100">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-brand-400/12 text-xs font-black text-brand-100">
                          0{index + 1}
                        </div>
                        <span className="text-xs text-mist-400">ميزة أساسية</span>
                      </div>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </MotionReveal>

        <MotionReveal delay={100}>
          <div className="panel p-7">{children}</div>
        </MotionReveal>
      </div>
    </div>
  );
}
