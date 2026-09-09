import { mockLandlordContact, mockInitialMessages } from "@/data/messages-data";
import { ChatMessage } from "@/types/messages";

const delay = (ms = 150) => new Promise((res) => setTimeout(res, ms));

const messageStore = [...mockInitialMessages];

export async function fetchLandlordMessages() {
  await delay();
  return {
    contact: mockLandlordContact,
    messages: messageStore,
  };
}

export async function sendRenterMessage(text: string): Promise<ChatMessage> {
  await delay(100);
  const newMsg: ChatMessage = {
    id: `msg-${Date.now()}`,
    senderId: "renter-1",
    senderName: "Jean Claude",
    senderRole: "renter",
    text,
    timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
  };
  messageStore.push(newMsg);
  return newMsg;
}
