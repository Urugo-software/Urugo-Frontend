"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
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
import { cn } from "@/lib/utils";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { ListingStatus } from "@/types/landlord";
import { formatPropertyRent, formatRwf } from "@/utils/format";

const LISTING_TONE: Record<ListingStatus, StatusTone> = {
  Published: "success",
  Draft: "neutral",
  Paused: "warning",
  Rented: "info",
  Archived: "neutral",
};

export function PropertyDetailsView({ propertyId }: { propertyId: string }) {
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
          title="Property not found"
          description="This property may have been removed or the link is no longer valid."
          action={
            <Link
              href="/landlord/properties"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "rounded-none",
              )}
            >
              Back to My Properties
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
          <span>{group ? `Back to ${group.name}` : "Back to My Properties"}</span>
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
            <span>Edit Property</span>
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
                {property.hasUnits ? "Manage Units & Leases" : "Manage Lease"}
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
                    aria-label={`View photo ${index + 1}`}
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
                      {property.type} ·{" "}
                      {property.hasUnits ? "Multi-Unit Building" : "Standalone"}
                    </span>
                    <span aria-hidden="true" className="text-line">&middot;</span>
                    <StatusBadge
                      label={listingStatus}
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
                      {property.hasUnits ? "Expected Monthly" : "Monthly Rent"}
                    </p>
                    <p className="font-ibm text-lg font-bold text-ink">
                      {formatRwf(rent)}
                    </p>
                  </div>
                )}
              </div>

              <div className="flex flex-wrap gap-4 border-y border-line py-3 text-xs font-medium text-body">
                {property.bedrooms !== undefined && (
                  <span className="inline-flex items-center gap-1.5">
                    <BedDouble aria-hidden="true" className="size-4 text-faint" />
                    {property.bedrooms} Bedrooms
                  </span>
                )}
                {property.bathrooms !== undefined && (
                  <span className="inline-flex items-center gap-1.5">
                    <Bath aria-hidden="true" className="size-4 text-faint" />
                    {property.bathrooms} Bathrooms
                  </span>
                )}
                {property.securityDepositRwf !== undefined && (
                  <span>
                    Deposit: <strong>{formatRwf(property.securityDepositRwf)}</strong>
                  </span>
                )}
                {property.availableFrom && (
                  <span>
                    Available from: <strong>{property.availableFrom}</strong>
                  </span>
                )}
                <span className="inline-flex items-center gap-1.5">
                  <Eye aria-hidden="true" className="size-4 text-faint" />
                  {property.viewsCount ?? 0} listing views
                </span>
              </div>

              {property.description && (
                <div className="space-y-1.5">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                    Description
                  </h3>
                  <p className="text-sm leading-relaxed text-body">
                    {property.description}
                  </p>
                </div>
              )}

              {property.amenities && property.amenities.length > 0 && (
                <div className="space-y-2">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
                    Amenities
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {property.amenities.map((amenity) => (
                      <span
                        key={amenity}
                        className="border border-line bg-surface px-2.5 py-1 text-xs font-medium text-ink"
                      >
                        {amenity}
                      </span>
                    ))}
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
                Listing Visibility & Availability
              </h3>
              <p className="mt-1 text-xs text-body">
                Control whether prospective tenants can see and inquire about
                this property on Urugo.
              </p>
            </div>

            <div className="flex flex-col gap-2">
              {listingStatus !== "Published" && (
                <Button
                  type="button"
                  onClick={() =>
                    setStatus(
                      "Published",
                      "Listing published and visible to tenants.",
                    )
                  }
                  className="w-full cursor-pointer justify-start rounded-none text-xs"
                >
                  <CheckCircle2 aria-hidden="true" className="size-4" />
                  <span>Publish / Mark Available</span>
                </Button>
              )}

              {listingStatus === "Published" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setStatus("Paused", "Listing temporarily paused.")
                  }
                  className="w-full cursor-pointer justify-start rounded-none text-xs"
                >
                  <PauseCircle aria-hidden="true" className="size-4" />
                  <span>Temporarily Pause Listing</span>
                </Button>
              )}

              {listingStatus !== "Rented" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setStatus("Rented", "Property marked as rented / unavailable.")
                  }
                  className="w-full cursor-pointer justify-start rounded-none text-xs"
                >
                  <Building2 aria-hidden="true" className="size-4" />
                  <span>Mark as Rented / Unavailable</span>
                </Button>
              )}

              {listingStatus !== "Archived" && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() =>
                    setStatus("Archived", "Listing moved to archived state.")
                  }
                  className="w-full cursor-pointer justify-start rounded-none text-xs"
                >
                  <Archive aria-hidden="true" className="size-4" />
                  <span>Archive Listing</span>
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
                <span>Delete Property</span>
              </Button>
            </div>
          </div>

          <div className="space-y-3 border border-line bg-white p-5 shadow-2xs">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
              Tenant Leads
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/landlord/inquiries"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full justify-start rounded-none text-xs",
                )}
              >
                View Inquiries
              </Link>
              <Link
                href="/landlord/viewings"
                className={cn(
                  buttonVariants({ variant: "outline" }),
                  "w-full justify-start rounded-none text-xs",
                )}
              >
                Manage Viewing Requests
              </Link>
            </div>
          </div>
        </aside>
      </div>

      <ModalDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        variant="alert"
        title="Delete property?"
        description={`Delete "${property.name}" permanently from your landlord portfolio? This removes its listing and any unlinked unit records.`}
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmDelete(false)}
              className="cursor-pointer rounded-none"
            >
              Cancel
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                deleteProperty(property.id);
                toast.success(`"${property.name}" deleted.`);
                router.push("/landlord/properties");
              }}
              className="cursor-pointer rounded-none"
            >
              Confirm Delete
            </Button>
          </>
        }
      >
        <p className="text-xs text-body">
          If you only want to hide this listing temporarily while keeping its
          history, use <strong>Pause</strong> or <strong>Archive</strong>{" "}
          instead.
        </p>
      </ModalDialog>
    </main>
  );
}
