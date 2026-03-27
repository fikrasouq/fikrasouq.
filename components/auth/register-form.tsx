"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { Toast } from "@/components/ui/toast";
import { createMockId, isValidEmail, readAuthUsers, writeAuthUsers, writeSessionUser } from "@/lib/mock-storage";
import { MockAuthRole, MockAuthUserRecord } from "@/types";

type RegisterState = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  role: MockAuthRole;
  agree: boolean;
};

const initialState: RegisterState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
  role: "buyer",
  agree: false,
};

export function RegisterForm() {
  const router = useRouter();
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ tone: "success" | "error"; title: string; message: string } | null>(null);

  const handleChange = <K extends keyof RegisterState>(field: K, value: RegisterState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof RegisterState, string>> = {};

    if (form.firstName.trim().length < 2) {
      nextErrors.firstName = "أدخل الاسم الأول بشكل صحيح.";
    }
    if (form.lastName.trim().length < 2) {
      nextErrors.lastName = "أدخل اسم العائلة بشكل صحيح.";
    }
    if (!isValidEmail(form.email)) {
      nextErrors.email = "أدخل بريدًا إلكترونيًا صالحًا.";
    }
    if (form.password.length < 8) {
      nextErrors.password = "كلمة المرور يجب أن تكون 8 أحرف على الأقل.";
    }
    if (form.confirmPassword !== form.password) {
      nextErrors.confirmPassword = "تأكيد كلمة المرور غير مطابق.";
    }
    if (!form.agree) {
      nextErrors.agree = "يجب الموافقة على الشروط للمتابعة.";
    }

    const users = readAuthUsers();
    if (users.some((user) => user.email.toLowerCase() === form.email.trim().toLowerCase())) {
      nextErrors.email = "يوجد حساب مسجل بهذا البريد بالفعل.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setToast({
        tone: "error",
        title: "تعذر إنشاء الحساب",
        message: "راجِع الحقول المطلوبة ثم حاول مرة أخرى.",
      });
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      const newUser: MockAuthUserRecord = {
        id: createMockId("user"),
        name: `${form.firstName.trim()} ${form.lastName.trim()}`,
        email: form.email.trim(),
        password: form.password,
        role: form.role,
        createdAt: new Date().toLocaleString("ar-SA"),
      };

      writeAuthUsers([newUser, ...users]);
      writeSessionUser({
        id: newUser.id,
        name: newUser.name,
        email: newUser.email,
        role: newUser.role,
        createdAt: newUser.createdAt,
      });

      setIsSubmitting(false);
      setToast({
        tone: "success",
        title: "تم إنشاء الحساب بنجاح",
        message: "سننقلك الآن إلى لوحة المستخدم لمتابعة الإعدادات والمشتريات.",
      });

      window.setTimeout(() => {
        router.push("/dashboard");
      }, 900);
    }, 500);
  };

  return (
    <>
      <div className="mx-auto max-w-xl space-y-5">
        <div>
          <h2 className="text-2xl font-black text-white">إنشاء حساب جديد</h2>
          <p className="mt-2 text-sm leading-7 text-mist-300">اختر نوع الاستخدام واملأ البيانات الأساسية للبدء.</p>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <input
                className={`input-field ${errors.firstName ? "border-rose-400/35" : ""}`}
                placeholder="الاسم الأول"
                value={form.firstName}
                onChange={(event) => handleChange("firstName", event.target.value)}
                disabled={isSubmitting}
              />
              {errors.firstName ? <p className="mt-2 text-xs text-rose-200">{errors.firstName}</p> : null}
            </div>

            <div>
              <input
                className={`input-field ${errors.lastName ? "border-rose-400/35" : ""}`}
                placeholder="اسم العائلة"
                value={form.lastName}
                onChange={(event) => handleChange("lastName", event.target.value)}
                disabled={isSubmitting}
              />
              {errors.lastName ? <p className="mt-2 text-xs text-rose-200">{errors.lastName}</p> : null}
            </div>
          </div>

          <div>
            <input
              className={`input-field ${errors.email ? "border-rose-400/35" : ""}`}
              placeholder="البريد الإلكتروني"
              value={form.email}
              onChange={(event) => handleChange("email", event.target.value)}
              disabled={isSubmitting}
            />
            {errors.email ? <p className="mt-2 text-xs text-rose-200">{errors.email}</p> : null}
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <input
                className={`input-field ${errors.password ? "border-rose-400/35" : ""}`}
                type="password"
                placeholder="كلمة المرور"
                value={form.password}
                onChange={(event) => handleChange("password", event.target.value)}
                disabled={isSubmitting}
              />
              {errors.password ? <p className="mt-2 text-xs text-rose-200">{errors.password}</p> : null}
            </div>

            <div>
              <input
                className={`input-field ${errors.confirmPassword ? "border-rose-400/35" : ""}`}
                type="password"
                placeholder="تأكيد كلمة المرور"
                value={form.confirmPassword}
                onChange={(event) => handleChange("confirmPassword", event.target.value)}
                disabled={isSubmitting}
              />
              {errors.confirmPassword ? <p className="mt-2 text-xs text-rose-200">{errors.confirmPassword}</p> : null}
            </div>
          </div>

          <select
            className="input-field"
            value={form.role}
            onChange={(event) => handleChange("role", event.target.value as MockAuthRole)}
            disabled={isSubmitting}
          >
            <option value="buyer">مشتري أفكار</option>
            <option value="seller">بائع أفكار</option>
            <option value="both">أريد الاثنين معًا</option>
          </select>

          <label className="flex items-start gap-2 text-sm text-mist-300">
            <input
              type="checkbox"
              checked={form.agree}
              onChange={(event) => handleChange("agree", event.target.checked)}
              disabled={isSubmitting}
            />
            <span>أوافق على الشروط والأحكام وسياسة الاستخدام التجريبية.</span>
          </label>
          {errors.agree ? <p className="text-xs text-rose-200">{errors.agree}</p> : null}

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-full bg-gradient-to-l from-brand-400 to-brand-600 px-6 py-3 text-sm font-bold text-ink-950 disabled:cursor-not-allowed disabled:opacity-60"
          >
            {isSubmitting ? "جارٍ إنشاء الحساب..." : "إنشاء الحساب"}
          </button>
        </form>

        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-sm text-mist-200">
          لديك حساب بالفعل؟{" "}
          <Link href="/auth/login" className="font-bold text-brand-100">
            سجل الدخول
          </Link>
        </div>
      </div>

      {toast ? <Toast title={toast.title} message={toast.message} tone={toast.tone} onClose={() => setToast(null)} /> : null}
    </>
  );
}
