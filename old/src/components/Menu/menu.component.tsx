import { MenuItem } from "./MenuItem";
import { RoundedBox } from "../RoundedBox";

interface MenuProps {
  children: React.ReactNode;
}

const Menu = ({ children }: MenuProps) => {
  return (
    <RoundedBox className="rounded-tl-none rounded-tr-none justify-center gap-4">
      {children}
    </RoundedBox>
  );
};

Menu.Item = MenuItem;

export { Menu };
