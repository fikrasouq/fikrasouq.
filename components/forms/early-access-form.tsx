"use client";

import { FormEvent, useState } from "react";
import { Toast } from "@/components/ui/toast";
import { createMockId, isValidEmail, persistEarlyAccessEntry, readStorage, storageKeys } from "@/lib/mock-storage";
import { EarlyAccessEntry } from "@/types";

type ToastState = {
  tone: "success" | "error" | "info";
  title: string;
  message: string;
};

export function EarlyAccessForm({
  compact = false,
  showName = true,
  showInterest = true,
  buttonLabel = "اطلب الوصول المبكر",
}: {
  compact?: boolean;
  showName?: boolean;
  showInterest?: boolean;
  buttonLabel?: string;
}) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interest, setInterest] = useState("أهتم بأفكار المشاريع والمتاجر");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});
  const [toast, setToast] = useState<ToastState | null>(null);

  const resetForm = () => {
    setName("");
    setEmail("");
    setInterest("أهتم بأفكار المشاريع والمتاجر");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: { name?: string; email?: string } = {};

    if (showName && name.trim().length < 2) {
      nextErrors.name = "أدخل اسمًا واضحًا مكوّنًا من حرفين على الأقل.";
    }

    if (!isValidEmail(email)) {
      nextErrors.email = "أدخل بريدًا إلكترونيًا صحيحًا.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setToast({
        tone: "error",
        title: "تعذر إرسال الطلب",
        message: "راجِع الحقول المعلّمة ثم حاول مرة أخرى.",
      });
      return;
    }

    setIsSubmitting(true);

    const existingEntries = readStorage<EarlyAccessEntry[]>(storageKeys.earlyAccess, []);
    const duplicate = existingEntries.find((item) => item.email.toLowerCase() === email.trim().toLowerCase());

    window.setTimeout(() => {
      if (duplicate) {
        setToast({
          tone: "info",
          title: "أنت ضمن القائمة بالفعل",
          message: "تم العثور على طلب سابق بهذا البريد، وسنرسل لك أي تحديثات جديدة عليه مباشرة.",
        });
        setIsSubmitting(false);
        return;
      }

      persistEarlyAccessEntry({
        id: createMockId("early"),
        name: showName ? name.trim() : "مهتم جديد",
        email: email.trim(),
        interest,
        createdAt: new Date().toLocaleString("ar-SA"),
      });

      setToast({
        tone: "success",
        title: "تم تسجيل طلبك",
        message: "أضفناك إلى قائمة الوصول المبكر، وسنوافيك بالإطلاقات والتحديثات القادمة.",
      });
      setIsSubmitting(false);
      resetForm();
    }, 450);
  };

  return (
    <>
      <form className={compact ? "flex flex-col gap-3 sm:flex-row" : "space-y-4"} onSubmit={handleSubmit}>
        {showName ? (
          <div className={compact ? "sm:max-w-[14rem]" : ""}>
            <input
              value={name}
              onChange={(event) => setName(event.target.value)}
              className={`input-field ${errors.name ? "border-rose-400/35" : ""}`}
              placeholder="الاسم الكامل"
              disabled={isSubmitting}
            />
            {errors.name ? <p className="mt-2 text-xs text-rose-200">{errors.name}</p> : null}
          </div>
        ) : null}

        <div className={compact ? "flex-1" : ""}>
          <input
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            className={`input-field ${errors.email ? "border-rose-400/35" : ""}`}
            placeholder="البريد الإلكتروني"
            disabled={isSubmitting}
          />
          {errors.email ? <p className="mt-2 text-xs text-rose-200">{errors.email}</p> : null}
        </div>

        {showInterest ? (
          <select
            value={interest}
            onChange={(event) => setInterest(event.target.value)}
            className="input-field"
            disabled={isSubmitting}
          >
            <option>أهتم بأفكار المشاريع والمتاجر</option>
            <option>أهتم بأفكار المحتوى والتطبيقات</option>
            <option>أرغب ببيع أفكاري داخل المنصة</option>
            <option>أبحث عن باقات تنفيذ جاهزة</option>
          </select>
        ) : null}

        <button
          type="submit"
          disabled={isSubmitting}
          className="premium-button motion-button w-full disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "جارٍ الإرسال..." : buttonLabel}
        </button>
      </form>

      {toast ? <Toast title={toast.title} message={toast.message} tone={toast.tone} onClose={() => setToast(null)} /> : null}
    </>
  );
}
