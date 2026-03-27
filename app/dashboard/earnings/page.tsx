import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ChartBars } from "@/components/ui/chart-bars";
import { StatCard } from "@/components/ui/stat-card";
import { getDashboardNav } from "@/lib/dashboard-nav";
import { earningsChart, userDashboardMetrics } from "@/data/dashboard";

export default function DashboardEarningsPage() {
  return (
    <DashboardShell
      badge="الأرباح"
      title="ملخص الأرباح والأداء"
      subtitle="قراءة مركزة على المؤشرات المالية واتجاه النمو، مع تصميم أخف وأسهل للمراجعة."
      navItems={getDashboardNav("/dashboard/earnings")}
    >
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {userDashboardMetrics.slice(0, 3).map((metric) => (
          <StatCard key={metric.label} metric={metric} />
        ))}
      </div>

      <ChartBars title="اتجاه الأرباح" description="رسم بياني مختصر يوضح التغير عبر الأشهر الأخيرة." points={earningsChart} />

      <section className="grid gap-5 xl:grid-cols-3">
        <div className="panel p-5">
          <p className="text-sm text-mist-400">أفضل شهر</p>
          <p className="mt-2 text-3xl font-black text-white">مارس</p>
          <p className="mt-3 text-sm leading-7 text-mist-300">حقق أعلى قيمة تجريبية داخل الفترة الحالية.</p>
        </div>
        <div className="panel p-5">
          <p className="text-sm text-mist-400">متوسط النمو</p>
          <p className="mt-2 text-3xl font-black text-white">+18%</p>
          <p className="mt-3 text-sm leading-7 text-mist-300">مؤشر سريع يساعدك على قراءة الاتجاه العام بدل الغرق في التفاصيل.</p>
        </div>
        <div className="panel p-5">
          <p className="text-sm text-mist-400">الحالة الحالية</p>
          <p className="mt-2 text-3xl font-black text-white">مستقرة</p>
          <p className="mt-3 text-sm leading-7 text-mist-300">الصفحة جاهزة لاحقًا للربط بتقارير فعلية أو تنزيل كشف أرباح.</p>
        </div>
      </section>
    </DashboardShell>
  );
}
