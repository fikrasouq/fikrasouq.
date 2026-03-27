import { IdeaBrowser } from "@/components/ideas/idea-browser";
import { PageIntro } from "@/components/layout/page-intro";

export default function IdeasPage() {
  return (
    <div className="shell mt-10 space-y-8">
      <PageIntro
        badge="تصفح متقدم"
        title="استعرض الأفكار الجاهزة كما لو كنت داخل marketplace عربي حقيقي"
        description="صفحة غنية بالبحث والفلاتر والفرز والبطاقات الممتلئة بالبيانات حتى يشعر المستخدم أن المنصة جاهزة للإطلاق وليست مجرد واجهة عرض بسيطة."
        aside={
          <>
            <p className="text-sm text-mist-300">ما الذي ستجده هنا؟</p>
            <div className="mt-4 space-y-3 text-sm leading-7 text-mist-100">
              <div className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-3">شريط بحث عربي مباشر وسريع</div>
              <div className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-3">فلاتر كثيرة تغطي السعر والتقييم والسهولة والنوع</div>
              <div className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-3">بطاقات قوية جدًا مع مؤشرات شراء وثقة</div>
              <div className="rounded-[1.4rem] border border-white/8 bg-white/5 px-4 py-3">فرز حيّ حسب الحداثة أو المبيعات أو السعر</div>
            </div>
          </>
        }
      />

      <IdeaBrowser />
    </div>
  );
}
