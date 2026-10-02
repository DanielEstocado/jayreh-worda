import { useParams } from "react-router-dom";
import { CustomActivityCard, CustomAppShell } from "@/components";
import { useMyActivityProgress } from "@/hooks/useMyActivityProgress";
import { getActivityMessage, getLessonCountLabel } from "@/lib/activity";
import ModuleSection from "./components/ModuleSection";

// Shows one joined activity: a compact summary card, then its modules with each lesson marked done, current or locked.
const ActivityDetailScreen = () => {
  const { activityId } = useParams();
  const items = useMyActivityProgress();

  const item = items.find((i) => i.activity.id === Number(activityId));
  const joined = item && item.status !== "not-started" ? item : undefined;

  return (
    <CustomAppShell title={joined?.activity.label ?? "Activity"} backTo="/activities">
      <div className="flex flex-col gap-2 p-sm">
        {!joined ? (
          <p className="subtitle text-body text-foreground/70">
            This activity doesn't exist or you haven't joined it.
          </p>
        ) : (
          <>
            <CustomActivityCard
              label={joined.activity.label}
              percent={joined.percent}
              status={joined.status}
              message={getActivityMessage(joined)}
              lessonCount={getLessonCountLabel(joined)}
              themeIndex={0}
            />

            {joined.modules.map((module, i) => (
              <ModuleSection key={module.id} module={module} index={i} />
            ))}
          </>
        )}
      </div>
    </CustomAppShell>
  );
};

export default ActivityDetailScreen;
