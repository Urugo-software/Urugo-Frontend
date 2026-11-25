"use client";

import Link from "next/link";
import { AlertTriangle, RefreshCw } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function RenterError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <main className="flex min-h-0 flex-1 items-center justify-center bg-surface/30 p-6 sm:p-10">
      <div className="w-full max-w-md border border-line bg-white p-8 text-center shadow-2xs">
        <div className="mx-auto mb-4 flex size-12 items-center justify-center border border-rose-200 bg-rose-50 text-rose-600">
          <AlertTriangle aria-hidden="true" className="size-6" />
        </div>
        <h2 className="text-lg font-bold text-ink">Something went wrong</h2>
        <p className="mt-2 text-xs leading-relaxed text-body">
          {error.message ||
            "We could not load this renter view. Please try again."}
        </p>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-2">
          <Button
            type="button"
            onClick={reset}
            className="cursor-pointer rounded-none"
          >
            <RefreshCw aria-hidden="true" className="size-4" />
            Try again
          </Button>
          <Link
            href="/renter"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-none",
            )}
          >
            Back to overview
          </Link>
        </div>
      </div>
    </main>
  );
}
