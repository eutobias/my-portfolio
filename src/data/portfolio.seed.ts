/**
 * Seed content for the public portfolio, adapted from the legacy `__data/*`
 * modules. Used by `db.server.ts` the first time an empty database is opened.
 *
 * Localized fields use `{ pt, en }` objects; language-independent fields stay
 * plain strings. List fields use `{ pt: string[], en: string[] }`.
 */

export type Localized = { pt: string; en: string };
export type LocalizedList = { pt: string[]; en: string[] };

export type SeedNavLink = {
  label: Localized;
  href: string;
  icon: string;
  section: "main" | "footer";
  order: number;
};

export type SeedExperience = {
  title: Localized;
  company: Localized;
  period: string;
  bullets: Localized;
  icon: string;
  order: number;
};

export type SeedSkill = {
  title: Localized;
  content: Localized;
  icon: string;
  order: number;
};

export type SeedProject = {
  name: Localized;
  slug: Localized;
  category: Localized;
  subtitle: Localized;
  description: Localized;
  frontend: LocalizedList;
  backend: LocalizedList;
  role: Localized;
  teamSize: Localized;
  client: Localized;
  year: string;
  highlights: LocalizedList;
  challenges: LocalizedList;
  results: LocalizedList;
  url: string;
  repo: string;
  cover: string;
  gallery: string;
  order: number;
};

const lines = (value: string): string[] =>
  value
    .split("\n")
    .map((entry) => entry.trim())
    .filter(Boolean);

export const mainNav: SeedNavLink[] = [
  { label: { pt: "Home", en: "Home" }, href: "/", icon: "home", section: "main", order: 0 },
  { label: { pt: "Projetos", en: "Projects" }, href: "/projects", icon: "folder", section: "main", order: 1 },
  { label: { pt: "Sobre Mim", en: "About Me" }, href: "/about", icon: "user", section: "main", order: 2 },
  { label: { pt: "Contato", en: "Contact" }, href: "/contact", icon: "mail", section: "main", order: 3 },
];

export const footerNav: SeedNavLink[] = [
  { label: { pt: "GitHub", en: "GitHub" }, href: "https://github.com/eutobias", icon: "github", section: "footer", order: 0 },
  { label: { pt: "LinkedIn", en: "LinkedIn" }, href: "https://linkedin.com/in/eutobias", icon: "linkedin", section: "footer", order: 1 },
  { label: { pt: "Instagram", en: "Instagram" }, href: "https://instagram.com/eutobias", icon: "instagram", section: "footer", order: 2 },
];

/** Navigation singleton values (header/footer). */
export const navigationSeed = {
  siteName: { pt: "eutobias.dev", en: "eutobias.dev" },
  ownerName: { pt: "Tobias Taurian", en: "Tobias Taurian" },
  tagline: {
    pt: "Senior Full-Stack Developer • 18+ Anos de Experiência",
    en: "Senior Full-Stack Developer • 18+ Years of Experience",
  },
  email: "me@eutobias.dev",
};

