import { PLACEHOLDER_IMAGE } from "@/constants/images";
import type { User } from "@/types/church";

// MOCK: demo user (Dan Estocado), delete once the API returns the signed-in user.
export const MOCK_USER: User = {
  id: 1,
  firstName: "Dan",
  lastName: "Estocado",
  birthday: "2000-01-15",
  contactNumber: "09170000000",
  avatarUrl: PLACEHOLDER_IMAGE,
  address: "123 Sample Street",
  city: "Trece Martires City",
  province: "Cavite",
  country: "Philippines",
  languages: ["English", "Tagalog"],
  tagIds: [1],
  memberships: [{ departmentId: 3, sectionId: 5, clusterId: 6 }],
  exp: 1025,
};
