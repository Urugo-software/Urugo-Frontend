import React from "react";

function SectionContainer({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`w-full  px-4 md:px-6 ${className || ""}`}>
      {children}
    </section>
  );
}

export default SectionContainer;
