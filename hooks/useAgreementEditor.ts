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
  insertArticleAt,
  restoreStandardArticle,
  resetAllToStandardArticles,
  getDeletedStandardArticles,
  validateArticles,
} from "@/utils/agreement-utils";
import { CANONICAL_18_ARTICLES } from "@/data/agreement-templates";
import { useLandlordWorkspace } from "@/store/landlord-workspace.store";
import { createSafeId } from "@/utils/format";

export interface UseAgreementEditorOptions {
  onSave?: (agreement: Agreement) => void;
  onSend?: (agreement: Agreement) => void;
  onBack?: () => void;
  onPreview?: (agreement: Agreement) => void;
}

function hasEditedStandardClauses(
  articles: AgreementArticle[],
  language: AgreementLanguage,
): boolean {
  return articles.some((art) => {
    if (!art.isStandard || !art.standardNumber) return false;
    const def = CANONICAL_18_ARTICLES.find(
      (d) => d.standardNumber === art.standardNumber,
    );
    if (!def) return false;
    const expectedTitle = language === "rw" ? def.titleRw : def.titleEn;
    const expectedContent = language === "rw" ? def.contentRw : def.contentEn;
    return (
      art.title.trim() !== expectedTitle.trim() ||
      art.content.trim() !== expectedContent.trim()
    );
  });
}

