"use client";

import { useTranslations } from "next-intl";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import { SettingsSection } from "./SettingsSection";
import { ProfileInfoForm } from "./ProfileInfoForm";
import { ChangePasswordForm } from "./ChangePasswordForm";
import { NotificationPreferences } from "./NotificationPreferences";

export function RenterSettingsView() {
  const t = useTranslations("renter.settings");
  const tCommon = useTranslations("common");

  return (
    <div className="min-h-0 flex-1 overflow-y-auto bg-surface/30 p-4 pb-16 sm:p-8 sm:pb-20 md:p-10 md:pb-24">
      <div className=" max-w-7xl">
        <div className="mb-8">
          <h2 className="text-xl font-bold text-ink sm:text-2xl">
            {t("title")}
          </h2>
          <p className="mt-1 text-sm text-body">{t("subtitle")}</p>
        </div>

        <div className="space-y-10">
          <SettingsSection
            title={t("sections.profileTitle")}
            description={t("sections.profileDesc")}
          >
            <ProfileInfoForm />
          </SettingsSection>

          <SettingsSection
            title={t("sections.languageTitle")}
            description={t("sections.languageDesc")}
          >
            <div className="space-y-3 border border-line bg-white p-4">
              <LanguageSwitcher variant="full" shape="square" />
              <p className="text-xs text-body">
                {tCommon("language.savedNote")}
              </p>
            </div>
          </SettingsSection>

          <SettingsSection
            title={t("sections.securityTitle")}
            description={t("sections.securityDesc")}
          >
            <ChangePasswordForm />
          </SettingsSection>

          <SettingsSection
            title={t("sections.notificationsTitle")}
            description={t("sections.notificationsDesc")}
          >
            <NotificationPreferences />
          </SettingsSection>
        </div>
      </div>
    </div>
  );
}
