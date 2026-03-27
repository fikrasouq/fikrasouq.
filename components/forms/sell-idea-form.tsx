"use client";

import { startTransition, useEffect, useState } from "react";
import { Toast } from "@/components/ui/toast";

const initialValues = {
  title: "",
  category: "",
  summary: "",
  description: "",
  executionSteps: "",
  audience: "",
  budget: "",
  monetization: "",
  tools: "",
  difficulty: "",
  preview: "",
  fullContent: "",
  price: "",
  keywords: "",
  cover: "",
  packageType: "",
};

const categories = [
  "مشاريع تجارية",
  "متاجر إلكترونية",
  "خدمات رقمية",
  "أفكار للطلاب",
  "تطبيقات ومواقع",
  "صناعة المحتوى",
  "أفكار محلية في السعودية",
  "تطوير الذات",
  "خدمات مدرسية",
  "أفكار موسمية",
];

const packageTypes = ["فكرة فقط", "باقة تنفيذ", "فكرة + تنفيذ"];
const difficultyLevels = ["سهل", "متوسط", "متقدم"];

type ToastState =
  | {
      title: string;
      message: string;
      tone: "success" | "error" | "info";
    }
  | null;

export function SellIdeaForm() {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [success, setSuccess] = useState("");
  const [toast, setToast] = useState<ToastState>(null);

  useEffect(() => {
    if (!toast) {
      return;
    }

    const timeout = window.setTimeout(() => setToast(null), 4200);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  const updateValue = (key: keyof typeof values, value: string) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const showToast = (title: string, message: string, tone: NonNullable<ToastState>["tone"]) => {
    setToast({ title, message, tone });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const nextErrors: Record<string, string> = {};
    if (!values.title.trim()) nextErrors.title = "عنوان الفكرة مطلوب.";
    if (!values.category.trim()) nextErrors.category = "اختر التصنيف المناسب.";
    if (!values.summary.trim()) nextErrors.summary = "أدخل ملخصًا قصيرًا للفكرة.";
    if (!values.description.trim()) nextErrors.description = "الشرح التفصيلي مطلوب.";
    if (!values.packageType.trim()) nextErrors.packageType = "اختر نوع العرض.";
    if (!values.difficulty.trim()) nextErrors.difficulty = "حدد مستوى الصعوبة.";
    if (!values.preview.trim()) nextErrors.preview = "أضف محتوى معاينة واضحًا.";
    if (!values.fullContent.trim()) nextErrors.fullContent = "أضف المحتوى الكامل.";
    if (!values.price.trim() || Number(values.price) <= 0) nextErrors.price = "أدخل سعرًا صالحًا أكبر من صفر.";

    setErrors(nextErrors);
    setSuccess("");

    if (Object.keys(nextErrors).length > 0) {
      showToast("البيانات غير مكتملة", "راجع الحقول المعلّمة ثم أعد الإرسال. النموذج يحتاج معلومات أوضح قبل النشر.", "error");
      return;
    }

    startTransition(() => {
      setSuccess("تم إرسال فكرتك بنجاح إلى فريق المراجعة. عند اعتمادها ستظهر ضمن السوق مع إشعار بحالة النشر.");
      showToast("تم استلام الفكرة", "الطلب وصل بنجاح، ويمكنك الآن متابعة حالة العرض لاحقًا من لوحة التحكم.", "success");
      setValues(initialValues);
      setErrors({});
    });
  };

  const fieldClass = "space-y-2";
  const errorText = (name: string) => (errors[name] ? <p className="text-xs text-rose-200">{errors[name]}</p> : null);
  const previewKeywords = values.keywords
    .split(/[,،]/)
    .map((item) => item.trim())
    .filter(Boolean)
    .slice(0, 6);

  return (
    <>
      {toast ? <Toast title={toast.title} message={toast.message} tone={toast.tone} onClose={() => setToast(null)} /> : null}

      <form onSubmit={handleSubmit} className="space-y-6">
        {success ? (
          <div className="rounded-[2rem] border border-emerald-400/20 bg-emerald-500/10 px-5 py-4 text-sm leading-8 text-emerald-100">
            {success}
          </div>
        ) : null}

        <div className="grid gap-6 2xl:grid-cols-[minmax(0,1fr)_360px]">
          <div className="space-y-6">
            <section className="panel p-6">
              <div className="mb-6 flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm text-mist-300">القسم الأول</p>
                  <h2 className="mt-2 text-2xl font-black text-white">هوية العرض ومكانه داخل السوق</h2>
                </div>
                <span className="pill">أساسيات النشر</span>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <label className={fieldClass}>
                  <span className="text-sm text-mist-200">عنوان الفكرة</span>
                  <input className="input-field" value={values.title} onChange={(e) => updateValue("title", e.target.value)} placeholder="مثال: متجر رقمي لملخصات الطلاب في السعودية" />
                  <p className="text-xs text-mist-400">اكتب عنوانًا مباشرًا يوضح القيمة والسوق المستهدف.</p>
                  {errorText("title")}
                </label>

                <label className={fieldClass}>
                  <span className="text-sm text-mist-200">التصنيف</span>
                  <select className="input-field" value={values.category} onChange={(e) => updateValue("category", e.target.value)}>
                    <option value="">اختر التصنيف</option>
                    {categories.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  {errorText("category")}
                </label>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-[1fr_260px]">
                <label className={fieldClass}>
                  <span className="text-sm text-mist-200">ملخص قصير</span>
                  <textarea className="textarea-field" value={values.summary} onChange={(e) => updateValue("summary", e.target.value)} placeholder="لخّص الفكرة خلال 3 إلى 4 أسطر توضح المشكلة والحل والقيمة." />
                  {errorText("summary")}
                </label>

                <label className={fieldClass}>
                  <span className="text-sm text-mist-200">نوع العرض</span>
                  <select className="input-field" value={values.packageType} onChange={(e) => updateValue("packageType", e.target.value)}>
                    <option value="">اختر النوع</option>
                    {packageTypes.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  <p className="text-xs text-mist-400">هل تبيع الفكرة فقط أم معها باقة تنفيذ؟</p>
                  {errorText("packageType")}
                </label>
              </div>
            </section>

            <section className="panel p-6">
              <div className="mb-6">
                <p className="text-sm text-mist-300">القسم الثاني</p>
                <h2 className="mt-2 text-2xl font-black text-white">القيمة العملية وخطوات التنفيذ</h2>
              </div>

              <label className={fieldClass}>
                <span className="text-sm text-mist-200">شرح تفصيلي</span>
                <textarea className="textarea-field min-h-[180px]" value={values.description} onChange={(e) => updateValue("description", e.target.value)} placeholder="اشرح احتياج السوق، ولماذا الفكرة مقنعة، وما الذي يميزها عن البدائل." />
                {errorText("description")}
              </label>

              <div className="mt-5 grid gap-5 lg:grid-cols-2">
                <label className={fieldClass}>
                  <span className="text-sm text-mist-200">خطوات التنفيذ</span>
                  <textarea className="textarea-field" value={values.executionSteps} onChange={(e) => updateValue("executionSteps", e.target.value)} placeholder="مثال: تجهيز العرض، إعداد القوالب، إطلاق النسخة الأولى، اختبار الطلب..." />
                </label>

                <label className={fieldClass}>
                  <span className="text-sm text-mist-200">الجمهور المستهدف</span>
                  <textarea className="textarea-field" value={values.audience} onChange={(e) => updateValue("audience", e.target.value)} placeholder="من سيشتري الفكرة؟ طلاب، أصحاب متاجر، صناع محتوى، جهات محلية..." />
                </label>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-3">
                <label className={fieldClass}>
                  <span className="text-sm text-mist-200">الميزانية المتوقعة</span>
                  <input className="input-field" value={values.budget} onChange={(e) => updateValue("budget", e.target.value)} placeholder="مثال: 1500 إلى 3000 ريال" />
                </label>

                <label className={fieldClass}>
                  <span className="text-sm text-mist-200">طريقة الربح</span>
                  <input className="input-field" value={values.monetization} onChange={(e) => updateValue("monetization", e.target.value)} placeholder="بيع مباشر، اشتراك، عمولة، باقات شهرية..." />
                </label>

                <label className={fieldClass}>
                  <span className="text-sm text-mist-200">مستوى الصعوبة</span>
                  <select className="input-field" value={values.difficulty} onChange={(e) => updateValue("difficulty", e.target.value)}>
                    <option value="">اختر المستوى</option>
                    {difficultyLevels.map((item) => (
                      <option key={item}>{item}</option>
                    ))}
                  </select>
                  {errorText("difficulty")}
                </label>
              </div>

              <div className="mt-5">
                <label className={fieldClass}>
                  <span className="text-sm text-mist-200">الأدوات المطلوبة</span>
                  <input className="input-field" value={values.tools} onChange={(e) => updateValue("tools", e.target.value)} placeholder="مثال: Canva، سلة، Google Sheets، واتساب للأعمال" />
                </label>
              </div>
            </section>

            <section className="panel p-6">
              <div className="mb-6">
                <p className="text-sm text-mist-300">القسم الثالث</p>
                <h2 className="mt-2 text-2xl font-black text-white">المعاينة والمحتوى القابل للبيع</h2>
              </div>

              <div className="grid gap-5 lg:grid-cols-2">
                <label className={fieldClass}>
                  <span className="text-sm text-mist-200">محتوى المعاينة</span>
                  <textarea className="textarea-field" value={values.preview} onChange={(e) => updateValue("preview", e.target.value)} placeholder="ما الذي سيشاهده المشتري قبل الدفع؟ اكتب نموذجًا مقنعًا وواضحًا." />
                  <p className="text-xs text-mist-400">المعاينة الجيدة ترفع معدل التحويل لأنها تثبت قيمة الفكرة قبل الشراء.</p>
                  {errorText("preview")}
                </label>

                <label className={fieldClass}>
                  <span className="text-sm text-mist-200">المحتوى الكامل</span>
                  <textarea className="textarea-field" value={values.fullContent} onChange={(e) => updateValue("fullContent", e.target.value)} placeholder="اشرح بالضبط ما الذي سيحصل عليه المشتري بعد إتمام الشراء." />
                  {errorText("fullContent")}
                </label>
              </div>

              <div className="mt-5 grid gap-5 lg:grid-cols-3">
                <label className={fieldClass}>
                  <span className="text-sm text-mist-200">السعر</span>
                  <input className="input-field" type="number" value={values.price} onChange={(e) => updateValue("price", e.target.value)} placeholder="250" />
                  {errorText("price")}
                </label>

                <label className={fieldClass}>
                  <span className="text-sm text-mist-200">الكلمات المفتاحية</span>
                  <input className="input-field" value={values.keywords} onChange={(e) => updateValue("keywords", e.target.value)} placeholder="طلاب، متجر رقمي، منتجات تعليمية، Canva" />
                </label>

                <label className={fieldClass}>
                  <span className="text-sm text-mist-200">غلاف أو صورة تجريبية</span>
                  <input className="input-field" value={values.cover} onChange={(e) => updateValue("cover", e.target.value)} placeholder="وصف الغلاف أو اسم الملف" />
                </label>
              </div>
            </section>
          </div>

          <aside className="space-y-5 2xl:sticky 2xl:top-24 2xl:h-fit">
            <div className="panel-soft p-5">
              <div className="mb-4 flex items-center justify-between gap-3">
                <div>
                  <p className="text-sm text-mist-300">معاينة مباشرة</p>
                  <h3 className="mt-1 text-xl font-black text-white">كيف سيبدو العرض للمشتري</h3>
                </div>
                <span className="pill">Preview</span>
              </div>

              <div className="rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="surface-chip">{values.category || "التصنيف سيظهر هنا"}</span>
                  <span className="surface-chip">{values.packageType || "نوع العرض"}</span>
                </div>

                <h4 className="mt-5 text-xl font-black leading-8 text-white">{values.title || "عنوان الفكرة سيظهر هنا"}</h4>
                <p className="mt-3 text-sm leading-8 text-mist-300">
                  {values.summary || "سيظهر هنا الملخص القصير الذي يشرح الفكرة بسرعة ويقنع المشتري بفتح صفحة التفاصيل."}
                </p>

                <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
                  <div className="rounded-2xl bg-white/5 p-3">
                    <p className="text-xs text-mist-400">السعر</p>
                    <p className="mt-1 font-bold text-white">{values.price ? `${values.price} ر.س` : "غير محدد"}</p>
                  </div>
                  <div className="rounded-2xl bg-white/5 p-3">
                    <p className="text-xs text-mist-400">الصعوبة</p>
                    <p className="mt-1 font-bold text-white">{values.difficulty || "غير محدد"}</p>
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-xs text-mist-400">وسوم مقترحة</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {(previewKeywords.length ? previewKeywords : ["وسم 1", "وسم 2", "وسم 3"]).map((tag) => (
                      <span key={tag} className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-mist-200">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            <div className="panel p-5">
              <h3 className="text-lg font-bold text-white">قائمة جاهزية سريعة</h3>
              <div className="mt-4 space-y-3">
                {[
                  "العنوان واضح ومباشر",
                  "المعاينة تظهر قيمة حقيقية",
                  "خطوات التنفيذ قابلة للتطبيق",
                  "السعر متوازن مع حجم الباقة",
                ].map((item) => (
                  <div key={item} className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-3 text-sm text-mist-100">
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>

        <div className="panel flex flex-wrap items-center justify-between gap-4 p-5">
          <div>
            <p className="text-sm text-mist-300">قبل الإرسال</p>
            <p className="mt-1 text-base font-semibold text-white">راجع أن الفكرة تعرض قيمة عملية واضحة وليست وصفًا عامًا فقط.</p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button type="submit" className="premium-button motion-button">
              إرسال الفكرة للمراجعة
            </button>
            <button
              type="button"
              onClick={() => {
                setValues(initialValues);
                setErrors({});
                setSuccess("");
                showToast("تمت إعادة التعيين", "تم تنظيف الحقول وإرجاع النموذج إلى حالته الأولية.", "info");
              }}
              className="secondary-button motion-button"
            >
              إعادة تعيين الحقول
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
