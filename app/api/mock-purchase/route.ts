import { NextRequest, NextResponse } from "next/server";
import { getIdeaBySlug } from "@/lib/data";
import { PURCHASE_COOKIE_NAME, encodePurchasedSlugs, parsePurchasedSlugs, purchaseIdeaSlug } from "@/lib/purchases";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const slug = typeof body?.slug === "string" ? body.slug : "";

  if (!slug || !getIdeaBySlug(slug)) {
    return NextResponse.json(
      {
        ok: false,
        message: "تعذر العثور على الفكرة المطلوبة لإتمام الدفع التجريبي.",
      },
      { status: 400 },
    );
  }

  const existingSlugs = parsePurchasedSlugs(request.cookies.get(PURCHASE_COOKIE_NAME)?.value);
  const nextSlugs = purchaseIdeaSlug(slug, existingSlugs);

  const response = NextResponse.json({
    ok: true,
    slug,
    purchaseStatus: "purchased",
    purchasedSlugs: nextSlugs,
  });

  response.cookies.set(PURCHASE_COOKIE_NAME, encodePurchasedSlugs(nextSlugs), {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });

  return response;
}
