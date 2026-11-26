"use client";

import toast from "react-hot-toast";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useAdminWorkspace } from "@/store/admin-workspace.store";

interface AdminConsentBannerProps {
  party: "landlord" | "renter";
}

export function AdminConsentBanner({ party }: AdminConsentBannerProps) {
  const t = useTranslations("admin.partyConsent");
  const approvals = useAdminWorkspace((s) => s.approvals);
  const respond = useAdminWorkspace((s) => s.respondToApprovalRequest);

  const pending = approvals.filter((req) => {
    if (req.status !== "Pending Consent") return false;
    const consent =
      party === "landlord" ? req.landlordConsent : req.renterConsent;
    return consent.required && consent.status === "Pending";
  });

  if (pending.length === 0) return null;

  const handleDecision = (
    requestId: string,
    decision: "Approved" | "Rejected",
  ) => {
    respond({ requestId, party, decision });
    toast.success(
      decision === "Approved" ? t("approvedToast") : t("rejectedToast"),
    );
  };

  return (
    <section
      aria-label={t("sectionTitle")}
      className="space-y-3 border border-brand-blue/30 bg-brand-tint/40 p-4 shadow-2xs"
    >
      <div className="flex items-center gap-2">
        <ShieldCheck aria-hidden="true" className="size-4 text-brand-blue" />
        <h3 className="text-xs font-bold uppercase tracking-wider text-ink">
          {t("sectionTitle")} ({pending.length})
        </h3>
      </div>

      <div className="space-y-3">
        {pending.map((req) => (
          <div
            key={req.id}
            className="flex flex-col justify-between gap-3 border border-line bg-white p-4 sm:flex-row sm:items-center"
          >
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <span className="text-xs font-bold text-brand-blue">
                  {req.id}
                </span>
                <StatusBadge label="Pending" tone="warning" />
              </div>
              <p className="text-sm font-bold text-ink">{req.title}</p>
              <p className="text-xs text-body">{req.payload.summary}</p>
              <p className="text-xs text-faint">
                {t("reasonPrefix")}: {req.reason}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => handleDecision(req.id, "Rejected")}
                className="h-9 rounded-none border-line px-3.5 text-xs font-semibold text-rose-700 hover:bg-rose-50"
              >
                {t("decline")}
              </Button>
              <Button
                type="button"
                onClick={() => handleDecision(req.id, "Approved")}
                className="h-9 rounded-none bg-brand-blue px-3.5 text-xs font-semibold text-white hover:bg-brand-deep"
              >
                {t("approve")}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
