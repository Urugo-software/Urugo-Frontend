"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { CheckCircle2, MailCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  useCompletePublicLandlordRegistration,
  useResendPublicLandlordRegistration,
  useVerifyPublicLandlordRegistration,
} from "@/hooks/mutate/usePublicLandlordRegistration";
import type { LandlordPlan } from "@/types/auth";
import {
  isValidRenterActivationPassword,
  isValidRenterInvitationCapability,
  isValidRenterInvitationCode,
  RegistrationCooldownError,
  RegistrationInvitationRejectedError,
} from "@/utils/renter-invitation";

type Props = {
  requestId: string;
  email: string;
  selectedPlan: LandlordPlan;
};

export function LandlordRegistrationCompletion({ requestId, email, selectedPlan }: Props) {
  const t = useTranslations("auth.landlordRegistration");
  const verify = useVerifyPublicLandlordRegistration();
  const resend = useResendPublicLandlordRegistration();
  const complete = useCompletePublicLandlordRegistration();
  const [capability, setCapability] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [stage, setStage] = useState<"verify" | "password" | "complete">("verify");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [resendSeconds, setResendSeconds] = useState(0);
  const isBusy = verify.isPending || resend.isPending || complete.isPending;

  useEffect(() => {
    if (resendSeconds <= 0) return;
    const timer = window.setTimeout(() => setResendSeconds((seconds) => seconds - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [resendSeconds]);

  const verifyEmail = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setNotice(null);
    const normalizedCapability = capability.trim();
    if (!isValidRenterInvitationCapability(normalizedCapability)) {
      setError(t("invalidCapability"));
      return;
    }
    if (!isValidRenterInvitationCode(code)) {
      setError(t("invalidCode"));
      return;
    }
    try {
      await verify.mutateAsync({ requestId, capabilityToken: normalizedCapability, code });
      setCapability(normalizedCapability);
      setCode("");
      setStage("password");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : t("verificationFailed"));
    }
  };

  const resendCode = async () => {
    setError(null);
    setNotice(null);
    const normalizedCapability = capability.trim();
    if (!isValidRenterInvitationCapability(normalizedCapability)) {
      setError(t("invalidCapability"));
      return;
    }
    try {
      await resend.mutateAsync({ requestId, capabilityToken: normalizedCapability });
      setCapability("");
      setCode("");
      setNotice(t("resendQueued"));
      setResendSeconds(60);
    } catch (cause) {
      if (cause instanceof RegistrationCooldownError) {
        setError(t("resendCooldown", { seconds: cause.retryAfterSeconds }));
        setResendSeconds(cause.retryAfterSeconds);
      } else if (cause instanceof RegistrationInvitationRejectedError) {
        setCapability("");
        setCode("");
        setError(t("verificationFailed"));
      } else {
        setError(cause instanceof Error ? cause.message : t("resendFailed"));
      }
    }
  };

  const setAccountPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    if (!isValidRenterActivationPassword(password)) {
      setError(t("passwordRequirements"));
      return;
    }
    if (password !== confirmation) {
      setError(t("passwordMismatch"));
      return;
    }
    try {
      await complete.mutateAsync({
        requestId,
        capabilityToken: capability,
        password,
        confirmation,
        selectedLandlordPlan: selectedPlan,
      });
      setCapability("");
      setCode("");
      setPassword("");
      setConfirmation("");
      setStage("complete");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : t("completionFailed"));
    }
  };

  return (
    <section className="w-full max-w-lg border border-line bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center border border-line bg-surface text-brand-blue">
          {stage === "complete" ? <CheckCircle2 aria-hidden="true" className="size-5" /> : <MailCheck aria-hidden="true" className="size-5" />}
        </div>
        <div>
          <h1 className="text-xl font-bold text-ink">{t(`stages.${stage}.title`)}</h1>
          <p className="mt-1 text-sm text-body">{t(`stages.${stage}.description`, { email })}</p>
        </div>
      </div>

      {stage === "verify" && (
        <form onSubmit={verifyEmail} className="space-y-4">
          <p role="status" className="rounded-lg border border-brand/20 bg-brand-tint/40 p-3 text-xs leading-relaxed text-body">
            {t("queuedNotice")}
          </p>
          <p className="break-all text-xs text-body">{t("requestReference", { requestId })}</p>
          <label className="block space-y-1.5 text-sm font-medium text-ink">
            {t("capabilityLabel")}
            <Input autoComplete="off" spellCheck={false} value={capability} onChange={(event) => setCapability(event.target.value.trim())} required />
          </label>
          <p className="text-xs text-body">{t("capabilityHandling")}</p>
          <label className="block space-y-1.5 text-sm font-medium text-ink">
            {t("codeLabel")}
            <Input inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} required />
          </label>
          <Button type="submit" disabled={isBusy} className="w-full rounded-none">
            {verify.isPending ? t("verifying") : t("verify")}
          </Button>
          <button type="button" disabled={isBusy || resendSeconds > 0} onClick={resendCode} className="mx-auto flex items-center gap-2 text-sm text-brand-blue underline disabled:cursor-not-allowed disabled:opacity-50">
            {resend.isPending ? t("resending") : resendSeconds > 0 ? t("resendWait", { seconds: resendSeconds }) : t("resend")}
          </button>
          {notice && <p role="status" className="text-sm text-emerald-800">{notice}</p>}
        </form>
      )}

      {stage === "password" && (
        <form onSubmit={setAccountPassword} className="space-y-4">
          <label className="block space-y-1.5 text-sm font-medium text-ink">
            {t("passwordLabel")}
            <Input type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          <label className="block space-y-1.5 text-sm font-medium text-ink">
            {t("confirmationLabel")}
            <Input type="password" autoComplete="new-password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} required />
          </label>
          <p className="text-xs text-body">{t("passwordRequirements")}</p>
          <Button type="submit" disabled={isBusy} className="w-full rounded-none">
            {complete.isPending ? t("completing") : t("complete")}
          </Button>
        </form>
      )}

      {stage === "complete" && (
        <div className="space-y-4">
          <p role="status" className="text-sm text-emerald-800">{t("success")}</p>
          <Link href="/auth/sign-in" className="block text-center text-sm font-semibold text-brand-blue underline">{t("signIn")}</Link>
        </div>
      )}

      {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
    </section>
  );
}