export const experiences: SeedExperience[] = [
  {
    title: { pt: "Senior Front-end Engineer", en: "Senior Front-end Engineer" },
    company: { pt: "Arcotech", en: "Arcotech" },
    period: "09/2023 - 04/2025",
    bullets: {
      pt: "Desenvolvi e arquitetei microfrontends altamente escaláveis usando React, Next.js e TypeScript.\nOtimizei pipelines de CI/CD para deploys mais rápidos e seguros.\nLiderei o desenvolvimento de um sistema de gerenciamento de questões usado por mais de 10.000 instituições educacionais.",
      en: "Developed and architected highly scalable microfrontends using React, Next.js and TypeScript.\nOptimized CI/CD pipelines for faster and safer deploys.\nLed the development of a question management system used by more than 10,000 educational institutions.",
    },
    icon: "file-code-2",
    order: 0,
  },
  {
    title: { pt: "Senior Front-end Engineer", en: "Senior Front-end Engineer" },
    company: { pt: "Invillia (Oz.Inc)", en: "Invillia (Oz.Inc)" },
    period: "01/2023 - 06/2023",
    bullets: {
      pt: "Construção de interfaces de alto desempenho com React, Redux e TypeScript.\nIntegração de APIs financeiras e tecnologias de Blockchain no frontend.",
      en: "Built high-performance interfaces with React, Redux and TypeScript.\nIntegrated financial APIs and Blockchain technologies into the frontend.",
    },
    icon: "file-code-2",
    order: 1,
  },
  {
    title: { pt: "Tech Lead", en: "Tech Lead" },
    company: { pt: "Original.io", en: "Original.io" },
    period: "02/2021 - 06/2022",
    bullets: {
      pt: "Liderei e mentorei uma equipe multidisciplinar de 15 desenvolvedores no desenvolvimento e otimização de e-commerces na VTEX (VTEX Legacy e VTEX.io).\nComandei a migração técnica da plataforma de e-commerce da Reserva do Oracle Commerce Cloud para a VTEX.",
      en: "Led and mentored a multidisciplinary team of 15 developers building and optimizing e-commerces on VTEX (VTEX Legacy and VTEX.io).\nLed the technical migration of Reserva's e-commerce platform from Oracle Commerce Cloud to VTEX.",
    },
    icon: "computer",
    order: 2,
  },
  {
    title: { pt: "Senior Full-stack Developer", en: "Senior Full-stack Developer" },
    company: { pt: "Reserva", en: "Reserva" },
    period: "05/2018 - 02/2021",
    bullets: {
      pt: "Integrei a Oracle Commerce Cloud com frontends customizados usando React, Vue e KnockoutJS.\nDesenvolvi e mantive microsserviços e APIs de alto tráfego com Node.js, C# e Go.\nConstruí uma plataforma interna de recomendação de produtos que impulsionou as vendas significativamente.",
      en: "Integrated Oracle Commerce Cloud with custom frontends using React, Vue and KnockoutJS.\nDeveloped and maintained high-traffic microservices and APIs with Node.js, C# and Go.\nBuilt an internal product recommendation platform that significantly boosted sales.",
    },
    icon: "file-terminal",
    order: 3,
  },
  {
    title: { pt: "Senior Front-end Developer", en: "Senior Front-end Developer" },
    company: { pt: "VML (Oi Telecom)", en: "VML (Oi Telecom)" },
    period: "03/2017 - 04/2018",
    bullets: {
      pt: "Desenvolvi páginas de produtos e widgets dinâmicos utilizando React e Redux.\nIntegrei a equipe de Growth e testes A/B, validando hipóteses que geraram aumento consistente de receita.",
      en: "Developed product pages and dynamic widgets using React and Redux.\nJoined the Growth and A/B testing team, validating hypotheses that generated consistent revenue growth.",
    },
    icon: "file-terminal",
    order: 4,
  },
  {
    title: {
      pt: "Junior a Senior Full-stack Developer",
      en: "Junior to Senior Full-stack Developer",
    },
    company: { pt: "32Bits", en: "32Bits" },
    period: "12/2007 - 09/2016",
    bullets: {
      pt: "Criei aplicações interativas inovadoras para museus e exposições (projeção mapeada, detecção de movimento).\nDesenvolvi dezenas de sites institucionais utilizando HTML, CSS, PHP e JavaScript.\nGerenciei equipes técnicas durante a montagem física e de software das exposições.",
      en: "Created innovative interactive applications for museums and exhibitions (projection mapping, motion detection).\nDeveloped dozens of institutional websites using HTML, CSS, PHP and JavaScript.\nManaged technical teams during the physical and software assembly of exhibitions.",
    },
    icon: "file-code-2",
    order: 5,
  },
];

