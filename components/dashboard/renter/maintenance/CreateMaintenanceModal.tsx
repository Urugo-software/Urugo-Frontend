"use client";

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
      title="Report Maintenance Issue"
      description="Describe the problem in your unit so your landlord can schedule repairs."
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="cursor-pointer rounded-none"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="create-maintenance-form"
            disabled={createMutation.isPending}
            className="cursor-pointer rounded-none"
          >
            {createMutation.isPending ? "Submitting..." : "Submit Request"}
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
          <FieldLabel htmlFor="maint-title">Issue Title *</FieldLabel>
          <Input
            id="maint-title"
            placeholder="e.g. Water leak under kitchen sink"
            className="h-10 rounded-none"
            {...register("title", {
              validate: (v) =>
                v.trim().length >= 4 || "Enter a short descriptive title.",
            })}
          />
          <FieldError>{errors.title?.message}</FieldError>
        </Field>

        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="maint-category">Category</FieldLabel>
            <select
              id="maint-category"
              className="h-10 w-full rounded-none border border-input bg-white px-3 text-sm"
              {...register("category")}
            >
              <option value="Plumbing">Plumbing</option>
              <option value="Electrical">Electrical</option>
              <option value="Structural">Structural</option>
              <option value="Appliance">Appliance</option>
              <option value="Other">Other</option>
            </select>
          </Field>

          <Field>
            <FieldLabel htmlFor="maint-priority">Priority</FieldLabel>
            <select
              id="maint-priority"
              className="h-10 w-full rounded-none border border-input bg-white px-3 text-sm"
              {...register("priority")}
            >
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="High">High</option>
            </select>
          </Field>
        </div>

        <Field>
          <FieldLabel htmlFor="maint-desc">Description *</FieldLabel>
          <textarea
            id="maint-desc"
            rows={4}
            placeholder="Describe where the issue is located and when it started..."
            className="w-full rounded-none border border-input bg-white p-3 text-sm"
            {...register("description", {
              validate: (v) =>
                v.trim().length >= 10 ||
                "Please add at least 10 characters of details.",
            })}
          />
          <FieldError>{errors.description?.message}</FieldError>
        </Field>
      </form>
    </ModalDialog>
  );
}
