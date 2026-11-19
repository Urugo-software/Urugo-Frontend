import { useRef } from "react";
import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Dialog } from "@base-ui/react/dialog";
import { Controller, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { partitionProperties } from "@/utils/property-groups";
import { PropertyChecklist } from "./PropertyChecklist";

export type MembershipRequest = (
  | { kind: "add"; toGroupId?: string }
  | { kind: "move" | "remove"; fromGroupId: string }
) & { propertyId?: string; returnFocusId: string };

export const membershipLabels = { add: "Add Properties", move: "Move to Group", remove: "Remove from Group" };
const confirmLabels = { add: "Confirm addition", move: "Confirm move", remove: "Confirm removal" };
const feedback = { id: "landlord-property-membership" };
const selectStyle = "h-9 w-full cursor-pointer rounded-lg border border-input bg-white px-2 text-sm focus-visible:outline-ring";

interface MembershipFields {
  propertyIds: string[];
  toGroupId: string;
}

export function MembershipDialog({ request, onClose }: { request: MembershipRequest; onClose: () => void }) {
  const { groups, properties, changeMembership } = useLandlordProperties();
  const { kind, propertyId } = request;
  const sourceId = request.kind === "add" ? null : request.fromGroupId;
  const fixedTargetId = request.kind === "add" ? request.toGroupId : undefined;
  const { byGroup, ungrouped } = partitionProperties(groups, properties);
  const eligible = sourceId === null ? ungrouped : (byGroup.get(sourceId) ?? []);
  const destinations = groups.filter((group) => group.id !== sourceId);
  const { control, register, handleSubmit, formState: { isSubmitting } } = useForm<MembershipFields>({
    defaultValues: { propertyIds: propertyId ? [propertyId] : [], toGroupId: fixedTargetId ?? "" },
  });
  const [selected, targetId] = useWatch({ control, name: ["propertyIds", "toGroupId"] });
  const propertyName = properties.find((property) => property.id === selected[0])?.name;
  const groupName = groups.find((group) => group.id === (fixedTargetId ?? sourceId))?.name;
  const cancelRef = useRef<HTMLButtonElement>(null);
  const Modal = kind === "remove" ? AlertDialog : Dialog;

  function submit(fields: MembershipFields) {
    const toGroupId = kind === "remove" ? null : fields.toGroupId;
    const result = changeMembership({ propertyIds: fields.propertyIds, fromGroupId: sourceId, toGroupId });
    if ("error" in result) {
      toast.error(result.error, feedback);
    } else if (kind === "remove") {
      toast.success(`${propertyName ?? "The property"} is now under Ungrouped Properties.`, feedback);
    } else {
      const destination = groups.find((group) => group.id === toGroupId)?.name ?? "the selected group";
      const subject = result.count === 1 ? (propertyName ?? "1 property") : `${result.count} properties`;
      toast.success(`${kind === "add" ? "Added" : "Moved"} ${subject} to ${destination}.`, feedback);
    }
    onClose();
  }

  return (
    <Modal.Root open onOpenChange={(open) => { if (!open) onClose(); }}>
      <Modal.Portal>
        <Modal.Backdrop className="fixed inset-0 z-50 bg-black/40" />
        <Modal.Popup initialFocus={kind === "remove" && propertyId ? cancelRef : undefined}
          finalFocus={() => document.getElementById(request.returnFocusId) ?? document.getElementById("membership-heading") ?? document.getElementById("portfolio-title") ?? true}
          className="fixed left-1/2 top-1/2 z-50 max-h-[90dvh] w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 space-y-4 overflow-y-auto rounded-xl border border-line bg-white p-5 shadow-lg">
          <Modal.Title className="text-xl font-semibold text-ink">{membershipLabels[kind]}</Modal.Title>
          <Modal.Description className="text-sm text-body">
            {kind === "add" && (groupName ? `Select properties to add to ${groupName}.` : "Choose a group and the properties to add.")}
            {kind === "move" && `Move ${propertyName ?? "a property"} from ${groupName ?? "this group"} to another group.`}
            {kind === "remove" && `After removal from ${groupName ?? "this group"}, ${propertyName ?? "the property"} will remain in Urugo under Ungrouped Properties. Its units, renters, tenancy history, agreements and payments will be kept.`}
          </Modal.Description>
          <form noValidate onSubmit={handleSubmit(submit)} className="space-y-4">
            {(kind === "add" || !propertyId) && <Controller control={control} name="propertyIds" render={({ field }) => {
              if (kind === "add") return <PropertyChecklist properties={eligible} selected={field.value} onChange={field.onChange} />;
              return (
                <Field>
                  <FieldLabel htmlFor="membership-property">Property</FieldLabel>
                  <select id="membership-property" ref={field.ref} value={field.value[0] ?? ""} className={selectStyle}
                    onBlur={field.onBlur} onChange={(event) => field.onChange(event.target.value ? [event.target.value] : [])}>
                    <option value="">Choose a property</option>
                    {eligible.map((property) => <option key={property.id} value={property.id}>{property.name} · {property.location}</option>)}
                  </select>
                </Field>
              );
            }} />}
            {kind !== "remove" && !fixedTargetId && <Field>
              <FieldLabel htmlFor="membership-target">Destination group</FieldLabel>
              <select id="membership-target" className={selectStyle} {...register("toGroupId", { required: true })}>
                <option value="">Choose a group</option>
                {destinations.map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}
              </select>
              {!destinations.length && <p className="text-sm text-body">Create another group to move this property.</p>}
            </Field>}
            <div className="flex flex-wrap justify-end gap-2">
              <Button ref={cancelRef} type="button" variant="outline" className="cursor-pointer" onClick={onClose}>Cancel</Button>
              <Button type="submit" variant={kind === "remove" ? "destructive" : "default"} className="cursor-pointer"
                disabled={isSubmitting || !selected.length || (kind !== "remove" && !targetId)}>{confirmLabels[kind]}</Button>
            </div>
          </form>
        </Modal.Popup>
      </Modal.Portal>
    </Modal.Root>
  );
}
