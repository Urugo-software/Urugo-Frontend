import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendRenterMessage } from "@/api/messages.api";

export function useSendMessage() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: sendRenterMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["landlord-messages"] });
    },
  });
}
