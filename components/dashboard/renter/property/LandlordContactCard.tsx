import { User, Phone, Mail } from "lucide-react";
import CardHeader from "./CardHeader";

interface Props {
  name: string;
  phone: string;
  email: string;
}

export function LandlordContactCard({ name, phone, email }: Props) {
  return (
    <div className=" border border-line bg-white p-5 shadow-xs">
      <CardHeader title="Landlord Contact" />
      <div className="flex items-start gap-4">
        <div className="grid size-11 place-items-center rounded-full bg-brand-tint text-brand">
          <User className="size-6" />
        </div>
        <div>
          <div className="text-sm font-bold tracking-[0.5px] text-ink">
            {name}
          </div>
          <div className="flex items-center mt-2 gap-1.5 text-[12.5px] text-body ">
            <Phone className="size-3.5 text-faint" />
            <span className="tracking-[0.5px]">{phone}</span>
          </div>
          <div className="flex items-center mt-2 gap-1.5 text-[12.5px] text-body ">
            <Mail className="size-3.5 text-faint" />
            <span className="tracking-[0.5px]">{email}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
