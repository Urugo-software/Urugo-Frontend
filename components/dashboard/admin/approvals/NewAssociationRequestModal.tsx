"use client";

import { useEffect, useMemo } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminWorkspace } from "@/store/admin-workspace.store";

interface AssociationFormValues {
  landlordId: string;
  renterId: string;
  propertyId: string;
  unitLabel: string;
  rentRwf: number;
  reason: string;
  evidenceRef: string;
}

export function NewAssociationRequestModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const t = useTranslations("admin.approvals");
  const tActions = useTranslations("common.actions");
  const tCommon = useTranslations("admin.common");
  const users = useAdminWorkspace((s) => s.users);
  const properties = useAdminWorkspace((s) => s.properties);
  const initiate = useAdminWorkspace((s) => s.initiateApprovalRequest);

  const landlords = useMemo(
    () => users.filter((u) => u.role === "LANDLORD"),
    [users],
  );
  const renters = useMemo(
    () => users.filter((u) => u.role === "RENTER"),
    [users],
  );
  const hasEligibleParties =
    landlords.length > 0 && renters.length > 0 && properties.length > 0;

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<AssociationFormValues>({
    defaultValues: {
      landlordId: landlords[0]?.id ?? "",
      renterId: renters[0]?.id ?? "",
      propertyId: properties[0]?.id ?? "",
      unitLabel: "A-04",
      rentRwf: 180000,
      reason: "",
      evidenceRef: "",
    },
  });

  useEffect(() => {
    if (open) {
      reset({
        landlordId: landlords[0]?.id ?? "",
        renterId: renters[0]?.id ?? "",
        propertyId: properties[0]?.id ?? "",
        unitLabel: "A-04",
        rentRwf: 180000,
        reason: "",
        evidenceRef: "",
      });
    }
    // Reset only when modal opens so typing is never wiped by store updates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  const onValid = (values: AssociationFormValues) => {
    const landlord = landlords.find((l) => l.id === values.landlordId);
    const renter = renters.find((r) => r.id === values.renterId);
    const prop = properties.find((p) => p.id === values.propertyId);
    if (!landlord || !renter || !prop) {
      toast.error(t("noEligibleParties"));
      return;
    }

    try {
      initiate({
        actionType: "renter_landlord_association",
        title: `Associate ${renter.name} with ${landlord.name}`,
        targetType: "tenancy",
        targetId: `${prop.id}-${values.unitLabel.trim()}`,
        reason: values.reason,
        evidenceRef: values.evidenceRef || "Admin-assisted onboarding",
        requiresLandlord: true,
        requiresRenter: true,
        payload: {
          landlordId: landlord.id,
          landlordName: landlord.name,
          renterId: renter.id,
          renterName: renter.name,
          propertyId: prop.id,
          propertyTitle: prop.title,
          unitLabel: values.unitLabel.trim(),
          rentRwf: Number(values.rentRwf),
          depositRwf: Number(values.rentRwf),
          summary: `Link ${renter.name} to ${prop.title} (${values.unitLabel.trim()}) under ${landlord.name} at ${Number(values.rentRwf).toLocaleString()} RWF/mo.`,
        },
      });
      toast.success(t("initiatedToast"));
      onClose();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : tCommon("actionFailed"),
      );
    }
  };

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title={t("newAssociationTitle")}
      description={t("newAssociationDesc")}
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-9 rounded-none border-line text-xs font-semibold"
          >
            {tActions("cancel")}
          </Button>
          <Button
            type="submit"
            form="admin-association-form"
            disabled={!hasEligibleParties}
            className="h-9 rounded-none bg-brand-blue px-4 text-xs font-semibold text-white hover:bg-brand-deep disabled:opacity-50"
          >
            {t("sendForConsent")}
          </Button>
        </>
      }
    >
      {!hasEligibleParties ? (
        <p className="border border-amber-300 bg-amber-50 p-3 text-xs text-amber-900">
          {t("noEligibleParties")}
        </p>
      ) : (
        <form
          id="admin-association-form"
          onSubmit={handleSubmit(onValid)}
          className="space-y-3.5"
        >
          <div>
            <label className="block text-xs font-semibold text-ink">
              {t("landlordLabel")} *
            </label>
            <select
              {...register("landlordId", { required: true })}
              className="mt-1 h-10 w-full rounded-none border border-line bg-white px-3 text-sm text-ink"
            >
              {landlords.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.name} ({l.serviceMode ?? "managed"})
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink">
              {t("renterLabel")} *
            </label>
            <select
              {...register("renterId", { required: true })}
              className="mt-1 h-10 w-full rounded-none border border-line bg-white px-3 text-sm text-ink"
            >
              {renters.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} ({r.phone})
                </option>
              ))}
            </select>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-ink">
                {t("propertyLabel")} *
              </label>
              <select
                {...register("propertyId", { required: true })}
                className="mt-1 h-10 w-full rounded-none border border-line bg-white px-3 text-sm text-ink"
              >
                {properties.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink">
                {t("unitLabel")} *
              </label>
              <Input
                {...register("unitLabel", { required: t("unitRequired") })}
                className="mt-1 h-10 rounded-none border-line bg-white text-sm"
              />
              {errors.unitLabel && (
                <p className="mt-1 text-xs text-rose-700">
                  {errors.unitLabel.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-ink">
                {t("monthlyRentLabel")} *
              </label>
              <Input
                type="number"
                {...register("rentRwf", {
                  required: t("rentMinError"),
                  min: { value: 1000, message: t("rentMinError") },
                })}
                className="mt-1 h-10 rounded-none border-line bg-white text-sm"
              />
              {errors.rentRwf && (
                <p className="mt-1 text-xs text-rose-700">
                  {errors.rentRwf.message}
                </p>
              )}
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink">
                {t("evidenceLabel")}
              </label>
              <Input
                placeholder="Ticket / mandate ref"
                {...register("evidenceRef")}
                className="mt-1 h-10 rounded-none border-line bg-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink">
              {t("reasonLabel")} *
            </label>
            <textarea
              rows={2}
              {...register("reason", {
                required: t("reasonRequired"),
                minLength: { value: 5, message: t("reasonMinLength") },
              })}
              className="mt-1 w-full rounded-none border border-line bg-white p-2.5 text-sm text-ink"
            />
            {errors.reason && (
              <p className="mt-1 text-xs text-rose-700">
                {errors.reason.message}
              </p>
            )}
          </div>
        </form>
      )}
    </ModalDialog>
  );
}
