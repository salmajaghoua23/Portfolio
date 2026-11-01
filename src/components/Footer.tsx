import { useSettings } from "@/hooks/useContent";
import { useLanguage } from "@/lib/language";

export const Footer = () => {
  const { t } = useLanguage();
  const { data: settings } = useSettings();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-border bg-background py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-sm text-muted-foreground sm:px-6 md:flex-row lg:px-8">
        <p>
          © {year} {settings?.profile.name ?? ""}. {t("footer_rights")}
        </p>
        <div className="flex gap-6">
          {settings?.social.github && (
            <a href={settings.social.github} target="_blank" rel="noreferrer" className="hover:text-foreground">
              GitHub
            </a>
          )}
          {settings?.social.linkedin && (
            <a href={settings.social.linkedin} target="_blank" rel="noreferrer" className="hover:text-foreground">
              LinkedIn
            </a>
          )}
        </div>
      </div>
    </footer>
  );
};
