"use client";

import { useRef, useState } from "react";
import { signUpSteps } from "@/data/data";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldSeparator,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

import SignUpFormHeader from "./SignUpFormHeader";
import { SignUpGoogleIcon } from "./SignUpGoogleIcon";
import { SignUpWizardField } from "./SignUpWizardField";
import Link from "next/link";

const primaryButtonClassName =
  "h-11 w-full rounded-xl bg-brand-deep text-white transition-colors duration-300 hover:bg-brand";
const outlineButtonClassName = "h-11 w-full rounded-xl border-ink";

export function SignUpWizard() {
  const formRef = useRef<HTMLFormElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const step = signUpSteps[currentStep - 1];
  const fields = step.fields;
  const next = () => formRef.current?.reportValidity() && setCurrentStep(2);

  return (
    <form
      ref={formRef}
      className="w-full max-w-md rounded-2xl border border-brand/10 bg-background p-6 shadow-sm sm:p-8"
    >
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-center gap-2">
          {signUpSteps.map((item) => (
            <div
              key={item.key}
              className={cn(
                "flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium transition-colors",
                currentStep >= item.key
                  ? "border-brand/20 bg-brand-tint text-brand-deep"
                  : "border-line bg-surface text-faint",
              )}
            >
              <span className="flex size-5 items-center justify-center rounded-full bg-background text-[11px] font-semibold text-brand-deep shadow-sm">
                {item.key}
              </span>
              <span className="hidden sm:inline">{item.label}</span>
            </div>
          ))}
        </div>
        <SignUpFormHeader
          stepLabel={`Step ${currentStep} of ${signUpSteps.length}`}
          title={step.title}
          description={step.description}
        />
        <FieldGroup className="gap-5">
          {currentStep === 1 ? (
            <>
              {fields.map((field) => (
                <SignUpWizardField key={field.id} {...field} />
              ))}
              <Field>
                <Button
                  type="button"
                  onClick={next}
                  className={primaryButtonClassName}
                >
                  Continue
                </Button>
              </Field>
            </>
          ) : (
            <>
              {fields.map((field) => (
                <SignUpWizardField key={field.id} {...field} />
              ))}
              <Field>
                <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setCurrentStep(1)}
                    className="h-11 w-full rounded-xl border-ink sm:w-32"
                  >
                    Back
                  </Button>
                  <Button type="submit" className={primaryButtonClassName}>
                    Create account
                  </Button>
                </div>
              </Field>
              <FieldSeparator className="text-muted-foreground">
                Or continue with
              </FieldSeparator>
              <Field>
                <Button
                  variant="outline"
                  type="button"
                  className={outlineButtonClassName}
                >
                  <SignUpGoogleIcon />
                  Sign up with Google
                </Button>
                <FieldDescription className="pt-4 text-center text-sm">
                  Already have an account?{" "}
                  <Link
                    href="/auth/sign-in"
                    className="font-medium text-brand-deep underline-offset-4 hover:underline"
                  >
                    Sign in
                  </Link>
                </FieldDescription>
              </Field>
            </>
          )}
        </FieldGroup>
      </div>
    </form>
  );
}
