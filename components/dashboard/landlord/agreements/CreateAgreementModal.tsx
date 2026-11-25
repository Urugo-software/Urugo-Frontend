"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { generateStandardArticles } from "@/data/agreement-templates";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { Agreement, AgreementLanguage } from "@/types/agreement.types";
import { createSafeId } from "@/utils/format";

interface CreateAgreementFormValues {
  renterId: string;
  language: AgreementLanguage;
  durationMonths: number;
  advanceMonths: number;
  paymentDueDay: number;
}

interface CreateAgreementModalProps {
  open: boolean;
  onClose: () => void;
}

export function CreateAgreementModal({
  open,
  onClose,
}: CreateAgreementModalProps) {
  const t = useTranslations("landlord.agreements.createModal");
  const tLangs = useTranslations("landlord.agreements.languageNames");
  const tCommon = useTranslations("common");
  const router = useRouter();
  const renters = useLandlordWorkspace((s) => s.renters);
  const profile = useLandlordWorkspace((s) => s.profile);
  const upsertAgreement = useLandlordWorkspace((s) => s.upsertAgreement);
  const properties = useLandlordProperties((s) => s.properties);

  const activeRenters = renters.filter((r) => r.tenancyStatus !== "Closed");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAgreementFormValues>({
    defaultValues: {
      renterId: activeRenters[0]?.id ?? "",
      language: "en",
      durationMonths: 12,
      advanceMonths: 1,
      paymentDueDay: 5,
    },
  });

  function onSubmit(values: CreateAgreementFormValues) {
    const renter = renters.find((r) => r.id === values.renterId);
    if (!renter) {
      toast.error(t("selectRenterToast"));
      return;
    }

    const property = properties.find((p) => p.id === renter.propertyId);
    const now = new Date();
    const id = createSafeId("agr");
    const refSuffix = id.slice(-4).toUpperCase();
    const monthlyRent = renter.monthlyRentRwf;
    const deposit = renter.securityDepositRwf ?? monthlyRent;
    const totalAdvance = monthlyRent * Number(values.advanceMonths);
    const propertyTypeLabel =
      property?.type === "HOUSE"
        ? "Residential House"
        : property?.type === "COMMERCIAL"
          ? "Commercial Property"
          : "Residential Apartment";

    const newAgreement: Agreement = {
      id,
      referenceNumber: `URG-${now.getFullYear()}-${refSuffix}`,
      landlord: {
        name: profile.fullName,
        phone: profile.phone,
        nationalId: "1198080012345678",
        email: profile.email,
        address: "Kigali, Rwanda",
      },
      renter: {
        name: renter.name,
        phone: renter.phone,
        nationalId: "Pending verification",
        email: renter.email ?? "",
      },
      property: {
        id: property?.id ?? renter.propertyId ?? id,
        name: property?.name ?? renter.propertyName,
        unitNumber: renter.unitNumber,
        address: property?.location ?? "Kigali, Rwanda",
        district: property?.location?.split(",")[0]?.trim() || "Gasabo",
        propertyType: propertyTypeLabel,
      },
      financials: {
        monthlyRentRwf: monthlyRent,
        paymentDueDay: Number(values.paymentDueDay),
        advanceMonths: Number(values.advanceMonths),
        totalAdvanceRwf: totalAdvance,
        securityDepositRwf: deposit,
        totalInitialAmountRwf: totalAdvance + deposit,
        currency: "RWF",
      },
      tenancyStartDate: now.toISOString().slice(0, 10),
      tenancyDurationMonths: Number(values.durationMonths),
      commencementType: "fixed_date",
      commencementStatus: "confirmed",
      language: values.language,
      status: "Draft",
      version: 1,
      createdAt: now.toISOString(),
      updatedAt: now.toISOString(),
      articles: generateStandardArticles(values.language),
    };

    upsertAgreement(newAgreement);
    toast.success(
      t("draftCreatedToast", { ref: newAgreement.referenceNumber }),
    );
    reset();
    onClose();
    router.push(`/landlord/agreements/${id}/edit`);
  }

  return (
    <ModalDialog
      open={open}
      onClose={onClose}
      title={t("title")}
      description={t("description")}
    >
      {activeRenters.length === 0 ? (
        <div className="space-y-4 py-2 text-sm text-body">
          <p>{t("noRentersMessage")}</p>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              className="rounded-none"
            >
              {tCommon("actions.close")}
            </Button>
            <Link
              href="/landlord/renters/add"
              className="inline-flex h-9 items-center bg-ink px-4 text-xs font-semibold text-white hover:bg-black"
            >
              {t("registerRenter")}
            </Link>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 text-sm">
          <div>
            <label
              htmlFor="agreement-renter"
              className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-faint"
            >
              {t("renterAndUnit")}
            </label>
            <select
              id="agreement-renter"
              {...register("renterId", { required: t("renterRequired") })}
              className="h-10 w-full border border-line bg-white px-3 text-sm text-ink focus:border-ink focus:outline-none"
            >
              {activeRenters.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.name} — {r.propertyName} ({r.unitNumber})
                </option>
              ))}
            </select>
            {errors.renterId && (
              <p className="mt-1 text-xs text-red-600">
                {errors.renterId.message}
              </p>
            )}
          </div>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            <div>
              <label
                htmlFor="agreement-language"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-faint"
              >
                {t("contractLanguage")}
              </label>
              <select
                id="agreement-language"
                {...register("language")}
                className="h-10 w-full border border-line bg-white px-3 text-sm text-ink focus:border-ink focus:outline-none"
              >
                <option value="en">{tLangs("en")}</option>
                <option value="rw">{tLangs("rw")}</option>
              </select>
            </div>

            <div>
              <label
                htmlFor="agreement-duration"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-faint"
              >
                {t("durationMonths")}
              </label>
              <input
                id="agreement-duration"
                type="number"
                min={1}
                max={60}
                {...register("durationMonths", {
                  required: true,
                  valueAsNumber: true,
                  min: 1,
                })}
                className="h-10 w-full border border-line bg-white px-3 text-sm text-ink focus:border-ink focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="agreement-advance"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-faint"
              >
                {t("advanceMonths")}
              </label>
              <input
                id="agreement-advance"
                type="number"
                min={1}
                max={12}
                {...register("advanceMonths", {
                  required: true,
                  valueAsNumber: true,
                  min: 1,
                })}
                className="h-10 w-full border border-line bg-white px-3 text-sm text-ink focus:border-ink focus:outline-none"
              />
            </div>

            <div>
              <label
                htmlFor="agreement-due-day"
                className="mb-1.5 block text-xs font-semibold uppercase tracking-wider text-faint"
              >
                {t("monthlyDueDay")}
              </label>
              <input
                id="agreement-due-day"
                type="number"
                min={1}
                max={31}
                {...register("paymentDueDay", {
                  required: true,
                  valueAsNumber: true,
                  min: 1,
                  max: 31,
                })}
                className="h-10 w-full border border-line bg-white px-3 text-sm text-ink focus:border-ink focus:outline-none"
              />
            </div>
          </div>

          <div className="flex items-center justify-between border-t border-line pt-4">
            <Link
              href="/landlord/renters/add"
              className="text-xs font-medium text-brand hover:underline"
            >
              {t("needNewRenter")}
            </Link>
            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="h-9 cursor-pointer rounded-none border-line px-4 text-xs"
              >
                {tCommon("actions.cancel")}
              </Button>
              <Button
                type="submit"
                className="h-9 cursor-pointer rounded-none bg-ink px-4 text-xs font-semibold text-white hover:bg-black"
              >
                {t("submit")}
              </Button>
            </div>
          </div>
        </form>
      )}
    </ModalDialog>
  );
}
