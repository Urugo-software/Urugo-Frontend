"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

import {
  Agreement,
  AgreementArticle,
  AgreementLanguage,
  SavedAgreementTemplate,
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

export interface UseAgreementEditorOptions {
  onSave?: (agreement: Agreement) => void;
  onSend?: (agreement: Agreement) => void;
  onBack?: () => void;
}

export function useAgreementEditor(
  initialAgreement: Agreement,
  options?: UseAgreementEditorOptions,
) {
  const router = useRouter();
  const [agreement, setAgreement] = useState<Agreement>(initialAgreement);
  const [articles, setArticles] = useState<AgreementArticle[]>(
    initialAgreement.articles,
  );
  const [language, setLanguage] = useState<AgreementLanguage>(
    initialAgreement.language,
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Accordion state: single expanded article, first expanded by default
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(
    initialAgreement.articles[0]?.id ?? null,
  );

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [showValidation, setShowValidation] = useState(false);

  // Computed data
  const deletedStandardDefs = useMemo(
    () => getDeletedStandardArticles(articles),
    [articles],
  );

  const validation = useMemo(() => validateArticles(articles), [articles]);

  // Keep unsaved changes alert on beforeunload
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
        e.returnValue = "";
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  // Accordion toggle: single article expanded at a time
  const handleToggleExpand = useCallback((articleId: string) => {
    setExpandedArticleId((prev) => (prev === articleId ? null : articleId));
  }, []);

  // Update article title or content
  const handleUpdateArticle = useCallback(
    (id: string, updates: { title?: string; content?: string }) => {
      setArticles((prev) => updateArticle(prev, id, updates));
      setHasUnsavedChanges(true);
    },
    [],
  );

  // Reordering
  const handleMoveUp = useCallback((index: number) => {
    setArticles((prev) => moveArticleUp(prev, index));
    setHasUnsavedChanges(true);
  }, []);

  const handleMoveDown = useCallback((index: number) => {
    setArticles((prev) => moveArticleDown(prev, index));
    setHasUnsavedChanges(true);
  }, []);

  // Delete article
  const handleDeleteArticle = useCallback((id: string) => {
    setArticles((prev) => deleteArticle(prev, id));
    setHasUnsavedChanges(true);
    toast.success("Clause removed from agreement.");
  }, []);

  // Add custom article
  const handleAddCustomArticle = useCallback(
    (title: string, content: string) => {
      const newArticle: AgreementArticle = {
        id: `custom-${Date.now()}`,
        number: articles.length + 1,
        title: title.trim(),
        content: content.trim(),
        isStandard: false,
        isCustom: true,
      };
      setArticles((prev) => [...prev, newArticle]);
      setExpandedArticleId(newArticle.id);
      setHasUnsavedChanges(true);
      setIsAddModalOpen(false);
      toast.success(`Custom clause added as Article ${articles.length + 1}`);
    },
    [articles.length],
  );

  // Restore single standard article
  const handleRestoreStandardArticle = useCallback(
    (standardNumber: number) => {
      setArticles((prev) =>
        restoreStandardArticle(prev, standardNumber, language),
      );
      setHasUnsavedChanges(true);
      toast.success(`Restored statutory clause ${standardNumber}`);
    },
    [language],
  );

  // Restore all standard articles
  const handleRestoreAll = useCallback(() => {
    deletedStandardDefs.forEach((def) => {
      setArticles((prev) =>
        restoreStandardArticle(prev, def.standardNumber, language),
      );
    });
    setHasUnsavedChanges(true);
    setIsRestoreModalOpen(false);
    toast.success("Restored all omitted statutory clauses");
  }, [deletedStandardDefs, language]);

  // Full reset to 18 standard articles
  const handleResetEntireAgreement = useCallback(() => {
    const standard = resetAllToStandardArticles(language);
    setArticles(standard);
    setExpandedArticleId(standard[0]?.id ?? null);
    setHasUnsavedChanges(true);
    setIsConfirmResetOpen(false);
    toast.success("Reset agreement to standard 18 statutory clauses");
  }, [language]);

  // Apply template
  const handleSelectTemplate = useCallback(
    (template: SavedAgreementTemplate) => {
      const workingArticles = template.articles.map((art, idx) => ({
        ...art,
        id: `art-tpl-${idx + 1}-${Date.now()}`,
        number: idx + 1,
      }));
      setArticles(workingArticles);
      setExpandedArticleId(workingArticles[0]?.id ?? null);
      setHasUnsavedChanges(true);
      setIsTemplateModalOpen(false);
      toast.success(`Loaded saved template: "${template.name}"`);
    },
    [],
  );

  const handleSelectStandard = useCallback(() => {
    const standard = resetAllToStandardArticles(language);
    setArticles(standard);
    setExpandedArticleId(standard[0]?.id ?? null);
    setHasUnsavedChanges(true);
    setIsTemplateModalOpen(false);
    toast.success("Loaded standard 18 statutory clauses");
  }, [language]);

  // Language switch
  const handleLanguageToggle = useCallback(
    (newLang: AgreementLanguage) => {
      if (newLang === language) return;

      // Ask confirmation if edits were made
      if (hasUnsavedChanges) {
        const confirmSwitch = window.confirm(
          "Switching agreement language will translate standard statutory clauses to " +
            (newLang === "rw" ? "Kinyarwanda" : "English") +
            ". Do you want to proceed?",
        );
        if (!confirmSwitch) return;
      }

      setLanguage(newLang);

      // Translate standard clauses that match standard definitions
      setArticles((prev) =>
        prev.map((art) => {
          if (art.isStandard && art.standardNumber) {
            const def = CANONICAL_18_ARTICLES.find(
              (d) => d.standardNumber === art.standardNumber,
            );
            if (def) {
              return {
                ...art,
                title: newLang === "rw" ? def.titleRw : def.titleEn,
                content: newLang === "rw" ? def.contentRw : def.contentEn,
              };
            }
          }
          return art;
        }),
      );

      setHasUnsavedChanges(true);
      toast.success(
        `Language switched to ${newLang === "rw" ? "Kinyarwanda" : "English"}`,
      );
    },
    [language, hasUnsavedChanges],
  );

  // Save draft
  const handleSaveDraft = useCallback(() => {
    if (!validation.isValid) {
      setShowValidation(true);
      toast.error(
        validation.errors[0] || "Please address validation errors before saving",
      );
      return;
    }

    const updatedDraft: Agreement = {
      ...agreement,
      articles,
      language,
      updatedAt: new Date().toISOString(),
      version: agreement.version,
    };

    setAgreement(updatedDraft);
    setHasUnsavedChanges(false);
    setShowValidation(false);
    options?.onSave?.(updatedDraft);
    toast.success("Agreement draft saved successfully!");
  }, [articles, language, validation, agreement, options]);

  // Send for review
  const handleSendToRenter = useCallback(() => {
    if (!validation.isValid) {
      setShowValidation(true);
      toast.error("Cannot finalize agreement: resolve validation issues first");
      return;
    }

    const finalizedAgreement: Agreement = {
      ...agreement,
      articles,
      language,
      status: "Sent",
      updatedAt: new Date().toISOString(),
      version: agreement.version + 1,
    };

    setAgreement(finalizedAgreement);
    setHasUnsavedChanges(false);
    toast.success(
      `Agreement finalized and sent to ${agreement.renter.name} for digital review!`,
    );
    if (options?.onSend) {
      options.onSend(finalizedAgreement);
    } else {
      router.push(`/landlord/agreements/${agreement.id}`);
    }
  }, [articles, language, validation, agreement, router, options]);

  // Navigate away with unsaved check
  const handleNavigateAway = useCallback(
    (targetUrl: string) => {
      if (hasUnsavedChanges) {
        const leave = window.confirm(
          "You have unsaved changes in this agreement. Are you sure you want to leave?",
        );
        if (!leave) return;
      }
      if (options?.onBack) {
        options.onBack();
      } else {
        router.push(targetUrl);
      }
    },
    [hasUnsavedChanges, router, options],
  );

  return {
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
  };
}
