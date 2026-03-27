import Link from "next/link";
import { MotionReveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { categories, sellers } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { Idea } from "@/types";

function findSeller(slug: string) {
  return sellers.find((seller) => seller.slug === slug);
}

function findCategoryName(id: string) {
  return categories.find((category) => category.id === id)?.name ?? "تصنيف عام";
}

export function IdeaCard({ idea }: { idea: Idea }) {
  const seller = findSeller(idea.sellerSlug);
  const categoryName = findCategoryName(idea.categoryId);

  return (
    <MotionReveal className="h-full">
      <article className="group panel motion-card flex h-full flex-col overflow-hidden">
        <div className={`relative min-h-[230px] overflow-hidden bg-gradient-to-bl ${idea.cover}`}>
          <div className="grid-fade absolute inset-0 opacity-50" />
          <div className="motion-float absolute -right-8 top-6 h-24 w-24 rounded-full bg-brand-300/18 blur-3xl" />
          <div className="motion-float-slow absolute bottom-5 left-6 h-16 w-16 rounded-full bg-white/10 blur-2xl" />

          <div className="relative flex h-full flex-col justify-between p-5">
            <div className="flex flex-wrap items-center gap-2">
              {idea.isNew ? <Badge tone="success">جديد</Badge> : null}
              {idea.trusted ? <Badge tone="brand">موثوق</Badge> : null}
              {idea.bestSeller ? <Badge tone="rose">الأكثر مبيعًا</Badge> : null}
              {idea.featured ? <Badge>مميز</Badge> : null}
            </div>

            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-ink-950/60 px-4 py-2 text-xs font-medium text-white shadow-lg backdrop-blur-md">
                <span className="h-2 w-2 rounded-full bg-brand-300 shadow-[0_0_18px_rgba(248,171,50,0.6)]" />
                <span>{idea.type}</span>
              </div>

              <div className="flex items-end justify-between gap-4">
                <p className="max-w-[15rem] text-sm leading-7 text-white/90">{idea.heroNote}</p>
                <div className="rounded-[1.4rem] border border-white/12 bg-ink-950/70 px-4 py-3 text-left shadow-xl backdrop-blur-md">
                  <p className="text-[11px] text-white/65">سعر الفكرة</p>
                  <p className="mt-1 text-lg font-black text-white">{formatCurrency(idea.price)}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-1 flex-col gap-5 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="surface-chip">{categoryName}</div>
            <div className="surface-chip">{idea.beginnerFriendly ? "مناسبة للمبتدئين" : "تحتاج خبرة أولية"}</div>
          </div>

          <div className="space-y-3">
            <h3 className="text-xl font-black leading-8 text-white transition duration-200 group-hover:text-brand-100">{idea.title}</h3>
            <p className="text-sm leading-8 text-mist-300">{idea.shortDescription}</p>
          </div>

          <div className="grid grid-cols-2 gap-3 rounded-[1.7rem] border border-white/10 bg-white/5 p-4 text-sm">
            <div className="rounded-2xl bg-white/5 p-3">
              <p className="text-xs text-mist-400">البائع</p>
              <p className="mt-1 font-semibold text-white">{seller?.name ?? "بائع معتمد"}</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-3">
              <p className="text-xs text-mist-400">التقييم</p>
              <p className="mt-1 font-semibold text-white">{idea.rating} / 5</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-3">
              <p className="text-xs text-mist-400">المبيعات</p>
              <p className="mt-1 font-semibold text-white">{idea.purchases} عملية</p>
            </div>
            <div className="rounded-2xl bg-white/5 p-3">
              <p className="text-xs text-mist-400">مستوى التنفيذ</p>
              <p className="mt-1 font-semibold text-white">{idea.difficulty}</p>
            </div>
          </div>

          <div className="grid gap-3 rounded-[1.7rem] border border-white/10 bg-gradient-to-b from-white/5 to-white/[0.03] p-4 sm:grid-cols-2">
            <div>
              <p className="text-xs text-mist-400">ميزانية البداية</p>
              <p className="mt-1 text-sm font-semibold text-white">{idea.startingBudget}</p>
            </div>
            <div>
              <p className="text-xs text-mist-400">أرباح تقديرية</p>
              <p className="mt-1 text-sm font-semibold text-white">{idea.expectedProfit}</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2">
            {idea.tags.slice(0, 4).map((tag) => (
              <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-mist-200 transition duration-200 group-hover:bg-white/10">
                {tag}
              </span>
            ))}
          </div>

          <div className="mt-auto flex items-center justify-between gap-4 border-t border-white/8 pt-4">
            <div>
              <p className="text-xs text-mist-400">زمن التجهيز المبدئي</p>
              <p className="mt-1 text-sm font-semibold text-white">{idea.setupTime}</p>
            </div>

            <Link href={`/ideas/${idea.slug}`} className="premium-button motion-button">
              عرض التفاصيل
            </Link>
          </div>
        </div>
      </article>
    </MotionReveal>
  );
}
