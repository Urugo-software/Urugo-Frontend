import { Landlord } from "@/types/properties";

interface LandlordCardProps {
  landlord: Landlord;
}

export default function LandlordCard({ landlord }: LandlordCardProps) {
  return (
    <div className="flex self-end gap-3 mb-5">
      <div className="w-11 h-11 rounded-full bg-brand-tint flex items-center justify-center font-bold text-brand">
        {landlord.initials}
      </div>

      <div>
        <div className="flex items-center gap-1.5 text-[14.5px] font-bold">
          {landlord.name}

          {landlord.isVerified && <span className="text-brand text-xs">✓</span>}
        </div>

        <div className="text-[12.5px] text-body">Verified landlord</div>

        <a
          href={`tel:${landlord.phone}`}
          className="text-[12.5px] text-body hover:text-brand transition-colors"
        >
          {landlord.phone}
        </a>
      </div>
    </div>
  );
}
