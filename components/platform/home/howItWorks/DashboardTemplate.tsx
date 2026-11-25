import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Menu } from "lucide-react";

async function DashboardTemplate() {
  const t = await getTranslations(
    "public.home.landlordShowcase.dashboardPreview",
  );

  return (
    <div className="my-auto h-fit overflow-hidden rounded-[18px] border border-line bg-white shadow-[0_24px_60px_-24px_rgba(14,17,22,.18)]">
      <div className="flex items-center gap-2.5 border-b border-line bg-surface px-4 py-3">
        <Menu aria-hidden="true" size={16} className="text-faint" />
        <div className="flex-1 rounded-lg border border-line bg-white px-3 py-1.5 text-xs text-faint">
          {t("searchPlaceholder")}
        </div>
        <div>
          <Image
            src="https://flagcdn.com/w320/rw.png"
            alt={t("flagAlt")}
            height={12}
            width={24}
          />
        </div>
        <div className="h-6 w-6 rounded-full bg-brand-tint" />
      </div>
      <div className="flex">
        <div className="flex w-11 flex-col items-center gap-4 border-r border-line bg-white py-3.5">
          <div className="h-4.5 w-4.5 rounded-[5px] bg-brand" />
          <div className="h-4.5 w-4.5 rounded-[5px] bg-line" />
          <div className="h-4.5 w-4.5 rounded-[5px] bg-line" />
          <div className="h-4.5 w-4.5 rounded-[5px] bg-line" />
          <div className="h-4.5 w-4.5 rounded-[5px] bg-line" />
          <div className="h-4.5 w-4.5 rounded-[5px] bg-line" />
        </div>
        <div className="flex-1 p-5">
          <h4 className="mb-4 text-sm font-bold">{t("title")}</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-[10px] border border-line px-3.5 py-3">
              <div className="mb-1.5 text-[12.5px] text-faint">
                {t("totalProperties")}
              </div>
              <div className="font-mono text-xl font-extrabold">156</div>
              <div className="mt-1 text-[12.5px] font-semibold text-success">
                {t("vsLastMonth")}
              </div>
            </div>
            <div className="rounded-[10px] border border-line px-3.5 py-3">
              <div className="mb-1.5 text-[12.5px] text-faint">
                {t("activeLandlords")}
              </div>
              <div className="font-mono text-xl font-extrabold">45</div>
              <div className="mt-1 text-[12.5px] font-semibold text-success">
                ↑ 2.1%
              </div>
            </div>
            <div className="rounded-[10px] border border-line px-3.5 py-3">
              <div className="mb-1.5 text-[12.5px] text-faint">
                {t("monthlyRevenue")}
              </div>
              <div className="font-mono text-xl font-extrabold">RWF 8.5M</div>
              <div className="mt-1 text-[12.5px] font-semibold text-success">
                ↑ 12.9%
              </div>
            </div>
            <div className="rounded-[10px] border border-line px-3.5 py-3">
              <div className="mb-1.5 text-[12.5px] text-faint">
                {t("pendingVerification")}
              </div>
              <div className="font-mono text-xl font-extrabold">7</div>
              <div className="mt-1 text-[12.5px] font-semibold text-[#DC2626]">
                ↓ 1%
              </div>
            </div>
            <div className="rounded-[10px] border border-line px-3.5 py-3">
              <div className="mb-1.5 text-[12.5px] text-faint">
                {t("rentalHistoryReports")}
              </div>
              <div className="font-mono text-xl font-extrabold">4</div>
              <div className="mt-1 text-[12.5px] font-semibold text-success">
                ↑ 0.5%
              </div>
            </div>
            <div className="rounded-[10px] border border-line px-3.5 py-3">
              <div className="mb-1.5 text-[12.5px] text-faint">
                {t("propertiesAvailable")}
              </div>
              <div className="font-mono text-xl font-extrabold">42</div>
              <div className="mt-1 text-[12.5px] font-semibold text-[#DC2626]">
                ↓ 3.1%
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardTemplate;
