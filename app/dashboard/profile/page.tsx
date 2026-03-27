import { DashboardShell } from "@/components/layout/dashboard-shell";
import { ProfileSettingsForm } from "@/components/dashboard/profile-settings-form";
import { getDashboardNav } from "@/lib/dashboard-nav";

export default function DashboardProfilePage() {
  return (
    <DashboardShell
      badge="تعديل الملف الشخصي"
      title="حدّث بيانات الحساب"
      subtitle="نموذج يعمل فعليًا ويحفظ بياناتك محليًا داخل النسخة الحالية مع رسائل نجاح واضحة."
      navItems={getDashboardNav("/dashboard/profile")}
    >
      <section className="panel p-5">
        <h2 className="text-xl font-black text-white">البيانات الأساسية</h2>
        <p className="mt-2 text-sm leading-7 text-mist-300">يمكنك تحديث الاسم والبريد والمدينة والنبذة الشخصية من هنا.</p>
        <ProfileSettingsForm />
      </section>
    </DashboardShell>
  );
}
