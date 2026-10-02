import { z } from "zod";

// What a member fills in to write a post: a title, a subtitle and who it is for.
export const newPostSchema = z.object({
  title: z.string().trim().min(2, "Give the post a title").max(80, "Keep the title under 80 characters"),
  subtitle: z
    .string()
    .trim()
    .min(2, "Write a line or two")
    .max(280, "Keep it under 280 characters"),
  audience: z.enum(["public", "groups"]),
});

export type NewPostInput = z.infer<typeof newPostSchema>;
