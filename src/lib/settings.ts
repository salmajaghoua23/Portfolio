import type { Json } from "@/integrations/supabase/types";
import type { Bilingual } from "@/lib/tags";

type JsonObject = { [key: string]: Json | undefined };

export type Profile = {
  name: string;
  title: Bilingual;
  school: Bilingual;
  badge: Bilingual;
  location: Bilingual;
  bio: Bilingual;
  objective: Bilingual;
  languages: Bilingual;
  license: Bilingual;
  focus: { ai: Bilingual; fullstack: Bilingual; cloud: Bilingual };
};

export type ContactSettings = { emails: string[]; phone: string };
export type SocialSettings = { github: string; linkedin: string };

export type Settings = {
  profile: Profile;
  contact: ContactSettings;
  social: SocialSettings;
};

const asObject = (value: Json | undefined): JsonObject =>
  value && typeof value === "object" && !Array.isArray(value) ? value : {};

const readText = (source: JsonObject, key: string): string => {
  const value = source[key];
  return typeof value === "string" ? value : "";
};

const readBilingual = (source: JsonObject, base: string): Bilingual => ({
  fr: readText(source, `${base}_fr`),
  en: readText(source, `${base}_en`),
});

const readEmails = (value: Json | undefined): string[] =>
  Array.isArray(value) ? value.filter((item): item is string => typeof item === "string" && item.trim() !== "") : [];

export const parseSettings = (rows: Record<string, Json>): Settings => {
  const profile = asObject(rows.profile);
  const contact = asObject(rows.contact);
  const social = asObject(rows.social);
  const focus = asObject(profile.focus);
  const focusLine = (key: "ai" | "fullstack" | "cloud"): Bilingual => {
    const entry = asObject(focus[key]);
    return { fr: readText(entry, "fr"), en: readText(entry, "en") };
  };

  return {
    profile: {
      name: readText(profile, "name"),
      title: readBilingual(profile, "title"),
      school: readBilingual(profile, "school"),
      badge: readBilingual(profile, "badge"),
      location: readBilingual(profile, "location"),
      bio: readBilingual(profile, "bio"),
      objective: readBilingual(profile, "objective"),
      languages: readBilingual(profile, "languages"),
      license: readBilingual(profile, "license"),
      focus: { ai: focusLine("ai"), fullstack: focusLine("fullstack"), cloud: focusLine("cloud") },
    },
    contact: { emails: readEmails(contact.emails), phone: readText(contact, "phone") },
    social: { github: readText(social, "github"), linkedin: readText(social, "linkedin") },
  };
};
