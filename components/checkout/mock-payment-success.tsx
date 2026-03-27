"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Status = "loading" | "success" | "error";

export function MockPaymentSuccess({ slug }: { slug?: string }) {
  const [status, setStatus] = useState<Status>("loading");
  const [message, setMessage] = useState("جارٍ اعتماد عملية الدفع التجريبية وفتح الوصول الكامل للمحتوى.");

  useEffect(() => {
    if (!slug) {
      setStatus("error");
      setMessage("لم يتم تحديد الفكرة المرتبطة بهذه العملية، لذلك لم يتم فتح أي محتوى.");
      return;
    }

    const confirmPurchase = async () => {
      try {
        const response = await fetch("/api/mock-purchase", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ slug }),
        });

        if (!response.ok) {
          throw new Error("purchase_failed");
        }

        setStatus("success");
        setMessage("تم تسجيل الفكرة ضمن مشترياتك، وأصبح بإمكانك قراءة المحتوى الكامل من صفحة الفكرة أو من صفحة مشترياتي.");
      } catch {
        setStatus("error");
        setMessage("تعذر تحديث حالة الشراء التجريبية الآن. حاول إعادة الخطوة أو ارجع إلى صفحة الدفع.");
      }
    };

    void confirmPurchase();
  }, [slug]);

  if (status === "loading") {
    return (
      <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-6 text-center">
        <div className="mx-auto h-14 w-14 animate-spin rounded-full border-2 border-brand-400/30 border-t-brand-400" />
        <p className="mt-5 text-lg font-bold text-white">جاري فتح الوصول الكامل</p>
        <p className="mt-3 text-sm leading-8 text-mist-300">{message}</p>
      </div>
    );
  }

  if (status === "error") {
    return (
      <div className="rounded-[1.8rem] border border-rose-400/20 bg-rose-500/10 p-6 text-center">
        <p className="text-lg font-bold text-white">تعذر إتمام التحديث</p>
        <p className="mt-3 text-sm leading-8 text-rose-100">{message}</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href={slug ? `/checkout?idea=${slug}` : "/checkout"} className="premium-button motion-button">
            العودة إلى الدفع
          </Link>
          <Link href="/dashboard/purchases" className="secondary-button motion-button">
            فتح مشترياتي
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="rounded-[1.8rem] border border-emerald-400/20 bg-emerald-500/10 p-6 text-center">
      <p className="text-lg font-bold text-white">تم فتح المحتوى بنجاح</p>
      <p className="mt-3 text-sm leading-8 text-emerald-100">{message}</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {slug ? (
          <Link href={`/ideas/${slug}`} className="premium-button motion-button">
            فتح صفحة الفكرة
          </Link>
        ) : null}
        <Link href="/dashboard/purchases" className="secondary-button motion-button">
          الانتقال إلى مشترياتي
        </Link>
      </div>
    </div>
  );
}
