import { Menu } from "@/components/Menu";
import { links } from "@/data/navigation.data";

export const Navigation = () => {
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
