"use client";

import { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
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

export function useAgreementEditor(initialAgreement: Agreement) {
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
  const [showValidation, setShowValidation] = useState(false);

  // Computed data
  const deletedStandardDefs = useMemo(
    () => getDeletedStandardArticles(articles),
    [articles],
  );

  const validation = useMemo(() => validateArticles(articles), [articles]);

  // Warn on browser unload if unsaved changes exist
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (hasUnsavedChanges) {
        e.preventDefault();
      }
    };
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [hasUnsavedChanges]);

  const handleToggleExpand = useCallback((id: string) => {
    setExpandedArticleId((prev) => (prev === id ? null : id));
  }, []);

  const handleUpdateArticle = useCallback(
    (id: string, updates: Partial<AgreementArticle>) => {
      setArticles((prev) => updateArticle(prev, id, updates));
      setHasUnsavedChanges(true);
    },
    [],
  );

  const handleMoveUp = useCallback((index: number) => {
    setArticles((prev) => moveArticleUp(prev, index));
    setHasUnsavedChanges(true);
  }, []);

  const handleMoveDown = useCallback((index: number) => {
    setArticles((prev) => moveArticleDown(prev, index));
    setHasUnsavedChanges(true);
  }, []);

  const handleDeleteArticle = useCallback(
    (id: string) => {
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
    },
    [articles],
  );

  const handleAddCustomArticle = useCallback(
    (title: string, content: string, insertIndex: number) => {
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

      const renumbered = copy.map((a, idx) => ({ ...a, number: idx + 1 }));
      setArticles(renumbered);
      setExpandedArticleId(newArticle.id);
      setHasUnsavedChanges(true);
      toast.success(`Custom article "${title}" added.`);
    },
    [articles],
  );

  const handleRestoreStandardArticle = useCallback(
    (standardNumber: number) => {
      setArticles((prev) =>
        restoreStandardArticle(prev, standardNumber, language),
      );
      setHasUnsavedChanges(true);
      toast.success(`Standard Article #${standardNumber} restored.`);
    },
    [language],
  );

  const handleRestoreAll = useCallback(() => {
    let current = [...articles];
    deletedStandardDefs.forEach((def) => {
      current = restoreStandardArticle(current, def.standardNumber, language);
    });
    setArticles(current);
    setHasUnsavedChanges(true);
    toast.success("All standard clauses restored.");
    setIsRestoreModalOpen(false);
  }, [articles, deletedStandardDefs, language]);

  const handleResetEntireAgreement = useCallback(() => {
    const defaults = resetAllToStandardArticles(language);
    setArticles(defaults);
    setExpandedArticleId(defaults[0]?.id ?? null);
    setHasUnsavedChanges(true);
    setIsConfirmResetOpen(false);
    toast.success("Agreement reset to canonical 18 standard clauses.");
  }, [language]);

  const handleLanguageToggle = useCallback(
    (newLang: AgreementLanguage) => {
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
    },
    [hasUnsavedChanges, language],
  );

  const handleSaveDraft = useCallback(() => {
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
  }, [articles, language, validation.isValid]);

  const handleSendToRenter = useCallback(() => {
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
  }, [agreement.id, articles, language, router, validation.isValid]);

  const handleNavigateAway = useCallback(
    (href: string) => {
      if (
        hasUnsavedChanges &&
        !window.confirm("You have unsaved changes. Leave anyway?")
      ) {
        return;
      }
      router.push(href);
    },
    [hasUnsavedChanges, router],
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
  };
}
