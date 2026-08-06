import CustomButton from "@/components/shared/CustomButton";
import Link from "next/link";

const AuthButtons = () => {
  return (
    <div className="flex gap-2 md:gap-4 items-center">
      <Link href="/auth/sign-in">
        <CustomButton
          title="Sign In"
          variant="light"
          className="hidden md:block bg-white border border-line"
        />
      </Link>
      <Link href="/auth/sign-up">
        <CustomButton
          title="Get Started"
          variant="colored"
          className="bg-brand border border-line"
        />
      </Link>
    </div>
  );
};

export default AuthButtons;
