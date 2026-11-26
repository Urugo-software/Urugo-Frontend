"use client";

import { useTranslations } from "next-intl";
import { AdminAnalyticsFacts } from "./AdminAnalyticsFacts";
import { AdminGeographyPanel } from "./AdminGeographyPanel";
import { AdminGrowthCharts } from "./AdminGrowthCharts";
import { AdminPaymentsChart } from "./AdminPaymentsChart";
import { AdminShellSection } from "./shared/AdminShellSection";

export function AdminAnalyticsView() {
  const t = useTranslations("admin.analytics");

  return (
    <AdminShellSection title={t("title")} description={t("description")}>
      <AdminAnalyticsFacts />
      <AdminGrowthCharts />
      <div className="grid grid-cols-1 gap-5 xl:grid-cols-[minmax(0,1.6fr)_minmax(320px,1fr)]">
        <AdminPaymentsChart />
        <AdminGeographyPanel />
      </div>
    </AdminShellSection>
  );
}
