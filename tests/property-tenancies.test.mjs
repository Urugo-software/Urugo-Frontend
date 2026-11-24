import assert from "node:assert/strict";
import test from "node:test";
import {
  findPropertyForRenter,
  getRentersForProperty,
  resolvePropertyDoors,
  summarizePropertyTenancies,
} from "../utils/property-tenancies.ts";

const properties = [
  {
    id: "prop-101",
    name: "Kimironko Heights",
    location: "Kimironko, Gasabo, Kigali",
    image: "/assets/home/prop1.jpg",
    totalUnits: 3,
    occupiedUnits: 2,
    monthlyRevenueRwf: 330000,
    type: "APARTMENT",
    hasUnits: true,
  },
  {
    id: "prop-103",
    name: "Kabeza Modern Estate",
    location: "Kabeza, Kicukiro, Kigali",
    image: "/assets/home/prop3.jpg",
    expectedMonthlyRentRwf: 200000,
    type: "HOUSE",
    hasUnits: false,
  },
  {
    id: "prop-104",
    name: "Remera Family Home",
    location: "Remera, Gasabo, Kigali",
    expectedMonthlyRentRwf: 250000,
    type: "HOUSE",
    hasUnits: false,
  },
];

const renters = [
  {
    id: "r-101",
    propertyId: "prop-101",
    name: "Jean Claude",
    isIdentityVerified: true,
    propertyName: "Kimironko Heights",
    unitNumber: "A-01",
    tenancyStatus: "Active",
    monthlyRentRwf: 150000,
    paymentStatus: "Pending",
    startDate: "15 Jan 2024",
    phone: "+250 788 123 456",
  },
  {
    id: "r-102",
    propertyId: "prop-101",
    name: "Grace Ingabire",
    isIdentityVerified: true,
    propertyName: "Kimironko Heights",
    unitNumber: "A-02",
    tenancyStatus: "Ending",
    monthlyRentRwf: 180000,
    paymentStatus: "Paid",
    startDate: "01 May 2023",
    phone: "+250 789 778 899",
  },
  {
    id: "r-103",
    name: "Divine Uwase",
    isIdentityVerified: true,
    propertyName: "Kabeza Modern",
    unitNumber: "House 4",
    tenancyStatus: "Active",
    monthlyRentRwf: 200000,
    paymentStatus: "Paid",
    startDate: "10 Oct 2024",
    phone: "+250 789 112 233",
  },
];

const units = [
  {
    id: "u-1",
    propertyId: "prop-101",
    unitNumber: "A-01",
    floor: "Ground Floor",
    monthlyRentRwf: 150000,
    status: "Occupied",
    renterId: "r-101",
  },
  {
    id: "u-3",
    propertyId: "prop-101",
    unitNumber: "A-03",
    floor: "1st Floor",
    monthlyRentRwf: 160000,
    status: "Vacant",
    renterId: null,
  },
];

test("finds matching property by propertyId and falls back to prefix propertyName match", () => {
  assert.equal(findPropertyForRenter(renters[0], properties)?.id, "prop-101");
  assert.equal(findPropertyForRenter(renters[2], properties)?.id, "prop-103");
});

test("resolves all multi-unit doors including vacant doors and renters without explicit unit rows", () => {
  const doors = resolvePropertyDoors(properties[0], units, renters);
  assert.equal(doors.length, 3);
  assert.equal(doors[0].unit.unitNumber, "A-01");
  assert.equal(doors[0].renter?.id, "r-101");
  assert.equal(doors[1].unit.unitNumber, "A-03");
  assert.equal(doors[1].renter, null);
  assert.equal(doors[2].unit.unitNumber, "A-02");
  assert.equal(doors[2].renter?.id, "r-102");
});

test("summarizes occupancy, monthly rent, and attention items for multi-unit and single-unit homes", () => {
  const prop101Renters = getRentersForProperty(properties[0], renters);
  const prop101Doors = resolvePropertyDoors(properties[0], units, renters);
  const multiSummary = summarizePropertyTenancies(properties[0], prop101Doors, prop101Renters);
  assert.deepEqual(multiSummary, {
    totalUnits: 3,
    occupiedUnits: 2,
    vacantUnits: 1,
    monthlyRentRwf: 330000,
    attentionCount: 2,
  });

  const prop103Renters = getRentersForProperty(properties[1], renters);
  const singleOccupied = summarizePropertyTenancies(properties[1], [], prop103Renters);
  assert.deepEqual(singleOccupied, {
    totalUnits: 1,
    occupiedUnits: 1,
    vacantUnits: 0,
    monthlyRentRwf: 200000,
    attentionCount: 0,
  });

  const singleVacant = summarizePropertyTenancies(properties[2], [], []);
  assert.deepEqual(singleVacant, {
    totalUnits: 1,
    occupiedUnits: 0,
    vacantUnits: 1,
    monthlyRentRwf: 250000,
    attentionCount: 0,
  });
});
