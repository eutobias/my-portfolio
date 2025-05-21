import { Heading } from "@/components/Heading";
import { MyAvatar } from "@/components/MyAvatar";
import { RoundedBox } from "@/components/RoundedBox";
import { Text } from "@/components/Text";

export const About = () => {
  return (
    <RoundedBox className="about-widget flex-col items-center gap-4 mt-8">
      <MyAvatar />
      <Heading level={2}>Tobias Taurian</Heading>
      <Text variant="body" className="max-w-110">
        Hi, <strong className="highlight">I'm Tobias</strong>, a senior developer with over <strong className="highlight">18 years of experience</strong>.
        Passionate about building scalable solutions and stunning new ideas.
      </Text>
    </RoundedBox>
  );
};
