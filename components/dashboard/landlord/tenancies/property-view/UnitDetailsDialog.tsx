"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Trash2 } from "lucide-react";
import { PropertyGalleryField } from "@/components/dashboard/landlord/properties/PropertyGalleryField";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import type { PropertyUnit, PropertyUnitStatus } from "@/types/landlord";

interface UnitFormValues {
  unitNumber: string;
  floor: string;
  bedrooms: string;
  bathrooms: string;
  monthlyRent: string;
  status: PropertyUnitStatus;
  images: string[];
}

interface UnitDetailsDialogProps {
  propertyId: string;
  unit?: PropertyUnit;
  onClose: () => void;
}

export function UnitDetailsDialog({
  propertyId,
  unit,
  onClose,
}: UnitDetailsDialogProps) {
  const t = useTranslations("landlord.tenancies.propertyView.unitDialog");
  const { addUnit, updateUnit, deleteUnit } = useLandlordProperties();
  const isEditing = Boolean(unit);
  const [confirmDelete, setConfirmDelete] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<UnitFormValues>({
    defaultValues: {
      unitNumber: unit?.unitNumber ?? "",
      floor: unit?.floor ?? "",
      bedrooms: unit?.bedrooms?.toString() ?? "1",
      bathrooms: unit?.bathrooms?.toString() ?? "1",
      monthlyRent: unit?.monthlyRentRwf?.toString() ?? "",
      status: unit?.status ?? "Vacant",
      images: unit?.images ?? [],
    },
  });

  const onSubmit = (values: UnitFormValues) => {
    const payload = {
      unitNumber: values.unitNumber.trim(),
      floor: values.floor.trim() || undefined,
      bedrooms: values.bedrooms ? Math.max(0, Number(values.bedrooms)) : undefined,
      bathrooms: values.bathrooms ? Math.max(0, Number(values.bathrooms)) : undefined,
      monthlyRentRwf: Math.round(Number(values.monthlyRent)),
      status: values.status,
      images: values.images,
    };

    if (unit) {
      updateUnit(unit.id, payload, propertyId);
      toast.success(t("toastUpdated", { unit: payload.unitNumber }));
    } else {
      addUnit({
        ...payload,
        propertyId,
        renterId: null,
      });
      toast.success(t("toastAdded", { unit: payload.unitNumber }));
    }
    onClose();
  };

  return (
    <>
      <ModalDialog
        open
        onClose={onClose}
        maxWidthClassName="max-w-2xl"
        title={
          isEditing
            ? t("editTitle", { unit: unit?.unitNumber ?? "" })
            : t("addTitle")
        }
        description={t("description")}
        footer={
          <div className="flex w-full flex-wrap items-center justify-between gap-2">
            <div>
              {unit && !unit.renterId && (
                <Button
                  type="button"
                  variant="destructive"
                  size="sm"
                  onClick={() => setConfirmDelete(true)}
                  className="cursor-pointer rounded-none text-xs"
                >
                  <Trash2 aria-hidden="true" className="size-3.5" />
                  {t("deleteUnit")}
                </Button>
              )}
            </div>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="cursor-pointer rounded-none"
              >
                {t("cancel")}
              </Button>
              <Button
                type="submit"
                form="unit-details-form"
                disabled={isSubmitting}
                className="cursor-pointer rounded-none"
              >
                {isEditing ? t("saveChanges") : t("addUnitBtn")}
              </Button>
            </div>
          </div>
        }
      >
        <form
          id="unit-details-form"
          noValidate
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-5"
        >
          <Controller
            control={control}
            name="images"
            render={({ field }) => (
              <PropertyGalleryField
                images={field.value}
                onChange={field.onChange}
              />
            )}
          />

          <div className="grid grid-cols-1 gap-4 border-t border-line pt-5 sm:grid-cols-2">
            <Field>
              <FieldLabel htmlFor="unit-number">
                {t("unitNumberLabel")} <span className="text-rose-600">*</span>
              </FieldLabel>
              <Input
                id="unit-number"
                placeholder={t("unitNumberPlaceholder")}
                aria-invalid={!!errors.unitNumber}
                className="h-10 rounded-none"
                {...register("unitNumber", {
                  validate: (v) => !!v.trim() || t("unitNumberRequired"),
                })}
              />
              <FieldError>{errors.unitNumber?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="unit-floor">{t("floorLabel")}</FieldLabel>
              <Input
                id="unit-floor"
                placeholder={t("floorPlaceholder")}
                className="h-10 rounded-none"
                {...register("floor")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="unit-bedrooms">
                {t("bedroomsLabel")}
              </FieldLabel>
              <Input
                id="unit-bedrooms"
                type="number"
                min={0}
                className="h-10 rounded-none"
                {...register("bedrooms")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="unit-bathrooms">
                {t("bathroomsLabel")}
              </FieldLabel>
              <Input
                id="unit-bathrooms"
                type="number"
                min={0}
                className="h-10 rounded-none"
                {...register("bathrooms")}
              />
            </Field>

            <Field>
              <FieldLabel htmlFor="unit-rent">
                {t("monthlyRentLabel")} <span className="text-rose-600">*</span>
              </FieldLabel>
              <Input
                id="unit-rent"
                type="number"
                min={1000}
                step={1000}
                placeholder="150000"
                aria-invalid={!!errors.monthlyRent}
                className="h-10 rounded-none"
                {...register("monthlyRent", {
                  validate: (v) => {
                    const n = Number(v);
                    return (
                      (Number.isFinite(n) && n > 0) || t("monthlyRentPositive")
                    );
                  },
                })}
              />
              <FieldError>{errors.monthlyRent?.message}</FieldError>
            </Field>

            <Field>
              <FieldLabel htmlFor="unit-status">
                {t("unitStatusLabel")}
              </FieldLabel>
              <select
                id="unit-status"
                disabled={Boolean(unit?.renterId)}
                className="h-10 w-full rounded-none border border-input bg-white px-3 text-sm disabled:bg-surface disabled:opacity-70"
                {...register("status")}
              >
                <option value="Vacant">{t("statusVacant")}</option>
                <option value="Maintenance">{t("statusMaintenance")}</option>
                <option value="Occupied">{t("statusOccupied")}</option>
              </select>
            </Field>
          </div>
        </form>
      </ModalDialog>

      <ModalDialog
        open={confirmDelete}
        onClose={() => setConfirmDelete(false)}
        variant="alert"
        title={t("deleteConfirmTitle")}
        description={t("deleteConfirmDesc", { unit: unit?.unitNumber ?? "" })}
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setConfirmDelete(false)}
              className="cursor-pointer rounded-none"
            >
              {t("cancel")}
            </Button>
            <Button
              type="button"
              variant="destructive"
              onClick={() => {
                if (unit) {
                  deleteUnit(unit.id);
                  toast.success(t("toastRemoved", { unit: unit.unitNumber }));
                }
                setConfirmDelete(false);
                onClose();
              }}
              className="cursor-pointer rounded-none"
            >
              {t("confirmDelete")}
            </Button>
          </>
        }
      >
        <p className="text-xs text-body">{t("deleteConfirmNote")}</p>
      </ModalDialog>
    </>
  );
}
