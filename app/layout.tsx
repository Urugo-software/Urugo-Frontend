import { ibm, epilogue, merriweather } from "@/lib/fonts";
import type { Metadata } from "next";
import "./globals.css";
import { cn } from "@/lib/utils";
import { QueryProvider } from "@/components/provider/QueryClient";
import { Toaster } from "react-hot-toast";

export const metadata: Metadata = {
  title: {
    default: "Urugo",
    template: "%s | Urugo",
  },
  description:
    "Browse rental homes across Rwanda, request property viewings, or list and manage leases, rent payments, and tenants in one place.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
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
        <Toaster position="top-center" />
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
