"use client";

import { useState } from "react";
import Image from "next/image";

const initial = { name: "", phone: "", email: "" };
const fields = {
  name: ["Full name", "Enter your full name"],
  phone: ["Phone number", "Enter your phone number"],
  email: ["Email address", "Enter your email address"],
} as const;

export function ProfileForm() {
  const [values, setValues] = useState(initial);
  const changed = JSON.stringify(values) !== JSON.stringify(initial);
  return (
    <section className="mb-6  border border-line p-6">
      <div className="mb-6 flex items-center gap-4">
        <Image
          src="/assets/people/GR.jpg"
          alt="User avatar"
          width={64}
          height={64}
          className="rounded-full"
        />
        <div>
          <h2 className="text-base font-extrabold">Yves Kamanzi</h2>
          <p className="text-sm text-faint">Guest account</p>
        </div>
      </div>
      <div className="grid gap-5 sm:grid-cols-2">
        {Object.entries(values).map(([key, value]) => {
          const [label, placeholder] = fields[key as keyof typeof fields];
          return (
            <label key={key} className={key === "email" ? "sm:col-span-2" : ""}>
              <span className="mb-2 block text-sm font-bold">{label}</span>
              <input
                type={key === "email" ? "email" : "text"}
                value={value}
                placeholder={placeholder}
                onChange={(event) =>
                  setValues({ ...values, [key]: event.target.value })
                }
                className="w-full  border border-line px-3.5 py-2.5 text-sm outline-none transition placeholder:text-faint focus:border-brand focus:ring-2 focus:ring-brand/15"
              />
            </label>
          );
        })}
      </div>
      <div className="mt-6 flex justify-end gap-2">
        <button
          onClick={() => setValues(initial)}
          disabled={!changed}
          className={`border border-line px-4 py-2 text-sm font-semibold text-body disabled:opacity-50  cursor-pointer disabled:cursor-not-allowed`}
        >
          Cancel
        </button>
        <button
          disabled={!changed}
          className={`bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-deep disabled:cursor-not-allowed disabled:opacity-50`}
        >
          Save changes
        </button>
      </div>
    </section>
  );
}
