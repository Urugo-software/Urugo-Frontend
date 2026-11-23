"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Field, FieldError, FieldLabel, FieldLegend, FieldSet } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import type { LandlordPropertyItem } from "@/types/landlord";
import { GroupDialog } from "./GroupDialog";

interface PropertyFields {
  name: string;
  location: string;
  type: LandlordPropertyItem["type"];
  expectedRent: string;
  hasUnits: boolean;
  groupId: string;
}

const selectStyle = "h-9 w-full rounded-lg border border-input bg-white px-2 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50";

function PropertyForm({ property }: { property?: LandlordPropertyItem }) {
  const router = useRouter();
  const { groups, saveProperty } = useLandlordProperties();
  const currentGroup = groups.find((group) => group.id === property?.groupId);
  const [creatingGroup, setCreatingGroup] = useState(false);
  const { register, control, setError, setValue, handleSubmit, formState: { errors, isSubmitting, isSubmitSuccessful } } = useForm<PropertyFields>({
    defaultValues: {
      name: property?.name ?? "", location: property?.location ?? "", type: property?.type,
      groupId: currentGroup?.id ?? "", hasUnits: property?.hasUnits ?? false,
      expectedRent: property?.expectedMonthlyRentRwf?.toString() ?? "",
    },
  });
  const back = currentGroup ? `/landlord/properties/groups/${encodeURIComponent(currentGroup.id)}` : "/landlord/properties";

  function submit(values: PropertyFields) {
    const saved = saveProperty({
      name: values.name.trim(), type: values.type, location: values.location.trim(), groupId: values.groupId || null,
      expectedMonthlyRentRwf: values.expectedRent === "" ? undefined : Number(values.expectedRent),
      hasUnits: property?.hasUnits ?? values.hasUnits,
    }, property?.id);
    if (!saved) {
      setError("groupId", { message: "This selection is no longer available. Choose a group or No Group." }, { shouldFocus: true });
      return;
    }
    const destination = property && saved.groupId ? `/landlord/properties/groups/${encodeURIComponent(saved.groupId)}` : "/landlord/properties";
    router.push(destination);
  }

  return <>
    <form noValidate onSubmit={handleSubmit(submit)} className="max-w-xl space-y-6 border border-line bg-white p-5 sm:p-6">
      <FieldSet>
        <FieldLegend>Property details</FieldLegend>
        <Field>
          <FieldLabel htmlFor="property-name">Property name</FieldLabel>
          <Input id="property-name" aria-required aria-invalid={!!errors.name} aria-describedby={errors.name && "property-name-error"}
            {...register("name", { validate: (value) => !!value.trim() || "Enter a property name." })} />
          <FieldError id="property-name-error">{errors.name?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="property-type">Property type</FieldLabel>
          <select id="property-type" defaultValue={property?.type ?? ""} aria-required aria-invalid={!!errors.type}
            aria-describedby={errors.type && "property-type-error"} className={selectStyle} {...register("type", { required: "Choose a property type." })}>
            <option value="" disabled>Choose a type</option>
            <option value="APARTMENT">Apartment</option><option value="HOUSE">House</option><option value="COMMERCIAL">Commercial</option>
          </select>
          <FieldError id="property-type-error">{errors.type?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="property-location">Location or district</FieldLabel>
          <Input id="property-location" aria-required aria-invalid={!!errors.location} aria-describedby={errors.location && "property-location-error"}
            {...register("location", { validate: (value) => !!value.trim() || "Enter the property location." })} />
          <FieldError id="property-location-error">{errors.location?.message}</FieldError>
        </Field>
        <Field>
          <FieldLabel htmlFor="property-group">Property group (optional)</FieldLabel>
          <Controller name="groupId" control={control} render={({ field }) => (
            <select {...field} id="property-group" className={selectStyle} aria-invalid={!!errors.groupId} aria-describedby={errors.groupId && "property-group-error"}
              onChange={(event) => event.target.value === "create-new-group" ? setCreatingGroup(true) : field.onChange(event.target.value)}>
              <option value="">No Group</option>
              {groups.map((group) => <option key={group.id} value={group.id}>{group.name}</option>)}
              <option value="create-new-group">Create New Group…</option>
            </select>
          )} />
          <FieldError id="property-group-error">{errors.groupId?.message}</FieldError>
        </Field>
      </FieldSet>
      <FieldSet className="border-t border-line pt-4">
        <FieldLegend>Rental details</FieldLegend>
        <Field>
          <FieldLabel htmlFor="expected-rent">Expected monthly rent (RWF)</FieldLabel>
          <Input id="expected-rent" type="number" min="0" step="1" aria-required={!property} aria-invalid={!!errors.expectedRent}
            aria-describedby={errors.expectedRent && "expected-rent-error"} {...register("expectedRent", {
              validate: (value) => value === "" ? !!property || "Enter the expected monthly rent."
                : (Number.isSafeInteger(Number(value)) && Number(value) >= 0) || "Enter a whole amount of zero or more.",
            })} />
          <FieldError id="expected-rent-error">{errors.expectedRent?.message}</FieldError>
        </Field>
        {!property && <label className="flex items-center gap-2 text-sm"><input type="checkbox" {...register("hasUnits")} />This property has individually rentable units</label>}
      </FieldSet>
      <p className="text-sm text-body">Changes are available in this tab until you refresh.</p>
      <div className="flex flex-wrap justify-end gap-2">
        <Link href={back} className={buttonVariants({ variant: "outline" })}>Cancel</Link>
        <Button type="submit" disabled={isSubmitting || isSubmitSuccessful}>{property ? "Apply changes" : "Add Property"}</Button>
      </div>
    </form>
    {creatingGroup && <GroupDialog request={{ kind: "create" }} returnFocusId="property-group"
      onClose={() => setCreatingGroup(false)} onCreated={(group) => setValue("groupId", group.id, { shouldDirty: true, shouldValidate: true })} />}
  </>;
}

export function PropertyDetailsForm({ propertyId }: { propertyId?: string }) {
  const property = useLandlordProperties((state) => state.properties.find((item) => item.id === propertyId));
  const missing = !!propertyId && !property;
  return (
    <main className="min-h-0 flex-1 space-y-5 overflow-y-auto bg-surface/30 p-4 sm:p-8 md:p-10">
      <h1 className="text-2xl font-bold text-ink">{missing ? "Property unavailable" : property ? "Edit Property" : "Add Property"}</h1>
      {missing ? <Link href="/landlord/properties" className="text-sm font-semibold underline">Back to My Properties</Link>
        : <PropertyForm key={propertyId ?? "new"} property={property} />}
    </main>
  );
}
