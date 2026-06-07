import { Box } from "../../Box";
import { CustomLink } from "../../CustomLink";
import { classNames } from "../../../lib/classNames";

interface ListViewMoreProps {
  children: React.ReactNode;
  href: string;
  className?: string;
}

export const ListViewMore = ({
  children,
  href,
  className,
}: ListViewMoreProps) => {
  return (
    <Box
      className={classNames("items-center place-self-end w-auto", className)}
    >
      <CustomLink href={href} size="large">
        {children}
      </CustomLink>
    </Box>
  );
};
