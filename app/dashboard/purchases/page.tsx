import Link from "next/link";
import { cookies } from "next/headers";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { EmptyState } from "@/components/ui/empty-state";
import { getIdeaBySlug } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { getPurchasedSlugsFromStore } from "@/lib/purchases";
import { Idea } from "@/types";

const navItems = [
  { label: "نظرة عامة", href: "/dashboard" },
  { label: "مشترياتي", href: "/dashboard/purchases", active: true },
  { label: "أفكاري المنشورة" },
  { label: "الأرباح" },
  { label: "المفضلة" },
  { label: "الإشعارات" },
  { label: "النشاط الأخير" },
  { label: "تعديل الملف الشخصي" },
  { label: "حالة التوثيق" },
];

export default function DashboardPurchasesPage() {
  const purchasedSlugs = getPurchasedSlugsFromStore(cookies());
  const purchasedIdeas = purchasedSlugs.map((slug) => getIdeaBySlug(slug)).filter((idea): idea is Idea => Boolean(idea));

  return (
    <DashboardShell
      badge="مشترياتي"
      title="الوصول الكامل للأفكار التي تم شراؤها"
      subtitle="كل فكرة تظهر هنا مُنحت حالة purchased وأصبح محتواها الكامل متاحًا من صفحة الفكرة نفسها."
      navItems={navItems}
    >
      {purchasedIdeas.length ? (
        <div className="grid gap-5 xl:grid-cols-2">
          {purchasedIdeas.map((idea) => (
            <div key={idea.slug} className="panel motion-card p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-semibold text-emerald-100">تم الشراء</span>
                    <span className="surface-chip">وصول كامل</span>
                  </div>
                  <h2 className="text-xl font-black text-white">{idea.title}</h2>
                  <p className="mt-3 text-sm leading-8 text-mist-300">{idea.shortDescription}</p>
                </div>
                <div className="text-left">
                  <p className="text-xs text-mist-400">السعر المدفوع</p>
                  <p className="mt-1 text-lg font-black text-white">{formatCurrency(idea.price)}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.4rem] bg-white/5 p-4">
                  <p className="text-xs text-mist-400">نوع العرض</p>
                  <p className="mt-1 font-semibold text-white">{idea.type}</p>
                </div>
                <div className="rounded-[1.4rem] bg-white/5 p-4">
                  <p className="text-xs text-mist-400">الصعوبة</p>
                  <p className="mt-1 font-semibold text-white">{idea.difficulty}</p>
                </div>
                <div className="rounded-[1.4rem] bg-white/5 p-4">
                  <p className="text-xs text-mist-400">الوصول</p>
                  <p className="mt-1 font-semibold text-white">مفتوح بالكامل</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link href={`/ideas/${idea.slug}?tab=full-content#idea-tabs`} className="premium-button motion-button">
                  فتح المحتوى الكامل
                </Link>
                <Link href="/ideas" className="secondary-button motion-button">
                  شراء فكرة أخرى
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="لا توجد مشتريات بعد"
          description="بعد إتمام الدفع التجريبي لأي فكرة ستظهر هنا مع إمكانية فتح المحتوى الكامل مباشرة."
          action={
            <Link href="/ideas" className="premium-button motion-button">
              استعرض الأفكار وابدأ الشراء
            </Link>
          }
        />
      )}
    </DashboardShell>
  );
}
