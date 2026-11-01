/*
# Portfolio content schema, admin access, messages and media storage

1. Summary
Creates the database tables behind the portfolio website: projects, experiences, education, certifications and activities, skills, CV files, site settings, contact messages, and an admin role. Public visitors can read the portfolio content. Only the owner's admin account can change content, read messages, and upload files.

2. New Tables
- `user_roles`: links a signed-in account to a role (currently only `admin`).
- `projects`: portfolio projects with bilingual (FR/EN) case-study fields, tags, stack, images and links.
- `experiences`: professional experience entries with bilingual details.
- `education`: degrees and schooling with bilingual labels.
- `certifications`: certifications and community activities (kind = certification or activity).
- `skills`: skill names grouped by category and tagged by focus area.
- `cvs`: downloadable CV files with a language and focus tags.
- `settings`: key/value site settings (profile text, contact recipients, social links).
- `messages`: contact form submissions with read status and notification timestamp.

3. Functions and triggers
- `is_admin()`: true when the signed-in user has the admin role.
- `grant_owner_admin()`: when the owner's account is created, it is given the admin role automatically.
- `limit_message_rate()`: rejects new contact messages when more than 30 arrive within an hour (simple spam protection).

4. Storage
- Public bucket `portfolio-media` for project images and CV PDFs. Anyone can read; only admins can upload, replace or delete.

5. Security
- Row level security is enabled on every table.
- Content tables: anyone (anon and signed-in) can read; only admins can insert, update or delete.
- Messages: anyone can insert a message using only the allowed columns; only admins can read, mark as read, or delete.
- `is_admin()` is callable by signed-in users only.

6. Important notes
- The admin email is hard-coded in the trigger and the backfill step below.
- Disable public sign-ups in the authentication settings so nobody else can register that email.
*/

CREATE TABLE IF NOT EXISTS public.user_roles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL CHECK (role IN ('admin')),
  UNIQUE (user_id, role)
);

CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.user_roles WHERE user_id = auth.uid() AND role = 'admin'
  );
$$;

REVOKE EXECUTE ON FUNCTION public.is_admin() FROM PUBLIC, anon;
GRANT EXECUTE ON FUNCTION public.is_admin() TO authenticated;

CREATE OR REPLACE FUNCTION public.grant_owner_admin()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF lower(NEW.email) = 'salmajaghoua@gmail.com' THEN
    INSERT INTO public.user_roles (user_id, role) VALUES (NEW.id, 'admin')
    ON CONFLICT DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.grant_owner_admin() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS on_auth_user_grant_owner_admin ON auth.users;
CREATE TRIGGER on_auth_user_grant_owner_admin
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.grant_owner_admin();

INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin' FROM auth.users WHERE lower(email) = 'salmajaghoua@gmail.com'
ON CONFLICT DO NOTHING;

ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;
GRANT SELECT ON public.user_roles TO authenticated;
DROP POLICY IF EXISTS "select_own_role" ON public.user_roles;
CREATE POLICY "select_own_role" ON public.user_roles FOR SELECT
TO authenticated USING (user_id = auth.uid());

