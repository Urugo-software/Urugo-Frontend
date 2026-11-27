"use client";

import { BriefcaseBusiness, IdCard, UserRound } from "lucide-react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";

import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { useGoogleAuth } from "@/hooks/mutate/useGoogleAuth";
import { useStartPublicLandlordRegistration } from "@/hooks/mutate/usePublicLandlordRegistration";
import type { LandlordPlan } from "@/types/auth";

import { AUTH_CARD_CLASS } from "../auth-styles";
import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import SignUpFormHeader from "./SignUpFormHeader";
import { SignUpProgress } from "./SignUpProgress";
import type { SignUpField, SignUpValues } from "./SignUpWizardField";
import ThirdStep from "./ThirdStep";
import { LandlordRegistrationCompletion } from "./LandlordRegistrationCompletion";

const STEP_KEYS = ["details", "identification", "plan"] as const;
const STEP_ICONS = [UserRound, IdCard, BriefcaseBusiness] as const;

const STEP_FIELDS: Record<1 | 2, ReadonlyArray<keyof SignUpValues>> = {
  1: ["fullName"],
  2: ["telephone", "nationalId"],
};

export function SignUpWizard() {
  const t = useTranslations("auth.signUp");
  const tSession = useTranslations("auth.session");
  const searchParams = useSearchParams();
  const isRenterInvite = Boolean(searchParams.get("invite")?.trim());
  const googleAuth = useGoogleAuth();
  const startRegistration = useStartPublicLandlordRegistration();
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedPlan, setSelectedPlan] = useState<LandlordPlan>("LISTING_ONLY");
  const [registrationRequest, setRegistrationRequest] = useState<{ requestId: string; email: string } | null>(null);
  const [registrationError, setRegistrationError] = useState<string | null>(null);
  const idempotencyRef = useRef<{ fingerprint: string; key: string } | null>(null);
  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasNavigatedRef = useRef(false);

  const {
    register,
    trigger,
    getValues,
    getFieldState,
    formState: { errors },
  } = useForm<SignUpValues>({
    defaultValues: { fullName: "", email: "", telephone: "", nationalId: "" },
    mode: "onTouched",
  });

  useEffect(() => {
    if (hasNavigatedRef.current) headingRef.current?.focus();
  }, [currentStep]);

  const navigateToStep = (nextStep: number) => {
    hasNavigatedRef.current = true;
    setCurrentStep(nextStep);
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (currentStep !== 1 && currentStep !== 2) return;
    const valid = await trigger([...STEP_FIELDS[currentStep]], { shouldFocus: true });
    if (valid) navigateToStep(currentStep + 1);
  };

  const onGoogleCredential = async (idToken: string) => {
    const valid = await trigger(["fullName", "email", "telephone", "nationalId"], { shouldFocus: true });
    if (!valid) {
      if (getFieldState("fullName").invalid) navigateToStep(1);
      else if (getFieldState("email").invalid) navigateToStep(1);
      else if (getFieldState("telephone").invalid || getFieldState("nationalId").invalid) navigateToStep(2);
      return;
    }
    const values = getValues();
    googleAuth.mutate({
      idToken,
      intent: "register",
      selectedLandlordPlan: selectedPlan,
      profile: {
        name: values.fullName.trim(),
        phoneNumber: values.telephone.trim(),
        nationalId: values.nationalId.trim(),
      },
    });
  };

  const createLandlordAccount = async () => {
    setRegistrationError(null);
    const valid = await trigger(["fullName", "email", "telephone", "nationalId"], { shouldFocus: true });
    if (!valid) {
      if (getFieldState("fullName").invalid || getFieldState("email").invalid) navigateToStep(1);
      else navigateToStep(2);
      return;
    }

    const values = getValues();
    const identity = {
      name: values.fullName.trim(),
      email: values.email.trim().toLowerCase(),
      phoneNumber: values.telephone.trim(),
      nationalId: values.nationalId.trim(),
    };
    const fingerprint = JSON.stringify({ identity, selectedPlan });
    if (!idempotencyRef.current || idempotencyRef.current.fingerprint !== fingerprint) {
      idempotencyRef.current = { fingerprint, key: window.crypto.randomUUID() };
    }

    try {
      const result = await startRegistration.mutateAsync({
        identity,
        idempotencyKey: idempotencyRef.current.key,
      });
      setRegistrationRequest({ requestId: result.requestId, email: identity.email });
    } catch (cause) {
      setRegistrationError(cause instanceof Error ? cause.message : t("registrationStartFailed"));
    }
  };

  const progressSteps = STEP_KEYS.map((key, index) => ({
    key: index + 1,
    label: t(`steps.${key}.label`),
    icon: STEP_ICONS[index],
  }));

  const stepFields: Record<1 | 2, readonly SignUpField[]> = {
    1: [{
      id: "fullName",
      label: t("fields.fullName.label"),
      type: "text",
      autoComplete: "name",
      placeholder: t("fields.fullName.placeholder"),
      required: true,
    }, {
      id: "email",
      label: t("fields.email.label"),
      type: "email",
      autoComplete: "email",
      placeholder: t("fields.email.placeholder"),
      required: true,
    }],
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

  if (isRenterInvite) {
    return (
      <div className={`${AUTH_CARD_CLASS} space-y-5`}>
        <SignUpFormHeader stepLabel={t("stepCounter", { current: 1, total: 1 })} title={t("invite.unavailableTitle")} description={t("invite.unavailableDescription")} />
        <p role="status" className="rounded-xl border border-brand/20 bg-brand-tint/60 p-4 text-xs leading-relaxed text-brand-deep">
          {t("invite.backendFlowRequired")}
        </p>
        <Link href="/auth/sign-in" className="inline-flex h-11 w-full items-center justify-center rounded-xl bg-brand px-4 text-sm font-semibold text-white">
          {tSession("signIn")}
        </Link>
      </div>
    );
  }

  if (registrationRequest) {
    return (
      <LandlordRegistrationCompletion
        requestId={registrationRequest.requestId}
        email={registrationRequest.email}
        selectedPlan={selectedPlan}
      />
    );
  }

  const activeStepKey = STEP_KEYS[currentStep - 1];

  return (
    <form noValidate onSubmit={handleFormSubmit} className={AUTH_CARD_CLASS}>
      <div className="flex flex-col gap-6 sm:gap-7">
        <SignUpProgress
          currentStep={currentStep}
          steps={progressSteps}
          onSelectStep={(stepKey) => {
            if (stepKey < currentStep) navigateToStep(stepKey);
          }}
        />
        <SignUpFormHeader
          stepLabel={t("stepCounter", { current: currentStep, total: progressSteps.length })}
          title={t(`steps.${activeStepKey}.title`)}
          description={t(`steps.${activeStepKey}.description`)}
          headingRef={headingRef}
        />

        <FieldGroup className="gap-4 sm:gap-5" aria-busy={googleAuth.isPending || startRegistration.isPending}>
          {currentStep === 1 && <FirstStep fields={stepFields[1]} register={register} errors={errors} />}
          {currentStep === 2 && <SecondStep fields={stepFields[2]} register={register} errors={errors} onBack={() => navigateToStep(1)} />}
          {currentStep === 3 && (
            <ThirdStep
              selectedPlan={selectedPlan}
              onSelectPlan={setSelectedPlan}
              onCredential={onGoogleCredential}
              onCreateAccount={createLandlordAccount}
              pending={googleAuth.isPending || startRegistration.isPending}
              creatingAccount={startRegistration.isPending}
              onBack={() => navigateToStep(2)}
            />
          )}

          {registrationError && (
            <p role="alert" className="rounded-xl border border-destructive/20 bg-destructive/5 px-3.5 py-2.5 text-xs leading-relaxed text-destructive">
              {registrationError}
            </p>
          )}

          {googleAuth.isError && (
            <p role="alert" className="rounded-xl border border-destructive/20 bg-destructive/5 px-3.5 py-2.5 text-xs leading-relaxed text-destructive">
              {googleAuth.error.message || t("googleRegistrationFailed")}
            </p>
          )}

          <FieldDescription className="pt-1 text-center text-sm text-body">
            {t("footer.haveAccount")}{" "}
            <Link href="/auth/sign-in" className="font-semibold text-brand underline-offset-4 hover:text-brand-deep hover:underline">
              {t("footer.signInLink")}
            </Link>
          </FieldDescription>
        </FieldGroup>
      </div>
    </form>
  );
}
