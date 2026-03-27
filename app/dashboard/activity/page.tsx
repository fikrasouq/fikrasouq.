import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getDashboardNav } from "@/lib/dashboard-nav";
import { userActivities } from "@/data/dashboard";

export default function DashboardActivityPage() {
  return (
    <DashboardShell
      badge="النشاط الأخير"
      title="كل ما حدث مؤخرًا داخل حسابك"
      subtitle="صفحة مستقلة للنشاطات تساعدك على متابعة الحركة بدون ازدحام صفحة النظرة العامة."
      navItems={getDashboardNav("/dashboard/activity")}
    >
      <section className="space-y-4">
        {userActivities.map((activity) => (
          <div key={activity.title} className="panel p-5">
            <p className="text-lg font-bold text-white">{activity.title}</p>
            <p className="mt-3 text-sm leading-8 text-mist-300">{activity.body}</p>
            <p className="mt-2 text-xs text-mist-400">{activity.time}</p>
          </div>
        ))}
      </section>
    </DashboardShell>
  );
}
