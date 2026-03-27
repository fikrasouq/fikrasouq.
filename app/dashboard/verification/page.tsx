import Link from "next/link";
import { DashboardShell } from "@/components/layout/dashboard-shell";
import { EmptyState } from "@/components/ui/empty-state";
import { getDashboardNav } from "@/lib/dashboard-nav";

const verificationSteps = [
  { title: "توثيق الهوية", status: "قيد المراجعة", note: "تم استلام المستندات الأساسية بنجاح." },
  { title: "بيانات الحساب البنكي", status: "متبقي", note: "ما زلنا بانتظار تأكيد بيانات التحويل." },
  { title: "اعتماد الملف", status: "لاحق", note: "سيتم تحديث الحالة تلقائيًا بعد اكتمال المتطلبات." },
];

export default function DashboardVerificationPage() {
  return (
    <DashboardShell
      badge="حالة التوثيق"
      title="متابعة توثيق الحساب"
      subtitle="واجهة أوضح لمراحل التوثيق حتى يعرف المستخدم ما اكتمل وما الذي ما زال بانتظاره."
      navItems={getDashboardNav("/dashboard/verification")}
    >
      <section className="grid gap-5 lg:grid-cols-3">
        {verificationSteps.map((step, index) => (
          <div key={step.title} className="panel p-5">
            <div className="flex items-center justify-between gap-3">
              <span className="pill">0{index + 1}</span>
              <span className="surface-chip">{step.status}</span>
            </div>
            <h2 className="mt-4 text-xl font-black text-white">{step.title}</h2>
            <p className="mt-3 text-sm leading-7 text-mist-300">{step.note}</p>
          </div>
        ))}
      </section>

      <EmptyState
        title="هل تحتاج إلى مراجعة سريعة للحساب؟"
        description="يمكنك العودة إلى الملف الشخصي أو التواصل معنا إذا احتجت تعديل بيانات مرتبطة بالتوثيق."
        action={
          <div className="flex flex-wrap justify-center gap-3">
            <Link href="/dashboard/profile" className="secondary-button motion-button">
              تعديل الملف الشخصي
            </Link>
            <Link href="/contact" className="premium-button motion-button">
              تواصل معنا
            </Link>
          </div>
        }
      />
    </DashboardShell>
  );
}
