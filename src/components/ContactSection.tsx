import { Github, Linkedin, Mail, MapPin, Phone } from "lucide-react";
import { ContactForm } from "@/components/ContactForm";
import { ContentError, Reveal, SectionHeader, SkeletonList } from "@/components/common/SectionPrimitives";
import { useSettings } from "@/hooks/useContent";
import { useLanguage } from "@/lib/language";

export const ContactSection = () => {
  const { lang, t } = useLanguage();
  const { data: settings, isLoading, isError } = useSettings();
  const location = settings?.profile.location[lang] || settings?.profile.location[lang === "fr" ? "en" : "fr"] || "";

  return (
    <section id="contact" className="scroll-mt-20 py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1fr_1.2fr] lg:px-8">
        <Reveal className="space-y-8">
          <SectionHeader eyebrow={t("contact_eyebrow")} title={t("contact_title")} />
          <p className="text-base leading-[1.6] text-muted-foreground">{t("contact_intro")}</p>

          {isLoading && <SkeletonList count={3} />}
          {isError && <ContentError message={t("content_error")} />}
          {settings && (
            <ul className="space-y-4">
              {settings.contact.emails.map((email) => (
                <li key={email}>
                  <a href={`mailto:${email}`} className="inline-flex items-center gap-3 text-sm font-medium text-foreground hover:text-primary">
                    <Mail className="h-4 w-4 text-accent" aria-hidden="true" />
                    {email}
                  </a>
                </li>
              ))}
              {settings.contact.phone && (
                <li className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <Phone className="h-4 w-4 text-accent" aria-hidden="true" />
                  {settings.contact.phone}
                </li>
              )}
              {location && (
                <li className="flex items-center gap-3 text-sm font-medium text-foreground">
                  <MapPin className="h-4 w-4 text-accent" aria-hidden="true" />
                  {location}
                </li>
              )}
              {settings.social.github && (
                <li>
                  <a href={settings.social.github} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-sm font-medium text-foreground hover:text-primary">
                    <Github className="h-4 w-4 text-accent" aria-hidden="true" />
                    GitHub
                  </a>
                </li>
              )}
              {settings.social.linkedin && (
                <li>
                  <a href={settings.social.linkedin} target="_blank" rel="noreferrer" className="inline-flex items-center gap-3 text-sm font-medium text-foreground hover:text-primary">
                    <Linkedin className="h-4 w-4 text-accent" aria-hidden="true" />
                    LinkedIn
                  </a>
                </li>
              )}
            </ul>
          )}
        </Reveal>

        <Reveal delay={0.1}>
          {settings && <ContactForm recipientEmail={settings.contact.emails[0] ?? ""} />}
        </Reveal>
      </div>
    </section>
  );
};
