import { Bed, Bath, Car, CheckCircle2, Wifi } from "lucide-react";
import { RenterProperty } from "@/types/renter";

import CardHeader from "./CardHeader";

export function PropertySpecsCard({ property }: { property: RenterProperty }) {
  const specs = [
    { label: "Bedrooms", count: property.bedrooms, icon: Bed },
    { label: "Bathrooms", count: property.bathrooms, icon: Bath },
    {
      label: "Parking",
      count: property.parking ? "Included" : "None",
      icon: Car,
    },
    {
      label: "Wifi",
      count: property.wifi ? "Included" : "None",
      icon: Wifi,
    },
  ];

  return (
    <div className=" border border-line bg-white p-5 shadow-xs md:col-span-2">
      <CardHeader title="Property Specifications" />
      <div className="grid max-sm:grid-cols-1 max-md:grid-cols-2 grid-cols-4 gap-4 border-b border-line pb-4 mb-4">
        {specs.map((item) => (
          <div
            key={item.label}
            className="flex flex-col items-center justify-center rounded-lg bg-surface p-3 text-center"
          >
            <item.icon className="size-5 text-brand mb-1" />
            <span className="text-xl font-bold text-ink">{item.count}</span>
            <span className="text-[11px] text-faint">{item.label}</span>
          </div>
        ))}
      </div>
      <div className="space-y-2">
        <span className="text-xs font-semibold text-faint">
          Included Features
        </span>
        <div className="flex flex-wrap gap-3 text-xs text-ink pt-1">
          {[
            "High-speed WiFi",
            "Water Sub-meter",
            "Secure Parking",
            "Security Gate",
          ].map((feat) => (
            <span
              key={feat}
              className="flex items-center gap-1.5 rounded-md border border-line bg-white px-2.5 py-1"
            >
              <CheckCircle2 className="size-3.5 text-emerald-500" />
              {feat}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
