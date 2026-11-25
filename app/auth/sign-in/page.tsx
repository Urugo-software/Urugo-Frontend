import type { Metadata } from "next";
import { LoginForm } from "@/components/platform/auth/sign-in/LoginForm";

export const metadata: Metadata = {
  title: "Sign In",
  description: "Sign in to your Urugo landlord or renter account.",
};

function page() {
  return (
    <div className="flex w-full justify-center">
      <LoginForm className="w-full" />
    </div>
  );
}

export default page;
