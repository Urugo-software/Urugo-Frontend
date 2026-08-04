import { Heart, House, LocateIcon, MapPin, Star } from "lucide-react";
import Image, { StaticImageData } from "next/image";
import Link from "next/link";

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
  const currency = "Rwf";
  return (
    <div className="flex-none rounded-xl w-full max-w-[400px]  bg-white border border-line  overflow-hidden hover:shadow-[0_16px_40px_-18px_rgba(14,17,22,.22)] hover:-translate-y-0.5 transition">
      <div className="relative h-[190px] overflow-hidden">
        <Image
          height={30}
          width={30}
          unoptimized
          alt={title}
          src={image}
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 bg-white text-[11px] font-bold text-success px-2.5 py-1.5 rounded-full flex items-center gap-1.5">
          <span className="w-2 h-2 bg-success animate-pulse rounded-full" />
          Available
        </span>
        <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-white/90 flex items-center justify-center">
          <Heart size={14} />
        </div>
      </div>
      <div className="px-4.5 pt-4 pb-4.5">
        <div className="flex justify-between items-start gap-2.5 mb-1">
          <Link
            href={`/properties/${title}`}
            className="hover:text-brand duration-300"
          >
            <div className="text-[14.5px] font-bold leading-tight">{title}</div>
          </Link>
          <div className="text-sm font-extrabold font-ibm  text-brand  whitespace-nowrap">
            {price} {currency}
          </div>
        </div>
        <div className="text-xs text-body mb-3 flex items-center gap-1.5">
          <MapPin size={12} className="text-faint" />
          {location}
        </div>
        <div className="hidden lg:flex justify-between items-center pt-3 mt-5 border-t border-line">
          <div className="text-xs text-ink font-semibold flex items-center gap-1">
            <House className="text-faint" size={11} />
            {amenities.join(", ")}
          </div>
          <div className="text-xs text-faint">
            {amenities.length} amenit{amenities.length !== 1 ? "ies" : "y"}
          </div>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
