import Link from "next/link";
import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { BrandMark } from "@/components/ui/brand-mark";

const navItems = [
  { href: "/", label: "الرئيسية" },
  { href: "/ideas", label: "تصفح الأفكار" },
  { href: "/sellers/noura-alharbi", label: "البائعون" },
  { href: "/sell", label: "بع فكرتك" },
  { href: "/pricing", label: "الأسعار والعمولات" },
  { href: "/help", label: "مركز المساعدة" },
];

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-40 border-b border-white/6 bg-[rgba(6,9,14,0.64)] backdrop-blur-xl">
      <div className="shell py-4">
        <div className="flex items-center justify-between gap-4 rounded-[2rem] border border-white/10 bg-[rgba(255,255,255,0.04)] px-4 py-3 shadow-[0_22px_55px_rgba(0,0,0,0.28)]">
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

          <div className="hidden items-center gap-3 lg:flex">
            <ThemeToggle />
            <Link href="/auth/login" className="motion-button rounded-full border border-white/12 px-4 py-2.5 text-sm text-mist-100 transition hover:border-brand-400/40 hover:text-white">
              تسجيل الدخول
            </Link>
            <Link href="/dashboard" className="motion-button rounded-full border border-brand-400/30 bg-brand-400/12 px-4 py-2.5 text-sm font-medium text-brand-100 transition hover:bg-brand-400/18">
              لوحة المستخدم
            </Link>
            <Link href="/sell" className="motion-button rounded-full bg-gradient-to-l from-brand-400 via-brand-500 to-brand-700 px-5 py-2.5 text-sm font-bold text-ink-950 transition hover:opacity-95">
              بع فكرتك
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
