import Link from "next/link";
import { BrandMark } from "@/components/ui/brand-mark";

const footerColumns = [
  {
    title: "المنصة",
    links: [
      { href: "/about", label: "من نحن" },
      { href: "/pricing", label: "الأسعار والعمولات" },
      { href: "/trust-safety", label: "الثقة والأمان" },
      { href: "/terms", label: "الشروط والأحكام" },
    ],
  },
  {
    title: "التصفح",
    links: [
      { href: "/ideas", label: "استعرض الأفكار" },
      { href: "/favorites", label: "المفضلة" },
      { href: "/cart", label: "السلة" },
      { href: "/notifications", label: "الإشعارات" },
    ],
  },
  {
    title: "الحساب",
    links: [
      { href: "/dashboard", label: "لوحة المستخدم" },
      { href: "/admin", label: "لوحة الإدارة" },
      { href: "/auth/register", label: "إنشاء حساب" },
      { href: "/auth/forgot-password", label: "استعادة كلمة المرور" },
    ],
  },
  {
    title: "الدعم",
    links: [
      { href: "/help", label: "مركز المساعدة" },
      { href: "/contact", label: "تواصل معنا" },
      { href: "/checkout", label: "إتمام الشراء" },
      { href: "/sell", label: "إرسال فكرة جديدة" },
    ],
  },
];

export function SiteFooter() {
  return (
    <footer className="relative z-10 mt-24 border-t border-white/8">
      <div className="shell py-14">
        <div className="grid gap-6 lg:grid-cols-[1.25fr_1fr]">
          <div className="panel relative overflow-hidden px-6 py-7">
            <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-brand-400/60 to-transparent" />
            <div className="motion-float absolute -left-10 top-14 h-28 w-28 rounded-full bg-brand-400/10 blur-3xl" />
            <div className="relative space-y-5">
              <BrandMark />
              <p className="max-w-xl text-sm leading-8 text-mist-300">
                FikraSouq هو تصور لمنصة startup عربية ثقيلة بصريًا لبيع وشراء الأفكار وباقات التنفيذ الجاهزة، مع
                محتوى عربي غني وتجربة أقرب إلى منتج حقيقي قيد الإطلاق.
              </p>
              <div className="flex flex-wrap gap-2 text-xs">
                <span className="pill">هوية داكنة فاخرة</span>
                <span className="pill">RTL كامل</span>
                <span className="pill">Marketplace عربي</span>
              </div>
              <div className="rounded-[1.7rem] border border-white/10 bg-white/5 p-4">
                <p className="text-sm font-semibold text-white">انضم إلى القائمة المبكرة</p>
                <div className="mt-3 flex flex-col gap-3 sm:flex-row">
                  <input className="input-field flex-1" placeholder="بريدك الإلكتروني" />
                  <button type="button" className="motion-button rounded-full bg-gradient-to-l from-brand-400 via-brand-500 to-brand-700 px-5 py-3 text-sm font-bold text-ink-950">
                    اطلب الوصول المبكر
                  </button>
                </div>
              </div>
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {footerColumns.map((column) => (
              <div key={column.title} className="panel px-5 py-6">
                <h3 className="mb-4 text-sm font-bold text-white">{column.title}</h3>
                <div className="space-y-3 text-sm text-mist-300">
                  {column.links.map((link) => (
                    <Link key={link.href} href={link.href} className="block transition hover:text-white">
                      {link.label}
                    </Link>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-3 border-t border-white/8 pt-6 text-sm text-mist-400 lg:flex-row lg:items-center lg:justify-between">
          <p>© 2026 FikraSouq / سوق الأفكار. جميع الحقوق محفوظة.</p>
          <p>Next.js + TypeScript + Tailwind CSS • نسخة MVP عربية جاهزة للعرض</p>
        </div>
      </div>
    </footer>
  );
}
