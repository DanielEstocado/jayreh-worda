// A reward the user can spend points (XP) on in the store.
export type StoreItem = {
  id: number;
  title: string;
  subtitle: string;
  // Short label above the title, e.g. "Experience".
  category: string;
  // Price in points (XP).
  cost: number;
  imageUrl: string;
};
