import { Badge } from "@/components/ui/badge";

export function FullContentSection({
  longDescription,
  includes,
  executionPlan,
  tools,
  risks,
}: {
  longDescription: string;
  includes: string[];
  executionPlan: { step: string; title: string; description: string }[];
  tools: string[];
  risks: string[];
}) {
  return (
    <div id="full-content" className="space-y-5">
      <div className="panel motion-card p-5">
        <h3 className="text-lg font-bold text-white">المحتوى الكامل</h3>
        <p className="mt-4 text-sm leading-8 text-mist-200">{longDescription}</p>
      </div>

      <div className="grid gap-5 xl:grid-cols-2">
        <div className="panel motion-card p-5">
          <h3 className="mb-4 text-lg font-bold text-white">ماذا تشمل الباقة</h3>
          <div className="space-y-3">
            {includes.map((item) => (
              <div key={item} className="rounded-[1.4rem] bg-white/5 px-4 py-3 text-sm text-mist-100">
                {item}
              </div>
            ))}
          </div>
        </div>

        <div className="panel motion-card p-5">
          <h3 className="mb-4 text-lg font-bold text-white">الأدوات المطلوبة</h3>
          <div className="flex flex-wrap gap-2">
            {tools.map((tool) => (
              <Badge key={tool}>{tool}</Badge>
            ))}
          </div>

          <div className="mt-5 rounded-[1.6rem] border border-rose-400/18 bg-rose-500/10 p-4">
            <h4 className="font-bold text-white">ملاحظات ومخاطر</h4>
            <ul className="mt-3 space-y-2 text-sm leading-7 text-rose-100">
              {risks.map((risk) => (
                <li key={risk}>• {risk}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      <div className="panel motion-card p-5">
        <h3 className="mb-4 text-lg font-bold text-white">خطة التنفيذ الكاملة</h3>
        <div className="space-y-4">
          {executionPlan.map((plan) => (
            <div key={plan.step} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-brand-400/12 text-sm font-black text-brand-100">{plan.step}</div>
                <p className="text-base font-bold text-white">{plan.title}</p>
              </div>
              <p className="mt-3 text-sm leading-8 text-mist-300">{plan.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
