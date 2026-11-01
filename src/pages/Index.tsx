import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutSection } from "@/components/AboutSection";
import { SkillsSection } from "@/components/SkillsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ExperienceSection } from "@/components/ExperienceSection";
import { EducationSection } from "@/components/EducationSection";
import { CareerSection } from "@/components/CareerSection";
import { ContactSection } from "@/components/ContactSection";
import { Footer } from "@/components/Footer";
import { useFocusParam } from "@/hooks/useFocusParam";

const Index = () => {
  const { focus, setFocus } = useFocusParam();

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Navbar />
      <main>
        <HeroSection focus={focus} onFocusChange={setFocus} />
        <AboutSection />
        <SkillsSection focus={focus} />
        <ProjectsSection focus={focus} />
        <ExperienceSection />
        <EducationSection />
        <CareerSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
