"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Plus, Trash2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAdminWorkspace } from "@/store/admin-workspace.store";
import type { PublicFaqItem } from "@/types/admin";
import { createSafeId } from "@/utils/format";
import { AdminShellSection } from "../shared/AdminShellSection";

interface PublicSettingsForm {
  enabled: boolean;
  title: string;
  message: string;
  ctaLabel: string;
  ctaHref: string;
  supportPhone: string;
  supportEmail: string;
  reason: string;
}

interface NewFaqForm {
  audience: PublicFaqItem["audience"];
  question: string;
  answer: string;
}

export function AdminPublicContentView() {
  const t = useTranslations("admin.publicContent");
  const tActions = useTranslations("common.actions");
  const publicContent = useAdminWorkspace((s) => s.publicContent);
  const properties = useAdminWorkspace((s) => s.properties);
  const updatePublicContent = useAdminWorkspace((s) => s.updatePublicContent);
  const [featuredIds, setFeaturedIds] = useState<string[]>(
    publicContent.featuredPropertyIds,
  );
  const [faqs, setFaqs] = useState<PublicFaqItem[]>(publicContent.faqs);
  const [faqModalOpen, setFaqModalOpen] = useState(false);

  const verifiedProperties = properties.filter(
    (p) => p.verification === "Verified" && !p.isSuspended,
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PublicSettingsForm>({
    defaultValues: {
      enabled: publicContent.announcement.enabled,
      title: publicContent.announcement.title,
      message: publicContent.announcement.message,
      ctaLabel: publicContent.announcement.ctaLabel,
      ctaHref: publicContent.announcement.ctaHref,
      supportPhone: publicContent.supportPhone,
      supportEmail: publicContent.supportEmail,
      reason: "",
    },
  });

  const faqForm = useForm<NewFaqForm>({
    defaultValues: { audience: "Home Seeker", question: "", answer: "" },
  });

  const toggleFeatured = (id: string) => {
    setFeaturedIds((curr) =>
      curr.includes(id) ? curr.filter((x) => x !== id) : [...curr, id],
    );
  };

  const onSaveAll = (values: PublicSettingsForm) => {
    updatePublicContent(
      {
        announcement: {
          enabled: values.enabled,
          title: values.title,
          message: values.message,
          ctaLabel: values.ctaLabel,
          ctaHref: values.ctaHref,
        },
        featuredPropertyIds: featuredIds,
        faqs,
        supportPhone: values.supportPhone,
        supportEmail: values.supportEmail,
      },
      values.reason,
    );
    toast.success(t("savedToast"));
  };

  return (
    <AdminShellSection title={t("title")} description={t("description")}>
      <form onSubmit={handleSubmit(onSaveAll)} className="space-y-6">
        <section className="space-y-4 border border-line bg-white p-5 shadow-2xs">
          <div className="flex items-center justify-between gap-3 border-b border-line pb-3">
            <div>
              <h3 className="text-sm font-bold text-ink">
                {t("announcementTitle")}
              </h3>
              <p className="text-xs text-body">{t("announcementDesc")}</p>
            </div>
            <label className="flex cursor-pointer items-center gap-2 text-xs font-semibold text-ink">
              <input
                type="checkbox"
                {...register("enabled")}
                className="size-4 accent-brand-blue"
              />
              {t("enableBanner")}
            </label>
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-ink">
                {t("bannerTitleLabel")}
              </label>
              <Input
                {...register("title", { required: true })}
                className="mt-1 h-10 rounded-none border-line bg-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink">
                {t("bannerLinkLabel")}
              </label>
              <Input
                {...register("ctaHref")}
                className="mt-1 h-10 rounded-none border-line bg-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink">
              {t("bannerMessageLabel")}
            </label>
            <Input
              {...register("message", { required: true })}
              className="mt-1 h-10 rounded-none border-line bg-white text-sm"
            />
          </div>
        </section>

        <section className="space-y-4 border border-line bg-white p-5 shadow-2xs">
          <div className="border-b border-line pb-3">
            <h3 className="text-sm font-bold text-ink">{t("featuredTitle")}</h3>
            <p className="text-xs text-body">{t("featuredDesc")}</p>
          </div>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {verifiedProperties.map((prop) => {
              const checked = featuredIds.includes(prop.id);
              return (
                <label
                  key={prop.id}
                  className="flex cursor-pointer items-start gap-2.5 border border-line p-3 text-sm hover:bg-surface/50"
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => toggleFeatured(prop.id)}
                    className="mt-0.5 size-4 accent-brand-blue"
                  />
                  <div>
                    <p className="font-semibold text-ink">{prop.title}</p>
                    <p className="text-xs text-body">{prop.location}</p>
                  </div>
                </label>
              );
            })}
          </div>
        </section>

        <section className="space-y-4 border border-line bg-white p-5 shadow-2xs">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-3">
            <div>
              <h3 className="text-sm font-bold text-ink">{t("faqsTitle")}</h3>
              <p className="text-xs text-body">{t("faqsDesc")}</p>
            </div>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                faqForm.reset({
                  audience: "Home Seeker",
                  question: "",
                  answer: "",
                });
                setFaqModalOpen(true);
              }}
              className="h-9 rounded-none border-line px-3 text-xs font-semibold"
            >
              <Plus aria-hidden="true" className="mr-1 size-3.5" />
              {t("addFaq")}
            </Button>
          </div>

          <div className="divide-y divide-line">
            {faqs.map((faq) => (
              <div
                key={faq.id}
                className="flex items-start justify-between gap-4 py-3"
              >
                <div className="space-y-1">
                  <span className="text-xs font-bold uppercase tracking-wider text-brand-blue">
                    {faq.audience}
                  </span>
                  <p className="text-sm font-semibold text-ink">
                    {faq.question}
                  </p>
                  <p className="text-xs text-body">{faq.answer}</p>
                </div>
                <button
                  type="button"
                  aria-label={tActions("remove")}
                  onClick={() =>
                    setFaqs((curr) => curr.filter((f) => f.id !== faq.id))
                  }
                  className="cursor-pointer p-1.5 text-faint hover:text-rose-700"
                >
                  <Trash2 aria-hidden="true" className="size-4" />
                </button>
              </div>
            ))}
          </div>
        </section>

        <section className="space-y-4 border border-line bg-white p-5 shadow-2xs">
          <div className="grid gap-4 sm:grid-cols-2">
            <div>
              <label className="block text-xs font-semibold text-ink">
                {t("supportPhoneLabel")}
              </label>
              <Input
                {...register("supportPhone", { required: true })}
                className="mt-1 h-10 rounded-none border-line bg-white text-sm"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-ink">
                {t("supportEmailLabel")}
              </label>
              <Input
                type="email"
                {...register("supportEmail", { required: true })}
                className="mt-1 h-10 rounded-none border-line bg-white text-sm"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-ink">
              {t("changeReasonLabel")} *
            </label>
            <Input
              placeholder={t("changeReasonPlaceholder")}
              {...register("reason", {
                required: t("reasonRequired"),
                minLength: { value: 5, message: t("reasonRequired") },
              })}
              className="mt-1 h-10 rounded-none border-line bg-white text-sm"
            />
            {errors.reason && (
              <p className="mt-1 text-xs text-rose-700">
                {errors.reason.message}
              </p>
            )}
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="h-10 rounded-none bg-ink px-5 text-xs font-semibold text-white"
            >
              {tActions("saveChanges")}
            </Button>
          </div>
        </section>
      </form>

      <ModalDialog
        open={faqModalOpen}
        onClose={() => setFaqModalOpen(false)}
        title={t("addFaq")}
        footer={
          <>
            <Button
              type="button"
              variant="outline"
              onClick={() => setFaqModalOpen(false)}
              className="h-9 rounded-none border-line text-xs font-semibold"
            >
              {tActions("cancel")}
            </Button>
            <Button
              type="submit"
              form="add-faq-form"
              className="h-9 rounded-none bg-ink px-4 text-xs font-semibold text-white"
            >
              {tActions("add")}
            </Button>
          </>
        }
      >
        <form
          id="add-faq-form"
          onSubmit={faqForm.handleSubmit((values) => {
            setFaqs((curr) => [
              ...curr,
              { id: createSafeId("faq"), ...values },
            ]);
            setFaqModalOpen(false);
          })}
          className="space-y-3"
        >
          <div>
            <label className="block text-xs font-semibold text-ink">
              {t("audienceLabel")}
            </label>
            <select
              {...faqForm.register("audience")}
              className="mt-1 h-10 w-full rounded-none border border-line bg-white px-3 text-sm"
            >
              <option value="Home Seeker">Home Seeker</option>
              <option value="Landlord">Landlord</option>
              <option value="Renter">Renter</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink">
              {t("questionLabel")} *
            </label>
            <Input
              {...faqForm.register("question", { required: true })}
              className="mt-1 h-10 rounded-none border-line bg-white text-sm"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-ink">
              {t("answerLabel")} *
            </label>
            <textarea
              rows={3}
              {...faqForm.register("answer", { required: true })}
              className="mt-1 w-full rounded-none border border-line bg-white p-2.5 text-sm"
            />
          </div>
        </form>
      </ModalDialog>
    </AdminShellSection>
  );
}
