import { useState } from "react";
import { Bell, type LucideIcon, Mail } from "lucide-react";
import { useMarkInboxRead } from "@/services/mutations/inbox";
import { useInbox } from "@/services/queries/inbox";
import { cn } from "@/lib/cn";
import { formatPostDateTime } from "@/lib/post";
import type { AppNotification, InboxMessage } from "@/types/inbox";
import CustomDialog from "./ui/CustomDialog";

type Panel = "notifications" | "messages";

// A notification or a message in the one shape the dialog list shows, a message also has a sender as its title.
type InboxRowData = {
  id: number;
  title?: string;
  text: string;
  createdAt: string;
  read: boolean;
};

type IconButtonProps = {
  icon: LucideIcon;
  label: string;
  unread: number;
  onClick: () => void;
};

type InboxRowProps = { row: InboxRowData };

// Turns the notifications or the messages into rows of the same shape so one list can show either.
function buildRows(
  panel: Panel,
  notifications: AppNotification[],
  messages: InboxMessage[],
): InboxRowData[] {
  if (panel === "messages") {
    return messages.map((m) => ({
      id: m.id,
      title: m.from,
      text: m.preview,
      createdAt: m.createdAt,
      read: m.read,
    }));
  }

  return notifications.map((n) => ({
    id: n.id,
    text: n.text,
    createdAt: n.createdAt,
    read: n.read,
  }));
}

// A circular header button with a pink badge showing how many items are unread.
function IconButton({ icon: Icon, label, unread, onClick }: IconButtonProps) {
  return (
    <button
      type="button"
      aria-label={unread > 0 ? `${label}, ${unread} unread` : label}
      onClick={onClick}
      className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground/80 transition hover:bg-muted"
    >
      <Icon size={18} />
      {unread > 0 && (
        <span className="title absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-micro leading-none font-bold text-primary-foreground">
          {unread}
        </span>
      )}
    </button>
  );
}

// One line in the dialog: an unread dot, the sender when there is one, the text and when it came.
function InboxRow({ row }: InboxRowProps) {
  return (
    <li className={cn("flex gap-2.5 px-sm py-2", !row.read && "bg-primary/5")}>
      <span
        className={cn(
          "mt-1.5 h-2 w-2 shrink-0 rounded-full",
          row.read ? "bg-transparent" : "bg-primary",
        )}
      />
      <div className="min-w-0">
        {row.title && (
          <p className="title text-body font-semibold text-foreground">
            {row.title}
          </p>
        )}
        <p className="subtitle text-body text-foreground/80">{row.text}</p>
        <p className="subtitle mt-0.5 text-caption text-muted-foreground">
          {formatPostDateTime(row.createdAt)}
        </p>
      </div>
    </li>
  );
}

// The notification bell and mail icon on the right of the page header, each opens a dialog listing its items and marks them read when closed.
export default function CustomHeaderActions() {
  const { notifications, messages, unreadNotifications, unreadMessages } =
    useInbox();
  const { markNotificationsRead, markMessagesRead } = useMarkInboxRead();
  const [open, setOpen] = useState<Panel | null>(null);

  const rows = buildRows(open ?? "notifications", notifications, messages);

  // Opens the notifications dialog.
  const handleOpenNotifications = () => setOpen("notifications");

  // Opens the messages dialog.
  const handleOpenMessages = () => setOpen("messages");

  // Closes the open dialog and marks what was in it as read.
  const handleClose = () => {
    if (open === "notifications") markNotificationsRead();
    if (open === "messages") markMessagesRead();
    setOpen(null);
  };

  return (
    <div className="ml-auto flex items-center gap-1.5">
      <IconButton
        icon={Bell}
        label="Notifications"
        unread={unreadNotifications}
        onClick={handleOpenNotifications}
      />
      <IconButton
        icon={Mail}
        label="Messages"
        unread={unreadMessages}
        onClick={handleOpenMessages}
      />

      <CustomDialog
        open={open !== null}
        onClose={handleClose}
        title={open === "messages" ? "Messages" : "Notifications"}
      >
        <ul className="max-h-80 divide-y divide-border overflow-y-auto rounded-xl border border-border">
          {rows.map((row) => (
            <InboxRow key={row.id} row={row} />
          ))}
        </ul>
      </CustomDialog>
    </div>
  );
}
