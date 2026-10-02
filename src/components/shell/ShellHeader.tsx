import { Link } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import CustomHeaderActions from "../CustomHeaderActions";

type ShellHeaderProps = {
  title: string;
  // When set, a back arrow before the title links here.
  backTo?: string;
};

// The sticky page header: an optional back arrow, the title, and the bell and mail buttons on the right.
export default function ShellHeader({ title, backTo }: ShellHeaderProps) {
  return (
    <header className="sticky top-0 z-10 flex h-16 items-center gap-2 border-b border-border bg-card px-sm">
      {backTo && (
        <Link
          to={backTo}
          aria-label="Back"
          className="rounded-full p-1 hover:bg-muted"
        >
          <ChevronLeft size={22} />
        </Link>
      )}
      <h1 className="title text-h3 font-bold">{title}</h1>
      <CustomHeaderActions />
    </header>
  );
}
