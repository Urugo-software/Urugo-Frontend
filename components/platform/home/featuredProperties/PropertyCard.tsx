import { Heart } from "lucide-react";
import Image from "next/image";

function PropertyCard() {
  return (
    <div className="flex-none w-[300px] snap-start bg-white border border-line rounded-2xl overflow-hidden hover:shadow-[0_16px_40px_-18px_rgba(14,17,22,.22)] hover:-translate-y-0.5 transition">
      <div className="relative h-[190px] overflow-hidden">
        <Image
          height={30}
          width={30}
          alt="property image"
          src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=500&q=80"
          className="w-full h-full object-cover"
        />
        <span className="absolute top-3 left-3 bg-white text-[11px] font-bold text-success px-2.5 py-1.5 rounded-full flex items-center gap-1.5">
          <span className="w-2 h-2 bg-success animate-pulse rounded-full" />
          Available
        </span>
        <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center">
          <Heart size={16} />
        </div>
      </div>
      <div className="px-4.5 pt-4 pb-4.5">
        <div className="flex justify-between items-start gap-2.5 mb-1">
          <div className="text-[14.5px] font-bold leading-tight">
            2BR Apartment — Kimironko
          </div>
          <div className="text-sm font-extrabold text-brand font-mono whitespace-nowrap">
            150,000
          </div>
        </div>
        <div className="text-xs text-body mb-3 flex items-center gap-1.5">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none">
            <path
              d="M12 21s7-6.5 7-11.5A7 7 0 105 9.5C5 14.5 12 21 12 21z"
              stroke="#8A93A3"
              stroke-width="1.6"
            />
            <circle
              cx="12"
              cy="9.5"
              r="2.3"
              stroke="#8A93A3"
              stroke-width="1.6"
            />
          </svg>
          Gasabo District
        </div>
        <div className="flex justify-between items-center pt-3 border-t border-line">
          <div className="text-xs font-semibold flex items-center gap-1">
            <svg width="12" height="12" viewBox="0 0 24 24" fill="#F59E0B">
              <path d="M12 2.5l2.9 6.1 6.6.9-4.8 4.6 1.2 6.6L12 17.6l-5.9 3.1 1.2-6.6-4.8-4.6 6.6-.9L12 2.5z" />
            </svg>
            4.8
          </div>
          <div className="text-xs text-faint">2 bed · 1 bath</div>
        </div>
      </div>
    </div>
  );
}

export default PropertyCard;
