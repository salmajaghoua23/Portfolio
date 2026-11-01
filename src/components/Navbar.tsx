import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { CvMenu } from "@/components/common/CvMenu";
import { LanguageToggle } from "@/components/common/LanguageToggle";
import { useLanguage } from "@/lib/language";
import type { CopyKey } from "@/lib/copy";

const LINKS: { href: string; label: CopyKey }[] = [
  { href: "#about", label: "nav_about" },
  { href: "#skills", label: "nav_skills" },
  { href: "#projects", label: "nav_projects" },
  { href: "#experience", label: "nav_experience" },
  { href: "#education", label: "nav_education" },
  { href: "#contact", label: "nav_contact" },
];

export const Navbar = () => {
  const { t } = useLanguage();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <a href="#top" className="flex items-center gap-2 rounded-md text-base font-bold text-foreground" aria-label={t("nav_home_label")}>
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-sm text-primary-foreground">SJ</span>
          <span className="hidden sm:inline">Salma Jaghoua</span>
        </a>

        <nav aria-label="Main" className="hidden items-center gap-6 lg:flex">
          {LINKS.map((link) => (
            <a key={link.href} href={link.href} className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground">
              {t(link.label)}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageToggle />
          <div className="hidden md:block">
            <CvMenu variant="default" />
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? t("nav_close_menu") : t("nav_open_menu")}
            onClick={() => setOpen((value) => !value)}
          >
            {open ? <X className="h-5 w-5" aria-hidden="true" /> : <Menu className="h-5 w-5" aria-hidden="true" />}
          </Button>
        </div>
      </div>

      {open && (
        <div id="mobile-nav" className="border-t border-border bg-background px-4 py-4 lg:hidden">
          <nav aria-label="Mobile" className="flex flex-col gap-1">
            {LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-foreground hover:bg-secondary"
              >
                {t(link.label)}
              </a>
            ))}
          </nav>
          <div className="mt-3 md:hidden">
            <CvMenu variant="default" />
          </div>
        </div>
      )}
    </header>
  );
};
