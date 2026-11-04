"use client";

import { useState } from "react";
import Link from "next/link";
import toast from "react-hot-toast";
import SectionContainer from "./SectionContainer";
import { productColumn, contactInfo, legalLinks } from "@/data/footer-data";

function PhoneIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect width="20" height="16" x="2" y="4" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function CheckCircleIcon({ className = "w-4 h-4" }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="m9 12 2 2 4-4" />
    </svg>
  );
}

function FooterSection() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");

    const trimmed = email.trim();
    if (!trimmed) {
      setStatus("error");
      setErrorMessage("Please enter your email address.");
      return;
    }

    const isValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmed);
    if (!isValid) {
      setStatus("error");
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    setStatus("loading");
    setTimeout(() => {
      setStatus("success");
      setEmail("");
      toast.success("Thank you for subscribing to Urugo updates!");
    }, 600);
  };

  return (
    <footer className="w-full bg-white">
      <SectionContainer className="max-w-7xl mx-auto">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pt-16 pb-12">
          {/* Brand & Contact Block (Left: 5 cols) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* Brand Logo & Name */}
              <Link
                href="/"
                className="inline-flex items-center gap-2.5 group"
                aria-label="Urugo Home"
              >
                <span className="font-extrabold text-xl tracking-tight text-brand group-hover:text-brand-deep transition-colors">
                  URUGO
                </span>
              </Link>

              {/* Tagline / Mission */}
              <p className="mt-4 text-sm text-body leading-relaxed max-w-sm">
                Urugo empowers tenants, landlords, and property seekers across
                Rwanda with verified listings, digital leases, and automated
                payments — making renting simpler, transparent, and secure.
              </p>

              {/* Direct Contact: Phone & Email with "Contact Us" Title */}
              <div className="mt-6">
                <h3 className="font-semibold text-ink text-sm sm:text-base tracking-tight mb-3">
                  Contact Us
                </h3>
                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6">
                  <a
                    href={contactInfo.phone.href}
                    className="inline-flex items-center gap-2.5 text-sm text-body hover:text-brand transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-surface border border-line flex items-center justify-center text-body group-hover:text-brand group-hover:border-brand/40 transition-colors">
                      <PhoneIcon className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-ink group-hover:text-brand transition-colors">
                      {contactInfo.phone.display}
                    </span>
                  </a>

                  <a
                    href={contactInfo.email.href}
                    className="inline-flex items-center gap-2.5 text-sm text-body hover:text-brand transition-colors group"
                  >
                    <div className="w-8 h-8 rounded-lg bg-surface border border-line flex items-center justify-center text-body group-hover:text-brand group-hover:border-brand/40 transition-colors">
                      <MailIcon className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-ink group-hover:text-brand transition-colors">
                      {contactInfo.email.display}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Product Links (Middle: 3 cols) */}
          <div className="lg:col-span-3 flex flex-col">
            <h3 className="font-semibold text-ink text-sm sm:text-base tracking-tight mb-4">
              {productColumn.title}
            </h3>
            <ul className="space-y-3">
              {productColumn.links.map((link) => (
                <li key={link.title}>
                  <Link
                    href={link.href}
                    className="text-sm text-body hover:text-ink transition-colors duration-150 inline-block"
                  >
                    {link.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Professional Email Subscribe (Right: 4 cols) */}
          <div className="lg:col-span-4 flex flex-col">
            <h3 className="font-semibold text-ink text-sm sm:text-base tracking-tight mb-2">
              Subscribe to our newsletter
            </h3>
            <p className="text-sm text-body leading-relaxed mb-4">
              Get the latest property listings, market insights, and rental
              updates in Rwanda delivered to your inbox.
            </p>

            {status === "success" ? (
              <div className="p-4 rounded-xl bg-success-tint border border-success/30 flex items-start gap-3">
                <CheckCircleIcon className="w-5 h-5 text-success shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-medium text-success">
                    You&#39;re all set!
                  </p>
                  <p className="text-xs text-body mt-0.5">
                    Thank you for subscribing. We&#39;ll send you the best
                    rental updates.
                  </p>
                  <button
                    type="button"
                    onClick={() => setStatus("idle")}
                    className="text-xs text-brand font-medium hover:underline mt-2 inline-block cursor-pointer"
                  >
                    Subscribe another email
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubscribe} className="space-y-2">
                <div className="flex flex-col sm:flex-row gap-2">
                  <div className="relative flex-1">
                    <MailIcon className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-faint" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (status === "error") setErrorMessage("");
                      }}
                      placeholder="Enter your email"
                      className="w-full pl-10 pr-3.5 py-2.5 text-sm rounded-lg bg-surface border border-line text-ink placeholder:text-faint focus:outline-none focus:ring-2 focus:ring-brand/20 focus:border-brand transition-all"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="cursor-pointer bg-brand hover:bg-brand-deep text-white font-medium text-sm px-5 py-2.5 rounded-lg transition-colors inline-flex items-center justify-center shrink-0 shadow-xs disabled:opacity-60"
                  >
                    {status === "loading" ? "Subscribing..." : "Subscribe"}
                  </button>
                </div>

                {errorMessage && (
                  <p className="text-xs text-red-500 font-medium">
                    {errorMessage}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-line" />

        {/* Bottom Bar: Copyright (9 cols) & Legal (3 cols) */}
        <div className="py-8 grid grid-cols-1 lg:grid-cols-12 gap-4 items-center text-sm">
          <div className="lg:col-span-9">
            <p className="text-body text-sm">
              &copy; 2026 Urugo. All rights reserved.
            </p>
          </div>

          <div className="lg:col-span-3 flex items-center lg:justify-end gap-5 sm:gap-6 flex-wrap">
            {legalLinks.map((item) => (
              <Link
                key={item.title}
                href={item.href}
                className="text-sm text-body hover:text-ink underline underline-offset-4 decoration-line hover:decoration-ink transition-colors whitespace-nowrap"
              >
                {item.title}
              </Link>
            ))}
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
}

export default FooterSection;
