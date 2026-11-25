"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Controller, useForm, useWatch } from "react-hook-form";
import toast from "react-hot-toast";
import { ArrowLeft, Building2, Home } from "lucide-react";
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
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { LandlordPropertyItem, ListingStatus } from "@/types/landlord";
import { GroupDialog } from "./GroupDialog";
import { PropertyGalleryField } from "./PropertyGalleryField";

interface PropertyFields {
  name: string;
  location: string;
  type: LandlordPropertyItem["type"];
  expectedRent: string;
  securityDeposit: string;
  bedrooms: string;
  bathrooms: string;
  availableFrom: string;
  description: string;
  amenities: string[];
  listingStatus: ListingStatus;
  hasUnits: boolean;
  groupId: string;
  gallery: string[];
}

const AMENITY_OPTIONS = [
  "Parking",
  "WiFi",
  "24/7 Security",
  "Water Tank",
  "Garden",
  "Furnished",
  "Solar Heater",
  "Gated Compound",
];

const SELECT_STYLE =
  "h-10 w-full rounded-none border border-input bg-white px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50";

const STRUCTURE_OPTIONS = [
  {
    hasUnits: false,
    title: "Standalone Property",
    description: "One whole home or space rented to a single household.",
    icon: Home,
  },
  {
    hasUnits: true,
    title: "Multi-Unit Building",
    description: "One building with multiple individually rentable units.",
    icon: Building2,
  },
] as const;

