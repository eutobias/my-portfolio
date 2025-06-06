import { Box } from "@/components/Box";
import { Heading } from "@/components/Heading";
import { Text } from "@/components/Text";
import { RoundedBox } from "@/components/RoundedBox";
import { MyAvatar } from "@/components/MyAvatar";

export const AboutSummary = () => {
  return (
    <RoundedBox className="flex-col gap-4 mt-8">
      <Box className="m-auto flex flex-col items-center mb-4">
        <MyAvatar />
      </Box>

      <Box as="section" className="flex flex-col gap-4 mb-8">
        <Heading level={3}>Summary</Heading>
        <Text>
          Senior developer with over{" "}
          <strong className="highlight">
            15 years of experience specializing in JavaScript, TypeScript,
            React, Node.js, and cloud architectures.
          </strong>{" "}
          Passionate about building scalable solutions from microservices and
          REST APIs to AI applications (LLMs, Agents). Proven experience leading
          teams and delivering projects for e-commerce platforms, websites,
          mobile apps, exhibitions, and educational systems.
        </Text>
      </Box>
    </RoundedBox>
  );
};
