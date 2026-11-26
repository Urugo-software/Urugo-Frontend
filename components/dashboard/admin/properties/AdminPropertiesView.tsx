"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { StatusBadge } from "@/components/shared/StatusBadge";
import type { AppLocale } from "@/i18n/config";
import { formatRwfLocalized } from "@/i18n/formatting";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import type { AdminPropertyRecord } from "@/types/admin";
import { getAdminStatusTone } from "@/utils/admin-status-tone";
import {
  AdminEntityTable,
  type AdminTableColumn,
} from "../shared/AdminEntityTable";
import { AdminFilterBar } from "../shared/AdminFilterBar";
import { AdminShellSection } from "../shared/AdminShellSection";

export function AdminPropertiesView() {
  const t = useTranslations("admin.properties");
  const locale = useLocale() as AppLocale;
  const properties = useAdminWorkspace((s) => s.properties);
  const [searchQuery, setSearchQuery] = useState("");
  const [verificationFilter, setVerificationFilter] = useState("");
  const [districtFilter, setDistrictFilter] = useState("");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return properties.filter((p) => {
      const matchVerif =
        !verificationFilter || p.verification === verificationFilter;
      const matchDistrict = !districtFilter || p.district === districtFilter;
      const matchQuery =
        !q ||
        p.id.toLowerCase().includes(q) ||
        p.title.toLowerCase().includes(q) ||
        p.landlordName.toLowerCase().includes(q) ||
        p.location.toLowerCase().includes(q);
      return matchVerif && matchDistrict && matchQuery;
    });
  }, [districtFilter, properties, searchQuery, verificationFilter]);

  const districts = [...new Set(properties.map((p) => p.district))];

  const columns: AdminTableColumn<AdminPropertyRecord>[] = [
    {
      key: "id",
      header: t("colId"),
      render: (p) => (
        <Link
          href={`/admin/properties/${encodeURIComponent(p.id)}`}
          className="font-semibold text-brand-blue hover:underline"
        >
          {p.id}
        </Link>
      ),
    },
    {
      key: "title",
      header: t("colProperty"),
      render: (p) => (
        <div>
          <p className="font-semibold text-ink">{p.title}</p>
          <p className="text-xs text-body">{p.location}</p>
        </div>
      ),
    },
    {
      key: "landlord",
      header: t("colLandlord"),
      render: (p) => (
        <Link
          href={`/admin/users/${encodeURIComponent(p.landlordId)}`}
          className="text-body hover:text-brand-blue hover:underline"
        >
          {p.landlordName}
        </Link>
      ),
    },
    {
      key: "rent",
      header: t("colRent"),
      render: (p) => (
        <span className="font-semibold text-ink">
          {formatRwfLocalized(p.rentRwf, locale)}
        </span>
      ),
    },
    {
      key: "occupancy",
      header: t("colOccupancy"),
      render: (p) => `${p.occupiedUnits} / ${p.units}`,
    },
    {
      key: "verification",
      header: t("colVerification"),
      render: (p) => (
        <StatusBadge
          label={p.isSuspended ? "Suspended" : p.verification}
          tone={getAdminStatusTone(p.isSuspended ? "Suspended" : p.verification)}
        />
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
            key: "verification",
            label: t("allVerifications"),
            options: [
              { value: "Verified", label: "Verified" },
              { value: "Pending", label: "Pending" },
              { value: "Needs Information", label: "Needs Information" },
              { value: "Rejected", label: "Rejected" },
            ],
          },
          {
            key: "district",
            label: t("allDistricts"),
            options: districts.map((d) => ({ value: d, label: d })),
          },
        ]}
        selectedFilters={{
          verification: verificationFilter,
          district: districtFilter,
        }}
        onFilterChange={(key, value) => {
          if (key === "verification") setVerificationFilter(value);
          if (key === "district") setDistrictFilter(value);
        }}
        onReset={() => {
          setSearchQuery("");
          setVerificationFilter("");
          setDistrictFilter("");
        }}
      />

      <AdminEntityTable
        items={filtered}
        columns={columns}
        getRowKey={(p) => p.id}
        itemLabel={t("itemLabel")}
        onResetEmpty={() => {
          setSearchQuery("");
          setVerificationFilter("");
          setDistrictFilter("");
        }}
      />
    </AdminShellSection>
  );
}
