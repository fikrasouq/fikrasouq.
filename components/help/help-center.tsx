"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { EmptyState } from "@/components/ui/empty-state";

const helpCategories = [
  {
    id: "purchase",
    label: "الشراء",
    description: "كل ما يتعلق بفتح الوصول الكامل، الدفع، والمشتريات.",
  },
  {
    id: "selling",
    label: "البيع",
    description: "إرشادات نشر الأفكار، المراجعة، وتجهيز العروض.",
  },
  {
    id: "access",
    label: "الوصول الكامل",
    description: "كيف يعمل قفل المحتوى والمعاينة قبل الشراء.",
  },
  {
    id: "account",
    label: "الحساب",
    description: "التسجيل، تسجيل الدخول، واستعادة الوصول.",
  },
  {
    id: "billing",
    label: "المدفوعات",
    description: "الدفع التجريبي، نجاح العملية، وما بعد الشراء.",
  },
  {
    id: "reports",
    label: "الدعم والبلاغات",
    description: "التواصل، الإبلاغ، والاقتراحات.",
  },
] as const;

const helpFaqs = [
  {
    id: "faq-1",
    category: "purchase",
    question: "كيف أشتري فكرة وأفتح المحتوى الكامل؟",
    answer: "ادخل إلى صفحة الفكرة ثم استخدم زر الشراء. بعد نجاح الدفع التجريبي تنتقل الفكرة إلى حالة purchased ويصبح المحتوى الكامل متاحًا من نفس الصفحة ومن صفحة مشترياتي.",
  },
  {
    id: "faq-2",
    category: "purchase",
    question: "هل أستطيع معاينة الفكرة قبل الدفع؟",
    answer: "نعم. صفحة التفاصيل تعرض العنوان والوصف المختصر وبعض البيانات العامة ومعاينة محدودة، بينما تبقى خطة التنفيذ الكاملة ومحتوى الباقة مقفلين حتى الشراء.",
  },
  {
    id: "faq-3",
    category: "selling",
    question: "كيف أنشر أول فكرة للبيع داخل المنصة؟",
    answer: "انتقل إلى صفحة بيع فكرة، واملأ البيانات الأساسية والشرح التفصيلي وخطة التنفيذ والسعر. بعد الإرسال تدخل الفكرة في مسار مراجعة تجريبي داخل لوحة الإدارة.",
  },
  {
    id: "faq-4",
    category: "selling",
    question: "ما الذي يجعل الفكرة أقوى وفرص بيعها أعلى؟",
    answer: "كلما كانت الفكرة أوضح في المشكلة التي تحلها، والجمهور المستهدف، وخطوات التنفيذ، والميزانية، كانت قيمتها أوضح للمشتري وقرار الشراء أسرع.",
  },
  {
    id: "faq-5",
    category: "access",
    question: "لماذا أرى بعض الأقسام مقفلة؟",
    answer: "هذا جزء من نظام حماية الوصول. الأقسام المقفلة تحتوي على محتوى كامل أو تفاصيل تنفيذ لا تظهر إلا إذا كانت حالة المستخدم بالنسبة للفكرة purchased.",
  },
  {
    id: "faq-6",
    category: "access",
    question: "زر فتح المحتوى الكامل لا يجب أن يطلب أكثر من محاولة، كيف يعمل الآن؟",
    answer: "عند امتلاك الوصول الكامل يتم توجيهك مباشرة إلى تبويب المحتوى الكامل داخل صفحة الفكرة من أول ضغطة، دون الحاجة إلى إعادة التحميل اليدوي أو تبديل التبويبات بنفسك.",
  },
  {
    id: "faq-7",
    category: "account",
    question: "كيف يعمل إنشاء الحساب في النسخة الحالية؟",
    answer: "إنشاء الحساب يعمل بمنطق محلي mock داخل المتصفح. يتم التحقق من الحقول وحفظ الحساب محليًا ثم نقلك إلى لوحة المستخدم مباشرة بعد النجاح.",
  },
  {
    id: "faq-8",
    category: "account",
    question: "هل أستطيع استعادة كلمة المرور؟",
    answer: "نعم. صفحة الاستعادة تتحقق من البريد الإلكتروني المحفوظ محليًا وتعرض رسالة نجاح واضحة لمسار الاستعادة التجريبي.",
  },
  {
    id: "faq-9",
    category: "billing",
    question: "ماذا يحدث بعد نجاح الدفع؟",
    answer: "تتغير حالة الفكرة محليًا إلى purchased عبر API تجريبي، ثم يمكنك فتح المحتوى الكامل من صفحة الفكرة أو من صفحة مشترياتي داخل لوحة المستخدم.",
  },
  {
    id: "faq-10",
    category: "billing",
    question: "هل الدفع حقيقي الآن؟",
    answer: "لا، المسار الحالي تجريبي لكنه منظم بحيث يمكن لاحقًا ربطه ببوابة دفع حقيقية دون إعادة بناء الواجهة أو منطق الوصول من الصفر.",
  },
  {
    id: "faq-11",
    category: "reports",
    question: "كيف أرسل اقتراحًا أو أبلغ عن مشكلة؟",
    answer: "يمكنك استخدام صفحة الاقتراحات لإرسال اقتراح أو ملاحظة أو مشكلة. تُحفظ الرسائل محليًا وتظهر لاحقًا في لوحة الإدارة التجريبية لمراجعتها.",
  },
  {
    id: "faq-12",
    category: "reports",
    question: "كيف أتواصل مع فريق المنصة؟",
    answer: "صفحة تواصل معنا تعمل الآن وترسل الرسالة محليًا مع تأكيد نجاح واضح. يمكنك استخدامها لأي استفسار أو ملاحظة أو مشكلة تقنية.",
  },
];

