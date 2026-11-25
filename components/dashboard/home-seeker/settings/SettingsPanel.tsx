"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { LanguageSwitcher } from "@/components/shared/LanguageSwitcher";
import {
  dataExport,
  deleteAccount,
  privacyData,
  settingsData,
} from "@/data/home-seeker-data";
import { SettingsSection } from "./SettingsSection";
import { SettingToggle } from "./SettingToggle";

export function SettingsPanel() {
  const tLang = useTranslations("common.language");
  const [settings, setSettings] = useState(
    settingsData.map(([, , value]) => value),
  );
  const [showActivity, setShowActivity] = useState<boolean>(privacyData[2]);
  const toggle = (index: number) =>
    setSettings((current) =>
      current.map((value, position) => (position === index ? !value : value)),
    );

  return (
    <div className="space-y-6">
      <SettingsSection
        title="Notification preferences"
        description="Control the updates you receive from Urugo."
      >
        {settingsData.map(([title, detail], index) => (
          <div
            key={title}
            className="flex items-center justify-between gap-5 border-t border-line py-4"
          >
            <div>
              <h3 className="text-[15px] font-semibold">{title}</h3>
              <p className="mt-1 text-[14.5px] text-faint">{detail}</p>
            </div>
            <SettingToggle
              checked={settings[index]}
              disabled={index === 1}
              onChange={() => toggle(index)}
            />
          </div>
        ))}
      </SettingsSection>
      <SettingsSection title={tLang("label")} description={tLang("savedNote")}>
        <LanguageSwitcher variant="full" shape="pill" />
      </SettingsSection>
      <SettingsSection title="Privacy">
        <div className="flex items-center justify-between gap-5 border-t border-line py-4">
          <div>
            <h3 className="text-[15px] font-semibold">{privacyData[0]}</h3>
            <p className="mt-1 text-[14.5px] text-faint">{privacyData[1]}</p>
          </div>
          <SettingToggle
            checked={showActivity}
            onChange={() => setShowActivity(!showActivity)}
          />
        </div>
        <div className="flex items-center justify-between gap-5 border-t border-line py-4">
          <div>
            <h3 className="text-[15px] font-semibold">{dataExport[0]}</h3>
            <p className="mt-1 text-[14.5px] text-faint">{dataExport[1]}</p>
          </div>
          <button className="text-[14.5px] font-semibold text-brand hover:underline">
            Export
          </button>
        </div>
      </SettingsSection>
      <SettingsSection title="Danger zone" danger>
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h3 className="text-[15px] font-semibold">{deleteAccount[0]}</h3>
            <p className="mt-1 text-[14.5px] text-faint">{deleteAccount[1]}</p>
          </div>
          <button className="duration-300 transition-all cursor-pointer border border-destructive px-4 py-2 text-[14.5px] font-semibold text-destructive hover:bg-destructive hover:text-white">
            Delete account
          </button>
        </div>
      </SettingsSection>
    </div>
  );
}