CREATE TABLE IF NOT EXISTS public.projects (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer NOT NULL DEFAULT 0,
  featured boolean NOT NULL DEFAULT false,
  title_fr text NOT NULL,
  title_en text NOT NULL,
  summary_fr text,
  summary_en text,
  context_fr text,
  context_en text,
  role_fr text,
  role_en text,
  features_fr text,
  features_en text,
  architecture_fr text,
  architecture_en text,
  results_fr text,
  results_en text,
  stack text[] NOT NULL DEFAULT '{}',
  tags text[] NOT NULL DEFAULT '{}',
  year text,
  image_url text,
  image_key text,
  github_url text,
  demo_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.experiences (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer NOT NULL DEFAULT 0,
  role_fr text NOT NULL,
  role_en text NOT NULL,
  company text NOT NULL,
  location_fr text,
  location_en text,
  period_fr text,
  period_en text,
  context_fr text,
  context_en text,
  mission_fr text,
  mission_en text,
  achievements_fr text,
  achievements_en text,
  skills text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.education (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer NOT NULL DEFAULT 0,
  school_fr text NOT NULL,
  school_en text NOT NULL,
  degree_fr text NOT NULL,
  degree_en text NOT NULL,
  period_fr text,
  period_en text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.certifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer NOT NULL DEFAULT 0,
  kind text NOT NULL DEFAULT 'certification' CHECK (kind IN ('certification', 'activity')),
  name_fr text NOT NULL,
  name_en text NOT NULL,
  organization text,
  year text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.skills (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer NOT NULL DEFAULT 0,
  name text NOT NULL,
  group_key text NOT NULL CHECK (group_key IN ('languages', 'backend', 'frontend', 'ai_data', 'databases', 'devops_cloud', 'networking', 'methods')),
  tags text[] NOT NULL DEFAULT '{}',
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.cvs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  sort_order integer NOT NULL DEFAULT 0,
  label_fr text NOT NULL,
  label_en text NOT NULL,
  language text NOT NULL CHECK (language IN ('fr', 'en')),
  tags text[] NOT NULL DEFAULT '{}',
  file_url text NOT NULL,
  file_name text,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.settings (
  key text PRIMARY KEY,
  value jsonb NOT NULL,
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS public.messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamptz NOT NULL DEFAULT now(),
  name text NOT NULL CHECK (char_length(name) BETWEEN 1 AND 120),
  email text NOT NULL CHECK (char_length(email) BETWEEN 3 AND 254 AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'),
  subject text CHECK (subject IS NULL OR char_length(subject) <= 200),
  message text NOT NULL CHECK (char_length(message) BETWEEN 1 AND 5000),
  is_read boolean NOT NULL DEFAULT false,
  email_sent_at timestamptz
);

CREATE INDEX IF NOT EXISTS projects_sort_idx ON public.projects (sort_order);
CREATE INDEX IF NOT EXISTS experiences_sort_idx ON public.experiences (sort_order);
CREATE INDEX IF NOT EXISTS education_sort_idx ON public.education (sort_order);
CREATE INDEX IF NOT EXISTS certifications_sort_idx ON public.certifications (sort_order);
CREATE INDEX IF NOT EXISTS skills_sort_idx ON public.skills (sort_order);
CREATE INDEX IF NOT EXISTS cvs_sort_idx ON public.cvs (sort_order);
CREATE INDEX IF NOT EXISTS messages_created_idx ON public.messages (created_at);

CREATE OR REPLACE FUNCTION public.limit_message_rate()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF (SELECT count(*) FROM public.messages WHERE created_at > now() - interval '1 hour') >= 30 THEN
    RAISE EXCEPTION 'Too many messages, please try again later' USING ERRCODE = 'P0001';
  END IF;
  RETURN NEW;
END;
$$;

REVOKE EXECUTE ON FUNCTION public.limit_message_rate() FROM PUBLIC, anon, authenticated;

DROP TRIGGER IF EXISTS limit_message_rate_trigger ON public.messages;
CREATE TRIGGER limit_message_rate_trigger
BEFORE INSERT ON public.messages
FOR EACH ROW EXECUTE FUNCTION public.limit_message_rate();

ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experiences ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.education ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.certifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.cvs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.messages ENABLE ROW LEVEL SECURITY;

GRANT SELECT ON public.projects, public.experiences, public.education, public.certifications, public.skills, public.cvs, public.settings TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON public.projects, public.experiences, public.education, public.certifications, public.skills, public.cvs, public.settings TO authenticated;

DROP POLICY IF EXISTS "public_read_projects" ON public.projects;
CREATE POLICY "public_read_projects" ON public.projects FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_projects" ON public.projects;
CREATE POLICY "admin_insert_projects" ON public.projects FOR INSERT TO authenticated WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_update_projects" ON public.projects;
CREATE POLICY "admin_update_projects" ON public.projects FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_delete_projects" ON public.projects;
CREATE POLICY "admin_delete_projects" ON public.projects FOR DELETE TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "public_read_experiences" ON public.experiences;
CREATE POLICY "public_read_experiences" ON public.experiences FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_experiences" ON public.experiences;
CREATE POLICY "admin_insert_experiences" ON public.experiences FOR INSERT TO authenticated WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_update_experiences" ON public.experiences;
CREATE POLICY "admin_update_experiences" ON public.experiences FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_delete_experiences" ON public.experiences;
CREATE POLICY "admin_delete_experiences" ON public.experiences FOR DELETE TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "public_read_education" ON public.education;
CREATE POLICY "public_read_education" ON public.education FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_education" ON public.education;
CREATE POLICY "admin_insert_education" ON public.education FOR INSERT TO authenticated WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_update_education" ON public.education;
CREATE POLICY "admin_update_education" ON public.education FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_delete_education" ON public.education;
CREATE POLICY "admin_delete_education" ON public.education FOR DELETE TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "public_read_certifications" ON public.certifications;
CREATE POLICY "public_read_certifications" ON public.certifications FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_certifications" ON public.certifications;
CREATE POLICY "admin_insert_certifications" ON public.certifications FOR INSERT TO authenticated WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_update_certifications" ON public.certifications;
CREATE POLICY "admin_update_certifications" ON public.certifications FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_delete_certifications" ON public.certifications;
CREATE POLICY "admin_delete_certifications" ON public.certifications FOR DELETE TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "public_read_skills" ON public.skills;
CREATE POLICY "public_read_skills" ON public.skills FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_skills" ON public.skills;
CREATE POLICY "admin_insert_skills" ON public.skills FOR INSERT TO authenticated WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_update_skills" ON public.skills;
CREATE POLICY "admin_update_skills" ON public.skills FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_delete_skills" ON public.skills;
CREATE POLICY "admin_delete_skills" ON public.skills FOR DELETE TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "public_read_cvs" ON public.cvs;
CREATE POLICY "public_read_cvs" ON public.cvs FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_cvs" ON public.cvs;
CREATE POLICY "admin_insert_cvs" ON public.cvs FOR INSERT TO authenticated WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_update_cvs" ON public.cvs;
CREATE POLICY "admin_update_cvs" ON public.cvs FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_delete_cvs" ON public.cvs;
CREATE POLICY "admin_delete_cvs" ON public.cvs FOR DELETE TO authenticated USING (public.is_admin());

DROP POLICY IF EXISTS "public_read_settings" ON public.settings;
CREATE POLICY "public_read_settings" ON public.settings FOR SELECT TO anon, authenticated USING (true);
DROP POLICY IF EXISTS "admin_insert_settings" ON public.settings;
CREATE POLICY "admin_insert_settings" ON public.settings FOR INSERT TO authenticated WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_update_settings" ON public.settings;
CREATE POLICY "admin_update_settings" ON public.settings FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_delete_settings" ON public.settings;
CREATE POLICY "admin_delete_settings" ON public.settings FOR DELETE TO authenticated USING (public.is_admin());

GRANT INSERT (id, name, email, subject, message) ON public.messages TO anon, authenticated;
GRANT SELECT, DELETE ON public.messages TO authenticated;
GRANT UPDATE (is_read) ON public.messages TO authenticated;
GRANT SELECT, UPDATE ON public.messages TO service_role;

DROP POLICY IF EXISTS "public_insert_messages" ON public.messages;
CREATE POLICY "public_insert_messages" ON public.messages FOR INSERT TO anon, authenticated WITH CHECK (true);
DROP POLICY IF EXISTS "admin_read_messages" ON public.messages;
CREATE POLICY "admin_read_messages" ON public.messages FOR SELECT TO authenticated USING (public.is_admin());
DROP POLICY IF EXISTS "admin_update_messages" ON public.messages;
CREATE POLICY "admin_update_messages" ON public.messages FOR UPDATE TO authenticated USING (public.is_admin()) WITH CHECK (public.is_admin());
DROP POLICY IF EXISTS "admin_delete_messages" ON public.messages;
CREATE POLICY "admin_delete_messages" ON public.messages FOR DELETE TO authenticated USING (public.is_admin());

GRANT SELECT ON public.settings, public.projects, public.skills TO service_role;

INSERT INTO storage.buckets (id, name, public)
VALUES ('portfolio-media', 'portfolio-media', true)
ON CONFLICT (id) DO NOTHING;

DROP POLICY IF EXISTS "public_read_portfolio_media" ON storage.objects;
CREATE POLICY "public_read_portfolio_media" ON storage.objects FOR SELECT TO anon, authenticated
USING (bucket_id = 'portfolio-media');

DROP POLICY IF EXISTS "admin_insert_portfolio_media" ON storage.objects;
CREATE POLICY "admin_insert_portfolio_media" ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'portfolio-media' AND public.is_admin());

DROP POLICY IF EXISTS "admin_update_portfolio_media" ON storage.objects;
CREATE POLICY "admin_update_portfolio_media" ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'portfolio-media' AND public.is_admin())
WITH CHECK (bucket_id = 'portfolio-media' AND public.is_admin());

DROP POLICY IF EXISTS "admin_delete_portfolio_media" ON storage.objects;
CREATE POLICY "admin_delete_portfolio_media" ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'portfolio-media' AND public.is_admin());
