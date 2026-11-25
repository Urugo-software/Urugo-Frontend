"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { Building2, Check, ShieldCheck } from "lucide-react";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { LandlordServiceMode } from "@/types/landlord";

const FEATURE_KEYS = ["f1", "f2", "f3", "f4", "f5"] as const;

export function ServiceTab({ onSave }: { onSave: () => void }) {
  const t = useTranslations("landlord.settings.service");
  const { serviceMode, setServiceMode } = useLandlordWorkspace();
  const [pendingMode, setPendingMode] = useState<LandlordServiceMode | null>(
    null,
  );

  const servicePlans: Array<{
    mode: LandlordServiceMode;
    title: string;
    subtitle: string;
    features: string[];
    icon: typeof Building2;
  }> = [
    {
      mode: "listing_only",
      title: t("listingOnlyTitle"),
      subtitle: t("listingOnlySubtitle"),
      icon: Building2,
      features: FEATURE_KEYS.map((k) => t(`listingOnlyFeatures.${k}`)),
    },
    {
      mode: "managed",
      title: t("managedTitle"),
      subtitle: t("managedSubtitle"),
      icon: ShieldCheck,
      features: FEATURE_KEYS.map((k) => t(`managedFeatures.${k}`)),
    },
  ];

  const applyMode = (mode: LandlordServiceMode) => {
    setServiceMode(mode);
    toast.success(
      mode === "managed" ? t("toastUpgraded") : t("toastSwitchedListingOnly"),
    );
    onSave();
    setPendingMode(null);
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-bold text-ink">{t("title")}</h3>
        <p className="mt-1 text-xs text-body">{t("subtitle")}</p>
      </div>

      <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">
        {servicePlans.map(({ mode, title, subtitle, features, icon: Icon }) => {
          const isCurrent = serviceMode === mode;
          return (
            <div
              key={mode}
              className={`flex flex-col justify-between space-y-5 border p-5 ${
                isCurrent
                  ? "border-brand-blue bg-brand-tint/25"
                  : "border-line bg-white"
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-2.5">
                    <div className="flex size-9 items-center justify-center border border-line bg-white text-brand-blue">
                      <Icon aria-hidden="true" className="size-4" />
                    </div>
                    <h4 className="text-sm font-bold text-ink">{title}</h4>
                  </div>
                  {isCurrent && (
                    <StatusBadge label={t("activePlanBadge")} tone="success" />
                  )}
                </div>

                <p className="text-xs leading-relaxed text-body">{subtitle}</p>

                <ul className="space-y-2 border-t border-line pt-3">
                  {features.map((feat) => (
                    <li
                      key={feat}
                      className="flex items-start gap-2 text-xs text-ink"
                    >
                      <Check
                        aria-hidden="true"
                        className="mt-0.5 size-3.5 shrink-0 text-emerald-600"
                      />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <Button
                type="button"
                variant={isCurrent ? "outline" : "default"}
                disabled={isCurrent}
                onClick={() => setPendingMode(mode)}
                className="w-full cursor-pointer rounded-none text-xs"
              >
                {isCurrent
                  ? t("currentlyActive")
                  : mode === "managed"
                    ? t("upgradeBtn")
                    : t("switchListingOnlyBtn")}
              </Button>
            </div>
          );
        })}
      </div>

      <ModalDialog
        open={pendingMode !== null}
        onClose={() => setPendingMode(null)}
        title={
          pendingMode === "managed"
            ? t("upgradeModalTitle")
            : t("switchModalTitle")
        }
        description={
          pendingMode === "managed"
            ? t("upgradeModalDesc")
            : t("switchModalDesc")
        }
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setPendingMode(null)}
              className="cursor-pointer rounded-none"
            >
              {t("cancel")}
            </Button>
            <Button
              type="button"
              onClick={() => pendingMode && applyMode(pendingMode)}
              className="cursor-pointer rounded-none"
            >
              {t("confirmChange")}
            </Button>
          </>
        }
      >
        <p className="text-xs text-body">{t("modalNote")}</p>
      </ModalDialog>
    </div>
  );
}
