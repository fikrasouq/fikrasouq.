import { PageIntro } from "@/components/layout/page-intro";

const plans = [
  {
    name: "خطة البيع الأساسية",
    price: "12%",
    description: "مناسبة للبائعين الجدد الذين يريدون اختبار المنصة دون التزام إضافي.",
    features: ["نشر حتى 5 أفكار", "ظهور قياسي", "تقارير مبيعات أساسية"],
  },
  {
    name: "خطة البائع المميز",
    price: "8%",
    description: "للبائعين النشطين الذين يحتاجون ظهورًا أعلى ومؤشرات أفضل داخل السوق.",
    features: ["نشر غير محدود", "شارة مميزة", "دعم أسرع", "إبراز في الأقسام الرئيسية"],
  },
  {
    name: "خطة الشريك",
    price: "مخصصة",
    description: "للفرق أو المشاريع التي تريد عرض مكتبات أفكار أو باقات تنفيذ على نطاق أوسع.",
    features: ["عمولة تفاوضية", "مساحة عرض خاصة", "مراجعة أولوية", "تقارير موسعة"],
  },
];

export default function PricingPage() {
  return (
    <div className="shell mt-10 space-y-8">
      <PageIntro
        badge="الأسعار والعمولات"
        title="هيكل واضح للعمولات والباقات"
        description="تعرض هذه الصفحة نموذجًا تجريبيًا لكيفية تقديم خطط البائعين والعمولات بشكل منظم وواضح داخل المنصة."
      />

      <section className="grid gap-5 lg:grid-cols-3">
        {plans.map((plan) => (
          <div key={plan.name} className="panel p-6">
            <p className="text-sm text-mist-300">{plan.name}</p>
            <p className="mt-3 text-4xl font-black text-white">{plan.price}</p>
            <p className="mt-3 text-sm leading-7 text-mist-300">{plan.description}</p>
            <div className="mt-5 space-y-3">
              {plan.features.map((feature) => (
                <div key={feature} className="rounded-2xl bg-white/5 px-4 py-3 text-sm text-mist-100">
                  {feature}
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
