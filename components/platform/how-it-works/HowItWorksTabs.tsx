"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";

import { howItWorksData } from "@/data/how-it-works-data";
import type { RoleType } from "@/types";
import RoleBannerCTA from "./RoleBannerCTA";
import RoleTabSelector from "./RoleTabSelector";
import StepFlowGrid from "./StepFlowGrid";

type StepKey = "1" | "2" | "3" | "4";

function HowItWorksTabs() {
  const [activeRole, setActiveRole] = useState<RoleType>("home_seeker");
  const t = useTranslations("public.howItWorks.roles");
  const currentData = howItWorksData[activeRole];

  const localizedSteps = currentData.steps.map((step) => {
    const key = String(step.stepNumber) as StepKey;
    return {
      ...step,
      title: t(`${activeRole}.steps.${key}.title`),
      description: t(`${activeRole}.steps.${key}.description`),
    };
  });

  const localizedBanner = {
    ...currentData.banner,
    title: t(`${activeRole}.banner.title`),
    description: t(`${activeRole}.banner.description`),
    ctaText: t(`${activeRole}.banner.ctaText`),
  };

  return (
    <div className="mx-auto max-w-7xl px-6 pb-20">
      <RoleTabSelector activeRole={activeRole} onRoleChange={setActiveRole} />
      <StepFlowGrid steps={localizedSteps} roleId={activeRole} />
      <RoleBannerCTA banner={localizedBanner} roleId={activeRole} />
    </div>
  );
}

export default HowItWorksTabs;
