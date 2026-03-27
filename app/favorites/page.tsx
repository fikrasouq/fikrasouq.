import { FavoritesBoard } from "@/components/favorites/favorites-board";
import { PageIntro } from "@/components/layout/page-intro";

export default function FavoritesPage() {
  return (
    <div className="shell mt-10 space-y-8">
      <PageIntro
        badge="المفضلة"
        title="الأفكار المحفوظة للمراجعة لاحقًا"
        description="صفحة مفضلة مرتبطة فعليًا بزر إضافة إلى المفضلة داخل صفحة الفكرة، بحيث تصبح التجربة منطقية ومتسقة."
      />

      <FavoritesBoard />
    </div>
  );
}
