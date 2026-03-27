import Link from "next/link";

export default function CheckoutCancelPage({
  searchParams,
}: {
  searchParams?: {
    idea?: string;
  };
}) {
  const ideaHref = searchParams?.idea ? `/ideas/${searchParams.idea}` : "/ideas";

  return (
    <div className="shell mt-10">
      <div className="panel grid-fade relative overflow-hidden px-8 py-14 text-center">
        <div className="motion-float absolute -top-6 right-16 h-28 w-28 rounded-full bg-rose-400/12 blur-3xl" />
        <div className="relative z-10">
          <span className="pill mx-auto">تم إلغاء العملية</span>
          <h1 className="mt-6 text-4xl font-black text-white sm:text-5xl">لم يكتمل الدفع هذه المرة</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-mist-200">
            يمكنك العودة إلى صفحة الفكرة ومتابعة المعاينة فقط، أو إعادة محاولة الدفع لاحقًا لفتح المحتوى الكامل.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href={ideaHref} className="secondary-button motion-button">
              العودة إلى صفحة الفكرة
            </Link>
            {searchParams?.idea ? (
              <Link href={`/checkout?idea=${searchParams.idea}`} className="premium-button motion-button">
                إعادة المحاولة
              </Link>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
