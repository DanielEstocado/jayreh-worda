import { z } from "zod";

// What a mentor fills in to start a new group.
export const newGroupSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2, "Give the group a name of at least 2 letters")
    .max(40, "Keep the name under 40 characters"),
});

export type NewGroupInput = z.infer<typeof newGroupSchema>;
