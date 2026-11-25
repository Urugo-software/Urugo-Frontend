"use client";

import { Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLogin } from "@/hooks/mutate/useLogin";
import { cn } from "@/lib/utils";
import type { LoginProps } from "@/types";

import {
  AUTH_CARD_CLASS,
  AUTH_INPUT_CLASS,
  AUTH_LABEL_CLASS,
  AUTH_PRIMARY_BUTTON_CLASS,
} from "../auth-styles";
import { SignUpGoogleIcon } from "../sign-up/SignUpGoogleIcon";
import LoginFormHeader from "./LoginFormHeader";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginProps>({
    defaultValues: { identifier: "", password: "" },
    mode: "onTouched",
  });

  const { mutate, isPending } = useLogin();

  const onSubmit = (data: LoginProps) => {
    mutate({
      identifier: (data.identifier ?? "").trim(),
      password: data.password ?? "",
    });
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className={cn(AUTH_CARD_CLASS, className)}
      {...props}
    >
      <div className="flex flex-col gap-6 sm:gap-7">
        <LoginFormHeader />

        <FieldGroup className="gap-4 sm:gap-5" aria-busy={isPending}>
          <Field data-invalid={Boolean(errors.identifier) || undefined}>
            <FieldLabel htmlFor="identifier" className={AUTH_LABEL_CLASS}>
              Email or phone number
            </FieldLabel>
            <Input
              id="identifier"
              type="text"
              autoComplete="username"
              disabled={isPending}
              placeholder="you@example.com or +250 788 000 000"
              aria-invalid={Boolean(errors.identifier)}
              aria-describedby={
                errors.identifier ? "identifier-error" : undefined
              }
              className={AUTH_INPUT_CLASS}
              {...register("identifier", {
                required: "Please enter your email or phone number.",
                validate: (value) =>
                  (value ?? "").trim().length > 0 ||
                  "Please enter your email or phone number.",
              })}
            />
            {errors.identifier?.message && (
              <FieldError id="identifier-error" className="text-xs font-medium">
                {errors.identifier.message}
              </FieldError>
            )}
          </Field>

          <Field data-invalid={Boolean(errors.password) || undefined}>
            <div className="flex flex-wrap items-center justify-between gap-2">
              <FieldLabel htmlFor="password" className={AUTH_LABEL_CLASS}>
                Password
              </FieldLabel>
              <Link
                href="/auth/forgot-password"
                className="text-xs font-medium text-brand underline-offset-4 transition-colors hover:text-brand-deep hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <div className="relative">
              <Input
                id="password"
                type={showPassword ? "text" : "password"}
                autoComplete="current-password"
                disabled={isPending}
                placeholder="Enter your password"
                aria-invalid={Boolean(errors.password)}
                aria-describedby={
                  errors.password ? "password-error" : undefined
                }
                className={`${AUTH_INPUT_CLASS} pr-11`}
                {...register("password", {
                  required: "Please enter your password.",
                })}
              />
              <button
                type="button"
                disabled={isPending}
                onClick={() => setShowPassword((prev) => !prev)}
                aria-label={showPassword ? "Hide password" : "Show password"}
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
              <FieldError id="password-error" className="text-xs font-medium">
                {errors.password.message}
              </FieldError>
            )}
          </Field>

          <Field className="pt-1">
            <Button
              type="submit"
              disabled={isPending}
              className={AUTH_PRIMARY_BUTTON_CLASS}
            >
              {isPending ? "Signing in..." : "Sign in"}
            </Button>
          </Field>

          <FieldSeparator className="text-xs text-faint">
            Or continue with
          </FieldSeparator>

          <Field>
            <Button
              variant="outline"
              type="button"
              disabled
              title="Google sign-in will be enabled once authentication is connected."
              className="h-11 w-full cursor-not-allowed rounded-xl border-line text-sm font-medium text-faint"
            >
              <SignUpGoogleIcon />
              <span>Google sign-in (Coming soon)</span>
            </Button>
          </Field>

          <FieldDescription className="pt-1 text-center text-sm text-body">
            Don&apos;t have an account?{" "}
            <Link
              href="/auth/sign-up"
              className="font-semibold text-brand underline-offset-4 hover:text-brand-deep hover:underline"
            >
              Sign up
            </Link>
          </FieldDescription>
        </FieldGroup>
      </div>
    </form>
  );
}
