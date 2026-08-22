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
  return (
    <div className="group overflow-hidden rounded-2xl border border-line bg-white shadow-xs transition hover:shadow-md">
      <div className="relative h-[170px] w-full overflow-hidden bg-surface">
        <Image
          src={property.image}
          alt={property.title}
          fill
          className="object-cover transition duration-300 group-hover:scale-105"
        />
        <span
          className={`absolute top-3 left-3 rounded-full px-2.5 py-1 text-[11px] font-bold ${
            isAvailable
              ? "bg-white text-success shadow-xs"
              : "bg-white text-warn shadow-xs"
          }`}
        >
          {property.status}
        </span>
        <button
          type="button"
          aria-label="Toggle favorite"
          onClick={() => onRemove(property.id)}
          className="absolute top-3 right-3 flex size-8 items-center justify-center rounded-full bg-white text-brand shadow-xs transition hover:scale-110 cursor-pointer"
        >
          <Heart className="size-4 fill-brand stroke-brand" />
        </button>
      </div>

      <div className="p-4.5">
        <div className="mb-1 flex items-start justify-between gap-2">
          <div className="text-[14.5px] font-bold leading-tight text-ink">
            {property.title}
          </div>
          <div className="font-mono text-sm font-extrabold text-brand whitespace-nowrap">
            {property.price}
          </div>
        </div>
        <div className="mb-3 text-xs text-body">
          {property.location} · {property.features}
        </div>
        <div className="flex gap-2">
          <Link
            href={
              property.isWaitingList
                ? "/home-seeker/waiting-list"
                : "/properties"
            }
            className="flex-1"
          >
            <CustomButton
              variant={property.isWaitingList ? "light" : "colored"}
              title={property.isWaitingList ? "On waiting list" : "View"}
              className="w-full text-center text-[13px]"
            />
          </Link>
          <button
            type="button"
            onClick={() => onRemove(property.id)}
            className="rounded-lg border border-line px-3 py-2 text-[13px] font-semibold text-body transition hover:bg-surface hover:text-ink cursor-pointer"
          >
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}
