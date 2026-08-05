import Link from "next/link";

import { Button } from "@/components/ui/button";
import { Field, FieldDescription, FieldSeparator } from "@/components/ui/field";

import { SignUpGoogleIcon } from "./SignUpGoogleIcon";
import { SignUpWizardField } from "./SignUpWizardField";

const primaryButtonClassName =
  "h-11 w-full rounded-xl bg-brand text-white transition-colors duration-300 hover:bg-brand/80 cursor-pointer";
const outlineButtonClassName = "h-11 w-full rounded-xl border-ink";

type SecondStepProps = {
  fields: ReadonlyArray<{
    id: string;
    label: string;
    type: string;
    autoComplete?: string;
    placeholder?: string;
    required?: boolean;
    description?: string;
  }>;
  onBack: () => void;
};

function SecondStep({ fields, onBack }: SecondStepProps) {
  return (
    <>
      {fields.map((field) => (
        <SignUpWizardField key={field.id} {...field} />
      ))}
      <Field>
        <div className="grid gap-3 sm:grid-cols-[auto_1fr] sm:items-center">
          <Button
            type="button"
            variant="outline"
            onClick={onBack}
            className="h-11 w-full rounded-xl border-ink sm:w-32"
          >
            Back
          </Button>
          <Button type="submit" className={primaryButtonClassName}>
            Create account
          </Button>
        </div>
      </Field>
      <FieldSeparator className="text-muted-foreground">
        Or continue with
      </FieldSeparator>
      <Field>
        <Button
          variant="outline"
          type="button"
          className={outlineButtonClassName}
        >
          <SignUpGoogleIcon />
          Sign up with Google
        </Button>
        <FieldDescription className="pt-4 text-center text-sm">
          Already have an account?{" "}
          <Link
            href="/auth/sign-in"
            className="font-medium text-brand underline-offset-4 hover:underline"
          >
            Sign in
          </Link>
        </FieldDescription>
      </Field>
    </>
  );
}

export default SecondStep;
