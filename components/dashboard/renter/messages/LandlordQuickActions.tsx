import CustomButton from "@/components/shared/CustomButton";
import { Phone, ShieldAlert } from "lucide-react";
import Link from "next/link";

export function LandlordQuickActions({ phone }: { phone: string }) {
  return (
    <div className="pt-2 flex flex-col items-center gap-1 space-y-2">
      <Link className="w-full" href={"tel:" + phone}>
        <CustomButton variant="light" className="w-full">
          <span className="-translate-x-4 group-hover:text-white flex items-center gap-4">
            <Phone className="size-4" /> Call Landlord
          </span>
        </CustomButton>
      </Link>

      <Link href="/renter/maintenance" className="w-full">
        <CustomButton variant="cancel" className="w-full">
          <span className="-translate-x-4 group-hover:text-white flex items-center gap-4">
            Report Maintenance Issue
          </span>
        </CustomButton>
      </Link>
    </div>
  );
}
