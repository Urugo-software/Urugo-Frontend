"use client";

import { useForm } from "react-hook-form";
import CustomButton from "@/components/shared/CustomButton";
import toast from "react-hot-toast";

interface PasswordInputs {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

const FIELD_BASE =
  "w-full border border-line bg-white p-3 text-sm text-ink placeholder:text-faint focus:border-brand focus:outline-hidden focus:ring-2 focus:ring-brand/20 rounded-sm";

export function ChangePasswordForm() {
  const { register, handleSubmit, reset } = useForm<PasswordInputs>();

  const onSubmit = (data: PasswordInputs) => {
    if (data.newPassword !== data.confirmPassword) {
      toast.error("New passwords do not match.");
      return;
    }
    // Placeholder — connect to real API when ready
    toast.success("Password updated successfully.");
    reset();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
      <div>
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-faint">
          Current Password
        </label>
        <input
          type="password"
          {...register("currentPassword", { required: true })}
          placeholder="Enter current password"
          className={FIELD_BASE}
        />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-faint">
            New Password
          </label>
          <input
            type="password"
            {...register("newPassword", { required: true, minLength: 8 })}
            placeholder="Min. 8 characters"
            className={FIELD_BASE}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-faint">
            Confirm New Password
          </label>
          <input
            type="password"
            {...register("confirmPassword", { required: true })}
            placeholder="Repeat new password"
            className={FIELD_BASE}
          />
        </div>
      </div>

      <div className="pt-2">
        <CustomButton type="submit" variant="light" className="px-6 py-2.5 rounded-none">
          <span className="-translate-x-4 group-hover:text-white text-sm font-bold">
            Update Password
          </span>
        </CustomButton>
      </div>
    </form>
  );
}
