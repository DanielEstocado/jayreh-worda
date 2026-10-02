import { cn } from "@/lib/cn";

type Tab<K extends string> = { key: K; label: string };

type CustomTabsProps<K extends string> = {
  tabs: Tab<K>[];
  active: K;
  onChange: (key: K) => void;
};

// A row of equal-width tabs with an underline under the active one.
const CustomTabs = <K extends string>({ tabs, active, onChange }: CustomTabsProps<K>) => {
  return (
    <div role="tablist" className="flex border-b border-border">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          role="tab"
          aria-selected={tab.key === active}
          onClick={() => onChange(tab.key)}
          className={cn(
            "title flex-1 cursor-pointer border-b-2 py-sm text-body font-semibold transition",
            tab.key === active
              ? "border-primary text-foreground"
              : "border-transparent text-muted-foreground hover:bg-muted",
          )}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default CustomTabs;
