"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { MotionReveal } from "@/components/motion/reveal";
import { FullContentSection } from "@/components/ideas/full-content-section";
import { PreviewSection } from "@/components/ideas/preview-section";
import { PurchaseGate } from "@/components/ideas/purchase-gate";
import { Badge } from "@/components/ui/badge";
import { IdeaAccessState, Review, Seller } from "@/types";

const tabItems = [
  { key: "overview", label: "نظرة عامة" },
  { key: "preview", label: "المعاينة" },
  { key: "full-content", label: "المحتوى الكامل" },
  { key: "reviews", label: "المراجعات" },
  { key: "seller", label: "ملف البائع" },
] as const;

type TabKey = (typeof tabItems)[number]["key"];

type PublicIdea = {
  title: string;
  shortDescription: string;
  categoryName: string;
  difficulty: string;
  targetAudience: string[];
  startingBudget: string;
  expectedProfit: string;
  marketScope: string;
  setupTime: string;
  beginnerFriendly: boolean;
  preview: string[];
  tags: string[];
};

type FullAccessData = {
  longDescription: string;
  includes: string[];
  executionPlan: { step: string; title: string; description: string }[];
  tools: string[];
  risks: string[];
};

function resolveTab(tab?: string): TabKey {
  const matched = tabItems.find((item) => item.key === tab);
  return matched?.key ?? "overview";
}

