import { Box } from "@/components/Box";
import { classNames } from "@/lib/classNames";
import React, { InputHTMLAttributes, TextareaHTMLAttributes } from "react";

interface InputTextProps extends InputHTMLAttributes<HTMLInputElement> {
  asTextarea?: boolean;
  className?: string;
  label?: string;
  error?: string;
  labelClassName?: string;
  containerClassName?: string;
}

export const InputText = ({
  asTextarea,
  className,
  label,
  error,
  labelClassName,
  containerClassName,
  ...props
}: InputTextProps) => {
  const baseClassName =
    "w-full shrink-0 font-sans px-4 py-2 border-0 bg-background rounded-lg focus:outline-none focus:ring-2 focus:ring-highlight";
  const inputClassName = `${baseClassName} ${className || ""}`;

  return (
    <div className={classNames("gap-1 w-full", containerClassName)}>
      {label && (
        <label
          htmlFor={props.id}
          className={`block font-medium mb-1 ${labelClassName || ""}`}
        >
          {label}
        </label>
      )}
      
      {asTextarea ? (
        <textarea
          className={classNames(inputClassName, {'border-red-300 border-1': error})}
          {...(props as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <input
          className={classNames(inputClassName, {'border-red-300 border-1': error})}
          {...props}
        />
      )}

      {error && (
        <p className={`text-xs text-red-300 pt-1`}>
          {error}
        </p>
      )}
    </div>
  );
};
