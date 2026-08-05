import BrandLogo from "@/components/platform/auth/BrandLogo";

function layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="grid min-h-screen grid-cols-1 lg:grid-cols-[1fr_2fr]">
      {/* urugo logo for large screen */}
      <BrandLogo />
      {children}
    </section>
  );
}

export default layout;
