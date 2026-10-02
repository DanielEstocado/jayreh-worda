// Something that happened that the user should know about, shown behind the bell.
export type AppNotification = {
  id: number;
  text: string;
  // ISO timestamp with offset.
  createdAt: string;
  read: boolean;
};

// A message sent to the user, shown behind the mail icon.
export type InboxMessage = {
  id: number;
  from: string;
  preview: string;
  createdAt: string;
  read: boolean;
};
