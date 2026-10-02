import { Sparkles } from "lucide-react";
import { CustomGlowCard, CustomRingStat } from "@/components";
import type { StoreItem } from "@/types/store";

type PointsHeroProps = {
  balance: number;
  // The cheapest reward the user cannot afford yet, left out when they can afford everything.
  next?: StoreItem;
};

// The points card on top of the store: the balance, and a ring showing how close the user is to their next reward.
export default function PointsHero({ balance, next }: PointsHeroProps) {
  const percent = next
    ? Math.min(100, Math.round((balance / next.cost) * 100))
    : 100;

  return (
    <CustomGlowCard tone="yellow">
      <div className="min-w-0 flex-1">
        <p className="subtitle flex items-center gap-1.5 text-caption font-medium text-ink-yellow/75">
          <Sparkles size={14} />
          Your points
        </p>
        <p className="title text-h1 leading-tight font-bold text-ink-yellow">
          {balance.toLocaleString("en-US")} XP
        </p>
        <p className="subtitle mt-1 text-body text-ink-yellow/75">
          {next
            ? `${(next.cost - balance).toLocaleString("en-US")} XP to go for ${next.title}`
            : "You can redeem every reward in the store."}
        </p>
        <p className="subtitle mt-2 text-caption text-ink-yellow/60">
          Finish lessons or join activities to earn more and spend them here.
        </p>
      </div>

      <CustomRingStat
        percent={percent}
        tone="yellow"
        size={92}
        valueClassName="text-body-lg"
        caption={next ? "To next reward" : "All unlocked"}
      />
    </CustomGlowCard>
  );
}
