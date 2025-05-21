import { DynamicIcon, IconName } from "lucide-react/dynamic";

export type IconProps = {
  icon: IconName;
  className?: string;
  size?: number;
  color?: string;
};

export const Icon = ({
  icon,
  className = "",
  size = 24,
  color = "gray",
}: IconProps) => {
  return (
    <DynamicIcon name={icon} className={className} size={size} color={color} />
  );
};
