import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export function useCreateMaintenanceRequest() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      title: string;
      category: string;
      description: string;
      priority: string;
    }) => {
      await new Promise((r) => setTimeout(r, 200));
      return data;
    },
    onSuccess: () => {
      toast.success("Maintenance request submitted successfully.");
      queryClient.invalidateQueries({ queryKey: ["renter-maintenance"] });
      queryClient.invalidateQueries({ queryKey: ["renter-overview"] });
    },
    onError: () => {
      toast.error("Unable to submit maintenance request.");
    },
  });
}

export function usePayRent() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: {
      paymentMethod: string;
      phone: string;
      amountRwf: number;
    }) => {
      await new Promise((r) => setTimeout(r, 300));
      return data;
    },
    onSuccess: () => {
      toast.success("Rent payment initiated successfully!");
      queryClient.invalidateQueries({ queryKey: ["renter-payments"] });
      queryClient.invalidateQueries({ queryKey: ["renter-overview"] });
    },
    onError: () => {
      toast.error("Payment failed. Please try again.");
    },
  });
}

export function useUpdateRenterProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: { name: string; email: string; phone: string }) => {
      await new Promise((r) => setTimeout(r, 200));
      return data;
    },
    onSuccess: () => {
      toast.success("Profile updated successfully.");
      queryClient.invalidateQueries({ queryKey: ["renter-overview"] });
    },
    onError: () => {
      toast.error("Unable to update profile.");
    },
  });
}
