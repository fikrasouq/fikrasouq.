import { FeedbackBoard } from "@/components/feedback/feedback-board";
import { PageIntro } from "@/components/layout/page-intro";

export default function FeedbackPage() {
  return (
    <div className="shell mt-10 space-y-8">
      <PageIntro
        badge="شاركنا رأيك"
        title="الاقتراحات والملاحظات والمشكلات"
        description="مساحة واضحة للمستخدمين لإرسال الاقتراحات أو الملاحظات أو المشاكل، مع حفظ محلي ورسائل نجاح وتجربة أقرب إلى منتج حقيقي."
      />

      <FeedbackBoard />
    </div>
  );
}
