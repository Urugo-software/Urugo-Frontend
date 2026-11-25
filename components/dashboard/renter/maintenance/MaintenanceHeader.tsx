import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

export function MaintenanceHeader({
  onOpenModal,
}: {
  onOpenModal: () => void;
}) {
  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          Maintenance Requests
        </h2>
        <p className="mt-1 text-sm text-body">
          Report issues and track repairs for your apartment.
        </p>
      </div>
      <Button
        type="button"
        onClick={onOpenModal}
        className="h-9 cursor-pointer rounded-none px-4 text-xs font-semibold"
      >
        <Plus aria-hidden="true" className="size-4" />
        Report New Issue
      </Button>
    </div>
  );
}
