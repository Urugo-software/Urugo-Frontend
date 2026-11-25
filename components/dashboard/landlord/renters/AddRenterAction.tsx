"use client";

import Link from "next/link";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export function AddRenterAction() {
  const t = useTranslations("landlord.renters");

  return (
    <Link
      href="/landlord/renters/add"
      aria-label={t("addRenterAria")}
      className={cn(
        buttonVariants({ variant: "default" }),
        "h-10 shrink-0 rounded-none px-3 sm:px-4",
      )}
    >
      <Plus aria-hidden="true" className="size-4" />
      <span className="hidden sm:inline">{t("addRenter")}</span>
    </Link>
  );
}
