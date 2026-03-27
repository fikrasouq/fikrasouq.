import { notFound } from "next/navigation";
import { IdeaCard } from "@/components/ideas/idea-card";
import { Badge } from "@/components/ui/badge";
import { getIdeasBySeller, getSellerBySlug, reviews, sellers } from "@/lib/data";

export function generateStaticParams() {
  return sellers.map((seller) => ({ slug: seller.slug }));
}

export default function SellerProfilePage({ params }: { params: { slug: string } }) {
  const seller = getSellerBySlug(params.slug);

  if (!seller) {
    notFound();
  }

  const sellerIdeas = getIdeasBySeller(seller.slug);
  const sellerReviews = reviews.filter((review) => review.sellerSlug === seller.slug);

  return (
    <div className="shell mt-10 space-y-8">
      <section className="panel grid-fade relative overflow-hidden p-7 xl:grid-cols-[1fr_340px]">
        <div className="motion-float absolute -right-10 top-10 h-28 w-28 rounded-full bg-brand-400/12 blur-3xl" />
        <div className="relative z-10 grid gap-6 xl:grid-cols-[1fr_340px]">
          <div>
            <div className="flex items-center gap-4">
              <div className={`flex h-20 w-20 items-center justify-center rounded-[2rem] bg-gradient-to-br ${seller.accent} text-2xl font-black text-white shadow-lg`}>
                {seller.name.slice(0, 1)}
              </div>
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-3xl font-black text-white">{seller.name}</h1>
                  {seller.verified ? <Badge tone="brand">موثوق</Badge> : <Badge>قيد التوثيق</Badge>}
                </div>
                <p className="mt-2 text-base text-mist-300">{seller.title}</p>
              </div>
            </div>

            <p className="mt-5 max-w-4xl text-base leading-8 text-mist-200">{seller.bio}</p>

            <div className="mt-5 flex flex-wrap gap-2">
              {seller.specialties.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>

            <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
              <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-mist-400">التقييم</p>
                <p className="mt-2 text-lg font-bold text-white">{seller.rating} / 5</p>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-mist-400">الأفكار المنشورة</p>
                <p className="mt-2 text-lg font-bold text-white">{seller.ideasCount}</p>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-mist-400">المبيعات</p>
                <p className="mt-2 text-lg font-bold text-white">{seller.salesCount}</p>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-mist-400">تاريخ الانضمام</p>
                <p className="mt-2 text-lg font-bold text-white">{seller.joinedAt}</p>
              </div>
            </div>
          </div>

          <aside className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
            <h2 className="text-lg font-bold text-white">الثقة والأداء</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-[1.4rem] border border-white/8 bg-white/5 p-4">
                <p className="text-sm text-mist-400">الموقع</p>
                <p className="mt-1 font-semibold text-white">{seller.location}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/8 bg-white/5 p-4">
                <p className="text-sm text-mist-400">زمن الاستجابة</p>
                <p className="mt-1 font-semibold text-white">{seller.responseTime}</p>
              </div>
              <div className="rounded-[1.4rem] border border-white/8 bg-white/5 p-4">
                <p className="text-sm text-mist-400">معدل الإنجاز</p>
                <p className="mt-1 font-semibold text-white">{seller.completionRate}</p>
              </div>
            </div>
          </aside>
        </div>
      </section>

      <section className="grid gap-6 xl:grid-cols-[0.95fr_1.05fr]">
        <div className="panel p-5">
          <h2 className="text-xl font-bold text-white">نبذة وحالة الثقة</h2>
          <div className="mt-4 space-y-4 text-sm leading-8 text-mist-200">
            <p>{seller.shortBio}</p>
            <p>يعمل هذا البائع في مسارات ذات طلب واضح داخل السوق ويملك سجلًا جيدًا في سرعة الرد وجودة التسليم.</p>
          </div>

          <div className="mt-5 space-y-3">
            {seller.achievements.map((item) => (
              <div key={item} className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-3 text-sm text-mist-100">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="panel p-5">
          <h2 className="text-xl font-bold text-white">مراجعات المستخدمين</h2>
          <div className="mt-4 space-y-4">
            {sellerReviews.map((review) => (
              <div key={review.id} className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div>
                    <p className="font-bold text-white">{review.userName}</p>
                    <p className="text-sm text-mist-300">{review.userRole}</p>
                  </div>
                  <span className="pill">{review.rating} / 5</span>
                </div>
                <p className="mt-3 text-sm font-bold text-white">{review.title}</p>
                <p className="mt-2 text-sm leading-8 text-mist-300">{review.comment}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="space-y-5">
        <div>
          <h2 className="text-3xl font-black text-white">الأفكار المنشورة</h2>
          <p className="mt-2 text-sm text-mist-300">كل ما يعرضه هذا البائع حاليًا داخل المنصة من أفكار وباقات تنفيذ.</p>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {sellerIdeas.map((idea) => (
            <IdeaCard key={idea.slug} idea={idea} />
          ))}
        </div>
      </section>
    </div>
  );
}
