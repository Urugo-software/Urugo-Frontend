"use client";

import { useState } from "react";
import {
  dataExport,
  deleteAccount,
  languages,
  privacyData,
  settingsData,
} from "@/data/home-seeker-data";
import { SettingsSection } from "./SettingsSection";
import { SettingToggle } from "./SettingToggle";

export function SettingsPanel() {
  const [settings, setSettings] = useState(
    settingsData.map(([, , value]) => value),
  );
  const [language, setLanguage] = useState(languages[0]);
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
      <SettingsSection
        title="Language"
        description="Choose the language for the interface and AI Assistant."
      >
        <div className="flex flex-wrap gap-2.5">
          {languages.map((item) => (
            <button
              key={item}
              onClick={() => setLanguage(item)}
              className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${language === item ? "bg-brand text-white" : "border border-line hover:bg-surface"}`}
            >
              {item}
            </button>
          ))}
        </div>
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
