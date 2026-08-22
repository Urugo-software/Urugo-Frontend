"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { FullSavedProperty } from "@/data/saved-properties-data";
import CustomButton from "@/components/shared/CustomButton";

interface SavedPropertyCardProps {
  property: FullSavedProperty;
  onRemove: (id: string) => void;
}

export function SavedPropertyCard({
  property,
  onRemove,
}: SavedPropertyCardProps) {
  const isAvailable = property.status === "Available";
  const linkHref = property.isWaitingList
    ? "/home-seeker/waiting-list"
    : "/properties";

  return (
    <div className=" overflow-hidden border border-line bg-white shadow-xs transition duration-300 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative h-[180px] w-full overflow-hidden bg-surface">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition duration-500 "
        />
        <span
          className={`absolute top-3 left-3 rounded-md px-2.5 py-1 text-[11px] font-bold tracking-wide uppercase ${
            isAvailable
              ? "bg-white text-success shadow-sm"
              : "bg-white text-warn shadow-sm"
          }`}
        >
          {property.status}
        </span>
        <button
          type="button"
          aria-label="Remove favorite"
          onClick={() => onRemove(property.id)}
          className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white text-brand shadow-sm transition hover:scale-110 cursor-pointer"
        >
          <Heart className="size-4.5 fill-brand stroke-brand" />
        </button>
      </div>

      <div className="p-5">
        <div className="mb-2 flex items-baseline justify-between gap-3">
          <h3 className="text-[16.5px] font-bold text-ink leading-snug">
            {property.title}
          </h3>
          <span className="font-mono text-[15.5px] font-extrabold text-brand">
            {property.price} Rwf
          </span>
        </div>
        <p className="mb-4.5 text-[13.5px] text-body">{property.location}</p>
        <div className="flex gap-2.5">
          <Link href={linkHref} className="flex-1">
            <CustomButton
              variant="light"
              className="w-full rounded-none  text-center text-[13.5px] font-bold"
            >
              <span className="-translate-x-3 text-brand group-hover:text-white z-20">
                {property.isWaitingList ? "On waiting list" : "View Details"}
              </span>
            </CustomButton>
          </Link>
          <button
            type="button"
            onClick={() => onRemove(property.id)}
            className="border border-line px-4.5 h-10 text-[13.5px] font-semibold text-ink transition hover:bg-brand duration-300 ease-in-out hover:text-white cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
