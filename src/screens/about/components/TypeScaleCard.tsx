import { TYPE_SCALE } from "../constant";
import AboutCard from "./AboutCard";

// A live preview of every type size in both typefaces, so the scale on this page can never drift from index.css.
export default function TypeScaleCard() {
  return (
    <AboutCard
      title="Typography scale"
      description="Size is one class (text-h1...), typeface is another (title / subtitle), combine them freely."
    >
      <div className="mt-sm space-y-3">
        {TYPE_SCALE.map(({ className, label, sample }, i) => (
          <div
            key={label}
            className={i !== 0 ? "border-t border-border pt-3" : ""}
          >
            <p className={`title ${className}`}>{sample}</p>
            <p className={`subtitle ${className}`}>{sample}</p>
            <p className="subtitle text-caption text-muted-foreground">
              {label} title / subtitle
            </p>
          </div>
        ))}
      </div>
    </AboutCard>
  );
}
