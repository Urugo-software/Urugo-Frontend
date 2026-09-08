"use client";

import React, { useState } from "react";
import { useRenterMaintenance } from "@/hooks/query/renter.hooks";
import SectionLoading from "@/components/shared/SectionLoading";
import SectionError from "@/components/shared/SectionError";
import { MaintenanceHeader } from "./MaintenanceHeader";
import { MaintenanceRequestList } from "./MaintenanceRequestList";
import { CreateMaintenanceModal } from "./CreateMaintenanceModal";

export function RenterMaintenanceView() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: items, isLoading, isError } = useRenterMaintenance();

  if (isLoading) return <SectionLoading message="Loading maintenance requests..." />;
  if (isError || !items) return <SectionError message="Unable to load maintenance records." />;

  return (
    <div className="min-h-0 flex-1 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <MaintenanceHeader onOpenModal={() => setIsModalOpen(true)} />
      <MaintenanceRequestList items={items} />
      {isModalOpen && <CreateMaintenanceModal onClose={() => setIsModalOpen(false)} />}
    </div>
  );
}
