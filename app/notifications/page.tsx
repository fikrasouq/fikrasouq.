import { PageIntro } from "@/components/layout/page-intro";
import { notifications } from "@/lib/data";

export default function NotificationsPage() {
  return (
    <div className="shell mt-10 space-y-8">
      <PageIntro
        badge="الإشعارات"
        title="تابع تحديثات حسابك والفرص الجديدة"
        description="صفحة إشعارات مستقلة تعرض الحالات الجديدة والمهمة والمقروءة ضمن تصميم مرتب وغني بالمحتوى."
      />

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
    </div>
  );
}
