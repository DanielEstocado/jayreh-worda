import {
  GraduationCap,
  Languages,
  MapPin,
  Sparkles,
  Users,
} from "lucide-react";
import { CustomAvatar } from "@/components";
import type { User } from "@/types/church";

type Stat = { label: string; value: number };

type ProfileHeaderProps = {
  user: User;
  tagLabels: string[];
  isMentor: boolean;
  membershipLabels: string[];
  stats: Stat[];
};

// The top of a profile: cover, avatar, name, tags, where they serve and a few numbers.
export default function ProfileHeader({
  user,
  tagLabels,
  isMentor,
  membershipLabels,
  stats,
}: ProfileHeaderProps) {
  const fullName = `${user.firstName} ${user.lastName}`;

  return (
    <section className="border-b border-border">
      <div className="h-28 bg-linear-to-r from-primary via-highlight to-accent lg:h-36" />

      <div className="px-sm pb-sm">
        <CustomAvatar
          name={fullName}
          src={user.avatarUrl}
          size="xl"
          className="-mt-12 ring-4 ring-card"
        />

        <h2 className="title mt-xs text-h2 font-bold text-foreground">
          {fullName}
        </h2>

        <div className="mt-xs flex flex-wrap gap-1.5">
          {isMentor && (
            <span className="subtitle flex items-center gap-1 rounded-full bg-highlight px-2.5 py-0.5 text-caption font-medium text-foreground">
              <GraduationCap size={12} />
              Mentor
            </span>
          )}
          {tagLabels.map((label) => (
            <span
              key={label}
              className="subtitle rounded-full bg-secondary px-2.5 py-0.5 text-caption font-medium text-secondary-foreground"
            >
              {label}
            </span>
          ))}
        </div>

        <ul className="subtitle mt-sm flex flex-col gap-1.5 text-body text-foreground/70">
          <li className="flex items-center gap-2">
            <MapPin size={16} />
            {user.city}, {user.province}
          </li>
          <li className="flex items-center gap-2">
            <Languages size={16} />
            {user.languages.join(", ")}
          </li>
          <li className="flex items-center gap-2">
            <Sparkles size={16} className="text-highlight" />
            {user.exp.toLocaleString("en-US")} XP
          </li>
        </ul>

        {membershipLabels.length > 0 && (
          <div className="mt-md">
            <p className="title mb-1.5 text-caption font-semibold tracking-wide text-muted-foreground uppercase">
              Serving in
            </p>
            <div className="flex flex-col gap-1.5">
              {membershipLabels.map((label) => (
                <span
                  key={label}
                  className="subtitle flex w-fit items-center gap-1.5 rounded-xl bg-highlight/15 px-sm py-1.5 text-body font-medium text-ink-yellow"
                >
                  <Users size={14} />
                  {label}
                </span>
              ))}
            </div>
          </div>
        )}

        <dl className="mt-md grid grid-cols-3 gap-xs">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-highlight/40 bg-highlight/15 py-xs text-center"
            >
              <dd className="title text-h3 font-bold text-ink-yellow">
                {stat.value}
              </dd>
              <dt className="subtitle text-caption font-medium text-ink-yellow/75">
                {stat.label}
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
