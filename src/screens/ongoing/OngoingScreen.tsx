import { useNavigate } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { CustomButton, CustomHeader } from "@/components";
import { ACTIVITIES, LESSONS, MODULES } from "@/constants/activity";
import { MOCK_COMPLETIONS, MOCK_ENROLLMENTS } from "@/constants/progress";
import { MOCK_USER } from "@/constants/user";
import { getActivityProgress } from "@/lib/progress";
import ActivityCard from "./components/ActivityCard";

// Lists the activities the user joined with their completion percentage, each opening its detail.
const OngoingScreen = () => {
  const navigate = useNavigate();

  const completedLessonIds = MOCK_COMPLETIONS.filter((c) => c.userId === MOCK_USER.id).map(
    (c) => c.lessonId,
  );
  const joined = MOCK_ENROLLMENTS.filter((e) => e.userId === MOCK_USER.id && !e.completedAt).flatMap((e) => {
    const activity = ACTIVITIES.find((a) => a.id === e.activityId);
    return activity
      ? [getActivityProgress({ activity, modules: MODULES, lessons: LESSONS, completedLessonIds })]
      : [];
  });

  // Sends the user back to the home screen.
  const handleNavigateToHome = () => {
    navigate("/home");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CustomHeader
        action={
          <CustomButton
            variant="ghost"
            className="subtitle rounded-full"
            onClick={handleNavigateToHome}
          >
            <ChevronLeft size={16} />
            Go Back
          </CustomButton>
        }
      />

      <div className="mx-auto max-w-3xl px-lg py-xl">
        <h1 className="title text-h1">Ongoing</h1>
        <p className="subtitle mt-sm text-body-lg text-muted-foreground">
          The activities you joined and how far along you are.
        </p>

        <div className="mt-lg flex flex-col gap-md">
          {joined.length === 0 ? (
            <p className="subtitle text-body text-muted-foreground">
              You haven't joined any activity yet.
            </p>
          ) : (
            joined.map((progress) => (
              <ActivityCard
                key={progress.activity.id}
                progress={progress}
                onOpen={() => navigate(`/ongoing/${progress.activity.id}`)}
              />
            ))
          )}
        </div>
      </div>
    </main>
  );
};

export default OngoingScreen;
