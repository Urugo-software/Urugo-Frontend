"use client";

import { useState } from "react";
import toast from "react-hot-toast";
import {
  CopyStatusMessage,
  LandlordPropertyItem,
  SimulatedRenterInvitationLink,
} from "../types/renter-registration.types";

function buildSimulatedLink(
  property?: LandlordPropertyItem,
): SimulatedRenterInvitationLink {
  const randomSegment = Math.random().toString(36).substring(2, 10);
  const origin =
    typeof window !== "undefined" && window.location.origin
      ? window.location.origin
      : "https://urugo.rw";
  const propertyQuery = property
    ? `?property=${encodeURIComponent(property.id)}`
    : "";

  return {
    id: `sim-inv-${randomSegment}`,
    url: `${origin}/auth/register/invite/sim-${randomSegment}${propertyQuery}`,
    propertyId: property?.id,
    propertyName: property?.name,
    createdAt: new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    }),
    expiresInLabel: "24 hours (Simulated)",
    isSimulated: true,
  };
}

export function useSimulatedRenterLink(properties: LandlordPropertyItem[]) {
  const [selectedPropertyId, setSelectedPropertyId] = useState("");
  const [generatedLink, setGeneratedLink] =
    useState<SimulatedRenterInvitationLink | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyStatus, setCopyStatus] = useState<CopyStatusMessage | null>(null);

  const selectedProperty = properties.find((p) => p.id === selectedPropertyId);

  const generateLink = () => {
    setGeneratedLink(buildSimulatedLink(selectedProperty));
    setCopied(false);
    setCopyStatus(null);
    toast.success("Simulated registration link generated.");
  };

  const copyLink = async () => {
    if (!generatedLink) return;

    try {
      if (typeof navigator === "undefined" || !navigator.clipboard) {
        throw new Error("Clipboard API unavailable");
      }
      await navigator.clipboard.writeText(generatedLink.url);
      setCopied(true);
      setCopyStatus({
        type: "success",
        text: "Simulated registration link copied to your clipboard.",
      });
      toast.success("Registration link copied to clipboard.");
    } catch {
      setCopied(false);
      setCopyStatus({
        type: "error",
        text: "Could not copy automatically. Please select and copy the link manually.",
      });
      toast.error("Failed to copy link to clipboard.");
    }
  };

  return {
    selectedPropertyId,
    setSelectedPropertyId,
    generatedLink,
    copied,
    copyStatus,
    generateLink,
    copyLink,
  };
}
