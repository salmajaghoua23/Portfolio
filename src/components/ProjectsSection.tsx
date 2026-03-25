import { motion } from "framer-motion";
import { ExternalLink, Brain, BookOpen, ScanFace, Pill, Github } from "lucide-react";
import { useState } from "react";

import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectLibrary from "@/assets/project-library.jpg";
import projectFace from "@/assets/project-face.jpg";
import projectPharmacy from "@/assets/project-pharmacy.jpg";

const projects = [
  {
    icon: Brain,
    title: "AI-Powered E-commerce Search",
    desc: "Intelligent product search engine using image and text queries powered by Convolutional Neural Networks for accurate visual similarity matching.",
    techs: ["Python", "TensorFlow", "CNN", "Flask"],
    image: projectEcommerce,
    color: "from-purple-500/20 to-blue-500/20",
  },
  {
    icon: BookOpen,
    title: "Library Management System",
    desc: "Full-featured library management application with database connectivity, CRUD operations, and an intuitive graphical user interface.",
    techs: ["C++", "Qt", "MySQL", "OOP"],
    image: projectLibrary,
    color: "from-indigo-500/20 to-violet-500/20",
  },
  {
    icon: ScanFace,
    title: "Face Recognition System",
    desc: "Real-time face detection and recognition system using computer vision techniques for identification and verification.",
    techs: ["Python", "OpenCV", "NumPy"],
    image: projectFace,
    color: "from-emerald-500/20 to-cyan-500/20",
  },
  {
    icon: Pill,
    title: "Pharmacy Management System",
    desc: "Complete pharmacy management solution with stock tracking, sales management, statistics dashboards, and reporting features.",
    techs: ["C", "File Management", "Statistics"],
    image: projectPharmacy,
    color: "from-teal-500/20 to-blue-500/20",
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.15, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative rounded-2xl overflow-hidden border border-border/50 bg-card shadow-card hover:shadow-xl transition-all duration-500"
    >
      {/* Image container */}
      <div className="relative h-56 overflow-hidden">
        <motion.img
          src={project.image}
          alt={project.title}
          loading="lazy"
          width={800}
          height={512}
          className="w-full h-full object-cover"
          animate={{ scale: isHovered ? 1.08 : 1 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
        {/* Gradient overlay */}
        <div className={`absolute inset-0 bg-gradient-to-t ${project.color} opacity-60`} />
        <div className="absolute inset-0 bg-gradient-to-t from-card via-card/40 to-transparent" />

        {/* Floating icon */}
        <motion.div
          className="absolute top-4 left-4 w-12 h-12 rounded-xl bg-gradient-primary flex items-center justify-center backdrop-blur-sm shadow-lg"
          animate={{ rotate: isHovered ? 10 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <project.icon size={22} className="text-primary-foreground" />
        </motion.div>

        {/* Hover link icon */}
        <motion.div
          className="absolute top-4 right-4"
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : -8 }}
          transition={{ duration: 0.3 }}
        >
          <div className="w-10 h-10 rounded-full bg-background/80 backdrop-blur-sm flex items-center justify-center border border-border/50">
            <ExternalLink size={16} className="text-accent" />
          </div>
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="font-display text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed mb-5">
          {project.desc}
        </p>

        {/* Tech tags */}
        <div className="flex flex-wrap gap-2">
          {project.techs.map((tech, i) => (
            <motion.span
              key={tech}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: 0.4 + i * 0.05 }}
              className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium"
            >
              {tech}
            </motion.span>
          ))}
        </div>
      </div>

      {/* Bottom accent line */}
      <motion.div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-primary via-accent to-primary"
        initial={{ width: "0%" }}
        animate={{ width: isHovered ? "100%" : "0%" }}
        transition={{ duration: 0.4, ease: "easeOut" }}
      />
    </motion.div>
  );
};

const ProjectsSection = () => {
  return (
    <section id="projects" className="py-24 px-6 relative">
      {/* Background decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 -right-32 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="max-w-6xl mx-auto relative">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.p
            initial={{ opacity: 0, letterSpacing: "0.1em" }}
            whileInView={{ opacity: 1, letterSpacing: "0.2em" }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-sm tracking-[0.2em] uppercase text-accent mb-3"
          >
            What I've built
          </motion.p>
          <h2 className="font-display text-3xl md:text-5xl font-bold mb-4 text-foreground">
            Featured Projects
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            A selection of projects showcasing my skills in AI, software engineering, and full-stack development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
