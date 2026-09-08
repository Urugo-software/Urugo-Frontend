"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { User, Mail, Phone } from "lucide-react";
import { useUpdateRenterProfile } from "@/hooks/mutations/useRenterMutations";
import CustomButton from "@/components/shared/CustomButton";

interface ProfileInputs {
  name: string;
  email: string;
  phone: string;
}

export function ProfileInfoForm() {
  const { register, handleSubmit } = useForm<ProfileInputs>({
    defaultValues: {
      name: "Jean Claude",
      email: "jean.claude@example.rw",
      phone: "+250 788 123 789",
    },
  });

  const updateMutation = useUpdateRenterProfile();

  const onSubmit = (data: ProfileInputs) => {
    updateMutation.mutate(data);
  };

  return (
    <div className="max-w-xl rounded-xl border border-line bg-white p-6 shadow-xs">
      <h3 className="mb-4 text-sm font-bold text-ink">Personal Information</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-xs">
        <div>
          <label className="mb-1 block font-semibold text-ink flex items-center gap-1.5">
            <User className="size-3.5 text-faint" /> Full Name
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-brand"
          />
        </div>

        <div>
          <label className="mb-1 block font-semibold text-ink flex items-center gap-1.5">
            <Mail className="size-3.5 text-faint" /> Email Address
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-brand"
          />
        </div>

        <div>
          <label className="mb-1 block font-semibold text-ink flex items-center gap-1.5">
            <Phone className="size-3.5 text-faint" /> Phone Number
          </label>
          <input
            type="text"
            {...register("phone", { required: true })}
            className="w-full rounded-lg border border-line p-2.5 text-xs text-ink focus:outline-brand"
          />
        </div>

        <div className="pt-2">
          <CustomButton type="submit" disabled={updateMutation.isPending} className="px-5 py-2 text-xs font-bold">
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </CustomButton>
        </div>
      </form>
    </div>
  );
}
