import { NavLink } from "react-router-dom";
import { NAV_ITEMS } from "@/constants/navigation";
import { cn } from "@/lib/cn";

// Only the entries that go somewhere belong in the dock.
const DOCK_ITEMS = NAV_ITEMS.filter((item) => item.path);

// The floating icon-only navigation on mobile, each link keeps its label as an aria-label and tooltip.
export default function ShellDock() {
  return (
    <nav className="fixed inset-x-3 bottom-3 z-20 flex gap-1 rounded-2xl border border-border bg-card/90 p-1.5 shadow-lg backdrop-blur lg:hidden">
      {DOCK_ITEMS.map(({ id, label, path, icon: Icon }) => (
        <NavLink
          key={id}
          to={path!}
          aria-label={label}
          title={label}
          className={({ isActive }) =>
            cn(
              "flex flex-1 items-center justify-center rounded-xl py-3 transition",
              isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground",
            )
          }
        >
          <Icon size={22} />
        </NavLink>
      ))}
    </nav>
  );
}
