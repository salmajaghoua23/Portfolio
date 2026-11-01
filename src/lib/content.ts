import { supabase } from "@/integrations/supabase/client";
import type { Json, Tables } from "@/integrations/supabase/types";
import { parseSettings, type Settings } from "@/lib/settings";

export type Project = Tables<"projects">;
export type Experience = Tables<"experiences">;
export type Education = Tables<"education">;
export type Certification = Tables<"certifications">;
export type Skill = Tables<"skills">;
export type Cv = Tables<"cvs">;
export type Message = Tables<"messages">;

export const fetchProjects = async () => {
  const { data, error } = await supabase.from("projects").select("*").order("sort_order");
  if (error) throw error;
  return data;
};

export const fetchExperiences = async () => {
  const { data, error } = await supabase.from("experiences").select("*").order("sort_order");
  if (error) throw error;
  return data;
};

export const fetchEducation = async () => {
  const { data, error } = await supabase.from("education").select("*").order("sort_order");
  if (error) throw error;
  return data;
};

export const fetchCertifications = async () => {
  const { data, error } = await supabase.from("certifications").select("*").order("sort_order");
  if (error) throw error;
  return data;
};

export const fetchSkills = async () => {
  const { data, error } = await supabase.from("skills").select("*").order("sort_order");
  if (error) throw error;
  return data;
};

export const fetchCvs = async () => {
  const { data, error } = await supabase.from("cvs").select("*").order("sort_order");
  if (error) throw error;
  return data;
};

export const fetchSettingsRows = async (): Promise<Record<string, Json>> => {
  const { data, error } = await supabase.from("settings").select("key, value");
  if (error) throw error;
  return Object.fromEntries(data.map((row) => [row.key, row.value]));
};

export const fetchSettings = async (): Promise<Settings> => parseSettings(await fetchSettingsRows());
