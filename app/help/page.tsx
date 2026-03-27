import { HelpCenter } from "@/components/help/help-center";
import { PageIntro } from "@/components/layout/page-intro";

export default function HelpPage() {
  return (
    <div className="shell mt-10 space-y-8">
      <PageIntro
        badge="مركز المساعدة"
        title="مقالات وإجابات سريعة للمستخدمين والبائعين"
        description="صفحة دعم شاملة تتضمن تصنيفات واضحة، بحثًا سريعًا، وأكورديون تفاعليًا يفتح ويغلق بشكل صحيح حتى تبدو أقرب إلى مركز مساعدة حقيقي."
      />

      <HelpCenter />
    </div>
  );
}
