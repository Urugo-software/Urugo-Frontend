"use client";

import { useState } from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { CheckCircle2, Mail, Phone } from "lucide-react";

import { contactInfo, legalLinks, productColumn } from "@/data/footer-data";
import { subscribeToNewsletter } from "@/services/public-interactions.service";
import SectionContainer from "./SectionContainer";

interface NewsletterValues {
  email: string;
}

function FooterSection() {
  const t = useTranslations("public.footer");
  const tNav = useTranslations("public.nav");
  const tActions = useTranslations("common.actions");
  const [subscribed, setSubscribed] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterValues>({
    defaultValues: { email: "" },
  });

  const onSubscribe = async (values: NewsletterValues) => {
    try {
      await subscribeToNewsletter(values.email);
      setSubscribed(true);
      reset();
      toast.success(t("subscribedToast"));
    } catch (err) {
      toast.error(
        err instanceof Error ? err.message : "Failed to subscribe",
      );
    }
  };

  const resolveProductLinkLabel = (href: string, fallback: string) => {
    switch (href) {
      case "/properties":
        return tNav("properties");
      case "/features":
        return tNav("features");
      case "/how-it-works":
        return tNav("howItWorks");
      case "/auth/sign-in":
        return tActions("signIn");
      default:
        return fallback;
    }
  };

  const resolveLegalLinkLabel = (href: string, fallback: string) => {
    if (href === "/privacy") return t("privacyPolicy");
    if (href === "/terms") return t("termsOfService");
    return fallback;
  };

  return (
    <footer className="w-full border-t border-line bg-white">
      <SectionContainer className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-12 pb-12 pt-14 md:grid-cols-2 lg:grid-cols-12 lg:gap-8">
          {/* Brand & Contact */}
          <div className="flex flex-col justify-between lg:col-span-5">
            <div>
              <Link
                href="/"
                className="group inline-flex items-center gap-2.5"
                aria-label={tNav("logoAria")}
              >
                <span className="text-xl font-extrabold tracking-tight text-brand transition-colors group-hover:text-brand-deep">
                  URUGO
                </span>
              </Link>

              <p className="mt-4 max-w-sm text-sm leading-relaxed text-body">
                {t("description")}
              </p>

              <div className="mt-6">
                <h3 className="mb-3 text-sm font-semibold tracking-tight text-ink sm:text-base">
                  {t("contactUs")}
                </h3>
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-6">
                  <a
                    href={contactInfo.phone.href}
                    className="group inline-flex items-center gap-2.5 text-sm text-body transition-colors hover:text-brand"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-body transition-colors group-hover:border-brand/40 group-hover:text-brand">
                      <Phone aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <span className="font-medium text-ink transition-colors group-hover:text-brand">
                      {contactInfo.phone.display}
                    </span>
                  </a>

                  <a
                    href={contactInfo.email.href}
                    className="group inline-flex items-center gap-2.5 text-sm text-body transition-colors hover:text-brand"
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface text-body transition-colors group-hover:border-brand/40 group-hover:text-brand">
                      <Mail aria-hidden="true" className="h-4 w-4" />
                    </span>
                    <span className="font-medium text-ink transition-colors group-hover:text-brand">
                      {contactInfo.email.display}
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Product Links */}
          <div className="flex flex-col lg:col-span-3">
            <h3 className="mb-4 text-sm font-semibold tracking-tight text-ink sm:text-base">
              {t("productTitle")}
            </h3>
            <ul className="space-y-3">
              {productColumn.links.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="inline-block text-sm text-body transition-colors duration-150 hover:text-ink hover:underline"
                  >
                    {resolveProductLinkLabel(link.href, link.title)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter (React Hook Form) */}
          <div className="flex flex-col lg:col-span-4">
            <h3 className="mb-2 text-sm font-semibold tracking-tight text-ink sm:text-base">
              {t("stayUpdated")}
            </h3>
            <p className="mb-4 text-sm leading-relaxed text-body">
              {t("newsletterDescription")}
            </p>

            {subscribed ? (
              <div
                role="status"
                className="flex items-start gap-3 rounded-xl border border-success/30 bg-success-tint p-4"
              >
                <CheckCircle2
                  aria-hidden="true"
                  className="mt-0.5 h-5 w-5 shrink-0 text-success"
                />
                <div>
                  <p className="text-sm font-medium text-success">
                    {t("subscribedTitle")}
                  </p>
                  <p className="mt-0.5 text-xs text-body">
                    {t("subscribedBody")}
                  </p>
                  <button
                    type="button"
                    onClick={() => setSubscribed(false)}
                    className="mt-2 inline-block cursor-pointer text-xs font-medium text-brand hover:underline"
                  >
                    {t("enterAnotherEmail")}
                  </button>
                </div>
              </div>
            ) : (
              <form
                noValidate
                onSubmit={handleSubmit(onSubscribe)}
                className="space-y-2"
              >
                <div className="flex flex-col gap-2 sm:flex-row">
                  <div className="relative flex-1">
                    <label htmlFor="footer-newsletter-email" className="sr-only">
                      {t("emailLabel")}
                    </label>
                    <Mail
                      aria-hidden="true"
                      className="pointer-events-none absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-faint"
                    />
                    <input
                      id="footer-newsletter-email"
                      type="email"
                      autoComplete="email"
                      placeholder={t("emailPlaceholder")}
                      aria-invalid={Boolean(errors.email)}
                      className="w-full rounded-lg border border-line bg-surface py-2.5 pl-10 pr-3.5 text-sm text-ink placeholder:text-faint transition-all focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20"
                      {...register("email", {
                        required: t("emailRequired"),
                        pattern: {
                          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                          message: t("emailInvalid"),
                        },
                      })}
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="inline-flex shrink-0 cursor-pointer items-center justify-center rounded-lg bg-brand px-5 py-2.5 text-sm font-medium text-white shadow-xs transition-colors hover:bg-brand-deep disabled:opacity-60"
                  >
                    {t("subscribe")}
                  </button>
                </div>

                {errors.email && (
                  <p role="alert" className="text-xs font-medium text-red-600">
                    {errors.email.message}
                  </p>
                )}
              </form>
            )}
          </div>
        </div>

        <div className="border-t border-line" />

        <div className="grid grid-cols-1 items-center gap-4 py-8 text-sm lg:grid-cols-12">
          <div className="lg:col-span-9">
            <p className="text-sm text-body">
              {t("copyright", { year: new Date().getFullYear() })}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-5 sm:gap-6 lg:col-span-3 lg:justify-end">
            {legalLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="whitespace-nowrap text-sm text-body underline decoration-line underline-offset-4 transition-colors hover:text-ink hover:decoration-ink"
              >
                {resolveLegalLinkLabel(item.href, item.title)}
              </Link>
            ))}
          </div>
        </div>
      </SectionContainer>
    </footer>
  );
}

export default FooterSection;
