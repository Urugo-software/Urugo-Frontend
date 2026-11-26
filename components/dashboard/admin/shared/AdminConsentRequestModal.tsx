"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { ShieldCheck } from "lucide-react";
import { useTranslations } from "next-intl";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface ConsentRequestFormValues {
  reason: string;
  evidenceRef: string;
  summary: string;
}

interface AdminConsentRequestModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  description: string;
  partiesRequired: string;
  defaultSummary: string;
  requireEvidence?: boolean;
  onSubmitRequest: (values: ConsentRequestFormValues) => void;
}

export function AdminConsentRequestModal({
  open,
  onClose,
  title,
  description,
  partiesRequired,
  defaultSummary,
  requireEvidence = true,
  onSubmitRequest,
}: AdminConsentRequestModalProps) {
  const tActions = useTranslations("common.actions");
  const tConsent = useTranslations("admin.consentModal");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ConsentRequestFormValues>({
    defaultValues: { reason: "", evidenceRef: "", summary: defaultSummary },
  });

  useEffect(() => {
    if (open) {
      reset({ reason: "", evidenceRef: "", summary: defaultSummary });
    }
  }, [defaultSummary, open, reset]);

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title={title}
      description={description}
      footer={
        <>
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            className="h-9 rounded-none border-line text-xs font-semibold"
          >
            {tActions("cancel")}
          </Button>
          <Button
            type="submit"
            form="admin-consent-request-form"
            className="h-9 rounded-none bg-brand-blue px-4 text-xs font-semibold text-white hover:bg-brand-deep"
          >
            {tConsent("sendConsentRequest")}
          </Button>
        </>
      }
    >
      <form
        id="admin-consent-request-form"
        onSubmit={handleSubmit((values) => {
          onSubmitRequest(values);
          onClose();
        })}
        className="space-y-4"
      >
        <div className="flex items-start gap-2.5 border border-line bg-brand-tint p-3 text-xs text-ink">
          <ShieldCheck
            aria-hidden="true"
            className="mt-0.5 size-4 shrink-0 text-brand-blue"
          />
          <div>
            <p className="font-bold">{tConsent("consentNoticeTitle")}</p>
            <p className="mt-0.5 text-body">{partiesRequired}</p>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink">
            {tConsent("summaryLabel")} *
          </label>
          <Input
            {...register("summary", {
              required: tConsent("summaryRequired"),
            })}
            className="mt-1.5 h-10 rounded-none border-line bg-white text-sm"
          />
          {errors.summary && (
            <p className="mt-1 text-xs text-rose-700">{errors.summary.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink">
            {tConsent("reasonLabel")} *
          </label>
          <textarea
            rows={3}
            placeholder={tConsent("reasonPlaceholder")}
            {...register("reason", {
              required: tConsent("reasonRequired"),
              minLength: { value: 5, message: tConsent("reasonMinLength") },
            })}
            className="mt-1.5 w-full rounded-none border border-line bg-white p-2.5 text-sm text-ink outline-none focus:border-ink"
          />
          {errors.reason && (
            <p className="mt-1 text-xs text-rose-700">{errors.reason.message}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-semibold text-ink">
            {tConsent("evidenceLabel")}
            {requireEvidence ? " *" : ""}
          </label>
          <Input
            placeholder={tConsent("evidencePlaceholder")}
            {...register("evidenceRef", {
              validate: (v) =>
                !requireEvidence || v.trim().length >= 3
                  ? true
                  : tConsent("evidenceRequired"),
            })}
            className="mt-1.5 h-10 rounded-none border-line bg-white text-sm"
          />
          {errors.evidenceRef && (
            <p className="mt-1 text-xs text-rose-700">
              {errors.evidenceRef.message}
            </p>
          )}
        </div>
      </form>
    </ModalDialog>
  );
}
