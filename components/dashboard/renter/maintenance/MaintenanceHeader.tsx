import React from "react";
import { Plus } from "lucide-react";
import CustomButton from "@/components/shared/CustomButton";

export function MaintenanceHeader({
  onOpenModal,
}: {
  onOpenModal: () => void;
}) {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold text-ink sm:text-2xl">
          Maintenance Requests
        </h2>
        <p className="text-[15px] text-body mt-0.5">
          Report issues and track repairs for your apartment.
        </p>
      </div>
      <CustomButton
        onClick={onOpenModal}
        variant="light"
        className="px-4 py-2  rounded-none font-bold text-xs"
      >
        <span className="-translate-x-5   group-hover:text-white flex items-center">
          {" "}
          <Plus className="mr-1 size-4" /> Report New Issue
        </span>
      </CustomButton>
    </div>
  );
}
