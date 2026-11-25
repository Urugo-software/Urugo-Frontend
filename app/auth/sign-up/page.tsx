import type { Metadata } from "next";
import { Suspense } from "react";
import { SignUpWizard } from "@/components/platform/auth/sign-up/SignUpWizard";
import SectionLoading from "@/components/shared/SectionLoading";

export const metadata: Metadata = {
  title: "Create Account",
  description: "Register your landlord account on Urugo.",
};

function SignUpPage() {
  return (
    <div className="flex w-full items-center justify-center self-stretch">
      <Suspense fallback={<SectionLoading message="Loading sign-up..." />}>
        <SignUpWizard />
      </Suspense>
    </div>
  );
}

export default SignUpPage;
