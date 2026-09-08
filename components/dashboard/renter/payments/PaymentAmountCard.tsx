"use client";

import React from "react";
import { Calendar, Home } from "lucide-react";

interface Props {
  amountRwf: number;
  period: string;
  unitNumber: string;
}

export function PaymentAmountCard({ amountRwf, period, unitNumber }: Props) {
  return (
    <div className="my-8 rounded-xl border border-line bg-surface p-4 flex flex-wrap items-center justify-between gap-3">
      <div className="flex items-center gap-3">
        <div>
          <div className="text-[15px] font-bold text-ink">Rental Period</div>
          <div className="text-xs mt-1 text-body flex items-center gap-1.5 ">
            <Calendar className="size-3.5 text-faint" />
            {period} &bull; {unitNumber}
          </div>
        </div>
      </div>
      <div className="text-right">
        <span className="text-[11px] font-medium uppercase tracking-wider text-faint">
          Amount Due
        </span>
        <div className="text-lg font-bold text-ink">
          RWF {amountRwf.toLocaleString()}
        </div>
      </div>
    </div>
  );
}
