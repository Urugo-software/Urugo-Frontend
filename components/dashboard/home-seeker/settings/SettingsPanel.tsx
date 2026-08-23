"use client";

import { useState } from "react";
import { settingsData } from "@/data/home-seeker-data";

export function SettingsPanel() {
  const [settings, setSettings] = useState(settingsData.map(([, , enabled]) => enabled));
  const toggle = (index: number) => setSettings((current) => current.map((value, position) => position === index ? !value : value));
  return <section className="overflow-hidden rounded-2xl border border-line bg-white"><div className="border-b border-line p-6"><h2 className="text-base font-bold">Notification preferences</h2><p className="mt-1 text-sm text-body">Choose the updates you want to receive.</p></div>{settingsData.map(([title, detail], index) => <label key={title} className="flex cursor-pointer items-center justify-between gap-5 border-b border-line p-6 last:border-0 hover:bg-surface"><span><span className="block text-sm font-semibold text-ink">{title}</span><span className="mt-1 block text-sm leading-5 text-body">{detail}</span></span><input checked={settings[index]} onChange={() => toggle(index)} type="checkbox" className="peer sr-only" /><span className="relative h-6 w-11 shrink-0 rounded-full bg-line transition peer-checked:bg-brand after:absolute after:left-1 after:top-1 after:size-4 after:rounded-full after:bg-white after:transition peer-checked:after:translate-x-5" /></label>)}</section>;
}