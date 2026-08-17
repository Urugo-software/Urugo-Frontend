"use client";

import { howItWorksData } from "@/data/how-it-works-data";
import { useState } from "react";

import RoleTabSelector, { RoleType } from "./RoleTabSelector";
import StepFlowGrid from "./StepFlowGrid";

function HowItWorksTabs() {
  const [activeRole, setActiveRole] = useState<RoleType>("home_seeker");
  const currentData = howItWorksData[activeRole];

  return (
    <div className="max-w-7xl mx-auto px-6 pb-20">
      {/* Role Selection Tabs */}
      <RoleTabSelector activeRole={activeRole} onRoleChange={setActiveRole} />

      {/* Steps Flow Grid */}
      <StepFlowGrid steps={currentData.steps} roleId={activeRole} />
    </div>
  );
}

export default HowItWorksTabs;
