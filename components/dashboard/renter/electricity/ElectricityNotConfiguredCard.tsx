import React from "react";
import { ZapOff } from "lucide-react";

export function ElectricityNotConfiguredCard() {
  return (
    <div className="flex min-h-64 flex-col items-center justify-center rounded-xl border border-line bg-surface p-8 text-center">
      <div className="grid size-12 place-items-center rounded-full bg-slate-100 text-slate-500 mb-3">
        <ZapOff className="size-6" />
      </div>
      <h3 className="text-base font-bold text-ink">Electricity Monitoring Not Configured</h3>
      <p className="mt-1 max-w-md text-xs text-body">
        Your landlord has not enabled Urugo smart sub-metering for Apartment A-03.
        If you believe this is an error, please contact your property manager.
      </p>
    </div>
  );
}
