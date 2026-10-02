import { describe, expect, it } from "vitest";
import { nextId } from "./id";

describe("nextId", () => {
  it("starts at 1 for an empty list", () => {
    expect(nextId([])).toBe(1);
  });

  it("goes one past the highest id, not the list length", () => {
    expect(nextId([{ id: 2 }, { id: 7 }, { id: 4 }])).toBe(8);
  });
});
