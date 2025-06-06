import { Box } from "@/components/Box";
import { Icon } from "@/components/Icon";
import { CustomLink } from "@/components/CustomLink";
import { WhatsappIcon } from "@/components/WhatsappIcon";

export const ContactLinks = () => {
  return (
    <Box as="ul" className="flex-col gap-2 mb-4">
      <Box as="li" className="gap-2">
        <Icon icon="mail" className="stroke-highlight" />
        <CustomLink href="mailto:me@eutobias.dev" target="_blank">
          me@eutobias.dev
        </CustomLink>
      </Box>
      <Box as="li" className="gap-2">
        <Icon icon="phone" className="stroke-highlight" />
        <CustomLink href="tel:+5521964211891" target="_blank">
          +55 21 96421-1891
        </CustomLink>
      </Box>
      <Box as="li" className="gap-2">
        <WhatsappIcon />
        <CustomLink href="https://wa.me/5521964211891" target="_blank">
          Whatsapp
        </CustomLink>
      </Box>
    </Box>
  );
};
