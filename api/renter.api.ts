import { useRenterWorkspace } from "@/store/renter-workspace.store";
import { summarizeRenterPayments } from "@/utils/renter-helpers";

const delay = (ms = 60) => new Promise((res) => setTimeout(res, ms));

export async function fetchRenterOverview() {
  await delay();
  const state = useRenterWorkspace.getState();
  const { pendingPayment } = summarizeRenterPayments(state.payments);

  return {
    profile: state.profile,
    property: state.property,
    nextPayment: pendingPayment ?? state.payments[0],
    maintenanceCount: state.maintenance.filter(
      (m) => m.status === "Pending" || m.status === "In Progress",
    ).length,
  };
}

export async function fetchRenterProperty() {
  await delay();
  return useRenterWorkspace.getState().property;
}

export async function fetchRenterPayments() {
  await delay();
  return useRenterWorkspace.getState().payments;
}

export async function fetchRenterMaintenance() {
  await delay();
  return useRenterWorkspace.getState().maintenance;
}

export async function fetchRenterDocuments() {
  await delay();
  return useRenterWorkspace.getState().documents;
}

export async function fetchRenterNotifications() {
  await delay();
  return useRenterWorkspace.getState().notifications;
}

export async function fetchRenterLease() {
  await delay();
  return useRenterWorkspace.getState().lease;
}
