import { create } from "zustand";
import { persist } from "zustand/middleware";
import {
  mockLandlordProperties,
  mockLandlordPropertyGroups,
  mockPropertyUnits,
} from "@/data/landlord-data";
import type {
  LandlordPropertyItem,
  ListingStatus,
  PropertyGroup,
  PropertyMembershipChange,
  PropertyUnit,
} from "@/types/landlord";
import { createSafeId } from "@/utils/format";
import { applyMembershipChange } from "@/utils/property-groups";

type GroupDetails = Omit<PropertyGroup, "id">;
export type PropertyDetailsInput = Pick<
  LandlordPropertyItem,
  | "name"
  | "location"
  | "type"
  | "hasUnits"
  | "expectedMonthlyRentRwf"
  | "groupId"
  | "image"
  | "gallery"
  | "description"
  | "bedrooms"
  | "bathrooms"
  | "amenities"
  | "securityDepositRwf"
  | "availableFrom"
  | "listingStatus"
>;
type NewUnitInput = Omit<PropertyUnit, "id">;
type UnitChanges = Partial<Omit<PropertyUnit, "id" | "propertyId">>;

function syncPropertyUnitStats(
  properties: LandlordPropertyItem[],
  units: PropertyUnit[],
  propertyId: string,
): LandlordPropertyItem[] {
  const buildingUnits = units.filter((unit) => unit.propertyId === propertyId);
  const totalUnits = buildingUnits.length;
  const occupiedUnits = buildingUnits.filter(
    (unit) => unit.status === "Occupied" || Boolean(unit.renterId),
  ).length;
  const expected = buildingUnits.reduce((sum, u) => sum + u.monthlyRentRwf, 0);
  const status: LandlordPropertyItem["status"] =
    occupiedUnits === 0
      ? "Vacant"
      : occupiedUnits >= totalUnits
        ? "Occupied"
        : "Partial";

  return properties.map((property) =>
    property.id === propertyId && property.hasUnits
      ? {
          ...property,
          totalUnits,
          occupiedUnits,
          status,
          expectedMonthlyRentRwf: expected || property.expectedMonthlyRentRwf,
          monthlyRevenueRwf: expected || property.monthlyRevenueRwf,
        }
      : property,
  );
}

interface LandlordPropertiesStore {
  groups: PropertyGroup[];
  properties: LandlordPropertyItem[];
  units: PropertyUnit[];
  createGroup: (details: GroupDetails) => PropertyGroup;
  updateGroup: (id: string, changes: Partial<GroupDetails>) => void;
  deleteGroup: (id: string) => void;
  moveGroup: (id: string, targetId: string) => void;
  changeMembership: (
    change: PropertyMembershipChange,
  ) => { count: number } | { error: string };
  saveProperty: (
    details: PropertyDetailsInput,
    id?: string,
  ) => LandlordPropertyItem | undefined;
  updatePropertyListingStatus: (id: string, listingStatus: ListingStatus) => void;
  deleteProperty: (id: string) => void;
  addUnit: (details: NewUnitInput) => PropertyUnit;
  updateUnit: (
    id: string,
    changes: UnitChanges,
    fallbackPropertyId?: string,
  ) => void;
  deleteUnit: (id: string) => void;
  assignRenterToUnit: (
    propertyId: string,
    unitNumber: string,
    renterId: string,
  ) => void;
  vacateUnitByRenter: (renterId: string) => void;
}

