import React from "react";

function SectionContainer({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full max-w-7xl mx-auto p-2 sm:px-4 md:px-6 ">
      {children}
    </section>
  );
}

export default SectionContainer;