export function HelpCenter() {
  const [activeCategory, setActiveCategory] = useState<(typeof helpCategories)[number]["id"]>("purchase");
  const [openId, setOpenId] = useState<string>("faq-1");
  const [search, setSearch] = useState("");

  const visibleFaqs = useMemo(() => {
    const normalizedSearch = search.trim().toLowerCase();

    return helpFaqs.filter((item) => {
      if (item.category !== activeCategory) {
        return false;
      }

      if (!normalizedSearch) {
        return true;
      }

      return `${item.question} ${item.answer}`.toLowerCase().includes(normalizedSearch);
    });
  }, [activeCategory, search]);

  return (
    <div className="space-y-8">
      <section className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {helpCategories.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => {
              setActiveCategory(item.id);
              const firstFaq = helpFaqs.find((faq) => faq.category === item.id);
              setOpenId(firstFaq?.id ?? "");
            }}
            className={`panel p-5 text-right transition ${
              activeCategory === item.id ? "border-brand-400/25 bg-brand-400/10" : "hover:border-white/12 hover:bg-white/6"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <span className="pill">{item.label}</span>
              <span className="text-xs text-mist-400">
                {helpFaqs.filter((faq) => faq.category === item.id).length} أسئلة
              </span>
            </div>
            <p className="mt-4 text-sm leading-7 text-mist-200">{item.description}</p>
          </button>
        ))}
      </section>

      <section className="panel p-5">
        <div className="grid gap-4 xl:grid-cols-[minmax(0,1fr)_280px] xl:items-end">
          <div>
            <p className="text-sm text-mist-300">الأسئلة داخل القسم المحدد</p>
            <h2 className="mt-2 text-3xl font-black text-white">
              {helpCategories.find((item) => item.id === activeCategory)?.label}
            </h2>
            <p className="mt-3 text-sm leading-8 text-mist-300">
              اختر القسم الذي تحتاجه ثم افتح السؤال المناسب. تم تحسين الصفحة لتعمل كتجربة دعم حقيقية بدلاً من قائمة نصية ثابتة.
            </p>
          </div>

          <div>
            <input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              className="input-field"
              placeholder="ابحث داخل مركز المساعدة"
            />
          </div>
        </div>
      </section>

      {visibleFaqs.length ? (
        <section className="space-y-4">
          {visibleFaqs.map((faq) => {
            const isOpen = openId === faq.id;

            return (
              <div key={faq.id} className="panel overflow-hidden">
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? "" : faq.id)}
                  className="flex w-full items-center justify-between gap-4 px-5 py-5 text-right"
                >
                  <span className="text-lg font-bold text-white">{faq.question}</span>
                  <span className={`rounded-full px-3 py-1 text-xs transition ${isOpen ? "bg-brand-400/15 text-brand-100" : "bg-white/5 text-mist-300"}`}>
                    {isOpen ? "إخفاء" : "فتح"}
                  </span>
                </button>

                <div className={`grid transition-all duration-300 ${isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}>
                  <div className="overflow-hidden">
                    <div className="border-t border-white/8 px-5 py-5 text-sm leading-8 text-mist-200">{faq.answer}</div>
                  </div>
                </div>
              </div>
            );
          })}
        </section>
      ) : (
        <EmptyState
          title="لم يتم العثور على نتائج"
          description="جرّب تبديل التصنيف أو حذف عبارة البحث الحالية للوصول إلى إجابات أكثر."
          action={
            <button type="button" onClick={() => setSearch("")} className="premium-button motion-button">
              مسح البحث
            </button>
          }
        />
      )}

      <section className="grid gap-5 xl:grid-cols-2">
        <div className="panel p-6">
          <h3 className="text-xl font-black text-white">ما زلت تحتاج مساعدة؟</h3>
          <p className="mt-3 text-sm leading-8 text-mist-300">
            إذا لم تجد إجابتك هنا يمكنك إرسال رسالة مباشرة أو مشاركة اقتراحك حتى نطوّر التجربة بشكل أفضل.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/contact" className="premium-button motion-button">
              تواصل معنا
            </Link>
            <Link href="/feedback" className="secondary-button motion-button">
              شاركنا رأيك
            </Link>
          </div>
        </div>

        <div className="panel p-6">
          <h3 className="text-xl font-black text-white">هل جرّبت المنصة؟</h3>
          <p className="mt-3 text-sm leading-8 text-mist-300">
            أضف تقييمك للمنصة أو راجع آراء المستخدمين الحاليين من لوحة تقييمات المنصة الجديدة.
          </p>
          <div className="mt-5">
            <Link href="/reviews" className="secondary-button motion-button">
              فتح تقييمات المنصة
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
