import { Box } from "@/components/Box";
import { InputText } from "@/components/InputText";
import { Button } from "@/components/Button";
import { useContactForm } from "@/hooks/useContactForm";
import { useState } from "react";
import { Notification } from "@/components/Notification";

export const ContactForm = () => {
  const { onChange, onSubmit, state } = useContactForm();

  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
    visible: boolean;
  }>({
    type: "success",
    message: "",
    visible: false,
  });

  const handleNotification = (success: boolean) => {
    if (!success) {
      setNotification({
        type: "error",
        message: "Failed to send message",
        visible: true,
      });
      return;
    }

    setNotification({
      type: "success",
      message: "Message sent successfully",
      visible: true,
    });
  };

  return (
    <form onSubmit={(e) => onSubmit(e, handleNotification)}>
      {notification.visible && (
        <Notification
          type={notification.type}
          onDismiss={() => setNotification({ ...notification, visible: false })}
        >
          {notification.message}
        </Notification>
      )}
      <Box className="grid grid-cols-1 lg:grid-cols-2 gap-4 mt-8 mb-4">
        <InputText
          id="name"
          name="name"
          label="Full Name"
          containerClassName="col-span-1 lg:col-span-2"
          onChange={onChange}
          value={state.values.name}
          error={state.errors.name}
        />
        <InputText
          id="email"
          name="email"
          label="Email"
          containerClassName="col-span-1"
          onChange={onChange}
          value={state.values.email}
          error={state.errors.email}
        />
        <InputText
          id="phone"
          name="phone"
          label="Phone"
          containerClassName="col-span-1"
          onChange={onChange}
          value={state.values.phone}
          error={state.errors.phone}
        />
        <InputText
          id="message"
          name="message"
          label="Message"
          asTextarea
          containerClassName="col-span-1 lg:col-span-2"
          className="h-[150px]"
          onChange={onChange}
          value={state.values.message}
          error={state.errors.message}    
        />
      </Box>

      <Button type="submit" className="px-12">
        Send Message
      </Button>
    </form>
  );
};
