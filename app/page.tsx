import Link from "next/link";
import { EarlyAccessForm } from "@/components/forms/early-access-form";
import { IdeaCard } from "@/components/ideas/idea-card";
import { LaunchGuideModal } from "@/components/home/launch-guide-modal";
import { MotionReveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { StatCard } from "@/components/ui/stat-card";
import {
  bestSellerIdeas,
  categories,
  faqs,
  featuredIdeas,
  newIdeas,
  platformMetrics,
  testimonials,
  verifiedSellers,
} from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

const launchFlow = [
  {
    step: "01",
    title: "اختر فكرة جاهزة أو باقة تنفيذ",
    description: "ابدأ من فكرة موثقة ومصنفة بدل الدوران بين اقتراحات عامة بلا قيمة تشغيلية واضحة.",
  },
  {
    step: "02",
    title: "راجع المعاينة والتكلفة والمخاطر",
    description: "كل عرض يوضح لمن يصلح، وما الذي يتضمنه، والميزانية المتوقعة، والزمن الأدنى للانطلاق.",
  },
  {
    step: "03",
    title: "نفّذ بسرعة أو انشر فكرتك للبيع",
    description: "المنصة تخدم المشتري والبائع معًا: شراء مباشر، أو نشر فكرة بصياغة واضحة وقابلة للبيع.",
  },
];

const premiumReasons = [
  {
    title: "قيمة عملية وليست عناوين ملهمة",
    description: "كل فكرة هنا مرتبطة بخطة تنفيذ، أدوات، جمهور، ونطاق ربح تقديري حتى تكون قابلة للاختبار فعليًا.",
  },
  {
    title: "سوق عربي قريب من الواقع",
    description: "المحتوى مبني بعقلية السوق الخليجي والسعودي، من المشاريع الخفيفة إلى الباقات الجاهزة للبدء السريع.",
  },
  {
    title: "ثقة أعلى قبل الدفع",
    description: "ملف البائع، التقييمات، الوسوم، حالة التوثيق، وعدد المبيعات كلها عناصر ظاهرة في أماكنها الصحيحة.",
  },
  {
    title: "واجهة سوق حقيقية وليست عرضًا بسيطًا",
    description: "فلاتر، بطاقات، تبويبات، لوحات، حالات فارغة، وإحصائيات حية تعطي إحساس منتج startup جاهز للعرض.",
  },
];

const sellerProof = [
  "بائعون موثقون بملفات واضحة ومراجعات حقيقية",
  "أفكار قابلة للشراء الفوري أو التفضيل أو الإضافة للسلة",
  "تركيز على مشاريع رقمية ومحلية ذات بداية واقعية",
];

export default function HomePage() {
  return (
    <div className="space-y-24 pt-10">
      <section className="shell">
        <div className="grid gap-6 xl:grid-cols-[1.15fr_0.85fr]">
          <MotionReveal>
            <div className="panel grid-fade relative overflow-hidden px-7 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
              <div className="motion-float absolute -right-16 top-12 h-40 w-40 rounded-full bg-brand-400/14 blur-3xl" />
              <div className="motion-float-slow absolute bottom-8 left-8 h-28 w-28 rounded-full bg-amber-300/10 blur-3xl" />
              <div className="motion-spin-soft absolute left-1/2 top-10 h-52 w-52 -translate-x-1/2 rounded-full border border-white/5" />

              <div className="relative z-10 max-w-4xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="pill">FikraSouq • سوق الأفكار</span>
                  <span className="surface-chip">منصة لبيع وشراء الأفكار وباقات التنفيذ الجاهزة</span>
                </div>

                <h1 className="mt-7 text-4xl font-black leading-[1.2] text-white sm:text-5xl lg:text-6xl">
                  أفكار عربية جاهزة
                  <span className="block bg-gradient-to-l from-brand-100 via-white to-brand-300 bg-clip-text text-transparent">
                    تتحول إلى مشاريع قابلة للتنفيذ والبيع
                  </span>
                </h1>

                <p className="mt-6 max-w-3xl text-base leading-8 text-mist-200 sm:text-lg">
                  سوق الأفكار ليس معرض إلهام عابر، بل marketplace عربي يعرض فكرة + شرح + خطوات تنفيذ + قيمة تشغيلية
                  واضحة. ستجد أفكار مشاريع، متاجر، محتوى، تطبيقات، وخدمات مع باقات جاهزة للانطلاق بسرعة.
                </p>

                <div className="mt-8 flex flex-wrap gap-3">
                  <Link href="/ideas" className="premium-button motion-button">
                    استعرض الأفكار
                  </Link>
                  <Link href="/sell" className="secondary-button motion-button">
                    بع فكرتك
                  </Link>
                  <LaunchGuideModal />
                </div>

                <div className="mt-8 flex flex-wrap gap-3 text-sm text-mist-200">
                  {sellerProof.map((item) => (
                    <div key={item} className="surface-chip">
                      <span className="h-2 w-2 rounded-full bg-brand-400" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="relative z-10 mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
                {platformMetrics.map((metric) => (
                  <StatCard key={metric.label} metric={metric} />
                ))}
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={120}>
            <div className="space-y-6">
              <div className="panel overflow-hidden p-6">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="text-sm text-mist-300">نبض السوق الآن</p>
                    <h2 className="mt-2 text-2xl font-black text-white">لقطة سريعة من العروض الحية</h2>
                  </div>
                  <span className="rounded-full border border-emerald-400/20 bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-100">
                    محدثة اليوم
                  </span>
                </div>

                <div className="mt-5 space-y-4">
                  {featuredIdeas.slice(0, 3).map((idea, index) => (
                    <div key={idea.slug} className="motion-card rounded-[1.7rem] border border-white/10 bg-white/5 p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <div className="mb-2 flex items-center gap-2">
                            <span className="rounded-full bg-brand-400/15 px-2.5 py-1 text-[11px] font-semibold text-brand-100">
                              #{index + 1}
                            </span>
                            <span className="text-xs text-mist-400">{idea.type}</span>
                          </div>
                          <h3 className="text-base font-bold leading-7 text-white">{idea.title}</h3>
                        </div>
                        <div className="text-left">
                          <p className="text-[11px] text-mist-400">السعر</p>
                          <p className="mt-1 text-base font-black text-white">{formatCurrency(idea.price)}</p>
                        </div>
                      </div>

                      <div className="mt-4 grid grid-cols-3 gap-3 text-xs">
                        <div className="rounded-2xl bg-white/5 p-3">
                          <p className="text-mist-400">التقييم</p>
                          <p className="mt-1 font-bold text-white">{idea.rating}</p>
                        </div>
                        <div className="rounded-2xl bg-white/5 p-3">
                          <p className="text-mist-400">المشتريات</p>
                          <p className="mt-1 font-bold text-white">{idea.purchases}</p>
                        </div>
                        <div className="rounded-2xl bg-white/5 p-3">
                          <p className="text-mist-400">الصعوبة</p>
                          <p className="mt-1 font-bold text-white">{idea.difficulty}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel p-6">
                <div className="mb-5 flex items-center justify-between">
                  <div>
                    <p className="text-sm text-mist-300">كيف تبدأ</p>
                    <h2 className="mt-2 text-2xl font-black text-white">رحلة استخدام مختصرة وواضحة</h2>
                  </div>
                  <span className="pill">3 خطوات</span>
                </div>

                <div className="space-y-4">
                  {launchFlow.map((item) => (
                    <div key={item.step} className="motion-card rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
                      <div className="flex items-center gap-3">
                        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-brand-400/15 text-sm font-black text-brand-100">
                          {item.step}
                        </div>
                        <h3 className="text-lg font-bold text-white">{item.title}</h3>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-mist-300">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>

      <section className="shell">
        <SectionHeading
          eyebrow="التصنيفات"
          title="تصنيفات واسعة تغطي السوق الرقمي والمحلي وتوضح الفرص حسب نوع الاستخدام"
          description="تم ترتيب المحتوى ضمن أقسام عملية لتسهيل الوصول إلى الفكرة المناسبة حسب الميزانية والجمهور ونوع التنفيذ."
          action={
            <Link href="/ideas" className="secondary-button motion-button">
              تصفح كل التصنيفات
            </Link>
          }
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-5">
          {categories.map((category, index) => (
            <MotionReveal key={category.id} delay={index * 40}>
              <div className="panel motion-card h-full p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="rounded-full bg-brand-400/12 px-3 py-1 text-xs font-semibold text-brand-100">{category.label}</span>
                  <span className="text-xs text-mist-400">{category.totalIdeas} فكرة</span>
                </div>
                <h3 className="mt-5 text-xl font-black text-white">{category.name}</h3>
                <p className="mt-3 text-sm leading-8 text-mist-300">{category.description}</p>
                <div className="mt-6 flex items-center gap-2 text-xs text-mist-300">
                  <span className="h-2 w-2 rounded-full bg-brand-400" />
                  <span>جاهز للتصفح والفرز والمقارنة</span>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </section>

      <section className="shell">
        <SectionHeading
          eyebrow="أفكار مميزة"
          title="عروض مختارة تبدو كمنتجات حقيقية جاهزة للبيع والاختبار السريع"
          description="بطاقات مليئة بالتفاصيل الأساسية: السعر، البائع، التقييم، المبيعات، الصعوبة، ميزانية البداية، والأرباح التقديرية."
          action={
            <Link href="/ideas" className="ghost-button motion-button hover:text-white">
              عرض السوق كاملًا
            </Link>
          }
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {featuredIdeas.map((idea) => (
            <IdeaCard key={idea.slug} idea={idea} />
          ))}
        </div>
      </section>

      <section className="shell">
        <div className="grid gap-6 xl:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="الأكثر مبيعًا"
              title="العروض التي ينجذب لها المشترون أكثر من غيرها"
              description="هذا القسم يبرز الأفكار التي حققت تفاعلًا أعلى ومبيعات أكثر داخل السوق."
            />
            <div className="grid gap-5 md:grid-cols-2">
              {bestSellerIdeas.slice(0, 4).map((idea) => (
                <IdeaCard key={idea.slug} idea={idea} />
              ))}
            </div>
          </div>

          <div>
            <SectionHeading
              eyebrow="أفكار جديدة"
              title="إضافات حديثة تمنح السوق إحساسًا دائمًا بالتجدد"
              description="أفكار أضيفت مؤخرًا وتناسب من يريد التقاط الفرص قبل ازدحام المنافسة."
            />
            <div className="grid gap-5 md:grid-cols-2">
              {newIdeas.slice(0, 4).map((idea) => (
                <IdeaCard key={idea.slug} idea={idea} />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="shell">
        <SectionHeading
          eyebrow="البائعون المميزون"
          title="خبرات متنوعة وراء العروض المعروضة داخل المنصة"
          description="كل بائع يمتلك ملفًا واضحًا يتضمن نبذة ومؤشرات أداء ومجالات تخصص تمنح المشتري قرارًا أكثر وعيًا."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {verifiedSellers.slice(0, 8).map((seller) => (
            <Link key={seller.slug} href={`/sellers/${seller.slug}`} className="panel motion-card block p-5">
              <div className="flex items-center gap-4">
                <div className={`flex h-16 w-16 items-center justify-center rounded-[1.6rem] bg-gradient-to-br ${seller.accent} text-xl font-black text-white shadow-lg`}>
                  {seller.name.slice(0, 1)}
                </div>
                <div>
                  <div className="mb-1 flex items-center gap-2">
                    <h3 className="text-lg font-bold text-white">{seller.name}</h3>
                    {seller.verified ? <span className="rounded-full bg-emerald-500/12 px-2 py-1 text-[10px] font-semibold text-emerald-100">موثق</span> : null}
                  </div>
                  <p className="text-sm text-mist-300">{seller.title}</p>
                </div>
              </div>

              <p className="mt-4 text-sm leading-8 text-mist-300">{seller.shortBio}</p>

              <div className="mt-5 grid grid-cols-3 gap-3 text-center text-sm">
                <div className="rounded-2xl bg-white/5 p-3">
                  <p className="text-mist-400">التقييم</p>
                  <p className="mt-1 font-bold text-white">{seller.rating}</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-3">
                  <p className="text-mist-400">الأفكار</p>
                  <p className="mt-1 font-bold text-white">{seller.ideasCount}</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-3">
                  <p className="text-mist-400">المبيعات</p>
                  <p className="mt-1 font-bold text-white">{seller.salesCount}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="shell">
        <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
          <div className="panel p-6">
            <SectionHeading
              eyebrow="لماذا تختارنا"
              title="منتج عربي واضح القيمة بدل تجربة سطحية أو بطاقات فقيرة"
              description="المنصة مصممة لتوصيل قيمة الفكرة التجارية من أول نظرة وحتى صفحة التفاصيل والشراء."
            />

            <div className="grid gap-4 md:grid-cols-2">
              {premiumReasons.map((item) => (
                <div key={item.title} className="motion-card rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
                  <h3 className="text-lg font-bold text-white">{item.title}</h3>
                  <p className="mt-3 text-sm leading-8 text-mist-300">{item.description}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel p-6">
            <SectionHeading
              eyebrow="كيف تعمل المنصة"
              title="تدفق استخدام مقنع للمشتري والبائع"
              description="من الاستكشاف إلى الشراء أو النشر، كل خطوة لها مكانها داخل تجربة متماسكة بصريًا."
            />

            <div className="space-y-4">
              {launchFlow.map((item) => (
                <div key={item.step} className="motion-card rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="text-lg font-bold text-white">{item.title}</h3>
                    <span className="rounded-full bg-brand-400/12 px-3 py-1 text-xs font-semibold text-brand-100">{item.step}</span>
                  </div>
                  <p className="mt-3 text-sm leading-8 text-mist-300">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-[1.8rem] border border-brand-400/15 bg-gradient-to-l from-brand-400/10 to-transparent p-5">
              <p className="text-sm font-semibold text-brand-100">جاهزة لتوسعة لاحقة</p>
              <p className="mt-2 text-sm leading-8 text-mist-200">
                البنية الحالية تعمل ببيانات محلية منظمة، لكنها مجهزة بصريًا وهيكليًا لتوصيلها لاحقًا بخدمات خلفية حقيقية.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="shell">
        <SectionHeading
          eyebrow="آراء المستخدمين"
          title="تجارب عربية متنوعة تعكس القيمة العملية للمنصة"
          description="أضفنا شهادات استخدام من زوايا مختلفة: طلاب، مستقلون، أصحاب مشاريع، وصنّاع محتوى."
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {testimonials.slice(0, 6).map((item) => (
            <MotionReveal key={item.id}>
              <div className="panel motion-card h-full p-5">
                <div className="flex items-center justify-between gap-3">
                  <span className="text-3xl font-black text-brand-200">“</span>
                  <span className="surface-chip">{item.metric}</span>
                </div>
                <p className="mt-3 text-sm leading-8 text-mist-200">{item.quote}</p>
                <div className="mt-5 border-t border-white/8 pt-4">
                  <p className="text-base font-bold text-white">{item.name}</p>
                  <p className="mt-1 text-sm text-mist-300">
                    {item.role} • {item.company}
                  </p>
                </div>
              </div>
            </MotionReveal>
          ))}
        </div>
      </section>

      <section className="shell">
        <div className="grid gap-6 xl:grid-cols-[1fr_0.92fr]">
          <div className="panel p-6">
            <SectionHeading
              eyebrow="الأسئلة الشائعة"
              title="إجابات سريعة قبل أول شراء أو أول عملية بيع"
              description="قسم واضح يشرح طبيعة المنصة، نوع العروض، وكيفية البيع والتوثيق وحفظ العروض."
            />

            <div className="space-y-4">
              {faqs.slice(0, 4).map((faq) => (
                <div key={faq.id} className="rounded-[1.7rem] border border-white/10 bg-white/5 p-5">
                  <h3 className="text-lg font-bold text-white">{faq.question}</h3>
                  <p className="mt-3 text-sm leading-8 text-mist-300">{faq.answer}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="panel overflow-hidden p-6">
            <div className="relative">
              <div className="motion-float absolute -right-12 top-0 h-28 w-28 rounded-full bg-brand-400/12 blur-3xl" />
              <div className="motion-float-slow absolute bottom-0 left-0 h-24 w-24 rounded-full bg-amber-300/10 blur-3xl" />

              <div className="relative">
                <span className="pill">انضم مبكرًا</span>
                <h2 className="mt-5 text-3xl font-black leading-[1.35] text-white">احصل على أحدث الأفكار والباقات قبل غيرك</h2>
                <p className="mt-4 text-sm leading-8 text-mist-200">
                  واجهة انضمام تجريبية مصممة لتبدو كجزء من منتج حقيقي: تحديثات دورية، تنبيهات بالأفكار الجديدة،
                  وإطلاقات خاصة بالبائعين والمشترين.
                </p>
              </div>
            </div>

            <div className="mt-6">
              <EarlyAccessForm buttonLabel="انضم إلى القائمة المبكرة" />
            </div>

            <div className="mt-6 grid gap-3 sm:grid-cols-3">
              <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-mist-400">تحديثات السوق</p>
                <p className="mt-2 text-base font-black text-white">أسبوعية</p>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-mist-400">تنبيهات جديدة</p>
                <p className="mt-2 text-base font-black text-white">فورية</p>
              </div>
              <div className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
                <p className="text-xs text-mist-400">تركيز المحتوى</p>
                <p className="mt-2 text-base font-black text-white">سوق عربي عملي</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
