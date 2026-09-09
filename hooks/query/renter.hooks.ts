import { useQuery } from "@tanstack/react-query";
import {
  fetchRenterOverview,
  fetchRenterProperty,
  fetchRenterPayments,
  fetchRenterElectricity,
  fetchRenterMaintenance,
  fetchRenterDocuments,
  fetchRenterNotifications,
  fetchRenterLease,
} from "@/api/renter.api";

export function useRenterOverview() {
  return useQuery({
    queryKey: ["renter-overview"],
    queryFn: fetchRenterOverview,
  });
}

export function useRenterProperty() {
  return useQuery({
    queryKey: ["renter-property"],
    queryFn: fetchRenterProperty,
  });
}

export function useRenterPayments() {
  return useQuery({
    queryKey: ["renter-payments"],
    queryFn: fetchRenterPayments,
  });
}

export function useRenterElectricity() {
  return useQuery({
    queryKey: ["renter-electricity"],
    queryFn: fetchRenterElectricity,
  });
}

export function useRenterMaintenance() {
  return useQuery({
    queryKey: ["renter-maintenance"],
    queryFn: fetchRenterMaintenance,
  });
}

export function useRenterDocuments() {
  return useQuery({
    queryKey: ["renter-documents"],
    queryFn: fetchRenterDocuments,
  });
}

export function useRenterNotifications() {
  return useQuery({
    queryKey: ["renter-notifications"],
    queryFn: fetchRenterNotifications,
  });
}

export function useRenterLease() {
  return useQuery({
    queryKey: ["renter-lease"],
    queryFn: fetchRenterLease,
  });
}
