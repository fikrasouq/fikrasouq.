"use client";

import { useDeferredValue, useState } from "react";
import { IdeaCard } from "@/components/ideas/idea-card";
import { EmptyState } from "@/components/ui/empty-state";
import { categories } from "@/data/categories";
import { ideas } from "@/data/ideas";

type PriceFilter = "الكل" | "أقل من 200" | "200 - 350" | "أكثر من 350";

export function IdeaBrowser() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("الكل");
  const [price, setPrice] = useState<PriceFilter>("الكل");
  const [rating, setRating] = useState("الكل");
  const [difficulty, setDifficulty] = useState("الكل");
  const [beginner, setBeginner] = useState("الكل");
  const [bestSeller, setBestSeller] = useState("الكل");
  const [fresh, setFresh] = useState("الكل");
  const [ideaType, setIdeaType] = useState("الكل");
  const [sort, setSort] = useState("موصى به");
  const deferredSearch = useDeferredValue(search);

  const filtered = ideas
    .filter((idea) => {
      const query = deferredSearch.trim();
      if (query && !`${idea.title} ${idea.shortDescription} ${idea.tags.join(" ")}`.toLowerCase().includes(query.toLowerCase())) {
        return false;
      }

      if (category !== "الكل" && idea.categoryId !== category) {
        return false;
      }

      if (price === "أقل من 200" && idea.price >= 200) {
        return false;
      }
      if (price === "200 - 350" && (idea.price < 200 || idea.price > 350)) {
        return false;
      }
      if (price === "أكثر من 350" && idea.price <= 350) {
        return false;
      }

      if (rating === "4+" && idea.rating < 4) {
        return false;
      }
      if (rating === "4.5+" && idea.rating < 4.5) {
        return false;
      }
      if (rating === "4.8+" && idea.rating < 4.8) {
        return false;
      }

      if (difficulty !== "الكل" && idea.difficulty !== difficulty) {
        return false;
      }

      if (beginner === "نعم" && !idea.beginnerFriendly) {
        return false;
      }
      if (beginner === "لا" && idea.beginnerFriendly) {
        return false;
      }

      if (bestSeller === "نعم" && !idea.bestSeller) {
        return false;
      }

      if (fresh === "نعم" && !idea.isNew) {
        return false;
      }

      if (ideaType !== "الكل" && idea.type !== ideaType) {
        return false;
      }

      return true;
    })
    .sort((a, b) => {
      if (sort === "الأحدث") {
        return b.createdAt.localeCompare(a.createdAt);
      }
      if (sort === "السعر: الأقل أولًا") {
        return a.price - b.price;
      }
      if (sort === "السعر: الأعلى أولًا") {
        return b.price - a.price;
      }
      if (sort === "الأعلى تقييمًا") {
        return b.rating - a.rating;
      }
      if (sort === "الأكثر مبيعًا") {
        return b.purchases - a.purchases;
      }
      return Number(b.featured) - Number(a.featured) || Number(b.bestSeller) - Number(a.bestSeller);
    });

  const activeFilters = [
    category !== "الكل" ? categories.find((item) => item.id === category)?.name ?? category : null,
    price !== "الكل" ? price : null,
    rating !== "الكل" ? `تقييم ${rating}` : null,
    difficulty !== "الكل" ? difficulty : null,
    beginner !== "الكل" ? `مناسب للمبتدئين: ${beginner}` : null,
    bestSeller !== "الكل" ? "الأعلى مبيعًا" : null,
    fresh !== "الكل" ? "الأحدث" : null,
    ideaType !== "الكل" ? ideaType : null,
  ].filter(Boolean) as string[];

  const resetFilters = () => {
    setSearch("");
    setCategory("الكل");
    setPrice("الكل");
    setRating("الكل");
    setDifficulty("الكل");
    setBeginner("الكل");
    setBestSeller("الكل");
    setFresh("الكل");
    setIdeaType("الكل");
    setSort("موصى به");
  };

  const filterBoxClass = "input-field";

  return (
    <div className="grid gap-6 xl:grid-cols-[320px_minmax(0,1fr)]">
      <aside className="panel h-fit space-y-5 p-5 xl:sticky xl:top-24">
        <div>
          <h2 className="text-xl font-black text-white">الفلاتر المتقدمة</h2>
          <p className="mt-2 text-sm leading-7 text-mist-300">
            خصّص النتائج حسب السعر، التقييم، السهولة، نوع الفكرة، وما إذا كانت باقة تنفيذ أو فكرة فقط.
          </p>
        </div>

        <label className="block space-y-2">
          <span className="text-sm text-mist-200">ابحث عن فكرة</span>
          <input value={search} onChange={(event) => setSearch(event.target.value)} className="input-field" placeholder="مثال: متجر رقمي للطلاب أو قوالب Canva" />
        </label>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-1">
          <label className="block space-y-2">
            <span className="text-sm text-mist-200">التصنيف</span>
            <select className={filterBoxClass} value={category} onChange={(e) => setCategory(e.target.value)}>
              <option value="الكل">الكل</option>
              {categories.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-mist-200">السعر</span>
            <select className={filterBoxClass} value={price} onChange={(e) => setPrice(e.target.value as PriceFilter)}>
              <option>الكل</option>
              <option>أقل من 200</option>
              <option>200 - 350</option>
              <option>أكثر من 350</option>
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-mist-200">التقييم</span>
            <select className={filterBoxClass} value={rating} onChange={(e) => setRating(e.target.value)}>
              <option>الكل</option>
              <option>4+</option>
              <option>4.5+</option>
              <option>4.8+</option>
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-mist-200">مستوى الصعوبة</span>
            <select className={filterBoxClass} value={difficulty} onChange={(e) => setDifficulty(e.target.value)}>
              <option>الكل</option>
              <option>سهل</option>
              <option>متوسط</option>
              <option>متقدم</option>
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-mist-200">مناسبة للمبتدئين</span>
            <select className={filterBoxClass} value={beginner} onChange={(e) => setBeginner(e.target.value)}>
              <option>الكل</option>
              <option>نعم</option>
              <option>لا</option>
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-mist-200">الأعلى مبيعًا</span>
            <select className={filterBoxClass} value={bestSeller} onChange={(e) => setBestSeller(e.target.value)}>
              <option>الكل</option>
              <option>نعم</option>
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-mist-200">الأحدث</span>
            <select className={filterBoxClass} value={fresh} onChange={(e) => setFresh(e.target.value)}>
              <option>الكل</option>
              <option>نعم</option>
            </select>
          </label>

          <label className="block space-y-2">
            <span className="text-sm text-mist-200">نوع الفكرة</span>
            <select className={filterBoxClass} value={ideaType} onChange={(e) => setIdeaType(e.target.value)}>
              <option>الكل</option>
              <option>فكرة فقط</option>
              <option>باقة تنفيذ</option>
              <option>فكرة + تنفيذ</option>
            </select>
          </label>
        </div>

        <button type="button" onClick={resetFilters} className="secondary-button motion-button w-full">
          إعادة ضبط الفلاتر
        </button>
      </aside>

      <div className="space-y-6">
        <div className="panel p-5">
          <div className="grid gap-4 xl:grid-cols-[1fr_260px] xl:items-end">
            <div>
              <p className="text-sm text-mist-300">نتائج التصفح الحالية</p>
              <h3 className="mt-2 text-3xl font-black text-white">{filtered.length} فكرة جاهزة</h3>
              <p className="mt-3 max-w-3xl text-sm leading-8 text-mist-300">
                صفحة تصفح marketplace كاملة تدعم البحث العربي المباشر، الفلاتر المتقدمة، الوسوم، والفرز حسب القيمة أو الحداثة أو المبيعات.
              </p>
            </div>

            <label className="block space-y-2">
              <span className="text-sm text-mist-200">فرز حسب</span>
              <select className={filterBoxClass} value={sort} onChange={(e) => setSort(e.target.value)}>
                <option>موصى به</option>
                <option>الأحدث</option>
                <option>الأعلى تقييمًا</option>
                <option>الأكثر مبيعًا</option>
                <option>السعر: الأقل أولًا</option>
                <option>السعر: الأعلى أولًا</option>
              </select>
            </label>
          </div>

          {activeFilters.length ? (
            <div className="mt-5 flex flex-wrap gap-2">
              {activeFilters.map((filter) => (
                <span key={filter} className="surface-chip">
                  {filter}
                </span>
              ))}
            </div>
          ) : null}
        </div>

        {filtered.length ? (
          <div className="grid gap-5 md:grid-cols-2 2xl:grid-cols-3">
            {filtered.map((idea) => (
              <IdeaCard key={idea.slug} idea={idea} />
            ))}
          </div>
        ) : (
          <EmptyState
            title="لا توجد أفكار مطابقة لهذه الفلاتر"
            description="جرّب توسيع نطاق السعر أو إزالة بعض الشروط الحالية، ثم أعد البحث للوصول إلى عروض أكثر تنوعًا."
            action={
              <button type="button" onClick={resetFilters} className="premium-button motion-button">
                مسح الفلاتر والبدء من جديد
              </button>
            }
          />
        )}
      </div>
    </div>
  );
}
