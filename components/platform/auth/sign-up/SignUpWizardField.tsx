import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

const inputClassName =
  "h-11 border-ink hover:border-brand/30 hover:ring-1 hover:ring-brand/30 focus-within:outline-none focus-within:ring-2 focus-within:ring-brand";

export function SignUpWizardField({
  label,
  description,
  ...inputProps
}: { label: string; description?: string } & React.ComponentProps<
  typeof Input
>) {
  return (
    <Field>
      <FieldLabel htmlFor={inputProps.id}>{label}</FieldLabel>
      <Input {...inputProps} className={inputClassName} />
      {description ? <FieldDescription>{description}</FieldDescription> : null}
    </Field>
  );
}
