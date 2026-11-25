"use client";

import Link from "next/link";
import {
  Building2,
  Calendar,
  CreditCard,
  FileText,
  MessageSquare,
  Plus,
  UserPlus,
} from "lucide-react";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { LandlordServiceMode } from "@/types/landlord";

interface LandlordGreetingHeaderProps {
  name: string;
  serviceMode: LandlordServiceMode;
}

export function LandlordGreetingHeader({
  name,
  serviceMode,
}: LandlordGreetingHeaderProps) {
  const firstName = name.split(/\s+/)[0] || "Landlord";

  const quickActions =
    serviceMode === "listing_only"
      ? [
          {
            label: "Add Listing",
            href: "/landlord/properties/new",
            icon: Plus,
            primary: true,
          },
          {
            label: "Inquiries",
            href: "/landlord/inquiries",
            icon: MessageSquare,
          },
          { label: "Viewings", href: "/landlord/viewings", icon: Calendar },
        ]
      : [
          {
            label: "Add Property",
            href: "/landlord/properties/new",
            icon: Building2,
            primary: true,
          },
          {
            label: "Add Renter",
            href: "/landlord/renters/add",
            icon: UserPlus,
          },
          { label: "Agreements", href: "/landlord/agreements", icon: FileText },
          { label: "Payments", href: "/landlord/payments", icon: CreditCard },
        ];

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
      <div className="space-y-1.5">
        <div className="flex flex-wrap items-center gap-2.5">
          <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
            Good morning, {firstName}
          </h2>
          <span aria-hidden="true" className="text-line">
            &middot;
          </span>
          <Link
            href="/landlord/settings?tab=service"
            className="hover:underline"
          >
            <StatusBadge
              label={
                serviceMode === "listing_only"
                  ? "Listing-Only Plan"
                  : "Managed Plan"
              }
              tone={serviceMode === "listing_only" ? "info" : "success"}
            />
          </Link>
        </div>
        <p className="text-sm text-body">
          {serviceMode === "listing_only"
            ? "Track your active listings, incoming tenant inquiries, and viewing requests."
            : "Overview of your portfolio occupancy, monthly and year-to-date rent collection, and priority tasks."}
        </p>
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {quickActions.map(({ label, href, icon: Icon, primary }) => (
          <Link
            key={href}
            href={href}
            className={cn(
              buttonVariants({ variant: primary ? "default" : "outline" }),
              "h-9 rounded-none px-3.5 text-xs font-semibold",
            )}
          >
            <Icon aria-hidden="true" className="size-3.5" />
            <span>{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
