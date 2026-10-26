"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const fields = { landlord: ["Full name", "Email address", "Phone number"], property: ["Property name", "Landlord", "District", "Monthly rent"], administrator: ["Full name", "Email address", "Role"], notification: ["Notification title", "Audience", "Delivery channel"] };

export function AdminCreateAction({ type }: { type: keyof typeof fields }) {
  const [open, setOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const title = type === "landlord" ? "Add landlord" : type === "property" ? "Add property" : type === "administrator" ? "Add administrator" : "Create notification";
  return <>
    <Button onClick={() => { setOpen(true); setSubmitted(false); }}><Plus />{title}</Button>
    {open && <div className="fixed inset-0 z-50 grid place-items-center bg-black/30 p-4" onMouseDown={(event) => event.target === event.currentTarget && setOpen(false)}>
      <form className="w-full max-w-md space-y-5 rounded-xl border border-line bg-white p-6 shadow-xl" onSubmit={(event) => { event.preventDefault(); setSubmitted(true); }}>
        <div className="flex items-start justify-between"><div><h2 className="text-lg font-semibold text-ink">{title}</h2><p className="mt-1 text-sm text-body">Prepare a record for the admin team.</p></div><button type="button" onClick={() => setOpen(false)} aria-label="Close" className="rounded p-1 text-body hover:bg-surface"><X className="size-4" /></button></div>
        {fields[type].map((field) => <label key={field} className="block space-y-1.5 text-[13px] font-medium text-body">{field}<Input required placeholder={field} /></label>)}
        {submitted && <p className="rounded-md bg-amber-50 p-3 text-[13px] text-amber-900">Draft is ready. Connect the admin API to save this record.</p>}
        <div className="flex justify-end gap-2"><Button type="button" variant="outline" onClick={() => setOpen(false)}>Cancel</Button><Button type="submit">Prepare draft</Button></div>
      </form>
    </div>}
  </>;
}