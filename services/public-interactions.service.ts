import {
  askPublicAssistant as requestAssistantReply,
  subscribeNewsletter as requestNewsletterSubscription,
  submitPropertyInquiry as requestPropertyInquiry,
  submitPublicViewingRequest as requestViewingRequest,
} from "@/api/property.api";
import type { PublicAssistantHistoryMessage } from "@/api/property.api";

export function submitPropertyInquiry(
  propertyId: string,
  values: { name: string; phone: string; email: string; message: string },
) {
  return requestPropertyInquiry(propertyId, {
    name: values.name.trim(),
    phone: values.phone.trim(),
    email: values.email.trim(),
    message: values.message.trim(),
  });
}

export function submitPublicViewingRequest(
  propertyId: string,
  values: {
    name: string;
    phone: string;
    email: string;
    preferredDate: string;
    preferredTime: string;
    note: string;
  },
) {
  return requestViewingRequest(propertyId, {
    name: values.name.trim(),
    phone: values.phone.trim(),
    email: values.email.trim(),
    preferredDate: values.preferredDate,
    preferredTime: values.preferredTime,
    note: values.note.trim() || undefined,
  });
}

export function subscribeToNewsletter(email: string) {
  return requestNewsletterSubscription(email.trim());
}

export function toPublicAssistantHistory(
  messages: readonly PublicAssistantHistoryMessage[],
): PublicAssistantHistoryMessage[] {
  return messages
    .slice(-10)
    .map(({ role, content }) => ({ role, content: content.trim().slice(0, 500) }))
    .filter(({ content }) => content.length > 0);
}

export function sendPublicAssistantMessage(
  message: string,
  conversationHistory: readonly PublicAssistantHistoryMessage[] = [],
) {
  return requestAssistantReply(message, toPublicAssistantHistory(conversationHistory));
}
