import { cookies } from "next/headers";
import { Idea, IdeaAccessState } from "@/types";

export const PURCHASE_COOKIE_NAME = "fikrasouq_purchases";

function safeArray(value: unknown): string[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.filter((item): item is string => typeof item === "string");
}

export function parsePurchasedSlugs(value?: string): string[] {
  if (!value) {
    return [];
  }

  try {
    return safeArray(JSON.parse(decodeURIComponent(value)));
  } catch {
    return [];
  }
}

export function encodePurchasedSlugs(slugs: string[]) {
  return encodeURIComponent(JSON.stringify(Array.from(new Set(slugs))));
}

export function getPurchasedSlugsFromStore(cookieStore: { get(name: string): { value: string } | undefined }) {
  return parsePurchasedSlugs(cookieStore.get(PURCHASE_COOKIE_NAME)?.value);
}

export function getPurchasedSlugs() {
  return getPurchasedSlugsFromStore(cookies());
}

export function purchaseIdeaSlug(slug: string, currentSlugs: string[]) {
  return Array.from(new Set([...currentSlugs, slug]));
}

export function getIdeaAccessState(idea: Pick<Idea, "slug" | "isPurchased" | "hasAccess" | "purchaseStatus">, purchasedSlugs: string[]): IdeaAccessState {
  const purchased = purchasedSlugs.includes(idea.slug) || idea.isPurchased || idea.hasAccess || idea.purchaseStatus === "purchased";

  return {
    isPurchased: purchased,
    hasAccess: purchased,
    purchaseStatus: purchased ? "purchased" : "not_purchased",
  };
}
