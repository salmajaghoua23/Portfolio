create type public.app_role as enum ('admin');

create table public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete cascade not null,
  role public.app_role not null,
  unique (user_id, role)
);
grant select on public.user_roles to authenticated;
grant all on public.user_roles to service_role;
alter table public.user_roles enable row level security;
create policy "Users can view own roles"
  on public.user_roles for select to authenticated
  using (auth.uid() = user_id);

create or replace function public.has_role(_user_id uuid, _role public.app_role)
returns boolean
language sql stable security definer set search_path = public
as $$
  select exists (select 1 from public.user_roles where user_id = _user_id and role = _role);
$$;

create or replace function public.assign_first_admin()
returns trigger
language plpgsql security definer set search_path = public
as $$
begin
  if not exists (select 1 from public.user_roles where role = 'admin') then
    insert into public.user_roles (user_id, role) values (new.id, 'admin');
  end if;
  return new;
end;
$$;

create trigger on_auth_user_created_first_admin
after insert on auth.users
for each row execute function public.assign_first_admin();

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  sort_order integer not null default 0,
  featured boolean not null default false,
  is_recent boolean not null default false,
  year text,
  tags text[] not null default '{}',
  title_en text not null,
  title_fr text,
  summary_en text,
  summary_fr text,
  context_en text, context_fr text,
  role_en text, role_fr text,
  features_en text, features_fr text,
  architecture_en text, architecture_fr text,
  results_en text, results_fr text,
  stack text[] not null default '{}',
  image_url text,
  icon text,
  github_url text,
  demo_url text,
  created_at timestamptz not null default now()
);
grant select on public.projects to anon, authenticated;
grant insert, update, delete on public.projects to authenticated;
grant all on public.projects to service_role;
alter table public.projects enable row level security;
create policy "Public read projects" on public.projects for select to anon, authenticated using (true);
create policy "Admins manage projects" on public.projects for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.skills (
  id uuid primary key default gen_random_uuid(),
  sort_order integer not null default 0,
  group_key text not null,
  name text not null
);
grant select on public.skills to anon, authenticated;
grant insert, update, delete on public.skills to authenticated;
grant all on public.skills to service_role;
alter table public.skills enable row level security;
create policy "Public read skills" on public.skills for select to anon, authenticated using (true);
create policy "Admins manage skills" on public.skills for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.experiences (
  id uuid primary key default gen_random_uuid(),
  sort_order integer not null default 0,
  title_en text not null, title_fr text,
  company text, location text,
  period_en text, period_fr text,
  context_en text, context_fr text,
  mission_en text, mission_fr text,
  details_en text, details_fr text,
  skills text[] not null default '{}',
  created_at timestamptz not null default now()
);
grant select on public.experiences to anon, authenticated;
grant insert, update, delete on public.experiences to authenticated;
grant all on public.experiences to service_role;
alter table public.experiences enable row level security;
create policy "Public read experiences" on public.experiences for select to anon, authenticated using (true);
create policy "Admins manage experiences" on public.experiences for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.education (
  id uuid primary key default gen_random_uuid(),
  sort_order integer not null default 0,
  school_en text not null, school_fr text,
  degree_en text not null, degree_fr text,
  period_en text, period_fr text,
  location text,
  created_at timestamptz not null default now()
);
grant select on public.education to anon, authenticated;
grant insert, update, delete on public.education to authenticated;
grant all on public.education to service_role;
alter table public.education enable row level security;
create policy "Public read education" on public.education for select to anon, authenticated using (true);
create policy "Admins manage education" on public.education for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.certifications (
  id uuid primary key default gen_random_uuid(),
  sort_order integer not null default 0,
  name_en text not null, name_fr text,
  org text, year text,
  description_en text, description_fr text,
  created_at timestamptz not null default now()
);
grant select on public.certifications to anon, authenticated;
grant insert, update, delete on public.certifications to authenticated;
grant all on public.certifications to service_role;
alter table public.certifications enable row level security;
create policy "Public read certifications" on public.certifications for select to anon, authenticated using (true);
create policy "Admins manage certifications" on public.certifications for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.cvs (
  id uuid primary key default gen_random_uuid(),
  sort_order integer not null default 0,
  label_en text not null, label_fr text,
  file_url text not null,
  filename text,
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);
grant select on public.cvs to anon, authenticated;
grant insert, update, delete on public.cvs to authenticated;
grant all on public.cvs to service_role;
alter table public.cvs enable row level security;
create policy "Public read cvs" on public.cvs for select to anon, authenticated using (true);
create policy "Admins manage cvs" on public.cvs for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.settings (
  key text primary key,
  value jsonb not null,
  updated_at timestamptz not null default now()
);
grant select on public.settings to anon, authenticated;
grant insert, update, delete on public.settings to authenticated;
grant all on public.settings to service_role;
alter table public.settings enable row level security;
create policy "Public read settings" on public.settings for select to anon, authenticated using (true);
create policy "Admins manage settings" on public.settings for all to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));

create table public.messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);
grant insert on public.messages to anon, authenticated;
grant select, update, delete on public.messages to authenticated;
grant all on public.messages to service_role;
alter table public.messages enable row level security;
create policy "Anyone can send a message" on public.messages for insert to anon, authenticated with check (true);
create policy "Admins read messages" on public.messages for select to authenticated using (public.has_role(auth.uid(), 'admin'));
create policy "Admins update messages" on public.messages for update to authenticated using (public.has_role(auth.uid(), 'admin')) with check (public.has_role(auth.uid(), 'admin'));
create policy "Admins delete messages" on public.messages for delete to authenticated using (public.has_role(auth.uid(), 'admin'));

create policy "Public read portfolio files"
  on storage.objects for select to anon, authenticated
  using (bucket_id = 'portfolio-uploads');
create policy "Admins upload portfolio files"
  on storage.objects for insert to authenticated
  with check (bucket_id = 'portfolio-uploads' and public.has_role(auth.uid(), 'admin'));
create policy "Admins update portfolio files"
  on storage.objects for update to authenticated
  using (bucket_id = 'portfolio-uploads' and public.has_role(auth.uid(), 'admin'))
  with check (bucket_id = 'portfolio-uploads' and public.has_role(auth.uid(), 'admin'));
create policy "Admins delete portfolio files"
  on storage.objects for delete to authenticated
  using (bucket_id = 'portfolio-uploads' and public.has_role(auth.uid(), 'admin'));