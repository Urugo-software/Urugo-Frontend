"use client";

import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export function MaintenanceHeader({
  onOpenModal,
}: {
  onOpenModal: () => void;
}) {
  const t = useTranslations("renter.maintenance");

  return (
    <div className="flex flex-wrap items-end justify-between gap-4">
      <div>
        <h2 className="text-xl font-bold tracking-tight text-ink sm:text-2xl">
          {t("title")}
        </h2>
        <p className="mt-1 text-sm text-body">{t("subtitle")}</p>
      </div>
      <Button
        type="button"
        onClick={onOpenModal}
        className="h-9 cursor-pointer rounded-none px-4 text-xs font-semibold"
      >
        <Plus aria-hidden="true" className="size-4" />
        {t("reportNew")}
      </Button>
    </div>
  );
}
