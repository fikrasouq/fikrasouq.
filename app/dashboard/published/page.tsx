import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { EmptyState } from "@/components/ui/empty-state";
import { getDashboardNav } from "@/lib/dashboard-nav";
import { userPublishedIdeas } from "@/data/dashboard";

export default function DashboardPublishedPage() {
  return (
    <DashboardShell
      badge="أفكاري المنشورة"
      title="العروض التي نشرتها داخل المنصة"
      subtitle="راجع أداء الأفكار الحالية، وحالة كل عرض، ثم انتقل إلى إضافة فكرة جديدة عند الحاجة."
      navItems={getDashboardNav("/dashboard/published")}
    >
      {userPublishedIdeas.length ? (
        <div className="space-y-4">
          {userPublishedIdeas.map((item) => (
            <div key={item.title} className="panel motion-card p-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <div className="mb-2 flex flex-wrap items-center gap-2">
                    <span className="surface-chip">{item.status}</span>
                  </div>
                  <h2 className="text-xl font-black text-white">{item.title}</h2>
                  <p className="mt-3 text-sm leading-7 text-mist-300">متابعة سريعة لحالة العرض وأدائه داخل السوق الحالي.</p>
                </div>

                <div className="grid gap-3 sm:grid-cols-3">
                  <div className="rounded-[1.4rem] bg-white/5 p-4 text-center">
                    <p className="text-xs text-mist-400">المشاهدات</p>
                    <p className="mt-1 text-lg font-bold text-white">{item.views}</p>
                  </div>
                  <div className="rounded-[1.4rem] bg-white/5 p-4 text-center">
                    <p className="text-xs text-mist-400">المبيعات</p>
                    <p className="mt-1 text-lg font-bold text-white">{item.sales}</p>
                  </div>
                  <div className="rounded-[1.4rem] bg-white/5 p-4 text-center">
                    <p className="text-xs text-mist-400">الأرباح</p>
                    <p className="mt-1 text-lg font-bold text-white">{item.earnings}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <EmptyState
          title="لم تقم بنشر أي فكرة بعد"
          description="ابدأ أول عملية بيع عبر نشر فكرة جديدة داخل السوق."
          action={
            <Link href="/sell" className="premium-button motion-button">
              أضف فكرتك الآن
            </Link>
          }
        />
      )}
    </DashboardShell>
  );
}
