"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { EmptyState } from "@/components/ui/empty-state";
import { Toast } from "@/components/ui/toast";
import { createMockId, persistPlatformReview, readPlatformReviews } from "@/lib/mock-storage";
import { PlatformReviewEntry } from "@/types";

function Stars({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          className={`rounded-full px-3 py-2 text-sm transition ${
            star <= value ? "bg-brand-400/15 text-brand-100" : "bg-white/5 text-mist-300 hover:bg-white/10 hover:text-white"
          }`}
        >
          {star} نجوم
        </button>
      ))}
    </div>
  );
}

export function PlatformReviewsBoard() {
  const [reviews, setReviews] = useState<PlatformReviewEntry[]>([]);
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<{ name?: string; comment?: string }>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [toast, setToast] = useState<{ tone: "success" | "error"; title: string; message: string } | null>(null);

  useEffect(() => {
    setReviews(readPlatformReviews());
  }, []);

  const averageRating = useMemo(() => {
    if (!reviews.length) {
      return 0;
    }

    const total = reviews.reduce((sum, item) => sum + item.rating, 0);
    return total / reviews.length;
  }, [reviews]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: { name?: string; comment?: string } = {};

    if (name.trim().length < 2) {
      nextErrors.name = "أدخل اسمًا واضحًا.";
    }

    if (comment.trim().length < 10) {
      nextErrors.comment = "أضف تعليقًا فيه تفاصيل أكثر.";
    }

    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      setToast({
        tone: "error",
        title: "تعذر إضافة التقييم",
        message: "راجِع الاسم والتعليق ثم حاول من جديد.",
      });
      return;
    }

    setIsSubmitting(true);

    window.setTimeout(() => {
      const newReview: PlatformReviewEntry = {
        id: createMockId("review"),
        name: name.trim(),
        rating,
        comment: comment.trim(),
        createdAt: new Date().toLocaleString("ar-SA"),
      };

      persistPlatformReview(newReview);
      setReviews((current) => [newReview, ...current]);
      setName("");
      setRating(5);
      setComment("");
      setErrors({});
      setIsSubmitting(false);
      setToast({
        tone: "success",
        title: "تم إضافة تقييمك",
        message: "شكرًا لك. أصبح تقييمك ظاهرًا الآن ضمن لوحة تقييمات المنصة.",
      });
    }, 400);
  };

  return (
    <div className="space-y-8">
      <section className="grid gap-5 xl:grid-cols-[340px_minmax(0,1fr)]">
        <div className="panel p-6">
          <p className="text-sm text-mist-300">ملخص التقييمات</p>
          <h2 className="mt-2 text-4xl font-black text-white">{reviews.length ? averageRating.toFixed(1) : "0.0"}</h2>
          <p className="mt-3 text-sm leading-7 text-mist-300">
            {reviews.length ? `بناءً على ${reviews.length} تقييمًا محفوظًا محليًا في هذه النسخة.` : "لا توجد تقييمات حتى الآن. ابدأ بإضافة أول تقييم للمنصة."}
          </p>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-mist-400">عدد التقييمات</p>
              <p className="mt-2 text-lg font-bold text-white">{reviews.length}</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-4">
              <p className="text-mist-400">أعلى تقييم</p>
              <p className="mt-2 text-lg font-bold text-white">5 / 5</p>
            </div>
          </div>
        </div>

        <div className="panel p-6">
          <h2 className="text-2xl font-black text-white">أضف تقييمك للمنصة</h2>
          <p className="mt-3 text-sm leading-8 text-mist-300">
            هذه اللوحة تتيح للمستخدم إضافة تقييم تجريبي حقيقي محليًا، مع حفظ الاسم والنجوم والتعليق وعرضها مباشرة داخل الصفحة.
          </p>

          <form className="mt-5 space-y-4" onSubmit={handleSubmit}>
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

            <div className="space-y-2">
              <p className="text-sm text-mist-200">التقييم بالنجوم</p>
              <Stars value={rating} onChange={setRating} />
            </div>

            <div>
              <textarea
                className={`textarea-field min-h-[160px] ${errors.comment ? "border-rose-400/35" : ""}`}
                placeholder="اكتب تعليقك عن جودة التجربة، التصميم، أو سهولة الاستخدام"
                value={comment}
                onChange={(event) => setComment(event.target.value)}
                disabled={isSubmitting}
              />
              {errors.comment ? <p className="mt-2 text-xs text-rose-200">{errors.comment}</p> : null}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="premium-button motion-button disabled:cursor-not-allowed disabled:opacity-60"
            >
              {isSubmitting ? "جارٍ الإضافة..." : "إضافة التقييم"}
            </button>
          </form>
        </div>
      </section>

      {reviews.length ? (
        <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {reviews.map((review) => (
            <article key={review.id} className="panel p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <h3 className="text-lg font-bold text-white">{review.name}</h3>
                  <p className="mt-1 text-xs text-mist-400">{review.createdAt}</p>
                </div>
                <span className="pill">{review.rating} / 5</span>
              </div>
              <p className="mt-4 text-sm leading-8 text-mist-200">{review.comment}</p>
            </article>
          ))}
        </section>
      ) : (
        <EmptyState
          title="لا توجد تقييمات للمنصة حتى الآن"
          description="ابدأ بإضافة أول تقييم حتى يظهر هذا القسم كتجربة تقييمات كاملة ومقنعة."
        />
      )}

      {toast ? <Toast title={toast.title} message={toast.message} tone={toast.tone} onClose={() => setToast(null)} /> : null}
    </div>
  );
}
