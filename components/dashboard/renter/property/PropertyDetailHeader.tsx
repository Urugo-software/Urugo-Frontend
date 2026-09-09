import { MapPin } from "lucide-react";

interface Props {
  name: string;
  // unitNumber: string;
  address: string;
}

export function PropertyDetailHeader({ name, address }: Props) {
  return (
    <div className="mb-6 flex flex-col gap-2 border-b border-line pb-4">
      <div className="flex items-center gap-2">
        <h2 className="text-xl font-bold text-ink  sm:text-2xl">{name}</h2>
      </div>
      <div className="flex items-center gap-2 text-[13px] text-body">
        <MapPin className="size-4 text-faint" />
        <span>{address}</span>
      </div>
    </div>
  );
}
