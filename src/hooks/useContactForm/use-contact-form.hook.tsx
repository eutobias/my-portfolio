import { ContactService } from "@/services/contactService";
import { contactFormValidation } from "@/validations/contactFormValidations";
import { useState } from "react";

interface UseContactFormState {
  values: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  errors: {
    name: string;
    email: string;
    phone: string;
    message: string;
  };
  sending: boolean;
}

interface UseContactFormReturn {
  state: UseContactFormState;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  onSubmit: (
    e: React.FormEvent<HTMLFormElement>,
    callback: (success: boolean) => void
  ) => void;
}

export const useContactForm = (): UseContactFormReturn => {
  const initialState = {
    values: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    errors: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
    sending: false,
  };

  const [state, setState] = useState<UseContactFormState>(initialState);

  const resetErrors = () => {
    setState((prev) => ({
      ...prev,
      errors: initialState.errors,
    }));
  };

  const resetState = () => {
    console.log("resetState: ", resetState);
    setState({
      ...initialState,
    });
  };

  const setSendingStatus = (status: boolean) => {
    setState((prev) => ({
      ...prev,
      sending: status,
    }));
  };

  const showErrors = (errors: Record<string, string>) => {
    setState((prev) => ({
      ...prev,
      errors: {
        ...prev.errors,
        ...errors,
      },
      sending: false,
    }));
  };

  const onChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setState((prev) => ({
      ...prev,
      values: {
        ...prev.values,
        [e.target.name]: e.target.value,
      },
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>, callback: (success: boolean) => void) => {
    e.preventDefault();
    resetErrors();
    setSendingStatus(true);

    const result = await contactFormValidation(state.values);
    console.log("result: ", result);

    if (!result.isValid) {
      showErrors(result.validationErrors);
      return;
    }

    try {
      const response = await ContactService.sendEmail(result.data);

      if (response.status !== 200) {
        callback(false);
        return;
      }

      callback(true);
      resetState();
    } catch {
      callback(false);
    }

  };

  return {
    state,
    onChange,
    onSubmit,
  };
};
