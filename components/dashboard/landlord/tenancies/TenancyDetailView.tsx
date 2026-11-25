"use client";

import Link from "next/link";
import { useState } from "react";
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
import { cn } from "@/lib/utils";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { formatRwf } from "@/utils/format";
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
          title="Tenancy not found"
          description="We could not find a tenancy record with this identifier."
          action={
            <Link
              href="/landlord/tenancies"
              className={cn(buttonVariants({ variant: "outline" }), "rounded-none")}
            >
              Back to Tenancies
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
    ? `Back to ${originProperty.name}`
    : "Back to Tenancies";

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
            <span>Renter Profile</span>
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
              <span>Lease Agreement</span>
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
              <span>Renew / Extend Lease</span>
            </Button>
          )}
        </div>
      </div>

      <TenancyHeader renter={renter} property={property} />

      {/* Tenancy Terms Overview */}
      <section className="grid grid-cols-2 gap-4 border border-line bg-white p-5 shadow-2xs sm:grid-cols-4">
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-faint">
            Start Date
          </span>
          <p className="mt-1 text-sm font-bold text-ink">{renter.startDate}</p>
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-faint">
            Lease End Date
          </span>
          <p className="mt-1 text-sm font-bold text-ink">
            {renter.endDate ?? "Open-ended"}
          </p>
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-faint">
            Monthly Rent
          </span>
          <p className="mt-1 font-ibm text-sm font-bold text-ink">
            {formatRwf(renter.monthlyRentRwf)}
          </p>
        </div>
        <div>
          <span className="text-xs font-semibold uppercase tracking-wider text-faint">
            Security Deposit
          </span>
          <p className="mt-1 font-ibm text-sm font-bold text-ink">
            {renter.securityDepositRwf
              ? formatRwf(renter.securityDepositRwf)
              : "—"}
          </p>
        </div>
      </section>

      {/* End Tenancy & Payment Settlement */}
      <div className="border border-line bg-white shadow-2xs">
        <div className="border-b border-line px-5 py-4 sm:px-6">
          <h3 className="text-xs font-semibold uppercase tracking-wider text-faint">
            Payments & End Tenancy Workflow
          </h3>
          <p className="mt-1 text-sm font-semibold text-ink">
            Verify pending rent submissions, check final utility bills, and
            close this tenancy safely.
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
        title="Renew / Extend Tenancy"
        description={`Extend the lease period for ${renter.name} (${renter.propertyName} · ${renter.unitNumber}).`}
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setRenewOpen(false)}
              className="cursor-pointer rounded-none"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              form="renew-tenancy-form"
              className="cursor-pointer rounded-none"
            >
              Save Renewal
            </Button>
          </>
        }
      >
        <form
          id="renew-tenancy-form"
          noValidate
          onSubmit={renewForm.handleSubmit((vals) => {
            const formatted = new Date(vals.endDate).toLocaleDateString(
              "en-GB",
              { day: "2-digit", month: "short", year: "numeric" },
            );
            renewTenancy(renter.id, {
              endDate: formatted,
              monthlyRentRwf: Number(vals.monthlyRentRwf) || renter.monthlyRentRwf,
            });
            toast.success(`Lease extended through ${formatted}.`);
            setRenewOpen(false);
          })}
          className="space-y-4"
        >
          <Field>
            <FieldLabel htmlFor="renew-end-date">
              New lease end date <span className="text-rose-600">*</span>
            </FieldLabel>
            <Input
              id="renew-end-date"
              type="date"
              className="h-10 rounded-none"
              {...renewForm.register("endDate", {
                required: "Choose a new lease end date.",
              })}
            />
            <FieldError>
              {renewForm.formState.errors.endDate?.message}
            </FieldError>
          </Field>
          <Field>
            <FieldLabel htmlFor="renew-rent">
              Monthly rent (RWF) <span className="text-rose-600">*</span>
            </FieldLabel>
            <Input
              id="renew-rent"
              type="number"
              min={1000}
              step={1000}
              className="h-10 rounded-none"
              {...renewForm.register("monthlyRentRwf", {
                validate: (v) =>
                  Number(v) > 0 || "Enter a positive rent amount.",
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
