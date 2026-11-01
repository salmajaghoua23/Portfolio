import { useState } from "react";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ContentError, EmptyState, Reveal, SectionHeader, SkeletonList } from "@/components/common/SectionPrimitives";
import { useExperiences } from "@/hooks/useContent";
import type { Experience } from "@/lib/content";
import type { CopyKey } from "@/lib/copy";
import { useLanguage } from "@/lib/language";
import { localize, splitLines } from "@/lib/localize";

export const ExperienceSection = () => {
  const { lang, t } = useLanguage();
  const { data: experiences, isLoading, isError } = useExperiences();
  const [selected, setSelected] = useState<Experience | null>(null);

  return (
    <section id="experience" className="scroll-mt-20 bg-secondary py-20 md:py-24">
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader eyebrow={t("experience_eyebrow")} title={t("experience_title")} />
        </Reveal>
        {isLoading && <SkeletonList count={3} />}
        {isError && <ContentError message={t("content_error")} />}
        {experiences && experiences.length === 0 && <EmptyState message={t("experience_empty")} />}
        {experiences && experiences.length > 0 && (
          <ol className="relative space-y-6 border-l-2 border-border pl-6 md:pl-8">
            {experiences.map((experience, index) => {
              const role = localize(experience, "role", lang) ?? "";
              const period = localize(experience, "period", lang);
              const location = localize(experience, "location", lang);
              return (
                <li key={experience.id} className="relative">
                  <span className="absolute -left-[calc(0.5rem+1px)] top-6 h-3 w-3 rounded-full border-2 border-background bg-accent md:-left-[calc(2rem+1px)]" aria-hidden="true" />
                  <Reveal delay={index * 0.05}>
                    <button
                      type="button"
                      onClick={() => setSelected(experience)}
                      className="group flex w-full items-start justify-between gap-4 rounded-xl border border-border bg-card p-5 text-left shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lg"
                    >
                      <div className="space-y-1.5">
                        <h3 className="text-lg font-semibold leading-[1.3] text-foreground">{role}</h3>
                        <p className="text-sm font-medium text-primary">{experience.company}</p>
                        <p className="text-sm text-muted-foreground">
                          {[period, location].filter(Boolean).join(" · ")}
                        </p>
                      </div>
                      <ChevronRight className="mt-1 h-5 w-5 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-0.5" aria-hidden="true" />
                    </button>
                  </Reveal>
                </li>
              );
            })}
          </ol>
        )}
      </div>

      <ExperienceDialog experience={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </section>
  );
};

const ExperienceDialog = ({ experience, onOpenChange }: { experience: Experience | null; onOpenChange: (open: boolean) => void }) => {
  const { lang, t } = useLanguage();
  if (!experience) return null;

  const role = localize(experience, "role", lang) ?? "";
  const context = localize(experience, "context", lang);
  const mission = localize(experience, "mission", lang);
  const achievements = splitLines(localize(experience, "achievements", lang));
  const textBlocks: { key: CopyKey; value: string | null }[] = [
    { key: "experience_context", value: context },
    { key: "experience_mission", value: mission },
  ];

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-2xl overflow-y-auto rounded-xl">
        <DialogHeader className="space-y-2 text-left">
          <DialogTitle className="text-xl font-bold leading-[1.25]">{role}</DialogTitle>
          <DialogDescription className="text-sm">
            {[experience.company, localize(experience, "location", lang), localize(experience, "period", lang)]
              .filter(Boolean)
              .join(" · ")}
          </DialogDescription>
        </DialogHeader>

        {textBlocks.map((block) =>
          block.value ? (
            <section key={block.key} className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">{t(block.key)}</h3>
              <p className="text-sm leading-[1.6] text-muted-foreground">{block.value}</p>
            </section>
          ) : null,
        )}

        {achievements.length > 0 && (
          <section className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">{t("experience_done")}</h3>
            <ul className="list-disc space-y-1.5 pl-5 text-sm leading-[1.6] text-muted-foreground marker:text-accent">
              {achievements.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>
        )}

        {experience.skills.length > 0 && (
          <section className="space-y-2">
            <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">{t("experience_skills")}</h3>
            <div className="flex flex-wrap gap-1.5">
              {experience.skills.map((skill) => (
                <Badge key={skill} variant="outline" className="rounded-md font-normal">
                  {skill}
                </Badge>
              ))}
            </div>
          </section>
        )}
      </DialogContent>
    </Dialog>
  );
};
