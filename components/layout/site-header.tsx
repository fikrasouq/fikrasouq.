import Link from "next/link";
import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { BrandMark } from "@/components/ui/brand-mark";

const navItems = [
  { href: "/", label: "الرئيسية" },
  { href: "/ideas", label: "الأفكار" },
  { href: "/sell", label: "بع فكرتك" },
  { href: "/pricing", label: "الأسعار" },
  { href: "/help", label: "المساعدة" },
  { href: "/reviews", label: "التقييمات" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/6 bg-[rgba(6,9,14,0.72)] backdrop-blur-xl">
      <div className="shell py-4">
        <div className="flex items-center justify-between gap-4 rounded-[1.75rem] border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-3 shadow-[0_20px_48px_rgba(0,0,0,0.26)]">
          <div className="flex items-center gap-3">
            <Link href="/" className="hidden shrink-0 sm:flex">
              <BrandMark />
            </Link>

            <Link href="/" className="sm:hidden">
              <BrandMark compact />
            </Link>
          </div>

          <nav className="hidden flex-1 items-center justify-center gap-1 text-sm text-mist-200 lg:flex">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="rounded-full border border-transparent px-4 py-2.5 transition hover:border-brand-400/18 hover:bg-brand-400/10 hover:text-white"
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="hidden items-center gap-2 lg:flex">
            <ThemeToggle />
            <Link
              href="/auth/login"
              className="motion-button rounded-full border border-white/12 px-4 py-2.5 text-sm text-mist-100 transition hover:border-brand-400/40 hover:text-white"
            >
              تسجيل الدخول
            </Link>
            <Link
              href="/dashboard"
              className="motion-button rounded-full border border-brand-400/30 bg-brand-400/12 px-4 py-2.5 text-sm font-medium text-brand-100 transition hover:bg-brand-400/18"
            >
              لوحة المستخدم
            </Link>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <ThemeToggle />
            <MobileNavDrawer navItems={navItems} />
          </div>
        </div>
      </div>
    </header>
  );
}
