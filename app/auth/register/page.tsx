import Link from "next/link";
import { AuthShell } from "@/components/auth/auth-shell";

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
      <div className="mx-auto max-w-xl space-y-5">
        <div>
          <h2 className="text-2xl font-black text-white">إنشاء حساب جديد</h2>
          <p className="mt-2 text-sm leading-7 text-mist-300">اختر نوع الاستخدام واملأ البيانات الأساسية للبدء.</p>
        </div>

        <form className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <input className="input-field" placeholder="الاسم الأول" />
            <input className="input-field" placeholder="اسم العائلة" />
          </div>
          <input className="input-field" placeholder="البريد الإلكتروني" />
          <div className="grid gap-4 md:grid-cols-2">
            <input className="input-field" type="password" placeholder="كلمة المرور" />
            <input className="input-field" type="password" placeholder="تأكيد كلمة المرور" />
          </div>
          <select className="input-field">
            <option>مشتري أفكار</option>
            <option>بائع أفكار</option>
            <option>أريد الاثنين معًا</option>
          </select>
          <label className="flex items-center gap-2 text-sm text-mist-300">
            <input type="checkbox" />
            <span>أوافق على الشروط والأحكام وسياسة الاستخدام التجريبية</span>
          </label>
          <button type="button" className="w-full rounded-full bg-gradient-to-l from-brand-400 to-brand-600 px-6 py-3 text-sm font-bold text-ink-950">
            إنشاء الحساب
          </button>
        </form>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-mist-200">
          لديك حساب بالفعل؟{" "}
          <Link href="/auth/login" className="font-bold text-brand-100">
            سجل الدخول
          </Link>
        </div>
      </div>
    </AuthShell>
  );
}
