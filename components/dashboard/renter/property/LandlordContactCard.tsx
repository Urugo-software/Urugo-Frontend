import Link from "next/link";
import { Mail, MessageSquare, Phone } from "lucide-react";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import CardHeader from "./CardHeader";

interface Props {
  name: string;
  phone: string;
  email: string;
}

export function LandlordContactCard({ name, phone, email }: Props) {
  return (
    <div className="flex flex-col justify-between border border-line bg-white p-5 shadow-2xs">
      <div>
        <CardHeader title="Landlord Contact" />
        <div className="flex items-start gap-4">
          <UserAvatar name={name} className="size-12 text-sm" />
          <div className="min-w-0 space-y-2">
            <div className="text-base font-bold text-ink">{name}</div>
            <a
              href={`tel:${phone.replace(/\s+/g, "")}`}
              className="flex items-center gap-2 text-sm text-body hover:text-ink hover:underline"
            >
              <Phone aria-hidden="true" className="size-4 text-faint" />
              <span>{phone}</span>
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-sm text-body hover:text-ink hover:underline"
            >
              <Mail aria-hidden="true" className="size-4 text-faint" />
              <span className="truncate">{email}</span>
            </a>
          </div>
        </div>
      </div>

      <div className="mt-5 border-t border-line pt-4">
        <Link
          href="/renter/messages"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-9 w-full rounded-none text-xs font-semibold",
          )}
        >
          <MessageSquare aria-hidden="true" className="size-4" />
          Message Landlord
        </Link>
      </div>
    </div>
  );
}
