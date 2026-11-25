"use client";

import { useState } from "react";
import { howItWorksData } from "@/data/how-it-works-data";
import type { RoleType } from "@/types";
import RoleTabSelector from "./RoleTabSelector";
import StepFlowGrid from "./StepFlowGrid";
import RoleBannerCTA from "./RoleBannerCTA";

function HowItWorksTabs() {
  const [activeRole, setActiveRole] = useState<RoleType>("home_seeker");
  const currentData = howItWorksData[activeRole];

  return (
    <div className="mx-auto max-w-7xl px-6 pb-20">
      <RoleTabSelector activeRole={activeRole} onRoleChange={setActiveRole} />
      <StepFlowGrid steps={currentData.steps} roleId={activeRole} />
      <RoleBannerCTA banner={currentData.banner} roleId={activeRole} />
    </div>
  );
}

export default HowItWorksTabs;
