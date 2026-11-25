import React from "react";

function SectionContainer({
  id,
  children,
  className,
}: {
  id?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section id={id} className={`w-full px-4 md:px-6 ${className || ""}`}>
      {children}
    </section>
  );
}

export default SectionContainer;
