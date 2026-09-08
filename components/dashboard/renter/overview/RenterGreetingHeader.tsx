import React from "react";

interface RenterGreetingHeaderProps {
  name: string;
  unitNumber: string;
  propertyName: string;
}

export function RenterGreetingHeader({
  name,
  unitNumber,
  propertyName,
}: RenterGreetingHeaderProps) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-4">
      <div>
        <h2 className="mb-1 text-xl font-bold text-ink sm:text-2xl">
          Good morning, {name}
        </h2>
        <p className="text-[15px] text-body">
          {propertyName} · Unit{" "}
          <span className="font-semibold">{unitNumber}</span>
        </p>
      </div>
    </div>
  );
}
