import { STACK_ITEMS } from "../constant";
import AboutCard from "./AboutCard";

// The dependency list: one small tile per library with what it is used for.
export default function StackCard() {
  return (
    <AboutCard title="Stack">
      <div className="mt-sm flex flex-wrap gap-sm">
        {STACK_ITEMS.map(({ label, description }) => (
          <div
            key={label}
            className="rounded-xl border border-border bg-muted px-4 py-2"
          >
            <p className="text-body font-semibold">{label}</p>
            <p className="text-caption text-muted-foreground">{description}</p>
          </div>
        ))}
      </div>
    </AboutCard>
  );
}
