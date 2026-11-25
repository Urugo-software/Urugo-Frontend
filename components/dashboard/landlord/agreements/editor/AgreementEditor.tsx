"use client";

import { useMemo } from "react";
import { AlertTriangle, ArrowLeft, FileText, Printer, Send } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { CANONICAL_18_ARTICLES } from "@/data/agreement-templates";
import type { AppLocale } from "@/i18n/config";
import { Agreement } from "@/types/agreement.types";
import { useAgreementEditor } from "@/hooks/useAgreementEditor";
import { Button } from "@/components/ui/button";
import { EmptyStateBox } from "@/components/shared/EmptyStateBox";
import { ModalDialog } from "@/components/shared/ModalDialog";
import { AgreementDocumentView } from "@/components/dashboard/landlord/agreements/preview/AgreementDocumentView";
import { AgreementDetailsSidebar } from "@/components/dashboard/landlord/agreements/preview/AgreementDetailsSidebar";
import { EditorHeader } from "./EditorHeader";
import { EditorSystemMetadataCard } from "./EditorSystemMetadataCard";
import { EditorValidationAlert } from "./EditorValidationAlert";
import { EditorToolbar } from "./EditorToolbar";
import { ArticleEditorCard } from "./ArticleEditorCard";
import { EditorFooter } from "./EditorFooter";
import { AddArticleModal } from "./AddArticleModal";
import { RestoreArticlesModal } from "./RestoreArticlesModal";
import { EditorResetConfirmModal } from "./EditorResetConfirmModal";
import { SelectTemplateModal } from "./SelectTemplateModal";

interface Props {
  initialAgreement: Agreement;
  onEditTenancy?: () => void;
  onConfirmAgreement?: (finalAgreement: Agreement) => void;
  onSaveAgreement?: (agreement: Agreement) => void;
  onBackToTenancy?: () => void;
}

