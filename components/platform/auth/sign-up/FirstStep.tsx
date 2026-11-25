"use client";

import { ArrowRight } from "lucide-react";
import { useTranslations } from "next-intl";
import type { FieldErrors, UseFormRegister } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { Field } from "@/components/ui/field";

import { AUTH_PRIMARY_BUTTON_CLASS } from "../auth-styles";
import {
  getSignUpFieldRules,
  SignUpWizardField,
  type SignUpField,
  type SignUpValues,
} from "./SignUpWizardField";

type FirstStepProps = {
  fields: readonly SignUpField[];
  register: UseFormRegister<SignUpValues>;
  errors: FieldErrors<SignUpValues>;
};

function FirstStep({ fields, register, errors }: FirstStepProps) {
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
        <Button type="submit" className={AUTH_PRIMARY_BUTTON_CLASS}>
          <span>{tActions("continue")}</span>
          <ArrowRight aria-hidden="true" className="size-4" />
        </Button>
      </Field>
    </>
  );
}

export default FirstStep;
