"use client";

import Image from "next/image";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import type { PropertyCardImageProps } from "@/types";

function PropertyCardImage({
  propertyId,
  viewMode = "list",
  image,
  headline,
  isVerified,
  availabilityStatus,
}: PropertyCardImageProps & { viewMode?: "grid" | "list" }) {
  const isAvailable = availabilityStatus.toLowerCase() === "available";

  const imageContent = (
    <>
      <Image
        fill
        src={image}
        alt={headline}
        sizes={
          viewMode === "grid"
            ? "(max-width: 767px) 100vw, (max-width: 1279px) 50vw, 33vw"
            : "(max-width: 640px) 100vw, 210px"
        }
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 transition-opacity group-hover:opacity-70 sm:opacity-40" />

      {isVerified && (
        <span className="absolute right-2.5 top-2.5 z-10 inline-flex items-center gap-1 rounded-sm bg-white/95 px-2 py-1 text-[12.5px] font-semibold text-brand shadow-xs">
          <ShieldCheck aria-hidden="true" className="size-3.5" />
          Verified
        </span>
      )}

      <div className="absolute bottom-2.5 left-2.5 z-10">
        <span
          className={`inline-flex items-center gap-1 rounded-sm px-2 py-1 text-[12.5px] font-medium uppercase tracking-wide text-white shadow-xs backdrop-blur-sm ${
            isAvailable ? "bg-brand" : "bg-ink/80"
          }`}
        >
          {isAvailable ? "Available" : "Occupied"}
        </span>
      </div>
    </>
  );

  const containerClass = `relative block h-48 w-full ${
    viewMode === "list" ? "sm:h-40 sm:w-52" : "sm:h-52"
  } shrink-0 overflow-hidden rounded-xl bg-surface`;

  if (propertyId) {
    return (
      <Link
        href={`/properties/${propertyId}`}
        aria-label={`View details for ${headline}`}
        className={containerClass}
      >
        {imageContent}
      </Link>
    );
  }

  return <div className={containerClass}>{imageContent}</div>;
}

export default PropertyCardImage;
