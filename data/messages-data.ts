import { ChatMessage, ConversationContact } from "@/types/messages";

export const mockLandlordContact: ConversationContact = {
  id: "landlord-1",
  name: "Emmanuel Ntaganda",
  role: "Landlord",
  property: "Kimironko Heights",
  unit: "Apartment A-03",
  phone: "+250 788 123 456",
  online: true,
};

export const mockInitialMessages: ChatMessage[] = [
  {
    id: "msg-1",
    senderId: "landlord-1",
    senderName: "Emmanuel Ntaganda",
    senderRole: "landlord",
    text: "Hello Jean, just confirming the electricity sub-meter reading for September has been recorded.",
    timestamp: "10:15 AM",
  },
  {
    id: "msg-2",
    senderId: "renter-1",
    senderName: "Jean Claude",
    senderRole: "renter",
    text: "Thank you Emmanuel! Also, I submitted a quick maintenance request regarding the bathroom tap.",
    timestamp: "10:18 AM",
  },
  {
    id: "msg-3",
    senderId: "landlord-1",
    senderName: "Emmanuel Ntaganda",
    senderRole: "landlord",
    text: "Got it! Our technician will visit tomorrow around 2:00 PM to inspect it.",
    timestamp: "10:25 AM",
  },
];
