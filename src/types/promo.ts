// A promotion shown in the right column, an event, a new course or a reminder.
export type Promo = {
  id: number;
  title: string;
  subtitle: string;
  // The photo on the right of the card.
  imageUrl: string;
  // Makes the whole card a link, left out when the promo has nowhere to go yet.
  to?: string;
};
