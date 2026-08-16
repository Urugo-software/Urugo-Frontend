"use client";
import OnLoadSkeleton from "@/components/shared/OnLoadSkeleton";
import { Heart, House, MapPin } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";
import { useState } from "react";

interface PropertyCardProps {
  image: StaticImageData;
  title: string;
  location: string;
  price: string;
  amenities: string[];
}

function PropertyCard({
  image,
  title,
  location,
  price,
  amenities,
}: PropertyCardProps) {
  // image load state
  const [isImageLoaded, setImageLoaded] = useState(false);

  const currency = "Rwf";
  return (
    <div className="flex-none w-full md:max-w-[400px] h-[420px] flex flex-col overflow-hidden  border cursor-pointer border-brand/20 bg-white transition-all duration-300 hover:-translate-y-1 hover:border-brand hover:shadow-[0_18px_40px_-18px_rgba(14,17,22,.22)]">
      {/* Image */}
      <div className="relative h-full overflow-hidden">
        {!isImageLoaded && <OnLoadSkeleton />}

        <Image
          fill
          src={image}
          alt={title}
          sizes="(max-width:768px) 100vw, 400px"
          onLoad={() => setImageLoaded(true)}
          className={`object-cover w-full h-full transition-opacity duration-300 ${
            isImageLoaded ? "opacity-100" : "opacity-0"
          }`}
        />

        <span className="absolute left-4 top-4 flex items-center gap-2 rounded-full bg-white px-3 py-1.5 text-[11px] font-semibold text-success shadow-sm">
          <span className="h-2 w-2 rounded-full bg-success" />
          Available
        </span>

        <button className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/95 shadow-sm transition hover:bg-white">
          <Heart size={16} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4 pt-6 pb-8 ">
        {/* Title + Price */}
        <div className="flex items-start justify-between gap-4">
          <Link href={`/properties/${title}`} className="group flex-1">
            <h3 className="text-md text-nowrap max-w-[150px]  truncate font-semibold  text-ink transition-colors group-hover:text-brand tracking-tight">
              {title}
            </h3>
          </Link>

          <div className=" flex items-center gap-1 text-right">
            <div className="font-ibm text-[14px] font-bold text-brand">
              {price}
            </div>
            <div className="text-[11px] text-body">{currency}</div>
          </div>
        </div>

        {/* Location */}
        <div className="mt-2 flex items-center gap-2 text-sm tracking-tight text-body">
          <MapPin size={15} className="text-faint" />
          <span>{location}</span>
        </div>

        {/* Divider */}
        <div className="my-4 border-t border-line" />

        {/* Amenities */}
        <div className="flex items-center justify-between ">
          <div className="flex items-center gap-2 text-sm text-ink">
            <House size={14} className="text-faint" />
            <span className="truncate whitespace-nowrap text-[13px] max-w-[130px]">
              {amenities.join(", ")}
            </span>
          </div>

          <span className="text-xs text-faint">
            {amenities.length}{" "}
            {amenities.length === 1 ? "amenity" : "amenities"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
