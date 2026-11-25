import BrandLogo from "@/components/platform/auth/BrandLogo";
import Logo from "@/components/platform/layout/Logo";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_1.15fr]">
      <div className="absolute top-6 right-8 z-10 hidden sm:block">
        <Logo />
      </div>
      <BrandLogo />
      <div className="flex min-h-screen flex-col items-center justify-center bg-surface/70 px-4 py-8 sm:px-6 sm:py-16 lg:px-10">
        <div className="mb-6 sm:hidden">
          <Logo />
        </div>
        {children}
      </div>
    </section>
  );
}

export default layout;
