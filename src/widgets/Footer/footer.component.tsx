import { Box } from "@/components/Box";
import { Heading } from "@/components/Heading";
import { Icon } from "@/components/Icon";
import { RoundedBox } from "@/components/RoundedBox";
import { footerNavigation } from "@/data/footer-navigation.data";
import Link from "next/link";

export const Footer = () => {
  return (
    <RoundedBox className="items-center rounded-bl-none rounded-br-none mt-8 absolute bottom-0">
      <Heading className="w-auto mr-auto" level={6}>
        <Link href="/">eutobias.dev</Link>
      </Heading>

      <Box as="ul" className="flex-row gap-4 w-auto">
        {footerNavigation.map((link, index) => {
          return (
            <Box as="li" key={index}>
              <Link href={link.href} title={link.label} target="_blank">
                <Icon icon={link.icon} size={24} className="stroke-highlight hover:stroke-tertiary" />
              </Link>
            </Box>
          );
        })}
      </Box>
    </RoundedBox>
  );
};
