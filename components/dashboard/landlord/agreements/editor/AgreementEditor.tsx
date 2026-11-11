"use client";

import { Agreement } from "@/types/agreement.types";
import { useAgreementEditor } from "./hooks/useAgreementEditor";
import { EditorHeader } from "./EditorHeader";
import { EditorSystemMetadataCard } from "./EditorSystemMetadataCard";
import { EditorValidationAlert } from "./EditorValidationAlert";
import { EditorToolbar } from "./EditorToolbar";
import { ArticleEditorCard } from "./ArticleEditorCard";
import { EditorFooter } from "./EditorFooter";
import { AddArticleModal } from "./AddArticleModal";
import { RestoreArticlesModal } from "./RestoreArticlesModal";
import { EditorResetConfirmModal } from "./EditorResetConfirmModal";

interface Props {
  initialAgreement: Agreement;
}

export function AgreementEditor({ initialAgreement }: Props) {
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
    setIsAddModalOpen,
    setIsRestoreModalOpen,
    setIsConfirmResetOpen,
    handleToggleExpand,
    handleUpdateArticle,
    handleMoveUp,
    handleMoveDown,
    handleDeleteArticle,
    handleAddCustomArticle,
    handleRestoreStandardArticle,
    handleRestoreAll,
    handleResetEntireAgreement,
    handleLanguageToggle,
    handleSaveDraft,
    handleSendToRenter,
    handleNavigateAway,
  } = useAgreementEditor(initialAgreement);

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
            onNavigateToPreview={() =>
              handleNavigateAway(`/landlord/agreements/${agreement.id}`)
            }
            onNavigateBack={() =>
              handleNavigateAway(`/landlord/agreements/${agreement.id}`)
            }
            onSave={handleSaveDraft}
          />

          {/* 2. Compact Tenancy Details */}
          <EditorSystemMetadataCard agreement={agreement} />

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
