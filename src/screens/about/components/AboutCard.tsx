import { type ReactNode } from "react";

type AboutCardProps = {
  title: string;
  description?: string;
  children: ReactNode;
};

// The bordered card every section of the About page sits in: a heading, an optional description, then its content.
export default function AboutCard({
  title,
  description,
  children,
}: AboutCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-md">
      <h2 className="title text-h3">{title}</h2>
      {description && (
        <p className="subtitle mt-1 text-caption text-muted-foreground">
          {description}
        </p>
      )}
      {children}
    </div>
  );
}
