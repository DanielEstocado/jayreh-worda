import { useState } from "react";
import { useStoreItems } from "@/services/queries/store";
import { useCurrentUser } from "@/services/queries/user";
import { cn } from "@/lib/cn";
import type { StoreItem } from "@/types/store";
import PointsHero from "./components/PointsHero";
import StoreItemCard from "./components/StoreItemCard";

type SectionProps = { title: string; items: StoreItem[]; balance: number };

const ALL = "All";

// A titled grid of rewards, hidden when there are none in it.
function Section({ title, items, balance }: SectionProps) {
  if (items.length === 0) return null;

  return (
    <section>
      <h2 className="title mb-sm text-body-lg font-bold text-foreground">
        {title} <span className="text-muted-foreground">({items.length})</span>
      </h2>
      <div className="grid grid-cols-1 gap-md sm:grid-cols-2">
        {items.map((item) => (
          <StoreItemCard key={item.id} item={item} balance={balance} />
        ))}
      </div>
    </section>
  );
}

// The store: the user's points and progress to the next reward, category filters, then the rewards they can redeem now and the ones to keep earning for. Design only for now.
export default function StoreScreen() {
  const user = useCurrentUser();
  const [category, setCategory] = useState(ALL);

  const { items: allItems, categories } = useStoreItems();

  const items = allItems.filter(
    (item) => category === ALL || item.category === category,
  );
  const next = allItems.find((item) => item.cost > user.exp);

  return (
    <>
      <div className="flex flex-col gap-md p-md">
        <PointsHero balance={user.exp} next={next} />

        <div
          role="tablist"
          aria-label="Categories"
          className="flex flex-wrap gap-2"
        >
          {[ALL, ...categories].map((name) => (
            <button
              key={name}
              type="button"
              role="tab"
              aria-selected={name === category}
              onClick={() => setCategory(name)}
              className={cn(
                "title cursor-pointer rounded-full border px-3.5 py-1.5 text-caption font-semibold transition",
                name === category
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-card text-muted-foreground hover:bg-muted",
              )}
            >
              {name}
            </button>
          ))}
        </div>

        <Section
          title="Ready to redeem"
          items={items.filter((i) => i.cost <= user.exp)}
          balance={user.exp}
        />
        <Section
          title="Keep earning"
          items={items.filter((i) => i.cost > user.exp)}
          balance={user.exp}
        />

        {items.length === 0 && (
          <p className="subtitle text-body text-foreground/70">
            Nothing in this category yet.
          </p>
        )}
      </div>
    </>
  );
}
