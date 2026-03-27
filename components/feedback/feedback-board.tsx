"use client";

import { FormEvent, useEffect, useState } from "react";
import { EmptyState } from "@/components/ui/empty-state";
import { Toast } from "@/components/ui/toast";
import { createMockId, isValidEmail, readFeedback } from "@/lib/mock-storage";
import { submitFeedbackEntry } from "@/lib/feedback-service";
import { FeedbackEntry, FeedbackType } from "@/types";

const feedbackTypes: FeedbackType[] = ["اقتراح", "ملاحظة", "مشكلة"];

export function FeedbackBoard() {
  const [entries, setEntries] = useState<FeedbackEntry[]>([]);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [type, setType] = useState<FeedbackType>("اقتراح");
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string; message?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ tone: "success" | "error"; title: string; message: string } | null>(null);

  useEffect(() => {
    setEntries(readFeedback());
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: { name?: string; email?: string; message?: string } = {};

    if (name.trim().length < 2) {
      nextErrors.name = "أدخل اسمًا واضحًا.";
    }

    if (email.trim() && !isValidEmail(email)) {
      nextErrors.email = "أدخل بريدًا صحيحًا أو اتركه فارغًا.";
    }

    if (message.trim().length < 10) {
      nextErrors.message = "أضف تفاصيل أكثر في رسالتك.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setToast({
        tone: "error",
        title: "تعذر إرسال الملاحظة",
        message: "أكمل الحقول المطلوبة ثم حاول مرة أخرى.",
      });
      return;
    }

    setIsSubmitting(true);

    const newEntry: FeedbackEntry = {
      id: createMockId("feedback"),
      name: name.trim(),
      email: email.trim(),
      type,
      message: message.trim(),
      createdAt: new Date().toLocaleString("ar-SA"),
      status: "جديد",
    };

    window.setTimeout(async () => {
      await submitFeedbackEntry(newEntry);
      setEntries((current) => [newEntry, ...current]);
      setName("");
      setEmail("");
      setType("اقتراح");
      setMessage("");
      setErrors({});
      setIsSubmitting(false);
      setToast({
        tone: "success",
        title: "تم إرسال رسالتك",
        message: "حُفظت رسالتك محليًا داخل النسخة الحالية، ويمكن لاحقًا ربطها بالبريد أو API من طبقة خدمة واحدة.",
      });
    }, 400);
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="panel p-6">
          <h2 className="text-2xl font-black text-white">شاركنا رأيك</h2>
          <p className="mt-3 text-sm leading-8 text-mist-300">
            أرسل اقتراحًا، ملاحظة، أو مشكلة. النموذج يعمل فعليًا ويحفظ الإدخالات محليًا لتظهر لاحقًا في صفحة الإدارة داخل هذه النسخة.
          </p>

          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <input
                  className={`input-field ${errors.name ? "border-rose-400/35" : ""}`}
                  placeholder="الاسم"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  disabled={isSubmitting}
                />
                {errors.name ? <p className="mt-2 text-xs text-rose-200">{errors.name}</p> : null}
              </div>

              <div>
                <input
                  className={`input-field ${errors.email ? "border-rose-400/35" : ""}`}
                  placeholder="البريد الإلكتروني - اختياري"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  disabled={isSubmitting}
                />
                {errors.email ? <p className="mt-2 text-xs text-rose-200">{errors.email}</p> : null}
              </div>
            </div>

            <select
              className="input-field"
              value={type}
              onChange={(event) => setType(event.target.value as FeedbackType)}
              disabled={isSubmitting}
            >
              {feedbackTypes.map((item) => (
                <option key={item} value={item}>
                  {item}
                </option>
              ))}
            </select>

            <div>
              <textarea
                className={`textarea-field min-h-[180px] ${errors.message ? "border-rose-400/35" : ""}`}
                placeholder="اكتب اقتراحك أو ملاحظتك أو المشكلة التي واجهتك"
                value={message}
                onChange={(event) => setMessage(event.target.value)}
                disabled={isSubmitting}
              />
              {errors.message ? <p className="mt-2 text-xs text-rose-200">{errors.message}</p> : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="premium-button motion-button disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "جارٍ الإرسال..." : "إرسال الملاحظة"}
            </button>
          </form>
        </div>

        <div className="panel p-6">
          <h3 className="text-xl font-black text-white">ماذا نفعل بهذه الرسائل؟</h3>
          <div className="mt-5 space-y-3 text-sm leading-8 text-mist-300">
            <div className="rounded-[1.5rem] bg-white/5 p-4">نحفظ الرسالة محليًا داخل هذه النسخة لتجربة تدفق حقيقي.</div>
            <div className="rounded-[1.5rem] bg-white/5 p-4">تظهر الإدخالات الأحدث في لوحة الإدارة التجريبية بشكل مباشر.</div>
            <div className="rounded-[1.5rem] bg-white/5 p-4">يمكن لاحقًا استبدال التخزين المحلي بربط مباشر مع backend دون تغيير الواجهة.</div>
          </div>
        </div>
      </section>

      {entries.length ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {entries.map((entry) => (
            <article key={entry.id} className="panel p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-white">{entry.name}</h3>
                  <p className="mt-1 text-xs text-mist-400">{entry.createdAt}</p>
                </div>
                <span className="pill">{entry.type}</span>
              </div>
              <p className="mt-4 text-sm leading-8 text-mist-200">{entry.message}</p>
              <div className="mt-5 flex items-center justify-between text-xs text-mist-400">
                <span>{entry.email || "بدون بريد مرفق"}</span>
                <span>{entry.status}</span>
              </div>
            </article>
          ))}
        </section>
      ) : (
        <EmptyState
          title="لا توجد اقتراحات أو ملاحظات بعد"
          description="ابدأ بإرسال أول اقتراح أو مشكلة حتى تظهر هنا ضمن سجل الملاحظات."
        />
      )}

      {toast ? <Toast title={toast.title} message={toast.message} tone={toast.tone} onClose={() => setToast(null)} /> : null}
    </div>
  );
}
