"use client";

import { Check, type LucideIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { cn } from "@/lib/utils";

type SignUpProgressProps = {
  currentStep: number;
  steps: ReadonlyArray<{
    key: number;
    label: string;
    icon: LucideIcon;
  }>;
  onSelectStep?: (stepKey: number) => void;
};

export function SignUpProgress({
  currentStep,
  steps,
  onSelectStep,
}: SignUpProgressProps) {
  const t = useTranslations("auth.signUp.progress");

  return (
    <nav aria-label={t("ariaLabel")} className="w-full">
      <ol className="flex w-full items-start">
        {steps.map((step, index) => {
          const completed = step.key < currentStep;
          const current = step.key === currentStep;
          const Icon = completed ? Check : step.icon;
          const isInteractive = completed && Boolean(onSelectStep);
          const stepNumber = index + 1;

          const circleClassName = cn(
            "flex size-8 shrink-0 items-center justify-center rounded-full transition-colors sm:size-9",
            current && "bg-brand text-white ring-4 ring-brand/15",
            completed && "bg-brand text-white",
            !current && !completed && "bg-line text-body",
          );

          const statusKey = completed
            ? "stepCompleted"
            : current
              ? "stepCurrent"
              : "stepUpcoming";

          return (
            <li
              key={step.key}
              className={cn(
                "flex items-start",
                index < steps.length - 1 ? "flex-1" : "shrink-0",
              )}
              aria-current={current ? "step" : undefined}
            >
              <div className="flex flex-col items-center gap-1.5">
                {isInteractive ? (
                  <button
                    type="button"
                    onClick={() => onSelectStep?.(step.key)}
                    aria-label={t("returnToStep", {
                      step: stepNumber,
                      label: step.label,
                    })}
                    className={cn(
                      circleClassName,
                      "cursor-pointer hover:bg-brand-deep focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2",
                    )}
                  >
                    <Icon
                      aria-hidden="true"
                      className="size-4"
                      strokeWidth={2}
                    />
                  </button>
                ) : (
                  <span className={circleClassName}>
                    <Icon
                      aria-hidden="true"
                      className="size-4"
                      strokeWidth={1.9}
                    />
                    <span className="sr-only">
                      {t(statusKey, {
                        step: stepNumber,
                        label: step.label,
                      })}
                    </span>
                  </span>
                )}
                <span
                  className={cn(
                    "max-w-[76px] text-center text-[11px] leading-tight sm:max-w-none sm:text-xs",
                    current && "font-semibold text-brand",
                    completed && "font-medium text-ink",
                    !current && !completed && "font-normal text-faint",
                  )}
                >
                  {step.label}
                </span>
              </div>

              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "mx-2 mt-4 h-0.5 flex-1 rounded-full transition-colors sm:mt-[18px]",
                    completed ? "bg-brand" : "bg-line",
                  )}
                />
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
