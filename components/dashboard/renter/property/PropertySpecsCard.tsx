import { Bed, Bath, Car, Wifi } from "lucide-react";
import { RenterProperty } from "@/types/renter";

import CardHeader from "./CardHeader";

export function PropertySpecsCard({ property }: { property: RenterProperty }) {
  const specs = [
    { label: "Bedrooms", value: property.bedrooms, icon: Bed },
    { label: "Bathrooms", value: property.bathrooms, icon: Bath },
    {
      label: "Parking",
      value: property.parking ? "Available" : "Not included",
      icon: Car,
    },
    {
      label: "Wi-Fi",
      value: property.wifi ? "Available" : "Not included",
      icon: Wifi,
    },
  ];

  return (
    <section className=" border border-line bg-white p-5 shadow-xs md:col-span-2 sm:p-6">
      <div className="mb-5">
        <CardHeader title="Home details" />
        <p className="-mt-3 text-sm text-faint">
          Rooms and amenities for your unit
        </p>
      </div>
      <div className="grid grid-cols-1 gap-x-8 sm:grid-cols-2">
        {specs.map((item) => (
          <div
            key={item.label}
            className="flex items-center justify-between border-b border-line py-4 first:pt-0 sm:[&:nth-child(2)]:pt-0"
          >
            <div className="flex items-center gap-3">
              <span className="flex size-9 items-center justify-center rounded-md bg-surface text-body">
                <item.icon className="size-4" aria-hidden="true" />
              </span>
              <span className="text-sm font-medium text-body">
                {item.label}
              </span>
            </div>
            <span className="text-sm font-semibold text-ink">{item.value}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
