import { type ReactNode } from "react";
import { Link, NavLink } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { NAV_ITEMS } from "@/constants/navigation";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { usePromos } from "@/hooks/usePromos";
import { cn } from "@/lib/cn";
import CustomHeaderActions from "../CustomHeaderActions";
import CustomAvatar from "./CustomAvatar";
import CustomPromoCard from "./CustomPromoCard";

type CustomAppShellProps = {
  title: string;
  // When set, a back arrow before the title links here.
  backTo?: string;
  children: ReactNode;
};

const LOGO_LETTERS = [
  { char: "W", color: "text-blue-500" },
  { char: "O", color: "text-yellow-400" },
  { char: "R", color: "text-red-500" },
  { char: "D", color: "text-green-500" },
  { char: "A", color: "text-foreground" },
];

const ROW_BASE =
  "group title flex items-center gap-sm rounded-2xl p-1.5 pr-sm text-body font-medium transition";

// The frame every signed-in screen sits in: an outlined sidebar beside the content on desktop, a floating dock on mobile, and a sticky title over the content column.
const CustomAppShell = ({ title, backTo, children }: CustomAppShellProps) => {
  const user = useCurrentUser();
  const promos = usePromos();
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <div className="min-h-screen bg-background text-foreground lg:flex lg:justify-center">
      <aside className="sticky top-0 hidden h-screen w-64 shrink-0 self-start border-l border-border bg-card lg:block">
        <div className="flex h-full flex-col justify-between overflow-y-auto">
          <div>
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

            <nav className="flex flex-col gap-1 p-sm">
              {NAV_ITEMS.map(({ id, label, path, icon: Icon }) =>
                path ? (
                  <NavLink
                    key={id}
                    to={path}
                    className={({ isActive }) =>
                      cn(ROW_BASE, "hover:bg-muted", isActive ? "text-foreground" : "text-muted-foreground")
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
                ) : (
                  <div key={id} className={cn(ROW_BASE, "cursor-default text-muted-foreground")}>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-muted">
                      <Icon size={18} />
                    </span>
                    {label}
                  </div>
                ),
              )}
            </nav>
          </div>

          <Link
            to="/profile"
            className="flex items-center gap-sm border-t border-border p-sm transition hover:bg-muted"
          >
            <CustomAvatar name={fullName} src={user.avatarUrl} />
            <span className="min-w-0">
              <span className="title block truncate text-body font-semibold">{fullName}</span>
              <span className="subtitle block text-caption text-muted-foreground">View profile</span>
            </span>
          </Link>
        </div>
      </aside>

      <main className="min-h-screen min-w-0 max-w-3xl flex-1 border-border bg-card pb-24 lg:border-x lg:pb-0">
        <header className="sticky top-0 z-10 flex h-16 items-center gap-2 border-b border-border bg-card px-sm">
          {backTo && (
            <Link to={backTo} aria-label="Back" className="rounded-full p-1 hover:bg-muted">
              <ChevronLeft size={22} />
            </Link>
          )}
          <h1 className="title text-h3 font-bold">{title}</h1>
          <CustomHeaderActions />
        </header>

        {children}
      </main>

      <aside className="sticky top-0 hidden h-screen w-88 shrink-0 self-start overflow-y-auto border-r border-border bg-card xl:block">
        <h2 className="title flex h-16 items-center border-b border-border bg-card px-sm text-h3 font-bold">Don't miss</h2>
        <div className="divide-y divide-border">
          {promos.map((promo) => (
            <CustomPromoCard key={promo.id} promo={promo} />
          ))}
        </div>
      </aside>

      <nav className="fixed inset-x-3 bottom-3 z-20 flex gap-1 rounded-2xl border border-border bg-card/90 p-1.5 shadow-lg backdrop-blur lg:hidden">
        {NAV_ITEMS.filter((item) => item.path).map(({ id, label, path, icon: Icon }) => (
          <NavLink
            key={id}
            to={path!}
            className={({ isActive }) =>
              cn(
                "title flex flex-1 flex-col items-center gap-0.5 rounded-xl py-1.5 text-caption font-medium transition",
                isActive ? "bg-primary text-primary-foreground" : "text-muted-foreground",
              )
            }
          >
            <Icon size={20} />
            {label}
          </NavLink>
        ))}
      </nav>
    </div>
  );
};

export default CustomAppShell;
