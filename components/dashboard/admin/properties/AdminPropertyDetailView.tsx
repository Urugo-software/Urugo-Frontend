"use client";

import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { Building2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { Breadcrumbs } from "@/components/shared/Breadcrumbs";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import { getAdminStatusTone } from "@/utils/admin-status-tone";
import { AdminConsentRequestModal } from "../shared/AdminConsentRequestModal";
import { AdminDetailGrid } from "../shared/AdminDetailGrid";
import { AdminReasonModal } from "../shared/AdminReasonModal";
import { AdminShellSection } from "../shared/AdminShellSection";

type PropertyActionMode =
  | null
  | "verify"
  | "request_info"
  | "reject"
  | "suspend"
  | "restore"
  | "associate_landlord";

export function AdminPropertyDetailView({
  propertyId,
}: {
  propertyId: string;
}) {
  const t = useTranslations("admin.properties");
  const tCommon = useTranslations("admin.common");
  const locale = useLocale() as AppLocale;
  const properties = useAdminWorkspace((s) => s.properties);
  const leases = useAdminWorkspace((s) => s.leases);
  const users = useAdminWorkspace((s) => s.users);
  const reviewVerification = useAdminWorkspace(
    (s) => s.reviewPropertyVerification,
  );
  const updateListingControl = useAdminWorkspace(
    (s) => s.updatePropertyListingControl,
  );
  const initiateApproval = useAdminWorkspace((s) => s.initiateApprovalRequest);
  const [mode, setMode] = useState<PropertyActionMode>(null);
  const [targetLandlordId, setTargetLandlordId] = useState("");

  const property = properties.find((p) => p.id === propertyId);
  const landlords = users.filter((u) => u.role === "LANDLORD");

  if (!property) {
    return (
      <AdminShellSection title={t("title")} description={t("description")}>
        <EmptyStateBox
          icon={Building2}
          title={t("notFoundTitle")}
          description={t("notFoundDesc")}
        />
      </AdminShellSection>
    );
  }

  const chosenLandlord =
    landlords.find((l) => l.id === targetLandlordId) ??
    landlords.find((l) => l.id !== property.landlordId) ??
    landlords[0];
  const linkedLeases = leases.filter((l) => l.propertyId === property.id);
  const isSameLandlord = chosenLandlord?.id === property.landlordId;

  return (
    <AdminShellSection
      title={`${property.id} · ${property.title}`}
      description={`${property.location} · ${property.type}`}
      action={
        <div className="flex flex-wrap items-center gap-2">
          <StatusBadge
            label={property.verification}
            tone={getAdminStatusTone(property.verification)}
          />
          <StatusBadge
            label={property.isSuspended ? "Suspended" : property.listingStatus}
            tone={getAdminStatusTone(
              property.isSuspended ? "Suspended" : property.listingStatus,
            )}
          />
        </div>
      }
    >
      <Breadcrumbs
        items={[
          { label: t("title"), href: "/admin/properties" },
          { label: property.title },
        ]}
      />

      {property.reviewNotes && (
        <div className="border border-line bg-white p-4 text-xs text-body shadow-2xs">
          <p className="font-bold text-ink">{t("reviewNotesTitle")}</p>
          <p className="mt-1">{property.reviewNotes}</p>
        </div>
      )}

      <AdminDetailGrid
        title={t("detailsTitle")}
        rows={[
          { label: t("colId"), value: property.id },
          { label: t("colProperty"), value: property.title },
          {
            label: t("colLandlord"),
            value: (
              <Link
                href={`/admin/users/${encodeURIComponent(property.landlordId)}`}
                className="text-brand-blue hover:underline"
              >
                {property.landlordName}
              </Link>
            ),
          },
          { label: t("colLocation"), value: property.location },
          {
            label: t("colRent"),
            value: formatRwfLocalized(property.rentRwf, locale),
          },
          {
            label: t("depositLabel"),
            value: formatRwfLocalized(property.depositRwf, locale),
          },
          {
            label: t("colOccupancy"),
            value: `${property.occupiedUnits} / ${property.units}`,
          },
          {
            label: t("documentsLabel"),
            value: String(property.documentsCount),
          },
        ]}
      />

      <section className="space-y-4 border border-line bg-white p-5 shadow-2xs">
        <h3 className="text-sm font-bold text-ink">{t("controlsTitle")}</h3>
        <div className="flex flex-wrap gap-2.5">
          {property.verification !== "Verified" && (
            <Button
              type="button"
              onClick={() => setMode("verify")}
              className="h-9 rounded-none bg-ink px-3.5 text-xs font-semibold text-white"
            >
              {t("approveProperty")}
            </Button>
          )}
          <Button
            type="button"
            variant="outline"
            onClick={() => setMode("request_info")}
            className="h-9 rounded-none border-line px-3.5 text-xs font-semibold text-amber-800"
          >
            {t("requestInfo")}
          </Button>
          {property.verification !== "Rejected" && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setMode("reject")}
              className="h-9 rounded-none border-line px-3.5 text-xs font-semibold text-rose-700"
            >
              {t("rejectProperty")}
            </Button>
          )}
          {!property.isSuspended ? (
            <Button
              type="button"
              variant="outline"
              onClick={() => setMode("suspend")}
              className="h-9 rounded-none border-line px-3.5 text-xs font-semibold text-rose-700"
            >
              {t("suspendListing")}
            </Button>
          ) : (
            <Button
              type="button"
              onClick={() => setMode("restore")}
              className="h-9 rounded-none bg-brand-blue px-3.5 text-xs font-semibold text-white"
            >
              {t("restoreListing")}
            </Button>
          )}
        </div>

        <div className="border-t border-line pt-4">
          <p className="text-xs font-semibold text-ink">
            {t("ownershipSectionTitle")}
          </p>
          <p className="mt-0.5 text-xs text-body">
            {t("ownershipSectionNote")}
          </p>
          <div className="mt-3 flex flex-wrap items-center gap-2.5">
            <select
              aria-label={t("selectLandlordAria")}
              value={chosenLandlord?.id ?? ""}
              onChange={(e) => setTargetLandlordId(e.target.value)}
              className="h-9 rounded-none border border-line bg-white px-3 text-xs font-semibold text-ink"
            >
              {landlords.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name}
                </option>
              ))}
            </select>
            <Button
              type="button"
              variant="outline"
              disabled={!chosenLandlord || isSameLandlord}
              onClick={() => {
                if (isSameLandlord) {
                  toast.error(t("sameLandlordError"));
                  return;
                }
                setMode("associate_landlord");
              }}
              className="h-9 rounded-none border-line px-3.5 text-xs font-semibold text-brand-blue disabled:opacity-50"
            >
              {t("proposeLandlordAssociation")}
            </Button>
          </div>
          {isSameLandlord && (
            <p className="mt-2 text-xs text-amber-800">
              {t("sameLandlordError")}
            </p>
          )}
        </div>
      </section>

      <section className="border border-line bg-white shadow-2xs">
        <div className="border-b border-line px-5 py-3.5">
          <h3 className="text-sm font-bold text-ink">
            {t("linkedLeasesTitle")} ({linkedLeases.length})
          </h3>
        </div>
        <div className="divide-y divide-line px-5">
          {linkedLeases.length === 0 ? (
            <p className="py-4 text-xs text-faint">{tCommon("noRecordsYet")}</p>
          ) : (
            linkedLeases.map((lease) => (
              <div
                key={lease.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
              >
                <div>
                  <Link
                    href={`/admin/leases/${encodeURIComponent(lease.id)}`}
                    className="font-semibold text-brand-blue hover:underline"
                  >
                    {lease.id} · {lease.unitLabel} — {lease.renterName}
                  </Link>
                  <p className="text-xs text-body">
                    {formatRwfLocalized(lease.rentRwf, locale)} ·{" "}
                    {lease.startDate} → {lease.endDate}
                  </p>
                </div>
                <StatusBadge
                  label={lease.status}
                  tone={getAdminStatusTone(lease.status)}
                />
              </div>
            ))
          )}
        </div>
      </section>

      <AdminReasonModal
        open={
          mode === "verify" ||
          mode === "request_info" ||
          mode === "reject" ||
          mode === "suspend" ||
          mode === "restore"
        }
        onClose={() => setMode(null)}
        title={t("confirmPropertyAction")}
        description={t("confirmPropertyDesc", { title: property.title })}
        confirmLabel={t("applyDecision")}
        isDestructive={mode === "reject" || mode === "suspend"}
        onSubmitAction={(values) => {
          if (
            mode === "verify" ||
            mode === "request_info" ||
            mode === "reject"
          ) {
            const decision =
              mode === "verify"
                ? "Verified"
                : mode === "request_info"
                  ? "Needs Information"
                  : "Rejected";
            reviewVerification({
              propertyId: property.id,
              decision,
              reason: values.reason,
            });
          } else if (mode === "suspend" || mode === "restore") {
            updateListingControl({
              propertyId: property.id,
              listingStatus: mode === "suspend" ? "Paused" : "Published",
              isSuspended: mode === "suspend",
              reason: values.reason,
            });
          }
          toast.success(t("updatedToast"));
        }}
      />

      <AdminConsentRequestModal
        open={mode === "associate_landlord" && Boolean(chosenLandlord)}
        onClose={() => setMode(null)}
        title={t("proposeLandlordAssociation")}
        description={t("ownershipConsentDesc")}
        partiesRequired={t("requiresReceivingLandlord", {
          name: chosenLandlord?.name ?? "",
        })}
        defaultSummary={`Associate ${property.title} (${property.id}) with landlord ${chosenLandlord?.name ?? ""}.`}
        requireEvidence
        onSubmitRequest={(values) => {
          if (!chosenLandlord) return;
          initiateApproval({
            actionType: "property_landlord_association",
            title: `Associate ${property.title} with ${chosenLandlord.name}`,
            targetType: "property",
            targetId: property.id,
            reason: values.reason,
            evidenceRef: values.evidenceRef,
            requiresLandlord: true,
            requiresRenter: false,
            payload: {
              propertyId: property.id,
              propertyTitle: property.title,
              landlordId: chosenLandlord.id,
              landlordName: chosenLandlord.name,
              summary: values.summary,
            },
          });
          toast.success(t("consentSentToast"));
        }}
      />
    </AdminShellSection>
  );
}
