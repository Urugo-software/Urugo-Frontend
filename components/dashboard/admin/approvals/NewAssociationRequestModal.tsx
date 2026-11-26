"use client";

import { useEffect } from "react";
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
  const users = useAdminWorkspace((s) => s.users);
  const properties = useAdminWorkspace((s) => s.properties);
  const initiate = useAdminWorkspace((s) => s.initiateApprovalRequest);

  const landlords = users.filter((u) => u.role === "LANDLORD");
  const renters = users.filter((u) => u.role === "RENTER");

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
  }, [landlords, open, properties, renters, reset]);

  const onValid = (values: AssociationFormValues) => {
    const landlord = landlords.find((l) => l.id === values.landlordId);
    const renter = renters.find((r) => r.id === values.renterId);
    const prop = properties.find((p) => p.id === values.propertyId);
    if (!landlord || !renter || !prop) return;

    initiate({
      actionType: "renter_landlord_association",
      title: `Associate ${renter.name} with ${landlord.name}`,
      targetType: "tenancy",
      targetId: `${prop.id}-${values.unitLabel}`,
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
        unitLabel: values.unitLabel,
        rentRwf: Number(values.rentRwf),
        depositRwf: Number(values.rentRwf),
        summary: `Link ${renter.name} to ${prop.title} (${values.unitLabel}) under ${landlord.name} at ${Number(values.rentRwf).toLocaleString()} RWF/mo.`,
      },
    });
    toast.success(t("initiatedToast"));
    onClose();
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
            className="h-9 rounded-none bg-brand-blue px-4 text-xs font-semibold text-white hover:bg-brand-deep"
          >
            {t("sendForConsent")}
          </Button>
        </>
      }
    >
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
              {...register("unitLabel", { required: true })}
              className="mt-1 h-10 rounded-none border-line bg-white text-sm"
            />
          </div>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className="block text-xs font-semibold text-ink">
              {t("monthlyRentLabel")} *
            </label>
            <Input
              type="number"
              {...register("rentRwf", { required: true, min: 1000 })}
              className="mt-1 h-10 rounded-none border-line bg-white text-sm"
            />
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
              required: "Reason is required",
              minLength: { value: 5, message: "Minimum 5 characters" },
            })}
            className="mt-1 w-full rounded-none border border-line bg-white p-2.5 text-sm text-ink"
          />
          {errors.reason && (
            <p className="mt-1 text-xs text-rose-700">{errors.reason.message}</p>
          )}
        </div>
      </form>
    </ModalDialog>
  );
}
