import { Box } from "@/components/Box";
import { Icon } from "@/components/Icon";
import styles from "./list-item.module.scss"
import { classNames } from "@/lib/classNames";

interface ListItemProps {
  children: React.ReactNode;
  as?: keyof React.JSX.IntrinsicElements;
};

export const ListItem = ({ children, as = "li" }: ListItemProps) => {
  return (
    <Box as={as} className={classNames(styles['list-item'], "bg-custom-card rounded-2xl p-4")}>
      <Box className="items-center">
        {children}
        <Box className="list-item-icon p-2 w-auto bg-foreground rounded-full">
          <Icon icon="chevrons-right" />
        </Box>
      </Box>
    </Box>
  );
};
