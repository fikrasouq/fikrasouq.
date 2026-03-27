"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/ui/empty-state";
import { formatCurrency } from "@/lib/utils";
import { Idea } from "@/types";

export function CartClient({ initialItems }: { initialItems: Idea[] }) {
  const [items, setItems] = useState(initialItems);

  const subtotal = useMemo(() => items.reduce((total, item) => total + item.price, 0), [items]);

  return (
    <section className="grid gap-6 xl:grid-cols-[1fr_360px]">
      <div className="space-y-4">
        {items.length ? (
          items.map((item) => (
            <div key={item.slug} className="panel flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xl font-bold text-white">{item.title}</p>
                <p className="mt-2 text-sm leading-7 text-mist-300">{item.shortDescription}</p>
              </div>
              <div className="flex items-center gap-3">
                <p className="text-lg font-black text-white">{formatCurrency(item.price)}</p>
                <button
                  type="button"
                  onClick={() => setItems((current) => current.filter((entry) => entry.slug !== item.slug))}
                  className="rounded-full border border-white/10 px-4 py-2 text-sm text-mist-100 transition hover:border-rose-400/30 hover:text-white"
                >
                  إزالة
                </button>
              </div>
            </div>
          ))
        ) : (
          <EmptyState
            title="السلة فارغة حاليًا"
            description="أضف فكرة أو باقة تنفيذ إلى السلة ثم عد هنا لإتمام الشراء."
            action={
              <Link href="/ideas" className="premium-button motion-button">
                استعرض الأفكار
              </Link>
            }
          />
        )}
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
            <span className="text-white">{formatCurrency(items.length ? 35 : 0)}</span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-mist-400">الإجمالي</span>
            <span className="text-lg font-bold text-white">{formatCurrency(subtotal + (items.length ? 35 : 0))}</span>
          </div>
        </div>
        <Link
          href={items[0] ? `/checkout?idea=${items[0].slug}` : "/ideas"}
          className="mt-5 inline-flex w-full justify-center rounded-full bg-gradient-to-l from-brand-400 to-brand-600 px-5 py-3 text-sm font-bold text-ink-950"
        >
          {items[0] ? "الانتقال إلى إتمام الشراء" : "اختر فكرة أولًا"}
        </Link>
      </aside>
    </section>
  );
}
