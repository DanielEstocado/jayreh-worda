import { cn } from "@/lib/cn";
import { TONES } from "@/lib/tones";
import type { ToneName } from "@/types/tone";
import CustomCircularProgress from "./CustomCircularProgress";

type CustomRingStatProps = {
  percent: number;
  tone: ToneName;
  size: number;
  // Text size class for the percentage in the middle, e.g. "text-h3".
  valueClassName: string;
  // A short label under the ring.
  caption: string;
};

// A progress ring with its percentage in the middle and a short caption under it.
export default function CustomRingStat({
  percent,
  tone,
  size,
  valueClassName,
  caption,
}: CustomRingStatProps) {
  const theme = TONES[tone];

  return (
    <div className="flex shrink-0 flex-col items-center gap-1">
      <CustomCircularProgress
        percent={percent}
        strokeClass={theme.stroke}
        trackClass="stroke-muted"
        size={size}
      >
        <span className={cn("title font-bold", theme.ink, valueClassName)}>
          {percent}%
        </span>
      </CustomCircularProgress>
      <span className={cn("subtitle text-micro font-medium", theme.inkSoft)}>
        {caption}
      </span>
    </div>
  );
}
