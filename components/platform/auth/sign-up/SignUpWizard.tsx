"use client";

import { Camera, IdCard, UserRound } from "lucide-react";
import Link from "next/link";
import { useState, type FormEvent } from "react";

import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { signUpSteps } from "@/data/home-data";

import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import SignUpFormHeader from "./SignUpFormHeader";
import { SignUpProgress } from "./SignUpProgress";
import type { SignUpValues } from "./SignUpWizardField";
import ThirdStep from "./ThirdStep";

const progressSteps = signUpSteps.map((step, index) => ({
  ...step,
  icon: [UserRound, IdCard, Camera][index],
}));

export function SignUpWizard() {
  const [currentStep, setCurrentStep] = useState(1);
  const [values, setValues] = useState<SignUpValues>({
    fullName: "",
    email: "",
    telephone: "",
    nationalId: "",
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [submissionNotice, setSubmissionNotice] = useState(false);
  const step = signUpSteps[currentStep - 1];

  const updateValue = (id: keyof SignUpValues, value: string) => {
    setValues((previous) => ({ ...previous, [id]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentStep < signUpSteps.length) {
      setCurrentStep((previous) => previous + 1);
      return;
    }
    // Registration has no API contract in this project yet.
    setSubmissionNotice(true);
  };

  const goBack = () => {
    setSubmissionNotice(false);
    setCurrentStep((previous) => previous - 1);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full max-w-sm rounded-2xl border border-brand/10 bg-background p-5 shadow-sm sm:max-w-md sm:p-8"
    >
      <div className="flex flex-col gap-6 sm:gap-8">
        <SignUpProgress currentStep={currentStep} steps={progressSteps} />
        <SignUpFormHeader
          stepLabel={`Step ${currentStep} of ${signUpSteps.length}`}
          title={step.title}
          description={step.description}
        />
        <FieldGroup className="gap-4 sm:gap-5">
          {currentStep === 1 && (
            <FirstStep fields={signUpSteps[0].fields} values={values} onChange={updateValue} />
          )}
          {currentStep === 2 && (
            <SecondStep fields={signUpSteps[1].fields} values={values} onChange={updateValue} onBack={goBack} />
          )}
          {currentStep === 3 && (
            <ThirdStep
              photo={photo}
              onPhotoChange={(nextPhoto) => {
                setPhoto(nextPhoto);
                setSubmissionNotice(false);
              }}
              onBack={goBack}
            />
          )}
          {submissionNotice && (
            <p role="status" className="rounded-xl bg-brand-tint p-4 text-sm leading-6 text-brand-deep">
              Account registration is not available yet. Your details have not been submitted.
            </p>
          )}
          <FieldDescription className="text-center text-sm">
            Already have an account?{" "}
            <Link href="/auth/sign-in" className="font-medium text-brand underline-offset-4 hover:underline">
              Sign in
            </Link>
          </FieldDescription>
        </FieldGroup>
      </div>
    </form>
  );
}
