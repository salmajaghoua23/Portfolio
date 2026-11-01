import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { ContentError, EmptyState, Reveal, SectionHeader, SkeletonList } from "@/components/common/SectionPrimitives";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectDialog } from "@/components/ProjectDialog";
import { Input } from "@/components/ui/input";
import { useProjects } from "@/hooks/useContent";
import type { Project } from "@/lib/content";
import { localize } from "@/lib/localize";
import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";
import { matchesFocus, tagLabel, type FocusKey } from "@/lib/tags";

type ProjectsSectionProps = { focus: FocusKey };

const searchableText = (project: Project, lang: "fr" | "en") =>
  [
    localize(project, "title", lang),
    localize(project, "summary", lang),
    ...project.stack,
    ...project.tags.map((tag) => tagLabel(tag, lang)),
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

export const ProjectsSection = ({ focus }: ProjectsSectionProps) => {
  const { lang, t } = useLanguage();
  const { data: projects, isLoading, isError } = useProjects();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [selected, setSelected] = useState<Project | null>(null);

  const categories = useMemo(
    () => Array.from(new Set((projects ?? []).flatMap((project) => project.tags))),
    [projects],
  );

  const visible = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return (projects ?? [])
      .filter((project) => !category || project.tags.includes(category))
      .filter((project) => !needle || searchableText(project, lang).includes(needle))
      .sort((a, b) => Number(matchesFocus(b.tags, focus)) - Number(matchesFocus(a.tags, focus)));
  }, [projects, query, category, lang, focus]);

  return (
    <section id="projects" className="scroll-mt-20 py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <Reveal>
          <SectionHeader eyebrow={t("projects_eyebrow")} title={t("projects_title")} />
        </Reveal>

        {projects && projects.length > 0 && (
          <div className="mb-8 flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-wrap gap-2" role="group" aria-label={t("projects_title")}>
              {[null, ...categories].map((tag) => (
                <button
                  key={tag ?? "all"}
                  type="button"
                  aria-pressed={category === tag}
                  onClick={() => setCategory(tag)}
                  className={cn(
                    "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                    category === tag
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-card text-foreground hover:bg-secondary",
                  )}
                >
                  {tag ? tagLabel(tag, lang) : t("projects_filter_all")}
                </button>
              ))}
            </div>
            <div className="relative w-full md:w-72">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" aria-hidden="true" />
              <Input
                type="search"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder={t("projects_search")}
                aria-label={t("projects_search")}
                className="pl-9"
              />
            </div>
          </div>
        )}

        {isLoading && <SkeletonList count={3} className="md:grid md:grid-cols-2 md:gap-6 md:space-y-0 lg:grid-cols-3" />}
        {isError && <ContentError message={t("content_error")} />}
        {projects && visible.length === 0 && <EmptyState message={t("projects_empty")} />}
        {visible.length > 0 && (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {visible.map((project) => (
              <ProjectCard key={project.id} project={project} onOpen={() => setSelected(project)} />
            ))}
          </div>
        )}
      </div>
      <ProjectDialog project={selected} onOpenChange={(open) => !open && setSelected(null)} />
    </section>
  );
};
