"use client";

import Link from "next/link";
import type { ReactNode } from "react";
import { ShieldAlert } from "lucide-react";
import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import { hasRolePermission } from "@/utils/admin-permissions";

export function AdminAccessGuard({ children }: { children: ReactNode }) {
  const t = useTranslations("admin.guard");
  const activeRole = useAdminWorkspace((s) => s.activeRole);
  const setActiveRole = useAdminWorkspace((s) => s.setActiveRole);

  if (hasRolePermission(activeRole, "admin:access")) {
    return <>{children}</>;
  }

  return (
    <div className="flex min-h-0 flex-1 items-center justify-center bg-surface/30 p-6">
      <div className="w-full max-w-md border border-line bg-white p-6 shadow-2xs">
        <div className="flex items-start gap-3">
          <div className="flex size-10 shrink-0 items-center justify-center border border-line bg-surface text-rose-700">
            <ShieldAlert aria-hidden="true" className="size-5" />
          </div>
          <div className="min-w-0">
            <h2 className="text-base font-bold text-ink">{t("title")}</h2>
            <p className="mt-1 text-xs leading-relaxed text-body">
              {t("description", { role: activeRole })}
            </p>
          </div>
        </div>

        <div className="mt-5 flex flex-wrap items-center justify-end gap-2 border-t border-line pt-4">
          <Link
            href={activeRole === "RENTER" ? "/renter" : "/landlord"}
            className="inline-flex h-9 items-center border border-line bg-white px-3.5 text-xs font-semibold text-ink hover:bg-surface"
          >
            {t("returnWorkspace")}
          </Link>
          <Button
            type="button"
            onClick={() => setActiveRole("ADMIN")}
            className="h-9 rounded-none bg-ink px-3.5 text-xs font-semibold text-white hover:bg-ink/90"
          >
            {t("switchToAdmin")}
          </Button>
        </div>
      </div>
    </div>
  );
}
