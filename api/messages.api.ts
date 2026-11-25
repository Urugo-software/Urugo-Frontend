import { mockLandlordContact } from "@/data/messages-data";
import { useRenterWorkspace } from "@/store/renter-workspace.store";
import type { ChatMessage } from "@/types/messages";

const delay = (ms = 60) => new Promise((res) => setTimeout(res, ms));

export async function fetchLandlordMessages() {
  await delay();
  const state = useRenterWorkspace.getState();
  return {
    contact: {
      ...mockLandlordContact,
      name: state.property.landlordName,
      phone: state.property.landlordPhone,
      email: state.property.email,
      property: state.lease.propertyName,
      unit: `Apartment ${state.property.unitNumber}`,
    },
    messages: state.messages,
  };
}

export async function sendRenterMessage(text: string): Promise<ChatMessage> {
  await delay(80);
  return useRenterWorkspace.getState().sendMessage(text);
}
