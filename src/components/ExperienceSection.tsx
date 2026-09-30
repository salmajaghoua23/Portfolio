import { motion } from "framer-motion";

const experience = [
  {
    role: "Backend Developer · RESET project",
    company: "ARIMAYI",
    date: "Jul – Aug 2026",
    place: "Paris, France",
    details: "Designed a code-repository analysis module for stack detection, indexing, and initial mapping with Django REST Framework and hexagonal architecture. Built asynchronous processing with Celery and achieved 85% test coverage with pytest.",
    tools: "Python · Django REST Framework · Celery · PostgreSQL · GitHub Actions",
  },
  {
    role: "Web Application Development Intern",
    company: "STELLANTIS Morocco",
    date: "Jun – Aug 2026",
    place: "Kénitra, Morocco",
    details: "Digitized assembly-workshop JES sheets in a bilingual French/Arabic application with interactive training, quizzes, progress tracking, and a conversational AI assistant for operators.",
    tools: "React · TypeScript · Tailwind CSS · TanStack Start · PostgreSQL · Vercel",
  },
  {
    role: "AI & Automation Intern",
    company: "Synergy Soft",
    date: "Summer 2025",
    place: "Remote · France",
    details: "Built n8n and Python workflows for WordPress publishing and AI-assisted content generation, integrating Gemini and ChatGPT APIs.",
    tools: "n8n · Python · WordPress · REST APIs",
  },
  {
    role: "IT & Automation Intern",
    company: "Fujikura Automotive",
    date: "Aug 2025",
    place: "Kénitra, Morocco",
    details: "Supported the IT department with system monitoring and explored automation opportunities to improve internal processes.",
    tools: "IT operations · Automation",
  },
  {
    role: "Administrative IT Observation Internship",
    company: "Province of Sidi Slimane",
    date: "2023 – 2024",
    place: "Sidi Slimane, Morocco",
    details: "Observed administrative management systems, networking operations, and data security practices.",
    tools: "Information systems · Networking",
  },
];

const ExperienceSection = () => (
  <section id="experience" className="py-24 px-6 border-t border-border/50">
    <div className="max-w-5xl mx-auto">
      <p className="text-sm uppercase text-accent mb-3">In practice</p>
      <h2 className="font-display text-3xl md:text-5xl font-bold mb-12">Experience</h2>
      <div className="border-l border-border ml-2 space-y-10">
        {experience.map((item, index) => (
          <motion.article
            key={`${item.company}-${item.date}`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.06 }}
            className="relative pl-7 md:pl-10"
          >
            <span className="absolute -left-[5px] top-2 h-[9px] w-[9px] rounded-full bg-accent" />
            <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
              <h3 className="font-display text-lg font-semibold text-foreground">{item.role}</h3>
              <span className="text-xs text-muted-foreground">{item.date}</span>
            </div>
            <p className="text-sm text-accent mt-1">{item.company} <span className="text-muted-foreground">· {item.place}</span></p>
            <p className="text-sm text-muted-foreground leading-relaxed mt-3 max-w-3xl">{item.details}</p>
            <p className="text-xs text-muted-foreground mt-3">{item.tools}</p>
          </motion.article>
        ))}
      </div>
    </div>
  </section>
);

export default ExperienceSection;