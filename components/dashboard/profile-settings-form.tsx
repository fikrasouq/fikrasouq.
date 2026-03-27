"use client";

import { FormEvent, useEffect, useState } from "react";
import { Toast } from "@/components/ui/toast";
import { isValidEmail, readSessionUser, readStorage, storageKeys, writeStorage } from "@/lib/mock-storage";

type ProfileState = {
  name: string;
  email: string;
  city: string;
  bio: string;
};

const fallbackProfile: ProfileState = {
  name: "علي الحربي",
  email: "ali@example.com",
  city: "الرياض",
  bio: "أهتم بشراء الأفكار الرقمية وباقات التنفيذ السريعة.",
};

export function ProfileSettingsForm() {
  const [form, setForm] = useState<ProfileState>(fallbackProfile);
  const [errors, setErrors] = useState<Partial<Record<keyof ProfileState, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ tone: "success" | "error"; title: string; message: string } | null>(null);

  useEffect(() => {
    const sessionUser = readSessionUser();
    const storedProfile = readStorage<ProfileState | null>(storageKeys.profile, null);

    setForm({
      name: storedProfile?.name ?? sessionUser?.name ?? fallbackProfile.name,
      email: storedProfile?.email ?? sessionUser?.email ?? fallbackProfile.email,
      city: storedProfile?.city ?? fallbackProfile.city,
      bio: storedProfile?.bio ?? fallbackProfile.bio,
    });
  }, []);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Partial<Record<keyof ProfileState, string>> = {};

    if (form.name.trim().length < 2) {
      nextErrors.name = "أدخل الاسم الكامل بشكل صحيح.";
    }
    if (!isValidEmail(form.email)) {
      nextErrors.email = "أدخل بريدًا إلكترونيًا صالحًا.";
    }
    if (form.city.trim().length < 2) {
      nextErrors.city = "أدخل المدينة.";
    }
    if (form.bio.trim().length < 10) {
      nextErrors.bio = "أضف وصفًا أوضح للملف الشخصي.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setToast({
        tone: "error",
        title: "تعذر حفظ التغييرات",
        message: "راجِع الحقول المطلوبة ثم أعد المحاولة.",
      });
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      writeStorage(storageKeys.profile, form);
      setIsSubmitting(false);
      setToast({
        tone: "success",
        title: "تم حفظ التغييرات",
        message: "تم تحديث بيانات الملف الشخصي محليًا داخل هذه النسخة.",
      });
    }, 350);
  };

  const handleChange = <K extends keyof ProfileState>(field: K, value: ProfileState[K]) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  return (
    <>
      <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
        <div>
          <input
            className={`input-field ${errors.name ? "border-rose-400/35" : ""}`}
            value={form.name}
            placeholder="الاسم الكامل"
            onChange={(event) => handleChange("name", event.target.value)}
            disabled={isSubmitting}
          />
          {errors.name ? <p className="mt-2 text-xs text-rose-200">{errors.name}</p> : null}
        </div>

        <div>
          <input
            className={`input-field ${errors.email ? "border-rose-400/35" : ""}`}
            value={form.email}
            placeholder="البريد الإلكتروني"
            onChange={(event) => handleChange("email", event.target.value)}
            disabled={isSubmitting}
          />
          {errors.email ? <p className="mt-2 text-xs text-rose-200">{errors.email}</p> : null}
        </div>

        <div>
          <input
            className={`input-field ${errors.city ? "border-rose-400/35" : ""}`}
            value={form.city}
            placeholder="المدينة"
            onChange={(event) => handleChange("city", event.target.value)}
            disabled={isSubmitting}
          />
          {errors.city ? <p className="mt-2 text-xs text-rose-200">{errors.city}</p> : null}
        </div>

        <div>
          <textarea
            className={`textarea-field ${errors.bio ? "border-rose-400/35" : ""}`}
            value={form.bio}
            onChange={(event) => handleChange("bio", event.target.value)}
            disabled={isSubmitting}
          />
          {errors.bio ? <p className="mt-2 text-xs text-rose-200">{errors.bio}</p> : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="motion-button rounded-full bg-gradient-to-l from-brand-400 to-brand-600 px-6 py-3 text-sm font-bold text-ink-950 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "جارٍ الحفظ..." : "حفظ التغييرات"}
        </button>
      </form>

      {toast ? <Toast title={toast.title} message={toast.message} tone={toast.tone} onClose={() => setToast(null)} /> : null}
    </>
  );
}
