"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { X, Wrench } from "lucide-react";
import { useCreateMaintenanceRequest } from "@/hooks/mutations/useRenterMutations";
import CustomButton from "@/components/shared/CustomButton";

interface FormInputs {
  title: string;
  category: string;
  priority: string;
  description: string;
}

export function CreateMaintenanceModal({ onClose }: { onClose: () => void }) {
  const { register, handleSubmit } = useForm<FormInputs>({
    defaultValues: { category: "Plumbing", priority: "Medium" },
  });
  const createMutation = useCreateMaintenanceRequest();

  const onSubmit = (data: FormInputs) => {
    createMutation.mutate(data, { onSuccess: onClose });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-xs p-4">
      <div className="w-full max-w-lg rounded-2xl border border-line bg-white p-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-line pb-3">
          <h3 className="text-base font-bold text-ink flex items-center gap-2">
            <Wrench className="size-5 text-brand" /> Report Maintenance Issue
          </h3>
          <button onClick={onClose} className="p-1 text-faint hover:text-ink">
            <X className="size-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4 space-y-3.5 text-xs">
          <div>
            <label className="mb-1 block font-semibold text-ink">Issue Title</label>
            <input
              type="text"
              {...register("title", { required: true })}
              placeholder="e.g. Water leak in kitchen"
              className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-brand"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1 block font-semibold text-ink">Category</label>
              <select {...register("category")} className="w-full rounded-lg border border-line p-2.5 text-xs bg-white focus:outline-brand">
                <option value="Plumbing">Plumbing</option>
                <option value="Electrical">Electrical</option>
                <option value="Structural">Structural</option>
                <option value="Appliance">Appliance</option>
                <option value="Other">Other</option>
              </select>
            </div>
            <div>
              <label className="mb-1 block font-semibold text-ink">Priority</label>
              <select {...register("priority")} className="w-full rounded-lg border border-line p-2.5 text-xs bg-white focus:outline-brand">
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1 block font-semibold text-ink">Description</label>
            <textarea
              rows={3}
              {...register("description", { required: true })}
              placeholder="Describe the issue details clearly..."
              className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-brand"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="rounded-lg border border-line px-4 py-2 font-semibold text-body hover:bg-surface">
              Cancel
            </button>
            <CustomButton type="submit" disabled={createMutation.isPending} className="px-5 py-2">
              {createMutation.isPending ? "Submitting..." : "Submit Request"}
            </CustomButton>
          </div>
        </form>
      </div>
    </div>
  );
}
