"use client";

import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Plus } from "lucide-react";
import { useTranslations } from "next-intl";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import type { AdminUserRecord } from "@/types/admin";
import { getAdminStatusTone } from "@/utils/admin-status-tone";
import {
  AdminEntityTable,
  type AdminTableColumn,
} from "../shared/AdminEntityTable";
import { AdminReasonModal } from "../shared/AdminReasonModal";
import { AdminShellSection } from "../shared/AdminShellSection";

interface CreateAdminValues {
  name: string;
  email: string;
  phone: string;
  reason: string;
}

export function AdminAccountsView() {
  const t = useTranslations("admin.adminManagement");
  const tActions = useTranslations("common.actions");
  const tCommon = useTranslations("admin.common");
  const users = useAdminWorkspace((s) => s.users);
  const createAdmin = useAdminWorkspace((s) => s.createAdminAccount);
  const toggleStatus = useAdminWorkspace((s) => s.toggleAdminAccountStatus);
  const [createOpen, setCreateOpen] = useState(false);
  const [toggleTarget, setToggleTarget] = useState<AdminUserRecord | null>(
    null,
  );

  const admins = useMemo(
    () => users.filter((u) => u.role === "ADMIN"),
    [users],
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateAdminValues>({
    defaultValues: { name: "", email: "", phone: "", reason: "" },
  });

  useEffect(() => {
    if (createOpen) {
      reset({ name: "", email: "", phone: "", reason: "" });
    }
  }, [createOpen, reset]);

  const columns: AdminTableColumn<AdminUserRecord>[] = [
    { key: "name", header: t("colName"), render: (u) => u.name },
    { key: "email", header: t("colEmail"), render: (u) => u.email },
    {
      key: "role",
      header: t("colRole"),
      render: () => <span className="font-semibold text-ink">ADMIN</span>,
    },
    {
      key: "status",
      header: t("colStatus"),
      render: (u) => (
        <StatusBadge label={u.status} tone={getAdminStatusTone(u.status)} />
      ),
    },
    { key: "login", header: t("colLastActivity"), render: (u) => u.lastActivity },
    {
      key: "actions",
      header: t("colAction"),
      render: (u) => (
        <button
          type="button"
          onClick={() => setToggleTarget(u)}
          className="cursor-pointer border border-line bg-white px-2.5 py-1 text-xs font-semibold text-ink hover:bg-surface"
        >
          {u.status === "Active" ? t("disable") : t("activate")}
        </button>
      ),
    },
  ];

  return (
    <AdminShellSection
      title={t("title")}
      description={t("description")}
      action={
        <Button
          type="button"
          onClick={() => setCreateOpen(true)}
          className="h-9 rounded-none bg-ink px-4 text-xs font-semibold text-white hover:bg-ink/90"
        >
          <Plus aria-hidden="true" className="mr-1.5 size-4" />
          {t("addAdmin")}
        </Button>
      }
    >
      <AdminEntityTable
        items={admins}
        columns={columns}
        getRowKey={(u) => u.id}
        itemLabel={t("itemLabel")}
      />

      <ModalDialog
        open={createOpen}
        onClose={() => setCreateOpen(false)}
        title={t("addAdmin")}
        description={t("addAdminDesc")}
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setCreateOpen(false)}
              className="h-9 rounded-none border-line text-xs font-semibold"
            >
              {tActions("cancel")}
            </Button>
            <Button
              type="submit"
              form="add-admin-form"
              className="h-9 rounded-none bg-ink px-4 text-xs font-semibold text-white"
            >
              {tActions("create")}
            </Button>
          </>
        }
      >
        <form
          id="add-admin-form"
          onSubmit={handleSubmit((values) => {
            try {
              createAdmin(values);
              toast.success(t("createdToast"));
              setCreateOpen(false);
            } catch (error) {
              toast.error(
                error instanceof Error ? error.message : tCommon("actionFailed"),
              );
            }
          })}
          className="space-y-3.5"
        >
          <div>
            <label className="block text-xs font-semibold text-ink">
              {t("colName")} *
            </label>
            <Input
              {...register("name", { required: t("nameRequired") })}
              className="mt-1 h-10 rounded-none border-line bg-white text-sm"
            />
            {errors.name && (
              <p className="mt-1 text-xs text-rose-700">{errors.name.message}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink">
              {t("colEmail")} *
            </label>
            <Input
              type="email"
              {...register("email", { required: t("emailRequired") })}
              className="mt-1 h-10 rounded-none border-line bg-white text-sm"
            />
            {errors.email && (
              <p className="mt-1 text-xs text-rose-700">{errors.email.message}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink">
              {t("phoneLabel")} *
            </label>
            <Input
              {...register("phone", { required: t("phoneRequired") })}
              className="mt-1 h-10 rounded-none border-line bg-white text-sm"
            />
            {errors.phone && (
              <p className="mt-1 text-xs text-rose-700">{errors.phone.message}</p>
            )}
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink">
              {t("reasonLabel")} *
            </label>
            <Input
              {...register("reason", {
                required: t("reasonRequired"),
                minLength: { value: 5, message: t("reasonMinLength") },
              })}
              className="mt-1 h-10 rounded-none border-line bg-white text-sm"
            />
            {errors.reason && (
              <p className="mt-1 text-xs text-rose-700">
                {errors.reason.message}
              </p>
            )}
          </div>
        </form>
      </ModalDialog>

      <AdminReasonModal
        open={Boolean(toggleTarget)}
        onClose={() => setToggleTarget(null)}
        title={
          toggleTarget?.status === "Active"
            ? t("disableAdminTitle")
            : t("activateAdminTitle")
        }
        description={t("toggleDesc", { name: toggleTarget?.name ?? "" })}
        confirmLabel={
          toggleTarget?.status === "Active" ? t("disable") : t("activate")
        }
        isDestructive={toggleTarget?.status === "Active"}
        onSubmitAction={(values) => {
          if (!toggleTarget) return;
          toggleStatus(toggleTarget.id, values.reason);
          toast.success(t("updatedToast"));
        }}
      />
    </AdminShellSection>
  );
}
