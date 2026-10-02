import { z } from "zod";

// What a mentor fills in to add a mentee to a group, the address stays one free-text line until they get an account.
export const newMenteeSchema = z.object({
  firstName: z.string().trim().min(1, "First name is required"),
  lastName: z.string().trim().min(1, "Last name is required"),
  address: z.string().trim().min(3, "Enter where they live"),
  contactNumber: z
    .string()
    .trim()
    .regex(/^(09|\+639)\d{9}$/, "Use a mobile number like 09171234567"),
});

export type NewMenteeInput = z.infer<typeof newMenteeSchema>;
