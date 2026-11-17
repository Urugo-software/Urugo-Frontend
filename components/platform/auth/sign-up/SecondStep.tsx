import { ArrowLeft, ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

import { SignUpWizardField, type SignUpField, type SignUpValues } from "./SignUpWizardField";

type SecondStepProps = {
  fields: readonly SignUpField[];
  values: SignUpValues;
  onChange: (id: keyof SignUpValues, value: string) => void;
  onBack: () => void;
};

function SecondStep({ fields, values, onChange, onBack }: SecondStepProps) {
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
        <div className="grid gap-3 sm:grid-cols-[auto_1fr]">
          <Button type="button" variant="outline" onClick={onBack} className="h-11 rounded-xl sm:w-32">
            <ArrowLeft aria-hidden="true" /> Back
          </Button>
          <Button type="submit" className="h-11 rounded-xl bg-brand text-white hover:bg-brand/80">
            Continue <ArrowRight aria-hidden="true" />
          </Button>
        </div>
      </Field>
    </>
  );
}

export default SecondStep;
