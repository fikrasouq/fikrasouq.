import Link from "next/link";
import { EarlyAccessForm } from "@/components/forms/early-access-form";
import { QuickFeedbackForm } from "@/components/feedback/quick-feedback-form";
import { LaunchGuideModal } from "@/components/home/launch-guide-modal";
import { IdeaCard } from "@/components/ideas/idea-card";
import { MotionReveal } from "@/components/motion/reveal";
import { SectionHeading } from "@/components/ui/section-heading";
import { featuredIdeas, platformMetrics } from "@/lib/data";

const howItWorks = [
  {
    step: "01",
    title: "استعرض فكرة واضحة",
    description: "اطّلع على الفكرة، معاينتها، وسياقها العملي قبل أن تتخذ قرار الشراء.",
  },
  {
    step: "02",
    title: "اشترِ ما يناسبك",
    description: "بعد الشراء يُفتح لك المحتوى الكامل وخطة التنفيذ من أول ضغطة.",
  },
  {
    step: "03",
    title: "نفّذ أو بع فكرتك",
    description: "ابدأ التنفيذ مباشرة، أو انشر فكرتك أنت داخل السوق ضمن تجربة بيع واضحة.",
  },
];

const whyFikraSouq = [
  {
    title: "قيمة عملية لا ضوضاء",
    description: "كل عرض مصمم ليكون قابلاً للتنفيذ، لا مجرد عنوان ملهم أو فكرة عامة.",
  },
  {
    title: "محتوى عربي قريب من السوق",
    description: "اللغة، الأمثلة، وطريقة العرض مناسبة للمستخدم العربي والخليجي بشكل طبيعي.",
  },
  {
    title: "منصة أوضح في القرار",
    description: "المعاينة، القفل، المشتريات، والمراجعات كلها تبني قرارًا أكثر ثقة وأقل ترددًا.",
  },
];

