import { CustomActivityList } from "@/components";

// Shows every activity as a big card, one per row, with its progress ring on the right, ongoing ones open their detail.
export default function MyActivitiesScreen() {
  return (
    <>
      <div className="p-sm">
        <p className="subtitle mb-sm text-body text-foreground/70">
          Finish lessons to fill the ring and unlock the next activity.
        </p>

        <CustomActivityList variant="large" />
      </div>
    </>
  );
}
