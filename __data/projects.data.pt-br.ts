interface ProjectImages {
  src: string;
  alt: string;
}

export interface Project {
  id: number;
  name: string;
  slug: string;
  description: string;
  frontend?: string[];
  backend?: string[];
  order?: number;
  images: ProjectImages[];
}

export const projects: Project[] = [
  {
    id: 1,
    name: "Farmácia Analitica",
    slug: "farmacia-analitica",
    description:
      "Site institucional moderno e responsivo para a Farmácia Analitica, com foco em usabilidade, design clean e informações claras para o público. O projeto foi criado para fortalecer a presença digital da farmácia, destacando seus serviços, promoções e diferencial no atendimento farmacêutico.",
    frontend: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    backend: ["Node.js", "Express"],
    images: [
      {
        src: "/images/analitica.jpg",
        alt: "Home do site da farmacia analitica",
      },
    ],
  },
  {
    id: 2,
    name: "Bica On Tap",
    slug: "bica-on-tap",
    description:
      "Um site vibrante e descolado feito para a galera que curte drinks, cervejas artesanais e drinks exclusivos. O projeto foi pensado para ser visualmente impactante, com navegação intuitiva e um toque de diversão.",
    frontend: ["HTML", "CSS", "JavaScript", "Pug Template Engine"],
    backend: ["Express"],
    images: [
      {
        src: "/images/bica1.jpg",
        alt: "",
      },
      {
        src: "/images/bica2.jpg",
        alt: "",
      },
      {
        src: "/images/bica3.jpg",
        alt: "",
      },
      {
        src: "/images/bica4.jpg",
        alt: "",
      },
      {
        src: "/images/bica5.jpg",
        alt: "",
      },
      {
        src: "/images/bica6.jpg",
        alt: "",
      },
    ],
  },
  {
    id: 3,
    name: "Portfólio Mariana Alves",
    slug: "portfolio-mariana-alves",
    description:
      "Portfólio da designer, com foco em destacar seu trabalho de forma elegante e funcional. O design reflete sua identidade profissional: clean, sofisticado e centrado na experiência do usuário, permitindo que visitantes explorem seus projetos com fluidez e se conectem facilmente com seu trabalho.",
    frontend: ["HTML", "CSS", "JavaScript", "Pug Template Engine"],
    images: [
      {
        src: "/images/portfolio_mari.jpg",
        alt: "Home do site do portfólio",
      },
    ],
  },
  {
    id: 4,
    name: "Site institucional - Stone",
    slug: "site-institucional-stone",
    description:
      "Site institucional da Stone, fintech que atua no ramo de pagamentos digitais no Brasil. O projeto combina tecnologia, confiança e inovação em uma experiência digital fluida, que simplifica a complexidade financeira e destaca os benefícios exclusivos da Stone.",
    frontend: ["HTML", "CSS", "JavaScript", "Pug Template Engine"],
    images: [
      {
        src: "/images/stone1.jpg",
        alt: "Home do site",
      },
      {
        src: "/images/stone2.jpg",
        alt: "Página soluções",
      },
      {
        src: "/images/stone3.jpg",
        alt: "HPágina educação",
      },
      {
        src: "/images/stone4.jpg",
        alt: "Página carreiras",
      },
    ],
  },
  {
    id: 5,
    name: "Gestora de Itens - Arcotech",
    slug: "gestora-de-itens-arcotech",
    description:
      "Durante o período que fui coladorador na Arcotech, atuei no sistema integrado de gestão de bancos de questões para atender redes de ensino com mais de 10 mil escolas em território nacional. Esta plataforma centraliza a criação, classificação e aplicação de questões para avaliações, otimizando o processo educacional desde a elaboração até a análise de resultados.",
    frontend: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Zustand",
      "Chakra UI",
      "Microfrontends",
    ],
    backend: ["Node.js", "Nest.js"],
    images: [
      {
        src: "/images/gestora_de_itens_1.jpg",
        alt: "",
      },
      {
        src: "/images/gestora_de_itens_2.jpg",
        alt: "",
      },
      {
        src: "/images/gestora_de_itens_3.jpg",
        alt: "",
      },
      {
        src: "/images/gestora_de_itens_4.jpg",
        alt: "",
      },
      {
        src: "/images/gestora_de_itens_5.jpg",
        alt: "",
      },
    ],
  },
  {
    id: 6,
    name: "Widgets e Testes A/B - Oi",
    slug: "widgets-e-testes-ab-oi",
    description:
      "Durante meu período como colaborador no Squad de Testes A/B da Oi, uma das maiores empresas de telecomunicações do Brasil, fui responsável pelo desenvolvimento e implementação de diversas telas estratégicas no site institucional e funis de vendas. Meu trabalho focou em otimizar a experiência do usuário, aumentar conversões e validar hipóteses por meio de experimentos controlados.",
    frontend: ["React.js", "Redux"],
    images: [
      {
        src: "/images/oi1.jpg",
        alt: "",
      },
      {
        src: "/images/oi2.jpg",
        alt: "",
      },
      {
        src: "/images/oi3.jpg",
        alt: "",
      },
      {
        src: "/images/oi4.jpg",
        alt: "",
      },
      {
        src: "/images/oi5.jpg",
        alt: "",
      },
      {
        src: "/images/oi6.jpg",
        alt: "",
      },
      {
        src: "/images/oi7.jpg",
        alt: "",
      },
      {
        src: "/images/oi8.jpg",
        alt: "",
      },
      {
        src: "/images/oi9.jpg",
        alt: "",
      },
      {
        src: "/images/oi10.jpg",
        alt: "",
      },
      {
        src: "/images/oi11.jpg",
        alt: "",
      },
      {
        src: "/images/oi12.jpg",
        alt: "",
      },
      {
        src: "/images/oi13.jpg",
        alt: "",
      },
    ],
  },
];
