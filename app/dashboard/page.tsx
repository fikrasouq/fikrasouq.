import Link from "next/link";
import { cookies } from "next/headers";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ChartBars } from "@/components/ui/chart-bars";
import { EmptyState } from "@/components/ui/empty-state";
import { StatCard } from "@/components/ui/stat-card";
import { notifications } from "@/lib/data";
import { getIdeaBySlug } from "@/lib/data";
import { getPurchasedSlugsFromStore } from "@/lib/purchases";
import { Idea } from "@/types";
import {
  earningsChart,
  purchasesChart,
  userActivities,
  userDashboardMetrics,
  userOrders,
  userPublishedIdeas,
} from "@/data/dashboard";

const navItems = [
  { label: "نظرة عامة", href: "/dashboard", active: true },
  { label: "مشترياتي", href: "/dashboard/purchases" },
  { label: "أفكاري المنشورة" },
  { label: "الأرباح" },
  { label: "المفضلة" },
  { label: "الإشعارات" },
  { label: "النشاط الأخير" },
  { label: "تعديل الملف الشخصي" },
  { label: "حالة التوثيق" },
];

export default function DashboardPage() {
  const purchasedSlugs = getPurchasedSlugsFromStore(cookies());
  const purchasedIdeas = purchasedSlugs.map((slug) => getIdeaBySlug(slug)).filter((idea): idea is Idea => Boolean(idea));

  return (
    <DashboardShell
      badge="لوحة المستخدم"
      title="مساحة إدارة الحساب"
      subtitle="لوحة تربط حالة الشراء التجريبية بإمكانية الوصول الكامل للمحتوى، مع صفحة مشتريات مخصصة ومسار واضح للانتقال إليها."
      navItems={navItems}
    >
      <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-4">
        {userDashboardMetrics.map((metric) => (
          <StatCard key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartBars title="الأرباح التقديرية" description="رسم بياني تجريبي يوضح نمو الدخل خلال الأشهر الأخيرة." points={earningsChart} />
        <ChartBars title="التوزيع حسب التصنيف" description="أكثر أنواع المشتريات أو الاهتمامات نشاطًا داخل الحساب." points={purchasesChart} />
      </div>

      <section className="panel p-5">
        <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-black text-white">مشترياتي</h2>
            <p className="mt-2 text-sm leading-7 text-mist-300">الفِكر التي تم فتح محتواها الكامل بعد نجاح الدفع التجريبي.</p>
          </div>
          <Link href="/dashboard/purchases" className="secondary-button motion-button">
            فتح صفحة مشترياتي
          </Link>
        </div>

        {purchasedIdeas.length ? (
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {purchasedIdeas.map((idea) => (
              <div key={idea.slug} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-full bg-emerald-500/12 px-3 py-1 text-xs font-semibold text-emerald-100">وصول كامل</span>
                  <span className="surface-chip">{idea.type}</span>
                </div>
                <h3 className="text-lg font-bold text-white">{idea.title}</h3>
                <p className="mt-3 text-sm leading-8 text-mist-300">{idea.shortDescription}</p>
                <Link href={`/ideas/${idea.slug}`} className="premium-button motion-button mt-5 inline-flex">
                  فتح المحتوى الكامل
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            title="لا توجد مشتريات بعد"
            description="بعد شراء أي فكرة ستظهر هنا مباشرة مع صلاحية فتح المحتوى الكامل."
            action={
              <Link href="/ideas" className="premium-button motion-button">
                استعرض الأفكار
              </Link>
            }
          />
        )}
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th>رقم الطلب</th>
                <th>العنصر</th>
                <th>البائع</th>
                <th>التاريخ</th>
                <th>المبلغ</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {userOrders.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.item}</td>
                  <td>{order.seller}</td>
                  <td>{order.date}</td>
                  <td>{order.amount}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="panel p-5">
          <h2 className="text-xl font-bold text-white">الإشعارات</h2>
          <div className="mt-4 space-y-3">
            {notifications.slice(0, 4).map((item) => (
              <div key={item.id} className="motion-card rounded-2xl border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <p className="font-bold text-white">{item.title}</p>
                  <span className="pill">{item.status}</span>
                </div>
                <p className="mt-2 text-sm leading-7 text-mist-300">{item.body}</p>
                <p className="mt-2 text-xs text-mist-400">{item.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <div className="panel p-5">
          <div className="mb-5 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">أفكاري المنشورة</h2>
            <Link href="/sell" className="secondary-button motion-button">
              أضف فكرة جديدة
            </Link>
          </div>
          <div className="space-y-4">
            {userPublishedIdeas.map((item) => (
              <div key={item.title} className="motion-card rounded-3xl border border-white/10 bg-white/5 p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="text-lg font-bold text-white">{item.title}</p>
                    <p className="mt-2 text-sm text-mist-300">الحالة الحالية: {item.status}</p>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-center text-sm">
                    <div className="rounded-2xl bg-white/5 p-3">
                      <p className="text-mist-400">المشاهدات</p>
                      <p className="mt-1 font-bold text-white">{item.views}</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-3">
                      <p className="text-mist-400">المبيعات</p>
                      <p className="mt-1 font-bold text-white">{item.sales}</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-3">
                      <p className="text-mist-400">الأرباح</p>
                      <p className="mt-1 font-bold text-white">{item.earnings}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <h2 className="text-xl font-bold text-white">النشاط الأخير</h2>
          <div className="mt-4 space-y-4">
            {userActivities.map((activity) => (
              <div key={activity.title} className="motion-card rounded-2xl bg-white/5 p-4">
                <p className="font-bold text-white">{activity.title}</p>
                <p className="mt-2 text-sm leading-7 text-mist-300">{activity.body}</p>
                <p className="mt-2 text-xs text-mist-400">{activity.time}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.9fr_1.1fr]">
        <div className="panel p-5">
          <h2 className="text-xl font-bold text-white">تعديل الملف الشخصي</h2>
          <form className="mt-5 space-y-4">
            <input className="input-field" defaultValue="علي الحربي" placeholder="الاسم الكامل" />
            <input className="input-field" defaultValue="ali@example.com" placeholder="البريد الإلكتروني" />
            <input className="input-field" defaultValue="الرياض" placeholder="المدينة" />
            <textarea className="textarea-field" defaultValue="أهتم بشراء الأفكار الرقمية وباقات التنفيذ السريعة." />
            <button type="button" className="motion-button rounded-full bg-gradient-to-l from-brand-400 to-brand-600 px-6 py-3 text-sm font-bold text-ink-950">
              حفظ التغييرات
            </button>
          </form>
        </div>

        <div className="space-y-6">
          <div className="panel p-5">
            <h2 className="text-xl font-bold text-white">حالة التوثيق</h2>
            <div className="mt-4 rounded-3xl border border-brand-400/20 bg-brand-400/10 p-5">
              <p className="text-lg font-bold text-white">قيد المراجعة</p>
              <p className="mt-3 text-sm leading-7 text-mist-200">
                تم رفع وثيقة العمل الحر، والمتبقي هو تأكيد الهوية ومراجعة بيانات الحساب البنكي.
              </p>
            </div>
          </div>

          <EmptyState
            title="الوصول الكامل يعمل عبر حالة الشراء"
            description="أي فكرة تنتقل إلى purchased ستُفتح هنا وفي صفحة الفكرة نفسها، ما يجعل منطق الحماية جاهزًا للربط لاحقًا ببوابة دفع حقيقية."
            action={
              <Link href="/dashboard/purchases" className="secondary-button motion-button">
                راجع مشترياتي
              </Link>
            }
          />
        </div>
      </section>
    </DashboardShell>
  );
}
