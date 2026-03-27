import Link from "next/link";
import { LockedContent } from "@/components/ideas/locked-content";

export function PurchaseGate({
  ideaTitle,
  purchaseHref,
}: {
  ideaTitle: string;
  purchaseHref: string;
}) {
  return (
    <div className="space-y-4">
      <LockedContent
        title="هذا المحتوى متاح بعد الشراء"
        description={`قم بشراء "${ideaTitle}" لفتح خطة التنفيذ الكاملة، محتوى الباقة، الملفات العملية، وكل التفاصيل النهائية.`}
      />

      <div className="rounded-[1.8rem] border border-brand-400/18 bg-gradient-to-l from-brand-400/12 to-transparent p-5">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold text-brand-100">الوصول الكامل مقفّل حاليًا</p>
            <p className="mt-2 text-sm leading-7 text-mist-200">افتح المحتوى الكامل من خلال إتمام الدفع التجريبي ثم عد إلى صفحة الفكرة أو صفحة مشترياتي.</p>
          </div>
          <Link href={purchaseHref} className="premium-button motion-button shrink-0">
            شراء الفكرة
          </Link>
        </div>
      </div>
    </div>
  );
}
