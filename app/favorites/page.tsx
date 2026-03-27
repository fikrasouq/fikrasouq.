import Link from "next/link";
import { IdeaCard } from "@/components/ideas/idea-card";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/layout/page-intro";
import { ideas } from "@/lib/data";

const savedIdeas = ideas.slice(0, 6);

export default function FavoritesPage() {
  return (
    <div className="shell mt-10 space-y-8">
      <PageIntro
        badge="المفضلة"
        title="الأفكار المحفوظة للمراجعة لاحقًا"
        description="صفحة مفضلة حقيقية ظاهريًا تساعد المستخدم على حفظ الأفكار ومقارنتها لاحقًا قبل اتخاذ قرار الشراء."
      />

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {savedIdeas.map((idea) => (
          <IdeaCard key={idea.slug} idea={idea} />
        ))}
      </section>

      <EmptyState
        title="قائمة إضافية فارغة"
        description="مثال على حالة فارغة جميلة إذا أراد المستخدم إنشاء قائمة مفضلة مخصصة لتصنيف معين ولم يضف إليها أي فكرة بعد."
        action={
          <Link href="/ideas" className="rounded-full bg-gradient-to-l from-brand-400 to-brand-600 px-5 py-3 text-sm font-bold text-ink-950">
            ابدأ التصفح
          </Link>
        }
      />
    </div>
  );
}
