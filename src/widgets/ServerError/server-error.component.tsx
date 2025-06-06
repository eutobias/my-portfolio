import { Box } from "@/components/Box";
import { CustomLink } from "@/components/CustomLink";
import { Heading } from "@/components/Heading";
import { MyAvatar } from "@/components/MyAvatar";
import { RoundedBox } from "@/components/RoundedBox";
import { Text } from "@/components/Text";

export const ServerError = () => {
  return (
    <RoundedBox className="flex-col gap-4 mt-8 items-center">
      <Box className="mb-8 justify-center">
        <MyAvatar />
      </Box>
      <Heading level={2} className="mb-8 text-center">Bad bad server, <br />no donuts for you!</Heading>
      <Heading level={5}>Error 500 - Internal Server Error</Heading>
      <Text className="text-center max-w-110">
        The server encountered an unexpected condition that prevented it from fulfilling the request. Sorry!
      </Text>
      <CustomLink href="/" className="mt-8">Back to home</CustomLink>
    </RoundedBox>
  );
};
