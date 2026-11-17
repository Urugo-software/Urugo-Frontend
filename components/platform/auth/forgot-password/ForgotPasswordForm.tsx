"use client";

import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";

import { PasswordResetUnavailableError } from "@/api/password-reset.api";
import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";

type ForgotPasswordFormProps = {
  requestCode: (email: string) => Promise<void>;
  verifyCode: (email: string, code: string) => Promise<string>;
  resetPassword: (password: string, proof: string) => Promise<void>;
};

type Step = "email" | "code" | "password" | "success";

const inputClassName =
  "h-11 border-gray-400 placeholder:text-sm placeholder:text-faint hover:border-brand/30 focus-visible:border-brand focus-visible:ring-brand/20";
const buttonClassName =
  "h-11 w-full rounded-xl bg-brand text-white transition-colors hover:bg-brand/80 disabled:cursor-not-allowed";

const stepContent: Record<Step, { title: string; description: string }> = {
  email: {
    title: "Forgot password?",
    description: "Enter your email address and we'll help you reset your password.",
  },
  code: {
    title: "Check your email",
    description: "If an account exists for this email, we've sent a verification code. Enter it below to continue.",
  },
  password: {
    title: "Create a new password",
    description: "Choose a new password and confirm it below.",
  },
  success: {
    title: "Password reset",
    description: "Your password has been updated. You can now sign in with your new password.",
  },
};

