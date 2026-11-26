"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import type { AdminPaymentRecord } from "@/types/admin";
import { getAdminStatusTone } from "@/utils/admin-status-tone";
import {
  AdminEntityTable,
  type AdminTableColumn,
} from "../shared/AdminEntityTable";
import { AdminFilterBar } from "../shared/AdminFilterBar";
import { AdminShellSection } from "../shared/AdminShellSection";

export function AdminPaymentsView() {
  const t = useTranslations("admin.payments");
  const locale = useLocale() as AppLocale;
  const payments = useAdminWorkspace((s) => s.payments);
  const financialRequests = useAdminWorkspace((s) => s.financialRequests);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [providerFilter, setProviderFilter] = useState("");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return payments.filter((p) => {
      const matchStatus = !statusFilter || p.status === statusFilter;
      const matchProvider = !providerFilter || p.provider === providerFilter;
      const matchQuery =
        !q ||
        p.transactionId.toLowerCase().includes(q) ||
        p.renterName.toLowerCase().includes(q) ||
        p.landlordName.toLowerCase().includes(q) ||
        p.reference.toLowerCase().includes(q);
      return matchStatus && matchProvider && matchQuery;
    });
  }, [payments, providerFilter, searchQuery, statusFilter]);

  const columns: AdminTableColumn<AdminPaymentRecord>[] = [
    {
      key: "tx",
      header: t("colTx"),
      render: (p) => (
        <Link
          href={`/admin/payments/${encodeURIComponent(p.transactionId)}`}
          className="font-semibold text-brand-blue hover:underline"
        >
          {p.transactionId}
        </Link>
      ),
    },
    { key: "renter", header: t("colRenter"), render: (p) => p.renterName },
    {
      key: "property",
      header: t("colProperty"),
      render: (p) => p.propertyTitle,
    },
    {
      key: "amount",
      header: t("colAmount"),
      render: (p) => (
        <span className="font-semibold text-ink">
          {formatRwfLocalized(p.amountRwf, locale)}
        </span>
      ),
    },
    { key: "provider", header: t("colProvider"), render: (p) => p.provider },
    {
      key: "reconciliation",
      header: t("colReconciliation"),
      render: (p) => (
        <StatusBadge
          label={p.reconciliationState}
          tone={getAdminStatusTone(p.reconciliationState)}
        />
      ),
    },
    {
      key: "status",
      header: t("colStatus"),
      render: (p) => (
        <StatusBadge label={p.status} tone={getAdminStatusTone(p.status)} />
      ),
    },
  ];

  return (
    <AdminShellSection title={t("title")} description={t("description")}>
      <AdminFilterBar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchPlaceholder={t("searchPlaceholder")}
        searchLabel={t("searchPlaceholder")}
        filters={[
          {
            key: "status",
            label: t("allStatuses"),
            options: [
              { value: "Successful", label: "Successful" },
              { value: "Pending", label: "Pending" },
              { value: "Failed", label: "Failed" },
              { value: "Refunded", label: "Refunded" },
            ],
          },
          {
            key: "provider",
            label: t("allProviders"),
            options: [
              { value: "MTN MoMo", label: "MTN MoMo" },
              { value: "Airtel Money", label: "Airtel Money" },
              { value: "Bank of Kigali", label: "Bank of Kigali" },
            ],
          },
        ]}
        selectedFilters={{ status: statusFilter, provider: providerFilter }}
        onFilterChange={(key, val) => {
          if (key === "status") setStatusFilter(val);
          if (key === "provider") setProviderFilter(val);
        }}
        onReset={() => {
          setSearchQuery("");
          setStatusFilter("");
          setProviderFilter("");
        }}
      />

      <AdminEntityTable
        items={filtered}
        columns={columns}
        getRowKey={(p) => p.transactionId}
        itemLabel={t("itemLabel")}
        onResetEmpty={() => {
          setSearchQuery("");
          setStatusFilter("");
          setProviderFilter("");
        }}
      />

      {financialRequests.length > 0 && (
        <section className="border border-line bg-white shadow-2xs">
          <div className="border-b border-line px-5 py-4">
            <h3 className="text-sm font-bold text-ink">
              {t("pendingRequestsTitle")}
            </h3>
            <p className="mt-0.5 text-xs text-body">
              {t("pendingRequestsSubtitle")}
            </p>
          </div>
          <div className="divide-y divide-line px-5">
            {financialRequests.map((req) => (
              <div
                key={req.id}
                className="flex flex-wrap items-center justify-between gap-3 py-3 text-sm"
              >
                <div>
                  <p className="font-semibold text-ink">
                    {req.id} · {req.requestType} (
                    <Link
                      href={`/admin/payments/${encodeURIComponent(req.transactionId)}`}
                      className="text-brand-blue hover:underline"
                    >
                      {req.transactionId}
                    </Link>
                    )
                  </p>
                  <p className="text-xs text-body">
                    {formatRwfLocalized(req.amountRwf, locale)} — {req.reason}
                  </p>
                </div>
                <StatusBadge
                  label={req.status}
                  tone={getAdminStatusTone(req.status)}
                />
              </div>
            ))}
          </div>
        </section>
      )}
    </AdminShellSection>
  );
}
