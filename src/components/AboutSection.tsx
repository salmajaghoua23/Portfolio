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
              desc: "Bachelor's degree in Computer Science (Bac+3) with a strong foundation in software engineering, algorithms, and intelligent systems.",
            },
            {
              icon: Target,
              title: "Experience",
              desc: "Hands-on experience in C++, Qt, Web Development, Machine Learning, and database-driven applications. Skilled in building end-to-end solutions.",
            },
            {
              icon: Globe,
              title: "Ambition",
              desc: "Aiming to pursue advanced studies in France in AI and Cloud Computing, and contribute to cutting-edge technological innovation.",
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
      </div>
    </section>
  );
};

export default AboutSection;
