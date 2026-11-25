"use client";

import { ArrowLeft, ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
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
  const tActions = useTranslations("common.actions");
  const tValidation = useTranslations("auth.signUp.validation");

  return (
    <>
      {fields.map((field) => (
        <SignUpWizardField
          key={field.id}
          {...field}
          registration={register(
            field.id,
            getSignUpFieldRules(field.id, (key) => tValidation(key)),
          )}
          error={errors[field.id]?.message}
        />
      ))}
      <Field className="pt-1">
        <div className="flex flex-col-reverse gap-2.5 sm:grid sm:grid-cols-[auto_1fr] sm:gap-3">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className={`${AUTH_SECONDARY_BUTTON_CLASS} sm:min-w-28`}
          >
            <ArrowLeft aria-hidden="true" className="size-4" />
            <span>{tActions("back")}</span>
          </Button>
          <Button type="submit" className={AUTH_PRIMARY_BUTTON_CLASS}>
            <span>{tActions("continue")}</span>
            <ArrowRight aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </Field>
    </>
  );
}

export default SecondStep;
