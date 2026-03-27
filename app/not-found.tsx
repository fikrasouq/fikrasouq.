import Link from "next/link";

export default function NotFoundPage() {
  return (
    <div className="shell mt-10">
      <div className="panel grid-fade relative overflow-hidden px-8 py-16 text-center">
        <div className="motion-float absolute -top-6 right-16 h-28 w-28 rounded-full bg-brand-400/12 blur-3xl" />
        <div className="relative z-10">
          <span className="pill mx-auto">404</span>
          <h1 className="mt-6 text-5xl font-black text-white">الصفحة غير موجودة</h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-8 text-mist-200">
            ربما تم نقل الصفحة أو أن الرابط غير صحيح. حافظنا حتى على صفحة 404 بهوية فخمة حتى تبقى التجربة متماسكة في كل المسارات.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link href="/" className="premium-button motion-button">
              العودة إلى الرئيسية
            </Link>
            <Link href="/ideas" className="secondary-button motion-button">
              تصفح الأفكار
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
