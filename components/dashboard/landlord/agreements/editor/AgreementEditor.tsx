"use client";

import { useState, useMemo, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Send,
  Eye,
  Plus,
  RotateCcw,
  AlertTriangle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import {
  Agreement,
  AgreementArticle,
  AgreementLanguage,
} from "@/types/agreement.types";
import {
  moveArticleUp,
  moveArticleDown,
  updateArticle,
  deleteArticle,
  restoreStandardArticle,
  resetAllToStandardArticles,
  getDeletedStandardArticles,
  validateArticles,
} from "@/utils/agreement-utils";
import { CANONICAL_18_ARTICLES } from "@/data/agreement-templates";
import { ArticleEditorCard } from "./ArticleEditorCard";
import { AddArticleModal } from "./AddArticleModal";
import { RestoreArticlesModal } from "./RestoreArticlesModal";
import { EditorSystemMetadataCard } from "./EditorSystemMetadataCard";

interface Props {
  initialAgreement: Agreement;
}

export function AgreementEditor({ initialAgreement }: Props) {
  const router = useRouter();
  const [agreement, setAgreement] = useState<Agreement>(initialAgreement);
  const [articles, setArticles] = useState<AgreementArticle[]>(
    initialAgreement.articles,
  );
  const [language, setLanguage] = useState<AgreementLanguage>(
    initialAgreement.language,
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Accordion state: first article expanded by default, only one expanded at a time
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(
    initialAgreement.articles[0]?.id ?? null,
  );

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);

  // Validation state (only evaluated when saving or if user has invalid inputs)
  const [showValidation, setShowValidation] = useState(false);

  // Deleted standard articles
  const deletedStandardDefs = useMemo(
    () => getDeletedStandardArticles(articles),
    [articles],
  );

  // Validation
  const validation = useMemo(() => validateArticles(articles), [articles]);

  // Warn about unsaved changes on browser navigation
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Accordion toggle: single article expanded at a time
  const handleToggleExpand = (id: string) => {
    setExpandedArticleId((prev) => (prev === id ? null : id));
  };

  // Article handlers
  const handleUpdateArticle = (
    id: string,
    updates: Partial<AgreementArticle>,
  ) => {
    setArticles((prev) => updateArticle(prev, id, updates));
    setHasUnsavedChanges(true);
  };

  const handleMoveUp = (index: number) => {
    setArticles((prev) => moveArticleUp(prev, index));
    setHasUnsavedChanges(true);
  };

  const handleMoveDown = (index: number) => {
    setArticles((prev) => moveArticleDown(prev, index));
    setHasUnsavedChanges(true);
  };

  const handleDeleteArticle = (id: string) => {
    const art = articles.find((a) => a.id === id);
    if (!art) return;

    if (art.isStandard) {
      toast(
        `Standard Article ${art.number} removed. You can restore it from "Restore Omitted Clauses".`,
        { icon: "ℹ️" },
      );
    } else {
      toast.success(`Custom Article ${art.number} deleted.`);
    }

    setArticles((prev) => deleteArticle(prev, id));
    setHasUnsavedChanges(true);
  };

  const handleAddCustomArticle = (
    title: string,
    content: string,
    insertIndex: number,
  ) => {
    const newArticle: AgreementArticle = {
      id: `art-custom-${Date.now()}`,
      number: insertIndex + 1,
      title,
      content,
      isStandard: false,
      isCustom: true,
    };

    const copy = [...articles];
    copy.splice(insertIndex, 0, newArticle);

    // Renumber
    const renumbered = copy.map((a, idx) => ({ ...a, number: idx + 1 }));
    setArticles(renumbered);
    setExpandedArticleId(newArticle.id);
    setHasUnsavedChanges(true);
    toast.success(`Custom article "${title}" added.`);
  };

  const handleRestoreStandardArticle = (standardNumber: number) => {
    setArticles((prev) =>
      restoreStandardArticle(prev, standardNumber, language),
    );
    setHasUnsavedChanges(true);
    toast.success(`Standard Article #${standardNumber} restored.`);
  };

  const handleRestoreAll = () => {
    let current = [...articles];
    deletedStandardDefs.forEach((def) => {
      current = restoreStandardArticle(current, def.standardNumber, language);
    });
    setArticles(current);
    setHasUnsavedChanges(true);
    toast.success("All standard clauses restored.");
    setIsRestoreModalOpen(false);
  };

  const handleResetEntireAgreement = () => {
    const defaults = resetAllToStandardArticles(language);
    setArticles(defaults);
    setExpandedArticleId(defaults[0]?.id ?? null);
    setHasUnsavedChanges(true);
    setIsConfirmResetOpen(false);
    toast.success("Agreement reset to canonical 18 standard clauses.");
  };

  const handleLanguageToggle = (newLang: AgreementLanguage) => {
    if (newLang === language) return;

    if (
      hasUnsavedChanges &&
      !window.confirm(
        "Switching language will translate standard clauses to the chosen language while preserving custom clauses. Continue?",
      )
    ) {
      return;
    }

    setLanguage(newLang);
    setArticles((prev) =>
      prev.map((art) => {
        if (!art.isStandard || !art.standardNumber) return art;
        const def = CANONICAL_18_ARTICLES.find(
          (d) => d.standardNumber === art.standardNumber,
        );
        if (!def) return art;
        return {
          ...art,
          title: newLang === "rw" ? def.titleRw : def.titleEn,
          content: newLang === "rw" ? def.contentRw : def.contentEn,
        };
      }),
    );
    setHasUnsavedChanges(true);
    toast.success(
      `Language switched to ${newLang === "rw" ? "Kinyarwanda" : "English"}.`,
    );
  };

  const handleSaveDraft = () => {
    if (!validation.isValid) {
      setShowValidation(true);
      toast.error("Please fill in required article headings and content.");
      return;
    }

    setAgreement((prev) => ({
      ...prev,
      articles,
      language,
      status: prev.status === "Changes Requested" ? "Draft" : prev.status,
      updatedAt: new Date().toISOString(),
    }));
    setHasUnsavedChanges(false);
    setShowValidation(false);
    toast.success("Changes saved.");
  };

  const handleSendToRenter = () => {
    if (!validation.isValid) {
      setShowValidation(true);
      toast.error("Please resolve validation errors before sending.");
      return;
    }

    setAgreement((prev) => ({
      ...prev,
      articles,
      language,
      status: "Sent",
      updatedAt: new Date().toISOString(),
    }));
    setHasUnsavedChanges(false);
    setShowValidation(false);
    toast.success("Agreement sent to renter for review.");
    router.push(`/landlord/agreements/${agreement.id}`);
  };

  const handleNavigateAway = (href: string) => {
    if (
      hasUnsavedChanges &&
      !window.confirm("You have unsaved changes. Leave anyway?")
    ) {
      return;
    }
    router.push(href);
  };

  return (
    <div className="space-y-5 pb-16">
      {/* 1. Compact Page Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4 pt-1">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={() =>
              handleNavigateAway(`/landlord/agreements/${agreement.id}`)
            }
            className="inline-flex items-center gap-1 text-xs font-medium text-faint hover:text-ink transition-colors cursor-pointer"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Agreement</span>
          </button>
          <span className="text-faint text-xs">&middot;</span>
          <h1 className="text-sm font-semibold text-ink">Edit Agreement</h1>
          <span className="font-mono text-xs text-faint">
            ({agreement.referenceNumber})
          </span>
          {hasUnsavedChanges && (
            <span className="text-[11px] text-amber-700 font-medium">
              &middot; Unsaved changes
            </span>
          )}
        </div>

        {/* Header Actions */}
        <div className="flex items-center gap-2">
          {/* Language Selector */}
          <div className="inline-flex items-center border border-line bg-surface p-0.5">
            <button
              type="button"
              onClick={() => handleLanguageToggle("en")}
              className={`px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                language === "en"
                  ? "bg-white text-ink shadow-xs"
                  : "text-faint hover:text-ink"
              }`}
            >
              English
            </button>
            <button
              type="button"
              onClick={() => handleLanguageToggle("rw")}
              className={`px-2.5 py-1 text-xs font-medium transition-colors cursor-pointer ${
                language === "rw"
                  ? "bg-white text-ink shadow-xs"
                  : "text-faint hover:text-ink"
              }`}
            >
              Kinyarwanda
            </button>
          </div>

          {/* Preview */}
          <button
            type="button"
            onClick={() =>
              handleNavigateAway(`/landlord/agreements/${agreement.id}`)
            }
            className="inline-flex h-8 cursor-pointer items-center gap-1.5 border border-line bg-white px-2.5 text-xs font-medium text-ink hover:bg-surface transition-colors"
          >
            <Eye className="size-3.5 text-faint" />
            <span>Preview</span>
          </button>

          {/* Save Changes */}
          <Button
            type="button"
            onClick={handleSaveDraft}
            className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-none bg-ink px-3 text-xs font-medium text-white hover:bg-black transition-colors"
          >
            <Save className="size-3.5" />
            <span>Save Changes</span>
          </Button>
        </div>
      </div>

      {/* 2. Compact Tenancy Details */}
      <EditorSystemMetadataCard agreement={agreement} />

      {/* 3. Validation Warnings (only when triggered by save or errors) */}
      {showValidation && !validation.isValid && (
        <div className="border border-red-300 bg-red-50 p-3.5 text-xs text-red-900 space-y-1">
          <div className="flex items-center gap-1.5 font-semibold">
            <AlertTriangle className="size-3.5 text-red-700" />
            <span>Please complete required fields:</span>
          </div>
          <ul className="list-disc list-inside space-y-0.5 pl-1 text-[11px]">
            {validation.errors.map((err, i) => (
              <li key={i}>{err}</li>
            ))}
          </ul>
        </div>
      )}

      {/* 4. Article Management Toolbar */}
      <div className="flex items-center justify-between gap-3 border-b border-line pb-3 pt-1">
        <span className="text-xs font-semibold text-ink uppercase tracking-wider">
          Articles ({articles.length})
        </span>

        <div className="flex items-center gap-2">
          {/* Add custom article */}
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex h-7.5 cursor-pointer items-center gap-1 rounded-none border-line bg-white px-2.5 text-xs font-medium text-ink hover:bg-surface"
          >
            <Plus className="size-3 text-faint" />
            <span>Add Custom Article</span>
          </Button>

          {/* Restore standard articles */}
          {deletedStandardDefs.length > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsRestoreModalOpen(true)}
              className="inline-flex h-7.5 cursor-pointer items-center gap-1 rounded-none border-amber-300 bg-amber-50/70 px-2 text-xs font-medium text-amber-900 hover:bg-amber-100"
            >
              <RotateCcw className="size-3" />
              <span>Restore Omitted ({deletedStandardDefs.length})</span>
            </Button>
          )}

          {/* Reset all to standard */}
          <button
            type="button"
            onClick={() => setIsConfirmResetOpen(true)}
            className="text-xs text-faint hover:text-ink font-medium underline cursor-pointer ml-1"
          >
            Reset to Standard 18
          </button>
        </div>
      </div>

      {/* 5. Clean Collapsible Accordion Articles List */}
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

      {/* 6. Compact Bottom Action Bar */}
      <div className="flex items-center justify-end gap-2 border-t border-line pt-4 mt-6">
        <Button
          type="button"
          variant="outline"
          onClick={handleSaveDraft}
          className="rounded-none border-line text-xs font-medium h-8.5 px-4"
        >
          Save Changes
        </Button>

        <Button
          type="button"
          onClick={handleSendToRenter}
          className="rounded-none bg-ink text-white hover:bg-black text-xs font-semibold h-8.5 px-4"
        >
          <Send className="size-3 mr-1" />
          <span>Send to Renter</span>
        </Button>
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

      {/* Reset Confirmation Modal */}
      {isConfirmResetOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
          <div className="w-full max-w-sm border border-line bg-white p-5 shadow-xl space-y-3 text-xs">
            <div className="flex items-start gap-2.5">
              <AlertTriangle className="size-4 text-red-600 shrink-0 mt-0.5" />
              <div>
                <h3 className="text-sm font-semibold text-ink">
                  Reset to Standard 18 Clauses?
                </h3>
                <p className="mt-1 text-faint leading-relaxed">
                  This will discard edits and custom clauses, restoring the canonical Rwandan tenancy template in {language === "rw" ? "Kinyarwanda" : "English"}.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-line">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsConfirmResetOpen(false)}
                className="rounded-none border-line text-xs font-medium h-7.5"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleResetEntireAgreement}
                className="rounded-none bg-red-600 text-white hover:bg-red-700 text-xs font-semibold h-7.5"
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
