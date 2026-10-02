import { useNavigate, useParams } from "react-router-dom";
import { ChevronLeft } from "lucide-react";
import { CustomButton, CustomHeader } from "@/components";
import { ACTIVITIES, LESSONS, MODULES } from "@/constants/activity";
import { MOCK_COMPLETIONS, MOCK_ENROLLMENTS } from "@/constants/progress";
import { MOCK_USER } from "@/constants/user";
import { getActivityProgress } from "@/lib/progress";
import ModuleSection from "./components/ModuleSection";
import ProgressBar from "./components/ProgressBar";

// Shows one joined activity module by module, marking which lessons are done, current and still locked.
const ActivityDetailScreen = () => {
  const navigate = useNavigate();
  const { activityId } = useParams();

  const activity = ACTIVITIES.find((a) => a.id === Number(activityId));
  const isJoined = MOCK_ENROLLMENTS.some(
    (e) => e.userId === MOCK_USER.id && e.activityId === activity?.id,
  );
  const progress =
    activity && isJoined
      ? getActivityProgress({
          activity,
          modules: MODULES,
          lessons: LESSONS,
          completedLessonIds: MOCK_COMPLETIONS.filter((c) => c.userId === MOCK_USER.id).map(
            (c) => c.lessonId,
          ),
        })
      : undefined;

  // Sends the user back to their list of ongoing activities.
  const handleNavigateToOngoing = () => {
    navigate("/ongoing");
  };

  return (
    <main className="min-h-screen bg-background text-foreground">
      <CustomHeader
        action={
          <CustomButton
            variant="ghost"
            className="subtitle rounded-full"
            onClick={handleNavigateToOngoing}
          >
            <ChevronLeft size={16} />
            Ongoing
          </CustomButton>
        }
      />

      <div className="mx-auto max-w-3xl px-lg py-xl">
        {!progress ? (
          <p className="subtitle text-body text-muted-foreground">
            This activity doesn't exist or you haven't joined it.
          </p>
        ) : (
          <>
            <h1 className="title text-h1">{progress.activity.label}</h1>
            <div className="mt-sm flex items-center gap-sm">
              <ProgressBar percent={progress.percent} />
              <span className="subtitle text-body text-muted-foreground">{progress.percent}%</span>
            </div>
            <p className="subtitle mt-sm text-body text-muted-foreground">
              {progress.isComplete
                ? "You completed this activity."
                : progress.next
                  ? `You're on Module ${progress.next.module.number}, Lesson ${progress.next.lesson.number}.`
                  : "Lessons for this activity are coming soon."}
            </p>

            <div className="mt-lg flex flex-col gap-md">
              {progress.modules.map((module) => (
                <ModuleSection key={module.id} module={module} />
              ))}
            </div>
          </>
        )}
      </div>
    </main>
  );
};

export default ActivityDetailScreen;
