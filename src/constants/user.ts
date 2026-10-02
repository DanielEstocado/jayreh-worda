import type { User } from "@/types/church";

// MOCK: fake demo user, delete once the API returns the signed-in user.
export const MOCK_USER: User = {
  id: 1,
  firstName: "Juan",
  lastName: "Dela Cruz",
  birthday: "2000-01-15",
  contactNumber: "09170000000",
  avatarUrl: "https://i.pravatar.cc/150?img=12",
  address: "123 Sample Street",
  city: "Trece Martires City",
  province: "Cavite",
  country: "Philippines",
  languages: ["English", "Tagalog"],
  tagIds: [1, 2],
  memberships: [{ departmentId: 3, sectionId: 5, clusterId: 6 }],
  exp: 1025,
};
