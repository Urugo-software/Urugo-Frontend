"use client";

import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Bell, CheckCheck, Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { StatusBadge } from "@/components/shared/StatusBadge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import type { AdminNotificationItem } from "@/types/admin";
import { getAdminStatusTone } from "@/utils/admin-status-tone";
import { AdminShellSection } from "../shared/AdminShellSection";

interface NoticeFormValues {
  title: string;
  message: string;
  audience: AdminNotificationItem["audience"];
  channel: string;
}

export function AdminNotificationsView() {
  const t = useTranslations("admin.notifications");
  const tActions = useTranslations("common.actions");
  const notifications = useAdminWorkspace((s) => s.notifications);
  const markRead = useAdminWorkspace((s) => s.markNotificationRead);
  const markAllRead = useAdminWorkspace((s) => s.markAllNotificationsRead);
  const dismiss = useAdminWorkspace((s) => s.dismissNotification);
  const sendNotice = useAdminWorkspace((s) => s.sendPlatformNotice);
  const [composeOpen, setComposeOpen] = useState(false);

  const { register, handleSubmit, reset } = useForm<NoticeFormValues>({
    defaultValues: {
      title: "",
      message: "",
      audience: "All users",
      channel: "In-app (Simulated)",
    },
  });

  const unreadCount = notifications.filter((n) => n.isUnread).length;

  return (
    <AdminShellSection
      title={t("title")}
      description={t("description")}
      action={
        <div className="flex items-center gap-2">
          {unreadCount > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                markAllRead();
                toast.success(t("markedAllToast"));
              }}
              className="h-9 rounded-none border-line px-3 text-xs font-semibold"
            >
              <CheckCheck aria-hidden="true" className="mr-1.5 size-3.5" />
              {tActions("markAllRead")}
            </Button>
          )}
          <Button
            type="button"
            onClick={() => {
              reset({
                title: "",
                message: "",
                audience: "All users",
                channel: "In-app (Simulated)",
              });
              setComposeOpen(true);
            }}
            className="h-9 rounded-none bg-ink px-3.5 text-xs font-semibold text-white"
          >
            <Plus aria-hidden="true" className="mr-1.5 size-3.5" />
            {t("createNotice")}
          </Button>
        </div>
      }
    >
      {notifications.length === 0 ? (
        <EmptyStateBox
          icon={Bell}
          title={t("emptyTitle")}
          description={t("emptyDesc")}
        />
      ) : (
        <div className="divide-y divide-line border border-line bg-white shadow-2xs">
          {notifications.map((item) => (
            <div
              key={item.id}
              className={`flex flex-col justify-between gap-3 p-4 sm:flex-row sm:items-center ${
                item.isUnread ? "bg-brand-tint/20" : "bg-white"
              }`}
            >
              <div className="min-w-0 space-y-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-xs font-bold text-brand-blue">
                    {item.audience}
                  </span>
                  <StatusBadge
                    label={item.deliveryStatus}
                    tone={getAdminStatusTone(item.deliveryStatus)}
                  />
                  <span className="text-xs text-faint">{item.createdAt}</span>
                </div>
                <Link
                  href={item.href}
                  onClick={() => markRead(item.id)}
                  className="block text-sm font-bold text-ink hover:underline"
                >
                  {item.title}
                </Link>
                <p className="text-xs text-body">{item.message}</p>
              </div>

              <div className="flex shrink-0 items-center gap-2">
                {item.isUnread && (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => markRead(item.id)}
                    className="h-8 rounded-none border-line px-2.5 text-xs font-semibold"
                  >
                    {t("markRead")}
                  </Button>
                )}
                <button
                  type="button"
                  aria-label={tActions("dismiss")}
                  onClick={() => dismiss(item.id)}
                  className="cursor-pointer p-1.5 text-faint hover:text-rose-700"
                >
                  <Trash2 aria-hidden="true" className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <ModalDialog
        open={composeOpen}
        onClose={() => setComposeOpen(false)}
        title={t("createNotice")}
        description={t("composeDesc")}
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setComposeOpen(false)}
              className="h-9 rounded-none border-line text-xs font-semibold"
            >
              {tActions("cancel")}
            </Button>
            <Button
              type="submit"
              form="admin-notice-form"
              className="h-9 rounded-none bg-ink px-4 text-xs font-semibold text-white"
            >
              {tActions("send")}
            </Button>
          </>
        }
      >
        <form
          id="admin-notice-form"
          onSubmit={handleSubmit((values) => {
            sendNotice(values);
            toast.success(t("sentToast"));
            setComposeOpen(false);
          })}
          className="space-y-3.5"
        >
          <div>
            <label className="block text-xs font-semibold text-ink">
              {t("noticeTitleLabel")} *
            </label>
            <Input
              {...register("title", { required: true })}
              className="mt-1 h-10 rounded-none border-line bg-white text-sm"
            />
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-ink">
                {t("audienceLabel")}
              </label>
              <select
                {...register("audience")}
                className="mt-1 h-10 w-full rounded-none border border-line bg-white px-3 text-sm"
              >
                <option value="All users">All users</option>
                <option value="Landlords">Landlords</option>
                <option value="Renters">Renters</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink">
                {t("channelLabel")}
              </label>
              <Input
                readOnly
                {...register("channel")}
                className="mt-1 h-10 rounded-none border-line bg-surface text-sm"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink">
              {t("messageLabel")} *
            </label>
            <textarea
              rows={3}
              {...register("message", { required: true })}
              className="mt-1 w-full rounded-none border border-line bg-white p-2.5 text-sm"
            />
          </div>
        </form>
      </ModalDialog>
    </AdminShellSection>
  );
}
