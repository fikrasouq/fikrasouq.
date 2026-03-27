import { AuthShell } from "@/components/auth/auth-shell";
import { RegisterForm } from "@/components/auth/register-form";

const sideItems = [
  "أنشئ حساب مشتري أو بائع ضمن تجربة واحدة متكاملة.",
  "استعد للوصول إلى رفع أفكارك، المفضلة، والإحصائيات الشخصية.",
  "تهيئة عربية كاملة تدعم RTL في الحقول والعناصر والنماذج.",
];

export default function RegisterPage() {
  return (
    <AuthShell
      eyebrow="إنشاء حساب"
      title="ابدأ رحلتك داخل سوق الأفكار"
      description="صفحة تسجيل حديثة ومليئة بالتفاصيل لتجعل المنصة تبدو كمنتج حقيقي جاهز لاكتساب المستخدمين والبائعين."
      sideTitle="ماذا يتيح لك الحساب؟"
      sideItems={sideItems}
    >
      <RegisterForm />
    </AuthShell>
  );
}