export const skills: SeedSkill[] = [
  {
    title: { pt: "Linguagens", en: "Languages" },
    content: {
      pt: "HTML, CSS, JavaScript, TypeScript, Go, Python, PHP, SQL",
      en: "HTML, CSS, JavaScript, TypeScript, Go, Python, PHP, SQL",
    },
    icon: "binary",
    order: 0,
  },
  {
    title: { pt: "Front-end", en: "Front-end" },
    content: {
      pt: "React, React Native, Next.js, Vue, Angular, TanStack Query, Redux, Zustand, SASS, Tailwind CSS, GraphQL",
      en: "React, React Native, Next.js, Vue, Angular, TanStack Query, Redux, Zustand, SASS, Tailwind CSS, GraphQL",
    },
    icon: "code",
    order: 1,
  },
  {
    title: { pt: "Back-end", en: "Back-end" },
    content: {
      pt: "Node.js, Express, NestJS, Fastify, Laravel, Flask",
      en: "Node.js, Express, NestJS, Fastify, Laravel, Flask",
    },
    icon: "braces",
    order: 2,
  },
  {
    title: { pt: "Bancos de Dados", en: "Databases" },
    content: {
      pt: "MongoDB, PostgreSQL, MySQL, MariaDB, Redis, DynamoDB",
      en: "MongoDB, PostgreSQL, MySQL, MariaDB, Redis, DynamoDB",
    },
    icon: "database",
    order: 3,
  },
  {
    title: { pt: "Ferramentas & Arquitetura", en: "Tools & Architecture" },
    content: {
      pt: "Git, CI/CD, Docker, Kubernetes, AWS, Figma, Microsserviços, Microfrontends",
      en: "Git, CI/CD, Docker, Kubernetes, AWS, Figma, Microservices, Microfrontends",
    },
    icon: "wrench",
    order: 4,
  },
];

const gallery = (files: string[]) =>
  files.map((file) => `/images/${file}`).join("\n");

