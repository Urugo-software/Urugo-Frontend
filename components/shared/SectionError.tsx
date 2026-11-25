"use client";

import { AlertTriangle, RefreshCw } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";

interface SectionErrorProps {
  message?: string;
  onRetry?: () => void;
}

function SectionError({ message, onRetry }: SectionErrorProps) {
  const tStates = useTranslations("common.states");
  const tActions = useTranslations("common.actions");
  const displayMessage = message ?? tStates("errorDefault");

  return (
    <div
      role="alert"
      className="flex min-h-64 w-full flex-col items-center justify-center gap-3 p-6 text-center"
    >
      <div className="flex size-10 items-center justify-center text-rose-600">
        <AlertTriangle aria-hidden="true" className="size-5" />
      </div>
      <p className="max-w-md text-sm font-medium text-rose-700">
        {displayMessage}
      </p>
      {onRetry && (
        <Button
          type="button"
          variant="outline"
          onClick={onRetry}
          className="cursor-pointer rounded-none"
        >
          <RefreshCw aria-hidden="true" className="size-4" />
          {tActions("tryAgain")}
        </Button>
      )}
    </div>
  );
}

export default SectionError;
