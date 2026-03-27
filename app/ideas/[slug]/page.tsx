import Link from "next/link";
import { cookies } from "next/headers";
import { IdeaCard } from "@/components/ideas/idea-card";
import { IdeaDetailTabs } from "@/components/ideas/idea-detail-tabs";
import { Badge } from "@/components/ui/badge";
import { EmptyState } from "@/components/ui/empty-state";
import { getCategoryById, getIdeaBySlug, getRelatedIdeas, getReviewsForIdea, getSellerBySlug } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";
import { getIdeaAccessState, getPurchasedSlugsFromStore } from "@/lib/purchases";

export default function IdeaDetailsPage({ params }: { params: { slug: string } }) {
  const idea = getIdeaBySlug(params.slug);

  if (!idea) {
    return (
      <div className="shell mt-10">
        <EmptyState
          title="هذه الفكرة غير متاحة"
          description="قد تكون الفكرة غير منشورة حاليًا أو لم تعد متوفرة داخل السوق. يمكنك العودة للتصفح واختيار فكرة أخرى."
          action={
            <Link href="/ideas" className="premium-button motion-button">
              العودة إلى التصفح
            </Link>
          }
        />
      </div>
    );
  }

  const seller = getSellerBySlug(idea.sellerSlug);
  const category = getCategoryById(idea.categoryId);

  if (!seller || !category) {
    return (
      <div className="shell mt-10">
        <EmptyState
          title="هذه الفكرة غير متاحة"
          description="البيانات الأساسية لهذه الفكرة غير مكتملة حاليًا، لذلك تعذر عرض الصفحة بالشكل الصحيح."
          action={
            <Link href="/ideas" className="premium-button motion-button">
              العودة إلى التصفح
            </Link>
          }
        />
      </div>
    );
  }

  const reviews = getReviewsForIdea(idea.slug);
  const similarIdeas = getRelatedIdeas(idea.slug, idea.categoryId);
  const purchasedSlugs = getPurchasedSlugsFromStore(cookies());
  const accessState = getIdeaAccessState(idea, purchasedSlugs);
  const purchaseHref = `/checkout?idea=${idea.slug}`;

  const publicIdea = {
    title: idea.title,
    shortDescription: idea.shortDescription,
    categoryName: category.name,
    difficulty: idea.difficulty,
    targetAudience: idea.targetAudience.slice(0, 4),
    startingBudget: idea.startingBudget,
    expectedProfit: idea.expectedProfit,
    marketScope: idea.marketScope,
    setupTime: idea.setupTime,
    beginnerFriendly: idea.beginnerFriendly,
    preview: idea.preview.slice(0, 2),
    tags: idea.tags.slice(0, 5),
  };

  const fullAccessData = accessState.hasAccess
    ? {
        longDescription: idea.longDescription,
        includes: idea.includes,
        executionPlan: idea.executionPlan,
        tools: idea.tools,
        risks: idea.risks,
      }
    : undefined;

  return (
    <div className="shell mt-10 space-y-8">
      <section className="grid gap-6 xl:grid-cols-[minmax(0,1fr)_370px]">
        <div className="space-y-6">
          <div className={`panel grid-fade relative overflow-hidden bg-gradient-to-bl ${idea.cover} p-7 sm:p-8`}>
            <div className="motion-float absolute -right-10 top-10 h-28 w-28 rounded-full bg-brand-400/12 blur-3xl" />
            <div className="motion-float-slow absolute bottom-6 left-8 h-24 w-24 rounded-full bg-white/10 blur-3xl" />

            <div className="relative z-10">
              <div className="flex flex-wrap gap-2">
                {idea.isNew ? <Badge tone="success">جديد</Badge> : null}
                {idea.trusted ? <Badge tone="brand">موثوق</Badge> : null}
                {idea.bestSeller ? <Badge tone="rose">الأكثر مبيعًا</Badge> : null}
                {idea.featured ? <Badge>مميز</Badge> : null}
                <Badge>{category.name}</Badge>
                <Badge tone={accessState.hasAccess ? "success" : "neutral"}>{accessState.hasAccess ? "الوصول الكامل مفتوح" : "معاينة فقط"}</Badge>
              </div>

              <h1 className="mt-6 max-w-4xl text-4xl font-black leading-[1.25] text-white sm:text-5xl">{idea.title}</h1>
              <p className="mt-5 max-w-3xl text-base leading-8 text-mist-100">{idea.shortDescription}</p>

              <div className="mt-6 flex flex-wrap gap-3 text-sm text-mist-100">
                <span className="pill">البائع: {seller.name}</span>
                <span className="pill">التقييم: {idea.rating} / 5</span>
                <span className="pill">المبيعات: {idea.purchases}</span>
                <span className="pill">الصعوبة: {idea.difficulty}</span>
              </div>

              <div className="mt-8 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <div className="rounded-[1.6rem] border border-white/10 bg-ink-950/45 p-4 backdrop-blur-md">
                  <p className="text-xs text-white/65">نوع العرض</p>
                  <p className="mt-2 font-bold text-white">{idea.type}</p>
                </div>
                <div className="rounded-[1.6rem] border border-white/10 bg-ink-950/45 p-4 backdrop-blur-md">
                  <p className="text-xs text-white/65">ميزانية البداية</p>
                  <p className="mt-2 font-bold text-white">{idea.startingBudget}</p>
                </div>
                <div className="rounded-[1.6rem] border border-white/10 bg-ink-950/45 p-4 backdrop-blur-md">
                  <p className="text-xs text-white/65">أرباح تقديرية</p>
                  <p className="mt-2 font-bold text-white">{idea.expectedProfit}</p>
                </div>
                <div className="rounded-[1.6rem] border border-white/10 bg-ink-950/45 p-4 backdrop-blur-md">
                  <p className="text-xs text-white/65">وقت التجهيز</p>
                  <p className="mt-2 font-bold text-white">{idea.setupTime}</p>
                </div>
              </div>
            </div>
          </div>

          <IdeaDetailTabs
            idea={publicIdea}
            seller={seller}
            reviews={reviews}
            accessState={accessState}
            purchaseHref={purchaseHref}
            fullAccessData={fullAccessData}
          />
        </div>

        <aside className="space-y-5">
          <div className="panel sticky top-24 p-6">
            <p className="text-sm text-mist-300">سعر الفكرة أو الباقة</p>
            <p className="mt-2 text-4xl font-black text-white">{formatCurrency(idea.price)}</p>
            <p className="mt-3 text-sm leading-7 text-mist-300">{idea.heroNote}</p>

            <div className="mt-6 rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm font-semibold text-white">{accessState.hasAccess ? "لديك وصول كامل" : "الوصول الكامل مقفّل"}</p>
                  <p className="mt-2 text-sm leading-7 text-mist-300">
                    {accessState.hasAccess
                      ? "يمكنك الآن فتح خطة التنفيذ الكاملة ومحتوى الباقة من هذه الصفحة أو من صفحة مشترياتك."
                      : "ستشاهد المعاينة فقط إلى أن تكتمل عملية الشراء التجريبية لهذه الفكرة."}
                  </p>
                </div>
                <div className={`h-3 w-3 rounded-full ${accessState.hasAccess ? "bg-emerald-400 shadow-[0_0_18px_rgba(74,222,128,0.55)]" : "bg-brand-400 shadow-[0_0_18px_rgba(248,171,50,0.55)]"}`} />
              </div>
            </div>

            <div className="mt-6 space-y-3">
              {accessState.hasAccess ? (
                <>
                  <Link href={`/ideas/${idea.slug}#full-content`} className="premium-button motion-button flex w-full">
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
                  <button type="button" className="secondary-button motion-button w-full">
                    إضافة إلى المفضلة
                  </button>
                </>
              )}

              <button type="button" className="secondary-button motion-button w-full">
                مشاركة الفكرة
              </button>
            </div>

            <div className="mt-6 space-y-3 rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
              <div className="flex items-center justify-between text-sm">
                <span className="text-mist-400">السوق المستهدف</span>
                <span className="text-white">{idea.marketScope}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-mist-400">مناسبة للمبتدئين</span>
                <span className="text-white">{idea.beginnerFriendly ? "نعم" : "لا"}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-mist-400">عدد التقييمات</span>
                <span className="text-white">{reviews.length} مراجعة</span>
              </div>
            </div>
          </div>

          <div className="panel p-5">
            <div className="flex items-center gap-4">
              <div className={`flex h-16 w-16 items-center justify-center rounded-[1.6rem] bg-gradient-to-br ${seller.accent} text-xl font-black text-white shadow-lg`}>
                {seller.name.slice(0, 1)}
              </div>
              <div>
                <div className="mb-1 flex items-center gap-2">
                  <p className="text-lg font-bold text-white">{seller.name}</p>
                  {seller.verified ? <span className="rounded-full bg-emerald-500/12 px-2 py-1 text-[10px] font-semibold text-emerald-100">موثق</span> : null}
                </div>
                <p className="text-sm text-mist-300">{seller.title}</p>
              </div>
            </div>

            <p className="mt-4 text-sm leading-7 text-mist-300">{seller.shortBio}</p>

            <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-mist-400">سرعة الرد</p>
                <p className="mt-1 text-white">{seller.responseTime}</p>
              </div>
              <div className="rounded-2xl bg-white/5 p-4">
                <p className="text-mist-400">معدل الإنجاز</p>
                <p className="mt-1 text-white">{seller.completionRate}</p>
              </div>
            </div>

            <Link href={`/sellers/${seller.slug}`} className="secondary-button motion-button mt-5 flex w-full">
              زيارة ملف البائع
            </Link>
          </div>
        </aside>
      </section>

      <section>
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-black text-white">أفكار مشابهة</h2>
            <p className="mt-2 text-sm leading-7 text-mist-300">يمكنك مقارنة هذه الفكرة بعروض أخرى من نفس التصنيف قبل اتخاذ القرار النهائي.</p>
          </div>
          <Link href="/ideas" className="secondary-button motion-button">
            كل الأفكار
          </Link>
        </div>

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {similarIdeas.map((relatedIdea) => (
            <IdeaCard key={relatedIdea.slug} idea={relatedIdea} />
          ))}
        </div>
      </section>
    </div>
  );
}
