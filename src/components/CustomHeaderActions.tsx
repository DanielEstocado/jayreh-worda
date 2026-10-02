import { useState } from "react";
import { Bell, Mail, type LucideIcon } from "lucide-react";
import { formatPostDateTime } from "@/lib/post";
import { cn } from "@/lib/cn";
import useStore from "@/zustand/store/store";
import CustomDialog from "./ui/CustomDialog";

type Panel = "notifications" | "messages";

type IconButtonProps = { icon: LucideIcon; label: string; unread: number; onClick: () => void };

// A circular header button with a pink badge showing how many items are unread.
const IconButton = ({ icon: Icon, label, unread, onClick }: IconButtonProps) => {
  return (
    <button
      type="button"
      aria-label={unread > 0 ? `${label}, ${unread} unread` : label}
      onClick={onClick}
      className="relative flex h-10 w-10 cursor-pointer items-center justify-center rounded-full border border-border bg-card text-foreground/80 transition hover:bg-muted"
    >
      <Icon size={18} />
      {unread > 0 && (
        <span className="title absolute -top-1 -right-1 flex h-[18px] min-w-[18px] items-center justify-center rounded-full bg-primary px-1 text-[10px] leading-none font-bold text-primary-foreground">
          {unread}
        </span>
      )}
    </button>
  );
};

// The notification bell and mail icon on the right of the page header, each opens a dialog listing its items and marks them read when closed.
const CustomHeaderActions = () => {
  const notifications = useStore((s) => s.notifications);
  const messages = useStore((s) => s.messages);
  const markNotificationsRead = useStore((s) => s.markNotificationsRead);
  const markMessagesRead = useStore((s) => s.markMessagesRead);
  const [open, setOpen] = useState<Panel | null>(null);

  // Closes the open dialog and marks what was in it as read.
  const handleClose = () => {
    if (open === "notifications") markNotificationsRead();
    if (open === "messages") markMessagesRead();
    setOpen(null);
  };

  const rows =
    open === "messages"
      ? messages.map((m) => ({ id: m.id, title: m.from, text: m.preview, createdAt: m.createdAt, read: m.read }))
      : notifications.map((n) => ({ id: n.id, title: undefined, text: n.text, createdAt: n.createdAt, read: n.read }));

  return (
    <div className="ml-auto flex items-center gap-1.5">
      <IconButton
        icon={Bell}
        label="Notifications"
        unread={notifications.filter((n) => !n.read).length}
        onClick={() => setOpen("notifications")}
      />
      <IconButton
        icon={Mail}
        label="Messages"
        unread={messages.filter((m) => !m.read).length}
        onClick={() => setOpen("messages")}
      />

      <CustomDialog open={open !== null} onClose={handleClose} title={open === "messages" ? "Messages" : "Notifications"}>
        <ul className="max-h-80 divide-y divide-border overflow-y-auto rounded-xl border border-border">
          {rows.map((row) => (
            <li key={row.id} className={cn("flex gap-2.5 px-sm py-2", !row.read && "bg-primary/5")}>
              <span className={cn("mt-1.5 h-2 w-2 shrink-0 rounded-full", row.read ? "bg-transparent" : "bg-primary")} />
              <div className="min-w-0">
                {row.title && <p className="title text-body font-semibold text-foreground">{row.title}</p>}
                <p className="subtitle text-body text-foreground/80">{row.text}</p>
                <p className="subtitle mt-0.5 text-caption text-muted-foreground">{formatPostDateTime(row.createdAt)}</p>
              </div>
            </li>
          ))}
        </ul>
      </CustomDialog>
    </div>
  );
};

export default CustomHeaderActions;
