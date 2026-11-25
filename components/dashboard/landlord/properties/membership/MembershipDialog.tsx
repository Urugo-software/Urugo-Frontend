import { lazy, Suspense, useRef, useState } from "react";
import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Dialog } from "@base-ui/react/dialog";
import { useForm, useWatch } from "react-hook-form";
import { Button } from "@/components/ui/button";
import type { MembershipValues } from "./MembershipForm";

const MembershipForm = lazy(() => import("./MembershipForm"));

export type MembershipRequest = (
  | { kind: "add"; toGroupId?: string }
  | { kind: "move" | "remove"; fromGroupId: string }
) & { propertyId?: string; returnFocusId: string };

export const membershipLabels = { add: "Add Properties", move: "Move to Group", remove: "Remove from Group" };
const confirmLabels = { add: "Confirm addition", move: "Confirm move", remove: "Confirm removal" };

function MembershipFormSkeleton({ request }: { request: MembershipRequest }) {
  const Modal = request.kind === "remove" ? AlertDialog : Dialog;
  return (
    <div role="status">
      <Modal.Description className="sr-only">Loading membership form</Modal.Description>
      <div aria-hidden="true" className="space-y-3 motion-safe:animate-pulse">
        <div className="h-4 w-3/4 rounded bg-line" />
        {request.kind === "remove" && <div className="h-4 w-1/2 rounded bg-line" />}
        {(request.kind === "add" || !request.propertyId) && <div className="h-9 rounded-lg bg-line" />}
        {request.kind === "add" && <>
          <div className="h-14 rounded-lg bg-line" />
          <div className="h-4 w-20 rounded bg-line" />
        </>}
        {(request.kind === "move" || (request.kind === "add" && !request.toGroupId)) && <div className="h-9 rounded-lg bg-line" />}
      </div>
    </div>
  );
}

export function MembershipDialog({ request, onClose }: { request: MembershipRequest; onClose: () => void }) {
  const { kind, propertyId } = request;
  const initialTargetId = request.kind === "add" ? request.toGroupId : undefined;
  const form = useForm<MembershipValues>({
    defaultValues: { propertyIds: propertyId ? [propertyId] : [], toGroupId: initialTargetId ?? "" },
  });
  const [selected, targetId] = useWatch({ control: form.control, name: ["propertyIds", "toGroupId"] });
  const [activeForm, setActiveForm] = useState<HTMLFormElement | null>(null);
  const cancelRef = useRef<HTMLButtonElement>(null);
  const Modal = kind === "remove" ? AlertDialog : Dialog;

  return (
    <Modal.Root open onOpenChange={(open) => { if (!open) onClose(); }}>
      <Modal.Portal>
        <Modal.Backdrop className="fixed inset-0 z-50 bg-black/40" />
        <Modal.Popup initialFocus={kind === "remove" && propertyId ? cancelRef : undefined}
          finalFocus={() => document.getElementById(request.returnFocusId) ?? document.getElementById("membership-heading") ?? document.getElementById("portfolio-title") ?? true}
          className="fixed left-1/2 top-1/2 z-50 max-h-[90dvh] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 space-y-4 overflow-y-auto rounded-none border border-line bg-white p-5 shadow-lg">
          <Modal.Title className="text-xl font-semibold text-ink">{membershipLabels[kind]}</Modal.Title>
          <Suspense fallback={<MembershipFormSkeleton request={request} />}>
            <MembershipForm request={request} form={form} formRef={setActiveForm} selectedPropertyId={selected[0]} onClose={onClose} />
          </Suspense>
          <div className="flex flex-wrap justify-end gap-2">
            <Button ref={cancelRef} type="button" variant="outline" className="cursor-pointer rounded-none" onClick={onClose}>Cancel</Button>
            <Button type="submit" form={activeForm?.id} variant={kind === "remove" ? "destructive" : "default"} className="cursor-pointer rounded-none"
              disabled={!activeForm || form.formState.isSubmitting || !selected.length || (kind !== "remove" && !targetId)}>{confirmLabels[kind]}</Button>
          </div>
        </Modal.Popup>
      </Modal.Portal>
    </Modal.Root>
  );
}
