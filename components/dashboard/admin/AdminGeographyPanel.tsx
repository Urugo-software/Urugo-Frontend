"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { useAdminWorkspace } from "@/store/admin-workspace.store";

type GeoLevel = "province" | "district" | "sector";

export function AdminGeographyPanel() {
  const t = useTranslations("admin.charts");
  const properties = useAdminWorkspace((s) => s.properties);
  const [level, setLevel] = useState<GeoLevel>("district");

  const labels: Record<GeoLevel, string> = {
    province: t("province"),
    district: t("district"),
    sector: t("sector"),
  };

  const rows = useMemo(() => {
    const counts = new Map<string, number>();
    for (const property of properties) {
      const area = property[level] || "Unknown";
      counts.set(area, (counts.get(area) ?? 0) + 1);
    }
    return Array.from(counts.entries())
      .map(([area, count]) => ({ area, count }))
      .sort((a, b) => b.count - a.count || a.area.localeCompare(b.area));
  }, [level, properties]);

  return (
    <section className="border border-line bg-white shadow-2xs">
      <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-4">
        <div>
          <h3 className="text-sm font-bold text-ink">{t("geographyTitle")}</h3>
          <p className="mt-0.5 text-xs text-body">{t("geographySubtitle")}</p>
        </div>
        <select
          value={level}
          onChange={(event) => setLevel(event.target.value as GeoLevel)}
          aria-label={t("geographyGroupingAria")}
          className="h-9 rounded-none border border-line bg-white px-2.5 text-xs font-semibold text-ink"
        >
          {(Object.entries(labels) as Array<[GeoLevel, string]>).map(
            ([value, label]) => (
              <option key={value} value={value}>
                {label}
              </option>
            ),
          )}
        </select>
      </div>

      <div className="divide-y divide-line px-5">
        {rows.map((item) => (
          <div
            key={item.area}
            className="flex items-center justify-between py-3.5 text-sm"
          >
            <span className="text-body">{item.area}</span>
            <span className="font-semibold text-ink">
              {t("propertiesCount", { count: item.count })}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
