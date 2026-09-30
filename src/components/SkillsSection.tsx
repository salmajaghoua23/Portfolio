import { motion } from "framer-motion";
import { Code2, Globe, BrainCircuit, Cloud } from "lucide-react";

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code2,
    skills: [
      { name: "Java (SE/EE)", level: 90 },
      { name: "Python", level: 85 },
      { name: "C/C++", level: 80 },
      { name: "JavaScript", level: 80 },
      { name: "TypeScript", level: 80 },
      { name: "PHP", level: 70 },
    ],
  },
  {
    title: "Web Development",
    icon: Globe,
    skills: [
      { name: "Spring Boot", level: 85 },
      { name: "Django / DRF", level: 80 },
      { name: "MERN Stack", level: 80 },
      { name: "Flask", level: 75 },
      { name: "Laravel", level: 70 },
      { name: "HTML/CSS", level: 90 },
      { name: "Bootstrap", level: 85 },
    ],
  },
  {
    title: "AI & Data Science",
    icon: BrainCircuit,
    skills: [
      { name: "TensorFlow", level: 80 },
      { name: "Scikit-Learn", level: 75 },
      { name: "Pandas", level: 80 },
      { name: "NumPy", level: 85 },
      { name: "OpenCV", level: 75 },
      { name: "CNN", level: 70 },
    ],
  },
  {
    title: "Cloud & DevOps",
    icon: Cloud,
    skills: [
      { name: "Git/GitLab", level: 85 },
      { name: "Docker", level: 70 },
      { name: "GitHub Actions / CI", level: 75 },
      { name: "n8n Automation", level: 65 },
      { name: "MySQL", level: 85 },
      { name: "REST APIs", level: 80 },
    ],
  },
];

const SkillBar = ({ name, level, delay }: { name: string; level: number; delay: number }) => (
  <div className="space-y-1.5">
    <div className="flex justify-between items-center">
      <span className="text-xs font-medium text-foreground">{name}</span>
      <span className="text-[10px] text-muted-foreground">{level}%</span>
    </div>
    <div className="h-1.5 w-full rounded-full bg-secondary overflow-hidden">
      <motion.div
        className="h-full rounded-full bg-gradient-to-r from-primary to-accent"
        initial={{ width: 0 }}
        whileInView={{ width: `${level}%` }}
        viewport={{ once: true }}
        transition={{ duration: 1, delay, ease: "easeOut" }}
      />
    </div>
  </div>
);

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 px-6 neural-bg">
      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-accent mb-3">What I work with</p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-foreground">Skills & Technologies</h2>
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            A strong foundation across programming, web development, AI and cloud technologies.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-gradient-card rounded-2xl p-6 border border-border/50 shadow-card hover:border-primary/20 transition-all duration-300"
            >
              <div className="flex items-center gap-3 mb-5">
                <div className="w-10 h-10 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <cat.icon size={18} className="text-primary-foreground" />
                </div>
                <h3 className="font-display text-base font-semibold text-foreground">{cat.title}</h3>
              </div>
              <div className="space-y-3">
                {cat.skills.map((skill, j) => (
                  <SkillBar
                    key={skill.name}
                    name={skill.name}
                    level={skill.level}
                    delay={0.2 + j * 0.08}
                  />
                ))}
              </div>
              {cat.title === "Cloud & DevOps" && (
                <p className="text-xs text-muted-foreground mt-5 pt-4 border-t border-border/50 leading-relaxed">
                  Also: PostgreSQL · Oracle DB · MongoDB · Celery · pytest · ruff · mypy · bandit · Webhooks
                </p>
              )}
              {cat.title === "Web Development" && (
                <p className="text-xs text-muted-foreground mt-5 pt-4 border-t border-border/50 leading-relaxed">
                  Also: React · Tailwind CSS · TanStack Start · REST APIs
                </p>
              )}
              {cat.title === "AI & Data Science" && (
                <p className="text-xs text-muted-foreground mt-5 pt-4 border-t border-border/50 leading-relaxed">
                  Also: Keras · MediaPipe · BiLSTM
                </p>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
