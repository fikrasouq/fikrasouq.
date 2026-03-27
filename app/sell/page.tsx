import { SellIdeaForm } from "@/components/forms/sell-idea-form";
import { PageIntro } from "@/components/layout/page-intro";

const tips = [
  "ابدأ بعنوان يوضح السوق المستهدف والقيمة العملية مباشرة.",
  "اكتب معاينة تمنح المشتري سببًا واضحًا للثقة قبل الشراء.",
  "قسّم التنفيذ إلى خطوات حقيقية يمكن تطبيقها لا مجرد وعود عامة.",
  "وضّح حدود الباقة وما الذي يشمله السعر وما لا يشمله.",
];

export default function SellPage() {
  return (
    <div className="shell mt-10 space-y-8">
      <PageIntro
        badge="بوابة البائعين"
        title="حوّل فكرتك إلى عرض جاهز للبيع داخل سوق الأفكار"
        description="هذه الصفحة مصممة كواجهة نشر احترافية: أقسام واضحة، تحقق من الأخطاء، معاينة مباشرة، ونصائح تساعدك على تقديم فكرة قابلة للبيع لا مجرد وصف عام."
        aside={
          <>
            <h2 className="text-lg font-bold text-white">نصائح سريعة</h2>
            <div className="mt-4 space-y-3">
              {tips.map((tip) => (
                <div key={tip} className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-3 text-sm leading-7 text-mist-100">
                  {tip}
                </div>
              ))}
            </div>
          </>
        }
      />

      <SellIdeaForm />
    </div>
  );
}
