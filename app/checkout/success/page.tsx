import { MockPaymentSuccess } from "@/components/checkout/mock-payment-success";

export default function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams?: {
    idea?: string;
  };
}) {
  return (
    <div className="shell mt-10">
      <div className="panel grid-fade relative overflow-hidden px-8 py-14 text-center">
        <div className="motion-float absolute -top-6 right-16 h-28 w-28 rounded-full bg-emerald-400/12 blur-3xl" />
        <div className="relative z-10">
          <span className="pill mx-auto">نجاح الدفع</span>
          <h1 className="mt-6 text-4xl font-black text-white sm:text-5xl">تمت العملية بنجاح</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-mist-200">
            الخطوة التالية هنا ليست شكلية فقط. سيتم تحديث حالة الفكرة إلى purchased وفتح الوصول الكامل لها داخل المنصة.
          </p>

          <div className="mx-auto mt-8 max-w-3xl">
            <MockPaymentSuccess slug={searchParams?.idea} />
          </div>
        </div>
      </div>
    </div>
  );
}
