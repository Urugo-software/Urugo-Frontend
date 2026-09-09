"use client";

import React from "react";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";

interface Props {
  isPending: boolean;
}

export function PayRentFooterActions({ isPending }: Props) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-6">
      <div className="flex items-center gap-2 text-xs text-faint">
        <ShieldCheck className="size-4 text-emerald-600" />
        Secure Payment Processing
      </div>
      <div className="flex items-center gap-3">
        <Link
          href="/renter/payments"
          className="rounded-none border border-line px-5 py-2.5 text-xs font-bold text-body hover:bg-surface transition-colors"
        >
          Cancel
        </Link>
        <CustomButton
          type="submit"
          disabled={isPending}
          variant="light"
          className="px-6 py-2.5 rounded-none"
        >
          <span className="text-sm -translate-x-5 group-hover:text-white">
            {isPending ? "Processing..." : "Confirm & Pay Rent"}
          </span>
        </CustomButton>
      </div>
    </div>
  );
}
