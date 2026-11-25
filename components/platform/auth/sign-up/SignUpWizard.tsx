"use client";

import { Camera, IdCard, MailCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { useRenterWorkspace } from "@/store/renter-workspace.store";

import { AUTH_CARD_CLASS, AUTH_PRIMARY_BUTTON_CLASS } from "../auth-styles";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import SignUpFormHeader from "./SignUpFormHeader";
import { SignUpProgress } from "./SignUpProgress";
import type { SignUpField, SignUpValues } from "./SignUpWizardField";
import ThirdStep from "./ThirdStep";

const STEP_KEYS = ["details", "identification", "photo"] as const;
const STEP_ICONS = [UserRound, IdCard, Camera] as const;

const STEP_FIELDS: Record<1 | 2, ReadonlyArray<keyof SignUpValues>> = {
  1: ["fullName", "email"],
  2: ["telephone", "nationalId"],
};

export function SignUpWizard() {
  const t = useTranslations("auth.signUp");
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

  const progressSteps = STEP_KEYS.map((key, index) => ({
    key: index + 1,
    label: t(`steps.${key}.label`),
    icon: STEP_ICONS[index],
  }));

  const stepFields: Record<1 | 2, readonly SignUpField[]> = {
    1: [
      {
        id: "fullName",
        label: t("fields.fullName.label"),
        type: "text",
        autoComplete: "name",
        placeholder: t("fields.fullName.placeholder"),
        required: true,
      },
      {
        id: "email",
        label: t("fields.email.label"),
        type: "email",
        autoComplete: "email",
        placeholder: t("fields.email.placeholder"),
        required: true,
      },
    ],
    2: [
      {
        id: "telephone",
        label: t("fields.telephone.label"),
        type: "tel",
        autoComplete: "tel",
        placeholder: t("fields.telephone.placeholder"),
        required: true,
      },
      {
        id: "nationalId",
        label: t("fields.nationalId.label"),
        type: "text",
        autoComplete: "off",
        placeholder: t("fields.nationalId.placeholder"),
        required: true,
      },
    ],
  };

  const activeStepKey = STEP_KEYS[currentStep - 1];
  const stepTitle =
    currentStep === 1 && isRenterInvite
      ? t("steps.details.inviteTitle")
      : t(`steps.${activeStepKey}.title`);
  const stepDescription =
    currentStep === 1 && isRenterInvite
      ? t("steps.details.inviteDescription")
      : t(`steps.${activeStepKey}.description`);

  const destination = isRenterInvite
    ? {
        route: "/renter",
        buttonLabel: t("preview.continueRenter"),
      }
    : {
        route: "/landlord",
        buttonLabel: t("preview.continueLandlord"),
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
          stepLabel={t("stepCounter", {
            current: currentStep,
            total: progressSteps.length,
          })}
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
                {t("invite.heading", { code: inviteCode })}
              </p>
              <p className="leading-relaxed text-body">
                {invitedProperty
                  ? t("invite.propertyDescription", {
                      property: invitedProperty.name,
                      location: invitedProperty.location,
                    })
                  : t("invite.fallbackDescription")}
              </p>
              <p className="text-faint">{t("invite.previewNote")}</p>
            </div>
          </div>
        )}

        <FieldGroup className="gap-4 sm:gap-5">
          {currentStep === 1 && (
            <FirstStep
              fields={stepFields[1]}
              register={register}
              errors={errors}
            />
          )}
          {currentStep === 2 && (
            <SecondStep
              fields={stepFields[2]}
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
                  ? t("preview.renterNotice")
                  : t("preview.landlordNotice")}
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
            {t("footer.haveAccount")}{" "}
            <Link
              href="/auth/sign-in"
              className="font-semibold text-brand underline-offset-4 hover:text-brand-deep hover:underline"
            >
              {t("footer.signInLink")}
            </Link>
          </FieldDescription>
        </FieldGroup>
      </div>
    </form>
  );
}
