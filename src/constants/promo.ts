import { PLACEHOLDER_IMAGE } from "@/constants/images";
import type { Promo } from "@/types/promo";

// MOCK: promotions for the right column (one placeholder photo for all), delete once the API returns them.
export const MOCK_PROMOS: Promo[] = [
  {
    id: 1,
    title: "COG Merch Available",
    subtitle: "Shirts, caps and jackets",
    imageUrl: PLACEHOLDER_IMAGE,
  },
  {
    id: 2,
    title: "Christmas Cantata",
    subtitle: "Save the date, details coming soon.",
    imageUrl: PLACEHOLDER_IMAGE,
  },
  {
    id: 3,
    title: "CLDP is open",
    subtitle: "You finished C2S101, the next course is ready when you are.",
    imageUrl: PLACEHOLDER_IMAGE,
    to: "/activities",
  },
];
