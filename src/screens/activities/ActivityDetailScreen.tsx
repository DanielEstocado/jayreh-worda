import { useParams } from "react-router-dom";
import { CustomActivityCard } from "@/components";
import { useShellTitle } from "@/hooks/useShellTitle";
import { useMyActivityProgress } from "@/services/queries/activity";
import { getActivityMessage, getLessonCountLabel } from "@/lib/activity";
import ModuleSection from "./components/ModuleSection";

// Shows one joined activity: a big summary card with its progress ring, then a spacious card per module with each lesson marked done, current or locked.
export default function ActivityDetailScreen() {
  const { activityId } = useParams();
  const items = useMyActivityProgress();

  const item = items.find((i) => i.activity.id === Number(activityId));
  const joined = item && item.status !== "not-started" ? item : undefined;
  useShellTitle(joined?.activity.label);

  return (
    <>
      <div className="flex flex-col gap-md p-md">
        {!joined ? (
          <p className="subtitle text-body text-foreground/70">
            This activity doesn't exist or you haven't joined it.
          </p>
        ) : (
          <>
            <CustomActivityCard
              variant="large"
              label={joined.activity.label}
              percent={joined.percent}
              status={joined.status}
              message={getActivityMessage(joined)}
              lessonCount={getLessonCountLabel(joined)}
              tone="pink"
            />

            <div className="flex flex-col gap-md">
              {joined.modules.map((module, i) => (
                <ModuleSection key={module.id} module={module} index={i} />
              ))}
            </div>
          </>
        )}
      </div>
    </>
  );
}
