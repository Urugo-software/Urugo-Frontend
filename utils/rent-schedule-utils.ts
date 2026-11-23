/**
 * Utility functions for rent schedules, monthly due dates, and tenancy commencement.
 */

/**
 * Returns the correct ordinal suffix for any day number (1st, 2nd, 3rd, 4th, ..., 21st, 22nd, 23rd, 31st).
 * Properly handles 11th, 12th, 13th edge cases.
 */
export function getOrdinalSuffix(day: number): string {
  const mod10 = day % 10;
  const mod100 = day % 100;
  if (mod10 === 1 && mod100 !== 11) return "st";
  if (mod10 === 2 && mod100 !== 12) return "nd";
  if (mod10 === 3 && mod100 !== 13) return "rd";
  return "th";
}

/**
 * Formats a day number with its ordinal suffix, e.g. "1st", "21st", "31st".
 */
export function formatDayOrdinal(day: number): string {
  if (!day || isNaN(day)) return "";
  return `${day}${getOrdinalSuffix(day)}`;
}

/**
 * Returns the effective due date for a specific calendar month, properly handling
 * shorter months (e.g. February with 28/29 days, or 30-day months) when the agreed
 * due date is Day 29, 30, or 31.
 *
 * @param year e.g. 2026
 * @param monthIndex1To12 1 for Jan, 2 for Feb, ..., 12 for Dec
 * @param agreedDueDay Day agreed between landlord and renter (1 - 31)
 */
export function getEffectiveMonthlyDueDate(
  year: number,
  monthIndex1To12: number,
  agreedDueDay: number,
): Date {
  // Passing 0 as day to Date constructor returns the last day of the previous month.
  // In JS Date, months are 0-indexed (0 = Jan, 11 = Dec).
  // Therefore, new Date(year, monthIndex1To12, 0).getDate() gives total days in monthIndex1To12.
  const daysInMonth = new Date(year, monthIndex1To12, 0).getDate();
  const effectiveDay = Math.min(Math.max(1, agreedDueDay), daysInMonth);
  return new Date(year, monthIndex1To12 - 1, effectiveDay);
}

/**
 * Formats the monthly due date with ordinal suffix and clear shorter-month explanation.
 */
export function formatAgreedDueDayDisplay(
  day: number,
  language: "en" | "rw" = "en",
): string {
  const ordinal = formatDayOrdinal(day);
  if (language === "rw") {
    if (day >= 29) {
      return `Mbere y'itariki ya ${day} ya buri kwezi (cyangwa umunsi wa nyuma w'ukwezi kugufi)`;
    }
    return `Mbere y'itariki ya ${day} ya buri kwezi`;
  }

  if (day >= 29) {
    return `${ordinal} day of each calendar month (or the last day of shorter months)`;
  }
  return `${ordinal} day of each calendar month`;
}

/**
 * Formats tenancy commencement date display taking into account payment-based commencement.
 */
export function formatCommencementDisplay(options: {
  startDate?: string;
  useFirstPaymentAsCommencement?: boolean;
  commencementStatus?: "pending_first_payment" | "confirmed" | "manual";
  confirmedPaymentDate?: string;
  language?: "en" | "rw";
}): {
  display: string;
  isPending: boolean;
  statusBadge?: string;
} {
  const {
    startDate,
    useFirstPaymentAsCommencement,
    commencementStatus,
    confirmedPaymentDate,
    language = "en",
  } = options;

  // If first payment is already verified and confirmed, use the confirmed date
  if (confirmedPaymentDate) {
    const formatted = formatStandardDate(confirmedPaymentDate);
    return {
      display: formatted,
      isPending: false,
      statusBadge: language === "rw" ? "Yemejwe" : "Confirmed",
    };
  }

  // If payment-based commencement is active and not yet confirmed
  if (
    useFirstPaymentAsCommencement ||
    commencementStatus === "pending_first_payment" ||
    startDate === "PENDING_FIRST_PAYMENT"
  ) {
    return {
      display:
        language === "rw"
          ? "Gitegereje kwemezwa kw'ubwishyu bwa mbere bwa lwayi"
          : "Pending first rent payment confirmation",
      isPending: true,
      statusBadge:
        language === "rw"
          ? "Gitegereje Ubwishyu"
          : "Pending First Payment",
    };
  }

  // Standard fixed commencement date
  if (startDate && startDate !== "PENDING_FIRST_PAYMENT") {
    return {
      display: formatStandardDate(startDate),
      isPending: false,
    };
  }

  return {
    display: language === "rw" ? "Gitegereje kwemezwa" : "To be determined",
    isPending: true,
  };
}

function formatStandardDate(dateStr: string): string {
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
