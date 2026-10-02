import { CONVENTIONS } from "../constant";
import AboutCard from "./AboutCard";

// The house-rules summary: each convention with an example, separated by thin lines.
export default function ConventionsCard() {
  return (
    <AboutCard title="Conventions">
      <div className="mt-sm space-y-4">
        {CONVENTIONS.map(({ label, example }, i) => (
          <div
            key={label}
            className={i !== 0 ? "border-t border-border pt-4" : ""}
          >
            <p className="text-body font-semibold text-foreground">{label}</p>
            <p className="mt-0.5 font-mono text-caption text-muted-foreground">
              {example}
            </p>
          </div>
        ))}
      </div>
    </AboutCard>
  );
}
