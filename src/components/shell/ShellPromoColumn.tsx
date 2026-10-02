import { usePromos } from "@/services/queries/promo";
import CustomPromoCard from "../ui/CustomPromoCard";

// The promo column on the right of wide screens: a "Don't miss" heading level with the page header, then one row per promo separated by dividers.
export default function ShellPromoColumn() {
  const promos = usePromos();

  return (
    <aside className="sticky top-0 hidden h-screen w-88 shrink-0 self-start overflow-y-auto border-r border-border bg-card xl:block">
      <h2 className="title flex h-16 items-center border-b border-border bg-card px-sm text-h3 font-bold">
        Don't miss
      </h2>
      <div className="divide-y divide-border">
        {promos.map((promo) => (
          <CustomPromoCard key={promo.id} promo={promo} />
        ))}
      </div>
    </aside>
  );
}
