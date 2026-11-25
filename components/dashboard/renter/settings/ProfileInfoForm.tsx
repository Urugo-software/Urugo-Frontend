"use client";

import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Upload, Trash2 } from "lucide-react";
import { UserAvatar } from "@/components/shared/UserAvatar";
import { Button } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { useUpdateRenterProfile } from "@/hooks/mutate/useRenterMutations";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import { readImageFile } from "@/utils/image-file";

interface ProfileInputs {
  name: string;
  email: string;
  phone: string;
  emergencyContactName: string;
  emergencyContactPhone: string;
}

const MAX_AVATAR_BYTES = 5 * 1024 * 1024;

export function ProfileInfoForm() {
  const profile = useRenterWorkspace((s) => s.profile);
  const updateProfileStore = useRenterWorkspace((s) => s.updateProfile);
  const updateMutation = useUpdateRenterProfile();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isReadingPhoto, setIsReadingPhoto] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isDirty },
  } = useForm<ProfileInputs>({
    defaultValues: {
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      emergencyContactName: profile.emergencyContactName ?? "",
      emergencyContactPhone: profile.emergencyContactPhone ?? "",
    },
  });

  useEffect(() => {
    reset({
      name: profile.name,
      email: profile.email,
      phone: profile.phone,
      emergencyContactName: profile.emergencyContactName ?? "",
      emergencyContactPhone: profile.emergencyContactPhone ?? "",
    });
  }, [
    profile.email,
    profile.emergencyContactName,
    profile.emergencyContactPhone,
    profile.name,
    profile.phone,
    reset,
  ]);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Please select a valid image file.");
      return;
    }
    if (file.size > MAX_AVATAR_BYTES) {
      toast.error("Image must be 5 MB or smaller.");
      return;
    }

    setIsReadingPhoto(true);
    try {
      const dataUrl = await readImageFile(file);
      updateProfileStore({ avatar: dataUrl });
      toast.success("Profile photo updated.");
    } catch {
      toast.error("Unable to read image file.");
    } finally {
      setIsReadingPhoto(false);
    }
  };

  const onSubmit = (data: ProfileInputs) => {
    updateMutation.mutate(
      {
        name: data.name.trim(),
        email: data.email.trim(),
        phone: data.phone.trim(),
        emergencyContactName: data.emergencyContactName.trim(),
        emergencyContactPhone: data.emergencyContactPhone.trim(),
      },
      { onSuccess: () => reset(data) },
    );
  };

  return (
    <form noValidate onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="flex flex-wrap items-center gap-4 border border-line bg-white p-4">
        <UserAvatar
          key={profile.avatar || "initials"}
          src={profile.avatar || null}
          name={profile.name}
          className="size-16"
        />
        <div className="min-w-0 flex-1 space-y-1">
          <div className="text-sm font-bold text-ink">Profile Photo</div>
          <p className="text-xs text-body">
            JPG, PNG, or WebP up to 5 MB. Stored locally in preview mode.
          </p>
          <div className="flex flex-wrap gap-2 pt-1">
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              onChange={handleAvatarChange}
              className="hidden"
            />
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={isReadingPhoto}
              onClick={() => fileInputRef.current?.click()}
              className="cursor-pointer rounded-none"
            >
              <Upload aria-hidden="true" className="size-3.5" />
              {isReadingPhoto ? "Uploading..." : "Upload Photo"}
            </Button>
            {profile.avatar && (
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => {
                  updateProfileStore({ avatar: "" });
                  toast.success("Profile photo removed.");
                }}
                className="cursor-pointer rounded-none text-rose-700 hover:text-rose-800"
              >
                <Trash2 aria-hidden="true" className="size-3.5" />
                Remove
              </Button>
            )}
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="renter-profile-name">Full Name</FieldLabel>
          <Input
            id="renter-profile-name"
            type="text"
            placeholder="Jean Claude"
            className="h-10 rounded-none border-line bg-white"
            {...register("name", {
              required: "Full name is required.",
              minLength: { value: 2, message: "Enter at least 2 characters." },
            })}
          />
          <FieldError errors={[errors.name]} />
        </Field>

        <Field>
          <FieldLabel htmlFor="renter-profile-email">Email Address</FieldLabel>
          <Input
            id="renter-profile-email"
            type="email"
            placeholder="jean.claude@gmail.com"
            className="h-10 rounded-none border-line bg-white"
            {...register("email", {
              required: "Email address is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address.",
              },
            })}
          />
          <FieldError errors={[errors.email]} />
        </Field>
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field>
          <FieldLabel htmlFor="renter-profile-phone">Phone Number</FieldLabel>
          <Input
            id="renter-profile-phone"
            type="tel"
            placeholder="+250 788 000 000"
            className="h-10 rounded-none border-line bg-white"
            {...register("phone", {
              required: "Phone number is required.",
              minLength: { value: 9, message: "Enter a valid phone number." },
            })}
          />
          <FieldError errors={[errors.phone]} />
        </Field>
      </div>

      <div className="border-t border-line pt-5">
        <h4 className="mb-3 text-xs font-bold uppercase tracking-wider text-faint">
          Emergency Contact
        </h4>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field>
            <FieldLabel htmlFor="renter-emergency-name">Contact Name</FieldLabel>
            <Input
              id="renter-emergency-name"
              type="text"
              placeholder="Marie Claire Uwera"
              className="h-10 rounded-none border-line bg-white"
              {...register("emergencyContactName")}
            />
          </Field>

          <Field>
            <FieldLabel htmlFor="renter-emergency-phone">Contact Phone</FieldLabel>
            <Input
              id="renter-emergency-phone"
              type="tel"
              placeholder="+250 788 990 112"
              className="h-10 rounded-none border-line bg-white"
              {...register("emergencyContactPhone")}
            />
          </Field>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 pt-1">
        <Button
          type="submit"
          disabled={updateMutation.isPending || !isDirty}
          className="cursor-pointer rounded-none px-6"
        >
          {updateMutation.isPending ? "Saving..." : "Save Changes"}
        </Button>
        {isDirty && (
          <Button
            type="button"
            variant="outline"
            onClick={() => reset()}
            className="cursor-pointer rounded-none"
          >
            Reset
          </Button>
        )}
      </div>
    </form>
  );
}
