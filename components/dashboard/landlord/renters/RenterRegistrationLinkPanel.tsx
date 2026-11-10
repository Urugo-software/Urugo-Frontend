"use client";

import { Check, Copy, Link2, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSimulatedRenterLink } from "./hooks/useSimulatedRenterLink";
import { RenterRegistrationLinkPanelProps } from "./types/renter-registration.types";

export function RenterRegistrationLinkPanel({
  properties,
  onCancel,
}: RenterRegistrationLinkPanelProps) {
  const {
    generatedLink,
    copied,
    copyStatus,
    generateLink,
    copyLink,
  } = useSimulatedRenterLink(properties);

  return (
    <div className="space-y-8 sm:space-y-9">
      {!generatedLink ? (
        <div className="border border-dashed border-line bg-surface/50 p-8 sm:p-12 text-center space-y-4">
          <div className="mx-auto flex size-12 items-center justify-center border border-blue-200 bg-brand-tint text-brand-blue">
            <Link2 className="size-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-ink">
              Ready to Generate Invitation Link
            </h3>
            <p className="mt-1.5 text-sm text-body max-w-md mx-auto leading-relaxed">
              Generate a simulated onboarding link that a renter can open to
              submit their registration and National ID.
            </p>
          </div>
          <Button
            type="button"
            onClick={generateLink}
            className="mt-3 h-11 cursor-pointer gap-2 rounded-none bg-brand-blue px-6 text-sm font-semibold text-white hover:bg-brand-deep"
          >
            <Link2 className="size-4" />
            <span>Generate Simulated Link</span>
          </Button>
        </div>
      ) : (
        <div className="border border-line bg-surface/60 p-6 sm:p-7 space-y-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <span className="text-xs text-faint">
              Generated at {generatedLink.createdAt} · Expires in{" "}
              {generatedLink.expiresInLabel}
            </span>
          </div>

          <div className="flex flex-col sm:flex-row gap-2.5">
            <Input
              type="text"
              readOnly
              value={generatedLink.url}
              aria-label="registration invitation link"
              className="h-11 flex-1 rounded-none border-line bg-white px-3.5 font-mono text-xs text-ink"
            />
            <Button
              type="button"
              onClick={copyLink}
              className="h-11 shrink-0 cursor-pointer gap-2 rounded-none bg-brand-blue px-5 text-sm font-semibold text-white hover:bg-brand-deep"
            >
              {copied ? (
                <>
                  <Check className="size-4" />
                  <span>Copied</span>
                </>
              ) : (
                <>
                  <Copy className="size-4" />
                  <span>Copy Link</span>
                </>
              )}
            </Button>
          </div>

          <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-body">
            <span>
              Property:{" "}
              <strong className="font-semibold text-ink">
                {generatedLink.propertyName || "General Registration"}
              </strong>
            </span>
            <button
              type="button"
              onClick={generateLink}
              className="inline-flex cursor-pointer items-center gap-1.5 font-semibold text-brand-blue hover:underline"
            >
              <RefreshCw className="size-3.5" />
              <span>Generate New Link</span>
            </button>
          </div>

          {copyStatus && (
            <div
              role="status"
              className={`border px-3.5 py-2.5 text-xs font-medium ${
                copyStatus.type === "success"
                  ? "border-blue-200 bg-brand-tint text-brand-blue"
                  : "border-rose-200 bg-rose-50 text-rose-700"
              }`}
            >
              {copyStatus.text}
            </div>
          )}
        </div>
      )}

      {onCancel && (
        <div className="flex justify-end border-t border-line pt-6 sm:pt-8 mt-10">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
            className="h-11 cursor-pointer rounded-none border-line px-5 text-sm font-semibold text-ink"
          >
            Back to Renters
          </Button>
        </div>
      )}
    </div>
  );
}
