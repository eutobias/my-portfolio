import { IconProps } from "@/components/Icon";
import { Menu } from "@/components/Menu";

type NavigationProps = {};

type MenuLinksItemType = {
  label: string;
  icon: IconProps["icon"];
  href: string;
};

export const Navigation = ({}: NavigationProps) => {
  const links: MenuLinksItemType[] = [
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

  return (
    <Menu>
      {links.map((link, index) => (
        <Menu.Item
          href={link.href}
          key={index}
          label={link.label}
          icon={link.icon}
        />
      ))}
    </Menu>
  );
};
