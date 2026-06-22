import * as yup from "yup";

interface ContactFormValidationResult {
  isValid: boolean;
  validationErrors: Record<string, string>;
  data: Record<string, string>;
}

export const contactFormValidation = (data: Record<string, string>): Promise<ContactFormValidationResult> => {
  const schema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    phone: yup.string().optional(),
    message: yup.string().required("Message is required"),
  });

  return new Promise((resolve) => {
    schema.validate(data, { abortEarly: false })
      .then(() => resolve({ isValid: true, validationErrors: {}, data }))
      .catch((error) => {
        const validationErrors: Record<string, string> = {};
        error.inner.forEach((err: yup.ValidationError) => {
          if (err.path) {
            validationErrors[err.path] =
              err.message;
          }
        });
        resolve({ isValid: false, validationErrors, data });
      })
  });
};
