import { MENTOR_ACTIVITY_ID } from "@/constants/activity";
import { MOCK_ENROLLMENTS } from "@/constants/progress";
import { MOCK_USER } from "@/constants/user";
import { hasCompletedActivity } from "@/lib/enrollment";

// Returns the signed-in user, the mock one until real auth exists, so screens never import MOCK_USER themselves.
export function useCurrentUser() {
  return MOCK_USER;
}

// Says whether the signed-in user is a mentor, which they become by finishing C2S101, only mentors can create groups.
export function useIsMentor() {
  const user = useCurrentUser();

  return hasCompletedActivity(MOCK_ENROLLMENTS, user.id, MENTOR_ACTIVITY_ID);
}
