import Link from "next/link";
import { cookies } from "next/headers";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ChartBars } from "@/components/ui/chart-bars";
import { EmptyState } from "@/components/ui/empty-state";
import { StatCard } from "@/components/ui/stat-card";
import { notifications } from "@/lib/data";
import { getIdeaBySlug } from "@/lib/data";
import { getDashboardNav } from "@/lib/dashboard-nav";
import { getPurchasedSlugsFromStore } from "@/lib/purchases";
import { Idea } from "@/types";
import {
  earningsChart,
  purchasesChart,
  userActivities,
  userDashboardMetrics,
  userPublishedIdeas,
} from "@/data/dashboard";

export default function DashboardPage() {
  const purchasedSlugs = getPurchasedSlugsFromStore(cookies());
  const purchasedIdeas = purchasedSlugs.map((slug) => getIdeaBySlug(slug)).filter((idea): idea is Idea => Boolean(idea));

  return (
    <DashboardShell
      badge="لوحة المستخدم"
      title="نظرة عامة على الحساب"
      subtitle="واجهة مختصرة تضع أهم المؤشرات والاختصارات في مكان واحد، مع تنقل جانبي يعمل بالكامل إلى الصفحات الفرعية."
      navItems={getDashboardNav("/dashboard")}
    >
      <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
        {userDashboardMetrics.map((metric) => (
          <StatCard key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartBars title="الأرباح التقديرية" description="قراءة سريعة لاتجاه النمو خلال الأشهر الأخيرة." points={earningsChart} />
        <ChartBars title="الاهتمام حسب التصنيف" description="أكثر أنواع الطلبات نشاطًا داخل الحساب." points={purchasesChart} />
      </div>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="panel p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-white">مشترياتي الأخيرة</h2>
              <p className="mt-2 text-sm leading-7 text-mist-300">آخر العناصر التي أصبح محتواها الكامل متاحًا لك.</p>
            </div>
            <Link href="/dashboard/purchases" className="secondary-button motion-button">
              كل المشتريات
            </Link>
          </div>

          {purchasedIdeas.length ? (
            <div className="grid gap-4 md:grid-cols-2">
              {purchasedIdeas.slice(0, 4).map((idea) => (
                <div key={idea.slug} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
                  <div className="mb-2 flex items-center gap-2">
                    <span className="rounded-full bg-emerald-500/12 px-2.5 py-1 text-[11px] font-semibold text-emerald-100">وصول كامل</span>
                    <span className="surface-chip">{idea.type}</span>
                  </div>
                  <h3 className="text-base font-bold text-white">{idea.title}</h3>
                  <p className="mt-2 text-sm leading-7 text-mist-300">{idea.shortDescription}</p>
                  <Link href={`/ideas/${idea.slug}?tab=full-content#idea-tabs`} className="premium-button motion-button mt-4 inline-flex">
                    فتح المحتوى الكامل
                  </Link>
                </div>
              ))}
            </div>
          ) : (
            <EmptyState
              title="لا توجد مشتريات بعد"
              description="بعد شراء أي فكرة ستظهر هنا مع اختصار مباشر لفتح المحتوى الكامل."
              action={
                <Link href="/ideas" className="premium-button motion-button">
                  استعرض الأفكار
                </Link>
              }
            />
          )}
        </div>

        <div className="panel p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-white">اختصارات سريعة</h2>
              <p className="mt-2 text-sm leading-7 text-mist-300">انتقل بسرعة إلى أكثر الأقسام استخدامًا.</p>
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <Link href="/dashboard/published" className="motion-card rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-bold text-white">أفكاري المنشورة</p>
              <p className="mt-2 text-sm leading-7 text-mist-300">{userPublishedIdeas.length} عروض معروضة أو قيد المراجعة.</p>
            </Link>
            <Link href="/dashboard/profile" className="motion-card rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-bold text-white">الملف الشخصي</p>
              <p className="mt-2 text-sm leading-7 text-mist-300">حدّث بياناتك وراجع إعدادات الحساب.</p>
            </Link>
            <Link href="/dashboard/verification" className="motion-card rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-bold text-white">حالة التوثيق</p>
              <p className="mt-2 text-sm leading-7 text-mist-300">تابع حالة المراجعة والمتطلبات المتبقية.</p>
            </Link>
            <Link href="/dashboard/notifications" className="motion-card rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-bold text-white">الإشعارات</p>
              <p className="mt-2 text-sm leading-7 text-mist-300">{notifications.length} إشعارات جاهزة للمراجعة.</p>
            </Link>
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="panel p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-white">أحدث النشاطات</h2>
              <p className="mt-2 text-sm leading-7 text-mist-300">ملخص قصير لما حدث مؤخرًا داخل حسابك.</p>
            </div>
            <Link href="/dashboard/activity" className="secondary-button motion-button">
              عرض الكل
            </Link>
          </div>

          <div className="space-y-4">
            {userActivities.slice(0, 3).map((activity) => (
              <div key={activity.title} className="motion-card rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                <p className="font-bold text-white">{activity.title}</p>
                <p className="mt-2 text-sm leading-7 text-mist-300">{activity.body}</p>
                <p className="mt-2 text-xs text-mist-400">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <div className="mb-5 flex items-center justify-between gap-3">
            <div>
              <h2 className="text-xl font-black text-white">المسارات المقترحة</h2>
              <p className="mt-2 text-sm leading-7 text-mist-300">تجول داخل أقسام المنصة من خلال خطوات قصيرة وواضحة.</p>
            </div>
          </div>

          <div className="space-y-3">
            <Link href="/ideas" className="motion-card block rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="font-bold text-white">استكشف السوق</p>
              <p className="mt-2 text-sm leading-7 text-mist-300">ابحث عن أفكار جديدة أو راجع الأفكار التي تناسبك.</p>
            </Link>
            <Link href="/sell" className="motion-card block rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="font-bold text-white">ابدأ أول عملية بيع</p>
              <p className="mt-2 text-sm leading-7 text-mist-300">انشر فكرة جديدة مع وصف واضح وخطة تنفيذ مقنعة.</p>
            </Link>
            <Link href="/feedback" className="motion-card block rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
              <p className="font-bold text-white">شاركنا رأيك</p>
              <p className="mt-2 text-sm leading-7 text-mist-300">أرسل اقتراحًا أو مشكلة لتحسين المنصة باستمرار.</p>
            </Link>
          </div>
        </div>
      </section>
    </DashboardShell>
  );
}
