import { MOCK_STORE_ITEMS } from "@/constants/store";

// Returns every reward in the store, cheapest first, and the categories to filter them by.
export function useStoreItems() {
  const items = [...MOCK_STORE_ITEMS].sort((a, b) => a.cost - b.cost);
  const categories = [...new Set(items.map((item) => item.category))];

  return { items, categories };
}
