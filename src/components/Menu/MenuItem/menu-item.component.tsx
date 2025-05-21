import { Icon, IconProps } from "@/components/Icon";
import { Text } from "@/components/Text";
import Link from "next/link";
import styles from "./menu-item.module.scss";

type MenuItemProps = {
  label: string;
  icon: IconProps["icon"];
  href: string;
};

export const MenuItem = ({ href, icon, label }: MenuItemProps) => {
  return (
    <Link
      href={href}
      className={`flex flex-col items-center gap-1 ${styles["menu-item"]}`}
    >
      <Icon icon={icon} />
      <Text variant="body">{label}</Text>
    </Link>
  );
};
