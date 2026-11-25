"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import toast from "react-hot-toast";
import {
  Archive,
  ArrowLeft,
  Bath,
  BedDouble,
  Building2,
  CheckCircle2,
  Eye,
  Layers,
  MapPin,
  PauseCircle,
  Pencil,
  Trash2,
} from "lucide-react";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { StatusBadge, type StatusTone } from "@/components/shared/StatusBadge";
import { Button, buttonVariants } from "@/components/ui/button";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { cn } from "@/lib/utils";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { ListingStatus } from "@/types/landlord";
import { formatPropertyRent } from "@/utils/format";

const LISTING_TONE: Record<ListingStatus, StatusTone> = {
  Published: "success",
  Draft: "neutral",
  Paused: "warning",
  Rented: "info",
  Archived: "neutral",
};

const AMENITY_KEYS: Record<string, string> = {
  Parking: "parking",
  WiFi: "wifi",
  "24/7 Security": "security247",
  "Water Tank": "waterTank",
  Garden: "garden",
  Furnished: "furnished",
  "Solar Heater": "solarHeater",
  "Gated Compound": "gatedCompound",
};

const SEED_PROPERTY_IDS = new Set(["prop-101", "prop-102", "prop-103"]);

export function PropertyDetailsView({ propertyId }: { propertyId: string }) {
  const t = useTranslations("landlord.properties.details");
  const tTypes = useTranslations("landlord.properties.types");
  const tStatuses = useTranslations("landlord.properties.statuses");
  const tAmenities = useTranslations("landlord.properties.amenities");
  const tSeed = useTranslations("landlord.seed.properties");
  const locale = useLocale() as AppLocale;
  const router = useRouter();
  const { properties, groups, updatePropertyListingStatus, deleteProperty } =
    useLandlordProperties();
  const serviceMode = useLandlordWorkspace((s) => s.serviceMode);
  const property = properties.find((p) => p.id === propertyId);

  const [selectedImage, setSelectedImage] = useState<string | undefined>(
    undefined,
  );
  const [confirmDelete, setConfirmDelete] = useState(false);

  if (!property) {
    return (
      <main className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 md:p-10">
        <EmptyStateBox
          icon={Building2}
          title={t("notFoundTitle")}
          description={t("notFoundDesc")}
          action={
            <Link
              href="/landlord/properties"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-none",
              )}
            >
              {t("backToProperties")}
            </Link>
          }
        />
      </main>
    );
  }

  const group = property.groupId
    ? groups.find((g) => g.id === property.groupId)
    : undefined;
  const gallery =
    property.gallery && property.gallery.length > 0
      ? property.gallery
      : property.image
        ? [property.image]
        : [];
  const activeCover =
    selectedImage && gallery.includes(selectedImage)
      ? selectedImage
      : gallery[0];
  const listingStatus: ListingStatus =
    property.listingStatus ??
    (property.status === "Occupied" ? "Rented" : "Published");
  const listingStatusLabel =
    listingStatus === "Rented" ? tStatuses("rentedBadge") : listingStatus;
  const rent = formatPropertyRent(property);

  const setStatus = (nextStatus: ListingStatus, message: string) => {
    updatePropertyListingStatus(property.id, nextStatus);
    toast.success(message);
  };

  return (
    <main className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 md:p-10">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={
            group
              ? `/landlord/properties/groups/${encodeURIComponent(group.id)}`
              : "/landlord/properties"
          }
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-body hover:text-ink hover:underline"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          <span>
            {group ? t("backToGroup", { name: group.name }) : t("backToProperties")}
          </span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/landlord/properties/${encodeURIComponent(property.id)}/edit`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-9 rounded-none text-xs font-semibold",
            )}
          >
            <Pencil aria-hidden="true" className="size-3.5" />
            <span>{t("editProperty")}</span>
          </Link>
          {serviceMode === "managed" && (
            <Link
              href={`/landlord/tenancies?property=${encodeURIComponent(property.id)}`}
              className={cn(
                buttonVariants({ variant: "default" }),
                "h-9 rounded-none text-xs font-semibold",
              )}
            >
              <Layers aria-hidden="true" className="size-3.5" />
              <span>
                {property.hasUnits ? t("manageUnitsLeases") : t("manageLease")}
              </span>
            </Link>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        {/* Main Gallery & Details */}
        <div className="space-y-6 xl:col-span-2">
          <div className="overflow-hidden border border-line bg-white shadow-2xs">
            <div className="relative flex h-64 w-full items-center justify-center bg-surface sm:h-80">
              {activeCover ? (
                <Image
                  src={activeCover}
                  alt={property.name}
                  fill
                  unoptimized={!activeCover.startsWith("/")}
                  sizes="(min-width: 1280px) 66vw, 100vw"
                  className="object-cover"
                />
              ) : (
                <Building2
                  aria-hidden="true"
                  className="size-12 text-faint"
                  strokeWidth={1.4}
                />
              )}
            </div>

            {gallery.length > 1 && (
              <div className="flex gap-2 overflow-x-auto border-t border-line bg-surface/50 p-3">
                {gallery.map((img, index) => (
                  <button
                    key={`${img}-${index}`}
                    type="button"
                    onClick={() => setSelectedImage(img)}
                    aria-label={t("viewPhotoAria", { index: index + 1 })}
                    className={`relative h-14 w-20 shrink-0 cursor-pointer overflow-hidden border-2 ${
                      activeCover === img
                        ? "border-brand-blue"
                        : "border-transparent opacity-75 hover:opacity-100"
                    }`}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      unoptimized={!img.startsWith("/")}
                      sizes="80px"
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-4 p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div className="space-y-1.5">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="text-xs font-semibold uppercase tracking-wider text-faint">
                      {tTypes(property.type)} ·{" "}
                      {property.hasUnits
                        ? t("multiUnitLabel")
                        : t("standaloneLabel")}
                    </span>
                    <span aria-hidden="true" className="text-line">&middot;</span>
                    <StatusBadge
                      label={listingStatusLabel}
                      tone={LISTING_TONE[listingStatus]}
                    />
                  </div>
                  <h2 className="text-2xl font-bold tracking-tight text-ink">
                    {property.name}
                  </h2>
                  <p className="inline-flex items-center gap-1.5 text-sm text-body">
                    <MapPin aria-hidden="true" className="size-4 text-faint" />
                    <span>{property.location}</span>
                  </p>
                </div>

                {rent !== undefined && (
                  <div className="border border-line bg-surface/60 px-4 py-2.5 text-right">
                    <p className="text-xs font-semibold uppercase tracking-wider text-faint">
                      {property.hasUnits ? t("expectedMonthly") : t("monthlyRent")}
                    </p>
                    <p className="font-ibm text-lg font-bold text-ink">
                      {formatRwfLocalized(rent, locale)}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 border-y border-line py-3 text-xs font-medium text-body">
                {property.bedrooms !== undefined && (
                  <span className="inline-flex items-center gap-1.5">
                    <BedDouble aria-hidden="true" className="size-4 text-faint" />
                    {t("bedroomsCount", { count: property.bedrooms })}
                  </span>
                )}
                {property.bathrooms !== undefined && (
                  <span className="inline-flex items-center gap-1.5">
                    <Bath aria-hidden="true" className="size-4 text-faint" />
                    {t("bathroomsCount", { count: property.bathrooms })}
                  </span>
                )}
                {property.securityDepositRwf !== undefined && (
                  <span>
                    {t("depositLabel")}{" "}
                    <strong>
                      {formatRwfLocalized(property.securityDepositRwf, locale)}
                    </strong>
                  </span>
                )}
                {property.availableFrom && (
                  <span>
                    {t("availableFromLabel")}{" "}
                    <strong>{property.availableFrom}</strong>
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Eye aria-hidden="true" className="size-4 text-faint" />
                  {t("listingViews", { count: property.viewsCount ?? 0 })}
                </span>
              </div>

              {property.description && (
                <div className="space-y-1.5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                    {t("descriptionHeading")}
                  </h3>
                  <p className="text-sm leading-relaxed text-body">
                    {SEED_PROPERTY_IDS.has(property.id)
                      ? tSeed(`${property.id}.description`)
                      : property.description}
                  </p>
                </div>
              )}

              {property.amenities && property.amenities.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                    {t("amenitiesHeading")}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity) => {
                      const amenityKey = AMENITY_KEYS[amenity];
                      return (
                        <span
                          key={amenity}
                          className="border border-line bg-surface px-2.5 py-1 text-xs font-medium text-ink"
                        >
                          {amenityKey ? tAmenities(amenityKey) : amenity}
                        </span>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Listing Lifecycle & Visibility Controls */}
        <aside className="space-y-5">
          <div className="space-y-4 border border-line bg-white p-5 shadow-2xs">
            <div>
              <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                {t("visibilityHeading")}
              </h3>
              <p className="mt-1 text-xs text-body">{t("visibilityDesc")}</p>
            </div>

            <div className="flex flex-col gap-2">
              {listingStatus !== "Published" && (
                <Button
                  type="button"
                  onClick={() => setStatus("Published", t("toastPublished"))}
                  className="w-full cursor-pointer justify-start rounded-none text-xs"
                >
                  <CheckCircle2 aria-hidden="true" className="size-4" />
                  <span>{t("publishBtn")}</span>
                </Button>
              )}

              {listingStatus === "Published" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStatus("Paused", t("toastPaused"))}
                  className="w-full cursor-pointer justify-start rounded-none text-xs"
                >
                  <PauseCircle aria-hidden="true" className="size-4" />
                  <span>{t("pauseBtn")}</span>
                </Button>
              )}

              {listingStatus !== "Rented" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStatus("Rented", t("toastRented"))}
                  className="w-full cursor-pointer justify-start rounded-none text-xs"
                >
                  <Building2 aria-hidden="true" className="size-4" />
                  <span>{t("markRentedBtn")}</span>
                </Button>
              )}

              {listingStatus !== "Archived" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setStatus("Archived", t("toastArchived"))}
                  className="w-full cursor-pointer justify-start rounded-none text-xs"
                >
                  <Archive aria-hidden="true" className="size-4" />
                  <span>{t("archiveBtn")}</span>
                </Button>
              )}
            </div>

            <div className="border-t border-line pt-4">
              <Button
                type="button"
                variant="destructive"
                onClick={() => setConfirmDelete(true)}
                className="w-full cursor-pointer justify-start rounded-none text-xs"
              >
                <Trash2 aria-hidden="true" className="size-4" />
                <span>{t("deletePropertyBtn")}</span>
              </Button>
            </div>
          </div>

          <div className="space-y-3 border border-line bg-white p-5 shadow-2xs">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
              {t("tenantLeadsHeading")}
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/landlord/inquiries"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full justify-start rounded-none text-xs",
                )}
              >
                {t("viewInquiries")}
              </Link>
              <Link
                href="/landlord/viewings"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full justify-start rounded-none text-xs",
                )}
              >
                {t("manageViewings")}
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <ModalDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        variant="alert"
        title={t("deleteDialogTitle")}
        description={t("deleteDialogDesc", { name: property.name })}
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmDelete(false)}
              className="cursor-pointer rounded-none"
            >
              {t("cancel")}
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                deleteProperty(property.id);
                toast.success(t("toastDeleted", { name: property.name }));
                router.push("/landlord/properties");
              }}
              className="cursor-pointer rounded-none"
            >
              {t("confirmDelete")}
            </Button>
          </>
        }
      >
        <p className="text-xs text-body">
          {t("deleteDialogHintBefore")}
          <strong>{t("deleteDialogPause")}</strong>
          {t("deleteDialogOr")}
          <strong>{t("deleteDialogArchive")}</strong>
          {t("deleteDialogHintAfter")}
        </p>
      </ModalDialog>
    </main>
  );
}
