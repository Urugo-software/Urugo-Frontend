export interface HeaderNotificationPreviewItem {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  isUnread: boolean;
  categoryLabel: string;
  href: string;
}

export interface DashboardNotificationsDropdownProps {
  pathname: string;
}
