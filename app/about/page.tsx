import { PageIntro } from "@/components/layout/page-intro";
import { platformMetrics } from "@/lib/data";

const pillars = [
  "تحويل الأفكار الخام إلى عروض قابلة للفهم والشراء.",
  "إتاحة بيئة عربية احترافية للبائعين والمشترين.",
  "تصميم تجربة حيّة وغنية بالمحتوى بدل الصفحات الفارغة.",
];

export default function AboutPage() {
  return (
    <div className="shell mt-10 space-y-8">
      <PageIntro
        badge="من نحن"
        title="عن سوق الأفكار"
        description="سوق الأفكار هو تصور لمنصة عربية متخصصة في بيع وشراء الأفكار الجاهزة وباقات التنفيذ، بدءًا من أفكار المشاريع والمتاجر وحتى المحتوى والتطبيقات والخدمات الرقمية."
        aside={
          <>
            <h2 className="text-lg font-bold text-white">رؤيتنا</h2>
            <p className="mt-3 text-sm leading-7 text-mist-300">
              بناء منصة عربية موثوقة تجعل الأفكار أصلًا رقميًا قابلاً للعرض والمقارنة والشراء.
            </p>
          </>
        }
      />

      <section className="grid gap-5 md:grid-cols-3">
        {pillars.map((item) => (
          <div key={item} className="panel p-5">
            <p className="text-lg font-bold text-white">{item}</p>
          </div>
        ))}
      </section>

      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
        {platformMetrics.map((metric) => (
          <div key={metric.label} className="panel p-5">
            <p className="text-sm text-mist-300">{metric.label}</p>
            <p className="mt-2 text-2xl font-black text-white">{metric.value}</p>
            <p className="mt-2 text-sm text-brand-100">{metric.change}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
