"use client";

export interface StepItem<T extends string = string> {
  key: T;
  label: string;
}

interface WorkflowStepIndicatorProps<T extends string = string> {
  steps: StepItem<T>[];
  currentStep: T;
}

export function WorkflowStepIndicator<T extends string>({
  steps,
  currentStep,
}: WorkflowStepIndicatorProps<T>) {
  return (
    <div className="flex items-center gap-4 border-b border-line pb-4 text-xs font-semibold uppercase tracking-wider">
      {steps.map(({ key, label }, i) => (
        <span key={key} className="flex items-center gap-2">
          {i > 0 && <span className="text-faint">&rarr;</span>}
          <span
            className={currentStep === key ? "text-brand font-bold" : "text-faint"}
          >
            {label}
          </span>
        </span>
      ))}
    </div>
  );
}
