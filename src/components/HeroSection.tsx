import { motion } from "framer-motion";
import { Download, FolderOpen, Mail } from "lucide-react";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center neural-bg overflow-hidden">
      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float" style={{ animationDelay: "3s" }} />
      <div className="absolute top-1/2 left-1/2 w-64 h-64 rounded-full bg-primary/3 blur-3xl animate-pulse-glow" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="text-sm md:text-base tracking-[0.3em] uppercase text-muted-foreground mb-4">
            Welcome to my portfolio
          </p>
          <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4 leading-tight">
            Salma{" "}
            <span className="text-gradient">Jaghoua</span>
          </h1>
          <p className="font-display text-xl md:text-2xl text-accent mb-6">
            AI & Cloud Engineering Student
          </p>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Passionate about Artificial Intelligence, Cloud Computing, and Full Stack Development.
          Focused on building intelligent and innovative systems that push the boundaries of technology.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-primary text-primary-foreground font-medium text-sm hover:opacity-90 transition-opacity"
          >
            <Download size={18} />
            Download CV
          </a>
          <a
            href="#projects"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors"
          >
            <FolderOpen size={18} />
            View Projects
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-border text-foreground font-medium text-sm hover:bg-secondary transition-colors"
          >
            <Mail size={18} />
            Contact Me
          </a>
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  );
};

export default HeroSection;
