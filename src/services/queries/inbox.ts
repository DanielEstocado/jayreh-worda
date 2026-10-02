import useStore from "@/zustand/store/store";

// Returns the bell's notifications and the mail icon's messages with their unread counts.
export function useInbox() {
  const notifications = useStore((s) => s.notifications);
  const messages = useStore((s) => s.messages);

  return {
    notifications,
    messages,
    unreadNotifications: notifications.filter((n) => !n.read).length,
    unreadMessages: messages.filter((m) => !m.read).length,
  };
}
