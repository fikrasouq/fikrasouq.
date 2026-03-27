import { PageIntro } from "@/components/layout/page-intro";

const clauses = [
  "جميع البيانات الحالية داخل هذه النسخة هي بيانات تجريبية لأغراض العرض.",
  "شراء الفكرة في هذه النسخة لا يرتب معاملة فعلية أو عقدًا قانونيًا حقيقيًا.",
  "للبائع مسؤولية صياغة الفكرة بوضوح وتحديد ما تتضمنه الباقة بدقة.",
  "يحق للإدارة تعليق أو مراجعة أي محتوى مخالف أو مضلل ضمن المنصة.",
  "تحتفظ المنصة بحق تعديل الرسوم والعمولات والسياسات في الإصدارات اللاحقة.",
];

export default function TermsPage() {
  return (
    <div className="shell mt-10 space-y-8">
      <PageIntro
        badge="الشروط والأحكام"
        title="إطار استخدام واضح ومختصر"
        description="صفحة شروط وأحكام عربية متناسقة مع بقية الواجهات، ومكتوبة بصيغة مفهومة بدل التكديس النصي غير المنظم."
      />

      <section className="space-y-4">
        {clauses.map((clause, index) => (
          <div key={clause} className="panel p-5">
            <p className="text-sm font-bold text-brand-100">بند {index + 1}</p>
            <p className="mt-3 text-sm leading-8 text-mist-200">{clause}</p>
          </div>
        ))}
      </section>
    </div>
  );
}
