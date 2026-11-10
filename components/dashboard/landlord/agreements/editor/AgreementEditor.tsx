"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Save,
  Send,
  Eye,
  Plus,
  RotateCcw,
  AlertTriangle,
  CheckCircle2,
  FileText,
  Sliders,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";

import {
  Agreement,
  AgreementArticle,
  AgreementLanguage,
} from "../types/agreement.types";
import {
  moveArticleUp,
  moveArticleDown,
  updateArticle,
  deleteArticle,
  restoreStandardArticle,
  resetAllToStandardArticles,
  getDeletedStandardArticles,
  validateArticles,
} from "../utils/agreement-utils";
import { CANONICAL_18_ARTICLES } from "../data/agreement-templates";
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
    initialAgreement.articles
  );
  const [language, setLanguage] = useState<AgreementLanguage>(
    initialAgreement.language
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Modals
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);

  // Deleted standard articles
  const deletedStandardDefs = useMemo(
    () => getDeletedStandardArticles(articles),
    [articles]
  );

  // Validation
  const validation = useMemo(() => validateArticles(articles), [articles]);

  // Article handlers
  const handleUpdateArticle = (id: string, updates: Partial<AgreementArticle>) => {
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
        `Standard Article ${art.number} removed. You can restore it anytime from "Restore Standard Clauses".`,
        { icon: "ℹ️" }
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
    insertIndex: number
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
    setHasUnsavedChanges(true);
    toast.success(`Custom article "${title}" added.`);
  };

  const handleRestoreStandardArticle = (standardNumber: number) => {
    setArticles((prev) =>
      restoreStandardArticle(prev, standardNumber, language)
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
    toast.success("All standard Rwandan tenancy clauses restored.");
    setIsRestoreModalOpen(false);
  };

  const handleResetEntireAgreement = () => {
    const defaults = resetAllToStandardArticles(language);
    setArticles(defaults);
    setHasUnsavedChanges(true);
    setIsConfirmResetOpen(false);
    toast.success("Agreement reset to the standard 18 Rwandan tenancy clauses.");
  };

  const handleLanguageToggle = (newLang: AgreementLanguage) => {
    if (newLang === language) return;

    // Check if user has made custom changes
    if (
      hasUnsavedChanges &&
      !window.confirm(
        "Switching languages will translate standard clauses to the chosen language while preserving custom clauses. Continue?"
      )
    ) {
      return;
    }

    setLanguage(newLang);
    // Translate standard articles
    setArticles((prev) =>
      prev.map((art) => {
        if (!art.isStandard || !art.standardNumber) return art;
        const def = CANONICAL_18_ARTICLES.find(
          (d) => d.standardNumber === art.standardNumber
        );
        if (!def) return art;
        return {
          ...art,
          title: newLang === "rw" ? def.titleRw : def.titleEn,
          content: newLang === "rw" ? def.contentRw : def.contentEn,
        };
      })
    );
    setHasUnsavedChanges(true);
    toast.success(
      `Switched template language to ${
        newLang === "rw" ? "Kinyarwanda" : "English"
      }`
    );
  };

  const handleSaveDraft = () => {
    setAgreement((prev) => ({
      ...prev,
      articles,
      language,
      status: prev.status === "Changes Requested" ? "Draft" : prev.status,
      updatedAt: new Date().toISOString(),
    }));
    setHasUnsavedChanges(false);
    toast.success("Agreement draft saved successfully.");
  };

  const handleSendToRenter = () => {
    if (!validation.isValid) {
      toast.error("Please resolve validation errors before sending to renter.");
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
    toast.success(
      `Agreement sent to ${agreement.renter.name} for review and digital signature.`
    );
    router.push(`/landlord/agreements/${agreement.id}`);
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Top Navigation & Status */}
      <div className="flex flex-col gap-4 border-b border-line pb-6 pt-2">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <Link
            href={`/landlord/agreements/${agreement.id}`}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-faint hover:text-ink transition-colors"
          >
            <ArrowLeft className="size-3.5" />
            <span>Back to Agreement Preview</span>
          </Link>

          <div className="flex items-center gap-2">
            <span className="font-mono text-xs text-faint">
              Editing: <strong className="text-ink">{agreement.referenceNumber}</strong>
            </span>
            {hasUnsavedChanges && (
              <span className="text-[10px] uppercase font-bold text-amber-700 bg-amber-50 border border-amber-200 px-2 py-0.5">
                Unsaved Edits
              </span>
            )}
          </div>
        </div>

        {/* Action Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-ink font-heading">
              Contract Clause Editor
            </h1>
            <p className="mt-0.5 text-xs text-faint">
              Customize, reorder, add, or restore legal articles for{" "}
              <strong className="text-ink">{agreement.renter.name}</strong> ({agreement.property.name}).
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            {/* Language Switcher */}
            <div className="inline-flex items-center border border-line bg-surface p-0.5">
              <button
                type="button"
                onClick={() => handleLanguageToggle("en")}
                className={`px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
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
                className={`px-2.5 py-1 text-xs font-semibold transition-colors cursor-pointer ${
                  language === "rw"
                    ? "bg-white text-ink shadow-xs"
                    : "text-faint hover:text-ink"
                }`}
              >
                Kinyarwanda
              </button>
            </div>

            {/* Preview Action */}
            <Link
              href={`/landlord/agreements/${agreement.id}`}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none border border-line bg-white px-3 text-xs font-medium text-ink hover:bg-surface transition-colors"
            >
              <Eye className="size-3.5 text-faint" />
              <span>Preview</span>
            </Link>

            {/* Save Draft */}
            <Button
              type="button"
              variant="outline"
              onClick={handleSaveDraft}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none border-line bg-white px-3 text-xs font-medium text-ink hover:bg-surface transition-colors"
            >
              <Save className="size-3.5 text-faint" />
              <span>Save Draft</span>
            </Button>

            {/* Send to Renter */}
            <Button
              type="button"
              onClick={handleSendToRenter}
              className="inline-flex h-9 cursor-pointer items-center gap-1.5 rounded-none bg-ink px-4 text-xs font-semibold text-white hover:bg-black transition-colors"
            >
              <Send className="size-3.5" />
              <span>Send to Renter</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Validation Banner if errors or warnings exist */}
      {(!validation.isValid || validation.warnings.length > 0) && (
        <div className="space-y-2">
          {!validation.isValid && (
            <div className="border border-red-300 bg-red-50 p-4 text-xs text-red-900">
              <div className="flex items-center gap-2 font-bold mb-1">
                <AlertTriangle className="size-4 text-red-700" />
                <span>Form Validation Incomplete</span>
              </div>
              <ul className="list-disc list-inside space-y-0.5 pl-1">
                {validation.errors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          {validation.warnings.length > 0 && (
            <div className="border border-amber-300 bg-amber-50 p-3.5 text-xs text-amber-900">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-semibold">
                  <AlertTriangle className="size-4 text-amber-700" />
                  <span>
                    {validation.warnings.length} Recommended Statutory Clause
                    {validation.warnings.length > 1 ? "s" : ""} Omitted
                  </span>
                </div>
                <button
                  type="button"
                  onClick={() => setIsRestoreModalOpen(true)}
                  className="font-bold underline text-amber-950 hover:text-black cursor-pointer"
                >
                  Review Omissions
                </button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* System Metadata Panel */}
      <EditorSystemMetadataCard agreement={agreement} />

      {/* Article Management Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line pb-4 pt-2">
        <div className="flex items-center gap-2">
          <span className="text-xs font-bold uppercase tracking-wider text-ink font-heading">
            Agreement Clauses ({articles.length})
          </span>
          <span className="text-[11px] text-faint">
            &middot; Drag, reorder, or customize individual covenants
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Add custom article */}
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsAddModalOpen(true)}
            className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-none border-line bg-white px-2.5 text-xs font-medium text-ink hover:bg-surface"
          >
            <Plus className="size-3.5 text-faint" />
            <span>Add Custom Clause</span>
          </Button>

          {/* Restore standard articles */}
          {deletedStandardDefs.length > 0 && (
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsRestoreModalOpen(true)}
              className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-none border-amber-300 bg-amber-50/70 px-2.5 text-xs font-medium text-amber-900 hover:bg-amber-100"
            >
              <RotateCcw className="size-3.5" />
              <span>Restore Omitted ({deletedStandardDefs.length})</span>
            </Button>
          )}

          {/* Reset all to standard */}
          <Button
            type="button"
            variant="outline"
            onClick={() => setIsConfirmResetOpen(true)}
            className="inline-flex h-8 cursor-pointer items-center gap-1.5 rounded-none border-line bg-white px-2.5 text-xs font-medium text-faint hover:text-ink hover:bg-surface"
          >
            <Sliders className="size-3.5" />
            <span>Reset to Standard 18</span>
          </Button>
        </div>
      </div>

      {/* Articles List */}
      <div className="space-y-4">
        {articles.map((art, index) => (
          <ArticleEditorCard
            key={art.id}
            article={art}
            index={index}
            totalArticles={articles.length}
            onUpdate={handleUpdateArticle}
            onMoveUp={handleMoveUp}
            onMoveDown={handleMoveDown}
            onDelete={handleDeleteArticle}
            language={language}
          />
        ))}
      </div>

      {/* Bottom Sticky Action Bar */}
      <div className="sticky bottom-0 z-30 border-t border-line bg-white/95 p-4 shadow-md backdrop-blur-xs flex flex-wrap items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <FileText className="size-4 text-faint" />
          <span className="text-xs text-faint">
            {articles.length} articles &middot; Language:{" "}
            <strong className="text-ink">
              {language === "rw" ? "Kinyarwanda" : "English"}
            </strong>
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={handleSaveDraft}
            className="rounded-none border-line text-xs font-medium h-9 px-4"
          >
            Save Draft
          </Button>

          <Button
            type="button"
            onClick={handleSendToRenter}
            className="rounded-none bg-ink text-white hover:bg-black text-xs font-semibold h-9 px-5"
          >
            Send to Renter
          </Button>
        </div>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-md border border-line bg-white p-6 shadow-xl space-y-4">
            <div className="flex items-start gap-3">
              <div className="grid size-8 shrink-0 place-items-center bg-rose-100 text-rose-700">
                <AlertTriangle className="size-4" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-ink">
                  Reset Agreement to Default 18 Clauses?
                </h3>
                <p className="mt-1 text-xs text-faint leading-relaxed">
                  This will discard any custom articles and edits you have made, and restore the complete canonical 18-article Rwandan tenancy template in {language === "rw" ? "Kinyarwanda" : "English"}.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end gap-2 border-t border-line">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsConfirmResetOpen(false)}
                className="rounded-none border-line text-xs font-medium"
              >
                Cancel
              </Button>
              <Button
                type="button"
                onClick={handleResetEntireAgreement}
                className="rounded-none bg-rose-700 text-white hover:bg-rose-800 text-xs font-semibold"
              >
                Yes, Reset All
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
