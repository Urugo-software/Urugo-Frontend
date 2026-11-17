"use client";

import { motion, useReducedMotion } from "framer-motion";
import { CreditCard } from "lucide-react";
import {
  formatRwf,
  InitialPaymentCalculation,
} from "@/types/renter-wizard.types";

interface TenancyPaymentSummaryCardProps {
  paymentSummary: InitialPaymentCalculation;
}

export function TenancyPaymentSummaryCard({
  paymentSummary,
}: TenancyPaymentSummaryCardProps) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={
        shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: 6 }
      }
      animate={
        shouldReduceMotion
          ? { opacity: 1 }
          : { opacity: 1, height: "auto", y: 0 }
      }
      exit={
        shouldReduceMotion ? { opacity: 0 } : { opacity: 0, height: 0, y: 6 }
      }
      transition={{ duration: 0.2, ease: "easeOut" }}
      className="overflow-hidden border border-line bg-white shadow-2xs"
    >
      {/* Header */}
      <div className="border-b border-line bg-surface/60 px-4 py-3.5 sm:px-5 flex items-center justify-between">
        <div className="flex items-center gap-2.5">
          <CreditCard className="size-4 text-ink" />
          <h4 className="text-[12.5px] font-semibold text-ink uppercase tracking-wider">
            Move-In Payment Breakdown
          </h4>
        </div>
        <span className="inline-flex items-center border border-line bg-white px-2 py-0.5 text-[12.5px] font-medium text-body">
          Preliminary Schedule
        </span>
      </div>

      {/* Breakdown Rows */}
      <div className="p-4 sm:p-5 space-y-3">
        <div className="flex items-center justify-between text-[12.5px]">
          <span className="text-body">Agreed Monthly Rent</span>
          <span className=" font-medium text-ink">
            {formatRwf(paymentSummary.monthlyRent)}
          </span>
        </div>

        <div className="flex items-center justify-between text-[12.5px]">
          <span className="text-body">Initial Advance Period</span>
          <span className="font-medium text-ink">
            {paymentSummary.initialMonths}{" "}
            {paymentSummary.initialMonths === 1 ? "Month" : "Months"}
          </span>
        </div>

        <div className="flex items-center justify-between text-[12.5px] border-b border-line/80 pb-3">
          <span className="text-body">
            Initial Advance Subtotal{" "}
            <span className="text-faint">
              ({formatRwf(paymentSummary.monthlyRent)} ×{" "}
              {paymentSummary.initialMonths})
            </span>
          </span>
          <span className=" font-medium text-ink">
            {formatRwf(paymentSummary.initialRentAmount)}
          </span>
        </div>

        <div className="flex items-center justify-between text-[12.5px] border-b border-line/80 pb-3">
          <span className="text-body">Refundable Security Deposit</span>
          <span className=" font-medium text-ink">
            {paymentSummary.securityDeposit > 0
              ? formatRwf(paymentSummary.securityDeposit)
              : "0 RWF (None)"}
          </span>
        </div>

        {/* Total Due Highlight Card */}
        <div className="flex items-center justify-between border border-line bg-surface/50 p-3.5">
          <div>
            <span className="block text-sm font-semibold text-ink">
              Total Initial Move-in Due
            </span>
            <span className="text-[12.5px] text-body">
              Advance rent + refundable security deposit
            </span>
          </div>
          <span className=" text-base sm:text-lg font-semibold text-ink">
            {formatRwf(paymentSummary.totalInitialAmount)}
          </span>
        </div>
      </div>
    </motion.div>
  );
}