export const projects: SeedProject[] = [
  {
    name: {
      pt: "Funk: Um Grito de Ousadia e Liberdade",
      en: "Funk: A Cry of Boldness and Freedom",
    },
    slug: {
      pt: "funk-um-grito-de-ousadia-e-liberdade",
      en: "funk-a-cry-of-boldness-and-freedom",
    },
    category: { pt: "Exposição Interativa", en: "Interactive Exhibition" },
    subtitle: {
      pt: "Experiência interativa inovadora para o Museu de Arte do Rio",
      en: "An innovative interactive experience for the Museum of Art of Rio",
    },
    description: {
      pt: "Na exposição realizada pelo Museu de Arte do Rio (MAR), desenvolvi uma instalação interativa com sensores de movimento, mapeamento de projeção de vídeo e sistemas de áudio em tempo real. Visitantes ouviam uma playlist de funk ligada diretamente à curadoria, aprofundando a imersão e celebrando o funk como expressão cultural, política e artística das periferias.",
      en: "In the exhibition held by the Museum of Art of Rio (MAR), I built an interactive installation with motion sensors, video projection mapping and real-time audio systems. Visitors heard a funk playlist tied directly to the curatorship, deepening the immersion and celebrating funk as a cultural, political and artistic expression of the peripheries.",
    },
    frontend: { pt: ["React Native", "TypeScript", "Tailwind CSS"], en: ["React Native", "TypeScript", "Tailwind CSS"] },
    backend: { pt: ["Node.js"], en: ["Node.js"] },
    role: { pt: "Full-Stack Developer", en: "Full-Stack Developer" },
    teamSize: { pt: "Solo Project", en: "Solo Project" },
    client: { pt: "Museu de Arte do Rio", en: "Museum of Art of Rio" },
    year: "2023 - 2023",
    highlights: {
      pt: lines(
        "Experiência interativa com playlist de funk\nIntegração com narrativa da exposição\nCelebração da cultura funk das periferias\nConexão entre arte visual e música",
      ),
      en: lines(
        "Interactive experience with a funk playlist\nIntegration with the exhibition narrative\nCelebration of funk culture from the peripheries\nConnection between visual art and music",
      ),
    },
    challenges: {
      pt: lines(
        "Criar uma experiência intuitiva para visitantes\nIntegrar música com a narrativa visual\nGarantir acessibilidade para todos os públicos",
      ),
      en: lines(
        "Create an intuitive experience for visitors\nIntegrate music with the visual narrative\nEnsure accessibility for all audiences",
      ),
    },
    results: {
      pt: lines(
        "Experiência imersiva bem-sucedida\nVisitantes engajados com a playlist\nReforço da mensagem cultural da exposição",
      ),
      en: lines(
        "Successful immersive experience\nVisitors engaged with the playlist\nReinforced the exhibition's cultural message",
      ),
    },
    url: "",
    repo: "",
    cover: "/images/funk-1.jpg",
    gallery: gallery(["funk-2.jpg", "funk-3.jpg", "funk-4.jpg", "funk-5.jpg", "funk-6.jpg"]),
    order: 0,
  },
  {
    name: { pt: "Analitica Pharmacy", en: "Analitica Pharmacy" },
    slug: { pt: "analitica-pharmacy", en: "analitica-pharmacy" },
    category: { pt: "Web & E-commerce", en: "Web & E-commerce" },
    subtitle: {
      pt: "Site institucional para a Analitica Pharmacy",
      en: "Institutional website for Analitica Pharmacy",
    },
    description: {
      pt: "Um site institucional moderno e responsivo para a Analitica Pharmacy, focado em usabilidade extrema, carregamento rápido e uma interface de usuário perfeitamente limpa.",
      en: "A modern, responsive institutional website for Analitica Pharmacy, focused on extreme usability, fast loading and a perfectly clean user interface.",
    },
    frontend: { pt: ["React", "Next.js", "Tailwind CSS", "TypeScript"], en: ["React", "Next.js", "Tailwind CSS", "TypeScript"] },
    backend: { pt: ["Node.js", "Express"], en: ["Node.js", "Express"] },
    role: { pt: "Full-Stack Developer", en: "Full-Stack Developer" },
    teamSize: { pt: "Solo Project", en: "Solo Project" },
    client: { pt: "Analitica Pharmacy", en: "Analitica Pharmacy" },
    year: "2022 - 2022",
    highlights: {
      pt: lines("Interface limpa e responsiva\nCarregamento rápido\nCatálogo de serviços e promoções"),
      en: lines("Clean and responsive interface\nFast loading\nServices and promotions catalog"),
    },
    challenges: {
      pt: lines("Equilibrar identidade visual e usabilidade\nGarantir boa performance em mobile"),
      en: lines("Balance visual identity and usability\nEnsure good mobile performance"),
    },
    results: {
      pt: lines("Presença digital reforçada\nMelhor experiência para o público"),
      en: lines("Strengthened digital presence\nBetter experience for the audience"),
    },
    url: "",
    repo: "",
    cover: "/images/analitica.jpg",
    gallery: "",
    order: 1,
  },
  {
    name: { pt: "Bica On Tap", en: "Bica On Tap" },
    slug: { pt: "bica-on-tap", en: "bica-on-tap" },
    category: { pt: "Vibrant Web", en: "Vibrant Web" },
    subtitle: {
      pt: "Site dinâmico para cervejas artesanais e coquetéis",
      en: "Dynamic website for craft beers and cocktails",
    },
    description: {
      pt: "Um site vibrante e super dinâmico criado para entusiastas de cervejas artesanais, drinks refinados e coquetéis exclusivos.",
      en: "A vibrant and highly dynamic website created for enthusiasts of craft beers, refined drinks and exclusive cocktails.",
    },
    frontend: { pt: ["React", "Vite", "Framer Motion", "Tailwind CSS"], en: ["React", "Vite", "Framer Motion", "Tailwind CSS"] },
    backend: { pt: ["Express"], en: ["Express"] },
    role: { pt: "Full-Stack Developer", en: "Full-Stack Developer" },
    teamSize: { pt: "Solo Project", en: "Solo Project" },
    client: { pt: "Bica On Tap", en: "Bica On Tap" },
    year: "2021 - 2021",
    highlights: {
      pt: lines("Layout visualmente impactante\nNavegação intuitiva\nAnimações fluidas"),
      en: lines("Visually striking layout\nIntuitive navigation\nSmooth animations"),
    },
    challenges: {
      pt: lines("Criar identidade visual forte\nManter performance com animações"),
      en: lines("Create a strong visual identity\nKeep performance with animations"),
    },
    results: {
      pt: lines("Marca com personalidade na web\nBoa recepção do público"),
      en: lines("Brand with personality on the web\nPositive audience reception"),
    },
    url: "",
    repo: "",
    cover: "/images/bica1.jpg",
    gallery: gallery(["bica2.jpg", "bica3.jpg", "bica4.jpg", "bica5.jpg", "bica6.jpg"]),
    order: 2,
  },
  {
    name: { pt: "Portal do ProfHistória", en: "ProfHistória Portal" },
    slug: { pt: "portal-do-prof-historia", en: "profhistoria-portal" },
    category: { pt: "Plataforma Educacional", en: "Educational Platform" },
    subtitle: {
      pt: "Arquivo digital de dissertações de História da UFRJ",
      en: "Digital archive of History dissertations from UFRJ",
    },
    description: {
      pt: "O Portal do ProfHistória é um arquivo digital de teses de graduação em História da UFRJ, servindo como hub acadêmico de pesquisa sobre Brasil, cultura e movimentos sociais.",
      en: "The ProfHistória Portal is a digital archive of undergraduate History theses from UFRJ, serving as an academic research hub on Brazil, culture and social movements.",
    },
    frontend: { pt: ["PHP", "Laravel", "MySQL", "Bootstrap"], en: ["PHP", "Laravel", "MySQL", "Bootstrap"] },
    backend: { pt: ["PHP"], en: ["PHP"] },
    role: { pt: "Full-Stack Developer", en: "Full-Stack Developer" },
    teamSize: { pt: "Equipe de 3", en: "Team of 3" },
    client: { pt: "UFRJ", en: "UFRJ" },
    year: "2016 - 2016",
    highlights: {
      pt: lines("Acervo acadêmico pesquisável\nPreservação e democratização do acesso\nInterface institucional"),
      en: lines("Searchable academic collection\nPreservation and democratization of access\nInstitutional interface"),
    },
    challenges: {
      pt: lines("Organizar grande volume de conteúdo\nTornar a busca simples para pesquisadores"),
      en: lines("Organize a large volume of content\nMake search simple for researchers"),
    },
    results: {
      pt: lines("Acesso ampliado à produção acadêmica\nBase de pesquisa para estudantes"),
      en: lines("Expanded access to academic output\nResearch base for students"),
    },
    url: "",
    repo: "",
    cover: "/images/profhistoria-1.jpg",
    gallery: gallery([
      "profhistoria-2.jpg",
      "profhistoria-3.jpg",
      "profhistoria-4.jpg",
      "profhistoria-5.jpg",
      "profhistoria-6.jpg",
      "profhistoria-7.jpg",
    ]),
    order: 3,
  },
  {
    name: { pt: "Mariana Alves Portfolio", en: "Mariana Alves Portfolio" },
    slug: { pt: "mariana-alves-portfolio", en: "mariana-alves-portfolio" },
    category: { pt: "Design Portfolio", en: "Design Portfolio" },
    subtitle: {
      pt: "Portfólio interativo para a designer Mariana Alves",
      en: "Interactive portfolio for designer Mariana Alves",
    },
    description: {
      pt: "Portfólio para a designer Mariana Alves, focado em expor seus trabalhos de forma elegante, altamente interativa e funcional.",
      en: "A portfolio for designer Mariana Alves, focused on showcasing her work in an elegant, highly interactive and functional way.",
    },
    frontend: { pt: ["React", "Gatsby", "GraphQL", "Tailwind CSS", "Framer Motion"], en: ["React", "Gatsby", "GraphQL", "Tailwind CSS", "Framer Motion"] },
    backend: { pt: [], en: [] },
    role: { pt: "Front-end Developer", en: "Front-end Developer" },
    teamSize: { pt: "Solo Project", en: "Solo Project" },
    client: { pt: "Mariana Alves", en: "Mariana Alves" },
    year: "2020 - 2020",
    highlights: {
      pt: lines("Experiência fluida de navegação\nTransições entre projetos\nVitrine visual do trabalho"),
      en: lines("Fluid navigation experience\nTransitions between projects\nVisual showcase of the work"),
    },
    challenges: {
      pt: lines("Equilibrar elegância e performance\nDestacar o trabalho sem competir com ele"),
      en: lines("Balance elegance and performance\nHighlight the work without competing with it"),
    },
    results: {
      pt: lines("Portfólio sofisticado\nMelhor apresentação profissional"),
      en: lines("Sophisticated portfolio\nBetter professional presentation"),
    },
    url: "",
    repo: "",
    cover: "/images/portfolio_mari.jpg",
    gallery: "",
    order: 4,
  },
  {
    name: { pt: "Stone Institutional Website", en: "Stone Institutional Website" },
    slug: { pt: "stone-institutional-website", en: "stone-institutional-website" },
    category: { pt: "Fintech Website", en: "Fintech Website" },
    subtitle: { pt: "Site institucional para a Stone", en: "Institutional website for Stone" },
    description: {
      pt: "Desenvolvimento e otimização do site institucional da Stone, uma das maiores fintechs de pagamentos digitais do Brasil, garantindo acessibilidade e SEO impecável.",
      en: "Development and optimization of Stone's institutional website, one of the largest digital payments fintechs in Brazil, ensuring accessibility and flawless SEO.",
    },
    frontend: { pt: ["React", "Next.js", "TypeScript", "SASS", "SEO Optimization"], en: ["React", "Next.js", "TypeScript", "SASS", "SEO Optimization"] },
    backend: { pt: [], en: [] },
    role: { pt: "Front-end Developer", en: "Front-end Developer" },
    teamSize: { pt: "Equipe de 6", en: "Team of 6" },
    client: { pt: "Stone", en: "Stone" },
    year: "2019 - 2020",
    highlights: {
      pt: lines("Componentes reutilizáveis de página\nFoco em acessibilidade\nSEO técnico"),
      en: lines("Reusable page components\nFocus on accessibility\nTechnical SEO"),
    },
    challenges: {
      pt: lines("Manter consistência visual em escala\nEquilibrar marketing e performance"),
      en: lines("Maintain visual consistency at scale\nBalance marketing and performance"),
    },
    results: {
      pt: lines("Site institucional otimizado\nMelhor indexação e acessibilidade"),
      en: lines("Optimized institutional website\nBetter indexing and accessibility"),
    },
    url: "",
    repo: "",
    cover: "/images/stone1.jpg",
    gallery: gallery(["stone2.jpg", "stone3.jpg", "stone4.jpg"]),
    order: 5,
  },
  {
    name: { pt: "Item Management System - Arcotech", en: "Item Management System - Arcotech" },
    slug: { pt: "item-management-system-arcotech", en: "item-management-system-arcotech" },
    category: { pt: "SaaS Corporativo", en: "Corporate SaaS" },
    subtitle: {
      pt: "Sistema de banco de questões para redes de ensino",
      en: "Question bank system for education networks",
    },
    description: {
      pt: "Durante meu período na Arcotech, atuei no desenvolvimento de um sistema de banco de questões integrado usado por mais de 10.000 instituições de ensino no Brasil. A plataforma centraliza criação, classificação e aplicação de questões para avaliações, otimizando o processo educacional da criação à análise de resultados.",
      en: "During my time at Arcotech, I worked on an integrated question bank system used by more than 10,000 educational institutions in Brazil. The platform centralizes the creation, classification and application of questions for assessments, streamlining the educational process from creation to results analysis.",
    },
    frontend: { pt: ["React", "TypeScript", "NestJS", "PostgreSQL", "Docker"], en: ["React", "TypeScript", "NestJS", "PostgreSQL", "Docker"] },
    backend: { pt: ["NestJS", "PostgreSQL"], en: ["NestJS", "PostgreSQL"] },
    role: { pt: "Senior Front-end Engineer", en: "Senior Front-end Engineer" },
    teamSize: { pt: "Equipe de 10", en: "Team of 10" },
    client: { pt: "Arcotech", en: "Arcotech" },
    year: "2023 - 2025",
    highlights: {
      pt: lines("Microfrontends escaláveis\nGestão completa de questões\nAnálise de resultados"),
      en: lines("Scalable microfrontends\nFull question management\nResults analysis"),
    },
    challenges: {
      pt: lines("Atender milhares de instituições\nManter consistência entre times"),
      en: lines("Serve thousands of institutions\nMaintain consistency across teams"),
    },
    results: {
      pt: lines("Adoção por 10.000+ instituições\nProcesso educacional otimizado"),
      en: lines("Adopted by 10,000+ institutions\nStreamlined educational process"),
    },
    url: "",
    repo: "",
    cover: "/images/gestora_de_itens_1.jpg",
    gallery: gallery([
      "gestora_de_itens_2.jpg",
      "gestora_de_itens_3.jpg",
      "gestora_de_itens_4.jpg",
      "gestora_de_itens_5.jpg",
    ]),
    order: 6,
  },
  {
    name: { pt: "Widgets and A/B Testing - Oi", en: "Widgets and A/B Testing - Oi" },
    slug: { pt: "widgets-ab-testing-oi", en: "widgets-and-ab-testing-oi" },
    category: { pt: "Telecom & Growth", en: "Telecom & Growth" },
    subtitle: { pt: "Widgets e testes A/B para a Oi", en: "Widgets and A/B tests for Oi" },
    description: {
      pt: "Trabalhando no Squad de Testes A/B da Oi Telecom, implementei e validei dezenas de hipóteses e novos widgets de conversão que aumentaram consistentemente a receita do e-commerce.",
      en: "Working in Oi Telecom's A/B Testing Squad, I implemented and validated dozens of hypotheses and new conversion widgets that consistently increased e-commerce revenue.",
    },
    frontend: { pt: ["Vanilla JS", "React", "Redux", "A/B Testing Tools", "Analytics"], en: ["Vanilla JS", "React", "Redux", "A/B Testing Tools", "Analytics"] },
    backend: { pt: [], en: [] },
    role: { pt: "Senior Front-end Developer", en: "Senior Front-end Developer" },
    teamSize: { pt: "Equipe de 5", en: "Team of 5" },
    client: { pt: "Oi Telecom", en: "Oi Telecom" },
    year: "2017 - 2018",
    highlights: {
      pt: lines("Páginas de produto e funis de venda\nTestes A/B contínuos\nIntegração com analytics"),
      en: lines("Product pages and sales funnels\nContinuous A/B testing\nAnalytics integration"),
    },
    challenges: {
      pt: lines("Validar hipóteses com dados confiáveis\nManter performance das páginas"),
      en: lines("Validate hypotheses with reliable data\nKeep page performance"),
    },
    results: {
      pt: lines("Aumento consistente de receita\nExperiências de compra otimizadas"),
      en: lines("Consistent revenue growth\nOptimized purchase experiences"),
    },
    url: "",
    repo: "",
    cover: "/images/oi1.jpg",
    gallery: gallery([
      "oi2.jpg",
      "oi3.jpg",
      "oi4.jpg",
      "oi5.jpg",
      "oi6.jpg",
      "oi7.jpg",
      "oi8.jpg",
      "oi9.jpg",
      "oi10.jpg",
      "oi11.jpg",
      "oi12.jpg",
      "oi13.jpg",
    ]),
    order: 7,
  },
];
