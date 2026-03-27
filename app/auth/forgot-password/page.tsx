import { AuthShell } from "@/components/auth/auth-shell";
import { ForgotPasswordForm } from "@/components/auth/forgot-password-form";

const sideItems = [
  "إرسال رابط استعادة بشكل منظم وواضح.",
  "تجربة عربية كاملة حتى في الحالات الثانوية.",
  "انسجام بصري كامل مع بقية صفحات المنصة.",
];

export default function ForgotPasswordPage() {
  return (
    <AuthShell
      eyebrow="استعادة كلمة المرور"
      title="استرجع الوصول إلى حسابك"
      description="صفحة مخصصة لاستعادة كلمة المرور بنفس جودة التصميم وبنفس الاتجاه البصري لباقي المشروع."
      sideTitle="ما الذي سيحدث؟"
      sideItems={sideItems}
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