function PropertyForm({ property }: { property?: LandlordPropertyItem }) {
  const router = useRouter();
  const serviceMode = useLandlordWorkspace((s) => s.serviceMode);
  const { groups, saveProperty } = useLandlordProperties();
  const currentGroup = groups.find((g) => g.id === property?.groupId);
  const [creatingGroup, setCreatingGroup] = useState(false);

  const initialGallery =
    property?.gallery && property.gallery.length > 0
      ? property.gallery
      : property?.image
        ? [property.image]
        : [];

  const {
    register,
    control,
    getValues,
    setError,
    setValue,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<PropertyFields>({
    defaultValues: {
      name: property?.name ?? "",
      location: property?.location ?? "",
      type: property?.type ?? "HOUSE",
      groupId: currentGroup?.id ?? "",
      hasUnits: property?.hasUnits ?? false,
      expectedRent:
        (property?.expectedMonthlyRentRwf ?? property?.monthlyRevenueRwf)?.toString() ??
        "",
      securityDeposit: property?.securityDepositRwf?.toString() ?? "",
      bedrooms: property?.bedrooms?.toString() ?? "",
      bathrooms: property?.bathrooms?.toString() ?? "",
      availableFrom: property?.availableFrom ?? "",
      description: property?.description ?? "",
      amenities: property?.amenities ?? [],
      listingStatus: property?.listingStatus ?? "Published",
      gallery: initialGallery,
    },
  });

  const watchedHasUnits = useWatch({ control, name: "hasUnits" });
  const isMultiUnit = property ? property.hasUnits : watchedHasUnits;

  function parseOptionalNumber(raw: string): number | undefined {
    const trimmed = raw.trim();
    if (!trimmed) return undefined;
    const num = Number(trimmed);
    return Number.isFinite(num) ? num : undefined;
  }

  function submit(values: PropertyFields) {
    const hasUnits = property?.hasUnits ?? values.hasUnits;
    const saved = saveProperty(
      {
        name: values.name.trim(),
        type: values.type,
        location: values.location.trim(),
        groupId: serviceMode === "managed" ? values.groupId || null : null,
        image: values.gallery[0],
        gallery: values.gallery,
        expectedMonthlyRentRwf: hasUnits
          ? undefined
          : parseOptionalNumber(values.expectedRent),
        securityDepositRwf: parseOptionalNumber(values.securityDeposit),
        bedrooms: parseOptionalNumber(values.bedrooms),
        bathrooms: parseOptionalNumber(values.bathrooms),
        availableFrom: values.availableFrom || undefined,
        description: values.description.trim() || undefined,
        amenities: values.amenities,
        listingStatus: values.listingStatus,
        hasUnits,
      },
      property?.id,
    );

    if (!saved) {
      setError(
        "groupId",
        { message: "This group is no longer available. Choose another." },
        { shouldFocus: true },
      );
      return;
    }

    toast.success(
      property
        ? `"${saved.name}" updated.`
        : `"${saved.name}" saved (${saved.listingStatus}).`,
    );
    router.push(`/landlord/properties/${encodeURIComponent(saved.id)}`);
  }

  return (
    <>
      <form
        noValidate
        onSubmit={handleSubmit(submit)}
        className="max-w-3xl space-y-6 border border-line bg-white p-5 shadow-2xs sm:p-6"
      >
        {!property && serviceMode === "managed" && (
          <FieldSet>
            <FieldLegend className="text-xs font-semibold uppercase tracking-wider text-faint">
              Property Structure
            </FieldLegend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {STRUCTURE_OPTIONS.map(
                ({ hasUnits, title, description, icon: Icon }) => {
                  const selected = isMultiUnit === hasUnits;
                  return (
                    <button
                      key={title}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => {
                        setValue("hasUnits", hasUnits, { shouldDirty: true });
                        if (hasUnits) setValue("type", "APARTMENT");
                        else if (getValues("type") === "APARTMENT") {
                          setValue("type", "HOUSE");
                        }
                      }}
                      className={cn(
                        "flex cursor-pointer flex-col items-start gap-1.5 border p-4 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-blue",
                        selected
                          ? "border-brand-blue bg-brand-tint/50"
                          : "border-line bg-white hover:bg-surface/60",
                      )}
                    >
                      <div className="flex items-center gap-2">
                        <Icon
                          aria-hidden="true"
                          className={cn(
                            "size-4",
                            selected ? "text-brand-blue" : "text-faint",
                          )}
                        />
                        <span className="text-sm font-bold text-ink">
                          {title}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-body">
                        {description}
                      </p>
                    </button>
                  );
                },
              )}
            </div>
          </FieldSet>
        )}

        <FieldSet className="space-y-4">
          <FieldLegend className="text-xs font-semibold uppercase tracking-wider text-faint">
            Basic Information & Listing Status
          </FieldLegend>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="property-name" className="text-sm">
                {isMultiUnit ? "Building name" : "Property name"}{" "}
                <span className="text-rose-600">*</span>
              </FieldLabel>
              <Input
                id="property-name"
                placeholder={
                  isMultiUnit
                    ? "e.g., Kimironko Heights"
                    : "e.g., Kabeza Modern House"
                }
                aria-required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name && "property-name-error"}
                className="h-10 rounded-none"
                {...register("name", {
                  validate: (v) => !!v.trim() || "Enter a property name.",
                })}
              />
              <FieldError id="property-name-error">
                {errors.name?.message}
              </FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="property-type" className="text-sm">
                Property type <span className="text-rose-600">*</span>
              </FieldLabel>
              <select
                id="property-type"
                className={SELECT_STYLE}
                {...register("type")}
              >
                <option value="HOUSE">House</option>
                <option value="APARTMENT">Apartment</option>
                <option value="COMMERCIAL">Commercial</option>
              </select>
            </Field>

            <Field>
              <FieldLabel htmlFor="property-listing-status" className="text-sm">
                Listing visibility
              </FieldLabel>
              <select
                id="property-listing-status"
                className={SELECT_STYLE}
                {...register("listingStatus")}
              >
                <option value="Published">Published (Visible on Urugo)</option>
                <option value="Draft">Draft (Hidden)</option>
                <option value="Paused">Paused (Temporarily hidden)</option>
                <option value="Rented">Rented / Unavailable</option>
                <option value="Archived">Archived</option>
              </select>
            </Field>

            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="property-location" className="text-sm">
                Location <span className="text-rose-600">*</span>
              </FieldLabel>
              <Input
                id="property-location"
                placeholder="e.g., Kimironko, Gasabo, Kigali"
                aria-required
                aria-invalid={!!errors.location}
                aria-describedby={errors.location && "property-location-error"}
                className="h-10 rounded-none"
                {...register("location", {
                  validate: (v) => !!v.trim() || "Enter a property location.",
                })}
              />
              <FieldError id="property-location-error">
                {errors.location?.message}
              </FieldError>
            </Field>

            {!isMultiUnit && (
              <Field>
                <FieldLabel htmlFor="property-rent" className="text-sm">
                  Monthly rent (RWF) <span className="text-rose-600">*</span>
                </FieldLabel>
                <Input
                  id="property-rent"
                  type="number"
                  min={0}
                  step={1000}
                  placeholder="e.g., 200000"
                  aria-invalid={!!errors.expectedRent}
                  className="h-10 rounded-none"
                  {...register("expectedRent", {
                    validate: (v) => {
                      if (!v.trim()) return "Enter monthly rent.";
                      const n = Number(v);
                      return (
                        (Number.isInteger(n) && n > 0) ||
                        "Enter a valid positive amount in RWF."
                      );
                    },
                  })}
                />
                <FieldError>{errors.expectedRent?.message}</FieldError>
              </Field>
            )}

            <Field>
              <FieldLabel htmlFor="property-deposit" className="text-sm">
                Security deposit (RWF)
              </FieldLabel>
              <Input
                id="property-deposit"
                type="number"
                min={0}
                step={1000}
                placeholder="e.g., 200000"
                className="h-10 rounded-none"
                {...register("securityDeposit", {
                  validate: (v) =>
                    !v.trim() ||
                    Number(v) >= 0 ||
                    "Deposit cannot be negative.",
                })}
              />
              <FieldError>{errors.securityDeposit?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="property-bedrooms" className="text-sm">
                Bedrooms
              </FieldLabel>
              <Input
                id="property-bedrooms"
                type="number"
                min={0}
                max={20}
                placeholder="e.g., 2"
                className="h-10 rounded-none"
                {...register("bedrooms")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="property-bathrooms" className="text-sm">
                Bathrooms
              </FieldLabel>
              <Input
                id="property-bathrooms"
                type="number"
                min={0}
                max={20}
                placeholder="e.g., 1"
                className="h-10 rounded-none"
                {...register("bathrooms")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="property-available" className="text-sm">
                Available from
              </FieldLabel>
              <Input
                id="property-available"
                type="date"
                className="h-10 rounded-none"
                {...register("availableFrom")}
              />
            </Field>

            {serviceMode === "managed" && (
              <Field>
                <FieldLabel htmlFor="property-group" className="text-sm">
                  Property group (optional)
                </FieldLabel>
                <Controller
                  control={control}
                  name="groupId"
                  render={({ field }) => (
                    <select
                      id="property-group"
                      value={field.value}
                      className={SELECT_STYLE}
                      onChange={(e) => {
                        if (e.target.value === "__new__") {
                          setCreatingGroup(true);
                          return;
                        }
                        field.onChange(e.target.value);
                      }}
                    >
                      <option value="">No Group</option>
                      {groups.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.name}
                        </option>
                      ))}
                      <option value="__new__">+ Create New Group…</option>
                    </select>
                  )}
                />
                <FieldError>{errors.groupId?.message}</FieldError>
              </Field>
            )}

            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="property-description" className="text-sm">
                Listing description
              </FieldLabel>
              <textarea
                id="property-description"
                rows={3}
                placeholder="Highlight neighborhood benefits, utilities, access roads, and house rules..."
                className="w-full rounded-none border border-input bg-white p-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                {...register("description")}
              />
            </Field>
          </div>
        </FieldSet>

        {/* Amenities */}
        <FieldSet className="border-t border-line pt-5">
          <FieldLegend className="text-xs font-semibold uppercase tracking-wider text-faint">
            Amenities
          </FieldLegend>
          <Controller
            control={control}
            name="amenities"
            render={({ field }) => (
              <div className="flex flex-wrap gap-2">
                {AMENITY_OPTIONS.map((amenity) => {
                  const checked = field.value.includes(amenity);
                  return (
                    <button
                      key={amenity}
                      type="button"
                      aria-pressed={checked}
                      onClick={() =>
                        field.onChange(
                          checked
                            ? field.value.filter((item) => item !== amenity)
                            : [...field.value, amenity],
                        )
                      }
                      className={cn(
                        "cursor-pointer border px-3 py-1.5 text-xs font-semibold transition-colors",
                        checked
                          ? "border-brand-blue bg-brand-tint text-brand-blue"
                          : "border-line bg-white text-body hover:bg-surface hover:text-ink",
                      )}
                    >
                      {amenity}
                    </button>
                  );
                })}
              </div>
            )}
          />
        </FieldSet>

        {/* Gallery */}
        <div className="border-t border-line pt-5">
          <Controller
            control={control}
            name="gallery"
            render={({ field }) => (
              <PropertyGalleryField
                images={field.value}
                onChange={field.onChange}
              />
            )}
          />
        </div>

        <div className="flex flex-wrap items-center justify-end gap-2 border-t border-line pt-5">
          <Link
            href={
              property
                ? `/landlord/properties/${encodeURIComponent(property.id)}`
                : "/landlord/properties"
            }
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-none",
            )}
          >
            Cancel
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer rounded-none"
          >
            {isSubmitting
              ? "Saving..."
              : property
                ? "Save Changes"
                : "Save Property"}
          </Button>
        </div>
      </form>

      {creatingGroup && (
        <GroupDialog
          request={{ kind: "create" }}
          returnFocusId="property-group"
          onClose={() => setCreatingGroup(false)}
          onCreated={(group) =>
            setValue("groupId", group.id, {
              shouldDirty: true,
              shouldValidate: true,
            })
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
  const missing = Boolean(propertyId) && !property;

  return (
    <main className="min-h-0 flex-1 space-y-5 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 md:p-10">
      <div className="space-y-2">
        <Link
          href={
            property
              ? `/landlord/properties/${encodeURIComponent(property.id)}`
              : "/landlord/properties"
          }
          className="inline-flex items-center gap-1.5 text-sm font-medium text-body hover:text-ink hover:underline"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          <span>{property ? `Back to ${property.name}` : "My Properties"}</span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-ink">
          {missing
            ? "Property unavailable"
            : property
              ? "Edit Property"
              : "Add Property"}
        </h2>
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
