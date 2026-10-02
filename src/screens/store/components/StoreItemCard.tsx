import { Lock, Sparkles } from "lucide-react";
import { CustomButton, CustomImage } from "@/components";
import type { StoreItem } from "@/types/store";

type StoreItemCardProps = {
  item: StoreItem;
  // The user's points, decides whether the reward can be redeemed or how far away it is.
  balance: number;
};

// One reward as a roomy card: the photo with its price on it, the name and description, then a full-width Redeem button or how many points are missing with a progress bar. Design only, nothing is redeemed yet.
export default function StoreItemCard({ item, balance }: StoreItemCardProps) {
  const canAfford = balance >= item.cost;
  const missing = item.cost - balance;
  const progress = Math.min(100, Math.round((balance / item.cost) * 100));

  return (
    <article className="flex flex-col rounded-3xl border border-border bg-card p-sm shadow-sm transition hover:-translate-y-0.5 hover:shadow-lg">
      <div className="relative">
        <CustomImage
          src={item.imageUrl}
          className="aspect-4/3 w-full rounded-2xl object-cover"
        />

        <span className="title absolute top-2 right-2 flex items-center gap-1 rounded-full bg-highlight px-2.5 py-1 text-caption font-bold text-on-highlight shadow-sm">
          <Sparkles size={12} />
          {item.cost.toLocaleString("en-US")} XP
        </span>

        {!canAfford && (
          <span className="subtitle absolute top-2 left-2 flex items-center gap-1 rounded-full bg-card/90 px-2.5 py-1 text-caption font-medium text-muted-foreground shadow-sm">
            <Lock size={12} />
            Locked
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col px-1 pt-md pb-1">
        <span className="subtitle w-fit rounded-full bg-secondary px-2.5 py-0.5 text-micro font-medium text-secondary-foreground">
          {item.category}
        </span>
        <h3 className="title mt-2 text-body-lg leading-snug font-bold text-foreground">
          {item.title}
        </h3>
        <p className="subtitle mt-1 flex-1 text-body text-foreground/70">
          {item.subtitle}
        </p>

        <div className="mt-md">
          {canAfford ? (
            <CustomButton
              variant="primary"
              size="md"
              fullWidth
              className="title rounded-full"
            >
              Redeem
            </CustomButton>
          ) : (
            <>
              <div className="mb-1.5 flex items-center justify-between">
                <span className="subtitle text-caption font-medium text-ink-yellow/75">
                  {missing.toLocaleString("en-US")} XP to go
                </span>
                <span className="title text-caption font-bold text-ink-yellow">
                  {progress}%
                </span>
              </div>
              <div
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={progress}
                className="h-2 w-full overflow-hidden rounded-full bg-muted"
              >
                <div
                  className="h-full rounded-full bg-highlight"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </>
          )}
        </div>
      </div>
    </article>
  );
}
