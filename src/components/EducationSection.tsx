import { ContentError, EmptyState, Reveal, SectionHeader, SkeletonList } from "@/components/common/SectionPrimitives";
import { useCertifications, useEducation } from "@/hooks/useContent";
import { useLanguage } from "@/lib/language";
import { localize } from "@/lib/localize";

export const EducationSection = () => {
  const { lang, t } = useLanguage();
  const education = useEducation();
  const certifications = useCertifications();
  const isLoading = education.isLoading || certifications.isLoading;
  const isError = education.isError || certifications.isError;

  const certs = (certifications.data ?? []).filter((item) => item.kind !== "activity");
  const activities = (certifications.data ?? []).filter((item) => item.kind === "activity");

  return (
    <section id="education" className="scroll-mt-20 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader eyebrow={t("education_eyebrow")} title={t("education_title")} />
        </Reveal>
        {isLoading && <SkeletonList count={3} />}
        {isError && <ContentError message={t("content_error")} />}

        {education.data && (
          <div className="grid gap-10 lg:grid-cols-2">
            <div className="space-y-4">
              {education.data.length === 0 && <EmptyState message={t("education_empty")} />}
              {education.data.map((item, index) => (
                <Reveal key={item.id} delay={index * 0.05} className="rounded-xl border border-border bg-card p-5 shadow-card">
                  <h3 className="font-semibold leading-[1.3] text-foreground">{localize(item, "degree", lang)}</h3>
                  <p className="mt-1 text-sm font-medium text-primary">{localize(item, "school", lang)}</p>
                  {localize(item, "period", lang) && (
                    <p className="mt-1 text-sm text-muted-foreground">{localize(item, "period", lang)}</p>
                  )}
                </Reveal>
              ))}
            </div>

            {certifications.data && (
              <div className="space-y-6">
                <ListBlock title={t("education_certs")} empty={t("education_certs_empty")} items={certs.map((item) => ({ id: item.id, name: localize(item, "name", lang) ?? "", detail: [item.organization, item.year].filter(Boolean).join(" · ") }))} />
                {activities.length > 0 && (
                  <ListBlock title={t("education_activities")} empty="" items={activities.map((item) => ({ id: item.id, name: localize(item, "name", lang) ?? "", detail: [item.organization, item.year].filter(Boolean).join(" · ") }))} />
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  );
};

type ListItem = { id: string; name: string; detail: string };

const ListBlock = ({ title, empty, items }: { title: string; empty: string; items: ListItem[] }) => (
  <div className="rounded-xl border border-border bg-card p-6 shadow-card">
    <h3 className="mb-4 font-semibold text-foreground">{title}</h3>
    {items.length === 0 ? (
      <p className="text-sm text-muted-foreground">{empty}</p>
    ) : (
      <ul className="space-y-3">
        {items.map((item) => (
          <li key={item.id} className="text-sm">
            <span className="font-medium text-foreground">{item.name}</span>
            {item.detail && <span className="block text-muted-foreground">{item.detail}</span>}
          </li>
        ))}
      </ul>
    )}
  </div>
);
