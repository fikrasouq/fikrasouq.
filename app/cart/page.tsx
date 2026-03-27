import Link from "next/link";
import { PageIntro } from "@/components/layout/page-intro";
import { formatCurrency } from "@/lib/utils";
import { ideas } from "@/lib/data";

const cartItems = ideas.slice(0, 3);
const subtotal = cartItems.reduce((total, item) => total + item.price, 0);

export default function CartPage() {
  return (
    <div className="shell mt-10 space-y-8">
      <PageIntro
        badge="السلة"
        title="راجع مشترياتك قبل الإتمام"
        description="واجهة سلة كاملة تشمل العناصر المختارة والملخص المالي وروابط المتابعة، لتبدو المنصة مكتملة وظيفيًا."
      />

      <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
        <div className="space-y-4">
          {cartItems.map((item) => (
            <div key={item.slug} className="panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xl font-bold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-mist-300">{item.shortDescription}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-lg font-black text-white">{formatCurrency(item.price)}</p>
                <button type="button" className="rounded-full border border-white/10 px-4 py-2 text-sm text-mist-100">
                  إزالة
                </button>
              </div>
            </div>
          ))}
        </div>

        <aside className="panel h-fit p-6">
          <h2 className="text-xl font-bold text-white">ملخص الطلب</h2>
          <div className="mt-5 space-y-3 rounded-3xl border border-white/10 bg-white/5 p-5 text-sm">
            <div className="flex items-center justify-between">
              <span className="text-mist-400">الإجمالي الفرعي</span>
              <span className="text-white">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-mist-400">رسوم المنصة</span>
              <span className="text-white">{formatCurrency(35)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-mist-400">الإجمالي</span>
              <span className="text-lg font-bold text-white">{formatCurrency(subtotal + 35)}</span>
            </div>
          </div>
          <Link href="/checkout" className="mt-5 inline-flex w-full justify-center rounded-full bg-gradient-to-l from-brand-400 to-brand-600 px-5 py-3 text-sm font-bold text-ink-950">
            الانتقال إلى إتمام الشراء
          </Link>
        </aside>
      </section>
    </div>
  );
}
