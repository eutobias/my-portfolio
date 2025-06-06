import { Box } from "@/components/Box";
import { Icon } from "@/components/Icon";
import { classNames } from "@/lib/classNames";
import { useEffect, useState } from "react";
import styles from "./notification.module.scss";

interface NotificationProps {
  children: React.ReactNode;
  type?: "success" | "error";
  duration?: number;
  onDismiss?: () => void;
}

export const Notification = ({
  children,
  type = "success",
  duration = 5000,
  onDismiss,
}: NotificationProps) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    console.log("Notification mounted");
    if (duration > 0) {
      const timer = setTimeout(() => {
        setIsVisible(false);
        onDismiss?.();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [duration, onDismiss]);

  if (!isVisible) return null;

  const typeClasses = {
    success: "bg-highlight text-background",
    error: "bg-red-300 text-background",
  };

  return (
    <Box
      className={classNames(
        "rounded-bl-2xl rounded-br-2xl p-5 fixed top-0 left-0 right-0 w-full z-100",
        typeClasses[type],
        styles["notification-in"]
      )}
    >
      <Box className="items-center justify-center relative">
        {children}

        <span
          onClick={() => setIsVisible(false)}
          className="absolute top-[0px] right-[0px] cursor-pointer "
        >
          <Icon icon="x" className="stroke-background" />
        </span>
      </Box>
    </Box>
  );
};
