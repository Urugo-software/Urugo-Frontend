"use server";

import { cookies } from "next/headers";

import {
  DEFAULT_LOCALE,
  isAppLocale,
  LOCALE_COOKIE,
  type AppLocale,
} from "./config";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export async function setAppLocale(nextLocale: string): Promise<AppLocale> {
  const locale: AppLocale = isAppLocale(nextLocale)
    ? nextLocale
    : DEFAULT_LOCALE;
  const cookieStore = await cookies();

  cookieStore.set(LOCALE_COOKIE, locale, {
    path: "/",
    maxAge: ONE_YEAR_SECONDS,
    sameSite: "lax",
    httpOnly: false,
  });

  return locale;
}
