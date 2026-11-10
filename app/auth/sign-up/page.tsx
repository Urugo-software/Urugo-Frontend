import { SignUpWizard } from "@/components/platform/auth/sign-up/SignUpWizard";

function page() {
  return (
    <div className="flex w-full items-start justify-center self-stretch">
      <SignUpWizard />
    </div>
  );
}

export default page;
