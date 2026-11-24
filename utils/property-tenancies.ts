import type {
  LandlordPropertyItem,
  LandlordRenter,
  PropertyUnit,
} from "@/types/landlord";

export interface ResolvedPropertyDoor {
  unit: PropertyUnit;
  renter: LandlordRenter | null;
}

export interface PropertyTenancySummary {
  totalUnits: number;
  occupiedUnits: number;
  vacantUnits: number;
  monthlyRentRwf: number;
  attentionCount: number;
}

export function findPropertyForRenter(
  renter: LandlordRenter,
  properties: readonly LandlordPropertyItem[],
): LandlordPropertyItem | undefined {
  if (renter.propertyId) {
    const byId = properties.find((property) => property.id === renter.propertyId);
    if (byId) return byId;
  }
  const targetName = renter.propertyName.trim().toLowerCase();
  return properties.find((property) => {
    const candidate = property.name.trim().toLowerCase();
    return candidate === targetName || candidate.startsWith(targetName);
  });
}

export function getRentersForProperty(
  property: LandlordPropertyItem,
  renters: readonly LandlordRenter[],
): LandlordRenter[] {
  const targetName = property.name.trim().toLowerCase();
  return renters.filter((renter) => {
    if (renter.propertyId) return renter.propertyId === property.id;
    const renterProp = renter.propertyName.trim().toLowerCase();
    return renterProp === targetName || targetName.startsWith(renterProp);
  });
}

export function resolvePropertyDoors(
  property: LandlordPropertyItem,
  units: readonly PropertyUnit[],
  renters: readonly LandlordRenter[],
): ResolvedPropertyDoor[] {
  const propertyRenters = getRentersForProperty(property, renters);
  const rentersById = new Map(propertyRenters.map((renter) => [renter.id, renter]));
  const matchedRenterIds = new Set<string>();

  const doors: ResolvedPropertyDoor[] = units
    .filter((unit) => unit.propertyId === property.id)
    .map((unit) => {
      const renter = unit.renterId ? (rentersById.get(unit.renterId) ?? null) : null;
      if (renter) matchedRenterIds.add(renter.id);
      return { unit, renter };
    });

  for (const renter of propertyRenters) {
    if (matchedRenterIds.has(renter.id)) continue;
    doors.push({
      unit: {
        id: `unit-${property.id}-${renter.id}`,
        propertyId: property.id,
        unitNumber: renter.unitNumber,
        monthlyRentRwf: renter.monthlyRentRwf,
        status: "Occupied",
        renterId: renter.id,
      },
      renter,
    });
  }

  return doors;
}

export function summarizePropertyTenancies(
  property: LandlordPropertyItem,
  doors: readonly ResolvedPropertyDoor[],
  propertyRenters: readonly LandlordRenter[],
): PropertyTenancySummary {
  const attentionCount = propertyRenters.filter(
    (renter) =>
      renter.tenancyStatus === "Ending" ||
      renter.paymentStatus === "Pending" ||
      renter.paymentStatus === "Overdue",
  ).length;

  if (property.hasUnits) {
    const totalUnits = doors.length || property.totalUnits || 0;
    const occupiedUnits =
      doors.length > 0
        ? doors.filter((door) => door.unit.status === "Occupied" || door.renter !== null).length
        : (property.occupiedUnits ?? propertyRenters.length);
    const vacantUnits = Math.max(0, totalUnits - occupiedUnits);
    const activeRent = propertyRenters.reduce((sum, renter) => sum + renter.monthlyRentRwf, 0);
    const monthlyRentRwf =
      activeRent > 0 ? activeRent : (property.monthlyRevenueRwf ?? property.expectedMonthlyRentRwf ?? 0);

    return {
      totalUnits,
      occupiedUnits,
      vacantUnits,
      monthlyRentRwf,
      attentionCount,
    };
  }

  const activeLease = propertyRenters[0];
  const monthlyRentRwf =
    activeLease?.monthlyRentRwf ??
    property.expectedMonthlyRentRwf ??
    property.monthlyRevenueRwf ??
    0;

  return {
    totalUnits: 1,
    occupiedUnits: activeLease ? 1 : 0,
    vacantUnits: activeLease ? 0 : 1,
    monthlyRentRwf,
    attentionCount,
  };
}
