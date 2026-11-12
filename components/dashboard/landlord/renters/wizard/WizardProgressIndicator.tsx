"use client";

import { Check } from "lucide-react";
import {
  WizardProgressIndicatorProps,
  WizardStep,
} from "@/types/renter-wizard.types";

interface StepMeta {
  number: WizardStep;
  label: string;
  subtitle: string;
}

const STEPS: StepMeta[] = [
  { number: 1, label: "Tenancy Config", subtitle: "Property & Pricing" },
  { number: 2, label: "Renter Details", subtitle: "Register or Select" },
  { number: 3, label: "Language", subtitle: "English / Kinyarwanda" },
  { number: 4, label: "Agreement Editor", subtitle: "Review & Customize" },
];

export function WizardProgressIndicator({
  currentStep,
  onStepClick,
}: WizardProgressIndicatorProps) {
  // Percentage for progress line
  const progressLinePercent = Math.min(
    100,
    Math.max(0, ((currentStep - 1) / (STEPS.length - 1)) * 100),
  );

  return (
    <div className="border-b border-line bg-white px-4 py-6 sm:px-8">
      <div className="mx-auto max-w-3xl">
        <nav aria-label="Tenancy Creation Progress" className="relative">
          {/* Connecting Track Line */}
          <div
            aria-hidden="true"
            className="absolute left-8 right-8 top-5 sm:left-12 sm:right-12 -translate-y-1/2 z-0"
          >
            <div className="h-0.5 w-full bg-line overflow-hidden">
              <div
                className="h-full bg-ink transition-all duration-300 ease-out"
                style={{ width: `${progressLinePercent}%` }}
              />
            </div>
          </div>

          {/* Stepper Nodes */}
          <div className="relative z-10 flex items-start justify-between">
            {STEPS.map((s) => {
              const isDone = currentStep > s.number;
              const isActive = currentStep === s.number;
              const isClickable = onStepClick && (isDone || isActive);

              return (
                <button
                  key={s.number}
                  type="button"
                  disabled={!isClickable}
                  onClick={() => isClickable && onStepClick?.(s.number)}
                  aria-current={isActive ? "step" : undefined}
                  className="group flex flex-col items-center text-center cursor-pointer disabled:cursor-default focus-visible:outline-none"
                >
                  {/* Circular Node */}
                  <div
                    className={`flex size-9 sm:size-10 items-center justify-center rounded-full font-bold text-xs sm:text-sm transition-all duration-200 ${
                      isActive
                        ? " bg-white text-black ring-4 ring-brand shadow-xs"
                        : isDone
                          ? "bg-ink text-white group-hover:bg-neutral-800"
                          : "border-2 border-line bg-white text-faint"
                    }`}
                  >
                    {isDone ? (
                      <Check className="size-4 stroke-[2.5]" />
                    ) : (
                      <span>{s.number}</span>
                    )}
                  </div>

                  {/* Step Meta Info */}
                  <div className="mt-2 space-y-0.5 max-w-[80px] sm:max-w-none">
                    <span
                      className={`block text-[10px] font-bold uppercase tracking-widest ${
                        isActive
                          ? "text-ink"
                          : isDone
                            ? "text-body"
                            : "text-faint"
                      }`}
                    >
                      Step {s.number}
                    </span>
                    <span className="block text-xs sm:text-sm font-bold text-ink">
                      {s.label}
                    </span>
                    <span className="hidden md:block text-[11px] text-body">
                      {s.subtitle}
                    </span>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>
      </div>
    </div>
  );
}
