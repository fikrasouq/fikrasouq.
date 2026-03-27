import { CartClient } from "@/components/cart/cart-client";
import { PageIntro } from "@/components/layout/page-intro";
import { ideas } from "@/lib/data";

const cartItems = ideas.slice(0, 3);

export default function CartPage() {
  return (
    <div className="shell mt-10 space-y-8">
      <PageIntro
        badge="السلة"
        title="راجع مشترياتك قبل الإتمام"
        description="واجهة سلة كاملة تشمل العناصر المختارة والملخص المالي وروابط المتابعة، مع زر إزالة يعمل فعليًا داخل الصفحة."
      />

      <CartClient initialItems={cartItems} />
    </div>
  );
}
