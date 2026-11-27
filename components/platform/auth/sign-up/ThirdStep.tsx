"use client";

import { ArrowLeft, Check } from "lucide-react";
import { useTranslations } from "next-intl";

import { GoogleIdentityButton } from "@/components/platform/auth/GoogleIdentityButton";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import type { LandlordPlan } from "@/types/auth";

import { AUTH_LABEL_CLASS, AUTH_SECONDARY_BUTTON_CLASS } from "../auth-styles";

type ThirdStepProps = {
  selectedPlan: LandlordPlan;
  onSelectPlan: (plan: LandlordPlan) => void;
  onCredential: (idToken: string) => void;
  onCreateAccount: () => void;
  pending: boolean;
  creatingAccount: boolean;
  onBack: () => void;
};

function ThirdStep({
  selectedPlan,
  onSelectPlan,
  onCredential,
  onCreateAccount,
  pending,
  creatingAccount,
  onBack,
}: ThirdStepProps) {
  const t = useTranslations("auth.signUp.plan");
  const tActions = useTranslations("common.actions");
  const googleConfigured = Boolean(
    process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID?.trim(),
  );

  const plans: LandlordPlan[] = ["LISTING_ONLY", "MANAGED_PLAN"];

  return (
    <>
      <Field>
        <FieldLabel className={AUTH_LABEL_CLASS}>{t("label")}</FieldLabel>
        <FieldDescription className="text-xs text-body">
          {t("description")}
        </FieldDescription>
        <div
          role="radiogroup"
          aria-label={t("label")}
          className="grid gap-3 sm:grid-cols-2"
        >
          {plans.map((plan) => (
            <button
              key={plan}
              type="button"
              role="radio"
              aria-checked={selectedPlan === plan}
              disabled={pending}
              onClick={() => onSelectPlan(plan)}
              className={`flex min-h-28 cursor-pointer flex-col items-start gap-2 rounded-xl border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand disabled:cursor-not-allowed disabled:opacity-60 ${selectedPlan === plan ? "border-brand bg-brand-tint/40" : "border-line bg-white hover:bg-surface/60"}`}
            >
              <span className="flex w-full items-center justify-between gap-2 text-sm font-semibold text-ink">
                {t(`options.${plan}.title`)}
                {selectedPlan === plan && (
                  <Check aria-hidden="true" className="size-4 text-brand" />
                )}
              </span>
              <span className="text-xs leading-relaxed text-body">
                {t(`options.${plan}.description`)}
              </span>
            </button>
          ))}
        </div>
      </Field>

      <Field className="pt-1">
        <Button
          type="button"
          disabled={pending}
          onClick={onCreateAccount}
          className="w-full py-5 rounded-sm"
        >
          {creatingAccount ? t("creatingAccount") : t("createAccount")}
        </Button>
        {googleConfigured && (
          <>
            <p className="py-1 text-center text-xs text-faint">
              {t("orContinueWith")}
            </p>
            <GoogleIdentityButton
              mode="signup_with"
              onCredential={onCredential}
              disabled={pending}
            />
          </>
        )}
      </Field>

      <Field className="pt-1">
        <Button
          type="button"
          variant="outline"
          onClick={onBack}
          className={`${AUTH_SECONDARY_BUTTON_CLASS} w-full`}
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          <span>{tActions("back")}</span>
        </Button>
      </Field>
    </>
  );
}

export default ThirdStep;
