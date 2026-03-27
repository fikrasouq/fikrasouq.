"use client";

import { useEffect, useState } from "react";
import { EmptyState } from "@/components/ui/empty-state";
import { readFeedback, readPlatformReviews } from "@/lib/mock-storage";
import { FeedbackEntry, PlatformReviewEntry } from "@/types";

export function AdminFeedbackPanel() {
  const [feedbackEntries, setFeedbackEntries] = useState<FeedbackEntry[]>([]);
  const [reviews, setReviews] = useState<PlatformReviewEntry[]>([]);

  useEffect(() => {
    setFeedbackEntries(readFeedback());
    setReviews(readPlatformReviews());
  }, []);

  return (
    <section className="grid gap-6 xl:grid-cols-2">
      <div className="panel p-5">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white">صندوق الاقتراحات</h2>
            <p className="mt-2 text-sm leading-7 text-mist-300">أحدث الرسائل القادمة من صفحة شاركنا رأيك.</p>
          </div>
          <span className="pill">{feedbackEntries.length} رسالة</span>
        </div>

        {feedbackEntries.length ? (
          <div className="space-y-4">
            {feedbackEntries.slice(0, 5).map((entry) => (
              <div key={entry.id} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-white">{entry.name}</p>
                    <p className="mt-1 text-xs text-mist-400">{entry.createdAt}</p>
                  </div>
                  <span className="surface-chip">{entry.type}</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-mist-200">{entry.message}</p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="لا توجد بيانات حالياً" description="أي اقتراح أو ملاحظة جديدة ستظهر هنا تلقائيًا." />
        )}
      </div>

      <div className="panel p-5">
        <div className="mb-5 flex items-center justify-between gap-3">
          <div>
            <h2 className="text-xl font-bold text-white">تقييمات المنصة</h2>
            <p className="mt-2 text-sm leading-7 text-mist-300">آخر التقييمات المضافة من صفحة تقييمات المنصة.</p>
          </div>
          <span className="pill">{reviews.length} تقييم</span>
        </div>

        {reviews.length ? (
          <div className="space-y-4">
            {reviews.slice(0, 5).map((review) => (
              <div key={review.id} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-white">{review.name}</p>
                    <p className="mt-1 text-xs text-mist-400">{review.createdAt}</p>
                  </div>
                  <span className="surface-chip">{review.rating} / 5</span>
                </div>
                <p className="mt-3 text-sm leading-7 text-mist-200">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState title="لا توجد بيانات حالياً" description="عند إضافة أول تقييم سيظهر هنا داخل لوحة الإدارة." />
        )}
      </div>
    </section>
  );
}
