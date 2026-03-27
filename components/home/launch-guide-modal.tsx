"use client";

import { useState } from "react";
import { Modal } from "@/components/ui/modal";

export function LaunchGuideModal() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="motion-button rounded-full border border-white/10 px-5 py-3 text-sm text-mist-100 transition hover:border-brand-400/50 hover:text-white"
      >
        شاهد كيف تبدأ
      </button>

      <Modal open={open} onClose={() => setOpen(false)} title="كيف تبدأ في سوق الأفكار؟">
        <div className="space-y-4 text-sm leading-7 text-mist-200">
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="font-bold text-white">1. اختر مسارك</p>
            <p>إما شراء فكرة جاهزة مع معاينة واضحة، أو رفع فكرتك وتحويلها إلى أصل قابل للبيع داخل المنصة.</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="font-bold text-white">2. راجع التفاصيل قبل القرار</p>
            <p>كل فكرة تعرض السعر، مستوى الصعوبة، الميزانية المتوقعة، البائع، ونطاق التنفيذ بدل الاكتفاء بوصف مختصر.</p>
          </div>
          <div className="rounded-2xl bg-white/5 p-4">
            <p className="font-bold text-white">3. ابدأ بنسخة أولية صغيرة</p>
            <p>النسخة الحالية موجهة كـ MVP غني بالمحتوى والواجهات، مع بيانات عربية كاملة قابلة لاحقًا للربط بباك إند حقيقي.</p>
          </div>
        </div>
      </Modal>
    </>
  );
}
