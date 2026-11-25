"use client";

import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { StatusBadge, type StatusTone } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import type { MaintenanceStatus, RenterMaintenance } from "@/types/renter";

const TONE: Record<MaintenanceStatus, StatusTone> = {
  Pending: "warning",
  "In Progress": "info",
  Resolved: "success",
  Rejected: "danger",
};

interface MaintenanceDetailModalProps {
  item: RenterMaintenance | null;
  onClose: () => void;
}

export function MaintenanceDetailModal({
  item,
  onClose,
}: MaintenanceDetailModalProps) {
  const cancelRequest = useRenterWorkspace((s) => s.cancelMaintenanceRequest);

  if (!item) return null;

  return (
    <ModalDialog
      open
      onClose={onClose}
      title={item.title}
      description={`${item.category} · Priority: ${item.priority}`}
      footer={
        <>
          {item.status === "Pending" && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                cancelRequest(item.id);
                toast.success("Maintenance request cancelled.");
                onClose();
              }}
              className="cursor-pointer rounded-none text-rose-700 hover:bg-rose-50"
            >
              <Trash2 aria-hidden="true" className="size-4" />
              Cancel Request
            </Button>
          )}
          <Button
            type="button"
            onClick={onClose}
            className="cursor-pointer rounded-none"
          >
            Close
          </Button>
        </>
      }
    >
      <div className="space-y-4 text-sm">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <span className="text-body">Status</span>
          <StatusBadge label={item.status} tone={TONE[item.status]} />
        </div>
        <div className="flex items-center justify-between border-b border-line pb-3">
          <span className="text-body">Submitted On</span>
          <span className="font-semibold text-ink">{item.createdAt}</span>
        </div>
        <div>
          <span className="block text-xs font-semibold uppercase tracking-wider text-faint">
            Issue Description
          </span>
          <p className="mt-1.5 leading-relaxed text-ink">{item.description}</p>
        </div>
        {item.updatedNote && (
          <div className="border-l-2 border-brand-blue bg-brand-tint/30 px-3.5 py-2.5 text-xs text-ink">
            <strong className="block font-semibold">Latest Update</strong>
            <p className="mt-0.5 text-body">{item.updatedNote}</p>
          </div>
        )}
      </div>
    </ModalDialog>
  );
}
