"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import { ArrowLeft, Building2, Home, ImagePlus, Trash2 } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import type { LandlordPropertyItem } from "@/types/landlord";
import { readImageFile } from "@/utils/image-file";
import { GroupDialog } from "./GroupDialog";
import { PropertyCover } from "./PropertyCover";

interface PropertyFields {
  name: string;
  location: string;
  type: LandlordPropertyItem["type"];
  expectedRent: string;
  hasUnits: boolean;
  groupId: string;
}

const selectStyle =
  "h-10 w-full rounded-none border border-input bg-white px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50";

const structureOptions = [
  {
    hasUnits: false,
    title: "Standalone Property",
    description: "One whole home rented to a single household on a monthly lease.",
    icon: Home,
  },
  {
    hasUnits: true,
    title: "Multi-Unit Building",
    description: "One building with multiple individually rentable units or doors.",
    icon: Building2,
  },
] as const;

function PropertyForm({ property }: { property?: LandlordPropertyItem }) {
  const router = useRouter();
  const { groups, saveProperty } = useLandlordProperties();
  const currentGroup = groups.find((group) => group.id === property?.groupId);
  const [creatingGroup, setCreatingGroup] = useState(false);
  const [coverImage, setCoverImage] = useState<string | undefined>(property?.image);
  const [coverError, setCoverError] = useState<string | null>(null);

  const {
    register,
    control,
    getValues,
    setError,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<PropertyFields>({
    defaultValues: {
      name: property?.name ?? "",
      location: property?.location ?? "",
      type: property?.type ?? "HOUSE",
      groupId: currentGroup?.id ?? "",
      hasUnits: property?.hasUnits ?? false,
      expectedRent: property?.expectedMonthlyRentRwf?.toString() ?? "",
    },
  });

  const watchedHasUnits = useWatch({ control, name: "hasUnits" });
  const isMultiUnit = property ? property.hasUnits : watchedHasUnits;
  const back = currentGroup
    ? `/landlord/properties/groups/${encodeURIComponent(currentGroup.id)}`
    : "/landlord/properties";

  async function handleCoverUpload(file?: File) {
    if (!file) return;
    setCoverError(null);
    try {
      setCoverImage(await readImageFile(file));
    } catch {
      setCoverError("Could not read this image. Please choose another file.");
    }
  }

  function submit(values: PropertyFields) {
    const hasUnits = property?.hasUnits ?? values.hasUnits;
    const saved = saveProperty(
      {
        name: values.name.trim(),
        type: values.type,
        location: values.location.trim(),
        groupId: values.groupId || null,
        image: coverImage,
        expectedMonthlyRentRwf:
          hasUnits || values.expectedRent === ""
            ? undefined
            : Number(values.expectedRent),
        hasUnits,
      },
      property?.id,
    );

    if (!saved) {
      setError(
        "groupId",
        { message: "This group is no longer available. Choose another or No Group." },
        { shouldFocus: true },
      );
      return;
    }

    if (!property && saved.hasUnits) {
      router.push(`/landlord/tenancies?property=${encodeURIComponent(saved.id)}`);
      return;
    }

    const destination =
      property && saved.groupId
        ? `/landlord/properties/groups/${encodeURIComponent(saved.groupId)}`
        : "/landlord/properties";
    router.push(destination);
  }

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit(submit)}
        className="max-w-2xl space-y-6 border border-line bg-white p-5 shadow-2xs sm:p-6"
      >
        {!property && (
          <FieldSet>
            <FieldLegend className="text-[12.5px] font-semibold uppercase tracking-wider text-faint">
              Rental Structure
            </FieldLegend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {structureOptions.map(({ hasUnits, title, description, icon: Icon }) => {
                const selected = isMultiUnit === hasUnits;
                return (
                  <button
                    key={title}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => {
                      setValue("hasUnits", hasUnits, { shouldDirty: true });
                      if (hasUnits) {
                        setValue("type", "APARTMENT");
                      } else if (getValues("type") === "APARTMENT") {
                        setValue("type", "HOUSE");
                      }
                    }}
                    className={cn(
                      "flex cursor-pointer flex-col items-start gap-1.5 rounded-none border p-4 text-left transition-colors",
                      selected
                        ? "border-brand bg-brand-tint/50"
                        : "border-line bg-white hover:bg-surface/60",
                    )}
                  >
                    <div className="flex items-center gap-2">
                      <Icon
                        aria-hidden="true"
                        className={cn("size-4", selected ? "text-brand" : "text-faint")}
                      />
                      <span className="text-sm font-bold text-ink">{title}</span>
                    </div>
                    <p className="text-[12.5px] leading-relaxed text-body">{description}</p>
                  </button>
                );
              })}
            </div>
          </FieldSet>
        )}

        <FieldSet className={!property ? "border-t border-line pt-5" : undefined}>
          <FieldLegend className="text-[12.5px] font-semibold uppercase tracking-wider text-faint">
            Property Details
          </FieldLegend>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="property-name" className="text-sm">
                {isMultiUnit ? "Building name" : "Property name"}
              </FieldLabel>
              <Input
                id="property-name"
                placeholder={isMultiUnit ? "e.g., Kimironko Heights" : "e.g., Kabeza Modern House"}
                aria-required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name && "property-name-error"}
                className="h-10 rounded-none"
                {...register("name", {
                  validate: (value) => !!value.trim() || "Enter a property name.",
                })}
              />
              <FieldError id="property-name-error">{errors.name?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="property-type" className="text-sm">
                Property type
              </FieldLabel>
              <select
                id="property-type"
                aria-required
                aria-invalid={!!errors.type}
                aria-describedby={errors.type && "property-type-error"}
                className={selectStyle}
                {...register("type", { required: "Choose a property type." })}
              >
                <option value="HOUSE">House</option>
                <option value="APARTMENT">Apartment</option>
                <option value="COMMERCIAL">Commercial</option>
              </select>
              <FieldError id="property-type-error">{errors.type?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="property-group" className="text-sm">
                Property group (optional)
              </FieldLabel>
              <Controller
                name="groupId"
                control={control}
                render={({ field }) => (
                  <select
                    {...field}
                    id="property-group"
                    className={selectStyle}
                    aria-invalid={!!errors.groupId}
                    aria-describedby={errors.groupId && "property-group-error"}
                    onChange={(event) =>
                      event.target.value === "create-new-group"
                        ? setCreatingGroup(true)
                        : field.onChange(event.target.value)
                    }
                  >
                    <option value="">No Group</option>
                    {groups.map((group) => (
                      <option key={group.id} value={group.id}>
                        {group.name}
                      </option>
                    ))}
                    <option value="create-new-group">Create New Group…</option>
                  </select>
                )}
              />
              <FieldError id="property-group-error">{errors.groupId?.message}</FieldError>
            </Field>

            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="property-location" className="text-sm">
                Location
              </FieldLabel>
              <Input
                id="property-location"
                placeholder="e.g., Kimironko, Gasabo, Kigali"
                aria-required
                aria-invalid={!!errors.location}
                aria-describedby={errors.location && "property-location-error"}
                className="h-10 rounded-none"
                {...register("location", {
                  validate: (value) => !!value.trim() || "Enter the property location.",
                })}
              />
              <FieldError id="property-location-error">
                {errors.location?.message}
              </FieldError>
            </Field>

            {!isMultiUnit && (
              <Field className="sm:col-span-2">
                <FieldLabel htmlFor="expected-rent" className="text-sm">
                  Monthly rent (RWF)
                </FieldLabel>
                <Input
                  id="expected-rent"
                  type="number"
                  min="0"
                  step="1000"
                  placeholder="e.g., 200000"
                  aria-required={!property}
                  aria-invalid={!!errors.expectedRent}
                  aria-describedby={errors.expectedRent && "expected-rent-error"}
                  className="h-10 rounded-none"
                  {...register("expectedRent", {
                    validate: (value) => {
                      if (isMultiUnit) return true;
                      if (value === "") return !!property || "Enter the monthly rent.";
                      return (
                        (Number.isSafeInteger(Number(value)) && Number(value) >= 0) ||
                        "Enter a whole amount of zero or more."
                      );
                    },
                  })}
                />
                <FieldError id="expected-rent-error">
                  {errors.expectedRent?.message}
                </FieldError>
              </Field>
            )}
          </div>
        </FieldSet>

        <FieldSet className="border-t border-line pt-5">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <FieldLegend className="mb-0 text-[12.5px] font-semibold uppercase tracking-wider text-faint">
              Cover Photo
            </FieldLegend>
            <div className="flex items-center gap-2">
              <label className="inline-flex cursor-pointer items-center gap-1.5 border border-line bg-white px-3 py-1.5 text-sm font-semibold text-ink hover:bg-surface">
                <ImagePlus aria-hidden="true" className="size-4 text-brand" />
                <span>{coverImage ? "Change Photo" : "Upload Photo"}</span>
                <input
                  type="file"
                  accept="image/*"
                  className="sr-only"
                  onChange={(event) => {
                    void handleCoverUpload(event.target.files?.[0]);
                    event.target.value = "";
                  }}
                />
              </label>
              {coverImage && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setCoverImage(undefined)}
                  className="h-9 cursor-pointer rounded-none text-sm"
                >
                  <Trash2 className="size-3.5" />
                  Remove
                </Button>
              )}
            </div>
          </div>

          <div className="h-44 w-full overflow-hidden border border-line bg-surface">
            <PropertyCover key={coverImage ?? "empty"} src={coverImage} className="h-full w-full" />
          </div>
          {coverError && <FieldError>{coverError}</FieldError>}
        </FieldSet>

        <div className="flex flex-wrap justify-end gap-2 border-t border-line pt-4">
          <Link
            href={back}
            className={cn(buttonVariants({ variant: "outline" }), "rounded-none")}
          >
            Cancel
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting || isSubmitSuccessful}
            className="cursor-pointer rounded-none"
          >
            {property
              ? "Save Changes"
              : isMultiUnit
                ? "Create Building & Add Units"
                : "Add Property"}
          </Button>
        </div>
      </form>

      {creatingGroup && (
        <GroupDialog
          request={{ kind: "create" }}
          returnFocusId="property-group"
          onClose={() => setCreatingGroup(false)}
          onCreated={(group) =>
            setValue("groupId", group.id, { shouldDirty: true, shouldValidate: true })
          }
        />
      )}
    </>
  );
}

export function PropertyDetailsForm({ propertyId }: { propertyId?: string }) {
  const property = useLandlordProperties((state) =>
    state.properties.find((item) => item.id === propertyId),
  );
  const missing = !!propertyId && !property;

  return (
    <main className="min-h-0 flex-1 space-y-5 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 md:p-10">
      <div className="space-y-2">
        <Link
          href="/landlord/properties"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-body hover:text-ink hover:underline"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          My Properties
        </Link>
        <h1 className="text-2xl font-bold tracking-tight text-ink">
          {missing ? "Property unavailable" : property ? "Edit Property" : "Add Property"}
        </h1>
      </div>

      {missing ? (
        <Link
          href="/landlord/properties"
          className={cn(buttonVariants({ variant: "outline" }), "rounded-none")}
        >
          Back to My Properties
        </Link>
      ) : (
        <PropertyForm key={propertyId ?? "new"} property={property} />
      )}
    </main>
  );
}
