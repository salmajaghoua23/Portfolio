import { cn } from "@/lib/utils";
import { useLanguage } from "@/lib/language";
import type { Lang } from "@/lib/copy";

const OPTIONS: Lang[] = ["fr", "en"];

export const LanguageToggle = () => {
  const { lang, setLang } = useLanguage();
  return (
    <div className="inline-flex rounded-lg border border-border bg-secondary p-0.5" role="group" aria-label="Language">
      {OPTIONS.map((option) => (
        <button
          key={option}
          type="button"
          aria-pressed={lang === option}
          onClick={() => setLang(option)}
          className={cn(
            "rounded-md px-3 py-1 text-xs font-semibold uppercase transition-colors",
            lang === option ? "bg-primary text-primary-foreground shadow-sm" : "text-muted-foreground hover:text-foreground",
          )}
        >
          {option}
        </button>
      ))}
    </div>
  );
};