export const useLandlordProperties = create<LandlordPropertiesStore>()(
  persist(
    (set, get) => ({
      groups: mockLandlordPropertyGroups,
      properties: mockLandlordProperties,
      units: mockPropertyUnits,

      createGroup: (details) => {
        const group = { ...details, id: createSafeId("group") };
        set(({ groups }) => ({ groups: [...groups, group] }));
        return group;
      },

      updateGroup: (id, changes) =>
        set(({ groups }) => ({
          groups: groups.map((g) => (g.id === id ? { ...g, ...changes } : g)),
        })),

      deleteGroup: (id) =>
        set(({ groups, properties }) => ({
          groups: groups.filter((g) => g.id !== id),
          properties: properties.map((p) =>
            p.groupId === id ? { ...p, groupId: null } : p,
          ),
        })),

      moveGroup: (id, targetId) =>
        set((state) => {
          const from = state.groups.findIndex((g) => g.id === id);
          const to = state.groups.findIndex((g) => g.id === targetId);
          if (from < 0 || to < 0 || from === to) return state;
          const groups = [...state.groups];
          const [group] = groups.splice(from, 1);
          groups.splice(to, 0, group);
          return { groups };
        }),

      changeMembership: (change) => {
        const { groups, properties } = get();
        const result = applyMembershipChange(groups, properties, change);
        if ("error" in result) return result;
        set({ properties: result.properties });
        return { count: result.count };
      },

      saveProperty: (details, id) => {
        const { groups, properties } = get();
        if (details.groupId && !groups.some((g) => g.id === details.groupId)) {
          return;
        }
        const existing = id ? properties.find((p) => p.id === id) : undefined;
        if (id && !existing) return;

        const rent = details.hasUnits
          ? existing?.expectedMonthlyRentRwf
          : details.expectedMonthlyRentRwf;

        const gallery =
          details.gallery && details.gallery.length > 0
            ? details.gallery
            : details.image
              ? [details.image]
              : existing?.gallery;

        const listingStatus =
          details.listingStatus ?? existing?.listingStatus ?? "Published";

        const property: LandlordPropertyItem = {
          ...existing,
          ...details,
          groupId: details.groupId || null,
          gallery,
          image: details.image ?? gallery?.[0],
          listingStatus,
          expectedMonthlyRentRwf: rent,
          monthlyRevenueRwf: details.hasUnits
            ? existing?.monthlyRevenueRwf
            : rent,
          status:
            listingStatus === "Rented"
              ? "Occupied"
              : (existing?.status ?? "Vacant"),
          viewsCount: existing?.viewsCount ?? 0,
          id: id ?? createSafeId("prop"),
        };

        set({
          properties: existing
            ? properties.map((item) => (item.id === id ? property : item))
            : [...properties, property],
        });
        return property;
      },

      updatePropertyListingStatus: (id, listingStatus) =>
        set(({ properties }) => ({
          properties: properties.map((p) => {
            if (p.id !== id) return p;
            const nextOccupancy = !p.hasUnits
              ? listingStatus === "Rented"
                ? "Occupied"
                : listingStatus === "Published"
                  ? "Vacant"
                  : p.status
              : p.status;
            return { ...p, listingStatus, status: nextOccupancy };
          }),
        })),

      deleteProperty: (id) =>
        set(({ properties, units }) => ({
          properties: properties.filter((p) => p.id !== id),
          units: units.filter((u) => u.propertyId !== id),
        })),

      addUnit: (details) => {
        const unit: PropertyUnit = { ...details, id: createSafeId("unit") };
        set(({ units, properties }) => {
          const nextUnits = [...units, unit];
          return {
            units: nextUnits,
            properties: syncPropertyUnitStats(
              properties,
              nextUnits,
              unit.propertyId,
            ),
          };
        });
        return unit;
      },

      updateUnit: (id, changes, fallbackPropertyId) =>
        set(({ units, properties }) => {
          const target = units.find((u) => u.id === id);
          if (!target) {
            if (!fallbackPropertyId || !changes.unitNumber) {
              return { units, properties };
            }
            const materialized: PropertyUnit = {
              id,
              propertyId: fallbackPropertyId,
              unitNumber: changes.unitNumber,
              floor: changes.floor,
              bedrooms: changes.bedrooms,
              bathrooms: changes.bathrooms,
              monthlyRentRwf: changes.monthlyRentRwf ?? 0,
              status: changes.status ?? "Occupied",
              renterId: changes.renterId ?? null,
              images: changes.images,
            };
            const nextUnits = [...units, materialized];
            return {
              units: nextUnits,
              properties: syncPropertyUnitStats(
                properties,
                nextUnits,
                fallbackPropertyId,
              ),
            };
          }
          const nextUnits = units.map((u) =>
            u.id === id ? { ...u, ...changes } : u,
          );
          return {
            units: nextUnits,
            properties: syncPropertyUnitStats(
              properties,
              nextUnits,
              target.propertyId,
            ),
          };
        }),

      deleteUnit: (id) =>
        set(({ units, properties }) => {
          const target = units.find((u) => u.id === id);
          if (!target) return { units, properties };
          const nextUnits = units.filter((u) => u.id !== id);
          return {
            units: nextUnits,
            properties: syncPropertyUnitStats(
              properties,
              nextUnits,
              target.propertyId,
            ),
          };
        }),

      assignRenterToUnit: (propertyId, unitNumber, renterId) =>
        set(({ units, properties }) => {
          const property = properties.find((p) => p.id === propertyId);
          if (!property) return { units, properties };
          if (!property.hasUnits) {
            return {
              units,
              properties: properties.map((p) =>
                p.id === propertyId
                  ? { ...p, status: "Occupied", listingStatus: "Rented" }
                  : p,
              ),
            };
          }
          const matched = units.find(
            (u) =>
              u.propertyId === propertyId &&
              u.unitNumber.toLowerCase() === unitNumber.trim().toLowerCase(),
          );
          if (!matched) return { units, properties };
          const nextUnits = units.map((u) =>
            u.id === matched.id
              ? { ...u, status: "Occupied" as const, renterId }
              : u,
          );
          return {
            units: nextUnits,
            properties: syncPropertyUnitStats(properties, nextUnits, propertyId),
          };
        }),

      vacateUnitByRenter: (renterId) =>
        set(({ units, properties }) => {
          const target = units.find((u) => u.renterId === renterId);
          if (!target) return { units, properties };
          const nextUnits = units.map((u) =>
            u.id === target.id
              ? { ...u, status: "Vacant" as const, renterId: null }
              : u,
          );
          return {
            units: nextUnits,
            properties: syncPropertyUnitStats(
              properties,
              nextUnits,
              target.propertyId,
            ),
          };
        }),
    }),
    {
      name: "urugo-landlord-properties",
      skipHydration: true,
    },
  ),
);
