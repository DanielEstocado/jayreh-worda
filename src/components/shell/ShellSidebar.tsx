import { Link, NavLink } from "react-router-dom";
import { useCurrentUser } from "@/services/queries/user";
import { NAV_ITEMS, type NavItem } from "@/constants/navigation";
import { cn } from "@/lib/cn";
import CustomAvatar from "../ui/CustomAvatar";

type SidebarItemProps = { item: NavItem };

const LOGO_LETTERS = [
  { char: "W", color: "text-blue-500" },
  { char: "O", color: "text-yellow-400" },
  { char: "R", color: "text-red-500" },
  { char: "D", color: "text-green-500" },
  { char: "A", color: "text-foreground" },
];

const ROW_BASE =
  "group title flex items-center gap-sm rounded-2xl p-1.5 pr-sm text-body font-medium transition";

// The W.O.R.D.A wordmark, each letter and its trailing dot in its own color, linking home.
function Logo() {
  return (
    <Link
      to="/home"
      aria-label="W.O.R.D.A home"
      className="title flex h-16 items-center border-b border-border px-sm text-h2 font-extrabold tracking-tight"
    >
      {LOGO_LETTERS.map(({ char, color }) => (
        <span key={char} className={color}>
          {char}.
        </span>
      ))}
    </Link>
  );
}

// One sidebar row: a link with an icon tile, or a plain visual-only row when the item has no path yet.
function SidebarItem({ item }: SidebarItemProps) {
  const { label, path, icon: Icon } = item;

  if (!path) {
    return (
      <div className={cn(ROW_BASE, "cursor-default text-muted-foreground")}>
        <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted">
          <Icon size={18} />
        </span>
        {label}
      </div>
    );
  }

  return (
    <NavLink
      to={path}
      className={({ isActive }) =>
        cn(
          ROW_BASE,
          "hover:bg-muted",
          isActive ? "text-foreground" : "text-muted-foreground",
        )
      }
    >
      {({ isActive }) => (
        <>
          <span
            className={cn(
              "flex h-9 w-9 shrink-0 items-center justify-center rounded-xl transition",
              isActive
                ? "bg-primary text-primary-foreground shadow-sm"
                : "bg-muted text-muted-foreground group-hover:bg-card",
            )}
          >
            <Icon size={18} />
          </span>
          {label}
        </>
      )}
    </NavLink>
  );
}

// The signed-in user's avatar and name at the bottom of the sidebar, linking to their profile.
function AccountLink() {
  const user = useCurrentUser();
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <Link
      to="/profile"
      className="flex items-center gap-sm border-t border-border p-sm transition hover:bg-muted"
    >
      <CustomAvatar name={fullName} src={user.avatarUrl} />
      <span className="min-w-0">
        <span className="title block truncate text-body font-semibold">
          {fullName}
        </span>
        <span className="subtitle block text-caption text-muted-foreground">
          View profile
        </span>
      </span>
    </Link>
  );
}

// The outlined sidebar beside the content on desktop: the logo, the navigation and the account row.
export default function ShellSidebar() {
  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 self-start border-l border-border bg-card lg:block">
      <div className="flex h-full flex-col justify-between overflow-y-auto">
        <div>
          <Logo />

          <nav className="flex flex-col gap-1 p-sm">
            {NAV_ITEMS.map((item) => (
              <SidebarItem key={item.id} item={item} />
            ))}
          </nav>
        </div>

        <AccountLink />
      </div>
    </aside>
  );
}
