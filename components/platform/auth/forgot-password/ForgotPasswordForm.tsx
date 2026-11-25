"use client";

import { ArrowLeft, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { useForm } from "react-hook-form";

import { PasswordResetUnavailableError } from "@/api/password-reset.api";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { isValidEmail } from "@/utils/auth-helpers";

import { AuthFormHeader } from "../AuthFormHeader";
import {
  AUTH_CARD_CLASS,
  AUTH_INPUT_CLASS,
  AUTH_LABEL_CLASS,
  AUTH_PRIMARY_BUTTON_CLASS,
} from "../auth-styles";

type ForgotPasswordFormProps = {
  requestCode: (email: string) => Promise<void>;
  verifyCode: (email: string, code: string) => Promise<string>;
  resetPassword: (password: string, proof: string) => Promise<void>;
};

type Step = "email" | "code" | "password" | "success";

interface ForgotPasswordValues {
  email: string;
  code: string;
  password: string;
  confirmation: string;
}

const stepContent: Record<
  Step,
  { eyebrow?: string; title: string; description: string }
> = {
  email: {
    title: "Forgot password?",
    description:
      "Enter your email address and we'll send a verification code to reset your password.",
  },
  code: {
    eyebrow: "Step 2 of 3",
    title: "Check your email",
    description:
      "If an account exists for this email, we've sent a verification code. Enter it below to continue.",
  },
  password: {
    eyebrow: "Step 3 of 3",
    title: "Create a new password",
    description: "Choose a strong new password and confirm it below.",
  },
  success: {
    title: "Password updated",
    description:
      "Your password has been reset. You can now sign in with your new password.",
  },
};

export function ForgotPasswordForm({
  requestCode,
  verifyCode,
  resetPassword,
}: ForgotPasswordFormProps) {
  const [step, setStep] = useState<Step>("email");
  const [verifiedEmail, setVerifiedEmail] = useState("");
  const [proof, setProof] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [pending, setPending] = useState(false);
  const [serverError, setServerError] = useState("");
  const [notice, setNotice] = useState("");

  const headingRef = useRef<HTMLHeadingElement>(null);
  const hasChangedStepRef = useRef(false);

  const {
    register,
    trigger,
    getValues,
    setValue,
    resetField,
    clearErrors,
    formState: { errors },
  } = useForm<ForgotPasswordValues>({
    defaultValues: {
      email: "",
      code: "",
      password: "",
      confirmation: "",
    },
    mode: "onTouched",
    shouldUnregister: false,
  });

  useEffect(() => {
    if (!hasChangedStepRef.current) return;
    headingRef.current?.focus();
  }, [step]);

  const moveToStep = (next: Step) => {
    hasChangedStepRef.current = true;
    setStep(next);
  };

  const startOver = () => {
    resetField("code");
    resetField("password");
    resetField("confirmation");
    clearErrors();
    setProof("");
    setServerError("");
    setNotice("");
    moveToStep("email");
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending) return;

    setServerError("");
    setNotice("");

    if (step === "email") {
      const valid = await trigger("email", { shouldFocus: true });
      if (!valid) return;

      const trimmedEmail = getValues("email").trim();
      setPending(true);
      try {
        await requestCode(trimmedEmail);
        setVerifiedEmail(trimmedEmail);
        setValue("email", trimmedEmail);
        resetField("code");
        moveToStep("code");
      } catch (caught) {
        setServerError(
          caught instanceof PasswordResetUnavailableError
            ? caught.message
            : "We couldn't process your request. Please try again.",
        );
      } finally {
        setPending(false);
      }
      return;
    }

    if (step === "code") {
      const valid = await trigger("code", { shouldFocus: true });
      if (!valid) return;

      const trimmedCode = getValues("code").trim();
      setPending(true);
      try {
        const resetProof = await verifyCode(verifiedEmail, trimmedCode);
        if (!resetProof) throw new Error("Missing reset authorization");
        setProof(resetProof);
        resetField("code");
        moveToStep("password");
      } catch (caught) {
        setServerError(
          caught instanceof PasswordResetUnavailableError
            ? caught.message
            : "We couldn't verify that code. Check it and try again, or request a new one.",
        );
      } finally {
        setPending(false);
      }
      return;
    }

    if (step === "password") {
      const valid = await trigger(["password", "confirmation"], {
        shouldFocus: true,
      });
      if (!valid) return;

      const nextPassword = getValues("password");
      setPending(true);
      try {
        await resetPassword(nextPassword, proof);
        resetField("password");
        resetField("confirmation");
        setProof("");
        moveToStep("success");
      } catch (caught) {
        setServerError(
          caught instanceof PasswordResetUnavailableError
            ? caught.message
            : "We couldn't reset your password. Please try again or start over.",
        );
      } finally {
        setPending(false);
      }
    }
  };

  const handleResend = async () => {
    if (pending || !verifiedEmail) return;
    setServerError("");
    setNotice("");
    setPending(true);
    try {
      await requestCode(verifiedEmail);
      resetField("code");
      setNotice(
        "If an account exists for this email, a new verification code has been sent.",
      );
    } catch (caught) {
      setServerError(
        caught instanceof PasswordResetUnavailableError
          ? caught.message
          : "We couldn't process your request. Please try again.",
      );
    } finally {
      setPending(false);
    }
  };

  const content = stepContent[step];

  return (
    <form noValidate onSubmit={handleSubmit} className={AUTH_CARD_CLASS}>
      <div className="flex flex-col gap-6 sm:gap-7">
        <AuthFormHeader
          eyebrow={content.eyebrow}
          title={content.title}
          description={content.description}
          headingRef={headingRef}
        />

        <FieldGroup className="gap-4 sm:gap-5" aria-busy={pending}>
          {step === "email" && (
            <Field data-invalid={Boolean(errors.email) || undefined}>
              <FieldLabel htmlFor="recovery-email" className={AUTH_LABEL_CLASS}>
                Email address
              </FieldLabel>
              <Input
                id="recovery-email"
                type="email"
                autoComplete="email"
                disabled={pending}
                placeholder="you@example.com"
                aria-invalid={Boolean(errors.email)}
                aria-describedby={
                  errors.email ? "recovery-email-error" : undefined
                }
                className={AUTH_INPUT_CLASS}
                {...register("email", {
                  required: "Please enter your email address.",
                  validate: (value) =>
                    isValidEmail(value) ||
                    "Please enter a valid email address.",
                })}
              />
              {errors.email?.message && (
                <FieldError
                  id="recovery-email-error"
                  className="text-xs font-medium"
                >
                  {errors.email.message}
                </FieldError>
              )}
            </Field>
          )}

          {step === "code" && (
            <>
              <Field data-invalid={Boolean(errors.code) || undefined}>
                <FieldLabel
                  htmlFor="recovery-code"
                  className={AUTH_LABEL_CLASS}
                >
                  Verification code
                </FieldLabel>
                <Input
                  id="recovery-code"
                  type="text"
                  autoComplete="one-time-code"
                  disabled={pending}
                  placeholder="Enter the code from your email"
                  aria-invalid={Boolean(errors.code)}
                  aria-describedby={
                    errors.code ? "recovery-code-error" : undefined
                  }
                  className={AUTH_INPUT_CLASS}
                  {...register("code", {
                    required: "Please enter the verification code.",
                    validate: (value) =>
                      value.trim().length > 0 ||
                      "Please enter the verification code.",
                  })}
                />
                {errors.code?.message && (
                  <FieldError
                    id="recovery-code-error"
                    className="text-xs font-medium"
                  >
                    {errors.code.message}
                  </FieldError>
                )}
              </Field>
              <p className="text-xs text-body">
                Didn&apos;t receive a code?{" "}
                <button
                  type="button"
                  onClick={handleResend}
                  disabled={pending}
                  className="cursor-pointer font-semibold text-brand underline-offset-4 hover:text-brand-deep hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Resend code
                </button>
              </p>
            </>
          )}

          {step === "password" && (
            <>
              <Field data-invalid={Boolean(errors.password) || undefined}>
                <FieldLabel htmlFor="new-password" className={AUTH_LABEL_CLASS}>
                  New password
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="new-password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="new-password"
                    disabled={pending}
                    placeholder="Enter your new password"
                    aria-invalid={Boolean(errors.password)}
                    aria-describedby={
                      errors.password ? "new-password-error" : undefined
                    }
                    className={`${AUTH_INPUT_CLASS} pr-11`}
                    {...register("password", {
                      required: "Please enter a new password.",
                      minLength: {
                        value: 8,
                        message: "Password must be at least 8 characters.",
                      },
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword((value) => !value)}
                    disabled={pending}
                    aria-label={
                      showPassword ? "Hide new password" : "Show new password"
                    }
                    aria-pressed={showPassword}
                    className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center rounded-r-xl text-faint transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    {showPassword ? (
                      <EyeOff aria-hidden="true" className="size-4" />
                    ) : (
                      <Eye aria-hidden="true" className="size-4" />
                    )}
                  </button>
                </div>
                {errors.password?.message && (
                  <FieldError
                    id="new-password-error"
                    className="text-xs font-medium"
                  >
                    {errors.password.message}
                  </FieldError>
                )}
              </Field>

              <Field data-invalid={Boolean(errors.confirmation) || undefined}>
                <FieldLabel
                  htmlFor="confirm-new-password"
                  className={AUTH_LABEL_CLASS}
                >
                  Confirm new password
                </FieldLabel>
                <div className="relative">
                  <Input
                    id="confirm-new-password"
                    type={showConfirmation ? "text" : "password"}
                    autoComplete="new-password"
                    disabled={pending}
                    placeholder="Re-enter your new password"
                    aria-invalid={Boolean(errors.confirmation)}
                    aria-describedby={
                      errors.confirmation
                        ? "confirm-new-password-error"
                        : undefined
                    }
                    className={`${AUTH_INPUT_CLASS} pr-11`}
                    {...register("confirmation", {
                      required: "Please confirm your new password.",
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords do not match. Please try again.",
                    })}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmation((value) => !value)}
                    disabled={pending}
                    aria-label={
                      showConfirmation
                        ? "Hide password confirmation"
                        : "Show password confirmation"
                    }
                    aria-pressed={showConfirmation}
                    className="absolute inset-y-0 right-0 flex w-11 cursor-pointer items-center justify-center rounded-r-xl text-faint transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
                  >
                    {showConfirmation ? (
                      <EyeOff aria-hidden="true" className="size-4" />
                    ) : (
                      <Eye aria-hidden="true" className="size-4" />
                    )}
                  </button>
                </div>
                {errors.confirmation?.message && (
                  <FieldError
                    id="confirm-new-password-error"
                    className="text-xs font-medium"
                  >
                    {errors.confirmation.message}
                  </FieldError>
                )}
              </Field>
            </>
          )}

          {serverError && (
            <p
              id="reset-error"
              role="alert"
              className="rounded-xl border border-destructive/20 bg-destructive/5 px-3.5 py-2.5 text-xs font-medium leading-relaxed text-destructive"
            >
              {serverError}
            </p>
          )}

          {notice && (
            <p
              role="status"
              className="rounded-xl border border-brand/20 bg-brand-tint/60 px-3.5 py-2.5 text-xs leading-relaxed text-brand-deep"
            >
              {notice}
            </p>
          )}

          {step !== "success" ? (
            <Field className="pt-1">
              <Button
                type="submit"
                disabled={pending}
                className={AUTH_PRIMARY_BUTTON_CLASS}
              >
                {pending
                  ? "Please wait..."
                  : step === "email"
                    ? "Send verification code"
                    : step === "code"
                      ? "Verify code"
                      : "Reset password"}
              </Button>
            </Field>
          ) : (
            <Field className="pt-1">
              <Link
                href="/auth/sign-in"
                className={`${AUTH_PRIMARY_BUTTON_CLASS} inline-flex items-center justify-center`}
              >
                Continue to sign in
              </Link>
            </Field>
          )}

          {(step === "code" || step === "password") && (
            <button
              type="button"
              onClick={startOver}
              disabled={pending}
              className="cursor-pointer text-center text-xs font-semibold text-brand underline-offset-4 hover:text-brand-deep hover:underline disabled:cursor-not-allowed disabled:opacity-50"
            >
              {step === "code" ? "Use a different email" : "Start over"}
            </button>
          )}

          {step !== "success" && (
            <FieldDescription className="pt-1 text-center text-sm text-body">
              <Link
                href="/auth/sign-in"
                className="inline-flex items-center gap-1.5 font-semibold text-brand underline-offset-4 hover:text-brand-deep hover:underline"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                <span>Back to sign in</span>
              </Link>
            </FieldDescription>
          )}
        </FieldGroup>
      </div>
    </form>
  );
}
