"use client";

import { Check, ShieldCheck } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { WizardProgressIndicatorProps } from "../types/renter-wizard.types";

export function WizardProgressIndicator({
  currentStep,
  isReviewing,
  onStepClick,
}: WizardProgressIndicatorProps) {
  const shouldReduceMotion = useReducedMotion();

  const isStep1Done = currentStep > 1 || isReviewing;
  const isStep1Active = currentStep === 1 && !isReviewing;

  const isStep2Done = isReviewing;
  const isStep2Active = currentStep === 2 && !isReviewing;

  // Percentage for progress line: 0% when on step 1, 100% when past step 1
  const progressLinePercent = isStep1Done ? 100 : 0;

  return (
    <div className="border-b border-line bg-white px-4 py-7 sm:px-10">
      <div className="mx-auto max-w-xl">
        <nav aria-label="Registration Progress" className="relative">
          {/* Connecting Track Line behind the circles */}
          <div
            aria-hidden="true"
            className="absolute left-12 right-12 top-5 sm:left-14 sm:right-14 -translate-y-1/2 z-0"
          >
            <div className="h-0.5 w-full bg-line overflow-hidden">
              <motion.div
                className="h-full bg-ink"
                initial={false}
                animate={{ width: `${progressLinePercent}%` }}
                transition={
                  shouldReduceMotion
                    ? { duration: 0 }
                    : { duration: 0.35, ease: "easeOut" }
                }
              />
            </div>
          </div>

          {/* Stepper Circular Nodes */}
          <div className="relative z-10 flex items-start justify-between">
            {/* Step 1 Circle & Label */}
            <button
              type="button"
              disabled={!onStepClick || isStep1Active}
              onClick={() => onStepClick?.(1)}
              aria-current={isStep1Active ? "step" : undefined}
              className="group flex flex-col items-center text-center cursor-pointer disabled:cursor-default focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
            >
              {/* Circular Badge */}
              <div
                className={`flex size-10 sm:size-11 items-center justify-center rounded-full font-bold text-sm transition-all duration-200 ${
                  isStep1Active
                    ? "bg-ink text-white ring-4 ring-neutral-200 shadow-sm"
                    : isStep1Done
                      ? "bg-ink text-white group-hover:bg-neutral-800"
                      : "border-2 border-line bg-white text-faint"
                }`}
              >
                {isStep1Done ? (
                  <Check className="size-5 stroke-[2.5]" />
                ) : (
                  <span>1</span>
                )}
              </div>

              {/* Step Meta Info */}
              <div className="mt-2.5 space-y-0.5 max-w-[130px] sm:max-w-none">
                <span
                  className={`block text-[11px] font-bold uppercase tracking-widest ${
                    isStep1Active
                      ? "text-ink"
                      : isStep1Done
                        ? "text-body"
                        : "text-faint"
                  }`}
                >
                  Step 1
                </span>
                <span className="block text-sm font-bold text-ink">
                  Renter Details
                </span>
                <span className="hidden sm:block text-xs text-body">
                  Identity & Contact
                </span>
              </div>
            </button>

            {/* Step 2 Circle & Label */}
            <button
              type="button"
              disabled={!onStepClick || (!isStep1Done && !isStep2Active)}
              onClick={() => onStepClick?.(2)}
              aria-current={isStep2Active ? "step" : undefined}
              className={`group flex flex-col items-center text-center ${
                isStep1Done
                  ? "cursor-pointer"
                  : "cursor-default"
              } focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2`}
            >
              {/* Circular Badge */}
              <div
                className={`flex size-10 sm:size-11 items-center justify-center rounded-full font-bold text-sm transition-all duration-200 ${
                  isStep2Active
                    ? "bg-ink text-white ring-4 ring-neutral-200 shadow-sm"
                    : isStep2Done
                      ? "bg-ink text-white group-hover:bg-neutral-800"
                      : "border-2 border-line bg-white text-faint"
                }`}
              >
                {isStep2Done ? (
                  <Check className="size-5 stroke-[2.5]" />
                ) : (
                  <span>2</span>
                )}
              </div>

              {/* Step Meta Info */}
              <div className="mt-2.5 space-y-0.5 max-w-[130px] sm:max-w-none">
                <span
                  className={`block text-[11px] font-bold uppercase tracking-widest ${
                    isStep2Active
                      ? "text-ink"
                      : isStep2Done
                        ? "text-body"
                        : "text-faint"
                  }`}
                >
                  Step 2
                </span>
                <span className="block text-sm font-bold text-ink">
                  Tenancy & Terms
                </span>
                <span className="hidden sm:block text-xs text-body">
                  Property & Rent
                </span>
              </div>
            </button>
          </div>
        </nav>

        {isReviewing && (
          <div className="mt-6 flex justify-center">
            <div className="inline-flex items-center gap-2 border border-line bg-surface px-3.5 py-1.5 text-xs font-semibold text-ink">
              <ShieldCheck className="size-4 text-ink" />
              <span>Review & Confirmation Stage</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
