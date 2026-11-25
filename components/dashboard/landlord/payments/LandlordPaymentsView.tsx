"use client";

import Link from "next/link";
import { useMemo, useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import toast from "react-hot-toast";
import { Check, CreditCard, Eye, X } from "lucide-react";
import { DashboardSearchInput } from "@/components/shared/DashboardSearchInput";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Pagination } from "@/components/shared/Pagination";
import { StatusBadge, type StatusTone } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { mockMonthlyCollectionHistory } from "@/data/landlord-data";
import type { AppLocale } from "@/i18n/config";
import {
  localizeDisplayDate,
  localizePaymentMethod,
} from "@/i18n/display-format";
import { formatRwfLocalized } from "@/i18n/formatting";
import { useLandlordProperties } from "@/store/landlord-properties.store";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import type { PaymentStatus, TenancyPayment } from "@/types/landlord";
import { computeManagedStats } from "@/utils/landlord-metrics";
import { paginateItems } from "@/utils/pagination";
import { OverviewStatGrid } from "../overview/OverviewStatGrid";
import { RejectPaymentModal } from "./RejectPaymentModal";

const ITEMS_PER_PAGE = 6;
const STATUS_TABS: Array<"All" | PaymentStatus> = [
  "All",
  "Pending",
  "Approved",
  "Rejected",
  "Disputed",
];

const PAYMENT_TONE: Record<PaymentStatus, StatusTone> = {
  Approved: "success",
  Pending: "warning",
  Rejected: "danger",
  Disputed: "warning",
};

