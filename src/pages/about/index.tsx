import { AboutExperience } from "@/widgets/AboutExperience";
import { AboutSkills } from "@/widgets/AboutSkills";
import { AboutSummary } from "@/widgets/AboutSummary";

export default function AboutPage() {
  return (
    <>
      <AboutSummary />
      <AboutSkills />
      <AboutExperience />
    </>
  );
}
