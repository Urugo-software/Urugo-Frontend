import { IdCard, Mail, Phone, UserRound, type LucideIcon } from "lucide-react";

import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

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

export function SignUpWizardField({
  label,
  description,
  id,
  ...inputProps
}: SignUpField & Omit<React.ComponentProps<typeof Input>, "id" | "type">) {
  const Icon = fieldIcons[id];

  return (
    <Field>
      <FieldLabel htmlFor={id}>{label}</FieldLabel>
      <div className="relative">
        <Icon aria-hidden="true" className="pointer-events-none absolute top-1/2 left-3.5 size-4 -translate-y-1/2 text-faint" />
        <Input
          {...inputProps}
          id={id}
          name={id}
          pattern={id === "fullName" || id === "nationalId" ? ".*\\S.*" : id === "telephone" ? ".*[0-9].*" : undefined}
          title={id === "telephone" ? "Enter a telephone number containing digits." : id === "fullName" || id === "nationalId" ? "Please enter a value." : undefined}
          className="h-11 border-line pl-10 focus-visible:border-brand focus-visible:ring-brand/20"
        />
      </div>
      {description ? <FieldDescription>{description}</FieldDescription> : null}
    </Field>
  );
}
