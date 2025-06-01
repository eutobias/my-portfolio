import { IconProps } from "@/components/Icon";

export interface NavigationItem {
  label: string;
  icon: IconProps["icon"];
  href: string;
};

export const links: NavigationItem[] = [
  {
    label: "Home",
    icon: "home",
    href: "/",
  },
  {
    label: "Projects",
    icon: "folder",
    href: "/projects",
  },
  {
    label: "About",
    icon: "user",
    href: "/about",
  },
  {
    label: "Contact",
    icon: "mail",
    href: "/contact",
  },
];
