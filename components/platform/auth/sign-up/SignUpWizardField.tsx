import {
  IdCard,
  Mail,
  Phone,
  UserRound,
  type LucideIcon,
} from "lucide-react";
import type { RegisterOptions, UseFormRegisterReturn } from "react-hook-form";

import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  isValidEmail,
  isValidNationalId,
  isValidTelephone,
} from "@/utils/auth-helpers";

import { AUTH_INPUT_CLASS, AUTH_LABEL_CLASS } from "../auth-styles";

export type SignUpValues = {
  fullName: string;
  email: string;
  telephone: string;
  nationalId: string;
};

export type SignUpField = {
  id: keyof SignUpValues;
  label: string;
  type: string;
  autoComplete?: string;
  placeholder?: string;
  required?: boolean;
  description?: string;
};

const fieldIcons: Record<keyof SignUpValues, LucideIcon> = {
  fullName: UserRound,
  email: Mail,
  telephone: Phone,
  nationalId: IdCard,
};

export function getSignUpFieldRules(
  id: keyof SignUpValues,
): RegisterOptions<SignUpValues, keyof SignUpValues> {
  switch (id) {
    case "fullName":
      return {
        required: "Please enter your full name.",
        validate: (value) =>
          value.trim().length >= 2 ||
          "Full name must be at least 2 characters.",
      };
    case "email":
      return {
        required: "Please enter your email address.",
        validate: (value) =>
          isValidEmail(value) || "Please enter a valid email address.",
      };
    case "telephone":
      return {
        required: "Please enter your phone number.",
        validate: (value) =>
          isValidTelephone(value) ||
          "Enter a valid phone number (e.g. +250 788 000 000).",
      };
    case "nationalId":
      return {
        required: "Please enter your national ID number.",
        validate: (value) =>
          isValidNationalId(value) || "Enter a valid national ID number.",
      };
  }
}

type SignUpWizardFieldProps = SignUpField & {
  registration: UseFormRegisterReturn<keyof SignUpValues>;
  error?: string;
};

export function SignUpWizardField({
  id,
  label,
  type,
  autoComplete,
  placeholder,
  description,
  registration,
  error,
}: SignUpWizardFieldProps) {
  const Icon = fieldIcons[id];
  const errorId = `${id}-error`;
  const descriptionId = `${id}-description`;
  const describedBy = [
    description ? descriptionId : null,
    error ? errorId : null,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <Field data-invalid={Boolean(error) || undefined}>
      <FieldLabel htmlFor={id} className={AUTH_LABEL_CLASS}>
        {label}
      </FieldLabel>
      <div className="relative">
        <Icon
          aria-hidden="true"
          className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-faint"
        />
        <Input
          id={id}
          type={type}
          autoComplete={autoComplete}
          placeholder={placeholder}
          aria-invalid={Boolean(error)}
          aria-describedby={describedBy || undefined}
          className={`${AUTH_INPUT_CLASS} pl-10`}
          {...registration}
        />
      </div>
      {description ? (
        <FieldDescription id={descriptionId} className="text-xs text-body">
          {description}
        </FieldDescription>
      ) : null}
      {error ? (
        <FieldError id={errorId} className="text-xs font-medium">
          {error}
        </FieldError>
      ) : null}
    </Field>
  );
}
