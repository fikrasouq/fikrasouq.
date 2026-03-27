"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { Toast } from "@/components/ui/toast";
import { isValidEmail, readAuthUsers } from "@/lib/mock-storage";

export function ForgotPasswordForm() {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ tone: "success" | "error"; title: string; message: string } | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!isValidEmail(email)) {
      setError("أدخل بريدًا إلكترونيًا صحيحًا.");
      setToast({
        tone: "error",
        title: "تعذر الإرسال",
        message: "أدخل بريدًا إلكترونيًا صالحًا لإرسال رابط الاستعادة.",
      });
      return;
    }

    const user = readAuthUsers().find((item) => item.email.toLowerCase() === email.trim().toLowerCase());

    if (!user) {
      setError("لا يوجد حساب مسجل بهذا البريد.");
      setToast({
        tone: "error",
        title: "الحساب غير موجود",
        message: "تحقق من البريد الإلكتروني أو أنشئ حسابًا جديدًا.",
      });
      return;
    }

    setError("");
    setIsSubmitting(true);

    window.setTimeout(() => {
      setIsSubmitting(false);
      setToast({
        tone: "success",
        title: "تم إرسال رابط الاستعادة",
        message: "في النسخة الحالية تم تنفيذ العملية محليًا. يمكنك الآن العودة إلى تسجيل الدخول وإكمال التجربة.",
      });
      setEmail("");
    }, 450);
  };

  return (
    <>
      <div className="mx-auto max-w-xl space-y-5">
        <div>
          <h2 className="text-2xl font-black text-white">نسيت كلمة المرور؟</h2>
          <p className="mt-2 text-sm leading-7 text-mist-300">أدخل بريدك الإلكتروني وسنرسل لك رابطًا تجريبيًا لإعادة تعيين كلمة المرور.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              className={`input-field ${error ? "border-rose-400/35" : ""}`}
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isSubmitting}
            />
            {error ? <p className="mt-2 text-xs text-rose-200">{error}</p> : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-gradient-to-l from-brand-400 to-brand-600 px-6 py-3 text-sm font-bold text-ink-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "جارٍ الإرسال..." : "إرسال رابط الاستعادة"}
          </button>
        </form>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-mist-200">
          تذكرت كلمة المرور؟{" "}
          <Link href="/auth/login" className="font-bold text-brand-100">
            العودة لتسجيل الدخول
          </Link>
        </div>
      </div>

      {toast ? <Toast title={toast.title} message={toast.message} tone={toast.tone} onClose={() => setToast(null)} /> : null}
    </>
  );
}
