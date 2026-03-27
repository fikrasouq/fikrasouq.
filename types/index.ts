export type Category = {
  id: string;
  name: string;
  description: string;
  totalIdeas: number;
  label: string;
};

export type Seller = {
  slug: string;
  name: string;
  title: string;
  bio: string;
  shortBio: string;
  joinedAt: string;
  location: string;
  rating: number;
  reviewsCount: number;
  salesCount: number;
  ideasCount: number;
  verified: boolean;
  responseTime: string;
  completionRate: string;
  specialties: string[];
  achievements: string[];
  accent: string;
};

export type IdeaType = "فكرة فقط" | "باقة تنفيذ" | "فكرة + تنفيذ";
export type Difficulty = "سهل" | "متوسط" | "متقدم";
export type PurchaseStatus = "not_purchased" | "purchased";

export type IdeaAccessState = {
  isPurchased: boolean;
  hasAccess: boolean;
  purchaseStatus: PurchaseStatus;
};

export type Idea = {
  slug: string;
  title: string;
  shortDescription: string;
  longDescription: string;
  price: number;
  rating: number;
  purchases: number;
  sellerSlug: string;
  categoryId: string;
  tags: string[];
  difficulty: Difficulty;
  beginnerFriendly: boolean;
  type: IdeaType;
  includes: string[];
  preview: string[];
  executionPlan: { step: string; title: string; description: string }[];
  targetAudience: string[];
  startingBudget: string;
  expectedProfit: string;
  tools: string[];
  risks: string[];
  createdAt: string;
  marketScope: string;
  setupTime: string;
  trusted: boolean;
  featured: boolean;
  bestSeller: boolean;
  isNew: boolean;
  heroNote: string;
  cover: string;
  isPurchased: boolean;
  hasAccess: boolean;
  purchaseStatus: PurchaseStatus;
};

export type Review = {
  id: string;
  ideaSlug: string;
  sellerSlug: string;
  userName: string;
  userRole: string;
  rating: number;
  title: string;
  comment: string;
  date: string;
  verifiedPurchase: boolean;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  quote: string;
  metric: string;
};

export type FAQ = {
  id: string;
  question: string;
  answer: string;
};

export type NotificationItem = {
  id: string;
  title: string;
  body: string;
  time: string;
  status: "جديد" | "تمت قراءته" | "مهم";
};

export type Order = {
  id: string;
  item: string;
  buyer: string;
  seller: string;
  date: string;
  amount: string;
  status: string;
};

export type Metric = {
  label: string;
  value: string;
  change: string;
  tone: "positive" | "neutral" | "alert";
};

export type ChartPoint = {
  label: string;
  value: number;
};
