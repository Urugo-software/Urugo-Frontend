"use client";

import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface Props {
  isPending: boolean;
}

export function PayRentFooterActions({ isPending }: Props) {
  const t = useTranslations("renter.payments.payRent");
  const tActions = useTranslations("common.actions");

  return (
    <div className="flex flex-wrap items-center justify-between gap-4 border-t border-line pt-5">
      <div className="flex items-center gap-2 text-xs text-faint">
        <ShieldCheck aria-hidden="true" className="size-4 text-success" />
        <span>{t("encryptedNote")}</span>
      </div>
      <div className="flex items-center gap-2.5">
        <Link
          href="/renter/payments"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "h-10 rounded-none px-5 text-xs font-semibold",
          )}
        >
          {tActions("cancel")}
        </Link>
        <Button
          type="submit"
          disabled={isPending}
          className="h-10 cursor-pointer rounded-none px-6 text-xs font-semibold"
        >
          {isPending ? t("submitting") : t("confirmSubmit")}
        </Button>
      </div>
    </div>
  );
}
