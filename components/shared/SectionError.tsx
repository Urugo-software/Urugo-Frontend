import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SectionErrorProps {
  message?: string;
  onRetry?: () => void;
}

function SectionError({
  message = "An error occurred while loading this section.",
  onRetry,
}: SectionErrorProps) {
  return (
    <div
      role="alert"
      className="flex min-h-64 w-full flex-col items-center justify-center gap-3 p-6 text-center"
    >
      <div className="flex size-10 items-center justify-center border border-rose-200 bg-rose-50 text-rose-600">
        <AlertTriangle aria-hidden="true" className="size-5" />
      </div>
      <p className="max-w-md text-sm font-medium text-rose-700">{message}</p>
      {onRetry && (
        <Button
          type="button"
          variant="outline"
          onClick={onRetry}
          className="cursor-pointer rounded-none"
        >
          <RefreshCw aria-hidden="true" className="size-4" />
          Try Again
        </Button>
      )}
    </div>
  );
}

export default SectionError;
