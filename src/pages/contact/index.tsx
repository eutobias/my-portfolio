import { Box } from "@/components/Box";
import { Heading } from "@/components/Heading";
import { RoundedBox } from "@/components/RoundedBox";
import { Text } from "@/components/Text";
import { ContactForm } from "@/widgets/ContactForm";
import { ContactLinks } from "@/widgets/ContactLinks";

export default function ContactPage() {
  return (
    <RoundedBox className="flex-col mt-8 gap-4">
      <Heading level={3}>Get in touch</Heading>
      <Text>
        Have questions, need a quote, or want to discuss your project?
      </Text>

      <Box className="flex-col gap-2">
        <Text className="mt-4">You can reach me at:</Text>
        <ContactLinks />
      </Box>

      <Text>
        Or you can fill out the form below, and I'll get back to you ASAP.
      </Text>

      <ContactForm />
    </RoundedBox>
  );
}
