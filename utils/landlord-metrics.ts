import type {
  LandlordInquiry,
  LandlordPropertyItem,
  LandlordRenter,
  MonthlyCollectionPoint,
  PropertyUnit,
  RentalIssue,
  TenancyPayment,
  ViewingRequest,
} from "@/types/landlord";

export interface ManagedDashboardStats {
  totalProperties: number;
  totalSpaces: number;
  occupiedSpaces: number;
  vacantSpaces: number;
  occupancyRate: number;
  activeTenancies: number;
  endingSoonTenancies: number;
  closedTenancies: number;
  currentMonthExpectedRwf: number;
  currentMonthCollectedRwf: number;
  collectionRate: number;
  ytdRentCollectedRwf: number;
  pendingVerificationRwf: number;
  pendingPaymentsCount: number;
  confirmedOverdueRwf: number;
  overdueRentersCount: number;
  openIssuesCount: number;
  pendingInquiriesCount: number;
  pendingViewingsCount: number;
}

export interface ListingOnlyDashboardStats {
  totalListings: number;
  publishedListings: number;
  draftListings: number;
  pausedListings: number;
  rentedListings: number;
  archivedListings: number;
  totalViews: number;
  totalInquiries: number;
  pendingInquiries: number;
  pendingViewings: number;
  confirmedViewings: number;
}

export function computeManagedStats(input: {
  properties: readonly LandlordPropertyItem[];
  units: readonly PropertyUnit[];
  renters: readonly LandlordRenter[];
  payments: readonly TenancyPayment[];
  monthlyHistory: readonly MonthlyCollectionPoint[];
  issues: readonly RentalIssue[];
  inquiries: readonly LandlordInquiry[];
  viewings: readonly ViewingRequest[];
  currentPeriodLabel?: string;
}): ManagedDashboardStats {
  const {
    properties,
    units,
    renters,
    payments,
    monthlyHistory,
    issues,
    inquiries,
    viewings,
    currentPeriodLabel = "September 2026",
  } = input;

  let totalSpaces = 0;
  let occupiedSpaces = 0;

  for (const property of properties) {
    if (property.hasUnits) {
      const buildingUnits = units.filter((u) => u.propertyId === property.id);
      const count = buildingUnits.length || property.totalUnits || 0;
      const occ = buildingUnits.length
        ? buildingUnits.filter(
            (u) => u.status === "Occupied" || Boolean(u.renterId),
          ).length
        : (property.occupiedUnits ?? 0);
      totalSpaces += count;
      occupiedSpaces += Math.min(occ, count);
    } else {
      totalSpaces += 1;
      if (property.status === "Occupied") occupiedSpaces += 1;
    }
  }

  const vacantSpaces = Math.max(0, totalSpaces - occupiedSpaces);
  const occupancyRate =
    totalSpaces > 0 ? Math.round((occupiedSpaces / totalSpaces) * 100) : 0;

  const activeTenancies = renters.filter(
    (r) => r.tenancyStatus === "Active",
  ).length;
  const endingSoonTenancies = renters.filter(
    (r) => r.tenancyStatus === "Ending",
  ).length;
  const closedTenancies = renters.filter(
    (r) => r.tenancyStatus === "Closed",
  ).length;

  const openTenancies = renters.filter((r) => r.tenancyStatus !== "Closed");
  const currentMonthExpectedRwf = openTenancies.reduce(
    (sum, r) => sum + r.monthlyRentRwf,
    0,
  );

  const currentPeriodPayments = payments.filter(
    (p) => p.period === currentPeriodLabel,
  );
  const approvedCurrentPayments = currentPeriodPayments.filter(
    (p) => p.status === "Approved",
  );
  const pendingPayments = payments.filter((p) => p.status === "Pending");

  const currentMonthCollectedRwf = approvedCurrentPayments.length
    ? approvedCurrentPayments.reduce((sum, p) => sum + p.amountRwf, 0)
    : openTenancies
        .filter((r) => r.paymentStatus === "Paid")
        .reduce((sum, r) => sum + r.monthlyRentRwf, 0);

  const collectionRate =
    currentMonthExpectedRwf > 0
      ? Math.min(
          100,
          Math.round(
            (currentMonthCollectedRwf / currentMonthExpectedRwf) * 100,
          ),
        )
      : 0;

  const priorMonthsYtd = monthlyHistory
    .slice(0, -1)
    .reduce((sum, point) => sum + point.collectedRwf, 0);
  const ytdRentCollectedRwf = priorMonthsYtd + currentMonthCollectedRwf;

  const pendingVerificationRwf = pendingPayments.reduce(
    (sum, p) => sum + p.amountRwf,
    0,
  );

  const overdueRenters = openTenancies.filter(
    (r) => r.paymentStatus === "Overdue",
  );
  const confirmedOverdueRwf = overdueRenters.reduce(
    (sum, r) => sum + r.monthlyRentRwf,
    0,
  );

  const openIssuesCount = issues.filter(
    (issue) =>
      issue.status === "Reported" ||
      issue.status === "Unresolved" ||
      issue.status === "Disputed",
  ).length;

  return {
    totalProperties: properties.length,
    totalSpaces,
    occupiedSpaces,
    vacantSpaces,
    occupancyRate,
    activeTenancies,
    endingSoonTenancies,
    closedTenancies,
    currentMonthExpectedRwf,
    currentMonthCollectedRwf,
    collectionRate,
    ytdRentCollectedRwf,
    pendingVerificationRwf,
    pendingPaymentsCount: pendingPayments.length,
    confirmedOverdueRwf,
    overdueRentersCount: overdueRenters.length,
    openIssuesCount,
    pendingInquiriesCount: inquiries.filter((i) => i.status === "New").length,
    pendingViewingsCount: viewings.filter((v) => v.status === "Pending").length,
  };
}

export function computeListingOnlyStats(input: {
  properties: readonly LandlordPropertyItem[];
  inquiries: readonly LandlordInquiry[];
  viewings: readonly ViewingRequest[];
}): ListingOnlyDashboardStats {
  const { properties, inquiries, viewings } = input;
  const statusOf = (property: LandlordPropertyItem) =>
    property.listingStatus ??
    (property.status === "Occupied" ? "Rented" : "Published");

  let publishedListings = 0;
  let draftListings = 0;
  let pausedListings = 0;
  let rentedListings = 0;
  let archivedListings = 0;
  let totalViews = 0;

  for (const property of properties) {
    const status = statusOf(property);
    if (status === "Published") publishedListings += 1;
    else if (status === "Draft") draftListings += 1;
    else if (status === "Paused") pausedListings += 1;
    else if (status === "Rented") rentedListings += 1;
    else if (status === "Archived") archivedListings += 1;
    totalViews += property.viewsCount ?? 0;
  }

  return {
    totalListings: properties.length,
    publishedListings,
    draftListings,
    pausedListings,
    rentedListings,
    archivedListings,
    totalViews,
    totalInquiries: inquiries.length,
    pendingInquiries: inquiries.filter((i) => i.status === "New").length,
    pendingViewings: viewings.filter((v) => v.status === "Pending").length,
    confirmedViewings: viewings.filter((v) => v.status === "Confirmed").length,
  };
}
