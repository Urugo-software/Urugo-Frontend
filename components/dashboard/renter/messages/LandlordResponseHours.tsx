"use client";

import React from "react";
import { Clock } from "lucide-react";
import { landlordExtraDetails } from "@/data/landlord-profile-data";

export function LandlordResponseHours() {
  return (
    <div className="rounded-xl border border-line bg-white p-4 space-y-2">
      <div className="flex items-center gap-2 text-xs font-semibold text-ink">
        <Clock className="size-4 text-brand" /> Response Time
      </div>
      <p className="text-xs text-body">
        Usually responds within{" "}
        <span className="font-semibold text-ink">{landlordExtraDetails.responseTime}</span> during business hours ({landlordExtraDetails.officeHours}).
      </p>
    </div>
  );
}
