import { PageIntro } from "@/components/layout/page-intro";
import { PlatformReviewsBoard } from "@/components/platform/platform-reviews-board";

export default function ReviewsPage() {
  return (
    <div className="shell mt-10 space-y-8">
      <PageIntro
        badge="تقييمات المنصة"
        title="قيّم تجربة FikraSouq / سوق الأفكار"
        description="صفحة تقييمات مستقلة تسمح بإضافة اسم وتقييم بالنجوم وتعليق، ثم تعرض النتائج بشكل جميل ومتناسق مع هوية المشروع."
      />

      <PlatformReviewsBoard />
    </div>
  );
}
