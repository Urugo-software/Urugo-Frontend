"use client";

import { useForm } from "react-hook-form";
import { useUpdateRenterProfile } from "@/hooks/mutations/useRenterMutations";
import CustomButton from "@/components/shared/CustomButton";

interface ProfileInputs {
  name: string;
  email: string;
  phone: string;
}

const FIELD_BASE =
  "w-full border border-line bg-white p-3 text-sm text-ink placeholder:text-faint focus:border-brand focus:outline-hidden focus:ring-2 focus:ring-brand/20 rounded-sm";

export function ProfileInfoForm() {
  const { register, handleSubmit } = useForm<ProfileInputs>({
    defaultValues: {
      name: "Jean Claude",
      email: "jean.claude@example.rw",
      phone: "+250 788 123 789",
    },
  });

  const updateMutation = useUpdateRenterProfile();

  return (
    <form
      onSubmit={handleSubmit((data) => updateMutation.mutate(data))}
      className="space-y-5"
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-faint">
            Full Name
          </label>
          <input
            type="text"
            {...register("name", { required: true })}
            placeholder="Jean Claude"
            className={FIELD_BASE}
          />
        </div>
        <div>
          <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-faint">
            Email Address
          </label>
          <input
            type="email"
            {...register("email", { required: true })}
            placeholder="jean@example.rw"
            className={FIELD_BASE}
          />
        </div>
      </div>

      <div className="max-w-sm">
        <label className="mb-1.5 block text-xs font-bold uppercase tracking-wider text-faint">
          Phone Number
        </label>
        <input
          type="text"
          {...register("phone", { required: true })}
          placeholder="+250 788 000 000"
          className={FIELD_BASE}
        />
      </div>

      <div className="pt-2">
        <CustomButton
          type="submit"
          variant="light"
          disabled={updateMutation.isPending}
          className="px-6 py-2.5 rounded-none"
        >
          <span className="-translate-x-4 group-hover:text-white text-sm font-bold">
            {updateMutation.isPending ? "Saving..." : "Save Changes"}
          </span>
        </CustomButton>
      </div>
    </form>
  );
}
