import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import toast from "react-hot-toast";

import { useRenterWorkspace } from "@/store/renter-workspace.store";
import type { RenterMaintenance, RenterProfile } from "@/types/renter";

export function useCreateMaintenanceRequest() {
  const queryClient = useQueryClient();
  const t = useTranslations("renter.toasts");

  return useMutation({
    mutationFn: async (data: {
      title: string;
      category: string;
      description: string;
      priority: RenterMaintenance["priority"];
    }) => {
      await new Promise((r) => setTimeout(r, 150));
      return useRenterWorkspace.getState().addMaintenanceRequest(data);
    },
    onSuccess: () => {
      toast.success(t("maintenanceSubmitted"));
      queryClient.invalidateQueries({ queryKey: ["renter-maintenance"] });
      queryClient.invalidateQueries({ queryKey: ["renter-overview"] });
      queryClient.invalidateQueries({ queryKey: ["renter-notifications"] });
    },
    onError: () => {
      toast.error(t("maintenanceFailed"));
    },
  });
}

export function usePayRent() {
  const queryClient = useQueryClient();
  const t = useTranslations("renter.toasts");

  return useMutation({
    mutationFn: async (data: {
      paymentId?: string;
      paymentMethod: string;
      phone?: string;
      amountRwf: number;
      referenceNumber?: string;
      receiptName?: string;
      period?: string;
    }) => {
      await new Promise((r) => setTimeout(r, 200));
      return useRenterWorkspace.getState().recordRentPayment(data);
    },
    onSuccess: () => {
      toast.success(t("paymentRecorded"));
      queryClient.invalidateQueries({ queryKey: ["renter-payments"] });
      queryClient.invalidateQueries({ queryKey: ["renter-documents"] });
      queryClient.invalidateQueries({ queryKey: ["renter-overview"] });
      queryClient.invalidateQueries({ queryKey: ["renter-notifications"] });
    },
    onError: () => {
      toast.error(t("paymentFailed"));
    },
  });
}

export function useUpdateRenterProfile() {
  const queryClient = useQueryClient();
  const t = useTranslations("renter.toasts");

  return useMutation({
    mutationFn: async (data: Partial<RenterProfile>) => {
      await new Promise((r) => setTimeout(r, 150));
      useRenterWorkspace.getState().updateProfile(data);
      return data;
    },
    onSuccess: () => {
      toast.success(t("profileUpdated"));
      queryClient.invalidateQueries({ queryKey: ["renter-overview"] });
    },
    onError: () => {
      toast.error(t("profileFailed"));
    },
  });
}
