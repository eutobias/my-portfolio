interface ProjectImages {
  src: string;
  alt: string;
};

export interface Project {
  name: string;
  description: string;
  images: ProjectImages[];
};

export const projects: Project[] = [
  {
    name: "Portfolio",
    description:
      "This portfolio website is built with Next.js and Tailwind CSS. It is hosted on Vercel and is fully responsive.",
    images: [
      {
        src: "https://fakeimg.pl/600x400/000000/ffffff",
        alt: "Portfolio 1",
      },
      {
        src: "https://fakeimg.pl/600x400/000000/ffffff",
        alt: "Portfolio 2",
      },
      {
        src: "https://fakeimg.pl/600x400/000000/ffffff",
        alt: "Portfolio 3",
      },
      {
        src: "https://fakeimg.pl/600x400/000000/ffffff",
        alt: "Portfolio 4",
      },
    ],
  },
  {
    name: "E-commerce",
    description:
      "This e-commerce website is built with Next.js and Tailwind CSS. It is hosted on Vercel and is fully responsive.",
    images: [
      {
        src: "https://fakeimg.pl/600x400/ffffff/000000",
        alt: "E-commerce 1",
      },
      {
        src: "https://fakeimg.pl/600x400/ffffff/000000",
        alt: "E-commerce 2",
      },
      {
        src: "https://fakeimg.pl/600x400/ffffff/000000",
        alt: "E-commerce 3",
      },
    ],
  },
];