export function ForgotPasswordForm({ requestCode, verifyCode, resetPassword }: ForgotPasswordFormProps) {
  const [step, setStep] = useState<Step>("email");
  const [email, setEmail] = useState("");
  const [code, setCode] = useState("");
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [proof, setProof] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pending, setPending] = useState(false);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");
  const headingRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    headingRef.current?.focus();
  }, [step]);

  const startOver = () => {
    setCode("");
    setPassword("");
    setConfirmation("");
    setProof("");
    setError("");
    setNotice("");
    setStep("email");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;
    setError("");
    setNotice("");

    if (step === "password" && password !== confirmation) {
      setError("Passwords do not match. Please try again.");
      return;
    }

    setPending(true);
    try {
      if (step === "email") {
        await requestCode(email.trim());
        setEmail(email.trim());
        setCode("");
        setStep("code");
      } else if (step === "code") {
        const resetProof = await verifyCode(email, code.trim());
        if (!resetProof) throw new Error("Missing reset authorization");
        setProof(resetProof);
        setCode("");
        setStep("password");
      } else if (step === "password") {
        await resetPassword(password, proof);
        setPassword("");
        setConfirmation("");
        setProof("");
        setStep("success");
      }
    } catch (caught) {
      setError(
        caught instanceof PasswordResetUnavailableError
          ? caught.message
          : step === "email"
          ? "We couldn't process your request. Please try again."
          : step === "code"
            ? "We couldn't verify that code. Check it and try again, or request a new one."
            : "We couldn't reset your password. Please try again or restart the process.",
      );
    } finally {
      setPending(false);
    }
  };

  const handleResend = async () => {
    if (pending) return;
    setError("");
    setNotice("");
    setPending(true);
    try {
      await requestCode(email);
      setCode("");
      setNotice("If an account exists for this email, a new code has been sent.");
    } catch (caught) {
      setError(caught instanceof PasswordResetUnavailableError ? caught.message : "We couldn't process your request. Please try again.");
    } finally {
      setPending(false);
    }
  };

  const content = stepContent[step];

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl border border-brand/10 bg-background p-5 shadow-sm sm:max-w-md sm:p-8">
      <div className="flex flex-col gap-6 sm:gap-8">
        <div className="text-center sm:mt-2">
          <h1 ref={headingRef} tabIndex={-1} className="mb-3 text-2xl font-bold uppercase tracking-wider text-brand outline-none">
            {content.title}
          </h1>
          <p className="mx-auto max-w-sm text-sm leading-6 text-faint sm:text-base">{content.description}</p>
        </div>
        <FieldGroup className="gap-4 sm:gap-5" aria-busy={pending}>
          {step === "email" && (
            <Field>
              <FieldLabel htmlFor="recovery-email" className="font-medium text-faint">Email address</FieldLabel>
              <Input
                id="recovery-email" type="email" autoComplete="email" required disabled={pending}
                value={email} onChange={(event) => setEmail(event.target.value)}
                placeholder="you@example.com" className={inputClassName}
              />
            </Field>
          )}
          {step === "code" && (
            <>
              <Field>
                <FieldLabel htmlFor="recovery-code" className="font-medium text-faint">Verification code</FieldLabel>
                <Input
                  id="recovery-code" type="text" autoComplete="one-time-code" required disabled={pending}
                  value={code} onChange={(event) => setCode(event.target.value)}
                  placeholder="Enter your code" className={inputClassName}
                />
              </Field>
              <p className="text-sm text-body">Didn&apos;t receive a code?{" "}
                <button type="button" onClick={handleResend} disabled={pending} className="font-medium text-brand-deep underline-offset-4 hover:underline disabled:opacity-50">Resend code</button>
              </p>
            </>
          )}
          {step === "password" && (
            <>
              <Field>
                <FieldLabel htmlFor="new-password" className="font-medium text-faint">New password</FieldLabel>
                <div className="relative">
                  <Input
                    id="new-password" type={showPassword ? "text" : "password"} autoComplete="new-password" required disabled={pending}
                    value={password} onChange={(event) => setPassword(event.target.value)}
                    placeholder="Enter your new password" className={`${inputClassName} pr-12`}
                  />
                  <button type="button" onClick={() => setShowPassword((value) => !value)} disabled={pending} aria-label={showPassword ? "Hide new password" : "Show new password"} aria-pressed={showPassword} className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-faint hover:text-brand focus-visible:outline-2 focus-visible:outline-brand">
                    {showPassword ? <EyeOff aria-hidden="true" className="size-4" /> : <Eye aria-hidden="true" className="size-4" />}
                  </button>
                </div>
              </Field>
              <Field>
                <FieldLabel htmlFor="confirm-new-password" className="font-medium text-faint">Confirm new password</FieldLabel>
                <div className="relative">
                  <Input
                    id="confirm-new-password" type={showConfirmation ? "text" : "password"} autoComplete="new-password" required disabled={pending}
                    value={confirmation} onChange={(event) => setConfirmation(event.target.value)}
                    placeholder="Confirm your new password" className={`${inputClassName} pr-12`}
                    aria-invalid={!!error && password !== confirmation}
                    aria-describedby={error && password !== confirmation ? "reset-error" : undefined}
                  />
                  <button type="button" onClick={() => setShowConfirmation((value) => !value)} disabled={pending} aria-label={showConfirmation ? "Hide password confirmation" : "Show password confirmation"} aria-pressed={showConfirmation} className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-faint hover:text-brand focus-visible:outline-2 focus-visible:outline-brand">
                    {showConfirmation ? <EyeOff aria-hidden="true" className="size-4" /> : <Eye aria-hidden="true" className="size-4" />}
                  </button>
                </div>
              </Field>
            </>
          )}
          {error && <p id="reset-error" role="alert" className="text-sm text-destructive">{error}</p>}
          {notice && <p role="status" className="text-sm text-body">{notice}</p>}
          {step !== "success" && (
            <Field>
              <Button type="submit" disabled={pending} className={buttonClassName}>
                {pending ? "Please wait..." : step === "email" ? "Send code" : step === "code" ? "Verify code" : "Reset password"}
              </Button>
            </Field>
          )}
          {(step === "code" || step === "password") && (
            <button type="button" onClick={startOver} disabled={pending} className="text-center text-sm font-medium text-brand-deep underline-offset-4 hover:underline disabled:opacity-50">
              {step === "code" ? "Use a different email" : "Start over"}
            </button>
          )}
          <FieldDescription className="text-center text-sm">
            <Link href="/auth/sign-in" className="inline-flex items-center gap-2 font-medium text-brand underline-offset-4 hover:underline">
              <ArrowLeft aria-hidden="true" className="size-4" /> Back to sign in
            </Link>
          </FieldDescription>
        </FieldGroup>
      </div>
    </form>
  );
}
