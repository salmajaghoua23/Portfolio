import { FOCUS_KEYS, FOCUS_LABELS, type FocusKey } from "@/lib/tags";
import { useLanguage } from "@/lib/language";
import { cn } from "@/lib/utils";

export const FocusSwitcher = ({ value, onChange }: { value: FocusKey; onChange: (next: FocusKey) => void }) => {
  const { lang } = useLanguage();
  return (
    <div role="group" aria-label={lang === "fr" ? "Adapter la page à un poste" : "Tailor this page for a role"} className="flex flex-wrap gap-2">
      {FOCUS_KEYS.map((key) => (
        <button
          key={key}
          type="button"
          aria-pressed={value === key}
          onClick={() => onChange(key)}
          className={cn(
            "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
            value === key
              ? "border-primary bg-primary text-primary-foreground shadow-sm"
              : "border-border bg-card text-foreground hover:border-primary/40 hover:bg-secondary",
          )}
        >
          {FOCUS_LABELS[key][lang]}
        </button>
      ))}
    </div>
  );
};
