import type { Lang } from "@/lib/copy";

export type Bilingual = Record<Lang, string>;

export const FOCUS_KEYS = ["all", "ai", "fullstack", "cloud"] as const;
export type FocusKey = (typeof FOCUS_KEYS)[number];

export const FOCUS_LABELS: Record<FocusKey, Bilingual> = {
  all: { fr: "Tous", en: "All" },
  ai: { fr: "IA & Data", en: "AI & Data" },
  fullstack: { fr: "Full-Stack", en: "Full-Stack" },
  cloud: { fr: "Cloud & DevOps", en: "Cloud & DevOps" },
};

export const parseFocus = (value: string | null): FocusKey =>
  (FOCUS_KEYS as readonly string[]).includes(value ?? "") ? (value as FocusKey) : "all";

export const matchesFocus = (tags: string[], focus: FocusKey) =>
  focus === "all" || tags.includes(focus);

export const TAG_LABELS: Record<string, Bilingual> = {
  ai: { fr: "IA & Data", en: "AI & Data" },
  fullstack: { fr: "Full-Stack", en: "Full-Stack" },
  cloud: { fr: "Cloud & DevOps", en: "Cloud & DevOps" },
  mobile: { fr: "Mobile", en: "Mobile" },
  desktop: { fr: "Bureau", en: "Desktop" },
  networking: { fr: "Réseaux", en: "Networking" },
  security: { fr: "Cybersécurité", en: "Cybersecurity" },
};

export const tagLabel = (tag: string, lang: Lang): string => TAG_LABELS[tag]?.[lang] ?? tag;

export const SKILL_GROUPS: { key: string; label: Bilingual }[] = [
  { key: "languages", label: { fr: "Langages", en: "Languages" } },
  { key: "backend", label: { fr: "Backend", en: "Backend" } },
  { key: "frontend", label: { fr: "Frontend & Mobile", en: "Frontend & Mobile" } },
  { key: "ai_data", label: { fr: "IA & Data", en: "AI & Data" } },
  { key: "databases", label: { fr: "Bases de données", en: "Databases" } },
  { key: "devops_cloud", label: { fr: "DevOps & Cloud", en: "DevOps & Cloud" } },
  { key: "networking", label: { fr: "Réseaux", en: "Networking" } },
  { key: "methods", label: { fr: "Méthodes", en: "Methods" } },
];
