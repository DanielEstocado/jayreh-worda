import useStore from "@/zustand/store/store";

// Returns the functions that mark every notification, or every message, as read.
export function useMarkInboxRead() {
  const markNotificationsRead = useStore((s) => s.markNotificationsRead);
  const markMessagesRead = useStore((s) => s.markMessagesRead);

  return { markNotificationsRead, markMessagesRead };
}
