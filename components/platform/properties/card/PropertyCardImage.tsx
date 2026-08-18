"use client";

import Image from "next/image";
import {  Heart,  } from "lucide-react";
import { useState } from "react";
import { PropertyCardImageProps } from "@/types";

function PropertyCardImage({
  image,
  headline,

  availabilityStatus,
}: PropertyCardImageProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <div className="relative w-full h-48 sm:w-52 sm:h-40 shrink-0 overflow-hidden rounded-xl bg-surface">
      <Image
        fill
        src={image}
        alt={headline}
        sizes="(max-width: 640px) 100vw, 210px"
        className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
      />

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-60 sm:opacity-40 transition-opacity group-hover:opacity-70" />

      {/* Favorite Heart Button */}
      <button
        type="button"
        onClick={() => setIsLiked(!isLiked)}
        aria-label="Save property"
        className="absolute top-2.5 right-2.5 z-10 flex h-8 w-8 items-center justify-center rounded-full bg-white/85 backdrop-blur-md text-ink transition-transform duration-200 hover:scale-110 active:scale-95 cursor-pointer shadow-xs"
      >
        <Heart
          className={`h-4 w-4 transition-colors ${
            isLiked
              ? "fill-red-500 text-red-500"
              : "text-body hover:text-red-500"
          }`}
        />
      </button>

      {/* Availability Pill */}
      <div className="absolute bottom-2.5 left-2.5 z-10">
        <span className="inline-flex items-center gap-1 py-1 px-2 bg-brand backdrop-blur-sm  text-[10.5px] font-medium rounded-sm uppercase tracking-wide text-white shadow-xs">
          {availabilityStatus}
        </span>
      </div>
    </div>
  );
}

export default PropertyCardImage;
