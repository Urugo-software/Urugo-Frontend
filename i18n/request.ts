import { cookies, headers } from "next/headers";
import { getRequestConfig } from "next-intl/server";

import {
  isAppLocale,
  LOCALE_COOKIE,
  resolveLocaleFromAcceptLanguage,
  TIME_ZONE,
  type AppLocale,
} from "./config";
import { loadLocaleMessages } from "./messages";

export default getRequestConfig(async () => {
  const cookieStore = await cookies();
  const cookieLocale = cookieStore.get(LOCALE_COOKIE)?.value;

  let locale: AppLocale;
  if (isAppLocale(cookieLocale)) {
    locale = cookieLocale;
  } else {
    const headerStore = await headers();
    locale = resolveLocaleFromAcceptLanguage(
      headerStore.get("accept-language"),
    );
  }

  const messages = await loadLocaleMessages(locale);

  return {
    locale,
    messages,
    timeZone: TIME_ZONE,
  };
});