export function AgreementEditor({
  initialAgreement,
  onEditTenancy,
  onConfirmAgreement,
  onSaveAgreement,
  onBackToTenancy,
}: Props) {
  const t = useTranslations("landlord.agreements.editor");
  const tLangs = useTranslations("landlord.agreements.languageNames");
  const tCommon = useTranslations("common");
  const locale = useLocale() as AppLocale;
  const {
    agreement,
    articles,
    language,
    hasUnsavedChanges,
    expandedArticleId,
    deletedStandardDefs,
    showValidation,
    isAddModalOpen,
    isRestoreModalOpen,
    isConfirmResetOpen,
    isTemplateModalOpen,
    pendingLanguage,
    pendingNavigation,
    isPreviewMode,
    handleOpenPreview,
    handleClosePreview,
    setIsAddModalOpen,
    setIsRestoreModalOpen,
    setIsConfirmResetOpen,
    setIsTemplateModalOpen,
    cancelLanguageSwitch,
    confirmLanguageSwitch,
    cancelNavigateAway,
    confirmNavigateAway,
    handleToggleExpand,
    handleUpdateArticle,
    handleMoveUp,
    handleMoveDown,
    handleDeleteArticle,
    handleAddCustomArticle,
    handleRestoreStandardArticle,
    handleRestoreAll,
    handleResetEntireAgreement,
    handleSelectTemplate,
    handleSelectStandard,
    handleLanguageToggle,
    handleSaveDraft,
    handleSendToRenter,
    handleNavigateAway,
  } = useAgreementEditor(initialAgreement, {
    onSend: onConfirmAgreement,
    onSave: onSaveAgreement,
    onBack: onBackToTenancy,
  });

  const localizedValidation = useMemo(() => {
    const errors: string[] = [];
    const warnings: string[] = [];

    if (articles.length === 0) {
      errors.push(t("validation.atLeastOneArticle"));
    }

    articles.forEach((art) => {
      if (!art.title.trim()) {
        errors.push(t("validation.missingTitle", { number: art.number }));
      }
      if (!art.content.trim()) {
        errors.push(t("validation.emptyContent", { number: art.number }));
      }
    });

    const presentStandardNums = new Set(
      articles.map((a) => a.standardNumber).filter(Boolean),
    );
    CANONICAL_18_ARTICLES.filter((d) => d.isMandatory).forEach((def) => {
      if (!presentStandardNums.has(def.standardNumber)) {
        const title = locale === "rw" ? def.titleRw : def.titleEn;
        warnings.push(
          t("validation.recommendedClause", {
            number: def.standardNumber,
            title,
          }),
        );
      }
    });

    return { errors, warnings };
  }, [articles, locale, t]);

  const previewWorkingAgreement: Agreement = {
    ...agreement,
    articles,
    language,
  };

  const pendingLangLabel = tLangs(pendingLanguage === "rw" ? "rw" : "en");

  if (isPreviewMode) {
    return (
      <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 pb-24 sm:px-8 sm:py-8 md:px-12 md:py-10 lg:px-16 print:overflow-visible print:p-0">
          <div className="mx-auto max-w-[2500px] space-y-6 text-[12.5px] print:space-y-0">
            <div className="flex flex-col gap-4 border-b border-line pb-4 pt-1 sm:flex-row sm:items-center sm:justify-between print:hidden">
              <div className="flex flex-wrap items-center gap-2.5">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClosePreview}
                  className="inline-flex h-8.5 cursor-pointer items-center gap-1.5 rounded-none border border-line bg-white px-3 text-[12.5px] font-semibold text-ink transition-colors hover:bg-surface"
                >
                  <ArrowLeft className="size-3.5" />
                  <span>{t("backToEditor")}</span>
                </Button>
                <span className="text-faint">&middot;</span>
                <span className="text-sm font-semibold text-ink sm:text-[15px]">
                  {t("agreementPreview")}
                </span>
                <span className="font-mono text-xs text-faint">
                  ({agreement.referenceNumber})
                </span>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <div className="inline-flex items-center border border-line bg-surface p-0.5">
                  <button
                    type="button"
                    onClick={() => handleLanguageToggle("en")}
                    className={`cursor-pointer px-3 py-1 text-[12.5px] font-medium transition-colors ${
                      language === "en"
                        ? "bg-white font-semibold text-ink shadow-xs"
                        : "text-faint hover:text-ink"
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLanguageToggle("rw")}
                    className={`cursor-pointer px-3 py-1 text-[12.5px] font-medium transition-colors ${
                      language === "rw"
                        ? "bg-white font-semibold text-ink shadow-xs"
                        : "text-faint hover:text-ink"
                    }`}
                  >
                    Kinyarwanda
                  </button>
                </div>

                <Button
                  type="button"
                  variant="outline"
                  onClick={() => window.print()}
                  className="inline-flex h-8.5 cursor-pointer items-center gap-1.5 rounded-none border border-line bg-white px-3 text-[12.5px] font-medium text-ink hover:bg-surface"
                >
                  <Printer className="size-3.5 text-faint" />
                  <span>{t("printPdf")}</span>
                </Button>

                <Button
                  type="button"
                  onClick={handleSendToRenter}
                  className="inline-flex h-8.5 cursor-pointer items-center gap-1.5 rounded-none bg-ink px-4 text-[12.5px] font-semibold text-white transition-colors hover:bg-black"
                >
                  <Send className="size-3.5" />
                  <span>{t("sendToRenter")}</span>
                </Button>
              </div>
            </div>

            <div className="flex flex-col items-start gap-8 lg:flex-row print:block">
              <div className="w-full min-w-0 lg:flex-1 print:block print:w-full">
                <AgreementDocumentView
                  agreement={previewWorkingAgreement}
                  displayLanguage={language}
                  onLanguageChange={handleLanguageToggle}
                  hideToolbar
                />
              </div>

              <div className="w-full shrink-0 lg:w-80 xl:w-96 print:hidden">
                <div className="lg:sticky lg:top-4">
                  <AgreementDetailsSidebar agreement={previewWorkingAgreement} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full min-h-0 min-w-0 flex-1 flex-col overflow-hidden bg-white">
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 pb-24 sm:px-8 sm:py-8 md:px-12 md:py-10 lg:px-16">
        <div className="mx-auto max-w-[2500px] space-y-5 text-[12.5px]">
          <EditorHeader
            referenceNumber={agreement.referenceNumber}
            hasUnsavedChanges={hasUnsavedChanges}
            language={language}
            onLanguageToggle={handleLanguageToggle}
            onNavigateToPreview={handleOpenPreview}
            onNavigateBack={() =>
              handleNavigateAway(
                `/landlord/agreements/${agreement.id}`,
                Boolean(onBackToTenancy),
              )
            }
            onSave={handleSaveDraft}
            backButtonLabel={
              onBackToTenancy
                ? t("backToLanguageSelection")
                : t("backToAgreement")
            }
          />

          <EditorSystemMetadataCard
            agreement={agreement}
            onEditTenancy={onEditTenancy}
          />

          {agreement.status === "Changes Requested" &&
            agreement.changeRequests &&
            agreement.changeRequests.length > 0 && (
              <div className="space-y-2 border border-amber-300 bg-amber-50/60 p-4 text-[12.5px]">
                <div className="flex items-center gap-2 font-semibold text-amber-950">
                  <AlertTriangle className="size-4 shrink-0 text-amber-700" />
                  <span>
                    {t("changeRequestSummary", {
                      count: agreement.changeRequests.length,
                    })}
                  </span>
                </div>
                <ul className="space-y-1.5 pl-6 text-amber-950/90">
                  {agreement.changeRequests.map((cr) => (
                    <li key={cr.id} className="list-disc">
                      <strong>
                        {t("articleRef", {
                          number: cr.articleNumber,
                          title: cr.articleTitle,
                        })}
                      </strong>{" "}
                      {cr.requestedChange}
                    </li>
                  ))}
                </ul>
              </div>
            )}

          <EditorValidationAlert
            errors={showValidation ? localizedValidation.errors : []}
            warnings={localizedValidation.warnings}
          />

          <EditorToolbar
            totalArticles={articles.length}
            omittedCount={deletedStandardDefs.length}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onOpenRestoreModal={() => setIsRestoreModalOpen(true)}
            onOpenResetConfirm={() => setIsConfirmResetOpen(true)}
            onOpenTemplateModal={() => setIsTemplateModalOpen(true)}
          />

          {articles.length === 0 ? (
            <EmptyStateBox
              icon={FileText}
              title={t("emptyArticlesTitle")}
              description={t("emptyArticlesDescription")}
              action={
                <div className="flex flex-wrap justify-center gap-2">
                  <Button
                    type="button"
                    onClick={handleSelectStandard}
                    className="h-9 cursor-pointer rounded-none bg-ink px-4 text-xs font-semibold text-white hover:bg-black"
                  >
                    {t("loadStandardClauses")}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddModalOpen(true)}
                    className="h-9 cursor-pointer rounded-none border-line px-4 text-xs"
                  >
                    {t("addCustomArticle")}
                  </Button>
                </div>
              }
            />
          ) : (
            <div className="space-y-2">
              {articles.map((art, index) => (
                <ArticleEditorCard
                  key={art.id}
                  article={art}
                  index={index}
                  totalArticles={articles.length}
                  isExpanded={expandedArticleId === art.id}
                  onToggleExpand={() => handleToggleExpand(art.id)}
                  onUpdate={handleUpdateArticle}
                  onMoveUp={handleMoveUp}
                  onMoveDown={handleMoveDown}
                  onDelete={handleDeleteArticle}
                  language={language}
                />
              ))}
            </div>
          )}

          <AddArticleModal
            isOpen={isAddModalOpen}
            totalArticles={articles.length}
            onClose={() => setIsAddModalOpen(false)}
            onAdd={handleAddCustomArticle}
          />

          <RestoreArticlesModal
            isOpen={isRestoreModalOpen}
            deletedArticles={deletedStandardDefs}
            language={language}
            onClose={() => setIsRestoreModalOpen(false)}
            onRestore={handleRestoreStandardArticle}
            onRestoreAll={handleRestoreAll}
          />

          <EditorResetConfirmModal
            isOpen={isConfirmResetOpen}
            language={language}
            onClose={() => setIsConfirmResetOpen(false)}
            onConfirm={handleResetEntireAgreement}
          />

          <SelectTemplateModal
            isOpen={isTemplateModalOpen}
            language={language}
            onClose={() => setIsTemplateModalOpen(false)}
            onSelectTemplate={handleSelectTemplate}
            onSelectStandard={handleSelectStandard}
          />

          <ModalDialog
            open={pendingLanguage !== null}
            onClose={cancelLanguageSwitch}
            variant="alert"
            maxWidthClassName="max-w-md"
            title={t("switchLanguageModal.title")}
            description={t("switchLanguageModal.description")}
            footer={
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={cancelLanguageSwitch}
                  className="h-8.5 cursor-pointer rounded-none border-line px-4 text-xs"
                >
                  {tCommon("actions.cancel")}
                </Button>
                <Button
                  type="button"
                  onClick={confirmLanguageSwitch}
                  className="h-8.5 cursor-pointer rounded-none bg-ink px-4 text-xs font-semibold text-white hover:bg-black"
                >
                  {t("switchLanguageModal.confirm", {
                    language: pendingLangLabel,
                  })}
                </Button>
              </>
            }
          >
            <p className="text-xs leading-relaxed text-body">
              {t.rich("switchLanguageModal.body", {
                language: pendingLangLabel,
                strong: (chunks) => <strong>{chunks}</strong>,
              })}
            </p>
          </ModalDialog>

          <ModalDialog
            open={pendingNavigation !== null}
            onClose={cancelNavigateAway}
            variant="alert"
            maxWidthClassName="max-w-md"
            title={t("unsavedModal.title")}
            description={t("unsavedModal.description")}
            footer={
              <>
                <Button
                  type="button"
                  variant="outline"
                  onClick={cancelNavigateAway}
                  className="h-8.5 cursor-pointer rounded-none border-line px-4 text-xs"
                >
                  {t("unsavedModal.stay")}
                </Button>
                <Button
                  type="button"
                  onClick={confirmNavigateAway}
                  className="h-8.5 cursor-pointer rounded-none bg-red-600 px-4 text-xs font-semibold text-white hover:bg-red-700"
                >
                  {t("unsavedModal.discard")}
                </Button>
              </>
            }
          >
            <p className="text-xs leading-relaxed text-body">
              {t("unsavedModal.body")}
            </p>
          </ModalDialog>
        </div>
      </div>

      <EditorFooter
        onSave={handleSaveDraft}
        onSendToRenter={handleSendToRenter}
      />
    </div>
  );
}
