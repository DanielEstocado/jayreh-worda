import { SPACING_SCALE } from "../constant";
import AboutCard from "./AboutCard";

// Three little squares used to show a gap, one swatch of the ladder.
function Swatch() {
  return <div className="h-5 w-5 rounded-md bg-primary/30"></div>;
}

// A live preview of the spacing ladder as padding and as gap, so the scale on this page can never drift from index.css.
export default function SpacingScaleCard() {
  return (
    <AboutCard
      title="Spacing scale"
      description="One ladder (xs...xl), reused by p-, px-, py-, m-, and gap- alike."
    >
      <p className="subtitle mt-sm text-caption font-semibold text-foreground">
        Padding
      </p>
      <div className="mt-2 space-y-3">
        {SPACING_SCALE.map((size) => (
          <div key={size} className="flex items-center gap-sm">
            <div
              className={`rounded-lg border border-dashed border-border p-${size}`}
            >
              <Swatch />
            </div>
            <p className="subtitle text-caption text-muted-foreground">
              p-{size}
            </p>
          </div>
        ))}
      </div>

      <p className="subtitle mt-sm text-caption font-semibold text-foreground">
        Gap
      </p>
      <div className="mt-2 space-y-3">
        {SPACING_SCALE.map((size) => (
          <div key={size}>
            <p className="subtitle mb-1 text-caption text-muted-foreground">
              gap-{size}
            </p>
            <div className={`flex gap-${size}`}>
              <Swatch />
              <Swatch />
              <Swatch />
            </div>
          </div>
        ))}
      </div>
    </AboutCard>
  );
}
