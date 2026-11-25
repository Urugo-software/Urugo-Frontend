import { getTranslations } from "next-intl/server";

import { steps } from "@/data/home-data";

type StepNumberKey = "01" | "02" | "03" | "04" | "05";

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
      <span className="w-6 shrink-0 font-mono text-xs font-semibold text-faint">
        {number}
      </span>
      <div>
        <b className="mb-1 block text-[14.5px]">{title}</b>
        <span className="text-[13px] text-body">{description}</span>
      </div>
    </div>
  );
}

async function WorkingProcess() {
  const t = await getTranslations("public.home.zoeSteps");

  return (
    <div className="flex flex-col">
      {steps.map((step, index) => {
        const key = step.number as StepNumberKey;
        return (
          <WorkingProcessStep
            key={step.number}
            number={step.number}
            title={t(`${key}.title`)}
            description={t(`${key}.description`)}
            isLast={index === steps.length - 1}
          />
        );
      })}
    </div>
  );
}

export default WorkingProcess;
