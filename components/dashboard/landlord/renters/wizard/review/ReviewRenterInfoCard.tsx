"use client";

import { Edit3, User } from "lucide-react";
import {
  AddRenterMode,
  RenterIdentityDraft,
} from "@/types/renter-wizard.types";
import { SimulatedRenterInvitationLink } from "@/types/renter-registration.types";

interface ReviewRenterInfoCardProps {
  mode: AddRenterMode;
  identity: RenterIdentityDraft;
  simulatedLink: SimulatedRenterInvitationLink | null;
  onEdit: () => void;
}

export function ReviewRenterInfoCard({
  mode,
  identity,
  simulatedLink,
  onEdit,
}: ReviewRenterInfoCardProps) {
  const maskedNid =
    identity.nationalId.length === 16
      ? `${identity.nationalId.slice(0, 4)}********${identity.nationalId.slice(-4)}`
      : identity.nationalId || "Not provided";

  return (
    <div className="border border-line bg-white shadow-2xs">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-line bg-surface/50 p-4">
        <div className="flex items-center gap-2.5">
          <div className="flex size-7 items-center justify-center border border-line bg-white text-ink">
            <User className="size-3.5" />
          </div>
          <h4 className="text-sm font-semibold text-ink">Renter Information</h4>
        </div>
        <button
          type="button"
          onClick={onEdit}
          className="inline-flex cursor-pointer items-center gap-1.5 text-xs font-medium text-body hover:text-ink transition-colors"
        >
          <Edit3 className="size-3.5" />
          <span>Edit</span>
        </button>
      </div>

      {/* Content */}
      <div className="p-5 space-y-3.5 text-sm">
        <div className="flex items-center justify-between">
          <span className="text-xs text-body">Registration Type</span>
          <span className="inline-flex items-center border border-line bg-surface px-2.5 py-0.5 text-xs font-medium text-ink">
            {mode === "manual" ? "Direct Manual Entry" : "Onboarding Link"}
          </span>
        </div>

        {mode === "manual" ? (
          <>
            <div className="flex items-center justify-between">
              <span className="text-xs text-body">Full Legal Name</span>
              <span className="text-xs font-medium text-ink">
                {identity.fullName || "—"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-body">Email Address</span>
              <span className="text-xs font-medium text-ink">
                {identity.email || "—"}
              </span>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-xs text-body">Phone Number</span>
              <span className="font-mono text-xs font-medium text-ink">
                {identity.phoneNumber || "—"}
              </span>
            </div>

            <div className="flex items-center justify-between border-t border-line pt-3.5">
              <span className="text-xs text-body">National ID (Masked)</span>
              <span className="font-mono text-xs font-medium text-ink">
                {maskedNid}
              </span>
            </div>
          </>
        ) : (
          <div className="space-y-2.5">
            <span className="text-xs text-body block">
              Generated Link Preview
            </span>
            <p className="font-mono text-xs bg-surface p-2.5 border border-line break-all text-ink">
              {simulatedLink?.url || "Simulated Link Generated"}
            </p>
            <p className="text-xs text-faint">
              Expires in 24 hours · Renter will complete identity submission self-service.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
