import BrandLogo from "@/components/platform/auth/BrandLogo";
import Logo from "@/components/platform/layout/Logo";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_1.15fr]">
      <div className="absolute top-6 right-8 z-10 hidden items-center gap-3 sm:flex">
        <LanguageSwitcher variant="compact" shape="pill" />
        <Logo />
      </div>
      <BrandLogo />
      <div className="flex bg-surface/70 min-h-screen flex-col items-center justify-center  px-4 py-8 sm:px-6 sm:py-16 lg:px-10">
        <div className="fixed p-3  top-0 z-30 mb-6 flex w-full  max-w-md items-center justify-between gap-3 bg-surface/95  backdrop-blur sm:hidden">
          <Logo />
          <LanguageSwitcher variant="compact" shape="pill" />
        </div>
        {children}
      </div>
    </section>
  );
}

export default layout;
