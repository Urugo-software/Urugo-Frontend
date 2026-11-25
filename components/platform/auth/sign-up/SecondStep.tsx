import { ArrowLeft, ArrowRight } from "lucide-react";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

import {
  AUTH_PRIMARY_BUTTON_CLASS,
  AUTH_SECONDARY_BUTTON_CLASS,
} from "../auth-styles";
import {
  getSignUpFieldRules,
  SignUpWizardField,
  type SignUpField,
  type SignUpValues,
} from "./SignUpWizardField";

type SecondStepProps = {
  fields: readonly SignUpField[];
  register: UseFormRegister<SignUpValues>;
  errors: FieldErrors<SignUpValues>;
  onBack: () => void;
};

function SecondStep({ fields, register, errors, onBack }: SecondStepProps) {
  return (
    <>
      {fields.map((field) => (
        <SignUpWizardField
          key={field.id}
          {...field}
          registration={register(field.id, getSignUpFieldRules(field.id))}
          error={errors[field.id]?.message}
        />
      ))}
      <Field className="pt-1">
        <div className="flex flex-col-reverse gap-2.5 sm:grid sm:grid-cols-[auto_1fr] sm:gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className={`${AUTH_SECONDARY_BUTTON_CLASS} sm:w-28`}
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            <span>Back</span>
          </Button>
          <Button type="submit" className={AUTH_PRIMARY_BUTTON_CLASS}>
            <span>Continue</span>
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </Field>
    </>
  );
}

export default SecondStep;
