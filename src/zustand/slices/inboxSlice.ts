import type { StateCreator } from "zustand";
import { MOCK_MESSAGES, MOCK_NOTIFICATIONS } from "@/constants/inbox";
import type { AppNotification, InboxMessage } from "@/types/inbox";
import type { AppState } from "../store/store";

export type InboxSlice = {
  notifications: AppNotification[];
  messages: InboxMessage[];
  markNotificationsRead: () => void;
  markMessagesRead: () => void;
};

// The bell's notifications and the mail icon's messages with their read state, global so the header badge always matches.
export const createInboxSlice: StateCreator<AppState, [], [], InboxSlice> = (
  set,
) => ({
  notifications: MOCK_NOTIFICATIONS,
  messages: MOCK_MESSAGES,

  // Marks every notification as read, done when the user closes the list.
  markNotificationsRead: () =>
    set((state) => ({
      notifications: state.notifications.map((n) => ({ ...n, read: true })),
    })),

  // Marks every message as read, done when the user closes the list.
  markMessagesRead: () =>
    set((state) => ({
      messages: state.messages.map((m) => ({ ...m, read: true })),
    })),
});
