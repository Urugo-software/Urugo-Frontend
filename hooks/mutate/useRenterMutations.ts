import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import type { RenterMaintenance, RenterProfile } from "@/types/renter";

export function useCreateMaintenanceRequest() {
  const queryClient = useQueryClient();

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
      toast.success("Maintenance request submitted.");
      queryClient.invalidateQueries({ queryKey: ["renter-maintenance"] });
      queryClient.invalidateQueries({ queryKey: ["renter-overview"] });
      queryClient.invalidateQueries({ queryKey: ["renter-notifications"] });
    },
    onError: () => {
      toast.error("Unable to submit your maintenance request.");
    },
  });
}

export function usePayRent() {
  const queryClient = useQueryClient();

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
      toast.success("Rent payment recorded (preview mode). Receipt saved to Documents.");
      queryClient.invalidateQueries({ queryKey: ["renter-payments"] });
      queryClient.invalidateQueries({ queryKey: ["renter-documents"] });
      queryClient.invalidateQueries({ queryKey: ["renter-overview"] });
      queryClient.invalidateQueries({ queryKey: ["renter-notifications"] });
    },
    onError: () => {
      toast.error("Unable to submit payment. Please try again.");
    },
  });
}

export function useUpdateRenterProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: Partial<RenterProfile>) => {
      await new Promise((r) => setTimeout(r, 150));
      useRenterWorkspace.getState().updateProfile(data);
      return data;
    },
    onSuccess: () => {
      toast.success("Profile updated.");
      queryClient.invalidateQueries({ queryKey: ["renter-overview"] });
    },
    onError: () => {
      toast.error("Unable to update profile.");
    },
  });
}
