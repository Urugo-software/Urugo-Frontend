"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import { Building2, Check, ShieldCheck } from "lucide-react";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { LandlordServiceMode } from "@/types/landlord";

const SERVICE_PLANS: Array<{
  mode: LandlordServiceMode;
  title: string;
  subtitle: string;
  features: string[];
  icon: typeof Building2;
}> = [
  {
    mode: "listing_only",
    title: "Listing-Only Landlord",
    subtitle:
      "Advertise properties and connect with prospective tenants independently.",
    icon: Building2,
    features: [
      "Publish, pause, mark rented, or archive property listings",
      "Photo galleries, amenities, and public contact visibility controls",
      "Receive and reply to prospective tenant inquiries",
      "Confirm, reschedule, or decline viewing requests",
      "Zero rental-management clutter in your dashboard",
    ],
  },
  {
    mode: "managed",
    title: "Urugo Full Rental Management",
    subtitle:
      "Everything in Listing-Only plus complete tenant, lease, payment, and rental history tools.",
    icon: ShieldCheck,
    features: [
      "Everything included in Listing-Only",
      "Property groups, multi-unit tracking, and occupancy metrics",
      "Renter onboarding wizard and bilingual digital lease agreements",
      "Rent payment verification ledger with monthly & YTD summaries",
      "3-day notice rental history, dispute resolution, and End Tenancy",
    ],
  },
];

export function ServiceTab({ onSave }: { onSave: () => void }) {
  const { serviceMode, setServiceMode } = useLandlordWorkspace();
  const [pendingMode, setPendingMode] = useState<LandlordServiceMode | null>(
    null,
  );

  const applyMode = (mode: LandlordServiceMode) => {
    setServiceMode(mode);
    toast.success(
      mode === "managed"
        ? "Upgraded to Urugo Full Rental Management."
        : "Switched workspace to Listing-Only mode.",
    );
    onSave();
    setPendingMode(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-ink">
          Landlord Service Path
        </h3>
        <p className="mt-1 text-xs text-body">
          Urugo uses one landlord account and one dashboard for both service
          modes. Switch or upgrade anytime without recreating properties or
          losing data.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {SERVICE_PLANS.map(({ mode, title, subtitle, features, icon: Icon }) => {
          const isCurrent = serviceMode === mode;
          return (
            <div
              key={mode}
              className={`flex flex-col justify-between space-y-5 border p-5 ${
                isCurrent
                  ? "border-brand-blue bg-brand-tint/25"
                  : "border-line bg-white"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-9 items-center justify-center border border-line bg-white text-brand-blue">
                      <Icon aria-hidden="true" className="size-4" />
                    </div>
                    <h4 className="text-sm font-bold text-ink">{title}</h4>
                  </div>
                  {isCurrent && (
                    <StatusBadge label="Active Plan" tone="success" />
                  )}
                </div>

                <p className="text-xs leading-relaxed text-body">{subtitle}</p>

                <ul className="space-y-2 border-t border-line pt-3">
                  {features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-xs text-ink"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-3.5 shrink-0 text-emerald-600"
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                type="button"
                variant={isCurrent ? "outline" : "default"}
                disabled={isCurrent}
                onClick={() => setPendingMode(mode)}
                className="w-full cursor-pointer rounded-none text-xs"
              >
                {isCurrent
                  ? "Currently Active"
                  : mode === "managed"
                    ? "Upgrade to Full Rental Management"
                    : "Switch to Listing-Only Mode"}
              </Button>
            </div>
          );
        })}
      </div>

      <ModalDialog
        open={pendingMode !== null}
        onClose={() => setPendingMode(null)}
        title={
          pendingMode === "managed"
            ? "Upgrade to Full Rental Management?"
            : "Switch to Listing-Only Mode?"
        }
        description={
          pendingMode === "managed"
            ? "This immediately unlocks Renters, Agreements, Tenancies, Payments, and Rental History in your sidebar while keeping all existing listings intact."
            : "Management links will be hidden from your sidebar and overview so you can focus purely on advertising, inquiries, and viewings. Your existing data stays preserved."
        }
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setPendingMode(null)}
              className="cursor-pointer rounded-none"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={() => pendingMode && applyMode(pendingMode)}
              className="cursor-pointer rounded-none"
            >
              Confirm Change
            </Button>
          </>
        }
      >
        <p className="text-xs text-body">
          You can change your landlord service path again anytime from Settings.
        </p>
      </ModalDialog>
    </div>
  );
}
