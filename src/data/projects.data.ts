interface ProjectImages {
  src: string;
  alt: string;
}

export interface Project {
  name: string;
  description: string;
  frontend?: string[];
  backend?: string[];
  order?: number;
  images: ProjectImages[];
}

export const projects: Project[] = [
  {
    name: "Farmácia Analitica",
    description:
      "Site institucional moderno e responsivo para a Farmácia Analitica, com foco em usabilidade, design clean e informações claras para o público. O projeto foi criado para fortalecer a presença digital da farmácia, destacando seus serviços, promoções e diferencial no atendimento farmacêutico.",
    frontend: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    backend: ["Node.js", "Express"],
    images: [
      {
        src: "./analitica.jpg",
        alt: "Home do site da farmacia analitica",
      },
    ],
  },
  {
    name: "Bica On Tap",
    description:
      "Um site vibrante e descolado feito para a galera que curte drinks, cervejas artesanais e drinks exclusivos. O projeto foi pensado para ser visualmente impactante, com navegação intuitiva e um toque de diversão.",
    frontend: ["HTML", "CSS", "JavaScript", "Pug Template Engine"],
    backend: ["Express"],
    images: [
      {
        src: "./bica-on-tap.jpg",
        alt: "Home do site Bica On Tap",
      },
    ],
  },
  {
    name: "Portfólio Mariana Alves",
    description:
      "Portfólio da designer, com foco em destacar seu trabalho de forma elegante e funcional. O design reflete sua identidade profissional: clean, sofisticado e centrado na experiência do usuário, permitindo que visitantes explorem seus projetos com fluidez e se conectem facilmente com seu trabalho.",
    frontend: ["HTML", "CSS", "JavaScript", "Pug Template Engine"],
    images: [
      {
        src: "./portfolio_mari.jpg",
        alt: "Home do site do portfólio",
      },
    ],
  },
  {
    name: "Stone",
    description:
      "Site institucional da Stone, fintech que atua no ramo de pagamentos digitais no Brasil. O projeto combina tecnologia, confiança e inovação em uma experiência digital fluida, que simplifica a complexidade financeira e destaca os benefícios exclusivos da Stone.",
    frontend: ["HTML", "CSS", "JavaScript", "Pug Template Engine"],
    images: [
      {
        src: "./stone1.jpg",
        alt: "Home do site",
      },
      {
        src: "./stone2.jpg",
        alt: "Página soluções",
      },
      {
        src: "./stone3.jpg",
        alt: "HPágina educação",
      },
      {
        src: "./stone4.jpg",
        alt: "Página carreiras",
      },
    ],
  },
  {
    name: "Gestora de Itens - Arcotech",
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
        src: "./gestora_de_itens_1.jpg",
        alt: "",
      },
      {
        src: "./gestora_de_itens_2.jpg",
        alt: "",
      },
      {
        src: "./gestora_de_itens_3.jpg",
        alt: "",
      },
      {
        src: "./gestora_de_itens_4.jpg",
        alt: "",
      },
      {
        src: "./gestora_de_itens_5.jpg",
        alt: "",
      },
    ],
  },
  {
    name: "Oi",
    description:
      "Durante meu período como colaborador no Squad de Testes A/B da Oi, uma das maiores empresas de telecomunicações do Brasil, fui responsável pelo desenvolvimento e implementação de diversas telas estratégicas no site institucional e funis de vendas. Meu trabalho focou em otimizar a experiência do usuário, aumentar conversões e validar hipóteses por meio de experimentos controlados.",
    frontend: ["React.js", "Redux"],
    images: [
      {
        src: "./oi1.jpg",
        alt: "",
      },
      {
        src: "./oi2.jpg",
        alt: "",
      },
      {
        src: "./oi3.jpg",
        alt: "",
      },
      {
        src: "./oi4.jpg",
        alt: "",
      },
      {
        src: "./oi5.jpg",
        alt: "",
      },
      {
        src: "./oi6.jpg",
        alt: "",
      },
      {
        src: "./oi7.jpg",
        alt: "",
      },
      {
        src: "./oi8.jpg",
        alt: "",
      },
      {
        src: "./oi9.jpg",
        alt: "",
      },
      {
        src: "./oi10.jpg",
        alt: "",
      },
      {
        src: "./oi11.jpg",
        alt: "",
      },
      {
        src: "./oi12.jpg",
        alt: "",
      },
      {
        src: "./oi13.jpg",
        alt: "",
      },
    ],
  },
];
