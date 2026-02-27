import { motion } from "framer-motion";
import { ExternalLink, Brain, BookOpen, ScanFace, Pill } from "lucide-react";

const projects = [
  {
    icon: Brain,
    title: "AI-Powered E-commerce Search",
    desc: "Intelligent product search engine using image and text queries powered by Convolutional Neural Networks for accurate visual similarity matching.",
    techs: ["Python", "TensorFlow", "CNN", "Flask"],
  },
  {
    icon: BookOpen,
    title: "Library Management System",
    desc: "Full-featured library management application with database connectivity, CRUD operations, and an intuitive graphical user interface.",
    techs: ["C++", "Qt", "MySQL", "OOP"],
  },
  {
    icon: ScanFace,
    title: "Face Recognition System",
    desc: "Real-time face detection and recognition system using computer vision techniques for identification and verification.",
    techs: ["Python", "OpenCV", "NumPy"],
  },
  {
    icon: Pill,
    title: "Pharmacy Management System",
    desc: "Complete pharmacy management solution with stock tracking, sales management, statistics dashboards, and reporting features.",
    techs: ["C", "File Management", "Statistics"],
  },
];

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-sm tracking-[0.2em] uppercase text-accent mb-2">What I've built</p>
          <h2 className="font-display text-3xl md:text-4xl font-bold">Featured Projects</h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              whileHover={{ y: -4 }}
              className="group bg-gradient-card rounded-xl p-6 border border-border/50 shadow-card hover:border-primary/30 transition-all duration-300"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="w-11 h-11 rounded-lg bg-gradient-primary flex items-center justify-center">
                  <project.icon size={20} className="text-primary-foreground" />
                </div>
                <ExternalLink size={16} className="text-muted-foreground group-hover:text-accent transition-colors" />
              </div>
              <h3 className="font-display text-lg font-semibold mb-2">{project.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed mb-4">{project.desc}</p>
              <div className="flex flex-wrap gap-2">
                {project.techs.map((tech) => (
                  <span
                    key={tech}
                    className="text-xs px-2.5 py-1 rounded-full bg-primary/10 text-primary border border-primary/20"
                  >
                    {tech}
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

export default ProjectsSection;
