import { persistFeedback } from "@/lib/mock-storage";
import { FeedbackEntry } from "@/types";

async function queueFeedbackNotification(_entry: FeedbackEntry) {
  // Placeholder for future delivery.
  // This is the single place to connect feedback submissions to email,
  // webhook, queue, or external support inbox later.
  return { queued: true };
}

export async function submitFeedbackEntry(entry: FeedbackEntry) {
  persistFeedback(entry);
  await queueFeedbackNotification(entry);
  return entry;
}
