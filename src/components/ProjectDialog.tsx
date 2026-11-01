import { ExternalLink, Github } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import type { Project } from "@/lib/content";
import type { CopyKey } from "@/lib/copy";
import { resolveProjectImage } from "@/lib/projectImages";
import { useLanguage } from "@/lib/language";
import { localize, splitLines } from "@/lib/localize";
import { tagLabel } from "@/lib/tags";

type ProjectDialogProps = { project: Project | null; onOpenChange: (open: boolean) => void };

export const ProjectDialog = ({ project, onOpenChange }: ProjectDialogProps) => {
  const { lang, t } = useLanguage();
  if (!project) return null;

  const title = localize(project, "title", lang) ?? "";
  const summary = localize(project, "summary", lang);
  const image = resolveProjectImage(project);

  const textSections: { key: CopyKey; value: string | null }[] = [
    { key: "project_context", value: localize(project, "context", lang) },
    { key: "project_role", value: localize(project, "role", lang) },
  ];
  const listSections: { key: CopyKey; items: string[] }[] = [
    { key: "project_features", items: splitLines(localize(project, "features", lang)) },
    { key: "project_architecture", items: splitLines(localize(project, "architecture", lang)) },
  ];
  const results = localize(project, "results", lang);

  return (
    <Dialog open onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[90vh] max-w-3xl overflow-y-auto rounded-xl p-0">
        {image && <img src={image} alt={title} className="aspect-video w-full object-cover" />}
        <div className="space-y-6 p-6 md:p-8">
          <DialogHeader className="space-y-2 text-left">
            <div className="flex flex-wrap gap-1.5">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="rounded-md">
                  {tagLabel(tag, lang)}
                </Badge>
              ))}
            </div>
            <DialogTitle className="text-2xl font-bold leading-[1.2] text-foreground">{title}</DialogTitle>
            {summary && <DialogDescription className="text-base leading-[1.5]">{summary}</DialogDescription>}
          </DialogHeader>

          {textSections.map((section) =>
            section.value ? (
              <section key={section.key} className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">{t(section.key)}</h3>
                <p className="text-sm leading-[1.6] text-muted-foreground">{section.value}</p>
              </section>
            ) : null,
          )}

          {listSections.map((section) =>
            section.items.length > 0 ? (
              <section key={section.key} className="space-y-2">
                <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">{t(section.key)}</h3>
                <ul className="list-disc space-y-1.5 pl-5 text-sm leading-[1.6] text-muted-foreground marker:text-accent">
                  {section.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>
            ) : null,
          )}

          {project.stack.length > 0 && (
            <section className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">{t("project_stack")}</h3>
              <div className="flex flex-wrap gap-1.5">
                {project.stack.map((item) => (
                  <Badge key={item} variant="outline" className="rounded-md font-normal">
                    {item}
                  </Badge>
                ))}
              </div>
            </section>
          )}

          {results && (
            <section className="space-y-2">
              <h3 className="text-sm font-semibold uppercase tracking-[0.12em] text-accent">{t("project_results")}</h3>
              <p className="text-sm leading-[1.6] text-muted-foreground">{results}</p>
            </section>
          )}

          {(project.github_url || project.demo_url) && (
            <div className="flex flex-wrap gap-3 border-t border-border pt-6">
              {project.github_url && (
                <Button asChild variant="outline" className="gap-2">
                  <a href={project.github_url} target="_blank" rel="noreferrer">
                    <Github className="h-4 w-4" aria-hidden="true" />
                    GitHub
                  </a>
                </Button>
              )}
              {project.demo_url && (
                <Button asChild className="gap-2">
                  <a href={project.demo_url} target="_blank" rel="noreferrer">
                    <ExternalLink className="h-4 w-4" aria-hidden="true" />
                    {t("projects_demo")}
                  </a>
                </Button>
              )}
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
