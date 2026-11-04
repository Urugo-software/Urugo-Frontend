import CustomButton from "@/components/shared/CustomButton";
import Link from "next/link";

const AuthButtons = () => {
  return (
    <div className="flex gap-2 md:gap-4 items-center">
      <Link href="/auth/sign-in">
        <CustomButton
          title="Sign In"
          variant="light"
          className="hidden rounded-full md:block bg-white border border-line"
        />
      </Link>
      <Link href="/auth/sign-up">
        <CustomButton
          title="List your Property"
          variant="colored"
          className="bg-brand rounded-full border border-line"
        />
      </Link>
    </div>
  );
};

export default AuthButtons;
