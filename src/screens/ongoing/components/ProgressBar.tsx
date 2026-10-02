type ProgressBarProps = { percent: number };

// A thin bar filled to the given percentage, with the matching progressbar role for screen readers.
const ProgressBar = ({ percent }: ProgressBarProps) => {
  return (
    <div
      role="progressbar"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={percent}
      className="h-2 w-full overflow-hidden rounded-full bg-muted"
    >
      <div
        className="h-full rounded-full bg-primary transition-all"
        style={{ width: `${percent}%` }}
      />
    </div>
  );
};

export default ProgressBar;
