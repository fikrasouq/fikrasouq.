export function PreviewSection({
  preview,
}: {
  preview: string[];
}) {
  return (
    <div className="panel motion-card p-5">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-lg font-bold text-white">معاينة قبل الشراء</h3>
          <p className="mt-2 text-sm leading-7 text-mist-300">هذه المعاينة تعرض جزءًا محدودًا من محتوى الفكرة حتى يفهم المشتري طبيعة العرض قبل الدفع.</p>
        </div>
        <span className="pill">Preview</span>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {preview.map((item) => (
          <div key={item} className="rounded-[1.6rem] border border-white/10 bg-white/5 p-5">
            <p className="text-sm leading-8 text-mist-200">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
