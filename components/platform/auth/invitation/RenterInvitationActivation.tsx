"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { CheckCircle2, KeyRound, MailCheck } from "lucide-react";
import { useActivateRenterInvitation, useResendRenterInvitation, useVerifyRenterInvitation } from "@/hooks/mutate/useRenterInvitation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  RegistrationCooldownError,
  isValidRenterActivationPassword,
  isValidRenterInvitationCapability,
  isValidRenterInvitationCode,
  isValidRenterInvitationReference,
  RegistrationInvitationRejectedError,
} from "@/utils/renter-invitation";

type Stage = "access" | "verify" | "password" | "complete";

export function RenterInvitationActivation() {
  const t = useTranslations("auth.invitationActivation");
  const [stage, setStage] = useState<Stage>("access");
  const [requestIdInput, setRequestIdInput] = useState("");
  const [capabilityInput, setCapabilityInput] = useState("");
  const [requestId, setRequestId] = useState("");
  const [capability, setCapability] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [resendSeconds, setResendSeconds] = useState(0);

  const verify = useVerifyRenterInvitation();
  const resend = useResendRenterInvitation();
  const activate = useActivateRenterInvitation();
  const isBusy = verify.isPending || resend.isPending || activate.isPending;

  useEffect(() => {
    if (resendSeconds <= 0) return;
    const timer = window.setTimeout(() => setResendSeconds((value) => value - 1), 1000);
    return () => window.clearTimeout(timer);
  }, [resendSeconds]);

  const acceptInvitation = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const normalizedRequestId = requestIdInput.trim();
    const normalizedCapability = capabilityInput.trim();
    if (!isValidRenterInvitationReference(normalizedRequestId) || !isValidRenterInvitationCapability(normalizedCapability)) {
      setError(t("invalidAccess"));
      return;
    }
    setRequestId(normalizedRequestId);
    setCapability(normalizedCapability);
    setCapabilityInput("");
    setError(null);
    setStage("verify");
  };

  const verifyCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setNotice(null);
    if (!isValidRenterInvitationCode(code)) {
      setError(t("invalidCodeFormat"));
      return;
    }
    setError(null);
    try {
      await verify.mutateAsync({ requestId, capabilityToken: capability, code });
      setCode("");
      setStage("password");
    } catch (cause) {
      setError(cause instanceof Error ? cause.message : t("verificationFailed"));
    }
  };

  const resendCode = async () => {
    setError(null);
    setNotice(null);
    try {
      await resend.mutateAsync({ requestId, capabilityToken: capability });
      setNotice(t("resendQueued"));
      setResendSeconds(60);
      setRequestIdInput(requestId);
      setRequestId("");
      setCapability("");
      setCapabilityInput("");
      setCode("");
      setStage("access");
    } catch (cause) {
      if (cause instanceof RegistrationCooldownError) {
        setError(t("resendCooldown", { seconds: cause.retryAfterSeconds }));
        setResendSeconds(cause.retryAfterSeconds);
      } else if (cause instanceof RegistrationInvitationRejectedError) {
        clearInvitation();
        setError(t("activationFailed"));
      } else {
        setError(cause instanceof Error ? cause.message : t("resendFailed"));
      }
    }
  };

  const establishPassword = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!isValidRenterActivationPassword(password)) {
      setError(t("passwordRequirements"));
      return;
    }
    if (password !== confirmation) {
      setError(t("passwordMismatch"));
      return;
    }
    setError(null);
    try {
      await activate.mutateAsync({ requestId, capabilityToken: capability, password, confirmation });
      setCapability("");
      setCapabilityInput("");
      setPassword("");
      setConfirmation("");
      setStage("complete");
    } catch (cause) {
      setCapability("");
      setCapabilityInput("");
      setRequestId("");
      setRequestIdInput("");
      setPassword("");
      setConfirmation("");
      setStage("access");
      setError(cause instanceof Error ? cause.message : t("activationFailed"));
    }
  };

  const clearInvitation = () => {
    setStage("access");
    setRequestIdInput("");
    setCapabilityInput("");
    setRequestId("");
    setCapability("");
    setCode("");
    setPassword("");
    setConfirmation("");
    setError(null);
    setNotice(null);
    setResendSeconds(0);
  };

  return (
    <section className="w-full max-w-lg border border-line bg-white p-6 shadow-sm sm:p-8">
      <div className="mb-6 flex items-center gap-3">
        <div className="flex size-10 items-center justify-center border border-line bg-surface text-brand-blue">
          {stage === "complete" ? <CheckCircle2 aria-hidden="true" className="size-5" /> : <KeyRound aria-hidden="true" className="size-5" />}
        </div>
        <div>
          <h1 className="text-xl font-bold text-ink">{t(`stages.${stage}.title`)}</h1>
          <p className="mt-1 text-sm text-body">{t(`stages.${stage}.description`)}</p>
        </div>
      </div>

      {stage === "access" && (
        <form onSubmit={acceptInvitation} className="space-y-4">
          <label className="block space-y-1.5 text-sm font-medium text-ink">
            {t("requestIdLabel")}
            <Input value={requestIdInput} onChange={(event) => setRequestIdInput(event.target.value)} autoComplete="off" required />
          </label>
          <label className="block space-y-1.5 text-sm font-medium text-ink">
            {t("capabilityLabel")}
            <Input value={capabilityInput} onChange={(event) => setCapabilityInput(event.target.value)} autoComplete="off" spellCheck={false} required />
          </label>
          <p className="text-xs leading-relaxed text-body">{t("secretHandling")}</p>
          <Button type="submit" className="w-full rounded-none">{t("continue")}</Button>
        </form>
      )}

      {stage === "verify" && (
        <form onSubmit={verifyCode} className="space-y-4">
          <label className="block space-y-1.5 text-sm font-medium text-ink">
            {t("codeLabel")}
            <Input inputMode="numeric" autoComplete="one-time-code" maxLength={6} value={code} onChange={(event) => setCode(event.target.value.replace(/\D/g, "").slice(0, 6))} required />
          </label>
          <Button type="submit" disabled={isBusy} className="w-full rounded-none">{verify.isPending ? t("verifying") : t("verify")}</Button>
          <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
            <button type="button" disabled={isBusy || resendSeconds > 0} onClick={resendCode} className="inline-flex items-center gap-2 text-brand-blue underline disabled:cursor-not-allowed disabled:opacity-50">
              <MailCheck aria-hidden="true" className="size-4" />
              {resend.isPending ? t("resending") : resendSeconds > 0 ? t("resendWait", { seconds: resendSeconds }) : t("resend")}
            </button>
            <button type="button" onClick={clearInvitation} className="text-body underline">{t("useDifferentInvitation")}</button>
          </div>
          {notice && <p role="status" className="text-sm text-emerald-800">{notice}</p>}
        </form>
      )}

      {stage === "password" && (
        <form onSubmit={establishPassword} className="space-y-4">
          <label className="block space-y-1.5 text-sm font-medium text-ink">
            {t("passwordLabel")}
            <Input type="password" autoComplete="new-password" value={password} onChange={(event) => setPassword(event.target.value)} required />
          </label>
          <label className="block space-y-1.5 text-sm font-medium text-ink">
            {t("confirmationLabel")}
            <Input type="password" autoComplete="new-password" value={confirmation} onChange={(event) => setConfirmation(event.target.value)} required />
          </label>
          <p className="text-xs text-body">{t("passwordRequirements")}</p>
          <Button type="submit" disabled={isBusy} className="w-full rounded-none">{activate.isPending ? t("activating") : t("activate")}</Button>
        </form>
      )}

      {stage === "complete" && (
        <div className="space-y-4">
          <p role="status" className="text-sm text-emerald-800">{t("activationSuccess")}</p>
          <Link href="/auth/sign-in" className="block text-center text-sm font-semibold text-brand-blue underline">{t("goToLogin")}</Link>
        </div>
      )}

      {notice && <p role="status" className="mt-4 text-sm text-emerald-800">{notice}</p>}
      {error && <p role="alert" className="mt-4 text-sm text-red-700">{error}</p>}
    </section>
  );
}
