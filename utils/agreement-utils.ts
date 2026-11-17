import {
  Agreement,
  AgreementArticle,
  AgreementLanguage,
} from "@/types/agreement.types";
import {
  CANONICAL_18_ARTICLES,
  StandardArticleDefinition,
  interpolateArticleText,
} from "@/data/agreement-templates";
import { getOrdinalSuffix } from "@/utils/rent-schedule-utils";

export function renumberArticles(articles: AgreementArticle[]): AgreementArticle[] {
  return articles.map((art, idx) => ({
    ...art,
    number: idx + 1,
  }));
}

export function moveArticleUp(
  articles: AgreementArticle[],
  index: number
): AgreementArticle[] {
  if (index <= 0 || index >= articles.length) return articles;
  const copy = [...articles];
  const item = copy[index];
  copy[index] = copy[index - 1];
  copy[index - 1] = item;
  return renumberArticles(copy);
}

export function moveArticleDown(
  articles: AgreementArticle[],
  index: number
): AgreementArticle[] {
  if (index < 0 || index >= articles.length - 1) return articles;
  const copy = [...articles];
  const item = copy[index];
  copy[index] = copy[index + 1];
  copy[index + 1] = item;
  return renumberArticles(copy);
}

export function updateArticle(
  articles: AgreementArticle[],
  id: string,
  updates: Partial<AgreementArticle>
): AgreementArticle[] {
  return articles.map((art) => (art.id === id ? { ...art, ...updates } : art));
}

export function deleteArticle(
  articles: AgreementArticle[],
  id: string
): AgreementArticle[] {
  const filtered = articles.filter((art) => art.id !== id);
  return renumberArticles(filtered);
}

export function getDeletedStandardArticles(
  articles: AgreementArticle[]
): StandardArticleDefinition[] {
  const existingStandardNums = new Set(
    articles
      .map((a) => a.standardNumber)
      .filter((n): n is number => typeof n === "number")
  );

  return CANONICAL_18_ARTICLES.filter(
    (def) => !existingStandardNums.has(def.standardNumber)
  );
}

export function restoreStandardArticle(
  articles: AgreementArticle[],
  standardNumber: number,
  language: AgreementLanguage
): AgreementArticle[] {
  const def = CANONICAL_18_ARTICLES.find(
    (item) => item.standardNumber === standardNumber
  );
  if (!def) return articles;

  const restored: AgreementArticle = {
    id: `art-std-${standardNumber}-${Date.now()}`,
    number: articles.length + 1,
    standardNumber: def.standardNumber,
    title: language === "rw" ? def.titleRw : def.titleEn,
    content: language === "rw" ? def.contentRw : def.contentEn,
    isStandard: true,
    isCustom: false,
  };

  // Insert back in order of standardNumber where appropriate
  const copy = [...articles, restored];
  copy.sort((a, b) => {
    const numA = a.standardNumber ?? 999;
    const numB = b.standardNumber ?? 999;
    return numA - numB;
  });

  return renumberArticles(copy);
}

export function resetAllToStandardArticles(
  language: AgreementLanguage
): AgreementArticle[] {
  return CANONICAL_18_ARTICLES.map((item, index) => ({
    id: `art-${index + 1}`,
    number: index + 1,
    standardNumber: item.standardNumber,
    title: language === "rw" ? item.titleRw : item.titleEn,
    content: language === "rw" ? item.contentRw : item.contentEn,
    isStandard: true,
    isCustom: false,
  }));
}

