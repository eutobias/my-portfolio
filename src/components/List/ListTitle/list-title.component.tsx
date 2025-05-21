import { Heading } from "@/components/Heading";

type ListTitleProps = {
  children: React.ReactNode;
};

export const ListTitle = ({ children }: ListTitleProps) => {
  return <Heading level={3}>{children}</Heading>;
};
