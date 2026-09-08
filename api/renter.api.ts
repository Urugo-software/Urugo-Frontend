import {
  mockRenterProfile,
  mockRenterProperty,
  mockRenterPayments,
  mockRenterElectricity,
} from "@/data/renter-data";
import {
  mockRenterMaintenance,
  mockRenterDocuments,
  mockRenterNotifications,
} from "@/data/renter-extra-data";

const delay = (ms = 150) => new Promise((res) => setTimeout(res, ms));

export async function fetchRenterOverview() {
  await delay();
  return {
    profile: mockRenterProfile,
    property: mockRenterProperty,
    nextPayment: mockRenterPayments[0],
    electricity: mockRenterElectricity,
    maintenanceCount: mockRenterMaintenance.filter(
      (m) => m.status !== "Resolved"
    ).length,
  };
}

export async function fetchRenterProperty() {
  await delay();
  return mockRenterProperty;
}

export async function fetchRenterPayments() {
  await delay();
  return mockRenterPayments;
}

export async function fetchRenterElectricity() {
  await delay();
  return mockRenterElectricity;
}

export async function fetchRenterMaintenance() {
  await delay();
  return mockRenterMaintenance;
}

export async function fetchRenterDocuments() {
  await delay();
  return mockRenterDocuments;
}

export async function fetchRenterNotifications() {
  await delay();
  return mockRenterNotifications;
}