export function validateArticles(articles: AgreementArticle[]): {
  isValid: boolean;
  errors: string[];
  warnings: string[];
} {
  const errors: string[] = [];
  const warnings: string[] = [];

  if (articles.length === 0) {
    errors.push("The agreement must contain at least one article.");
  }

  articles.forEach((art) => {
    if (!art.title.trim()) {
      errors.push(`Article ${art.number} is missing a title.`);
    }
    if (!art.content.trim()) {
      errors.push(`Article ${art.number} has empty content.`);
    }
  });

  // Check mandatory clauses
  const mandatoryDefs = CANONICAL_18_ARTICLES.filter((d) => d.isMandatory);
  const presentStandardNums = new Set(
    articles.map((a) => a.standardNumber).filter(Boolean)
  );

  mandatoryDefs.forEach((def) => {
    if (!presentStandardNums.has(def.standardNumber)) {
      warnings.push(
        `Standard Article ${def.standardNumber} (${def.titleEn}) is a recommended statutory clause under Rwandan tenancy practice.`
      );
    }
  });

  return {
    isValid: errors.length === 0,
    errors,
    warnings,
  };
}

export function formatCurrencyRwf(amount: number): string {
  return new Intl.NumberFormat("en-RW", {
    style: "decimal",
    maximumFractionDigits: 0,
  }).format(amount) + " RWF";
}

export function formatDate(dateStr: string, language: AgreementLanguage = "en"): string {
  if (!dateStr || dateStr === "PENDING_FIRST_PAYMENT") {
    return language === "rw"
      ? "Gitegereje kwemezwa kw'ubwishyu bwa mbere bwa lwayi"
      : "Pending first rent payment confirmation";
  }
  try {
    const d = new Date(dateStr);
    if (isNaN(d.getTime())) return dateStr;
    return d.toLocaleDateString("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  } catch {
    return dateStr;
  }
}

export function getAgreementVariables(
  agreement: Agreement
): Record<string, string | number | undefined> {
  const dueDay = agreement.financials.paymentDueDay || 1;
  const ordinal = `${dueDay}${getOrdinalSuffix(dueDay)}`;
  const shorterMonthNote =
    dueDay >= 29
      ? agreement.language === "rw"
        ? " (cyangwa umunsi wa nyuma w'ukwezi kugufi)"
        : " (or the final calendar day of shorter months)"
      : "";

  let commencementDisplay = "";
  if (
    agreement.commencementType === "first_payment_confirmation" &&
    !agreement.firstPaymentConfirmedAt
  ) {
    commencementDisplay =
      agreement.language === "rw"
        ? "itariki ubwishyu bwa mbere bwa lwayi buzaba bwemejweho"
        : "the date the first rent payment is successfully confirmed";
  } else {
    commencementDisplay = formatDate(
      agreement.firstPaymentConfirmedAt || agreement.tenancyStartDate,
      agreement.language,
    );
  }

  return {
    LANDLORD_NAME: agreement.landlord.name,
    LANDLORD_PHONE: agreement.landlord.phone,
    LANDLORD_ID: agreement.landlord.nationalId,
    LANDLORD_EMAIL: agreement.landlord.email,
    RENTER_NAME: agreement.renter.name,
    RENTER_PHONE: agreement.renter.phone,
    RENTER_ID: agreement.renter.nationalId,
    RENTER_EMAIL: agreement.renter.email,
    PROPERTY_NAME: agreement.property.name,
    PROPERTY_ADDRESS: agreement.property.address,
    UNIT_NUMBER: agreement.property.unitNumber,
    MONTHLY_RENT: formatCurrencyRwf(agreement.financials.monthlyRentRwf).replace(" RWF", ""),
    PAYMENT_DUE_DAY: dueDay,
    PAYMENT_DUE_DAY_ORDINAL: ordinal,
    SHORTER_MONTH_NOTE: shorterMonthNote,
    SECURITY_DEPOSIT: formatCurrencyRwf(agreement.financials.securityDepositRwf).replace(" RWF", ""),
    COMMENCEMENT_DATE: commencementDisplay,
    DURATION_MONTHS: agreement.tenancyDurationMonths ?? 12,
  };
}

export function renderInterpolatedArticle(
  article: AgreementArticle,
  variables: Record<string, string | number | undefined>
): { title: string; content: string } {
  return {
    title: interpolateArticleText(article.title, variables),
    content: interpolateArticleText(article.content, variables),
  };
}
