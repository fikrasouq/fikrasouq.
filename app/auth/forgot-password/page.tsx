import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";

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
      <div className="mx-auto max-w-xl space-y-5">
        <div>
          <h2 className="text-2xl font-black text-white">نسيت كلمة المرور؟</h2>
          <p className="mt-2 text-sm leading-7 text-mist-300">
            أدخل بريدك الإلكتروني وسنرسل لك رابطًا تجريبيًا لإعادة تعيين كلمة المرور.
          </p>
        </div>

        <form className="space-y-4">
          <input className="input-field" placeholder="البريد الإلكتروني" />
          <button type="button" className="w-full rounded-full bg-gradient-to-l from-brand-400 to-brand-600 px-6 py-3 text-sm font-bold text-ink-950">
            إرسال رابط الاستعادة
          </button>
        </form>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-mist-200">
          تذكرت كلمة المرور؟{" "}
          <Link href="/auth/login" className="font-bold text-brand-100">
            العودة لتسجيل الدخول
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
