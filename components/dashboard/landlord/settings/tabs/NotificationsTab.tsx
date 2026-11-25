"use client";

import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Button } from "@/components/ui/button";
import { mockNotificationPreferences } from "@/data/landlord-data";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";

export function NotificationsTab({ onSave }: { onSave: () => void }) {
  const t = useTranslations("landlord.settings.notificationsTab");
  const { notificationPrefs, updateNotificationPrefs } = useLandlordWorkspace();

  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<Record<string, boolean>>({
    defaultValues: notificationPrefs,
  });

  const onSubmit = (vals: Record<string, boolean>) => {
    updateNotificationPrefs(vals);
    toast.success(t("toastSaved"));
    onSave();
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-2xl space-y-6">
      <div>
        <h3 className="text-lg font-bold text-ink">{t("title")}</h3>
        <p className="mt-1 text-xs text-body">{t("subtitle")}</p>
      </div>

      <div className="space-y-3">
        {mockNotificationPreferences.map((pref) => (
          <label
            key={pref.id}
            className="flex cursor-pointer items-start justify-between gap-4 border border-line bg-surface/40 p-4"
          >
            <div>
              <span className="block text-sm font-semibold text-ink">
                {t(`items.${pref.id}.title`)}
              </span>
              <span className="mt-0.5 block text-xs text-body">
                {t(`items.${pref.id}.desc`)}
              </span>
            </div>
            <input
              type="checkbox"
              className="mt-1 size-4 shrink-0 cursor-pointer accent-brand"
              {...register(pref.id)}
            />
          </label>
        ))}
      </div>

      <div className="flex justify-end border-t border-line pt-4">
        <Button
          type="submit"
          disabled={isSubmitting}
          className="cursor-pointer rounded-none"
        >
          {t("saveBtn")}
        </Button>
      </div>
    </form>
  );
}
