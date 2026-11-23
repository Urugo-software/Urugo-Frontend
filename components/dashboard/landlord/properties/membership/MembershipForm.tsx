import { useId, type Ref } from "react";
import { AlertDialog } from "@base-ui/react/alert-dialog";
import { Dialog } from "@base-ui/react/dialog";
import { Controller, type UseFormReturn } from "react-hook-form";
import toast from "react-hot-toast";
import { Field, FieldLabel } from "@/components/ui/field";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { partitionProperties } from "@/utils/property-groups";
import type { MembershipRequest } from "./MembershipDialog";
import { PropertyChecklist } from "./PropertyChecklist";

export interface MembershipValues {
  propertyIds: string[];
  toGroupId: string;
}

const selectStyle = "h-9 w-full cursor-pointer rounded-lg border border-input bg-white px-2 text-sm focus-visible:outline-ring";
const feedback = { id: "landlord-property-membership" };

export default function MembershipForm({ request, form, formRef, selectedPropertyId, onClose }: {
  request: MembershipRequest;
  form: UseFormReturn<MembershipValues>;
  formRef: Ref<HTMLFormElement>;
  selectedPropertyId?: string;
  onClose: () => void;
}) {
  const formId = useId();
  const { groups, properties, changeMembership } = useLandlordProperties();
  const { kind, propertyId } = request;
  const sourceId = request.kind === "add" ? null : request.fromGroupId;
  const fixedTargetId = request.kind === "add" ? request.toGroupId : undefined;
  const { byGroup, ungrouped } = partitionProperties(groups, properties);
  const eligible = sourceId === null ? ungrouped : (byGroup.get(sourceId) ?? []);
  const destinations = groups.filter((group) => group.id !== sourceId);
  const propertyName = properties.find((property) => property.id === selectedPropertyId)?.name;
  const groupName = groups.find((group) => group.id === (fixedTargetId ?? sourceId))?.name;
  const Modal = kind === "remove" ? AlertDialog : Dialog;

  function submit(fields: MembershipValues) {
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
    <form id={formId} ref={formRef} noValidate onSubmit={form.handleSubmit(submit)} className="space-y-4">
      <Modal.Description className="text-sm text-body">
        {kind === "add" && (groupName ? `Select properties to add to ${groupName}.` : "Choose a group and the properties to add.")}
        {kind === "move" && `Move ${propertyName ?? "a property"} from ${groupName ?? "this group"} to another group.`}
        {kind === "remove" && `After removal from ${groupName ?? "this group"}, ${propertyName ?? "the property"} will remain in Urugo under Ungrouped Properties. Its units, renters, tenancy history, agreements and payments will be kept.`}
      </Modal.Description>
      {(kind === "add" || !propertyId) && <Controller control={form.control} name="propertyIds" render={({ field }) => {
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
        <select id="membership-target" className={selectStyle} {...form.register("toGroupId", { required: true })}>
          <option value="">Choose a group</option>
          {destinations.map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}
        </select>
        {!destinations.length && <p className="text-sm text-body">Create another group to move this property.</p>}
      </Field>}
    </form>
  );
}
