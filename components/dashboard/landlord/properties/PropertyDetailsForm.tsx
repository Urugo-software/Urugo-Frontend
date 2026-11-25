"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useTranslations } from "next-intl";
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
  { value: "Parking", key: "parking" },
  { value: "WiFi", key: "wifi" },
  { value: "24/7 Security", key: "security247" },
  { value: "Water Tank", key: "waterTank" },
  { value: "Garden", key: "garden" },
  { value: "Furnished", key: "furnished" },
  { value: "Solar Heater", key: "solarHeater" },
  { value: "Gated Compound", key: "gatedCompound" },
] as const;

const SELECT_STYLE =
  "h-10 w-full rounded-none border border-input bg-white px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50";

const STRUCTURE_OPTIONS = [
  {
    hasUnits: false,
    titleKey: "standaloneTitle",
    descriptionKey: "standaloneDesc",
    icon: Home,
  },
  {
    hasUnits: true,
    titleKey: "multiUnitTitle",
    descriptionKey: "multiUnitDesc",
    icon: Building2,
  },
] as const;

function PropertyForm({ property }: { property?: LandlordPropertyItem }) {
  const t = useTranslations("landlord.properties.form");
  const tTypes = useTranslations("landlord.properties.types");
  const tStatuses = useTranslations("landlord.properties.statuses");
  const tAmenities = useTranslations("landlord.properties.amenities");
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
        { message: t("groupUnavailableError") },
        { shouldFocus: true },
      );
      return;
    }

    const savedStatusLabel = saved.listingStatus
      ? tStatuses(saved.listingStatus)
      : "";
    toast.success(
      property
        ? t("toastUpdated", { name: saved.name })
        : t("toastSaved", { name: saved.name, status: savedStatusLabel }),
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
              {t("structureLegend")}
            </FieldLegend>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
              {STRUCTURE_OPTIONS.map(
                ({ hasUnits, titleKey, descriptionKey, icon: Icon }) => {
                  const selected = isMultiUnit === hasUnits;
                  return (
                    <button
                      key={titleKey}
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
                          {t(titleKey)}
                        </span>
                      </div>
                      <p className="text-xs leading-relaxed text-body">
                        {t(descriptionKey)}
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
            {t("basicInfoLegend")}
          </FieldLegend>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="property-name" className="text-sm">
                {isMultiUnit ? t("buildingNameLabel") : t("propertyNameLabel")}{" "}
                <span className="text-rose-600">*</span>
              </FieldLabel>
              <Input
                id="property-name"
                placeholder={
                  isMultiUnit
                    ? t("buildingNamePlaceholder")
                    : t("propertyNamePlaceholder")
                }
                aria-required
                aria-invalid={!!errors.name}
                aria-describedby={errors.name && "property-name-error"}
                className="h-10 rounded-none"
                {...register("name", {
                  validate: (v) => !!v.trim() || t("nameRequired"),
                })}
              />
              <FieldError id="property-name-error">
                {errors.name?.message}
              </FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="property-type" className="text-sm">
                {t("propertyTypeLabel")} <span className="text-rose-600">*</span>
              </FieldLabel>
              <select
                id="property-type"
                className={SELECT_STYLE}
                {...register("type")}
              >
                <option value="HOUSE">{tTypes("HOUSE")}</option>
                <option value="APARTMENT">{tTypes("APARTMENT")}</option>
                <option value="COMMERCIAL">{tTypes("COMMERCIAL")}</option>
              </select>
            </Field>

            <Field>
              <FieldLabel htmlFor="property-listing-status" className="text-sm">
                {t("listingVisibilityLabel")}
              </FieldLabel>
              <select
                id="property-listing-status"
                className={SELECT_STYLE}
                {...register("listingStatus")}
              >
                <option value="Published">{t("visibilityPublished")}</option>
                <option value="Draft">{t("visibilityDraft")}</option>
                <option value="Paused">{t("visibilityPaused")}</option>
                <option value="Rented">{t("visibilityRented")}</option>
                <option value="Archived">{t("visibilityArchived")}</option>
              </select>
            </Field>

            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="property-location" className="text-sm">
                {t("locationLabel")} <span className="text-rose-600">*</span>
              </FieldLabel>
              <Input
                id="property-location"
                placeholder={t("locationPlaceholder")}
                aria-required
                aria-invalid={!!errors.location}
                aria-describedby={errors.location && "property-location-error"}
                className="h-10 rounded-none"
                {...register("location", {
                  validate: (v) => !!v.trim() || t("locationRequired"),
                })}
              />
              <FieldError id="property-location-error">
                {errors.location?.message}
              </FieldError>
            </Field>

            {!isMultiUnit && (
              <Field>
                <FieldLabel htmlFor="property-rent" className="text-sm">
                  {t("monthlyRentLabel")} <span className="text-rose-600">*</span>
                </FieldLabel>
                <Input
                  id="property-rent"
                  type="number"
                  min={0}
                  step={1000}
                  placeholder={t("monthlyRentPlaceholder")}
                  aria-invalid={!!errors.expectedRent}
                  className="h-10 rounded-none"
                  {...register("expectedRent", {
                    validate: (v) => {
                      if (!v.trim()) return t("monthlyRentRequired");
                      const n = Number(v);
                      return (
                        (Number.isInteger(n) && n > 0) ||
                        t("monthlyRentPositive")
                      );
                    },
                  })}
                />
                <FieldError>{errors.expectedRent?.message}</FieldError>
              </Field>
            )}

            <Field>
              <FieldLabel htmlFor="property-deposit" className="text-sm">
                {t("securityDepositLabel")}
              </FieldLabel>
              <Input
                id="property-deposit"
                type="number"
                min={0}
                step={1000}
                placeholder={t("securityDepositPlaceholder")}
                className="h-10 rounded-none"
                {...register("securityDeposit", {
                  validate: (v) =>
                    !v.trim() ||
                    Number(v) >= 0 ||
                    t("depositNonNegative"),
                })}
              />
              <FieldError>{errors.securityDeposit?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="property-bedrooms" className="text-sm">
                {t("bedroomsLabel")}
              </FieldLabel>
              <Input
                id="property-bedrooms"
                type="number"
                min={0}
                max={20}
                placeholder={t("bedroomsPlaceholder")}
                className="h-10 rounded-none"
                {...register("bedrooms")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="property-bathrooms" className="text-sm">
                {t("bathroomsLabel")}
              </FieldLabel>
              <Input
                id="property-bathrooms"
                type="number"
                min={0}
                max={20}
                placeholder={t("bathroomsPlaceholder")}
                className="h-10 rounded-none"
                {...register("bathrooms")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="property-available" className="text-sm">
                {t("availableFromLabel")}
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
                  {t("propertyGroupLabel")}
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
                      <option value="">{t("noGroupOption")}</option>
                      {groups.map((g) => (
                        <option key={g.id} value={g.id}>
                          {g.name}
                        </option>
                      ))}
                      <option value="__new__">{t("createNewGroupOption")}</option>
                    </select>
                  )}
                />
                <FieldError>{errors.groupId?.message}</FieldError>
              </Field>
            )}

            <Field className="sm:col-span-2">
              <FieldLabel htmlFor="property-description" className="text-sm">
                {t("descriptionLabel")}
              </FieldLabel>
              <textarea
                id="property-description"
                rows={3}
                placeholder={t("descriptionPlaceholder")}
                className="w-full rounded-none border border-input bg-white p-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/50"
                {...register("description")}
              />
            </Field>
          </div>
        </FieldSet>

        {/* Amenities */}
        <FieldSet className="border-t border-line pt-5">
          <FieldLegend className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("amenitiesLegend")}
          </FieldLegend>
          <Controller
            control={control}
            name="amenities"
            render={({ field }) => (
              <div className="flex flex-wrap gap-2">
                {AMENITY_OPTIONS.map(({ value: amenity, key }) => {
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
                      {tAmenities(key)}
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
            {t("cancel")}
          </Link>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="cursor-pointer rounded-none"
          >
            {isSubmitting
              ? t("saving")
              : property
                ? t("saveChanges")
                : t("saveProperty")}
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
  const t = useTranslations("landlord.properties.form");
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
          <span>
            {property
              ? t("backToProperty", { name: property.name })
              : t("backToProperties")}
          </span>
        </Link>
        <h2 className="text-2xl font-bold tracking-tight text-ink">
          {missing
            ? t("unavailableTitle")
            : property
              ? t("editTitle")
              : t("addTitle")}
        </h2>
      </div>

      {missing ? (
        <Link
          href="/landlord/properties"
          className={cn(buttonVariants({ variant: "outline" }), "rounded-none")}
        >
          {t("backToPropertiesBtn")}
        </Link>
      ) : (
        <PropertyForm key={propertyId ?? "new"} property={property} />
      )}
    </main>
  );
}
