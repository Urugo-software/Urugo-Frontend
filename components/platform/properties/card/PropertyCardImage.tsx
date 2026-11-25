"use client";

import Image from "next/image";
import { PropertyCardImageProps } from "@/types";

function PropertyCardImage({
  viewMode = "list",
  image,
  headline,
  availabilityStatus,
}: PropertyCardImageProps & { viewMode?: "grid" | "list" }) {
  return (
    <div
      className={`relative h-48 w-full ${viewMode === "list" ? "sm:h-40 sm:w-52" : "sm:h-52"} shrink-0 overflow-hidden rounded-xl bg-surface`}
    >
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

      <div className="absolute bottom-2.5 left-2.5 z-10">
        <span className="inline-flex items-center gap-1 rounded-sm bg-brand px-2 py-1 text-[12.5px] font-medium uppercase tracking-wide text-white shadow-xs backdrop-blur-sm">
          {availabilityStatus}
        </span>
      </div>
    </div>
  );
}

export default PropertyCardImage;
