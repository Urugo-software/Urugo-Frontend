import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldSeparator,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import LoginFormHeader from "./LoginFormHeader";
import Link from "next/link";

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"form">) {
  return (
    <form
      className={cn(
        "w-full max-w-sm rounded-2xl border border-brand/10 bg-background p-5 shadow-sm sm:max-w-md sm:p-8",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col gap-6 sm:gap-8">
        <LoginFormHeader />
        <FieldGroup className="gap-4 sm:gap-5">
          <Field>
            <FieldLabel className="text-faint font-medium" htmlFor="email">
              Email / Phone Number
            </FieldLabel>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              required
              className="h-11 border-gray-400 hover:border-brand/30 hover:ring-1 hover:ring-brand/30 focus-within:outline-none focus-within:ring-2 focus-within:ring-brand"
            />
          </Field>
          <Field>
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
              <FieldLabel className="text-faint font-medium" htmlFor="password">
                Password
              </FieldLabel>
              <Link
                href="#"
                className="text-xs tracking-tight font-medium text-brand-deep underline-offset-4 transition hover:text-brand hover:underline sm:ml-auto"
              >
                Forgot your password?
              </Link>
            </div>
            <Input
              id="password"
              type="password"
              required
              placeholder="••••••••"
              className="h-11 border-gray-400 hover:border-brand/30 hover:ring-1 hover:ring-brand/30 focus-within:outline-none focus-within:ring-2 focus-within:ring-brand"
            />
          </Field>
          <Field>
            <Button
              type="submit"
              className="h-11 w-full rounded-xl bg-brand text-white hover:bg-brand-deep duration-300 cursor-pointer"
            >
              Login
            </Button>
          </Field>
          <FieldSeparator className="text-muted-foreground">
            Or continue with
          </FieldSeparator>
          <Field>
            <Button
              variant="outline"
              type="button"
              className="h-11 w-full rounded-xl cursor-pointer border-gray-400 text-gray-600"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                className="mr-2 h-4 w-4"
              >
                <path
                  fill="#EA4335"
                  d="M12 10.2v3.95h5.62c-.24 1.45-1.72 4.25-5.62 4.25-3.38 0-6.14-2.8-6.14-6.25S8.62 5.9 12 5.9c1.92 0 3.21.82 3.95 1.52l2.69-2.59C16.91 3.26 14.71 2.25 12 2.25 6.48 2.25 2 6.73 2 12.25s4.48 10 10 10c5.88 0 9.78-4.13 9.78-9.96 0-.67-.07-1.18-.16-1.69H12Z"
                />
                <path
                  fill="#FBBC05"
                  d="M3.29 7.58 6.42 9.87A6.09 6.09 0 0 1 12 5.9c1.92 0 3.21.82 3.95 1.52l2.69-2.59C16.91 3.26 14.71 2.25 12 2.25A9.96 9.96 0 0 0 3.29 7.58Z"
                />
                <path
                  fill="#34A853"
                  d="M12 22.25c2.71 0 4.98-.9 6.64-2.45l-3.07-2.52c-.82.57-1.9 1-3.57 1-3.88 0-5.36-2.78-5.61-4.2l-3.15 2.43A9.96 9.96 0 0 0 12 22.25Z"
                />
                <path
                  fill="#4285F4"
                  d="M21.78 12.29c0-.67-.07-1.18-.16-1.69H12v3.95h5.62c-.25 1.5-1.33 2.77-3.07 3.49l3.07 2.52c1.77-1.64 2.86-4.06 2.86-8.27Z"
                />
              </svg>
              Login with Google
            </Button>
            <FieldDescription className="pt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link
                href="/auth/sign-up"
                className="font-medium text-brand underline-offset-4 hover:text-brand-deep"
              >
                Sign up
              </Link>
            </FieldDescription>
          </Field>
        </FieldGroup>
      </div>
    </form>
  );
}
