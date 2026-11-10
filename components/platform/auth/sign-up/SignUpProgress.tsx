import { Check, type LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type SignUpProgressProps = {
  currentStep: number;
  steps: ReadonlyArray<{
    key: number;
    label: string;
    icon: LucideIcon;
  }>;
};

export function SignUpProgress({ currentStep, steps }: SignUpProgressProps) {
  return (
    <nav aria-label="Sign up progress" className="w-full">
      <ol className="flex w-full items-center">
        {steps.map((step, index) => {
          const completed = step.key < currentStep;
          const current = step.key === currentStep;
          const Icon = completed ? Check : step.icon;

          return (
            <li
              key={step.key}
              className={cn("flex items-center", index < steps.length - 1 && "flex-1")}
              aria-current={current ? "step" : undefined}
            >
              <span
                className={cn(
                  "flex size-8 shrink-0 items-center justify-center rounded-full sm:size-9",
                  current || completed
                    ? "bg-brand text-white"
                    : "bg-line text-body",
                )}
              >
                <Icon aria-hidden="true" className="size-4" strokeWidth={1.8} />
                <span className="sr-only">
                  Step {index + 1}: {step.label},{" "}
                  {completed ? "completed" : current ? "current step" : "upcoming"}
                </span>
              </span>
              {index < steps.length - 1 && (
                <span
                  aria-hidden="true"
                  className={cn(
                    "h-0.5 flex-1",
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
