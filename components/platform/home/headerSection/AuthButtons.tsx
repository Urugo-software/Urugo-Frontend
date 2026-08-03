import CustomButton from "@/components/shared/CustomButton";
import { Button } from "@/components/ui/button";

const AuthButtons = () => {
  return (
    <div className="flex gap-2 md:gap-4 items-center">
      <CustomButton
        title="Sign In"
        variant="light"
        className="bg-white border border-line"
      />
      <CustomButton
        title="Get Started"
        variant="colored"
        className="bg-brand border border-line"
      />
    </div>
  );
};

export default AuthButtons;
