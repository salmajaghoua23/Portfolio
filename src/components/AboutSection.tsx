import { Globe, IdCard } from "lucide-react";
import { ContentError, Reveal, SectionHeader, SkeletonList } from "@/components/common/SectionPrimitives";
import { useSettings } from "@/hooks/useContent";
import { useLanguage } from "@/lib/language";

export const AboutSection = () => {
  const { lang, t } = useLanguage();
  const { data: settings, isLoading, isError } = useSettings();
  const bio = settings?.profile.bio[lang] || settings?.profile.bio[lang === "fr" ? "en" : "fr"] || "";
  const languages = settings?.profile.languages[lang] || settings?.profile.languages[lang === "fr" ? "en" : "fr"] || "";
  const license = settings?.profile.license[lang] || settings?.profile.license[lang === "fr" ? "en" : "fr"] || "";

  return (
    <section id="about" className="scroll-mt-20 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader eyebrow={t("about_eyebrow")} title={t("about_title")} />
        </Reveal>
        {isLoading && <SkeletonList count={2} />}
        {isError && <ContentError message={t("content_error")} />}
        {settings && (
          <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
            <Reveal className="rounded-xl border border-border bg-card p-6 shadow-card md:p-8">
              {bio && <p className="text-base leading-[1.5] text-muted-foreground md:text-lg">{bio}</p>}
            </Reveal>
            <Reveal delay={0.1} className="space-y-4">
              {languages && (
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <div className="mb-3 flex items-center gap-2 text-foreground">
                    <Globe className="h-5 w-5 text-accent" aria-hidden="true" />
                    <h3 className="font-semibold">{t("about_languages")}</h3>
                  </div>
                  <p className="text-sm leading-[1.5] text-muted-foreground">{languages}</p>
                </div>
              )}
              {license && (
                <div className="rounded-xl border border-border bg-card p-6 shadow-card">
                  <div className="mb-3 flex items-center gap-2 text-foreground">
                    <IdCard className="h-5 w-5 text-accent" aria-hidden="true" />
                    <h3 className="font-semibold">{t("about_license")}</h3>
                  </div>
                  <p className="text-sm leading-[1.5] text-muted-foreground">{license}</p>
                </div>
              )}
            </Reveal>
          </div>
        )}
      </div>
    </section>
  );
};