export function useAgreementEditor(
  initialAgreement: Agreement,
  options?: UseAgreementEditorOptions,
) {
  const router = useRouter();
  const upsertAgreement = useLandlordWorkspace((s) => s.upsertAgreement);

  const [agreement, setAgreement] = useState<Agreement>(initialAgreement);
  const [articles, setArticles] = useState<AgreementArticle[]>(
    initialAgreement.articles,
  );
  const [language, setLanguage] = useState<AgreementLanguage>(
    initialAgreement.language,
  );
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [isPreviewMode, setIsPreviewMode] = useState(false);
  const [expandedArticleId, setExpandedArticleId] = useState<string | null>(
    initialAgreement.articles[0]?.id ?? null,
  );

  // Modals state
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isRestoreModalOpen, setIsRestoreModalOpen] = useState(false);
  const [isConfirmResetOpen, setIsConfirmResetOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [pendingLanguage, setPendingLanguage] =
    useState<AgreementLanguage | null>(null);
  const [pendingNavigation, setPendingNavigation] = useState<{
    targetUrl: string;
    isBackAction: boolean;
  } | null>(null);
  const [showValidation, setShowValidation] = useState(false);

  const deletedStandardDefs = useMemo(
    () => getDeletedStandardArticles(articles),
    [articles],
  );
  const validation = useMemo(() => validateArticles(articles), [articles]);

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

  const handleToggleExpand = useCallback((articleId: string) => {
    setExpandedArticleId((prev) => (prev === articleId ? null : articleId));
  }, []);

  const handleUpdateArticle = useCallback(
    (id: string, updates: { title?: string; content?: string }) => {
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

  const handleDeleteArticle = useCallback((id: string) => {
    setArticles((prev) => deleteArticle(prev, id));
    setHasUnsavedChanges(true);
    toast.success("Clause removed from agreement.");
  }, []);

  const handleAddCustomArticle = useCallback(
    (title: string, content: string, insertIndex?: number) => {
      const newArticle: AgreementArticle = {
        id: createSafeId("custom"),
        number: articles.length + 1,
        title: title.trim(),
        content: content.trim(),
        isStandard: false,
        isCustom: true,
      };
      const clampedIndex =
        typeof insertIndex === "number"
          ? Math.max(0, Math.min(articles.length, insertIndex))
          : articles.length;
      setArticles((prev) => insertArticleAt(prev, newArticle, clampedIndex));
      setExpandedArticleId(newArticle.id);
      setHasUnsavedChanges(true);
      setIsAddModalOpen(false);
      toast.success(`Custom clause added as Article ${clampedIndex + 1}.`);
    },
    [articles.length],
  );

  const handleRestoreStandardArticle = useCallback(
    (standardNumber: number) => {
      setArticles((prev) =>
        restoreStandardArticle(prev, standardNumber, language),
      );
      setHasUnsavedChanges(true);
      toast.success(`Restored statutory clause #${standardNumber}.`);
    },
    [language],
  );

  const handleRestoreAll = useCallback(() => {
    setArticles((prev) =>
      deletedStandardDefs.reduce(
        (acc, def) => restoreStandardArticle(acc, def.standardNumber, language),
        prev,
      ),
    );
    setHasUnsavedChanges(true);
    setIsRestoreModalOpen(false);
    toast.success("Restored all omitted statutory clauses.");
  }, [deletedStandardDefs, language]);

  const handleResetEntireAgreement = useCallback(() => {
    const standard = resetAllToStandardArticles(language);
    setArticles(standard);
    setExpandedArticleId(standard[0]?.id ?? null);
    setHasUnsavedChanges(true);
    setIsConfirmResetOpen(false);
    toast.success("Reset agreement to standard 18 statutory clauses.");
  }, [language]);

  const handleSelectTemplate = useCallback(
    (template: SavedAgreementTemplate) => {
      const workingArticles = template.articles.map((art, idx) => ({
        ...art,
        id: createSafeId(`art-tpl-${idx + 1}`),
        number: idx + 1,
      }));
      setArticles(workingArticles);
      setExpandedArticleId(workingArticles[0]?.id ?? null);
      setHasUnsavedChanges(true);
      setIsTemplateModalOpen(false);
      toast.success(`Loaded template: "${template.name}".`);
    },
    [],
  );

  const handleSelectStandard = useCallback(() => {
    const standard = resetAllToStandardArticles(language);
    setArticles(standard);
    setExpandedArticleId(standard[0]?.id ?? null);
    setHasUnsavedChanges(true);
    setIsTemplateModalOpen(false);
    toast.success("Loaded standard 18 statutory clauses.");
  }, [language]);

  const applyLanguageSwitch = useCallback(
    (newLang: AgreementLanguage) => {
      const translatedArticles = articles.map((art) => {
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
      });

      const updated: Agreement = {
        ...agreement,
        articles: translatedArticles,
        language: newLang,
        updatedAt: new Date().toISOString(),
      };

      setLanguage(newLang);
      setAgreement(updated);
      setArticles(translatedArticles);
      setHasUnsavedChanges(true);
      setPendingLanguage(null);
      options?.onSave?.(updated);
      toast.success(
        `Language switched to ${newLang === "rw" ? "Kinyarwanda" : "English"}.`,
      );
    },
    [agreement, articles, options],
  );

  const handleLanguageToggle = useCallback(
    (newLang: AgreementLanguage) => {
      if (newLang === language) return;
      if (hasUnsavedChanges || hasEditedStandardClauses(articles, language)) {
        setPendingLanguage(newLang);
        return;
      }
      applyLanguageSwitch(newLang);
    },
    [language, hasUnsavedChanges, articles, applyLanguageSwitch],
  );

  const handleSaveDraft = useCallback(() => {
    if (!validation.isValid) {
      setShowValidation(true);
      toast.error(
        validation.errors[0] || "Please address validation errors before saving.",
      );
      return;
    }

    const updatedDraft: Agreement = {
      ...agreement,
      articles,
      language,
      updatedAt: new Date().toISOString(),
    };

    setAgreement(updatedDraft);
    setHasUnsavedChanges(false);
    setShowValidation(false);
    upsertAgreement(updatedDraft);
    options?.onSave?.(updatedDraft);
    toast.success("Agreement draft saved.");
  }, [articles, language, validation, agreement, upsertAgreement, options]);

  const handleSendToRenter = useCallback(() => {
    if (!validation.isValid) {
      setShowValidation(true);
      toast.error("Resolve validation issues before sending the agreement.");
      return;
    }

    const resolvedChangeRequests = agreement.changeRequests?.map((cr) =>
      cr.status === "Pending" ? { ...cr, status: "Accepted" as const } : cr,
    );

    const finalizedAgreement: Agreement = {
      ...agreement,
      articles,
      language,
      status: "Sent",
      changeRequests: resolvedChangeRequests,
      updatedAt: new Date().toISOString(),
      version: agreement.version + 1,
    };

    setAgreement(finalizedAgreement);
    setHasUnsavedChanges(false);
    upsertAgreement(finalizedAgreement);
    toast.success(
      `Agreement sent to ${agreement.renter.name} for digital review.`,
    );
    if (options?.onSend) {
      options.onSend(finalizedAgreement);
    } else {
      router.push(`/landlord/agreements/${agreement.id}`);
    }
  }, [
    articles,
    language,
    validation,
    agreement,
    upsertAgreement,
    router,
    options,
  ]);

  const handleOpenPreview = useCallback(() => {
    if (!validation.isValid) {
      setShowValidation(true);
      toast.error(
        validation.errors[0] ||
          "Please resolve validation errors before previewing.",
      );
      return;
    }

    const workingAgreement: Agreement = {
      ...agreement,
      articles,
      language,
      updatedAt: new Date().toISOString(),
    };
    setAgreement(workingAgreement);
    options?.onSave?.(workingAgreement);
    options?.onPreview?.(workingAgreement);
    setIsPreviewMode(true);
  }, [agreement, articles, language, validation, options]);

  const handleClosePreview = useCallback(() => {
    setIsPreviewMode(false);
  }, []);

  const executeNavigation = useCallback(
    (targetUrl: string, isBackAction: boolean) => {
      setPendingNavigation(null);
      if (isBackAction && options?.onBack) {
        options.onBack();
      } else {
        router.push(targetUrl);
      }
    },
    [options, router],
  );

  const handleNavigateAway = useCallback(
    (targetUrl: string, isBackAction = false) => {
      if (hasUnsavedChanges) {
        setPendingNavigation({ targetUrl, isBackAction });
        return;
      }
      executeNavigation(targetUrl, isBackAction);
    },
    [hasUnsavedChanges, executeNavigation],
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
    pendingLanguage,
    pendingNavigation,
    isPreviewMode,
    setIsPreviewMode,
    handleOpenPreview,
    handleClosePreview,
    setIsAddModalOpen,
    setIsRestoreModalOpen,
    setIsConfirmResetOpen,
    setIsTemplateModalOpen,
    cancelLanguageSwitch: () => setPendingLanguage(null),
    confirmLanguageSwitch: () => {
      if (pendingLanguage) applyLanguageSwitch(pendingLanguage);
    },
    cancelNavigateAway: () => setPendingNavigation(null),
    confirmNavigateAway: () => {
      if (pendingNavigation) {
        executeNavigation(
          pendingNavigation.targetUrl,
          pendingNavigation.isBackAction,
        );
      }
    },
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
