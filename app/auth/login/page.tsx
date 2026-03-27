import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";

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
      <div className="mx-auto max-w-xl space-y-5">
        <div>
          <h2 className="text-2xl font-black text-white">مرحبًا بعودتك</h2>
          <p className="mt-2 text-sm leading-7 text-mist-300">أدخل بياناتك للوصول إلى لوحة التحكم والمشتريات والإشعارات.</p>
        </div>

        <form className="space-y-4">
          <input className="input-field" placeholder="البريد الإلكتروني" />
          <input className="input-field" type="password" placeholder="كلمة المرور" />
          <div className="flex items-center justify-between text-sm text-mist-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" />
              <span>تذكرني</span>
            </label>
            <Link href="/auth/forgot-password" className="text-brand-100">
              نسيت كلمة المرور؟
            </Link>
          </div>
          <button type="button" className="w-full rounded-full bg-gradient-to-l from-brand-400 to-brand-600 px-6 py-3 text-sm font-bold text-ink-950">
            تسجيل الدخول
          </button>
        </form>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-mist-200">
          ليس لديك حساب؟{" "}
          <Link href="/auth/register" className="font-bold text-brand-100">
            أنشئ حسابًا جديدًا
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
