import { Box } from "@/components/Box";
import Image from "next/image";

import avatarImage from "@/assets/avatar-new.svg";

export const MyAvatar = () => {
  return (
    <Box className="bg-white w-30 h-auto p-2 rounded-full border-4 border-highlight">
      <Image src={avatarImage} alt="avatar" className="w-full h-auto" />
    </Box>
  );
};
