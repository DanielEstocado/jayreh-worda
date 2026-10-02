import { PLACEHOLDER_IMAGE } from "@/constants/images";
import type { StoreItem } from "@/types/store";

// MOCK: rewards in the store with their price in XP, delete once the API returns them.
export const MOCK_STORE_ITEMS: StoreItem[] = [
  {
    id: 1,
    title: "Meet Pastor AJ Velasco",
    subtitle: "A one-on-one meet and greet with Pastor AJ.",
    category: "Experience",
    cost: 2500,
    imageUrl: PLACEHOLDER_IMAGE,
  },
  {
    id: 2,
    title: "Free Frappuccino at ICafe",
    subtitle: "Pick any frappuccino on the menu, on us.",
    category: "Treat",
    cost: 300,
    imageUrl: PLACEHOLDER_IMAGE,
  },
  {
    id: 3,
    title: "Free COG Enabler Shirt",
    subtitle: "The COG Enabler shirt, free for you.",
    category: "Merch",
    cost: 800,
    imageUrl: PLACEHOLDER_IMAGE,
  },
  {
    id: 4,
    title: "200 Peso ICafe Gift Card",
    subtitle: "Spend it on anything at ICafe.",
    category: "Gift card",
    cost: 1200,
    imageUrl: PLACEHOLDER_IMAGE,
  },
];