export default function HomePage() {
  const heroMetrics = platformMetrics.slice(0, 3);
  const spotlightIdeas = featuredIdeas.slice(0, 3);

  return (
    <div className="space-y-20 pt-10">
      <section className="shell">
        <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
          <MotionReveal>
            <div className="panel relative overflow-hidden px-7 py-8 sm:px-8 sm:py-9 lg:px-10 lg:py-10">
              <div className="motion-float absolute -right-14 top-12 h-36 w-36 rounded-full bg-brand-400/12 blur-3xl" />
              <div className="motion-float-slow absolute bottom-6 left-8 h-24 w-24 rounded-full bg-amber-300/10 blur-3xl" />

              <div className="relative z-10 max-w-4xl">
                <div className="flex flex-wrap items-center gap-3">
                  <span className="pill">FikraSouq • سوق الأفكار</span>
                  <span className="surface-chip">منصة عربية لبيع وشراء الأفكار وباقات التنفيذ الجاهزة</span>
                </div>

                <h1 className="mt-7 text-4xl font-black leading-[1.2] text-white sm:text-5xl lg:text-6xl">
                  اشترِ فكرة جاهزة
                  <span className="block bg-gradient-to-l from-brand-100 via-white to-brand-300 bg-clip-text text-transparent">
                    أو حوّل فكرتك إلى أصل قابل للبيع
                  </span>
                </h1>

                <p className="mt-6 max-w-2xl text-base leading-8 text-mist-200 sm:text-lg">
                  سوق الأفكار منصة عربية تعرض الفكرة مع معاينة واضحة وخطة تنفيذ ومحتوى محمي بعد الشراء، حتى تكون القيمة مفهومة من أول لحظة.
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

                <div className="mt-8 grid gap-3 sm:grid-cols-3">
                  {heroMetrics.map((metric) => (
                    <div key={metric.label} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                      <p className="text-xs text-mist-400">{metric.label}</p>
                      <p className="mt-2 text-2xl font-black text-white">{metric.value}</p>
                      <p className="mt-2 text-xs text-mist-300">{metric.change}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={110}>
            <div className="space-y-6">
              <div className="panel p-6">
                <p className="text-sm text-mist-300">كيف تعمل المنصة؟</p>
                <div className="mt-5 space-y-4">
                  {howItWorks.map((item) => (
                    <div key={item.step} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
                      <div className="flex items-center gap-3">
                        <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-400/15 text-sm font-black text-brand-100">
                          {item.step}
                        </span>
                        <h2 className="text-lg font-bold text-white">{item.title}</h2>
                      </div>
                      <p className="mt-3 text-sm leading-7 text-mist-300">{item.description}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="panel p-6">
                <p className="text-sm text-mist-300">لماذا سوق الأفكار؟</p>
                <div className="mt-5 space-y-3">
                  {whyFikraSouq.map((item) => (
                    <div key={item.title} className="rounded-[1.5rem] border border-white/10 bg-white/5 p-4">
                      <h3 className="text-base font-bold text-white">{item.title}</h3>
                      <p className="mt-2 text-sm leading-7 text-mist-300">{item.description}</p>
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
          eyebrow="نماذج من السوق"
          title="ثلاثة عروض تكفي لتأخذ فكرة واضحة عن طبيعة المنصة"
          description="صفحة البداية لا تعرض كل شيء. هذه مجرد لمحة سريعة قبل الانتقال إلى السوق الكامل."
          action={
            <Link href="/ideas" className="secondary-button motion-button">
              عرض كل الأفكار
            </Link>
          }
        />

        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
          {spotlightIdeas.map((idea) => (
            <IdeaCard key={idea.slug} idea={idea} />
          ))}
        </div>
      </section>

      <section className="shell">
        <div className="grid gap-6 xl:grid-cols-[1fr_0.92fr]">
          <MotionReveal>
            <div className="panel p-6">
              <span className="pill">شاركنا رأيك</span>
              <h2 className="mt-5 text-3xl font-black text-white">ما الذي تتمنى وجوده في المنصة؟</h2>
              <p className="mt-4 max-w-2xl text-sm leading-8 text-mist-200">
                أرسل اقتراحًا سريعًا أو مشكلة أو ملاحظة. النموذج يحفظ الرسائل محليًا الآن، وتم تجهيز نقطة الربط لاحقًا لأي خدمة بريد أو API.
              </p>

              <div className="mt-6">
                <QuickFeedbackForm />
              </div>
            </div>
          </MotionReveal>

          <MotionReveal delay={100}>
            <div className="space-y-6">
              <div className="panel p-6">
                <span className="pill">انضم مبكرًا</span>
                <h2 className="mt-5 text-3xl font-black text-white">احصل على تحديثات الإطلاق قبل الجميع</h2>
                <p className="mt-4 text-sm leading-8 text-mist-200">
                  سجّل بريدك لتصلك الإطلاقات الجديدة والعروض المميزة وتحديثات السوق. النموذج يعمل فعليًا ويعرض رسالة نجاح واضحة.
                </p>

                <div className="mt-6">
                  <EarlyAccessForm buttonLabel="اطلب الوصول المبكر" />
                </div>
              </div>

              <div className="panel p-6">
                <h2 className="text-2xl font-black text-white">هل أنت جاهز للاستكشاف؟</h2>
                <p className="mt-3 text-sm leading-8 text-mist-300">
                  ابدأ من السوق إذا كنت تبحث عن فكرة جاهزة، أو انتقل مباشرة إلى صفحة البيع إذا كان لديك عرض تريد نشره.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Link href="/ideas" className="premium-button motion-button">
                    تصفح السوق
                  </Link>
                  <Link href="/sell" className="secondary-button motion-button">
                    أضف فكرتك الآن
                  </Link>
                </div>
              </div>
            </div>
          </MotionReveal>
        </div>
      </section>
    </div>
  );
}
