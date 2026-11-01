const STORAGE_KEY = "contact-submissions";
const WINDOW_MS = 60 * 60 * 1000;
const MAX_PER_WINDOW = 3;
const COOLDOWN_MS = 30 * 1000;

const readSubmissions = (): number[] => {
  try {
    const parsed: unknown = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? parsed.filter((value): value is number => typeof value === "number") : [];
  } catch {
    return [];
  }
};

export const getRateLimitWaitMs = (now = Date.now()): number => {
  const recent = readSubmissions().filter((timestamp) => now - timestamp < WINDOW_MS);
  if (recent.length >= MAX_PER_WINDOW) return WINDOW_MS - (now - recent[0]);
  const last = recent[recent.length - 1];
  if (last !== undefined && now - last < COOLDOWN_MS) return COOLDOWN_MS - (now - last);
  return 0;
};

export const recordSubmission = (now = Date.now()) => {
  const recent = readSubmissions().filter((timestamp) => now - timestamp < WINDOW_MS);
  localStorage.setItem(STORAGE_KEY, JSON.stringify([...recent, now]));
};
