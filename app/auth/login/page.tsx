import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

const sideItems = [
  "دخول سريع إلى لوحة المستخدم والمشتريات والمفضلة.",
  "واجهة عربية حديثة مناسبة للجوال والكمبيوتر.",
  "تصميم يركز على الثقة والبساطة بدل التعقيد.",
];

export default function LoginPage() {
  return (
    <AuthShell
      eyebrow="تسجيل الدخول"
      title="ادخل إلى حسابك في سوق الأفكار"
      description="صفحة دخول حديثة تحافظ على الطابع الاحترافي نفسه عبر كامل المنصة، مع خيارات واضحة وروابط مباشرة للاستعادة والتسجيل."
      sideTitle="لماذا تسجيل الدخول مهم؟"
      sideItems={sideItems}
    >
      <LoginForm />
    </AuthShell>
  );
}
