"use client";

import { useQueryClient } from "@tanstack/react-query";
import { AxiosError } from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";
import { useEffect } from "react";

import { useAuthSession } from "@/hooks/query/useAuthSession";
import { AUTH_SESSION_QUERY_KEY } from "@/services/auth.service";
import type { AuthRole, AuthUser } from "@/types/auth";
import { getPostLoginRoute } from "@/utils/auth-helpers";

function requiredRoles(pathname: string): AuthRole[] | null {
  if (pathname === "/admin" || pathname.startsWith("/admin/")) return ["ADMIN", "SUPER_ADMIN"];
  if (pathname === "/landlord" || pathname.startsWith("/landlord/")) return ["LANDLORD"];
  if (pathname === "/renter" || pathname.startsWith("/renter/")) return ["RENTER"];
  if (pathname === "/home-seeker" || pathname.startsWith("/home-seeker/")) return ["HOME_SEEKER"];
  return null;
}

function hasRequiredRole(user: AuthUser, allowed: AuthRole[] | null): boolean {
  if (!allowed) return true;
  const roles = new Set([user.role, ...user.roles]);
  return allowed.some((role) => roles.has(role));
}

export function AuthSessionGuard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const queryClient = useQueryClient();
  const t = useTranslations("auth.session");
  const session = useAuthSession();
  const user = session.data;
  const authorized = user ? hasRequiredRole(user, requiredRoles(pathname)) : false;

  useEffect(() => {
    const onAuthExpired = () => {
      queryClient.removeQueries({ queryKey: AUTH_SESSION_QUERY_KEY });
      router.replace(`/auth/sign-in?next=${encodeURIComponent(pathname)}`);
    };
    window.addEventListener("urugo:auth-expired", onAuthExpired);
    return () => window.removeEventListener("urugo:auth-expired", onAuthExpired);
  }, [pathname, queryClient, router]);

  useEffect(() => {
    if (!session.isError) return;
    if (session.error instanceof AxiosError && session.error.response?.status === 401) {
      router.replace(`/auth/sign-in?next=${encodeURIComponent(pathname)}`);
    }
  }, [pathname, router, session.error, session.isError]);

  useEffect(() => {
    if (user && !authorized) router.replace(getPostLoginRoute(user.role));
  }, [authorized, router, user]);

  if (session.isPending || (user && !authorized)) {
    return <div role="status" aria-busy="true" className="grid min-h-[40vh] place-items-center text-sm text-body">{t("checking")}</div>;
  }

  if (session.isError) {
    const unauthorized = session.error instanceof AxiosError && session.error.response?.status === 401;
    return (
      <div role={unauthorized ? "status" : "alert"} className="grid min-h-[40vh] place-items-center p-6 text-center text-sm text-body">
        {unauthorized ? t("redirecting") : t("unavailable")}
      </div>
    );
  }

  return user && authorized ? <>{children}</> : null;
}
