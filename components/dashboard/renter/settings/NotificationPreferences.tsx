"use client";

import { useEffect } from "react";
import { useTranslations } from "next-intl";
import { Controller, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { mockRenterNotificationPrefs } from "@/data/renter-extra-data";
import { useRenterWorkspace } from "@/store/renter-workspace.store";

const PREF_KEY_MAP: Record<string, string> = {
  rent_due: "rentDue",
  maintenance: "maintenance",
  lease: "lease",
};

export function NotificationPreferences() {
  const t = useTranslations("renter.settings.notifications");
  const notificationPrefs = useRenterWorkspace((s) => s.notificationPrefs);
  const updateNotificationPrefs = useRenterWorkspace(
    (s) => s.updateNotificationPrefs,
  );

  const {
    control,
    handleSubmit,
    reset,
    formState: { isDirty },
  } = useForm<Record<string, boolean>>({
    defaultValues: notificationPrefs,
  });

  useEffect(() => {
    reset(notificationPrefs);
  }, [notificationPrefs, reset]);

  const onSubmit = (values: Record<string, boolean>) => {
    updateNotificationPrefs(values);
    reset(values);
    toast.success(t("savedToast"));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {mockRenterNotificationPrefs.map((pref) => {
        const msgKey = PREF_KEY_MAP[pref.id];
        const label = msgKey ? t(`items.${msgKey}.label`) : pref.label;
        const description = msgKey
          ? t(`items.${msgKey}.description`)
          : pref.description;

        return (
          <Controller
            key={pref.id}
            name={pref.id}
            control={control}
            defaultValue={pref.defaultOn}
            render={({ field }) => {
              const checked = Boolean(field.value);
              return (
                <div className="flex items-center justify-between gap-4 border border-line bg-white p-4">
                  <div className="min-w-0">
                    <div className="text-sm font-bold text-ink">{label}</div>
                    <p className="mt-0.5 text-xs text-body">{description}</p>
                  </div>
                  <button
                    type="button"
                    role="switch"
                    aria-label={label}
                    aria-checked={checked}
                    onClick={() => field.onChange(!checked)}
                    className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer items-center border transition-colors ${
                      checked
                        ? "border-brand bg-brand"
                        : "border-line bg-slate-200"
                    }`}
                  >
                    <span
                      className={`inline-block size-4 bg-white shadow-xs transition-transform ${
                        checked ? "translate-x-5" : "translate-x-0.5"
                      }`}
                    />
                  </button>
                </div>
              );
            }}
          />
        );
      })}

      <div className="pt-1">
        <Button
          type="submit"
          disabled={!isDirty}
          className="cursor-pointer rounded-none px-6"
        >
          {t("saveButton")}
        </Button>
      </div>
    </form>
  );
}
