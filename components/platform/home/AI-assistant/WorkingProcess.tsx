import { steps } from "@/data/home-data";

type WorkingProcessStepProps = {
  number: string;
  title: string;
  description: string;
  isLast?: boolean;
};

function WorkingProcessStep({
  number,
  title,
  description,
  isLast = false,
}: WorkingProcessStepProps) {
  return (
    <div className={`flex gap-4 py-4 ${isLast ? "" : "border-b border-line"}`}>
      <span className="font-mono text-xs text-faint font-semibold w-6 shrink-0">
        {number}
      </span>
      <div>
        <b className="block text-[14.5px] mb-1">{title}</b>
        <span className="text-[13px] text-body">{description}</span>
      </div>
    </div>
  );
}

function WorkingProcess() {
  return (
    <div className="flex flex-col">
      {steps.map((step, index) => (
        <WorkingProcessStep
          key={step.number}
          {...step}
          isLast={index === steps.length - 1}
        />
      ))}
    </div>
  );
}

export default WorkingProcess;
