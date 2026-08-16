"use client";

import { useRef, useState } from "react";
import { signUpSteps } from "@/data/home-data";
import { FieldGroup } from "@/components/ui/field";
import { cn } from "@/lib/utils";

import SignUpFormHeader from "./SignUpFormHeader";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";

export function SignUpWizard() {
  const formRef = useRef<HTMLFormElement>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const step = signUpSteps[currentStep - 1];
  const fields = step.fields;
  const next = () => formRef.current?.reportValidity() && setCurrentStep(2);

  return (
    <form
      ref={formRef}
      className="w-full max-w-sm rounded-2xl border border-brand/10 bg-background p-5 shadow-sm sm:max-w-md sm:p-8"
    >
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3">
          {signUpSteps.map((item) => (
            <div
              key={item.key}
              className={cn(
                "flex items-center gap-2 rounded-full border px-2.5 py-1 text-[11px] font-medium transition-colors sm:px-3 sm:text-xs",
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
        {/* form header */}
        <SignUpFormHeader
          stepLabel={`Step ${currentStep} of ${signUpSteps.length}`}
          title={step.title}
          description={step.description}
        />
        <FieldGroup className="gap-4 sm:gap-5">
          {currentStep === 1 ? (
            // input fields for the first step
            <FirstStep fields={fields} onContinue={next} />
          ) : (
            // input fields for the second step
            <SecondStep fields={fields} onBack={() => setCurrentStep(1)} />
          )}
        </FieldGroup>
      </div>
    </form>
  );
}
