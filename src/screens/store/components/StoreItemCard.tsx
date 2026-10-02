import { Sparkles } from "lucide-react";
import { CustomButton } from "@/components";
import { showFallbackImage } from "@/lib/image";
import type { StoreItem } from "@/types/store";

type StoreItemCardProps = {
  item: StoreItem;
  // The user's points, decides whether the reward can be redeemed or how far away it is.
  balance: number;
};

// One reward: its photo, name and price in XP, then either a Redeem button or how many points are still missing with a progress bar. Design only, nothing is redeemed yet.
const StoreItemCard = ({ item, balance }: StoreItemCardProps) => {
  const canAfford = balance >= item.cost;
  const missing = item.cost - balance;
  const progress = Math.min(100, Math.round((balance / item.cost) * 100));

  return (
    <article className="flex flex-col rounded-2xl border border-border bg-card p-sm">
      <img
        src={item.imageUrl}
        alt=""
        loading="lazy"
        referrerPolicy="no-referrer"
        onError={showFallbackImage}
        className="aspect-4/3 w-full rounded-xl object-cover"
      />

      <div className="flex flex-1 flex-col px-1 pt-2.5 pb-1">
        <span className="subtitle w-fit rounded-full bg-secondary px-2 py-0.5 text-[11px] font-medium text-secondary-foreground">
          {item.category}
        </span>
        <h3 className="title mt-1.5 text-body-lg leading-snug font-bold text-foreground">
          {item.title}
        </h3>
        <p className="subtitle mt-0.5 flex-1 text-caption text-foreground/70">
          {item.subtitle}
        </p>

        <div className="mt-sm flex items-center justify-between gap-2">
          <span className="title flex items-center gap-1 text-body font-bold text-foreground">
            <Sparkles size={16} className="text-highlight" />
            {item.cost.toLocaleString("en-US")} XP
          </span>

          {canAfford ? (
            <CustomButton
              variant="primary"
              size="sm"
              className="title rounded-full"
            >
              Redeem
            </CustomButton>
          ) : (
            <span className="subtitle text-caption font-medium text-muted-foreground">
              {missing.toLocaleString("en-US")} XP to go
            </span>
          )}
        </div>

        {!canAfford && (
          <div
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress}
            className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted"
          >
            <div
              className="h-full rounded-full bg-highlight"
              style={{ width: `${progress}%` }}
            />
          </div>
        )}
      </div>
    </article>
  );
};

export default StoreItemCard;
