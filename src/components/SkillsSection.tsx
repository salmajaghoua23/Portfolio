import { ContentError, EmptyState, Reveal, SectionHeader, SkeletonList } from "@/components/common/SectionPrimitives";
import { useSkills } from "@/hooks/useContent";
import type { Skill } from "@/lib/content";
import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";
import { matchesFocus, SKILL_GROUPS, type FocusKey } from "@/lib/tags";

type SkillsSectionProps = { focus: FocusKey };

export const SkillsSection = ({ focus }: SkillsSectionProps) => {
  const { lang, t } = useLanguage();
  const { data: skills, isLoading, isError } = useSkills();

  const groups = SKILL_GROUPS.map((group) => {
    const items = (skills ?? [])
      .filter((skill: Skill) => skill.group_key === group.key)
      .sort((a, b) => Number(matchesFocus(b.tags, focus)) - Number(matchesFocus(a.tags, focus)));
    const relevance = items.filter((skill) => matchesFocus(skill.tags, focus)).length;
    return { ...group, items, relevance };
  })
    .filter((group) => group.items.length > 0)
    .sort((a, b) => b.relevance - a.relevance);

  return (
    <section id="skills" className="scroll-mt-20 bg-secondary py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader eyebrow={t("skills_eyebrow")} title={t("skills_title")} />
        </Reveal>
        {isLoading && <SkeletonList count={3} />}
        {isError && <ContentError message={t("content_error")} />}
        {skills && groups.length === 0 && <EmptyState message={t("skills_empty")} />}
        {skills && groups.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2">
            {groups.map((group, index) => (
              <Reveal key={group.key} delay={index * 0.04} className="rounded-xl border border-border bg-card p-6 shadow-card">
                <h3 className="mb-4 font-semibold text-foreground">{group.label[lang]}</h3>
                <ul className="flex flex-wrap gap-2">
                  {group.items.map((skill) => {
                    const active = matchesFocus(skill.tags, focus);
                    return (
                      <li
                        key={skill.id}
                        className={cn(
                          "rounded-full border px-3 py-1 text-sm font-medium transition-opacity",
                          active || focus === "all"
                            ? "border-accent/30 bg-accent/10 text-primary"
                            : "border-border bg-card text-muted-foreground opacity-60",
                        )}
                      >
                        {skill.name}
                      </li>
                    );
                  })}
                </ul>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
