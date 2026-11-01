import { useQuery } from "@tanstack/react-query";
import {
  fetchCertifications,
  fetchCvs,
  fetchEducation,
  fetchExperiences,
  fetchProjects,
  fetchSettings,
  fetchSkills,
} from "@/lib/content";

export const contentKeys = {
  projects: ["projects"] as const,
  experiences: ["experiences"] as const,
  education: ["education"] as const,
  certifications: ["certifications"] as const,
  skills: ["skills"] as const,
  cvs: ["cvs"] as const,
  settings: ["settings"] as const,
};

export const useProjects = () => useQuery({ queryKey: contentKeys.projects, queryFn: fetchProjects });
export const useExperiences = () => useQuery({ queryKey: contentKeys.experiences, queryFn: fetchExperiences });
export const useEducation = () => useQuery({ queryKey: contentKeys.education, queryFn: fetchEducation });
export const useCertifications = () =>
  useQuery({ queryKey: contentKeys.certifications, queryFn: fetchCertifications });
export const useSkills = () => useQuery({ queryKey: contentKeys.skills, queryFn: fetchSkills });
export const useCvs = () => useQuery({ queryKey: contentKeys.cvs, queryFn: fetchCvs });
export const useSettings = () => useQuery({ queryKey: contentKeys.settings, queryFn: fetchSettings });
