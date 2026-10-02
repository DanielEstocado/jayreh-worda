import { Sparkles } from "lucide-react";
import { CustomAppShell } from "@/components";
import { MOCK_STORE_ITEMS } from "@/constants/store";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import StoreItemCard from "./components/StoreItemCard";

// The store: the user's points on top, then rewards to spend them on, the ones they can afford first. Design only for now.
const StoreScreen = () => {
  const user = useCurrentUser();
  const items = [...MOCK_STORE_ITEMS].sort(
    (a, b) =>
      Number(b.cost <= user.exp) - Number(a.cost <= user.exp) ||
      a.cost - b.cost,
  );

  return (
    <CustomAppShell title="Store">
      <div className="flex flex-col gap-sm p-sm">
        <div className="flex items-center gap-sm rounded-2xl border border-highlight/40 bg-highlight/15 p-sm">
          <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-highlight text-foreground">
            <Sparkles size={24} />
          </span>
          <div>
            <p className="subtitle text-caption font-medium text-foreground/70">
              Your points
            </p>
            <p className="title text-h2 leading-tight font-bold text-foreground">
              {user.exp.toLocaleString("en-US")} XP
            </p>
          </div>
          <p className="subtitle ml-auto hidden max-w-40 text-right text-caption text-foreground/70 sm:block">
            Finish lessons or join activities to earn more and spend them here.
          </p>
        </div>

        <div className="grid grid-cols-1 gap-sm sm:grid-cols-2">
          {items.map((item) => (
            <StoreItemCard key={item.id} item={item} balance={user.exp} />
          ))}
        </div>
      </div>
    </CustomAppShell>
  );
};

export default StoreScreen;
