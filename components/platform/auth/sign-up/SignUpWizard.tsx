"use client";

import { Building2, Camera, Home, IdCard, ShieldCheck, UserRound } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

import { Button } from "@/components/ui/button";
import { FieldDescription, FieldGroup } from "@/components/ui/field";
import { signUpSteps } from "@/data/home-data";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { LandlordServiceMode } from "@/types/landlord";

import FirstStep from "./FirstStep";
import SecondStep from "./SecondStep";
import SignUpFormHeader from "./SignUpFormHeader";
import { SignUpProgress } from "./SignUpProgress";
import type { SignUpValues } from "./SignUpWizardField";
import ThirdStep from "./ThirdStep";

type OnboardingPath = "home_seeker" | LandlordServiceMode;

const ONBOARDING_OPTIONS: Array<{
  id: OnboardingPath;
  label: string;
  desc: string;
  icon: typeof Home;
}> = [
  {
    id: "home_seeker",
    label: "Home Seeker",
    desc: "Browse listings, save favorites, and request property viewings.",
    icon: Home,
  },
  {
    id: "listing_only",
    label: "Landlord — Listing Only",
    desc: "Advertise properties, receive inquiries, and manage viewing requests independently.",
    icon: Building2,
  },
  {
    id: "managed",
    label: "Landlord — Full Rental Management",
    desc: "Advertise properties plus manage renters, leases, payments, and rental history.",
    icon: ShieldCheck,
  },
];

const progressSteps = signUpSteps.map((step, index) => ({
  ...step,
  icon: [UserRound, IdCard, Camera][index],
}));

export function SignUpWizard() {
  const router = useRouter();
  const setServiceMode = useLandlordWorkspace((s) => s.setServiceMode);
  const updateProfile = useLandlordWorkspace((s) => s.updateProfile);

  const [accountPath, setAccountPath] = useState<OnboardingPath>("listing_only");
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
    if (accountPath === "listing_only" || accountPath === "managed") {
      setServiceMode(accountPath);
      if (values.fullName.trim() || values.email.trim()) {
        updateProfile({
          ...(values.fullName.trim() ? { fullName: values.fullName.trim() } : {}),
          ...(values.email.trim() ? { email: values.email.trim() } : {}),
          ...(values.telephone.trim() ? { phone: values.telephone.trim() } : {}),
        });
      }
    }
    // Backend registration API is not connected yet.
    setSubmissionNotice(true);
  };

  const goBack = () => {
    setSubmissionNotice(false);
    setCurrentStep((previous) => previous - 1);
  };

  const isLandlordPath =
    accountPath === "listing_only" || accountPath === "managed";

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
            <>
              <div className="space-y-2">
                <p className="text-xs font-semibold uppercase tracking-wider text-faint">
                  How will you use Urugo?
                </p>
                <div role="radiogroup" aria-label="Account service path" className="grid gap-2">
                  {ONBOARDING_OPTIONS.map(({ id, label, desc, icon: Icon }) => {
                    const selected = accountPath === id;
                    return (
                      <button
                        key={id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => setAccountPath(id)}
                        className={`flex cursor-pointer items-start gap-3 border p-3 text-left transition-colors ${
                          selected
                            ? "border-brand-blue bg-brand-tint/60"
                            : "border-line bg-white hover:bg-surface"
                        }`}
                      >
                        <Icon
                          aria-hidden="true"
                          className={`mt-0.5 size-4 shrink-0 ${
                            selected ? "text-brand-blue" : "text-faint"
                          }`}
                        />
                        <div className="min-w-0">
                          <div className="text-xs font-bold text-ink">{label}</div>
                          <div className="mt-0.5 text-xs leading-snug text-body">
                            {desc}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
              <FirstStep
                fields={signUpSteps[0].fields}
                values={values}
                onChange={updateValue}
              />
            </>
          )}
          {currentStep === 2 && (
            <SecondStep
              fields={signUpSteps[1].fields}
              values={values}
              onChange={updateValue}
              onBack={goBack}
            />
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
            <div
              role="status"
              className="space-y-3 border border-blue-200 bg-brand-tint p-4 text-xs leading-5 text-brand-deep"
            >
              <p>
                Backend account registration is not connected yet. Your{" "}
                <strong>
                  {accountPath === "listing_only"
                    ? "Listing-Only Landlord"
                    : accountPath === "managed"
                      ? "Managed Landlord"
                      : "Home Seeker"}
                </strong>{" "}
                workspace preference has been configured locally for preview.
              </p>
              <Button
                type="button"
                onClick={() =>
                  router.push(isLandlordPath ? "/landlord" : "/home-seeker")
                }
                className="w-full cursor-pointer rounded-none"
              >
                Continue to {isLandlordPath ? "Landlord" : "Home Seeker"} Dashboard
              </Button>
            </div>
          )}
          <FieldDescription className="text-center text-sm">
            Already have an account?{" "}
            <Link
              href="/auth/sign-in"
              className="font-medium text-brand underline-offset-4 hover:underline"
            >
              Sign in
            </Link>
          </FieldDescription>
        </FieldGroup>
      </div>
    </form>
  );
}
