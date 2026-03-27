import Link from "next/link";
import { EmptyState } from "@/components/ui/empty-state";
import { PageIntro } from "@/components/layout/page-intro";
import { getIdeaBySlug } from "@/lib/data";
import { formatCurrency } from "@/lib/utils";

export default function CheckoutPage({
  searchParams,
}: {
  searchParams?: {
    idea?: string;
  };
}) {
  const selectedIdea = searchParams?.idea ? getIdeaBySlug(searchParams.idea) : undefined;

  if (!selectedIdea) {
    return (
      <div className="shell mt-10">
        <EmptyState
          title="اختر فكرة أولًا قبل إتمام الدفع"
          description="صفحة الدفع جاهزة، لكن يلزم تحديد الفكرة المرتبطة بالعملية حتى نستطيع فتح الوصول الكامل بعد نجاح الدفع التجريبي."
          action={
            <Link href="/ideas" className="premium-button motion-button">
              تصفح الأفكار
            </Link>
          }
        />
      </div>
    );
  }

  return (
    <div className="shell mt-10 space-y-8">
      <PageIntro
        badge="إتمام الشراء"
        title="أكمل الدفع لفتح المحتوى الكامل لهذه الفكرة"
        description="الدفع هنا تجريبي لكنه منظم كما لو كان مسارًا حقيقيًا: مراجعة العرض، تعبئة بيانات الطلب، ثم تحويل حالة الفكرة إلى purchased وفتح الوصول الكامل."
        aside={
          <>
            <p className="text-sm text-mist-300">النتيجة بعد النجاح</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-mist-100">
              <div className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-3">فتح المحتوى الكامل لهذه الفكرة فقط</div>
              <div className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-3">إضافتها إلى صفحة مشترياتي</div>
              <div className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-3">إمكانية العودة لصفحة الفكرة مع وصول كامل</div>
            </div>
          </>
        }
      />

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="panel p-6">
          <form className="grid gap-5 lg:grid-cols-2">
            <input className="input-field" placeholder="الاسم الكامل" />
            <input className="input-field" placeholder="البريد الإلكتروني" />
            <input className="input-field" placeholder="رقم الجوال" />
            <input className="input-field" placeholder="المدينة" />
            <select className="input-field">
              <option>بطاقة بنكية</option>
              <option>مدى</option>
              <option>تحويل بنكي</option>
            </select>
            <input className="input-field" placeholder="اسم صاحب البطاقة" />
            <input className="input-field" placeholder="رقم البطاقة" />
            <input className="input-field" placeholder="تاريخ الانتهاء" />

            <div className="lg:col-span-2">
              <textarea className="textarea-field" placeholder="ملاحظات إضافية على الطلب أو الفاتورة" />
            </div>

            <div className="lg:col-span-2 flex flex-wrap gap-3">
              <Link href={`/checkout/success?idea=${selectedIdea.slug}`} className="premium-button motion-button">
                تأكيد الدفع التجريبي
              </Link>
              <Link href={`/checkout/cancel?idea=${selectedIdea.slug}`} className="secondary-button motion-button">
                إلغاء العملية
              </Link>
            </div>
          </form>
        </div>

        <aside className="space-y-5">
          <div className="panel p-6">
            <h2 className="text-xl font-bold text-white">العرض المختار</h2>
            <div className="mt-4 rounded-[1.8rem] border border-white/10 bg-white/5 p-5">
              <p className="text-lg font-bold text-white">{selectedIdea.title}</p>
              <p className="mt-3 text-sm leading-7 text-mist-300">{selectedIdea.shortDescription}</p>
              <div className="mt-4 flex flex-wrap gap-2">
                <span className="surface-chip">{selectedIdea.type}</span>
                <span className="surface-chip">{selectedIdea.difficulty}</span>
              </div>
            </div>
          </div>

          <div className="panel p-6">
            <h2 className="text-xl font-bold text-white">ملخص الدفع</h2>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-mist-400">سعر الفكرة</span>
                <span className="text-white">{formatCurrency(selectedIdea.price)}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-mist-400">رسوم المنصة</span>
                <span className="text-white">{formatCurrency(35)}</span>
              </div>
              <div className="soft-divider my-3" />
              <div className="flex items-center justify-between">
                <span className="text-mist-400">الإجمالي</span>
                <span className="text-xl font-black text-white">{formatCurrency(selectedIdea.price + 35)}</span>
              </div>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
}
