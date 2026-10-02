import type { AppNotification, InboxMessage } from "@/types/inbox";

// MOCK: notifications behind the bell, delete once the API returns them.
export const MOCK_NOTIFICATIONS: AppNotification[] = [
  { id: 1, text: "Paolo Ramos liked your post \"Group A just finished Module 1\".", createdAt: "2026-10-02T08:10:00+08:00", read: false },
  { id: 2, text: "King Ezekiel Domingo marked Module 1 Lesson 1 done for you.", createdAt: "2026-10-01T19:30:00+08:00", read: false },
  { id: 3, text: "CLDP is open, the next course is ready for you.", createdAt: "2026-09-30T09:00:00+08:00", read: false },
  { id: 4, text: "Grace Mendoza posted in the Relationship department.", createdAt: "2026-09-26T20:15:00+08:00", read: true },
];

// MOCK: messages behind the mail icon, delete once the API returns them.
export const MOCK_MESSAGES: InboxMessage[] = [
  { id: 1, from: "King Ezekiel Domingo", preview: "See you Sunday after service, bring your notes.", createdAt: "2026-10-02T07:45:00+08:00", read: false },
  { id: 2, from: "Maria Santos", preview: "Thank you for today's session, I finished Lesson 3!", createdAt: "2026-10-01T21:05:00+08:00", read: false },
  { id: 3, from: "Darwin Abarientos", preview: "Can I join your group's Saturday meetup?", createdAt: "2026-09-28T16:20:00+08:00", read: true },
];