export function LandlordPaymentsView() {
  const t = useTranslations("landlord.payments");
  const tStatuses = useTranslations("common.statuses");
  const locale = useLocale() as AppLocale;
  const containerRef = useRef<HTMLDivElement>(null);
  const { properties, units } = useLandlordProperties();
  const {
    renters,
    payments,
    issues,
    inquiries,
    viewings,
    approvePayment,
    rejectPayment,
  } = useLandlordWorkspace();

  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"All" | PaymentStatus>("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [rejectTarget, setRejectTarget] = useState<TenancyPayment | null>(null);
  const [detailTarget, setDetailTarget] = useState<TenancyPayment | null>(null);

  const stats = useMemo(
    () =>
      computeManagedStats({
        properties,
        units,
        renters,
        payments,
        monthlyHistory: mockMonthlyCollectionHistory,
        issues,
        inquiries,
        viewings,
      }),
    [inquiries, issues, payments, properties, renters, units, viewings],
  );

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return payments.filter((p) => {
      const matchesStatus = statusFilter === "All" || p.status === statusFilter;
      const matchesQuery =
        !q ||
        [p.renterName, p.propertyName, p.unitNumber, p.period, p.reference]
          .filter(Boolean)
          .some((field) => field!.toLowerCase().includes(q));
      return matchesStatus && matchesQuery;
    });
  }, [payments, search, statusFilter]);

  const {
    items: paginated,
    page,
    totalPages,
    totalItems,
  } = paginateItems(filtered, currentPage, ITEMS_PER_PAGE);

  const tabLabel = (tab: "All" | PaymentStatus) => {
    if (tab === "All") return t("tabAll");
    if (tab === "Pending") return tStatuses("pending");
    if (tab === "Approved") return tStatuses("approved");
    if (tab === "Rejected") return tStatuses("rejected");
    return tStatuses("disputed");
  };

  const summaryCards = [
    {
      label: t("kpis.collectedMonth"),
      value: formatRwfLocalized(stats.currentMonthCollectedRwf, locale),
      helper: t("kpis.collectedMonthHelper", {
        rate: stats.collectionRate,
        expected: formatRwfLocalized(stats.currentMonthExpectedRwf, locale),
      }),
      progressPercent: stats.collectionRate,
      accent: "success" as const,
    },
    {
      label: t("kpis.collectedYtd"),
      value: formatRwfLocalized(stats.ytdRentCollectedRwf, locale),
      helper: t("kpis.collectedYtdHelper"),
    },
    {
      label: t("kpis.pendingVerification"),
      value: formatRwfLocalized(stats.pendingVerificationRwf, locale),
      helper: t(
        stats.pendingPaymentsCount === 1
          ? "kpis.pendingSingle"
          : "kpis.pendingPlural",
        { count: stats.pendingPaymentsCount },
      ),
      accent: stats.pendingPaymentsCount > 0 ? ("warning" as const) : ("default" as const),
    },
    {
      label: t("kpis.confirmedOverdue"),
      value: formatRwfLocalized(stats.confirmedOverdueRwf, locale),
      helper: t(
        stats.overdueRentersCount === 1
          ? "kpis.overdueSingle"
          : "kpis.overduePlural",
        { count: stats.overdueRentersCount },
      ),
      accent: stats.confirmedOverdueRwf > 0 ? ("danger" as const) : ("default" as const),
    },
  ];

  return (
    <div
      ref={containerRef}
      className="min-h-0 flex-1 space-y-6 overflow-y-auto p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24"
    >
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-ink sm:text-3xl">
          {t("title")}
        </h2>
        <p className="mt-1 text-sm text-body">{t("subtitle")}</p>
      </div>

      <OverviewStatGrid items={summaryCards} />

      {/* Search & Status Filter */}
      <div className="flex flex-col gap-3 border border-line bg-white p-3 shadow-2xs lg:flex-row lg:items-center lg:justify-between">
        <DashboardSearchInput
          value={search}
          onChange={(val) => {
            setSearch(val);
            setCurrentPage(1);
          }}
          placeholder={t("searchPlaceholder")}
          label={t("searchAria")}
          className="w-full lg:max-w-md"
        />

        <div
          role="tablist"
          aria-label={t("filterAria")}
          className="flex flex-wrap items-center gap-1.5"
        >
          {STATUS_TABS.map((tab) => {
            const active = statusFilter === tab;
            return (
              <button
                key={tab}
                type="button"
                role="tab"
                aria-selected={active}
                onClick={() => {
                  setStatusFilter(tab);
                  setCurrentPage(1);
                }}
                className={`h-9 cursor-pointer border px-3 text-xs font-semibold transition-colors ${
                  active
                    ? "border-ink bg-ink text-white"
                    : "border-line bg-white text-body hover:bg-surface hover:text-ink"
                }`}
              >
                {tabLabel(tab)}
              </button>
            );
          })}
        </div>
      </div>

      {paginated.length === 0 ? (
        <EmptyStateBox
          icon={CreditCard}
          title={t("emptyTitle")}
          description={t("emptyDesc")}
          action={
            search || statusFilter !== "All" ? (
              <Button
                type="button"
                variant="outline"
                className="cursor-pointer rounded-none"
                onClick={() => {
                  setSearch("");
                  setStatusFilter("All");
                  setCurrentPage(1);
                }}
              >
                {t("resetFilters")}
              </Button>
            ) : undefined
          }
        />
      ) : (
        <>
          {/* Desktop Table */}
          <div className="hidden overflow-x-auto border border-line bg-white shadow-2xs md:block">
            <table className="w-full border-collapse text-left text-sm">
              <thead>
                <tr className="border-b border-line bg-surface/60 text-xs font-semibold uppercase tracking-wider text-faint">
                  <th scope="col" className="px-4 py-3.5">{t("colTenantProperty")}</th>
                  <th scope="col" className="px-4 py-3.5">{t("colPeriod")}</th>
                  <th scope="col" className="px-4 py-3.5">{t("colAmount")}</th>
                  <th scope="col" className="px-4 py-3.5">{t("colMethodRef")}</th>
                  <th scope="col" className="px-4 py-3.5">{t("colStatus")}</th>
                  <th scope="col" className="px-4 py-3.5 text-right">{t("colActions")}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-line">
                {paginated.map((payment) => (
                  <tr key={payment.id} className="hover:bg-surface/30">
                    <td className="px-4 py-3.5">
                      {payment.renterId ? (
                        <Link
                          href={`/landlord/tenancies/${payment.renterId}`}
                          className="font-semibold text-ink hover:text-brand-blue hover:underline"
                        >
                          {payment.renterName ?? t("tenantFallback")}
                        </Link>
                      ) : (
                        <span className="font-semibold text-ink">
                          {payment.renterName ?? t("tenantFallback")}
                        </span>
                      )}
                      <p className="text-xs text-faint">
                        {payment.propertyName ?? t("propertyFallback")}
                        {payment.unitNumber ? ` · ${payment.unitNumber}` : ""}
                      </p>
                    </td>
                    <td className="px-4 py-3.5 text-xs text-body">
                      <p className="font-medium text-ink">
                        {localizeDisplayDate(payment.period, locale)}
                      </p>
                      <p className="text-faint">
                        {t("duePrefix", {
                          date: localizeDisplayDate(payment.dueDate, locale),
                        })}
                      </p>
                    </td>
                    <td className="px-4 py-3.5 font-ibm font-bold text-ink">
                      {formatRwfLocalized(payment.amountRwf, locale)}
                    </td>
                    <td className="px-4 py-3.5 text-xs text-body">
                      <p>
                        {localizePaymentMethod(payment.paymentMethod, locale)}
                      </p>
                      {payment.reference && (
                        <p className="font-ibm text-faint">
                          {t("refPrefix", { reference: payment.reference })}
                        </p>
                      )}
                    </td>
                    <td className="px-4 py-3.5">
                      <StatusBadge
                        label={payment.status}
                        tone={PAYMENT_TONE[payment.status]}
                      />
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center justify-end gap-1.5">
                        {payment.status === "Pending" && (
                          <>
                            <Button
                              type="button"
                              size="sm"
                              onClick={() => {
                                approvePayment(payment.id);
                                toast.success(
                                  t("toastApprovedNamed", {
                                    amount: formatRwfLocalized(
                                      payment.amountRwf,
                                      locale,
                                    ),
                                    name:
                                      payment.renterName ?? t("tenantFallback"),
                                  }),
                                );
                              }}
                              className="h-8 cursor-pointer rounded-none bg-emerald-700 px-2.5 text-xs text-white hover:bg-emerald-800"
                            >
                              <Check aria-hidden="true" className="size-3.5" />
                              {t("approve")}
                            </Button>
                            <Button
                              type="button"
                              size="sm"
                              variant="outline"
                              onClick={() => setRejectTarget(payment)}
                              className="h-8 cursor-pointer rounded-none border-rose-200 px-2.5 text-xs text-rose-700 hover:bg-rose-50"
                            >
                              <X aria-hidden="true" className="size-3.5" />
                              {t("reject")}
                            </Button>
                          </>
                        )}
                        <Button
                          type="button"
                          size="sm"
                          variant="ghost"
                          aria-label={t("inspectAria", { id: payment.id })}
                          onClick={() => setDetailTarget(payment)}
                          className="h-8 cursor-pointer rounded-none px-2 text-xs text-body hover:text-ink"
                        >
                          <Eye aria-hidden="true" className="size-4" />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Mobile Cards */}
          <div className="space-y-3 md:hidden">
            {paginated.map((payment) => (
              <div
                key={payment.id}
                className="space-y-3 border border-line bg-white p-4 shadow-2xs"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <p className="truncate text-sm font-bold text-ink">
                      {payment.renterName ?? t("tenantFallback")}
                    </p>
                    <p className="truncate text-xs text-faint">
                      {payment.propertyName} · {payment.unitNumber}
                    </p>
                  </div>
                  <StatusBadge
                    label={payment.status}
                    tone={PAYMENT_TONE[payment.status]}
                  />
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-body">
                    {localizeDisplayDate(payment.period, locale)}
                  </span>
                  <span className="font-ibm font-bold text-ink">
                    {formatRwfLocalized(payment.amountRwf, locale)}
                  </span>
                </div>
                <div className="flex flex-wrap gap-2 border-t border-line pt-3">
                  {payment.status === "Pending" && (
                    <>
                      <Button
                        type="button"
                        size="sm"
                        onClick={() => {
                          approvePayment(payment.id);
                          toast.success(t("toastApproved"));
                        }}
                        className="flex-1 cursor-pointer rounded-none bg-emerald-700 text-xs text-white"
                      >
                        {t("approve")}
                      </Button>
                      <Button
                        type="button"
                        size="sm"
                        variant="outline"
                        onClick={() => setRejectTarget(payment)}
                        className="flex-1 cursor-pointer rounded-none border-rose-200 text-xs text-rose-700"
                      >
                        {t("reject")}
                      </Button>
                    </>
                  )}
                  <Button
                    type="button"
                    size="sm"
                    variant="outline"
                    onClick={() => setDetailTarget(payment)}
                    className="cursor-pointer rounded-none text-xs"
                  >
                    {t("details")}
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <Pagination
            currentPage={page}
            totalPages={totalPages}
            totalItems={totalItems}
            itemsPerPage={ITEMS_PER_PAGE}
            itemLabel={t("paginationLabel")}
            onPageChange={(nextPage) => {
              setCurrentPage(nextPage);
              containerRef.current?.scrollTo({ top: 0, behavior: "smooth" });
            }}
          />
        </>
      )}

      <RejectPaymentModal
        payment={rejectTarget}
        onClose={() => setRejectTarget(null)}
        onConfirm={(id, category, reason) => {
          rejectPayment(id, category, reason);
          toast.success(t("toastRejectionRecorded"));
        }}
      />

      <ModalDialog
        open={Boolean(detailTarget)}
        onClose={() => setDetailTarget(null)}
        title={t("detailModal.title")}
        description={
          detailTarget
            ? `${localizeDisplayDate(detailTarget.period, locale)} · ${detailTarget.renterName ?? t("tenantFallback")}`
            : undefined
        }
        footer={
          <Button
            type="button"
            variant="outline"
            onClick={() => setDetailTarget(null)}
            className="cursor-pointer rounded-none"
          >
            {t("detailModal.close")}
          </Button>
        }
      >
        {detailTarget && (
          <dl className="divide-y divide-line text-sm">
            {[
              [
                t("detailModal.amount"),
                formatRwfLocalized(detailTarget.amountRwf, locale),
              ],
              [t("detailModal.status"), tabLabel(detailTarget.status)],
              [
                t("detailModal.property"),
                `${detailTarget.propertyName ?? "—"} ${detailTarget.unitNumber ? `(${detailTarget.unitNumber})` : ""}`,
              ],
              [
                t("detailModal.dueDate"),
                localizeDisplayDate(detailTarget.dueDate, locale),
              ],
              [
                t("detailModal.method"),
                localizePaymentMethod(detailTarget.paymentMethod, locale),
              ],
              [t("detailModal.reference"), detailTarget.reference ?? "—"],
              [
                t("detailModal.approvedDate"),
                detailTarget.paidAt
                  ? localizeDisplayDate(detailTarget.paidAt, locale)
                  : t("detailModal.notApproved"),
              ],
              ...(detailTarget.rejectionReason
                ? [
                    [
                      t("detailModal.rejectionReason"),
                      detailTarget.rejectionReason,
                    ],
                    [
                      t("detailModal.createsUnpaidBalance"),
                      detailTarget.createsUnpaidBalance
                        ? t("detailModal.yes")
                        : t("detailModal.noAdminRejection"),
                    ],
                  ]
                : []),
            ].map(([label, value]) => (
              <div key={label} className="flex justify-between gap-4 py-2.5">
                <dt className="text-xs font-semibold text-faint">{label}</dt>
                <dd className="text-right text-xs font-medium text-ink">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        )}
      </ModalDialog>
    </div>
  );
}
