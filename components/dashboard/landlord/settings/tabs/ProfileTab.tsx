"use client";

import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";

interface ProfileFormValues {
  fullName: string;
  email: string;
  phone: string;
  showPhone: boolean;
  showWhatsApp: boolean;
  showEmail: boolean;
}

export function ProfileTab({ onSave }: { onSave: () => void }) {
  const { profile, contactVisibility, updateProfile, updateContactVisibility } =
    useLandlordWorkspace();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ProfileFormValues>({
    defaultValues: {
      fullName: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      showPhone: contactVisibility.showPhone,
      showWhatsApp: contactVisibility.showWhatsApp,
      showEmail: contactVisibility.showEmail,
    },
  });

  const onSubmit = (vals: ProfileFormValues) => {
    updateProfile({
      fullName: vals.fullName.trim(),
      email: vals.email.trim(),
      phone: vals.phone.trim(),
    });
    updateContactVisibility({
      showPhone: vals.showPhone,
      showWhatsApp: vals.showWhatsApp,
      showEmail: vals.showEmail,
    });
    toast.success("Profile and contact visibility saved.");
    onSave();
  };

  return (
    <form
      noValidate
      onSubmit={handleSubmit(onSubmit)}
      className="max-w-2xl space-y-6"
    >
      <div>
        <h3 className="text-lg font-bold text-ink">
          Landlord Profile & Contact Visibility
        </h3>
        <p className="mt-1 text-xs text-body">
          Update your identity details and decide which contact channels
          prospective tenants can see on your published listings.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <Field className="sm:col-span-2">
          <FieldLabel htmlFor="settings-name">
            Full legal name <span className="text-rose-600">*</span>
          </FieldLabel>
          <Input
            id="settings-name"
            className="h-10 rounded-none"
            aria-invalid={!!errors.fullName}
            {...register("fullName", {
              validate: (v) =>
                v.trim().length >= 2 || "Enter your full legal name.",
            })}
          />
          <FieldError>{errors.fullName?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="settings-email">
            Email address <span className="text-rose-600">*</span>
          </FieldLabel>
          <Input
            id="settings-email"
            type="email"
            className="h-10 rounded-none"
            aria-invalid={!!errors.email}
            {...register("email", {
              validate: (v) =>
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim()) ||
                "Enter a valid email address.",
            })}
          />
          <FieldError>{errors.email?.message}</FieldError>
        </Field>

        <Field>
          <FieldLabel htmlFor="settings-phone">
            Phone number <span className="text-rose-600">*</span>
          </FieldLabel>
          <Input
            id="settings-phone"
            type="tel"
            className="h-10 rounded-none"
            aria-invalid={!!errors.phone}
            {...register("phone", {
              validate: (v) =>
                v.replace(/\D/g, "").length >= 9 ||
                "Enter a valid phone number.",
            })}
          />
          <FieldError>{errors.phone?.message}</FieldError>
        </Field>
      </div>

      {/* Contact Visibility Controls */}
      <fieldset className="space-y-3 border-t border-line pt-5">
        <legend className="text-xs font-semibold uppercase tracking-wider text-faint">
          Public Listing Contact Visibility
        </legend>
        {(
          [
            {
              name: "showPhone" as const,
              title: "Show phone number on listings",
              desc: "Allow prospective tenants to call you directly from property pages.",
            },
            {
              name: "showWhatsApp" as const,
              title: "Enable WhatsApp contact button",
              desc: "Display a direct WhatsApp shortcut alongside Urugo inquiries.",
            },
            {
              name: "showEmail" as const,
              title: "Show email address publicly",
              desc: "Expose your email address on listing cards (otherwise kept private inside Urugo).",
            },
          ] as const
        ).map((item) => (
          <label
            key={item.name}
            className="flex cursor-pointer items-start justify-between gap-4 border border-line bg-surface/40 p-3.5"
          >
            <div>
              <span className="block text-sm font-semibold text-ink">
                {item.title}
              </span>
              <span className="block text-xs text-body">{item.desc}</span>
            </div>
            <input
              type="checkbox"
              className="mt-1 size-4 shrink-0 cursor-pointer accent-brand"
              {...register(item.name)}
            />
          </label>
        ))}
      </fieldset>

      <div className="flex justify-end border-t border-line pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer rounded-none"
        >
          Save Profile
        </Button>
      </div>
    </form>
  );
}
