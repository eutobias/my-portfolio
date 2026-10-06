import type { ReactNode } from "react";
import {
  FiArrowUpRight,
  FiGithub,
  FiInstagram,
  FiLinkedin,
  FiMail,
} from "react-icons/fi";

export const Shell = ({ children }: { children: ReactNode }) => (
  <div className="mx-auto w-full max-w-[1180px] px-4 sm:px-6">{children}</div>
);

const socialIcons = {
  github: FiGithub,
  linkedin: FiLinkedin,
  instagram: FiInstagram,
  mail: FiMail,
} as const;

export type SocialIconProps = { name: string; className?: string };

export const SocialIcon = ({ name, className }: SocialIconProps) => {
  const Icon =
    socialIcons[name.toLowerCase() as keyof typeof socialIcons] ?? FiArrowUpRight;
  return <Icon aria-hidden className={className ?? "h-5 w-5"} />;
};
