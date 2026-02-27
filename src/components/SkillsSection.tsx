import { motion } from "framer-motion";

const skillCategories = [
  {
    title: "Programming Languages",
    skills: ["Java (SE/EE)", "Python", "C/C++", "JavaScript", "PHP"],
  },
  {
    title: "Web Development",
    skills: ["Spring Boot", "MERN Stack", "Flask", "Laravel", "HTML/CSS", "Bootstrap"],
  },
  {
    title: "AI & Data",
    skills: ["TensorFlow", "Scikit-Learn", "Pandas", "NumPy", "OpenCV", "CNN"],
  },
  {
    title: "Cloud & Tools",
    skills: ["Git", "GitLab", "Docker", "n8n (Automation)", "MySQL"],
  },
];

const SkillsSection = () => {
  return (
    <section id="skills" className="py-24 px-6 neural-bg">
      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-accent mb-2">What I work with</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Skills & Technologies</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {skillCategories.map((cat, i) => (
            <motion.div
              key={cat.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="bg-gradient-card rounded-xl p-6 border border-border/50 shadow-card"
            >
              <h3 className="font-display text-base font-semibold text-accent mb-4">{cat.title}</h3>
              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 text-xs font-medium rounded-full bg-secondary text-secondary-foreground border border-border/50 hover:border-primary/40 transition-colors duration-200"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
