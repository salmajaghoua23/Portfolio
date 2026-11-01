import medical from "@/assets/project-medical.jpg";
import signLanguage from "@/assets/project-sign-language.jpg";
import ecommerce from "@/assets/project-ecommerce.jpg";
import face from "@/assets/project-face.jpg";
import library from "@/assets/project-library.jpg";
import pharmacy from "@/assets/project-pharmacy.jpg";
import telecom from "@/assets/project-telecom.jpg";
import microservices from "@/assets/project-microservices.jpg";
import type { Project } from "@/lib/content";

const BUNDLED_IMAGES: Record<string, string> = {
  medical,
  "sign-language": signLanguage,
  ecommerce,
  face,
  library,
  pharmacy,
  telecom,
  microservices,
};

export const resolveProjectImage = (project: Pick<Project, "image_url" | "image_key">): string | null =>
  project.image_url || (project.image_key ? BUNDLED_IMAGES[project.image_key] ?? null : null);
