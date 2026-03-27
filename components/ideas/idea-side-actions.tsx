"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { Toast } from "@/components/ui/toast";
import { createMockId, readFavorites, toggleFavoriteSlug } from "@/lib/mock-storage";
import { submitFeedbackEntry } from "@/lib/feedback-service";

export function IdeaSideActions({
  slug,
  title,
  purchaseHref,
  hasAccess,
}: {
  slug: string;
  title: string;
  purchaseHref: string;
  hasAccess: boolean;
}) {
  const [isFavorite, setIsFavorite] = useState(false);
  const [toast, setToast] = useState<{ tone: "success" | "info"; title: string; message: string } | null>(null);

  useEffect(() => {
    setIsFavorite(readFavorites().includes(slug));
  }, [slug]);

  const fullContentHref = `/ideas/${slug}?tab=full-content#idea-tabs`;

  const handleFavorite = () => {
    const result = toggleFavoriteSlug(slug);
    setIsFavorite(result.exists);
    setToast({
      tone: result.exists ? "success" : "info",
      title: result.exists ? "تمت إضافة الفكرة للمفضلة" : "تمت إزالة الفكرة من المفضلة",
      message: result.exists ? "يمكنك مراجعتها لاحقًا من صفحة المفضلة." : "لن تظهر هذه الفكرة ضمن قائمة المفضلة بعد الآن.",
    });
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/ideas/${slug}`;

    try {
      await navigator.clipboard.writeText(shareUrl);
      setToast({
        tone: "success",
        title: "تم نسخ الرابط",
        message: "أصبح رابط الفكرة جاهزًا للمشاركة.",
      });
    } catch {
      setToast({
        tone: "info",
        title: "تعذر النسخ التلقائي",
        message: `يمكنك مشاركة الرابط التالي يدويًا: ${shareUrl}`,
      });
    }
  };

  const handleReport = async () => {
    await submitFeedbackEntry({
      id: createMockId("report"),
      name: "بلاغ سريع",
      email: "",
      type: "مشكلة",
      message: `تم إرسال بلاغ تجريبي بخصوص الفكرة: ${title}`,
      createdAt: new Date().toLocaleString("ar-SA"),
      status: "جديد",
    });

    setToast({
      tone: "success",
      title: "تم إرسال البلاغ",
      message: "سُجل البلاغ محليًا داخل النسخة الحالية وسيظهر في لوحة الملاحظات والإدارة.",
    });
  };

  return (
    <>
      <div className="mt-6 space-y-3">
        {hasAccess ? (
          <>
            <Link href={fullContentHref} className="premium-button motion-button flex w-full">
              فتح المحتوى الكامل
            </Link>
            <Link href="/dashboard/purchases" className="secondary-button motion-button flex w-full">
              الانتقال إلى مشترياتي
            </Link>
          </>
        ) : (
          <>
            <Link href={purchaseHref} className="premium-button motion-button flex w-full">
              شراء الفكرة
            </Link>
            <button type="button" onClick={handleFavorite} className="secondary-button motion-button w-full">
              {isFavorite ? "إزالة من المفضلة" : "إضافة إلى المفضلة"}
            </button>
          </>
        )}

        <button type="button" onClick={handleShare} className="secondary-button motion-button w-full">
          مشاركة الفكرة
        </button>
        <button type="button" onClick={handleReport} className="secondary-button motion-button w-full">
          إبلاغ عن هذه الفكرة
        </button>
      </div>

      {toast ? <Toast title={toast.title} message={toast.message} tone={toast.tone} onClose={() => setToast(null)} /> : null}
    </>
  );
}
