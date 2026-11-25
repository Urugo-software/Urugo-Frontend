import type { Metadata } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { Toaster } from "react-hot-toast";

import { QueryProvider } from "@/components/provider/QueryClient";
import { TIME_ZONE } from "@/i18n/config";
import { epilogue, ibm, merriweather } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("common.meta");

  return {
    title: {
      default: t("siteName"),
      template: `%s | ${t("siteName")}`,
    },
    description: t("defaultDescription"),
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [locale, messages] = await Promise.all([getLocale(), getMessages()]);

  return (
    <html
      lang={locale}
      className={cn(
        "h-full",
        "antialiased",
        ibm.variable,
        merriweather.variable,
        epilogue.variable,
        epilogue.className,
        "font-sans",
      )}
    >
      <body className="flex min-h-full flex-col">
        <NextIntlClientProvider
          locale={locale}
          messages={messages}
          timeZone={TIME_ZONE}
        >
          <Toaster position="top-center" />
          <QueryProvider>{children}</QueryProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
