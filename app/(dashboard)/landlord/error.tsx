"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LandlordError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const t = useTranslations("landlord.pages.error");

  return (
    <main className="flex min-h-0 flex-1 items-center justify-center bg-surface/30 p-6 sm:p-10">
      <div className="w-full max-w-md border border-line bg-white p-8 text-center shadow-2xs">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center border border-rose-200 bg-rose-50 text-rose-600">
          <AlertTriangle aria-hidden="true" className="size-6" />
        </div>
        <h2 className="text-lg font-bold text-ink">{t("title")}</h2>
        <p className="mt-2 text-xs leading-relaxed text-body">
          {error.message || t("fallbackMessage")}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Button
            type="button"
            onClick={reset}
            className="cursor-pointer rounded-none"
          >
            <RefreshCw aria-hidden="true" className="size-4" />
            {t("tryAgain")}
          </Button>
          <Link
            href="/landlord"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-none",
            )}
          >
            {t("backToOverview")}
          </Link>
        </div>
      </div>
    </main>
  );
}
