"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { Button, buttonVariants } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import type { LandlordPropertyItem } from "@/types/landlord";

type PropertyFields = Pick<LandlordPropertyItem, "name" | "location">;

function EditForm({ property }: { property: LandlordPropertyItem }) {
  const router = useRouter();
  const updateProperty = useLandlordProperties((state) => state.updateProperty);
  const { register, handleSubmit, formState: { errors } } = useForm<PropertyFields>({
    defaultValues: { name: property.name, location: property.location },
  });
  const back = property.groupId ? `/landlord/properties/groups/${encodeURIComponent(property.groupId)}` : "/landlord/properties";
  return (
    <form noValidate className="max-w-xl space-y-5 border border-line bg-white p-5 sm:p-6" onSubmit={handleSubmit((values) => {
      updateProperty(property.id, { name: values.name.trim(), location: values.location.trim() });
      router.push(back);
    })}>
      <Field>
        <FieldLabel htmlFor="property-name">Property name</FieldLabel>
        <Input id="property-name" aria-required aria-invalid={!!errors.name} aria-describedby={errors.name && "property-name-error"}
          {...register("name", { validate: (value) => !!value.trim() || "Enter a property name." })} />
        <FieldError id="property-name-error">{errors.name?.message}</FieldError>
      </Field>
      <Field>
        <FieldLabel htmlFor="property-location">Location</FieldLabel>
        <Input id="property-location" aria-required aria-invalid={!!errors.location} aria-describedby={errors.location && "property-location-error"}
          {...register("location", { validate: (value) => !!value.trim() || "Enter the property location." })} />
        <FieldError id="property-location-error">{errors.location?.message}</FieldError>
      </Field>
      <div className="flex flex-wrap justify-end gap-2">
        <Link href={back} className={buttonVariants({ variant: "outline" })}>Cancel</Link>
        <Button type="submit">Apply changes</Button>
      </div>
    </form>
  );
}

export function PropertyDetailsForm({ propertyId }: { propertyId: string }) {
  const property = useLandlordProperties((state) => state.properties.find((item) => item.id === propertyId));
  return (
    <main className="min-h-0 flex-1 space-y-5 overflow-y-auto bg-surface/30 p-4 sm:p-8 md:p-10">
      <h1 className="text-2xl font-bold text-ink">{property ? "Edit Property" : "Property unavailable"}</h1>
      {property ? <EditForm key={property.id} property={property} /> :
        <Link href="/landlord/properties" className="text-sm font-semibold underline">Back to My Properties</Link>}
    </main>
  );
}
