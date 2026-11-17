import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

import { SignUpWizardField, type SignUpField, type SignUpValues } from "./SignUpWizardField";

type FirstStepProps = {
  fields: readonly SignUpField[];
  values: SignUpValues;
  onChange: (id: keyof SignUpValues, value: string) => void;
};

function FirstStep({ fields, values, onChange }: FirstStepProps) {
  return (
    <>
      {fields.map((field) => (
        <SignUpWizardField
          key={field.id}
          {...field}
          value={values[field.id]}
          onChange={(event) => onChange(field.id, event.target.value)}
        />
      ))}
      <Field>
        <Button type="submit" className="h-11 w-full cursor-pointer rounded-xl bg-brand text-white hover:bg-brand/80">
          Continue <ArrowRight aria-hidden="true" />
        </Button>
      </Field>
    </>
  );
}

export default FirstStep;
