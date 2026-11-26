import type { ReactNode } from "react";
import { AdminAccessGuard } from "@/components/dashboard/admin/shared/AdminAccessGuard";

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminAccessGuard>{children}</AdminAccessGuard>;
}
