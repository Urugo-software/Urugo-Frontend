"use client";

import Link from "next/link";
import { useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  ArrowLeft,
  CalendarPlus,
  FileText,
  ScrollText,
  User,
} from "lucide-react";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button, buttonVariants } from "@/components/ui/button";
import { Field, FieldError, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import type { AppLocale } from "@/i18n/config";
import { formatDateLocalized, formatRwfLocalized } from "@/i18n/formatting";
import { cn } from "@/lib/utils";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { findPropertyForRenter } from "@/utils/property-tenancies";
import { EndTenancyWorkflow } from "./EndTenancyWorkflow";
import { TenancyHeader } from "./TenancyHeader";

interface RenewFormValues {
  endDate: string;
  monthlyRentRwf: string;
}

export function TenancyDetailView({
  renterId,
  fromPropertyId,
}: {
  renterId: string;
  fromPropertyId?: string;
}) {
  const t = useTranslations("landlord.tenancies.detail");
  const locale = useLocale() as AppLocale;
  const { renters, payments, renewTenancy } = useLandlordWorkspace();
  const { properties } = useLandlordProperties();
  const renter = renters.find((r) => r.id === renterId);

  const [renewOpen, setRenewOpen] = useState(false);

  const renewForm = useForm<RenewFormValues>({
    defaultValues: {
      endDate: "",
      monthlyRentRwf: renter?.monthlyRentRwf.toString() ?? "",
    },
  });

  if (!renter) {
    return (
      <main className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 md:p-10">
        <EmptyStateBox
          icon={ScrollText}
          title={t("notFoundTitle")}
          description={t("notFoundDesc")}
          action={
            <Link
              href="/landlord/tenancies"
              className={cn(buttonVariants({ variant: "outline" }), "rounded-none")}
            >
              {t("backToTenancies")}
            </Link>
          }
        />
      </main>
    );
  }

  const property = findPropertyForRenter(renter, properties);
  const originProperty = fromPropertyId
    ? properties.find((item) => item.id === fromPropertyId)
    : undefined;
  const scopedPayments = payments.filter((p) => p.renterId === renter.id);

  const backHref = originProperty
    ? `/landlord/tenancies?property=${encodeURIComponent(originProperty.id)}`
    : "/landlord/tenancies";
  const backLabel = originProperty
    ? t("backToProperty", { name: originProperty.name })
    : t("backToTenancies");

  return (
    <main className="min-h-0 flex-1 space-y-6 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <Link
          href={backHref}
          className="inline-flex items-center gap-2 text-sm font-semibold text-body transition-colors hover:text-ink"
        >
          <ArrowLeft aria-hidden="true" className="size-4" />
          <span>{backLabel}</span>
        </Link>

        <div className="flex flex-wrap items-center gap-2">
          <Link
            href={`/landlord/renters/${renter.id}`}
            className={cn(
              buttonVariants({ variant: "outline" }),
              "h-9 rounded-none text-xs font-semibold",
            )}
          >
            <User aria-hidden="true" className="size-3.5" />
            <span>{t("renterProfile")}</span>
          </Link>
          {renter.agreementId && (
            <Link
              href={`/landlord/agreements/${renter.agreementId}`}
              className={cn(
                buttonVariants({ variant: "outline" }),
                "h-9 rounded-none text-xs font-semibold",
              )}
            >
              <FileText aria-hidden="true" className="size-3.5" />
              <span>{t("leaseAgreement")}</span>
            </Link>
          )}
          {renter.tenancyStatus !== "Closed" && (
            <Button
              type="button"
              size="sm"
              onClick={() => {
                renewForm.reset({
                  endDate: "",
                  monthlyRentRwf: renter.monthlyRentRwf.toString(),
                });
                setRenewOpen(true);
              }}
              className="h-9 cursor-pointer rounded-none text-xs font-semibold"
            >
              <CalendarPlus aria-hidden="true" className="size-3.5" />
              <span>{t("renewExtendBtn")}</span>
            </Button>
          )}
        </div>
      </div>

      <TenancyHeader renter={renter} property={property} />

      {/* Tenancy Terms Overview */}
      <section className="grid grid-cols-2 gap-4 border border-line bg-white p-5 shadow-2xs sm:grid-cols-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("startDate")}
          </span>
          <p className="mt-1 text-sm font-bold text-ink">{renter.startDate}</p>
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("leaseEndDate")}
          </span>
          <p className="mt-1 text-sm font-bold text-ink">
            {renter.endDate ?? t("openEnded")}
          </p>
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("monthlyRent")}
          </span>
          <p className="mt-1 font-ibm text-sm font-bold text-ink">
            {formatRwfLocalized(renter.monthlyRentRwf, locale)}
          </p>
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("securityDeposit")}
          </span>
          <p className="mt-1 font-ibm text-sm font-bold text-ink">
            {renter.securityDepositRwf
              ? formatRwfLocalized(renter.securityDepositRwf, locale)
              : "—"}
          </p>
        </div>
      </section>

      {/* End Tenancy & Payment Settlement */}
      <div className="border border-line bg-white shadow-2xs">
        <div className="border-b border-line px-5 py-4 sm:px-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
            {t("workflowHeading")}
          </h3>
          <p className="mt-1 text-sm font-semibold text-ink">
            {t("workflowSubtitle")}
          </p>
        </div>
        <div className="p-5 sm:p-6">
          <EndTenancyWorkflow
            renter={renter}
            initialPayments={scopedPayments}
          />
        </div>
      </div>

      {/* Lease Renewal Modal */}
      <ModalDialog
        open={renewOpen}
        onClose={() => setRenewOpen(false)}
        title={t("renewModalTitle")}
        description={t("renewModalDesc", {
          name: renter.name,
          property: renter.propertyName,
          unit: renter.unitNumber,
        })}
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setRenewOpen(false)}
              className="cursor-pointer rounded-none"
            >
              {t("cancel")}
            </Button>
            <Button
              type="submit"
              form="renew-tenancy-form"
              className="cursor-pointer rounded-none"
            >
              {t("saveRenewal")}
            </Button>
          </>
        }
      >
        <form
          id="renew-tenancy-form"
          noValidate
          onSubmit={renewForm.handleSubmit((vals) => {
            const formatted = formatDateLocalized(vals.endDate, locale);
            renewTenancy(renter.id, {
              endDate: formatted,
              monthlyRentRwf: Number(vals.monthlyRentRwf) || renter.monthlyRentRwf,
            });
            toast.success(t("toastRenewed", { date: formatted }));
            setRenewOpen(false);
          })}
          className="space-y-4"
        >
          <Field>
            <FieldLabel htmlFor="renew-end-date">
              {t("newEndDateLabel")} <span className="text-rose-600">*</span>
            </FieldLabel>
            <Input
              id="renew-end-date"
              type="date"
              className="h-10 rounded-none"
              {...renewForm.register("endDate", {
                required: t("newEndDateRequired"),
              })}
            />
            <FieldError>
              {renewForm.formState.errors.endDate?.message}
            </FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="renew-rent">
              {t("monthlyRentInputLabel")}{" "}
              <span className="text-rose-600">*</span>
            </FieldLabel>
            <Input
              id="renew-rent"
              type="number"
              min={1000}
              step={1000}
              className="h-10 rounded-none"
              {...renewForm.register("monthlyRentRwf", {
                validate: (v) => Number(v) > 0 || t("monthlyRentPositive"),
              })}
            />
            <FieldError>
              {renewForm.formState.errors.monthlyRentRwf?.message}
            </FieldError>
          </Field>
        </form>
      </ModalDialog>
    </main>
  );
}
