import { PageIntro } from "@/components/layout/page-intro";
import { faqs } from "@/lib/data";

const categories = ["الشراء", "البيع", "التوثيق", "المشتريات", "المدفوعات", "البلاغات"];

export default function HelpPage() {
  return (
    <div className="shell mt-10 space-y-8">
      <PageIntro
        badge="مركز المساعدة"
        title="مقالات وإجابات سريعة للمستخدمين والبائعين"
        description="صفحة دعم شاملة نسبيًا تتضمن فئات واضحة وأجوبة جاهزة لتقليل الاحتكاك وإظهار اكتمال المنتج."
      />

      <section className="grid gap-5 md:grid-cols-3 xl:grid-cols-6">
        {categories.map((item) => (
          <div key={item} className="panel p-5 text-center text-sm font-bold text-white">
            {item}
          </div>
        ))}
      </section>

      <section className="space-y-4">
        {faqs.map((faq) => (
          <div key={faq.id} className="panel p-5">
            <h2 className="text-lg font-bold text-white">{faq.question}</h2>
            <p className="mt-3 text-sm leading-7 text-mist-300">{faq.answer}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
