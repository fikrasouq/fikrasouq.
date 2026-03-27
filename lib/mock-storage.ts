import {
  ContactMessage,
  EarlyAccessEntry,
  FeedbackEntry,
  MockAuthUser,
  MockAuthUserRecord,
  PlatformReviewEntry,
} from "@/types";

export const storageKeys = {
  authUsers: "fikrasouq-auth-users",
  authSession: "fikrasouq-auth-session",
  earlyAccess: "fikrasouq-early-access",
  platformReviews: "fikrasouq-platform-reviews",
  feedback: "fikrasouq-feedback",
  contactMessages: "fikrasouq-contact-messages",
  favorites: "fikrasouq-favorites",
  profile: "fikrasouq-profile",
} as const;

function isBrowser() {
  return typeof window !== "undefined";
}

export function createMockId(prefix: string) {
  return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

export function readStorage<T>(key: string, fallback: T): T {
  if (!isBrowser()) {
    return fallback;
  }

  try {
    const rawValue = window.localStorage.getItem(key);
    return rawValue ? (JSON.parse(rawValue) as T) : fallback;
  } catch {
    return fallback;
  }
}

export function writeStorage<T>(key: string, value: T) {
  if (!isBrowser()) {
    return;
  }

  window.localStorage.setItem(key, JSON.stringify(value));
}

export function appendStorageItem<T>(key: string, item: T, fallback: T[] = []) {
  const current = readStorage<T[]>(key, fallback);
  const nextValue = [item, ...current];
  writeStorage(key, nextValue);
  return nextValue;
}

export function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function readAuthUsers() {
  return readStorage<MockAuthUserRecord[]>(storageKeys.authUsers, []);
}

export function writeAuthUsers(value: MockAuthUserRecord[]) {
  writeStorage(storageKeys.authUsers, value);
}

export function readSessionUser() {
  return readStorage<MockAuthUser | null>(storageKeys.authSession, null);
}

export function writeSessionUser(user: MockAuthUser | null) {
  writeStorage(storageKeys.authSession, user);
}

export function persistEarlyAccessEntry(entry: EarlyAccessEntry) {
  return appendStorageItem(storageKeys.earlyAccess, entry);
}

export function persistPlatformReview(entry: PlatformReviewEntry) {
  return appendStorageItem(storageKeys.platformReviews, entry);
}

export function readPlatformReviews() {
  return readStorage<PlatformReviewEntry[]>(storageKeys.platformReviews, []);
}

export function persistFeedback(entry: FeedbackEntry) {
  return appendStorageItem(storageKeys.feedback, entry);
}

export function readFeedback() {
  return readStorage<FeedbackEntry[]>(storageKeys.feedback, []);
}

export function persistContactMessage(entry: ContactMessage) {
  return appendStorageItem(storageKeys.contactMessages, entry);
}

export function readFavorites() {
  return readStorage<string[]>(storageKeys.favorites, []);
}

export function toggleFavoriteSlug(slug: string) {
  const favorites = readFavorites();
  const exists = favorites.includes(slug);
  const nextValue = exists ? favorites.filter((item) => item !== slug) : [slug, ...favorites];
  writeStorage(storageKeys.favorites, nextValue);
  return { favorites: nextValue, exists: !exists };
}
