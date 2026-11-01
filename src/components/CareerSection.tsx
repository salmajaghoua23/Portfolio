import { ContentError, Reveal, SectionHeader, SkeletonList } from "@/components/common/SectionPrimitives";
import { useSettings } from "@/hooks/useContent";
import { useLanguage } from "@/lib/language";

export const CareerSection = () => {
  const { lang, t } = useLanguage();
  const { data: settings, isLoading, isError } = useSettings();
  const objective = settings?.profile.objective[lang] || settings?.profile.objective[lang === "fr" ? "en" : "fr"] || "";

  return (
    <section id="career" className="scroll-mt-20 bg-secondary py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader eyebrow={t("career_eyebrow")} title={t("career_title")} />
        </Reveal>
        {isLoading && <SkeletonList count={1} />}
        {isError && <ContentError message={t("content_error")} />}
        {objective && (
          <Reveal className="rounded-xl border border-border bg-card p-6 shadow-card md:p-8">
            <p className="text-base leading-[1.6] text-muted-foreground md:text-lg">{objective}</p>
          </Reveal>
        )}
      </div>
    </section>
  );
};
