import Link from "next/link";
import { MotionReveal } from "@/components/motion/reveal";

type NavItem = {
  href?: string;
  label: string;
  active?: boolean;
};

export function DashboardShell({
  title,
  subtitle,
  badge,
  navItems,
  children,
}: {
  title: string;
  subtitle: string;
  badge: string;
  navItems: NavItem[];
  children: React.ReactNode;
}) {
  return (
    <div className="shell mt-10">
      <div className="grid gap-6 xl:grid-cols-[300px_minmax(0,1fr)]">
        <MotionReveal>
          <aside className="panel h-fit space-y-6 p-5 xl:sticky xl:top-24">
            <div className="rounded-[1.8rem] border border-white/10 bg-gradient-to-bl from-brand-400/12 via-white/5 to-transparent p-5">
              <span className="pill">{badge}</span>
              <h1 className="mt-4 text-2xl font-black text-white">{title}</h1>
              <p className="mt-3 text-sm leading-7 text-mist-300">{subtitle}</p>

              <div className="mt-5 rounded-[1.4rem] border border-white/8 bg-white/5 p-4">
                <p className="text-xs text-mist-400">حالة الواجهة</p>
                <p className="mt-2 text-sm font-semibold text-white">جاهزة للعرض ومبنية بأسلوب SaaS عربي حديث</p>
              </div>
            </div>

            <nav className="space-y-2">
              <p className="px-2 text-xs font-semibold text-mist-400">الأقسام</p>
              {navItems.map((item) =>
                item.href ? (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={`block rounded-[1.4rem] px-4 py-3 text-sm transition ${
                      item.active
                        ? "border border-brand-400/20 bg-brand-400/12 text-brand-100"
                        : "border border-transparent text-mist-200 hover:border-white/10 hover:bg-white/8 hover:text-white"
                    }`}
                  >
                    {item.label}
                  </Link>
                ) : (
                  <div
                    key={item.label}
                    className={`rounded-[1.4rem] px-4 py-3 text-sm ${
                      item.active ? "border border-brand-400/20 bg-brand-400/12 text-brand-100" : "text-mist-200"
                    }`}
                  >
                    {item.label}
                  </div>
                ),
              )}
            </nav>
          </aside>
        </MotionReveal>

        <MotionReveal delay={90} className="space-y-6">
          {children}
        </MotionReveal>
      </div>
    </div>
  );
}
