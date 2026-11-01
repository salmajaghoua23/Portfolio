import { BrainCircuit, Cloud, Code2, Monitor, Network, ShieldCheck, Smartphone, type LucideIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Project } from "@/lib/content";
import { copy } from "@/lib/copy";
import { resolveProjectImage } from "@/lib/projectImages";
import { useLanguage } from "@/lib/language";
import { localize } from "@/lib/localize";
import { tagLabel } from "@/lib/tags";

const TAG_ICONS: Record<string, LucideIcon> = {
  ai: BrainCircuit,
  fullstack: Code2,
  cloud: Cloud,
  mobile: Smartphone,
  desktop: Monitor,
  networking: Network,
  security: ShieldCheck,
};

export const ProjectCard = ({ project, onOpen }: { project: Project; onOpen: () => void }) => {
  const { lang, t } = useLanguage();
  const title = localize(project, "title", lang) ?? "";
  const summary = localize(project, "summary", lang);
  const image = resolveProjectImage(project);
  const Icon = TAG_ICONS[project.tags[0]] ?? Code2;

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      <button type="button" onClick={onOpen} className="flex flex-1 flex-col text-left focus-visible:outline-none">
        <div className="relative aspect-video w-full overflow-hidden bg-secondary">
          {image ? (
            <img src={image} alt={title} loading="lazy" className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
          ) : (
            <div className="flex h-full w-full items-center justify-center" aria-hidden="true">
              <Icon className="h-12 w-12 text-primary/60" />
            </div>
          )}
          {project.featured && (
            <span className="absolute left-3 top-3 rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">
              {t("projects_featured")}
            </span>
          )}
        </div>
        <div className="flex flex-1 flex-col gap-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <h3 className="text-lg font-semibold leading-[1.3] text-foreground">{title}</h3>
            {project.year && <span className="shrink-0 text-xs font-medium text-muted-foreground">{project.year}</span>}
          </div>
          {summary && <p className="line-clamp-3 text-sm leading-[1.5] text-muted-foreground">{summary}</p>}
          <div className="mt-auto flex flex-wrap gap-1.5 pt-2">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="secondary" className="rounded-md font-medium">
                {tagLabel(tag, lang)}
              </Badge>
            ))}
            {project.stack.slice(0, 3).map((item) => (
              <Badge key={item} variant="outline" className="rounded-md font-normal text-muted-foreground">
                {item}
              </Badge>
            ))}
          </div>
        </div>
      </button>
      <div className="flex items-center justify-between border-t border-border px-5 py-3">
        <span className="text-sm font-semibold text-primary">{t("projects_view")}</span>
        <div className="flex gap-3">
          {project.github_url && (
            <a href={project.github_url} target="_blank" rel="noreferrer" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              {copy.projects_github[lang]}
            </a>
          )}
          {project.demo_url && (
            <a href={project.demo_url} target="_blank" rel="noreferrer" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              {t("projects_demo")}
            </a>
          )}
        </div>
      </div>
    </article>
  );
};
