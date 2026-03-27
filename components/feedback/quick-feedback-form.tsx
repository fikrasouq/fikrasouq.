"use client";

import { FormEvent, useState } from "react";
import { Toast } from "@/components/ui/toast";
import { createMockId, isValidEmail } from "@/lib/mock-storage";
import { submitFeedbackEntry } from "@/lib/feedback-service";
import { FeedbackType } from "@/types";

const feedbackOptions: FeedbackType[] = ["اقتراح", "ملاحظة", "مشكلة"];

export function QuickFeedbackForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<FeedbackType>("اقتراح");
  const [message, setMessage] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [toast, setToast] = useState<{ tone: "success" | "error"; title: string; message: string } | null>(null);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: { name?: string; email?: string; message?: string } = {};

    if (name.trim().length < 2) {
      nextErrors.name = "أدخل اسمًا واضحًا.";
    }

    if (email.trim() && !isValidEmail(email)) {
      nextErrors.email = "أدخل بريدًا صحيحًا أو اتركه فارغًا.";
    }

    if (message.trim().length < 8) {
      nextErrors.message = "اكتب ملاحظة أقصر لكنها أوضح.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setToast({
        tone: "error",
        title: "تعذر إرسال الاقتراح",
        message: "أكمل الحقول المطلوبة ثم حاول مرة أخرى.",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      await submitFeedbackEntry({
        id: createMockId("home-feedback"),
        name: name.trim(),
        email: email.trim(),
        type,
        message: message.trim(),
        createdAt: new Date().toLocaleString("ar-SA"),
        status: "جديد",
      });

      setName("");
      setEmail("");
      setType("اقتراح");
      setMessage("");
      setErrors({});
      setToast({
        tone: "success",
        title: "وصلتنا ملاحظتك",
        message: "تم حفظ الرسالة محليًا، والبنية جاهزة لاحقًا لربطها بالإيميل أو API خارجي.",
      });
    } catch {
      setToast({
        tone: "error",
        title: "تعذر الإرسال",
        message: "حدث خطأ غير متوقع أثناء حفظ الرسالة.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form className="space-y-4" onSubmit={handleSubmit}>
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={`input-field ${errors.name ? "border-rose-400/35" : ""}`}
              placeholder="الاسم"
              disabled={isSubmitting}
            />
            {errors.name ? <p className="mt-2 text-xs text-rose-200">{errors.name}</p> : null}
          </div>

          <div>
            <input
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className={`input-field ${errors.email ? "border-rose-400/35" : ""}`}
              placeholder="البريد الإلكتروني - اختياري"
              disabled={isSubmitting}
            />
            {errors.email ? <p className="mt-2 text-xs text-rose-200">{errors.email}</p> : null}
          </div>
        </div>

        <select value={type} onChange={(event) => setType(event.target.value as FeedbackType)} className="input-field" disabled={isSubmitting}>
          {feedbackOptions.map((option) => (
            <option key={option} value={option}>
              {option}
            </option>
          ))}
        </select>

        <div>
          <textarea
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            className={`textarea-field min-h-[140px] ${errors.message ? "border-rose-400/35" : ""}`}
            placeholder="ما الذي تتمنى وجوده في المنصة؟"
            disabled={isSubmitting}
          />
          {errors.message ? <p className="mt-2 text-xs text-rose-200">{errors.message}</p> : null}
        </div>

        <button type="submit" disabled={isSubmitting} className="premium-button motion-button disabled:cursor-not-allowed disabled:opacity-60">
          {isSubmitting ? "جارٍ الإرسال..." : "أرسل رأيك"}
        </button>
      </form>

      {toast ? <Toast title={toast.title} message={toast.message} tone={toast.tone} onClose={() => setToast(null)} /> : null}
    </>
  );
}
