"use client";

import Link from "next/link";
import { useEffect } from "react";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";

export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const tCommon = useTranslations("admin.common");
  const tActions = useTranslations("common.actions");

  useEffect(() => {
    console.error("[AdminError]", error);
  }, [error]);

  return (
    <div
      role="alert"
      className="flex min-h-0 flex-1 items-center justify-center bg-surface/30 p-6"
    >
      <div className="w-full max-w-md border border-line bg-white p-6 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center border border-line bg-surface text-rose-700">
            <AlertTriangle aria-hidden="true" className="size-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-bold text-ink">
              {tCommon("errorTitle")}
            </h2>
            <p className="mt-1 text-xs leading-relaxed text-body">
              {tCommon("errorDescription")}
            </p>
            {error.digest && (
              <p className="mt-2 font-mono text-[12.5px] text-faint">
                Ref: {error.digest}
              </p>
            )}
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-end gap-2 border-t border-line pt-4">
          <Link
            href="/admin"
            className="inline-flex h-9 items-center border border-line bg-white px-3.5 text-xs font-semibold text-ink hover:bg-surface"
          >
            {tCommon("backToOverview")}
          </Link>
          <Button
            type="button"
            onClick={reset}
            className="h-9 rounded-none bg-ink px-3.5 text-xs font-semibold text-white hover:bg-ink/90"
          >
            <RefreshCw aria-hidden="true" className="mr-1.5 size-3.5" />
            {tActions("tryAgain")}
          </Button>
        </div>
      </div>
    </div>
  );
}
