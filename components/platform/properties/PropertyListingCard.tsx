"use client";

import Image, { StaticImageData } from "next/image";
import {
  Bath,
  BedDouble,
  CarFront,
  CheckCircle2,
  MapPin,
  ShieldAlert,
} from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

interface PropertyListingCardProps {
  id: string;
  image: string | StaticImageData;
  headline: string;
  ownerName: string;
  price: string;
  currency: string;
  period: string;
  location: string;
  beds: number;
  baths: number;
  parking?: boolean;
  isVerified: boolean;
  availabilityStatus: string;
  index?: number;
}

function PropertyListingCard({
  id,
  image,
  headline,
  ownerName,
  price,
  currency,
  period,
  location,
  beds,
  baths,
  parking,
  isVerified,
  availabilityStatus = "not found",
  index = 0,
}: PropertyListingCardProps) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08, ease: "easeOut" }}
      whileHover={{ y: -3, transition: { duration: 0.2 } }}
      className="group max-lg:flex-col flex gap-4 rounded-sm border border-brand/10 bg-white p-4 transition-all duration-300 hover:border-brand/40 hover:shadow-[0_10px_30px_-18px_rgba(29,78,216,.35)]"
    >
      {/* Property image */}
      <div className="relative max-lg:w-full max-lg:h-32 w-28 shrink-0 overflow-hidden rounded-sm bg-surface">
        <Image
          fill
          src={image}
          alt={headline}
          className="h-full w-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        />
      </div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <Link href={`/properties/${id}`}>
              <h3 className="truncate hover:text-brand hover:underline tracking-tight text-[17px] font-bold text-brand-deep capitalize transition-colors">
                {headline}
              </h3>
            </Link>

            <div className="mt-1 flex items-center gap-1.5 text-[12px] text-gray-500">
              <span>Listed by {ownerName}</span>
              <span className="text-line">·</span>
            </div>
          </div>

          <button
            type="button"
            aria-label="More options"
            className="shrink-0 rounded-md p-1 text-faint transition hover:bg-surface hover:text-ink cursor-pointer"
          >
            {/* Price */}
            <div>
              <span className="tracking-tight text-[15px] font-extrabold text-brand-deep">
                {price}
              </span>
              <span className="ml-1 text-[11px] text-body">
                {currency} / {period}
              </span>
            </div>
          </button>
        </div>

        {/* Details */}
        <div className="mt-5 flex flex-col items-start justify-between gap-4">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            <span className="flex items-center gap-1.5 text-xs text-body">
              <MapPin className="h-3.5 w-3.5 text-faint group-hover:text-brand transition-colors" />
              {location}
            </span>

            {beds > 0 && (
              <span className="flex items-center gap-1.5 text-xs text-body">
                <BedDouble className="h-3.5 w-3.5 text-faint group-hover:text-brand transition-colors" />
                {beds} {beds > 1 ? "beds" : "bed"}
              </span>
            )}

            {baths > 0 && (
              <span className="flex items-center gap-1.5 text-xs text-body">
                <Bath className="h-3.5 w-3.5 text-faint group-hover:text-brand transition-colors" />
                {baths} {baths > 1 ? "baths" : "bath"}
              </span>
            )}

            {parking && (
              <span className="flex items-center gap-1.5 text-xs text-body">
                <CarFront className="h-3.5 w-3.5 text-faint group-hover:text-brand transition-colors" />
                Parking
              </span>
            )}

            <span
              className={`flex items-center gap-1 text-[11px] font-semibold ${
                isVerified ? "text-brand" : "text-red-600"
              }`}
            >
              {isVerified ? (
                <CheckCircle2 className="h-3.5 w-3.5" />
              ) : (
                <ShieldAlert className="h-3.5 w-3.5 text-red-600" />
              )}
              {isVerified ? "Verified" : "Not Verified"}
            </span>
          </div>
          <span className="bg-white/95 px-2 py-1 text-xs border border-brand/40 font-bold text-brand-deep uppercase group-hover:border-brand transition-colors">
            {availabilityStatus}
          </span>
        </div>
      </div>
    </motion.article>
  );
}

export default PropertyListingCard;
