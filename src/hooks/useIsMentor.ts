import { MENTOR_ACTIVITY_ID } from "@/constants/activity";
import { MOCK_ENROLLMENTS } from "@/constants/progress";
import { useCurrentUser } from "@/hooks/useCurrentUser";
import { hasCompletedActivity } from "@/lib/enrollment";

// Says whether the signed-in user is a mentor, which they become by finishing C2S101, only mentors can create groups.
export function useIsMentor() {
  const user = useCurrentUser();

  return hasCompletedActivity(MOCK_ENROLLMENTS, user.id, MENTOR_ACTIVITY_ID);
}
