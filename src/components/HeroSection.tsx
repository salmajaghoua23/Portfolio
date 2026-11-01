import { Github, Linkedin, Mail } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CvMenu } from "@/components/common/CvMenu";
import { FocusSwitcher } from "@/components/common/FocusSwitcher";
import { ContentError, SkeletonList } from "@/components/common/SectionPrimitives";
import { useSettings } from "@/hooks/useContent";
import type { CopyKey, Lang } from "@/lib/copy";
import { useLanguage } from "@/lib/language";
import type { Profile } from "@/lib/settings";
import type { Bilingual, FocusKey } from "@/lib/tags";

const pick = (value: Bilingual, lang: Lang) => value[lang] || value[lang === "fr" ? "en" : "fr"];

type HeroProps = { focus: FocusKey; onFocusChange: (next: FocusKey) => void };

export const HeroSection = ({ focus, onFocusChange }: HeroProps) => {
  const { lang, t } = useLanguage();
  const { data: settings, isLoading, isError } = useSettings();

  return (
    <section id="top" className="scroll-mt-20 border-b border-border bg-secondary py-16 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.4fr_1fr] lg:px-8">
        <div className="space-y-6">
          {isLoading && <SkeletonList count={2} className="max-w-md" />}
          {isError && <ContentError message={t("content_error")} />}
          {settings && <HeroText profile={settings.profile} focus={focus} lang={lang} />}

          <div className="space-y-3">
            <p className="text-sm font-medium text-muted-foreground">{t("hero_focus_label")}</p>
            <FocusSwitcher value={focus} onChange={onFocusChange} />
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <Button asChild className="gap-2">
              <a href="#contact">
                <Mail className="h-4 w-4" aria-hidden="true" />
                {t("hero_contact")}
              </a>
            </Button>
            <CvMenu />
            {settings?.social.github && (
              <Button asChild variant="ghost" className="gap-2">
                <a href={settings.social.github} target="_blank" rel="noreferrer">
                  <Github className="h-4 w-4" aria-hidden="true" />
                  GitHub
                </a>
              </Button>
            )}
            {settings?.social.linkedin && (
              <Button asChild variant="ghost" className="gap-2">
                <a href={settings.social.linkedin} target="_blank" rel="noreferrer">
                  <Linkedin className="h-4 w-4" aria-hidden="true" />
                  LinkedIn
                </a>
              </Button>
            )}
          </div>
        </div>

        {settings && <GlanceCard profile={settings.profile} lang={lang} t={t} />}
      </div>
    </section>
  );
};

const HeroText = ({ profile, focus, lang }: { profile: Profile; focus: FocusKey; lang: Lang }) => {
  const tagline = focus === "all" ? null : pick(profile.focus[focus], lang);
  const subtitle = tagline || pick(profile.title, lang);
  const badge = pick(profile.badge, lang);

  return (
    <div className="space-y-4">
      {badge && (
        <span className="inline-flex items-center gap-2 rounded-full border border-accent/30 bg-card px-3 py-1 text-sm font-medium text-primary shadow-sm">
          <span className="h-2 w-2 rounded-full bg-accent" aria-hidden="true" />
          {badge}
        </span>
      )}
      <h1 className="text-4xl font-bold leading-[1.1] tracking-tight text-foreground md:text-5xl">{profile.name}</h1>
      <p className="text-xl font-semibold leading-[1.3] text-primary md:text-2xl">{subtitle}</p>
      <p className="text-base text-muted-foreground">{pick(profile.school, lang)}</p>
    </div>
  );
};

const GlanceCard = ({ profile, lang, t }: { profile: Profile; lang: Lang; t: (key: CopyKey) => string }) => {
  const rows: { label: string; value: string }[] = [
    { label: t("hero_school"), value: pick(profile.school, lang) },
    { label: t("hero_location"), value: pick(profile.location, lang) },
    { label: t("hero_languages"), value: pick(profile.languages, lang) },
    { label: t("hero_license"), value: pick(profile.license, lang) },
  ].filter((row) => row.value);

  if (rows.length === 0) return null;

  return (
    <aside className="h-fit rounded-xl border border-border bg-card p-6 shadow-card" aria-label={t("hero_glance")}>
      <h2 className="mb-4 text-sm font-semibold uppercase tracking-[0.15em] text-accent">{t("hero_glance")}</h2>
      <dl className="space-y-4">
        {rows.map((row) => (
          <div key={row.label}>
            <dt className="text-xs font-medium text-muted-foreground">{row.label}</dt>
            <dd className="text-sm font-medium text-foreground">{row.value}</dd>
          </div>
        ))}
      </dl>
    </aside>
  );
};
