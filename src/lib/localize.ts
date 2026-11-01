import type { Lang } from "@/lib/copy";

export const localize = (row: Record<string, unknown>, field: string, lang: Lang): string | null => {
  const primary = row[`${field}_${lang}`];
  if (typeof primary === "string" && primary.trim()) return primary.trim();
  const fallbackLang: Lang = lang === "fr" ? "en" : "fr";
  const fallback = row[`${field}_${fallbackLang}`];
  return typeof fallback === "string" && fallback.trim() ? fallback.trim() : null;
};

export const splitLines = (text: string | null): string[] =>
  text ? text.split("\n").map((line) => line.trim()).filter(Boolean) : [];
