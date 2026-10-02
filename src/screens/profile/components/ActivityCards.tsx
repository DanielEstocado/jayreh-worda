import { CustomActivityList } from "@/components";

// The profile's activity section: a heading over the shared game-style activity cards.
export default function ActivityCards() {
  return (
    <section className="border-b border-border p-sm">
      <h2 className="title text-body-lg font-bold text-foreground">
        My Activities
      </h2>
      <p className="subtitle text-caption text-foreground/70">
        Finish lessons to fill the ring.
      </p>

      <div className="mt-xs">
        <CustomActivityList />
      </div>
    </section>
  );
}
