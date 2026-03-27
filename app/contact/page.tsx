import { ContactForm } from "@/components/forms/contact-form";
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
        description="صفحة تواصل احترافية تعرض قنوات الدعم بشكل واضح، مع نموذج يعمل فعليًا برسائل نجاح وتحفظ محلي داخل النسخة الحالية."
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

      <ContactForm />
    </div>
  );
}
