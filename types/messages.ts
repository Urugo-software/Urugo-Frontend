export interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderRole: "renter" | "landlord";
  text: string;
  timestamp: string;
}

export interface ConversationContact {
  id: string;
  name: string;
  role: string;
  property: string;
  unit: string;
  phone: string;
  online: boolean;
}
