import { motion } from "framer-motion";
import { GraduationCap, Target, Globe } from "lucide-react";

const AboutSection = () => {
  return (
    <section id="about" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-accent mb-2">Get to know me</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">About Me</h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            {
              icon: GraduationCap,
              title: "Education",
              desc: "Fifth-year Computer Engineering student at ENSA Al Hoceima (engineering cycle since 2024), following two years of preparatory engineering studies there (2022–2024).",
            },
            {
              icon: Target,
              title: "Experience",
              desc: "Backend development, AI integration, and process automation through internships with ARIMAYI, STELLANTIS Morocco, Synergy Soft, and Fujikura Automotive.",
            },
            {
              icon: Globe,
              title: "Ambition",
              desc: "Seeking a final-year internship in software development, Spring Boot, DevOps, or cybersecurity, with an interest in AI and cloud engineering.",
            },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.15 }}
              className="bg-gradient-card rounded-xl p-6 border border-border/50 shadow-card hover:border-primary/30 transition-colors duration-300"
            >
              <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4">
                <item.icon size={22} className="text-primary-foreground" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-3">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
        <div className="mt-12 grid md:grid-cols-2 gap-8 border-t border-border/50 pt-8 text-sm">
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3">Certifications & community</h3>
            <p className="text-muted-foreground leading-relaxed">freeCodeCamp AI Agents and Data Science certifications (2024–2025). Member of Club 01 and DataAI Club; participated in Hult Prize (2022–2023).</p>
          </div>
          <div>
            <h3 className="font-display font-semibold text-foreground mb-3">Languages</h3>
            <p className="text-muted-foreground leading-relaxed">Arabic (native) · French (fluent) · English (fluent) · Spanish (beginner)</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
