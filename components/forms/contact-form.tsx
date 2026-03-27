"use client";

import { FormEvent, useState } from "react";
import { Toast } from "@/components/ui/toast";
import { createMockId, isValidEmail, persistContactMessage } from "@/lib/mock-storage";

type ContactState = {
  name: string;
  email: string;
  subject: string;
  category: string;
  message: string;
};

const initialState: ContactState = {
  name: "",
  email: "",
  subject: "",
  category: "استفسار عن الشراء",
  message: "",
};

export function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [errors, setErrors] = useState<Partial<Record<keyof ContactState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ tone: "success" | "error"; title: string; message: string } | null>(null);

  const handleChange = (field: keyof ContactState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof ContactState, string>> = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = "أدخل الاسم الكامل بشكل صحيح.";
    }

    if (!isValidEmail(form.email)) {
      nextErrors.email = "أدخل بريدًا إلكترونيًا صحيحًا.";
    }

    if (form.subject.trim().length < 3) {
      nextErrors.subject = "أدخل موضوعًا أوضح للرسالة.";
    }

    if (form.message.trim().length < 10) {
      nextErrors.message = "أضف تفاصيل أكثر حتى نستطيع متابعة الطلب.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setToast({
        tone: "error",
        title: "تعذر إرسال الرسالة",
        message: "أكمل الحقول المطلوبة أولًا ثم أعد المحاولة.",
      });
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      persistContactMessage({
        id: createMockId("contact"),
        name: form.name.trim(),
        email: form.email.trim(),
        subject: form.subject.trim(),
        category: form.category,
        message: form.message.trim(),
        createdAt: new Date().toLocaleString("ar-SA"),
      });

      setIsSubmitting(false);
      setForm(initialState);
      setErrors({});
      setToast({
        tone: "success",
        title: "تم إرسال الرسالة",
        message: "استلمنا رسالتك محليًا داخل النسخة التجريبية وسنعتبرها قيد المتابعة.",
      });
    }, 450);
  };

  return (
    <>
      <section className="panel p-6">
        <form className="grid gap-5 lg:grid-cols-2" onSubmit={handleSubmit}>
          <div>
            <input
              className={`input-field ${errors.name ? "border-rose-400/35" : ""}`}
              placeholder="الاسم الكامل"
              value={form.name}
              onChange={(event) => handleChange("name", event.target.value)}
              disabled={isSubmitting}
            />
            {errors.name ? <p className="mt-2 text-xs text-rose-200">{errors.name}</p> : null}
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

          <div>
            <input
              className={`input-field ${errors.subject ? "border-rose-400/35" : ""}`}
              placeholder="الموضوع"
              value={form.subject}
              onChange={(event) => handleChange("subject", event.target.value)}
              disabled={isSubmitting}
            />
            {errors.subject ? <p className="mt-2 text-xs text-rose-200">{errors.subject}</p> : null}
          </div>

          <select
            className="input-field"
            value={form.category}
            onChange={(event) => handleChange("category", event.target.value)}
            disabled={isSubmitting}
          >
            <option>استفسار عن الشراء</option>
            <option>استفسار عن البيع</option>
            <option>مشكلة تقنية</option>
            <option>اقتراح تطوير</option>
          </select>

          <div className="lg:col-span-2">
            <textarea
              className={`textarea-field min-h-[180px] ${errors.message ? "border-rose-400/35" : ""}`}
              placeholder="اكتب رسالتك هنا بالتفصيل"
              value={form.message}
              onChange={(event) => handleChange("message", event.target.value)}
              disabled={isSubmitting}
            />
            {errors.message ? <p className="mt-2 text-xs text-rose-200">{errors.message}</p> : null}
          </div>

          <div className="lg:col-span-2">
            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full bg-gradient-to-l from-brand-400 to-brand-600 px-6 py-3 text-sm font-bold text-ink-950 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "جارٍ الإرسال..." : "إرسال الرسالة"}
            </button>
          </div>
        </form>
      </section>

      {toast ? <Toast title={toast.title} message={toast.message} tone={toast.tone} onClose={() => setToast(null)} /> : null}
    </>
  );
}
