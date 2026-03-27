import { AdminActionButton } from "@/components/admin/admin-action-button";
import { AdminFeedbackPanel } from "@/components/admin/admin-feedback-panel";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ChartBars } from "@/components/ui/chart-bars";
import { StatCard } from "@/components/ui/stat-card";
import {
  adminGrowthChart,
  adminMetrics,
  adminPendingIdeas,
  adminRecentPurchases,
  adminReports,
  adminRevenueChart,
  adminUsersTable,
} from "@/data/dashboard";

const navItems = [
  { label: "نظرة عامة", active: true },
  { label: "المستخدمون الجدد" },
  { label: "المشتريات الأخيرة" },
  { label: "الأفكار المعلقة" },
  { label: "البلاغات" },
  { label: "التوثيق" },
  { label: "الإجراءات" },
];

export default function AdminPage() {
  return (
    <DashboardShell
      badge="لوحة الإدارة"
      title="إدارة سوق الأفكار"
      subtitle="واجهة إدارية كاملة ظاهريًا وتشغيليًا، تتضمن مؤشرات، رسومًا بيانية، جداول، وإجراءات تفاعلية واضحة بدل أزرار صامتة."
      navItems={navItems}
    >
      <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
        {adminMetrics.map((metric) => (
          <StatCard key={metric.label} metric={metric} />
        ))}
      </div>

      <div className="grid gap-6 xl:grid-cols-2">
        <ChartBars title="نمو التسجيلات" description="أرقام تجريبية توضح نشاط المنصة خلال الأسبوع." points={adminGrowthChart} />
        <ChartBars title="الإيرادات الشهرية" description="مقارنة مرئية بسيطة لأداء الإيرادات عبر الأشهر." points={adminRevenueChart} />
      </div>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th>الاسم</th>
                <th>الدور</th>
                <th>الانضمام</th>
                <th>الحالة</th>
                <th>عدد الأفكار</th>
              </tr>
            </thead>
            <tbody>
              {adminUsersTable.map((user) => (
                <tr key={user.name}>
                  <td>{user.name}</td>
                  <td>{user.role}</td>
                  <td>{user.joined}</td>
                  <td>{user.status}</td>
                  <td>{user.ideas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th>رقم الطلب</th>
                <th>العنصر</th>
                <th>المشتري</th>
                <th>البائع</th>
                <th>المبلغ</th>
                <th>الحالة</th>
              </tr>
            </thead>
            <tbody>
              {adminRecentPurchases.map((order) => (
                <tr key={order.id}>
                  <td>{order.id}</td>
                  <td>{order.item}</td>
                  <td>{order.buyer}</td>
                  <td>{order.seller}</td>
                  <td>{order.amount}</td>
                  <td>{order.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[1fr_1fr]">
        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th>الفكرة</th>
                <th>البائع</th>
                <th>التصنيف</th>
                <th>وقت الإرسال</th>
                <th>الحالة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {adminPendingIdeas.map((idea) => (
                <tr key={idea.title}>
                  <td>{idea.title}</td>
                  <td>{idea.seller}</td>
                  <td>{idea.category}</td>
                  <td>{idea.submittedAt}</td>
                  <td>{idea.status}</td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      <AdminActionButton
                        label="قبول الفكرة"
                        successMessage={`تم اعتماد "${idea.title}" ضمن المراجعة التجريبية.`}
                        className="motion-button rounded-full bg-emerald-500/15 px-3 py-1 text-xs text-emerald-100"
                      />
                      <AdminActionButton
                        label="رفض الفكرة"
                        successMessage={`تم تحديث "${idea.title}" إلى حالة مرفوضة داخل النسخة الحالية.`}
                        className="motion-button rounded-full bg-rose-500/15 px-3 py-1 text-xs text-rose-100"
                      />
                      <AdminActionButton
                        label="تمييز كفكرة مميزة"
                        successMessage={`تم تعليم "${idea.title}" كفكرة مميزة تجريبيًا.`}
                        className="motion-button rounded-full bg-brand-400/15 px-3 py-1 text-xs text-brand-100"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="table-shell">
          <table>
            <thead>
              <tr>
                <th>المحتوى</th>
                <th>سبب البلاغ</th>
                <th>المبلّغ</th>
                <th>التاريخ</th>
                <th>الخطورة</th>
                <th>الإجراءات</th>
              </tr>
            </thead>
            <tbody>
              {adminReports.map((report) => (
                <tr key={report.item}>
                  <td>{report.item}</td>
                  <td>{report.reason}</td>
                  <td>{report.reporter}</td>
                  <td>{report.date}</td>
                  <td>{report.severity}</td>
                  <td>
                    <div className="flex flex-wrap gap-2">
                      <AdminActionButton
                        label="تعليق البائع"
                        successMessage={`تم تسجيل تعليق البائع المرتبط بـ "${report.item}" ضمن الإجراءات التجريبية.`}
                        className="motion-button rounded-full border border-white/10 px-3 py-1 text-xs text-mist-100"
                      />
                      <AdminActionButton
                        label="توثيق البائع"
                        successMessage={`تم وضع البائع المرتبط بـ "${report.item}" ضمن قائمة التوثيق التجريبية.`}
                        className="motion-button rounded-full bg-brand-400/15 px-3 py-1 text-xs text-brand-100"
                      />
                      <AdminActionButton
                        label="رفض المحتوى"
                        successMessage={`تم تعليم "${report.item}" كمحتوى مرفوض داخل النسخة الحالية.`}
                        className="motion-button rounded-full bg-rose-500/15 px-3 py-1 text-xs text-rose-100"
                      />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      <AdminFeedbackPanel />
    </DashboardShell>
  );
}
