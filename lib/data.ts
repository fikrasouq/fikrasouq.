import { categories } from "@/data/categories";
import { ideas } from "@/data/ideas";
import { reviews } from "@/data/reviews";
import { sellers } from "@/data/sellers";

export { categories } from "@/data/categories";
export { ideas } from "@/data/ideas";
export { reviews } from "@/data/reviews";
export { sellers } from "@/data/sellers";
export * from "@/data/site";
export * from "@/data/dashboard";

export function getIdeaBySlug(slug: string) {
  return ideas.find((idea) => idea.slug === slug);
}

export function getSellerBySlug(slug: string) {
  return sellers.find((seller) => seller.slug === slug);
}

export function getCategoryById(id: string) {
  return categories.find((category) => category.id === id);
}

export function getReviewsForIdea(slug: string) {
  return reviews.filter((review) => review.ideaSlug === slug);
}

export function getIdeasBySeller(slug: string) {
  return ideas.filter((idea) => idea.sellerSlug === slug);
}

export function getRelatedIdeas(slug: string, categoryId: string) {
  return ideas.filter((idea) => idea.slug !== slug && idea.categoryId === categoryId).slice(0, 4);
}

export const featuredIdeas = ideas.filter((idea) => idea.featured).slice(0, 8);
export const bestSellerIdeas = ideas.filter((idea) => idea.bestSeller).slice(0, 8);
export const newIdeas = ideas.filter((idea) => idea.isNew).slice(0, 8);
export const verifiedSellers = sellers.filter((seller) => seller.verified);
