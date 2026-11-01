/*
# Seed portfolio content (FR and EN)

1. Summary
Fills the new tables with Salma Jaghoua's portfolio content taken from her CV and brief: profile texts, contact and social settings, projects, experiences, education, certifications and activities, skills, and CV files.

2. What is inserted
- `settings`: profile (hero, bio, objective, languages, focus taglines), contact recipients, social links.
- `projects`: 14 projects in display order. Empty case-study fields are left empty so they stay hidden until filled in the admin page.
- `experiences`: 5 professional experiences, most recent first.
- `education`: 3 education entries.
- `certifications`: 2 certifications and 3 community activities.
- `skills`: skills grouped by category, each tagged by focus area.
- `cvs`: 2 CV files (French) that can be replaced from the admin page.

3. Safety
- Each table is only seeded when it is empty, so re-running this migration does not duplicate content.
- Settings use an upsert that does nothing when the key already exists.
- No existing data is changed or deleted.

4. Notes
- Project images for the first group reuse the images bundled with the website (image_key). Projects without an image show a neutral icon tile until an image is uploaded in the admin page.
*/

INSERT INTO public.settings (key, value) VALUES
('profile', '{
  "name": "Salma Jaghoua",
  "title_fr": "Étudiante en génie logiciel, IA et Cloud",
  "title_en": "Software, AI & Cloud Engineering Student",
  "school_fr": "ENSA Al-Hoceima, 5e année",
  "school_en": "ENSA Al-Hoceima, 5th year",
  "badge_fr": "Ouverte à un stage de fin d’études (PFE) en 2027",
  "badge_en": "Open to a 2027 final-year internship (PFE)",
  "location_fr": "Maroc, ouverte à la mobilité en France",
  "location_en": "Morocco, open to France mobility",
  "bio_fr": "Étudiante en 5e année de génie logiciel à l’ENSA Al-Hoceima, à la recherche d’un stage de fin d’études (PFE) en 2027. Je travaille sur le développement full-stack (Java / Spring Boot, Python, React), l’IA et le machine learning (NLP, deep learning, APIs de LLM) ainsi que sur le cloud et le DevOps (Docker, CI/CD, OpenStack). Autonome, curieuse et esprit d’équipe.",
  "bio_en": "Software engineering student in my fifth year at ENSA Al-Hoceima, looking for a 2027 final-year internship (PFE). I work across full-stack development (Java / Spring Boot, Python, React), AI and machine learning (NLP, deep learning, LLM APIs), and cloud and DevOps (Docker, CI/CD, OpenStack). I am independent, curious and a team player.",
  "objective_fr": "Je souhaite évoluer en tant qu’ingénieure logiciel, IA et cloud, en construisant des systèmes fiables qui allient un backend solide et une IA concrète. Je recherche un stage de fin d’études en développement logiciel, Spring Boot, DevOps ou cybersécurité.",
  "objective_en": "I aim to grow as a software, AI and cloud engineer, building dependable systems that connect strong backend engineering with practical AI. I am seeking a final-year internship in software development, Spring Boot, DevOps or cybersecurity.",
  "languages_fr": "Arabe (langue maternelle) · Français (courant, TCF 2026) · Anglais (courant) · Espagnol (débutant)",
  "languages_en": "Arabic (native) · French (fluent, TCF 2026) · English (fluent) · Spanish (beginner)",
  "license_fr": "Permis B",
  "license_en": "Driver’s license B",
  "focus": {
    "ai": {"fr": "IA & données : NLP, deep learning et intégration de LLM", "en": "AI & Data: NLP, deep learning and LLM integration"},
    "fullstack": {"fr": "Full-stack : Java / Spring Boot, Python et React", "en": "Full-stack: Java / Spring Boot, Python and React"},
    "cloud": {"fr": "Cloud & DevOps : Docker, CI/CD, OpenStack et Linux", "en": "Cloud & DevOps: Docker, CI/CD, OpenStack and Linux"}
  }
}'::jsonb),
('contact', '{
  "emails": ["salmajaghoua@gmail.com", "salma.jaghoua@etu.uae.ac.ma"],
  "phone": "+212 689 689 382"
}'::jsonb),
('social', '{
  "github": "https://github.com/salmajaghoua23",
  "linkedin": "https://www.linkedin.com/in/salma-jaghoua-077709293/"
}'::jsonb)
ON CONFLICT (key) DO NOTHING;

