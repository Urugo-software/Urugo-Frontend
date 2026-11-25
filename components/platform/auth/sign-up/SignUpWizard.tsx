"use client";

import { Camera, IdCard, MailCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { signUpSteps } from "@/data/home-data";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { useRenterWorkspace } from "@/store/renter-workspace.store";

import { AUTH_CARD_CLASS, AUTH_PRIMARY_BUTTON_CLASS } from "../auth-styles";
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

const STEP_FIELDS: Record<1 | 2, ReadonlyArray<keyof SignUpValues>> = {
  1: ["fullName", "email"],
  2: ["telephone", "nationalId"],
};

export function SignUpWizard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const inviteCode = searchParams.get("invite")?.trim() ?? "";
  const invitedPropertyId = searchParams.get("property")?.trim() ?? "";
  const isRenterInvite = Boolean(inviteCode);

  const properties = useLandlordProperties((s) => s.properties);
  const updateLandlordProfile = useLandlordWorkspace((s) => s.updateProfile);
  const updateRenterProfile = useRenterWorkspace((s) => s.updateProfile);

  const invitedProperty = invitedPropertyId
    ? properties.find((p) => p.id === invitedPropertyId)
    : undefined;

  const [currentStep, setCurrentStep] = useState(1);
  const [photo, setPhoto] = useState<File | null>(null);
  const [submissionNotice, setSubmissionNotice] = useState(false);

  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasNavigatedRef = useRef(false);

  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<SignUpValues>({
    defaultValues: {
      fullName: "",
      email: "",
      telephone: "",
      nationalId: "",
    },
    mode: "onTouched",
    shouldUnregister: false,
  });

  useEffect(() => {
    if (!hasNavigatedRef.current) return;
    headingRef.current?.focus();
  }, [currentStep]);

  const navigateToStep = (nextStep: number) => {
    hasNavigatedRef.current = true;
    setSubmissionNotice(false);
    setCurrentStep(nextStep);
  };

  const onComplete = (data: SignUpValues) => {
    const fullName = data.fullName.trim();
    const email = data.email.trim();
    const phone = data.telephone.trim();

    if (isRenterInvite) {
      updateRenterProfile({
        ...(fullName ? { name: fullName } : {}),
        ...(email ? { email } : {}),
        ...(phone ? { phone } : {}),
        ...(invitedProperty ? { propertyName: invitedProperty.name } : {}),
      });
    } else if (fullName || email || phone) {
      updateLandlordProfile({
        ...(fullName ? { fullName } : {}),
        ...(email ? { email } : {}),
        ...(phone ? { phone } : {}),
      });
    }

    // Backend registration API is not connected yet.
    setSubmissionNotice(true);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (currentStep === 1 || currentStep === 2) {
      const valid = await trigger([...STEP_FIELDS[currentStep]], {
        shouldFocus: true,
      });
      if (!valid) return;
      navigateToStep(currentStep + 1);
      return;
    }

    await handleSubmit(onComplete)(event);
  };

  const step = signUpSteps[currentStep - 1];
  const stepTitle =
    currentStep === 1 && isRenterInvite ? "Complete your account" : step.title;
  const stepDescription =
    currentStep === 1 && isRenterInvite
      ? "Confirm your details to join your landlord's rental workspace."
      : step.description;

  const destination = isRenterInvite
    ? {
        route: "/renter",
        buttonLabel: "Continue to Renter Dashboard",
      }
    : {
        route: "/landlord",
        buttonLabel: "Continue to Landlord Dashboard",
      };

  return (
    <form
      noValidate
      onSubmit={handleFormSubmit}
      className={AUTH_CARD_CLASS}
    >
      <div className="flex flex-col gap-6 sm:gap-7">
        <SignUpProgress
          currentStep={currentStep}
          steps={progressSteps}
          onSelectStep={(stepKey) => {
            if (stepKey < currentStep) {
              navigateToStep(stepKey);
            }
          }}
        />

        <SignUpFormHeader
          stepLabel={`Step ${currentStep} of ${signUpSteps.length}`}
          title={stepTitle}
          description={stepDescription}
          headingRef={headingRef}
        />

        {isRenterInvite && (
          <div
            role="status"
            className="flex items-start gap-3 rounded-xl border border-brand/20 bg-brand-tint/60 p-3.5 text-xs text-brand-deep"
          >
            <MailCheck
              aria-hidden="true"
              className="mt-0.5 size-4 shrink-0 text-brand"
            />
            <div className="space-y-1">
              <p className="font-semibold text-ink">
                Landlord invitation detected ({inviteCode})
              </p>
              <p className="leading-relaxed text-body">
                {invitedProperty
                  ? `You were invited to join ${invitedProperty.name} (${invitedProperty.location}) as a renter.`
                  : "Complete your details below to preview your renter workspace."}
              </p>
              <p className="text-faint">
                Preview invite link — full token verification will run once
                backend onboarding is connected.
              </p>
            </div>
          </div>
        )}

        <FieldGroup className="gap-4 sm:gap-5">
          {currentStep === 1 && (
            <FirstStep
              fields={signUpSteps[0].fields}
              register={register}
              errors={errors}
            />
          )}
          {currentStep === 2 && (
            <SecondStep
              fields={signUpSteps[1].fields}
              register={register}
              errors={errors}
              onBack={() => navigateToStep(1)}
            />
          )}
          {currentStep === 3 && (
            <ThirdStep
              photo={photo}
              onPhotoChange={(nextPhoto) => {
                setPhoto(nextPhoto);
                setSubmissionNotice(false);
              }}
              onBack={() => navigateToStep(2)}
            />
          )}

          {submissionNotice && (
            <div
              role="status"
              className="space-y-3 rounded-xl border border-brand/20 bg-brand-tint/60 p-4 text-xs leading-relaxed text-brand-deep"
            >
              <p>
                {isRenterInvite
                  ? "Backend account registration is not connected yet. Your renter details have been saved locally for preview."
                  : "Backend account registration is not connected yet. Your landlord details have been saved locally for preview — service selection will happen at first sign-in."}
              </p>
              <Button
                type="button"
                onClick={() => router.push(destination.route)}
                className={AUTH_PRIMARY_BUTTON_CLASS}
              >
                {destination.buttonLabel}
              </Button>
            </div>
          )}

          <FieldDescription className="pt-1 text-center text-sm text-body">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="font-semibold text-brand underline-offset-4 hover:text-brand-deep hover:underline"
            >
              Sign in
            </Link>
          </FieldDescription>
        </FieldGroup>
      </div>
    </form>
  );
}
