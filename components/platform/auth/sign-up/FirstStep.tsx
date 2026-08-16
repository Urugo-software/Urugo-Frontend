import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

import { SignUpWizardField } from "./SignUpWizardField";

const primaryButtonClassName =
  "h-11 w-full rounded-xl bg-brand text-white transition-colors duration-300 hover:bg-brand/80 cursor-pointer";

type FirstStepProps = {
  fields: ReadonlyArray<{
    id: string;
    label: string;
    type: string;
    autoComplete?: string;
    placeholder?: string;
    required?: boolean;
    description?: string;
  }>;
  onContinue: () => void;
};

function FirstStep({ fields, onContinue }: FirstStepProps) {
  return (
    <>
      {fields.map((field) => (
        <SignUpWizardField key={field.id} {...field} />
      ))}
      <Field>
        <Button
          type="button"
          onClick={onContinue}
          className={primaryButtonClassName}
        >
          Continue
        </Button>
      </Field>
    </>
  );
}

export default FirstStep;
