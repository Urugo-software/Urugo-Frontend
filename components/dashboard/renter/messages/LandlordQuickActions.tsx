import Link from "next/link";
import { Phone, Wrench } from "lucide-react";
import { Button } from "@/components/ui/button";

export function LandlordQuickActions({ phone }: { phone: string }) {
  return (
    <div className="flex flex-col gap-2 pt-2">
      <a href={`tel:${phone}`} className="w-full">
        <Button
          type="button"
          className="w-full cursor-pointer justify-center rounded-none"
        >
          <Phone aria-hidden="true" className="size-4" />
          Call Landlord
        </Button>
      </a>

      <Link href="/renter/maintenance" className="w-full">
        <Button
          type="button"
          variant="outline"
          className="w-full cursor-pointer justify-center rounded-none"
        >
          <Wrench aria-hidden="true" className="size-4" />
          Report Maintenance Issue
        </Button>
      </Link>
    </div>
  );
}
