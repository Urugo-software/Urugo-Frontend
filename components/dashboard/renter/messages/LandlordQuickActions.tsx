"use client";

import React from "react";
import { Phone, ShieldAlert } from "lucide-react";
import Link from "next/link";

export function LandlordQuickActions({ phone }: { phone: string }) {
  return (
    <div className="pt-2 space-y-2">
      <a
        href={`tel:${phone}`}
        className="flex w-full items-center justify-center gap-2 rounded-xl bg-brand py-2.5 text-xs font-bold text-white hover:bg-brand/90 transition-colors"
      >
        <Phone className="size-4" /> Call Landlord
      </a>
      <Link
        href="/renter/maintenance"
        className="flex w-full items-center justify-center gap-2 rounded-xl border border-line py-2.5 text-xs font-bold text-body hover:bg-surface transition-colors"
      >
        <ShieldAlert className="size-4 text-rose-500" /> Report Maintenance Issue
      </Link>
    </div>
  );
}
