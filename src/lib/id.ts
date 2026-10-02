// Next free id for a list that already has numeric ids.
export function nextId(items: { id: number }[]) {
  return Math.max(0, ...items.map((item) => item.id)) + 1;
}