export function IdeaDetailTabs({
  idea,
  seller,
  reviews,
  accessState,
  purchaseHref,
  fullAccessData,
  initialTab,
}: {
  idea: PublicIdea;
  seller: Seller;
  reviews: Review[];
  accessState: IdeaAccessState;
  purchaseHref: string;
  fullAccessData?: FullAccessData;
  initialTab?: string;
}) {
  const resolvedInitialTab = useMemo(() => resolveTab(initialTab), [initialTab]);
  const [activeTab, setActiveTab] = useState<TabKey>(resolvedInitialTab);

  useEffect(() => {
    setActiveTab(resolvedInitialTab);
  }, [resolvedInitialTab]);

  return (
    <div id="idea-tabs" className="space-y-5 scroll-mt-28">
      <div className="panel flex flex-wrap gap-2 p-3">
        {tabItems.map((tab) => (
          <button
            key={tab.key}
            type="button"
            onClick={() => setActiveTab(tab.key)}
            className={`rounded-2xl px-4 py-3 text-sm transition ${
              activeTab === tab.key ? "bg-brand-400/15 text-brand-100" : "text-mist-200 hover:bg-white/10 hover:text-white"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      <MotionReveal once={false} className="motion-tab-panel" key={activeTab}>
        {activeTab === "overview" ? (
          <div className="grid gap-5 lg:grid-cols-2">
            <div className="panel motion-card p-5">
              <h3 className="text-lg font-bold text-white">معلومات عامة</h3>
              <p className="mt-4 text-sm leading-8 text-mist-200">{idea.shortDescription}</p>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.4rem] bg-white/5 p-4">
                  <p className="text-sm text-mist-400">التصنيف</p>
                  <p className="mt-2 font-bold text-white">{idea.categoryName}</p>
                </div>
                <div className="rounded-[1.4rem] bg-white/5 p-4">
                  <p className="text-sm text-mist-400">مستوى الصعوبة</p>
                  <p className="mt-2 font-bold text-white">{idea.difficulty}</p>
                </div>
                <div className="rounded-[1.4rem] bg-white/5 p-4">
                  <p className="text-sm text-mist-400">الميزانية التقديرية</p>
                  <p className="mt-2 font-bold text-white">{idea.startingBudget}</p>
                </div>
                <div className="rounded-[1.4rem] bg-white/5 p-4">
                  <p className="text-sm text-mist-400">الأرباح التقديرية</p>
                  <p className="mt-2 font-bold text-white">{idea.expectedProfit}</p>
                </div>
              </div>

              <div className="mt-5 flex flex-wrap gap-2">
                {idea.tags.map((tag) => (
                  <Badge key={tag}>{tag}</Badge>
                ))}
              </div>
            </div>

            <div className="panel motion-card p-5">
              <h3 className="text-lg font-bold text-white">الملاءمة والسوق المستهدف</h3>
              <div className="mt-4 space-y-4">
                <div className="rounded-[1.4rem] bg-white/5 p-4">
                  <p className="text-sm text-mist-400">الفئة المستهدفة</p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    {idea.targetAudience.map((item) => (
                      <span key={item} className="surface-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="rounded-[1.4rem] bg-white/5 p-4">
                  <p className="text-sm text-mist-400">السوق المستهدف</p>
                  <p className="mt-2 text-sm leading-7 text-white">{idea.marketScope}</p>
                </div>
                <div className="rounded-[1.4rem] bg-white/5 p-4">
                  <p className="text-sm text-mist-400">زمن التجهيز</p>
                  <p className="mt-2 font-bold text-white">{idea.setupTime}</p>
                </div>
                <div className="rounded-[1.4rem] bg-white/5 p-4">
                  <p className="text-sm text-mist-400">ملائمة للمبتدئين</p>
                  <p className="mt-2 font-bold text-white">{idea.beginnerFriendly ? "نعم" : "لا"}</p>
                </div>
              </div>
            </div>
          </div>
        ) : null}

        {activeTab === "preview" ? <PreviewSection preview={idea.preview} /> : null}

        {activeTab === "full-content" ? (
          accessState.hasAccess && fullAccessData ? (
            <FullContentSection
              longDescription={fullAccessData.longDescription}
              includes={fullAccessData.includes}
              executionPlan={fullAccessData.executionPlan}
              tools={fullAccessData.tools}
              risks={fullAccessData.risks}
            />
          ) : (
            <PurchaseGate ideaTitle={idea.title} purchaseHref={purchaseHref} />
          )
        ) : null}

        {activeTab === "reviews" ? (
          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="panel motion-card p-5">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="text-base font-bold text-white">{review.title}</h3>
                      {review.verifiedPurchase ? <Badge tone="success">شراء موثق</Badge> : null}
                    </div>
                    <p className="mt-2 text-sm text-mist-300">
                      {review.userName} • {review.userRole}
                    </p>
                  </div>
                  <div className="text-sm text-mist-200">
                    <p>{review.rating} / 5</p>
                    <p className="mt-1">{review.date}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-8 text-mist-200">{review.comment}</p>
              </div>
            ))}
          </div>
        ) : null}

        {activeTab === "seller" ? (
          <div className="panel motion-card p-6">
            <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <div className={`flex h-16 w-16 items-center justify-center rounded-3xl bg-gradient-to-br ${seller.accent} text-xl font-black text-white`}>
                    {seller.name.slice(0, 1)}
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-white">{seller.name}</h3>
                    <p className="mt-1 text-sm text-mist-300">{seller.title}</p>
                  </div>
                </div>
                <p className="mt-4 max-w-2xl text-sm leading-8 text-mist-200">{seller.bio}</p>
              </div>

              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-mist-400">التقييم</p>
                  <p className="mt-2 text-lg font-bold text-white">{seller.rating} / 5</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-mist-400">عدد الأفكار</p>
                  <p className="mt-2 text-lg font-bold text-white">{seller.ideasCount}</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-mist-400">عدد المبيعات</p>
                  <p className="mt-2 text-lg font-bold text-white">{seller.salesCount}</p>
                </div>
                <div className="rounded-2xl bg-white/5 p-4">
                  <p className="text-sm text-mist-400">الانضمام</p>
                  <p className="mt-2 text-lg font-bold text-white">{seller.joinedAt}</p>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap gap-2">
              {seller.specialties.map((item) => (
                <Badge key={item}>{item}</Badge>
              ))}
            </div>

            <Link href={`/sellers/${seller.slug}`} className="premium-button motion-button mt-6 inline-flex">
              الانتقال إلى صفحة البائع
            </Link>
          </div>
        ) : null}
      </MotionReveal>
    </div>
  );
}