DO $$
BEGIN
  IF NOT EXISTS (SELECT 1 FROM public.projects) THEN
    INSERT INTO public.projects (sort_order, featured, title_fr, title_en, summary_fr, summary_en, context_fr, context_en, role_fr, role_en, features_fr, features_en, architecture_fr, architecture_en, results_fr, results_en, stack, tags, year, image_key, github_url, demo_url) VALUES
    (1, true, 'SkillMirror', 'SkillMirror',
     'Application Android d’évaluation des compétences par IA et de recommandation d’exercices, pour Java et SQL.',
     'Android app that assesses skills with AI and recommends exercises, for Java and SQL.',
     'Savoir où l’on se situe dans chaque compétence et quoi pratiquer ensuite est difficile pour un étudiant. SkillMirror boucle sur un cycle continu : évaluer, analyser, recommander, pratiquer et réévaluer.',
     'Students struggle to know where they stand in each skill and what to practise next. SkillMirror runs a continuous loop: assess, analyse, recommend, practise and re-assess.',
     NULL, NULL,
     'Étudiant : inscription et connexion, évaluation initiale, quiz chronométrés, tableau de bord des compétences (barres et radar, points faibles, évolution), parcours recommandé avec justification lisible, historique des tentatives.
Enseignant : classes avec code d’accès, gestion des questions et exercices, statistiques de classe (moyenne par compétence, étudiants en difficulté), fiche détaillée de chaque étudiant.',
     'Student: sign-up and login, initial assessment, timed quizzes, skills dashboard (bar and radar charts, weak points, progress over time), recommended learning path with a readable justification, attempt history.
Teacher: classes with join codes, question and exercise management, class statistics (average per skill, struggling students), detailed view of each student.',
     'Application mobile Flutter
API REST Spring Boot : JWT, rôles STUDENT / TEACHER, BCrypt, architecture en couches, Spring Data JPA, validation, Swagger
PostgreSQL : utilisateurs, classes, compétences, questions, tentatives, états de compétence, recommandations ; migrations Flyway
Service IA Python (FastAPI et scikit-learn) : probabilité de réussite par régression logistique, estimation de la maîtrise par Bayesian Knowledge Tracing, évaluation par AUC-ROC, score de Brier et comparaison à une référence
Moteur de recommandation dans Spring Boot : priorité = (1 - maîtrise) x poids de la compétence, probabilité de réussite cible d’environ 60 à 70 %, raison lisible pour chaque recommandation, repli à base de règles si le service IA est indisponible
Tests : JUnit / Mockito, tests de widgets Flutter, Postman',
     'Flutter mobile app
Spring Boot REST API: JWT, STUDENT / TEACHER roles, BCrypt, layered architecture, Spring Data JPA, validation, Swagger
PostgreSQL: users, classes, skills, questions, attempts, skill states, recommendations; Flyway migrations
Python AI service (FastAPI and scikit-learn): success-probability prediction with logistic regression, mastery estimation with Bayesian Knowledge Tracing, evaluation with AUC-ROC, Brier score and baseline comparison
Recommendation engine in Spring Boot: priority = (1 - mastery) x skill weight, target success probability around 60-70%, readable reason for each recommendation, rule-based fallback when the AI service is down
Tests: JUnit/Mockito, Flutter widget tests, Postman',
     NULL, NULL,
     ARRAY['Flutter','Dart','Spring Boot','Spring Security','JWT','PostgreSQL','Flyway','FastAPI','scikit-learn','Pandas','NumPy','Swagger'],
     ARRAY['ai','mobile','fullstack'], '2026', NULL, NULL, NULL),
    (2, false, 'Système d’information médical', 'Medical Information System',
     'Gestion des dossiers patients, prise de rendez-vous, analyse des données de santé et tableaux de bord de reporting.',
     'Patient records, appointment scheduling, health-data analytics and reporting dashboards.',
     NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
     ARRAY['Java EE','Spring Boot','MySQL','REST API'], ARRAY['fullstack'], NULL, 'medical', NULL, NULL),
    (3, false, 'Traduction de la langue des signes', 'Sign Language Translation',
     'Système temps réel à partir de la webcam qui reconnaît les gestes de la langue des signes et les traduit en texte.',
     'Real-time webcam system that recognises sign-language gestures and translates them into text.',
     NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
     ARRAY['Python','TensorFlow','Keras','MediaPipe','BiLSTM'], ARRAY['ai'], NULL, 'sign-language', NULL, NULL),
    (4, false, 'Recherche e-commerce par IA', 'AI-Powered E-commerce Search',
     'Recherche de produits par image et par texte, avec des réseaux de neurones convolutifs (CNN) pour la similarité visuelle.',
     'Product search by image and text, using convolutional neural networks (CNN) for visual similarity.',
     NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
     ARRAY['Python','TensorFlow','CNN','Flask'], ARRAY['ai','fullstack'], NULL, 'ecommerce', NULL, NULL),
    (5, false, 'Détection de phishing et de fraude', 'Phishing / Fraud Detection',
     'Classification d’URL et d’e-mails en phishing ou légitimes : prétraitement, extraction de caractéristiques, entraînement et évaluation.',
     'Classification of URLs and emails as phishing or legitimate: preprocessing, feature extraction, training and evaluation.',
     NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
     ARRAY['Python','scikit-learn','Pandas','NumPy'], ARRAY['ai','security'], NULL, NULL, 'https://github.com/salmajaghoua23/phishing_detection_project', NULL),
    (6, false, 'Système de reconnaissance faciale', 'Face Recognition System',
     'Détection et reconnaissance de visages en temps réel pour l’identification et la vérification.',
     'Real-time face detection and recognition for identification and verification.',
     NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
     ARRAY['Python','OpenCV','NumPy'], ARRAY['ai'], NULL, 'face', NULL, NULL),
    (7, false, 'Gestion de bibliothèque', 'Library Management System',
     'Application de gestion de bibliothèque : opérations CRUD, connexion à la base de données et interface graphique conçue avec Qt Designer.',
     'Library management application with CRUD operations, database connectivity and a graphical interface designed with Qt Designer.',
     NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
     ARRAY['C++','Qt','MySQL','OOP'], ARRAY['desktop'], NULL, 'library', NULL, NULL),
    (8, false, 'Gestion de pharmacie', 'Pharmacy Management System',
     'Gestion de pharmacie : suivi des stocks, gestion des ventes, tableaux de bord statistiques et rapports.',
     'Pharmacy management with stock tracking, sales management, statistics dashboards and reports.',
     NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
     ARRAY['C','File management','Statistics'], ARRAY['desktop'], NULL, 'pharmacy', NULL, NULL),
    (9, false, 'Analyse QoS / QoE télécom', 'Telecom QoS / QoE Analysis',
     'Application de bureau d’analyse de la qualité réseau : calcul de la latence, de la gigue, du débit et du MOS.',
     'Desktop network-quality analysis application computing latency, jitter, throughput and MOS.',
     NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
     ARRAY['Java','JavaFX','Oracle DB','Python'], ARRAY['networking','desktop'], NULL, 'telecom', 'https://github.com/omaymaoulad/Projet_Java_QoS-QoE', NULL),
    (10, false, 'Microservices de gestion des inscriptions', 'Course Enrollment Microservices',
     'Microservices de gestion des étudiants, des cours et des inscriptions, avec une API Gateway et la découverte de services Eureka.',
     'Microservices for managing students, courses and enrollments, with an API Gateway and Eureka service discovery.',
     NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
     ARRAY['Java','Spring Boot','Spring Cloud','Eureka','MySQL'], ARRAY['fullstack','cloud'], NULL, 'microservices', 'https://github.com/salmajaghoua23/Systeme_enrollement_student_courses', NULL),
    (11, false, 'Plateforme eService', 'eService Platform',
     'Système de gestion pour enseignants, coordinateurs et chefs de département.',
     'Management system for teachers, coordinators and department heads.',
     NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
     ARRAY['HTML','CSS','JavaScript','PHP'], ARRAY['fullstack'], NULL, NULL, 'https://github.com/salmajaghoua23/eservice', NULL),
    (12, false, 'Cloud privé avec OpenStack', 'Private Cloud with OpenStack',
     'Déploiement et utilisation d’un cloud privé : machines virtuelles, réseau et stockage.',
     'Deployment and use of a private cloud: virtual machines, networking and storage.',
     NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
     ARRAY['OpenStack','Linux','Virtualization'], ARRAY['cloud'], NULL, NULL, NULL, NULL),
    (13, false, 'Projet réseaux : DHCP et DDNS', 'DHCP and DDNS networking project',
     'Service DHCP (attribution dynamique d’adresses IP) et service DDNS (mise à jour dynamique des DNS).',
     'DHCP service (dynamic IP assignment) and DDNS service (dynamic DNS updates).',
     NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL,
     ARRAY['DHCP','DDNS'], ARRAY['networking'], NULL, NULL, NULL, NULL),
    (14, false, 'Hackathons', 'Hackathons',
     'Deux hackathons : un défi autour du LLM Apertus 1.5 (Suisse, en ligne, oct. 2026) et un MVP de gestion de file d’attente hospitalière (RabHackers, France, avr. 2026).',
     'Two hackathons: a challenge around the Apertus 1.5 LLM (Switzerland, online, Oct 2026) and a hospital queue-management MVP (RabHackers, France, Apr 2026).',
     NULL, NULL, NULL, NULL,
     'Apertus 1.5 : solution basée sur le LLM pour un défi académique modélisé sur un entretien technique (Suisse, en ligne, oct. 2026)
RabHackers : MVP de gestion des files d’attente à l’hôpital avec ticket numérique, automatisation IA WhatsApp, notifications SMS et chatbot en darija (France, avr. 2026)',
     'Apertus 1.5: LLM-based solution for an academic challenge modelled on a technical interview (Switzerland, online, Oct 2026)
RabHackers: hospital queue-management MVP with digital tickets, WhatsApp AI automation, SMS notifications and a Darija chatbot (France, Apr 2026)',
     NULL, NULL, NULL, NULL,
     ARRAY['LLM','Python','WhatsApp API','SMS','Chatbot'], ARRAY['ai','fullstack'], '2026', NULL, NULL, NULL);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.experiences) THEN
    INSERT INTO public.experiences (sort_order, role_fr, role_en, company, location_fr, location_en, period_fr, period_en, context_fr, context_en, mission_fr, mission_en, achievements_fr, achievements_en, skills) VALUES
    (1, 'Développeuse Backend (projet RESET)', 'Backend Developer (RESET project)', 'ARIMAYI',
     'Paris, France', 'Paris, France', 'Juil. – Août 2026', 'Jul – Aug 2026',
     'Plateforme d’analyse de dépôts de code.', 'Code-repository analysis platform.',
     'Concevoir le module backend de détection de stack, d’indexation et de cartographie.', 'Design the backend module for stack detection, indexing and initial mapping.',
     'APIs REST avec Django REST Framework, architecture hexagonale et DDD
Traitement asynchrone avec Celery et base PostgreSQL
Tests pytest (85 % de couverture), qualité du code avec ruff, mypy et bandit
Intégration continue avec GitHub Actions',
     'REST APIs with Django REST Framework, hexagonal architecture and DDD
Asynchronous processing with Celery and PostgreSQL
pytest tests (85% coverage), code quality with ruff, mypy and bandit
Continuous integration with GitHub Actions',
     ARRAY['Python','Django REST Framework','Celery','PostgreSQL','pytest','GitHub Actions']),
    (2, 'Stagiaire Développement Web', 'Web Application Development Intern', 'STELLANTIS Morocco',
     'Kénitra, Maroc', 'Kenitra, Morocco', '25 juin – 4 août 2026', '25 Jun – 4 Aug 2026',
     'Digitalisation de l’atelier de montage.', 'Digitalisation of the assembly workshop.',
     'Digitaliser les fiches JES de l’atelier dans une application web bilingue français / arabe.', 'Digitise the workshop’s JES sheets in a bilingual French / Arabic web application.',
     'Application responsive avec formation interactive, quiz et suivi de progression
Assistant IA conversationnel pour les opérateurs, via API
Analyse des besoins, conception UML et déploiement sur Vercel',
     'Responsive application with interactive training, quizzes and progress tracking
Conversational AI assistant for operators, via API
Requirements analysis, UML design and deployment on Vercel',
     ARRAY['React','TypeScript','Tailwind CSS','TanStack Start','Supabase (PostgreSQL)','Vercel','UML','Git/GitHub']),
    (3, 'Stagiaire IA & Automatisation', 'AI & Automation Intern', 'Synergy Soft',
     'À distance (France)', 'Remote (France)', 'Été 2025', 'Summer 2025',
     'Automatisation de la publication de contenu sur WordPress.', 'Automation of content publishing on WordPress.',
     'Automatiser la publication et la génération de contenu assistée par IA.', 'Automate publishing and AI-assisted content generation.',
     'Workflows Python et n8n pour la publication sur WordPress
Intégration des APIs Gemini et ChatGPT, JSON et requêtes HTTP
Documentation des workflows',
     'Python and n8n workflows for WordPress publishing
Integration of Gemini and ChatGPT APIs, JSON and HTTP requests
Documentation of the workflows',
     ARRAY['n8n','Python','Gemini API','ChatGPT API','JSON','HTTP']),
    (4, 'Stagiaire IT & Automatisation', 'IT & Automation Intern', 'Fujikura Automotive',
     'Kénitra, Maroc', 'Kenitra, Morocco', 'Août 2025', 'Aug 2025',
     'Département IT.', 'IT department.',
     'Appuyer le département IT dans la supervision des systèmes et l’automatisation.', 'Support the IT department with system monitoring and automation.',
     'Appui au département IT pour la supervision des systèmes
Exploration d’opportunités d’automatisation des processus internes',
     'Supported the IT department with system monitoring
Explored automation opportunities for internal processes',
     ARRAY['Automation','System monitoring']),
    (5, 'Stage d’observation IT administratif', 'Administrative IT Observation Internship', 'Province of Sidi Slimane',
     NULL, NULL, '2023 – 2024', '2023 – 2024',
     NULL, NULL,
     'Observer les systèmes d’information administratifs, les opérations réseau et les pratiques de sécurité des données.', 'Observe administrative information systems, networking operations and data-security practices.',
     NULL, NULL,
     ARRAY['Information systems','Networking','Data security']);
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.education) THEN
    INSERT INTO public.education (sort_order, school_fr, school_en, degree_fr, degree_en, period_fr, period_en) VALUES
    (1, 'ENSA Al-Hoceima', 'ENSA Al-Hoceima', 'Cycle ingénieur en génie logiciel', 'Engineering degree in Software Engineering', '2024 – Présent', '2024 – Present'),
    (2, 'ENSA Al-Hoceima', 'ENSA Al-Hoceima', 'Classes préparatoires aux études d’ingénieur', 'Preparatory classes for engineering studies', '2022 – 2024', '2022 – 2024'),
    (3, 'Lycée Zineb Nefzaouia', 'Lycée Zineb Nefzaouia', 'Baccalauréat', 'Baccalaureate', '2020 – 2022', '2020 – 2022');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.certifications) THEN
    INSERT INTO public.certifications (sort_order, kind, name_fr, name_en, organization, year) VALUES
    (1, 'certification', 'Certification freeCodeCamp : Agents IA', 'freeCodeCamp certification: AI Agents', 'freeCodeCamp', '2024 – 2025'),
    (2, 'certification', 'Certification freeCodeCamp : Data Science', 'freeCodeCamp certification: Data Science', 'freeCodeCamp', '2024 – 2025'),
    (3, 'activity', 'Club 01', 'Club 01', NULL, '2022 – 2023'),
    (4, 'activity', 'Club DatAi', 'Club DatAi', NULL, '2022 – 2023'),
    (5, 'activity', 'Hult Prize', 'Hult Prize', NULL, '2022 – 2023');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.skills) THEN
    INSERT INTO public.skills (sort_order, name, group_key, tags) VALUES
    (1, 'Java', 'languages', '{fullstack}'), (2, 'Python', 'languages', '{ai}'), (3, 'JavaScript', 'languages', '{fullstack}'),
    (4, 'TypeScript', 'languages', '{fullstack}'), (5, 'C', 'languages', '{}'), (6, 'C++', 'languages', '{}'),
    (7, 'PHP', 'languages', '{fullstack}'), (8, 'SQL', 'languages', '{fullstack}'), (9, 'Dart', 'languages', '{}'),
    (10, 'Spring Boot', 'backend', '{fullstack}'), (11, 'Spring Cloud', 'backend', '{fullstack,cloud}'), (12, 'Java EE', 'backend', '{fullstack}'),
    (13, 'Microservices', 'backend', '{fullstack,cloud}'), (14, 'Django REST Framework', 'backend', '{fullstack}'), (15, 'Flask', 'backend', '{ai}'),
    (16, 'FastAPI', 'backend', '{ai}'), (17, 'Laravel', 'backend', '{fullstack}'), (18, 'Node.js', 'backend', '{fullstack}'),
    (19, 'Celery', 'backend', '{cloud}'), (20, 'REST APIs', 'backend', '{fullstack}'),
    (21, 'React', 'frontend', '{fullstack}'), (22, 'Next.js', 'frontend', '{fullstack}'), (23, 'TanStack Start', 'frontend', '{fullstack}'),
    (24, 'Tailwind CSS', 'frontend', '{fullstack}'), (25, 'HTML/CSS', 'frontend', '{fullstack}'), (26, 'Flutter', 'frontend', '{}'), (27, 'React Native', 'frontend', '{}'),
    (28, 'Machine Learning', 'ai_data', '{ai}'), (29, 'Deep Learning (CNN, RNN, BiLSTM)', 'ai_data', '{ai}'), (30, 'NLP', 'ai_data', '{ai}'),
    (31, 'Word Embeddings', 'ai_data', '{ai}'), (32, 'TensorFlow', 'ai_data', '{ai}'), (33, 'Keras', 'ai_data', '{ai}'), (34, 'scikit-learn', 'ai_data', '{ai}'),
    (35, 'Pandas', 'ai_data', '{ai}'), (36, 'NumPy', 'ai_data', '{ai}'), (37, 'OpenCV', 'ai_data', '{ai}'), (38, 'MediaPipe', 'ai_data', '{ai}'),
    (39, 'LLM APIs', 'ai_data', '{ai}'), (40, 'Prompt Engineering', 'ai_data', '{ai}'), (41, 'n8n', 'ai_data', '{ai}'),
    (42, 'PostgreSQL', 'databases', '{fullstack,cloud}'), (43, 'MySQL', 'databases', '{fullstack}'), (44, 'MongoDB', 'databases', '{fullstack}'),
    (45, 'Oracle DB', 'databases', '{}'), (46, 'Supabase', 'databases', '{fullstack,cloud}'),
    (47, 'Docker', 'devops_cloud', '{cloud}'), (48, 'Kubernetes', 'devops_cloud', '{cloud}'), (49, 'Git/GitHub', 'devops_cloud', '{cloud}'),
    (50, 'GitHub Actions (CI/CD)', 'devops_cloud', '{cloud}'), (51, 'OpenStack', 'devops_cloud', '{cloud}'), (52, 'Linux', 'devops_cloud', '{cloud}'),
    (53, 'Virtualization', 'devops_cloud', '{cloud}'), (54, 'Vercel', 'devops_cloud', '{fullstack,cloud}'),
    (55, 'DHCP', 'networking', '{cloud}'), (56, 'DDNS', 'networking', '{cloud}'), (57, 'Wireshark', 'networking', '{}'),
    (58, 'Agile / Scrum', 'methods', '{}'), (59, 'UML', 'methods', '{}'), (60, 'DDD', 'methods', '{fullstack}'), (61, 'Hexagonal architecture', 'methods', '{fullstack}');
  END IF;

  IF NOT EXISTS (SELECT 1 FROM public.cvs) THEN
    INSERT INTO public.cvs (sort_order, label_fr, label_en, language, tags, file_url, file_name) VALUES
    (1, 'CV 2027 (FR)', 'CV 2027 (FR)', 'fr', '{}', '/cv.pdf', 'Cv_Salma_Jaghoua_FR_2027.pdf'),
    (2, 'CV Développeuse Full-Stack (FR)', 'Full-Stack Developer CV (FR)', 'fr', '{fullstack}', '/cv_dev_SalmaJaghoua_fr_(1).pdf', 'cv_dev_SalmaJaghoua_fr.pdf');
  END IF;
END $$;
