import { motion } from "framer-motion";
import { Brain, BookOpen, ScanFace, Pill, Stethoscope, Hand, RadioTower, Network } from "lucide-react";
import { useState } from "react";

import projectEcommerce from "@/assets/project-ecommerce.jpg";
import projectLibrary from "@/assets/project-library.jpg";
import projectFace from "@/assets/project-face.jpg";
import projectPharmacy from "@/assets/project-pharmacy.jpg";
import projectMedical from "@/assets/project-medical.jpg";
import projectSignLanguage from "@/assets/project-sign-language.jpg";
import projectTelecom from "@/assets/project-telecom.jpg";
import projectMicroservices from "@/assets/project-microservices.jpg";

const projects = [
  {
    icon: Stethoscope,
    title: "Medical Information System",
    desc: "A comprehensive medical information management system with patient records, appointment scheduling, health data analytics, and reporting dashboards built recently as a full-stack project.",
    techs: ["Java EE", "Spring Boot", "MySQL", "REST API"],
    image: projectMedical,
    featured: true,
  },
  {
    icon: Brain,
    title: "AI-Powered E-commerce Search",
    desc: "Intelligent product search engine using image and text queries powered by Convolutional Neural Networks for accurate visual similarity matching.",
    techs: ["Python", "TensorFlow", "CNN", "Flask"],
    image: projectEcommerce,
    featured: false,
  },
  {
    icon: BookOpen,
    title: "Library Management System",
    desc: "Full-featured library management application with database connectivity, CRUD operations, and an intuitive graphical user interface.",
    techs: ["C++", "Qt", "MySQL", "OOP"],
    image: projectLibrary,
    featured: false,
  },
  {
    icon: ScanFace,
    title: "Face Recognition System",
    desc: "Real-time face detection and recognition system using computer vision techniques for identification and verification.",
    techs: ["Python", "OpenCV", "NumPy"],
    image: projectFace,
    featured: false,
  },
  {
    icon: Pill,
    title: "Pharmacy Management System",
    desc: "Complete pharmacy management solution with stock tracking, sales management, statistics dashboards, and reporting features.",
    techs: ["C", "File Management", "Statistics"],
    image: projectPharmacy,
    featured: false,
  },
  {
    icon: Hand,
    title: "Sign Language Translation",
    desc: "Real-time webcam system recognizing sign-language gestures and translating them into text using deep learning and computer vision.",
    techs: ["Python", "TensorFlow", "Keras", "MediaPipe", "BiLSTM"],
    image: projectSignLanguage,
    featured: false,
  },
  {
    icon: RadioTower,
    title: "Telecom QoS / QoE Analysis",
    desc: "Desktop network-quality analysis application calculating performance indicators including latency, jitter, throughput and MOS.",
    techs: ["Java", "JavaFX", "Oracle DB", "Python"],
    image: projectTelecom,
    featured: false,
  },
  {
    icon: Network,
    title: "Course Enrollment Microservices",
    desc: "Microservices application for managing students, courses and enrollment, with an API Gateway and Eureka service discovery.",
    techs: ["Java", "Spring Boot", "Spring Cloud", "Eureka", "MySQL"],
    image: projectMicroservices,
    featured: false,
  },
];

const ProjectCard = ({ project, index }: { project: typeof projects[0]; index: number }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, delay: index * 0.12, ease: "easeOut" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`group relative rounded-2xl overflow-hidden border border-border/50 bg-card shadow-card hover:shadow-xl hover:border-primary/30 transition-all duration-500 ${
        project.featured ? "md:col-span-2" : ""
      }`}
    >
      {/* Featured badge */}
      {project.featured && (
        <div className="absolute top-4 right-4 z-20">
          <span className="px-3 py-1 text-[10px] font-semibold uppercase tracking-widest rounded-full bg-accent text-accent-foreground">
            Recent
          </span>
        </div>
      )}

      <div className={`${project.featured ? "md:flex" : ""}`}>
        {/* Image */}
        <div className={`relative overflow-hidden ${project.featured ? "md:w-1/2 h-64 md:h-auto" : "h-52"}`}>
          <motion.img
            src={project.image}
            alt={project.title}
            loading="lazy"
            width={800}
            height={512}
            className="w-full h-full object-cover"
            animate={{ scale: isHovered ? 1.06 : 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-card/50 to-transparent" />

          <motion.div
            className="absolute top-4 left-4 w-11 h-11 rounded-xl bg-gradient-primary flex items-center justify-center backdrop-blur-sm shadow-lg"
            animate={{ rotate: isHovered ? 8 : 0 }}
            transition={{ duration: 0.3 }}
          >
            <project.icon size={20} className="text-primary-foreground" />
          </motion.div>
        </div>

        {/* Content */}
        <div className={`p-6 ${project.featured ? "md:w-1/2 md:flex md:flex-col md:justify-center" : ""}`}>
          <h3 className="font-display text-lg font-semibold mb-2 text-foreground group-hover:text-primary transition-colors duration-300">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-5">
            {project.desc}
          </p>
          <div className="flex flex-wrap gap-2">
            {project.techs.map((tech, i) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                className="text-xs px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/20 font-medium"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom accent */}
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
          <p className="text-muted-foreground max-w-lg mx-auto text-sm">
            A selection of projects showcasing my skills in AI, software engineering, and full-stack development.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
