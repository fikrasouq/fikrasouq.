"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/ui/toast";
import { isValidEmail, readAuthUsers, writeSessionUser } from "@/lib/mock-storage";

export function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ tone: "success" | "error"; title: string; message: string } | null>(null);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: { email?: string; password?: string } = {};

    if (!isValidEmail(email)) {
      nextErrors.email = "أدخل بريدًا إلكترونيًا صحيحًا.";
    }

    if (password.length < 8) {
      nextErrors.password = "أدخل كلمة مرور صحيحة.";
    }

    const users = readAuthUsers();
    const matchedUser = users.find((user) => user.email.toLowerCase() === email.trim().toLowerCase());

    if (!matchedUser) {
      nextErrors.email = "لا يوجد حساب مرتبط بهذا البريد.";
    } else if (matchedUser.password !== password) {
      nextErrors.password = "كلمة المرور غير صحيحة.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setToast({
        tone: "error",
        title: "تعذر تسجيل الدخول",
        message: "تحقق من البريد الإلكتروني وكلمة المرور ثم حاول مرة أخرى.",
      });
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      if (!matchedUser) {
        setIsSubmitting(false);
        return;
      }

      writeSessionUser({
        id: matchedUser.id,
        name: matchedUser.name,
        email: matchedUser.email,
        role: matchedUser.role,
        createdAt: matchedUser.createdAt,
      });

      setIsSubmitting(false);
      setToast({
        tone: "success",
        title: "مرحبًا بعودتك",
        message: remember ? "تم تسجيل الدخول وسنحتفظ بجلسة محلية لهذا المتصفح." : "تم تسجيل الدخول بنجاح.",
      });

      window.setTimeout(() => {
        router.push("/dashboard");
      }, 800);
    }, 450);
  };

  return (
    <>
      <div className="mx-auto max-w-xl space-y-5">
        <div>
          <h2 className="text-2xl font-black text-white">مرحبًا بعودتك</h2>
          <p className="mt-2 text-sm leading-7 text-mist-300">أدخل بياناتك للوصول إلى لوحة التحكم والمشتريات والإشعارات.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <input
              className={`input-field ${errors.email ? "border-rose-400/35" : ""}`}
              placeholder="البريد الإلكتروني"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              disabled={isSubmitting}
            />
            {errors.email ? <p className="mt-2 text-xs text-rose-200">{errors.email}</p> : null}
          </div>

          <div>
            <input
              className={`input-field ${errors.password ? "border-rose-400/35" : ""}`}
              type="password"
              placeholder="كلمة المرور"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              disabled={isSubmitting}
            />
            {errors.password ? <p className="mt-2 text-xs text-rose-200">{errors.password}</p> : null}
          </div>

          <div className="flex items-center justify-between text-sm text-mist-300">
            <label className="flex items-center gap-2">
              <input type="checkbox" checked={remember} onChange={(event) => setRemember(event.target.checked)} />
              <span>تذكرني</span>
            </label>
            <Link href="/auth/forgot-password" className="text-brand-100">
              نسيت كلمة المرور؟
            </Link>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-gradient-to-l from-brand-400 to-brand-600 px-6 py-3 text-sm font-bold text-ink-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "جارٍ تسجيل الدخول..." : "تسجيل الدخول"}
          </button>
        </form>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-mist-200">
          ليس لديك حساب؟{" "}
          <Link href="/auth/register" className="font-bold text-brand-100">
            أنشئ حسابًا جديدًا
          </Link>
        </div>
      </div>

      {toast ? <Toast title={toast.title} message={toast.message} tone={toast.tone} onClose={() => setToast(null)} /> : null}
    </>
  );
}
