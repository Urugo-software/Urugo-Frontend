"use client";

import { ArrowLeft, Printer, Send } from "lucide-react";
import { Agreement } from "@/types/agreement.types";
import { useAgreementEditor } from "@/hooks/useAgreementEditor";
import { Button } from "@/components/ui/button";
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
  const {
    agreement,
    articles,
    language,
    hasUnsavedChanges,
    expandedArticleId,
    deletedStandardDefs,
    validation,
    showValidation,
    isAddModalOpen,
    isRestoreModalOpen,
    isConfirmResetOpen,
    isTemplateModalOpen,
    isPreviewMode,
    handleOpenPreview,
    handleClosePreview,
    setIsAddModalOpen,
    setIsRestoreModalOpen,
    setIsConfirmResetOpen,
    setIsTemplateModalOpen,
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

  const previewWorkingAgreement: Agreement = {
    ...agreement,
    articles,
    language,
  };

  if (isPreviewMode) {
    return (
      <main className="flex flex-1 flex-col min-h-0 min-w-0 overflow-hidden bg-white h-full">
        <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10 lg:px-16 pb-24 print:p-0 print:overflow-visible">
          <div className="max-w-[2500px] mx-auto space-y-6 text-[12.5px] print:space-y-0">
            {/* Top Bar: Back to Editor & Actions */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 border-b border-line pb-4 pt-1 print:hidden">
              <div className="flex items-center gap-3">
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleClosePreview}
                  className="inline-flex h-8.5 cursor-pointer items-center gap-1.5 border border-line bg-white px-3 text-[12.5px] font-semibold text-ink hover:bg-surface transition-colors"
                >
                  <ArrowLeft className="size-3.5" />
                  <span>Back to Editor</span>
                </Button>
                <span className="text-faint">&middot;</span>
                <span className="font-semibold text-ink text-sm sm:text-[15px]">
                  Agreement Preview
                </span>
                <span className="font-mono text-faint text-xs">
                  ({agreement.referenceNumber})
                </span>
                <span className="inline-flex items-center border border-line bg-surface px-2 py-0.5 text-[11px] font-medium text-ink">
                  {language === "rw" ? "Kinyarwanda" : "English"}
                </span>
              </div>

              {/* Right Controls */}
              <div className="flex flex-wrap items-center gap-2">
                {/* Language Switcher */}
                <div className="inline-flex items-center border border-line bg-surface p-0.5">
                  <button
                    type="button"
                    onClick={() => handleLanguageToggle("en")}
                    className={`px-3 py-1 text-[12.5px] font-medium transition-colors cursor-pointer ${
                      language === "en"
                        ? "bg-white text-ink shadow-xs font-semibold"
                        : "text-faint hover:text-ink"
                    }`}
                  >
                    English
                  </button>
                  <button
                    type="button"
                    onClick={() => handleLanguageToggle("rw")}
                    className={`px-3 py-1 text-[12.5px] font-medium transition-colors cursor-pointer ${
                      language === "rw"
                        ? "bg-white text-ink shadow-xs font-semibold"
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
                  className="inline-flex h-8.5 cursor-pointer items-center gap-1.5 border border-line bg-white px-3 text-[12.5px] font-medium text-ink hover:bg-surface"
                >
                  <Printer className="size-3.5 text-faint" />
                  <span>Print / PDF</span>
                </Button>

                <Button
                  type="button"
                  onClick={handleSendToRenter}
                  className="inline-flex h-8.5 cursor-pointer items-center gap-1.5 rounded-none bg-ink px-4 text-[12.5px] font-semibold text-white hover:bg-black transition-colors"
                >
                  <Send className="size-3.5" />
                  <span>Send to Renter</span>
                </Button>
              </div>
            </div>

            {/* Document and Sidebar Layout */}
            <div className="flex flex-col lg:flex-row items-start gap-8 print:block">
              <div className="w-full lg:flex-1 min-w-0 print:block print:w-full">
                <AgreementDocumentView
                  agreement={previewWorkingAgreement}
                  displayLanguage={language}
                  onLanguageChange={handleLanguageToggle}
                />
              </div>

              <div className="w-full lg:w-80 xl:w-96 shrink-0 print:hidden">
                <div className="lg:sticky lg:top-4">
                  <AgreementDetailsSidebar
                    agreement={previewWorkingAgreement}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="flex flex-1 flex-col min-h-0 min-w-0 overflow-hidden bg-white h-full">
      {/* Scrollable Container with Comfortable Left/Right Paddings */}
      <div className="min-h-0 flex-1 overflow-y-auto px-4 py-6 sm:px-8 sm:py-8 md:px-12 md:py-10 lg:px-16 pb-24">
        <div className="max-w-[2500px] mx-auto space-y-5 text-[12.5px]">
          {/* 1. Compact Page Header */}
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
              onBackToTenancy ? "Back to Language Selection" : "Back to Agreement"
            }
          />

          {/* 2. Compact Tenancy Details */}
          <EditorSystemMetadataCard
            agreement={agreement}
            onEditTenancy={onEditTenancy}
          />

          {/* 3. Validation Alert */}
          {showValidation && (
            <EditorValidationAlert errors={validation.errors} />
          )}

          {/* 4. Clause Management Toolbar */}
          <EditorToolbar
            totalArticles={articles.length}
            omittedCount={deletedStandardDefs.length}
            onOpenAddModal={() => setIsAddModalOpen(true)}
            onOpenRestoreModal={() => setIsRestoreModalOpen(true)}
            onOpenResetConfirm={() => setIsConfirmResetOpen(true)}
            onOpenTemplateModal={() => setIsTemplateModalOpen(true)}
          />

          {/* 5. Collapsible Accordion Articles List */}
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

          {/* Modals */}
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
        </div>
      </div>
     
        {/* Compact Footer Action Bar */}
        <EditorFooter
          onSave={handleSaveDraft}
          onSendToRenter={handleSendToRenter}
        />
      
    </main>
  );
}
