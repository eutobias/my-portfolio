import { Box } from "@/components/Box";
import { CustomLink } from "@/components/CustomLink";
import { Heading } from "@/components/Heading";
import { MyAvatar } from "@/components/MyAvatar";
import { RoundedBox } from "@/components/RoundedBox";
import { Text } from "@/components/Text";

export const NotFound = () => {
  return (
    <RoundedBox className="flex-col gap-4 mt-8 items-center">
      <Box className="mb-8 justify-center">
        <MyAvatar />
      </Box>
      <Heading level={2} className="mb-8">Oops!</Heading>
      <Heading level={5}>Error 404 - Page Not Found</Heading>
      <Text>
        The page you are looking for does not exist, sorry about that.
      </Text>
      <CustomLink href="/" className="mt-8">Back to home</CustomLink>
    </RoundedBox>
  );
};
