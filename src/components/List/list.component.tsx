import { ListItem } from "@/components/List/ListItem";
import { ListTitle } from "@/components/List/ListTitle";
import { RoundedBox } from "@/components/RoundedBox";
import { classNames } from "@/lib/classNames";

type ListProps = {
  children: React.ReactNode;
  className?: string;
};

const List = ({ children, className = "" }: ListProps) => {
  return (
    <RoundedBox
      as="ul"
      className={classNames("flex flex-col gap-4", className)}
    >
      {children}
    </RoundedBox>
  );
};

List.Item = ListItem;
List.Title = ListTitle;

export { List };
