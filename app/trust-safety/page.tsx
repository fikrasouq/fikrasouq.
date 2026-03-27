import { PageIntro } from "@/components/layout/page-intro";

const items = [
  "عرض حالة التوثيق ومعدل الاستجابة والإنجاز لكل بائع.",
  "إمكانية الإبلاغ عن الأفكار أو المحتوى المشبوه من صفحة التفاصيل.",
  "معاينة واضحة قبل الشراء لتقليل المفاجآت وسوء الفهم.",
  "مراجعات وتقييمات وعلامات موثوقية موزعة عبر المنصة.",
];

export default function TrustSafetyPage() {
  return (
    <div className="shell mt-10 space-y-8">
      <PageIntro
        badge="الثقة والأمان"
        title="كيف نبني الثقة داخل المنصة"
        description="صفحة توضح عناصر الموثوقية والحماية وآليات الإبلاغ والمراجعة التي تجعل التجربة أقرب إلى سوق حقيقي."
      />

      <section className="grid gap-5 md:grid-cols-2">
        {items.map((item) => (
          <div key={item} className="panel p-5">
            <p className="text-base leading-8 text-mist-100">{item}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
