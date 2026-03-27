import { DashboardShell } from "@/components/layout/dashboard-shell";
import { getDashboardNav } from "@/lib/dashboard-nav";
import { notifications } from "@/lib/data";

export default function DashboardNotificationsPage() {
  return (
    <DashboardShell
      badge="الإشعارات"
      title="آخر التحديثات داخل حسابك"
      subtitle="مساحة مركزة للإشعارات المهمة بدل إبقائها متناثرة بين الصفحات المختلفة."
      navItems={getDashboardNav("/dashboard/notifications")}
    >
      <section className="space-y-4">
        {notifications.map((item) => (
          <div key={item.id} className="panel p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h2 className="text-lg font-bold text-white">{item.title}</h2>
              <span className="pill">{item.status}</span>
            </div>
            <p className="mt-3 text-sm leading-7 text-mist-300">{item.body}</p>
            <p className="mt-2 text-xs text-mist-400">{item.time}</p>
          </div>
        ))}
      </section>
    </DashboardShell>
  );
}
