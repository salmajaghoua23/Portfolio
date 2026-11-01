import { ChevronDown, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useCvs } from "@/hooks/useContent";
import { copy } from "@/lib/copy";
import { localize } from "@/lib/localize";
import { useLanguage } from "@/lib/language";

export const CvMenu = ({ variant = "outline" }: { variant?: "outline" | "default" }) => {
  const { lang, t } = useLanguage();
  const { data: cvs, isLoading, isError } = useCvs();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant={variant} className="gap-2" aria-label={t("hero_download_cv")}>
          <Download className="h-4 w-4" aria-hidden="true" />
          {t("hero_download_cv")}
          <ChevronDown className="h-4 w-4 opacity-70" aria-hidden="true" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-64 rounded-xl">
        <DropdownMenuLabel>{t("hero_download_cv")}</DropdownMenuLabel>
        {isLoading && <DropdownMenuItem disabled>…</DropdownMenuItem>}
        {isError && <DropdownMenuItem disabled>{t("content_error")}</DropdownMenuItem>}
        {!isLoading && !isError && cvs?.length === 0 && <DropdownMenuItem disabled>{t("cv_empty")}</DropdownMenuItem>}
        {cvs?.map((cv) => {
          const label = localize(cv, "label", lang) ?? cv.file_name ?? cv.language.toUpperCase();
          return (
            <DropdownMenuItem key={cv.id} asChild>
              <a href={cv.file_url} download={cv.file_name ?? undefined} target="_blank" rel="noreferrer" className="flex items-center justify-between gap-3">
                <span>{label}</span>
                <span className="rounded bg-secondary px-1.5 py-0.5 text-[11px] font-semibold text-muted-foreground">
                  {copy[cv.language === "en" ? "cv_lang_en" : "cv_lang_fr"][lang]}
                </span>
              </a>
            </DropdownMenuItem>
          );
        })}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
