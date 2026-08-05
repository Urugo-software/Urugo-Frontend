import BrandLogo from "@/components/platform/auth/BrandLogo";
import Logo from "@/components/platform/home/headerSection/Logo";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="relative grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_1.15fr]">
      {/* Logo */}
      <div className="absolute top-8 right-8 hidden sm:block">
        <Logo />
      </div>
      {/* urugo logo for large screen */}
      <BrandLogo />
      <div className="flex min-h-screen items-center justify-center bg-surface/70 px-4 py-6 sm:px-6 sm:py-10 lg:px-10">
        {children}
      </div>
    </section>
  );
}

export default layout;
