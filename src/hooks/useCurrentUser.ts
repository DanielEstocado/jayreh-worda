import { MOCK_USER } from "@/constants/user";

// Returns the signed-in user, the mock one until real auth exists, so screens never import MOCK_USER themselves.
export function useCurrentUser() {
  return MOCK_USER;
}
