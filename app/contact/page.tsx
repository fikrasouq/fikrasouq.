import { PageIntro } from "@/components/layout/page-intro";

const supportChannels = [
  { title: "البريد الإلكتروني", value: "support@souq-alafkar.test" },
  { title: "واتساب الأعمال", value: "+966 50 000 0000" },
  { title: "ساعات الرد", value: "الأحد إلى الخميس • 9 ص إلى 6 م" },
];

export default function ContactPage() {
  return (
    <div className="shell mt-10 space-y-8">
      <PageIntro
        badge="تواصل معنا"
        title="نحن جاهزون للمساعدة"
        description="صفحة تواصل احترافية تكمّل تجربة المنصة وتعرض قنوات دعم واضحة ونموذج تواصل متكامل باللغة العربية."
        aside={
          <>
            <h2 className="text-lg font-bold text-white">قنوات التواصل</h2>
            <div className="mt-4 space-y-3">
              {supportChannels.map((item) => (
                <div key={item.title} className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-mist-400">{item.title}</p>
                  <p className="mt-1 text-white">{item.value}</p>
                </div>
              ))}
            </div>
          </>
        }
      />

      <section className="panel p-6">
        <form className="grid gap-5 lg:grid-cols-2">
          <input className="input-field" placeholder="الاسم الكامل" />
          <input className="input-field" placeholder="البريد الإلكتروني" />
          <input className="input-field" placeholder="الموضوع" />
          <select className="input-field">
            <option>استفسار عن الشراء</option>
            <option>استفسار عن البيع</option>
            <option>مشكلة تقنية</option>
            <option>اقتراح تطوير</option>
          </select>
          <div className="lg:col-span-2">
            <textarea className="textarea-field min-h-[180px]" placeholder="اكتب رسالتك هنا بالتفصيل" />
          </div>
          <div className="lg:col-span-2">
            <button type="button" className="rounded-full bg-gradient-to-l from-brand-400 to-brand-600 px-6 py-3 text-sm font-bold text-ink-950">
              إرسال الرسالة
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
