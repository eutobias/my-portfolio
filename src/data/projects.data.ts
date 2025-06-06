export interface ProjectImages {
  src: string;
  alt: string;
  thumb: string;
  kind?: "image" | "video";
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
    name: "Funk: Um Grito de Ousadia e Liberdade",
    slug: "funk-um-grito-de-ousadia-e-liberdade",
    description:
      "At the exhibition held by the Museu de Arte do Rio (Rio Art Museum), I developed an interactive feature where visitors could listen to a funk playlist directly tied to the show’s curation. The goal was to deepen the audience’s immersion through music, celebrating funk as a cultural, political, and artistic expression of the peripheries. The interactive element reinforced the exhibition’s narrative by connecting the themes explored in the artworks with the beats, lyrics, and voices that echo resistance, identity, and freedom.",
    frontend: ["React Native", "TypeScript", "Tailwind CSS"],
    images: [
      {
        src: "/images/funk-1.jpg",
        alt: "",
        thumb: "/images/funk-1.jpg",
      },
      {
        src: "/images/funk-2.jpg",
        alt: "",
        thumb: "/images/funk-2.jpg",
      },
      {
        src: "/images/funk-3.jpg",
        alt: "",
        thumb: "/images/funk-3.jpg",
      },
      {
        src: "/images/funk-4.jpg",
        alt: "",
        thumb: "/images/funk-4.jpg",
      },
      {
        src: "/images/funk-5.jpg",
        alt: "",
        thumb: "/images/funk-5.jpg",
      },
      {
        src: "/images/funk-6.jpg",
        alt: "",
        thumb: "/images/funk-6.jpg",
      },
    ],
  },
  {
    id: 2,
    name: "Analitica Pharmacy",
    slug: "analitica-pharmacy",
    description:
      "A modern and responsive institutional website for Analitica Pharmacy, focused on usability, clean design, and clear information for the public. The project was created to strengthen the pharmacy's digital presence, highlighting its services, promotions, and unique approach to pharmaceutical care.",
    frontend: ["React.js", "Next.js", "TypeScript", "Tailwind CSS"],
    backend: ["Node.js", "Express"],
    images: [
      {
        src: "/images/analitica.jpg",
        alt: "Analitica Pharmacy website home page",
        thumb: "/images/analitica_thumb.jpg",
      },
    ],
  },
  {
    id: 3,
    name: "Bica On Tap",
    slug: "bica-on-tap",
    description:
      "A vibrant and cool website made for people who enjoy drinks, craft beers, and exclusive cocktails. The project was designed to be visually impactful, with intuitive navigation and a fun touch.",
    frontend: ["HTML", "CSS", "JavaScript", "Pug Template Engine"],
    backend: ["Express"],
    images: [
      {
        src: "/images/bica1.jpg",
        alt: "",
        thumb: "/images/bica1_thumb.jpg",
      },
      {
        src: "/images/bica2.jpg",
        alt: "",
        thumb: "/images/bica2_thumb.jpg",
      },
      {
        src: "/images/bica3.jpg",
        alt: "",
        thumb: "/images/bica3_thumb.jpg",
      },
      {
        src: "/images/bica4.jpg",
        alt: "",
        thumb: "/images/bica4_thumb.jpg",
      },
      {
        src: "/images/bica5.jpg",
        alt: "",
        thumb: "/images/bica5_thumb.jpg",
      },
      {
        src: "/images/bica6.jpg",
        alt: "",
        thumb: "/images/bica6_thumb.jpg",
      },
    ],
  },
  {
    id: 4,
    name: "Portal do ProfHistória",
    slug: "portal-do-prof-historia",
    description:
      "Portal do ProfHistória is a digital archive of undergraduate theses in History from UFRJ (Federal University of Rio de Janeiro), featuring research on Brazil, culture, social movements, and historical theory. The project preserves and democratizes access to academic work, serving as a resource for students, researchers, and the public. Bridging past and present, it turns knowledge into collective heritage.",
    frontend: ["HTML", "CSS", "JavaScript", "Pug Template Engine"],
    images: [
      {
        src: "/images/profhistoria-1.jpg",
        alt: "",
        thumb: "/images/profhistoria-1_thumb.jpg",
      },
      {
        src: "/images/profhistoria-2.jpg",
        alt: "",
        thumb: "/images/profhistoria-2_thumb.jpg",
      },
      {
        src: "/images/profhistoria-3.jpg",
        alt: "",
        thumb: "/images/profhistoria-3_thumb.jpg",
      },
      {
        src: "/images/profhistoria-4.jpg",
        alt: "",
        thumb: "/images/profhistoria-4_thumb.jpg",
      },
      {
        src: "/images/profhistoria-5.jpg",
        alt: "",
        thumb: "/images/profhistoria-5_thumb.jpg",
      },
      {
        src: "/images/profhistoria-6.jpg",
        alt: "",
        thumb: "/images/profhistoria-6_thumb.jpg",
      },
      {
        src: "/images/profhistoria-7.jpg",
        alt: "",
        thumb: "/images/profhistoria-7_thumb.jpg",
      },
    ],
  },
  {
    id: 5,
    name: "Mariana Alves Portfolio",
    slug: "mariana-alves-portfolio",
    description:
      "Portfolio for the designer, focused on showcasing her work in an elegant and functional way. The design reflects her professional identity: clean, sophisticated, and user-centered, allowing visitors to explore her projects smoothly and easily connect with her work.",
    frontend: ["HTML", "CSS", "JavaScript", "Pug Template Engine"],
    images: [
      {
        src: "/images/portfolio_mari.jpg",
        alt: "Portfolio website home page",
        thumb: "/images/portfolio_mari_thumb.jpg",
      },
    ],
  },
  {
    id: 6,
    name: "Stone Institutional Website",
    slug: "stone-institutional-website",
    description:
      "Institutional website for Stone, a fintech operating in the digital payments sector in Brazil. The project combines technology, trust, and innovation in a fluid digital experience that simplifies financial complexity and highlights Stone's unique benefits.",
    frontend: ["HTML", "CSS", "JavaScript", "Pug Template Engine"],
    images: [
      {
        src: "/images/stone1.jpg",
        alt: "Home page of the Stone website",
        thumb: "/images/stone1_thumb.jpg",
      },
      {
        src: "/images/stone2.jpg",
        alt: "Solutions page",
        thumb: "/images/stone2_thumb.jpg",
      },
      {
        src: "/images/stone3.jpg",
        alt: "Education page",
        thumb: "/images/stone3_thumb.jpg",
      },
      {
        src: "/images/stone4.jpg",
        alt: "Careers page",
        thumb: "/images/stone4_thumb.jpg",
      },
    ],
  },
  {
    id: 7,
    name: "Item Management System - Arcotech",
    slug: "item-management-system-arcotech",
    description:
      "During my time as a collaborator at Arcotech, I worked on the integrated question bank management system to serve school networks with over 10,000 schools nationwide. This platform centralizes the creation, classification, and application of questions for assessments, optimizing the educational process from creation to results analysis.",
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
        thumb: "/images/gestora_de_itens_1_thumb.jpg",
      },
      {
        src: "/images/gestora_de_itens_2.jpg",
        alt: "",
        thumb: "/images/gestora_de_itens_2_thumb.jpg",
      },
      {
        src: "/images/gestora_de_itens_3.jpg",
        alt: "",
        thumb: "/images/gestora_de_itens_3_thumb.jpg",
      },
      {
        src: "/images/gestora_de_itens_4.jpg",
        alt: "",
        thumb: "/images/gestora_de_itens_4_thumb.jpg",
      },
      {
        src: "/images/gestora_de_itens_5.jpg",
        alt: "",
        thumb: "/images/gestora_de_itens_5_thumb.jpg",
      },
    ],
  },
  {
    id: 8,
    name: "Widgets and A/B Testing - Oi",
    slug: "widgets-ab-testing-oi",
    description:
      "During my time as a collaborator in the A/B Testing Squad at Oi, one of the largest telecommunications companies in Brazil, I was responsible for developing and implementing several strategic pages on the institutional website and sales funnels. My work focused on optimizing user experience, increasing conversions, and validating hypotheses through controlled experiments.",
    frontend: ["React.js", "Redux"],
    images: [
      {
        src: "/images/oi1.jpg",
        alt: "",
        thumb: "/images/oi1_thumb.jpg",
      },
      {
        src: "/images/oi2.jpg",
        alt: "",
        thumb: "/images/oi2_thumb.jpg",
      },
      {
        src: "/images/oi3.jpg",
        alt: "",
        thumb: "/images/oi3_thumb.jpg",
      },
      {
        src: "/images/oi4.jpg",
        alt: "",
        thumb: "/images/oi4_thumb.jpg",
      },
      {
        src: "/images/oi5.jpg",
        alt: "",
        thumb: "/images/oi5_thumb.jpg",
      },
      {
        src: "/images/oi6.jpg",
        alt: "",
        thumb: "/images/oi6_thumb.jpg",
      },
      {
        src: "/images/oi7.jpg",
        alt: "",
        thumb: "/images/oi7_thumb.jpg",
      },
      {
        src: "/images/oi8.jpg",
        alt: "",
        thumb: "/images/oi8_thumb.jpg",
      },
      {
        src: "/images/oi9.jpg",
        alt: "",
        thumb: "/images/oi9_thumb.jpg",
      },
      {
        src: "/images/oi10.jpg",
        alt: "",
        thumb: "/images/oi10_thumb.jpg",
      },
      {
        src: "/images/oi11.jpg",
        alt: "",
        thumb: "/images/oi11_thumb.jpg",
      },
      {
        src: "/images/oi12.jpg",
        alt: "",
        thumb: "/images/oi12_thumb.jpg",
      },
      {
        src: "/images/oi13.jpg",
        alt: "",
        thumb: "/images/oi13_thumb.jpg",
      },
    ],
  },
];
