"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useCreateMaintenanceRequest } from "@/hooks/mutate/useRenterMutations";
import type { RenterMaintenance } from "@/types/renter";

interface FormInputs {
  title: string;
  category: string;
  priority: RenterMaintenance["priority"];
  description: string;
}

export function CreateMaintenanceModal({ onClose }: { onClose: () => void }) {
  const t = useTranslations("renter.maintenance");
  const tActions = useTranslations("common.actions");
  const tStatuses = useTranslations("common.statuses");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: {
      title: "",
      category: "Plumbing",
      priority: "Medium",
      description: "",
    },
  });
  const createMutation = useCreateMaintenanceRequest();

  const onSubmit = (data: FormInputs) => {
    createMutation.mutate(data, { onSuccess: onClose });
  };

  return (
    <ModalDialog
      open
      onClose={onClose}
      title={t("createModal.title")}
      description={t("createModal.description")}
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="cursor-pointer rounded-none"
          >
            {tActions("cancel")}
          </Button>
          <Button
            type="submit"
            form="create-maintenance-form"
            disabled={createMutation.isPending}
            className="cursor-pointer rounded-none"
          >
            {createMutation.isPending
              ? t("createModal.submitting")
              : t("createModal.submitRequest")}
          </Button>
        </>
      }
    >
      <form
        id="create-maintenance-form"
        noValidate
        onSubmit={handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <Field>
          <FieldLabel htmlFor="maint-title">
            {t("createModal.issueTitleLabel")}
          </FieldLabel>
          <Input
            id="maint-title"
            placeholder={t("createModal.issueTitlePlaceholder")}
            className="h-10 rounded-none"
            {...register("title", {
              validate: (v) =>
                v.trim().length >= 4 || t("createModal.issueTitleError"),
            })}
          />
          <FieldError>{errors.title?.message}</FieldError>
        </Field>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="maint-category">
              {t("createModal.categoryLabel")}
            </FieldLabel>
            <select
              id="maint-category"
              className="h-10 w-full rounded-none border border-input bg-white px-3 text-sm"
              {...register("category")}
            >
              <option value="Plumbing">{t("categories.plumbing")}</option>
              <option value="Electrical">{t("categories.electrical")}</option>
              <option value="Structural">{t("categories.structural")}</option>
              <option value="Appliance">{t("categories.appliance")}</option>
              <option value="Other">{t("categories.other")}</option>
            </select>
          </Field>

          <Field>
            <FieldLabel htmlFor="maint-priority">
              {t("createModal.priorityLabel")}
            </FieldLabel>
            <select
              id="maint-priority"
              className="h-10 w-full rounded-none border border-input bg-white px-3 text-sm"
              {...register("priority")}
            >
              <option value="Low">{tStatuses("low")}</option>
              <option value="Medium">{tStatuses("medium")}</option>
              <option value="High">{tStatuses("high")}</option>
            </select>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="maint-desc">
            {t("createModal.descriptionLabel")}
          </FieldLabel>
          <textarea
            id="maint-desc"
            rows={4}
            placeholder={t("createModal.descriptionPlaceholder")}
            className="w-full rounded-none border border-input bg-white p-3 text-sm"
            {...register("description", {
              validate: (v) =>
                v.trim().length >= 10 || t("createModal.descriptionError"),
            })}
          />
          <FieldError>{errors.description?.message}</FieldError>
        </Field>
      </form>
    </ModalDialog>
  );
}
