import Link from "next/link";
import { cookies } from "next/headers";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { EmptyState } from "@/components/ui/empty-state";
import { getIdeaBySlug } from "@/lib/data";
import { getDashboardNav } from "@/lib/dashboard-nav";
import { formatCurrency } from "@/lib/utils";
import { getPurchasedSlugsFromStore } from "@/lib/purchases";
import { Idea } from "@/types";

export default function DashboardPurchasesPage() {
  const purchasedSlugs = getPurchasedSlugsFromStore(cookies());
  const purchasedIdeas = purchasedSlugs.map((slug) => getIdeaBySlug(slug)).filter((idea): idea is Idea => Boolean(idea));

  return (
    <DashboardShell
      badge="مشترياتي"
      title="الأفكار التي أصبحت متاحة بالكامل"
      subtitle="كل عنصر هنا تم منحه حالة وصول كاملة بعد الشراء التجريبي، ويمكن فتحه مباشرة من أول ضغطة."
      navItems={getDashboardNav("/dashboard/purchases")}
    >
      {purchasedIdeas.length ? (
        <div className="grid gap-5 xl:grid-cols-2">
          {purchasedIdeas.map((idea) => (
            <div key={idea.slug} className="panel motion-card p-5">
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-semibold text-emerald-100">تم الشراء</span>
                    <span className="surface-chip">{idea.type}</span>
                  </div>
                  <h2 className="text-xl font-black text-white">{idea.title}</h2>
                  <p className="mt-3 text-sm leading-8 text-mist-300">{idea.shortDescription}</p>
                </div>
                <div className="text-left">
                  <p className="text-xs text-mist-400">القيمة</p>
                  <p className="mt-1 text-lg font-black text-white">{formatCurrency(idea.price)}</p>
                </div>
              </div>

              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                <div className="rounded-[1.4rem] bg-white/5 p-4">
                  <p className="text-xs text-mist-400">الصعوبة</p>
                  <p className="mt-1 font-semibold text-white">{idea.difficulty}</p>
                </div>
                <div className="rounded-[1.4rem] bg-white/5 p-4">
                  <p className="text-xs text-mist-400">الميزانية</p>
                  <p className="mt-1 font-semibold text-white">{idea.startingBudget}</p>
                </div>
                <div className="rounded-[1.4rem] bg-white/5 p-4">
                  <p className="text-xs text-mist-400">الحالة</p>
                  <p className="mt-1 font-semibold text-white">وصول كامل</p>
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
          description="بعد إتمام أي عملية شراء ستظهر الفكرة هنا مع زر مباشر لفتح المحتوى الكامل."
          action={
            <Link href="/ideas" className="premium-button motion-button">
              استعرض الأفكار
            </Link>
          }
        />
      )}
    </DashboardShell>
  );
}
