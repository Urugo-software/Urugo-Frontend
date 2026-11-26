"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import type { AdminUserRecord } from "@/types/admin";
import { getAdminStatusTone } from "@/utils/admin-status-tone";
import {
  AdminEntityTable,
  type AdminTableColumn,
} from "../shared/AdminEntityTable";
import { AdminFilterBar } from "../shared/AdminFilterBar";
import { AdminShellSection } from "../shared/AdminShellSection";

export function AdminUsersView() {
  const t = useTranslations("admin.users");
  const users = useAdminWorkspace((s) => s.users);
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");

  const filtered = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return users.filter((user) => {
      const matchRole = !roleFilter || user.role === roleFilter;
      const matchStatus = !statusFilter || user.status === statusFilter;
      const matchQuery =
        !q ||
        user.name.toLowerCase().includes(q) ||
        user.email.toLowerCase().includes(q) ||
        user.phone.toLowerCase().includes(q);
      return matchRole && matchStatus && matchQuery;
    });
  }, [roleFilter, searchQuery, statusFilter, users]);

  const columns: AdminTableColumn<AdminUserRecord>[] = [
    {
      key: "name",
      header: t("colName"),
      render: (u) => (
        <Link
          href={`/admin/users/${encodeURIComponent(u.id)}`}
          className="font-semibold text-brand-blue hover:underline"
        >
          {u.name}
        </Link>
      ),
    },
    { key: "email", header: t("colEmail"), render: (u) => u.email },
    {
      key: "role",
      header: t("colRole"),
      render: (u) => (
        <span className="font-semibold text-ink">
          {u.role}
          {u.serviceMode ? ` · ${u.serviceMode}` : ""}
        </span>
      ),
    },
    {
      key: "verification",
      header: t("colVerification"),
      render: (u) => (
        <StatusBadge
          label={u.verification}
          tone={getAdminStatusTone(u.verification)}
        />
      ),
    },
    {
      key: "status",
      header: t("colStatus"),
      render: (u) => (
        <StatusBadge label={u.status} tone={getAdminStatusTone(u.status)} />
      ),
    },
    {
      key: "activity",
      header: t("colLastActivity"),
      render: (u) => <span className="text-body">{u.lastActivity}</span>,
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
            key: "role",
            label: t("allRoles"),
            options: [
              { value: "ADMIN", label: "ADMIN" },
              { value: "LANDLORD", label: "LANDLORD" },
              { value: "RENTER", label: "RENTER" },
            ],
          },
          {
            key: "status",
            label: t("allStatuses"),
            options: [
              { value: "Active", label: "Active" },
              { value: "Restricted", label: "Restricted" },
              { value: "Suspended", label: "Suspended" },
              { value: "Disabled", label: "Disabled" },
            ],
          },
        ]}
        selectedFilters={{ role: roleFilter, status: statusFilter }}
        onFilterChange={(key, value) => {
          if (key === "role") setRoleFilter(value);
          if (key === "status") setStatusFilter(value);
        }}
        onReset={() => {
          setSearchQuery("");
          setRoleFilter("");
          setStatusFilter("");
        }}
      />

      <AdminEntityTable
        items={filtered}
        columns={columns}
        getRowKey={(u) => u.id}
        itemLabel={t("itemLabel")}
        onResetEmpty={() => {
          setSearchQuery("");
          setRoleFilter("");
          setStatusFilter("");
        }}
      />
    </AdminShellSection>
  );
}
