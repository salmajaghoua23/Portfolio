import { motion } from "framer-motion";
import { Rocket } from "lucide-react";

const CareerSection = () => {
  return (
    <section id="career" className="py-24 px-6 neural-bg">
      <div className="max-w-3xl mx-auto relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="w-14 h-14 rounded-xl bg-gradient-primary flex items-center justify-center mx-auto mb-6">
            <Rocket size={24} className="text-primary-foreground" />
          </div>
          <p className="text-sm tracking-[0.2em] uppercase text-accent mb-2">What drives me</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold mb-8">Career Objective</h2>
          <p className="text-muted-foreground text-base md:text-lg leading-relaxed">
            I aim to grow as a <span className="text-foreground font-medium">software, AI and cloud engineer</span>,
            building dependable systems that connect strong backend engineering with practical AI.
            I am seeking a final-year internship in software development, Spring Boot, DevOps or cybersecurity,
            and opportunities to contribute to innovative technology teams internationally.
          </p>
        </motion.div>
      </div>
    </section>
  );
};

export default CareerSection;
